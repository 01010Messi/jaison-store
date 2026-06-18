"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Package,
  MapPin,
  User,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Shield,
} from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import Button from "@/components/ui/Button";

const accountLinks = [
  {
    href: "/account/orders",
    icon: Package,
    label: "My Orders",
    description: "View your order history and track shipments",
  },
  {
    href: "/account/addresses",
    icon: MapPin,
    label: "Saved Addresses",
    description: "Manage your delivery addresses",
  },
  {
    href: "/account/profile",
    icon: User,
    label: "Profile Settings",
    description: "Update your name, email, and password",
  },
];

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  if (!session) return null;

  const isAdmin = (session.user as { role?: string })?.role === "ADMIN";

  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-8 md:py-12">
        <div className="container-brand">
          <ScrollReveal animation="fade-up">
            <p className="section-label text-sage mb-2">My Account</p>
            <h1 className="font-heading text-2xl md:text-3xl text-bark">
              Welcome, {session.user?.name || "there"}
            </h1>
            <p className="text-sm text-bark/72 font-body mt-1">
              {session.user?.email}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        <div className="max-w-2xl">
          {isAdmin && (
            <ScrollReveal animation="fade-up">
              <Link
                href="/admin"
                className="flex items-center gap-4 p-4 mb-6 bg-bark text-cream rounded-xl border border-bark hover:bg-bark/90 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm text-cream">
                    Admin Dashboard
                  </p>
                  <p className="text-xs text-cream/70 font-body">
                    Manage products, orders, customers, and store settings
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-cream/70 group-hover:text-cream/70 transition-colors" />
              </Link>
            </ScrollReveal>
          )}

          <div className="space-y-3">
            {accountLinks.map((link) => {
              const Icon = link.icon;
              return (
                <ScrollReveal key={link.href} animation="fade-up">
                  <Link
                    href={link.href}
                    className="flex items-center gap-4 p-4 bg-cream rounded-xl border border-border/50 hover:border-gold/50 hover:shadow-warm transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-parchment/50 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-bark/72 group-hover:text-terracotta transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-sm text-bark">
                        {link.label}
                      </p>
                      <p className="text-xs text-bark/72 font-body">
                        {link.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-bark/20 group-hover:text-bark/72 transition-colors" />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <GoldRule variant="simple" width="w-full" className="my-8" />

          {/* Quick links */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/shop" className="flex-1">
              <Button variant="secondary" fullWidth>
                <span className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </span>
              </Button>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-border text-sm font-accent uppercase tracking-wider text-bark/72 hover:text-terracotta hover:border-terracotta/30 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
