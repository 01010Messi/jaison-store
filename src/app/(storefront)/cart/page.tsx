"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Tag, ArrowRight, Truck } from "lucide-react";
import QtyStepper from "@/components/ui/QtyStepper";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart, couponCode: appliedCoupon, discount, setCoupon, clearCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const total = subtotal();
  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total - discount + shipping;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput, orderAmount: total }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setCoupon(couponInput.toUpperCase(), data.discount);
        setCouponInput("");
        toast.success(`Coupon applied! You save ${formatPrice(data.discount)}`);
      } else {
        toast.error(data.message || "Invalid coupon code");
      }
    } catch {
      toast.error("Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    clearCoupon();
    setCouponInput("");
    toast.success("Coupon removed");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-bark/15 mb-6" />
        <h1 className="font-heading text-2xl md:text-3xl text-bark mb-3">
          Your potli is empty
        </h1>
        <p className="text-bark/60 font-body text-sm mb-8 text-center max-w-md">
          Looks like you haven&apos;t added any of our natural herbal products
          to your potli yet.
        </p>
        <Link href="/shop">
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-surface-warm py-8 md:py-12">
        <div className="container-brand">
          <ScrollReveal animation="fade-up">
            <p className="section-label text-sage mb-2">The Potli</p>
            <h1 className="font-heading text-2xl md:text-3xl text-bark">
              Your Potli ({items.length} item{items.length !== 1 ? "s" : ""})
            </h1>
          </ScrollReveal>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-0">
            {/* Header - desktop */}
            <div className="hidden md:grid grid-cols-[1fr_120px_120px_40px] gap-4 pb-3 border-b border-border text-xs font-accent uppercase tracking-wider text-bark/60">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            {items.map((item) => (
              <div
                key={item.productId}
                className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_40px] gap-4 py-5 border-b border-border-light"
              >
                {/* Product info */}
                <div className="flex gap-4">
                  <div className="relative w-20 h-24 bg-parchment rounded-xl overflow-hidden shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-bark/20">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-heading text-sm text-bark hover:text-terracotta transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="price-display text-sm mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center md:justify-center">
                  <QtyStepper
                    size="sm"
                    value={item.quantity}
                    onChange={(next) => updateQuantity(item.productId, next)}
                    min={0}
                    max={item.stock}
                    className="rounded-full border border-border"
                  />
                </div>

                {/* Total */}
                <div className="flex items-center md:justify-end">
                  <span className="font-body font-semibold text-sm text-bark">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <div className="flex items-center">
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1 text-bark/30 hover:text-terracotta transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex items-center justify-between pt-6">
              <Link
                href="/shop"
                className="gold-underline font-body text-sm text-bark/60 hover:text-bark transition-colors pb-1"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  toast.success("Potli emptied");
                }}
                className="text-xs font-accent uppercase tracking-wider text-bark/60 hover:text-terracotta transition-colors"
              >
                Empty Potli
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface-warm p-6 rounded-xl border border-border/50 sticky top-24">
              <h2 className="font-heading text-lg text-bark mb-4">
                Order Summary
              </h2>
              <GoldRule variant="simple" width="w-full" className="mb-4" />

              {/* Free Shipping Progress */}
              <div className="mb-4 p-3 bg-cream rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-3.5 w-3.5 text-bark/60" />
                  {total >= 499 ? (
                    <p className="text-xs font-body text-sage font-medium">
                      You&apos;ve unlocked free shipping!
                    </p>
                  ) : (
                    <p className="text-xs font-body text-bark/60">
                      Add <span className="font-medium text-bark">{formatPrice(499 - total)}</span> more for free shipping
                    </p>
                  )}
                </div>
                <div className="h-1.5 bg-parchment rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      total >= 499 ? "bg-sage" : "bg-gold"
                    }`}
                    style={{ width: `${Math.min((total / 499) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-sage/10 px-3 py-2 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-sage" />
                      <span className="text-xs font-accent uppercase tracking-wider text-sage">
                        {appliedCoupon}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-bark/60 hover:text-terracotta transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="flex-1 px-3 py-2 border border-border rounded-full text-xs font-accent uppercase tracking-wider bg-cream focus:border-gold focus:ring-0 transition-colors placeholder:text-bark/30"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponInput.trim()}
                      className="px-4 py-2 bg-bark text-cream text-xs font-accent uppercase tracking-wider rounded-full hover:bg-bark/90 disabled:opacity-50 transition-all"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between text-bark/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sage">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-bark/60">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-sage">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-bark/60">
                    Free shipping on orders above ₹499
                  </p>
                )}
              </div>

              <GoldRule variant="diamond" width="w-full" className="my-4" />

              <div className="flex justify-between items-baseline mb-6">
                <span className="font-heading text-bark">Total</span>
                <span className="font-heading text-xl text-bark">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <Link href="/checkout">
                <Button variant="primary" fullWidth size="lg">
                  <span className="flex items-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>

              {/* Trust badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-bark/60 font-accent uppercase tracking-wider">
                <span>Secure Checkout</span>
                <span>&bull;</span>
                <span>COD Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
