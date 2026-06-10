"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import Drawer from "@/components/ui/Drawer";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCartStore();

  const total = subtotal();

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title="Your Potli" side="right">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center">
          {/* Icon in parchment circle */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-7"
            style={{ backgroundColor: "#EFE4C5" }}
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
            style={{ fontSize: "1.6rem", color: "#1A3C34" }}
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
              style={{ backgroundColor: "#1A3C34", color: "#FEFAE0" }}
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
                  style={{ backgroundColor: "#EFE4C5" }}
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
                    style={{ color: "#1A3C34" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#834316")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1A3C34")}
                  >
                    {item.name}
                  </Link>
                  <p
                    className="font-body font-medium text-sm mt-1"
                    style={{ color: "#1A3C34" }}
                  >
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Quantity stepper */}
                    <div
                      className="flex items-center rounded-full overflow-hidden"
                      style={{ border: "1px solid rgba(26,60,52,0.15)" }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="px-2.5 py-1 transition-colors"
                        style={{ color: "rgba(26,60,52,0.45)" }}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span
                        className="px-2 text-sm font-body font-medium min-w-[24px] text-center"
                        style={{ color: "#1A3C34" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className="px-2.5 py-1 transition-colors disabled:opacity-30"
                        style={{ color: "rgba(26,60,52,0.45)" }}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-1 transition-colors"
                      style={{ color: "rgba(26,60,52,0.25)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#834316")}
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
                style={{ fontSize: "1.35rem", color: "#1A3C34" }}
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
                  style={{ backgroundColor: "#1A3C34", color: "#FEFAE0" }}
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
