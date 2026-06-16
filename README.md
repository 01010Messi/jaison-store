# Jaison Herbals — E-Commerce Store

D2C Ayurvedic herbal skincare store. Full-stack Next.js 14 app with Razorpay, Shiprocket, Cloudinary, and Neon PostgreSQL.

**Live:** https://jaisonskincare.com  
**Repo:** https://github.com/01010Messi/jaison-store  
**Active branch:** `redesign/v2`

---

## Quick start

```bash
npm install
npm run dev        # localhost:3000
npm run build      # prisma generate && next build
vercel --prod --yes  # deploy to production
```

## Key docs

| File | What it covers |
|---|---|
| `CLAUDE.md` | Full project reference — stack, DB models, env vars, routes, deployment |
| `DESIGN.md` | Design system — color tokens, typography, spacing, component rules |
| `DESIGN-AUDIT.md` | Code quality audit (June 2026) — 23 issues, 58/100 score |
| `AUDIT-ACTIONS.md` | Website audit action tracker — what's done, what's pending |
| `CONTENT.md` | Editable copy deck for all storefront text |

## Branch strategy

- `main` — production. **Do not push directly.** Merge from branch after testing.
- `redesign/v2` — active redesign. All current work goes here.

## Environment variables

See `CLAUDE.md §Environment Variables Required` for the full list. Copy `.env.example` → `.env.local`.

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · Neon PostgreSQL · Razorpay · Shiprocket · Cloudinary · Resend · NextAuth.js · Zustand · Framer Motion
