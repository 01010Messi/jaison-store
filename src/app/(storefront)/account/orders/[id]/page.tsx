"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  CreditCard,
  Download,
  ExternalLink,
  ShoppingBag,
  Calendar,
  Hash,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import GoldRule from "@/components/decorative/GoldRule";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import Button from "@/components/ui/Button";

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

const STATUS_STEPS = [
  { key: "PENDING", label: "Placed", icon: ShoppingBag },
  { key: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
  { key: "PROCESSING", label: "Processing", icon: Package },
  { key: "SHIPPED", label: "Shipped", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
] as const;

const STATUS_BADGE: Record<string, { pill: string; label: string }> = {
  PENDING: { pill: "bg-parchment text-bark/85", label: "Pending" },
  CONFIRMED: { pill: "bg-sage/10 text-sage", label: "Confirmed" },
  PROCESSING: { pill: "bg-terracotta/10 text-terracotta", label: "Processing" },
  SHIPPED: { pill: "bg-bark/10 text-bark", label: "Shipped" },
  DELIVERED: { pill: "bg-sage/20 text-sage-dark", label: "Delivered" },
  CANCELLED: { pill: "bg-red-50 text-red-700", label: "Cancelled" },
  RETURNED: { pill: "bg-parchment text-bark/85", label: "Returned" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
        else setError(data.message || "Order not found");
      })
      .catch(() => setError("Failed to load order"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-bark/20 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <Package className="h-12 w-12 text-bark/15 mb-4" aria-hidden="true" />
        <p className="text-sm font-body text-bark/72">{error || "Order not found"}</p>
        <Link
          href="/account/orders"
          className="mt-4 text-[11px] font-accent uppercase tracking-[0.18em] text-terracotta hover:text-terracotta-dark transition-colors"
        >
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
  const isCancelled = order.status === "CANCELLED" || order.status === "RETURNED";
  const badge = STATUS_BADGE[order.status] ?? { pill: "bg-parchment text-bark/72", label: order.status };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-surface-warm border-b border-border">
        <div className="container-brand py-8 md:py-10">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-[11px] font-accent uppercase tracking-[0.18em] text-bark/72 hover:text-bark transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-bark">
                Order #{order.orderNumber}
              </h1>
              <p className="text-xs font-body text-bark/72 mt-1">
                Placed {formatDate(order.createdAt)}
              </p>
            </div>
            <span
              className={`self-start sm:self-auto inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-accent uppercase tracking-[0.18em] ${badge.pill}`}
            >
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        {/* Status Timeline */}
        {!isCancelled && (
          <ScrollReveal animation="fade-up">
            <div className="bg-surface-warm border border-border rounded-xl p-5 md:p-6 mb-8">
              <p className="text-[11px] font-accent uppercase tracking-[0.22em] text-bark/72 mb-5">
                Order Progress
              </p>
              <div className="flex items-start">
                {STATUS_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStepIndex;
                  const isActive = idx === currentStepIndex;
                  const isLast = idx === STATUS_STEPS.length - 1;

                  return (
                    <div key={step.key} className="flex items-start flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-bark text-cream ring-2 ring-bark/20 ring-offset-2"
                              : isCompleted
                              ? "bg-sage/15 text-sage"
                              : "bg-parchment text-bark/60"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span
                          className={`hidden sm:block text-[9px] font-accent uppercase tracking-wider text-center leading-tight ${
                            isCompleted ? "text-bark/85" : "text-bark/72"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {!isLast && (
                        <div
                          className={`h-[1px] flex-1 mx-2 mt-[18px] ${
                            idx < currentStepIndex ? "bg-sage/40" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Cancelled / Returned notice */}
        {isCancelled && (
          <ScrollReveal animation="fade-up">
            <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-8 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <Package className="h-4 w-4 text-red-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-heading text-red-800">
                  This order has been{" "}
                  {order.status === "RETURNED" ? "returned" : "cancelled"}
                </p>
                <p className="text-xs font-body text-red-600/70 mt-0.5">
                  For refund queries, write to jaisonskincare@gmail.com
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items + price breakdown */}
          <ScrollReveal animation="fade-up" className="lg:col-span-2">
            <div>
              <p className="text-[11px] font-accent uppercase tracking-[0.22em] text-bark/72 mb-4">
                Items Ordered
              </p>

              <div className="divide-y divide-border-light">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0">
                    <div className="w-16 h-20 rounded-xl bg-parchment overflow-hidden shrink-0 relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-bark/20" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-base text-bark leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs font-body text-bark/72 mt-1">
                        {formatPrice(item.price)} &times; {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-body font-medium text-bark shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="space-y-2.5 text-sm font-body">
                  <div className="flex justify-between text-bark/72">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bark/72">Shipping</span>
                    {order.shippingCost === 0 ? (
                      <span className="text-[11px] font-accent uppercase tracking-wider text-sage">
                        Free
                      </span>
                    ) : (
                      <span className="text-bark/72">{formatPrice(order.shippingCost)}</span>
                    )}
                  </div>
                  {order.codFee > 0 && (
                    <div className="flex justify-between text-bark/72">
                      <span>COD Fee</span>
                      <span>{formatPrice(order.codFee)}</span>
                    </div>
                  )}
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sage">
                      <span>
                        Discount
                        {order.couponCode ? ` (${order.couponCode})` : ""}
                      </span>
                      <span>&minus;{formatPrice(order.discount)}</span>
                    </div>
                  )}
                </div>
                <GoldRule variant="diamond" width="w-full" className="my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="font-heading text-base text-bark">Total</span>
                  <span className="font-heading text-xl text-bark">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Address, payment, shipping, actions */}
          <ScrollReveal animation="fade-up" delay={80} className="space-y-4">
            {/* Shipping Address */}
            <div className="bg-surface-warm border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-3.5 w-3.5 text-terracotta shrink-0" aria-hidden="true" />
                <h3 className="text-[11px] font-accent uppercase tracking-[0.22em] text-bark/72">
                  Shipping Address
                </h3>
              </div>
              <p className="font-heading text-base text-bark">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-xs font-body text-bark/72 mt-1.5 leading-relaxed">
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 && (
                  <>, {order.shippingAddress.addressLine2}</>
                )}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                &mdash; {order.shippingAddress.pincode}
                {order.shippingAddress.landmark && (
                  <>
                    <br />
                    Near: {order.shippingAddress.landmark}
                  </>
                )}
                <br />
                {order.shippingAddress.phone}
              </p>
            </div>

            {/* Payment */}
            <div className="bg-surface-warm border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-3.5 w-3.5 text-terracotta shrink-0" aria-hidden="true" />
                <h3 className="text-[11px] font-accent uppercase tracking-[0.22em] text-bark/72">
                  Payment
                </h3>
              </div>
              <p className="text-sm font-body text-bark">
                {order.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : "Online (Razorpay)"}
              </p>
              <p className="text-xs font-body mt-0.5">
                <span className="text-bark/72">Status: </span>
                <span
                  className={
                    order.paymentStatus === "PAID"
                      ? "text-sage"
                      : order.paymentStatus === "REFUNDED"
                      ? "text-terracotta"
                      : order.paymentStatus === "FAILED"
                      ? "text-red-600"
                      : "text-bark/72"
                  }
                >
                  {order.paymentStatus === "PAID"
                    ? "Paid"
                    : order.paymentStatus === "REFUNDED"
                    ? "Refunded"
                    : order.paymentStatus === "FAILED"
                    ? "Failed"
                    : "Pending"}
                </span>
              </p>
            </div>

            {/* Tracking / Estimated delivery */}
            {(order.trackingNumber || order.estimatedDelivery) && (
              <div className="bg-surface-warm border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-3.5 w-3.5 text-terracotta shrink-0" aria-hidden="true" />
                  <h3 className="text-[11px] font-accent uppercase tracking-[0.22em] text-bark/72">
                    Shipping Details
                  </h3>
                </div>
                {order.trackingNumber && (
                  <div className="flex items-start gap-2 mb-3">
                    <Hash className="h-3.5 w-3.5 text-bark/30 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[10px] font-accent uppercase tracking-wider text-bark/72">
                        AWB / Tracking No.
                      </p>
                      <p className="text-xs font-body text-bark font-medium mt-0.5 break-all">
                        {order.trackingNumber}
                      </p>
                    </div>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-3.5 w-3.5 text-bark/30 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[10px] font-accent uppercase tracking-wider text-bark/72">
                        Expected by
                      </p>
                      <p className="text-xs font-body text-bark font-medium mt-0.5">
                        {formatDate(order.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            {(order.trackingUrl || order.invoiceUrl) && (
              <div className="space-y-2.5 pt-1">
                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="sm" fullWidth>
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      Track Shipment
                    </Button>
                  </a>
                )}
                {order.invoiceUrl && (
                  <a
                    href={order.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" fullWidth>
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Download Invoice
                    </Button>
                  </a>
                )}
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
