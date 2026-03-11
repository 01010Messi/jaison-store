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

    const customers = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        _count: {
          select: { orders: true, reviews: true },
        },
        orders: {
          where: { paymentStatus: "PAID" },
          select: { total: true },
        },
      },
    });

    // Fetch recent orders for each customer (last 5)
    const customerIds = customers.map((c) => c.id);
    const recentOrders = await prisma.order.findMany({
      where: { userId: { in: customerIds } },
      orderBy: { createdAt: "desc" },
      select: {
        userId: true,
        orderNumber: true,
        total: true,
        status: true,
        createdAt: true,
      },
    });

    // Group recent orders by userId, keeping only last 5
    const ordersByUser: Record<
      string,
      { orderNumber: string; total: number; status: string; createdAt: Date }[]
    > = {};
    for (const order of recentOrders) {
      if (!order.userId) continue;
      if (!ordersByUser[order.userId]) {
        ordersByUser[order.userId] = [];
      }
      if (ordersByUser[order.userId].length < 5) {
        ordersByUser[order.userId].push({
          orderNumber: order.orderNumber,
          total: Number(order.total),
          status: order.status,
          createdAt: order.createdAt,
        });
      }
    }

    return NextResponse.json({
      customers: customers.map((c) => {
        const totalSpent = c.orders.reduce(
          (sum, order) => sum + Number(order.total),
          0
        );

        return {
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone,
          orderCount: c._count.orders,
          reviewCount: c._count.reviews,
          totalSpent,
          createdAt: c.createdAt,
          recentOrders: ordersByUser[c.id] || [],
        };
      }),
    });
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { message: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
