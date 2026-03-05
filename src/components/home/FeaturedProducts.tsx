"use client";

import Link from "next/link";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/data/products";

const featuredProducts = getFeaturedProducts();

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-brand">
        <ScrollReveal animation="fade-up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label text-sage mb-3">Bestsellers</p>
              <h2 className="font-heading text-3xl md:text-4xl text-bark">
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:block gold-underline font-body text-sm text-bark/70 hover:text-bark transition-colors pb-1"
            >
              View All Products
            </Link>
          </div>
        </ScrollReveal>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ScrollReveal
              key={product.slug}
              animation="fade-up"
              delay={index * 80}
            >
              <ProductCard
                product={{
                  id: product.sku,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  stock: 50,
                }}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile "View All" link */}
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
