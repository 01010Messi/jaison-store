"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Plus, Package } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sku: string;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  images: { url: string; publicId: string }[];
  categories: string[];
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-bark">Products</h1>
          <p className="text-sm text-bark/50 font-body mt-1">
            Manage your product catalog
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-bark text-cream rounded-sm text-xs font-accent uppercase tracking-wider hover:bg-bark/90 transition-colors">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <div className="flex flex-col items-center justify-center py-16 text-bark/30">
            <Package className="h-12 w-12 mb-3 opacity-50" />
            <p className="font-heading text-lg text-bark/40">No products yet</p>
            <p className="text-xs text-bark/30 font-body mt-1">
              Add your first product to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-cream rounded-sm border border-border/50 overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <span className="section-label text-bark/40">
              {products.length} Products
            </span>
          </div>

          <div className="divide-y divide-border-light">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 hover:bg-parchment/20 transition-colors"
              >
                <div className="relative w-12 h-14 bg-parchment rounded-sm overflow-hidden shrink-0">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="h-5 w-5 text-bark/20" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm text-bark truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-bark/40 font-body">
                    {product.sku} &bull;{" "}
                    {product.categories.join(", ") || "Uncategorized"}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  {product.isFeatured && (
                    <Badge variant="gold">Featured</Badge>
                  )}
                  {!product.isActive && (
                    <Badge variant="terracotta">Inactive</Badge>
                  )}
                  {product.stock < 5 && product.stock > 0 && (
                    <Badge variant="gold">Low Stock</Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge variant="terracotta">Out of Stock</Badge>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-body font-semibold text-sm text-bark">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs text-bark/40">
                    {product.stock} in stock
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <GoldRule variant="diamond" width="w-32" />
      </div>
    </div>
  );
}
