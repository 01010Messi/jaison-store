"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

type Rec = {
  heading: string;
  italic: string;
  subtext: string;
  primary: ProductRec;
  secondary: ProductRec;
};

const questions = [
  {
    step: 1,
    heading: "What's your main concern?",
    subtitle: "Pick the one closest to what you'd like to improve.",
    options: [
      { value: "oily",      label: "Breakouts and oil",       recommended: true,  bg: "#EDF2EC", dot: "#4A7C59" },
      { value: "dull",      label: "Dull or uneven tone",     recommended: false, bg: "#F7F2E4", dot: "#E26713" },
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
      { value: "dry_t",   label: "Dry",         recommended: false, bg: "#F7F2E4", dot: "#E26713" },
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
      { value: "twice", label: "Twice a week",    recommended: true,  bg: "#F7F2E4", dot: "#E26713" },
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
      { value: "milk",   label: "Raw milk",    recommended: false, bg: "#F7F2E4", dot: "#E26713" },
      { value: "yogurt", label: "Yogurt",      recommended: false, bg: "#EDF2EC", dot: "#4A7C59" },
      { value: "water",  label: "Plain water", recommended: false, bg: "#EFF0F5", dot: "#7B7BAE" },
    ],
  },
];

const recs: Record<string, Rec> = {
  oily: {
    heading: "Two powders.",
    italic: "Twice a week.",
    subtext: "Based on your answers, we'd start you on these two. Use them on alternate days. Reassess in four weeks.",
    primary:   { name: "Multani Mitti",      slug: "multani-mitti",      category: "SKIN CARE", latin: "Fuller's Earth Clay",    price: 245,             badge: "DEEP CLEAN",    image: "/images/products/multani-mitti.webp", dot: "#C16B4A", bg: "#F5EDE8" },
    secondary: { name: "Neem Powder",        slug: "neem-powder",        category: "SKIN CARE", latin: "Azadirachta indica",      price: 195,             badge: "ANTIBACTERIAL", image: "/images/products/neem.webp",          dot: "#4A7C59", bg: "#EDF2EC" },
  },
  dull: {
    heading: "Two powders.",
    italic: "Twice a week.",
    subtext: "Based on your answers, we'd start you on these two. Use them on alternate days. Reassess in four weeks.",
    primary:   { name: "Ubtan Powder",       slug: "ubtan-powder",       category: "SKIN CARE", latin: "Curcuma longa + 7 herbs", price: 440, compareAt: 565, badge: "22% OFF",   image: "/images/products/ubtan.webp",         dot: "#E26713", bg: "#F7F2E4" },
    secondary: { name: "Orange Peel Powder", slug: "orange-peel-powder", category: "SKIN CARE", latin: "Citrus sinensis peel",    price: 245,             badge: "VITAMIN C",     image: "/images/products/orange-peel.webp",   dot: "#D4784A", bg: "#FEF0E8" },
  },
  sensitive: {
    heading: "Two gentle powders.",
    italic: "Start slow.",
    subtext: "These are the gentlest powders in the range. Begin once a week and listen to your skin.",
    primary:   { name: "Rose Petal Powder",  slug: "rose-petal-powder",  category: "SKIN CARE", latin: "Rosa damascena",          price: 295,             badge: "SOOTHING",      image: "/images/products/rose-petal.webp",    dot: "#D4748C", bg: "#F5ECF0" },
    secondary: { name: "Neem Powder",        slug: "neem-powder",        category: "SKIN CARE", latin: "Azadirachta indica",      price: 195,             badge: "GENTLE",        image: "/images/products/neem.webp",          dot: "#4A7C59", bg: "#EDF2EC" },
  },
  hair: {
    heading: "Two powders.",
    italic: "For stronger hair.",
    subtext: "Based on your answers, we'd start you on these two. Use them on alternate days. Reassess in four weeks.",
    primary:   { name: "Amla Powder",        slug: "aamla-powder",       category: "HAIR CARE", latin: "Phyllanthus emblica",     price: 195,             badge: "STRENGTHENING", image: "/images/products/amla.webp",          dot: "#4A7C59", bg: "#EDF2EC" },
    secondary: { name: "Bhringraj Powder",   slug: "bhringraj-powder",   category: "HAIR CARE", latin: "Eclipta prostrata",       price: 245,             badge: "GROWTH",        image: "/images/products/bhringraj.webp",     dot: "#2D6B4A", bg: "#E8F0EC" },
  },
};

export default function FindYourRitualContent() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
    setTimeout(() => setStep((s) => (s === 4 ? 5 : s + 1)), 400);
  };

  const rec = recs[answers[1]] ?? recs.dull;
  const q = questions[step - 1];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFAE0" }}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 pt-36 md:pt-40 pb-20">

        {/* Progress bar — steps 1–4 */}
        {step <= 4 && (
          <div className="mb-12 flex items-center gap-4">
            <span
              className="font-accent text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(26,60,52,0.4)" }}
            >
              — FIND YOUR RITUAL
            </span>
            <div className="flex-1 h-px relative" style={{ backgroundColor: "rgba(26,60,52,0.1)" }}>
              <div
                className="absolute inset-y-0 left-0 transition-all duration-500"
                style={{
                  backgroundColor: "rgba(26,60,52,0.3)",
                  width: `${((step - 1) / 4) * 100}%`,
                }}
              />
            </div>
            <span
              className="font-accent text-[11px] tracking-wider"
              style={{ color: "rgba(26,60,52,0.4)" }}
            >
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
              <p
                className="font-heading italic text-base md:text-lg mt-3"
                style={{ color: "rgba(26,60,52,0.35)" }}
              >
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
                  className="relative flex items-center justify-between p-5 md:p-6 rounded-2xl text-left transition-all duration-200"
                  style={{
                    backgroundColor: option.bg,
                    boxShadow:
                      hovered === option.value || answers[step] === option.value
                        ? `0 0 0 2px ${option.dot}70, 0 6px 24px ${option.dot}30`
                        : "none",
                  }}
                >
                  <div>
                    <span className="font-heading text-xl md:text-2xl leading-snug" style={{ color: "rgba(26,60,52,0.8)" }}>
                      {option.label}
                    </span>
                    {option.recommended && (
                      <p
                        className="font-accent text-[9px] tracking-[0.15em] uppercase mt-1"
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
                  className="font-accent text-[10px] tracking-[0.15em] uppercase transition-colors"
                  style={{ color: "rgba(26,60,52,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(26,60,52,0.8)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,60,52,0.4)")}
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
                {rec.heading}{" "}
                <span style={{ color: "#834316", fontStyle: "italic" }}>
                  {rec.italic}
                </span>
              </h2>
              <p
                className="font-body text-base mt-4 max-w-md mx-auto"
                style={{ color: "rgba(26,60,52,0.5)" }}
              >
                {rec.subtext}
              </p>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-10 max-w-2xl mx-auto">
              {([rec.primary, rec.secondary] as ProductRec[]).map((product) => (
                <Link
                  key={product.slug}
                  href={`/shop/${product.slug}`}
                  className="rounded-2xl overflow-hidden block relative transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: product.bg }}
                >
                  {/* Badge */}
                  <span
                    className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 font-accent text-[9px] tracking-[0.12em] uppercase text-cream"
                    style={{ backgroundColor: "rgba(26,60,52,0.85)" }}
                  >
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
                      className="font-accent text-[9px] tracking-[0.15em] uppercase mb-1"
                      style={{ color: product.dot }}
                    >
                      {product.category}
                    </p>
                    <p className="font-heading text-xl md:text-2xl text-bark font-light">
                      {product.name}
                    </p>
                    <p
                      className="font-heading italic text-sm mt-0.5"
                      style={{ color: "rgba(26,60,52,0.35)" }}
                    >
                      {product.latin}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <span className="font-heading text-xl text-bark">
                          ₹{product.price}
                        </span>
                        {product.compareAt && (
                          <span
                            className="font-body text-sm line-through ml-2"
                            style={{ color: "rgba(26,60,52,0.4)" }}
                          >
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
                className="px-8 py-3 rounded-full border font-accent text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                style={{ borderColor: "rgba(26,60,52,0.3)", color: "#1A3C34" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,60,52,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >
                START OVER
              </button>
              <Link
                href="/shop"
                className="px-8 py-3 rounded-full font-accent text-[10px] tracking-[0.15em] uppercase text-cream transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#834316" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(131,67,22,0.45)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
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
