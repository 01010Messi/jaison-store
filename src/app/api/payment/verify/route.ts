import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

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
