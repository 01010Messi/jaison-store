# Jaison Skincare - E-Commerce Store

## Project Overview
Full-stack e-commerce platform for **Jaison Skincare** (Ayurvedic/herbal skincare products).
- **Live Domain:** https://jaisonskincare.com
- **GitHub Repo:** https://github.com/01010Messi/jaison-store.git
- **Vercel Project:** jaison-store (Project ID: prj_dctnJC7Z6CEhVlCffLhMAOjMD9me, Org ID: team_hTfIgzfuw7cFSUKrr3SBAwhc)
- **Owner:** Manan Patni (mananp8114@gmail.com)

## Tech Stack
- **Framework:** Next.js 14.2.35 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.1 + Framer Motion
- **Database:** Neon Serverless PostgreSQL (ap-southeast-1 region)
- **ORM:** Prisma 5.22.0
- **Auth:** NextAuth.js 4 (Credentials provider, JWT sessions)
- **Payments:** Razorpay (LIVE mode)
- **Shipping:** Shiprocket API
- **Images:** Cloudinary
- **Email:** Resend + React Email
- **State:** Zustand (cart)
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Vercel

## Project Structure
```
jaison-store/
├── prisma/schema.prisma        # Database schema (14 tables)
├── src/
│   ├── app/
│   │   ├── (storefront)/       # Customer pages (home, shop, cart, checkout, account, about, FAQ, contact)
│   │   ├── (auth)/             # Login, Register pages
│   │   ├── admin/              # Admin dashboard (orders, products, categories, reviews, customers, coupons, messages)
│   │   └── api/                # API routes (auth, payment, shipping, admin CRUD)
│   ├── components/             # UI, layout, home, product, cart, checkout, admin, decorative components
│   ├── lib/                    # Utilities (auth, db, email, payment, shipping, invoice)
│   ├── store/                  # Zustand stores (cart)
│   ├── types/                  # TypeScript types
│   └── hooks/                  # Custom hooks (useScrollAnimation, useMediaQuery, useDebounce)
└── public/                     # Static assets
```

## Database Models (Prisma)
- **User** (role: CUSTOMER/ADMIN), Account, Session, VerificationToken
- **Product** (name, slug, price, stock, ingredients, howToUse, benefits, meta tags)
- **ProductImage** (Cloudinary URLs), **Category**, **ProductCategory** (M2M)
- **Order** (Razorpay + Shiprocket tracking), **OrderItem**, **CartItem**
- **Review** (PENDING/APPROVED/REJECTED), **Address**, **Coupon**, **Newsletter**, **ContactMessage**
- **Enums:** OrderStatus (7 states), PaymentStatus (4 states), PaymentMethod (RAZORPAY/COD), ReviewStatus

## Admin
- Admin auto-created on first login from ADMIN_EMAIL / ADMIN_PASSWORD env vars

## Key Integrations

### Razorpay (LIVE)
- Flow: create-order → frontend checkout → verify signature (HMAC-SHA256)
- Supports: Razorpay & COD payment methods
- Guest checkout supported

### Shiprocket
- Token cached with 9-day expiry
- Features: serviceability check, order creation, AWB generation, tracking
- Pickup address configured via SHIPROCKET_PICKUP_* env vars

### Cloudinary
- Used for product images and category images
- Public IDs tracked in database

### Resend
- Transactional emails (order confirmation, etc.)

## Environment Variables Required
```
# App
NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_APP_NAME="jaison"

# Database
DATABASE_URL (Neon PostgreSQL connection string)

# Auth
NEXTAUTH_SECRET, NEXTAUTH_URL

# Razorpay
RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, NEXT_PUBLIC_RAZORPAY_KEY_ID

# Shiprocket
SHIPROCKET_EMAIL, SHIPROCKET_PASSWORD
SHIPROCKET_PICKUP_NAME, SHIPROCKET_PICKUP_ADDRESS, SHIPROCKET_PICKUP_CITY
SHIPROCKET_PICKUP_STATE, SHIPROCKET_PICKUP_PINCODE, SHIPROCKET_PICKUP_PHONE

# Cloudinary
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

# Email
RESEND_API_KEY, EMAIL_FROM

# Admin
ADMIN_EMAIL, ADMIN_PASSWORD

# GST
GSTIN, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_STATE, COMPANY_STATE_CODE

# Other
NEXT_PUBLIC_WHATSAPP_NUMBER=918600151677
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

## Local Dev Against Production
No staging/sandbox exists for this project (Razorpay LIVE only, env vars only set in Vercel's Production environment). To run `next dev` against real data: `vercel link`, then `vercel env pull .env.local --environment=production`. **Known gotcha:** the pulled values come back with a stray literal `\n` appended to every secret (confirmed on `DATABASE_URL`, `RAZORPAY_KEY_ID/SECRET`, and ~19 others) — this breaks Razorpay auth (`401`) and would break the DB connection too. Strip the trailing `\n` before use. Also set `NEXTAUTH_URL`/`NEXT_PUBLIC_APP_URL` to `http://localhost:3000` (they pull blank). Delete `.env.local` when done — don't leave production secrets on disk.

## Known Minor Issues
- `Address` rows in `orders/route.ts` and `payment/create-order/route.ts` are written before the stock-guard transaction / Razorpay call. A failed checkout attempt (insufficient stock, gateway rejection) leaves a permanent orphan `Address` row with no order attached. Low severity, not yet fixed — flagged in `RESILIENCE-AUDIT.md`.

## Design System
> Full reference: **DESIGN.md** (tokens, type scale, component rules, recipes). Summary:
- **Colors:** Cream (#FEFAE0), Parchment (#EFE4C5), Terracotta (#834316, light #A56843), Sage (#606C38), Bark (#1A3C34), Gold (#B89968)
- **Fonts:** Cormorant Garamond (`font-heading`), DM Sans (`font-body`), Inter (`font-accent`) — loaded via next/font
- **Theme:** Warm, earthy, Ayurvedic/herbal aesthetic
- **Rules:** never hardcode hex in components — use token classes in `className`, `var(--color-*)` in inline styles (vars defined in globals.css). Radius: `rounded-full` interactive pills, `rounded-xl` cards/images, `rounded-lg` form fields (`rounded-sm` retired). Muted text ≥ `/60` on cream, ≥ `/70` on bark.

## API Routes
- `POST /api/auth/register` - User registration
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/shipping/check-serviceability` - PIN code delivery check
- `GET|POST /api/coupons/validate` - Coupon validation
- `/api/admin/*` - Full CRUD for products, categories, coupons, orders, reviews, customers, messages

## Storefront Pages
- `/` Home, `/shop` Catalog, `/shop/[slug]` Product detail
- `/cart`, `/checkout` (guest + authenticated), `/order-success`
- `/account`, `/account/profile`, `/account/addresses`, `/account/orders`
- `/about`, `/contact`, `/faq`, `/why-jaison`, `/why-powder`, `/our-story`
- `/find-your-ritual` — skin quiz, fully built and linked in nav/sitemap (not yet live in production — waiting on redesign/v2 → main deploy)
- `/blog`, `/blog/[slug]` — 10 SEO articles (1,500–2,100 words each)
- `/terms`, `/privacy-policy`, `/returns-policy`
- `/login`, `/register`

## Admin Dashboard Pages
- `/admin` - Dashboard (revenue, orders, stock alerts, pending reviews)
- `/admin/orders` - Order management with status updates
- `/admin/products` - Product CRUD with Cloudinary images
- `/admin/categories` - Category management
- `/admin/reviews` - Review moderation
- `/admin/customers` - Customer list
- `/admin/coupons` - Discount codes
- `/admin/messages` - Contact form submissions

## Build & Deploy
```bash
npm run dev      # Development server
npm run build    # prisma generate && next build
npm run start    # Production server
vercel --prod    # Deploy to production
```

## Product Data Notes
- Product details were updated from "Jaison Final PDs.docx" document
- "Nagmotha" was renamed to "Nagarmotha" (slug: nagarmotha-powder)
- "Mhendi" was renamed to "Mehendi" (slug: mehendi-powder)
- **Rose Petal and Bhringraj REMOVED from catalogue (June 2026)** — do not re-add to any product UI
- **Active slugs (13):** ubtan-powder, aamla-powder, neem-powder, shikakai-powder, multani-mitti, orange-peel-powder, mehendi-powder, reetha-powder, nagarmotha-powder, hair-care-trio, premium-hair-care-combo, scalp-care-combo, jaison-special-combo
- **Combos category** added with 4 combo product listings
- Color scheme was tested with Pantone brand colors but **reverted to original** (Cream/Parchment/Terracotta/Sage/Bark/Gold)
- Bhringraj blog post kept as informational content — slug: `bhringraj-powder-for-hair-growth`

## Recently Implemented Features (redesign/v2 branch, June 2026)
- Full visual redesign: hero video + Ken Burns, letter-glow heading, bark auth pages
- Lead magnet popup (40% scroll depth, email capture → `/api/newsletter`, sessionStorage guard)
- Cart "You may also like" cross-sell (3 category-matched products)
- Blog expanded to 10 posts, each 1,500–2,100 words with Key Takeaways, FAQ sections
- FAQ expanded to 32 questions in 7 groups with FAQPage JSON-LD schema
- Order detail page rewrite (full brand-compliant timeline + payment/shipping info)
- PageSpeed 51 → 83: hero poster image, `fetchpriority="high"`, ProductCard Next.js Image
- Security headers added to `next.config.js` (X-Frame-Options, HSTS, CSP-lite)
- `public/llms.txt` for AI crawler discoverability
- SEO audit complete (100% storefront coverage): OG/twitter on all pages, BreadcrumbJsonLd, canonical URLs, absolute image URLs, meta descriptions, heading hierarchy
- WhatsApp integration was added then removed — email-only notifications kept
- **Do NOT add `aggregateRating` to ProductJsonLd** — no real reviews yet
- Checkout resilience hardening (session 13, see `RESILIENCE-AUDIT.md`): fixed a silent-success bug where a verified Razorpay payment with no matching order returned `verified: true`; added atomic stock-guarded transactions to prevent oversell in both COD and Razorpay checkout; reordered `create-order` to call Razorpay before writing the DB row (no more zombie PENDING orders); added timeouts to all outbound Telegram/Twilio/Shiprocket calls and parallelized notification sends; added retry-on-collision for order numbers and retry-on-transient-error for Neon connection blips
- Checkout resilience fixes verified live against production (session 14) — see `RESILIENCE-AUDIT.md` "Live smoke test" section. All 4 testable fixes confirmed working via real Razorpay orders + the real DB (no money moved — verify endpoint exercised with a self-forged HMAC signature, which is valid since signature checking is local). `redesign/v2` checkout path is sound to merge to `main` whenever ready.
- Design polish pass (session 15): `InstagramSection.tsx` home bento grid switched from CSS Grid (uneven row gaps from per-tile `aspect-ratio`) to CSS multi-column masonry (`columns-2 md:columns-4` + `break-inside-avoid`) — same 8 tiles, colors, captions, motifs unchanged. Blog hero's 3 decorative watermark rectangles (overlapping the heading) removed from `blog/page.tsx`. Shop "ALL" filter pill investigated and confirmed correct (canonical bark token, no change made).
- Hero section iteration (session 16): logo enlarged across header/auth pages; "Shop the Catalogue"/"Read Why Powder" CTAs enlarged with solid fills (`Read Why Powder` changed from translucent `rgba(26,60,52,0.65)` to solid `var(--color-bark)`); heading words ("bottle", "lists a", "dozen") changed from faded rgba opacity to solid `var(--color-bark)` (letter-glow sweep animation classes `gw1`-`gw6` untouched); heading size settled at `clamp(2.475rem, 7.425vw, 9.075rem)` after several iterative resize passes; CTA row vertically/horizontally aligned with the fixed WhatsApp button (`pb-20 md:pb-6` row padding mirrors WhatsApp's own `bottom-20 md:bottom-6` offset, `paddingRight: 40px` on the CTA wrapper). Cart "You may also like" cross-sell moved into the scrollable cart area. All in `src/components/home/HeroSection.tsx`.
- Header nav "Skin Care"/"Hair Care" dropdown converted from a small rounded per-item menu box into a full-width banner mega-menu (`MegaMenuBanner` in `src/components/layout/Header.tsx`), matching the offline mockup reference: a horizontal row of colored-dot + product-name + one-line-benefit-subtitle items spanning the full viewport width, rendered as a direct child of the `fixed` `<header>` (`absolute left-0 right-0 top-full`) so it sits below the entire multi-row header rather than under a single nav item. Subtitle copy sourced from existing `src/data/products.ts` descriptions, not invented. Same hover-intent state/timeout handlers (`openDropdown`, `handleDropdownEnter`/`handleDropdownLeave`) reused, just reattached to the single banner instead of two per-item menus.
- Color/contrast/typography accessibility audit + full fix pass (session 17, see `ACCESSIBILITY-AUDIT.md`): documented muted-text floor `text-bark/60` measured 3.59:1 (fails AA) — swept to `text-bark/72` (275 occurrences, 51 files; 5.02:1 on cream, 4.53:1 on parchment); `DESIGN.md` floor updated to match. Also fixed: Newsletter "Subscribe" button (`bg-gold text-cream` 2.56:1 → reuse `Button variant="primary"`, 7.18:1), `Badge` `gold` variant (2.91:1 → `text-bark`, 10.56:1), 3-of-8 Instagram tiles with invisible light-on-light handle text (as low as 1.15:1 → per-tile `textOn` branching), order-detail status pills/step-timeline (Returned/Pending/Delivered/inactive-step label+icon all below floor), legal-page and find-your-ritual leftover `bark/35`–`/40` text, newsletter caption `cream/30`→`/55`, header cart-badge `bg-gold`→`bg-gold-light` (4.48:1 near-miss). Structural fixes: hero video scrim's weakest gradient stop raised 0.08→0.20 (sat directly behind the opaque headline, no contrast guarantee against a dark video frame); `ProductFAQ` accordion titles `font-light`→`font-normal` (thin strokes at 16–18px degrade under sunlight glare even though contrast ratio already passed). "Cancelled" badge's off-token Tailwind red investigated, left as-is — already AA (5.91:1), and `DESIGN.md` already sanctions brand-palette exceptions for error states.

## Upcoming Features (Roadmap)
### High Priority
1. Delivery/Shipping admin page — `src/app/admin/shipping/page.tsx`; Shiprocket API already in `src/lib/shipping.ts`

### Medium Priority
2. Email shipping notifications — "Order dispatched" email when admin marks SHIPPED; trigger in `src/app/api/admin/orders/route.ts`; order confirmation already in `src/lib/email.ts`
3. IndexNow — generate key, place at `public/<key>.txt`, submit on publish

### Blocked on Owner
4. Bhringraj blog image — placeholder is `neem-styled.webp`; save real photo to `public/images/blog/bhringraj-styled.webp`
5. Blog 3rd internal links — each post has 2; target is 3 per post
6. Google Search Console — submit sitemap after redesign/v2 merges to production

## Deployment Preferences
- **Active branch `redesign/v2`: NEVER deploy directly** — all work ends at `git commit + push origin redesign/v2`
- When merging to `main` for production: run `vercel --prod --yes` and verify live before closing
