import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Jaison Herbals. Reach us via WhatsApp, email, or contact form. We respond within 24 hours. Based in Nashik, Maharashtra.",
  alternates: {
    canonical: "https://jaisonskincare.com/contact",
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
