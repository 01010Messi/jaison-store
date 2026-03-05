"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import Drawer from "@/components/ui/Drawer";
import Button from "@/components/ui/Button";
import GoldRule from "@/components/decorative/GoldRule";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCartStore();

  const total = subtotal();

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title="Your Cart" side="right">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-6 text-center">
          <ShoppingBag className="h-12 w-12 text-bark/20 mb-4" />
          <p className="font-heading text-xl text-bark mb-2">
            Your cart is empty
          </p>
          <p className="text-sm text-bark/50 font-body mb-6">
            Discover our collection of natural herbal products
          </p>
          <Link href="/shop" onClick={closeCart}>
            <Button variant="primary" size="md">
              Shop Now
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 pb-4 border-b border-border-light">
                {/* Image */}
                <div className="relative w-20 h-24 bg-parchment rounded-sm overflow-hidden shrink-0">
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

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={closeCart}
                    className="font-heading text-sm text-bark hover:text-terracotta transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="price-display text-sm mt-1">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-border rounded-sm">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="p-1.5 text-bark/50 hover:text-bark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-sm font-body font-medium text-bark min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className="p-1.5 text-bark/50 hover:text-bark transition-colors disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-1 text-bark/30 hover:text-terracotta transition-colors"
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
          <div className="border-t border-border px-6 py-5 space-y-4">
            <GoldRule variant="diamond" width="w-full" />

            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-bark/70">Subtotal</span>
              <span className="font-heading text-lg text-bark">
                {formatPrice(total)}
              </span>
            </div>

            <p className="text-xs text-bark/50 font-body">
              Shipping & taxes calculated at checkout
            </p>

            <div className="space-y-2">
              <Link href="/checkout" onClick={closeCart}>
                <Button variant="primary" fullWidth size="lg">
                  Checkout
                </Button>
              </Link>
              <Link href="/cart" onClick={closeCart}>
                <Button variant="ghost" fullWidth size="sm">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
