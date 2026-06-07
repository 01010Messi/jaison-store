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
    <footer className="bg-bark text-cream/80">
      {/* Newsletter bar — prototype style */}
      <div className="border-b border-cream/10">
        <div className="container-brand py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-gold" />
              <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-gold">
                The Journal
              </p>
            </div>
            <h3 className="font-heading text-3xl md:text-4xl text-cream leading-tight">
              Once a month.{" "}
              <em className="not-italic" style={{ color: "#C4956A" }}>
                That is it.
              </em>
            </h3>
            <p className="font-body text-sm text-cream/50 mt-2 max-w-xs">
              Real rituals, real ingredients, real seasons. No marketing. Unsubscribe in one click.
            </p>
          </div>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex gap-0 md:min-w-[400px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 bg-cream/8 border border-cream/20 rounded-l-full text-cream text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-gold/50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 bg-terracotta text-cream text-sm font-accent uppercase tracking-wider rounded-r-full hover:bg-terracotta/90 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {isLoading ? "..." : "Subscribe →"}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-brand pt-10 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-2">
            <Image
              src="/images/logo.png"
              alt="jaison"
              width={64}
              height={64}
              className="h-16 w-auto brightness-[1.8] contrast-[0.9]"
            />
            <p className="font-heading text-lg text-cream tracking-wide">
              Jaison Herbals
            </p>
            <p className="text-xs text-cream/40 font-body leading-relaxed">
              The Essence of Herbs in Every Gram
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-accent text-[10px] uppercase tracking-[0.15em] text-gold mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-cream transition-colors font-body"
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
            <h3 className="font-accent text-[10px] uppercase tracking-[0.15em] text-gold mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
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
                  href="https://wa.me/918600151677"
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
            <div className="mt-4 pt-4 border-t border-cream/10">
              <div className="flex gap-2 text-[11px] text-cream/40 font-body leading-relaxed">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <span>60, Floor 6, Business Bay, Nashik 422002, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-brand py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/40 font-body">
            &copy; {new Date().getFullYear()} Jaison Herbals. Handcrafted with love in India.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-cream/40 font-body">UPI</span>
            <span className="text-xs text-cream/40 font-body italic font-bold">VISA</span>
            <span className="text-xs text-cream/40 font-body">RuPay</span>
            <span className="text-cream/20">&bull;</span>
            <span className="text-[10px] text-cream/40 font-accent uppercase tracking-wider border border-cream/20 px-1.5 py-0.5 rounded-sm">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
