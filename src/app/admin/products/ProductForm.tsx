"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Trash2,
  X,
  GripVertical,
  Plus,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GoldRule from "@/components/decorative/GoldRule";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";

interface ProductImage {
  id?: string;
  url: string;
  publicId: string;
  altText?: string;
  sortOrder: number;
}

interface Category {
  id: string;
  name: string;
  slug?: string;
}

interface ProductData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number | string;
  compareAtPrice: number | string;
  sku: string;
  weight: number | string;
  weightUnit: string;
  stock: number | string;
  isActive: boolean;
  isFeatured: boolean;
  ingredients: string;
  howToUse: string;
  benefits: string;
  metaTitle: string;
  metaDescription: string;
  images: ProductImage[];
  categoryIds: string[];
}

const emptyProduct: ProductData = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  price: "",
  compareAtPrice: "",
  sku: "",
  weight: "",
  weightUnit: "g",
  stock: "",
  isActive: true,
  isFeatured: false,
  ingredients: "",
  howToUse: "",
  benefits: "",
  metaTitle: "",
  metaDescription: "",
  images: [],
  categoryIds: [],
};

export default function ProductForm({
  productId,
}: {
  productId?: string;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductData>(emptyProduct);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!productId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!productId;

  // Fetch categories
  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // Fetch product data for editing
  const fetchProduct = useCallback(async () => {
    if (!productId) return;
    try {
      const res = await fetch(`/api/admin/products/${productId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const p = data.product;
      setProduct({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description || "",
        shortDescription: p.shortDescription || "",
        price: p.price || "",
        compareAtPrice: p.compareAtPrice || "",
        sku: p.sku,
        weight: p.weight || "",
        weightUnit: p.weightUnit || "g",
        stock: p.stock ?? "",
        isActive: p.isActive,
        isFeatured: p.isFeatured,
        ingredients: p.ingredients || "",
        howToUse: p.howToUse || "",
        benefits: p.benefits || "",
        metaTitle: p.metaTitle || "",
        metaDescription: p.metaDescription || "",
        images: p.images || [],
        categoryIds: p.categoryIds || [],
      });
    } catch {
      toast.error("Failed to load product");
      router.push("/admin/products");
    } finally {
      setLoading(false);
    }
  }, [productId, router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Auto-generate slug from name
  useEffect(() => {
    if (autoSlug && product.name) {
      setProduct((prev) => ({ ...prev, slug: slugify(prev.name) }));
    }
  }, [product.name, autoSlug]);

  const updateField = (field: keyof ProductData, value: unknown) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Image upload
  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const newImages: ProductImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image`);
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "jaison/products");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        newImages.push({
          url: data.url,
          publicId: data.publicId,
          altText: product.name || "Product image",
          sortOrder: product.images.length + i,
        });
      }

      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));

      if (newImages.length > 0) {
        toast.success(
          `${newImages.length} image${newImages.length > 1 ? "s" : ""} uploaded`
        );
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...product.images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    [newImages[index], newImages[targetIndex]] = [
      newImages[targetIndex],
      newImages[index],
    ];
    setProduct((prev) => ({ ...prev, images: newImages }));
  };

  const toggleCategory = (catId: string) => {
    setProduct((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(catId)
        ? prev.categoryIds.filter((id) => id !== catId)
        : [...prev.categoryIds, catId],
    }));
  };

  // Save product
  const handleSave = async () => {
    // Validation
    if (!product.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!product.slug.trim()) {
      toast.error("Product slug is required");
      return;
    }
    if (!product.description.trim()) {
      toast.error("Product description is required");
      return;
    }
    if (!product.price || Number(product.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    if (!product.sku.trim()) {
      toast.error("SKU is required");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: product.name.trim(),
        slug: product.slug.trim(),
        description: product.description.trim(),
        shortDescription: product.shortDescription.trim() || null,
        price: Number(product.price),
        compareAtPrice: product.compareAtPrice
          ? Number(product.compareAtPrice)
          : null,
        sku: product.sku.trim(),
        weight: product.weight ? Number(product.weight) : null,
        weightUnit: product.weightUnit,
        stock: Number(product.stock) || 0,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        ingredients: product.ingredients.trim() || null,
        howToUse: product.howToUse.trim() || null,
        benefits: product.benefits.trim() || null,
        metaTitle:
          product.metaTitle.trim() ||
          `${product.name} — jaison Natural Herbals`,
        metaDescription:
          product.metaDescription.trim() ||
          product.shortDescription.trim() ||
          null,
        categoryIds: product.categoryIds,
        images: product.images.map((img, i) => ({
          url: img.url,
          publicId: img.publicId,
          altText: img.altText || product.name,
          sortOrder: i,
        })),
      };

      const url = isEditing
        ? `/api/admin/products/${productId}`
        : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Save failed");
      }

      toast.success(isEditing ? "Product updated" : "Product created");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!isEditing) return;
    if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) {
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Product deleted");
      router.push("/admin/products");
      router.refresh();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-parchment/50 rounded-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-bark/60" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl text-bark">
              {isEditing ? "Edit Product" : "New Product"}
            </h1>
            {isEditing && (
              <p className="text-xs text-bark/40 font-body mt-0.5">
                {product.sku}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              isLoading={deleting}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={saving}
          >
            <Save className="h-4 w-4 mr-1" />
            {isEditing ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <section className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="section-label text-bark/40 mb-4">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                placeholder="e.g. Rose Glow Face Serum"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={product.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    updateField("slug", e.target.value);
                  }}
                  className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                  placeholder="rose-glow-face-serum"
                />
              </div>
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                  SKU *
                </label>
                <input
                  type="text"
                  value={product.sku}
                  onChange={(e) => updateField("sku", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                  placeholder="JAIS-ROSE-001"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Short Description
              </label>
              <input
                type="text"
                value={product.shortDescription}
                onChange={(e) =>
                  updateField("shortDescription", e.target.value)
                }
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                placeholder="Brief description for product cards"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Full Description *
              </label>
              <textarea
                value={product.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors resize-y"
                placeholder="Detailed product description..."
              />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="section-label text-bark/40 mb-4">Product Images</h2>

          <div className="space-y-4">
            {/* Image grid */}
            {product.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <div
                    key={img.publicId + index}
                    className="relative group aspect-square bg-parchment rounded-sm overflow-hidden border border-border/30"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || "Product image"}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-bark/80 text-cream text-[9px] font-accent px-1.5 py-0.5 rounded-sm">
                        Main
                      </span>
                    )}
                    <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/30 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                      {index > 0 && (
                        <button
                          onClick={() => moveImage(index, "up")}
                          className="p-1.5 bg-cream/90 rounded-sm text-bark hover:bg-cream transition-colors"
                          title="Move left"
                        >
                          <GripVertical className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(index)}
                        className="p-1.5 bg-red-500/90 rounded-sm text-white hover:bg-red-600 transition-colors"
                        title="Remove"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                      {index < product.images.length - 1 && (
                        <button
                          onClick={() => moveImage(index, "down")}
                          className="p-1.5 bg-cream/90 rounded-sm text-bark hover:bg-cream transition-colors"
                          title="Move right"
                        >
                          <GripVertical className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-border/50 rounded-sm p-8 text-center cursor-pointer hover:border-gold/50 hover:bg-parchment/20 transition-colors"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
                  <p className="text-xs text-bark/50 font-body">
                    Uploading...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  {product.images.length === 0 ? (
                    <ImageIcon className="h-8 w-8 text-bark/20" />
                  ) : (
                    <Plus className="h-6 w-6 text-bark/30" />
                  )}
                  <div>
                    <p className="text-sm text-bark/50 font-body">
                      {product.images.length === 0
                        ? "Click to upload product images"
                        : "Add more images"}
                    </p>
                    <p className="text-xs text-bark/30 font-body mt-0.5">
                      JPG, PNG, or WebP up to 5MB
                    </p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
              />
            </div>
          </div>
        </section>

        {/* Pricing & Inventory */}
        <section className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="section-label text-bark/40 mb-4">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Price (INR) *
              </label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => updateField("price", e.target.value)}
                min="0"
                step="1"
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                placeholder="499"
              />
            </div>
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Compare at Price (INR)
              </label>
              <input
                type="number"
                value={product.compareAtPrice}
                onChange={(e) =>
                  updateField("compareAtPrice", e.target.value)
                }
                min="0"
                step="1"
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                placeholder="699 (optional, shown as strikethrough)"
              />
            </div>
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Stock Quantity
              </label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                min="0"
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                placeholder="100"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                  Weight
                </label>
                <input
                  type="number"
                  value={product.weight}
                  onChange={(e) => updateField("weight", e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                  Unit
                </label>
                <select
                  value={product.weightUnit}
                  onChange={(e) => updateField("weightUnit", e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                >
                  <option value="g">Grams (g)</option>
                  <option value="ml">Millilitres (ml)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="L">Litres (L)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Categories & Visibility */}
        <section className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="section-label text-bark/40 mb-4">
            Categories & Visibility
          </h2>

          <div className="space-y-4">
            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className={`text-xs font-accent px-3 py-1.5 rounded-sm border transition-colors ${
                        product.categoryIds.includes(cat.id)
                          ? "bg-bark text-cream border-bark"
                          : "bg-cream text-bark/60 border-border hover:border-bark/40"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Toggles */}
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={product.isActive}
                  onChange={(e) => updateField("isActive", e.target.checked)}
                  className="w-4 h-4 rounded-sm border-border text-terracotta focus:ring-gold accent-terracotta"
                />
                <span className="text-sm font-body text-bark/70">Active</span>
                <span className="text-xs text-bark/40 font-body">
                  (visible in store)
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={product.isFeatured}
                  onChange={(e) =>
                    updateField("isFeatured", e.target.checked)
                  }
                  className="w-4 h-4 rounded-sm border-border text-terracotta focus:ring-gold accent-terracotta"
                />
                <span className="text-sm font-body text-bark/70">
                  Featured
                </span>
                <span className="text-xs text-bark/40 font-body">
                  (shown on homepage)
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="section-label text-bark/40 mb-4">Product Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Ingredients
              </label>
              <textarea
                value={product.ingredients}
                onChange={(e) => updateField("ingredients", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors resize-y"
                placeholder="List of ingredients..."
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                How to Use
              </label>
              <textarea
                value={product.howToUse}
                onChange={(e) => updateField("howToUse", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors resize-y"
                placeholder="Usage instructions..."
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Benefits
              </label>
              <textarea
                value={product.benefits}
                onChange={(e) => updateField("benefits", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors resize-y"
                placeholder="Key benefits of the product..."
              />
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="bg-cream p-5 rounded-sm border border-border/50">
          <h2 className="section-label text-bark/40 mb-4">SEO</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Meta Title
              </label>
              <input
                type="text"
                value={product.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors"
                placeholder="Auto-generated from product name"
              />
            </div>

            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                Meta Description
              </label>
              <textarea
                value={product.metaDescription}
                onChange={(e) =>
                  updateField("metaDescription", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors resize-y"
                placeholder="Auto-generated from short description"
              />
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <Link
            href="/admin/products"
            className="text-sm text-bark/50 font-body hover:text-bark transition-colors"
          >
            Cancel
          </Link>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            isLoading={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Save Changes" : "Create Product"}
          </Button>
        </div>

        <div className="flex justify-center pb-4">
          <GoldRule variant="diamond" width="w-32" />
        </div>
      </div>
    </div>
  );
}
