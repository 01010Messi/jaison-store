"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Drawer from "@/components/ui/Drawer";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=skin-care", label: "Skin Care" },
  { href: "/shop?category=hair-care", label: "Hair Care" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, itemCount } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-cream/95 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-brand">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-bark/70 hover:text-bark transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop nav — left */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "gold-underline text-sm font-body font-medium tracking-wide transition-colors duration-200",
                    isScrolled || !isHome
                      ? "text-bark/70 hover:text-bark"
                      : "text-bark/80 hover:text-bark"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo — center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-auto"
            >
              <div className="text-center">
                {/* Leaf motif */}
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 24 20"
                  className="mx-auto mb-0.5 text-sage"
                  fill="currentColor"
                >
                  <ellipse cx="12" cy="7" rx="3" ry="7" opacity="0.8" />
                  <ellipse cx="7" cy="9" rx="2.5" ry="5.5" transform="rotate(-25 7 9)" opacity="0.6" />
                  <ellipse cx="17" cy="9" rx="2.5" ry="5.5" transform="rotate(25 17 9)" opacity="0.6" />
                </svg>
                <span className="font-heading text-2xl md:text-3xl text-bark tracking-wide">
                  jaison
                </span>
              </div>
            </Link>

            {/* Desktop nav — right */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "gold-underline text-sm font-body font-medium tracking-wide transition-colors duration-200",
                    isScrolled || !isHome
                      ? "text-bark/70 hover:text-bark"
                      : "text-bark/80 hover:text-bark"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions — right */}
            <div className="flex items-center gap-3">
              <button
                className="p-2 text-bark/70 hover:text-bark transition-colors hidden md:block"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="/account"
                className="p-2 text-bark/70 hover:text-bark transition-colors hidden md:block"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                onClick={toggleCart}
                className="relative p-2 text-bark/70 hover:text-bark transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4.5 h-4.5 min-w-[18px] text-[10px] font-accent font-bold bg-terracotta text-cream rounded-full">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Menu"
        side="left"
      >
        <nav className="px-6 py-8 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 font-heading text-xl text-bark hover:text-terracotta transition-colors border-b border-border-light"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 space-y-1">
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 font-body text-sm text-bark/70 hover:text-bark transition-colors"
            >
              My Account
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 font-body text-sm text-bark/70 hover:text-bark transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/returns-policy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 font-body text-sm text-bark/70 hover:text-bark transition-colors"
            >
              Returns & Refunds
            </Link>
          </div>
        </nav>
      </Drawer>
    </>
  );
}
