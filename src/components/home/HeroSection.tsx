"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const stats = [
  { num: "1970", label: "Year we started grinding" },
  { num: "55", label: "Years, one format" },
  { num: "0", label: "Preservatives. Ever." },
];

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    const t = setTimeout(() => {
      el.style.transition = "opacity 1.1s ease, transform 1.1s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden" style={{ backgroundColor: "#FEFAE0" }}>
      {/* Background image — fills entire section height */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-group.jpg"
          alt="Jaison herbals — natural ayurvedic herbal powders"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Overlay: transparent at top, increasingly opaque cream toward bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, rgba(254,250,224,0.38) 0%, rgba(254,250,224,0.10) 30%, rgba(254,250,224,0.48) 65%, rgba(254,250,224,0.88) 100%)",
          }}
        />
      </div>

      {/* Watermark — sits behind all content */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading font-light"
          style={{
            fontSize: "clamp(9rem, 26vw, 24rem)",
            color: "rgba(40,54,24,0.038)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          jaison
        </span>
      </div>

      {/* ── FOREGROUND CONTENT ─────────────────────────────────── */}
      <div
        className="relative z-10 container-brand flex flex-col"
        style={{
          paddingTop: "clamp(120px, 16vh, 175px)",
          paddingBottom: 0,
        }}
      >
        {/* Meta row — right-aligned above headline */}
        <div className="flex justify-end mb-6 md:mb-8">
          <p
            className="font-accent uppercase tracking-[0.22em]"
            style={{ fontSize: "10px", color: "rgba(40,54,24,0.36)" }}
          >
            55 Years&nbsp;&nbsp;·&nbsp;&nbsp;One Format&nbsp;&nbsp;·&nbsp;&nbsp;Zero Compromises
          </p>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-light"
          style={{
            fontSize: "clamp(2.75rem, 7vw, 8rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#283618" }}>Your </span>
          <span style={{ color: "rgba(40,54,24,0.40)" }}>bottle </span>
          <span style={{ color: "rgba(40,54,24,0.26)" }}>lists a</span>
          <br />
          <span style={{ color: "rgba(40,54,24,0.14)" }}>dozen </span>
          <span style={{ color: "#283618" }}>ingredients.</span>
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "#834316" }}>
            Our product lists one.
          </span>
        </h2>

        {/* Sub-copy + CTAs — side by side below the headline */}
        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 md:pb-14">
          <p
            className="font-body leading-relaxed"
            style={{
              fontSize: "clamp(0.8125rem, 1.15vw, 0.9375rem)",
              color: "rgba(40,54,24,0.55)",
              maxWidth: "310px",
            }}
          >
            Most skincare needs preservatives, stabilisers and synthetic
            fragrance to sit on a shelf. Ours needs none of that — just the
            plant, ground and sifted. Mix at home. Use. Rinse.
          </p>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-accent uppercase transition-opacity duration-200 hover:opacity-85"
              style={{
                borderRadius: "9999px",
                padding: "13px 28px",
                fontSize: "11px",
                letterSpacing: "0.14em",
                backgroundColor: "#834316",
                color: "#FEFAE0",
              }}
            >
              Shop the Catalogue&nbsp;→
            </Link>
            <Link
              href="/why-powder"
              className="inline-flex items-center font-accent uppercase border transition-colors duration-200 hover:border-bark/60"
              style={{
                borderRadius: "9999px",
                padding: "13px 28px",
                fontSize: "11px",
                letterSpacing: "0.14em",
                borderColor: "rgba(40,54,24,0.28)",
                color: "#283618",
              }}
            >
              Read Why Powder
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP — inside the section, image behind it ─── */}
      <div
        className="relative z-10 border-t"
        style={{
          borderColor: "rgba(40,54,24,0.08)",
          backgroundColor: "rgba(254,250,224,0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="container-brand py-8 md:py-10">
          <div className="grid grid-cols-3 gap-6 md:gap-8 lg:gap-16">
            {stats.map((s) => (
              <div key={s.num}>
                <span
                  className="font-heading font-light block"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                    color: "#834316",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
                <p
                  className="font-accent uppercase mt-2"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    color: "rgba(40,54,24,0.42)",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
