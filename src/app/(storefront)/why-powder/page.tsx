import type { Metadata } from "next";
import GlowPillLink from "@/components/ui/GlowPillLink";

export const metadata: Metadata = {
  title: "Why Powder? The Case Against Liquid Skincare | Jaison Herbals",
  description:
    "An essay on why Jaison has never made a liquid, never added a preservative, and never will. Single-ingredient herbal powders — the honest alternative.",
  alternates: {
    canonical: "https://jaisonskincare.com/why-powder",
  },
};

export default function WhyPowderPage() {
  return (
    <div className="min-h-screen">

      {/* ── SECTION 1 — Hero ── */}
      <section
        className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28"
        style={{ backgroundColor: "#283618", minHeight: "92vh" }}
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
              color: "rgba(226,103,19,0.12)",
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
            className="font-accent text-[10px] tracking-[0.25em] uppercase mb-6"
            style={{ color: "#E26713" }}
          >
            — THE POWDER PHILOSOPHY
          </p>
          <h1
            className="font-heading font-light leading-[1.02] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", color: "#FEFAE0" }}
          >
            Just the herb.
            <span
              className="block"
              style={{ color: "#E26713", fontStyle: "italic" }}
            >
              Nothing synthetic.
            </span>
          </h1>
          <p
            className="mt-8 max-w-xl font-body text-base md:text-lg leading-relaxed"
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
        style={{ backgroundColor: "#FEFAE0" }}
      >
        <div className="container-brand max-w-3xl mx-auto">

          {/* 01 */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#834316" }}
            >
              01 · The preservative problem.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(40,54,24,0.75)" }}
            >
              Pick up any liquid skincare in your bathroom and read the
              ingredient list. Past the actives you&apos;ll find a preservative
              system — phenoxyethanol, sodium benzoate, parabens, or one of
              about a dozen others — plus stabilisers, emulsifiers and
              synthetic fragrance. A shelf-stable formula needs them to last. A
              dry, single-herb powder does not. That is the whole difference.
            </p>
          </div>

          {/* 02 */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#834316" }}
            >
              02 · What that costs you.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(40,54,24,0.75)" }}
            >
              Preservatives are not benign. They are not &lsquo;natural
              alternatives to harsher things.&rsquo; Even the well-tolerated
              ones — phenoxyethanol, for example — are skin sensitisers for a
              real percentage of people, and the percentage rises with repeated
              daily exposure. Most ingredient-conscious consumers know this;
              most of the industry pretends they don&apos;t.
            </p>
          </div>

          {/* 03 */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#834316" }}
            >
              03 · What we do instead.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(40,54,24,0.75)" }}
            >
              We never added a preservative, a stabiliser or a synthetic
              anything. A single dried herb doesn&apos;t need them. The idea is
              simple; the execution is hard — it requires a dry workflow,
              sealed jars, batch-level quality control, and the discipline to
              never reformulate. We have made one format for fifty-five years.
            </p>
          </div>

          {/* 04 */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#834316" }}
            >
              04 · Read the label.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(40,54,24,0.75)" }}
            >
              When a brand says &lsquo;natural,&rsquo; count the ingredients. A
              true single-ingredient product has one. If the list runs to a
              dozen names you can&apos;t pronounce, most of them are doing a
              job a dried herb simply doesn&apos;t require — preserving,
              emulsifying, stabilising, colouring. The longer the label, the
              less of the plant is actually doing the work.
            </p>
          </div>

          {/* 05 */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#834316" }}
            >
              05 · What changes.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "rgba(40,54,24,0.75)" }}
            >
              You become the formulator. You take 1 tbsp of one herb and add
              2 tsp of one mixer — rose water, raw milk, plain curd — and you
              have a mask or a hair pack calibrated to your skin, your week,
              your season. The lower price, the smaller environmental
              footprint, the absence of plastic — that is a side effect.
            </p>
          </div>

          {/* 06 */}
          <div className="mb-0">
            <h2
              className="font-heading font-light leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#834316" }}
            >
              06 · The closing line.
            </h2>
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(40,54,24,0.75)" }}
            >
              We are not against liquid skincare. We just don&apos;t make it.
              We never will. If you are looking for a bottle of something, this
              is not your brand. If you are looking for the herb — the actual,
              unprocessed, unpreserved, single-ingredient herb — you have
              arrived at the right place.
            </p>
          </div>

          {/* Divider */}
          <hr style={{ borderColor: "rgba(40,54,24,0.1)" }} className="my-12" />

          {/* Signature */}
          <div>
            <p
              className="font-heading italic text-xl md:text-2xl"
              style={{ color: "#283618" }}
            >
              — The makers at Jaison
            </p>
            <p
              className="font-accent text-[10px] tracking-[0.2em] uppercase mt-2"
              style={{ color: "rgba(40,54,24,0.4)" }}
            >
              MADE IN INDIA · SINCE 1970
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Mid-page CTA ── */}
      <section
        className="py-20 md:py-24 text-center"
        style={{ backgroundColor: "#EFE4C5" }}
      >
        <div className="container-brand max-w-2xl mx-auto">
          <h2
            className="font-heading font-light"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#283618", lineHeight: 1.08 }}
          >
            Don&apos;t know where to start?
          </h2>
          <p
            className="font-body text-base md:text-lg mt-4"
            style={{ color: "rgba(40,54,24,0.55)" }}
          >
            Four questions. We will pick two powders for your skin.
          </p>
          <div className="mt-8">
            <GlowPillLink
              href="/find-your-ritual"
              className="text-cream"
              style={{ backgroundColor: "#834316" }}
              hoverShadow="0 0 0 3px rgba(131,67,22,0.25), 0 8px 28px rgba(131,67,22,0.35)"
            >
              FIND YOUR RITUAL
              <span style={{ fontSize: "1rem" }}>→</span>
            </GlowPillLink>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — Bottom CTA ("The Promise") ── */}
      <section
        className="relative overflow-hidden py-20 md:py-28 text-center"
        style={{ backgroundColor: "#283618" }}
      >
        {/* Background "55" watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-heading font-light"
            style={{
              fontSize: "clamp(250px, 50vw, 600px)",
              color: "rgba(226,103,19,0.08)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            55
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 container-brand max-w-3xl mx-auto">
          <p
            className="font-accent text-[10px] tracking-[0.25em] uppercase mb-6"
            style={{ color: "rgba(226,103,19,0.7)" }}
          >
            — THE PROMISE
          </p>
          <h2
            className="font-heading font-light"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", color: "#FEFAE0", lineHeight: 1.05 }}
          >
            Purity isn&apos;t a feature.{" "}
            <span style={{ color: "#E26713", fontStyle: "italic" }}>
              It&apos;s the starting point.
            </span>
          </h2>
          <p
            className="mt-6 max-w-xl mx-auto font-body text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(254,250,224,0.55)" }}
          >
            One herbal ingredient per jar. Mixed at home. Used twice a week.
            No preservatives, no synthetics, no fillers — that is the entire
            ritual.
          </p>
          <div className="mt-10">
            <GlowPillLink
              href="/shop"
              style={{ backgroundColor: "#FEFAE0", color: "#283618" }}
              hoverShadow="0 0 0 3px rgba(254,250,224,0.2), 0 8px 32px rgba(254,250,224,0.25)"
            >
              SHOP THE CATALOGUE
              <span style={{ fontSize: "1rem" }}>→</span>
            </GlowPillLink>
          </div>
        </div>
      </section>

    </div>
  );
}
