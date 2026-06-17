"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const stats = [
  { num: "1970", label: "Year we started grinding" },
  { num: "55", label: "Years, one format" },
  { num: "0", label: "Preservatives. Ever." },
];

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <section
        className="relative flex flex-col overflow-hidden min-h-screen"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        {/* Background video */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            muted
            preload="metadata"
            poster="/images/hero-poster.webp"
            className="hero-video absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/images/hero-group.mp4" type="video/mp4" />
          </video>

          {/* Uniform overlay — no seam between hero body and stats */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(170deg, rgba(254,250,224,0.22) 0%, rgba(254,250,224,0.08) 25%, rgba(254,250,224,0.28) 60%, rgba(254,250,224,0.44) 85%, rgba(254,250,224,0.50) 100%)",
            }}
          />
        </div>

        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-heading font-light"
            style={{
              fontSize: "clamp(9rem, 26vw, 24rem)",
              color: "rgba(26,60,52,0.032)",
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            jaison
          </span>
        </div>

        {/* ── FOREGROUND CONTENT ─────────────────────────────────── */}
        <div
          className="relative z-10 w-full px-6 md:px-10 lg:px-14 flex flex-col flex-1"
          style={{
            paddingTop: "clamp(56px, 6vh, 76px)",
            paddingBottom: 0,
          }}
        >
          {/* Top-right tagline — normal weight */}
          <span
            className="self-end font-accent font-normal uppercase mb-6 md:mb-8"
            style={{
              fontSize: "clamp(12px, 1.05vw, 14px)",
              letterSpacing: "0.18em",
              color: "var(--color-terracotta)",
            }}
          >
            55 Years&nbsp;&nbsp;·&nbsp;&nbsp;One Format&nbsp;&nbsp;·&nbsp;&nbsp;Zero Compromises
          </span>

          {/* Headline — letter glow sweeps word by word */}
          <h2
            ref={headlineRef}
            className="font-heading font-light"
            style={{
              fontSize: "clamp(3rem, 9vw, 11rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="gw1" style={{ color: "var(--color-bark)" }}>Your </span>
            <span className="gw2" style={{ color: "var(--color-bark)" }}>bottle </span>
            <span className="gw3" style={{ color: "var(--color-bark)" }}>lists a</span>
            <br />
            <span className="gw4" style={{ color: "var(--color-bark)" }}>dozen </span>
            <span className="gw5" style={{ color: "var(--color-bark)" }}>ingredients.</span>
            <br />
            <span className="gw6" style={{ fontStyle: "italic", fontWeight: 300, color: "var(--color-terracotta)" }}>
              Our product lists one.
            </span>
          </h2>

          {/* Sub-copy + CTAs */}
          <div className="mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-20 md:pb-6">
            <p
              className="font-body leading-relaxed"
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
                color: "rgba(26,60,52,0.88)",
                maxWidth: "380px",
                textShadow: "0 1px 4px rgba(239,228,197,0.55)",
              }}
            >
              Most skincare needs preservatives, stabilisers and synthetic
              fragrance to sit on a shelf. Ours needs none of that — just the
              plant, ground and sifted. Mix at home. Use. Rinse.
            </p>

            <div className="flex items-center gap-4 flex-shrink-0" style={{ paddingRight: "104px" }}>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-accent uppercase transition-opacity duration-200 hover:opacity-85"
                style={{
                  borderRadius: "9999px",
                  padding: "17px 34px",
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  backgroundColor: "var(--color-terracotta)",
                  color: "var(--color-cream)",
                }}
              >
                Shop the Catalogue&nbsp;→
              </Link>
              <Link
                href="/why-powder"
                className="inline-flex items-center font-accent uppercase transition-opacity duration-200 hover:opacity-85"
                style={{
                  borderRadius: "9999px",
                  padding: "17px 34px",
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  backgroundColor: "var(--color-bark)",
                  color: "var(--color-cream)",
                }}
              >
                Read Why Powder
              </Link>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP — no local overlay, same video shows through ─ */}
        <div
          className="relative z-10 border-t"
          style={{ borderColor: "rgba(26,60,52,0.10)" }}
        >
          <div className="container-brand py-8 md:py-10">
            <div className="grid grid-cols-3 gap-6 md:gap-12 lg:gap-16 text-center">
              {stats.map((s) => (
                <div key={s.num}>
                  <span
                    className="font-heading font-light block"
                    style={{
                      fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                      color: "var(--color-terracotta)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </span>
                  <p
                    className="font-accent uppercase mt-3"
                    style={{
                      fontSize: "clamp(11px, 1vw, 13px)",
                      letterSpacing: "0.18em",
                      color: "rgba(26,60,52,0.70)",
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
