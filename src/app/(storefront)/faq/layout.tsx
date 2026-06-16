import type { Metadata } from "next";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { faqGroups } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Jaison Herbals",
  description:
    "Find answers about Jaison Herbals Ayurvedic products — shipping, returns, how to use, storage, and more. 100% natural skincare & haircare from India.",
  alternates: {
    canonical: "https://jaisonskincare.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Jaison Herbals",
    description:
      "Find answers about Jaison Herbals Ayurvedic products — shipping, returns, how to use, storage, and more. 100% natural skincare & haircare from India.",
    url: "https://jaisonskincare.com/faq",
    type: "website",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — Frequently Asked Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Jaison Herbals",
    description:
      "Find answers about Jaison Herbals Ayurvedic products — shipping, returns, how to use, storage, and more.",
  },
};

const allFaqs = faqGroups.flatMap((g) =>
  g.faqs.map((f) => ({ question: f.title, answer: f.content }))
);

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQPageJsonLd faqs={allFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "FAQ", url: "https://jaisonskincare.com/faq" },
        ]}
      />
      {children}
    </>
  );
}
