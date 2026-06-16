# Session Handoff — June 16 2026 (Session 7)

**Branch:** `redesign/v2` (pushed to GitHub, NOT deployed — never deploy)  
**Repo:** https://github.com/01010Messi/jaison-store.git  
**Latest commit:** `644b9b2` — fix(seo): about page audit + technical SEO fixes

---

## Completed This Session (Session 7)

### 1. SEO Page Audits — Home, Shop, Blog Listing, Blog Posts

**Skill used:** `claude-seo:seo-page`  
**Commit:** `6b7c641`  
**Files changed:** `src/app/layout.tsx`, `src/app/(storefront)/page.tsx`, `src/app/(storefront)/shop/layout.tsx`, `src/app/(storefront)/blog/page.tsx`, `src/app/(storefront)/blog/[slug]/page.tsx`

#### Root Layout Fix
| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| OG + twitter image URLs relative (`/images/og/og-default.jpg`) — breaks to localhost if `NEXT_PUBLIC_APP_URL` unset | Medium | Made absolute: `https://jaisonskincare.com/images/og/og-default.jpg` |

#### Home Page (`/`)
| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| No page-level `openGraph` — og:title mismatched `<title>` | High | Added page-level OG with absolute image, matching title/description |
| No `twitter` card | High | Added `summary_large_image` card |

#### Shop Listing (`/shop`)
| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| No page-level `openGraph` — `og:url` inherited root (`jaisonskincare.com`) not `/shop` | Critical | Added OG with correct `og:url`, title, absolute image |
| Meta description 172 chars (limit 160) | High | Trimmed to 143 chars |
| No `twitter` card | Medium | Added card |

#### Blog Listing (`/blog`)
| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| Double-brand title: `"…\| Jaison Herbals"` + template `"\| jaison"` | Critical | `title: { absolute: "..." }` to bypass template |
| No `og:image` in OG block | High | Added absolute image URL |
| No `twitter` card | High | Added card with correct title/description |

#### Blog Posts (`/blog/[slug]`)
| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| `title: post.metaTitle` + template = 62–66 chars (limit 60) | High | `title: { absolute: post.metaTitle }` — bypasses template |
| OG image relative (`/images/blog/*.webp`) | High | Absolute via `BASE_URL` constant (same pattern as product pages) |
| Twitter image relative | High | Fixed with `BASE_URL` |

---

### 2. SEO Page Audit — About Page (`/about`)

**Skill used:** `claude-seo:seo-page`  
**Commit:** `644b9b2`  
**File changed:** `src/app/(storefront)/about/page.tsx`

| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| No page-level `openGraph` — `og:url` inherited root | Critical | Added OG with `og:url /about`, title, absolute image |
| H1 "About Us" — zero keywords, no brand name | High | → "About Jaison Herbals" |
| No `twitter` card | High | Added `summary_large_image` card |
| Meta description 137 chars (below 150–160 optimal) | High | Expanded to 155 chars |
| No `BreadcrumbJsonLd` (FAQ/shop/product all had it) | Medium | Added — import + render in page |
| Only 1 internal link in entire page | Medium | Added 2 links in body copy (→ `/shop`, → `/blog`) |

---

### 3. Technical SEO Audit (Site-Wide)

**Skill used:** `claude-seo:seo-technical`  
**Commit:** `644b9b2`  
**Files changed:** `next.config.js`, `src/app/sitemap.ts`, `public/llms.txt`, `public/robots.txt`

#### Technical Score: 72/100 → ~84/100 (estimated post-fix)

| Fix | File | Detail |
|-----|------|--------|
| Security headers added to all routes | `next.config.js` | `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `HSTS max-age=63072000` |
| Sitemap blog `lastModified` | `src/app/sitemap.ts` | Was `post.publishedAt` (March 2026) → now `post.dateModified ?? post.publishedAt` (2026-06-16) |
| `llms.txt` stale products removed | `public/llms.txt` | Removed Rose Petal, Bhringraj, Sandalwood (discontinued); added combo kit names |
| AI crawlers explicitly allowed in robots.txt | `public/robots.txt` | Added explicit `User-agent` blocks for GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot (all `Allow: /`) |
| `robots.txt` Disallow: `/order-success` + `/account` | `public/robots.txt` | Cart was already noindex; order-success layout already had `robots: noindex` — but robots.txt now also blocks them |

**Known remaining issues (not fixed):**
- LCP 4.7s (target <2.5s) — hero video is the bottleneck; design decision
- IndexNow not implemented — medium priority, needs API key

---

## SEO Audit Status (Updated)

| Page | Audited | Fixes Applied |
|------|---------|---------------|
| `/faq` | ✅ session 6 | Duplicate schema, title, OG tags, heading hierarchy |
| `/shop/[slug]` | ✅ session 6 | Relative OG URLs, meta description length, image alts, schema |
| `/` (home) | ✅ session 7 | Page-level OG, twitter card, absolute image URLs |
| `/shop` (listing) | ✅ session 7 | Critical og:url fix, description trim, OG/twitter |
| `/blog` (listing) | ✅ session 7 | Double-brand title, og:image, twitter card |
| `/blog/[slug]` | ✅ session 7 | Title length overflow, absolute OG/twitter images |
| `/about` | ✅ session 7 | OG, twitter, H1, description, breadcrumb, internal links |
| Site-wide technical | ✅ session 7 | Security headers, sitemap, llms.txt, robots.txt |
| `/our-story` | ❌ pending | — |
| `/why-jaison` | ❌ pending | — |
| `/why-powder` | ❌ pending | — |
| `/contact` | ❌ pending | — |

---

## Remaining Dev Work (Priority Order)

### 1. `/find-your-ritual` skin quiz page
**Status:** ⚠️ **REQUIRES EXPLICIT USER AUTHORIZATION to start.**

**Note:** `src/app/(storefront)/find-your-ritual/page.tsx` and `FindYourRitualContent.tsx` already **exist** in the codebase. The page may not be 404 any more — verify in production after deploy. If it's already live and functional, this item is complete.

If fixes needed:
- Email capture wired to `POST /api/newsletter`
- Design: cream background, pill buttons in Bark, Cormorant heading

---

### 2. Delivery / Shipping admin page
Shiprocket API wired in `src/lib/shipping.ts`. Need admin UI for order list with tracking status, label generation, AWB display.

File to create: `src/app/admin/shipping/page.tsx`

---

### 3. Email — shipping update notifications
Order confirmation email exists (`src/lib/email.ts`). Need:
- "Order dispatched" email triggered when admin marks order as SHIPPED
- "Out for delivery" email (optional)

Trigger point: `src/app/api/admin/orders/route.ts`

---

### 4. IndexNow
Medium priority. Speeds up indexing on Bing, Yandex, Naver. Steps:
1. Generate key at https://www.indexnow.org/
2. Place key file at `public/<key>.txt`
3. Add `IndexNow` submission to sitemap generation or on-publish hook

---

### 5. Blog image — proper Bhringraj photo
Placeholder is `neem-styled.webp`. Blocked on owner.  
When provided: save to `public/images/blog/bhringraj-styled.webp` and update `src/data/blog.ts` Bhringraj post `image` field.

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
Internal link count: 2 per post (target is 3).

### BreadcrumbJsonLd coverage (as of session 7)
Present on: `/shop`, `/shop/[slug]`, `/faq`, `/blog/[slug]`, `/about`  
Missing on: `/our-story`, `/why-jaison`, `/why-powder`, `/contact`, `/blog` (listing)

### FAQ data location
- Source of truth: `src/data/faqs.ts` — 7 groups, 32 questions
- Imported by: `src/app/(storefront)/faq/layout.tsx` (schema) and `src/app/(storefront)/faq/page.tsx` (rendering)
- Do NOT add inline arrays to page.tsx or layout.tsx

### SEO schema components (`src/components/seo/JsonLd.tsx`)
- `OrganizationJsonLd`, `WebsiteJsonLd`, `LocalBusinessJsonLd` — root `layout.tsx`
- `ProductJsonLd` — product detail pages (`additionalProperty` for ingredients)
- `ProductFAQJsonLd` — product detail pages (FAQPage — kept for AI citation, not rich results)
- `ArticleJsonLd` — blog post pages
- `BreadcrumbJsonLd` — product + blog + FAQ + About pages
- `FAQPageJsonLd` — `/faq` layout (32 questions from `src/data/faqs.ts`)
- `CollectionPageJsonLd` — `/shop` layout

### OG image pattern (as of session 7)
All OG/twitter image URLs are **absolute** (`https://jaisonskincare.com/...`). Never use relative paths in metadata image fields — metadataBase is unreliable when `NEXT_PUBLIC_APP_URL` is unset.

### Blog post title pattern (as of session 7)
Blog posts use `title: { absolute: post.metaTitle }` — bypasses root template `%s | jaison` to prevent overflow. The metaTitles stand alone (54 chars max).

### Security headers (as of session 7)
Added to `next.config.js` for all routes: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`.

### Performance baseline (Lighthouse mobile, after session 4)
| Metric | Score |
|---|---|
| Performance | 83 |
| LCP | 4.7s |
| TBT | 0ms |
| CLS | 0 |

LCP remains above 2.5s target — hero video is the constraint.

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
9. FAQ data lives in `src/data/faqs.ts` — do not re-add inline arrays
10. All OG/twitter image URLs must be absolute — never relative paths in metadata

---

## Opening Prompt for Next Session

```
We're on branch redesign/v2 of jaison-store-v2 (Ayurvedic e-commerce, Next.js 14 App Router).

Read docs/superpowers/specs/2026-06-16-session-handoff-v5.md for full context before starting anything.

Latest commit: 644b9b2. TypeScript is clean.

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
- All OG/twitter image URLs must be absolute (never relative paths in metadata)

[your task here]

Priority queue:
1. /find-your-ritual quiz — needs your go-ahead (note: page files already exist, may just need review)
2. Delivery/Shipping admin page (src/app/admin/shipping/page.tsx)
3. Email shipping notifications (src/lib/email.ts)
4. IndexNow implementation (medium priority)
5. Bhringraj image — blocked on you
```
