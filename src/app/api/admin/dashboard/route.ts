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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date range for last 7 days revenue chart
    const days7Ago = new Date();
    days7Ago.setDate(days7Ago.getDate() - 6);
    days7Ago.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      totalProducts,
      lowStockProducts,
      totalRevenue,
      todayRevenue,
      pendingReviews,
      recentOrders,
      lowStockDetails,
      topSellingItems,
      last7DaysOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({
        where: { isActive: true, stock: { lt: 5 } },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: "PAID" },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: "PAID", createdAt: { gte: today } },
      }),
      prisma.review.count({ where: { status: "PENDING" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
          items: true,
        },
      }),
      prisma.product.findMany({
        where: { isActive: true, stock: { lt: 5 } },
        select: { name: true, stock: true, slug: true },
        orderBy: { stock: "asc" },
      }),
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
      prisma.order.findMany({
        where: { paymentStatus: "PAID", createdAt: { gte: days7Ago } },
        select: { total: true, createdAt: true },
      }),
    ]);

    // Build daily revenue for last 7 days
    const revenueByDay: { date: string; revenue: number; orders: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayOrders = last7DaysOrders.filter(
        (o) => o.createdAt.toISOString().slice(0, 10) === dateStr
      );
      revenueByDay.push({
        date: dateStr,
        revenue: dayOrders.reduce((sum, o) => sum + Number(o.total), 0),
        orders: dayOrders.length,
      });
    }

    // Resolve top selling product names
    const topProductIds = topSellingItems.map((t) => t.productId);
    const topProductsData = topProductIds.length
      ? await prisma.product.findMany({
          where: { id: { in: topProductIds } },
          select: { id: true, name: true, stock: true },
        })
      : [];
    const topProducts = topSellingItems.map((t) => {
      const product = topProductsData.find((p) => p.id === t.productId);
      return {
        name: product?.name || "Unknown",
        unitsSold: t._sum.quantity || 0,
        stock: product?.stock ?? 0,
      };
    });

    return NextResponse.json({
      stats: {
        totalOrders,
        todayOrders,
        pendingOrders,
        totalProducts,
        lowStockProducts,
        totalRevenue: Number(totalRevenue._sum.total || 0),
        todayRevenue: Number(todayRevenue._sum.total || 0),
        pendingReviews,
      },
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        status: o.status,
        total: Number(o.total),
        customerName: o.user?.name || o.user?.email || o.guestEmail || "Guest",
        itemCount: o.items.length,
        createdAt: o.createdAt,
      })),
      revenueByDay,
      topProducts,
      lowStockDetails,
    });
  } catch (error) {
    console.error("Dashboard data fetch failed:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
