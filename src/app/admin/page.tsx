"use client";

import { useEffect, useState, useCallback } from "react";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Clock,
  AlertTriangle,
  Star,
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
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(data.stats);
      setRecentOrders(data.recentOrders || []);
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-bark">Dashboard</h1>
        <p className="text-sm text-bark/50 font-body mt-1">
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
                <span className="text-xs font-accent uppercase tracking-wider text-bark/40">
                  {stat.label}
                </span>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="font-heading text-2xl text-bark">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="font-heading text-lg text-bark mb-1">
            Recent Orders
          </h2>
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
                    <p className="text-xs text-bark/40 font-body">
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
                        statusColors[order.status] || "text-bark/40"
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

        {/* Quick info */}
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="font-heading text-lg text-bark mb-1">Quick Info</h2>
          <GoldRule variant="simple" width="w-12" className="mb-4" />

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-sage/5 rounded-sm">
              <IndianRupee className="h-4 w-4 text-sage" />
              <div>
                <p className="text-sm font-heading text-bark">Total Revenue</p>
                <p className="text-xs text-bark/40 font-body">
                  {formatPrice(stats?.totalRevenue || 0)} lifetime
                </p>
              </div>
            </div>
            {(stats?.lowStockProducts || 0) > 0 && (
              <div className="flex items-center gap-3 p-3 bg-terracotta/5 rounded-sm">
                <AlertTriangle className="h-4 w-4 text-terracotta" />
                <div>
                  <p className="text-sm font-heading text-bark">
                    Low Stock Alert
                  </p>
                  <p className="text-xs text-bark/40 font-body">
                    {stats?.lowStockProducts} product
                    {stats?.lowStockProducts !== 1 ? "s" : ""} with less than 5
                    units
                  </p>
                </div>
              </div>
            )}
            {(stats?.pendingReviews || 0) > 0 && (
              <div className="flex items-center gap-3 p-3 bg-gold/5 rounded-sm">
                <Star className="h-4 w-4 text-gold" />
                <div>
                  <p className="text-sm font-heading text-bark">
                    Pending Reviews
                  </p>
                  <p className="text-xs text-bark/40 font-body">
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
                <p className="text-xs text-bark/40 font-body">
                  {stats?.todayOrders || 0} orders placed today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
