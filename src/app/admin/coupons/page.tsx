"use client";

import { useEffect, useState, useCallback } from "react";
import { Tag, Plus } from "lucide-react";
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

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    usageLimit: "",
    validUntil: "",
  });

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
      setForm({
        code: "",
        description: "",
        discountType: "PERCENTAGE",
        discountValue: "",
        minOrderAmount: "",
        maxDiscount: "",
        usageLimit: "",
        validUntil: "",
      });
      fetchCoupons();
    } catch {
      toast.error("Failed to create coupon");
    } finally {
      setCreating(false);
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
                className="flex items-center gap-4 p-4 hover:bg-parchment/20 transition-colors"
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
                      {new Date(coupon.validUntil).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  )}
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
    </div>
  );
}
