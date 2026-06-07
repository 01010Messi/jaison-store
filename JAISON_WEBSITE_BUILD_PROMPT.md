# Jaison Website Redesign — Full Build Brief

## For use in Claude (company account) with the jaison-store codebase

---

## BEFORE YOU START — READ THIS FIRST

### This is a FUSION project

The owner is combining the best elements of TWO designs:

1. **Current live site** (jaisonskincare.com) — has working functionality, some good UI elements  
2. **New prototype** (Jaison offline.html) — premium editorial design

**Do NOT blindly replace everything.** The owner will tell you exactly what to keep from the old site and what to take from the prototype. Wait for their direction on each component before changing it. When in doubt, ask: "Do you want to keep the current version or use the prototype version for this?"

### Skills to invoke at session start

- `/impeccable` — for all frontend UI work  
- `/karpathy-guidelines` — for clean, surgical code changes

### After every session — generate a report

At the END of every session, fill in `SESSION_REPORT_TEMPLATE.md` with:

- What files were changed  
- What decisions were made (especially fusion decisions — old vs new)  
- What's broken or needs fixing  
- What to work on next session Save it as `SESSION_REPORT_[number].md` in the project root.

---

## PROJECT OVERVIEW

**Website:** [https://jaisonskincare.com](https://jaisonskincare.com)  
**Repo:** [https://github.com/01010Messi/jaison-store.git](https://github.com/01010Messi/jaison-store.git)  
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma \+ Neon PostgreSQL, Razorpay payments, Cloudinary images, Vercel deployment  
**Goal:** Redesign jaisonskincare.com to match a new premium prototype design. The backend (payments, auth, admin, database) stays unchanged. Only the frontend/UI is being rebuilt.

---

## DESIGN DECISIONS (ALREADY CONFIRMED — DO NOT RE-QUESTION)

1. **Platform:** Staying on Next.js — no migration  
2. **"Since 1970 / 55 Years":** TRUE — use throughout  
3. **Cart renamed to POTLI:** Yes, everywhere — "Add to Cart" → "ADD TO POTLI", cart icon label → "POTLI 0", cart page title → "Your Potli"  
4. **New prices:** Neem ₹235, Multani Mitti ₹220, Orange Peel ₹245, Nagarmotha ₹260, Mehendi ₹280, Ubtan ₹440 (unchanged)  
5. **Hero video:** Coming — implement with video support but also a static image fallback for now  
6. **Customer testimonial videos:** NO — skip this section, no footage exists  
7. **Instagram UGC (\#jaisonritual):** NO — skip this section, no real posts yet  
8. **Amazon products (Silkeshine):** NOT on this website — don't add them  
9. **Developer:** Owner is coding with AI assistance (zero coding background) — keep code clean, well-commented, no over-engineering

---

## THE NEW DESIGN — WHAT IT LOOKS LIKE

The prototype (seen at `Jaison (offline).html`) is a premium redesign. Every section below should be implemented in order.

### Brand Identity

- **Tagline:** "Your bottle lists a dozen ingredients. Our product lists one."  
- **Sub-tagline:** "SINGLE-INGREDIENT HERBAL POWDERS · SINCE 1970"  
- **Brand manifesto:** "We don't formulate around trends."  
- **Core claims:** 55 Years · One Format · Zero Compromises · 1 Ingredient Per Jar · 0 Preservatives. Ever.

### Color Palette (already in tailwind.config.ts)

- `bark` (\#1A3C34) — dark forest green, nav bar, CTA buttons  
- `cream` (\#FDFAF5) — page background  
- `terracotta` (\#A0885C) — accents  
- `gold` (\#BCA480) — italic/accent text  
- `manifesto` (\#6B3A28) — dark brown section background  
- Product card backgrounds: `card-neem` (mint), `card-ubtan` (parchment), `card-multani` (rose), `card-orange` (peach), `card-nagarmotha` (lavender), `card-mehendi` (mint)

### Fonts

- Headings: Georgia serif (large, editorial — think Vogue magazine scale)  
- Body: System UI sans-serif  
- The headline size is LARGE — desktop hero text should be \~7-9rem, not normal h1 size

---

## FILES ALREADY CHANGED (DO NOT REDO THESE)

### 1\. `tailwind.config.ts`

Already updated with:

- `marquee` animation (30s loop) for scrolling ticker  
- `manifesto`, `card-neem`, `card-ubtan`, `card-multani`, `card-orange`, `card-nagarmotha`, `card-mehendi`, `card-rose`, `card-bhringraj` color tokens

### 2\. `src/components/layout/AnnouncementBar.tsx`

Already rebuilt as a scrolling ticker with:

- Items: "55 YEARS · ONE FORMAT · ZERO COMPROMISES · Free shipping over ₹499 · CASH ON DELIVERY ACROSS INDIA"  
- Dark green (`bark`) background, cream text, gold ◆ separators  
- `animate-marquee` CSS animation

---

## FULL TASK LIST — BUILD IN THIS ORDER

### TASK 1: Update Header (`src/components/layout/Header.tsx`)

Replace the current header with this new structure:

\[Announcement Bar — already done, sits above header\]

\[Header: Logo left | Nav center | Search \+ Account \+ POTLI right\]

**New navigation links:**

Home | Skin Care ▼ | Hair Care ▼ | Our Story | Why Powder | Find Your Ritual | Shop All

**Skin Care dropdown** (shows on hover, with colored product pills):

- Ubtan Powder — "Face & body brightener" — color dot: `#C4A35A` (gold)  
- Neem Powder — "Acne · oily skin" — color dot: `#4A7C59` (dark green)  
- Multani Mitti — "Pore-refining clay" — color dot: `#C4856A` (terracotta)  
- Orange Peel Powder — "Vitamin-C brightener" — color dot: `#E8853A` (orange)  
- Nagarmotha Powder — "Calming & soothing" — color dot: `#8A6AAA` (purple)

**Hair Care dropdown:**

- Mehendi Powder — "Natural hair colour" — color dot: `#4A7C59`  
- Amla Powder — "Hair growth & shine" — color dot: `#4A7C59`  
- Shikakai Powder — "Natural shampoo" — color dot: `#6B4C2A`  
- Reetha Powder — "Scalp cleanser" — color dot: `#4A7C59`  
- Bhringraj Powder — "Hair fall control" — color dot: `#4A7C59`

**POTLI cart button** (top right):

\[shopping bag icon\] POTLI  \[count badge\]

Style: Dark green pill button (`bg-bark text-cream`), rounded-full, the word "POTLI" in tracking-widest font-accent. Count shows as a number after "POTLI".

**Key rule:** The current header has the logo centered with nav below it. The new design has logo LEFT, nav CENTER, actions RIGHT — all in one row. No separate nav bar below.

---

### TASK 2: Rebuild Hero Section (`src/components/home/HeroSection.tsx`)

**Desktop layout:**

- Full viewport height (`min-h-screen`)  
- Background: video (when available) OR static image fallback (`/images/hero-group.jpg`)  
- Overlay: very light cream/parchment overlay to ensure text legibility  
- Content positioned bottom-left or center

**Content:**

SINGLE-INGREDIENT HERBAL POWDERS · SINCE 1970    \[right side: 55 YEARS · ONE FORMAT · ZERO COMPROMISES\]

Your bottle lists a dozen ingredients.

Our product lists one.

Most skincare needs preservatives, stabilisers and synthetic

fragrance to sit on a shelf. Ours needs none of that. Single-

ingredient. Since 1970\.

\[SHOP THE COLLECTION →\]    \[FIND YOUR RITUAL →\]

**Typography:**

- "Your bottle lists a dozen ingredients." — color: `#1A3C34` (bark), huge serif (\~7-9rem desktop)  
- "Our product lists one." — color: `#8B5E3C` or `gold` tone, same size, italic serif  
- Sub-copy: `text-bark/70`, `text-lg`, max-w-xl

**Video implementation:**

\<video

  autoPlay

  muted

  loop

  playsInline

  className="absolute inset-0 w-full h-full object-cover"

  poster="/images/hero-group.jpg"

\>

  \<source src="/videos/hero.mp4" type="video/mp4" /\>

\</video\>

If no video file exists, the `poster` image shows as fallback automatically.

---

### TASK 3: Stats Bar (new component `src/components/home/StatsBar.tsx`)

Four stats in a row, cream background, large editorial numbers:

| Number | Label |
| :---- | :---- |
| 1970 | YEAR WE STARTED GRINDING |
| 55 | YEARS, ONE FORMAT |
| 1 | INGREDIENT PER JAR |
| 0 | PRESERVATIVES. EVER. |

Numbers: `font-heading text-7xl md:text-9xl text-bark/20` (very large, light opacity — watermark style) Labels: `font-accent text-xs tracking-widest text-bark/60 uppercase`

---

### TASK 4: Botanical Names Ticker (new component `src/components/home/BotanicalTicker.tsx`)

A scrolling dark green bar with Latin herb names scrolling right-to-left:

Sapindus mukorossi · Lawsonia inermis · Cyperus rotundus · Citrus sinensis · Azadirachta indica · Phyllanthus emblica · Curcuma longa · Eclipta prostrata · Rosa centifolia

- Background: `bg-bark`  
- Text: italic serif, `text-cream/80`, mix of white and gold colors alternating  
- Animation: `animate-marquee-botanical` (40s loop — already in tailwind)  
- Diamond separator `◆` between names

---

### TASK 5: Manifesto Section (new component `src/components/home/ManifestoSection.tsx`)

Dark brown (`bg-manifesto`) full-width section:

THE MANIFESTO

We don't formulate

around trends.

Most brands reformulate every season. New actives, new claims, new packaging. We've had

one formula since 1970\. One herb. One jar. The same Neem powder your grandmother used.

Not because we can't innovate — because the herb doesn't need improving.

\[READ OUR STORY →\]

- Section background: `#6B3A28` (manifesto)  
- "THE MANIFESTO": `font-accent text-xs tracking-widest text-cream/50 uppercase`  
- "We don't formulate": `font-heading text-5xl md:text-7xl text-cream`  
- "around trends.": same size, color `#C4956A` (warm gold italic)  
- Body text: `text-cream/70 text-base md:text-lg max-w-2xl`  
- CTA button: outlined, `border-cream/40 text-cream hover:bg-cream/10`

---

### TASK 6: Rebuild Product Card (`src/components/product/ProductCard.tsx`)

New card design from prototype:

- Each product has a **unique pastel background** (use the card color tokens from tailwind)  
- Product name in large serif font  
- Latin botanical name as italic subtitle below product name  
- Category label above name (`SKIN CARE` or `HAIR CARE`) in small caps  
- Price bottom left  
- `+` button (circle, dark green) bottom right for quick-add  
- No image dots indicator needed on new design  
- Discount badge: dark pill (`bg-bark text-cream text-xs`) top left  
- "BESTSELLER" badge: same pill style, top left

**Product-to-color mapping:**

Ubtan Powder      → bg-card-ubtan

Neem Powder       → bg-card-neem

Multani Mitti     → bg-card-multani

Orange Peel       → bg-card-orange

Nagarmotha        → bg-card-nagarmotha

Mehendi           → bg-card-mehendi

Rose Petal        → bg-card-rose

Bhringraj         → bg-card-bhringraj

Amla Powder       → bg-card-neem (reuse)

Shikakai          → bg-card-ubtan (reuse)

Reetha            → bg-card-orange (reuse)

**Latin botanical names:**

Ubtan Powder       → "Curcuma longa \+ 7 herbs"

Neem Powder        → "Azadirachta indica"

Multani Mitti      → "Calcium bentonite clay"

Orange Peel        → "Citrus sinensis peel"

Nagarmotha         → "Cyperus rotundus"

Mehendi Powder     → "Lawsonia inermis"

Rose Petal         → "Rosa centifolia"

Amla Powder        → "Phyllanthus emblica"

Shikakai           → "Acacia concinna"

Reetha             → "Sapindus mukorossi"

Bhringraj          → "Eclipta prostrata"

Add a `botanicalName` lookup map at the top of ProductCard.tsx:

const botanicalNames: Record\<string, string\> \= {

  "ubtan-powder": "Curcuma longa \+ 7 herbs",

  "neem-powder": "Azadirachta indica",

  "multani-mitti": "Calcium bentonite clay",

  "orange-peel-powder": "Citrus sinensis peel",

  "nagarmotha-powder": "Cyperus rotundus",

  "mehendi-powder": "Lawsonia inermis",

  "rose-petal-powder": "Rosa centifolia",

  "amla-powder": "Phyllanthus emblica",

  "shikakai-powder": "Acacia concinna",

  "reetha-powder": "Sapindus mukorossi",

  "bhringraj-powder": "Eclipta prostrata",

};

const cardColors: Record\<string, string\> \= {

  "ubtan-powder": "bg-card-ubtan",

  "neem-powder": "bg-card-neem",

  "multani-mitti": "bg-card-multani",

  "orange-peel-powder": "bg-card-orange",

  "nagarmotha-powder": "bg-card-nagarmotha",

  "mehendi-powder": "bg-card-mehendi",

  "rose-petal-powder": "bg-card-rose",

  "amla-powder": "bg-card-neem",

  "shikakai-powder": "bg-card-ubtan",

  "reetha-powder": "bg-card-orange",

  "bhringraj-powder": "bg-card-bhringraj",

};

---

### TASK 7: Rebuild Homepage (`src/app/(storefront)/page.tsx`)

Replace all current sections with this order:

export default function HomePage() {

  return (

    \<\>

      \<HeroSection /\>           {/\* Video hero with giant headline \*/}

      \<StatsBar /\>              {/\* 1970 / 55 / 1 / 0 \*/}

      \<BotanicalTicker /\>       {/\* Scrolling Latin names \*/}

      \<ManifestoSection /\>      {/\* Dark brown manifesto \*/}

      \<FeaturedProducts /\>      {/\* Product grid — keep existing but restyle cards \*/}

      \<BrandTimeline /\>         {/\* 1985 / 1998 / 2026 story \*/}

      \<FindYourRitualTeaser /\>  {/\* Quiz CTA section \*/}

      \<NewsletterSection /\>     {/\* Keep existing \*/}

    \</\>

  );

}

Update metadata:

export const metadata: Metadata \= {

  title: "Jaison — Single-Ingredient Herbal Powders for Skin & Hair | Since 1970",

  description: "100% natural Ayurvedic herbal powders. One herb. One jar. No preservatives. No fillers. Trusted since 1970\. Free shipping over ₹499.",

  alternates: { canonical: "https://jaisonskincare.com" },

};

---

### TASK 8: Brand Timeline (new component `src/components/home/BrandTimeline.tsx`)

Left column: heading. Right column: timeline entries.

Ancient ingredients.        1985  The line in the sand.

Modern standards.                 The industry shifts to mass-market liquids that need

                                  preservatives and stabilisers to survive a shelf.

                                  Jaison refuses. The format does not change.

\[READ THE FULL STORY →\]     1998  Single ingredients.

                                  Every herb is sold on its own — Neem, Amla,

                                  Shikakai — alongside the blends, so you can

                                  build your own ritual. The labels stay one line long.

                            2026  Still one ingredient.

                                  Fifty-five years on, every jar is still one herb —

                                  ground, sun-dried by hand, with zero preservatives.

- Year numbers: `font-heading text-7xl text-bark/30` (large, faded)  
- Entry titles: `font-heading text-xl text-bark`  
- Entry body: `font-body text-bark/60 text-sm`  
- Horizontal rule between entries  
- Background: `bg-cream`

---

### TASK 9: Redesign Product Detail Page (`src/components/product/ProductDetail.tsx`)

The new PDP layout from the prototype:

**Left column (image):**

- Large product image, takes \~55% width  
- "PHOTO" tag badge on image (top left)  
- `< BACK TO SHOP` link above image

**Right column (info):**

SKIN CARE · NEEM GREEN                    ← category \+ color name (small caps)

Neem Powder                               ← large serif h1

Azadirachta indica                        ← italic, text-bark/50

"Your bottle lists a dozen ingredients.   ← brand tagline quote, italic

Our product lists one."

Take 1 tbsp. Mix with rose water.         ← usage in one line

Twice a week. That is it.

┌─────────────────────────────────────┐

│ WHAT'S INSIDE                       │

│ 100% Azadirachta indica (neem)      │

│ leaf powder. Nothing else.          │

└─────────────────────────────────────┘

₹235                                      ← price, large

\[ − \]  1  \[ \+ \]     \[ ADD TO POTLI  ₹235 → \]

📦 Free over ₹499   ↺ 7-day returns   🔒 18 months sealed

**Color name lookup** (add to ProductDetail):

const productColorNames: Record\<string, string\> \= {

  "neem-powder": "NEEM GREEN",

  "ubtan-powder": "UBTAN GOLD",

  "multani-mitti": "CLAY ROSE",

  "orange-peel-powder": "CITRUS BRIGHT",

  "nagarmotha-powder": "EARTH CALM",

  "mehendi-powder": "MEHENDI GREEN",

  "amla-powder": "AMLA DEEP",

  "shikakai-powder": "SHIKAKAI BROWN",

  "reetha-powder": "REETHA IVORY",

  "bhringraj-powder": "BHRINGRAJ DARK",

};

**"ADD TO POTLI" button:**

- `bg-bark text-cream`  
- Full width on mobile  
- Shows price inline: "ADD TO POTLI  ₹235 →"  
- On success: shows "ADDED TO POTLI ✓" for 2 seconds

**Trust badges below button:**

- Free over ₹499 (truck icon)  
- 7-day returns (rotate icon)  
- 18 months sealed (shield icon)

---

### TASK 10: POTLI Rename — All Remaining Files

Search and update these files:

**`src/components/cart/CartDrawer.tsx`:**

- Title: "Your Cart" → "Your Potli"  
- Empty state: "Your cart is empty" → "Your potli is empty"  
- Any "cart" references in button text

**`src/app/(storefront)/cart/page.tsx`:**

- Page title and headings: Cart → Potli

**`src/components/product/ProductDetail.tsx`:**

- "Add to Cart" → "ADD TO POTLI"  
- Toast: "added to cart" → "added to potli"

**`src/components/product/ProductCard.tsx`:**

- Toast: "added to cart" → "added to potli"

**`src/store/cart-store.ts`:**

- Storage key: `"jaison-cart"` → `"jaison-potli"` *(optional — only do this if you want to clear old cart data)*

---

### TASK 11: Create New Pages

#### `/our-story` → `src/app/(storefront)/our-story/page.tsx`

Full brand story page expanding the timeline:

- Hero: "Ancient ingredients. Modern standards."  
- Timeline: 1970 → 1985 → 1998 → 2026  
- The manifesto paragraph  
- Values section (from company profile: Authenticity, Quality, Transparency, Sustainability)  
- Tagline: "Experience the luxury of Ayurveda with Jaison, where tradition meets modernity."

#### `/why-powder` → `src/app/(storefront)/why-powder/page.tsx`

Explains why powder format is superior:

- "Your bottle lists a dozen ingredients. Our product lists one."  
- Why powder doesn't need preservatives  
- How to use (mix with water/rosewater/milk)  
- Shelf life: 18 months sealed  
- Compare: powder vs lotion/cream

#### `/find-your-ritual` → `src/app/(storefront)/find-your-ritual/page.tsx`

4-step quiz that recommends products:

**Step 1 — Main concern:**

- Breakouts and oil → Neem Powder  
- Dull or uneven tone → Ubtan Powder / Orange Peel  
- Sensitivity and redness → Multani Mitti / Nagarmotha  
- Hair fall or thinning → Bhringraj / Mehendi

**Step 2 — Skin type (for skin concerns):**

- Oily  
- Dry  
- Combination  
- Sensitive

**Steps 3–4:** Narrow down to 1–2 recommended products with a "ADD TO POTLI" CTA

Use React `useState` for quiz state — no backend needed.

---

### TASK 12: Update Navigation Routes

In `Header.tsx`, update old nav routes:

- `/about` → `/our-story`  
- `/why-jaison` → `/why-powder`  
- Add `/find-your-ritual` as new link

Keep: `/shop` (now as "Shop All"), `/blog`, `/contact`, `/faq`

---

### TASK 13: Update Product Prices

Run this SQL via Prisma or update the seed script. The new prices for the premium positioning:

Neem Powder          → ₹235

Multani Mitti        → ₹220  

Orange Peel Powder   → ₹245

Nagarmotha Powder    → ₹260

Mehendi Powder       → ₹280

Ubtan Powder         → ₹440 (unchanged)

Amla Powder          → ₹220

Shikakai Powder      → ₹235

Reetha Powder        → ₹220

Bhringraj Powder     → ₹250

Rose Petal           → ₹265

Easiest approach: Go to `/admin/products`, edit each product price in the admin dashboard.

---

### TASK 14: SEO Fixes (do last — after design is live)

1. **Fix title tag** in `src/app/(storefront)/page.tsx`:  
   Old: `"jaison | Natural Ayurvedic Beauty — Herbal Skincare & Haircare | jaison"` (duplicate brand name)  
   New: `"Jaison — Single-Ingredient Herbal Powders for Skin & Hair | Since 1970"`  
     
2. **Add Organization schema** to `src/components/seo/JsonLd.tsx`:

{

  "@context": "https://schema.org",

  "@type": "Organization",

  "name": "Jaison Ayurvedic Skincare",

  "url": "https://jaisonskincare.com",

  "logo": "https://jaisonskincare.com/images/logo.png",

  "foundingDate": "1970",

  "description": "Single-ingredient Ayurvedic herbal powders for skin and hair care. Since 1970.",

  "address": {

    "@type": "PostalAddress",

    "addressLocality": "Nashik",

    "addressRegion": "Maharashtra",

    "addressCountry": "IN"

  }

}

3. **Fix Shop page OG tags** — set `og:url` \= `https://jaisonskincare.com/shop` on the shop page

---

## DEPLOY

After each major task, commit and deploy:

git add \-A

git commit \-m "feat: \[describe what changed\]"

git push

vercel \--prod \--yes

Always verify at [https://jaisonskincare.com](https://jaisonskincare.com) after deploy.

---

## SECTIONS TO SKIP (NO ASSETS YET)

These exist in the prototype but should NOT be built until assets are ready:

- ❌ Customer video testimonials (Lakshmi 67, Priya 38, etc.) — no footage  
- ❌ \#jaisonritual Instagram UGC grid — no real posts yet  
- ❌ Hero background video — placeholder `poster` image is fine for now

When the hero video is ready, place it at `/public/videos/hero.mp4` and the `<video>` tag will pick it up automatically.

---

## KEY BRAND COPY TO USE

**Hero headline:** "Your bottle lists a dozen ingredients. Our product lists one."  
**Sub-tagline:** "SINGLE-INGREDIENT HERBAL POWDERS · SINCE 1970"  
**Manifesto:** "We don't formulate around trends."  
**Stats:** 1970 · 55 · 1 · 0  
**Timeline:** 1985 (refused preservatives) · 1998 (single ingredients) · 2026 (still one ingredient)  
**Trust:** 55 Years · One Format · Zero Compromises  
**CTA:** "ADD TO POTLI" (not "Add to Cart")  
**Cart:** "Your Potli" (not "Your Cart")  
**Category labels on PDP:** "SKIN CARE · NEEM GREEN" format  
**Ingredient callout:** "WHAT'S INSIDE: 100% \[Latin name\]. Nothing else."  
**Trust badges:** Free over ₹499 · 7-day returns · 18 months sealed

---

## WHAT NOT TO DO

- Do NOT touch `src/app/api/` — all backend routes stay unchanged  
- Do NOT touch `src/app/admin/` — admin dashboard stays unchanged  
- Do NOT touch `prisma/schema.prisma` — database schema stays unchanged  
- Do NOT touch auth (`src/lib/auth.ts`, login/register pages)  
- Do NOT add new npm packages unless essential — the existing stack handles everything  
- Do NOT use `localStorage` — Zustand persist is already handling cart state

---

*Built from: grill-me session June 6, 2026 | Codebase: jaison-store-main | Design: Jaison (offline).html prototype*  
