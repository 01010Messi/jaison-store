import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Jaison Herbals — WhatsApp, Email & Support",
  description:
    "Get in touch with Jaison Herbals. Reach us via WhatsApp, email, or our contact form for order queries and ingredient questions. Based in Nashik, Maharashtra.",
  alternates: {
    canonical: "https://jaisonskincare.com/contact",
  },
  openGraph: {
    title: "Contact Jaison Herbals — WhatsApp, Email & Support",
    description:
      "Get in touch with Jaison Herbals. Reach us via WhatsApp, email, or our contact form for order queries and ingredient questions. Based in Nashik, Maharashtra.",
    url: "https://jaisonskincare.com/contact",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — contact us for Ayurvedic skincare queries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jaison Herbals — WhatsApp, Email & Support",
    description:
      "Get in touch with Jaison Herbals. Reach us via WhatsApp, email, or our contact form for order queries and ingredient questions. Based in Nashik, Maharashtra.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "Contact Us", url: "https://jaisonskincare.com/contact" },
        ]}
      />
      {children}
    </>
  );
}
