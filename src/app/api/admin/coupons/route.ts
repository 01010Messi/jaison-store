import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      coupons: coupons.map((c) => ({
        id: c.id,
        code: c.code,
        description: c.description,
        discountType: c.discountType,
        discountValue: Number(c.discountValue),
        minOrderAmount: c.minOrderAmount ? Number(c.minOrderAmount) : null,
        maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : null,
        usageLimit: c.usageLimit,
        usedCount: c.usedCount,
        isActive: c.isActive,
        validFrom: c.validFrom,
        validUntil: c.validUntil,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch coupons:", error);
    return NextResponse.json(
      { message: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const {
      code,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      usageLimit,
      validUntil,
    } = body;

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        description,
        discountType,
        discountValue,
        minOrderAmount: minOrderAmount || null,
        maxDiscount: maxDiscount || null,
        usageLimit: usageLimit || null,
        validUntil: validUntil ? new Date(validUntil) : null,
      },
    });

    return NextResponse.json({ id: coupon.id, code: coupon.code });
  } catch (error) {
    console.error("Failed to create coupon:", error);
    return NextResponse.json(
      { message: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
