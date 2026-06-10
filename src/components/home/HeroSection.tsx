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
    <>
      <style>{`
        @keyframes heroKenBurns {
          0%   { transform: scale(1.0) translate(0%, 0%); }
          50%  { transform: scale(1.07) translate(-1%, -0.5%); }
          100% { transform: scale(1.0) translate(0%, 0%); }
        }
        .hero-video {
          animation: heroKenBurns 24s ease-in-out infinite;
        }
      `}</style>

      <section
        className="relative flex flex-col overflow-hidden min-h-screen"
        style={{ backgroundColor: "#FEFAE0" }}
      >
        {/* Background video — Ken Burns via CSS, no zoompan overhead */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hero-video absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/images/hero-group.mp4" type="video/mp4" />
          </video>

          {/* Overlay — transparent at top for image clarity, fades to denser cream at bottom for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(170deg, rgba(254,250,224,0.28) 0%, rgba(254,250,224,0.06) 28%, rgba(254,250,224,0.38) 62%, rgba(254,250,224,0.72) 85%, rgba(254,250,224,0.80) 100%)",
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
            paddingTop: "clamp(80px, 10vh, 110px)",
            paddingBottom: 0,
          }}
        >
          {/* Top-right tagline */}
          <span
            className="self-end font-accent font-semibold uppercase mb-8 md:mb-10"
            style={{
              fontSize: "clamp(12px, 1.05vw, 14px)",
              letterSpacing: "0.18em",
              color: "#834316",
            }}
          >
            55 Years&nbsp;&nbsp;·&nbsp;&nbsp;One Format&nbsp;&nbsp;·&nbsp;&nbsp;Zero Compromises
          </span>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-heading font-light"
            style={{
              fontSize: "clamp(3rem, 9vw, 11rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#1A3C34" }}>Your </span>
            <span style={{ color: "rgba(26,60,52,0.40)" }}>bottle </span>
            <span style={{ color: "rgba(26,60,52,0.26)" }}>lists a</span>
            <br />
            <span style={{ color: "rgba(26,60,52,0.14)" }}>dozen </span>
            <span style={{ color: "#1A3C34" }}>ingredients.</span>
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "#834316" }}>
              Our product lists one.
            </span>
          </h2>

          {/* Sub-copy + CTAs */}
          <div className="mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 md:pb-14">
            <p
              className="font-body leading-relaxed"
              style={{
                fontSize: "clamp(0.8125rem, 1.15vw, 0.9375rem)",
                color: "rgba(26,60,52,0.55)",
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
                  borderColor: "rgba(26,60,52,0.28)",
                  color: "#1A3C34",
                }}
              >
                Read Why Powder
              </Link>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP — image/video continues behind it ───────── */}
        <div
          className="relative z-10 border-t"
          style={{ borderColor: "rgba(26,60,52,0.12)" }}
        >
          {/* Subtle gradient so stats text reads against the video */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(239,228,197,0.55) 0%, rgba(239,228,197,0.72) 100%)",
            }}
          />
          <div className="relative container-brand py-8 md:py-10">
            <div className="grid grid-cols-3 gap-6 md:gap-12 lg:gap-16 text-center">
              {stats.map((s) => (
                <div key={s.num}>
                  <span
                    className="font-heading font-light block"
                    style={{
                      fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                      color: "#834316",
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
                      color: "rgba(26,60,52,0.65)",
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
    </>
  );
}
