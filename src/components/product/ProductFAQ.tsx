"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Accordion from "@/components/ui/Accordion";
import type { ProductFaq } from "@/data/productFaqs";

interface ProductFAQProps {
  productName: string;
  faqs: ProductFaq[];
}

export default function ProductFAQ({ productName, faqs }: ProductFAQProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 max-w-5xl">
          <div className="lg:col-span-2">
            <SectionHeader
              eyebrow="Good to Know"
              eyebrowDash
              title="Questions,"
              accent="answered."
              note={
                <>
                  Everything people usually ask about {productName} before
                  their first jar. Anything else — WhatsApp us.
                </>
              }
            />
          </div>

          <div className="lg:col-span-3">
            <Accordion
              className="divide-bark/10 border-t border-b border-bark/10"
              titleClassName="text-base md:text-lg font-normal leading-snug"
              items={faqs.map((faq, i) => ({
                id: String(i),
                title: faq.question,
                content: (
                  <p className="font-body text-sm text-bark/72 leading-relaxed pr-10">
                    {faq.answer}
                  </p>
                ),
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
