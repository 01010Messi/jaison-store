# Jaison Herbals — Session Handoff

**Date:** 20 June 2026 · **Branch:** `redesign/v2` · **Last commit:** `59ece33`

---

## What was built this session (session 18 — orange accent → gold accent, WCAG fix)

User flagged a bright orange accent color in three screenshots (why-powder hero, our-story heading x2) as off-brand and asked for a golden/earthy-gold replacement that passes WCAG. `grep` across the codebase found the same hardcoded hex, `#E26713`, in 12 places — not just the 3 visible in the screenshots — none of them routed through a `DESIGN.md` token, which is why session 17's token-based contrast sweep missed it entirely.

**Measured:** 2.9:1 on bark (why-powder hero), 3.15:1 on cream (our-story, find-your-ritual) — both fail the 4.5:1 AA floor; the find-your-ritual occurrences are 9px text, no large-text exemption available.

**Fix:** Added one new token, `gold-deep` (`#7A5012`) — gold accent text for light cream/parchment backgrounds, 6.5:1 on cream / 5.6:1 on parchment. Reused the existing `gold-light` (`#D2BA96`) token — gold accent text for dark/mid backgrounds (bark, terracotta), 6.4:1 on bark / 4.0:1 on terracotta (AA-large; all terracotta-background uses are display-size text ≥36px). Two purely decorative, non-text uses (the why-powder watermark, `shadow-gold`) were re-tinted from orange to the actual `gold` hue for visual consistency — no contrast requirement applies to either.

**Files touched:**
```
src/app/globals.css                                              (new --color-gold-deep var)
tailwind.config.ts                                                (gold.deep token, shadow-gold re-tinted)
src/app/(storefront)/why-powder/page.tsx                          (eyebrow + heading accent → gold-light, watermark re-tinted)
src/app/(storefront)/our-story/page.tsx                           (2 heading accents → gold-deep)
src/components/home/WhyPowderTeaser.tsx                           (heading accent → gold-light)
src/app/(storefront)/find-your-ritual/FindYourRitualContent.tsx   (6 `dot` values → #7A5012, kept as raw hex — string-concatenated with an alpha suffix for box-shadow glows, can't be a CSS var)
DESIGN.md                                                         (gold-deep documented, stale "sanctioned #E26713" note removed)
ACCESSIBILITY-AUDIT.md                                            (new finding #13, full reason/fix/result)
CLAUDE.md                                                         (feature-log entry)
```

Verified: `grep -rni "e26713\|226, *103, *19"` across `src/` and `tailwind.config.ts` returns zero hits (only the explanatory code comment mentions the old hex). No browser/screenshot check this session — user had already verified visually before this handoff was written ("dont screenshot i already checked").

Committed and pushed to `origin/redesign/v2`. Nothing pushed to `main`, nothing deployed, per standing instruction.

---

## Previous session (session 17 — full color/contrast/typography accessibility audit + fix pass)

Two-part request: (1) audit color palette/typography/contrast against WCAG AA/AAA + mobile sunlight glare, no fixes yet; (2) fix everything found, document it, commit + push to `redesign/v2` only.

Full findings, measured ratios, fix, and reasoning per item: **`ACCESSIBILITY-AUDIT.md`** (new file, 12 findings + 1 investigated-no-change).

**Highest-leverage fix:** the site's own documented muted-text floor, `text-bark/60`, measured 3.59:1 — below the 4.5:1 AA threshold — and was in use 275× across 51 files. Swept sitewide to `text-bark/72` (5.02:1 cream / 4.53:1 parchment) via `sed`, then `DESIGN.md` §5 updated to document `/72` as the new floor (with the measured numbers inline so nobody has to re-derive them).

Also fixed in the same pass: Newsletter "Subscribe" button (cream-on-gold, 2.56:1 → switched to the existing `primary` variant, 7.18:1); `Badge` `gold` variant used by Featured/Low Stock/COD tags (2.91:1 → `text-bark`, 10.56:1); 3 of 8 homepage Instagram tiles had invisible light-on-light handle text (as low as 1.15:1) — fixed via a per-tile `textOn: "light"|"dark"` branch; order-detail status pills and step-timeline labels/icons below floor; leftover `bark/35`–`/40` text on legal pages and `find-your-ritual`; newsletter caption and header cart-badge near-misses; hero video scrim's weakest gradient stop (sat directly behind the opaque headline with no contrast guarantee against a dark video frame — raised 0.08 → 0.20 minimum); `ProductFAQ` accordion titles thickened `font-light` → `font-normal` (a stroke-weight/sunlight-glare fix, not a ratio failure — color was already solid `bark`).

Deliberately left unchanged: the "Cancelled" order-status badge's off-token Tailwind red (`red-50`/`red-700`) — measures 5.91:1, passes comfortably, and `DESIGN.md` already sanctions off-brand red for error/destructive states (recognizability > palette purity).

Verified: `npx tsc --noEmit` clean, `npm run lint` → 0 errors (3 pre-existing unrelated warnings). No browser/screenshot verification this session — not requested, and the change set is contrast-ratio math + an established AA-passing token, not new visual composition.

Committed as `f7549fd`, pushed to `origin/redesign/v2`. Nothing pushed to `main`, nothing deployed, per standing instruction.

---

## Previous session (session 16 — hero polish + nav mega-menu)

Two threads of work, both via iterative screenshot + instruction rounds, `/impeccable` and `/karpathy-guidelines` invoked for the ambiguous ones.

### 1. Hero section iteration (`src/components/home/HeroSection.tsx`)
A back-and-forth sequence of small, explicit visual fixes:
- "Read Why Powder" CTA changed from a translucent fill (`rgba(26,60,52,0.65)`) to a solid `var(--color-bark)` background.
- Heading words "bottle", "lists a", "dozen" changed from faded rgba opacity steps to solid `var(--color-bark)` (the `gw1`-`gw6` letter-glow sweep animation classes were left untouched — only the base text color changed).
- CTA row aligned with the fixed `WhatsAppButton` (`bottom-20 md:bottom-6`, 48px circle): row padding set to `pb-20 md:pb-6` to mirror WhatsApp's own offset, giving near-identical vertical centers without an arbitrary pixel guess.
- Several rounds of heading font-size scaling ("reduce by 0.75", "increase by 0.45", "reset to original then reduce by 0.25", "increase by 10%") — each colloquial instruction resolved as standard ×(1±X) percentage scaling. Final size: `clamp(2.475rem, 7.425vw, 9.075rem)`.
- CTA wrapper horizontal position tuned (`paddingRight` 72px → 104px → 40px) per explicit "shift right closer to the boundary" instruction.
- Earlier in the session (commits `3852f4f`, `544dfda`, not yet documented from a prior unlabeled session): logo enlarged across header/auth pages, hero CTAs enlarged, cart "You may also like" cross-sell moved into the cart's scrollable area.

Per explicit user instruction mid-session — **"dont check by screenshoting i will do it, just make the changes and commit"** — no browser/screenshot verification was used for any of these; each change was implemented and committed directly, verification left to the user.

### 2. Nav dropdown → full-width mega-menu (`src/components/layout/Header.tsx`)
User provided a reference screenshot of an offline HTML mockup showing the "Skin Care"/"Hair Care" hover menu as a full-width banner (colored dot + product name + one-line benefit subtitle, horizontal row spanning the viewport) instead of the existing small rounded dropdown box.

- Added a `subtitle` field to every entry in `skinCareItems` and `hairCareItems`, copy distilled from real `src/data/products.ts` descriptions (e.g. Neem → "Acne & blemish control", Orange Peel → "Vitamin-C brightener").
- Replaced the old `DropdownMenu` component (rendered per nav item, narrow) with a new `MegaMenuBanner` component rendered once, as a direct child of the `fixed` `<header>` itself, positioned `absolute left-0 right-0 top-full` — this is what makes it span the full viewport width and sit below the *entire* multi-row header rather than under a single nav item.
- Reused the existing hover-intent state machine unchanged: `openDropdown` (`"skin" | "hair" | null`), `handleDropdownEnter`/`handleDropdownLeave` (150ms close delay) — just reattached to the single banner's `onMouseEnter`/`onMouseLeave` instead of two separate per-item dropdowns.
- Verified: `grep` confirmed no stale `DropdownMenu` references remain; `npx tsc --noEmit` passed clean.

Committed as `95fe6b5`.

---

## Current branch state

All work from this session committed and pushed to `origin/redesign/v2`.

### Files changed this session (18)
```
src/app/globals.css                                              (new --color-gold-deep var)
tailwind.config.ts                                                (gold.deep token, shadow-gold re-tinted)
src/app/(storefront)/why-powder/page.tsx                          (eyebrow + heading accent + watermark)
src/app/(storefront)/our-story/page.tsx                           (2 heading accents)
src/components/home/WhyPowderTeaser.tsx                           (1 heading accent)
src/app/(storefront)/find-your-ritual/FindYourRitualContent.tsx   (6 dot values)
DESIGN.md                                                         (gold-deep documented)
ACCESSIBILITY-AUDIT.md                                            (finding #13)
CLAUDE.md                                                         (feature log entry)
HANDOFF.md                                                        ← this file (rewritten)
```

### Files changed session 17 (for reference)
```
ACCESSIBILITY-AUDIT.md                        (new — full audit report, 12 findings)
DESIGN.md                                     (muted-text floor /60 → /72, documented with measured ratios)
CLAUDE.md                                     (feature log entry)
HANDOFF.md                                    ← this file (rewritten)
51 .tsx files                                 (text-bark/60 → text-bark/72, 275 occurrences via sed)
src/components/ui/Badge.tsx                   (gold variant text color)
src/components/home/NewsletterSection.tsx     (Subscribe button variant, caption opacity)
src/components/layout/Header.tsx              (cart/wishlist count badge bg)
src/components/home/InstagramSection.tsx      (per-tile light/dark handle text)
src/components/home/HeroSection.tsx           (scrim gradient floor raised)
src/components/product/ProductFAQ.tsx         (title weight light → normal)
src/app/(storefront)/account/orders/[id]/page.tsx  (status pills, step-timeline)
privacy-policy/terms/returns-policy pages     (footer text opacity)
src/app/(storefront)/find-your-ritual/FindYourRitualContent.tsx  (eyebrow/price/note opacity)
```

### Files changed session 16 (for reference)
```
src/components/home/HeroSection.tsx          (CTA fills, heading color/size, alignment — 6 commits)
src/components/layout/Header.tsx             (DropdownMenu → MegaMenuBanner banner mega-menu)
```

---

## What's next — ordered by impact

### 1. Decide fate of the 8 orphaned home components (carried over from session 10)
- `BlogPreview.tsx`, `NewsletterSection.tsx`, `TrustPillars.tsx`, `WhyJaisonTeaser.tsx`, `WhyPowderTeaser.tsx`, `CategoryShowcase.tsx`, `BrandStory.tsx`, `TrustBadgeBar.tsx` — not imported anywhere in `src/app`. Owner has deferred twice; surface again before further homepage work, don't bring it up unprompted.

### 2. Admin shipping page
- `src/app/admin/shipping/page.tsx`; Shiprocket API already in `src/lib/shiprocket.ts` (`checkServiceability`, `createShiprocketOrder`, `generateAWB`, `getTrackingInfo`, token caching with 9-day refresh).
- Relevant Prisma `Order` fields: `shiprocketOrderId`, `shiprocketShipmentId`, `trackingNumber`, `trackingUrl`, `estimatedDelivery`, `invoiceUrl`.
- No scaffolding exists yet — paused twice now (sessions 15 and earlier) before design-fix pivots.

### 3. Email shipping notifications
- Trigger in `src/app/api/admin/orders/route.ts`; order confirmation already in `src/lib/email.ts`.
- Add "Order dispatched" email when admin marks status SHIPPED.

### 4. IndexNow
- Generate key, place at `public/<key>.txt`, submit on content publish.

### 5. Google Search Console
- Submit sitemap once `redesign/v2` merges to production (`main`).

### 6. (Optional, low priority) Fix orphan Address rows
- `Address` rows written before stock-guard transaction in both checkout routes, leaving orphans on failed attempts. Move address creation inside the same transaction, or only persist after it succeeds. See `RESILIENCE-AUDIT.md`.

### Deferred, no current trigger
- **Tooltip / Table components** — build only when a real feature needs one.
- **GEO score (~69/100)** — remaining gap is owner-dependent (founder bio/Person schema, social/brand presence, video content). Shelved per owner decision.
- **Neon connection string tuning** (`?connection_limit=1&pool_timeout=10`) — Vercel env var change, owner action if desired.

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
| Social/brand presence (YouTube, Reddit, LinkedIn, Wikipedia) | **GEO authority score** |

---

## Skills/agents installed (user scope)

- `claude-seo` v2.2.0 (agricidaniel) — `/seo-audit`, `/seo-geo`, `/seo-page`, `/seo-schema`, `/seo-content`, etc.
- `claude-blog` v1.9.1 (agricidaniel) — `/blog-write`, `/blog-audit`, etc.
- `redesign-existing-projects` — design audit patterns
- `frontend-design:frontend-design` — design direction skill
- `impeccable` v3.1.1 (plugin) — `/impeccable craft|shape|critique|audit|polish|...`; DESIGN.md is the loaded context, `register: brand` for storefront pages (no `PRODUCT.md` in this repo — loader reports `hasProduct: false`; full `/impeccable teach` setup has been deliberately skipped for surgical pixel-level fixes, only run it if doing from-scratch design generation)
- `gpt-taste`, `high-end-visual-design` (user-scope skills) — aggressive Awwwards-tier prescriptions; **use selectively** — they conflict with this brand's committed font/color identity unless the user explicitly asks for a from-scratch redesign. Default to `impeccable` + karpathy's surgical-changes principle when fixing existing layout, not these.
- `karpathy-guidelines` (plugin) — simplicity-first, surgical-changes, think-before-coding
- `.claude/agents/chaos-engineer.md` (local, gitignored) — not directly invocable mid-session after being added; works if loaded at session start.

---

## Design rules (never violate)

- No hardcoded hex in `.tsx` — token classes in `className`, `var(--color-*)` in `style={{}}`. Sanctioned one-off decorative hex values must be documented in `DESIGN.md` if they recur.
- `rounded-full` interactive pills, `rounded-xl` cards/modals, `rounded-lg` form fields
- Muted text minimum `/72` on cream/parchment, `/70` on bark (raised from `/60` session 17 — measured 3.59:1, failed AA; see `ACCESSIBILITY-AUDIT.md`). `/60` is fine only for non-text icon fills (3:1 floor), never real text. `/30` = decorative/placeholder only.
- Font classes: `font-heading` (Cormorant), `font-body` (DM Sans), `font-accent` (Inter)
- Eyebrow spec: `font-accent text-[11px] tracking-[0.22em] uppercase`
- Tracking scale — exactly two values: `0.22em` for section eyebrows/static labels; `0.14em` for interactive labels/buttons (form labels, pill CTAs, nav links). Don't mix or invent a third.
- z-index: 0 content / 10 in-section overlays / 20 floating UI / 30 sticky header / 40 backdrops / 50 modals/drawers/toasts (full table in DESIGN.md)
- Padding/rhythm — exactly two tokens: `.section-rhythm` (`py-12 md:py-16`) and `.section-rhythm-lg` (`py-16 md:py-24`). Any other raw `py-*` on a section wrapper is legacy debt to converge.
- Active filter pills → bark bg, not terracotta (re-confirmed session 15 — shop "ALL" pill already correct, no change needed)
- Never add `aggregateRating` to ProductJsonLd — no real reviews yet
- Never fabricate Person/author schema, social profiles, or video content for GEO — only structure truthful, existing content. Off-platform authority building is an owner decision, not a code fix.
- Bento/masonry grids with mixed per-tile aspect ratios → use CSS `columns-N` + `break-inside-avoid`, not CSS Grid with `items-start` (causes uneven row gaps). Established session 15.
- Full-width dropdown/mega-menus must be rendered as a direct child of the `fixed` positioning ancestor (e.g. `<header>`), not nested inside a narrow per-item wrapper, or they won't span the viewport. Established session 16.

## Checkout/backend resilience rules (see RESILIENCE-AUDIT.md)

- Any multi-step write that touches both `Order` and `Product.stock` must be inside a `prisma.$transaction`, with stock decrements guarded by `stock: { gte: quantity }` via `updateMany` — never a bare `update`. **Confirmed working live, session 14.**
- Never write a DB order row before an external payment-gateway call that could fail; call the gateway first. **Confirmed working live, session 14.**
- All outbound `fetch`/SDK calls to third-party services (Telegram, Twilio, Shiprocket, Razorpay) must have a timeout — use `signal: AbortSignal.timeout(8000)` for `fetch`, or the SDK's own timeout option. **Confirmed working live, session 14.**
- Independent notification calls (email, Telegram, WhatsApp) should fire via `Promise.all`/`Promise.allSettled`, not sequential `await`s — each must keep its own `.catch()` so one failure doesn't block the others.
- Use `isTransientDbError()` from `src/lib/prisma.ts` to retry once on Neon's transient `P1001`/`P2024` before treating a DB error as a real failure.
- Known minor issue, not yet fixed: `Address` rows are written before the stock-guard transaction in both checkout routes, leaving orphans on failed attempts.

## Local dev gotcha

No sandbox exists — `vercel env pull` against this project only has Production-environment secrets, and every one of them comes back with a stray literal `\n` appended (breaks Razorpay auth with `401` until stripped). See `CLAUDE.md` "Local Dev Against Production" for the exact recipe.

## Deployment rule

**`redesign/v2` is NEVER deployed directly.**
All work ends at: `git add <files> && git commit -m "..." && git push origin redesign/v2`
Do not run `vercel`, `vercel --prod`, or merge to `main`.
