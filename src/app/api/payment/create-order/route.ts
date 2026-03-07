import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Razorpay from "razorpay";
import { generateOrderNumber } from "@/lib/utils";

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { amount, items, address, guestEmail } = body;

    // Must be logged in OR provide guest email
    const customerEmail = session?.user?.email || guestEmail;
    if (!customerEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (!amount || !items?.length || !address) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Amount should be in paise for Razorpay
    const amountInPaise = Math.round(amount * 100);
    const orderNumber = generateOrderNumber();

    const razorpayOrder = await getRazorpay().orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: orderNumber,
      notes: {
        orderNumber,
        customerName: address.fullName,
        customerPhone: address.phone,
        customerEmail,
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
