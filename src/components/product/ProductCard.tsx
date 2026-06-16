"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

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
    tags?: string[];
  };
  index?: number;
}

const cardBgColors: Record<string, string> = {
  "ubtan-powder": "#F5E6C8",
  "neem-powder": "#D4E8D0",
  "multani-mitti": "#F0D9CC",
  "orange-peel-powder": "#FCE8CC",
  "nagarmotha-powder": "#E8DCC8",
  "mehendi-powder": "#D8E8C8",
  "rose-petal-powder": "#F5D8DC",
  "amla-powder": "#D4E8D0",
  "aamla-powder": "#D4E8D0",
  "reetha-powder": "#EDE0D4",
  "bhringraj-powder": "#C8D8C0",
  "shikakai-powder": "#E8DCC8",
};

const accentColors: Record<string, string> = {
  "ubtan-powder": "#C17A3A",
  "neem-powder": "#4A7C59",
  "multani-mitti": "#B85C38",
  "orange-peel-powder": "#C86820",
  "nagarmotha-powder": "#7A6040",
  "mehendi-powder": "#4A7020",
  "rose-petal-powder": "#B84060",
  "amla-powder": "#4A7C59",
  "aamla-powder": "#4A7C59",
  "reetha-powder": "#8B4020",
  "bhringraj-powder": "#2D5A30",
  "shikakai-powder": "#8B6020",
};

const botanicalNames: Record<string, string> = {
  "ubtan-powder": "Curcuma longa + 7 herbs",
  "neem-powder": "Azadirachta indica",
  "multani-mitti": "Calcium bentonite clay",
  "orange-peel-powder": "Citrus sinensis peel",
  "nagarmotha-powder": "Cyperus rotundus",
  "mehendi-powder": "Lawsonia inermis",
  "rose-petal-powder": "Rosa centifolia",
  "amla-powder": "Phyllanthus emblica",
  "aamla-powder": "Phyllanthus emblica",
  "reetha-powder": "Sapindus mukorossi",
  "bhringraj-powder": "Eclipta prostrata",
  "shikakai-powder": "Acacia concinna",
};

const categoryLabels: Record<string, string> = {
  "ubtan-powder": "Skin Care",
  "neem-powder": "Skin Care",
  "multani-mitti": "Skin Care",
  "orange-peel-powder": "Skin Care",
  "nagarmotha-powder": "Skin Care",
  "rose-petal-powder": "Skin Care",
  "amla-powder": "Hair Care",
  "aamla-powder": "Hair Care",
  "mehendi-powder": "Hair Care",
  "reetha-powder": "Hair Care",
  "bhringraj-powder": "Hair Care",
  "shikakai-powder": "Hair Care",
};

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const bg = cardBgColors[product.slug] ?? "var(--color-parchment)";
  const accent = accentColors[product.slug] ?? "var(--color-terracotta)";
  const botanical = botanicalNames[product.slug] ?? "";
  const category = categoryLabels[product.slug] ?? product.category;
  const badge =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? `${Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF`
      : null;
  const isBestseller = product.tags?.includes("bestseller") ?? false;

  const handleAddToPotli = (e: React.MouseEvent) => {
    e.preventDefault();
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      style={{ backgroundColor: bg }}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative w-full aspect-square overflow-hidden">
          {badge && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 text-[9px] font-accent tracking-widest uppercase bg-bark text-cream rounded-full">
              {badge}
            </span>
          )}
          {isBestseller && (
            <span
              className="absolute top-3 right-3 z-10 px-2.5 py-0.5 text-[9px] font-accent tracking-widest uppercase rounded-full"
              style={{ backgroundColor: "var(--color-terracotta)", color: "var(--color-cream)" }}
            >
              Bestseller
            </span>
          )}
          <Image
            src={product.images?.[0] ?? product.image}
            alt={`${product.name} — 100% natural Ayurvedic ${product.category.toLowerCase()} powder | Jaison Herbals`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-0.5 flex-1 min-h-[120px]">
        <span
          className="text-[10px] font-accent tracking-widest uppercase"
          style={{ color: accent }}
        >
          {category}
        </span>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-heading text-base leading-snug text-bark hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] italic text-bark/60 truncate">{botanical}</p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-base text-bark">
              ₹{product.price}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-bark/60 line-through">
                ₹{product.compareAtPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToPotli}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: accent, color: "white" }}
            aria-label="Add to potli"
          >
            {added ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
