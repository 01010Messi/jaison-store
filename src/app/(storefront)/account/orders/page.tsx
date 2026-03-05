"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Package, ArrowLeft, ShoppingBag } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import Button from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  trackingUrl?: string;
  invoiceUrl?: string;
  createdAt: string;
  items: OrderItem[];
}

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-sky-100 text-sky-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchOrders();
  }, [status, router, fetchOrders]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-8 md:py-12">
        <div className="container-brand">
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-xs font-accent uppercase tracking-wider text-bark/40 hover:text-bark transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            My Account
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl text-bark">
            My Orders
          </h1>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        {orders.length === 0 ? (
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="h-12 w-12 text-bark/15 mb-4" />
              <h2 className="font-heading text-xl text-bark mb-2">
                No orders yet
              </h2>
              <p className="text-sm text-bark/50 font-body mb-6 max-w-sm">
                When you place your first order, it will appear here with
                tracking information.
              </p>
              <GoldRule variant="simple" width="w-16" className="mb-6" />
              <Link href="/shop">
                <Button variant="primary">
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Start Shopping
                  </span>
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <ScrollReveal key={order.id} animation="fade-up">
                <div className="bg-cream border border-border rounded-sm p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-accent text-sm font-semibold text-bark">
                        #{order.orderNumber}
                      </h3>
                      <p className="text-xs text-bark/40 font-body mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-[10px] font-accent uppercase tracking-wider px-2.5 py-1 rounded-full",
                          statusColors[order.status] || "bg-gray-100 text-gray-800"
                        )}
                      >
                        {order.status}
                      </span>
                      <span className="font-heading text-lg text-terracotta">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm text-bark/70 font-body"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {(order.trackingUrl || order.invoiceUrl) && (
                    <div className="flex gap-3 mt-4 pt-3 border-t border-border">
                      {order.trackingUrl && (
                        <a
                          href={order.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-accent uppercase tracking-wider text-terracotta hover:text-terracotta/80 transition-colors"
                        >
                          Track Order
                        </a>
                      )}
                      {order.invoiceUrl && (
                        <a
                          href={order.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-accent uppercase tracking-wider text-bark/50 hover:text-bark transition-colors"
                        >
                          Download Invoice
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
