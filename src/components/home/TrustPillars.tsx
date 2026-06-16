import { Leaf, Rabbit, FlaskConical, Sparkles, Heart, Sprout } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";

const pillars = [
  {
    icon: Leaf,
    label: "100%",
    sublabel: "NATURAL",
    color: "text-sage",
    bgColor: "bg-sage/10",
    borderColor: "border-sage/30",
  },
  {
    icon: Rabbit,
    label: "CRUELTY",
    sublabel: "FREE",
    color: "text-terracotta",
    bgColor: "bg-terracotta/10",
    borderColor: "border-terracotta/30",
  },
  {
    icon: FlaskConical,
    label: "NO PARABENS",
    sublabel: "& SULPHATES",
    color: "text-bark",
    bgColor: "bg-bark/5",
    borderColor: "border-bark/20",
  },
  {
    icon: Sparkles,
    label: "AYURVEDIC",
    sublabel: "HERITAGE",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
  },
  {
    icon: Sprout,
    label: "100%",
    sublabel: "ORGANIC",
    color: "text-sage",
    bgColor: "bg-sage/10",
    borderColor: "border-sage/30",
  },
  {
    icon: Heart,
    label: "VEGAN",
    sublabel: "INGREDIENTS",
    color: "text-terracotta",
    bgColor: "bg-terracotta/10",
    borderColor: "border-terracotta/30",
  },
];

export default function TrustPillars() {
  return (
    <section className="section-rhythm bg-surface-warm">
      <div className="container-brand">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal
              key={pillar.label + pillar.sublabel}
              animation="fade-up"
              delay={index * 80}
            >
              <div className="text-center group">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full ${pillar.bgColor} border-2 ${pillar.borderColor} mb-3 group-hover:scale-105 transition-transform duration-300`}
                >
                  <div className="flex flex-col items-center">
                    <pillar.icon className={`h-6 w-6 md:h-7 md:w-7 ${pillar.color}`} />
                    <span className={`text-[8px] md:text-[9px] font-accent font-bold tracking-wider ${pillar.color} mt-0.5 leading-tight`}>
                      {pillar.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm font-accent font-semibold uppercase tracking-wider text-bark">
                  {pillar.sublabel}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
