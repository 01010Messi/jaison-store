"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    image: string;
    category: string;
    stock: number;
    averageRating?: number;
    reviewCount?: number;
  };
  index?: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock <= 0) {
      toast.error("Out of stock");
      return;
    }

    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
    openCart();
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block product-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-product overflow-hidden rounded-sm bg-parchment mb-3 product-card-border border border-transparent transition-colors duration-500">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover product-card-image transition-transform duration-700 ease-out-expo"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Sale badge */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="absolute top-2 left-2 bg-terracotta text-cream text-[10px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Sale
          </span>
        )}

        {/* Out of stock overlay */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-cream/60 flex items-center justify-center">
            <span className="font-accent text-xs uppercase tracking-wider text-bark/70 bg-cream/80 px-3 py-1 rounded-sm">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick add overlay */}
        {product.stock > 0 && (
          <button
            onClick={handleQuickAdd}
            className="product-card-overlay absolute bottom-0 left-0 right-0 p-3 bg-cream/90 backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-accent uppercase tracking-wider text-bark">
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <p className="section-label text-sage/70 mb-1">{product.category}</p>
      <GoldRule variant="simple" width="w-8" className="mb-1.5" />
      <h3 className="font-heading text-base md:text-lg text-bark product-card-name transition-colors duration-300 leading-snug">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <p className="price-display text-sm">{formatPrice(product.price)}</p>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <p className="text-xs text-bark/40 line-through font-body">
            {formatPrice(product.compareAtPrice)}
          </p>
        )}
      </div>
    </Link>
  );
}
