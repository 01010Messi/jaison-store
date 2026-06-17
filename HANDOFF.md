# Jaison Herbals — Session Handoff

**Date:** 17 June 2026 · **Branch:** `redesign/v2` · **Last commit:** `95fe6b5`

---

## What was built this session (session 16 — hero polish + nav mega-menu)

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

### Files changed this session
```
src/components/home/HeroSection.tsx          (CTA fills, heading color/size, alignment — 6 commits)
src/components/layout/Header.tsx             (DropdownMenu → MegaMenuBanner banner mega-menu)
CLAUDE.md                                     (feature log entry)
HANDOFF.md                                    ← this file (rewritten)
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
- Muted text minimum `/60` on cream, `/70` on bark (for readable content; `/30` = decorative/placeholder only)
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
