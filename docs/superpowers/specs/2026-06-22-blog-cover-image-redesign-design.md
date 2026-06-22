# Blog Cover Image Redesign (10 posts)

**Status:** Approved for execution
**Tool:** Higgsfield `nano_banana_pro` (Google), called directly via the Higgsfield MCP tools already available in this session — no manual UI step required.

## 1. Goal

Replace the 10 blog post cover images. Today every post reuses a "styled" product photo as its single 16:9 cover image, with no purpose-built visual storytelling, and two posts (Neem and Bhringraj) incorrectly share the exact same file (`neem-styled.webp`). Bhringraj has no real product photo at all since it was delisted from the catalogue in June 2026 — the post is kept as informational content only.

## 2. Scope

**In scope:** the single cover image per blog post (the 16:9 image rendered at `src/app/(storefront)/blog/[slug]/page.tsx:305` and reused for the blog listing card, OG/Twitter meta tags, and "Keep Reading" related-post cards).

**Out of scope** (deferred to later sessions, per user direction):
- Inline body images / extending the markdown renderer to support embedded images — not touched. No changes to `src/app/(storefront)/blog/[slug]/page.tsx`'s rendering logic beyond swapping image paths.
- Product gallery images and "How to Use" ritual-step images — separate follow-up passes.
- Avatar testimonial video quality — separate, unrelated issue.
- Baked-in text/captions inside the image — explicitly rejected; all text stays live HTML in the existing layout (eyebrows, headings, captions), per current site pattern.

## 3. Visual Style Direction

Warm, editorial, in-context shots — not Nathabit's neutral-background ingredient-isolation style. Each image shows three things in frame together: the real Jaison packaging, the raw ingredient, and a small human/process gesture (pouring, mixing, scooping, applying). Shot on warm textured surfaces (raw wood, linen, or stone) in soft natural daylight.

**Style bible** (appended to every prompt below):

> Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging (when a reference photo is supplied). Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

**Packaging accuracy:** For the 9 posts that map to a real, active product, `nano_banana_pro` is seeded with the existing real product photo as an image reference (role: `image`) so the generated packaging/label matches the real thing instead of being hallucinated. Bhringraj (delisted, no real packaging) gets an ingredient-only macro shot with no product reference and no packaging in frame.

## 4. Per-Post Specs

All outputs: 16:9 aspect ratio, 2k resolution, generated as image then converted to `.webp` via `cwebp` (matches every existing blog image's format), saved to `public/images/blog/`.

| # | Post slug | New file | Reference image(s) | Prompt (style bible appended) |
|---|---|---|---|---|
| 1 | `how-to-use-ubtan-for-glowing-skin` | `ubtan-ritual.webp` | `/images/products/ubtan.webp` | Close-up shot of hands applying golden turmeric-sandalwood ubtan paste to a forearm; a brass bowl of the mixed paste and the Jaison Ubtan Powder pouch resting on a warm wooden surface beside the arm; shallow depth of field. |
| 2 | `amla-powder-benefits-for-hair-growth` | `amla-hairgrowth.webp` | `/images/products/amla-front.webp` | Amla powder pouring from the Jaison Aamla Powder pouch into a wooden bowl; dried amla berries scattered alongside; a loose lock of dark hair draped near the bowl to signal the hair-growth use case. |
| 3 | `multani-mitti-face-pack-recipes` | `multani-facepack.webp` | `/images/products/multani-front.webp` | The Jaison Multani Mitti pouch beside a clay bowl of wet grey-green clay paste; a small spatula mid-mix in the bowl; stone surface. |
| 4 | `natural-hair-wash-shikakai-reetha-amla` | `hairwash-trio.webp` | `/images/products/shikakai-front.webp`, `/images/products/reetha-front.webp`, `/images/products/amla-front.webp` | All three Jaison pouches (Shikakai, Reetha, Amla) grouped together on a wooden surface with their raw pods/berries scattered between them; a few water droplets nearby suggesting a wash ritual. |
| 5 | `neem-powder-for-acne-clear-skin` | `neem-acne.webp` | `/images/products/neem-front.webp` | The Jaison Neem Powder pouch with a small heap of fresh and dried neem leaves beside it; neem powder spilling from an overturned wooden scoop onto a dark wood surface. |
| 6 | `ayurvedic-skincare-routine-for-beginners` | `morning-ritual.webp` | `/images/products/ubtan.webp`, `/images/products/multani-front.webp`, `/images/products/neem-front.webp` | Overhead flat-lay of three Jaison pouches (Ubtan, Multani Mitti, Neem) arranged with small wooden scoops on a linen surface, suggesting a simple morning routine; soft directional light. |
| 7 | `orange-peel-powder-benefits-for-face` | `orange-peel-face.webp` | `/images/products/orange-front.webp` | The Jaison Orange Peel Powder pouch beside dried orange peel curls and two fresh orange slices; warm citrus-gold tones kept within the brand palette. |
| 8 | `bhringraj-powder-for-hair-growth` | `bhringraj-styled.webp` | *(none — no real product exists)* | Macro shot of dried bhringraj (false daisy) leaves and a small heap of bhringraj powder in a clay bowl on a wooden surface; no packaging, no branding, ingredient-only. |
| 9 | `reetha-soapnut-benefits-for-hair` | `reetha-soapnut.webp` | `/images/products/reetha-front.webp` | The Jaison Reetha Powder pouch with whole dried soapnuts beside it, two or three cracked open showing the seeds inside; a few water droplets for a natural-suds suggestion. |
| 10 | `mehendi-henna-natural-hair-colour-guide` | `mehendi-ritual.webp` | `/images/products/mhendi-front.webp` | The Jaison Mehendi Powder pouch beside fresh henna leaves and a small bowl of mixed green henna paste; a wooden applicator brush resting on the bowl's edge. |

## 5. Technical Workflow

1. For each row: call `generate_image` with `model: nano_banana_pro`, the prompt above, `aspect_ratio: 16:9`, `resolution: 2k`, and the listed reference image(s) uploaded via `media_import_url`/`media_upload` and passed as `medias[].value` with `role: image`.
2. Review each result for artifacts: warped/invented label text, extra fingers/limbs, a color grade that clashes with the brand palette, or packaging that doesn't match the real product. Regenerate (same prompt, new seed) if any of these appear — don't chase perfection beyond that bar.
3. Download the accepted image, convert to `.webp` with `cwebp`, save to `public/images/blog/<filename>` per the table above.
4. Update the `image` field for all 10 posts in `src/data/blog.ts` to point at the new files (removing the `neem-styled.webp` / `bhringraj` duplicate in the process).
5. Leave the old files in `public/images/blog/` (e.g. `ubtan-styled.webp`, `mhendi-front.webp`) untouched — they may still be referenced elsewhere (homepage sections, product galleries); deleting unused ones is a separate cleanup, not part of this pass.

## 6. Success Criteria

- All 10 posts have a unique cover image; no two posts share a file.
- Every active-product post's image clearly shows that product's real Jaison packaging, matching the actual label.
- The Bhringraj post has its own ingredient photo instead of the borrowed Neem image — closing out the existing roadmap item in `CLAUDE.md` ("Bhringraj blog image — placeholder is `neem-styled.webp`").
- No baked-in text in any image; all visible text remains live HTML.
- Blog listing page, individual post pages, OG/Twitter previews, and "Keep Reading" cards all render the new images correctly (visually spot-check, since this is asset + data-only change with no template logic touched).
