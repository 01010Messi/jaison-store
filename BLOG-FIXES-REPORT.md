# Blog Audit Fixes — Applied Changes Report

**Date:** 2026-06-16  
**Branch:** redesign/v2  
**Commit:** 38f9315  
**Files changed:** `src/app/(storefront)/blog/[slug]/page.tsx`, `src/data/blog.ts`

---

## 1. renderMarkdown — Blockquote Handler (Critical Bug Fix)

**File:** `src/app/(storefront)/blog/[slug]/page.tsx`  
**Why:** All 10 blog posts contain "Key Takeaways" sections written as Markdown blockquotes (`> **Key Takeaways**`, `> - point`, etc.). The renderer handled `##`, `###`, `- `, `* `, `|`, and empty lines — but had no `>` handler. Those lines fell through to the paragraph handler, rendering as raw text with a literal `>` character visible in the browser. Every post's Key Takeaways box was broken.

**What changed:** Added a `blockquoteLines` accumulator state and a `flushBlockquote()` function. Lines starting with `> ` now push their content (sans prefix) into the accumulator. When the blockquote ends (empty line, heading, or regular content), it flushes as a parchment-background card with a rounded-xl border, an eyebrow label for the heading line (`**Key Takeaways**`), and bulleted list items with gold dots. No side-stripe border (per design rules). Flush calls were added to all branch handlers.

**Impact:** All 10 Key Takeaways boxes now render as visible, machine-readable structured summaries for both users and AI crawlers.

---

## 2. renderMarkdown — Inline Link Rendering

**File:** `src/app/(storefront)/blog/[slug]/page.tsx`  
**Why:** The internal links added to blog content (item 6 below) use standard Markdown link syntax `[text](url)`. Without a link handler in renderMarkdown, they would render as raw `[text](url)` strings in the browser.

**What changed:** Extracted all inline formatting into a shared `fmt()` helper. Added a `[text](url)` → anchor tag replacement at the start of the chain (before bold/italic replacements) producing `<a href="..." class="text-terracotta underline hover:text-terracotta-dark transition-colors">`. This applies to paragraphs, list items, and blockquote body text.

---

## 3. getRelatedPosts — Topically Relevant "Keep Reading"

**File:** `src/data/blog.ts` (lines 1681–1690)  
**Why:** The old function returned the first 3 non-current posts with no category or topic filtering. A Hair Care post would show Skin Care articles in its "Keep Reading" section and vice versa, hurting dwell time and topical authority signals.

**What changed:** The new function finds the current post's category, then collects same-category posts first, then other-category posts as fallback, slicing to the requested limit. Hair Care posts now show other Hair Care posts first; Skin Care posts show other Skin Care posts first.

---

## 4. Meta Title Trimming (8 posts over 60 chars)

**File:** `src/data/blog.ts`  
**Why:** Google truncates titles over ~60 characters in search results. Truncated titles hurt click-through rates.

| Post | Before | After | Chars |
|------|--------|-------|-------|
| Amla | 5 Benefits of Amla Powder for Hair Growth — How to Use Amla for Hair | Amla Powder Benefits for Hair Growth — How to Use Amla | 54 |
| Multani | Multani Mitti Face Pack: 7 DIY Recipes for Oily, Dry & Combination Skin | Multani Mitti Face Pack: 7 Recipes for All Skin Types | 53 |
| Shikakai | Natural Hair Wash with Shikakai, Reetha & Amla — Complete Guide | Natural Hair Wash: Shikakai, Reetha & Amla Guide | 49 |
| Neem | Neem Powder for Acne: How to Use Neem for Clear Skin Naturally | Neem Powder for Acne: Clear Skin Naturally with Neem | 52 |
| Orange Peel | 6 Benefits of Orange Peel Powder for Face — DIY Recipes & Tips | Orange Peel Powder for Face: 6 Benefits & DIY Recipes | 54 |
| Bhringraj | Bhringraj Powder for Hair Growth — Benefits, Uses & DIY Recipes | Bhringraj Powder for Hair Growth — Benefits & Uses | 51 |
| Reetha | Reetha (Soapnut) for Hair: Benefits, Uses & Natural Hair Wash Recipes | Reetha (Soapnut) for Hair: Benefits & Natural Wash | 51 |
| Mehendi | Mehendi (Henna) for Hair: How to Use Henna for Natural Hair Colour | Mehendi (Henna) for Hair: How to Use for Natural Colour | 55 |

---

## 5. Meta Description Trimming (5 posts over 160 chars)

**File:** `src/data/blog.ts`  
**Why:** Google truncates meta descriptions over ~160 characters. Truncated descriptions appear as "..." in search results and reduce click-through rates.

| Post | Before (chars) | After (chars) | Change |
|------|----------------|---------------|--------|
| Ubtan | 162 | 153 | Removed "ancient" |
| Amla | 163 | 156 | Removed "powder" after second "amla" |
| Shikakai | 169 | 155 | Trimmed opening "Learn how to " |
| Neem | 163 | 157 | Removed "daily" before "routines" |
| Mehendi | 165 | 153 | Tightened closing phrase |

---

## 6. Bhringraj Post — Wrong Image Fixed

**File:** `src/data/blog.ts` (Bhringraj post `image` field)  
**Why:** The Bhringraj blog post was using `/images/blog/nagmotha-front.webp` — the Nagarmotha plant image — as its hero/OG image. No dedicated Bhringraj image exists in the project. Showing the wrong herb image is misleading and would confuse users who arrive from search.

**What changed:** Image replaced with `/images/blog/neem-styled.webp` as a temporary placeholder. Both are dark-leaf Ayurvedic herb imagery and visually appropriate pending a proper Bhringraj image.

---

## 7. Internal Links — Blog Graph Connected (0 → 10 links)

**File:** `src/data/blog.ts`  
**Why:** All 10 posts had zero internal links to other blog posts. The link graph was fully disconnected: every post was simultaneously an orphan (0 inbound) and a dead-end (0 outbound) from the blog's perspective. Google cannot distribute PageRank or understand topical relationships between posts in a disconnected graph.

**What changed:** Added one contextual internal link per post, inserted into existing content paragraphs where the link is topically natural:

| Post | Link Added | Target |
|------|-----------|--------|
| Ubtan | "works best as the weekly exfoliating step in a complete Ayurvedic skincare routine" | /blog/ayurvedic-skincare-routine-for-beginners |
| Amla | "For precise ratios and a full washing method, see the Shikakai, Reetha & Amla natural hair wash guide" | /blog/natural-hair-wash-shikakai-reetha-amla |
| Multani | "For a deeper guide to neem alone, read how to use neem powder for clear skin" | /blog/neem-powder-for-acne-clear-skin |
| Shikakai | "To understand amla's full range of benefits for hair beyond this routine..." | /blog/amla-powder-benefits-for-hair-growth |
| Neem | "For the full range of Multani Mitti face pack recipes for oily skin..." | /blog/multani-mitti-face-pack-recipes |
| Ayurvedic Routine | "see the full ubtan guide for glowing skin for recipe variations and timing" | /blog/how-to-use-ubtan-for-glowing-skin |
| Orange Peel | "pair it with ubtan as a weekly exfoliating mask" | /blog/how-to-use-ubtan-for-glowing-skin |
| Bhringraj | "similar to amla powder" (link on "amla powder") | /blog/amla-powder-benefits-for-hair-growth |
| Reetha | "follow the complete Shikakai, Reetha & Amla natural hair wash method" | /blog/natural-hair-wash-shikakai-reetha-amla |
| Mehendi | "Amla tones down the red..." (link on "Amla") | /blog/amla-powder-benefits-for-hair-growth |

---

## What Was Not Changed

- **Article schema author type** (`@type: Organization` vs `Person`) — requires a named author persona to be created first; no named expert exists in the project currently.
- **External study citations** — studies are cited in prose but not hyperlinked to PubMed. Out of scope; requires editorial review of each citation.
- **Ayurvedic Routine relatedProducts** — the audit script falsely flagged this as missing. The post already has `relatedProducts: ["ubtan-powder", "multani-mitti", "neem-powder", "orange-peel-powder"]`. No change needed.
- **Shikakai meta title** (63 chars, above 60) — the audit initially flagged this. It was trimmed as part of item 4.

---

## Estimated Score Impact

Based on the audit rubric (Content/25, SEO/20, E-E-A-T/20, Technical/15, AI Citation/20):

| Category | Before | After |
|----------|--------|-------|
| SEO — meta titles in spec | 2/10 | 10/10 |
| SEO — meta descriptions in spec | 5/10 | 10/10 |
| Technical — correct images | 9/10 | 10/10 |
| Technical — blockquote rendering | 0/10 | 10/10 |
| AI Citation — Key Takeaways visible | 0/10 | 10/10 |
| Internal link graph | 0/10 | 5/10 (partial — 1 per post vs. 2–3 target) |

Projected average score improvement: 65/100 → ~78/100.
