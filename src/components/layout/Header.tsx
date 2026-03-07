"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Drawer from "@/components/ui/Drawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Catalog" },
  { href: "/why-jaison", label: "Why Jaison" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { toggleCart, itemCount } = useCartStore();
  const count = mounted ? itemCount() : 0;

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem("announcement-dismissed");
    setAnnouncementDismissed(dismissed === "true");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismissAnnouncement = () => {
    setAnnouncementDismissed(true);
    localStorage.setItem("announcement-dismissed", "true");
  };

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
        {/* Announcement Bar */}
        {mounted && !announcementDismissed && (
          <div className="bg-bark text-cream/90 text-center py-2 px-4 relative">
            <p className="text-xs font-accent tracking-[0.12em]">
              Pure Ayurvedic Skincare for Naturally Healthy Skin
            </p>
            <button
              onClick={handleDismissAnnouncement}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Main Header — Logo centered with actions */}
        <div className="container-brand">
          <div className="flex items-center justify-between py-3 md:py-4">
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
                className="p-2 text-bark/70 hover:text-bark transition-colors hidden md:block"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="jaison"
                width={220}
                height={80}
                className="h-16 md:h-24 w-auto mix-blend-multiply"
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
