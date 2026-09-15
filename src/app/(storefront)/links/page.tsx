import Image from "next/image";
import type { Metadata } from "next";
import { Instagram, ShoppingBag, Globe } from "lucide-react";
import GlowPillLink from "@/components/ui/GlowPillLink";
import GoldRule from "@/components/decorative/GoldRule";

export const metadata: Metadata = {
  title: "Jaison Skincare — All Our Links",
  description:
    "Find Jaison Skincare everywhere: shop on our website, shop on Amazon, and follow us on Instagram.",
  alternates: {
    canonical: "https://jaisonskincare.com/links",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const links = [
  {
    label: "Shop on Amazon",
    href: "https://amzn.in/d/4ncuoiG",
    icon: ShoppingBag,
  },
  {
    label: "Follow on Instagram",
    href: "https://instagram.com/jaison_skincare",
    icon: Instagram,
  },
  {
    label: "Visit Our Website",
    href: "https://jaisonskincare.com",
    icon: Globe,
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-bark flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm mx-auto text-center">
        <Image
          src="/images/logo.png"
          alt="Jaison Skincare"
          width={96}
          height={96}
          className="mx-auto rounded-full"
          priority
        />
        <h1 className="mt-6 font-heading text-2xl md:text-3xl text-cream font-light tracking-wide">
          Jaison Skincare
        </h1>
        <p className="mt-2 font-body text-sm text-cream/70">
          Ayurvedic herbal skincare, made with care in India.
        </p>
        <div className="flex justify-center mt-5">
          <GoldRule variant="leaf" width="w-24" />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {links.map(({ label, href, icon: Icon }) => (
            <GlowPillLink
              key={label}
              href={href}
              hoverShadow="0 0 28px rgba(254, 250, 224, 0.35)"
              className="justify-center bg-cream/10 text-cream border border-cream/25 hover:bg-cream/15 py-4"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </GlowPillLink>
          ))}
        </div>
      </div>
    </div>
  );
}
