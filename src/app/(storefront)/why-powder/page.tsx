import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/decorative/ScrollReveal";

export const metadata: Metadata = {
  title: "Why Powder? | Jaison Herbals",
  description:
    "Most skincare is 70% water and 20% preservatives. Discover why single-ingredient Ayurvedic powders are the honest alternative.",
  alternates: {
    canonical: "https://jaisonskincare.com/why-powder",
  },
};

export default function WhyPowderPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1 — Hero */}
      <section className="bg-parchment pt-20 pb-16">
        <div className="container-brand text-center">
          <p className="section-label text-sage mb-6">— THE PHILOSOPHY</p>
          <h1 className="font-heading text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
            Why a powder?
            <span
              className="block"
              style={{ color: "#A0885C", fontStyle: "italic", fontWeight: 300 }}
            >
              And not a cream.
            </span>
          </h1>
          <p
            className="mt-6 max-w-md mx-auto font-body text-base leading-relaxed"
            style={{ color: "rgba(26,60,52,0.5)" }}
          >
            Most skincare is 70% water and 20% preservatives. You are paying
            premium prices for a jar of stabilised liquid. We think there is a
            better way.
          </p>
        </div>
      </section>

      {/* Section 2 — The problem with creams */}
      <section className="bg-cream py-20">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: copy */}
            <ScrollReveal animation="fade-up">
              <div className="space-y-5">
                <p
                  className="font-accent text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(26,60,52,0.4)" }}
                >
                  What&apos;s really in that bottle
                </p>
                <p className="font-body text-bark/70 text-base leading-relaxed">
                  Pick up any moisturiser and read the ingredients. The first item
                  is almost always &ldquo;Aqua&rdquo; — water. Then come the
                  emulsifiers to stop the water and oil from separating. Then the
                  preservatives to stop it going mouldy. Then the thickeners,
                  stabilisers, and fragrance. By the time you reach an actual
                  botanical ingredient, it appears at less than 1% concentration.
                </p>
                <p className="font-body text-bark/70 text-base leading-relaxed">
                  We are not against skincare innovation. We are against paying
                  ₹800 for a product that is mostly water and needs twelve
                  additives to stay shelf-stable.
                </p>
              </div>
            </ScrollReveal>

            {/* Right: ingredient comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-sm p-6"
                style={{
                  border: "1px solid rgba(26,60,52,0.2)",
                  backgroundColor: "rgba(245,236,215,0.5)",
                }}
              >
                <p
                  className="font-accent text-[10px] tracking-widest uppercase mb-4"
                  style={{ color: "rgba(26,60,52,0.4)" }}
                >
                  Typical face cream
                </p>
                <ul className="space-y-2">
                  {[
                    "Aqua",
                    "Glycerin",
                    "Emulsifying Wax",
                    "Preservatives",
                    "Fragrance",
                    "Niacinamide (2%)",
                    "Vitamin C (0.5%)",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm flex items-start gap-2"
                      style={{ color: "rgba(26,60,52,0.6)" }}
                    >
                      <span>·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-sm p-6"
                style={{
                  border: "1px solid rgba(26,60,52,0.2)",
                  backgroundColor: "rgba(245,236,215,0.5)",
                }}
              >
                <p
                  className="font-accent text-[10px] tracking-widest uppercase mb-4"
                  style={{ color: "rgba(160,136,92,0.6)" }}
                >
                  Jaison Ubtan Powder
                </p>
                <ul className="space-y-2">
                  {[
                    "Turmeric",
                    "Chickpea Flour",
                    "Sandalwood",
                    "Rose Petal",
                    "That’s it.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm flex items-start gap-2"
                      style={{ color: "rgba(26,60,52,0.6)" }}
                    >
                      <span>·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — The powder advantage */}
      <section className="bg-surface-warm py-20">
        <div className="container-brand">
          <h2 className="font-heading text-[2.75rem] md:text-[3.5rem] text-bark font-light leading-[1.08] tracking-[-0.01em] text-center mb-14">
            The powder difference.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Shelf-stable without preservatives",
                body: "Dry powder does not need preservatives. It lasts 18–24 months in a cool, dry place.",
              },
              {
                title: "You control the formula",
                body: "Mix with rose water for dry skin, with curd for oily skin, with milk for brightening. One powder, multiple rituals.",
              },
              {
                title: "100% active ingredients",
                body: "There is no water or filler diluting the herb. Every gram is the ingredient.",
              },
              {
                title: "Transparent by design",
                body: "One ingredient. You can trace it, research it, and know exactly what it does.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-sm p-6"
                style={{
                  backgroundColor: "#FDFAF5",
                  border: "1px solid rgba(26,60,52,0.1)",
                }}
              >
                <h3 className="font-heading text-lg text-bark mb-3">
                  {card.title}
                </h3>
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(26,60,52,0.6)" }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — The mixing ritual */}
      <section className="bg-bark py-20 text-center">
        <div className="container-brand">
          <h2 className="font-heading text-[2.75rem] md:text-[3.5rem] font-light leading-[1.08] tracking-[-0.01em] text-cream mb-14">
            The ritual is simple.
            <span
              className="block"
              style={{ color: "#BCA480", fontStyle: "italic", fontWeight: 300 }}
            >
              Stupidly simple.
            </span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-14">
            {[
              {
                num: "01",
                title: "Pick a powder",
                body: "Choose the herb your skin or hair needs most.",
              },
              {
                num: "02",
                title: "Mix your base",
                body: "Rose water, milk, curd, or plain water. No rules — just what feels right.",
              },
              {
                num: "03",
                title: "Apply and rinse",
                body: "Five to ten minutes. Rinse clean. That is the whole process.",
              },
            ].map((step) => (
              <div key={step.num} className="flex-1 max-w-xs mx-auto">
                <p
                  className="font-heading text-7xl font-light leading-none mb-3"
                  style={{ color: "rgba(253,250,245,0.15)" }}
                >
                  {step.num}
                </p>
                <h3 className="font-heading text-xl text-cream mb-2">
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(253,250,245,0.5)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/shop"
            className="inline-block rounded-full border px-8 py-3 font-accent text-[11px] tracking-[0.15em] uppercase transition-colors hover:bg-cream/10"
            style={{ borderColor: "rgba(253,250,245,0.4)", color: "#FDFAF5" }}
          >
            START YOUR RITUAL →
          </Link>
        </div>
      </section>
    </div>
  );
}
