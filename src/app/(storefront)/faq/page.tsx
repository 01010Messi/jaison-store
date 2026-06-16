import PolicyHero from "@/components/layout/PolicyHero";
import Accordion from "@/components/ui/Accordion";
import { faqGroups } from "@/data/faqs";

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <PolicyHero
        eyebrow="— Help Center · Common Questions"
        title="Questions,"
        accent="answered."
        sub="Everything you need to know about our products, safety, and shipping — answered with care."
      />
      <div className="container-brand py-10 md:py-16 max-w-3xl mx-auto">
        {faqGroups.map((group) => (
          <div key={group.id} className="mb-10">
            <h2 className="font-accent text-[10px] tracking-[0.22em] uppercase text-terracotta mb-4">
              {group.label}
            </h2>
            <Accordion items={group.faqs} allowMultiple />
          </div>
        ))}
      </div>
    </div>
  );
}
