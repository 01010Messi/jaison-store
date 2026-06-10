"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { products } from "@/data/products";
import { getBlogPostsForProduct } from "@/data/blog";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import ProductReviews from "@/components/product/ProductReviews";
import ProductStory from "@/components/product/ProductStory";
import ProductFAQ from "@/components/product/ProductFAQ";
import { getProductFaqs } from "@/data/productFaqs";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { Product } from "@/data/products";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0); // 0 = no zoom, 1-3 = zoom steps
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const panOffsetStartRef = useRef({ x: 0, y: 0 });
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<{
    serviceable: boolean;
    estimatedDays?: string;
    codAvailable?: boolean;
    message?: string;
  } | null>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // Load saved pincode
  useEffect(() => {
    const saved = localStorage.getItem("delivery-pincode");
    if (saved) setPincode(saved);
  }, []);

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
    toast.success(`${product.name} added to your potli`);
    setTimeout(() => setAddedToCart(false), 2000);
    openCart();
  };

  const checkPincode = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Enter a valid 6-digit PIN code");
      return;
    }
    setPincodeLoading(true);
    try {
      const res = await fetch("/api/shipping/check-serviceability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode }),
      });
      const data = await res.json();
      setPincodeResult(data);
      localStorage.setItem("delivery-pincode", pincode);
    } catch {
      toast.error("Failed to check delivery");
    } finally {
      setPincodeLoading(false);
    }
  };

  const resetView = useCallback(() => {
    setZoomLevel(0);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const goToPrevImage = useCallback(() => {
    resetView();
    setActiveImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  }, [allImages.length, resetView]);

  const goToNextImage = useCallback(() => {
    resetView();
    setActiveImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  }, [allImages.length, resetView]);

  // Pan handlers for dragging when zoomed
  const handlePanStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (zoomLevel === 0) return;
      e.preventDefault();
      setIsPanning(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      panStartRef.current = { x: clientX, y: clientY };
      panOffsetStartRef.current = { ...panOffset };
    },
    [zoomLevel, panOffset]
  );

  const handlePanMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isPanning) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const scale = 1 + zoomLevel * 0.5;
      const maxPan = ((scale - 1) / scale) * 50; // limit pan to zoomed area
      const dx = clientX - panStartRef.current.x;
      const dy = clientY - panStartRef.current.y;
      setPanOffset({
        x: Math.max(-maxPan, Math.min(maxPan, panOffsetStartRef.current.x + (dx / (imageContainerRef.current?.clientWidth || 1)) * 100)),
        y: Math.max(-maxPan, Math.min(maxPan, panOffsetStartRef.current.y + (dy / (imageContainerRef.current?.clientHeight || 1)) * 100)),
      });
    },
    [isPanning, zoomLevel]
  );

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "Escape") resetView();
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

  const relatedBlogPosts = getBlogPostsForProduct(product.slug);

  const faqs = getProductFaqs(product);

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
          <div className="relative">
            {/* Main image — thin warm border replacing OrnamentalBorder */}
            <div className="border border-[#E8D5B7] rounded-sm p-2 md:p-3">
              <div
                ref={imageContainerRef}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-sm bg-[#F5ECD7] select-none",
                  zoomLevel > 0 ? "cursor-grab" : "",
                  isPanning && "cursor-grabbing"
                )}
                onMouseDown={handlePanStart}
                onMouseMove={handlePanMove}
                onMouseUp={handlePanEnd}
                onMouseLeave={handlePanEnd}
                onTouchStart={handlePanStart}
                onTouchMove={handlePanMove}
                onTouchEnd={handlePanEnd}
              >
                {allImages.map((img, i) => (
                  <Image
                    key={img}
                    src={img}
                    alt={`${product.name}${i > 0 ? ` - view ${i + 1}` : ""}`}
                    fill
                    className={cn(
                      "object-contain",
                      isPanning ? "transition-none" : "transition-all duration-500 ease-out",
                      i === activeImageIndex
                        ? "opacity-100"
                        : "opacity-0 scale-[1.02]"
                    )}
                    style={
                      i === activeImageIndex
                        ? {
                            transform: `scale(${1 + zoomLevel * 0.5}) translate(${panOffset.x}%, ${panOffset.y}%)`,
                          }
                        : undefined
                    }
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                  />
                ))}

                {/* PHOTO pill badge — top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="font-accent text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(253,250,245,0.85)",
                      color: "#6B4226",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Photo
                  </span>
                </div>

                {/* Zoom +/- controls */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setZoomLevel((prev) => {
                        const next = Math.min(3, prev + 1);
                        if (next !== prev) setPanOffset({ x: 0, y: 0 });
                        return next;
                      });
                    }}
                    disabled={zoomLevel >= 3}
                    className="w-8 h-8 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center text-bark/60 hover:text-bark hover:bg-cream transition-all duration-300 shadow-warm disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setZoomLevel((prev) => {
                        const next = Math.max(0, prev - 1);
                        if (next === 0) setPanOffset({ x: 0, y: 0 });
                        return next;
                      });
                    }}
                    disabled={zoomLevel <= 0}
                    className="w-8 h-8 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center text-bark/60 hover:text-bark hover:bg-cream transition-all duration-300 shadow-warm disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                </div>

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

                    {/* Image counter — bottom-right */}
                    <div className="absolute bottom-3 right-3 z-10 bg-cream/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="font-accent text-[11px] text-bark/60 tracking-wider">
                        {activeImageIndex + 1} / {allImages.length}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(i)}
                    className={cn(
                      "relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border-2 transition-all duration-300 bg-parchment",
                      i === activeImageIndex
                        ? "border-gold shadow-gold ring-1 ring-gold/20"
                        : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - thumbnail ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* 1. Eyebrow — category */}
            <Link
              href={`/shop?category=${product.categorySlug}`}
              className="font-accent hover:opacity-70 transition-opacity w-fit"
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#6B4226",
              }}
            >
              {product.category}
            </Link>

            {/* 2. Product name */}
            <h1
              className="font-heading font-light mt-2"
              style={{
                fontSize: "clamp(40px, 5.5vw, 72px)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                color: "#1A3C34",
              }}
            >
              {product.name}
            </h1>

            {/* 3. Short description — italic pull-quote */}
            <p
              className="font-heading italic font-light mt-4"
              style={{
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.25,
                color: "#A56843",
              }}
            >
              {product.shortDescription}
            </p>

            {/* 4. WHAT'S INSIDE block */}
            <div
              className="mt-5 pl-4"
              style={{ borderLeft: "1.5px solid #6B4226" }}
            >
              <p
                className="font-accent uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  color: "rgba(107,66,38,0.70)",
                }}
              >
                What&apos;s Inside
              </p>
              <p
                className="font-heading italic text-lg mt-1"
                style={{ color: "#1A3C34" }}
              >
                {product.ingredients}
              </p>
            </div>

            {/* 5. Price row */}
            <div className="mt-6 flex items-baseline gap-3 flex-wrap">
              <span
                className="font-heading font-light"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  color: "#1A3C34",
                }}
              >
                ₹{product.price}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span
                  className="font-body text-base"
                  style={{
                    color: "rgba(26,60,52,0.4)",
                    textDecoration: "line-through",
                  }}
                >
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span
                  className="font-accent uppercase px-2 py-0.5 rounded-sm"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    background: "rgba(165,104,67,0.10)",
                    color: "#A56843",
                  }}
                >
                  {Math.round((1 - product.price / product.compareAtPrice) * 100)}% Off
                </span>
              )}
            </div>

            {/* 6. Quantity + Add to Potli */}
            <div className="mt-4 flex gap-3">
              {/* Qty stepper */}
              <div
                className="flex items-center rounded-sm"
                style={{ border: "1px solid #E8D5B7" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 transition-colors duration-200"
                  style={{ color: "#1A3C34" }}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="px-4 py-3 font-body text-sm"
                  style={{
                    color: "#1A3C34",
                    borderLeft: "1px solid #E8D5B7",
                    borderRight: "1px solid #E8D5B7",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="px-3 py-3 transition-colors duration-200"
                  style={{ color: "#1A3C34" }}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* ADD TO POTLI button */}
              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 flex items-center justify-between px-5 py-3 rounded-sm font-body text-[13px] font-medium uppercase tracking-[0.18em] transition-all active:translate-y-px",
                  addedToCart ? "opacity-80" : ""
                )}
                style={{
                  background: "#606C38",
                  color: "#FDFAF5",
                }}
              >
                <span className="flex items-center gap-2">
                  {addedToCart ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <ShoppingBag className="h-4 w-4" />
                  )}
                  {addedToCart ? "Added" : "Add to Potli"}
                </span>
                <span>₹{product.price} →</span>
              </button>
            </div>

            {/* 7. Trust badges */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { main: "Free over ₹499", sub: "Ships across India" },
                { main: "7-day returns", sub: "If a powder is wrong for you" },
                { main: "Cash on delivery", sub: "Available at checkout" },
              ].map((badge) => (
                <div
                  key={badge.main}
                  className="pt-3"
                  style={{ borderTop: "1px solid #E8D5B7" }}
                >
                  <p
                    className="font-body text-sm font-medium"
                    style={{ color: "#1A3C34" }}
                  >
                    {badge.main}
                  </p>
                  <p
                    className="font-body text-xs mt-0.5"
                    style={{ color: "rgba(26,60,52,0.5)" }}
                  >
                    {badge.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* 8. PIN Code Check — kept exactly as-is */}
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-3.5 w-3.5 text-bark/40" />
                <span className="text-xs font-accent uppercase tracking-wider text-bark/50">
                  Check Delivery
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setPincodeResult(null);
                  }}
                  placeholder="Enter PIN code"
                  className="flex-1 px-3 py-2 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:outline-none transition-colors placeholder:text-bark/30"
                />
                <button
                  onClick={checkPincode}
                  disabled={pincodeLoading || pincode.length !== 6}
                  className="px-4 py-2 text-xs font-accent uppercase tracking-wider border border-border rounded-sm text-bark/70 hover:border-bark hover:text-bark disabled:opacity-40 transition-colors"
                >
                  {pincodeLoading ? "..." : "Check"}
                </button>
              </div>
              {pincodeResult && (
                <div className={`mt-2 text-xs font-body ${pincodeResult.serviceable ? "text-sage" : "text-terracotta"}`}>
                  <p>{pincodeResult.message}</p>
                  {pincodeResult.serviceable && pincodeResult.estimatedDays && (
                    <p className="text-bark/50 mt-0.5">
                      Estimated delivery: {pincodeResult.estimatedDays} days
                      {pincodeResult.codAvailable && " · COD available"}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ritual · Ingredients · Why It Works */}
      <ProductStory product={product} />

      {/* Customer Reviews */}
      <section className="py-4">
        <div className="container-brand">
          <ProductReviews productId={product.sku} productName={product.name} />
        </div>
      </section>

      {/* FAQ */}
      <ProductFAQ productName={product.name} faqs={faqs} />

      {/* Related Blog Posts */}
      {relatedBlogPosts.length > 0 && (
        <section className="py-10 md:py-12">
          <div className="container-brand">
            <ScrollReveal animation="fade-up">
              <div className="mb-8 max-w-3xl mx-auto">
                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
                  — From the Journal
                </p>
                <h2 className="font-heading text-[1.75rem] md:text-[2.25rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
                  Go deeper on{" "}
                  <span style={{ color: "#834316", fontStyle: "italic" }}>
                    {product.name}.
                  </span>
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {relatedBlogPosts.map((post, index) => (
                <ScrollReveal
                  key={post.slug}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 p-4 border border-border rounded-sm hover:border-gold/40 transition-colors"
                  >
                    <div className="relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm text-bark group-hover:text-terracotta transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[11px] text-bark/40 font-accent uppercase tracking-wider mt-1.5">
                        {post.readTime} min read
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-14">
          <div className="container-brand">
            <ScrollReveal animation="fade-up">
              <div className="mb-10">
                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
                  — Pairs Well With · {product.category}
                </p>
                <h2 className="font-heading text-[2.25rem] md:text-[3rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
                  Complete the{" "}
                  <span style={{ color: "#834316", fontStyle: "italic" }}>
                    ritual.
                  </span>
                </h2>
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
                      compareAtPrice: rp.compareAtPrice,
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
