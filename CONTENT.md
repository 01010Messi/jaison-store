# Jaison Herbals — v2 Copy Deck (editable)

Every piece of text added or changed in the redesign, in one place.
Edit the text here, then ask Claude to "apply CONTENT.md changes" — each block
lists the exact file it lives in.

Writing rules used throughout (keep when editing):
- Heading pattern: bark first line + terracotta italic accent line.
- Eyebrow labels: ALL CAPS, "—" prefix, "·" separators.
- Voice: plain, confident, specific. No marketing superlatives.
- SEO: each page has one H1 containing the primary keyword; descriptions
  under 160 chars; internal links between ritual/quiz/shop/blog pages.

---

## 1. Contact page — `src/app/(storefront)/contact/page.tsx`

**Metadata** (`src/app/(storefront)/contact/layout.tsx`)
- Title: `Contact Us — Jaison Herbals`
- Description: `Get in touch with Jaison Herbals. Reach us via WhatsApp, email, or contact form. We respond within 24 hours. Based in Nashik, Maharashtra.`

**Hero**
- Watermark: `SAY HELLO`
- Eyebrow: `— GET IN TOUCH · WE REPLY WITHIN 24 HOURS`
- H1: `Write to us.` + italic `A person replies.`
- Sub: `A question about a powder, an order on its way, or what suits your skin — send it over. No bots, no ticket numbers. The people who grind the herbs read every message.`

**Channels** (eyebrow: `— FOUR WAYS TO REACH US`)
| # | Label | Value | Note |
|---|-------|-------|------|
| 01 | WhatsApp | +91 86001 51677 | Fastest — we reply within hours |
| 02 | Email | Jaisonskincare@gmail.com | For orders, ingredients, anything |
| 03 | Instagram | @jaison_skincare | DMs open, rituals daily |
| 04 | Workshop | Nashik, Maharashtra, India | Where every jar is packed by hand |

- FAQ pointer: `Looking for shipping times or order help? Most answers are already in our FAQ.`

**Form**
- H2: `Or send it` + italic `right here.`
- Labels: `Name *`, `Email *`, `Phone`, `Subject *`, `Message *`
- Placeholders: `Your name`, `you@example.com`, `Optional`, `What's this about?`, `How can we help you?`
- Button: `Send Message →` / sending state: `Sending…`
- Success toast: `Message sent! We'll get back to you within 24 hours.`
- Error toast: `Failed to send message. Please try again.`

**WhatsApp CTA (dark section)**
- Watermark: `hello`
- Eyebrow: `— IN A HURRY?`
- H2: `WhatsApp is the` + italic `fast lane.`
- Sub: `Order updates, ritual doubts, which powder for which skin — message us and we'll sort it out in chat.`
- Button: `Chat on WhatsApp →`

---

## 2. Home — How To Use — `src/components/home/HowToUseGuide.tsx`

- Eyebrow: `— THE RITUAL · THREE STEPS`
- H2: `Mix. Apply.` + italic `Rinse.`
- Side note: `Every powder works the same way. If you can make a cup of chai, you can do this.`

| Step | Title | Body |
|------|-------|------|
| 01 | Mix | Two spoons of powder, a splash of water, rose water or curd. Stir until it's a smooth paste — that's the whole recipe. |
| 02 | Apply | Smooth it over clean skin or hair and let the herbs sit for 15–20 minutes. No rubbing, no scrubbing — just wait. |
| 03 | Rinse | Lukewarm water, pat dry, done. Softer skin and lighter hair from the first wash; visible change in a few weeks. |

- Quiz pill: `Not sure which powder? Find your ritual →`

---

## 3. Home — Why Powder teaser (new section) — `src/components/home/WhyPowderTeaser.tsx`

- Watermark: `why?`
- Eyebrow: `— WHY POWDER · NOT CREAM, NOT SERUM`
- H2: `Anything that pours` + italic `needs a preservative.` + `Powder doesn't.`

| Value | Label | Note |
|-------|-------|------|
| Zero | Preservatives | Dry powder needs none. Liquids can't say that. |
| One | Ingredients per jar | The herb, ground and sifted. The label is one line long. |
| 55 | Years, one format | Same recipes since 1970. Never reformulated. |

- Button: `Read the full argument →`

---

## 4. Home — Instagram — `src/components/home/InstagramSection.tsx`

- Eyebrow: `— ON INSTAGRAM · RITUALS DAILY`
- H2: `Follow the` + italic `ritual.`
- Side note: `Mixing tutorials, before-and-afters, and the occasional look inside the workshop — @jaison_skincare, every day.`
- Button: `Follow @jaison_skincare →`
- (Tile strip is decorative placeholders — swap for real post embeds when available.)

---

## 5. Product page sections — `src/components/product/ProductStory.tsx`

These headings are shared by all products; the step/ingredient/benefit text
itself comes from `src/data/products.ts` per product.

**The Ritual** (parchment, watermark `ritual`)
- Eyebrow: `— THE RITUAL · {product name}`
- H2: `How to` + italic `use it.`

**What's Inside** (cream)
- Eyebrow: `— WHAT'S INSIDE · {n} INGREDIENTS` (combos: `{n} POWDERS`)
- H2: `The whole label,` + italic `nothing hidden.`
- Side note (singles): `Every ingredient, named. No fragrance, no preservatives, no fillers — if it's not listed here, it's not in the jar.`
- Side note (combos): `Every jar in this combo is a single herb — ground, sun-dried and sifted. Here's exactly what you get.`

**Why It Works** (dark bark)
- Eyebrow: `— WHY IT WORKS`
- H2: `What it does,` + italic `and why.`
- Body: product description + numbered benefits (from `products.ts`).

**Related content headers** (`src/components/product/ProductDetail.tsx`)
- Blog: `— FROM THE JOURNAL` / `Go deeper on` + italic `{product name}.`
- Products: `— PAIRS WELL WITH · {category}` / `Complete the` + italic `ritual.`

---

## 6. Product FAQ — `src/data/productFaqs.ts`

Shown as an accordion on every product page AND emitted as FAQPage JSON-LD
(same source, so Google sees exactly what users see).

- Section eyebrow: `— GOOD TO KNOW`
- H2: `Questions,` + italic `answered.`
- Side note: `Everything people usually ask about {product name} before their first jar. Anything else — WhatsApp us.`

Questions (answers in the file; {…} are auto-filled per product):
1. What are the ingredients in {name}? — *from product data*
2. How do I use {name}? — *from product data*
3. What are the benefits of {name}? — *from product data*
4. Is {name} 100% natural? — canned answer (Nashik, zero chemicals)
5. How should I store {name}? — airtight, cool, dry, dry spoon
6. What is the weight and price of {name}? — auto: weight, price, free shipping ≥ ₹499, COD
7. What if my order arrives damaged or wrong? — 48h WhatsApp/email photo → free replacement; no standard returns (matches /returns-policy)

---

## 7. Find Your Ritual metadata — `src/app/(storefront)/find-your-ritual/page.tsx`

- Title: `Find Your Ritual | Jaison Herbals`
- Description: `Answer four quick questions and we'll match you with the right Ayurvedic herbal powder ritual for your skin and hair — Ubtan, Amla, Neem, Multani Mitti & more.`
