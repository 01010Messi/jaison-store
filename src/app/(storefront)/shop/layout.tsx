import type { Metadata } from "next";
import { CollectionPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Shop Ayurvedic Herbal Powders — Skin & Hair Care",
  description:
    "Browse our collection of 100% natural Ayurvedic herbal powders. Ubtan, Amla, Neem, Shikakai, Multani Mitti, Orange Peel & more. Starting at ₹250. Free shipping above ₹499.",
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
