import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import HowToUseGuide from "@/components/home/HowToUseGuide";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview from "@/components/home/BlogPreview";
import InstagramSection from "@/components/home/InstagramSection";
import SectionDivider from "@/components/decorative/SectionDivider";

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
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
      <SectionDivider variant="mandala" />
      <HowToUseGuide />
      <TestimonialsSection />
      <SectionDivider variant="gold" />
      <BlogPreview />
      <InstagramSection />
    </>
  );
}
