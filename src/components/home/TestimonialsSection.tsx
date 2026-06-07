"use client";

import { useState, useEffect } from "react";

interface ReviewData {
  id: string;
  rating: number;
  body: string;
  userName: string;
  productName: string;
  city?: string;
  age?: number;
}

const fallbackTestimonials: ReviewData[] = [
  {
    id: "f1",
    rating: 5,
    body: "I have used this since 1979. Nothing on the shelf has ever tempted me to switch.",
    userName: "Lakshmi",
    productName: "UBTAN",
    city: "JAIPUR",
    age: 67,
  },
  {
    id: "f2",
    rating: 5,
    body: "I spent twelve years on serums. Neem powder did more in six weeks than all of them combined.",
    userName: "Priya",
    productName: "NEEM",
    city: "BENGALURU",
    age: 38,
  },
  {
    id: "f3",
    rating: 5,
    body: "My grandmother made ubtan for my mother's wedding. The first time I mixed Jaison's, the smell took me back to her kitchen.",
    userName: "Anika",
    productName: "UBTAN POWDER",
    city: "PUNE",
    age: 22,
  },
  {
    id: "f4",
    rating: 5,
    body: "I shampooed for fifteen years. Switched to shikakai and reetha. I have not bought a bottle since.",
    userName: "Meera",
    productName: "AMLA",
    city: "HYDERABAD",
    age: 51,
  },
  {
    id: "f5",
    rating: 5,
    body: "No PPD. No chemicals. Just leaves. My grey is covered for six weeks at a time.",
    userName: "Sunita",
    productName: "MEHENDI",
    city: "INDORE",
    age: 74,
  },
];

const avatarColors: Record<string, string> = {
  Lakshmi: "#C4A024",
  Priya: "#3A6B42",
  Anika: "#B85C3A",
  Meera: "#7A5C3A",
  Sunita: "#3A6B42",
};

const badgeColors: Record<string, string> = {
  UBTAN: "#B8863A",
  "UBTAN POWDER": "#B8863A",
  NEEM: "#3A6B42",
  AMLA: "#3A6B42",
  MEHENDI: "#3A6B42",
  MULTANI: "#B85C3A",
  SHIKAKAI: "#7A5C3A",
};

const cardGradients = [
  "linear-gradient(180deg, #C9A87E 0%, #5C3D22 100%)",
  "linear-gradient(180deg, #B89B6E 0%, #4A3018 100%)",
  "linear-gradient(180deg, #C4A070 0%, #6B4228 100%)",
  "linear-gradient(180deg, #BFA882 0%, #5A3D24 100%)",
  "linear-gradient(180deg, #C8A87C 0%, #583820 100%)",
];

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] =
    useState<ReviewData[]>(fallbackTestimonials);

  useEffect(() => {
    fetch("/api/reviews?featured=true&limit=5")
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews?.length >= 4) {
          setTestimonials(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 bg-cream overflow-hidden">
      <div className="container-brand">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-terracotta" />
            <p className="font-accent text-[11px] tracking-[0.2em] uppercase text-terracotta">
              Real Rituals · Across India
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-4xl md:text-6xl text-bark leading-tight">
              People who mix
              <br />
              <em
                className="not-italic"
                style={{ color: "#A0724A" }}
              >
                their own skincare.
              </em>
            </h2>
            <p className="font-body text-sm text-bark/50 md:max-w-xs md:text-right leading-relaxed">
              Real customers, real routines. From oily-skin fixes to herbal
              hair washes — each review is a window into one person&apos;s ritual.
            </p>
          </div>
        </div>

        {/* Cards row */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-5 scrollbar-hide">
          {testimonials.map((t, i) => {
            const avatarColor = avatarColors[t.userName] ?? "#7A5C3A";
            const badgeColor =
              badgeColors[t.productName] ?? badgeColors[t.productName.toUpperCase()] ?? "#7A5C3A";
            const gradient = cardGradients[i % cardGradients.length];

            return (
              <div
                key={t.id}
                className="relative flex-shrink-0 w-[220px] md:w-auto rounded-2xl overflow-hidden flex flex-col justify-between p-5"
                style={{
                  background: gradient,
                  minHeight: "380px",
                }}
              >
                {/* Top: avatar + name */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: avatarColor }}
                  >
                    <span className="font-heading text-sm text-cream font-semibold">
                      {getInitial(t.userName)}
                    </span>
                  </div>
                  <span className="font-body text-sm text-cream/90">
                    {t.userName}
                    {t.age ? `, ${t.age}` : ""}
                  </span>
                </div>

                {/* Middle: quote */}
                <div className="py-6">
                  <p className="font-heading text-base text-cream/95 leading-snug italic">
                    &ldquo;{t.body}&rdquo;
                  </p>
                </div>

                {/* Bottom: city + badge */}
                <div className="flex items-end justify-between">
                  <p className="font-accent text-[10px] tracking-[0.15em] uppercase text-cream/60">
                    {t.city ?? "India"}
                  </p>
                  <span
                    className="font-accent text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full text-cream"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {t.productName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <p className="mt-8 font-accent text-[10px] tracking-[0.25em] uppercase text-bark/30 text-center">
          Real customers. Real routines. Nothing staged.
        </p>
      </div>
    </section>
  );
}
