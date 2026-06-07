"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import ProductCard from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A to Z",
  "name-desc": "Name: Z to A",
};

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showSortMenu, setShowSortMenu] = useState(false);

  const activeCategory = searchParams.get("category") || "all";
  const activeSort = (searchParams.get("sort") as SortOption) || "featured";
  const searchQuery = searchParams.get("q") || "";

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "featured") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.slug !== "shikakai-powder");

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.categorySlug === activeCategory);
    }

    switch (activeSort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return filtered;
  }, [activeCategory, activeSort, searchQuery]);

  return (
    <>
      {/* Search Results Banner */}
      {searchQuery && (
        <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-parchment/50 rounded-sm">
          <p className="text-sm font-body text-bark/70">
            Results for &ldquo;<span className="font-medium text-bark">{searchQuery}</span>&rdquo;
            <span className="text-bark/40 ml-1">({filteredProducts.length})</span>
          </p>
          <button
            onClick={clearSearch}
            className="ml-auto flex items-center gap-1 text-xs font-accent uppercase tracking-wider text-bark/50 hover:text-bark transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
          <SlidersHorizontal className="h-4 w-4 text-bark/40 flex-shrink-0 hidden md:block" />
          <button
            onClick={() => setFilter("category", "all")}
            className={cn(
              "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-accent uppercase tracking-wider transition-all duration-300",
              activeCategory === "all"
                ? "bg-bark text-cream"
                : "bg-parchment/50 text-bark/60 hover:bg-parchment hover:text-bark"
            )}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilter("category", cat.slug)}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-accent uppercase tracking-wider transition-all duration-300",
                activeCategory === cat.slug
                  ? "bg-bark text-cream"
                  : "bg-parchment/50 text-bark/60 hover:bg-parchment hover:text-bark"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative flex items-center gap-3">
          <span className="text-xs text-bark/40 font-accent uppercase tracking-wider hidden md:block">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-1.5 border border-border rounded-sm text-xs font-accent uppercase tracking-wider text-bark/70 hover:border-gold transition-colors"
            >
              {sortLabels[activeSort]}
              <ChevronDown className={cn(
                "h-3.5 w-3.5 transition-transform",
                showSortMenu && "rotate-180"
              )} />
            </button>
            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-cream border border-border rounded-sm shadow-warm py-1 min-w-[180px]">
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setFilter("sort", key);
                        setShowSortMenu(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-xs font-accent uppercase tracking-wider transition-colors",
                        activeSort === key
                          ? "text-terracotta bg-parchment/30"
                          : "text-bark/60 hover:text-bark hover:bg-parchment/20"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product count - mobile */}
      <p className="text-xs text-bark/40 font-accent uppercase tracking-wider mb-4 md:hidden">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {filteredProducts.map((product, index) => (
          <ScrollReveal
            key={product.slug}
            animation="fade-up"
            delay={index * 60}
          >
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

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-bark/50 font-body">
            {searchQuery
              ? `No products found for "${searchQuery}".`
              : "No products found in this category."}
          </p>
          <button
            onClick={() => {
              if (searchQuery) clearSearch();
              else setFilter("category", "all");
            }}
            className="mt-4 text-terracotta font-accent text-sm uppercase tracking-wider gold-underline pb-1"
          >
            View All Products
          </button>
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-surface-warm py-12 md:py-16">
        <div className="container-brand text-center">
          <ScrollReveal animation="fade-up">
            <p className="section-label text-sage mb-3">Our Collection</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-bark font-light tracking-wide">
              Shop All Products
            </h1>
            <div className="flex justify-center mt-4">
              <GoldRule variant="leaf" width="w-32" />
            </div>
            <p className="mt-4 text-bark/60 font-body text-sm md:text-base max-w-lg mx-auto">
              Handcrafted ayurvedic formulations made from the purest natural
              ingredients, for your skin and hair.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ShopContent />
        </Suspense>
      </div>
    </div>
  );
}
