import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";

const steps = [
  {
    number: "01",
    title: "Mix",
    description:
      "Take 2-3 tablespoons of powder and mix with water, rose water, or curd to form a smooth paste.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="28" r="14" />
        <path d="M14 28c0-5.5 4.5-10 10-10s10 4.5 10 10" />
        <path d="M20 18l-4-12M28 18l4-12" />
        <path d="M18 8h12" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Apply",
    description:
      "Gently apply the paste evenly on clean skin or hair. Leave on for 15-20 minutes.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 6c-4 0-7 3-7 7v4c0 8 7 14 7 14s7-6 7-14v-4c0-4-3-7-7-7z" />
        <path d="M17 34c-4 2-7 5-7 8h28c0-3-3-6-7-8" />
        <circle cx="24" cy="16" r="3" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Glow",
    description:
      "Rinse with lukewarm water and pat dry. Experience visibly softer, radiant results.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="10" />
        <path d="M24 8v-4M24 44v-4M8 24h-4M44 24h-4" />
        <path d="M12.7 12.7l-2.8-2.8M38.1 38.1l-2.8-2.8M12.7 35.3l-2.8 2.8M38.1 9.9l-2.8 2.8" opacity="0.6" />
      </svg>
    ),
  },
];

export default function HowToUseGuide() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-brand">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14">
            <p className="section-label text-sage mb-3">Simple Ritual</p>
            <h2 className="font-heading text-3xl md:text-4xl text-bark">
              How to Use Our Powders
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              animation="fade-up"
              delay={index * 150}
            >
              <div className="text-center relative">
                {/* Connector line (desktop only, between items) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
                )}

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream border border-border mb-5">
                  {step.icon}
                </div>

                {/* Step number */}
                <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
                  Step {step.number}
                </p>

                <GoldRule variant="diamond" width="w-12 mx-auto" className="mb-3" />

                <h3 className="font-heading text-xl text-bark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-bark/50 font-body max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
