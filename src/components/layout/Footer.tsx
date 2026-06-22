"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
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
    <footer className="bg-bark text-cream/80 pb-20 md:pb-0">
      {/* Newsletter strip */}
      <div className="border-b border-cream/10">
        <div className="container-brand section-rhythm-lg flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left: copy */}
          <div className="max-w-xl">
            <p className="font-accent text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: "var(--color-gold-light)" }}>
              — The Journal
            </p>
            <h3
              className="font-heading text-cream font-light leading-[1.05] mb-4 whitespace-nowrap"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Once a month.{" "}
              <span style={{ color: "var(--color-gold-light)", fontStyle: "italic", fontWeight: 300 }}>
                That is it.
              </span>
            </h3>
            <p className="text-base md:text-lg text-cream/70 font-body leading-relaxed">
              Real rituals, real ingredients, real seasons.
              No marketing. Unsubscribe in one click.
            </p>
          </div>
          {/* Right: form */}
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:max-w-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 rounded-full border border-cream/25 text-cream text-sm font-body placeholder:text-cream/35 focus:border-cream/50"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-8 py-4 rounded-full text-bark text-sm font-accent tracking-wider uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--color-gold-light)" }}
            >
              {isLoading ? "..." : "Subscribe"} {!isLoading && "→"}
            </button>
          </form>
        </div>
      </div>
      {/* Main footer */}
      <div className="container-brand pt-16 pb-12">
        {/* Logo section */}
        <div className="text-center mb-12">
          <Image
            src="/images/logo.png"
            alt="Jaison Herbals — Natural Ayurvedic Herbal Powders"
            width={240}
            height={80}
            className="h-20 md:h-24 w-auto mx-auto brightness-[1.8] contrast-[0.9]"
          />
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-accent text-[13px] uppercase tracking-[0.15em] text-gold mb-5">
                {category}
              </h3>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-cream/70 hover:text-cream transition-colors duration-200 font-body"
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
            <h3 className="font-accent text-[13px] uppercase tracking-[0.15em] text-gold mb-5">
              Connect
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:jaisonskincare@gmail.com"
                  className="flex items-center gap-2.5 text-base text-cream/70 hover:text-cream transition-colors font-body"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918600151677"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-base text-cream/70 hover:text-cream transition-colors font-body"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jaison_skincare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-base text-cream/70 hover:text-cream transition-colors font-body"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
            </ul>

            {/* Business Address */}
            <div className="mt-6 pt-5 border-t border-cream/10">
              <div className="flex gap-2.5 text-sm text-cream/70 font-body leading-relaxed">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  60, Floor 6, Business Bay, Shree Hari Kute Marg, Mumbai Naka,
                  Nashik 422002, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-brand py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-cream/70 font-body" suppressHydrationWarning>
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
            <span className="text-[10px] text-cream/70 font-accent uppercase tracking-wider border border-cream/20 px-1.5 py-0.5 rounded-full">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
