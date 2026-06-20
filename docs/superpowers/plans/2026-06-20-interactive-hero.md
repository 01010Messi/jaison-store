# Interactive Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the video-background homepage hero with an interactive, single-viewport hero (split text/visual layout, scroll + cursor parallax over whole-photo "cards", ambient particles), built and compared as two spikes — Framer Motion and GSAP — before one is kept and wired into production.

**Architecture:** Shared pure-logic module (`parallaxMath.ts`) and two dumb leaf components (`HeroPhotoCard`, `HeroParticles`) are consumed identically by two full hero implementations (`HeroSectionFramer.tsx`, `HeroSectionGsap.tsx`), each driving the same depth/offset numbers through a different animation engine. Both are mounted on temporary `/dev/hero-a` and `/dev/hero-b` routes for side-by-side comparison; the loser and all spike scaffolding are deleted before the winner is wired into the real `src/components/home/HeroSection.tsx`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion (existing dependency), GSAP + ScrollTrigger (new, temporary — removed if it loses the spike), `next/image`, Node's built-in `node:test` runner for pure-logic tests.

## Global Constraints

- **No new transparent/cutout product or ingredient assets.** Every image in `public/images/products/` was inspected directly and all are composited marketing banners with baked-in headline text and styled backgrounds — none are isolated cutouts, and none are good automated-background-removal candidates. The design uses whole-photo "cards" (soft-masked rectangles), not cutouts. See `docs/superpowers/specs/2026-06-20-interactive-hero-design.md`.
- **No automated tests exist in this codebase** (no jest/vitest/playwright/testing-library — confirmed via `package.json`). This plan writes real `node:test` unit tests only for the pure-logic file (`parallaxMath.ts`), runnable with zero new dependencies via `node --experimental-strip-types --test` (verified working on the Node version in this environment, v22.22.3). React component / animation correctness is verified by manual browser checks at documented checkpoints — that is the honest testing strategy for visual/perceptual work in a codebase with no component test harness, not a gap being papered over.
- **Headline copy is unchanged**: "Your bottle lists a dozen ingredients. Our product lists one." Do not rewrite it as part of this plan.
- **The existing letter-glow CSS classes (`gw1`–`gw6`, defined in `src/app/globals.css:336-341`) are reused as-is** on the headline spans — they're pure CSS `infinite` keyframe animations already covered by the sitewide `prefers-reduced-motion` collapse in `globals.css:102-109` (`animation-duration: 0.01ms !important`), so no extra reduced-motion handling is needed for them specifically.
- **The 3-stat strip ("1970 / 55 / 0") below the hero is kept unchanged**, appended after the new hero block exactly as it is today. This plan only replaces the hero block above it. (If this assumption is wrong, flag it before Task 9.)
- **Flagship visual:** Ubtan. Product card source: `/images/products/ubtan.jpg` (jar + box + bowl, no baked-in headline text, only legitimate packaging labels). Context/ingredient card source: `/images/products/ubtan-essence.png`, cropped via `object-position` to bias toward its bottom region (turmeric root, saffron bowl, neem leaf, rose petals) and exclude its baked-in "Essence of Herbs in Every Gram" headline text — exact crop framing gets eyeballed and adjusted live in the browser during Task 8, since pixel-perfect framing isn't something to guess blind.
- **`prefers-reduced-motion: reduce` is a hard requirement** for all scroll/cursor-driven parallax and the particle field (not covered by the global CSS collapse, since those are driven by JS-computed transform values, not CSS transitions). Each variant must explicitly check it and skip to the static settled state.
- Project import alias is `@/*` → `./src/*` (see `tsconfig.json`). Use it in all application code. The `node:test` file uses a relative import instead, since Node's native loader doesn't resolve the bundler alias.
- All work happens on the current branch (`redesign/v2`); per project convention, commit and push only — never deploy.

---

### Task 1: Parallax math utilities

**Files:**
- Create: `src/lib/hero/parallaxMath.ts`
- Test: `src/lib/hero/parallaxMath.test.ts`

**Interfaces:**
- Produces: `clamp(value: number, min: number, max: number): number`, `lerp(t: number, range: [number, number]): number`, `cursorOffset(pointerX: number, pointerY: number, rect: { left: number; top: number; width: number; height: number }, depth: number, maxOffsetPx: number): { x: number; y: number }`, `scrollProgress(scrollY: number, start: number, end: number): number`, `cardTransform(offsetX: number, offsetY: number, scale: number): string`, and the constant `HERO_PARALLAX` (shape shown in Step 3). Tasks 5 and 6 both import all of these from `@/lib/hero/parallaxMath`.

- [ ] **Step 1: Write the failing test file**

```ts
// src/lib/hero/parallaxMath.test.ts
import test from "node:test";
import assert from "node:assert";
import {
  clamp,
  lerp,
  cursorOffset,
  scrollProgress,
  cardTransform,
} from "./parallaxMath.ts";

test("clamp bounds values within range", () => {
  assert.strictEqual(clamp(5, 0, 10), 5);
  assert.strictEqual(clamp(-5, 0, 10), 0);
  assert.strictEqual(clamp(15, 0, 10), 10);
});

test("lerp interpolates and clamps t to [0,1]", () => {
  assert.strictEqual(lerp(0, [10, 20]), 10);
  assert.strictEqual(lerp(1, [10, 20]), 20);
  assert.strictEqual(lerp(0.5, [10, 20]), 15);
  assert.strictEqual(lerp(1.5, [0, 10]), 10);
  assert.strictEqual(lerp(-0.5, [0, 10]), 0);
});

test("cursorOffset is zero at the rect center", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 };
  const offset = cursorOffset(100, 50, rect, 1, 20);
  assert.strictEqual(offset.x, 0);
  assert.strictEqual(offset.y, 0);
});

test("cursorOffset scales with depth and clamps to maxOffsetPx at the rect edge", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 };
  const fullDepth = cursorOffset(200, 50, rect, 1, 20);
  assert.strictEqual(fullDepth.x, 20);
  const halfDepth = cursorOffset(200, 50, rect, 0.5, 20);
  assert.strictEqual(halfDepth.x, 10);
  const beyondEdge = cursorOffset(400, 50, rect, 1, 20);
  assert.strictEqual(beyondEdge.x, 20);
});

test("scrollProgress maps scrollY into a clamped 0-1 range", () => {
  assert.strictEqual(scrollProgress(0, 0, 1000), 0);
  assert.strictEqual(scrollProgress(500, 0, 1000), 0.5);
  assert.strictEqual(scrollProgress(2000, 0, 1000), 1);
  assert.strictEqual(scrollProgress(-100, 0, 1000), 0);
});

test("cardTransform formats a translate3d + scale CSS string", () => {
  assert.strictEqual(
    cardTransform(1.5, -2, 1.04),
    "translate3d(1.50px, -2.00px, 0) scale(1.040)"
  );
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `node --experimental-strip-types --test src/lib/hero/parallaxMath.test.ts`
Expected: FAIL — `Cannot find module './parallaxMath.ts'` (the implementation doesn't exist yet).

- [ ] **Step 3: Write the implementation**

```ts
// src/lib/hero/parallaxMath.ts
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(t: number, range: [number, number]): number {
  const [from, to] = range;
  return from + (to - from) * clamp(t, 0, 1);
}

export interface Offset {
  x: number;
  y: number;
}

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function cursorOffset(
  pointerX: number,
  pointerY: number,
  rect: Rect,
  depth: number,
  maxOffsetPx: number
): Offset {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const relX = clamp((pointerX - centerX) / (rect.width / 2), -1, 1);
  const relY = clamp((pointerY - centerY) / (rect.height / 2), -1, 1);
  return { x: relX * maxOffsetPx * depth, y: relY * maxOffsetPx * depth };
}

export function scrollProgress(scrollY: number, start: number, end: number): number {
  if (end === start) return 0;
  return clamp((scrollY - start) / (end - start), 0, 1);
}

export function cardTransform(offsetX: number, offsetY: number, scale: number): string {
  return `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
}

// Shared tuning so the Framer Motion and GSAP spike variants animate
// identically — the comparison is about engine feel/performance, not
// different numbers.
export const HERO_PARALLAX = {
  scrollRangePx: 1200,
  cursor: {
    contextCard: { depth: 0.4, maxOffsetPx: 8 },
    productCard: { depth: 0.8, maxOffsetPx: 18 },
  },
  scroll: {
    contextCard: {
      opacityRange: [1, 0.4] as [number, number],
      translateYRange: [0, -40] as [number, number],
    },
    productCard: {
      scaleRange: [1, 1.04] as [number, number],
    },
    particlesOpacityRange: [1, 0.3] as [number, number],
  },
} as const;
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `node --experimental-strip-types --test src/lib/hero/parallaxMath.test.ts`
Expected: PASS — `# pass 6`, `# fail 0`.

- [ ] **Step 5: Type-check the whole project**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/hero/parallaxMath.ts src/lib/hero/parallaxMath.test.ts
git commit -m "feat(hero): add parallax math utilities with node:test coverage"
```

---

### Task 2: Pointer-position tracking hook

**Files:**
- Create: `src/hooks/usePointerRef.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `usePointerRef(enabled: boolean): React.RefObject<{ x: number; y: number } | null>`. Tasks 4, 5, and 6 use this — it's the single source of cursor position, read inside rAF/ticker loops without causing React re-renders on every `pointermove`.

- [ ] **Step 1: Write the hook**

```ts
// src/hooks/usePointerRef.ts
"use client";

import { useEffect, useRef } from "react";

export function usePointerRef(enabled: boolean) {
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!enabled) {
      pointerRef.current = null;
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled]);

  return pointerRef;
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/usePointerRef.ts
git commit -m "feat(hero): add usePointerRef hook for re-render-free cursor tracking"
```

---

### Task 3: HeroPhotoCard component

**Files:**
- Create: `src/components/home/hero/HeroPhotoCard.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks (leaf component).
- Produces: `HeroPhotoCard` (forwardRef to its root `div`), props `{ src: string; alt: string; sizes: string; priority?: boolean; decorative?: boolean; objectPosition?: string; className?: string }`. Tasks 5 and 6 render two of these per variant and attach their own animation engine to the forwarded ref — this component renders structure and styling only, no animation logic, so it can't bias the comparison toward either engine.

- [ ] **Step 1: Write the component**

```tsx
// src/components/home/hero/HeroPhotoCard.tsx
"use client";

import Image from "next/image";
import { forwardRef } from "react";

interface HeroPhotoCardProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  objectPosition?: string;
  className?: string;
}

const HeroPhotoCard = forwardRef<HTMLDivElement, HeroPhotoCardProps>(
  function HeroPhotoCard(
    { src, alt, sizes, priority = false, decorative = false, objectPosition = "center", className = "" },
    ref
  ) {
    return (
      <div
        ref={ref}
        aria-hidden={decorative || undefined}
        className={`absolute overflow-hidden rounded-2xl ${className}`}
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, black 78%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 78%, transparent 100%)",
          boxShadow: "0 24px 48px -12px rgba(26,60,52,0.35)",
        }}
      >
        <Image
          src={src}
          alt={decorative ? "" : alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }
);

export default HeroPhotoCard;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/hero/HeroPhotoCard.tsx
git commit -m "feat(hero): add HeroPhotoCard presentational component"
```

---

### Task 4: HeroParticles component

**Files:**
- Create: `src/components/home/hero/HeroParticles.tsx`

**Interfaces:**
- Consumes: the ref type produced by `usePointerRef` (Task 2) — `React.RefObject<{ x: number; y: number } | null>`.
- Produces: `HeroParticles`, props `{ reducedMotion: boolean; particleCount?: number; cursorRef?: React.RefObject<{ x: number; y: number } | null>; className?: string }`. Tasks 5 and 6 mount one instance each, passing their `usePointerRef` ref and their own reduced-motion check.

- [ ] **Step 1: Write the component**

```tsx
// src/components/home/hero/HeroParticles.tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseVX: number;
  baseVY: number;
  pushX: number;
  pushY: number;
  radius: number;
}

interface HeroParticlesProps {
  reducedMotion: boolean;
  particleCount?: number;
  cursorRef?: React.RefObject<{ x: number; y: number } | null>;
  className?: string;
}

// Brand gold (#B89968 in DESIGN.md) as a canvas rgb triplet — canvas
// fillStyle can't read CSS custom properties, so the literal is pulled
// from the documented token instead of inventing a new value.
const PARTICLE_COLOR = "184,153,104";
const PUSH_RADIUS_PX = 90;

export default function HeroParticles({
  reducedMotion,
  particleCount = 24,
  cursorRef,
  className = "",
}: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseVX: (Math.random() - 0.5) * 0.15,
      baseVY: (Math.random() - 0.5) * 0.15 - 0.05,
      pushX: 0,
      pushY: 0,
      radius: 1 + Math.random() * 2,
    }));

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let frameId: number;

    function tick() {
      frameId = requestAnimationFrame(tick);
      if (!visibleRef.current) return;
      ctx!.clearRect(0, 0, width, height);

      const cursor = cursorRef?.current ?? null;

      for (const p of particles) {
        if (cursor) {
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PUSH_RADIUS_PX && dist > 0.001) {
            const force = (1 - dist / PUSH_RADIUS_PX) * 1.2;
            p.pushX += (dx / dist) * force;
            p.pushY += (dy / dist) * force;
          }
        }
        p.pushX *= 0.92;
        p.pushY *= 0.92;

        p.x += p.baseVX + p.pushX;
        p.y += p.baseVY + p.pushY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${PARTICLE_COLOR}, 0.35)`;
        ctx!.fill();
      }
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [reducedMotion, particleCount, cursorRef]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/hero/HeroParticles.tsx
git commit -m "feat(hero): add HeroParticles canvas particle field"
```

---

### Task 5: HeroSectionFramer (variant A)

**Files:**
- Create: `src/components/home/hero/HeroSectionFramer.tsx`

**Interfaces:**
- Consumes: `HERO_PARALLAX`, `cursorOffset`, `lerp` from `@/lib/hero/parallaxMath` (Task 1); `usePointerRef` (Task 2); `HeroPhotoCard` (Task 3); `HeroParticles` (Task 4); `useMediaQuery` and `useIsMobile` from `@/hooks/useMediaQuery` (existing).
- Produces: default export `HeroSectionFramer` — a full hero `<section>`, mounted by the dev preview route in Task 7.

- [ ] **Step 1: Write the component**

```tsx
// src/components/home/hero/HeroSectionFramer.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMediaQuery, useIsMobile } from "@/hooks/useMediaQuery";
import { usePointerRef } from "@/hooks/usePointerRef";
import { HERO_PARALLAX, cursorOffset, lerp } from "@/lib/hero/parallaxMath";
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

  const contextX = useMotionValue(0);
  const contextY = useMotionValue(0);
  const productX = useMotionValue(0);
  const productY = useMotionValue(0);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, HERO_PARALLAX.scrollRangePx], [0, 1]);
  const [scrollT, setScrollT] = useState(0);

  useEffect(() => {
    return progress.on("change", (latest) => setScrollT(latest));
  }, [progress]);

  useAnimationFrame((time) => {
    if (prefersReducedMotion || !visualBlockRef.current) return;

    if (pointerFine) {
      const rect = visualBlockRef.current.getBoundingClientRect();
      const cursor = cursorRef.current;
      if (!cursor) return;

      const ctxOffset = cursorOffset(cursor.x, cursor.y, rect, HERO_PARALLAX.cursor.contextCard.depth, HERO_PARALLAX.cursor.contextCard.maxOffsetPx);
      const prodOffset = cursorOffset(cursor.x, cursor.y, rect, HERO_PARALLAX.cursor.productCard.depth, HERO_PARALLAX.cursor.productCard.maxOffsetPx);

      contextX.set(ctxOffset.x);
      contextY.set(ctxOffset.y);
      productX.set(prodOffset.x);
      productY.set(prodOffset.y);
      return;
    }

    // No cursor on touch — drift gently on a timer instead, so the
    // scene isn't static for the mobile majority of traffic.
    const angle = ((time % AMBIENT_LOOP_MS) / AMBIENT_LOOP_MS) * Math.PI * 2;
    contextX.set(Math.sin(angle) * HERO_PARALLAX.cursor.contextCard.maxOffsetPx * 0.5);
    contextY.set(Math.cos(angle) * HERO_PARALLAX.cursor.contextCard.maxOffsetPx * 0.5);
    productX.set(Math.sin(angle + Math.PI / 3) * HERO_PARALLAX.cursor.productCard.maxOffsetPx * 0.5);
    productY.set(Math.cos(angle + Math.PI / 3) * HERO_PARALLAX.cursor.productCard.maxOffsetPx * 0.5);
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

  const effectiveScrollT = prefersReducedMotion ? 0 : scrollT;
  const contextOpacity = lerp(effectiveScrollT, HERO_PARALLAX.scroll.contextCard.opacityRange);
  const contextScrollY = lerp(effectiveScrollT, HERO_PARALLAX.scroll.contextCard.translateYRange);
  const productScale = lerp(effectiveScrollT, HERO_PARALLAX.scroll.productCard.scaleRange);
  const particlesOpacity = lerp(effectiveScrollT, HERO_PARALLAX.scroll.particlesOpacityRange);

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
            // contextOpacity/contextScrollY/motion offsets applied via style below
          />
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              opacity: contextOpacity,
              transform: `translateY(${contextScrollY}px)`,
              x: contextX,
              y: contextY,
              pointerEvents: "none",
            }}
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
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${productScale})`,
              x: productX,
              y: productY,
              pointerEvents: "none",
            }}
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
```

> Note for implementer: Framer Motion's `motion.div` style binding requires the **animated element itself** to carry the `x`/`y`/`transform` style, not a sibling overlay. The `motion.div` overlays above are placeholders for wiring the computed values — when implementing, move the `style={{ x: contextX, y: contextY, opacity: contextOpacity, transform: ... }}` directly onto the `HeroPhotoCard`'s root by converting `HeroPhotoCard`'s forwarded ref usage to accept a `motion`-wrapped root (e.g. render `<motion.div ref={ref}>` inside `HeroPhotoCard` instead of a plain `div`, and pass `style` through via a `motionStyle` prop). Confirm the cards visibly move before proceeding to Task 7 — this is the manual verification gate for this task, since no component test harness exists.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual smoke check**

Run: `npm run dev`, temporarily render `<HeroSectionFramer />` in place of `<HeroSection />` on `/` (or wait for Task 7's dedicated route — either order is fine), confirm in the browser:
- Headline fades in once on load.
- Scrolling down ~150vh thins/fades the context card and settles the product card.
- Moving the mouse on desktop shifts both cards at different magnitudes.
- DevTools device toolbar with touch emulation on (so `pointerFine` is false) → both cards drift on their own without cursor input.
- DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → cards stop moving, particles disappear.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/hero/HeroSectionFramer.tsx
git commit -m "feat(hero): add Framer Motion hero spike (variant A)"
```

---

### Task 6: HeroSectionGsap (variant B)

**Files:**
- Modify: `package.json` (add `gsap` dependency)
- Create: `src/components/home/hero/HeroSectionGsap.tsx`

**Interfaces:**
- Consumes: `HERO_PARALLAX`, `cursorOffset`, `lerp` from `@/lib/hero/parallaxMath` (Task 1); `usePointerRef` (Task 2); `HeroPhotoCard` (Task 3); `HeroParticles` (Task 4); `useMediaQuery` and `useIsMobile` (existing).
- Produces: default export `HeroSectionGsap`, same shape as `HeroSectionFramer`, mounted by Task 7's other dev route.

- [ ] **Step 1: Install GSAP**

```bash
npm install gsap
```

- [ ] **Step 2: Write the component**

```tsx
// src/components/home/hero/HeroSectionGsap.tsx
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
      function handleMove(event: PointerEvent) {
        if (!visualBlockRef.current) return;
        const rect = visualBlockRef.current.getBoundingClientRect();

        const ctxOffset = cursorOffset(event.clientX, event.clientY, rect, HERO_PARALLAX.cursor.contextCard.depth, HERO_PARALLAX.cursor.contextCard.maxOffsetPx);
        const prodOffset = cursorOffset(event.clientX, event.clientY, rect, HERO_PARALLAX.cursor.productCard.depth, HERO_PARALLAX.cursor.productCard.maxOffsetPx);

        gsap.to(contextCardRef.current, { x: ctxOffset.x, y: ctxOffset.y, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        gsap.to(productCardRef.current, { x: prodOffset.x, y: prodOffset.y, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      }

      window.addEventListener("pointermove", handleMove);
      return () => window.removeEventListener("pointermove", handleMove);
    }

    // No cursor on touch — drift gently on a timer instead, so the
    // scene isn't static for the mobile majority of traffic.
    function ambientTick() {
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
    }
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
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors. (If GSAP ships its own types, no `@types/gsap` install is needed — confirm no missing-types error; if one appears, GSAP's package didn't bundle types as expected and that's a real blocker to report, not something to silently `// @ts-ignore` around.)

- [ ] **Step 4: Manual smoke check**

Same checklist as Task 5 Step 3, against this component.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/components/home/hero/HeroSectionGsap.tsx
git commit -m "feat(hero): add GSAP hero spike (variant B)"
```

---

### Task 7: Dev preview routes

**Files:**
- Create: `src/app/dev/hero-a/page.tsx`
- Create: `src/app/dev/hero-b/page.tsx`
- Modify: `src/app/robots.ts`

**Interfaces:**
- Consumes: `HeroSectionFramer` (Task 5), `HeroSectionGsap` (Task 6).
- Produces: two routes at `/dev/hero-a` and `/dev/hero-b`, reachable only by direct URL during Task 8's comparison — not linked from any nav, sitemap entry, or production page.

- [ ] **Step 1: Write the preview pages**

```tsx
// src/app/dev/hero-a/page.tsx
import HeroSectionFramer from "@/components/home/hero/HeroSectionFramer";

export default function HeroPreviewA() {
  return (
    <main>
      <div className="fixed top-2 left-2 z-50 rounded bg-black/80 px-3 py-1 text-xs text-white">
        Variant A — Framer Motion
      </div>
      <HeroSectionFramer />
    </main>
  );
}
```

```tsx
// src/app/dev/hero-b/page.tsx
import HeroSectionGsap from "@/components/home/hero/HeroSectionGsap";

export default function HeroPreviewB() {
  return (
    <main>
      <div className="fixed top-2 left-2 z-50 rounded bg-black/80 px-3 py-1 text-xs text-white">
        Variant B — GSAP
      </div>
      <HeroSectionGsap />
    </main>
  );
}
```

- [ ] **Step 2: Disallow `/dev/` in robots.ts**

In `src/app/robots.ts`, add `"/dev/"` to the `disallow` array:

```ts
const disallow = [
  "/admin",
  "/admin/",
  "/api/",
  "/login",
  "/register",
  "/_next/",
  "/checkout",
  "/order-success",
  "/account",
  "/dev/",
];
```

- [ ] **Step 3: Verify both routes render**

Run: `npm run dev`, visit `http://localhost:3000/dev/hero-a` and `http://localhost:3000/dev/hero-b`.
Expected: both load without console errors, each showing its label badge.

- [ ] **Step 4: Commit**

```bash
git add src/app/dev/hero-a/page.tsx src/app/dev/hero-b/page.tsx src/app/robots.ts
git commit -m "feat(hero): add dev-only preview routes for spike comparison"
```

---

### Task 8: Manual comparison checkpoint (decision gate — no code changes)

This task has no files to change. It's the explicit human decision point the spec calls for before integration.

- [ ] **Step 1:** With `npm run dev` running, open `/dev/hero-a` and `/dev/hero-b` side by side (two browser windows, or sequentially).
- [ ] **Step 2:** On each, check: desktop cursor parallax feel, scroll transition smoothness over the first ~150vh, then switch to a mobile viewport via DevTools device toolbar with touch emulation enabled (so `(pointer: fine)` evaluates false and the ambient loop actually engages instead of the cursor path) — confirm both photo cards drift gently on their own ~10s loop and particles keep moving, so the scene doesn't look static just because there's no cursor.
- [ ] **Step 3:** Toggle DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" on each — confirm cards stop moving and particles disappear on both.
- [ ] **Step 4:** Adjust the context card's `objectPosition` value in whichever variant(s) if the "Essence of Herbs in Every Gram" text is still partially visible — nudge toward `"50% 100%"` or crop the card's height down until it's fully excluded. Apply the same final value to both variants' `HeroPhotoCard` so the comparison stays fair.
- [ ] **Step 5: Decide.** Record the winner (Framer Motion or GSAP) before proceeding to Task 9 — Task 9 needs this answer.

---

### Task 9: Integrate the winning variant, delete the spike

**Files:**
- Modify: `src/components/home/HeroSection.tsx` (replace its contents with the winning variant's JSX/logic, adapted to be the default export `HeroSection`)
- Delete: the losing variant's file (`HeroSectionFramer.tsx` or `HeroSectionGsap.tsx`)
- Delete: `src/app/dev/hero-a/page.tsx`, `src/app/dev/hero-b/page.tsx`, and the now-empty `src/app/dev/` directory
- Modify: `src/app/robots.ts` (remove the `"/dev/"` entry added in Task 7)
- Modify: `package.json` (remove the `gsap` dependency if Framer Motion won)

**Interfaces:**
- Consumes: whichever of `HeroSectionFramer`/`HeroSectionGsap` won Task 8.
- Produces: `src/components/home/HeroSection.tsx` exporting a `HeroSection` component with the exact same external contract as the file had before this plan (default export, no props) — `src/app/(storefront)/page.tsx` or wherever it's currently imported needs no changes.

- [ ] **Step 1: Find the current import site**

Run: `grep -rn "HeroSection" src/app --include="*.tsx"`
Confirm where the homepage imports `HeroSection` from `@/components/home/HeroSection`.

- [ ] **Step 2: Replace `HeroSection.tsx`'s contents**

Copy the winning variant's full file content into `src/components/home/HeroSection.tsx`, rename the component/function from `HeroSectionFramer`/`HeroSectionGsap` to `HeroSection`, and update its internal relative imports (`./HeroPhotoCard`, `./HeroParticles` become `./hero/HeroPhotoCard`, `./hero/HeroParticles` since this file now lives one directory up from them — or move `HeroPhotoCard.tsx`/`HeroParticles.tsx`/`parallaxMath.ts` usage paths accordingly; keep the `hero/` subfolder and just adjust the relative import depth).

- [ ] **Step 3: Delete the losing variant and spike scaffolding**

```bash
# If Framer Motion won:
rm src/components/home/hero/HeroSectionGsap.tsx
npm uninstall gsap

# If GSAP won:
rm src/components/home/hero/HeroSectionFramer.tsx
```

```bash
rm -rf src/app/dev
```

- [ ] **Step 4: Revert the robots.ts disallow entry**

Remove the `"/dev/"` line added in Task 7, Step 2.

- [ ] **Step 5: Build and verify**

Run: `npx tsc --noEmit && npm run build`
Expected: clean build, no missing-module errors (this catches any leftover import path from Step 2's directory-depth adjustment).

- [ ] **Step 6: Manual homepage check**

Run: `npm run dev`, visit `http://localhost:3000/`, confirm the hero behaves the same as it did at its dev-route URL, and that the unchanged 3-stat strip still renders directly below it.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(hero): integrate winning hero variant, remove spike scaffolding"
```

---

### Task 10: Final performance and accessibility verification

**Files:** none — verification only.

- [ ] **Step 1: Production build check**

Run: `npm run build && npm run start`

- [ ] **Step 2: Lighthouse audit**

In Chrome DevTools (against `http://localhost:3000/` from Step 1, mobile device emulation), run a Lighthouse Performance audit. Compare against the documented baseline of 83 (from the prior PageSpeed pass). If it regresses meaningfully, profile which layer is the cause before considering this task done — likely candidates are particle count on low-end CPU emulation, or `next/image` not getting `priority` where expected.

- [ ] **Step 3: Contrast spot-check**

Using DevTools' contrast checker (or the axe DevTools extension) on the headline, tagline, and body copy against the hero's backdrop. Confirm they still meet the `/72` muted-text floor documented in `DESIGN.md` / `ACCESSIBILITY-AUDIT.md` — the split layout was chosen specifically so this should pass without changes, but verify rather than assume.

- [ ] **Step 4: Record the outcome**

If both checks pass, this plan is complete. If either regresses, open a follow-up task describing the specific regression and its cause — don't silently tune values without recording why.
