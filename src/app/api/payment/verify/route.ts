import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";
import { notifyAdminNewOrder } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = body;

    if (
      !orderId ||
      !razorpayPaymentId ||
      !razorpayOrderId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify signature using HMAC SHA256
    const bodyStr = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(bodyStr)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Payment verified — update the order in DB
    const order = await prisma.order.findUnique({
      where: { orderNumber: orderId },
      include: { items: true, shippingAddress: true },
    });

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          status: "CONFIRMED",
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
        },
      });

      // Decrement product stock
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Send order confirmation email
      const customerEmail =
        order.guestEmail ||
        (order.userId
          ? (
              await prisma.user.findUnique({
                where: { id: order.userId },
              })
            )?.email
          : null);

      // Send order confirmation email (must await on Vercel serverless)
      if (customerEmail && order.shippingAddress) {
        await sendOrderConfirmation({
          orderNumber: order.orderNumber,
          customerName: order.shippingAddress.fullName,
          customerEmail,
          items: order.items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: Number(i.price),
            image: i.image || undefined,
          })),
          subtotal: Number(order.subtotal),
          shippingCost: Number(order.shippingCost),
          codFee: Number(order.codFee),
          discount: Number(order.discount),
          total: Number(order.total),
          paymentMethod: order.paymentMethod,
          shippingAddress: {
            fullName: order.shippingAddress.fullName,
            addressLine1: order.shippingAddress.addressLine1,
            addressLine2: order.shippingAddress.addressLine2 || undefined,
            city: order.shippingAddress.city,
            state: order.shippingAddress.state,
            pincode: order.shippingAddress.pincode,
            phone: order.shippingAddress.phone,
          },
        }).catch((err) => console.error("Email send failed:", err));
      }

      // Notify admin via email + WhatsApp
      await notifyAdminNewOrder({
        orderNumber: order.orderNumber,
        customerName: order.shippingAddress?.fullName || "Customer",
        customerEmail: customerEmail || "",
        customerPhone: order.shippingAddress?.phone || "",
        total: Number(order.total),
        paymentMethod: order.paymentMethod,
        items: order.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: Number(i.price),
        })),
        city: order.shippingAddress?.city || "",
        state: order.shippingAddress?.state || "",
        pincode: order.shippingAddress?.pincode || "",
      });
    }

    return NextResponse.json({
      verified: true,
      orderNumber: orderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
