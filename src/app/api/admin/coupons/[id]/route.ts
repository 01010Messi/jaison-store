import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
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
      isActive,
    } = body;

    const existing = await prisma.coupon.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Coupon not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.coupon.update({
      where: { id },
      data: {
        ...(code !== undefined && { code: code.toUpperCase() }),
        ...(description !== undefined && { description: description || null }),
        ...(discountType !== undefined && { discountType }),
        ...(discountValue !== undefined && { discountValue }),
        ...(minOrderAmount !== undefined && {
          minOrderAmount: minOrderAmount || null,
        }),
        ...(maxDiscount !== undefined && {
          maxDiscount: maxDiscount || null,
        }),
        ...(usageLimit !== undefined && {
          usageLimit: usageLimit || null,
        }),
        ...(validUntil !== undefined && {
          validUntil: validUntil ? new Date(validUntil) : null,
        }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({
      id: updated.id,
      code: updated.code,
      description: updated.description,
      discountType: updated.discountType,
      discountValue: Number(updated.discountValue),
      minOrderAmount: updated.minOrderAmount
        ? Number(updated.minOrderAmount)
        : null,
      maxDiscount: updated.maxDiscount ? Number(updated.maxDiscount) : null,
      usageLimit: updated.usageLimit,
      usedCount: updated.usedCount,
      isActive: updated.isActive,
      validFrom: updated.validFrom,
      validUntil: updated.validUntil,
    });
  } catch (error) {
    console.error("Failed to update coupon:", error);
    return NextResponse.json(
      { message: "Failed to update coupon" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const existing = await prisma.coupon.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Coupon not found" },
        { status: 404 }
      );
    }

    await prisma.coupon.delete({ where: { id } });

    return NextResponse.json({ message: "Coupon deleted" });
  } catch (error) {
    console.error("Failed to delete coupon:", error);
    return NextResponse.json(
      { message: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
