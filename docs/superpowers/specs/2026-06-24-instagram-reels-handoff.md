# Instagram Reels Section — Session Handoff

**Date:** 2026-06-24  
**Branch:** `feature/instagram-reels`  
**Status:** Complete — ready for review and merge to `main`

---

## What Was Built This Session

A new **Instagram Reels section** on the homepage, replacing the old placeholder masonry tile grid. The section lives between `TestimonialsSection` and `BlogSection`.

### Files changed / created
| File | Change |
|---|---|
| `src/app/(storefront)/page.tsx` | Uncommented `InstagramSection` import + render |
| `src/components/home/InstagramSection.tsx` | Stripped masonry tiles; header copy updated; spacing tightened |
| `src/components/home/InstagramReels.tsx` | Server component — fetches Ubtan product from DB (falls back to hardcoded ₹440 if no `DATABASE_URL`) |
| `src/components/home/InstagramReelCard.tsx` | Client component — iframe embed + bark product footer + add-to-potli cart integration |

### Card design
- **Video**: Instagram Reel iframe at 9:16 aspect ratio, Instagram header clipped (`margin-top: -56px`)
- **Engagement bar hidden**: `margin-top: -240px` on the bark footer covers Instagram's "View more / likes / comments" row
- **Footer**: solid bark `#1A3C34`, all text ≥ 6.7:1 WCAG AA contrast
  - "— Buy the product" eyebrow label
  - 72×72 product thumbnail
  - Product name, price, `@handle`
  - "+ Potli" add-to-cart button (shows "Added ✓" for 2s)
- **Mobile**: horizontal scroll (`overflow-x-auto`, cards `w-[260px]`)
- **Desktop**: 3-column grid (`md:grid md:grid-cols-3`)

### 3 Reels embedded
| Handle | Shortcode | Location |
|---|---|---|
| @nashikinanutshell | `DBv5wqmsQIZ` | Nashik |
| @tanyathevar | `DBzM4sOqX_f` | TT × Jaison |
| @loveena_thevar | `DBse3TQNS72` | Gifted |

All 3 are collaboration reels featuring **Ubtan Powder** (₹440). Diwali content — hold for seasonal reuse Oct 2026 or swap for evergreen reels when available.

### Highlights icons (Higgsfield — separate from website code)
9 Instagram Highlights cover icons generated in **gold line-art on parchment `#EFE4C5`** to match @jaison_skincare brand (gold botanical logo on cream background). Saved in `docs/instagram-content-plan-jun2026.md`.

| # | Title | Filename |
|---|---|---|
| 1 | Our Story | `hf_20260624_044152_9144a8ba` |
| 2 | Shop | `hf_20260624_044154_9a6b8023` |
| 3 | Skincare | `hf_20260624_044156_1a2aeec8` |
| 4 | Hair Care | `hf_20260624_044157_f2103fac` |
| 5 | Ingredients | `hf_20260624_044159_ce43a226` |
| 6 | Rituals | `hf_20260624_044201_76137f5e` |
| 7 | Reviews | `hf_20260624_045020_3ab470c2` |
| 8 | FAQ | `hf_20260624_044530_f641a6c0` |
| 9 | Offers | `hf_20260624_044205_e322c9d3` |

**Note:** Some icons have slightly different parchment tones — use Canva to place gold line-art on an exact `#EFE4C5` fill for perfect consistency across all 9.

---

## Pending / Next Steps

1. **Merge to main** — run `npm run build` to verify, then merge `feature/instagram-reels` → `main` and `vercel --prod --yes`
2. **Swap Diwali reels** — when evergreen collab reels are available, update the 3 shortcodes in `InstagramReels.tsx` (`REELS` array)
3. **Add Highlights to Instagram** — post each icon as a Story → add to Highlight → set as cover (must have a Story to create a Highlight; icons are all generated)
4. **Highlights background consistency** — open Canva, create 1024×1024 canvas, fill with `#EFE4C5`, place each downloaded icon on top, export for pixel-perfect uniformity
5. **30-day content calendar** — full plan + captions + hashtags in `docs/instagram-content-plan-jun2026.md`

---

## Next Session Prompt

```
Continuing the Jaison Skincare Instagram reels feature from 2026-06-24.

Read the handoff doc at:
docs/superpowers/specs/2026-06-24-instagram-reels-handoff.md

Branch: feature/instagram-reels

The Instagram Reels section is complete and ready to merge. Tasks for this session:

1. Run `npm run build` to verify no build errors
2. Merge feature/instagram-reels → main
3. Deploy: vercel --prod --yes
4. Verify the live site at https://jaisonskincare.com shows the reel cards correctly

After deploy, next priorities from CLAUDE.md roadmap:
- Delivery/Shipping admin page (src/app/admin/shipping/page.tsx)
- Email shipping notifications when admin marks order SHIPPED
```
