import HeroSection from "@/components/home/HeroSection";
import TrustPillars from "@/components/home/TrustPillars";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import HowToUseGuide from "@/components/home/HowToUseGuide";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import SectionDivider from "@/components/decorative/SectionDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustPillars />
      <SectionDivider variant="botanical" />
      <CategoryShowcase />
      <SectionDivider variant="gold" />
      <FeaturedProducts />
      <BrandStory />
      <SectionDivider variant="mandala" />
      <HowToUseGuide />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
