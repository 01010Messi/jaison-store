# Jaison Herbals — Session Handoff

**Date:** 15 June 2026 · **Branch:** `redesign/v2` · **Last commit:** `9781b1b`

---

## What was built this session

### 1. Lead magnet popup (`src/components/home/LeadMagnetPopup.tsx`)
- Fires once per session at **40% scroll depth** on all storefront pages
- Excluded on: `/checkout`, `/cart`, `/login`, `/register`, `/admin`
- `sessionStorage` key `jaison_guide_popup` prevents re-show
- **Design:** bark dark card (`rounded-xl`, `shadow-warm-xl`), Cormorant Garamond heading with italic terracotta accent, Inter eyebrow, DM Sans body
- **X button** — `rounded-full` so focus ring is circular, not square
- **Email input** — `rounded-full px-5` (pill shape overrides the default `rounded-lg`)
- **Submit** — POSTs to existing `POST /api/newsletter` endpoint → writes to `Newsletter` table → Resend welcome email (when configured)
- **Success state** — shows confirmed email address, "Continue Exploring" CTA
- **Already subscribed** error treated gracefully (resolves to success state)
- Wired into `src/app/(storefront)/layout.tsx` (NOT root layout — keeps it off admin pages)
- PDF copy is placeholder ("12 pages…") — **team must supply actual guide content**

### 2. SEO audit + fixes (claude-seo v2.2.0)
Full audit at `SEO-AUDIT.md`. Health Score: **58/100**. Seven fixes applied:

| Fix | File |
|---|---|
| Homepage title: `title.absolute` to stop double "jaison" (was 71 chars) | `src/app/(storefront)/page.tsx` |
| Homepage meta desc trimmed 192 → 156 chars | `src/app/(storefront)/page.tsx` |
| Why Jaison title cleaned (triple brand → clean) | `src/app/(storefront)/why-jaison/page.tsx` |
| Contact title cleaned (double brand → `Contact Us \| jaison`) | `src/app/(storefront)/contact/layout.tsx` |
| About meta desc trimmed 189 → 137 chars | `src/app/(storefront)/about/page.tsx` |
| Sitemap: removed `/shop?category=*` query-param URLs | `src/app/sitemap.ts` |
| Added `public/llms.txt` for AI crawlers | `public/llms.txt` |

### 3. Plugin installed
`claude-seo` v2.2.0 by AgriciDaniel — installed at user scope. Available next session via `/seo-audit`.

---

## Current branch state

All work is committed and pushed to `origin/redesign/v2`.

```
Last 4 commits on redesign/v2:
9781b1b  seo: fix title duplication, trim meta descs, clean sitemap, add llms.txt
d5add26  add scroll-triggered lead magnet popup for email capture
049dc16  remove trust badge bar; SEO alt text across all images
00f8324  remove Why Jaison teaser from homepage
```

### Files changed this session
```
src/components/home/LeadMagnetPopup.tsx   ← new
src/components/home/WhyJaisonTeaser.tsx   ← fix: unescaped apostrophe (pre-existing ESLint error)
src/app/(storefront)/layout.tsx           ← import LeadMagnetPopup
src/app/(storefront)/page.tsx             ← title.absolute + shorter desc
src/app/(storefront)/about/page.tsx       ← shorter meta desc
src/app/(storefront)/why-jaison/page.tsx  ← title cleaned
src/app/(storefront)/contact/layout.tsx   ← title cleaned
src/app/sitemap.ts                        ← category params removed
public/llms.txt                           ← new
SEO-AUDIT.md                              ← new (full audit report)
AUDIT-ACTIONS.md                          ← updated
```

---

## What's next — ordered by impact

### 1. Lead magnet PDF (owner action)
Team to supply "Ayurvedic Skin Reset Guide" content. Once PDF exists:
- Upload to Cloudinary or `/public/guides/`
- Update popup body copy and the Resend welcome email to include the download link
- Popup component is already wired; only copy + email need updating

### 3. Blog expansion (content work)
All 10 blog posts are 730–950 words. Need 1,500+ each to compete on Ayurvedic skincare queries. Priority order: Ubtan, Neem, Amla, Shikakai (bestseller products first).

### 4. Product aggregateRating schema
Once real reviews accumulate in the DB, add to `ProductJsonLd` in `src/components/seo/JsonLd.tsx`. Do not fabricate ratings.

### 5. Shop page metadata
`/shop` is `use client` and can't export `metadata`. Create `src/app/(storefront)/shop/layout.tsx` with server-side metadata export — same pattern as `/contact/layout.tsx`.

### 6. ArticleJsonLd enrichment
In `src/components/seo/JsonLd.tsx` at the `ArticleJsonLd` function, add:
```ts
dateModified: post.updatedAt || post.publishedAt,
inLanguage: "en-IN",
wordCount: post.content.split(/\s+/).length,
```

### 7. Loyalty/subscription ("Refill & Save 15%")
Business decision still pending. Once approved: Razorpay Subscriptions API + UI on product pages.

### 8. Branded email
Set up Google Workspace → jaisonskincare@jaisonskincare.com. Update `EMAIL_FROM` env var and contact copy across the site.

---

## Owner content still needed

| Item | Blocks |
|---|---|
| Founder story (name, origin, photo) | About page, homepage brand section |
| AYUSH / GMP license number | Footer trust signal |
| "How to use" videos (Neem, Multani, Ubtan) | Product page embeds |
| Before/after customer photos (10–15) | Review section, product pages |
| Lead magnet PDF guide content | Popup email delivery |
| Ingredient sourcing specifics | Product description differentiator |

---

## New session prompt

Copy-paste this at the start of the next Claude Code session:

```
Working on jaison-store-v2 at ~/Desktop/jaison-store-v2.
Active branch: redesign/v2 — commit and push only to this branch.

Read CLAUDE.md for full project context, DESIGN.md for design system rules,
AUDIT-ACTIONS.md for completed vs pending audit items, and SEO-AUDIT.md for
the full SEO findings (Health Score 58/100, audit run June 2026).

Last session completed:
- Lead magnet popup at src/components/home/LeadMagnetPopup.tsx (40% scroll,
  bark card, /api/newsletter, sessionStorage guard, pill input, circular X ring)
- SEO fixes: homepage title duplicate brand, meta description lengths, 
  sitemap cleaned, llms.txt added
- All committed and pushed to origin/redesign/v2

Most urgent next steps:
1. Lead magnet PDF — team supplies content, then update popup copy + welcome email
2. Expand blog posts to 1,500+ words (all 10 are currently ~800 words)
3. Shop page layout.tsx — add server metadata (page is use client, can't export metadata)
4. Submit sitemap to Google Search Console: https://jaisonskincare.com/sitemap.xml

Design rules (never violate):
- No hardcoded hex in .tsx — token classes in className, var(--color-*) in style={{}}
- rounded-full interactive pills, rounded-xl cards/modals, rounded-lg form fields
- Muted text min /60 on cream, min /70 on bark
- Font classes: font-heading (Cormorant), font-body (DM Sans), font-accent (Inter)
- Eyebrow spec: font-accent text-[11px] tracking-[0.22em] uppercase
- z-index: 0 content / 10 section overlays / 20 floating / 30 sticky header / 40 backdrops / 50 modals

Push command: git add -A && git commit -m "..." && git push -u origin redesign/v2
```
