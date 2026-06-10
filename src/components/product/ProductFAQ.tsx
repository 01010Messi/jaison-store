"use client";

import { useState } from "react";
import type { ProductFaq } from "@/data/productFaqs";

interface ProductFAQProps {
  productName: string;
  faqs: ProductFaq[];
}

export default function ProductFAQ({ productName, faqs }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 max-w-5xl">
          <div className="lg:col-span-2">
            <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
              — Good to Know
            </p>
            <h2 className="font-heading text-[2.25rem] md:text-[3rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
              Questions,
              <span
                className="block"
                style={{ color: "#834316", fontStyle: "italic", fontWeight: 300 }}
              >
                answered.
              </span>
            </h2>
            <p className="font-body text-sm text-bark/50 leading-relaxed mt-6 max-w-xs">
              Everything people usually ask about {productName} before their
              first jar. Anything else — WhatsApp us.
            </p>
          </div>

          <div className="lg:col-span-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="border-b border-bark/10"
                  style={i === 0 ? { borderTop: "1px solid rgba(26,60,52,0.1)" } : undefined}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  >
                    <span className="font-heading text-base md:text-lg text-bark font-light leading-snug group-hover:text-terracotta transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className="font-heading text-2xl font-light shrink-0 leading-none transition-transform duration-300"
                      style={{
                        color: "#834316",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "1000px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="font-body text-sm text-bark/60 leading-relaxed pb-6 pr-10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
