import type { Metadata } from "next";
import HomeCatalogue from "@/components/home/HomeCatalogue";
import StatsBar from "@/components/home/StatsBar";
import BotanicalTicker from "@/components/home/BotanicalTicker";
import ManifestoSection from "@/components/home/ManifestoSection";
import TrustPillars from "@/components/home/TrustPillars";
import ShippingGuarantees from "@/components/home/ShippingGuarantees";
import BlogPreview from "@/components/home/BlogPreview";
import NewsletterSection from "@/components/home/NewsletterSection";

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
      <HomeCatalogue />
      <StatsBar />
      <BotanicalTicker />
      <ManifestoSection />
      <ShippingGuarantees />
      <TrustPillars />
      <BlogPreview />
      <NewsletterSection />
    </>
  );
}
