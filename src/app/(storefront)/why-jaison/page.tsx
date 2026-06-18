import Link from "next/link";
import type { Metadata } from "next";
import GoldRule from "@/components/decorative/GoldRule";
import SectionDivider from "@/components/decorative/SectionDivider";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Why Choose Jaison — Natural Ayurvedic Skincare",
  description:
    "We believe skincare works best when it stays close to nature and tradition. Pure ingredients, Ayurvedic wisdom, gentle formulas, made with care in India.",
  alternates: {
    canonical: "https://jaisonskincare.com/why-jaison",
  },
  openGraph: {
    title: "Why Choose Jaison — Natural Ayurvedic Skincare",
    description:
      "We believe skincare works best when it stays close to nature and tradition. Pure ingredients, Ayurvedic wisdom, gentle formulas, made with care in India.",
    url: "https://jaisonskincare.com/why-jaison",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — natural Ayurvedic herbal skincare powders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Jaison — Natural Ayurvedic Skincare",
    description:
      "We believe skincare works best when it stays close to nature and tradition. Pure ingredients, Ayurvedic wisdom, gentle formulas, made with care in India.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
};

const reasons = [
  {
    title: "Pure & Honest Ingredients",
    description:
      "We use carefully sourced herbal ingredients with no added chemicals, artificial fragrance, or fillers — just what your skin truly needs.",
  },
  {
    title: "Inspired by Ayurveda",
    description:
      "Our products are based on time-tested Ayurvedic practices, trusted for generations to maintain healthy, balanced skin naturally.",
  },
  {
    title: "Gentle Yet Effective",
    description:
      "Our finely milled powders are safe for regular use, suitable for Indian skin, and designed to work without causing harsh dryness or irritation.",
  },
  {
    title: "Made with Care in India",
    description:
      "Proudly Made in India, every batch is prepared with attention to quality, purity, and consistency you can rely on.",
  },
];

export default function WhyJaisonPage() {
  return (
    <>
    <BreadcrumbJsonLd
      items={[
        { name: "Home", url: "https://jaisonskincare.com" },
        { name: "Why Jaison?", url: "https://jaisonskincare.com/why-jaison" },
      ]}
    />
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-surface-warm py-16 md:py-24">
        <div className="container-brand text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-5xl text-bark font-light tracking-wide leading-tight">
            Why Choose Jaison
          </h1>
          <div className="flex justify-center mt-4">
            <GoldRule variant="leaf" width="w-32" />
          </div>
          <p className="mt-6 text-bark/72 font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We believe skincare works best when it stays close to nature and tradition.
          </p>
        </div>
      </section>

      {/* Reasons */}
      <section className="py-16 md:py-24">
        <div className="container-brand max-w-3xl mx-auto">
          <div className="space-y-12">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <h2 className="font-heading text-xl md:text-2xl text-bark mb-3">
                  <span className="border-b-2 border-bark/30 pb-0.5">
                    {reason.title}
                  </span>
                </h2>
                <p className="text-bark/70 font-body text-base leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="gold" />

      {/* CTA */}
      <section className="py-16 md:py-24 text-center bg-surface-warm">
        <div className="container-brand max-w-xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl text-bark mb-4">
            Experience the Jaison Difference
          </h2>
          <p className="text-bark/72 font-body mb-8">
            Try our range of 100% natural herbal powders and feel the difference nature makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-terracotta text-cream rounded-full font-accent text-sm uppercase tracking-wider hover:bg-terracotta/90 transition-all"
            >
              Shop Now
            </Link>
            <Link
              href="/why-powder"
              className="inline-flex items-center gap-2 px-8 py-3 border border-bark/30 text-bark rounded-full font-accent text-sm uppercase tracking-wider hover:bg-bark/5 transition-all"
            >
              Why Powder?
            </Link>
          </div>
          <p className="mt-8 font-body text-sm text-bark/50">
            Learn more in our{" "}
            <Link href="/blog" className="underline underline-offset-2 text-bark/70 hover:text-bark transition-colors">
              Ayurvedic skincare blog
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
    </>
  );
}
