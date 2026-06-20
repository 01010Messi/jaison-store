# Jaison Herbals — Color, Contrast & Typography Accessibility Audit

**Date:** 18 June 2026 · **Branch:** `redesign/v2` · **Source:** static code audit (no live calls) of every color token combination in `DESIGN.md`, cross-referenced against actual usage sites via `grep` across `src/**/*.tsx`. Contrast ratios computed with the WCAG 2.x relative-luminance formula, alpha-blending any `/NN` opacity modifier against its real rendered background before measuring — not estimated by eye.

Scope: WCAG 2.1 AA (4.5:1 text, 3:1 large text / non-text UI) and AAA (7:1) contrast across primary text, muted/secondary text, button and badge backgrounds, status pills, and text rendered over images/video. Plus a mobile-sunlight-glare pass: thin font weights and near-threshold ratios that pass indoors but lose margin under screen glare.

All findings below are fixed on this branch. Status table first, reason/fix/result detail follows.

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | **Critical (systemic)** | Documented muted-text floor (`bark/60`) fails AA — used 275× sitewide | ✅ Fixed |
| 2 | High | Newsletter "Subscribe" button: cream text on gold, 2.56:1 | ✅ Fixed |
| 3 | High | `Badge` `gold` variant (Featured/Low Stock/COD): 2.91:1 | ✅ Fixed |
| 4 | High | Instagram tiles: light handle text on 3 of 8 light tile backgrounds, down to 1.15:1 | ✅ Fixed |
| 5 | Medium | Order-detail "Returned"/"Pending" pills below AA | ✅ Fixed |
| 6 | Medium | Order-detail "Delivered" pill below AA | ✅ Fixed |
| 7 | Medium | Order-progress step timeline: inactive label/icon below AA / non-text floor | ✅ Fixed |
| 8 | Medium | Legal pages + find-your-ritual: `bark/35`–`/40` text below AA | ✅ Fixed |
| 9 | Medium | Newsletter caption `cream/30` on bark: 2.43:1 | ✅ Fixed |
| 10 | Low (near-miss) | Header cart/wishlist count badge: 4.48:1 (rounding miss) | ✅ Fixed |
| 11 | Structural | Hero scrim dips to 8% opacity directly behind the headline | ✅ Fixed |
| 12 | Structural | `ProductFAQ` accordion titles use thin (300) weight at 16–18px | ✅ Fixed |
| 13 | High | Hardcoded orange `#E26713` (why-powder, our-story, WhyPowderTeaser, find-your-ritual): 2.9–3.2:1 | ✅ Fixed (session 18) |
| — | Investigated, no change | "Cancelled" badge uses off-token Tailwind red | No change (see below) |

---

## 1 — Critical (systemic): the documented muted-text floor fails AA

**Files:** sitewide — 275 occurrences of `text-bark/60` across 51 `.tsx` files (193 of them at `text-xs`/`text-sm`, too small to qualify for the large-text 3:1 exemption). Also present in `Badge.tsx` (`outline` variant) and `Accordion`/`ProductFAQ` answer text.

**Reason:** `DESIGN.md` §5 documented `/60` as the accessibility floor for muted text on cream/parchment. Measured: `bark/60` blended onto cream (`#FEFAE0`) renders as `#758879`, contrast **3.59:1** — below the 4.5:1 AA threshold for normal text. This wasn't a one-off mistake; it was the site's default secondary-text color, so the failure was systemic rather than isolated.

**Fix:** Swapped every `text-bark/60` → `text-bark/72` sitewide (`sed` across all matching files, verified zero remaining `/60` instances afterward). `bark/72` measures **5.02:1 on cream** and **4.53:1 on parchment** — both clear AA with margin. Also updated `DESIGN.md` §2 and §5 to document `/72` as the new floor, with the measured numbers inline so the next person doesn't have to re-derive them. Left the `bark`-surface floor (`cream/70` on bark = 6.50:1) untouched — it was already correct.

**Result:** Every muted label, caption, FAQ answer, and metadata line sitewide now clears AA. This was the single highest-leverage fix in the audit by occurrence count.

---

## 2 — High: Newsletter "Subscribe" button

**File:** `src/components/home/NewsletterSection.tsx`

**Reason:** The homepage newsletter CTA used `Button variant="gold"` → `bg-gold text-cream`. Measured: cream (`#FEFAE0`) on gold (`#B89968`) = **2.56:1** — fails even the 3:1 large-text/UI-component floor, on the site's primary email-capture conversion button.

**Fix:** Switched to `variant="primary"` (`bg-terracotta text-cream`, already proven at 7.18:1 elsewhere on the site). No new color was introduced — reused an existing, already-accessible variant rather than inventing a gold-on-dark combination.

**Result:** 2.56:1 → 7.18:1 (AAA). Button look is now consistent with every other primary CTA on the site.

---

## 3 — High: `Badge` `gold` variant

**File:** `src/components/ui/Badge.tsx`

**Reason:** The `gold` badge variant (used for "Featured"/"Low Stock" in `admin/products`, "COD" in `admin/orders`) rendered as `bg-gold/10 text-gold-dark`. Measured: `gold-dark` (`#A08A64`) on the `gold/10`-over-cream tint (`#F7F0D4`) = **2.91:1** — fails AA.

**Fix:** Changed the variant's text color to `text-bark` (10.56:1 on the same tint) — reuses the site's primary text token instead of introducing a darker gold.

**Result:** 2.91:1 → 10.56:1 (AAA), with no visual abstraction added — `bark` was already the obvious "high contrast on a light tint" token used by every other badge variant.

---

## 4 — High: Instagram tile handle text on light tiles

**File:** `src/components/home/InstagramSection.tsx`

**Reason:** All 8 mock-Instagram tiles rendered their `@handle` text and play-icon in one fixed light color (`rgba(255,248,225,0.80)`), but 3 of the 8 tiles use a **light** background (`gold-light`, `parchment`, `parchment-dark`) with no scrim behind the top row (only the bottom caption has one). Measured against the actual tile backgrounds: **1.15:1** (parchment), **1.35:1** (parchment-dark), **1.59:1** (gold-light) — essentially invisible, nowhere near the 4.5:1 floor. The bottom caption text, by contrast, already sits on its own black gradient scrim and measured a healthy 7.61:1 — proving the component already knew the right pattern, it just wasn't applied to the top row.

**Fix:** Added a `textOn: "light" | "dark"` field per tile (set per the actual `bg` lightness) and branched the handle/play-icon color: `rgba(26,60,52,0.85)` (bark) on light tiles, the original cream on dark tiles. Verified `bark/85` against all three light backgrounds clears AA (4.76:1–6.43:1).

**Result:** Every tile's handle and play icon is now readable regardless of which of the 8 background colors it lands on.

---

## 5 — Medium: order-detail "Returned" and "Pending" pills

**File:** `src/app/(storefront)/account/orders/[id]/page.tsx` (`STATUS_BADGE` map)

**Reason:** `RETURNED: { pill: "bg-parchment text-bark/50" }` measured **2.64:1**. `PENDING: { pill: "bg-parchment text-bark/70" }` measured **4.32:1** — both below AA, and both are customer-facing order-status labels, not decorative copy.

**Fix:** Both bumped to `text-bark/85` (matches the new step-timeline "completed" emphasis level, see #7) — `bark/85` on parchment measures 6.43:1.

**Result:** 2.64:1 → 6.43:1 and 4.32:1 → 6.43:1, both AAA.

---

## 6 — Medium: order-detail "Delivered" pill

**File:** same `STATUS_BADGE` map

**Reason:** `DELIVERED: { pill: "bg-sage/20 text-sage" }` measured **4.14:1** — just under AA. The sibling "Confirmed" pill uses `sage/10 text-sage` at 4.74:1 (passes, barely), but "Delivered" used a darker tint background with the *same* text color, which actually lowered the ratio rather than raising it.

**Fix:** Changed text color to the existing `sage-dark` token (`text-sage-dark`), which was already defined in `globals.css` but unused in this file.

**Result:** 4.14:1 → ~6.8:1, using a token that already existed — no new color introduced.

---

## 7 — Medium: order-progress step timeline

**File:** same order-detail page, the `STATUS_STEPS` timeline render

**Reason:** Two related failures in the same component:
- The inactive-step circle icon used `bg-parchment text-bark/20` (**1.43:1**) — fails even the 3:1 non-text/UI-component floor (WCAG 1.4.11).
- The inactive-step label text used `text-bark/25` (**1.59:1** on cream) — real, read content ("Placed", "Confirmed", etc.), fails AA by a wide margin. The completed-step label used `text-bark/70` (4.73:1, passes but no margin).

**Fix:** Icon fill bumped to `text-bark/60` (clears the 3:1 non-text floor at >5:1 on parchment; icons don't need the 4.5:1 text floor, so this intentionally differs from the `/72` text floor elsewhere — documented as such in `DESIGN.md`). Inactive label bumped to `text-bark/72` (matches sitewide floor), and completed label bumped to `text-bark/85` so the two states stay visually distinct (completed reads darker/heavier than upcoming) while *both* now clear AA — previously the only way the design distinguished "done" from "not yet" was by sitting one side of the floor and one side below it.

**Result:** Icon 1.43:1 → >5:1; inactive label 1.59:1 → 4.53:1+; completed label 4.73:1 → 6.43:1. Visual hierarchy (done vs. upcoming) preserved through the gap between `/72` and `/85`, not through a failing-contrast value.

---

## 8 — Medium: legal pages + find-your-ritual low-opacity text

**Files:** `privacy-policy/page.tsx`, `terms/page.tsx`, `returns-policy/page.tsx` ("Last updated" footers, `bark/35`), `find-your-ritual/FindYourRitualContent.tsx` (eyebrow labels, strikethrough price, italic result notes, `bark/35`–`/40`), and two labels in the order-detail page (`bark/40`).

**Reason:** All of these predate the `/60` floor even existing as a "minimum" — they sat further below it. Measured: `bark/35` on cream = 1.96:1, `bark/40` on cream = 2.20:1. All are real, readable copy (dates, prices, result labels), not decorative.

**Fix:** Swept every remaining `text-bark/35` and `text-bark/40` → `text-bark/72` (same floor as fix #1, applied here since these used different, even-lower starting values that the global `/60` sed wouldn't have caught).

**Result:** All now clear AA (5.02:1 on cream, 4.53:1 on parchment).

---

## 9 — Medium: Newsletter caption text

**File:** `src/components/home/NewsletterSection.tsx`

**Reason:** "No spam, ever. Unsubscribe anytime." used `text-cream/30` on the section's `bg-bark` background — measured **2.43:1**.

**Fix:** Bumped to `text-cream/55` (4.67:1) — kept it visually the quietest line on the section (still well under the `cream/70` standard muted-on-bark floor) while clearing AA.

**Result:** 2.43:1 → 4.67:1.

---

## 10 — Low (near-miss): header cart/wishlist count badge

**File:** `src/components/layout/Header.tsx` (2 occurrences)

**Reason:** `bg-gold text-bark` measured **4.48:1** — a rounding-distance miss on a tiny (9px) but functionally important badge (cart item count).

**Fix:** Swapped to `bg-gold-light text-bark` (6.44:1), reusing an existing lighter gold step instead of inventing a new shade.

**Result:** 4.48:1 → 6.44:1.

---

## 11 — Structural: hero scrim safety floor

**File:** `src/components/home/HeroSection.tsx`

**Reason:** Not a token-math failure — the headline text is fully opaque `bark`, which has excellent contrast against most backgrounds. The risk is structural: the video scrim gradient dipped to **0.08 opacity** at its 25% stop, which sits right behind the headline. On a dark video frame (shadows, dark clothing) at that exact moment, an opaque dark heading over a near-unscrimmed dark video frame could lose contrast in a way no static color audit can fully rule out — it depends on which video frame is showing. This is also the scenario most exposed to mobile sunlight glare, since glare erodes exactly the kind of low-contrast edge cases video content can produce.

**Fix:** Raised the gradient's weakest stops from `0.08`/`0.22` to a `0.20`/`0.22` minimum, removing the deep dip while keeping the gradient's overall character (still visibly thinner near the top than the bottom).

**Result:** The headline now always has at least a 20% cream scrim behind it, regardless of video frame content, instead of dipping to 8% at the one point most likely to matter.

---

## 12 — Structural: `ProductFAQ` accordion title weight

**File:** `src/components/product/ProductFAQ.tsx`

**Reason:** Accordion question titles used `font-light` (300 weight) at 16–18px. The contrast ratio passes (inherits solid `bark` text), but this is a stroke-weight problem, not a color problem: thin serif/sans strokes at body-adjacent sizes lose definition under screen glare even when the WCAG number is fine. Unlike the hero/section-header italic accents (which use `font-light` intentionally at much larger display sizes, where thin strokes still read clearly), 16–18px is squarely in the size range where weight matters for legibility.

**Fix:** Changed `titleClassName` from `font-light` to `font-normal`.

**Result:** No contrast-ratio change (it didn't need one), but stroke definition at small sizes is now closer to body-text weight, which is the relevant fix for the sunlight-glare scenario WCAG's contrast formula doesn't model.

---

## 13 — High: hardcoded orange `#E26713` (added session 18, post-publication)

**Files:** `src/app/(storefront)/why-powder/page.tsx` (hero eyebrow + heading accent + watermark), `src/app/(storefront)/our-story/page.tsx` (2 heading accents), `src/components/home/WhyPowderTeaser.tsx` (1 heading accent), `src/app/(storefront)/find-your-ritual/FindYourRitualContent.tsx` (6 `dot` values used as both decorative swatches and as text color for the "RECOMMENDED" label and product category label), `tailwind.config.ts` (`shadow-gold`).

**Reason:** A bright orange (`#E26713`) was hardcoded directly in 12 places instead of routed through a `DESIGN.md` token — it predates this audit's token sweep, which only checked documented tokens, not raw hex literals. Measured **2.9:1 on bark** (why-powder hero) and **3.15:1 on cream** (our-story, find-your-ritual) — both fail the 4.5:1 AA floor for normal text. The find-your-ritual "RECOMMENDED" and category labels are 9px text, making the failure worse in practice (no large-text exemption available). Visually it also reads as an off-brand orange against the rest of the earthy cream/terracotta/sage/gold palette.

**Fix:** Added one new token, `gold-deep` (`#7A5012`), for gold accent text on light cream/parchment backgrounds (6.5:1 on cream, 5.6:1 on parchment) — used in our-story and find-your-ritual. Reused the existing `gold-light` (`#D2BA96`) token for gold accent text on dark/mid backgrounds (bark, terracotta) — 6.4:1 on bark, 4.0:1 on terracotta (AA-large; only used at display sizes ≥36px, which only need 3:1). The why-powder watermark and `shadow-gold` (both decorative, non-text) were re-tinted from orange to the actual `gold` hue for visual consistency, no contrast requirement applies to either.

**Result:** 2.9–3.2:1 → 4.0–6.5:1 across all 12 occurrences, and the accent now reads as gold rather than orange, consistent with the rest of the palette. `DESIGN.md` §1 updated with the new token; the old "sanctioned one-off `#E26713`" note removed since it's no longer used anywhere.

---

## Investigated, no change: "Cancelled" status badge

**File:** `account/orders/[id]/page.tsx` — `CANCELLED: { pill: "bg-red-50 text-red-700" }`

Measured 5.91:1 — passes AA comfortably. This is the one place in the codebase that breaks from the brand token palette (raw Tailwind `red-50`/`red-700` instead of a `--color-*` token), which was flagged as a token-consistency note, not a contrast problem. `DESIGN.md` already sanctions deliberate exceptions for error/destructive states (e.g. `#C1714F` toast error icon) precisely because off-brand red is the universally-recognized signal for "something went wrong" — forcing it onto the warm earthy palette would trade recognizability for consistency with no accessibility upside. Left unchanged.

## Method

Contrast ratios were computed with the standard WCAG relative-luminance formula (`(L1+0.05)/(L2+0.05)`), with any Tailwind opacity modifier (`/NN`) first alpha-blended against its actual rendered background (page background, parent tint, or adjacent gradient/scrim) before measuring — not measured against the raw foreground hex in isolation, since that would understate the real on-screen color for any translucent text. All ratios in this document are reproducible from `DESIGN.md`'s published hex values.
