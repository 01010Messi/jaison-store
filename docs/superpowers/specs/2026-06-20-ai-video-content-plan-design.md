# AI-Generated Video Content Plan (Higgsfield)

**Status:** Approved for execution
**Deadline:** Tomorrow afternoon (2026-06-21 PM) — all 36 clips
**Tool:** Higgsfield, **Max plan, billed monthly** ($79/mo, not the annual $45/mo commitment) — needed for the avatar/UGC feature gate and 8x parallel generation throughput. Cancel or downgrade after the bulk push.

## 1. Goal

Fill 36 pieces of currently-static or placeholder real estate across the site with AI-generated video, as a stopgap until real product/brand photography and footage is shot. This is **content generation only** — the React/Next.js code changes to actually render `<video>` tags in place of the current `<div>`/`<Image>` placeholders are a separate implementation plan (next step after this spec).

## 2. Scope

| Area | Clips | Generation mode |
|---|---|---|
| Testimonials (homepage) | 5 | 3 avatar talking-head + 2 ambient b-roll |
| Hero (homepage) | 1 | text-to-video (replaces `hero-group.mp4`; layout/copy unchanged) |
| Our Story (5 Acts) | 5 | text-to-video |
| CategoryShowcase (homepage) | 3 | text-to-video |
| About page | 1 | text-to-video |
| Instagram section (homepage, posted live to @jaison_skincare) | 8 | mix text-to-video / image-to-video |
| Product detail pages | 13 | image-to-video, seeded from existing product photo |
| **Total** | **36** | |

**Out of scope** (explicitly deferred to separate sessions):
- Blog post imagery — needs real **photos**, not video (user's own call)
- Hero **layout/copy** redesign — video swap only here; structural redesign is its own brainstorm
- Building an automated generation pipeline/API integration — all generation is manual, through Higgsfield's UI

## 3. Style Bible

Reused in every prompt below as the trailing style clause:

> Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, slow deliberate camera movement (gentle push-in or static, no handheld shake, no fast cuts). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile texture emphasis. No on-screen text, no logos, no subtitles, no readable label text beyond what's already on real product packaging. Calm, premium, artisanal mood.

Backgrounds loop seamlessly, silent/muted, 4–8s, matching the existing `autoPlay loop muted` pattern already used on the hero.

## 4. Compliance / Content-Integrity Notes

1. **Avatar testimonials need an on-screen disclosure** (e.g. "AI-generated representation") wherever they render — wording/placement is a product/legal call, flagged here as a requirement for the implementation plan, not drafted in this spec.
2. **Instagram tiles currently use invented third-party handles** (`@sneha.ahuja`, `@aarav.makes`, etc.) as decorative on-site placeholders. Since these are now being **actually posted** to the real `@jaison_skincare` account, the fake-handle framing must be dropped — captions below are rewritten in first-person brand voice, not attributed to invented customers.
3. **Dropped the "6-week before/after" framing** from the original Neem Instagram tile concept — implying a real customer's measured skin result from an AI-generated clip is a materially different (and riskier) claim than ambient b-roll. Reframed as an ingredient/process shot instead.
4. **Dropped "Rose Petal" from the Instagram tile 8 concept** — Rose Petal was removed from the catalogue (June 2026) and CLAUDE.md flags it should not be re-added to any product-facing content. Reframed using Orange Peel Powder (active SKU) instead.

## 5. Execution Order (speed-optimized for the deadline)

1. **Testimonials (5)** — first, most schedule buffer for redos since avatar lip-sync/voice is the highest-risk generation type
2. **Hero + Our Story + CategoryShowcase + About (10)** — atmospheric, highest visual payoff for empty/placeholder real estate
3. **Instagram (8)** — generate, review, then actually post to @jaison_skincare
4. **Products (13)** — most mechanical/repetitive, lowest risk if something's off (static photo remains as fallback in the gallery)

Submit in batches of up to 8 (Max plan's parallel-generation limit). Accept the first generation unless there's a glaring artifact (warped packaging/label text, extra limbs/fingers, broken lip-sync, a color grade that clashes hard with the brand palette) — don't chase perfection on background loops.

## 6. Full Clip Inventory — Ready-to-Paste Prompts

### 6.1 Testimonials (5) — `public/images/video/testimonial-{n}.mp4`

**1. Lakshmi, 67, Jaipur — Ubtan — AVATAR (disclosure required)**
> Natural portrait video of an elderly Indian woman in her late 60s, silver hair tied back, wearing a simple cream-colored cotton saree, sitting in soft natural window light in a warm-toned home interior. She speaks calmly and warmly to camera, gentle smile, natural hand gestures. Earthy terracotta and cream tones in the background. Documentary, authentic, no text overlays. Portrait orientation. [+ style bible]

**2. Priya, 38, Bengaluru — Neem — AMBIENT**
> Macro close-up of neem powder being gently sprinkled into a small terracotta bowl, soft natural light, slow motion, light dust catching the light, warm sage-green and earthy tones. Portrait orientation, seamless loop. [+ style bible]

**3. Anika, 22, Pune — Ubtan Powder — AVATAR (disclosure required)**
> Natural portrait video of a young Indian woman in her early 20s, simple styling, minimal jewelry, warm cream cotton top, sitting in a softly lit room with warm earthy decor. She speaks naturally and warmly to camera as if sharing a personal skincare story, occasional smile, natural gestures, soft window light. Documentary style, no text overlays, portrait orientation. [+ style bible]

**4. Meera, 51, Hyderabad — Amla — AMBIENT**
> Macro close-up of dried amla (Indian gooseberry) powder being poured from a wooden scoop into a clay bowl, soft directional natural light, slow motion, warm gold and terracotta tones, gentle floating dust particles. Portrait orientation, seamless loop. [+ style bible]

**5. Sunita, 74, Indore — Mehendi — AVATAR (disclosure required)**
> Natural portrait video of an elderly Indian woman in her early 70s, gray hair in a simple bun, wearing a warm-toned cotton saree, sitting in a sunlit traditional home interior with terracotta walls. She speaks slowly and warmly to camera, gentle expressive hands, natural smile. Documentary realism, no text overlays, portrait orientation. [+ style bible]

### 6.2 Hero (1) — `public/images/video/hero.mp4`

> Cinematic wide shot, warm golden-hour natural light, hands gently grinding dried herbs in a traditional stone mortar (silbatta), close-up textures of turmeric, sandalwood, and herbal powders. Slow deliberate camera push-in. Landscape widescreen, 8–12s seamless loop. Avoid bright highlights in the center-frame area where the headline text sits. [+ style bible]

### 6.3 Our Story — 5 Acts — `public/images/video/our-story-act-{1..5}.mp4`

**Act 1 — 1970, "It started with one jar."**
> Vintage-inspired cinematic shot, a single ceramic jar of herbal powder on a wooden table in warm sepia-toned natural light, dust motes floating, slow static or gentle push-in. Nostalgic 1970s mood, no modern objects in frame, landscape. [+ style bible]

**Act 2 — 1985, "The decision: no liquids."**
> Close-up macro shot of dry herbal powder being poured slowly from a hand into a bowl, a blurred liquid-bottle silhouette fading into soft focus in the background — symbolizing a choice toward powder over liquid. Slow deliberate motion, landscape. [+ style bible]

**Act 3 — 1998, "Single-ingredient line."**
> Macro shot of a single herbal ingredient (dried neem leaves or turmeric root) isolated on a plain warm-toned surface, soft directional light emphasizing texture and purity, slow rotating or static camera, minimalist composition, no other objects in frame, landscape. [+ style bible]

**Act 4 — 2010, "We stayed small on purpose."**
> Wide shot of a small, modest workshop space with wooden shelves holding a handful of unlabeled jars, warm soft daylight through a window, slow gentle camera pan, intimate and humble mood, no readable text on labels, no visible faces, landscape. [+ style bible]

**Act 5 — 2026, "Still one ingredient."**
> Modern, elegant macro shot of a single herbal powder being poured in slow motion against a deep dark-brown backdrop, dramatic soft lighting highlighting texture and color, premium contemporary mood while keeping the same simplicity as the earlier acts, landscape. [+ style bible]

### 6.4 CategoryShowcase (3) — `public/images/video/category-{skin-care,hair-care,face-care}.mp4`

**Skin Care**
> Macro shot of fine herbal powder (turmeric/sandalwood tones) being gently mixed into a creamy paste in a small bowl, soft natural light, slow motion, skincare ritual mood. Vertical 3:4 framing, no faces, seamless loop. [+ style bible]

**Hair Care**
> Macro shot of dark herbal hair powder (shikakai/amla tones) being poured into a wooden bowl, soft natural light, slow motion, haircare ritual mood. Vertical 3:4 framing, no full faces, seamless loop. [+ style bible]

**Face Care**
> Macro shot of light clay-toned powder (multani mitti) being whisked into a smooth paste, soft natural light reflecting off the creamy texture, slow motion, gentle ritual mood. Vertical 3:4 framing, no faces, seamless loop. [+ style bible]

### 6.5 About (1) — `public/images/video/about.mp4`

> Warm, intimate documentary-style shot representing generational Ayurvedic herbal craft — an older hand and a younger hand (no visible faces) measuring and mixing herbal powder together at a wooden table, soft natural window light, slow gentle motion, calm premium mood. Portrait 4:5 framing. [+ style bible]

### 6.6 Instagram (8) — `public/images/video/instagram-tile-{1..8}.mp4`, vertical 9:16, posted to @jaison_skincare

**Tile 1 — Multani Mitti**
> Vertical 9:16 video, multani mitti (Fuller's earth) clay powder being mixed with water into a face mask in a small bowl, showing texture and consistency, soft natural light, slow motion close-up, no face. [+ style bible]
Caption: *"Multani Mitti tip: mix until it's a smooth paste, not a crack-prone clump."*

**Tile 2 — Shikakai**
> Vertical 9:16 video, shikakai powder mixed with water creating natural foam/lather in a glass bowl, macro close-up, soft light catching bubbles, slow motion, no face. [+ style bible]
Caption: *"Cold-process Shikakai foam — no sulphates, just nature's own lather."*

**Tile 3 — Ubtan heritage**
> Vertical 9:16 video, an aged ceramic jar (worn, vintage feel) being opened to reveal golden-cream ubtan powder inside, soft warm light, slow reveal motion, nostalgic heritage mood, no face. [+ style bible]
Caption: *"Some jars carry decades of ritual. Ours has carried generations."*

**Tile 4 — Neem (reframed, no before/after claim)**
> Vertical 9:16 video, dried neem leaves and ground neem powder shown side by side, macro texture shot transitioning slowly between whole leaf and ground powder, no face, no implied skin results. [+ style bible]
Caption: *"From leaf to powder — our Neem, ground fresh."*

**Tile 5 — 3-powder hair ritual**
> Vertical 9:16 video, three different herbal powders (varying earthy colors) poured into separate small bowls arranged in a row, soft natural light, slow motion, no face. [+ style bible]
Caption: *"Our 3-powder hair ritual, the same way it's been done for decades."*

**Tile 6 — Reetha**
> Vertical 9:16 video, reetha (soapnut) powder mixed with water forming a light natural lather in a small dish, macro close-up, soft light, slow motion, no face. [+ style bible]
Caption: *"Reetha isn't just for hair — try it as a gentle face cleanser."*

**Tile 7 — Mehendi**
> Vertical 9:16 video, mehendi (henna) powder being sifted through a fine sieve into a bowl, fine green powder catching soft natural light, slow motion, no face. [+ style bible]
Caption: *"Switching to single-ingredient Mehendi — no additives, no fillers."*

**Tile 8 — Orange Peel (replaces removed Rose Petal concept)**
> Vertical 9:16 video, orange peel powder mixed with a drizzle of honey in a small bowl, macro close-up showing texture, slow motion, soft natural light, no face. [+ style bible]
Caption: *"Orange Peel + honey, twenty minutes weekly — simple as that."*

### 6.7 Products (13) — image-to-video, `public/images/video/product-{slug}.mp4`

Each prompt: seed = the existing product photo at the listed path. Instruction to prepend: *"Image-to-video from the attached seed image. Keep the product packaging, label text, and colors exactly as shown — do not alter, regenerate, or distort the label."* Then the motion description + style bible.

| Slug | Seed image | Motion |
|---|---|---|
| ubtan-powder | `/images/products/ubtan.webp` | a small pinch of golden-cream powder gently falling beside the jar, soft dust catching light |
| aamla-powder | `/images/products/amla-front.webp` | gentle light shift slowly revealing the jar from a slightly different angle |
| neem-powder | `/images/products/neem-front.webp` | a few neem leaves softly falling near the jar |
| shikakai-powder | `/images/products/shikakai-front.webp` | light powder dust drifting upward near the jar in soft light |
| multani-mitti | `/images/products/multani-front.webp` | subtle light shift across the jar's clay-toned surface, soft glow |
| orange-peel-powder | `/images/products/orange-front.webp` | a thin curl of dried orange peel gently settling near the jar |
| mehendi-powder | `/images/products/mhendi-front.webp` | fine green powder lightly drifting near the jar |
| reetha-powder | `/images/products/reetha-front.webp` | a soapnut (reetha) piece gently rolling into frame near the jar |
| nagarmotha-powder | `/images/products/nagmotha-front.webp` | a strand of nagarmotha root resting near the jar with soft light shift |
| hair-care-trio | `/images/products/combo-hair-trio.png` | the three jars in the set subtly catching shifting soft light, slow pan |
| premium-hair-care-combo | `/images/products/combo-premium-hair-2.png` | slow gentle pan across the combo set with soft warm light shift |
| scalp-care-combo | `/images/products/combo-scalp-care.png` | subtle light glow shift across the combo packaging |
| jaison-special-combo | `/images/products/combo-jaison-special.png` | slow reveal pan across the full combo kit, soft warm light |

All product clips: square 1:1 framing, 4–6s seamless loop, no added text/logos beyond existing packaging.

## 7. File Naming & Integration

All generated files land in a new `public/images/video/` folder, named exactly as shown in each section above. The component-side code changes (swapping the current `<div>`/`<Image>` placeholders for `<video autoPlay loop muted playsInline>` tags pointing at these paths, plus the avatar-disclosure UI and Instagram caption/handle updates) are **not** part of this spec — they're the next step, covered by a separate implementation plan, and can be built in parallel with manual generation since the code doesn't need the files to exist yet (same pattern the hero already uses).

## 8. Open Items For The Implementation Plan

- Exact wording/placement of the AI-avatar disclosure label
- Whether `TestimonialsSection.tsx`'s `h-[420px]` gradient-card layout needs adjustment to host video (vs. just adding a video element behind/within the existing card)
- Whether `InstagramSection.tsx`'s decorative SVG motifs are removed entirely once real video fills the tile, or kept as a loading-state fallback
