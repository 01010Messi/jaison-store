import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import StepCard from "@/components/ui/StepCard";

const steps = [
  {
    num: "01",
    title: "Measure",
    body: "Two spoons of powder per use. Scale up for hair; scale down for a spot treatment.",
    image: "/images/ritual/step-01.webp",
    alt: "Wooden spoon scooping herbal powder from a jar beside a brass bowl",
  },
  {
    num: "02",
    title: "Mix",
    body: "A splash of water, rose water or curd. Stir until smooth — that is the whole recipe.",
    image: "/images/ritual/step-02.webp",
    alt: "Hands pouring water into a brass bowl of green herbal paste",
  },
  {
    num: "03",
    title: "Apply",
    body: "Smooth over clean skin or hair. Let the herbs sit for 15–20 minutes. No rubbing.",
    image: "/images/ritual/step-03.webp",
    alt: "Fingertips spreading a stripe of herbal paste along a forearm",
  },
  {
    num: "04",
    title: "Wait",
    body: "15–20 minutes. Read something. The herbs are working.",
    image: "/images/ritual/step-04.webp",
    alt: "Bowl of herbal paste resting beside a cup of tea and an open book",
  },
  {
    num: "05",
    title: "Rinse",
    body: "Lukewarm water, pat dry, done. Softer skin and lighter hair from the first use.",
    image: "/images/ritual/step-05.webp",
    alt: "Cupped hands rinsing under a stream of water over a brass basin",
  },
];

export default function HowToUseGuide() {
  return (
    <section className="section-rhythm overflow-hidden" style={{ backgroundColor: "var(--color-parchment)" }}>
      <div className="container-brand">
        {/* Eyebrow + heading */}
        <SectionHeader
          eyebrow="The Ritual · Five Steps"
          eyebrowDash
          eyebrowTone="accent"
          title="How to use"
          accent="our powders."
          accentPlacement="inline"
          size="xl"
          className="mb-10 md:mb-14"
        />

        {/* Step cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {steps.map((step) => (
            <StepCard
              key={step.num}
              number={step.num}
              title={step.title}
              numberSize="lg"
              image={{ src: step.image, alt: step.alt }}
            >
              {step.body}
            </StepCard>
          ))}
        </div>

        {/* Frequency pill + quiz link */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span
            className="inline-flex items-center gap-2 px-5 py-3 font-body text-sm rounded-full"
            style={{ backgroundColor: "var(--color-bark)", color: "var(--color-cream)" }}
          >
            ↺ 2–3 times a week for best results
          </span>
          <Link
            href="/find-your-ritual"
            className="font-body text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: "var(--color-bark)" }}
          >
            Not sure which powder? Find your ritual →
          </Link>
        </div>
      </div>
    </section>
  );
}
