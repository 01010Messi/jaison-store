"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Clock,
  AlertTriangle,
  Star,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { formatPrice, cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface DashboardStats {
  totalOrders: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalRevenue: number;
  todayRevenue: number;
  pendingReviews: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  customerName: string;
  itemCount: number;
  createdAt: string;
}

interface RevenueDay {
  date: string;
  revenue: number;
  orders: number;
}

interface TopProduct {
  name: string;
  unitsSold: number;
  stock: number;
}

interface LowStockProduct {
  name: string;
  stock: number;
  slug: string;
}

const statusColors: Record<string, string> = {
  PENDING: "text-amber-600",
  CONFIRMED: "text-blue-600",
  PROCESSING: "text-purple-600",
  SHIPPED: "text-sky-600",
  DELIVERED: "text-green-600",
  CANCELLED: "text-red-600",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [revenueByDay, setRevenueByDay] = useState<RevenueDay[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [lowStockDetails, setLowStockDetails] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(data.stats);
      setRecentOrders(data.recentOrders || []);
      setRevenueByDay(data.revenueByDay || []);
      setTopProducts(data.topProducts || []);
      setLowStockDetails(data.lowStockDetails || []);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Today's Revenue",
      value: formatPrice(stats?.todayRevenue || 0),
      icon: IndianRupee,
      color: "text-sage",
    },
    {
      label: "Total Orders",
      value: String(stats?.totalOrders || 0),
      icon: ShoppingCart,
      color: "text-terracotta",
    },
    {
      label: "Pending Orders",
      value: String(stats?.pendingOrders || 0),
      icon: Clock,
      color: "text-gold",
    },
    {
      label: "Total Products",
      value: String(stats?.totalProducts || 0),
      icon: Package,
      color: "text-bark",
    },
  ];

  const maxRevenue = Math.max(...revenueByDay.map((d) => d.revenue), 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-bark">Dashboard</h1>
        <p className="text-sm text-bark/60 font-body mt-1">
          Welcome to the jaison admin panel
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-cream p-5 rounded-sm border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-accent uppercase tracking-wider text-bark/60">
                  {stat.label}
                </span>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="font-heading text-2xl text-bark">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart - Last 7 Days */}
        <div className="lg:col-span-2 bg-cream p-5 rounded-sm border border-border/50">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-heading text-lg text-bark">Revenue — Last 7 Days</h2>
            <BarChart3 className="h-4 w-4 text-bark/30" />
          </div>
          <GoldRule variant="simple" width="w-12" className="mb-4" />

          {revenueByDay.length > 0 ? (
            <div className="flex items-end gap-2 h-40">
              {revenueByDay.map((day) => {
                const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
                const dayLabel = new Date(day.date + "T12:00:00").toLocaleDateString("en-IN", {
                  weekday: "short",
                });
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-accent text-bark/60">
                      {day.revenue > 0 ? formatPrice(day.revenue) : ""}
                    </span>
                    <div className="w-full relative flex justify-center" style={{ height: "100px" }}>
                      <div
                        className={cn(
                          "w-full max-w-[40px] rounded-t-sm transition-all",
                          day.revenue > 0 ? "bg-terracotta/70" : "bg-parchment"
                        )}
                        style={{
                          height: `${Math.max(height, 4)}%`,
                          position: "absolute",
                          bottom: 0,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-accent text-bark/60 uppercase">
                      {dayLabel}
                    </span>
                    <span className="text-[9px] font-body text-bark/30">
                      {day.orders} order{day.orders !== 1 ? "s" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-bark/30">
              <p className="text-xs font-accent uppercase tracking-wider">No data yet</p>
            </div>
          )}
        </div>

        {/* Top Selling Products */}
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-heading text-lg text-bark">Top Products</h2>
            <TrendingUp className="h-4 w-4 text-bark/30" />
          </div>
          <GoldRule variant="simple" width="w-12" className="mb-4" />

          {topProducts.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-bark/30">
              <p className="text-xs font-accent uppercase tracking-wider">No sales yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta text-[10px] font-accent flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body text-bark truncate">{product.name}</p>
                    <p className="text-[10px] text-bark/60 font-body">
                      {product.unitsSold} sold &bull; {product.stock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-heading text-lg text-bark">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-[10px] font-accent uppercase tracking-wider text-terracotta hover:text-terracotta/80 transition-colors"
            >
              View All
            </Link>
          </div>
          <GoldRule variant="simple" width="w-12" className="mb-4" />

          {recentOrders.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-bark/30">
              <div className="text-center">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-accent uppercase tracking-wider">
                  No orders yet
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-parchment/20 rounded-sm"
                >
                  <div>
                    <p className="text-sm font-accent font-semibold text-bark">
                      #{order.orderNumber}
                    </p>
                    <p className="text-xs text-bark/60 font-body">
                      {order.customerName} &bull; {order.itemCount} item
                      {order.itemCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-sm text-terracotta">
                      {formatPrice(order.total)}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-accent uppercase tracking-wider",
                        statusColors[order.status] || "text-bark/60"
                      )}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick info + Low Stock Details */}
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="font-heading text-lg text-bark mb-1">Quick Info</h2>
          <GoldRule variant="simple" width="w-12" className="mb-4" />

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-sage/5 rounded-sm">
              <IndianRupee className="h-4 w-4 text-sage" />
              <div>
                <p className="text-sm font-heading text-bark">Total Revenue</p>
                <p className="text-xs text-bark/60 font-body">
                  {formatPrice(stats?.totalRevenue || 0)} lifetime
                </p>
              </div>
            </div>

            {(stats?.pendingReviews || 0) > 0 && (
              <div className="flex items-center gap-3 p-3 bg-gold/5 rounded-sm">
                <Star className="h-4 w-4 text-gold" />
                <div>
                  <p className="text-sm font-heading text-bark">
                    Pending Reviews
                  </p>
                  <p className="text-xs text-bark/60 font-body">
                    {stats?.pendingReviews} review
                    {stats?.pendingReviews !== 1 ? "s" : ""} awaiting moderation
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-sage/5 rounded-sm">
              <ShoppingCart className="h-4 w-4 text-sage" />
              <div>
                <p className="text-sm font-heading text-bark">
                  Today&apos;s Orders
                </p>
                <p className="text-xs text-bark/60 font-body">
                  {stats?.todayOrders || 0} orders placed today
                </p>
              </div>
            </div>
          </div>

          {/* Low Stock Details */}
          {lowStockDetails.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-terracotta" />
                <h3 className="text-xs font-accent uppercase tracking-wider text-bark/60">
                  Low Stock ({lowStockDetails.length})
                </h3>
              </div>
              <div className="space-y-2">
                {lowStockDetails.map((product) => (
                  <div
                    key={product.slug}
                    className="flex items-center justify-between p-2 bg-terracotta/5 rounded-sm"
                  >
                    <Link
                      href={`/admin/products`}
                      className="text-sm font-body text-bark hover:text-terracotta transition-colors truncate mr-2"
                    >
                      {product.name}
                    </Link>
                    <span
                      className={cn(
                        "text-xs font-accent font-semibold shrink-0",
                        product.stock === 0
                          ? "text-red-600"
                          : "text-amber-600"
                      )}
                    >
                      {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
