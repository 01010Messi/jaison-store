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
];
const hairSlugs = [
  "amla-powder",
  "aamla-powder",
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
    <section className="bg-cream pt-8 md:pt-10 pb-10">
      <div className="container-brand">
        {/* Header row: copy left, filter pills right (aligned to bottom) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          {/* Left column — copy */}
          <div className="flex-1 min-w-0 max-w-2xl">
            <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/72 mb-3">
              — THE CATALOGUE · NINE POWDERS
            </p>
            <h2 className="font-heading text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
              If nature had a
              <span className="block">skincare lab,</span>
              <span className="block" style={{ color: "var(--color-terracotta)", fontStyle: "italic", fontWeight: 300 }}>
                this would be it.
              </span>
            </h2>
            <p className="font-body text-sm md:text-base text-bark/72 max-w-md mt-4">
              Nine pure herbal powders for face, skin and hair —
              neem, multani mitti, ubtan, amla and more. Single herbs in every pouch.
              Nothing synthetic, nothing added.
            </p>
          </div>

          {/* Right column — filter pills, aligned to bottom */}
          <div className="flex items-center lg:self-end shrink-0">
            <div className="flex items-center border border-bark/25 rounded-full p-1 gap-0.5">
              <button
                onClick={() => setFilter("all")}
                className={
                  filter === "all"
                    ? "bg-bark text-cream rounded-full px-4 py-1.5 text-[10px] font-accent tracking-[0.12em] uppercase transition-colors"
                    : "text-bark/72 rounded-full px-4 py-1.5 text-[10px] font-accent tracking-[0.12em] uppercase hover:text-bark transition-colors"
                }
              >
                All Powders
              </button>
              <button
                onClick={() => setFilter("skin")}
                className={
                  filter === "skin"
                    ? "bg-bark text-cream rounded-full px-4 py-1.5 text-[10px] font-accent tracking-[0.12em] uppercase transition-colors"
                    : "text-bark/72 rounded-full px-4 py-1.5 text-[10px] font-accent tracking-[0.12em] uppercase hover:text-bark transition-colors"
                }
              >
                Face &amp; Skin
              </button>
              <button
                onClick={() => setFilter("hair")}
                className={
                  filter === "hair"
                    ? "bg-bark text-cream rounded-full px-4 py-1.5 text-[10px] font-accent tracking-[0.12em] uppercase transition-colors"
                    : "text-bark/72 rounded-full px-4 py-1.5 text-[10px] font-accent tracking-[0.12em] uppercase hover:text-bark transition-colors"
                }
              >
                Hair
              </button>
            </div>
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
