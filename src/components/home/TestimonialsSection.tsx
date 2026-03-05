"use client";

import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";

const testimonials = [
  {
    name: "Priya",
    rating: 5,
    text: "The ubtan has transformed my skin! My complexion looks brighter and feels so smooth after just two weeks of use.",
    product: "Ubtan Face Pack",
  },
  {
    name: "Ananya",
    rating: 5,
    text: "Finally found a natural alternative for my hair. The shikakai powder leaves my hair so soft and bouncy without any chemicals.",
    product: "Shikakai Powder",
  },
  {
    name: "Meera",
    rating: 5,
    text: "Love the quality and packaging! The amla powder has noticeably reduced my hair fall. Highly recommend jaison products.",
    product: "Amla Powder",
  },
  {
    name: "Ritu",
    rating: 4,
    text: "The multani mitti is so pure and finely ground. Makes the best face masks. My skin feels clean and refreshed every time.",
    product: "Multani Mitti",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-surface-warm">
      <div className="container-brand">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <p className="section-label text-sage mb-3">Real Results</p>
            <h2 className="font-heading text-3xl md:text-4xl text-bark">
              What Our Customers Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="bg-cream p-6 rounded-sm border border-border/50 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="h-5 w-5 text-gold/40 mb-3 -scale-x-100" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < testimonial.rating
                          ? "fill-gold text-gold"
                          : "fill-transparent text-parchment-dark"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-bark/70 font-body leading-relaxed flex-1 mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="pt-3 border-t border-border-light">
                  <p className="font-heading text-sm text-bark">
                    {testimonial.name}
                  </p>
                  <p className="text-[11px] text-bark/40 font-body">
                    Verified Purchase &bull; {testimonial.product}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
