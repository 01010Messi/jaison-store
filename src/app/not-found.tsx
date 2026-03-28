import Link from "next/link";
import { Search } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";

const popularLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop/ubtan-powder", label: "Ubtan Powder" },
  { href: "/shop/aamla-powder", label: "Aamla Powder" },
  { href: "/shop/neem-powder", label: "Neem Powder" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQs" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-warm flex flex-col items-center justify-center px-4 py-16 text-center">
      <p className="font-heading text-8xl text-bark/10">404</p>
      <h1 className="font-heading text-2xl md:text-3xl text-bark mt-4">
        Page Not Found
      </h1>
      <div className="flex justify-center mt-3">
        <GoldRule variant="leaf" width="w-24" />
      </div>
      <p className="text-sm text-bark/50 font-body mt-4 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try one of these popular pages instead.
      </p>
      <div className="flex gap-3 mt-8">
        <Link
          href="/"
          className="px-6 py-2.5 bg-bark text-cream rounded-sm font-accent text-sm uppercase tracking-wider hover:bg-bark/90 transition-all"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-2.5 border border-border text-bark rounded-sm font-accent text-sm uppercase tracking-wider hover:border-bark transition-all"
        >
          Shop Products
        </Link>
      </div>

      <div className="mt-12 w-full max-w-md">
        <div className="flex items-center gap-2 text-bark/40 mb-4 justify-center">
          <Search className="h-4 w-4" />
          <span className="text-xs font-accent uppercase tracking-wider">
            Popular Pages
          </span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {popularLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-body text-bark/60 bg-cream border border-border rounded-sm hover:text-terracotta hover:border-terracotta/30 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
