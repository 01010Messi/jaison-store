# Session Handoff — June 16 2026 (Session 6)

**Branch:** `redesign/v2` (pushed to GitHub, NOT deployed — never deploy)  
**Repo:** https://github.com/01010Messi/jaison-store.git  
**Latest commit:** `4695230` — fix(seo): apply page audit fixes for FAQ and product pages

---

## Completed This Session (Session 6)

### 1. Blog Internal Links — 2nd Pass

**File:** `src/data/blog.ts`  
**Commit:** `56435e7`

Each of the 5 targeted posts now has 2 internal links (up from 1). Pairings added:

| Post | Added Link | Context |
|------|-----------|---------|
| Ubtan | → Multani Mitti | Deep-cleanse before application tip in "Tips for Maximum Results" |
| Amla | → Bhringraj | Scalp circulation note appended to Amla Hair Mask section |
| Neem | → Amla | Scalp care note after the twice-weekly routine block |
| Bhringraj | → Natural Hair Wash | Changed "Shikakai-Reetha mix" to linked text in hair mask wash step |
| Orange Peel | → Multani Mitti | Kapha skin type section already mentioned the combo — made it a link |

Blog internal link count: 0 (pre-session 5) → 10 first-pass links → 15 total links now.

---

### 2. SEO Page Audit — FAQ & Product Pages

**Skill used:** `/seo-page`  
**Commit:** `4695230`  
**Files changed:** `src/data/faqs.ts` (new), `src/app/(storefront)/faq/layout.tsx`, `src/app/(storefront)/faq/page.tsx`, `src/app/(storefront)/shop/[slug]/page.tsx`, `src/components/seo/JsonLd.tsx`

#### FAQ Page Fixes

| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| Duplicate `FAQPage` schema (layout + page both rendered it) | Critical | Extracted `faqGroups` to `src/data/faqs.ts`; removed inline schema from page.tsx; layout now holds single authoritative schema |
| Layout schema had 10 simplified questions; page had 32 real ones | High | Layout now imports `faqGroups` and uses all 32 questions |
| Title redundant: "FAQ — Frequently Asked Questions" | High | → "Frequently Asked Questions \| Jaison Herbals" |
| No `openGraph` block | High | Added with `og-default.jpg`, title, description, URL |
| No `twitter` block | High | Added `summary_large_image` card |
| FAQ group labels rendered as `<p>` (no heading hierarchy below H1) | Medium | Changed to `<h2>` with matching visual styling |

#### Product Page Fixes

| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| OG image URLs were relative (`/images/...`) — OG previews broken on all social platforms | Critical | Absolute URLs with `${BASE_URL}${img}` |
| Twitter image URL also relative | Critical | Fixed to `${BASE_URL}${product.image}` |
| Meta description 166–210 chars (limit 160) | High | Truncate with `rawDescription.slice(0, 157) + "..."` |
| All OG images had identical `alt: product.name` | Medium | First image now: `"${product.name} — natural ${category} powder by Jaison Herbals"` |
| `material: product.ingredients` (Schema.org misuse — "material" is for cotton/silk) | Medium | → `additionalProperty: { "@type": "PropertyValue", name: "Ingredients", value: ... }` |

**Note on `ProductFAQJsonLd`:** Uses `@type: FAQPage` which Google retired for rich results in May 2026. **No fix needed** — kept as AI-citation signal per skill guidance.

---

## Remaining Dev Work (Priority Order)

### 1. `/find-your-ritual` skin quiz page
**Status:** Page 404s in production; in sitemap. ⚠️ **REQUIRES EXPLICIT USER AUTHORIZATION to start.**

What's needed:
- 3–4 question skin quiz (skin type, concern, routine frequency)
- Product recommendation based on answers
- Email capture wired to `POST /api/newsletter`
- Design: cream background, pill buttons in Bark, Cormorant heading "Find Your Ritual"
- No backend route needed (client-side quiz logic + newsletter API already exists)

File to create: `src/app/(storefront)/find-your-ritual/page.tsx`

---

### 2. Delivery / Shipping admin page
Shiprocket API wired in `src/lib/shipping.ts`. Need admin UI for order list with tracking status, label generation, AWB display.

File: new route at `src/app/admin/shipping/page.tsx`

**Skill to use:** None needed — standard Next.js + Shiprocket API integration

---

### 3. Email — shipping update notifications
Order confirmation email exists (`src/lib/email.ts`). Need:
- "Order dispatched" email (triggered when admin marks as SHIPPED)
- "Out for delivery" email (optional)

Files: `src/lib/email.ts`, `src/app/api/admin/orders/route.ts`

---

### 4. SEO — continue page-by-page audits
Session 6 covered `/faq` and `/shop/[slug]`. Remaining pages to audit in priority order:

| Page | URL | Skill |
|------|-----|-------|
| Home | `/` | `/seo-page` |
| Shop listing | `/shop` | `/seo-page` |
| Blog posts | `/blog/[slug]` (10 posts) | `/seo-page` (run on 2–3 representative posts) |
| About | `/about` | `/seo-page` |
| Full technical audit | site-wide | `/seo-technical` |

**Skill to invoke:** `claude-seo:seo-page` (same as session 6)

Run the skill, read the report, apply fixes in same session.

---

### 5. Blog image — proper Bhringraj photo
Current placeholder is `neem-styled.webp`. A dedicated Bhringraj herb image is needed.

**Blocked on owner.** When provided: save to `public/images/blog/bhringraj-styled.webp` and update `src/data/blog.ts` Bhringraj post `image` field.

---

## Owner-Content Required (Blocked)

- Founder name / origin story / photo → About page + homepage
- AYUSH / GMP / manufacturing license number → footer trust signal
- Before/after UGC customer photos (10–15)
- PDF for lead magnet ("Ayurvedic Skin Reset Guide" — placeholder text in popup)
- Ingredient sourcing specifics (farm/region per herb)
- Proper Bhringraj herb photograph

---

## Key Technical Facts

### Product slugs active in `src/data/products.ts`
```
ubtan-powder, aamla-powder, neem-powder, shikakai-powder,
multani-mitti, orange-peel-powder, mehendi-powder, reetha-powder,
nagarmotha-powder, hair-care-trio, premium-hair-care-combo,
scalp-care-combo, jaison-special-combo
```
Rose Petal and Bhringraj are NOT products (removed June 16). Bhringraj blog post kept (informational).

### Blog posts in `src/data/blog.ts` (10 posts)
```
how-to-use-ubtan-for-glowing-skin         (Skin Care)
amla-powder-benefits-for-hair-growth      (Hair Care)
multani-mitti-face-pack-recipes           (Skin Care)
natural-hair-wash-shikakai-reetha-amla    (Hair Care)
neem-powder-for-acne-clear-skin           (Skin Care)
ayurvedic-skincare-routine-for-beginners  (Skin Care)
orange-peel-powder-benefits-for-face      (Skin Care)
bhringraj-powder-for-hair-growth          (Hair Care)
reetha-powder-for-natural-hair-wash       (Hair Care)
mehendi-powder-for-hair-colour            (Hair Care)
```

Internal link status: each post now has 2 internal links (target is 3).

### FAQ data location (updated this session)
- Source of truth: `src/data/faqs.ts` — 7 groups, 32 questions
- Imported by: `src/app/(storefront)/faq/layout.tsx` (schema) and `src/app/(storefront)/faq/page.tsx` (rendering)
- Do NOT edit the old `const faqs = [...]` — it no longer exists

### SEO schema components (`src/components/seo/JsonLd.tsx`)
- `OrganizationJsonLd`, `WebsiteJsonLd`, `LocalBusinessJsonLd` — root `layout.tsx`
- `ProductJsonLd` — product detail pages (uses `additionalProperty` for ingredients as of session 6)
- `ProductFAQJsonLd` — product detail pages (FAQPage type — kept for AI citation, not rich results)
- `ArticleJsonLd` — blog post pages
- `BreadcrumbJsonLd` — product + blog + FAQ pages
- `FAQPageJsonLd` — `/faq` layout (32 questions, sourced from `src/data/faqs.ts`)

### renderMarkdown capabilities (`src/app/(storefront)/blog/[slug]/page.tsx`)
Handles: `## ` h2, `### ` h3, `- ` / `* ` bullet lists, `|` table rows, `> ` blockquotes (parchment callout), `**bold**`, `*italic*`, `[text](url)` inline links, empty lines for paragraph breaks.

### Performance baseline (Lighthouse mobile, after session 4)
| Metric | Score |
|---|---|
| Performance | 83 |
| LCP | 4.7s |
| TBT | 0ms |
| CLS | 0 |

---

## Rules for Next Session

1. **NEVER deploy** — all work ends at `git commit + push origin redesign/v2`
2. **NEVER hardcode hex** — use token classes or `var(--color-*)`
3. `rounded-full` interactive pills, `rounded-xl` cards/images, `rounded-lg` form fields
4. Muted text: ≥ `/60` on cream, ≥ `/70` on bark
5. Run `npx tsc --noEmit` after any TypeScript changes
6. Do NOT start `/find-your-ritual` without explicit user authorization
7. Do NOT add `aggregateRating` to ProductJsonLd — no real reviews exist yet
8. Do NOT add Rose Petal or Bhringraj to any product UI (removed from catalogue)
9. FAQ data lives in `src/data/faqs.ts` — do not re-add inline arrays to page.tsx or layout.tsx

---

## Opening Prompt for Next Session

```
We're on branch redesign/v2 of jaison-store-v2 (Ayurvedic e-commerce, Next.js 14 App Router).

Read docs/superpowers/specs/2026-06-16-session-handoff-v4.md for full context before starting anything.

Latest commit: 4695230. TypeScript is clean.

Rules (hard constraints):
- NEVER deploy (no vercel --prod, no vercel deploy)
- NEVER hardcode hex — use token classes or var(--color-*)
- rounded-full = interactive pills, rounded-xl = cards/images, rounded-lg = form fields
- Run npx tsc --noEmit after any TypeScript changes
- All work ends at git commit + push origin redesign/v2
- Do NOT add Rose Petal or Bhringraj to any product UI
- Do NOT add aggregateRating to ProductJsonLd
- Do NOT start /find-your-ritual without explicit authorization from me
- FAQ data lives in src/data/faqs.ts — do not re-add inline arrays

[your task here]
```

**Priority queue for next session:**
1. `/find-your-ritual` skin quiz — needs your go-ahead
2. Delivery/Shipping admin page (`src/app/admin/shipping/page.tsx`)
3. SEO continuation — `/seo-page` for home, shop listing, and 2–3 blog posts
4. Email shipping notifications (`src/lib/email.ts`)
5. Bhringraj blog image — blocked on you providing a real herb photo
