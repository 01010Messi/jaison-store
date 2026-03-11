"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  Tag,
  MessageSquare,
  Users,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: Layers, label: "Categories" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/coupons", icon: Tag, label: "Coupons" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-warm">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen bg-surface-warm flex">
      {/* Sidebar */}
      <aside className="w-56 bg-bark text-cream shrink-0 hidden md:flex flex-col fixed h-full z-30">
        <div className="p-5 border-b border-cream/10">
          <Link href="/" className="block">
            <h1 className="font-heading text-xl tracking-wider">jaison</h1>
            <p className="text-[10px] font-accent uppercase tracking-[0.15em] text-cream/40">
              Admin Panel
            </p>
          </Link>
        </div>

        <nav className="flex-1 py-4">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-5 py-2.5 text-sm font-body transition-colors",
                  isActive
                    ? "bg-cream/10 text-cream"
                    : "text-cream/50 hover:text-cream hover:bg-cream/5"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-5 border-t border-cream/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-cream/40 hover:text-cream transition-colors font-accent uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-56">
        {/* Mobile header */}
        <div className="md:hidden bg-bark text-cream p-4 flex items-center justify-between sticky top-0 z-30">
          <Link href="/admin">
            <h1 className="font-heading text-lg tracking-wider">jaison</h1>
          </Link>
          <span className="text-[10px] font-accent uppercase tracking-wider text-cream/40">
            Admin
          </span>
        </div>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
