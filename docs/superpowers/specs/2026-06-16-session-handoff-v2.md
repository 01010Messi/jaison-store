# Session Handoff — June 16 2026 (Afternoon / Session 4)

**Branch:** `redesign/v2` (pushed to GitHub, NOT deployed — never deploy)
**Repo:** https://github.com/01010Messi/jaison-store.git
**Latest commit:** `d5f2275` — chore: remove Rose Petal and Bhringraj

---

## Completed This Session (June 16 — Sessions 3–4)

### Perf: PageSpeed Mobile 51 → 83

| Fix | Files | Result |
|---|---|---|
| Hero video: `poster` + `preload="metadata"` | `src/components/home/HeroSection.tsx` | LCP 26.8s → 4.7s |
| Hero poster (28KB WebP extracted from video) | `public/images/hero-poster.webp` | New file |
| `fetchpriority="high"` preload for poster | `src/app/(storefront)/page.tsx` | lcp-discovery score 1 |
| ProductCard: `<img>` → `<Image fill>` + `sizes` | `src/components/product/ProductCard.tsx` | Image waste 3,203KB → 20KB |
| Header logo: add `sizes` prop | `src/components/layout/Header.tsx` | Logo served at correct size |
| sitemap.ts: remove unused `categories` import | `src/app/sitemap.ts` | Build lint fix |

**Score deltas:** Performance 51 → 83 | LCP 26.8s → 4.7s | TBT 1,250ms → 0ms | CLS 0 (unchanged)

LCP at 4.7s is on simulated slow 4G (Lighthouse mobile preset). Real 4G India would be ~1.5–2s. Remaining bottleneck: render-blocking CSS from Next.js chunk system (~540ms, framework-internal — not easily fixable).

---

### SEO: LocalBusinessJsonLd schema

**File:** `src/components/seo/JsonLd.tsx`

- `openingHoursSpecification` added: Mon–Sat, 10:00–18:00
- `priceRange` updated: `"₹150 - ₹999"` (was `₹250 - ₹550`)

---

### Bug Fix: How to Use tab

**Files:** `src/components/ui/StepCard.tsx`, `src/components/product/ProductStory.tsx`

**Bug 1 — "OI" instead of "01":** Cormorant Garamond renders oldstyle figures (`0`→`O`, `1`→`I`) at 28–44px. Fix: `fontVariantNumeric: "lining-nums"` on the number `<span>`.

**Bug 2 — Vertical stacking on combos:** Combo products have `howToUse` text split by `\n\n` into N blocks of 1 step each, each block rendered in its own grid. Fix: when no block has a named heading, `flatMap` all steps into one flat grid with global sequential numbering. Products with headed sections (Aamla "For Hair" / "For Skin") preserve grouped layout.

---

### Product Cleanup: Remove Rose Petal + Bhringraj

**Files:** `FeaturedProducts.tsx`, `Header.tsx`, `ProductCard.tsx`

Both were never in `products.ts` as standalone products but were referenced as dead slugs in 3 UI files. All references removed from nav dropdowns, featured grid filter arrays, and ProductCard color/botanical/category maps.

Note: Bhringraj blog post (`/blog/bhringraj-powder-for-hair-growth`) kept — it's informational content, not a product page.

---

## Remaining Dev Work (Priority Order)

### 1. `/find-your-ritual` skin quiz page
**Status:** Page 404s in production; in sitemap. ⚠️ REQUIRES EXPLICIT USER AUTHORIZATION to start.

What's needed:
- 3–4 question skin quiz (skin type, concern, routine frequency)
- Product recommendation based on answers
- Email capture wired to `POST /api/newsletter`
- Design: cream background, pill buttons in Bark, Cormorant heading "Find Your Ritual"
- No backend route needed (client-side quiz logic + newsletter API already exists)

Files to create:
- `src/app/(storefront)/find-your-ritual/page.tsx`

---

### 2. Delivery / Shipping admin page
Shiprocket API already wired in `src/lib/shipping.ts`. Need admin UI for:
- Order list with Shiprocket tracking status
- Label generation
- AWB number display

Files: new route at `src/app/admin/shipping/page.tsx`

---

### 3. Order detail page (customer-facing)
Single-order view with timeline, payment + shipping info.
File: `src/app/(storefront)/account/orders/[id]/page.tsx` (new route)

---

### 4. Email — shipping update notifications
Order confirmation email exists (`src/lib/email.ts`). Need:
- Shipping dispatched email (triggered when admin updates order to SHIPPED)
- Delivery confirmation email

Files: `src/lib/email.ts`, `src/app/api/admin/orders/route.ts`

---

## Owner-Content Required (Blocked)

These cannot be implemented without content from the business owner:

- Founder name / origin story / photo → `About` page + homepage
- AYUSH / GMP / manufacturing license number → footer trust signal
- Before/after UGC customer photos (10–15)
- PDF for lead magnet ("Ayurvedic Skin Reset Guide" — placeholder copy in popup)
- Ingredient sourcing specifics (farm/region per herb)

---

## Key Technical Facts

### Product slugs in `src/data/products.ts`
```
ubtan-powder, aamla-powder, neem-powder, shikakai-powder,
multani-mitti, orange-peel-powder, mehendi-powder, reetha-powder,
nagarmotha-powder, hair-care-trio, premium-hair-care-combo,
scalp-care-combo, jaison-special-combo
```
Rose Petal and Bhringraj are NOT in products.ts (removed this session).

### How to Use tab parsing rules
- Steps separated by `\n` (no blank line) → 1 block, N steps → flat grid
- Steps separated by `\n\n` with named sections ("For Hair:\n...") → M blocks with headings → grouped grid per block  
- Steps separated by `\n\n` without named sections (combos) → M blocks, no headings → flatten into one flat grid with global numbering

### SEO schema components (`src/components/seo/JsonLd.tsx`)
- `OrganizationJsonLd` — in root `layout.tsx`
- `WebsiteJsonLd` — in root `layout.tsx`
- `LocalBusinessJsonLd` — in root `layout.tsx`; has `openingHoursSpecification` + `priceRange: "₹150 - ₹999"`
- `ProductJsonLd` — on product detail pages
- `ArticleJsonLd` — on blog post pages; includes `inLanguage: "en-IN"`, `dateModified`, `wordCount`
- `BreadcrumbJsonLd` — on product + blog pages
- `FAQJsonLd` — on `/faq` page + product pages

### Performance baseline (production build, Lighthouse mobile simulate)
| Metric | Before (session start) | After (this session) |
|---|---|---|
| Performance score | 51 | 83 |
| LCP | 26.8s | 4.7s |
| TBT | 1,250ms | 0ms |
| CLS | 0 | 0 |
| FCP | 1.2s | 1.4s |
| Image waste | 3,203 KB | ~20 KB |

---

## Rules for Next Session

1. **NEVER deploy** — all work ends at `git commit + push origin redesign/v2`
2. **NEVER hardcode hex** — use token classes or `var(--color-*)`
3. `rounded-full` interactive pills, `rounded-xl` cards/images, `rounded-lg` form fields
4. Muted text: ≥ `/60` on cream, ≥ `/70` on bark
5. Run `npx tsc --noEmit` after any TypeScript changes
6. Do NOT start `/find-your-ritual` without explicit user authorization
7. Do NOT add `aggregateRating` to ProductJsonLd — no real reviews exist yet
