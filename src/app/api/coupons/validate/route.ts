import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, orderAmount } = body;

    if (!code || !orderAmount) {
      return NextResponse.json(
        { valid: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json(
        { valid: false, message: "Invalid or expired coupon code" },
        { status: 200 }
      );
    }

    // Check validity dates
    const now = new Date();
    if (coupon.validFrom > now) {
      return NextResponse.json(
        { valid: false, message: "This coupon is not yet active" },
        { status: 200 }
      );
    }

    if (coupon.validUntil && coupon.validUntil < now) {
      return NextResponse.json(
        { valid: false, message: "This coupon has expired" },
        { status: 200 }
      );
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json(
        { valid: false, message: "This coupon has reached its usage limit" },
        { status: 200 }
      );
    }

    // Check minimum order
    if (
      coupon.minOrderAmount &&
      orderAmount < Number(coupon.minOrderAmount)
    ) {
      return NextResponse.json(
        {
          valid: false,
          message: `Minimum order amount is ₹${Number(coupon.minOrderAmount)}`,
        },
        { status: 200 }
      );
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (orderAmount * Number(coupon.discountValue)) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, Number(coupon.maxDiscount));
      }
    } else {
      discount = Number(coupon.discountValue);
    }

    discount = Math.round(discount * 100) / 100;

    return NextResponse.json({
      valid: true,
      discount,
      message: `Coupon applied! You save ₹${discount}`,
    });
  } catch (error) {
    console.error("Coupon validation failed:", error);
    return NextResponse.json(
      { valid: false, message: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
