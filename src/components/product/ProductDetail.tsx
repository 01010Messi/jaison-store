"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  Truck,
  Shield,
  Leaf,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { products } from "@/data/products";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import OrnamentalBorder from "@/components/decorative/OrnamentalBorder";
import ProductCard from "@/components/product/ProductCard";
import SocialShare from "@/components/ui/SocialShare";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { Product } from "@/data/products";

type TabKey = "description" | "ingredients" | "how-to-use" | "benefits";

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "Description" },
  { key: "ingredients", label: "Ingredients" },
  { key: "how-to-use", label: "How to Use" },
  { key: "benefits", label: "Benefits" },
];

const trustBadges = [
  { icon: Truck, label: "Free shipping above ₹499" },
  { icon: Shield, label: "Cash on Delivery available" },
  { icon: Leaf, label: "100% Natural & Pure" },
];

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const handleAddToCart = () => {
    addItem({
      id: product.sku,
      productId: product.sku,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      stock: 50,
      quantity,
    });
    setAddedToCart(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAddedToCart(false), 2000);
    openCart();
  };

  const handleBuyNow = () => {
    addItem({
      id: product.sku,
      productId: product.sku,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      stock: 50,
      quantity,
    });
    toast.success("Proceeding to checkout...");
    openCart();
  };

  const goToPrevImage = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  }, [allImages.length]);

  const goToNextImage = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  }, [allImages.length]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevImage, goToNextImage]);

  const relatedProducts = products
    .filter(
      (p) =>
        p.categorySlug === product.categorySlug && p.slug !== product.slug
    )
    .slice(0, 4);

  const tabContent: Record<TabKey, string> = {
    description: product.description,
    ingredients: product.ingredients,
    "how-to-use": product.howToUse,
    benefits: product.benefits,
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-surface-warm">
        <div className="container-brand py-3">
          <nav className="flex items-center gap-1.5 text-xs font-accent text-bark/40">
            <Link href="/" className="hover:text-bark transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shop" className="hover:text-bark transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/shop?category=${product.categorySlug}`}
              className="hover:text-bark transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-bark/70">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="container-brand py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Image Gallery */}
          <ScrollReveal animation="fade-up">
            <div className="relative">
              {/* Main image */}
              <OrnamentalBorder variant="simple" className="p-2 md:p-3">
                <div
                  ref={imageContainerRef}
                  className="relative aspect-square overflow-hidden rounded-sm bg-parchment cursor-crosshair"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  {allImages.map((img, i) => (
                    <Image
                      key={img}
                      src={img}
                      alt={`${product.name}${i > 0 ? ` - view ${i + 1}` : ""}`}
                      fill
                      className={cn(
                        "object-cover transition-all duration-500 ease-out",
                        i === activeImageIndex
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-[1.02]",
                        isZoomed && i === activeImageIndex && "scale-150"
                      )}
                      style={
                        isZoomed && i === activeImageIndex
                          ? {
                              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            }
                          : undefined
                      }
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  ))}

                  {/* Arrow navigation on main image */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          goToPrevImage();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center text-bark/60 hover:text-bark hover:bg-cream transition-all duration-300 opacity-0 group-hover:opacity-100 hover:opacity-100 shadow-warm"
                        style={{ opacity: 1 }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          goToNextImage();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center text-bark/60 hover:text-bark hover:bg-cream transition-all duration-300 opacity-0 group-hover:opacity-100 hover:opacity-100 shadow-warm"
                        style={{ opacity: 1 }}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {/* Image counter */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-cream/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="font-accent text-[11px] text-bark/60 tracking-wider">
                          {activeImageIndex + 1} / {allImages.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </OrnamentalBorder>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setActiveImageIndex(i)}
                      className={cn(
                        "relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border-2 transition-all duration-300",
                        i === activeImageIndex
                          ? "border-gold shadow-gold ring-1 ring-gold/20"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Weight badge */}
              <div className="absolute top-6 right-6 md:top-7 md:right-7 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-sm">
                <span className="font-accent text-[11px] uppercase tracking-wider text-bark/60">
                  {product.weight}g
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="flex flex-col">
              <Link
                href={`/shop?category=${product.categorySlug}`}
                className="section-label text-sage hover:text-sage/80 transition-colors mb-2 w-fit"
              >
                {product.category}
              </Link>

              <GoldRule variant="simple" width="w-12" className="mb-3" />

              <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl text-bark font-light tracking-wide leading-tight">
                {product.name}
              </h1>

              <p className="mt-3 text-bark/60 font-body text-sm md:text-base leading-relaxed">
                {product.shortDescription}
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-heading text-2xl md:text-3xl text-terracotta">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-bark/40 font-accent uppercase tracking-wider">
                  Incl. of all taxes
                </span>
              </div>

              <GoldRule variant="diamond" width="w-full" className="my-6" />

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center border border-border rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-bark/50 hover:text-bark transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2.5 font-accent text-sm text-bark min-w-[3rem] text-center border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3 py-2.5 text-bark/50 hover:text-bark transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-accent text-sm uppercase tracking-wider transition-all duration-300",
                    addedToCart
                      ? "bg-sage text-cream"
                      : "bg-bark text-cream hover:bg-bark-light active:translate-y-px"
                  )}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="mt-3 flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-accent text-sm uppercase tracking-wider bg-terracotta text-cream hover:bg-terracotta-dark active:translate-y-px transition-all duration-300"
              >
                <Zap className="h-4 w-4" />
                Buy Now
              </button>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="flex items-center gap-2 text-xs text-bark/50 font-body"
                    >
                      <Icon className="h-4 w-4 text-sage flex-shrink-0" />
                      {badge.label}
                    </div>
                  );
                })}
              </div>

              {/* Social Share */}
              <div className="mt-6 pt-5 border-t border-border">
                <SocialShare
                  url={`https://jaisonskincare.com/shop/${product.slug}`}
                  title={product.name}
                  description={product.shortDescription}
                  image={product.image}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="bg-surface-warm py-12 md:py-16">
        <div className="container-brand">
          <ScrollReveal animation="fade-up">
            <div className="flex overflow-x-auto scrollbar-hide border-b border-border gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex-shrink-0 px-4 md:px-6 py-3 font-accent text-xs uppercase tracking-wider transition-all duration-300 relative",
                    activeTab === tab.key
                      ? "text-terracotta"
                      : "text-bark/40 hover:text-bark/70"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta transition-all duration-300" />
                  )}
                </button>
              ))}
            </div>

            <div className="py-8 md:py-10 max-w-3xl">
              {activeTab === "benefits" ? (
                <ul className="space-y-2">
                  {tabContent[activeTab].split("\n").map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-bark/70 font-body text-sm leading-relaxed"
                    >
                      <Check className="h-4 w-4 text-sage mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  {tabContent[activeTab].split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-bark/70 font-body text-sm md:text-base leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-brand">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-10">
                <p className="section-label text-sage mb-3">
                  You May Also Like
                </p>
                <h2 className="font-heading text-2xl md:text-3xl text-bark">
                  Related Products
                </h2>
                <div className="flex justify-center mt-3">
                  <GoldRule variant="simple" width="w-16" />
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((rp, index) => (
                <ScrollReveal
                  key={rp.slug}
                  animation="fade-up"
                  delay={index * 80}
                >
                  <ProductCard
                    product={{
                      id: rp.sku,
                      name: rp.name,
                      slug: rp.slug,
                      price: rp.price,
                      image: rp.image,
                      images: rp.images,
                      category: rp.category,
                      stock: 50,
                    }}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
