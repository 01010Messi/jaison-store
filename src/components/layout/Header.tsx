"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Drawer from "@/components/ui/Drawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Catalog" },
  { href: "/blog", label: "Blog" },
  { href: "/why-jaison", label: "Why Jaison" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { toggleCart, itemCount } = useCartStore();
  const count = mounted ? itemCount() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm"
            : "bg-cream"
        )}
      >
        {/* Tagline Bar */}
        <div className="bg-bark text-cream/90 text-center py-2 px-4">
          <p className="text-xs font-accent tracking-[0.15em] uppercase">
            Essence of Herbs in Every Gram
          </p>
        </div>

        {/* Main Header — Logo centered with actions */}
        <div className="container-brand">
          <div className="flex items-center justify-between py-1 md:py-1.5">
            {/* Left: Mobile menu / Desktop search */}
            <div className="flex items-center gap-3 w-[100px]">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-bark/70 hover:text-bark transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-bark/70 hover:text-bark transition-colors hidden md:block"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex-shrink-0 overflow-hidden h-12 md:h-16 flex items-center">
              <Image
                src="/images/logo.png"
                alt="jaison"
                width={260}
                height={96}
                className="h-20 md:h-28 w-auto mix-blend-multiply -my-4"
                priority
              />
            </Link>

            {/* Right: Account + Cart */}
            <div className="flex items-center gap-3 w-[100px] justify-end">
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

        {/* Navigation Bar — below logo */}
        <nav className="hidden md:block border-t border-bark/10">
          <div className="container-brand">
            <div className="flex items-center justify-center gap-8 py-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "gold-underline text-sm font-body font-medium tracking-wide transition-colors duration-200 text-bark/70 hover:text-bark",
                    pathname === link.href && "text-bark"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-bark/40 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div
            className="bg-cream shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-brand py-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <Search className="h-5 w-5 text-bark/40 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-bark font-body text-lg outline-none placeholder:text-bark/30"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-bark/50 hover:text-bark transition-colors"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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
