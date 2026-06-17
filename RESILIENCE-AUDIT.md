# Jaison Herbals — Checkout Resilience Audit

**Date:** 17 June 2026 · **Branch:** `redesign/v2` · **Source:** static chaos-engineering audit (read-only code review, no live calls) of the checkout/payment/shipping critical path, run against `src/app/api/payment/*`, `src/app/api/orders/route.ts`, `src/lib/prisma.ts`, `src/lib/shiprocket.ts`, `src/lib/telegram.ts`, `src/lib/whatsapp.ts`, `src/lib/email.ts`.

Scope note: this store runs Razorpay in **LIVE mode** against a real Neon Postgres database with no staging environment, so every finding below was identified by reading code, not by injecting live faults. Two findings carried real money/data-integrity risk and were fixed first on owner approval; the rest were approved as a batch afterward.

All 6 findings are now fixed. Status table first, reason/fix/result detail below.

| # | Severity | Finding | Status |
|---|---|---|---|
| 1 | Critical | Payment verified but order missing → silent success | ✅ Fixed |
| 2 | Critical | No transaction/stock guard → oversell race condition | ✅ Fixed |
| 3 | High | Razorpay failure leaves zombie PENDING order | ✅ Fixed |
| 4 | High | No timeout on outbound calls; notifications run sequentially | ✅ Fixed |
| 5 | Medium | Order-number collision has no retry | ✅ Fixed |
| 6 | Medium | Neon transient connection errors look like real bugs | ✅ Fixed |

---

## 1 — Critical: payment verified but order missing → silent success

**File:** `src/app/api/payment/verify/route.ts`

**Reason:** After a Razorpay signature verifies successfully, the route looked up the matching `Order` row and only acted `if (order)` — there was no `else`. If the lookup ever came back empty (stale order number, double-tab checkout, a prior write that silently failed), the route still returned `{ verified: true }` to the browser. The customer's money was captured by Razorpay, but no order was ever marked paid, no stock was decremented, and no confirmation email went out — with no error logged anywhere to surface it.

**Fix:** Added an explicit `if (!order)` branch that logs a `CRITICAL` line with the order number and Razorpay payment ID, and returns `409` with a "contact support" message instead of `verified: true`.

**Result:** A missing order can no longer be mistaken for a successful payment. It now fails loudly, server-side and to the customer, with the payment ID needed to reconcile manually.

---

## 2 — Critical: no transaction/stock guard → oversell race condition

**Files:** `src/app/api/orders/route.ts` (COD), `src/app/api/payment/verify/route.ts` (Razorpay)

**Reason:** Stock decrement was a sequential, unguarded `prisma.product.update({ data: { stock: { decrement } } })` per item, with no check that stock was actually available first. Two concurrent checkouts on the same low-stock SKU (likely during a sale) could both pass and both decrement, pushing stock negative or overselling a sold-out item.

**Fix:**
- `orders/route.ts`: stock check + decrement + order creation now run inside one interactive `prisma.$transaction`, using `updateMany({ where: { stock: { gte: quantity } } })`. If any item's guard fails, the whole transaction throws and rolls back, and the customer gets `409 Insufficient stock for X` before an order is ever created.
- `verify/route.ts`: payment is already captured at this point, so the order can't be refused — but the order-status update and the same guarded `updateMany` decrement now run together in one transaction, and any oversell is logged as `CRITICAL` for manual backorder/restock handling instead of silently going negative.

**Result:** COD checkout can no longer create an order it can't fulfill. Razorpay checkout can no longer silently corrupt stock counts — an oversell is now a loud, logged event instead of an invisible one.

---

## 3 — High: Razorpay failure leaves a zombie PENDING order

**File:** `src/app/api/payment/create-order/route.ts`

**Reason:** The original order was: write a `PENDING` order to Postgres, *then* call Razorpay to create the payment order. If the Razorpay call timed out or returned a 5xx, the catch block just logged and returned 500 — the `PENDING` order row stayed in the database forever with no cleanup job, slowly inflating admin order counts with orders nobody ever paid for.

**Fix:** Reordered the route to call Razorpay first. The DB order is only written after Razorpay confirms, and it's created already linked to the confirmed `razorpayOrderId`. If Razorpay fails, the route returns `502 Payment gateway unavailable` and writes nothing.

**Result:** A Razorpay outage can no longer leave permanent junk rows in the orders table — there's nothing to write until the gateway has already succeeded.

---

## 4 — High: no timeout on outbound calls; notifications run sequentially

**Files:** `src/lib/telegram.ts`, `src/lib/whatsapp.ts`, `src/lib/shiprocket.ts`, `src/app/api/orders/route.ts`, `src/app/api/payment/verify/route.ts`

**Reason:** Every outbound call to Telegram, Twilio (WhatsApp), and Shiprocket used a bare `fetch()`/SDK call with no timeout, and the admin notifications (email → Telegram → WhatsApp → session upsert) were `await`ed one after another. A slow or down upstream service would hold the whole checkout request open rather than failing fast, and the next notification couldn't even start until the previous one finished or hung.

**Fix:**
- Added `signal: AbortSignal.timeout(8000)` to the Telegram `fetch` and both Shiprocket `fetch` call sites (auth login + the shared `shiprocketFetch` helper used by serviceability/order-create/AWB/tracking).
- Added `{ timeout: 8000 }` to the Twilio client constructor in `whatsapp.ts`.
- In both `orders/route.ts` and `verify/route.ts`, the email/Telegram/WhatsApp/session-upsert calls (each already wrapped in its own `.catch()`) are now collected into an array and fired together via `Promise.all` instead of sequential `await`s. Also removed a duplicate `prisma.user.findUnique` lookup in `verify/route.ts` that was re-fetching the same customer email a second time for the WhatsApp payload.

**Result:** No outbound call can hang the checkout request indefinitely, and a slow notification service no longer delays the others — they all fire in parallel.

---

## 5 — Medium: order-number collision has no retry

**Files:** `src/app/api/payment/create-order/route.ts`, `src/app/api/orders/route.ts`

**Reason:** Order numbers are `JAIS-<date>-<100-999>` — only 900 possible values per day. A unique-constraint violation (`P2002`) on `prisma.order.create` fell into the generic catch block and returned a bare 500, dropping the customer's cart state with no retry. Low likelihood on a normal day, but rises sharply during a sale-day traffic spike.

**Fix:** Both routes now retry up to 2 extra times on `P2002`, regenerating a fresh order number each time before re-attempting the create.

**Result:** A same-day order-number collision is now self-healing instead of failing the checkout outright.

---

## 6 — Medium: Neon transient connection errors look like real bugs

**File:** `src/lib/prisma.ts` + the same retry loops in both order routes

**Reason:** Neon's serverless connection pooler occasionally drops idle connections (`P1001`) or times out under load (`P2024`) — both expected, transient conditions, not application bugs. Previously these fell into the same generic `catch` as a real error, returning the same opaque "Failed to create order" 500 and making it impossible to tell a transient blip from an actual bug in the logs.

**Fix:** Added `isTransientDbError()` to `prisma.ts`, which recognizes `P1001`/`P2024`. The same retry loops added for order-number collisions (finding #5) now also retry once on a transient DB error before giving up.

**Result:** A brief Neon connection blip during checkout is now retried automatically instead of failing the customer's order.

**Not changed:** the actual `DATABASE_URL` connection string (e.g. adding `?connection_limit=1&pool_timeout=10`) lives in Vercel's environment variables, not the repo — left as a follow-up for the owner since it's infrastructure config outside this audit's blast radius.

---

## Verification

- `npx tsc --noEmit` — clean
- `npm run build` — 85/85 static pages, same pre-existing dynamic-server-usage warnings as prior sessions (unrelated to these changes)
- No live network calls were made during the audit or the fix implementation — all six fixes are static code changes, untested against live Razorpay/Shiprocket/Telegram/Twilio traffic. Recommend a manual checkout smoke test (one Razorpay order, one COD order) before merging `redesign/v2` to `main`.
