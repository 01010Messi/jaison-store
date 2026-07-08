# Jaison Skincare - E-Commerce Store

## Project Overview
Full-stack e-commerce platform for **Jaison Skincare** (Ayurvedic/herbal skincare products).
- **Live Domain:** https://jaisonskincare.com
- **GitHub Repo:** https://github.com/01010Messi/jaison-store.git
- **Vercel Project:** jaison-production (Project ID: prj_9bpmSKJNR4Lm8qwlqXAKGKqfAPnq, Org ID: team_hTfIgzfuw7cFSUKrr3SBAwhc) — connected to GitHub `01010Messi/jaison-store`, auto-deploys on push to `main`. (A duplicate, disconnected project named `jaison-store` also exists in the same Vercel team — not the live site, do not deploy to or pull env from it.)
- **Owner:** Manan Patni (mananp8114@gmail.com)

## Tech Stack
- **Framework:** Next.js 14.2.35 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.1 (Framer Motion removed from critical path — all animations now CSS transitions)
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
- `/find-your-ritual` — skin quiz, fully built and linked in nav/sitemap, live in production
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
- Orange-to-gold accent fix (session 18, finding #13 in `ACCESSIBILITY-AUDIT.md`): a hardcoded `#E26713` orange — never routed through a `DESIGN.md` token, so session 17's token-based audit missed it — was used in 12 places (why-powder hero, our-story heading accents, `WhyPowderTeaser`, find-your-ritual `dot` swatches/labels, `shadow-gold`) and measured 2.9–3.2:1, failing AA. Added new token `gold-deep` (`#7A5012`, 6.5:1 on cream/5.6:1 on parchment) for gold accent text on light backgrounds; reused existing `gold-light` (`#D2BA96`, 6.4:1 on bark/4.0:1 on terracotta-AA-large) for gold accent text on dark/mid backgrounds. Decorative-only uses (why-powder watermark, `shadow-gold`) re-tinted to the actual `gold` hue for visual consistency. `find-your-ritual`'s `dot` fields keep raw hex (not `var()`) since they're string-concatenated with an alpha suffix (`${dot}70`) for box-shadow glows.
- Admin dashboard design token sweep (session 19, spec at `docs/superpowers/specs/2026-06-22-admin-design-token-sweep-design.md`, deployed to production): all 9 admin pages (`page.tsx` dashboard, `orders`, `products` + `ProductForm.tsx`, `categories`, `coupons`, `customers`, `messages`, `reviews`) brought into line with `DESIGN.md` — the retired `rounded-sm` (68 occurrences) swept to `rounded-xl` (panels/cards/section wrappers/image thumbnails) or `rounded-full` (buttons/icon-buttons/pills/badge chips), and form inputs/selects/textareas to `rounded-lg`. Off-token generic Tailwind colors replaced with brand tokens: dashboard `statusColors` map and low-stock indicator (`text-amber-600`/`text-red-600` → `text-gold-deep`/`text-terracotta`), `ProductForm.tsx` delete-button and remove-image-button (`red-500`/`text-white` → `terracotta`/`text-cream`). No layout, native `<select>` component, or copy changes — purely radius/color token alignment, scoped and confirmed with the user before implementation. Verified via `tsc --noEmit` + `npm run build` (no UI screenshot pass needed since it's a mechanical token swap). Merged to `main` and live in production (commit `83c0189`).

## Analytics & Search Console (session 21, June 23 2026)
- GSC sitemap resubmitted (old entry was stale: submitted Mar 28 2026, last read Mar 29 2026, 31 pages — predated the redesign/v2 merge that added 5 more URLs). Removed + re-added `sitemap.xml` to force a fresh crawl; live sitemap now has 36 URLs.
- GA4 property ("Jaison Skincare Store") linked to the GSC property `https://jaisonskincare.com/` for the first time (previously unlinked) — done via Admin → Product Links → Search Console Links → Link.
- Google Ads conversion tracking wired up (session 21 cont.): GA4↔Ads link confirmed (existed since Mar 28 2026) and Personalized Advertising enabled (was disabled). Created a "Web Purchase" conversion action manually in Ads (Conversion ID `AW-18046903484`, label `4_oBCP3QkcQcELzJt51D`) via "Create manually using code" — chosen over the auto-detect wizard path because the existing code in `order-success/page.tsx` already fires `gtag('event', 'conversion', { send_to, value, currency, transaction_id })` explicitly and didn't need an auto-installed trigger. Set `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` in Vercel Production env vars and redeployed — live. Google Ads account itself is paused pending advertiser verification (docs submitted, 3-5 business day review).
- ₹20,000 Google Ads promo credit checked (Billing → Promotions): the only offer on the account (redeemed Mar 28 2026, required ₹20,000 spend within 60 days by May 27 2026) expired unused — account was paused/unverified the whole window, so no spend ever happened. Dead end unless a new code is issued; nothing to fix in-app.
- Google Merchant Center set up (account 5769373860, "Jaison Skincare") — turned out to already exist (1 product auto-discovered by Google's crawler since ~May 2026, never had a real feed registered). Registered the pre-existing feed endpoint `src/app/api/feed/google-xml/route.ts` (already correctly built, not new code) as a primary "File (URL)" data source at `https://jaisonskincare.com/api/feed/google-xml`, country India, feed label `IN`, 24h auto-refresh — all 13 products imported and approved with zero issues. Shipping policy (Flat, India, 0-2 days) and return policy ("Standard for India", window Never/cost Not applicable) were already present and already match the real `/returns-policy` page copy (no returns/exchanges, replacement-only) — no changes needed. Google Ads (593-093-3823) confirmed already linked on both sides (Merchant Center "Apps and services" and Ads "Data manager" both show it connected) — ready for Shopping campaigns once the Ads account clears verification.

## Session 24 — June 27 2026 (LCP optimization — branch `perf/lcp-fix`, NOT yet merged to main)
- **Goal:** Homepage LCP 9.9s → under 2s to qualify for Google Ads best quality score. Work on `perf/lcp-fix` branch only — **do NOT merge to main or deploy until LCP confirmed under 2s via PSI.**
- **Root causes identified from PSI diagnostics:** 600ms render-blocking CSS (2 CSS files), 6 non-composited text-shadow animations at 60fps on mobile CPU, JS forced reflow from `useEffect` style mutations, 686ms script eval (framer-motion ~120 KB in critical path via `Drawer.tsx` → storefront layout), 219 KiB unused JS.
- **`HeroSection.tsx` converted to server component** — removed `"use client"`, both `useEffect`/`useRef` hooks (headline fade + `videoRef.current.muted = true`). Added `.hero-headline` CSS class with `animation-fill-mode: both` to replace JS-driven opacity animation. Eliminates forced reflow + removes component from client JS bundle.
- **`globals.css` — letter-glow gated to desktop** (`@media (min-width: 769px)`) — the 6 `.gw1`–`.gw6` `text-shadow` animations were exactly the "6 non-composited animated elements" in PSI. On mobile (PSI's test device) they now produce zero paint work. Desktop users keep the effect.
- **`experimental.optimizeCss: true`** added to `next.config.js` (with `critters@0.0.23` installed) — inlines above-the-fold CSS into HTML to eliminate render-blocking CSS round-trips.
- **`experimental.optimizePackageImports: ["lucide-react", "framer-motion"]`** added — tree-shakes both packages to only include used exports.
- **`<link rel="preload">` moved to `<head>` in `layout.tsx`** — hero poster was previously in `page.tsx` body JSX (discovered late by browser). Now in `layout.tsx`'s explicit `<head>` block for guaranteed early discovery. Added `<link rel="preconnect">` for GTM and `<link rel="dns-prefetch">` for GA.
- **`Drawer.tsx` fully rewritten** — replaced `AnimatePresence`/`motion.div` with CSS `transition-transform` + `transition-opacity`. Drawer stays in DOM always; uses `pointer-events-none`/`aria-hidden` when closed. Both `translateX` and `opacity` are GPU-composited. Breaks the `StorefrontLayout → Header/CartDrawer → Drawer.tsx → framer-motion` critical-path chain.
- **`LeadMagnetPopup.tsx` rewritten** — replaced `AnimatePresence`/`motion.div` with CSS `transition-all` + `scale`/`opacity`/`translate-y`. Popup stays in DOM; uses `pointer-events-none` when closed.
- **`LeadMagnetPopup` lazy-loaded** via `next/dynamic` with `ssr: false` in `(storefront)/layout.tsx` — popup only appears at 40% scroll depth, no reason to block initial render.
- **`MotionProvider` removed** from root `layout.tsx` — framer-motion's `<LazyMotion>` wrapper gone entirely.
- **Result:** framer-motion produces **zero bytes** in any build chunk (confirmed via `app-build-manifest.json` — no `2229-*` chunk, grep of `.next/static/chunks/` finds no framer-motion strings). Homepage First Load JS: **161 kB**. Rendering time: **544ms → 5ms** (confirmed from PSI main-thread breakdown screenshot).
- **PSI test ran but hit Vercel auth gate** — Vercel preview deployments require Vercel login by default. PSI's headless Chromium followed a redirect to `accounts.vercel.com` and measured the login page instead of the actual site. Need to disable Vercel preview authentication (Project Settings → General → Vercel Authentication → off) before re-running PSI.
- **Commits:** `02edf51` (hero server component + preload), `68e6d74` (CSS animations + critical CSS), `cebb392` (framer-motion removal)
- **Vercel preview URL:** `https://jaison-production-7ew1l8ggp-jaisonskincare-7380s-projects.vercel.app` (auth-gated until protection disabled)

## Session 22 — June 24 2026
- **Instagram Reels section** live on homepage (`src/components/home/InstagramReels.tsx`, `InstagramReelCard.tsx`): 3 Ubtan collab reels (Diwali 2025) embedded as 9:16 iframes with bark product footer, add-to-cart button, and `@handle` display. Horizontal scroll mobile / 3-column desktop. Eyebrow label "Real collabs · Real products" removed before merge. `feature/instagram-reels` → merged to `main` + deployed.
- **Admin Shipping page** (`src/app/admin/shipping/page.tsx`): focused shipping workspace — "Ready to Ship" (CONFIRMED/PROCESSING orders, expandable with full address + items + Ship Now button that auto-triggers Shiprocket → AWB → customer email in one click) and "In Transit" (SHIPPED orders with clickable tracking links). Shipping nav link added to admin sidebar (`AdminLayoutClient.tsx`). Guide at `docs/shipping-admin-guide.md`.
- **Email shipping notifications** — confirmed already fully implemented in prior sessions in `src/app/api/admin/orders/[id]/status/route.ts`; both AWB auto-generation path (line 138) and manual tracking entry path (line 174) call `sendShippingUpdate`. No new code needed.
- **Checkout iOS AutoFill fix** (`src/app/(storefront)/checkout/page.tsx`): iOS Safari was putting email into Full Name field — all 8 shipping address inputs now have correct `autoComplete` tokens (`email`, `name`, `tel-national`, `address-line1`, `address-line2`, `address-level1`, `address-level2`, `postal-code`). Mobile `type="tel"` added to phone field.

## Session 25 — July 8 2026 (homepage hero carousel — branch `redesign/hero-carousel`, NOT merged, pending team review)
- **Goal:** Replace the hero video with a Kama Ayurveda-style campaign carousel. Full spec + decision log at `docs/superpowers/specs/2026-07-08-hero-carousel-design.md` (includes Revision 2's pivot notes).
- **`src/components/home/HeroCarousel.tsx` (new)** replaces `HeroSection` on the homepage. 4 slides, CSS scroll-snap track (native swipe), ~60 lines of JS for autoplay (6.5s, paused on hover/focus/touch, off under `prefers-reduced-motion`), desktop arrows, dots. `HeroSection.tsx` kept on disk but unused (delete after approval).
- **Design pivot mid-session (owner decision):** started as image + live-HTML text panel (Kama's actual approach); after seeing the first render owner switched to **fully baked banners** — typography generated into the artwork, whole slide is one `<Link>`. SEO/a11y preserved via rich `alt` + visually-hidden headline/claim inside each link.
- **Art direction per slide: two assets** — desktop 21:9 + mobile 4:5 ("reel ratio"), served via `<picture>` + `getImageProps` so each device downloads only its own file. File contract: `public/images/hero/slide-N-<name>.webp` + `slide-N-<name>-mobile.webp` — overwrite files, no code change needed.
- **All 8 banners generated via Higgsfield MCP, Nano Banana Pro @ 2K** (2 credits each; balance 53.7 → 33.7), with real product photos from `/Users/manan/Downloads/Product Images/` uploaded as packaging references. S1 ubtan jar on terracotta `#834316`; S2 hair-trio pouches on parchment `#EFE4C5`; S3 neem manifesto on bark `#1A3C34`; S4 jaison special on the photo's own caramel backdrop.
- **Slide 4 was regenerated from the real photo** after owner rejected the AI-composed scene: `combo-jaison-special.png` kept pixel-identical, model only extended the backdrop and baked the typography ("Extend the provided photograph… keep it completely unchanged" prompt pattern — worked very well, reusable for future banners).
- **Packaging truth discovered:** single-herb products are kraft stand-up pouches with cream labels; only Ubtan is the glass jar with gold lid. (Early prompts/alt text wrongly said "jars" — fixed.)
- **Prompt learnings:** set aspect ratio explicitly in Higgsfield (default "auto" copies the reference photo's shape — produced the first portrait miss); Nano Banana Pro is the model for baked typography (GPT Image caps at 3:2); say "bright, evenly lit, NOT dark chocolate" for terracotta; avoid "powder drift in the air" (renders as dust specks); no chickpea flour.
- **`layout.tsx`:** manual hero preload `<link>` removed — slide 1 is an eager `fetchpriority=high` server-rendered `<img>`, and a raw-file preload would double-fetch beside the `/_next/image` URL.
- **Local verification gotcha:** after overwriting a hero webp, `rm -rf .next/cache/images` + restart `next start`, and hard-refresh the browser (Cmd+Shift+R) — both the optimizer and the browser cache the old image.
- **Status: committed + pushed to `redesign/hero-carousel` only. NO merge to main, NO deploy — owner reviewing with team, will resume next session.** Possible next steps: review Vercel preview, optionally regenerate S1–S3 from real photos using the extend-photo pattern, PSI check, then merge gate.

## Upcoming Features (Roadmap)
### Active (in progress — do NOT merge/deploy until done)
- **`redesign/hero-carousel` branch** — homepage hero carousel, all 8 banner assets live on the branch. Awaiting owner + team review (next session). See Session 25 above.

### Done (recent)
- **`perf/lcp-fix`** — merged to main + deployed (LCP 9.9s → 220ms lab). See Session 24.

### Medium Priority
1. IndexNow — generate key, place at `public/<key>.txt`, submit on publish

### Blocked on Owner
2. Bhringraj blog image — placeholder is `neem-styled.webp`; save real photo to `public/images/blog/bhringraj-styled.webp`

## Deployment Preferences
- **`redesign/hero-carousel` branch: NO merge to main, NO `vercel --prod` until owner + team approve (review planned next session)**
- Feature branches → commit + `git push origin <branch>` only (creates Vercel preview, not production)
- When merging to `main` for production: run `vercel --prod --yes` and verify live before closing
