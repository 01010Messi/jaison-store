import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createShiprocketOrder, generateAWB } from "@/lib/shiprocket";
import { sendShippingUpdate } from "@/lib/email";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { status } = body;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: true,
        shippingAddress: true,
        user: { select: { email: true, name: true } },
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = { status };

    // Auto-mark COD as PAID on delivery
    if (status === "DELIVERED" && order.paymentMethod === "COD" && order.paymentStatus !== "PAID") {
      updateData.paymentStatus = "PAID";
    }

    // Restore stock on cancellation (if not already cancelled)
    if (status === "CANCELLED" && order.status !== "CANCELLED") {
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
      // Mark payment as REFUNDED if it was paid (online orders)
      if (order.paymentStatus === "PAID" && order.paymentMethod === "RAZORPAY") {
        updateData.paymentStatus = "REFUNDED";
      }
    }

    // If shipping, create Shiprocket shipment + generate AWB
    if (status === "SHIPPED" && !order.shiprocketOrderId) {
      // Calculate total weight from product weights
      const productIds = order.items.map((i) => i.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, weight: true, weightUnit: true },
      });
      const weightMap = new Map(products.map((p) => [p.id, p]));
      let totalWeightKg = 0;
      for (const item of order.items) {
        const product = weightMap.get(item.productId);
        if (product?.weight) {
          const wGrams =
            product.weightUnit === "kg"
              ? Number(product.weight) * 1000
              : Number(product.weight);
          totalWeightKg += (wGrams * item.quantity) / 1000;
        }
      }
      // Minimum 0.5kg for Shiprocket
      if (totalWeightKg < 0.5) totalWeightKg = 0.5;

      try {
        const shiprocketResult = await createShiprocketOrder({
          orderNumber: order.orderNumber,
          orderDate: order.createdAt.toISOString().split("T")[0],
          customerName: order.shippingAddress.fullName,
          customerPhone: order.shippingAddress.phone,
          customerEmail: order.user?.email || order.guestEmail || "",
          addressLine1: order.shippingAddress.addressLine1,
          addressLine2: order.shippingAddress.addressLine2 || undefined,
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          pincode: order.shippingAddress.pincode,
          paymentMethod:
            order.paymentMethod === "COD" ? "COD" : "Prepaid",
          subtotal: Number(order.subtotal),
          items: order.items.map((i) => ({
            name: i.name,
            sku: i.productId,
            units: i.quantity,
            sellingPrice: Number(i.price),
          })),
          weight: totalWeightKg,
        });

        updateData.shiprocketOrderId = shiprocketResult.shiprocketOrderId;
        updateData.shiprocketShipmentId =
          shiprocketResult.shiprocketShipmentId;

        // Auto-generate AWB (tracking number)
        if (shiprocketResult.shiprocketShipmentId) {
          try {
            const awbResult = await generateAWB(
              shiprocketResult.shiprocketShipmentId
            );
            if (awbResult.awbCode) {
              updateData.trackingNumber = awbResult.awbCode;
              updateData.trackingUrl = `https://www.shiprocket.in/shipment-tracking/${awbResult.awbCode}`;

              // Send shipping email with auto-generated tracking
              await sendShippingUpdate({
                customerName:
                  order.user?.name || order.shippingAddress.fullName,
                customerEmail:
                  order.user?.email || order.guestEmail || "",
                orderNumber: order.orderNumber,
                trackingNumber: awbResult.awbCode,
                trackingUrl: updateData.trackingUrl as string,
                courierName:
                  awbResult.courierName || "Our Shipping Partner",
              }).catch((err) =>
                console.error("Shipping email failed:", err)
              );
            }
          } catch (awbErr) {
            console.error("AWB generation failed:", awbErr);
            // Shipment created but AWB pending — admin can retry or enter manually
          }
        }
      } catch (err) {
        console.error("Shiprocket order creation failed:", err);
        return NextResponse.json(
          { message: "Shiprocket shipment creation failed. Please try again." },
          { status: 502 }
        );
      }
    }

    // If tracking number is manually provided (and not already set by AWB)
    if (body.trackingNumber && !updateData.trackingNumber) {
      updateData.trackingNumber = body.trackingNumber;
      updateData.trackingUrl =
        body.trackingUrl ||
        `https://www.shiprocket.in/shipment-tracking/${body.trackingNumber}`;

      // Send shipping email (must await on Vercel serverless)
      await sendShippingUpdate({
        customerName: order.user?.name || order.shippingAddress.fullName,
        customerEmail: order.user?.email || order.guestEmail || "",
        orderNumber: order.orderNumber,
        trackingNumber: body.trackingNumber,
        trackingUrl:
          updateData.trackingUrl as string,
        courierName: body.courierName || "Our Shipping Partner",
        estimatedDelivery: body.estimatedDelivery,
      }).catch((err) => console.error("Shipping email failed:", err));
    }

    const updated = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      id: updated.id,
      orderNumber: updated.orderNumber,
      status: updated.status,
    });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}
