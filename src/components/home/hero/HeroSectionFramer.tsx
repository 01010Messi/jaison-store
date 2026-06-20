"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAnimationFrame, useScroll, useReducedMotion } from "framer-motion";
import { useMediaQuery, useIsMobile } from "@/hooks/useMediaQuery";
import { usePointerRef } from "@/hooks/usePointerRef";
import { HERO_PARALLAX, cursorOffset, lerp, scrollProgress, cardTransform } from "@/lib/hero/parallaxMath";
import HeroPhotoCard from "./HeroPhotoCard";
import HeroParticles from "./HeroParticles";

// Ambient drift period for touch devices, where there's no cursor to
// react to (spec: "slow ambient auto-loop (~8-12s period)").
const AMBIENT_LOOP_MS = 10000;

export default function HeroSectionFramer() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contextCardRef = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);
  const visualBlockRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const pointerFine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isMobile = useIsMobile();
  const cursorRef = usePointerRef(pointerFine && !prefersReducedMotion);

  const { scrollY } = useScroll();

  useAnimationFrame((time) => {
    if (
      prefersReducedMotion ||
      !visualBlockRef.current ||
      !contextCardRef.current ||
      !productCardRef.current
    ) {
      return;
    }

    const scrollT = scrollProgress(scrollY.get(), 0, HERO_PARALLAX.scrollRangePx);
    const contextOpacity = lerp(scrollT, HERO_PARALLAX.scroll.contextCard.opacityRange);
    const contextScrollY = lerp(scrollT, HERO_PARALLAX.scroll.contextCard.translateYRange);
    const productScale = lerp(scrollT, HERO_PARALLAX.scroll.productCard.scaleRange);

    let ctxX = 0;
    let ctxY = 0;
    let prodX = 0;
    let prodY = 0;

    if (pointerFine) {
      const rect = visualBlockRef.current.getBoundingClientRect();
      const cursor = cursorRef.current;
      if (cursor) {
        const ctxOffset = cursorOffset(cursor.x, cursor.y, rect, HERO_PARALLAX.cursor.contextCard.depth, HERO_PARALLAX.cursor.contextCard.maxOffsetPx);
        const prodOffset = cursorOffset(cursor.x, cursor.y, rect, HERO_PARALLAX.cursor.productCard.depth, HERO_PARALLAX.cursor.productCard.maxOffsetPx);
        ctxX = ctxOffset.x;
        ctxY = ctxOffset.y;
        prodX = prodOffset.x;
        prodY = prodOffset.y;
      }
    } else {
      // No cursor on touch — drift gently on a timer instead, so the
      // scene isn't static for the mobile majority of traffic.
      const angle = ((time % AMBIENT_LOOP_MS) / AMBIENT_LOOP_MS) * Math.PI * 2;
      ctxX = Math.sin(angle) * HERO_PARALLAX.cursor.contextCard.maxOffsetPx * 0.5;
      ctxY = Math.cos(angle) * HERO_PARALLAX.cursor.contextCard.maxOffsetPx * 0.5;
      prodX = Math.sin(angle + Math.PI / 3) * HERO_PARALLAX.cursor.productCard.maxOffsetPx * 0.5;
      prodY = Math.cos(angle + Math.PI / 3) * HERO_PARALLAX.cursor.productCard.maxOffsetPx * 0.5;
    }

    contextCardRef.current.style.opacity = String(contextOpacity);
    contextCardRef.current.style.transform = cardTransform(ctxX, ctxY + contextScrollY, 1);
    productCardRef.current.style.transform = cardTransform(prodX, prodY, productScale);
  });

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
    <section
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
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

      <div className="relative z-10 flex flex-col md:flex-row flex-1 px-6 md:px-10 lg:px-14 gap-10 items-center">
        <div className="flex-1 max-w-xl">
          <span
            className="block font-accent font-normal uppercase mb-6 md:mb-8"
            style={{ fontSize: "clamp(12px, 1.05vw, 14px)", letterSpacing: "0.18em", color: "var(--color-terracotta)" }}
          >
            55 Years&nbsp;&nbsp;&middot;&nbsp;&nbsp;One Format&nbsp;&nbsp;&middot;&nbsp;&nbsp;Zero Compromises
          </span>

          <h2
            ref={headlineRef}
            className="font-heading font-light"
            style={{ fontSize: "clamp(2.475rem, 5.5vw, 6.5rem)", lineHeight: 0.96, letterSpacing: "-0.02em" }}
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

          <p
            className="font-body leading-relaxed mt-6"
            style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)", color: "rgba(26,60,52,0.88)", maxWidth: "380px" }}
          >
            Most skincare needs preservatives, stabilisers and synthetic
            fragrance to sit on a shelf. Ours needs none of that — just the
            plant, ground and sifted. Mix at home. Use. Rinse.
          </p>

          <div className="flex items-center gap-4 flex-wrap mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-accent uppercase transition-opacity duration-200 hover:opacity-85"
              style={{ borderRadius: "9999px", padding: "17px 34px", fontSize: "12px", letterSpacing: "0.14em", backgroundColor: "var(--color-terracotta)", color: "var(--color-cream)" }}
            >
              Shop the Catalogue&nbsp;→
            </Link>
            <Link
              href="/why-powder"
              className="inline-flex items-center font-accent uppercase transition-opacity duration-200 hover:opacity-85"
              style={{ borderRadius: "9999px", padding: "17px 34px", fontSize: "12px", letterSpacing: "0.14em", backgroundColor: "var(--color-bark)", color: "var(--color-cream)" }}
            >
              Read Why Powder
            </Link>
          </div>
        </div>

        <div
          ref={visualBlockRef}
          className="relative w-full md:flex-1"
          style={{ height: "clamp(280px, 46vw, 620px)" }}
        >
          <HeroPhotoCard
            ref={contextCardRef}
            src="/images/products/ubtan-essence.png"
            alt="Turmeric, saffron and neem — the herbs in Jaison Ubtan"
            sizes="(max-width: 768px) 200px, 260px"
            decorative
            objectPosition="50% 95%"
            className="w-[160px] h-[220px] md:w-[260px] md:h-[320px] top-[6%] left-[2%] md:top-[10%] md:left-[4%] z-10"
          />
          <HeroPhotoCard
            ref={productCardRef}
            src="/images/products/ubtan.jpg"
            alt="Jaison Ubtan powder jar, box and bowl"
            sizes="(max-width: 768px) 220px, 340px"
            priority
            objectPosition="center"
            className="w-[200px] h-[260px] md:w-[340px] md:h-[420px] top-[24%] left-[28%] md:top-[18%] md:left-[30%] z-20"
          />
          <HeroParticles
            reducedMotion={!!prefersReducedMotion}
            particleCount={isMobile ? 12 : 24}
            cursorRef={cursorRef}
            className="z-30"
          />
        </div>
      </div>
    </section>
  );
}
