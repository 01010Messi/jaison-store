# Jaison — Design System Reference

Single source of truth for the storefront's visual language. If a value isn't in here, it probably shouldn't be in the code. Last updated: June 2026 (`redesign/v2`).

---

## 1. Color tokens

Defined twice, **always in sync**: Tailwind tokens in `tailwind.config.ts` (for `className`) and CSS variables in `globals.css` `:root` (for inline `style={{}}`).

| Token | Hex | Use |
|---|---|---|
| `bark` | `#1A3C34` | Primary text, dark surfaces. Never use pure black. |
| `bark-light` | `#2A5C50` | Hover states on bark |
| `cream` | `#FEFAE0` | Default page background (`surface` is an alias) |
| `cream-50` / `cream-100` | `#FFFDF0` / `#FBF4D8` | Subtle cream steps |
| `parchment` | `#EFE4C5` | Warm section background (`surface-warm` is an alias) |
| `parchment-dark` | `#E0CFA6` | Borders on parchment (`border` is an alias) |
| `terracotta` | `#834316` | Accent text, italic heading accents, links. 7.2:1 on cream ✅ |
| `terracotta-light` | `#A56843` | Large accent text only (fails AA at small sizes) |
| `terracotta-dark` | `#6B370F` | Hover on terracotta |
| `sage` | `#606C38` (light `#87964F`, dark `#36541F`) | Botanical accents, category labels |
| `gold` | `#B89968` | Ornaments, rules, display numerals — **decorative only**, 2.4:1 on cream |
| `gold-light` / `gold-dark` | `#D2BA96` / `#A08A64` | Gold steps |
| `border` / `border-light` | `#E0CFA6` / `#F2E9CC` | Hairlines |

**Alias rule:** `surface`/`surface-warm`/`surface-dark`/`border` are the *semantic* names — prefer them for backgrounds and borders; use the raw family names (`cream`, `parchment`…) for text and decorative color.

**Hardcoding rule:** no raw hex in `.tsx`. In `className` use token classes; in `style={{}}` use `var(--color-*)`. Exceptions (hex required, CSS vars unavailable): `lib/email.ts`, `lib/invoice.ts` (emails/PDFs), `manifest`/`theme-color` metadata.

**One-off values that are sanctioned:** `#FAF3E4` (StepCard "tint" background — between cream and parchment, lives only in `ui/StepCard.tsx`); `#E26713` (the why-powder bright accent); `#C1714F` (toast error icon). Don't copy these elsewhere.

## 2. Typography

Fonts (loaded in `app/layout.tsx` via next/font):

| Class | Font | Role |
|---|---|---|
| `font-heading` | Cormorant Garamond (300/400/500 + italic) | Display headings, numerals |
| `font-body` | DM Sans | Body copy, prices, buttons |
| `font-accent` | Inter | Eyebrows, labels, uppercase microcopy |

**Display scale** — the four named heading sizes. Use `ui/SectionHeader` where possible; if you must inline, use exactly these clamps:

| Name | Clamp | Where |
|---|---|---|
| `display-sm` | `clamp(1.75rem, 4vw, 2.75rem)` | Page sub-heroes, policy pages |
| `display-md` | `clamp(2.25rem, 4vw, 3rem)` | Standard section heading (SectionHeader `size="md"`) |
| `display-lg` | `clamp(2.5rem, 5vw, 4rem)` | Feature sections (SectionHeader `size="lg"`) |
| `display-xl` | `clamp(2.25rem, 6vw, 5rem)` | Home hero-grade headings (SectionHeader `size="xl"`) |

Watermarks use bigger clamps (`clamp(8rem, 24vw, 20rem)` etc.) — decorative, see §6.

**Eyebrow spec (the only one):** `font-accent text-[11px] tracking-[0.22em] uppercase`. Tones: muted = `text-bark/60`, accent = `text-terracotta` (not `terracotta-light` — contrast). Optional leading gold em-dash. Implemented in `SectionHeader`; don't invent new sizes/trackings (10px/13px and 0.18em/0.28em variants are legacy — migrate on touch).

**Tracking scale — exactly two:** `tracking-[0.22em]` is reserved for section eyebrows only (see spec above). `tracking-[0.14em]` is for interactive labels and buttons (form field labels, pill CTAs, nav links). Don't mix the two or invent a third value.

**Micro sizes:** `text-[10px]`/`text-[11px]` are allowed for chips and labels only, never for content users must read.

## 3. Spacing & layout

- **Section rhythm — exactly two:** `.section-rhythm` (`py-12 md:py-16`) for standard sections, `.section-rhythm-lg` (`py-16 md:py-24`) for feature sections. Defined in `globals.css`. Other paddings are legacy — converge on touch.
- **Page width:** `container-brand` (`max-w-7xl` + responsive px) everywhere, **except** the home hero, which is intentionally full-width with `px-6 md:px-10 lg:px-14`. That's the only sanctioned exception.

## 4. Radius

| Radius | Use |
|---|---|
| `rounded-full` | Everything interactive shaped like a pill: buttons, CTAs, chips, badges, tab pills, qty steppers, tooltips |
| `rounded-xl` (12px) | Cards, images, gallery, thumbnails, panels, skeletons, modals, toasts |
| `rounded-lg` (8px) | Form fields (Input, Select, textareas) |
| `rounded-sm` (2px) | **Retired.** Do not use in new code. |

## 5. Color & contrast rules

- **Muted text:** minimum `/60` on cream/parchment, minimum `/70` on bark. Anything below those opacities is *decorative only* (watermarks, ornament glyphs) and must be `aria-hidden`.
- Gold numerals/ornaments are decorative; the step semantics are duplicated for screen readers in `StepCard` (`sr-only`).
- `terracotta` is the accessible accent for small text; `terracotta-light` only at display sizes.

## 6. Recipes

**Heading pattern** — use `ui/SectionHeader`:
```tsx
<SectionHeader
  eyebrow="The Ritual · Five Steps"
  eyebrowDash            // leading gold "—"
  eyebrowTone="accent"   // terracotta; default "muted" = bark/60
  title="How to use"
  accent="our powders."  // italic terracotta
  accentPlacement="inline" // or "block" (own line, the default)
  size="xl"              // md | lg | xl
  note="Optional small supporting paragraph"
/>
```

**Watermark** — giant italic heading text pinned to a section corner:
```tsx
<div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden" aria-hidden="true">
  <span className="font-heading font-light italic leading-none whitespace-nowrap"
    style={{ fontSize: "clamp(8rem, 24vw, 20rem)", color: "rgba(254,250,224,0.04)",
             letterSpacing: "-0.04em", marginBottom: "-0.18em", marginRight: "-0.04em" }}>
    powder
  </span>
</div>
```
Opacity 0.03–0.06, always `aria-hidden` + `pointer-events-none select-none`, parent needs `overflow-hidden`.

**Glow pill** (`ui/GlowPillLink`) — pass a `hoverShadow`:
- On dark/terracotta sections: `0 0 28px rgba(254, 250, 224, 0.35)` (cream glow)
- On light sections: `0 0 0 3px rgba(131,67,22,0.25), 0 8px 28px rgba(131,67,22,0.35)` (terracotta ring + glow)

**Shadows:** `shadow-warm` / `shadow-warm-lg` / `shadow-warm-xl` (bark-tinted) for elevation; `shadow-gold` only for gold CTAs.

## 7. Components (src/components/ui)

| Component | Notes |
|---|---|
| `Button` | 5 variants, 3 sizes, pill. Use for all buttons; don't hand-roll. |
| `GlowPillLink` | Pill link with hover glow (see recipe) |
| `SectionHeader` | THE heading pattern — eyebrow/title/accent/note |
| `StepCard` | Numbered step/stat card. `background="cream"` (photo cards) or `"tint"` (product ritual) |
| `QtyStepper` | `size="md"` bordered pill (product page), `size="sm"` compact (cart rows). Cart usage passes `min={0}` so decrementing to zero removes the item. |
| `Accordion` | ARIA complete (`aria-expanded`/`aria-controls`/region). `titleClassName` to restyle; used by `ProductFAQ`. |
| `Tabs` | ARIA tabs + arrow-key roving focus. `variant="underline" \| "pills"`. Exception: `ProductStory` keeps structural full-bleed tab panels but implements the same ARIA pattern inline. |
| `Modal` / `Drawer` | `role="dialog"`, focus trap (`hooks/useFocusTrap`), Escape, focus restore. |
| `Input` / `Select` | `rounded-lg`, label/error support |
| Decorative (`GoldRule`, `SectionDivider`, `OrnamentalBorder`, `ScrollReveal`) | All `aria-hidden` where visual-only |

**Pill vs Button rule:** if it submits/acts → `Button`. If it navigates and needs the glow treatment → `GlowPillLink`. Plain text links → underline pattern (`gold-underline`).

**Known gaps (build when next needed, don't inline):** Breadcrumb, Pagination, FormField wrapper, EmptyState, branded toast wrapper beyond the global Toaster style.

## 8. Accessibility floor

- Keyboard focus: global `:focus-visible` ring in `globals.css` — bark on light surfaces, cream inside `.bg-bark`/`.bg-surface-dark`. **Never** add `focus:outline-none`.
- Disclosure widgets must have ARIA (use the primitives — they're done).
- Reduced motion: CSS animations collapse via the global `prefers-reduced-motion` block; Framer Motion respects it via `MotionProvider` (`reducedMotion="user"`) in the root layout; `ScrollReveal` content stays visible (`.reveal-pending`) for reduced-motion and no-JS users.
- Decorative SVGs/ornaments: `aria-hidden="true"`.

## 9. Conventions

- **z-index scale:**

  | Value | Use |
  |---|---|
  | `0` | Default content |
  | `10` | Overlays within a section (image badges, gradient caption bars) |
  | `20` | Floating UI (dropdowns, tooltips, popovers) |
  | `30` | Sticky header |
  | `40` | Backdrops (modal/drawer scrims) |
  | `50` | Modals, drawers, toasts |

  Don't invent values between these six.
- **Inline styles:** allowed (the codebase convention avoids dynamic Tailwind classes), but colors must be `var(--color-*)` and font sizes must come from the display scale above.
- **Animations:** use the named keyframes in `tailwind.config.ts` (`fade-up`, `scale-in`, …) with `ease-out-expo`. Infinite animations (marquee, ping) must be killed by reduced-motion (the global block handles CSS; check any new JS-driven loop).
