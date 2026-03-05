import { Leaf, Hand, ShieldCheck, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";

const pillars = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure herbal ingredients, no synthetic additives",
  },
  {
    icon: Hand,
    title: "Handcrafted",
    description: "Each batch made with traditional care",
  },
  {
    icon: ShieldCheck,
    title: "Chemical Free",
    description: "No parabens, sulphates, or artificial colors",
  },
  {
    icon: Sparkles,
    title: "Ayurvedic Heritage",
    description: "Rooted in centuries of Indian wisdom",
  },
];

export default function TrustPillars() {
  return (
    <section className="py-16 md:py-24 bg-surface-warm">
      <div className="container-brand">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <ScrollReveal
              key={pillar.title}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream border border-border mb-4 group-hover:border-gold transition-colors duration-300">
                  <pillar.icon className="h-6 w-6 text-sage" />
                </div>
                <h3 className="font-heading text-lg text-bark mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-bark/50 font-body">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
