"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/data/products";

const featuredProducts = getFeaturedProducts();

const skinSlugs = [
  "ubtan-powder",
  "neem-powder",
  "multani-mitti",
  "orange-peel-powder",
  "nagarmotha-powder",
  "rose-petal-powder",
];
const hairSlugs = [
  "amla-powder",
  "aamla-powder",
  "bhringraj-powder",
  "mehendi-powder",
  "reetha-powder",
  "shikakai-powder",
];

type FilterTab = "all" | "skin" | "hair";

export default function FeaturedProducts() {
  const [filter, setFilter] = useState<FilterTab>("all");

  const filtered = featuredProducts.filter((p) => {
    if (filter === "skin") return skinSlugs.includes(p.slug);
    if (filter === "hair") return hairSlugs.includes(p.slug);
    return true;
  });

  return (
    <section className="py-16 md:py-24">
      <div className="container-brand">
        {/* Header row: title left, filter tabs right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-accent text-[10px] tracking-widest uppercase text-bark/40 mb-1">
              Bestsellers
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-bark">
              Our Powders
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-bark text-cream rounded-full px-3 py-1 text-[11px] font-accent tracking-widest"
                  : "border border-bark/20 text-bark/50 rounded-full px-3 py-1 text-[11px] font-accent tracking-widest hover:border-bark/40 transition-colors"
              }
            >
              All Powders
            </button>
            <button
              onClick={() => setFilter("skin")}
              className={
                filter === "skin"
                  ? "bg-bark text-cream rounded-full px-3 py-1 text-[11px] font-accent tracking-widest"
                  : "border border-bark/20 text-bark/50 rounded-full px-3 py-1 text-[11px] font-accent tracking-widest hover:border-bark/40 transition-colors"
              }
            >
              Skin Care
            </button>
            <button
              onClick={() => setFilter("hair")}
              className={
                filter === "hair"
                  ? "bg-bark text-cream rounded-full px-3 py-1 text-[11px] font-accent tracking-widest"
                  : "border border-bark/20 text-bark/50 rounded-full px-3 py-1 text-[11px] font-accent tracking-widest hover:border-bark/40 transition-colors"
              }
            >
              Hair Care
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.slug}
              product={{
                id: product.sku,
                name: product.name,
                slug: product.slug,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                image: product.image,
                images: product.images,
                category: product.category,
                stock: 50,
              }}
            />
          ))}
        </div>

        {/* View full catalogue CTA */}
        <div className="flex justify-center mt-10 mb-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-10 py-3.5 border border-bark rounded-full font-accent text-[11px] tracking-[0.2em] uppercase text-bark hover:bg-bark hover:text-cream transition-all duration-200"
          >
            VIEW THE FULL CATALOGUE
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
