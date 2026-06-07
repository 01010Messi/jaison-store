"use client";

import { useState, useMemo } from "react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { cn } from "@/lib/utils";

const skinCareSlugs = new Set([
  "ubtan-powder", "neem-powder", "multani-mitti",
  "orange-peel-powder", "nagarmotha-powder", "rose-petal-powder",
]);
const hairCareSlugs = new Set([
  "amla-powder", "aamla-powder", "mehendi-powder",
  "reetha-powder", "bhringraj-powder", "shikakai-powder",
]);

type Filter = "all" | "skin" | "hair";

const allFeatured = getFeaturedProducts();

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "ALL POWDERS" },
  { key: "skin", label: "FACE & SKIN" },
  { key: "hair", label: "HAIR" },
];

export default function HomeCatalogue() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "skin") return allFeatured.filter((p) => skinCareSlugs.has(p.slug));
    if (activeFilter === "hair") return allFeatured.filter((p) => hairCareSlugs.has(p.slug));
    return allFeatured;
  }, [activeFilter]);

  return (
    <>
      {/* Catalogue intro — no image, just headline + filter */}
      <section className="w-full">
        <div className="bg-surface px-6 pt-10 pb-8 md:pt-14 md:pb-10">
          <p className="font-accent text-[10px] md:text-xs uppercase tracking-widest text-bark/50 mb-5">
            THE CATALOGUE · NINE POWDERS
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-heading text-5xl md:text-7xl text-bark font-light leading-[1.1] mb-2">
                If nature had
                <br />
                a skincare lab,
                <br />
                <span className="italic" style={{ color: "#A0885C" }}>this would be it.</span>
              </h1>

              <p className="font-body text-bark/60 text-sm md:text-base max-w-lg mt-5 mb-7">
                Nine single-ingredient herbal powders for face, skin and hair — neem, multani mitti, ubtan, amla and more. One herb per jar. Nothing synthetic, nothing added.
              </p>

            </div>

            {/* Filter pills — bottom-right of intro */}
            <div className="flex items-center gap-1 bg-bark/10 rounded-full p-1 self-start md:self-end md:mb-1 flex-shrink-0">
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={cn(
                    "px-4 py-1.5 text-[11px] font-accent tracking-widest rounded-full transition-colors whitespace-nowrap",
                    activeFilter === key
                      ? "bg-bark text-cream"
                      : "text-bark/60 hover:text-bark"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="pt-4 pb-12 md:pb-20">
        <div className="container-brand">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((product, index) => (
              <ScrollReveal key={product.slug} animation="fade-up" delay={index * 80} className="h-full">
                <ProductCard
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
                  index={index}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
