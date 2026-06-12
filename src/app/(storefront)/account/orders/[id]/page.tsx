"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Check,
  Truck,
  MapPin,
  CreditCard,
  Download,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import GoldRule from "@/components/decorative/GoldRule";

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  shippingCost: number;
  codFee: number;
  discount: number;
  total: number;
  couponCode: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  invoiceUrl: string | null;
  estimatedDelivery: string | null;
  createdAt: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string | null;
  }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    pincode: string;
    landmark: string | null;
  };
}

const statusSteps = [
  { key: "PENDING", label: "Placed", icon: ShoppingBag },
  { key: "CONFIRMED", label: "Confirmed", icon: Check },
  { key: "PROCESSING", label: "Processing", icon: Package },
  { key: "SHIPPED", label: "Shipped", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: Check },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-sky-100 text-sky-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  RETURNED: "bg-gray-100 text-gray-800",
};

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.order) {
          setOrder(data.order);
        } else {
          setError(data.message || "Order not found");
        }
      })
      .catch(() => setError("Failed to load order"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-bark/20 border-t-bark rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <Package className="h-12 w-12 text-bark/15 mb-4" />
        <p className="text-bark/60 font-body">{error || "Order not found"}</p>
        <Link
          href="/account/orders"
          className="mt-4 text-terracotta text-sm font-accent uppercase tracking-wider"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.key === order.status
  );
  const isCancelled = order.status === "CANCELLED" || order.status === "RETURNED";

  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-6 md:py-8">
        <div className="container-brand">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1 text-xs font-accent uppercase tracking-wider text-bark/60 hover:text-bark transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Orders
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="font-heading text-2xl text-bark">
                Order #{order.orderNumber}
              </h1>
              <p className="text-xs text-bark/60 font-body mt-1">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-accent uppercase tracking-wider ${
                statusColors[order.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        {/* Status Timeline */}
        {!isCancelled && (
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {statusSteps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= currentStepIndex;
                const isActive = idx === currentStepIndex;

                return (
                  <div key={step.key} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted
                            ? isActive
                              ? "bg-bark text-cream"
                              : "bg-sage/20 text-sage"
                            : "bg-parchment text-bark/20"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <p
                        className={`text-[10px] font-accent uppercase tracking-wider mt-1.5 ${
                          isCompleted ? "text-bark" : "text-bark/30"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {idx < statusSteps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 mt-[-16px] ${
                          idx < currentStepIndex ? "bg-sage/30" : "bg-parchment"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-lg text-bark mb-4">Items</h2>
            <div className="space-y-0">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 border-b border-border-light"
                >
                  <div className="w-16 h-20 bg-parchment rounded-xl overflow-hidden shrink-0 relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-bark/20">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-heading text-bark">
                      {item.name}
                    </p>
                    <p className="text-xs text-bark/60 font-body mt-0.5">
                      Qty: {item.quantity} &times; {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-body font-medium text-bark">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 pt-4">
              <GoldRule variant="simple" width="w-full" className="mb-4" />
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between text-bark/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sage">
                    <span>
                      Discount{order.couponCode ? ` (${order.couponCode})` : ""}
                    </span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-bark/60">
                  <span>Shipping</span>
                  <span>
                    {order.shippingCost === 0 ? (
                      <span className="text-sage">Free</span>
                    ) : (
                      formatPrice(order.shippingCost)
                    )}
                  </span>
                </div>
                {order.codFee > 0 && (
                  <div className="flex justify-between text-bark/60">
                    <span>COD Fee</span>
                    <span>{formatPrice(order.codFee)}</span>
                  </div>
                )}
              </div>
              <GoldRule variant="diamond" width="w-full" className="my-4" />
              <div className="flex justify-between items-baseline">
                <span className="font-heading text-bark">Total</span>
                <span className="font-heading text-xl text-bark">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-surface-warm p-5 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-bark/60" />
                <h3 className="text-xs font-accent uppercase tracking-wider text-bark/60">
                  Shipping Address
                </h3>
              </div>
              <p className="text-sm font-heading text-bark">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-xs text-bark/60 font-body mt-1 leading-relaxed">
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 && (
                  <>, {order.shippingAddress.addressLine2}</>
                )}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
                {order.shippingAddress.pincode}
                <br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            {/* Payment Info */}
            <div className="bg-surface-warm p-5 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-4 w-4 text-bark/60" />
                <h3 className="text-xs font-accent uppercase tracking-wider text-bark/60">
                  Payment
                </h3>
              </div>
              <p className="text-sm font-body text-bark">
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : "Paid Online (Razorpay)"}
              </p>
              <p className="text-xs text-bark/60 font-body mt-0.5">
                Status:{" "}
                <span
                  className={
                    order.paymentStatus === "PAID"
                      ? "text-sage"
                      : "text-amber-600"
                  }
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>

            {/* Estimated Delivery */}
            {order.estimatedDelivery && (
              <div className="bg-surface-warm p-5 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4 text-bark/60" />
                  <h3 className="text-xs font-accent uppercase tracking-wider text-bark/60">
                    Estimated Delivery
                  </h3>
                </div>
                <p className="text-sm font-heading text-bark">
                  {order.estimatedDelivery}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-bark text-cream rounded-full text-xs font-accent uppercase tracking-wider hover:bg-bark/90 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Track Shipment
                </a>
              )}
              {order.invoiceUrl && (
                <a
                  href={order.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-border rounded-full text-xs font-accent uppercase tracking-wider text-bark/70 hover:border-bark hover:text-bark transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Invoice
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
