import HeroSection from "@/components/home/HeroSection";
import TrustPillars from "@/components/home/TrustPillars";
import ShippingGuarantees from "@/components/home/ShippingGuarantees";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import HowToUseGuide from "@/components/home/HowToUseGuide";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview from "@/components/home/BlogPreview";
import InstagramSection from "@/components/home/InstagramSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import SectionDivider from "@/components/decorative/SectionDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <SectionDivider variant="gold" />
      <ShippingGuarantees />
      <TrustPillars />
      <SectionDivider variant="botanical" />
      <CategoryShowcase />
      <BrandStory />
      <SectionDivider variant="mandala" />
      <HowToUseGuide />
      <TestimonialsSection />
      <SectionDivider variant="gold" />
      <BlogPreview />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
