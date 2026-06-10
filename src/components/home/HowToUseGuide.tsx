import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Measure",
    body: "Two spoons of powder per use. Scale up for hair; scale down for a spot treatment.",
  },
  {
    num: "02",
    title: "Mix",
    body: "A splash of water, rose water or curd. Stir until smooth — that is the whole recipe.",
  },
  {
    num: "03",
    title: "Apply",
    body: "Smooth over clean skin or hair. Let the herbs sit for 15–20 minutes. No rubbing.",
  },
  {
    num: "04",
    title: "Wait",
    body: "15–20 minutes. Read something. The herbs are working.",
  },
  {
    num: "05",
    title: "Rinse",
    body: "Lukewarm water, pat dry, done. Softer skin and lighter hair from the first use.",
  },
];

export default function HowToUseGuide() {
  return (
    <section className="py-12 md:py-20 overflow-hidden" style={{ backgroundColor: "#F5ECD7" }}>
      <div className="container-brand">
        {/* Eyebrow */}
        <p
          className="font-accent text-[11px] tracking-[0.28em] uppercase mb-6 flex items-center gap-3"
          style={{ color: "#A56843" }}
        >
          <span style={{ color: "#B89968" }}>—</span>
          The Ritual · Five Steps
        </p>

        {/* Heading */}
        <h2
          className="font-heading font-light mb-10 md:mb-14"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            color: "#1A3C34",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
          }}
        >
          How to use{" "}
          <em style={{ color: "#A56843", fontStyle: "italic" }}>our powders.</em>
        </h2>

        {/* Step cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-sm p-5 md:p-6 flex flex-col"
              style={{ backgroundColor: "#FDFAF5" }}
            >
              <span
                className="font-heading font-light block leading-none mb-4"
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  color: "#B89968",
                  letterSpacing: "-0.03em",
                }}
              >
                {step.num}
              </span>
              <h3
                className="font-heading font-light mb-2"
                style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "#1A3C34", lineHeight: 1.2 }}
              >
                {step.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(26,60,52,0.6)" }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Frequency pill + quiz link */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span
            className="inline-flex items-center gap-2 px-5 py-3 font-body text-sm rounded-full"
            style={{ backgroundColor: "#1A3C34", color: "#FDFAF5" }}
          >
            ↺ 2–3 times a week for best results
          </span>
          <Link
            href="/find-your-ritual"
            className="font-body text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: "#1A3C34" }}
          >
            Not sure which powder? Find your ritual →
          </Link>
        </div>
      </div>
    </section>
  );
}
