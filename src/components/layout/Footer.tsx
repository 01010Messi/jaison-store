import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import SectionDivider from "@/components/decorative/SectionDivider";

const footerLinks = {
  "Skin Care": [
    { href: "/shop/ubtan", label: "Ubtan" },
    { href: "/shop/multani-mitti", label: "Multani Mitti" },
    { href: "/shop/neem-powder", label: "Neem Powder" },
    { href: "/shop/orange-peel-powder", label: "Orange Peel" },
    { href: "/shop/nagmotha-powder", label: "Nagmotha" },
  ],
  "Hair Care": [
    { href: "/shop/amla-powder", label: "Amla Powder" },
    { href: "/shop/mhendi-powder", label: "Mhendi" },
    { href: "/shop/reetha-powder", label: "Reetha" },
    { href: "/shop/shikakai-powder", label: "Shikakai" },
    { href: "/shop/silkeshine", label: "Silkeshine" },
  ],
  Help: [
    { href: "/faq", label: "FAQs" },
    { href: "/returns-policy", label: "Returns & Refunds" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bark text-cream/80">
      {/* Main footer */}
      <div className="container-brand pt-16 pb-12">
        {/* Logo section */}
        <div className="text-center mb-12">
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            className="mx-auto mb-2 text-sage-light"
            fill="currentColor"
          >
            <ellipse cx="12" cy="7" rx="3" ry="7" opacity="0.8" />
            <ellipse cx="7" cy="9" rx="2.5" ry="5.5" transform="rotate(-25 7 9)" opacity="0.6" />
            <ellipse cx="17" cy="9" rx="2.5" ry="5.5" transform="rotate(25 17 9)" opacity="0.6" />
          </svg>
          <h2 className="font-heading text-3xl text-cream tracking-wide">
            jaison
          </h2>
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
                  href="mailto:hello@jaisonskincare.com"
                  className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors font-body"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`}
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
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 bg-cream/10 border border-cream/20 rounded-sm text-cream text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-gold/50"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gold text-cream text-sm font-body font-medium uppercase tracking-wider rounded-sm hover:bg-gold-dark transition-colors"
              >
                Subscribe
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
          <div className="flex items-center gap-4 text-xs text-cream/40 font-body">
            <span>UPI</span>
            <span>&bull;</span>
            <span>Cards</span>
            <span>&bull;</span>
            <span>Netbanking</span>
            <span>&bull;</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
