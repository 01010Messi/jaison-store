"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { MapPin, ArrowLeft, Plus, Trash2, Star } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import toast from "react-hot-toast";

interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch("/api/account/addresses");
      const data = await res.json();
      setAddresses(data.addresses || []);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchAddresses();
  }, [status, router, fetchAddresses]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    try {
      await fetch(`/api/account/addresses?id=${id}`, { method: "DELETE" });
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-8 md:py-12">
        <div className="container-brand">
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-xs font-accent uppercase tracking-wider text-bark/40 hover:text-bark transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            My Account
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl text-bark">
            Saved Addresses
          </h1>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12 max-w-2xl">
        {addresses.length === 0 ? (
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MapPin className="h-12 w-12 text-bark/15 mb-4" />
              <h2 className="font-heading text-xl text-bark mb-2">
                No saved addresses
              </h2>
              <p className="text-sm text-bark/50 font-body mb-6 max-w-sm">
                Add a delivery address during checkout and it will appear here.
              </p>
              <GoldRule variant="simple" width="w-16" className="mb-6" />
              <Link
                href="/shop"
                className="flex items-center gap-2 px-6 py-2.5 rounded-sm bg-bark text-cream font-accent text-sm uppercase tracking-wider hover:bg-bark/90 transition-all"
              >
                <Plus className="h-4 w-4" />
                Start Shopping
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <ScrollReveal key={addr.id} animation="fade-up">
                <div className="bg-cream border border-border rounded-sm p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-accent text-sm font-semibold text-bark uppercase tracking-wider">
                          {addr.fullName}
                        </h3>
                        {addr.isDefault && (
                          <span className="flex items-center gap-1 text-[10px] font-accent uppercase tracking-wider text-sage bg-sage/10 px-2 py-0.5 rounded-full">
                            <Star className="h-3 w-3" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-bark/60 font-body leading-relaxed">
                        {addr.addressLine1}
                        {addr.addressLine2 && `, ${addr.addressLine2}`}
                        <br />
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-sm text-bark/50 font-body mt-1">
                        {addr.phone}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-bark/30 hover:text-terracotta transition-colors p-1"
                      aria-label="Delete address"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
