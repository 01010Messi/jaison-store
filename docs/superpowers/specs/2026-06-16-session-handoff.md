# Session Handoff — June 16 2026

**Branch:** `redesign/v2` (pushed, not deployed — never deploy)  
**Repo:** https://github.com/01010Messi/jaison-store.git  
**SEO Health Score:** 58/100 (from full audit in `SEO-AUDIT.md`)

---

## Completed This Session (Morning)

| Task | Files | Status |
|---|---|---|
| Blog expansion — all 10 posts to 1,500+ words | `src/data/blog.ts` | ✅ done |
| `dateModified` field added to `BlogPost` interface + all 10 posts | `src/data/blog.ts` | ✅ done |
| `dateModified` + `wordCount` in `ArticleJsonLd` schema | `src/components/seo/JsonLd.tsx` | ✅ done |
| Shop `layout.tsx` with metadata | `src/app/(storefront)/shop/layout.tsx` | ✅ already existed |

---

## Completed This Session (Afternoon)

### Task A — `inLanguage: "en-IN"` in ArticleJsonLd

**File:** `src/components/seo/JsonLd.tsx` line 230

**Why:**  
The Article schema was missing the `inLanguage` field. AI systems (Google AI Overviews, ChatGPT, Perplexity) use this to understand the content's locale. For Indian-English content, setting `"en-IN"` improves discoverability in India-specific AI-generated answer surfaces. It also aligns with GEO best practices for non-US brands.

**Fix:**  
Added `inLanguage: "en-IN"` to the Article schema object, alongside the already-present `dateModified` and `wordCount` fields.

**Result expected:**  
Search engines and AI crawlers correctly classify all 10 blog posts as Indian-English content. No visual change to the site.

---

### Task C — Remove background from "Shop the Ingredients" section

**File:** `src/app/(storefront)/blog/[slug]/page.tsx` line 273

**Why:**  
The parchment-tinted rounded container (`bg-parchment/40 rounded-xl`) made the section look like a floating card isolated from the article. The desired effect is for the product cards to flow naturally as part of the page, visually consistent with the "Keep Reading" section directly below it.

**Fix:**  
Replaced `mt-14 -mx-4 sm:-mx-6 px-6 sm:px-8 py-10 rounded-xl bg-parchment/40` with `mt-14 pt-10 border-t border-border` — the same hairline separator pattern used by "Keep Reading".

**Result expected:**  
Section merges with the article body. Product cards retain their individual border + shadow-warm hover. Visual rhythm matches the rest of the page.

---

### Task B — "Shop the Ingredients" CTA on Blog Posts

**File:** `src/app/(storefront)/blog/[slug]/page.tsx` lines 273–320

**Why:**  
All 10 blog posts have a `relatedProducts: string[]` array pointing to product slugs, but the old section was a compact thumbnail row labeled "Products Mentioned in This Article." It had:
- 64px thumbnails (too small for engagement)
- Horizontal list layout with no visual weight
- No CTA framing

Internal blog-to-product links pass SEO authority and reduce bounce rate. A weak CTA means users read 1,500 words about Bhringraj and then leave without discovering the product.

**Fix:**  
Replaced the thumbnail row with a visually distinct "Shop the Ingredients" CTA section:
- Parchment-tinted (`bg-parchment/40`) background strip that visually separates the CTA from article body
- Cormorant Garamond heading ("Shop the Ingredients") + DM Sans subtitle
- Aspect-square product cards with full-bleed image, 5x scale zoom on hover
- Product name (bark, terracotta on hover), price + weight in `text-bark/60`, `aria-hidden` directional arrow
- Border lifts to `gold/60`, `shadow-warm` elevation on hover
- Radius: `rounded-xl` on container + cards (design system compliant)
- No hardcoded hex, no em dashes, all muted text at ≥ `/60` on cream

**Result expected:**  
Every blog post now shows 2–3 product cards directly tied to its content. Users who finish reading have a path to the shop without navigating away. Internal PageRank flows from blog content to product pages.

---

## Remaining Dev Work (Priority Order)

### High Priority

1. **PageSpeed Mobile audit**  
   Run Lighthouse against `localhost:3000` on mobile preset. Target: LCP < 2.5s, CLS < 0.1.  
   Likely bottlenecks: hero video autoplay, blog images without explicit sizes, unoptimized Cloudinary URLs.  
   File: no single file — likely `globals.css` video autoplay, `Image` component sizes, Cloudinary fetch format.

2. **`openingHoursSpecification` + `priceRange` in `LocalBusinessJsonLd`**  
   File: `src/components/seo/JsonLd.tsx` — add structured hours + `priceRange: "₹150 – ₹999"` to the schema.  
   15-minute task. Improves local SEO for Nashik + Maharashtra queries.

3. **`/find-your-ritual` skin quiz page**  
   ⚠️ USER FLAGGED: do not start this task without explicit authorization in a new session.  
   The page 404s in production but is in the sitemap. Needs a 3-4 question skin quiz ending with product recommendation + email capture wired to `/api/newsletter`.

### Medium Priority

4. **Delivery/Shipping admin page**  
   Admin page for Shiprocket order tracking, label printing.  
   Files: `src/app/admin/` (new route), Shiprocket API already wired in `src/lib/shipping.ts`.

5. **Order detail page**  
   Single-order view with timeline, payment info, shipping status.  
   Files: `src/app/(storefront)/account/orders/[id]/page.tsx` (new route).

6. **Email — shipping update notifications**  
   Order confirmation email exists. Need shipping-dispatched + delivery emails.  
   Files: `src/lib/email.ts`, `src/app/api/admin/orders/route.ts`.

### Owner-Content Required (blocked)

- Founder name / origin story / photo → About page
- AYUSH / GMP license number → Trust signals
- Before/after UGC photos
- PDF content for lead magnet ("Ayurvedic Skin Reset Guide")
- Ingredient sourcing specifics (farm/region per herb)

### After Real Reviews Exist

- `aggregateRating` in `ProductJsonLd` — do NOT fabricate ratings

---

## Key Files

| Purpose | File |
|---|---|
| All blog data (posts, interface) | `src/data/blog.ts` |
| All JSON-LD schema components | `src/components/seo/JsonLd.tsx` |
| Blog post detail page | `src/app/(storefront)/blog/[slug]/page.tsx` |
| Blog listing | `src/app/(storefront)/blog/BlogContent.tsx` |
| Shop page layout | `src/app/(storefront)/shop/layout.tsx` |
| SEO audit findings | `SEO-AUDIT.md` |
| Design tokens reference | `DESIGN.md` |
| Full audit tracker | `AUDIT-ACTIONS.md` |

---

## Design System Quick Reference

- **Colors:** Cream `#FEFAE0`, Parchment `#EFE4C5`, Terracotta `#834316`, Sage `#606C38`, Bark `#1A3C34`, Gold `#B89968`
- **Never hardcode hex** — use token classes (`bg-bark`, `text-terracotta`) or `var(--color-*)` in inline styles
- **Fonts:** `font-heading` (Cormorant Garamond), `font-body` (DM Sans), `font-accent` (Inter)
- **Radius:** `rounded-full` for interactive pills/buttons, `rounded-xl` for cards/images, `rounded-lg` for form fields
- **Muted text:** ≥ `/60` opacity on cream/parchment, ≥ `/70` on bark
- **Shadows:** `shadow-warm` / `shadow-warm-lg` / `shadow-warm-xl` — never `shadow-md` or `shadow-lg`

---

## Dev Rules (never break these)

- **Never deploy** — all work ends at `git commit + git push` to `redesign/v2`
- **No `vercel --prod`**, no `vercel deploy`, no deploy commands of any kind
- Clear `.next` cache after any `globals.css` edit: `kill $(lsof -ti:3000) && rm -rf .next && npm run dev`
- Never put `<style>` tags inside `"use client"` components (causes hydration errors)
- Run `npx tsc --noEmit` after every TypeScript change — never skip

---

## Copy-Paste Prompt for Next Session

```
Working on: jaison-store-v2 (Ayurvedic e-commerce, Next.js 14 App Router, TypeScript, Tailwind CSS)
Branch: redesign/v2 — NEVER deploy, all work ends at git commit + push

CONSTRAINT: No vercel deploy, no vercel --prod, no deploy of any kind.

SKILLS TO USE:
- Use marketing-skills:ai-seo for any SEO work (GEO / AI discoverability, schema, content structure)
- Use frontend-design:* for any UI/component work (design tokens, component patterns)
- Use impeccable:impeccable for design quality enforcement (run load-context.mjs first)
- Use andrej-karpathy-skills:karpathy-guidelines for code quality (surgical changes, no over-engineering)
- Use superpowers:brainstorming BEFORE implementing anything new — design first, code second

Context docs to read first:
- docs/superpowers/specs/2026-06-16-session-handoff.md — full handoff with what's done and what's next
- SEO-AUDIT.md — full SEO audit findings (score 58/100)
- DESIGN.md — design tokens and rules (impeccable: load via .claude/skills/impeccable/scripts/load-context.mjs)
- AUDIT-ACTIONS.md — full audit tracker

Today's priority tasks (pick up from top):

1. PAGESPEED MOBILE AUDIT
   Run Lighthouse in mobile mode against localhost:3000. Target: LCP < 2.5s, CLS < 0.1.
   Identify the top 3 bottlenecks and fix them. Likely candidates: hero video autoplay,
   blog images missing explicit sizes, Cloudinary images missing fetch_format=auto.

2. openingHoursSpecification IN LocalBusinessJsonLd
   File: src/components/seo/JsonLd.tsx
   In the LocalBusinessJsonLd function, add openingHoursSpecification (Mon-Sat 10am-6pm IST)
   and confirm priceRange: "₹150 - ₹999" is already present (check line ~302).

3. /find-your-ritual SKIN QUIZ PAGE
   ⚠️ Only start this if the user explicitly says to proceed.
   The page 404s in production but is in the sitemap.
   Build a 3-4 question skin quiz (skin type, concern, routine frequency) ending with
   product recommendation + email capture wired to POST /api/newsletter.
   Design: Parchment background, pill buttons in Bark, Cormorant heading "Find Your Ritual".

Run `npx tsc --noEmit` after any TypeScript changes. Never skip this check.
```
