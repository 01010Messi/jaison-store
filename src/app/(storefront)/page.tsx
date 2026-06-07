import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import HomeCatalogue from "@/components/home/HomeCatalogue";
import BotanicalTicker from "@/components/home/BotanicalTicker";
import ManifestoSection from "@/components/home/ManifestoSection";
import ShippingGuarantees from "@/components/home/ShippingGuarantees";
import TrustPillars from "@/components/home/TrustPillars";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview from "@/components/home/BlogPreview";
import NewsletterSection from "@/components/home/NewsletterSection";

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
      <ShippingGuarantees />
      <TrustPillars />
      <TestimonialsSection />
      <BlogPreview />
      <NewsletterSection />
    </>
  );
}
