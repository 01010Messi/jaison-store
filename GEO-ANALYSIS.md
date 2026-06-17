# Jaison Herbals — GEO / AI Discoverability Analysis

**Date:** 17 June 2026 · **Branch:** `redesign/v2`
**Baseline:** `SEO-AUDIT.md` (15 June 2026) scored GEO at **20/100** — that audit predates the blog expansion (730→1,500–2,100 words), 32-question FAQ rollout, and llms.txt addition from sessions 7–10, so it was already stale going into this session.

This is a manual analysis against the `seo-geo` skill's 5 weighted criteria, not an automated crawler score — treat the number as directional, not a tool output.

## GEO Readiness Score: ~69/100 (estimated, up from 20)

| Criterion | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 20/25 | Key Takeaways blocks, "What Is X" definition openers, science-backed claims with sources already present in all 10 blog posts |
| Structural Readability | 20% | 16/20 | Clean H1→H2→H3, question-based headings, lists — FAQ sections now machine-readable (see fixes) |
| Multi-Modal Content | 15% | 6/15 | Images only; no video/infographics/interactive tools — blocked on owner assets (see Roadmap) |
| Authority & Brand Signals | 20% | 9/20 | Fresh dates (most content modified within days), NAP/Organization schema solid; author is generic "Jaison Herbals" (no real Person/credentials yet), `sameAs` only has Instagram |
| Technical Accessibility | 20% | 18/20 | SSR confirmed (see below), llms.txt present, robots.txt **was broken** — now fixed (see Critical Fix) |

---

## Critical Fix Applied: `/robots.txt` was returning a 500 in dev and silently dropping all AI-crawler rules in production

**Root cause:** Both `public/robots.txt` *and* `src/app/robots.ts` existed. Next.js can't serve both — in dev this throws `"A conflicting public file and page file was found for path /robots.txt"` (verified locally, 500 response). In the current production build, `robots.ts` silently wins, which means **the AI-crawler-specific `Allow` rules in `public/robots.txt` (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot) have never actually been live** — verified by curling `https://jaisonskincare.com/robots.txt`, which returns only a generic `User-Agent: *` rule with none of the AI-crawler entries.

**Fix:** Consolidated everything into `src/app/robots.ts` (the file Next.js actually serves) — merged the disallow list from both sources, added all AI-crawler allow rules, and deleted the now-redundant `public/robots.txt`. Added `OAI-SearchBot` and `anthropic-ai` (previously missing — distinct from `ChatGPT-User`/`GPTBot` and `ClaudeBot` respectively, per the skill's crawler table).

Verified locally: `/robots.txt` now returns 200 with all 6 AI crawlers allowed + the full disallow list + sitemap reference.

---

## Other Fixes Applied This Session

### 1. FAQPage schema missing on all 10 blog posts
Every blog post has a "Frequently Asked Questions" section (40–80 Q&A pairs site-wide across posts) written as plain markdown — none of it had structured data. Added `getBlogFaqs()` parser in `src/data/blog.ts` (handles both inline `**Q?** answer` and block `**Q?**\n\nanswer` formats, strips markdown artifacts) and a new `BlogFAQPageJsonLd` component wired into `blog/[slug]/page.tsx`. Verified clean JSON-LD output (no markdown leakage) across all 10 posts via local curl + parse check.

This is the single highest-leverage schema fix available without new content — FAQPage no longer drives Google rich results (retired May 2026) but per your own [[feedback-seo-workflow]] guidance and the skill's docs, it remains a meaningful AI Mode / AI Overviews entity-resolution and citation signal, especially for ChatGPT and Perplexity which favor structured Q&A.

### 2. No visible "last updated" freshness signal on blog posts
`dateModified` existed in schema but was never shown to readers. SE Ranking's 1.3M-citation study (cited in the skill) found content under 3 months old is ~3x more likely to be AI-cited. Added a visible "Updated [date]" badge next to the byline when `dateModified` differs from `publishedAt` — most posts already have a 16 June 2026 `dateModified`, so this surfaces real existing freshness rather than fabricating it.

### 3. Verified `/shop` is not actually a GEO gap
`/shop/page.tsx` is a `"use client"` component, which initially looked like a Technical Accessibility risk (AI crawlers don't execute JS). Verified via local curl that the full product grid (names, not just shells) renders in the raw server HTML on first request — Next.js SSRs client components for the initial response regardless of the directive. No fix needed; ruled out to avoid an unnecessary, risky filter/sort refactor.

---

## What's Left to Reach 100 — Not Code-Fixable This Session

These require owner-provided assets or off-platform brand-building, consistent with the existing "Owner content still needed" list in `HANDOFF.md`:

| Gap | Criterion affected | Blocked on |
|---|---|---|
| Real author/founder Person schema with credentials | Authority (20%) | Founder name/bio/photo — already flagged in HANDOFF.md |
| Brand presence on YouTube, Reddit, Wikipedia, LinkedIn | Authority (20%) — these correlate 3x more strongly with AI citation than backlinks | Owner decision to build these (months-long effort, not a code change) |
| Video content / infographics | Multi-Modal (15%) | "How to use" videos already flagged as blocked-on-owner in HANDOFF.md |
| Original research / unique data (surveys, before-after data) | Citability (25%), high-impact tier | New content initiative, not a fix |

Realistically, code-level fixes can take this from ~20 to the high-60s/low-70s. Closing the rest of the gap to 100 is an ongoing content/brand-authority program, not a single session of engineering.

---

## Files Changed
- `src/app/robots.ts` — consolidated AI-crawler rules, fixed the public-file conflict
- `public/robots.txt` — deleted (superseded by `robots.ts`)
- `src/data/blog.ts` — added `getBlogFaqs()` parser
- `src/components/seo/JsonLd.tsx` — added `BlogFAQPageJsonLd`
- `src/app/(storefront)/blog/[slug]/page.tsx` — wired in FAQ schema + visible "Updated" date
