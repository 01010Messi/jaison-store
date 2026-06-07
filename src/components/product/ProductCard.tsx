"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

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

const textColors: Record<string, string> = {
  "ubtan-powder":       "text-[#7A5C2E]",
  "neem-powder":        "text-[#2D5A3D]",
  "multani-mitti":      "text-[#8B4A3C]",
  "orange-peel-powder": "text-[#8B5A1E]",
  "nagarmotha-powder":  "text-[#5A4A7A]",
  "mehendi-powder":     "text-[#3D5A2D]",
  "rose-petal-powder":  "text-[#7A3A5A]",
  "amla-powder":        "text-[#2D5A3D]",
  "aamla-powder":       "text-[#2D5A3D]",
  "reetha-powder":      "text-[#8B4A6A]",
  "bhringraj-powder":   "text-[#3D5A2D]",
  "shikakai-powder":    "text-[#6B4A2E]",
};

const buttonColors: Record<string, string> = {
  "ubtan-powder":       "bg-[#A0885C] hover:bg-[#8A7346]",
  "neem-powder":        "bg-[#3D6B4A] hover:bg-[#2D5A3D]",
  "multani-mitti":      "bg-[#A0604A] hover:bg-[#8B4A3C]",
  "orange-peel-powder": "bg-[#C47830] hover:bg-[#A06020]",
  "nagarmotha-powder":  "bg-[#7A5AAA] hover:bg-[#5A4A7A]",
  "mehendi-powder":     "bg-[#5A7A3A] hover:bg-[#3D5A2D]",
  "rose-petal-powder":  "bg-[#9A4A7A] hover:bg-[#7A3A5A]",
  "amla-powder":        "bg-[#3D6B4A] hover:bg-[#2D5A3D]",
  "aamla-powder":       "bg-[#3D6B4A] hover:bg-[#2D5A3D]",
  "reetha-powder":      "bg-[#9A5A8A] hover:bg-[#7A3A6A]",
  "bhringraj-powder":   "bg-[#5A7A3A] hover:bg-[#3D5A2D]",
  "shikakai-powder":    "bg-[#8B6A3A] hover:bg-[#6B4A2E]",
};

const cardColors: Record<string, string> = {
  "ubtan-powder": "bg-card-ubtan",
  "neem-powder": "bg-card-neem",
  "multani-mitti": "bg-card-multani",
  "orange-peel-powder": "bg-card-orange",
  "nagarmotha-powder": "bg-card-nagarmotha",
  "mehendi-powder": "bg-card-mehendi",
  "rose-petal-powder": "bg-card-rose",
  "amla-powder": "bg-card-neem",
  "aamla-powder": "bg-card-neem",
  "reetha-powder": "bg-card-orange",
  "bhringraj-powder": "bg-card-bhringraj",
  "shikakai-powder": "bg-card-ubtan",
};

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
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const cardColor = cardColors[product.slug] ?? "bg-parchment";
  const textColor = textColors[product.slug] ?? "text-bark";
  const buttonColor = buttonColors[product.slug] ?? "bg-bark hover:bg-bark/85";
  const botanicalName = botanicalNames[product.slug] ?? "";

  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : null;

  const handleAddToPotli = (e: React.MouseEvent) => {
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

    setAdded(true);
    toast.success(`${product.name} added to potli ✓`);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/shop/${product.slug}`} className="group block h-full">
      <div className={`relative rounded-2xl overflow-hidden ${cardColor} flex flex-col h-full`}>
        {/* Badge top left */}
        {discountPct && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 text-[10px] font-accent tracking-widest uppercase bg-bark text-cream rounded-full">
            {discountPct}% OFF
          </span>
        )}

        {/* Out of stock overlay */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-cream/60 flex items-center justify-center z-10">
            <span className="font-accent text-xs uppercase tracking-wider text-bark/70 bg-cream/80 px-3 py-1 rounded-full">
              Sold Out
            </span>
          </div>
        )}

        {/* Image */}
        <div className="w-full aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 px-4 pt-3 pb-4 flex-1 min-h-[120px]">
          <span className={`text-[10px] font-accent tracking-widest uppercase ${textColor}`}>
            {product.category}
          </span>
          <h3 className={`font-heading text-lg leading-tight line-clamp-2 ${textColor}`}>
            {product.name}
          </h3>
          {botanicalName && (
            <p className={`font-body text-xs italic opacity-50 ${textColor}`}>{botanicalName}</p>
          )}
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center gap-2">
              <span className={`font-heading text-xl ${textColor}`}>
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className={`text-sm opacity-40 line-through font-body ${textColor}`}>
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            {product.stock > 0 && (
              <button
                onClick={handleAddToPotli}
                className={`w-9 h-9 rounded-full text-cream flex items-center justify-center transition-colors ${buttonColor}`}
                aria-label="Add to potli"
              >
                {added ? (
                  <span className="text-[10px] font-accent">✓</span>
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
