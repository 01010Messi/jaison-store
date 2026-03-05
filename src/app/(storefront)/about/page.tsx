import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import GoldRule from "@/components/decorative/GoldRule";
import OrnamentalBorder from "@/components/decorative/OrnamentalBorder";
import SectionDivider from "@/components/decorative/SectionDivider";

export const metadata: Metadata = {
  title: "Our Story | jaison Natural Herbals",
  description:
    "Learn about jaison — our journey from ancient ayurvedic wisdom to modern, natural skincare and haircare products crafted with pure ingredients.",
};

const values = [
  {
    title: "100% Natural",
    description:
      "Every ingredient we use comes directly from nature. No chemicals, no parabens, no sulfates — just pure, potent herbs.",
  },
  {
    title: "Ayurvedic Heritage",
    description:
      "Our formulations are rooted in centuries-old ayurvedic wisdom, refined for the modern lifestyle without losing their traditional essence.",
  },
  {
    title: "Handcrafted Quality",
    description:
      "Each product is carefully processed in small batches to ensure the highest quality, freshness, and potency.",
  },
  {
    title: "Sustainable Practices",
    description:
      "We source responsibly, use eco-friendly packaging, and believe in beauty that doesn't cost the earth.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-surface-warm py-16 md:py-24">
        <div className="container-brand text-center max-w-3xl mx-auto">
          <p className="section-label text-sage mb-3">Our Story</p>
          <h1 className="font-heading text-3xl md:text-5xl text-bark font-light tracking-wide leading-tight">
            Rooted in Tradition,
            <br />
            <span className="text-terracotta">Made for Today</span>
          </h1>
          <div className="flex justify-center mt-4">
            <GoldRule variant="leaf" width="w-32" />
          </div>
          <p className="mt-6 text-bark/60 font-body leading-relaxed">
            jaison was born from a simple belief — that the ancient wisdom of
            Ayurveda holds the key to truly effective, truly natural beauty care.
            In a world overwhelmed by chemical-laden products, we set out to
            create something different: honest, pure, and powerful herbal
            products that honor centuries of Indian tradition.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-16 md:py-24">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <OrnamentalBorder variant="full" className="p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/images/brand-story.jpg"
                  alt="jaison products styled"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </OrnamentalBorder>

            <div>
              <p className="section-label text-sage mb-3">The Beginning</p>
              <h2 className="font-heading text-2xl md:text-3xl text-bark mb-4">
                From Kitchen Recipes to Craft Herbals
              </h2>
              <GoldRule variant="simple" width="w-16" className="mb-6" />
              <div className="space-y-4 text-bark/60 font-body text-sm leading-relaxed">
                <p>
                  The jaison journey began with family — with grandmothers who
                  knew the power of turmeric for glowing skin, of amla for
                  lustrous hair, of neem for clear complexions. These weren&apos;t
                  just ingredients to them; they were rituals passed down
                  through generations.
                </p>
                <p>
                  We took these time-tested recipes and refined them with care,
                  ensuring the finest quality ingredients, the right proportions,
                  and the perfect grain size for comfortable application. The
                  result is a range of products that are as effective as they are
                  pure.
                </p>
                <p>
                  Today, jaison serves thousands of customers who have chosen to
                  return to nature for their beauty care needs. Every pouch and
                  jar that leaves our facility carries the promise of purity,
                  potency, and the power of Ayurveda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="gold" />

      {/* Values */}
      <section className="py-16 md:py-24 bg-surface-warm">
        <div className="container-brand text-center">
          <p className="section-label text-sage mb-3">What We Stand For</p>
          <h2 className="font-heading text-2xl md:text-3xl text-bark mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-heading text-lg text-bark mb-2">
                  {value.title}
                </h3>
                <GoldRule variant="simple" width="w-8 mx-auto" className="mb-3" />
                <p className="text-sm text-bark/50 font-body leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 text-center">
        <div className="container-brand max-w-xl mx-auto">
          <p className="section-label text-sage mb-3">Experience the Difference</p>
          <h2 className="font-heading text-2xl md:text-3xl text-bark mb-6">
            Ready to Go Natural?
          </h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-terracotta text-cream rounded-sm font-accent text-sm uppercase tracking-wider hover:bg-terracotta/90 transition-all"
          >
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
