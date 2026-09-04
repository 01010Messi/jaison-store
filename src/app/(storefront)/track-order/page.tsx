"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Package, ArrowLeft, Search } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";

interface TrackedOrder {
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  total: number;
  trackingNumber: string | null;
  trackingUrl: string | null;
  invoiceUrl: string | null;
  estimatedDelivery: string | null;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
  shippingAddress: { fullName: string; city: string; state: string; pincode: string };
}

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-sky-100 text-sky-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  RETURNED: "bg-gray-100 text-gray-800",
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  useEffect(() => {
    const fromUrl = searchParams.get("order");
    if (fromUrl) setOrderNumber(fromUrl);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrder(data.order);
      } else {
        setError(data.message || "Order not found.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] md:min-h-screen">
      <div className="bg-surface-warm py-8 md:py-12">
        <div className="container-brand">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-accent uppercase tracking-wider text-bark/72 hover:text-bark transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl text-bark">
            Track Your Order
          </h1>
          <p className="text-sm text-bark/72 font-body mt-2 max-w-md">
            No account needed — enter your order number and the email you
            checked out with.
          </p>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Order Number"
            placeholder="e.g. JH-2026-00123"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && (
            <p className="text-xs text-terracotta font-body">{error}</p>
          )}
          <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Track Order
            </span>
          </Button>
        </form>

        {order && (
          <div className="mt-8 bg-cream border border-border rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <p className="font-accent text-sm font-semibold text-bark">
                  #{order.orderNumber}
                </p>
                <p className="text-xs text-bark/72 font-body mt-0.5">
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

            <div className="space-y-2 mb-4">
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

            <div className="pt-3 border-t border-border text-sm text-bark/70 font-body">
              <p className="flex items-center gap-2 mb-1">
                <Package className="h-4 w-4 text-terracotta flex-shrink-0" />
                Shipping to {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
                {order.shippingAddress.pincode}
              </p>
              {order.trackingNumber && (
                <p className="mt-2">
                  Tracking number:{" "}
                  <span className="text-bark font-medium">{order.trackingNumber}</span>
                </p>
              )}
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs font-accent uppercase tracking-wider text-terracotta hover:text-terracotta/80 transition-colors"
                >
                  Track Shipment →
                </a>
              )}
              {order.invoiceUrl && (
                <a
                  href={order.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-xs font-accent uppercase tracking-wider text-bark/72 hover:text-bark transition-colors"
                >
                  Download Invoice
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={null}>
      <TrackOrderContent />
    </Suspense>
  );
}
