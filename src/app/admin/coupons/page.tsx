"use client";

import { useEffect, useState, useCallback } from "react";
import { Tag, Plus, Power, Pencil, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: string;
  discountValue: number;
  minOrderAmount: number | null;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
  validFrom: string | null;
  validUntil: string | null;
}

const emptyForm = {
  code: "",
  description: "",
  discountType: "PERCENTAGE",
  discountValue: "",
  minOrderAmount: "",
  maxDiscount: "",
  usageLimit: "",
  validUntil: "",
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // Edit state
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Toggle loading state - track by coupon id
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchCoupons = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.discountValue) {
      toast.error("Code and discount value are required");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          description: form.description || undefined,
          discountType: form.discountType,
          discountValue: Number(form.discountValue),
          minOrderAmount: form.minOrderAmount
            ? Number(form.minOrderAmount)
            : undefined,
          maxDiscount: form.maxDiscount
            ? Number(form.maxDiscount)
            : undefined,
          usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
          validUntil: form.validUntil || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Coupon created");
      setShowCreate(false);
      setForm(emptyForm);
      fetchCoupons();
    } catch {
      toast.error("Failed to create coupon");
    } finally {
      setCreating(false);
    }
  };

  const openEditModal = (coupon: Coupon) => {
    setEditCoupon(coupon);
    setEditForm({
      code: coupon.code,
      description: coupon.description || "",
      discountType: coupon.discountType,
      discountValue: String(coupon.discountValue),
      minOrderAmount: coupon.minOrderAmount
        ? String(coupon.minOrderAmount)
        : "",
      maxDiscount: coupon.maxDiscount ? String(coupon.maxDiscount) : "",
      usageLimit: coupon.usageLimit ? String(coupon.usageLimit) : "",
      validUntil: coupon.validUntil
        ? new Date(coupon.validUntil).toISOString().split("T")[0]
        : "",
    });
    setShowEdit(true);
    setShowDeleteConfirm(false);
  };

  const closeEditModal = () => {
    setShowEdit(false);
    setEditCoupon(null);
    setShowDeleteConfirm(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCoupon) return;
    if (!editForm.code || !editForm.discountValue) {
      toast.error("Code and discount value are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/coupons/${editCoupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: editForm.code,
          description: editForm.description || null,
          discountType: editForm.discountType,
          discountValue: Number(editForm.discountValue),
          minOrderAmount: editForm.minOrderAmount
            ? Number(editForm.minOrderAmount)
            : null,
          maxDiscount: editForm.maxDiscount
            ? Number(editForm.maxDiscount)
            : null,
          usageLimit: editForm.usageLimit
            ? Number(editForm.usageLimit)
            : null,
          validUntil: editForm.validUntil || null,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Coupon updated");
      closeEditModal();
      fetchCoupons();
    } catch {
      toast.error("Failed to update coupon");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editCoupon) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/coupons/${editCoupon.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Coupon deleted");
      closeEditModal();
      fetchCoupons();
    } catch {
      toast.error("Failed to delete coupon");
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleActive = async (
    e: React.MouseEvent,
    coupon: Coupon
  ) => {
    e.stopPropagation();
    setTogglingId(coupon.id);
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      if (!res.ok) throw new Error();
      toast.success(
        coupon.isActive ? "Coupon deactivated" : "Coupon activated"
      );
      fetchCoupons();
    } catch {
      toast.error("Failed to toggle coupon");
    } finally {
      setTogglingId(null);
    }
  };

  const handleToggleActiveInModal = async () => {
    if (!editCoupon) return;
    setSaving(true);
    try {
      const newIsActive = !editCoupon.isActive;
      const res = await fetch(`/api/admin/coupons/${editCoupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newIsActive }),
      });
      if (!res.ok) throw new Error();
      toast.success(newIsActive ? "Coupon activated" : "Coupon deactivated");
      setEditCoupon({ ...editCoupon, isActive: newIsActive });
      fetchCoupons();
    } catch {
      toast.error("Failed to toggle coupon status");
    } finally {
      setSaving(false);
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
          <h1 className="font-heading text-2xl text-bark">Coupons</h1>
          <p className="text-sm text-bark/50 font-body mt-1">
            Manage discount coupons
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-bark text-cream rounded-sm text-xs font-accent uppercase tracking-wider hover:bg-bark/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Coupon
        </button>
      </div>

      {coupons.length === 0 ? (
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <div className="flex flex-col items-center justify-center py-16 text-bark/30">
            <Tag className="h-12 w-12 mb-3 opacity-50" />
            <p className="font-heading text-lg text-bark/40">No coupons yet</p>
            <p className="text-xs text-bark/30 font-body mt-1">
              Create your first coupon to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-cream rounded-sm border border-border/50 overflow-hidden">
          <div className="divide-y divide-border-light">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                onClick={() => openEditModal(coupon)}
                className="flex items-center gap-4 p-4 hover:bg-parchment/20 transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 bg-parchment/50 rounded-full flex items-center justify-center">
                  <Tag className="h-4 w-4 text-bark/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-heading text-sm text-bark">
                      {coupon.code}
                    </p>
                    <Badge variant={coupon.isActive ? "sage" : "default"}>
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-xs text-bark/40 font-body">
                    {coupon.description || "No description"}
                  </p>
                  {coupon.usageLimit && (
                    <p className="text-xs text-bark/30 font-body">
                      Used {coupon.usedCount}/{coupon.usageLimit}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right shrink-0">
                    <p className="font-body font-semibold text-sm text-bark">
                      {coupon.discountType === "PERCENTAGE"
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`}
                    </p>
                    {coupon.minOrderAmount && (
                      <p className="text-xs text-bark/40">
                        Min. ₹{coupon.minOrderAmount}
                      </p>
                    )}
                    {coupon.validUntil && (
                      <p className="text-xs text-bark/30">
                        Expires{" "}
                        {new Date(coupon.validUntil).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleToggleActive(e, coupon)}
                    disabled={togglingId === coupon.id}
                    title={
                      coupon.isActive
                        ? "Deactivate coupon"
                        : "Activate coupon"
                    }
                    className={`p-1.5 rounded-sm transition-colors shrink-0 ${
                      coupon.isActive
                        ? "text-sage-dark hover:bg-sage-dark/10"
                        : "text-bark/30 hover:bg-bark/5"
                    } ${
                      togglingId === coupon.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  <Pencil className="h-3.5 w-3.5 text-bark/20 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create coupon modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Coupon"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Coupon Code"
            value={form.code}
            onChange={(e) =>
              setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))
            }
            placeholder="e.g. SUMMER20"
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Optional description"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-accent uppercase tracking-wider text-bark/40 mb-1.5">
                Type
              </label>
              <select
                value={form.discountType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, discountType: e.target.value }))
                }
                className="w-full px-3 py-2.5 bg-cream border border-border rounded-sm text-sm text-bark font-body focus:border-bark focus:ring-0 outline-none"
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount</option>
              </select>
            </div>
            <Input
              label="Value"
              type="number"
              value={form.discountValue}
              onChange={(e) =>
                setForm((f) => ({ ...f, discountValue: e.target.value }))
              }
              placeholder={
                form.discountType === "PERCENTAGE" ? "e.g. 10" : "e.g. 50"
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Min Order (₹)"
              type="number"
              value={form.minOrderAmount}
              onChange={(e) =>
                setForm((f) => ({ ...f, minOrderAmount: e.target.value }))
              }
              placeholder="Optional"
            />
            <Input
              label="Max Discount (₹)"
              type="number"
              value={form.maxDiscount}
              onChange={(e) =>
                setForm((f) => ({ ...f, maxDiscount: e.target.value }))
              }
              placeholder="Optional"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Usage Limit"
              type="number"
              value={form.usageLimit}
              onChange={(e) =>
                setForm((f) => ({ ...f, usageLimit: e.target.value }))
              }
              placeholder="Unlimited"
            />
            <Input
              label="Expires On"
              type="date"
              value={form.validUntil}
              onChange={(e) =>
                setForm((f) => ({ ...f, validUntil: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={creating}>
              Create Coupon
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit coupon modal */}
      <Modal
        isOpen={showEdit}
        onClose={closeEditModal}
        title="Edit Coupon"
      >
        {editCoupon && (
          <>
            {/* Active status toggle bar */}
            <div className="flex items-center justify-between mb-5 p-3 rounded-sm bg-parchment/30 border border-border/30">
              <div className="flex items-center gap-2">
                <Power className="h-4 w-4 text-bark/50" />
                <span className="text-sm font-body text-bark/70">
                  Status
                </span>
                <Badge
                  variant={editCoupon.isActive ? "sage" : "default"}
                >
                  {editCoupon.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <button
                onClick={handleToggleActiveInModal}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  editCoupon.isActive ? "bg-sage-dark" : "bg-bark/20"
                } ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-cream transition-transform shadow-sm ${
                    editCoupon.isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <Input
                label="Coupon Code"
                value={editForm.code}
                onChange={(e) =>
                  setEditForm((f) => ({
                    ...f,
                    code: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="e.g. SUMMER20"
              />
              <Input
                label="Description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((f) => ({
                    ...f,
                    description: e.target.value,
                  }))
                }
                placeholder="Optional description"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-bark/40 mb-1.5">
                    Type
                  </label>
                  <select
                    value={editForm.discountType}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        discountType: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 bg-cream border border-border rounded-sm text-sm text-bark font-body focus:border-bark focus:ring-0 outline-none"
                  >
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="FIXED">Fixed Amount</option>
                  </select>
                </div>
                <Input
                  label="Value"
                  type="number"
                  value={editForm.discountValue}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      discountValue: e.target.value,
                    }))
                  }
                  placeholder={
                    editForm.discountType === "PERCENTAGE"
                      ? "e.g. 10"
                      : "e.g. 50"
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Min Order (₹)"
                  type="number"
                  value={editForm.minOrderAmount}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      minOrderAmount: e.target.value,
                    }))
                  }
                  placeholder="Optional"
                />
                <Input
                  label="Max Discount (₹)"
                  type="number"
                  value={editForm.maxDiscount}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      maxDiscount: e.target.value,
                    }))
                  }
                  placeholder="Optional"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Usage Limit"
                  type="number"
                  value={editForm.usageLimit}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      usageLimit: e.target.value,
                    }))
                  }
                  placeholder="Unlimited"
                />
                <Input
                  label="Expires On"
                  type="date"
                  value={editForm.validUntil}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      validUntil: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Usage info (read-only) */}
              <div className="text-xs text-bark/40 font-body pt-1">
                Used {editCoupon.usedCount} time
                {editCoupon.usedCount !== 1 ? "s" : ""}
                {editCoupon.usageLimit
                  ? ` out of ${editCoupon.usageLimit}`
                  : ""}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-1.5 text-xs font-accent uppercase tracking-wider text-terracotta hover:text-terracotta-dark transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-terracotta font-body">
                      Are you sure?
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-terracotta text-cream rounded-sm text-xs font-accent uppercase tracking-wider hover:bg-terracotta-dark transition-colors disabled:opacity-50"
                    >
                      {deleting ? (
                        <div className="animate-spin rounded-full h-3 w-3 border border-cream/30 border-t-cream" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                      Confirm Delete
                    </button>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={saving}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
}
