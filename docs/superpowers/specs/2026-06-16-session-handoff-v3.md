# Session Handoff — June 16 2026 (Evening / Session 5)

**Branch:** `redesign/v2` (pushed to GitHub, NOT deployed — never deploy)  
**Repo:** https://github.com/01010Messi/jaison-store.git  
**Latest commit:** `38f9315` — fix(blog): apply full audit remediation

---

## Completed This Session (Session 5)

### 1. Order Detail Page

**File:** `src/app/(storefront)/account/orders/[id]/page.tsx`  
**Commit:** `b53be44`

Full rewrite of the order detail page to match the brand design system:
- Status badge pills using design token classes (bg-sage/10 text-sage for CONFIRMED, etc.)
- 7-step order timeline with correct connector logic (filled left of active step)
- Section cards with `rounded-xl`, `font-heading` section titles
- Button component (`variant="secondary"` / `variant="outline"`) for Track Shipment and Download Invoice
- Shows: order number, date, payment method, shipping address, item breakdown with images, totals table
- API route at `src/app/api/orders/[id]/route.ts` already existed and was not changed
- Page is auth-gated (redirects to login if no session)

---

### 2. Blog Full Audit Fix

**Files:** `src/app/(storefront)/blog/[slug]/page.tsx`, `src/data/blog.ts`  
**Commit:** `38f9315`  
**Report:** `BLOG-FIXES-REPORT.md` (project root)

All findings from the claude-blog audit (`blog-audit-report.md`) were applied:

| Fix | Detail |
|-----|--------|
| renderMarkdown blockquote handler | All 10 Key Takeaways boxes now render as styled parchment callout cards (were raw `> ` text) |
| renderMarkdown inline links | `[text](url)` now renders as anchor tags with terracotta color |
| getRelatedPosts topical filtering | Same-category posts appear first in "Keep Reading"; cross-category as fallback |
| 8 meta titles trimmed to ≤60 chars | Amla, Multani, Shikakai, Neem, Orange Peel, Bhringraj, Reetha, Mehendi |
| 5 meta descriptions trimmed to ≤160 chars | Ubtan, Amla, Shikakai, Neem, Mehendi |
| Bhringraj image fixed | Was nagmotha-front.webp; changed to neem-styled.webp placeholder |
| 10 internal links added (1 per post) | Blog graph went from fully disconnected (0 links) to partially connected |

**Note:** Ayurvedic Routine `relatedProducts` was flagged by audit script as missing — this was a script extraction bug. The post already has `["ubtan-powder", "multani-mitti", "neem-powder", "orange-peel-powder"]`. No change needed.

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

File to create: `src/app/(storefront)/find-your-ritual/page.tsx`

---

### 2. Delivery / Shipping admin page
Shiprocket API wired in `src/lib/shipping.ts`. Need admin UI for order list with tracking status, label generation, AWB display.

File: new route at `src/app/admin/shipping/page.tsx`

---

### 3. Blog internal links — 2nd pass
Each post has 1 internal link now. Target is 2–3. The audit identified these additional pairing opportunities not yet implemented:

| Post | Second Link | Target |
|------|-------------|--------|
| Ubtan | "pair with Multani Mitti deep-cleanse before application" | /blog/multani-mitti-face-pack-recipes |
| Amla | "stack with Bhringraj for scalp circulation" | /blog/bhringraj-powder-for-hair-growth |
| Neem | "step 4: condition with amla for follicle strength" | /blog/amla-powder-benefits-for-hair-growth |
| Bhringraj | "complete natural hair wash method" | /blog/natural-hair-wash-shikakai-reetha-amla |
| Orange Peel | "layer with Multani Mitti for oily acne types" | /blog/multani-mitti-face-pack-recipes |

---

### 4. Email — shipping update notifications
Order confirmation email exists (`src/lib/email.ts`). Need shipping dispatched + delivery confirmation emails.

Files: `src/lib/email.ts`, `src/app/api/admin/orders/route.ts`

---

### 5. Blog image — proper Bhringraj photo
Current placeholder is `neem-styled.webp`. A dedicated Bhringraj herb image is needed. When owner provides it, save to `public/images/blog/bhringraj-styled.webp` and update `src/data/blog.ts` Bhringraj post `image` field.

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

### renderMarkdown capabilities (`src/app/(storefront)/blog/[slug]/page.tsx`)
Handles: `## ` h2, `### ` h3, `- ` / `* ` bullet lists, `|` table rows, `> ` blockquotes (parchment callout with eyebrow + gold-dot bullets), `**bold**`, `*italic*`, `[text](url)` inline links, empty lines for paragraph breaks.

### How to Use tab step parsing rules
- Single block (no `\n\n`) → flat numbered grid
- Multiple blocks with named headings ("For Hair:\n...") → grouped grid per block  
- Multiple blocks without named headings (combos) → flattened into one flat grid

### SEO schema components (`src/components/seo/JsonLd.tsx`)
- `OrganizationJsonLd`, `WebsiteJsonLd`, `LocalBusinessJsonLd` — root `layout.tsx`
- `LocalBusinessJsonLd` has `openingHoursSpecification` (Mon–Sat 10:00–18:00) + `priceRange: "₹150 - ₹999"`
- `ProductJsonLd` — product detail pages
- `ArticleJsonLd` — blog post pages; includes `dateModified` + `wordCount`
- `BreadcrumbJsonLd` — product + blog pages
- `FAQJsonLd` — /faq page + product pages

### Performance baseline (Lighthouse mobile)
| Metric | After Session 4 |
|---|---|
| Performance score | 83 |
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
