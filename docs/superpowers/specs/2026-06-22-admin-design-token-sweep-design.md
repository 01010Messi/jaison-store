# Admin Pages — Design Token Sweep

## Why
Admin already uses the correct fonts (Cormorant headings, DM Sans body) and mostly the correct brand color tokens. The gap is two mechanical drifts from `DESIGN.md`, both predating the `rounded-sm` retirement and the brand-color-token convention:

1. **`rounded-sm` (retired)** — 68 occurrences across 9 files, never updated when DESIGN.md retired it.
2. **Generic Tailwind colors** instead of brand tokens — order-status map and two destructive-action controls.

No layout, spacing, or behavior changes. No component swaps (native `<select>` stays native, per user decision).

## Radius mapping (per DESIGN.md §4)
- **`rounded-xl`** — cards, section/filter panels, table wrappers, stat tiles, info rows, image/thumbnail containers, the image-upload dropzone.
- **`rounded-lg`** — text inputs, textareas, native `<select>`.
- **`rounded-full`** — buttons (Add/Export/Apply/etc.), icon-only buttons (edit/delete/move/approve/reject/toggle/back-arrow), small chips/tags (e.g. "Main" image badge, category-tag pills).

## File-by-file occurrence classification (68 total)

| File | xl (panel/card/image) | lg (input) | full (button/icon/chip) |
|---|---|---|---|
| `admin/page.tsx` | lines 149,166,216,249,275,306,311,322,336,362 (10) | — | — |
| `admin/orders/page.tsx` | line 192 | line 165 | line 150 |
| `admin/products/page.tsx` | lines 83,100,114 | — | lines 67,74,92 |
| `admin/products/ProductForm.tsx` | lines 416,493,503,552,593,677,728,771 | lines 428,445,457,473,609,625,638,653,664,783 | lines 374,513,521,529,537,695 |
| `admin/categories/page.tsx` | lines 216,228 | line 329 | line 208 |
| `admin/coupons/page.tsx` | lines 266,276,472 | lines 391,535 | lines 258,338,647 |
| `admin/customers/page.tsx` | lines 92,119,258,266,293 | line 114 | — |
| `admin/messages/page.tsx` | lines 204,356,411 | — | — |
| `admin/reviews/page.tsx` | lines 109,125 | — | lines 173,180 |

## Color token mapping
- `admin/page.tsx` `statusColors` map (text-amber-600/blue-600/purple-600/sky-600/green-600/red-600) → reuse the same semantics already established in `admin/orders/page.tsx`'s `statusBadgeVariant`: PENDING→gold-deep, CONFIRMED/PROCESSING→bark/72, SHIPPED/DELIVERED→sage-dark, CANCELLED→terracotta.
- `admin/page.tsx:374` low-stock `text-red-600`/`text-amber-600` → terracotta / gold-deep (DESIGN.md's gold-deep is the accessible gold text accent on cream).
- `ProductForm.tsx:396` delete button (`text-red-500 hover:text-red-600 hover:bg-red-50`) → `text-terracotta hover:text-terracotta-dark hover:bg-terracotta/10` (same precedent as the existing "Cancelled" badge exception — terracotta already serves as the brand's error/destructive accent).
- `ProductForm.tsx:529` remove-image icon button (`bg-red-500/90 text-white hover:bg-red-600`) → `bg-terracotta/90 text-cream hover:bg-terracotta-dark`.

## Verification
`npx tsc --noEmit` and `npm run build` must stay clean (no behavior change expected — pure className edits). No screenshot verification needed for this pass; owner verifies visually per established workflow.
