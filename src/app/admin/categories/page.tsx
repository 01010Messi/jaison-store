"use client";

import { useEffect, useState, useCallback } from "react";
import { Layers, Plus, Trash2, GripVertical, Package } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  sortOrder: "0",
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openCreate = () => {
    setEditingCategory(null);
    setForm(emptyForm);
    setSlugManuallyEdited(false);
    setShowModal(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      sortOrder: String(category.sortOrder),
    });
    setSlugManuallyEdited(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setForm(emptyForm);
    setSlugManuallyEdited(false);
  };

  const handleNameChange = (value: string) => {
    setForm((f) => ({
      ...f,
      name: value,
      slug: slugManuallyEdited ? f.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setForm((f) => ({ ...f, slug: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Category slug is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim() || undefined,
        sortOrder: Number(form.sortOrder) || 0,
      };

      if (editingCategory) {
        // Update
        const res = await fetch(
          `/api/admin/categories/${editingCategory.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to update category");
        }
        toast.success("Category updated");
      } else {
        // Create
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to create category");
        }
        toast.success("Category created");
      }

      closeModal();
      fetchCategories();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingCategory) return;

    if (editingCategory.productCount > 0) {
      toast.error(
        `Cannot delete "${editingCategory.name}" because it has ${editingCategory.productCount} linked product${editingCategory.productCount === 1 ? "" : "s"}. Remove the products first.`
      );
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(
        `/api/admin/categories/${editingCategory.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete category");
      }
      toast.success("Category deleted");
      closeModal();
      fetchCategories();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete category"
      );
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-bark">Categories</h1>
          <p className="text-sm text-bark/60 font-body mt-1">
            Manage product categories
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-bark text-cream rounded-sm text-xs font-accent uppercase tracking-wider hover:bg-bark/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <div className="flex flex-col items-center justify-center py-16 text-bark/30">
            <Layers className="h-12 w-12 mb-3 opacity-50" />
            <p className="font-heading text-lg text-bark/60">
              No categories yet
            </p>
            <p className="text-xs text-bark/30 font-body mt-1">
              Create your first category to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-cream rounded-sm border border-border/50 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-4 py-3 bg-parchment/30 border-b border-border/50">
            <p className="text-xs font-accent uppercase tracking-wider text-bark/60">
              Name
            </p>
            <p className="text-xs font-accent uppercase tracking-wider text-bark/60">
              Slug
            </p>
            <p className="text-xs font-accent uppercase tracking-wider text-bark/60 text-center w-24">
              Products
            </p>
            <p className="text-xs font-accent uppercase tracking-wider text-bark/60 text-center w-20">
              Order
            </p>
          </div>

          <div className="divide-y divide-border-light">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => openEdit(category)}
                className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 items-center px-4 py-3.5 hover:bg-parchment/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-parchment/50 rounded-full flex items-center justify-center shrink-0">
                    <Layers className="h-4 w-4 text-bark/60" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-sm text-bark truncate">
                      {category.name}
                    </p>
                    {category.description && (
                      <p className="text-xs text-bark/60 font-body truncate">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-bark/60 font-body font-mono truncate">
                  {category.slug}
                </p>
                <div className="flex items-center justify-center w-24">
                  <Badge
                    variant={category.productCount > 0 ? "sage" : "default"}
                    size="sm"
                  >
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {category.productCount}{" "}
                      {category.productCount === 1 ? "product" : "products"}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center justify-center w-20">
                  <span className="flex items-center gap-1 text-xs text-bark/60 font-body">
                    <GripVertical className="h-3 w-3" />
                    {category.sortOrder}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create / Edit category modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingCategory ? "Edit Category" : "Add Category"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Category Name"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Hair Care"
          />
          <Input
            label="Slug"
            value={form.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="e.g. hair-care"
            helperText={
              !editingCategory && !slugManuallyEdited
                ? "Auto-generated from name"
                : undefined
            }
          />
          <div>
            <label className="block text-sm font-body font-medium text-bark/80 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Optional description"
              rows={3}
              className="w-full px-4 py-2.5 bg-cream border border-border rounded-sm font-body text-bark text-sm placeholder:text-bark/60 transition-all duration-200 hover:border-gold/60 focus:border-gold focus:ring-1 focus:ring-gold/30 resize-none"
            />
          </div>
          <Input
            label="Sort Order"
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm((f) => ({ ...f, sortOrder: e.target.value }))
            }
            placeholder="0"
            helperText="Lower numbers appear first"
          />

          <div className="flex items-center justify-between pt-2">
            <div>
              {editingCategory && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDelete}
                  isLoading={deleting}
                >
                  <span className="flex items-center gap-1.5 text-terracotta">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </span>
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={saving}>
                {editingCategory ? "Save Changes" : "Create Category"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
