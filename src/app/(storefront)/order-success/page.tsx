"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ShoppingBag, ArrowRight, Package } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import Button from "@/components/ui/Button";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "";
  const total = searchParams.get("total") || "";
  const method = searchParams.get("method") || "";

  useEffect(() => {
    if (!orderNumber) return;

    // Fire GA4 purchase event
    if (GA_MEASUREMENT_ID && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "purchase", {
        transaction_id: orderNumber,
        value: parseFloat(total) || 0,
        currency: "INR",
        payment_type: method,
      });
    }

    // Fire Meta Pixel Purchase event
    if (META_PIXEL_ID && typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: parseFloat(total) || 0,
        currency: "INR",
        content_type: "product",
      });
    }
  }, [orderNumber, total, method]);

  if (!orderNumber) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-bark/15 mb-6" />
        <h1 className="font-heading text-2xl text-bark mb-3">
          No order found
        </h1>
        <p className="text-sm text-bark/50 font-body mb-6">
          It looks like you haven&apos;t placed an order yet.
        </p>
        <Link href="/shop">
          <Button variant="primary" size="md">
            Shop Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Meta Pixel noscript fallback for Purchase event */}
      {META_PIXEL_ID && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=Purchase&noscript=1`}
            alt=""
          />
        </noscript>
      )}

      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-sage" />
          </div>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl text-bark mb-3">
          Order Confirmed!
        </h1>

        <div className="flex justify-center mt-1 mb-4">
          <GoldRule variant="leaf" width="w-20" />
        </div>

        <p className="text-bark/60 font-body text-sm mb-2 max-w-md leading-relaxed">
          Thank you for your order. We&apos;ll send you a confirmation email
          with your order details and tracking information shortly.
        </p>

        <div className="bg-surface-warm border border-border rounded-sm px-6 py-4 mt-4 mb-8">
          <p className="text-[10px] font-accent uppercase tracking-[0.15em] text-bark/40 mb-1">
            Order Number
          </p>
          <p className="font-heading text-xl text-bark tracking-wide">
            {orderNumber}
          </p>
          {total && (
            <p className="text-xs text-bark/50 font-body mt-1">
              Total: ₹{parseFloat(total).toLocaleString("en-IN")} &middot;{" "}
              {method === "COD" ? "Cash on Delivery" : "Paid Online"}
            </p>
          )}
        </div>

        {/* What happens next */}
        <div className="max-w-md w-full mb-8">
          <div className="flex items-center gap-3 text-left py-3 border-b border-border/50">
            <Package className="h-5 w-5 text-terracotta flex-shrink-0" />
            <div>
              <p className="text-xs font-accent uppercase tracking-wider text-bark/60">
                What happens next?
              </p>
              <p className="text-xs text-bark/50 font-body mt-0.5 leading-relaxed">
                We&apos;ll pack your order with care and ship it within 1-2
                business days. Estimated delivery: 5-7 business days.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/shop">
            <Button variant="primary" size="md">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button variant="ghost" size="md">
              <span className="flex items-center gap-1.5">
                Track Order
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-bark/20 border-t-bark rounded-full animate-spin" />
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
