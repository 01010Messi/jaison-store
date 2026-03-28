"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart-store";
import { getFeaturedProducts } from "@/data/products";
import toast from "react-hot-toast";

const featuredProducts = getFeaturedProducts();

export default function FeaturedProducts() {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const handleBuyNow = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.sku,
      productId: product.sku,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      stock: 50,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
    router.push("/checkout");
  };

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
              <div>
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
                <button
                  onClick={() => handleBuyNow(product)}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-bark text-cream text-xs font-accent uppercase tracking-wider rounded-sm hover:bg-bark/90 transition-colors"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Buy Now
                </button>
              </div>
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
