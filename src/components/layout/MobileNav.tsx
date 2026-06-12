"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: Grid3X3, label: "Shop" },
  { href: "#cart", icon: ShoppingBag, label: "Potli", isCart: true },
  { href: "/account", icon: User, label: "Account" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { openCart, itemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const count = mounted ? itemCount() : 0;
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-cream/95 backdrop-blur-md border-t border-border/50",
        "transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
        "safe-bottom"
      )}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "#cart";
          const Icon = item.icon;

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={openCart}
                className="relative flex flex-col items-center justify-center gap-0.5 px-4 py-1"
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    "text-bark/60"
                  )}
                />
                {count > 0 && (
                  <span className="absolute top-0 right-2 flex items-center justify-center w-4 h-4 text-[9px] font-accent font-bold bg-terracotta text-cream rounded-full">
                    {count}
                  </span>
                )}
                <span className="text-[10px] font-accent text-bark/60">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-0.5 px-4 py-1"
            >
              {isActive && (
                <span className="absolute top-0 w-1 h-1 bg-terracotta rounded-full" />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-terracotta" : "text-bark/60"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-accent",
                  isActive ? "text-terracotta" : "text-bark/60"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
