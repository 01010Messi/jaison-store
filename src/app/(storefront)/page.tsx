import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowToUseGuide from "@/components/home/HowToUseGuide";
import BrandTimeline from "@/components/home/BrandTimeline";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InstagramSection from "@/components/home/InstagramSection";
import BlogSection from "@/components/home/BlogSection";

export const metadata: Metadata = {
  title: "jaison | Natural Ayurvedic Beauty — Herbal Skincare & Haircare",
  description:
    "Shop 100% natural Ayurvedic herbal powders for skin & hair care. Ubtan, Amla, Neem, Multani Mitti, Shikakai & more — handcrafted in Nashik, India. Free from chemicals. Free shipping over ₹499.",
  alternates: {
    canonical: "https://jaisonskincare.com",
  },
};

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        Jaison Herbals — Natural Ayurvedic Herbal Powders for Skin &amp; Hair
      </h1>
      <HeroSection />
      <FeaturedProducts />
      <HowToUseGuide />
      <BrandTimeline />
      <TestimonialsSection />
      <InstagramSection />
      <BlogSection />
    </>
  );
}
