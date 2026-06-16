# Jaison Herbals — Website Audit Action Tracker

Source audit: `jaison-skincare-audit-report-enhanced.html` (May 2026 · Overall score: 3.8/10)  
Branch: `redesign/v2` · Last updated: June 16 2026 (session 4)

---

## Overall Scores (audit baseline)

| Dimension | Score | Status |
|---|---|---|
| Brand & Identity | 2.0/10 | Partial — visual system fixed, founder story still needed |
| Trust & Credibility | 2.2/10 | Partial — FAQ expanded, reviews still unverified |
| SEO / Content | 3.0/10 | Improved — schema + alt text done, keyword strategy pending |
| Conversion (CRO) | 3.5/10 | Partial — cart cross-sell + price framing done |
| Mobile Experience | 5.2/10 | Improved — PageSpeed 51→83, LCP 26.8s→4.7s, TBT 0ms |
| UX / Navigation | 5.8/10 | Improved — FAQ expanded, combo renamed |

---

## Phase 0 — Zero/Low Cost (Week 1–2)

| Item | Status | Notes |
|---|---|---|
| Switch contact email to @jaisonskincare.com | ❌ Pending | Business action — set up Google Workspace (~₹150/mo) |
| Display AYUSH/GMP/manufacturing cert in footer | ❌ Pending | Needs actual cert number from owner; slot is in footer |
| Add INCI ingredient names to every product | ✅ Done | Already in product descriptions |
| Rename combo products | ✅ Done | "Jaison Special Combo" → "Complete Head-to-Toe Ritual Kit" |
| Google PageSpeed Mobile audit | ✅ Done | Score 51→83. LCP 26.8s→4.7s, TBT 1,250ms→0ms. Hero poster + Next.js Image on ProductCard. |

---

## Phase 1 — Weeks 3–6

| Item | Status | Notes |
|---|---|---|
| Founder story on homepage + About page | ❌ Pending | Content from owner required — see CONTENT.md §Founder |
| UGC photo reviews from past customers | ❌ Pending | Email campaign to past buyers; offer 10% off for photo review |
| "How to use" videos (neem, multani, ubtan) | ❌ Pending | 30–60s phone-quality videos; embed on product pages |
| FAQ expanded to 30+ questions + schema | ✅ Done | 32 questions in 7 groups; FAQ JSON-LD schema added |
| Product schema markup | ✅ Done | ProductJsonLd + BreadcrumbJsonLd + ProductFAQJsonLd on all product pages |
| Cart cross-sell / upsell | ✅ Done | "You may also like" strip in CartDrawer; category-matched |

---

## Phase 2 — Month 2–3

| Item | Status | Notes |
|---|---|---|
| Professional product photography | ❌ Pending | Macro texture shots + in-use lifestyle images |
| Lead magnet popup (Ayurvedic Skincare Guide) | ✅ Done | 40% scroll trigger, bark card, `/api/newsletter` POST, sessionStorage guard. PDF content placeholder — team to supply actual guide |
| Homepage trust hierarchy redesign | Partial | TrustBadgeBar built (removed per owner preference); certifications still needed |
| 6 long-tail blog articles | ✅ Done | 10 blog posts, all expanded to 1,500–2,155 words (June 2026). Science sections, dosha guides, FAQ, Key Takeaways added. |
| Pricing tiers — raise floor to ₹249, add premium SKU | ❌ Pending | Business decision; premium "Single Origin" line at ₹550–₹699 |
| Cart AOV upsell | ✅ Done | Cross-sell strip in CartDrawer |
| Price-per-use framing on product pages | ✅ Done | "~20 face masks per pack" below price; derived from weight + category |

---

## Phase 3 — Month 3–6

| Item | Status | Notes |
|---|---|---|
| Brand visual overhaul (custom typography, packaging) | Partial | Design system in place (`redesign/v2` branch); packaging unchanged |
| Loyalty / subscription programme | ❌ Pending | "Refill & Save 15%" — business decision + dev work |
| Influencer partnerships (3–5 mid-tier) | ❌ Pending | Marketing action |
| Skin quiz lead funnel | ⏸ Paused | `/find-your-ritual` page 404s. Quiz design needs explicit session authorization before starting. |
| SEO content cluster (12 articles per hero product) | ❌ Pending | 6 blog posts exist; need 6+ more targeting long-tail queries |
| Amazon / Flipkart marketplace listings | ❌ Pending | Business decision |

---

## SEO — Implemented

- FAQ JSON-LD schema (`/faq` page) — 32 questions across 7 groups
- Product JSON-LD on all product pages (price, availability, ratings)
- FAQ JSON-LD on all product pages (per-product questions)
- Breadcrumb JSON-LD on all product pages
- Article JSON-LD on all blog posts
- Alt text audit complete — all images have descriptive, keyword-rich alt text
- Blog: 10 articles at `/blog`, all expanded to 1,500+ words (June 2026)
- Each blog post now has: opening summary (40-60 words), Key Takeaways blockquote, science section, Ayurvedic dosha guide, Indian seasonal section, 5-question FAQ
- Homepage title fixed — no more duplicate "jaison" brand (was 71 chars, now 63)
- Meta descriptions trimmed across homepage + about to <160 chars
- Why Jaison + Contact page title patterns cleaned
- Sitemap cleaned — `/shop?category=*` query-param URLs removed
- `llms.txt` added at `/public/llms.txt` for AI crawler discoverability
- Full SEO audit completed (Health Score: 58/100) — see `SEO-AUDIT.md`
- `dateModified` + `wordCount` fields added to `ArticleJsonLd` (`src/components/seo/JsonLd.tsx`)
- `inLanguage: "en-IN"` added to `ArticleJsonLd` schema — GEO locale signal for Indian-English content
- Shop page metadata exists via `src/app/(storefront)/shop/layout.tsx`
- Blog-to-product internal links: "Shop the Ingredients" CTA section on all 10 blog posts
- `LocalBusinessJsonLd`: `openingHoursSpecification` added (Mon-Sat 10:00-18:00) + `priceRange: "₹150 - ₹999"`
- PageSpeed Mobile: score 51→83. Hero video poster (28KB WebP) fixes LCP; `<Image>` on ProductCard eliminates 3.2MB image waste. TBT 0ms in production.
- `llms.txt` at `/public/llms.txt` for AI crawler discoverability
- How to Use tab: Cormorant Garamond oldstyle numeral bug fixed (`lining-nums`); combo products now show flat horizontal grid

## SEO — Pending

- **Submit sitemap** to Google Search Console (`https://jaisonskincare.com/sitemap.xml`) — owner action
- Add `aggregateRating` to product schema once real reviews exist in DB
- Keyword strategy shift to long-tail (see `SEO-AUDIT.md`)
- Comparison keywords: "Jaison Herbals vs Nat Habit neem powder"
- Local SEO: Nashik + Maharashtra Ayurveda searches
- 12-article SEO content cluster per hero product

---

## Content Gaps (owner must provide)

These cannot be built until the owner supplies the raw content:

| Gap | Why it matters | Priority |
|---|---|---|
| Founder story — who Jaison is, origin, inspiration | Single highest-impact trust signal (audit: +40–60% CR lift) | Critical |
| AYUSH / GMP / manufacturing license number | Legal compliance + trust | Critical |
| Ingredient sourcing specifics (farm/region for each herb) | Differentiator vs Amazon sellers | High |
| Before/after customer photos (10–15) | Replaces text-only reviews | High |
| "How to use" videos for Neem, Multani Mitti, Ubtan | #1 drop-off point for first-time buyers | High |
| Supplier/manufacturing facility address (honest, specific) | Resolves "Business Bay office vs handcrafted" tension | Medium |

---

## What redesign/v2 Has Delivered (vs audit baseline)

| Audit Criticism | Fix in redesign/v2 |
|---|---|
| "Generic green-on-white, no visual identity" | Terracotta/cream design system, Cormorant serif, pill buttons |
| "Generic hero, no brand narrative" | Video hero, "Your bottle lists a dozen ingredients. Ours lists one." |
| "Visual identity looks like a theme demo" | Full design system: tokens, radius, typography scale |
| "Instagram section ineffective" | Rewritten with 8 illustrated SVG tiles + #jaisonherbals |
| "Cart experience generic" | CartDrawer pill UI + cross-sell strip |
| "FAQ nearly empty" | 10 → 32 questions in 7 themed groups with JSON-LD schema |
| "Combo products named poorly" | "Jaison Special Combo" → "Complete Head-to-Toe Ritual Kit" |
| "No price-per-use context" | "~20 face masks per pack" below price |
| "Bestseller badges missing" | Terracotta "Bestseller" pill on ProductCard (4 products) |
| "Alt text weak/missing" | All images: descriptive, keyword-rich alt text with brand + product context |
| "Mobile performance poor (LCP)" | Hero video poster + `<Image>` on ProductCard: PageSpeed 51→83, LCP 26.8s→4.7s |
| "How to Use step numbers garbled" | `lining-nums` on StepCard; combo products flat grid (was N separate single-card rows) |
