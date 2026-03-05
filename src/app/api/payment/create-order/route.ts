import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Razorpay from "razorpay";
import { generateOrderNumber } from "@/lib/utils";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { amount, items, address } = body;

    if (!amount || !items?.length || !address) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Amount should be in paise for Razorpay
    const amountInPaise = Math.round(amount * 100);
    const orderNumber = generateOrderNumber();

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: orderNumber,
      notes: {
        orderNumber,
        customerName: address.fullName,
        customerPhone: address.phone,
        customerEmail: session.user.email,
      },
    });

    return NextResponse.json({
      orderId: orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
    });
  } catch (error) {
    console.error("Payment order creation failed:", error);
    return NextResponse.json(
      { message: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
