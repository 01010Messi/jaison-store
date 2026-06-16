import type { Metadata } from "next";
import { CollectionPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Shop Ayurvedic Herbal Powders — Skin & Hair Care",
  description:
    "Browse 100% natural Ayurvedic herbal powders — Ubtan, Amla, Neem, Shikakai, Multani Mitti & more. Starting at ₹250. Free shipping above ₹499.",
  openGraph: {
    type: "website",
    url: "https://jaisonskincare.com/shop",
    title: "Shop Ayurvedic Herbal Powders — Skin & Hair Care | jaison",
    description:
      "Browse 100% natural Ayurvedic herbal powders — Ubtan, Amla, Neem, Shikakai, Multani Mitti & more. Starting at ₹250. Free shipping above ₹499.",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — Natural Ayurvedic Herbal Powders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Ayurvedic Herbal Powders | jaison",
    description:
      "Browse 100% natural Ayurvedic herbal powders for skin & hair. Starting at ₹250. Free shipping above ₹499.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
  alternates: {
    canonical: "https://jaisonskincare.com/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CollectionPageJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "Shop", url: "https://jaisonskincare.com/shop" },
        ]}
      />
      {children}
    </>
  );
}
