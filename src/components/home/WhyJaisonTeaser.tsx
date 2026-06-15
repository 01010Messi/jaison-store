import Link from "next/link";

const pillars = [
  {
    icon: "🌿",
    title: "One Ingredient. Nothing Else.",
    body: "Our single-ingredient powders list exactly one thing on the label — because that's exactly what's inside. No fillers, no flow agents, no hidden additives.",
  },
  {
    icon: "🧪",
    title: "No Preservatives. Ever.",
    body: "Dry powders don't need preservatives to stay fresh. We decided in 1985 to never add a synthetic ingredient to any product. That decision hasn't changed.",
  },
  {
    icon: "📍",
    title: "Sourced & Made in India",
    body: "Our herbs are sourced from the regions where they grow best — Amla from central India, Neem from Maharashtra, Rose petals from Rajasthan. Processed in Nashik.",
  },
  {
    icon: "🤲",
    title: "A 55-Year Family Practice",
    body: "What started as grinding herbs by hand for neighbours in 1970 is now a catalogue of 12 products. We've never changed the formula. We never will.",
  },
];

export default function WhyJaisonTeaser() {
  return (
    <section className="container-brand py-16 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <p
          className="font-accent text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: "var(--color-terracotta)" }}
        >
          — Why Jaison Herbals
        </p>
        <h2
          className="font-heading font-light leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--color-bark)" }}
        >
          The case for buying direct.
        </h2>
        <p
          className="font-body mt-3 max-w-xl"
          style={{ fontSize: "15px", color: "rgba(26,60,52,0.6)", lineHeight: "1.7" }}
        >
          In a category full of vague claims, we make one promise: exactly what you see on the label is exactly what&apos;s in the pouch.
        </p>
      </div>

      {/* Pillars grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-xl p-6"
            style={{ backgroundColor: "var(--color-parchment)" }}
          >
            <span className="text-2xl mb-3 block">{p.icon}</span>
            <h3
              className="font-heading font-light mb-2"
              style={{ fontSize: "18px", color: "var(--color-bark)" }}
            >
              {p.title}
            </h3>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "rgba(26,60,52,0.6)" }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/why-jaison"
        className="inline-flex items-center gap-2 font-accent text-[11px] tracking-[0.18em] uppercase pb-0.5"
        style={{
          color: "var(--color-terracotta)",
          borderBottom: "1px solid var(--color-terracotta)",
        }}
      >
        Read the full story →
      </Link>
    </section>
  );
}
