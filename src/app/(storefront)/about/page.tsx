import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import GoldRule from "@/components/decorative/GoldRule";
import OrnamentalBorder from "@/components/decorative/OrnamentalBorder";
import SectionDivider from "@/components/decorative/SectionDivider";

export const metadata: Metadata = {
  title: "About Us | jaison Skincare",
  description:
    "Jaison Herbals began in Nashik with a simple vision — bringing ancient Ayurvedic wisdom into modern lives. 100% natural, chemical-free products crafted with care.",
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
      "Our formulations are rooted in centuries-old Ayurvedic wisdom, refined for the modern lifestyle without losing their traditional essence.",
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
          <h1 className="font-heading text-3xl md:text-5xl text-bark font-light tracking-wide leading-tight">
            About Us
          </h1>
          <div className="flex justify-center mt-4">
            <GoldRule variant="leaf" width="w-32" />
          </div>
        </div>
      </section>

      {/* Born from Nature's Wisdom */}
      <section className="py-16 md:py-24">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-bark mb-6">
                Born from Nature&apos;s Wisdom
              </h2>
              <div className="space-y-4 text-bark/70 font-body text-base leading-relaxed">
                <p>
                  <strong className="text-bark">Jaison Herbals began in Nashik with a simple vision</strong> — bringing
                  ancient Ayurvedic wisdom into modern lives.
                </p>
                <p>
                  Rooted in tradition, we honor this heritage through 100% natural,
                  chemical-free products crafted with care.
                </p>
                <p>
                  Every ingredient is thoughtfully selected from nature&apos;s bounty,
                  ensuring authentic wellness reaches you in its purest form — where
                  traditional knowledge meets mindful craftsmanship.
                </p>
              </div>
            </div>

            <OrnamentalBorder variant="full" className="p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/images/brand-story.jpg"
                  alt="jaison herbals natural products"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </OrnamentalBorder>
          </div>
        </div>
      </section>

      <SectionDivider variant="gold" />

      {/* Our Philosophy */}
      <section className="py-16 md:py-24 bg-surface-warm">
        <div className="container-brand max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-2xl mb-2">🌿</p>
            <h2 className="font-heading text-2xl md:text-3xl text-bark mb-4">
              Our Philosophy
            </h2>
            <GoldRule variant="simple" width="w-16 mx-auto" className="mb-6" />
          </div>
          <div className="space-y-4 text-bark/70 font-body text-base leading-relaxed text-center">
            <p>
              We believe true skincare does not need harsh chemicals or shortcuts.
            </p>
            <p>
              Our approach focuses on <strong className="text-bark">purity, simplicity, and time-tested
              Ayurvedic practices</strong> that support healthy skin naturally.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24 text-center bg-surface-warm">
        <div className="container-brand max-w-xl mx-auto">
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
