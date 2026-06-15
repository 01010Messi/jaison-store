# Session Handoff — June 16 2026

**Branch:** `redesign/v2` (pushed, not deployed — never deploy)  
**Repo:** https://github.com/01010Messi/jaison-store.git  
**SEO Health Score:** 58/100 (from full audit in `SEO-AUDIT.md`)

---

## Completed This Session

| Task | Files | Status |
|---|---|---|
| Blog expansion — all 10 posts to 1,500+ words | `src/data/blog.ts` | ✅ done |
| `dateModified` field added to `BlogPost` interface + all 10 posts | `src/data/blog.ts` | ✅ done |
| `dateModified` + `wordCount` in `ArticleJsonLd` schema | `src/components/seo/JsonLd.tsx` | ✅ done |
| Shop `layout.tsx` with metadata | `src/app/(storefront)/shop/layout.tsx` | ✅ already existed |
| `claude-blog` plugin installed (v1.9.1) | `~/.claude/plugins/` | ✅ done |

### Blog word counts (all ✓ over 1,500)
| Post | Words |
|---|---|
| ubtan (glowing skin) | 1,611 |
| amla (hair growth) | 1,627 |
| multani mitti (face pack) | 1,688 |
| shikakai-reetha-amla (natural wash) | 1,727 |
| neem (acne / clear skin) | 1,668 |
| ayurvedic skincare routine | 1,724 |
| orange peel (face) | 1,625 |
| bhringraj (hair growth) | 1,655 |
| reetha (soapnut hair) | 1,893 |
| mehendi / henna (hair colour) | 2,155 |

Each post added: opening summary paragraph (40-60 words, AI-extractable), Key Takeaways blockquote with cited statistics, science section with named bioactive compounds, Ayurvedic dosha guide (Vata/Pitta/Kapha), Indian seasonal usage section, 5-question FAQ.

---

## Remaining Dev Work (Priority Order)

### High
1. **Internal linking — blog → product pages**  
   Each blog post mentions products but never links to them. Add a CTA card at the bottom of each blog post pointing to the relevant product page. File: `src/app/(storefront)/blog/[slug]/page.tsx`.  
   SEO value: internal links pass authority + reduce bounce rate.

2. **`inLanguage: "en-IN"` in ArticleJsonLd**  
   File: `src/components/seo/JsonLd.tsx` — add one field to the Article schema.  
   15-minute task.

3. **`/find-your-ritual` skin quiz — email hook**  
   The page exists but is a 404 in production (it's in the sitemap). It needs content + email capture wired to `/api/newsletter`. Use it as a lead magnet.

### Medium
4. **PageSpeed Mobile audit**  
   Run Lighthouse against localhost for mobile. Target LCP < 2.5s. Blog images and hero video are the likely bottlenecks.

5. **`openingHoursSpecification` in `LocalBusinessJsonLd`**  
   File: `src/components/seo/JsonLd.tsx` — add hours + `priceRange: "₹150 – ₹999"` to the schema.

6. **Google Search Console setup**  
   Submit `https://jaisonskincare.com/sitemap.xml` after redesign/v2 is deployed to production.

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
- **Muted text:** ≥ `/60` opacity on cream backgrounds, ≥ `/70` on bark backgrounds

---

## Dev Rules (never break these)

- **Never deploy** — all work ends at `git commit + git push` to `redesign/v2`
- **No `vercel --prod`**, no `vercel deploy`, no deploy commands of any kind
- Clear `.next` cache after any `globals.css` edit: `kill $(lsof -ti:3000) && rm -rf .next && npm run dev`
- Never put `<style>` tags inside `"use client"` components (causes hydration errors)

---

## Copy-Paste Prompt for Next Session

```
Working on: jaison-store-v2 (Ayurvedic e-commerce, Next.js 14 App Router, TypeScript, Tailwind CSS)
Branch: redesign/v2 — NEVER deploy, all work ends at git commit + push

CONSTRAINT: No vercel deploy, no vercel --prod, no deploy of any kind.

SKILLS TO USE:
- Use marketing-skills:ai-seo for any SEO work (GEO / AI discoverability, schema, content structure)
- Use claude-seo:* for technical SEO audits and structured data
- Use frontend-design:* for any UI/component work (design tokens, component patterns)
- Use superpowers:brainstorming BEFORE implementing anything new — design first, code second

Context docs to read first:
- docs/superpowers/specs/2026-06-16-session-handoff.md — full handoff with what's done and what's next
- SEO-AUDIT.md — full SEO audit findings (score 58/100)
- DESIGN.md — design tokens and rules
- AUDIT-ACTIONS.md — full audit tracker

Today's priority tasks (pick up from top):

1. BLOG → PRODUCT INTERNAL LINKS
   Each of the 10 blog posts in src/data/blog.ts has a `relatedProducts` array (e.g. ["reetha-powder", "shikakai-powder"]).
   Add a "Shop the ingredients" CTA section at the bottom of each blog post in src/app/(storefront)/blog/[slug]/page.tsx.
   The section should show product cards (name, image, price) that link to /shop/[product-slug].
   Match the Ayurvedic earthy design system — Bark/Terracotta colors, Cormorant Garamond headings, rounded-xl cards.

2. inLanguage FIELD IN ArticleJsonLd
   File: src/components/seo/JsonLd.tsx
   In the ArticleJsonLd function, add `inLanguage: "en-IN"` to the schema object alongside dateModified and wordCount.

3. /find-your-ritual SKIN QUIZ PAGE
   The page currently 404s in production but is in the sitemap.
   Build a simple skin quiz (3-4 questions: skin type, concern, routine frequency) that ends with a product recommendation + email capture.
   Wire email capture to the existing POST /api/newsletter endpoint.
   Design language: Parchment background, pill buttons in Bark, Cormorant heading "Find Your Ritual".

Run `npx tsc --noEmit` after any TypeScript changes. Never skip this check.
```
