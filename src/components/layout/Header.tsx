"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, User, Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Drawer from "@/components/ui/Drawer";

const skinCareItems = [
  { label: "Ubtan Powder", href: "/shop/ubtan-powder", dot: "#D4A843" },
  { label: "Neem Powder", href: "/shop/neem-powder", dot: "#4A7C59" },
  { label: "Multani Mitti", href: "/shop/multani-mitti", dot: "#C17A5A" },
  { label: "Orange Peel", href: "/shop/orange-peel-powder", dot: "#E8793A" },
  { label: "Rose Petal", href: "/shop/rose-petal-powder", dot: "#D4748C" },
  { label: "Nagarmotha", href: "/shop/nagarmotha-powder", dot: "#8B7355" },
];

const hairCareItems = [
  { label: "Amla Powder", href: "/shop/aamla-powder", dot: "#6B9E5E" },
  { label: "Bhringraj", href: "/shop/bhringraj-powder", dot: "#2D6B4A" },
  { label: "Mehendi", href: "/shop/mehendi-powder", dot: "#5C8A3C" },
  { label: "Reetha", href: "/shop/reetha-powder", dot: "#8B5E3C" },
  { label: "Shikakai", href: "/shop/shikakai-powder", dot: "#A07840" },
];

interface DropdownMenuProps {
  items: { label: string; href: string; dot: string }[];
  onClose: () => void;
}

function DropdownMenu({ items, onClose }: DropdownMenuProps) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 bg-cream border border-bark/10 rounded-xl shadow-sm py-2 px-1 min-w-[180px]">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 hover:bg-parchment rounded-lg text-sm text-bark transition-colors"
        >
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.dot }}
          />
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"skin" | "hair" | null>(null);
  const [skinAccordionOpen, setSkinAccordionOpen] = useState(false);
  const [hairAccordionOpen, setHairAccordionOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toggleCart, itemCount } = useCartStore();
  const count = mounted ? itemCount() : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleDropdownEnter = (menu: "skin" | "hair") => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(menu);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm">
        {/* Row 1 — Announcement marquee */}
        <AnnouncementBar />

        {/* Row 2 — Logo only */}
        <div className="bg-cream py-2 flex flex-col items-center">
          <Link href="/" className="flex-shrink-0 overflow-hidden h-10 md:h-14 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Jaison Skincare"
              width={260}
              height={96}
              className="h-16 md:h-24 w-auto mix-blend-multiply -my-3"
              priority
            />
          </Link>
        </div>

        {/* Row 3 — Navigation (desktop) / Hamburger row (mobile) */}
        <div className="bg-cream border-b border-bark/10">
          {/* Desktop nav */}
          <div className="hidden md:block relative">
            {/* Left: Search */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-bark/60 hover:text-bark transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-7 py-3">
              <Link
                href="/"
                className="font-accent text-[13px] tracking-widest uppercase text-bark/70 hover:text-bark transition-colors"
              >
                Home
              </Link>

              {/* Skin Care dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("skin")}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center gap-1 font-accent text-[13px] tracking-widest uppercase text-bark/70 hover:text-bark transition-colors py-2">
                  Skin Care
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {openDropdown === "skin" && (
                  <DropdownMenu
                    items={skinCareItems}
                    onClose={() => setOpenDropdown(null)}
                  />
                )}
              </div>

              {/* Hair Care dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("hair")}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center gap-1 font-accent text-[13px] tracking-widest uppercase text-bark/70 hover:text-bark transition-colors py-2">
                  Hair Care
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {openDropdown === "hair" && (
                  <DropdownMenu
                    items={hairCareItems}
                    onClose={() => setOpenDropdown(null)}
                  />
                )}
              </div>

              <Link
                href="/our-story"
                className="font-accent text-[13px] tracking-widest uppercase text-bark/70 hover:text-bark transition-colors"
              >
                Our Story
              </Link>
              <Link
                href="/why-powder"
                className="font-accent text-[13px] tracking-widest uppercase text-bark/70 hover:text-bark transition-colors"
              >
                Why Powder
              </Link>
              <Link
                href="/find-your-ritual"
                className="font-accent text-[13px] tracking-widest uppercase text-bark/70 hover:text-bark transition-colors"
              >
                Find Your Ritual
              </Link>
              <Link
                href="/shop"
                className="font-accent text-[13px] tracking-widest uppercase text-bark/70 hover:text-bark transition-colors"
              >
                Shop All
              </Link>
            </div>

            {/* Right: Account + POTLI */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Link
                href="/account"
                className="p-1.5 text-bark/60 hover:text-bark transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                onClick={toggleCart}
                className="flex items-center gap-1.5 bg-bark text-cream rounded-full px-4 py-2 hover:bg-bark/90 transition-colors relative"
                aria-label="Potli"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="font-accent text-[13px] tracking-widest">POTLI</span>
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-accent font-bold bg-gold text-bark rounded-full">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile row: hamburger | gap | POTLI */}
          <div className="md:hidden flex items-center justify-between px-4 py-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-bark/70 hover:text-bark transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={toggleCart}
              className="flex items-center gap-1.5 bg-bark text-cream rounded-full px-3 py-1.5 hover:bg-bark/90 transition-colors relative"
              aria-label="Potli"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-accent font-bold bg-gold text-bark rounded-full">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(96,108,56,0.5)" }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "#EFE4C5" }}
          >
            <div className="max-w-screen-xl mx-auto px-6 md:px-14 py-6 md:py-8">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-4 border-b-2"
                style={{ borderColor: "rgba(131,67,22,0.2)" }}
              >
                <Search
                  className="h-5 w-5 flex-shrink-0"
                  style={{ color: "#834316" }}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search — amla, neem, ubtan..."
                  className="flex-1 bg-transparent text-bark font-heading text-2xl md:text-3xl font-light tracking-tight outline-none placeholder:text-bark/25 pb-3"
                  style={{ fontStyle: "italic" }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="pb-3 p-1 text-bark/40 hover:text-bark transition-colors"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
              <p className="mt-3 font-accent text-[10px] tracking-[0.18em] uppercase" style={{ color: "rgba(96,108,56,0.35)" }}>
                Type a herb name, skin concern, or ingredient
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        className="w-[280px] max-w-[280px]"
      >
        <nav className="px-4 py-6">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 border-b border-bark/5 font-accent text-sm tracking-widest uppercase text-bark"
          >
            Home
          </Link>

          {/* Skin Care accordion */}
          <div className="border-b border-bark/5">
            <button
              onClick={() => setSkinAccordionOpen((v) => !v)}
              className="flex items-center justify-between w-full py-3 font-accent text-sm tracking-widest uppercase text-bark"
            >
              Skin Care
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${skinAccordionOpen ? "rotate-180" : ""}`}
              />
            </button>
            {skinAccordionOpen && (
              <div className="pb-2 pl-3 flex flex-col gap-1">
                {skinCareItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-2 text-sm text-bark/70 hover:text-bark transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.dot }}
                    />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Hair Care accordion */}
          <div className="border-b border-bark/5">
            <button
              onClick={() => setHairAccordionOpen((v) => !v)}
              className="flex items-center justify-between w-full py-3 font-accent text-sm tracking-widest uppercase text-bark"
            >
              Hair Care
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${hairAccordionOpen ? "rotate-180" : ""}`}
              />
            </button>
            {hairAccordionOpen && (
              <div className="pb-2 pl-3 flex flex-col gap-1">
                {hairCareItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-2 text-sm text-bark/70 hover:text-bark transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.dot }}
                    />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/our-story"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 border-b border-bark/5 font-accent text-sm tracking-widest uppercase text-bark"
          >
            Our Story
          </Link>
          <Link
            href="/why-powder"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 border-b border-bark/5 font-accent text-sm tracking-widest uppercase text-bark"
          >
            Why Powder
          </Link>
          <Link
            href="/find-your-ritual"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 border-b border-bark/5 font-accent text-sm tracking-widest uppercase text-bark"
          >
            Find Your Ritual
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 border-b border-bark/5 font-accent text-sm tracking-widest uppercase text-bark"
          >
            Shop All
          </Link>

          <div className="pt-4 flex flex-col gap-1">
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 font-accent text-xs tracking-widest uppercase text-bark/50 hover:text-bark transition-colors"
            >
              My Account
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 font-accent text-xs tracking-widest uppercase text-bark/50 hover:text-bark transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 font-accent text-xs tracking-widest uppercase text-bark/50 hover:text-bark transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </Drawer>
    </>
  );
}
