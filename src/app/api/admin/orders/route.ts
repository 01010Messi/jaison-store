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

    const orders = await prisma.order.findMany({
      include: {
        items: true,
        shippingAddress: true,
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      orders: orders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        status: o.status,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        subtotal: Number(o.subtotal),
        shippingCost: Number(o.shippingCost),
        codFee: Number(o.codFee),
        discount: Number(o.discount),
        total: Number(o.total),
        couponCode: o.couponCode,
        trackingNumber: o.trackingNumber,
        shiprocketOrderId: o.shiprocketOrderId,
        invoiceUrl: o.invoiceUrl,
        createdAt: o.createdAt,
        customer: o.user || {
          name: o.guestEmail?.split("@")[0] || "Guest",
          email: o.guestEmail || "—",
          phone: o.guestPhone || null,
        },
        items: o.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: Number(i.price),
          image: i.image,
        })),
        shippingAddress: o.shippingAddress,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
