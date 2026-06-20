import type { Metadata } from "next";
import Link from "next/link";
import GlowPillLink from "@/components/ui/GlowPillLink";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "Why Powder? The Case Against Liquid Skincare | Jaison Herbals",
  },
  description:
    "An essay on why Jaison has never made a liquid, never added a preservative, and never will. Pure herbal powders — the honest alternative.",
  alternates: {
    canonical: "https://jaisonskincare.com/why-powder",
  },
  openGraph: {
    title: "Why Powder? The Case Against Liquid Skincare",
    description:
      "An essay on why Jaison has never made a liquid, never added a preservative, and never will. Pure herbal powders — the honest alternative.",
    url: "https://jaisonskincare.com/why-powder",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — pure Ayurvedic herbal powders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Powder? The Case Against Liquid Skincare",
    description:
      "An essay on why Jaison has never made a liquid, never added a preservative, and never will. Pure herbal powders — the honest alternative.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
};

export default function WhyPowderPage() {
  return (
    <>
    <BreadcrumbJsonLd
      items={[
        { name: "Home", url: "https://jaisonskincare.com" },
        { name: "Why Powder?", url: "https://jaisonskincare.com/why-powder" },
      ]}
    />
    <div className="min-h-screen">

      {/* ── SECTION 1 — Hero ── */}
      <section
        className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28"
        style={{ backgroundColor: "var(--color-bark)", minHeight: "92vh" }}
      >
        {/* Background watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-heading font-light leading-none"
            style={{
              fontSize: "clamp(200px, 40vw, 500px)",
              color: "rgba(184,153,104,0.10)",
              fontStyle: "italic",
              userSelect: "none",
            }}
          >
            why?
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 container-brand">
          <p
            className="font-accent text-[11px] tracking-[0.28em] uppercase mb-8"
            style={{ color: "var(--color-gold-light)" }}
          >
            — THE POWDER PHILOSOPHY
          </p>
          <h1
            className="font-heading font-light leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: "clamp(4rem, 11vw, 9rem)", color: "var(--color-cream)" }}
          >
            Just the herb.
            <span
              className="block"
              style={{ color: "var(--color-gold-light)", fontStyle: "italic" }}
            >
              Nothing synthetic.
            </span>
          </h1>
          <p
            className="mt-10 max-w-xl font-body text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(254,250,224,0.6)" }}
          >
            An essay on why we have never made a liquid, never added a
            preservative, and never will. Written by the makers at Jaison.
          </p>
        </div>
      </section>

      {/* ── SECTION 2 — Essay body ── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="container-brand max-w-3xl mx-auto">

          {/* I */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--color-terracotta)" }}
            >
              I · The preservative problem.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(26,60,52,0.75)" }}
            >
              Pick up any liquid skincare in your bathroom and read the
              ingredient list. Past the actives you&apos;ll find a preservative
              system — phenoxyethanol, sodium benzoate, parabens, or one of
              about a dozen others — plus stabilisers, emulsifiers and
              synthetic fragrance. A shelf-stable formula needs them to last. A
              dry, single-herb powder does not. That is the whole difference.
            </p>
          </div>

          {/* II */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--color-terracotta)" }}
            >
              II · What that costs you.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(26,60,52,0.75)" }}
            >
              Preservatives are not benign. They are not &lsquo;natural
              alternatives to harsher things.&rsquo; Even the well-tolerated
              ones — phenoxyethanol, for example — are skin sensitisers for a
              real percentage of people, and the percentage rises with repeated
              daily exposure. Most ingredient-conscious consumers know this;
              most of the industry pretends they don&apos;t.
            </p>
          </div>

          {/* III */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--color-terracotta)" }}
            >
              III · What we do instead.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(26,60,52,0.75)" }}
            >
              We never added a preservative, a stabiliser or a synthetic
              anything. A single dried herb doesn&apos;t need them. The idea is
              simple; the execution is hard — it requires a dry workflow,
              moisture-proof packaging, batch-level quality control, and the discipline to
              never reformulate. We have made one format for fifty-five years.
            </p>
          </div>

          {/* IV */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--color-terracotta)" }}
            >
              IV · Read the label.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(26,60,52,0.75)" }}
            >
              When a brand says &lsquo;natural,&rsquo; count the ingredients. A
              true single-ingredient product has one. If the list runs to a
              dozen names you can&apos;t pronounce, most of them are doing a
              job a dried herb simply doesn&apos;t require — preserving,
              emulsifying, stabilising, colouring. The longer the label, the
              less of the plant is actually doing the work.
            </p>
          </div>

          {/* V */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--color-terracotta)" }}
            >
              V · What changes.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(26,60,52,0.75)" }}
            >
              You become the formulator. You take 1 tbsp of one herb and add
              2 tsp of one mixer — rose water, raw milk, plain curd — and you
              have a mask or a hair pack calibrated to your skin, your week,
              your season. The lower price, the smaller environmental
              footprint, the absence of plastic — that is a side effect.
            </p>
          </div>

          {/* VI */}
          <div className="mb-0">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "var(--color-terracotta)" }}
            >
              VI · The closing line.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(26,60,52,0.75)" }}
            >
              We are not against liquid skincare. We just don&apos;t make it.
              We never will. If you are looking for a bottle of something, this
              is not your brand. If you are looking for the herb — the actual,
              unprocessed, unpreserved, single-ingredient herb — you have
              arrived at the right place.
            </p>
          </div>

          {/* Divider */}
          <hr style={{ borderColor: "rgba(26,60,52,0.1)" }} className="my-12" />

          {/* Signature */}
          <div>
            <p
              className="font-heading italic text-xl md:text-2xl"
              style={{ color: "var(--color-bark)" }}
            >
              — The makers at Jaison
            </p>
            <p
              className="font-accent text-[10px] tracking-[0.2em] uppercase mt-2"
              style={{ color: "rgba(26,60,52,0.4)" }}
            >
              MADE IN INDIA · SINCE 1970
            </p>
          </div>

          {/* Further reading */}
          <div className="mt-10">
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(26,60,52,0.55)" }}>
              Ready to try the real thing? Browse our{" "}
              <Link
                href="/shop"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "var(--color-bark)" }}
              >
                pure herbal powders
              </Link>
              , or read the{" "}
              <Link
                href="/blog"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "var(--color-bark)" }}
              >
                Jaison skincare blog
              </Link>
              {" "}for Ayurvedic routines and herb guides.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Mid-page CTA ── */}
      <section
        className="py-20 md:py-24 text-center"
        style={{ backgroundColor: "var(--color-parchment)" }}
      >
        <div className="container-brand max-w-2xl mx-auto">
          <h2
            className="font-heading font-light"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--color-bark)", lineHeight: 1.06 }}
          >
            Don&apos;t know where to start?
          </h2>
          <p
            className="font-body text-base md:text-lg mt-4"
            style={{ color: "rgba(26,60,52,0.55)" }}
          >
            Four questions. We will pick two powders for your skin.
          </p>
          <div className="mt-8">
            <GlowPillLink
              href="/find-your-ritual"
              className="text-cream"
              style={{ backgroundColor: "var(--color-terracotta)" }}
              hoverShadow="0 0 0 3px rgba(131,67,22,0.25), 0 8px 28px rgba(131,67,22,0.35)"
            >
              FIND YOUR RITUAL
              <span style={{ fontSize: "1rem" }}>→</span>
            </GlowPillLink>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
