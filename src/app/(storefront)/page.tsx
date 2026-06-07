import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import HomeCatalogue from "@/components/home/HomeCatalogue";
import BotanicalTicker from "@/components/home/BotanicalTicker";
import ManifestoSection from "@/components/home/ManifestoSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview from "@/components/home/BlogPreview";

export const metadata: Metadata = {
  title: "Jaison — Single-Ingredient Herbal Powders for Skin & Hair | Since 1970",
  description:
    "100% natural Ayurvedic herbal powders. One herb. One jar. No preservatives. No fillers. Trusted since 1970. Free shipping over ₹499.",
  alternates: {
    canonical: "https://jaisonskincare.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HomeCatalogue />
      <BotanicalTicker />
      <ManifestoSection />
      <TestimonialsSection />
      <BlogPreview />
    </>
  );
}
