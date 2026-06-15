"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Plus } from "lucide-react";
import QtyStepper from "@/components/ui/QtyStepper";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import Drawer from "@/components/ui/Drawer";
import { products } from "@/data/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, addItem } =
    useCartStore();

  const total = subtotal();

  // Cross-sell: find up to 3 products not already in cart, preferring same category
  const cartSlugs = new Set(items.map((i) => i.slug));
  const dominantCategorySlug =
    items.length > 0
      ? (products.find((p) => items.some((i) => i.slug === p.slug))?.categorySlug ?? "skin-care")
      : "skin-care";
  const suggestions = products
    .filter((p) => !cartSlugs.has(p.slug) && p.categorySlug !== "combos")
    .sort((a, b) => {
      const aMatch = a.categorySlug === dominantCategorySlug ? 1 : 0;
      const bMatch = b.categorySlug === dominantCategorySlug ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    })
    .slice(0, 3);

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title="Your Potli" side="right">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center">
          {/* Icon in parchment circle */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-7"
            style={{ backgroundColor: "var(--color-parchment)" }}
          >
            <ShoppingBag
              className="h-6 w-6"
              style={{ color: "rgba(26,60,52,0.32)" }}
            />
          </div>

          {/* Eyebrow */}
          <p
            className="font-accent text-[9px] tracking-[0.22em] uppercase mb-3"
            style={{ color: "rgba(26,60,52,0.38)" }}
          >
            Your ritual awaits
          </p>

          {/* Heading */}
          <h3
            className="font-heading font-light leading-snug mb-3"
            style={{ fontSize: "1.6rem", color: "var(--color-bark)" }}
          >
            The potli is empty.
          </h3>

          {/* Body */}
          <p
            className="font-body text-sm leading-relaxed mb-9"
            style={{ color: "rgba(26,60,52,0.48)", maxWidth: "210px" }}
          >
            Amla, neem, shikakai — each herb a ritual. Start yours.
          </p>

          {/* Primary CTA pill */}
          <Link href="/shop" onClick={closeCart}>
            <button
              className="inline-flex items-center px-8 py-3 rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
              style={{ backgroundColor: "var(--color-bark)", color: "var(--color-cream)" }}
            >
              Explore Collection
            </button>
          </Link>

          {/* Secondary ghost link */}
          <Link
            href="/find-your-ritual"
            onClick={closeCart}
            className="mt-4 font-accent text-[10px] tracking-[0.12em] uppercase"
            style={{ color: "rgba(26,60,52,0.38)" }}
          >
            Find your ritual →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 pb-4 border-b"
                style={{ borderColor: "rgba(26,60,52,0.08)" }}
              >
                {/* Image */}
                <div className="relative w-20 h-24 overflow-hidden shrink-0 rounded-lg"
                  style={{ backgroundColor: "var(--color-parchment)" }}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6" style={{ color: "rgba(26,60,52,0.2)" }} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={closeCart}
                    className="font-heading text-sm line-clamp-2 transition-colors"
                    style={{ color: "var(--color-bark)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-terracotta)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-bark)")}
                  >
                    {item.name}
                  </Link>
                  <p
                    className="font-body font-medium text-sm mt-1"
                    style={{ color: "var(--color-bark)" }}
                  >
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Quantity stepper */}
                    <QtyStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(next) => updateQuantity(item.productId, next)}
                      min={0}
                      max={item.stock}
                      className="rounded-full overflow-hidden border border-bark/15"
                    />

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-1 transition-colors"
                      style={{ color: "rgba(26,60,52,0.25)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-terracotta)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,60,52,0.25)")}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-sell */}
          {suggestions.length > 0 && (
            <div
              className="px-6 py-4"
              style={{ borderTop: "1px solid rgba(26,60,52,0.08)" }}
            >
              <p
                className="font-accent text-[9px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "rgba(26,60,52,0.38)" }}
              >
                You may also like
              </p>
              <div className="space-y-2.5">
                {suggestions.map((p) => (
                  <div key={p.slug} className="flex items-center gap-3">
                    <Link href={`/shop/${p.slug}`} onClick={closeCart}>
                      <div
                        className="w-12 h-12 rounded-lg overflow-hidden shrink-0"
                        style={{ backgroundColor: "var(--color-parchment)" }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/${p.slug}`} onClick={closeCart}>
                        <p
                          className="font-heading text-xs leading-snug truncate"
                          style={{ color: "var(--color-bark)" }}
                        >
                          {p.name}
                        </p>
                      </Link>
                      <p
                        className="font-body text-xs mt-0.5"
                        style={{ color: "rgba(26,60,52,0.5)" }}
                      >
                        {formatPrice(p.price)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          id: p.sku,
                          productId: p.sku,
                          name: p.name,
                          slug: p.slug,
                          price: p.price,
                          image: p.image,
                          stock: 50,
                          quantity: 1,
                        })
                      }
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "var(--color-bark)", color: "var(--color-cream)" }}
                      aria-label={`Add ${p.name} to cart`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div
            className="px-6 py-5 space-y-4"
            style={{ borderTop: "1px solid rgba(26,60,52,0.1)" }}
          >
            {/* Subtotal row */}
            <div className="flex items-baseline justify-between">
              <span
                className="font-accent text-[10px] tracking-[0.18em] uppercase"
                style={{ color: "rgba(26,60,52,0.45)" }}
              >
                Subtotal
              </span>
              <span
                className="font-heading font-light"
                style={{ fontSize: "1.35rem", color: "var(--color-bark)" }}
              >
                {formatPrice(total)}
              </span>
            </div>

            <p
              className="font-body text-xs"
              style={{ color: "rgba(26,60,52,0.38)" }}
            >
              Shipping & taxes calculated at checkout
            </p>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <Link href="/checkout" onClick={closeCart} className="block">
                <button
                  className="w-full py-3.5 rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
                  style={{ backgroundColor: "var(--color-bark)", color: "var(--color-cream)" }}
                >
                  Proceed to Checkout
                </button>
              </Link>
              <Link href="/cart" onClick={closeCart} className="block">
                <button
                  className="w-full py-3 rounded-full font-accent text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
                  style={{
                    backgroundColor: "transparent",
                    color: "rgba(26,60,52,0.5)",
                    border: "1px solid rgba(26,60,52,0.15)",
                  }}
                >
                  View Potli
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
