"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import SectionDivider from "@/components/decorative/SectionDivider";
import toast from "react-hot-toast";

const footerLinks = {
  "Skin Care": [
    { href: "/shop/ubtan-powder", label: "Ubtan Powder" },
    { href: "/shop/multani-mitti", label: "Multani Mitti" },
    { href: "/shop/neem-powder", label: "Neem Powder" },
    { href: "/shop/orange-peel-powder", label: "Orange Peel" },
    { href: "/shop/nagarmotha-powder", label: "Nagarmotha" },
  ],
  "Hair Care": [
    { href: "/shop/aamla-powder", label: "Aamla Powder" },
    { href: "/shop/mehendi-powder", label: "Mehendi" },
    { href: "/shop/reetha-powder", label: "Reetha" },
    { href: "/shop/shikakai-powder", label: "Shikakai" },
  ],
  Help: [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQs" },
    { href: "/returns-policy", label: "Returns & Refunds" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Welcome to the jaison family!");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-bark text-cream/80">
      {/* Main footer */}
      <div className="container-brand pt-16 pb-12">
        {/* Logo section */}
        <div className="text-center mb-12">
          <Image
            src="/images/logo.png"
            alt="jaison"
            width={180}
            height={64}
            className="h-14 w-auto mx-auto mb-2 brightness-[1.8] contrast-[0.9]"
          />
          <p className="text-sm text-cream/50 mt-2 font-body">
            The Essence of Herbs in Every Grain
          </p>
        </div>

        <SectionDivider variant="gold" className="py-4" />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-cream transition-colors duration-200 font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect column */}
          <div>
            <h3 className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:Jaisonskincare@gmail.com"
                  className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors font-body"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918600151677"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors font-body"
                >
                  <Phone className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jaison_skincare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors font-body"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  Instagram
                </a>
              </li>
            </ul>

            {/* Business Address */}
            <div className="mt-5 pt-4 border-t border-cream/10">
              <div className="flex gap-2 text-[11px] text-cream/40 font-body leading-relaxed">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <span>
                  60, Floor 6, Business Bay, Shree Hari Kute Marg, Mumbai Naka,
                  Nashik 422002, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 pt-10 border-t border-cream/10">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-heading text-xl text-cream mb-2">
              Ancient Beauty Wisdom
            </h3>
            <p className="text-sm text-cream/50 mb-5 font-body">
              Subscribe for Ayurvedic tips and exclusive offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-2.5 bg-cream/10 border border-cream/20 rounded-sm text-cream text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-gold/50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-gold text-cream text-sm font-body font-medium uppercase tracking-wider rounded-sm hover:bg-gold-dark transition-colors disabled:opacity-50"
              >
                {isLoading ? "..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-brand py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/40 font-body">
            &copy; {new Date().getFullYear()} Jaison Herbals. Handcrafted with love in India.
          </p>
          <div className="flex items-center gap-3">
            {/* UPI */}
            <svg viewBox="0 0 40 16" className="h-4 w-auto opacity-40">
              <text x="0" y="13" fill="currentColor" className="text-cream" fontSize="12" fontWeight="600" fontFamily="system-ui">UPI</text>
            </svg>
            {/* Visa */}
            <svg viewBox="0 0 48 16" className="h-4 w-auto opacity-40">
              <text x="0" y="13" fill="currentColor" className="text-cream" fontSize="11" fontWeight="700" fontFamily="system-ui" fontStyle="italic">VISA</text>
            </svg>
            {/* Mastercard */}
            <svg viewBox="0 0 24 16" className="h-4 w-auto opacity-40">
              <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" className="text-cream" strokeWidth="1.5" />
              <circle cx="16" cy="8" r="7" fill="none" stroke="currentColor" className="text-cream" strokeWidth="1.5" />
            </svg>
            {/* RuPay */}
            <svg viewBox="0 0 52 16" className="h-4 w-auto opacity-40">
              <text x="0" y="13" fill="currentColor" className="text-cream" fontSize="10" fontWeight="600" fontFamily="system-ui">RuPay</text>
            </svg>
            <span className="text-cream/20">&bull;</span>
            {/* COD */}
            <span className="text-[10px] text-cream/40 font-accent uppercase tracking-wider border border-cream/20 px-1.5 py-0.5 rounded-sm">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
