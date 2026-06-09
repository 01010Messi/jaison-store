import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import OrnamentalBorder from "@/components/decorative/OrnamentalBorder";
import ScrollReveal from "@/components/decorative/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Story | Jaison Herbals",
  description:
    "How Jaison Herbals began — and why we believe single-ingredient Ayurvedic powders are the future of honest skincare.",
  alternates: {
    canonical: "https://jaisonskincare.com/our-story",
  },
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1 — Hero */}
      <section className="bg-parchment pt-20 pb-16">
        <div className="container-brand text-center">
          <p className="section-label text-sage mb-6">— OUR STORY</p>
          <h1 className="font-heading text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
            Rooted in tradition.
            <span
              className="block"
              style={{ color: "#A0885C", fontStyle: "italic", fontWeight: 300 }}
            >
              Made for your ritual.
            </span>
          </h1>
          <p
            className="mt-6 max-w-md mx-auto font-body text-base leading-relaxed"
            style={{ color: "rgba(26,60,52,0.5)" }}
          >
            Jaison Herbals began with a simple belief — that the best skincare has
            always been in your kitchen.
          </p>
        </div>
      </section>

      {/* Section 2 — Origin story */}
      <section className="bg-cream py-20">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <div className="relative">
              <OrnamentalBorder variant="full">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/brand-story.jpg"
                    alt="Jaison Herbals brand story"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </OrnamentalBorder>
            </div>

            {/* Right: Copy */}
            <ScrollReveal animation="fade-up">
              <div className="space-y-6">
                <p
                  className="font-accent text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(26,60,52,0.4)" }}
                >
                  How it started
                </p>
                <p className="font-body text-bark/70 text-base leading-relaxed">
                  In every Indian home, there is a grandmother who knows exactly
                  which powder to mix with milk for glowing skin, and which herb
                  to boil for strong hair. That knowledge is old. It predates the
                  skincare industry by thousands of years.
                </p>
                <p className="font-body text-bark/70 text-base leading-relaxed">
                  Jaison Herbals was born from that knowledge. We source single
                  Ayurvedic herbs — neem, amla, shikakai, rose petal — mill them
                  into fine powder, and put them in a jar. No blending. No
                  additives. No marketing ingredients.
                </p>
                <p className="font-body text-bark/70 text-base leading-relaxed">
                  You mix. You apply. You rinse. That is the whole process.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3 — Three values */}
      <section className="bg-surface-warm py-20">
        <div className="container-brand">
          <h2 className="font-heading text-[2.75rem] md:text-[3.5rem] text-bark font-light leading-[1.08] tracking-[-0.01em] text-center mb-14">
            What we believe in.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "One herb. One jar.",
                body: "Every product is a single ingredient. You always know exactly what you are putting on your skin.",
              },
              {
                num: "02",
                title: "Made in India.",
                body: "Sourced from Indian farms, prepared in India, designed for Indian skin and hair. That is the whole supply chain.",
              },
              {
                num: "03",
                title: "No shortcuts.",
                body: "No synthetic fragrance, no parabens, no fillers. If it cannot come from a plant, it does not go in the jar.",
              },
            ].map((v) => (
              <div key={v.num} className="p-8">
                <p
                  className="font-heading text-5xl font-light leading-none mb-4"
                  style={{ color: "rgba(188,164,128,0.2)" }}
                >
                  {v.num}
                </p>
                <h3 className="font-heading text-xl text-bark mb-3">{v.title}</h3>
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(26,60,52,0.6)" }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="bg-bark py-16 text-center">
        <div className="container-brand">
          <h2 className="font-heading text-[2.75rem] md:text-[3.5rem] font-light leading-[1.08] tracking-[-0.01em] text-cream mb-4">
            Try one powder.
            <span
              className="block"
              style={{ color: "#BCA480", fontStyle: "italic", fontWeight: 300 }}
            >
              See what your skin says.
            </span>
          </h2>
          <p
            className="font-body text-base mt-4 mb-8 max-w-md mx-auto"
            style={{ color: "rgba(253,250,245,0.5)" }}
          >
            Start with whatever your skin needs most. Mix it. Use it. The ritual
            builds itself.
          </p>
          <Link
            href="/shop"
            className="inline-block rounded-full border px-8 py-3 font-accent text-[11px] tracking-[0.15em] uppercase transition-colors hover:bg-cream/10"
            style={{ borderColor: "rgba(253,250,245,0.4)", color: "#FDFAF5" }}
          >
            EXPLORE THE CATALOGUE →
          </Link>
        </div>
      </section>
    </div>
  );
}
