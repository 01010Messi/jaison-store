import { Truck, ShieldCheck, RotateCcw, Leaf } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";

const guarantees = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹499",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "UPI, cards, netbanking & COD",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "No chemicals, ever",
  },
];

export default function ShippingGuarantees() {
  return (
    <div className="bg-bark/[0.03] border-y border-border-light">
      <div className="container-brand py-6">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 justify-center"
                >
                  <Icon className="h-5 w-5 text-sage flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-accent text-[11px] uppercase tracking-[0.12em] text-bark font-medium">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-bark/60 font-body">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
