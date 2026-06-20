"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";

type ProductRec = {
  name: string;
  slug: string;
  category: string;
  latin: string;
  price: number;
  compareAt?: number;
  badge: string;
  image: string;
  dot: string;
  bg: string;
};

const questions = [
  {
    step: 1,
    heading: "What's your main concern?",
    subtitle: "Pick the one closest to what you'd like to improve.",
    options: [
      { value: "oily",      label: "Breakouts and oil",       recommended: true,  bg: "#EDF2EC", dot: "#4A7C59" },
      { value: "dull",      label: "Dull or uneven tone",     recommended: false, bg: "#F7F2E4", dot: "#7A5012" },
      { value: "sensitive", label: "Sensitivity and redness", recommended: false, bg: "#F2EDF2", dot: "#9B7BAE" },
      { value: "hair",      label: "Hair fall or thinning",   recommended: false, bg: "#F2EDE8", dot: "#A0784A" },
    ],
  },
  {
    step: 2,
    heading: "What's your skin type?",
    subtitle: "This helps us match the right base for you.",
    options: [
      { value: "oily_t",  label: "Oily",        recommended: false, bg: "#F5EDE8", dot: "#C16B4A" },
      { value: "dry_t",   label: "Dry",         recommended: false, bg: "#F7F2E4", dot: "#7A5012" },
      { value: "combo_t", label: "Combination", recommended: true,  bg: "#EDF2EC", dot: "#4A7C59" },
      { value: "norm_t",  label: "Normal",      recommended: false, bg: "#EDF2EC", dot: "#3A6B4A" },
    ],
  },
  {
    step: 3,
    heading: "How often would you like to use it?",
    subtitle: "Twice a week suits most skin and hair concerns.",
    options: [
      { value: "once",  label: "Once a week",     recommended: false, bg: "#EDF2EC", dot: "#4A7C59" },
      { value: "twice", label: "Twice a week",    recommended: true,  bg: "#F7F2E4", dot: "#7A5012" },
      { value: "alt",   label: "Every other day", recommended: false, bg: "#F5EDE8", dot: "#C16B4A" },
      { value: "daily", label: "Daily",           recommended: false, bg: "#FDEEE8", dot: "#D4784A" },
    ],
  },
  {
    step: 4,
    heading: "What would you like to mix it with?",
    subtitle: "Rose water suits most people — you can change it anytime.",
    options: [
      { value: "rose",   label: "Rose water",  recommended: true,  bg: "#F5EDE8", dot: "#C16B4A" },
      { value: "milk",   label: "Raw milk",    recommended: false, bg: "#F7F2E4", dot: "#7A5012" },
      { value: "yogurt", label: "Yogurt",      recommended: false, bg: "#EDF2EC", dot: "#4A7C59" },
      { value: "water",  label: "Plain water", recommended: false, bg: "#EFF0F5", dot: "#7B7BAE" },
    ],
  },
];

/* Quiz-only presentation for each recommendable product. Name, price,
   compare-at and image come from the catalog (src/data/products.ts) so
   they can never drift from the shop. */
const productMeta: Record<
  string,
  { latin: string; badge: string; dot: string; bg: string }
> = {
  "ubtan-powder":       { latin: "Curcuma longa + 7 herbs", badge: "22% OFF",        dot: "#7A5012", bg: "#F7F2E4" },
  "neem-powder":        { latin: "Azadirachta indica",      badge: "ANTIBACTERIAL",  dot: "#4A7C59", bg: "#EDF2EC" },
  "multani-mitti":      { latin: "Fuller's Earth Clay",     badge: "DEEP CLEAN",     dot: "#C16B4A", bg: "#F5EDE8" },
  "orange-peel-powder": { latin: "Citrus sinensis peel",    badge: "VITAMIN C",      dot: "#D4784A", bg: "#FEF0E8" },
  "nagarmotha-powder":  { latin: "Cyperus rotundus",        badge: "EVEN TONE",      dot: "#A0784A", bg: "#F2EDE8" },
  "aamla-powder":       { latin: "Phyllanthus emblica",     badge: "STRENGTHENING",  dot: "#4A7C59", bg: "#EDF2EC" },
  "shikakai-powder":    { latin: "Acacia concinna",         badge: "NATURAL SHINE",  dot: "#2D6B4A", bg: "#E8F0EC" },
  "reetha-powder":      { latin: "Sapindus mukorossi",      badge: "GENTLE CLEANSE", dot: "#7B8C5A", bg: "#EFF2E8" },
};

function toProductRec(slug: string): ProductRec | null {
  const product = getProductBySlug(slug);
  const meta = productMeta[slug];
  if (!product || !meta) return null;
  return {
    name: product.name,
    slug: product.slug,
    category: product.category.toUpperCase(),
    latin: meta.latin,
    price: product.price,
    compareAt: product.compareAtPrice,
    badge: meta.badge,
    image: product.image,
    dot: meta.dot,
    bg: meta.bg,
  };
}

/* Recommendation matrix: concern (Q1) picks the pool, skin type (Q2)
   refines the pair. "default" covers any skin type without an override. */
type Pair = [string, string];

const pairs: Record<string, Record<string, Pair>> = {
  oily: {
    default: ["multani-mitti", "neem-powder"],
    dry_t:   ["neem-powder", "ubtan-powder"],
    norm_t:  ["neem-powder", "orange-peel-powder"],
  },
  dull: {
    default: ["ubtan-powder", "orange-peel-powder"],
    oily_t:  ["orange-peel-powder", "multani-mitti"],
    norm_t:  ["ubtan-powder", "nagarmotha-powder"],
  },
  sensitive: {
    default: ["neem-powder", "ubtan-powder"],
    oily_t:  ["neem-powder", "multani-mitti"],
  },
  hair: {
    default: ["aamla-powder", "shikakai-powder"],
    oily_t:  ["reetha-powder", "aamla-powder"],
  },
};

const concernHeading: Record<string, string> = {
  oily: "Two powders.",
  dull: "Two powders.",
  sensitive: "Two gentle powders.",
  hair: "Two powders.",
};

/* Frequency (Q3) drives the italic line and the usage note. */
const frequencyCopy: Record<string, { italic: string; note: string }> = {
  once:  { italic: "Once a week.",      note: "Alternate between the two each week." },
  twice: { italic: "Twice a week.",     note: "Use them on alternate days." },
  alt:   { italic: "Every other day.",  note: "Alternate between the two." },
  daily: { italic: "A daily ritual.",   note: "Alternate them daily so each gets its turn." },
};

/* Mixer (Q4) is named in the subtext. */
const mixerLabel: Record<string, string> = {
  rose: "rose water",
  milk: "raw milk",
  yogurt: "yogurt",
  water: "plain water",
};

export default function FindYourRitualContent() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
    setTimeout(() => setStep((s) => (s === 4 ? 5 : s + 1)), 400);
  };

  // Compose the recommendation from all four answers
  const concern = answers[1] ?? "dull";
  const pairSet = pairs[concern] ?? pairs.dull;
  const [primarySlug, secondarySlug] = pairSet[answers[2]] ?? pairSet.default;
  const recProducts = [toProductRec(primarySlug), toProductRec(secondarySlug)]
    .filter((p): p is ProductRec => p !== null);
  const freq = frequencyCopy[answers[3]] ?? frequencyCopy.twice;
  const mixer = mixerLabel[answers[4]] ?? "rose water";
  const heading = concernHeading[concern] ?? "Two powders.";
  const subtext =
    concern === "sensitive"
      ? `The gentlest pair in the range. Mix with ${mixer}, begin slowly, and listen to your skin. Reassess in four weeks.`
      : `Based on your answers, we'd start you on these two, mixed with ${mixer}. ${freq.note} Reassess in four weeks.`;

  const q = questions[step - 1];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 pt-36 md:pt-40 pb-20">

        {/* Progress bar — steps 1–4 */}
        {step <= 4 && (
          <div className="mb-12 flex items-center gap-4">
            <span className="font-accent text-[10px] tracking-[0.22em] uppercase text-bark/72">
              — FIND YOUR RITUAL
            </span>
            <div className="flex-1 h-px relative bg-bark/10">
              <div
                className="absolute inset-y-0 left-0 bg-bark/30 transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
            <span className="font-accent text-[11px] tracking-wider text-bark/72">
              0{step} · 04
            </span>
          </div>
        )}

        {/* Question steps */}
        {step <= 4 && q && (
          <>
            {/* Heading */}
            <div className="mb-10">
              <h2 className="font-heading text-[2.75rem] md:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] text-bark">
                {q.heading}
              </h2>
              <p className="font-heading italic text-base md:text-lg mt-3 text-bark/72">
                {q.subtitle}
              </p>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {q.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHovered(option.value)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex items-center justify-between p-5 md:p-6 rounded-xl text-left transition-all duration-200"
                  style={{
                    backgroundColor: option.bg,
                    boxShadow:
                      hovered === option.value || answers[step] === option.value
                        ? `0 0 0 2px ${option.dot}70, 0 6px 24px ${option.dot}30`
                        : "none",
                  }}
                >
                  <div>
                    <span className="font-heading text-xl md:text-2xl leading-snug text-bark/80">
                      {option.label}
                    </span>
                    {option.recommended && (
                      <p
                        className="font-accent text-[9px] tracking-[0.22em] uppercase mt-1"
                        style={{ color: option.dot }}
                      >
                        RECOMMENDED
                      </p>
                    )}
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 ml-4 transition-transform duration-200"
                    style={{
                      backgroundColor: option.dot,
                      transform: hovered === option.value ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Back button */}
            <div className="mt-8 h-8">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="font-accent text-[10px] tracking-[0.14em] uppercase text-bark/72 hover:text-bark/80 transition-colors"
                >
                  ← PREVIOUS QUESTION
                </button>
              )}
            </div>
          </>
        )}

        {/* Result screen */}
        {step === 5 && (
          <>
            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="font-heading text-[2.75rem] md:text-[4rem] font-light leading-[1.05] tracking-[-0.02em] text-bark">
                {heading}{" "}
                <span style={{ color: "var(--color-terracotta)", fontStyle: "italic" }}>
                  {freq.italic}
                </span>
              </h2>
              <p className="font-body text-base mt-4 max-w-md mx-auto text-bark/72">
                {subtext}
              </p>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-10 max-w-2xl mx-auto">
              {recProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  className="rounded-xl overflow-hidden block relative transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: product.bg }}
                >
                  {/* Badge */}
                  <span className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 font-accent text-[9px] tracking-[0.22em] uppercase text-cream bg-bark/85">
                    {product.badge}
                  </span>

                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 50vw, 400px"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p
                      className="font-accent text-[9px] tracking-[0.22em] uppercase mb-1"
                      style={{ color: product.dot }}
                    >
                      {product.category}
                    </p>
                    <p className="font-heading text-xl md:text-2xl text-bark font-light">
                      {product.name}
                    </p>
                    <p className="font-heading italic text-sm mt-0.5 text-bark/72">
                      {product.latin}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <span className="font-heading text-xl text-bark">
                          ₹{product.price}
                        </span>
                        {product.compareAt && (
                          <span className="font-body text-sm line-through ml-2 text-bark/72">
                            ₹{product.compareAt}
                          </span>
                        )}
                      </div>
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: product.dot }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => { setStep(1); setAnswers({}); }}
                className="px-8 py-3 rounded-full border border-bark/30 font-accent text-[10px] tracking-[0.14em] uppercase text-bark transition-all duration-200 hover:shadow-[0_4px_16px_color-mix(in_srgb,var(--color-bark)_15%,transparent)]"
              >
                START OVER
              </button>
              <Link
                href="/shop"
                className="px-8 py-3 rounded-full font-accent text-[10px] tracking-[0.14em] uppercase text-cream transition-all duration-200 hover:opacity-90 hover:shadow-[0_4px_20px_color-mix(in_srgb,var(--color-terracotta)_45%,transparent)]"
                style={{ backgroundColor: "var(--color-terracotta)" }}
              >
                SEE THE CATALOGUE →
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
