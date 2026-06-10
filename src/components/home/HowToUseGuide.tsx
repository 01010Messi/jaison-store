import GlowPillLink from "@/components/ui/GlowPillLink";

const steps = [
  {
    num: "01",
    title: "Mix",
    body: "Two spoons of powder, a splash of water, rose water or curd. Stir until it's a smooth paste — that's the whole recipe.",
  },
  {
    num: "02",
    title: "Apply",
    body: "Smooth it over clean skin or hair and let the herbs sit for 15–20 minutes. No rubbing, no scrubbing — just wait.",
  },
  {
    num: "03",
    title: "Rinse",
    body: "Lukewarm water, pat dry, done. Softer skin and lighter hair from the first wash; visible change in a few weeks.",
  },
];

export default function HowToUseGuide() {
  return (
    <section className="py-10 md:py-14 overflow-hidden">
      <div className="container-brand">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="flex-1 max-w-2xl">
            <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
              — The Ritual · Three Steps
            </p>
            <h2 className="font-heading text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
              Mix. Apply.
              <span
                className="block"
                style={{ color: "#834316", fontStyle: "italic", fontWeight: 300 }}
              >
                Rinse.
              </span>
            </h2>
          </div>
          <p className="font-body text-sm text-bark/50 max-w-xs leading-relaxed md:self-end">
            Every powder works the same way. If you can make a cup of chai, you
            can do this.
          </p>
        </div>

        {/* Steps — editorial columns with hairline separators */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className={
                index > 0
                  ? "py-8 md:py-2 md:px-8 last:md:pr-0 border-t border-bark/10 md:border-t-0 md:border-l md:border-bark/10"
                  : "py-8 md:py-2 md:pr-8"
              }
            >
              <span
                className="font-heading font-light leading-none block"
                style={{
                  fontSize: "clamp(3.5rem, 6vw, 5rem)",
                  color: "rgba(96,108,56,0.12)",
                }}
              >
                {step.num}
              </span>
              <h3 className="font-heading text-2xl text-bark font-light mt-4">
                {step.title}
                <span style={{ color: "#834316" }}>.</span>
              </h3>
              <p className="font-body text-sm text-bark/50 leading-relaxed mt-3 max-w-xs">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Cross-link to quiz */}
        <div className="mt-12 md:mt-16">
          <GlowPillLink
            href="/find-your-ritual"
            className="border"
            style={{
              borderColor: "rgba(54,84,31,0.4)",
              color: "#36541F",
            }}
            hoverShadow="0 0 24px rgba(54, 84, 31, 0.2)"
          >
            Not sure which powder? Find your ritual →
          </GlowPillLink>
        </div>
      </div>
    </section>
  );
}
