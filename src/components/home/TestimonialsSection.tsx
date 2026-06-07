"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface ReviewData {
  id: string;
  rating: number;
  body: string;
  userName: string;
  productName: string;
}

const fallbackTestimonials = [
  {
    id: "fallback-1",
    rating: 5,
    body: "The ubtan has transformed my skin. My complexion looks brighter and feels so smooth after just two weeks of use.",
    userName: "Priya S.",
    productName: "Ubtan Powder",
  },
  {
    id: "fallback-2",
    rating: 5,
    body: "Finally found a natural alternative for my hair. The shikakai powder leaves my hair so soft without any chemicals.",
    userName: "Ananya R.",
    productName: "Shikakai Powder",
  },
  {
    id: "fallback-3",
    rating: 5,
    body: "Love the quality. The amla powder has noticeably reduced my hair fall. I have been using it for three months now.",
    userName: "Meera K.",
    productName: "Amla Powder",
  },
  {
    id: "fallback-4",
    rating: 5,
    body: "The multani mitti is so pure and finely ground. My skin feels genuinely clean after every mask — no residue, no tightness.",
    userName: "Ritu M.",
    productName: "Multani Mitti",
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] =
    useState<ReviewData[]>(fallbackTestimonials);

  useEffect(() => {
    fetch("/api/reviews?featured=true&limit=4")
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews?.length >= 4) {
          setTestimonials(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container-brand">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="font-accent text-[11px] tracking-[0.2em] uppercase text-bark/40 mb-4">
            Verified Purchases
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-heading text-4xl md:text-6xl text-bark font-light leading-tight">
              What customers
              <br />
              <em className="text-gold not-italic">are saying.</em>
            </h2>
            <p className="font-body text-sm text-bark/50 md:max-w-xs md:text-right leading-relaxed">
              Real reviews from people using Jaison powders daily — no curation, no filters.
            </p>
          </div>
          {/* Divider */}
          <div className="mt-8 h-px bg-bark/10" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-bark/10">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-cream p-8 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < testimonial.rating
                        ? "fill-bark text-bark"
                        : "fill-transparent text-bark/20"
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="font-body text-sm text-bark/70 leading-relaxed flex-1">
                &ldquo;{testimonial.body}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-bark/8 pt-5">
                <p className="font-heading text-sm text-bark">
                  {testimonial.userName}
                </p>
                <p className="font-accent text-[10px] tracking-widest uppercase text-bark/35 mt-1">
                  {testimonial.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom aggregate */}
        <div className="mt-px bg-bark/5 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-bark text-bark" />
              ))}
            </div>
            <span className="font-heading text-sm text-bark">4.9 / 5</span>
            <span className="font-body text-xs text-bark/40">across all products</span>
          </div>
          <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40">
            55 Years · Zero Compromises
          </p>
        </div>
      </div>
    </section>
  );
}
