"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/account/profile");
      const data = await res.json();
      if (data.user) {
        setName(data.user.name || "");
        setEmail(data.user.email || "");
        setPhone(data.user.phone || "");
      }
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchProfile();
  }, [status, router, fetchProfile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error();
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
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
            className="inline-flex items-center gap-1 text-xs font-accent uppercase tracking-wider text-bark/72 hover:text-bark transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            My Account
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl text-bark">
            Profile Settings
          </h1>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        <ScrollReveal animation="fade-up">
          <div className="max-w-lg">
            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                helperText="Email cannot be changed"
              />
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="10-digit mobile number"
              />

              <GoldRule variant="simple" width="w-full" className="my-4" />

              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
