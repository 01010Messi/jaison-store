import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createShiprocketOrder } from "@/lib/shiprocket";
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

    // If shipping, create Shiprocket shipment
    if (status === "SHIPPED" && !order.shiprocketOrderId) {
      try {
        const shiprocketResult = await createShiprocketOrder({
          orderNumber: order.orderNumber,
          orderDate: order.createdAt.toISOString().split("T")[0],
          customerName: order.shippingAddress.fullName,
          customerPhone: order.shippingAddress.phone,
          customerEmail: order.user.email,
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
          weight: 0.5,
        });

        updateData.shiprocketOrderId = shiprocketResult.shiprocketOrderId;
        updateData.shiprocketShipmentId =
          shiprocketResult.shiprocketShipmentId;
      } catch (err) {
        console.error("Shiprocket order creation failed:", err);
        // Continue with status update even if Shiprocket fails
      }
    }

    // If tracking number is provided
    if (body.trackingNumber) {
      updateData.trackingNumber = body.trackingNumber;
      updateData.trackingUrl =
        body.trackingUrl ||
        `https://www.shiprocket.in/shipment-tracking/${body.trackingNumber}`;

      // Send shipping email
      sendShippingUpdate({
        customerName: order.user.name || order.shippingAddress.fullName,
        customerEmail: order.user.email,
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
