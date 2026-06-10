import GlowPillLink from "@/components/ui/GlowPillLink";

const claims = [
  {
    label: "Preservatives",
    value: "Zero",
    note: "Dry powder needs none. Liquids can't say that.",
  },
  {
    label: "Ingredients per jar",
    value: "One",
    note: "The herb, ground and sifted. The label is one line long.",
  },
  {
    label: "Years, one format",
    value: "55",
    note: "Same recipes since 1970. Never reformulated.",
  },
];

export default function WhyPowderTeaser() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#834316" }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading font-light italic leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 24vw, 20rem)",
            color: "rgba(254,250,224,0.04)",
            letterSpacing: "-0.04em",
            marginBottom: "-0.18em",
            marginRight: "-0.04em",
          }}
        >
          why?
        </span>
      </div>

      <div className="container-brand relative">
        <p
          className="font-accent text-[10px] tracking-[0.22em] uppercase mb-8"
          style={{ color: "rgba(254,250,224,0.45)" }}
        >
          — Why Powder · Not Cream, Not Serum
        </p>

        <h2
          className="font-heading font-light leading-[1.08] max-w-3xl"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            letterSpacing: "-0.02em",
            color: "#FEFAE0",
          }}
        >
          Anything that pours{" "}
          <span style={{ color: "#E26713", fontStyle: "italic" }}>
            needs a preservative.
          </span>{" "}
          Powder doesn&apos;t.
        </h2>

        {/* Claims row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-14 md:mt-16 max-w-4xl">
          {claims.map((claim, index) => (
            <div
              key={claim.label}
              className={
                index > 0
                  ? "py-6 md:py-0 md:px-8 border-t md:border-t-0 md:border-l"
                  : "py-6 md:py-0 md:pr-8"
              }
              style={{ borderColor: "rgba(254,250,224,0.12)" }}
            >
              <span
                className="font-heading font-light leading-none block"
                style={{
                  fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
                  color: "#FEFAE0",
                }}
              >
                {claim.value}
              </span>
              <span
                className="block font-accent text-[10px] tracking-[0.18em] uppercase mt-3"
                style={{ color: "rgba(254,250,224,0.45)" }}
              >
                {claim.label}
              </span>
              <p
                className="font-body text-sm leading-relaxed mt-2 max-w-[240px]"
                style={{ color: "rgba(254,250,224,0.55)" }}
              >
                {claim.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <GlowPillLink
            href="/why-powder"
            style={{ backgroundColor: "#FEFAE0", color: "#283618" }}
            hoverShadow="0 0 28px rgba(254, 250, 224, 0.35)"
          >
            Read the full argument →
          </GlowPillLink>
        </div>
      </div>
    </section>
  );
}
