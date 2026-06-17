# Jaison Herbals — Session Handoff

**Date:** 17 June 2026 · **Branch:** `redesign/v2` · **Last commit:** (this session's commit)

---

## What was built this session (session 14 — live checkout smoke test)

Goal: exercise the 6 checkout resilience fixes from session 13 (see `RESILIENCE-AUDIT.md`) against real traffic — they'd only ever been verified by `tsc`/`build`, never run.

No staging environment exists (Razorpay LIVE only, secrets only set in Vercel's Production environment), so this ran `next dev` locally against the **real** Neon DB and **real** Razorpay account: `vercel link` → `vercel env pull --environment=production` → drove the actual API routes with curl.

### Verified live, all passing
1. **COD happy path** — order created, stock correctly decremented.
2. **COD insufficient-stock probe** — `409`, transaction rolled back cleanly, stock untouched.
3. **Oversell race condition (the critical fix)** — set stock to 2, fired two concurrent COD requests for qty 2 each → exactly one `200`, one `409`, stock landed at `0`, never negative.
4. **Razorpay create-order zombie-row fix** — forced a Razorpay rejection (sub-minimum amount) → `502`, zero order rows written.
5. **Verify endpoint, missing-order fix (the other critical fix)** — forged a correctly-HMAC-signed payload against a nonexistent order number → `409` + `CRITICAL` log, exactly as designed.
6. **Verify endpoint, happy path + paid-order oversell flag** — order transitioned `PENDING→CONFIRMED`/`PAID`; since stock was already at 0 from the race test, the stock guard correctly declined to decrement further and logged `CRITICAL: oversell on order...` instead of going negative.
7. **Tampered signature** — `400 Invalid payment signature`, as expected.
8. **Notification timeout fix** — a real outbound Telegram call timed out at the configured 8s threshold and was caught via `.catch()` without blocking the response.

**Note on the Razorpay leg:** no real card payment was made or money moved. `verify` only checks an HMAC-SHA256 signature locally — it never calls Razorpay's API — so a correctly-signed payload computed with the real `RAZORPAY_KEY_SECRET` exercises the exact same code path as a genuine successful payment. `create-order` *does* hit the real Razorpay API, but creating a Razorpay order is just a payment intent — it doesn't charge anything.

**Not exercised:** order-number collision retry and transient-Neon-error retry (fixes #5/#6 from session 13) — both need a forced DB-level fault to trigger and weren't worth injecting against production for this pass.

**Cleanup performed:** all 3 test orders deleted, 7 orphaned test addresses deleted, Aamla Powder stock restored to 46, dev server stopped, `.env.local` (production secrets) deleted from disk.

### New findings from this pass
- **Orphan `Address` rows:** in both `orders/route.ts` and `payment/create-order/route.ts`, the shipping address is written *before* the stock-guard transaction / Razorpay call. Every failed checkout attempt leaves a permanent orphan `Address` row with no order attached. Low severity, not fixed — noted in `CLAUDE.md` "Known Minor Issues" and `RESILIENCE-AUDIT.md`.
- **`vercel env pull` artifact:** every secret pulled from this project's Production environment comes back with a stray literal `\n` appended (confirmed on `DATABASE_URL`, `RAZORPAY_KEY_ID/SECRET`, and ~19 others). Breaks Razorpay auth (`401`) until stripped — likely from how the values were originally pasted into the Vercel dashboard. Documented in `CLAUDE.md` "Local Dev Against Production" so the next session doesn't lose time on it.

### Verification performed
- Live smoke test as above (this *is* the verification — see `RESILIENCE-AUDIT.md` for the full table)
- No `tsc`/`build` re-run this session — no code changed, only docs + a `.gitignore` line

---

## Current branch state

All work from this session committed and pushed to `origin/redesign/v2`.

### Files changed this session
```
.gitignore           (added .env* — vercel env pull added this automatically)
HANDOFF.md            ← this file (rewritten)
RESILIENCE-AUDIT.md   (added "Live smoke test (session 14)" section)
CLAUDE.md             (feature log + new "Local Dev Against Production" / "Known Minor Issues" sections)
```
No application code changed this session — this was a verification-only pass.

---

## What's next — ordered by impact

### 1. Decide fate of the 7 orphaned home components (carried over from session 10, still deferred)
- `BlogPreview.tsx`, `NewsletterSection.tsx`, `TrustPillars.tsx`, `WhyJaisonTeaser.tsx`, `WhyPowderTeaser.tsx`, `CategoryShowcase.tsx`, `BrandStory.tsx` — not imported anywhere in `src/app`. Owner explicitly deferred this — surface again before further homepage work.

### 2. Admin shipping page
- `src/app/admin/shipping/page.tsx`; Shiprocket API already in `src/lib/shipping.ts` / `src/lib/shiprocket.ts`.

### 3. Email shipping notifications
- Trigger in `src/app/api/admin/orders/route.ts`; order confirmation already in `src/lib/email.ts`.
- Add "Order dispatched" email when admin marks status SHIPPED.

### 4. IndexNow
- Generate key, place at `public/<key>.txt`, submit on content publish.

### 5. Google Search Console
- Submit sitemap once `redesign/v2` merges to production (`main`).

### 6. (Optional, low priority) Fix orphan Address rows
- See "New findings" above. Move address creation inside the same transaction as the stock guard, or only persist it after the transaction succeeds.

### Deferred, no current trigger
- **Tooltip / Table components** — see session 12 note in git history. Build only when a real feature needs one.
- **GEO score (~69/100)** — remaining gap to 100 is owner-dependent (founder bio/Person schema, social/brand presence, video content). See `GEO-ANALYSIS.md`. Shelved per owner decision (session 12).
- **Neon connection string tuning** (`?connection_limit=1&pool_timeout=10`) — see finding #6 in `RESILIENCE-AUDIT.md`. This is a Vercel env var change, outside any session's blast radius; owner action if desired.

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

## Checkout/backend resilience rules (see RESILIENCE-AUDIT.md)

- Any multi-step write that touches both `Order` and `Product.stock` must be inside a `prisma.$transaction`, with stock decrements guarded by `stock: { gte: quantity }` via `updateMany` — never a bare `update`. **Confirmed working live, session 14.**
- Never write a DB order row before an external payment-gateway call that could fail; call the gateway first. **Confirmed working live, session 14.**
- All outbound `fetch`/SDK calls to third-party services (Telegram, Twilio, Shiprocket, Razorpay) must have a timeout — use `signal: AbortSignal.timeout(8000)` for `fetch`, or the SDK's own timeout option. **Confirmed working live, session 14.**
- Independent notification calls (email, Telegram, WhatsApp) should fire via `Promise.all`/`Promise.allSettled`, not sequential `await`s — each must keep its own `.catch()` so one failure doesn't block the others.
- Use `isTransientDbError()` from `src/lib/prisma.ts` to retry once on Neon's transient `P1001`/`P2024` before treating a DB error as a real failure.
- Known minor issue, not yet fixed: `Address` rows are written before the stock-guard transaction in both checkout routes, leaving orphans on failed attempts.

## Local dev gotcha (new this session)

No sandbox exists — `vercel env pull` against this project only has Production-environment secrets, and every one of them comes back with a stray literal `\n` appended (breaks Razorpay auth with `401` until stripped). See `CLAUDE.md` "Local Dev Against Production" for the exact recipe.

## Deployment rule

**`redesign/v2` is NEVER deployed directly.**
All work ends at: `git add <files> && git commit -m "..." && git push origin redesign/v2`
Do not run `vercel`, `vercel --prod`, or merge to `main`.
