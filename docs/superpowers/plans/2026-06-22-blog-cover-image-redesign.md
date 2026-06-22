# Blog Cover Image Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all 10 blog post cover images with unique, on-brand, AI-generated images (via Higgsfield `nano_banana_pro`) that show real product packaging plus ingredient/process storytelling, and fix the Neem/Bhringraj duplicate.

**Architecture:** No code/template changes. Each task generates one image via the Higgsfield MCP tools already available in this session, converts it to `.webp`, and saves it to `public/images/blog/`. A final task updates the 10 `image:` fields in `src/data/blog.ts` to point at the new files.

**Tech Stack:** Higgsfield MCP tools (`media_upload`, `media_confirm`, `generate_image`, `job_status`), `curl`, `cwebp`, `webpinfo`.

## Global Constraints

- Model: `nano_banana_pro`. Every prompt below has the style bible already appended — do not add, remove, or rephrase it.
- Output: 16:9 aspect ratio, 2k resolution, final format `.webp` (matches every existing file in `public/images/blog/`).
- No on-image text of any kind. No invented logos. No packaging that isn't seeded from a real reference photo (except Bhringraj, which intentionally has no packaging).
- Accept the first generation unless there's a clear artifact (warped/invented label text, extra fingers/limbs, off-palette color grade, packaging that doesn't match the reference) — regenerate once if so, don't chase perfection beyond that.
- Spec: `docs/superpowers/specs/2026-06-22-blog-cover-image-redesign-design.md` — refer back to it if anything below is ambiguous.

---

## Shared Workflow (applies to Tasks 1–10)

Each image task follows this exact sequence:

**A. Upload reference image(s)** (skip for Task 8, which has no reference):
- Call `mcp__claude_ai_Higgsfield__media_upload` with `filename` set to the reference file's basename (e.g. `ubtan.webp`) and `content_type: "image/webp"`. For tasks with multiple references, pass them via the `files` array in one call.
- For each returned `upload_url`, run: `curl -X PUT --data-binary @<repo-path-to-reference> -H "Content-Type: image/webp" "<upload_url>"`
- Call `mcp__claude_ai_Higgsfield__media_confirm` with the returned `media_id` (or `media_ids` for multiple) and `type: "image"`.

**B. Generate:**
- Call `mcp__claude_ai_Higgsfield__generate_image` with:
  - `params.model`: `"nano_banana_pro"`
  - `params.prompt`: the task's prompt text (below)
  - `params.aspect_ratio`: `"16:9"`
  - `params.resolution`: `"2k"`
  - `params.medias`: `[{ "value": "<media_id>", "role": "image" }, ...]` (one entry per uploaded reference; omit entirely for Task 8)

**C. Poll and retrieve:**
- Call `mcp__claude_ai_Higgsfield__job_status` with the returned `jobId` and `sync: true`. If not yet terminal, wait `poll_after_seconds` and call again.
- On success, get the output image URL from the response.

**D. Download and convert:**
- `curl -o /tmp/<task-name>-raw.png "<output-url>"`
- `cwebp -q 90 /tmp/<task-name>-raw.png -o /tmp/<task-name>.webp`
- `webpinfo /tmp/<task-name>.webp` — confirm it reports a valid WebP with a 16:9-ish dimension ratio (e.g. 1920x1080, 2048x1152). If `webpinfo` errors or reports a 0-byte/corrupt file, redo step C/D.

**E. Visual review:**
- Read the `.webp` file with the Read tool and look for: warped/invented label text, extra fingers/limbs, a color grade outside cream/parchment/terracotta/sage/bark/gold, or (for Tasks 1–7, 9–10) packaging that doesn't match the reference photo's real label.
- If a clear artifact is present, repeat step B once with the same prompt (new generation = new seed) before proceeding. If still flawed, flag it in your task summary instead of looping indefinitely.

**F. Place and commit:**
- `mv /tmp/<task-name>.webp public/images/blog/<final-filename>`
- `git add public/images/blog/<final-filename>`
- Commit (message given per task).

---

### Task 1: Ubtan cover image

**Files:**
- Create: `public/images/blog/ubtan-ritual.webp`
- Reference (read-only): `public/images/products/ubtan.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/ubtan-ritual.webp`, used by Task 11 for the `how-to-use-ubtan-for-glowing-skin` post.

- [ ] **Step 1: Upload reference**

Upload `public/images/products/ubtan.webp` per Shared Workflow step A.

- [ ] **Step 2: Generate**

Prompt:
> Close-up shot of hands applying golden turmeric-sandalwood ubtan paste to a forearm; a brass bowl of the mixed paste and the Jaison Ubtan Powder pouch resting on a warm wooden surface beside the arm; shallow depth of field. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/ubtan-ritual.webp public/images/blog/ubtan-ritual.webp
git add public/images/blog/ubtan-ritual.webp
git commit -m "feat(blog-images): add ubtan ritual cover image"
```

---

### Task 2: Amla cover image

**Files:**
- Create: `public/images/blog/amla-hairgrowth.webp`
- Reference (read-only): `public/images/products/amla-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/amla-hairgrowth.webp`, used by Task 11 for the `amla-powder-benefits-for-hair-growth` post.

- [ ] **Step 1: Upload reference**

Upload `public/images/products/amla-front.webp` per Shared Workflow step A.

- [ ] **Step 2: Generate**

Prompt:
> Amla powder pouring from the Jaison Aamla Powder pouch into a wooden bowl; dried amla berries scattered alongside; a loose lock of dark hair draped near the bowl to signal the hair-growth use case. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/amla-hairgrowth.webp public/images/blog/amla-hairgrowth.webp
git add public/images/blog/amla-hairgrowth.webp
git commit -m "feat(blog-images): add amla hair-growth cover image"
```

---

### Task 3: Multani Mitti cover image

**Files:**
- Create: `public/images/blog/multani-facepack.webp`
- Reference (read-only): `public/images/products/multani-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/multani-facepack.webp`, used by Task 11 for the `multani-mitti-face-pack-recipes` post.

- [ ] **Step 1: Upload reference**

Upload `public/images/products/multani-front.webp` per Shared Workflow step A.

- [ ] **Step 2: Generate**

Prompt:
> The Jaison Multani Mitti pouch beside a clay bowl of wet grey-green clay paste; a small spatula mid-mix in the bowl; stone surface. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/multani-facepack.webp public/images/blog/multani-facepack.webp
git add public/images/blog/multani-facepack.webp
git commit -m "feat(blog-images): add multani mitti face-pack cover image"
```

---

### Task 4: Shikakai/Reetha/Amla hair-wash cover image

**Files:**
- Create: `public/images/blog/hairwash-trio.webp`
- Reference (read-only): `public/images/products/shikakai-front.webp`, `public/images/products/reetha-front.webp`, `public/images/products/amla-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/hairwash-trio.webp`, used by Task 11 for the `natural-hair-wash-shikakai-reetha-amla` post.

- [ ] **Step 1: Upload references**

Upload all three references in one `media_upload` call via the `files` array, per Shared Workflow step A. Confirm all three `media_id`s with one `media_confirm` call using `media_ids`.

- [ ] **Step 2: Generate**

Prompt:
> All three Jaison pouches (Shikakai, Reetha, Amla) grouped together on a wooden surface with their raw pods/berries scattered between them; a few water droplets nearby suggesting a wash ritual. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Pass all three `media_id`s in `params.medias`, each with `role: "image"`. Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/hairwash-trio.webp public/images/blog/hairwash-trio.webp
git add public/images/blog/hairwash-trio.webp
git commit -m "feat(blog-images): add shikakai-reetha-amla hair-wash cover image"
```

---

### Task 5: Neem cover image

**Files:**
- Create: `public/images/blog/neem-acne.webp`
- Reference (read-only): `public/images/products/neem-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/neem-acne.webp`, used by Task 11 for the `neem-powder-for-acne-clear-skin` post.

- [ ] **Step 1: Upload reference**

Upload `public/images/products/neem-front.webp` per Shared Workflow step A.

- [ ] **Step 2: Generate**

Prompt:
> The Jaison Neem Powder pouch with a small heap of fresh and dried neem leaves beside it; neem powder spilling from an overturned wooden scoop onto a dark wood surface. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/neem-acne.webp public/images/blog/neem-acne.webp
git add public/images/blog/neem-acne.webp
git commit -m "feat(blog-images): add neem acne cover image"
```

---

### Task 6: Ayurvedic routine for beginners cover image

**Files:**
- Create: `public/images/blog/morning-ritual.webp`
- Reference (read-only): `public/images/products/ubtan.webp`, `public/images/products/multani-front.webp`, `public/images/products/neem-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/morning-ritual.webp`, used by Task 11 for the `ayurvedic-skincare-routine-for-beginners` post.

- [ ] **Step 1: Upload references**

Upload all three references in one `media_upload` call via the `files` array, per Shared Workflow step A. Confirm all three `media_id`s with one `media_confirm` call using `media_ids`.

- [ ] **Step 2: Generate**

Prompt:
> Overhead flat-lay of three Jaison pouches (Ubtan, Multani Mitti, Neem) arranged with small wooden scoops on a linen surface, suggesting a simple morning routine; soft directional light. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Pass all three `media_id`s in `params.medias`, each with `role: "image"`. Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/morning-ritual.webp public/images/blog/morning-ritual.webp
git add public/images/blog/morning-ritual.webp
git commit -m "feat(blog-images): add beginner morning-ritual cover image"
```

---

### Task 7: Orange Peel cover image

**Files:**
- Create: `public/images/blog/orange-peel-face.webp`
- Reference (read-only): `public/images/products/orange-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/orange-peel-face.webp`, used by Task 11 for the `orange-peel-powder-benefits-for-face` post.

- [ ] **Step 1: Upload reference**

Upload `public/images/products/orange-front.webp` per Shared Workflow step A.

- [ ] **Step 2: Generate**

Prompt:
> The Jaison Orange Peel Powder pouch beside dried orange peel curls and two fresh orange slices; warm citrus-gold tones kept within the brand palette. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/orange-peel-face.webp public/images/blog/orange-peel-face.webp
git add public/images/blog/orange-peel-face.webp
git commit -m "feat(blog-images): add orange peel face cover image"
```

---

### Task 8: Bhringraj cover image (no reference — ingredient only)

**Files:**
- Create: `public/images/blog/bhringraj-styled.webp`
- Reference: none — Bhringraj has no real Jaison packaging (delisted from catalogue, see `CLAUDE.md`).

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/bhringraj-styled.webp`, used by Task 11 for the `bhringraj-powder-for-hair-growth` post. This also replaces the borrowed `neem-styled.webp` placeholder this post currently uses, closing the open roadmap item in `CLAUDE.md` ("Bhringraj blog image — placeholder is `neem-styled.webp`").

- [ ] **Step 1: Generate (no reference upload — skip Shared Workflow step A)**

Prompt:
> Macro shot of dried bhringraj (false daisy) leaves and a small heap of bhringraj powder in a clay bowl on a wooden surface; no packaging, no branding, ingredient-only. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Call `generate_image` with `params.model: "nano_banana_pro"`, the prompt above, `aspect_ratio: "16:9"`, `resolution: "2k"`, and no `medias` field. Run Shared Workflow steps C–E (review for artifacts; there's no packaging-match check here since there's no reference, but still check for warped botanical detail and off-palette color).

- [ ] **Step 2: Place and commit**

```bash
mv /tmp/bhringraj-styled.webp public/images/blog/bhringraj-styled.webp
git add public/images/blog/bhringraj-styled.webp
git commit -m "feat(blog-images): add bhringraj ingredient cover image, replacing borrowed neem placeholder"
```

---

### Task 9: Reetha cover image

**Files:**
- Create: `public/images/blog/reetha-soapnut.webp`
- Reference (read-only): `public/images/products/reetha-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/reetha-soapnut.webp`, used by Task 11 for the `reetha-soapnut-benefits-for-hair` post.

- [ ] **Step 1: Upload reference**

Upload `public/images/products/reetha-front.webp` per Shared Workflow step A.

- [ ] **Step 2: Generate**

Prompt:
> The Jaison Reetha Powder pouch with whole dried soapnuts beside it, two or three cracked open showing the seeds inside; a few water droplets for a natural-suds suggestion. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/reetha-soapnut.webp public/images/blog/reetha-soapnut.webp
git add public/images/blog/reetha-soapnut.webp
git commit -m "feat(blog-images): add reetha soapnut cover image"
```

---

### Task 10: Mehendi cover image

**Files:**
- Create: `public/images/blog/mehendi-ritual.webp`
- Reference (read-only): `public/images/products/mhendi-front.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `public/images/blog/mehendi-ritual.webp`, used by Task 11 for the `mehendi-henna-natural-hair-colour-guide` post.

- [ ] **Step 1: Upload reference**

Upload `public/images/products/mhendi-front.webp` per Shared Workflow step A.

- [ ] **Step 2: Generate**

Prompt:
> The Jaison Mehendi Powder pouch beside fresh henna leaves and a small bowl of mixed green henna paste; a wooden applicator brush resting on the bowl's edge. Warm, earthy Ayurvedic skincare brand aesthetic. Soft natural daylight, warm textured surface (raw wood, linen, or stone). Muted warm color grade — cream, parchment, terracotta, sage, bark, gold tones only, no cool blues or neon. Macro/tactile emphasis on powders and raw ingredients. No on-image text, no invented logos, no readable label text beyond what's on the real product packaging. Calm, premium, artisanal mood. Photorealistic editorial product photography, not illustration.

Run Shared Workflow steps B–E.

- [ ] **Step 3: Place and commit**

```bash
mv /tmp/mehendi-ritual.webp public/images/blog/mehendi-ritual.webp
git add public/images/blog/mehendi-ritual.webp
git commit -m "feat(blog-images): add mehendi ritual cover image"
```

---

### Task 11: Point blog data at the new images

**Files:**
- Modify: `src/data/blog.ts` (10 lines, one `image:` field per post)

**Interfaces:**
- Consumes: all 10 files produced by Tasks 1–10 (must all exist in `public/images/blog/` before this task runs).
- Produces: updated `image:` fields read by `src/app/(storefront)/blog/[slug]/page.tsx` and `src/app/(storefront)/blog/page.tsx`.

- [ ] **Step 1: Verify all 10 new files exist**

```bash
ls -la public/images/blog/ubtan-ritual.webp public/images/blog/amla-hairgrowth.webp public/images/blog/multani-facepack.webp public/images/blog/hairwash-trio.webp public/images/blog/neem-acne.webp public/images/blog/morning-ritual.webp public/images/blog/orange-peel-face.webp public/images/blog/bhringraj-styled.webp public/images/blog/reetha-soapnut.webp public/images/blog/mehendi-ritual.webp
```

Expected: all 10 files listed with non-zero size. If any are missing, stop and go back to the corresponding task — do not proceed with a partial edit.

- [ ] **Step 2: Update each post's `image` field**

In `src/data/blog.ts`, change each of these 10 lines (matched by their current value, since exact line numbers shift as the file is edited):

| Post slug | Old `image` value | New `image` value |
|---|---|---|
| `how-to-use-ubtan-for-glowing-skin` | `"/images/blog/ubtan-styled.webp"` | `"/images/blog/ubtan-ritual.webp"` |
| `amla-powder-benefits-for-hair-growth` | `"/images/blog/amla-styled.webp"` | `"/images/blog/amla-hairgrowth.webp"` |
| `multani-mitti-face-pack-recipes` | `"/images/blog/multani-styled.webp"` | `"/images/blog/multani-facepack.webp"` |
| `natural-hair-wash-shikakai-reetha-amla` | `"/images/blog/shikakai-styled.webp"` | `"/images/blog/hairwash-trio.webp"` |
| `neem-powder-for-acne-clear-skin` | `"/images/blog/neem-styled.webp"` | `"/images/blog/neem-acne.webp"` |
| `ayurvedic-skincare-routine-for-beginners` | `"/images/blog/ubtan-styled2.webp"` | `"/images/blog/morning-ritual.webp"` |
| `orange-peel-powder-benefits-for-face` | `"/images/blog/orange-styled.webp"` | `"/images/blog/orange-peel-face.webp"` |
| `bhringraj-powder-for-hair-growth` | `"/images/blog/neem-styled.webp"` | `"/images/blog/bhringraj-styled.webp"` |
| `reetha-soapnut-benefits-for-hair` | `"/images/blog/reetha-styled.webp"` | `"/images/blog/reetha-soapnut.webp"` |
| `mehendi-henna-natural-hair-colour-guide` | `"/images/blog/mhendi-front.webp"` | `"/images/blog/mehendi-ritual.webp"` |

Make each edit individually (each old value is unique in the file as an `image:` field, since they're distinct file paths).

- [ ] **Step 3: Confirm no duplicates remain**

```bash
grep -n 'image: "/images/blog/' src/data/blog.ts
```

Expected: 10 lines, all 10 values distinct (no two posts pointing at the same file).

- [ ] **Step 4: Build check**

```bash
npm run build
```

Expected: build succeeds with no type/lint errors. (This is a static-data-only change — `src/app/(storefront)/blog/[slug]/page.tsx` has no Prisma/DB dependency, so no env vars are needed for this check.)

- [ ] **Step 5: Visual spot check**

```bash
npm run dev
```

Then in a browser:
- Visit `/blog` and confirm all 10 cards show distinct, on-brand images (no duplicates, no broken images).
- Visit `/blog/bhringraj-powder-for-hair-growth` and confirm it shows the new ingredient-only image, not the Neem image.
- Visit one other post (e.g. `/blog/how-to-use-ubtan-for-glowing-skin`) and confirm the cover image renders correctly at the top of the article and in its "Keep Reading" card on another post.

Stop the dev server when done.

- [ ] **Step 6: Commit**

```bash
git add src/data/blog.ts
git commit -m "feat(blog): point all 10 posts at new redesigned cover images

Fixes the Neem/Bhringraj image duplicate — Bhringraj now has its own
ingredient-only photo instead of reusing neem-styled.webp."
```

---

## Self-Review Notes

- **Spec coverage:** Every row of the spec's per-post table (§4) maps to one task (1–10); the spec's technical workflow (§5) maps to the Shared Workflow + Task 11; the duplicate-fix and Bhringraj roadmap-closure success criteria (§6) are handled in Task 8 + Task 11 Step 3.
- **Placeholder scan:** No TBD/TODO. Runtime-only values (`upload_url`, `media_id`, `jobId`, output URLs) are necessarily left as "the value returned by the previous call" since they don't exist until execution — every static value (prompts, paths, filenames, model params) is written out in full.
- **Type/name consistency:** Filenames in each task's "Produces" line match exactly what Task 11's table expects as the "New `image` value." Reference paths in each task match the primary `image` field for that product in `src/data/products.ts`.
- **Scope check:** Single subsystem (blog cover images only), no code/template changes — appropriately one plan, not decomposed further.
