# Jaison Herbals — Session Handoff

**Date:** 17 June 2026 · **Branch:** `redesign/v2` · **Last commit:** `bec200b`

---

## What was built this session (session 11 — GEO score improvement)

Goal: take the GEO / AI Discoverability score from 20/100 (stale figure from `SEO-AUDIT.md`, 15 June) toward 100. Loaded `claude-seo:seo-geo`, `claude-seo:seo-schema`, `claude-seo:seo-content` skills first.

### 1. Critical fix: `/robots.txt` was actually broken — commit `bec200b`
`public/robots.txt` and `src/app/robots.ts` both existed. Next.js can't serve both: in dev this throws a 500 (`"A conflicting public file and page file was found for path /robots.txt"`, verified locally). In production, `robots.ts` silently won — meaning **the AI-crawler `Allow` rules added back in session 7's `public/robots.txt` (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot) had never actually been live.** Verified by curling `https://jaisonskincare.com/robots.txt` directly — only the generic wildcard rule was being served.

**Fix:** Consolidated everything into `src/app/robots.ts` (the file Next.js actually serves), merged the disallow list from both sources, added the two missing crawlers (`OAI-SearchBot`, `anthropic-ai`), deleted `public/robots.txt`. Verified locally: 200 response, all 6 AI crawlers + full disallow list + sitemap.

### 2. FAQPage schema added to all 10 blog posts — commit `bec200b`
Every post has a "Frequently Asked Questions" section written as plain markdown (40+ Q&A pairs site-wide) with zero structured data. Added `getBlogFaqs()` parser in `src/data/blog.ts` — handles both inline (`**Q?** answer`) and block (`**Q?**\n\nanswer`) formats, strips markdown artifacts — wired into a new `BlogFAQPageJsonLd` component (`src/components/seo/JsonLd.tsx`) rendered on `blog/[slug]/page.tsx`. Verified clean JSON-LD (no markdown leakage, correct Q&A counts) across all 10 posts via local curl + parse.

### 3. Visible "Updated [date]" freshness signal on blog posts — commit `bec200b`
`dateModified` existed only in schema, never shown to readers. Added a badge next to the byline when `dateModified` differs from `publishedAt` — surfaces real existing freshness (most posts already have a 16 June 2026 `dateModified`), nothing fabricated.

### 4. Ruled out a false alarm: `/shop` is not a GEO gap
`/shop/page.tsx` is `"use client"`, which looked like a Technical Accessibility risk (AI crawlers don't execute JS). Verified via local curl that the full product grid renders in raw server HTML on the initial request — Next.js SSRs client components regardless of the directive. No fix made; this avoided an unnecessary, risky filter/sort refactor.

### Verification performed
- `npx tsc --noEmit` — clean
- `npm run build` — 85/85 static pages, `/robots.txt` and `/blog/[slug]` both build correctly (unrelated pre-existing dynamic-server-usage warnings on `/api/admin/*/export` routes, not touched this session)
- Local dev server + curl checks on all 10 blog post FAQ schemas, the updated-date badge, and `/robots.txt` before and after the fix

Full breakdown, scoring rationale, and what's still blocked on owner content: **`GEO-ANALYSIS.md`** (new file, root).

---

## Current branch state

All work committed and pushed to `origin/redesign/v2`.

```
Last commits on redesign/v2:
bec200b  fix(geo): resolve robots.txt conflict, add FAQ schema to blog posts
2427ade  docs: session handoff (June 16 session 10)
92d61f1  fix(footer): tokenize newsletter strip colors and padding
ed7c5a2  fix(design): converge remaining home sections onto section-rhythm tokens
0e74938  fix(design): a11y, token, and spacing fixes from design system audit
```

### Files changed this session
```
src/app/robots.ts                          (consolidated AI-crawler + disallow rules)
public/robots.txt                          (deleted — superseded by robots.ts)
src/data/blog.ts                           (added getBlogFaqs() parser)
src/components/seo/JsonLd.tsx              (added BlogFAQPageJsonLd)
src/app/(storefront)/blog/[slug]/page.tsx  (wired FAQ schema + "Updated" badge)
SEO-AUDIT.md                               (GEO row updated: 20 → ~69, links to GEO-ANALYSIS.md)
GEO-ANALYSIS.md                            (new — full GEO breakdown)
HANDOFF.md                                 ← this file (updated)
```

---

## GEO score: ~20 → ~69/100 (estimated)

This is a manual analysis against the `seo-geo` skill's 5 weighted criteria, not an automated crawler score. See `GEO-ANALYSIS.md` for the full per-criterion table.

**What's left to reach 100 — not code-fixable, needs owner action:**
| Gap | Blocked on |
|---|---|
| Real author/founder Person schema with credentials | Founder name/bio/photo (already on the owner-content list below) |
| Brand presence on YouTube, Reddit, Wikipedia, LinkedIn (3x stronger AI-citation correlation than backlinks per Ahrefs) | Owner decision — months-long effort, not a code change |
| Video content / infographics | "How to use" videos (already on the owner-content list below) |
| Original research / unique data | New content initiative |

---

## What's next — ordered by impact

### 1. Decide fate of the 7 orphaned home components (carried over from session 10, still deferred)
- `BlogPreview.tsx`, `NewsletterSection.tsx`, `TrustPillars.tsx`, `WhyJaisonTeaser.tsx`, `WhyPowderTeaser.tsx`, `CategoryShowcase.tsx`, `BrandStory.tsx` — not imported anywhere in `src/app`. Owner explicitly deferred this — surface again before further homepage work.

### 2. Remaining design system debt
- ✅ **M4 done (session 12):** `GlowPillLink` now has `onFocus`/`onBlur` parity matching the hover glow.
- ✅ **Textarea/Checkbox done (session 12):** extracted into `ui/Textarea.tsx` / `ui/Checkbox.tsx`, wired into `ProductForm.tsx` and `ProductReviews.tsx`; also fixed retired `rounded-sm` → `rounded-lg` on those fields.
- **Tooltip / Table — not built.** Audited the codebase: no existing tooltip pattern exists anywhere to extract (no `title=` hover usage), and no admin page uses an actual `<table>` — each admin list (orders, messages, reviews, categories, customers, coupons) has its own bespoke `divide-y` row layout. Building either now would be a component with no current consumer / a 6-page refactor with no immediate trigger — deferred until a real feature need (e.g. a tooltip on an admin field, or a cross-table feature like bulk actions) surfaces one.

### 3. `/find-your-ritual` skin quiz — verified + fixed (session 12)
- **Status correction:** this was never actually gated — it's been linked in the desktop/mobile nav, `sitemap.ts`, `why-powder`, and `HowToUseGuide` since the very first redesign commit. It only 404s in production because `redesign/v2` hasn't been deployed to `main` yet (same as every other page on the branch). The "needs owner authorization" note was stale/unclear in origin — no specific blocking reason found in history.
- Functionally verified: 4-question quiz → recommends 2 of 8 active products from a hardcoded concern/skin-type matrix, prices/images pulled live from `src/data/products.ts`, links to real `/shop/[slug]` pages. Works correctly.
- Fixed design-token debt unique to this page (predates the design-system convergence work in sessions 9–11, never swept in): hardcoded `rgba(26,60,52,...)` / hex literals → `text-bark/NN` token classes and `color-mix()` for hover shadows; `rounded-2xl` → `rounded-xl`; tracking values `0.2em`/`0.15em`/`0.12em` → the two-token scale (`0.22em` static labels, `0.14em` interactive buttons/links). Per-option/per-product decorative swatch hexes (16 quiz-option colors + 8 product accent colors) were left as-is — sanctioned one-offs, same precedent as `StepCard`'s tint color in `DESIGN.md`.
- Remaining decision: get owner sign-off on the quiz copy/recommendations (if desired) — no further code work needed.

### 4. Admin shipping page
- `src/app/admin/shipping/page.tsx`; Shiprocket API already in `src/lib/shipping.ts`.

### 5. Email shipping notifications
- Trigger in `src/app/api/admin/orders/route.ts`; order confirmation already in `src/lib/email.ts`.
- Add "Order dispatched" email when admin marks status SHIPPED.

### 6. IndexNow
- Generate key, place at `public/<key>.txt`, submit on content publish.

### 7. Google Search Console
- Submit sitemap once `redesign/v2` merges to production (`main`).

---

## Owner content still needed

| Item | Blocks |
|---|---|
| Founder story (name, origin, photo) | About page, homepage brand section, **+ Person schema for GEO authority** |
| AYUSH / GMP license number | Footer trust signal |
| "How to use" videos (Neem, Multani, Ubtan) | Product page embeds, **+ GEO multi-modal score** |
| Before/after customer photos (10–15) | Review section, product pages |
| Lead magnet PDF guide content | Popup email delivery |
| Bhringraj blog image | Placeholder is `neem-styled.webp`; save real photo to `public/images/blog/bhringraj-styled.webp` |
| Social/brand presence (YouTube, Reddit, LinkedIn, Wikipedia) | **GEO authority score** — backed by Ahrefs data showing 3x stronger AI-citation correlation than backlinks |

---

## Skills installed (user scope)

- `claude-seo` v2.2.0 (agricidaniel) — `/seo-audit`, `/seo-geo`, `/seo-page`, `/seo-schema`, `/seo-content`, etc.
- `claude-blog` v1.9.1 (agricidaniel) — `/blog-write`, `/blog-audit`, etc.
- `redesign-existing-projects` — design audit patterns
- `frontend-design:frontend-design` — design direction skill

---

## Design rules (never violate)

- No hardcoded hex in `.tsx` — token classes in `className`, `var(--color-*)` in `style={{}}`
- `rounded-full` interactive pills, `rounded-xl` cards/modals, `rounded-lg` form fields
- Muted text minimum `/60` on cream, `/70` on bark (for readable content; `/30` = decorative/placeholder only)
- Font classes: `font-heading` (Cormorant), `font-body` (DM Sans), `font-accent` (Inter)
- Eyebrow spec: `font-accent text-[11px] tracking-[0.22em] uppercase`
- Tracking scale — exactly two values: `0.22em` for section eyebrows only; `0.14em` for interactive labels/buttons (form labels, pill CTAs, nav links). Don't mix or invent a third.
- z-index: 0 content / 10 in-section overlays / 20 floating UI / 30 sticky header / 40 backdrops / 50 modals/drawers/toasts (full table in DESIGN.md)
- Padding/rhythm — exactly two tokens: `.section-rhythm` (`py-12 md:py-16`) and `.section-rhythm-lg` (`py-16 md:py-24`). Any other raw `py-*` on a section wrapper is legacy debt to converge.
- Active filter pills → bark bg, not terracotta
- Never add `aggregateRating` to ProductJsonLd — no real reviews yet
- Never fabricate Person/author schema, social profiles, or video content for GEO — only structure truthful, existing content. Off-platform authority building is an owner decision, not a code fix.

## Deployment rule

**`redesign/v2` is NEVER deployed directly.**
All work ends at: `git add <files> && git commit -m "..." && git push origin redesign/v2`
Do not run `vercel`, `vercel --prod`, or merge to `main`.
