import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowToUseGuide from "@/components/home/HowToUseGuide";
import BrandTimeline from "@/components/home/BrandTimeline";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";

export const metadata: Metadata = {
  title: {
    absolute:
      "Natural Ayurvedic Beauty — Herbal Skincare & Haircare | jaison",
  },
  description:
    "Shop 100% natural Ayurvedic herbal powders for skin & hair. Ubtan, Amla, Neem, Multani Mitti, Shikakai & more — handcrafted in Nashik. Free from chemicals.",
  openGraph: {
    type: "website",
    url: "https://jaisonskincare.com",
    title: "Natural Ayurvedic Beauty — Herbal Skincare & Haircare | jaison",
    description:
      "Shop 100% natural Ayurvedic herbal powders for skin & hair. Ubtan, Amla, Neem, Multani Mitti, Shikakai & more — handcrafted in Nashik.",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — Natural Ayurvedic Beauty Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Natural Ayurvedic Beauty — Herbal Skincare & Haircare | jaison",
    description:
      "Shop 100% natural Ayurvedic herbal powders for skin & hair. Handcrafted in Nashik. Free from chemicals.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
  alternates: {
    canonical: "https://jaisonskincare.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* LCP preload hint — only on homepage where the hero video lives */}
      <link rel="preload" as="image" href="/images/hero-poster.webp" fetchPriority="high" />
      <h1 className="sr-only">
        Jaison Herbals — Natural Ayurvedic Herbal Powders for Skin &amp; Hair
      </h1>
      <HeroSection />
      <FeaturedProducts />
      <HowToUseGuide />
      <BrandTimeline />
      <TestimonialsSection />
      {/* InstagramSection deferred — pending real photo/video assets */}
      <BlogSection />
    </>
  );
}
