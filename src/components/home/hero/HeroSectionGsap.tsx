"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery, useIsMobile } from "@/hooks/useMediaQuery";
import { usePointerRef } from "@/hooks/usePointerRef";
import { HERO_PARALLAX, cursorOffset, lerp } from "@/lib/hero/parallaxMath";
import HeroPhotoCard from "./HeroPhotoCard";
import HeroParticles from "./HeroParticles";

gsap.registerPlugin(ScrollTrigger);

// Ambient drift period for touch devices, where there's no cursor to
// react to (spec: "slow ambient auto-loop (~8-12s period)").
const AMBIENT_LOOP_MS = 10000;

export default function HeroSectionGsap() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contextCardRef = useRef<HTMLDivElement>(null);
  const productCardRef = useRef<HTMLDivElement>(null);
  const visualBlockRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pointerFine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isMobile = useIsMobile();
  const cursorRef = usePointerRef(pointerFine && !reducedMotion);

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
    if (reducedMotion || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${HERO_PARALLAX.scrollRangePx}`,
      scrub: true,
      onUpdate: (self) => {
        const t = self.progress;
        gsap.set(contextCardRef.current, {
          opacity: lerp(t, HERO_PARALLAX.scroll.contextCard.opacityRange),
          y: lerp(t, HERO_PARALLAX.scroll.contextCard.translateYRange),
        });
        gsap.set(productCardRef.current, {
          scale: lerp(t, HERO_PARALLAX.scroll.productCard.scaleRange),
        });
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !visualBlockRef.current) return;

    if (pointerFine) {
      const handleMove = (event: PointerEvent) => {
        if (!visualBlockRef.current) return;
        const rect = visualBlockRef.current.getBoundingClientRect();

        const ctxOffset = cursorOffset(event.clientX, event.clientY, rect, HERO_PARALLAX.cursor.contextCard.depth, HERO_PARALLAX.cursor.contextCard.maxOffsetPx);
        const prodOffset = cursorOffset(event.clientX, event.clientY, rect, HERO_PARALLAX.cursor.productCard.depth, HERO_PARALLAX.cursor.productCard.maxOffsetPx);

        gsap.to(contextCardRef.current, { x: ctxOffset.x, y: ctxOffset.y, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        gsap.to(productCardRef.current, { x: prodOffset.x, y: prodOffset.y, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      };

      window.addEventListener("pointermove", handleMove);
      return () => window.removeEventListener("pointermove", handleMove);
    }

    // No cursor on touch — drift gently on a timer instead, so the
    // scene isn't static for the mobile majority of traffic.
    const ambientTick = () => {
      const elapsedMs = gsap.ticker.time * 1000;
      const angle = ((elapsedMs % AMBIENT_LOOP_MS) / AMBIENT_LOOP_MS) * Math.PI * 2;
      gsap.set(contextCardRef.current, {
        x: Math.sin(angle) * HERO_PARALLAX.cursor.contextCard.maxOffsetPx * 0.5,
        y: Math.cos(angle) * HERO_PARALLAX.cursor.contextCard.maxOffsetPx * 0.5,
      });
      gsap.set(productCardRef.current, {
        x: Math.sin(angle + Math.PI / 3) * HERO_PARALLAX.cursor.productCard.maxOffsetPx * 0.5,
        y: Math.cos(angle + Math.PI / 3) * HERO_PARALLAX.cursor.productCard.maxOffsetPx * 0.5,
      });
    };
    gsap.ticker.add(ambientTick);
    return () => gsap.ticker.remove(ambientTick);
  }, [reducedMotion, pointerFine]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading font-light"
          style={{ fontSize: "clamp(9rem, 26vw, 24rem)", color: "rgba(26,60,52,0.032)", letterSpacing: "-0.05em", lineHeight: 1 }}
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
            objectPosition="50% 100%"
            className="w-[160px] h-[136px] md:w-[260px] md:h-[222px] top-[6%] left-[2%] md:top-[10%] md:left-[4%] z-10"
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
            reducedMotion={reducedMotion}
            particleCount={isMobile ? 12 : 24}
            cursorRef={cursorRef}
            className="z-30"
          />
        </div>
      </div>
    </section>
  );
}
