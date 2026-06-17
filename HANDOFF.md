# Jaison Herbals — Session Handoff

**Date:** 17 June 2026 · **Branch:** `redesign/v2` · **Last commit:** (this session's commit)

---

## What was built this session (session 13 — checkout resilience hardening)

Goal: install the `chaos-engineer` subagent (from the `awesome-claude-code-subagents` collection) and run a static resilience audit against the checkout/payment/shipping critical path, then fix everything it found.

Full detail with reason/fix/result per finding lives in **`RESILIENCE-AUDIT.md`** — this section is the short version.

### Why a static audit, not live fault injection
This store runs Razorpay in **LIVE mode** against a real Neon Postgres database with no staging environment. The `chaos-engineer` persona (as published) assumes production infra with game days and blast-radius-controlled live experiments — none of that applies here safely, so the audit was scoped to read-only code review only. No live network calls were made at any point.

### Findings and fixes (all 6 implemented, owner-approved in two batches: the two Critical ones first, then the remaining four)

1. **Critical — silent strand:** `payment/verify/route.ts` returned `verified: true` even when no matching order existed after a successful Razorpay signature check, with no error logged. Fixed: explicit `409` + `CRITICAL` log on missing order.
2. **Critical — oversell race condition:** stock decrement had no transaction or stock guard in either the COD (`orders/route.ts`) or Razorpay (`verify/route.ts`) path. Fixed: atomic `updateMany` with `stock: { gte: quantity }` guard, wrapped in `prisma.$transaction` in both routes. COD now rejects with `409` on insufficient stock before creating an order; Razorpay path (money already captured) logs an oversell instead of going negative silently.
3. **High — zombie PENDING orders:** `payment/create-order/route.ts` wrote the DB order before calling Razorpay, so a gateway failure left a permanent unpaid order row. Fixed: reordered to call Razorpay first, only persist the DB row after it succeeds.
4. **High — no timeout, sequential notifications:** Telegram/Shiprocket `fetch()` calls and the Twilio WhatsApp client had no timeout; order-confirmation notifications (email/Telegram/WhatsApp/session-upsert) ran one after another. Fixed: 8s timeout on every outbound call; notifications now fire via `Promise.all`. Also deduped a redundant customer-email lookup in `verify/route.ts`.
5. **Medium — order-number collision:** `JAIS-<date>-<100-999>` only has 900 values/day; a collision (`P2002`) previously dropped the order with a bare 500. Fixed: both order-creation routes retry up to 2x with a fresh number on collision.
6. **Medium — Neon transient errors indistinguishable from bugs:** `P1001`/`P2024` (transient pooler drops/timeouts) looked identical to real bugs in logs. Fixed: added `isTransientDbError()` to `prisma.ts`; the same retry loops from #5 also retry once on a transient connection error.

### What was installed but not used as originally planned
The `chaos-engineer.md` subagent definition was copied into `.claude/agents/chaos-engineer.md` (gitignored, local-only — `.claude/` is excluded from version control in this repo). It turned out the Agent tool doesn't pick up custom project-level agents added mid-session, so the actual audit ran via a `general-purpose` agent instructed to follow that persona's checklist instead. The file is still in place locally for next session if a fresh session wants to invoke it directly as `subagent_type: "chaos-engineer"`.

### Verification performed
- `npx tsc --noEmit` — clean
- `npm run build` — 85/85 static pages, same pre-existing dynamic-server-usage warnings as session 12 (unrelated)
- **Not done:** a live checkout smoke test (one Razorpay order, one COD order) against these changes. All six fixes are static code changes that have not been exercised against real Razorpay/Shiprocket/Telegram/Twilio traffic yet. Recommended before merging `redesign/v2` → `main`.

---

## Current branch state

All work from this session committed and pushed to `origin/redesign/v2`.

### Files changed this session
```
src/app/api/orders/route.ts                  (atomic stock+order transaction, order-number/transient retry, parallel notifications)
src/app/api/payment/create-order/route.ts    (Razorpay-before-DB-write reorder, order-number/transient retry)
src/app/api/payment/verify/route.ts          (missing-order 409, atomic stock transaction, parallel notifications, deduped lookup)
src/lib/prisma.ts                             (isTransientDbError helper)
src/lib/telegram.ts                           (fetch timeout)
src/lib/whatsapp.ts                           (Twilio client timeout)
src/lib/shiprocket.ts                         (fetch timeouts, both call sites)
RESILIENCE-AUDIT.md                           (new — full findings detail)
HANDOFF.md                                    ← this file (rewritten)
CLAUDE.md                                     (feature log updated)
```

---

## What's next — ordered by impact

### 1. Manual checkout smoke test
Run one real Razorpay order and one COD order through the modified flows before merging to `main` — these changes haven't touched live traffic yet.

### 2. Decide fate of the 7 orphaned home components (carried over from session 10, still deferred)
- `BlogPreview.tsx`, `NewsletterSection.tsx`, `TrustPillars.tsx`, `WhyJaisonTeaser.tsx`, `WhyPowderTeaser.tsx`, `CategoryShowcase.tsx`, `BrandStory.tsx` — not imported anywhere in `src/app`. Owner explicitly deferred this — surface again before further homepage work.

### 3. Admin shipping page
- `src/app/admin/shipping/page.tsx`; Shiprocket API already in `src/lib/shipping.ts` / `src/lib/shiprocket.ts`.

### 4. Email shipping notifications
- Trigger in `src/app/api/admin/orders/route.ts`; order confirmation already in `src/lib/email.ts`.
- Add "Order dispatched" email when admin marks status SHIPPED.

### 5. IndexNow
- Generate key, place at `public/<key>.txt`, submit on content publish.

### 6. Google Search Console
- Submit sitemap once `redesign/v2` merges to production (`main`).

### Deferred, no current trigger
- **Tooltip / Table components** — see session 12 note in git history. Build only when a real feature needs one.
- **GEO score (~69/100)** — remaining gap to 100 is owner-dependent (founder bio/Person schema, social/brand presence, video content). See `GEO-ANALYSIS.md`. Shelved per owner decision (session 12).
- **Neon connection string tuning** (`?connection_limit=1&pool_timeout=10`) — see finding #6 in `RESILIENCE-AUDIT.md`. This is a Vercel env var change, outside this session's blast radius; owner action if desired.

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

## Skills/agents installed (user scope)

- `claude-seo` v2.2.0 (agricidaniel) — `/seo-audit`, `/seo-geo`, `/seo-page`, `/seo-schema`, `/seo-content`, etc.
- `claude-blog` v1.9.1 (agricidaniel) — `/blog-write`, `/blog-audit`, etc.
- `redesign-existing-projects` — design audit patterns
- `frontend-design:frontend-design` — design direction skill
- `.claude/agents/chaos-engineer.md` (local, gitignored) — from `VoltAgent/awesome-claude-code-subagents`, category `04-quality-security`. Not directly invocable mid-session after being added; works if loaded at session start.

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
- Active filter pills → bark bg, not terracotta
- Never add `aggregateRating` to ProductJsonLd — no real reviews yet
- Never fabricate Person/author schema, social profiles, or video content for GEO — only structure truthful, existing content. Off-platform authority building is an owner decision, not a code fix.

## Checkout/backend resilience rules (new this session — see RESILIENCE-AUDIT.md)

- Any multi-step write that touches both `Order` and `Product.stock` must be inside a `prisma.$transaction`, with stock decrements guarded by `stock: { gte: quantity }` via `updateMany` — never a bare `update`.
- Never write a DB order row before an external payment-gateway call that could fail; call the gateway first.
- All outbound `fetch`/SDK calls to third-party services (Telegram, Twilio, Shiprocket, Razorpay) must have a timeout — use `signal: AbortSignal.timeout(8000)` for `fetch`, or the SDK's own timeout option.
- Independent notification calls (email, Telegram, WhatsApp) should fire via `Promise.all`/`Promise.allSettled`, not sequential `await`s — each must keep its own `.catch()` so one failure doesn't block the others.
- Use `isTransientDbError()` from `src/lib/prisma.ts` to retry once on Neon's transient `P1001`/`P2024` before treating a DB error as a real failure.

## Deployment rule

**`redesign/v2` is NEVER deployed directly.**
All work ends at: `git add <files> && git commit -m "..." && git push origin redesign/v2`
Do not run `vercel`, `vercel --prod`, or merge to `main`.
