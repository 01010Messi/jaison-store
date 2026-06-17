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
