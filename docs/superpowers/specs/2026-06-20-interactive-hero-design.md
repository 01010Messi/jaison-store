# Interactive Hero Redesign — Design Spec

**Date:** 2026-06-20
**Branch:** redesign/v2
**Status:** Approved, pending spike comparison (Framer Motion vs GSAP)

## Background

The current homepage hero (`src/components/home/HeroSection.tsx`) is a full-bleed
looping video (`hero-group.mp4`) with a letter-glow headline and a stats strip
below. It went through a PageSpeed pass (51→83) and a full contrast/a11y audit
(session 17) — both fragile, hard-won gains that this redesign must not regress.

Inspiration: two Instagram reels (sprrrint beauty-cream concept; an organic
skincare concept noted for "3D and fluid motion"). Instagram blocks scraping,
so these were read from captions/comments, not actual frame analysis — treat
them as a vibe reference (immersive, fluid, dimensional), not a literal spec.

Goal: replace the hero entirely with an interactive design that combines
scroll-driven storytelling, cursor-reactive motion, and a sense of dimension/depth
— without literal 3D assets (none exist for this product line), without
regressing PSI/INP, and without breaking the accessibility floor already
established.

## Decisions

- **Full replacement** of the current video-background hero (not an additive layer, not a new separate section).
- **No true 3D.** Depth is simulated with parallax layering + perspective transforms on existing product photography, not WebGL/3D models.
- **Visual centerpiece:** a fusion of product (jar/pouch) and raw ingredient imagery — not lifestyle/process photography.
- **No isolated cutouts exist or will be produced for this iteration.** Every image in `public/images/products/` was checked directly (not just by filename) — `multani-hero.png`, `neem-hero.png`, `reetha-product.png`, `ubtan-herbs.png`, etc. are all fully composited marketing banners with baked-in headline text and styled photographic backgrounds (wood tables, bokeh leaves, fabric, soft shadows). None are isolated/transparent product or ingredient art, and none are good candidates for automated background removal (multi-object scenes, soft shadows, varied backdrops). The visual architecture below is built around this constraint rather than around cutouts.
- **Flagship product:** Ubtan (signature multi-herb product).
- **Headline copy unchanged** for now: "Your bottle lists a dozen ingredients. Our product lists one." Better headline ideas may be proposed later but require explicit owner approval before swapping.
- **Single viewport height**, not a multi-screen cinematic scroll story. CTAs ("Shop the Catalogue", "Read Why Powder") must stay visible without scrolling — this is a commerce site with intent-driven traffic, not a brand-film page that can afford to delay the CTA. The "richness" budget goes into a short (~100–150vh) scroll-out transition, not additional screens.
- **No new npm dependencies committed yet.** Build the spec twice as a spike — once with Framer Motion (already a project dependency) and once with GSAP + ScrollTrigger (~70KB, not yet a dependency) — compare side by side, then keep one and delete the other before merging into the real homepage.

## Layout & Visual Architecture

Split layout instead of today's full-bleed-text-over-video:

- **Text block** (tagline, headline, body copy, CTAs) sits on a fixed, controlled-contrast backdrop on one side (left on desktop, stacked first on mobile). This protects the `/72` muted-text contrast floor from the accessibility audit — text never sits over moving art, so contrast doesn't need to be re-verified per animation frame.
- **Visual block** occupies the other side (or sits behind/below on mobile), built from a layered stack of **whole-photo cards** (not cutouts), back to front:
  1. **Ambient backdrop** — soft cream/parchment gradient + subtle paper-grain texture; retains the faint "jaison" wordmark watermark from the current design.
  2. **Ingredient/context card layer** — 1–2 of the existing marketing banner images (e.g. a crop of `ubtan-herbs.png` or `ubtan.jpg`), rendered as soft-edged rectangular cards: rounded corners, a feathered edge via CSS `mask-image` radial gradient, and a subtle drop-shadow — positioned smaller and offset behind the product card, drifting slowly at a slower parallax depth.
  3. **Product card** — `ubtan.jpg`/`ubtan-styled.jpg` (the flat product shot, not a composite with other baked-in headline copy where avoidable) as the sharp, in-focus, largest card — the visual anchor, at the fastest/most prominent parallax depth.
  4. **Particle layer** — fine powder/dust drifting and gathering near the product card; foreground-most; `pointer-events: none` so it can never intercept clicks.

  This sidesteps the missing-cutout problem entirely: cards are rectangular (with soft masked edges, not hard crops), so no background removal or new photography is required. The depth illusion comes from layering, scale, shadow, and independent parallax motion per card — not from irregular cutout shapes.

## Interaction & Motion Spec

(Identical behavior required from both the Framer Motion and GSAP spike — the comparison is about feel/performance, not feature parity.)

- **Scroll** (first ~100–150vh past the hero): ingredient layer drifts apart and fades; product layer settles/scales slightly into its resting position; particle layer thins out.
  - Framer Motion variant: `useScroll` + `useTransform` per layer.
  - GSAP variant: a single scrubbed `ScrollTrigger` timeline.
- **Cursor** (desktop only, gated on `(hover: hover) and (pointer: fine)`): each layer offsets at a different magnitude as the cursor moves (multi-depth parallax); particles scatter gently away from the cursor near the jar.
- **Mobile/touch**: no mousemove available, so a slow ambient auto-loop (~8–12s period) keeps the layers gently alive without requiring a gesture. Device-tilt parallax (via `deviceorientation`) is an optional stretch goal only — gated behind an explicit permission prompt on iOS, off by default, not required to ship.
- **`prefers-reduced-motion: reduce`** (hard requirement): disables scroll-transform, cursor-parallax, ambient loop, and particle motion entirely. Layers render directly in their static, settled end-state. The headline's existing one-shot opacity/translateY fade-in may remain, since it's a single transition rather than continuous motion.

## Performance Plan

- **LCP stays on text.** With the video removed, the headline (real text, not an image) is the natural LCP candidate — keep it that way rather than letting a product PNG become the bottleneck.
- **Asset prep:** the chosen Ubtan source images (`ubtan.jpg`/`ubtan-styled.jpg`/`ubtan-herbs.png`, currently 1.3–3MB JPGs/PNGs) are served through `next/image` rather than as raw `<img>` tags — `next.config.js` already configures WebP output and the `deviceSizes`/`imageSizes` this needs, so this is consistent with the existing pattern in `ProductCard.tsx`/`ProductDetail.tsx` rather than a new manual compression step.
- **Particle/canvas layer:** paused via `IntersectionObserver` when the hero scrolls out of view; animates only `transform`/`opacity` (compositor-friendly, no layout-triggering properties); particle count capped lower on mobile than desktop.
- **GSAP cost is the explicit thing being measured** in the spike comparison — if it doesn't earn its ~70KB over the Framer Motion variant, it gets deleted.

## Accessibility Plan

- All decorative layers (ambient backdrop, ingredient layer, particle layer) get `aria-hidden="true"` and are never in the tab order.
- CTAs remain real, focusable `<Link>` elements with normal focus-visible states — none of the new interactivity is required to access any function on the page (cursor/scroll motion is decorative enhancement only).
- Text contrast verified once against the static backdrop (not per-frame), maintaining the `/72` muted-text floor and other tokens from `DESIGN.md` / `ACCESSIBILITY-AUDIT.md`.
- `prefers-reduced-motion: reduce` support is mandatory, per the Interaction spec above.

## Build & Comparison Process

1. Build the shared spec twice on a temporary, dev-only preview route (e.g. `/dev/hero-a` for Framer Motion, `/dev/hero-b` for GSAP) — excluded from sitemap, robots, and nav, never linked from production pages.
2. Compare both on desktop (scroll + cursor), mobile viewport (scroll + ambient loop), and with `prefers-reduced-motion` forced on.
3. Pick one. Delete the other variant's code and the temporary preview routes entirely — no dead code, no commented-out alternative left behind.
4. Wire the winner into the real `src/components/home/HeroSection.tsx`, replacing the video-background implementation.
5. Re-run PageSpeed Insights and the contrast checks before merging — the 83 PSI score and the session-17 contrast fixes are the regression bar.

## Out of Scope

- Rewriting headline copy (may be proposed separately later, requires explicit approval).
- True 3D/WebGL product renders (no 3D assets exist; explicitly rejected for this iteration).
- Multi-screen cinematic scroll story (rejected in favor of single-viewport + short transition, to protect CTA visibility and the performance budget).
- Device-tilt parallax beyond an optional, off-by-default stretch goal.
