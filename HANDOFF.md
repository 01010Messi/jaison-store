# Jaison Herbals — Session Handoff

**Date:** 17 June 2026 · **Branch:** `redesign/v2` · **Last commit:** (this session's commit)

---

## What was built this session (session 15 — design polish: bento grid, blog hero, shop pill)

User flagged 3 visual issues via screenshots and asked for fixes using `/impeccable`, `/gpt-taste`, `/high-end-visual-design`, `/karpathy-guidelines`, with the hard constraint "the design should be consistent with the current layout."

1. **Home Instagram bento grid had uneven gaps/alignment** — root cause: CSS Grid (`grid-cols-2 md:grid-cols-4`) combined with `items-start` and each tile's independent `aspect-ratio` produced jagged row heights. Fix: switched to CSS multi-column masonry (`columns-2 md:columns-4` + `break-inside-avoid` per tile) in `src/components/home/InstagramSection.tsx` — zero-dependency, no GSAP/JS masonry lib needed (would have violated "consistent with current layout" + karpathy's simplicity-first principle). All 8 tiles' colors/captions/motifs/aspect ratios untouched. Verified visually via headless-browser screenshot.
2. **Blog hero had 3 ghost boxes overlapping the heading** — removed a decorative watermark `<div>` (3 faint rectangle outlines) from the hero section in `src/app/(storefront)/blog/page.tsx`. Verified visually.
3. **Shop "ALL" filter pill "colored weirdly"** — investigated exhaustively (source, `globals.css` CSS vars, `tailwind.config.ts`, live `curl` of rendered HTML, screenshot). Found **no code discrepancy**: the pill already uses the canonical `var(--color-bark)` token, identical to the POTLI cart button and consistent with the documented rule "Active filter pills → bark bg, not terracotta." Presented finding to user, who confirmed it's fine — no change made.

Why `gpt-taste`/`high-end-visual-design`'s aggressive prescriptions (banned existing fonts, GSAP requirement, dark OLED themes, glassmorphism) were NOT applied: they directly conflict with the user's explicit "consistent with current layout" instruction and with `impeccable`'s identity-preservation principle ("when the existing brand has already committed to a font/lane, identity-preservation wins") and karpathy's simplicity-first/surgical-changes principle. Only the relevant useful idea (gapless bento packing) was extracted from those skills.

### Verification performed
- `npx tsc --noEmit` — no errors
- Headless-browser (Playwright, npx-cached) screenshots of home Instagram section, blog hero, and shop filter pills, before/after
- Live `curl` of shop page's rendered HTML to confirm the ALL pill's actual computed style

### Note: admin shipping page work was paused, not resumed
Earlier in session 15 (before the design-fix pivot), research began on `src/app/admin/shipping/page.tsx` (API routes + UI, using existing `src/lib/shiprocket.ts`). The user rejected a scaffolding `mkdir` tool call and redirected to the 3 design fixes above. **This work was not resumed — treat it as not started.**

---

## Current branch state

All work from this session committed. Not yet pushed — push when ready:
```
git push origin redesign/v2
```

### Files changed this session
```
src/components/home/InstagramSection.tsx   (grid → columns masonry)
src/app/(storefront)/blog/page.tsx          (removed 3-box watermark div)
CLAUDE.md                                    (feature log entry)
HANDOFF.md                                   ← this file (rewritten)
```

---

## What's next — ordered by impact

### 1. Decide fate of the 8 orphaned home components (carried over from session 10, still deferred)
- `BlogPreview.tsx`, `NewsletterSection.tsx`, `TrustPillars.tsx`, `WhyJaisonTeaser.tsx`, `WhyPowderTeaser.tsx`, `CategoryShowcase.tsx`, `BrandStory.tsx`, `TrustBadgeBar.tsx` — not imported anywhere in `src/app`. Owner explicitly deferred again this session ("for now let them be, we will decide on this in sometime") — surface again before further homepage work, don't bring it up unprompted.

### 2. Admin shipping page
- `src/app/admin/shipping/page.tsx`; Shiprocket API already in `src/lib/shiprocket.ts` (`checkServiceability`, `createShiprocketOrder`, `generateAWB`, `getTrackingInfo`, token caching with 9-day refresh).
- Relevant Prisma `Order` fields: `shiprocketOrderId`, `shiprocketShipmentId`, `trackingNumber`, `trackingUrl`, `estimatedDelivery`, `invoiceUrl`.
- Was paused mid-research this session before the design-fix pivot — start fresh, no scaffolding exists yet.

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
- `impeccable` v3.1.1 (plugin) — `/impeccable craft|shape|critique|audit|polish|...`; DESIGN.md is the loaded context, `register: brand` for storefront pages
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
