"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import Drawer from "@/components/ui/Drawer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const skinCareProducts = [
  { href: "/shop/neem-powder", label: "Neem" },
  { href: "/shop/multani-mitti-powder", label: "Multani Mitti" },
  { href: "/shop/orange-peel-powder", label: "Orange Peel" },
  { href: "/shop/ubtan-powder", label: "Ubtan" },
  { href: "/shop/nagarmotha-powder", label: "Nagarmotha" },
  { href: "/shop/rose-petal-powder", label: "Rose Petal" },
];

const hairCareProducts = [
  { href: "/shop/amla-powder", label: "Amla" },
  { href: "/shop/shikakai-powder", label: "Shikakai" },
  { href: "/shop/reetha-powder", label: "Reetha" },
  { href: "/shop/bhringraj-powder", label: "Bhringraj" },
  { href: "/shop/mehendi-powder", label: "Mehendi" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Skin Care", dropdown: skinCareProducts },
  { href: "/shop", label: "Hair Care", dropdown: hairCareProducts },
  { href: "/our-story", label: "Our Story" },
  { href: "/why-powder", label: "Why Powder" },
  { href: "/find-your-ritual", label: "Find Your Ritual" },
  { href: "/shop", label: "Shop All" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

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
        <AnnouncementBar />

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

            {/* Right: Account + POTLI */}
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
                className="relative flex items-center gap-1.5 bg-bark text-cream rounded-full px-3.5 py-1.5 text-[11px] font-accent tracking-[0.12em] uppercase hover:bg-bark-light transition-colors"
                aria-label="Open potli"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>POTLI</span>
                {count > 0 && (
                  <span className="flex items-center justify-center min-w-[16px] h-4 text-[9px] font-bold bg-gold text-bark rounded-full px-1">
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
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && handleDropdownEnter(link.label)}
                  onMouseLeave={() => link.dropdown && handleDropdownLeave()}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-0.5 text-[13px] font-body font-medium tracking-wide transition-colors duration-200 text-bark/70 hover:text-bark gold-underline",
                      pathname === link.href && "text-bark"
                    )}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        activeDropdown === link.label && "rotate-180"
                      )} />
                    )}
                  </Link>

                  {link.dropdown && activeDropdown === link.label && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-cream border border-bark/10 shadow-warm rounded-sm min-w-[160px] py-2 z-50"
                      onMouseEnter={() => handleDropdownEnter(link.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-[12px] font-body text-bark/70 hover:text-bark hover:bg-parchment transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 font-heading text-xl text-bark hover:text-terracotta transition-colors border-b border-border-light"
          >
            Home
          </Link>

          {/* Skin Care accordion */}
          <div className="border-b border-border-light">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Skin Care" ? null : "Skin Care")}
              className="flex items-center justify-between w-full py-3 font-heading text-xl text-bark hover:text-terracotta transition-colors"
            >
              Skin Care
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileExpanded === "Skin Care" && "rotate-180")} />
            </button>
            {mobileExpanded === "Skin Care" && (
              <div className="pb-2 space-y-0.5">
                {skinCareProducts.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 pl-4 text-sm font-body text-bark/70 hover:text-bark transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hair Care accordion */}
          <div className="border-b border-border-light">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Hair Care" ? null : "Hair Care")}
              className="flex items-center justify-between w-full py-3 font-heading text-xl text-bark hover:text-terracotta transition-colors"
            >
              Hair Care
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileExpanded === "Hair Care" && "rotate-180")} />
            </button>
            {mobileExpanded === "Hair Care" && (
              <div className="pb-2 space-y-0.5">
                {hairCareProducts.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 pl-4 text-sm font-body text-bark/70 hover:text-bark transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { href: "/our-story", label: "Our Story" },
            { href: "/why-powder", label: "Why Powder" },
            { href: "/find-your-ritual", label: "Find Your Ritual" },
            { href: "/shop", label: "Shop All" },
          ].map((link) => (
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
            {[
              { href: "/account", label: "My Account" },
              { href: "/faq", label: "FAQ" },
              { href: "/returns-policy", label: "Returns & Refunds" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 font-body text-sm text-bark/70 hover:text-bark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </Drawer>
    </>
  );
}
