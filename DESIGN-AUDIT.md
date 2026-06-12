# Jaison Herbals — Design System Audit

**Date:** June 12, 2026 · **Branch:** `redesign/v2` · **Scope:** 88 storefront `.tsx` files (admin + API excluded) + `tailwind.config.ts` + `globals.css`

## Summary

**Components reviewed:** 17 (13 ui + 4 decorative) · **Issues found:** 23 · **Score: 58/100**

The visual language is strong and distinctive — Cormorant display serif, bark/cream/tea-brown palette, pill buttons, watermark motif. The weaknesses are structural, not aesthetic: roughly **300 hardcoded hex values** bypass the token system, the same colour exists under several names, interactive primitives ship **without ARIA or visible focus states**, and nothing is documented. The system looks consistent because one team built it fast in one sprint — not because the code enforces consistency. That gap will surface the first time anyone else touches it.

---

## 1. Visual Consistency

**Color.** Two parallel colour systems exist. Tailwind tokens (`bark`, `cream`, `terracotta`…) are used ~750 times, but raw hex appears ~300 times in the same files: `#1A3C34` ×78, `#834316` ×57, `#FEFAE0` ×34. Worse, tokens and inline values have drifted: the `terracotta` token is `#834316`, yet eyebrows use a *different* brown `#A56843` (×5) and numerals use `#B89968` (×5) — neither exists as a token. Legacy `#FDFAF5`/`#E8D5B7` (pre-rebrand cream/border) still appear in 10 places. The find-your-ritual quiz and testimonials carry 15+ one-off pastels (`#EDF2EC`, `#9B7BAE` lavender) that belong to no palette.

**Typography.** Three-font system (`font-heading`/`font-accent`/`font-body`) is applied consistently — good. But the type *scale* is improvised: 25+ distinct `clamp()` expressions live in inline styles, and micro-sizes are arbitrary utilities (`text-[10px]` ×74, `text-[11px]` ×38, `text-[9px]` ×13). The same "eyebrow" role is set at 10px, 11px, and 13px in different files.

**Spacing & layout.** Section rhythm is mostly `py-12 md:py-16` / `py-16 md:py-24`, but at least 6 variants exist for the same role. Two competing page-width systems coexist: `container-brand` (most pages) vs full-width `px-6 md:px-10 lg:px-14` (home hero) — intentional for the hero, but undocumented, so it reads as accident.

**Radius.** Five radius dialects: `rounded-full` ×98 (pills — consistent), `rounded-sm` ×53 (2px, legacy), `rounded-xl` ×22 (new cards), `rounded-lg` ×7, `rounded-2xl` ×6 (testimonials, dropdowns). The sm→xl migration is half-finished: product gallery and thumbnails are still 2px while every card around them is 12px.

## 2. Component Library

| Component | States | Variants | A11y | Docs | Score |
|-----------|--------|----------|------|------|-------|
| Button | hover/active/disabled/loading ✅ | 5 variants, 3 sizes ✅ | no focus-visible ⚠️ | ❌ | 7/10 |
| GlowPillLink | hover/active ✅ | style-prop driven ⚠️ | no focus style ⚠️ | ❌ | 5/10 |
| Input / Select | focus ✅ | label/error ⚠️ | outline removed ⚠️ | ❌ | 5/10 |
| Accordion | open/closed ✅ | — | **0 ARIA attrs** ❌ | ❌ | 3/10 |
| Tabs | active ✅ | — | **0 ARIA attrs** ❌ | ❌ | 3/10 |
| Modal / Drawer | open/closed ✅ | — | **no role/focus-trap** ❌ | ❌ | 3/10 |
| Badge, Skeleton, Spinner, StarRating, SocialShare | basic ✅ | basic | partial | ❌ | 5/10 |
| Decorative (GoldRule, SectionDivider, OrnamentalBorder, ScrollReveal) | n/a | variant props ✅ | aria-hidden missing on some | ❌ | 6/10 |

**Coverage gaps — patterns built inline that deserve components:** the v2 section header (eyebrow + display heading + italic accent + side note) is hand-copied in 10+ files; the FAQ accordion was rebuilt inline in `ProductFAQ` instead of extending `ui/Accordion`; the tab pills in `ProductStory` ignore `ui/Tabs`; step/stat cards are duplicated between home and product page; toast styling is default `react-hot-toast`, off-brand. **Missing entirely:** Breadcrumb (deleted, never abstracted), Pagination, Quantity stepper (inline in 2 places), Form field wrapper with error/help text, EmptyState.

## 3. Design Tokens

**Defined:** 6 colour families with light/dark steps, 4 surface aliases, 2 borders, 4 shadows, fonts, 1 custom radius, 3 spacing extras, 12 animations. Naming is clean and semantic at the alias level (`surface`, `surface-warm`, `border`) — good convention, keep it.

**Problems.** (1) `terracotta.DEFAULT` and the gold family no longer match what the pages actually render — the live accents are `#A56843` and `#B89968`, which are token orphans. (2) `cream` vs `surface`, `parchment` vs `surface-warm` are duplicate names for identical values with no stated rule for which to use. (3) No tokens exist for the type scale (the 25 clamps), eyebrow letter-spacing (`0.18em`/`0.2em`/`0.22em`/`0.28em` all in use), z-index (10/30/40/50 scattered), or opacity steps (`/40 /45 /50 /55 /60 /70` used interchangeably for "muted text"). (4) `goldBorder` keyframe still references retired `#BCA480`.

| Category | Defined | Hardcoded instances found |
|----------|---------|---------------------------|
| Colors | 24 token steps | ~300 raw hex (top 3 = 169 uses) |
| Typography sizes | 0 (fonts only) | 25+ inline clamps, 125+ `text-[Npx]` |
| Spacing | Tailwind + 3 | dozens of one-off `py`/`mb` combos |
| Radius | 1 (`sm` 2px) | mixed dialects, migration half-done |

## 4. Accessibility

**Contrast (computed):** body `bark` on `cream` = **11.8:1 ✅**; accent `#834316` on cream = **7.2:1 ✅** — the core pairing is excellent. Failures: eyebrow `text-bark/40` on cream ≈ **2.2:1 ❌** (worst, used everywhere at 10–11px); eyebrow `#A56843` on parchment ≈ **3.6:1 ❌** at small sizes; gold `#B89968` numerals on cards ≈ **2.4:1 ❌** (decorative, but they carry step order); footer `text-cream/45` sub-copy ≈ **3.6:1 ❌**. Rule of thumb to fix all four: muted text ≥ `/60` on cream, ≥ `/70` on bark.

**Keyboard & screen reader.** 12 of 13 focusable styles use `focus:outline-none`, replacing the ring with only a border-colour change — keyboard users effectively lose focus visibility on pills, accordion rows, and tab pills (no `focus-visible` ring anywhere). `ui/Accordion`, `ui/Tabs`, `ui/Modal`, `ui/Drawer` have **zero ARIA** (no `aria-expanded`, `role="tablist"`, `role="dialog"`, focus trap, or Escape handling — Modal/Drawer untested assumption: verify Escape). The newer inline `ProductFAQ`/`ProductStory` do set `aria-expanded`/`role="tab"` — the primitives are behind the pages built on top of them. `aria-label` (26) and `alt` (27) coverage on icon buttons and images is genuinely good. **No `prefers-reduced-motion` handling anywhere** despite an infinite marquee, `animate-ping`, and Framer Motion.

## 5. Documentation

There is none. `CLAUDE.md` has a 3-line palette note (stale — lists the pre-revert hexes), `CONTENT.md` documents copy only, `README.md` is boilerplate. No component usage notes, no do/don'ts, no token reference, no "when pill vs when Button" rule. For a solo project this is survivable; the moment a second contributor (or a future you in 3 months) arrives, the inline-style conventions (glow shadows, watermark recipe, heading pattern) are unrecoverable except by reading every file.

## 6. Implementation

**Quality.** TypeScript throughout, props typed, `forwardRef` on Button, defensive parsers in `ProductStory` — solid. The inline-`style` convention (chosen to avoid dynamic Tailwind classes) is applied consistently but is the root enabler of token drift: styles in `style={{}}` can't reference Tailwind tokens, so every accent became a copy-pasted hex.

**Performance.** Ritual images correctly pre-sized WebP with `sizes` attrs ✅. Risks: hero ships a full-viewport `priority` JPEG **plus** a second copy in the shop hero; `ScrollReveal`/Framer Motion wraps many above-fold sections (JS-gated rendering); the marquee animates `transform` ✅ but runs unconditionally; `backdrop-filter` used on sticky header + stats strip (cheap on Apple silicon, test on low-end Android).

**Compatibility.** `clamp()`, `backdrop-filter`, `aspect-ratio` — all fine for evergreen browsers; nothing exotic. One real bug class found this week (stale-chunk hydration) was environmental, not code.

## 7. Gaps & Priority Actions

1. **(High, ½ day)** Re-true the tokens: set `terracotta`/`gold` families to the hexes actually shipped (`#834316`, `#A56843`, `#B89968`), delete legacy `#FDFAF5`/`#E8D5B7` stragglers, then sweep the top-3 raw hexes (169 instances) to token classes where they're in `className`. Uniformity stops being luck.
2. **(High, ½ day)** Accessibility floor: add a global `focus-visible` ring (cream-on-bark / bark-on-cream, 2px offset) in `globals.css`; raise all muted text to `/60`+; add `aria-expanded`/`role` to `ui/Accordion`+`ui/Tabs`; Escape + `role="dialog"` + focus trap on Modal/Drawer; one `@media (prefers-reduced-motion: reduce)` block disabling marquee/ping/reveals.
3. **(Medium, ½ day)** Extract the three most-duplicated patterns into components: `SectionHeader` (eyebrow/heading/accent/side-note), `StepCard`, `QtyStepper`. Kill the Accordion/Tabs duplication by upgrading the primitives and pointing `ProductFAQ`/`ProductStory` at them.
4. **(Medium, 2 h)** Decide the radius story — `rounded-full` for interactive pills, `rounded-xl` for cards, retire `rounded-sm` — and finish the migration (gallery, thumbnails, inputs).
5. **(Medium, 2 h)** Write `DESIGN.md`: token table, type scale (promote the 4 real heading sizes to named clamps), the heading pattern, glow-shadow recipe, watermark recipe, pill rules, muted-text opacity rule. Update the stale palette in `CLAUDE.md`.
6. **(Low)** Normalize eyebrow size/tracking to one spec; unify section padding to two named rhythms; brand the toast styles; add reduced-motion-safe entrance for above-fold content so SEO-critical text isn't JS-gated.

**Bottom line:** the brand layer is presentation-ready; the system layer is one focused day of work away from being maintainable by anyone other than its author. Items 1–2 are the ones I'd do before merging `redesign/v2` to `main`.
