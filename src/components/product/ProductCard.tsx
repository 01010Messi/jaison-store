"use client";

import { useState, useCallback, useRef } from "react";
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
    images?: string[];
    category: string;
    stock: number;
    averageRating?: number;
    reviewCount?: number;
  };
  index?: number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const allImages =
    product.images && product.images.length > 1
      ? product.images
      : [product.image];

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (allImages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 1500);
  }, [allImages.length]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0);
  }, []);

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
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative aspect-product overflow-hidden rounded-sm bg-parchment mb-3 border border-transparent transition-all duration-700 ease-out group-hover:border-gold/50 group-hover:shadow-warm">
        {allImages.map((img, i) => (
          <Image
            key={img}
            src={img}
            alt={`${product.name}${i > 0 ? ` - view ${i + 1}` : ""}`}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              i === currentImageIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.03]"
            } ${isHovered && i === currentImageIndex ? "scale-[1.05]" : ""}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={i === 0}
          />
        ))}

        {/* Image dots indicator */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {allImages.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  i === currentImageIndex
                    ? "bg-gold w-4"
                    : "bg-cream/50 w-1.5"
                }`}
              />
            ))}
          </div>
        )}

        {/* Sale badge */}
        {product.compareAtPrice &&
          product.compareAtPrice > product.price && (
            <span className="absolute top-2 left-2 bg-terracotta text-cream text-[10px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-sm z-10">
              {Math.round((1 - product.price / product.compareAtPrice) * 100)}% Off
            </span>
          )}

        {/* Out of stock overlay */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-cream/60 flex items-center justify-center z-10">
            <span className="font-accent text-xs uppercase tracking-wider text-bark/70 bg-cream/80 px-3 py-1 rounded-sm">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick add overlay */}
        {product.stock > 0 && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 p-3 bg-cream/90 backdrop-blur-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out cursor-pointer z-10"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-accent uppercase tracking-wider text-bark">
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <p className="section-label text-sage/70 mb-1 transition-colors duration-500">
        {product.category}
      </p>
      <GoldRule variant="simple" width="w-8" className="mb-1.5" />
      <h3 className="font-heading text-base md:text-lg text-bark transition-colors duration-500 group-hover:text-sage-dark leading-snug">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <p className="price-display text-sm">{formatPrice(product.price)}</p>
        {product.compareAtPrice &&
          product.compareAtPrice > product.price && (
            <p className="text-xs text-bark/40 line-through font-body">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
      </div>
    </Link>
  );
}
