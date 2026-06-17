# Jaison Herbals — Full SEO Audit

**Audited:** June 2026 · **Tool:** claude-seo v2.2.0 · **Site:** https://jaisonskincare.com  
**Branch context:** Audit ran against current production (old codebase). `redesign/v2` improvements not yet live.

---

## SEO Health Score: 58 / 100

| Category | Score | Trend |
|---|---|---|
| Technical SEO | 72/100 | — |
| On-Page / Titles & Meta | 55/100 | ↑ (fixes applied) |
| Content Quality | 50/100 | — |
| Structured Data / Schema | 65/100 | — |
| Sitemap & Crawlability | 60/100 | ↑ (fixes applied) |
| Performance | 80/100 | — |
| GEO / AI Discoverability | ~69/100 | ↑↑ See `GEO-ANALYSIS.md` (17 June session) — robots.txt conflict fixed, FAQPage schema added to all 10 blog posts, freshness signal added |

---

## Critical Fixes (applied in this session)

### 1. Homepage title — duplicate brand name
**Was:** `jaison | Natural Ayurvedic Beauty — Herbal Skincare & Haircare | jaison` (71 chars)  
**Root cause:** Homepage `page.tsx` set `title` as a plain string; the root layout template `"%s | jaison"` then appended another "| jaison".  
**Fix:** Changed to `title: { absolute: "Natural Ayurvedic Beauty — Herbal Skincare & Haircare | jaison" }` which bypasses the template.  
**File:** `src/app/(storefront)/page.tsx`

### 2. Homepage meta description — too long
**Was:** 192 chars (Google truncates at ~155)  
**Fix:** Trimmed to 156 chars.  
**File:** `src/app/(storefront)/page.tsx`

### 3. Why Jaison page — triple brand in title
**Was:** `Why Choose Jaison | jaison Skincare | jaison` (template applied to a title that already contained "jaison" twice)  
**Fix:** `Why Choose Jaison — Our Skincare Philosophy` → renders as `Why Choose Jaison — Our Skincare Philosophy | jaison`  
**File:** `src/app/(storefront)/why-jaison/page.tsx`

### 4. Contact page — redundant "Jaison Herbals | jaison"
**Was:** `Contact Us — Jaison Herbals | jaison`  
**Fix:** `Contact Us | jaison`  
**File:** `src/app/(storefront)/contact/layout.tsx`

### 5. About page — meta description too long
**Was:** 189 chars  
**Fix:** Trimmed to 137 chars.  
**File:** `src/app/(storefront)/about/page.tsx`

### 6. Sitemap — query-parameter category URLs removed
**Was:** Sitemap included `/shop?category=skin-care`, `/shop?category=hair-care` etc. These are filter facets, not distinct pages — Google may treat them as duplicate content and they waste crawl budget.  
**Fix:** Removed `categoryPages` array from sitemap.ts.  
**File:** `src/app/sitemap.ts`

### 7. llms.txt — AI crawler discoverability
**Was:** 404  
**Fix:** Created `/public/llms.txt` describing products, brand principles, and site structure for AI crawlers (ChatGPT, Perplexity, Claude, Gemini).  
**File:** `public/llms.txt`

---

## Remaining Issues — Prioritised

### High Priority

#### H1: Homepage H1 has no space between lines (production)
**Issue:** Live production H1 renders as `"Herbal PowdersCrafted with Care"` — the `<br/>` tag causes text-node concatenation without whitespace, which is how some crawlers parse it.  
**Note:** The redesign/v2 HeroSection has different markup and won't have this issue post-deploy.  
**Action:** Deploy redesign/v2 to production.

#### Blog post word counts too low
**Issue:** All 10 blog posts are 730–950 words. Top-ranking competitors for Ayurvedic skincare queries have 1,500–2,500+ words. Thin content underperforms.  
**Action:** Expand each post to 1,500+ words. Add:
- Before/after usage walkthroughs
- Comparison with chemical alternatives  
- Step-by-step recipes (2–3 per post)
- FAQ section per article (5+ questions, which also adds FAQ schema)

#### Product schema missing aggregateRating
**Issue:** Product JSON-LD on all product pages has no `aggregateRating`. Google uses this for star-rating rich snippets in search results.  
**Action:** Once real reviews exist in the DB, add aggregateRating to the `ProductJsonLd` component from the live `Review` table. Do not fabricate ratings.

#### Missing blog-article schema fields
**Issue:** `ArticleJsonLd` exists and is wired up but lacks `dateModified`, `wordCount`, and `inLanguage` fields which improve article rich result eligibility.  
**Action:** Add to `ArticleJsonLd` in `src/components/seo/JsonLd.tsx`:
```ts
dateModified: post.updatedAt || post.publishedAt,
inLanguage: "en-IN",
wordCount: post.content.split(/\s+/).length,
```

### Medium Priority

#### /find-your-ritual, /our-story, /why-powder return 404 in production
**Issue:** These pages exist in the codebase but aren't deployed yet. They're in `sitemap.ts`, so once submitted to Google, they'll generate 404 crawl errors.  
**Action:** Deploy redesign/v2 to production to resolve. No code changes needed.

#### Shop page has no metadata export
**Issue:** `src/app/(storefront)/shop/page.tsx` is `"use client"` and doesn't export metadata. The title comes from the root layout default, giving a non-specific title.  
**Action:** Extract shop metadata to a separate `layout.tsx` in `/shop/` (same pattern as `/contact/layout.tsx`).

#### No LocalBusiness `openingHours` in schema
**Issue:** `LocalBusinessJsonLd` component doesn't specify business hours or price range.  
**Action:** Add `openingHoursSpecification` and `priceRange` ("₹150 – ₹999") to the schema.

#### No internal linking from blog to products
**Issue:** Blog posts mention products (Amla, Neem, Ubtan) but don't link to their product pages. Internal links pass authority and reduce bounce rate.  
**Action:** Add CTA cards at the bottom of each blog post linking to the relevant product page.

### Low Priority / Info

#### HSTS max-age is 2 years (acceptable, could be preloaded)
**Status:** `max-age=63072000` is fine. For HSTS preload eligibility, needs `includeSubDomains; preload`. Optional.

#### No hreflang tags
**Issue:** Site serves India but has no explicit language/region targeting. Low priority for India-only SKUs.

#### Google Search Console not yet integrated
**Action:** Submit sitemap at https://search.google.com/search-console after deploying redesign/v2.

---

## What's Working Well

| Signal | Status |
|---|---|
| robots.txt | ✓ Correctly excludes /admin/, /api/, /account/, /checkout/ |
| Sitemap accessible | ✓ /sitemap.xml returns 200 |
| All 48 images have alt text | ✓ (fixed in recent audit work) |
| OG image configured | ✓ /images/og/og-default.jpg |
| HSTS enabled | ✓ |
| TTFB (homepage) | ✓ ~179ms (Vercel CDN cache hit) |
| Product pages have 8 schema types | ✓ Product + FAQ + Breadcrumb + Org + WebSite + LocalBusiness |
| Blog has 10 articles, all at correct URLs | ✓ |
| Product canonical URLs | ✓ Set on all product pages |
| FAQ schema (32 questions) | ✓ In redesign/v2; not yet live |
| BreadcrumbList schema | ✓ On product and blog pages |

---

## Quick-Win Checklist (deploy order)

- [x] Fix homepage title duplicate brand — done
- [x] Trim meta descriptions — done  
- [x] Fix Why Jaison / Contact title patterns — done
- [x] Remove category query params from sitemap — done
- [x] Add llms.txt — done
- [ ] Deploy redesign/v2 to production
- [ ] Submit updated sitemap to Google Search Console
- [ ] Expand blog posts to 1,500+ words (each)
- [ ] Add aggregateRating once real reviews exist
- [ ] Add shop layout.tsx with proper metadata
- [ ] Add dateModified + wordCount to ArticleJsonLd
