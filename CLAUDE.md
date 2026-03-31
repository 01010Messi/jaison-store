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

## Admin Credentials
- **Email:** Jaisonskincare@gmail.com
- **Password:** Sample@77
- Admin auto-created on first login if not exists

## Key Integrations

### Razorpay (LIVE)
- Key ID: rzp_live_SOI4Jr3ed5xHod
- Flow: create-order → frontend checkout → verify signature (HMAC-SHA256)
- Supports: Razorpay & COD payment methods
- Guest checkout supported

### Shiprocket
- Account: Jaisonskincare@gmail.com
- Token cached with 9-day expiry
- Pickup: 60, Floor 6, Business Bay, Mumbai Naka, Nashik 422002, Maharashtra
- Features: serviceability check, order creation, AWB generation, tracking

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
- **Colors:** Cream (#FDFAF5), Parchment (#F5ECD7), Terracotta (#A0885C), Sage (#7A9E7E), Bark (#1A3C34), Gold (#BCA480)
- **Fonts:** Georgia serif (headings), System-UI sans-serif (body)
- **Theme:** Warm, earthy, Ayurvedic/herbal aesthetic

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
- `/about`, `/contact`, `/faq`, `/why-jaison`
- `/blog`, `/blog/[slug]` — 6 SEO articles
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
- Products include: Amla, Shikakai, Neem, Multani Mitti, Orange Peel, Ubtan, Mehendi, Reetha, Nagarmotha, Bhringraj, Rose Petal, Sandalwood
- **Combos category** added with 4 combo product listings (e.g., Premium Hair Care)
- Color scheme was tested with Pantone brand colors but **reverted to original** (Cream/Parchment/Terracotta/Sage/Bark/Gold)

## Recently Implemented Features
- Analytics dashboard with revenue charts, top products, conversion rates
- CSV exports for orders and customer data
- Payment management (order status improvements)
- SEO enhancements: AggregateRating schema, canonical URLs, OG images, favicon
- Blog with 6 SEO-optimized articles + FAQ schema + internal linking
- Dedicated /order-success page for conversion tracking
- Ubtan & Amla product marketing images with zoom/pan gallery
- WhatsApp integration was added then removed — email-only notifications kept

## Upcoming Features (Roadmap)
### High Priority
1. Delivery/Shipping management — Admin page for Shiprocket tracking, labels

### Medium Priority
2. Order detail page — Single-order view with timeline, payment & shipping info
3. Email notifications — Shipping updates, delivery emails (order confirmation exists)
4. Inventory alerts — Low stock notifications

### Nice to Have
5. Bulk operations — Price/stock updates, CSV import/export
6. Customer order history — Order tracking from customer account

## Deployment Preferences
- Always run `vercel --prod --yes` after every git commit+push — do not rely on auto-deploy
- Verify deployment is live before moving on
