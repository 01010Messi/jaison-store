# Blog Audit Report — Jaison Skincare

**Audit Date:** 2026-06-16  
**Total Posts:** 10  
**Average Score:** 65.2/100  
**Tool:** claude-blog v1.9.1 (blog-audit skill)

---

## Health Overview

| Metric | Count |
|--------|-------|
| Posts Scoring 70+ (Good) | 0 |
| Posts Scoring 60–69 (Needs Work) | 10 |
| Posts Scoring < 60 (Poor) | 0 |
| Orphan Pages (0 inbound internal links) | 10 / 10 |
| Dead-End Pages (0 outbound internal links) | 10 / 10 |
| Cannibalization Risk | 3 topic clusters |
| Stale Content (90+ days) | 0 |
| Missing Blog Images | 1 (Bhringraj using wrong image) |
| Rendering Bugs | 1 critical (blockquote handler absent) |

---

## Critical Bugs

### 1. `renderMarkdown` Has No Blockquote Handler — Affects All 10 Posts

**File:** `src/app/(storefront)/blog/[slug]/page.tsx` — `renderMarkdown` function  
**Impact:** All 10 posts have "Key Takeaways" boxes written in Markdown blockquote syntax (`> **Key Takeaways**`). The renderer handles `##`, `###`, `- `, `* `, `|`, and empty lines — but **not `>`**. Lines starting with `>` fall through to the paragraph handler and render as raw text with a literal `>` character visible to the user.

This means:
- All 10 "Key Takeaways" boxes are broken on every post
- Bold text inside the blockquote doesn't render bold
- AI crawlers see these as prose paragraphs, not citation-ready callout boxes

**Fix:** Add a blockquote handler before the fallthrough paragraph case in `renderMarkdown`.

---

### 2. ZERO Internal Links Between All 10 Posts

**Impact:** Every post links to 0 other blog posts. The link graph is fully disconnected — all posts are simultaneously orphans and dead-ends from each other's perspective. The only inbound links to any post come from the `/blog` listing page.

This has three consequences:
- Google cannot understand topic clusters or authority flow between posts
- PageRank from any external links to one post does not distribute to others
- AI crawlers have no passage-level context about how topics relate

**Fix:** Add 2–3 contextual internal links per post to topically related posts. Priority matrix below.

---

## Per-Post Scores

| Post | Score | Content /25 | SEO /20 | E-E-A-T /20 | Technical /15 | AI Cite /20 | Issues |
|------|-------|-------------|---------|-------------|---------------|-------------|--------|
| Ubtan — Glowing Skin | 68 | 21 | 13 | 12 | 9 | 13 | meta desc 2 chars over, blockquote bug |
| Amla — Hair Growth | 65 | 20 | 11 | 12 | 9 | 13 | meta title 68ch, meta desc 163ch, blockquote bug |
| Multani — 7 Recipes | 66 | 21 | 11 | 12 | 9 | 13 | meta title 71ch, blockquote bug |
| Shikakai+Reetha+Amla | 67 | 21 | 12 | 12 | 9 | 13 | meta desc 168ch, blockquote bug |
| Neem — Acne | 65 | 20 | 11 | 12 | 9 | 13 | meta title 62ch, meta desc 163ch, blockquote bug |
| Ayurvedic Routine | 63 | 17 | 13 | 12 | 8 | 13 | 0 relatedProducts, blockquote bug |
| Orange Peel — Face | 65 | 20 | 11 | 12 | 9 | 13 | meta title 62ch, blockquote bug |
| Bhringraj — Hair | 62 | 19 | 11 | 12 | 7 | 13 | wrong OG image (nagmotha), meta title 63ch, blockquote bug |
| Reetha — Hair Wash | 65 | 21 | 10 | 12 | 9 | 13 | meta title 69ch, meta desc 159ch, blockquote bug |
| Mehendi — Hair Colour | 66 | 22 | 10 | 12 | 9 | 13 | meta title 66ch, meta desc 165ch, blockquote bug |

---

## Prioritized Action Queue

| Priority | Post | Score | Top Issue | Recommended Action |
|----------|------|-------|-----------|-------------------|
| 1 | ALL 10 | — | Blockquote rendering bug | Fix `renderMarkdown` to handle `>` syntax |
| 2 | ALL 10 | — | Zero internal links | Add 2–3 cross-post links per post (matrix below) |
| 3 | Bhringraj | 62 | Wrong OG image | Change image from `nagmotha-front.webp` to any correct Bhringraj herb image |
| 4 | Ayurvedic Routine | 63 | 0 relatedProducts | Add `ubtan-powder`, `neem-powder`, `multani-mitti` to `relatedProducts` |
| 5 | Reetha | 65 | Meta title 69ch | Trim to ≤60 chars |
| 6 | Amla | 65 | Meta title 68ch | Trim to ≤60 chars |
| 7 | Multani | 66 | Meta title 71ch | Trim to ≤60 chars |
| 8 | Mehendi | 66 | Meta desc 165ch | Trim to ≤160 chars |
| 9 | Shikakai | 67 | Meta desc 168ch | Trim to ≤160 chars |
| 10 | ALL | — | `getRelatedPosts` is non-topical | Fix function to filter by category first |

---

## Topic Cannibalization

| Keyword Cluster | Competing Posts | Recommendation |
|----------------|----------------|----------------|
| "hair growth" | Amla (`amla-powder-benefits-for-hair-growth`), Bhringraj (`bhringraj-powder-for-hair-growth`), Shikakai+Reetha+Amla (`natural-hair-wash-shikakai-reetha-amla`) | **Differentiate** — Amla: follicle nutrition; Bhringraj: scalp circulation; Shikakai combo: cleansing routine. Update H1s and opening paragraphs to make the primary angle distinct. |
| "glowing skin" | Ubtan (`how-to-use-ubtan-for-glowing-skin`), Multani (`multani-mitti-face-pack-recipes`), Ayurvedic Routine (`ayurvedic-skincare-routine-for-beginners`) | **Differentiate** — Ubtan: tan removal + brightening; Multani: deep cleanse + oil control; Ayurvedic routine: system-level 5-step framework. Titles already distinct enough; ensure H1 angles stay separate. |
| "dandruff" | Amla (section), Reetha (section), Neem (section) | **No action needed** — each covers dandruff as a secondary benefit, not the primary keyword. Risk is low. |

---

## Orphan Pages — Internal Link Opportunity Matrix

Every post has 0 inbound links from other posts. Suggested cross-links to add (surgical — 1 sentence with link per pairing):

| In This Post | Add Link To | Anchor Suggestion |
|---|---|---|
| Ubtan (skin) | Ayurvedic Routine | "…part of a complete Ayurvedic skincare routine" |
| Ubtan (skin) | Multani Mitti | "…pair with a Multani Mitti deep-cleanse before application" |
| Amla (hair) | Shikakai+Reetha+Amla | "…or combine with Reetha and Shikakai for a full herbal hair wash" |
| Amla (hair) | Bhringraj | "…for even faster results, stack with Bhringraj for scalp circulation" |
| Multani (skin) | Neem | "…oily or acne-prone skin should also consider a neem powder spot treatment" |
| Multani (skin) | Ubtan | "…follow with ubtan once a week for deep brightening on top of oil control" |
| Shikakai combo | Amla | "…amla is the key strengthening ingredient in this trio" |
| Neem (acne) | Multani | "…for oilier acne types, layer with a Multani Mitti pack twice weekly" |
| Ayurvedic Routine | Ubtan | "…step 3: use ubtan as your weekly exfoliating mask" |
| Ayurvedic Routine | Amla | "…step 4: condition with amla for follicle strength" |
| Orange Peel | Ubtan | "…orange peel pairs especially well with ubtan in a brightening combo pack" |
| Bhringraj | Amla | "…combine with amla powder for the most studied natural hair growth stack" |
| Reetha | Shikakai combo | "…the complete reetha + shikakai + amla hair wash method is detailed here" |
| Mehendi | Amla | "…mix in amla powder to deepen colour and add conditioning benefits" |

---

## Stale Content

All 10 posts were last modified **2026-06-16**. No stale content — all within 90 days.

---

## SEO Detail

### Meta Title Lengths (target 50–60 chars)

| Post | Meta Title | Length | Status |
|------|-----------|--------|--------|
| Ubtan | How to Use Ubtan for Glowing Skin — DIY Recipes & Tips | 54 | ✅ |
| Amla | 5 Benefits of Amla Powder for Hair Growth — How to Use Amla for Hair | 68 | ❌ Trim |
| Multani | Multani Mitti Face Pack: 7 DIY Recipes for Oily, Dry & Combination Skin | 71 | ❌ Trim |
| Shikakai | Natural Hair Wash with Shikakai, Reetha & Amla — Complete Guide | 63 | ❌ Trim |
| Neem | Neem Powder for Acne: How to Use Neem for Clear Skin Naturally | 62 | ❌ Trim |
| Ayurvedic | Ayurvedic Skincare Routine for Beginners — 5 Simple Steps | 57 | ✅ |
| Orange Peel | 6 Benefits of Orange Peel Powder for Face — DIY Recipes & Tips | 62 | ❌ Trim |
| Bhringraj | Bhringraj Powder for Hair Growth — Benefits, Uses & DIY Recipes | 63 | ❌ Trim |
| Reetha | Reetha (Soapnut) for Hair: Benefits, Uses & Natural Hair Wash Recipes | 69 | ❌ Trim |
| Mehendi | Mehendi (Henna) for Hair: How to Use Henna for Natural Hair Colour | 66 | ❌ Trim |

**8/10 meta titles need trimming.**

### Meta Description Lengths (target 150–160 chars)

| Post | Length | Status |
|------|--------|--------|
| Ubtan | 162 | ❌ 2 over |
| Amla | 163 | ❌ 3 over |
| Multani | 153 | ✅ |
| Shikakai | 168 | ❌ 8 over |
| Neem | 163 | ❌ 3 over |
| Ayurvedic | 153 | ✅ |
| Orange Peel | 160 | ✅ |
| Bhringraj | 154 | ✅ |
| Reetha | 159 | ✅ |
| Mehendi | 165 | ❌ 5 over |

**5/10 meta descriptions over limit.**

---

## Technical Issues

### Broken / Mismatched Image

**Post:** Bhringraj (`/blog/bhringraj-powder-for-hair-growth`)  
**Current image:** `/images/blog/nagmotha-front.webp` (Nagarmotha plant)  
**Expected:** A Bhringraj herb image  
**Fix:** Replace with a correct Bhringraj image, or — since Bhringraj was removed as a product — use `/images/blog/amla-styled.webp` as a temporary placeholder and update the post's intro to explain the Bhringraj + Amla pairing.

### `getRelatedPosts` Returns Non-Topical Posts

**File:** `src/data/blog.ts` line 1681  
**Current behavior:** Returns the first 3 posts that aren't the current post, ignoring category or topic entirely.  
**Impact:** Skin Care posts show Hair Care "Keep Reading" links; Hair Care posts show Skin Care articles. This hurts both dwell time and topical authority.  
**Fix:**
```ts
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = blogPosts.find(p => p.slug === currentSlug);
  const sameCat = blogPosts.filter(p => p.slug !== currentSlug && p.category === current?.category);
  const others = blogPosts.filter(p => p.slug !== currentSlug && p.category !== current?.category);
  return [...sameCat, ...others].slice(0, limit);
}
```

### Article Schema — Author Type

**File:** `src/components/seo/JsonLd.tsx` line 232  
**Current:** `"@type": "Organization", "name": "Jaison Herbals"`  
**Issue:** For health/beauty YMYL content, Google's E-E-A-T guidelines favour `@type: Person` with expertise credentials. Using `Organization` as author type weakens trust signals. If a named expert is available, switch to `Person`. If not, adding `"knowsAbout": ["Ayurveda", "Herbal Skincare"]` to the Organization entity helps slightly.

### Post 6 — Ayurvedic Skincare Routine Has No `relatedProducts`

**File:** `src/data/blog.ts` line ~837  
**Impact:** The "Shop the Ingredients" CTA section is absent for this post — the only page in the blog that doesn't link to any product. This post's audience (Ayurvedic skincare beginners) is the warmest potential buyer cohort.  
**Fix:** Add to `relatedProducts`:
```ts
relatedProducts: ["ubtan-powder", "neem-powder", "multani-mitti"],
```

---

## AI Citation Readiness

| Signal | Status |
|--------|--------|
| Key Takeaways box in all posts | ✅ written, ❌ not rendering (blockquote bug) |
| FAQ section in all posts | ✅ present and rendering |
| Passage length 120–180 words | ⚠️ most passages are 80–120 words; could be longer |
| Citation capsules | ❌ none |
| External study links | ❌ studies cited but not linked (PubMed etc.) |
| `llms.txt` file | ✅ present at `/public/llms.txt` |
| `ArticleJsonLd` schema | ✅ on all posts with `dateModified` + `wordCount` |

The biggest AI citation lift is fixing the blockquote rendering bug — all 10 Key Takeaways boxes will immediately become machine-readable structured summaries.

---

## Quick Wins (Highest ROI, Lowest Effort)

1. **Fix `renderMarkdown` blockquote handler** — 1 file, ~15 lines. Fixes all 10 posts immediately. Unlocks Key Takeaways visibility for both users and AI crawlers.
2. **Fix `getRelatedPosts`** — 4 lines. Topically relevant "Keep Reading" on every post.
3. **Add `relatedProducts` to Ayurvedic Routine post** — 1 line in `blog.ts`.
4. **Fix Bhringraj post image** — 1 line in `blog.ts`.
5. **Add 2–3 internal links per post** — Content edits in `blog.ts`, roughly 10 sentences total across all posts.

---

## Next Steps

- Run `/blog seo-check` on the 3 lowest-scoring posts (Bhringraj, Ayurvedic Routine, Amla) for deeper on-page analysis
- Run `/blog geo` on Ubtan and Amla (highest-traffic potential) for AI citation optimisation
- Run `/blog cluster` to design a formal Hair Care and Skin Care hub architecture with pillar pages
- Consider adding a named author (Person entity) to the About page and referencing it in `ArticleJsonLd`

---

*Report generated by claude-blog v1.9.1 blog-audit skill. Scores are heuristic assessments — run `/blog analyze <slug>` for detailed per-post breakdowns.*
