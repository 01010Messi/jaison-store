"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { cn } from "@/lib/utils";

const skinCareSlugs = new Set([
  "neem-powder", "multani-mitti", "orange-peel-powder",
  "nagarmotha-powder", "ubtan-powder", "rose-petal-powder",
]);
const hairCareSlugs = new Set([
  "amla-powder", "aamla-powder", "mehendi-powder",
  "reetha-powder", "bhringraj-powder",
]);

type Filter = "all" | "skin" | "hair";

const allFeatured = getFeaturedProducts().filter(
  (p) => p.slug !== "shikakai-powder"
);

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "skin") return allFeatured.filter((p) => skinCareSlugs.has(p.slug));
    if (activeFilter === "hair") return allFeatured.filter((p) => hairCareSlugs.has(p.slug));
    return allFeatured;
  }, [activeFilter]);

  return (
    <section className="py-12 md:py-20">
      <div className="container-brand">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="section-label text-sage mb-2">Bestsellers</p>
              <h2 className="font-heading text-3xl md:text-4xl text-bark">
                Featured Products
              </h2>
            </div>

            {/* Segmented filter control */}
            <div className="flex items-center gap-1 bg-bark/10 rounded-full p-1 self-start md:self-auto">
              <button
                onClick={() => setActiveFilter(activeFilter === "skin" ? "all" : "skin")}
                className={cn(
                  "px-4 py-1.5 text-xs font-accent tracking-widest uppercase rounded-full transition-all duration-200",
                  activeFilter === "skin"
                    ? "bg-bark text-cream"
                    : "text-bark/60 hover:text-bark"
                )}
              >
                FACE &amp; SKIN
              </button>
              <button
                onClick={() => setActiveFilter(activeFilter === "hair" ? "all" : "hair")}
                className={cn(
                  "px-4 py-1.5 text-xs font-accent tracking-widest uppercase rounded-full transition-all duration-200",
                  activeFilter === "hair"
                    ? "bg-bark text-cream"
                    : "text-bark/60 hover:text-bark"
                )}
              >
                HAIR
              </button>
            </div>

            <Link
              href="/shop"
              className="hidden md:block gold-underline font-body text-sm text-bark/70 hover:text-bark transition-colors pb-1"
            >
              View All Products
            </Link>
          </div>
        </ScrollReveal>

        {/* Product grid — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product, index) => (
            <ScrollReveal key={product.slug} animation="fade-up" delay={index * 80}>
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

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/shop"
            className="gold-underline font-body text-sm text-bark/70 hover:text-bark transition-colors pb-1"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
