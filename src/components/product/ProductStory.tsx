"use client";

import { useState } from "react";
import type { Product } from "@/data/products";

/* ---------- parsing helpers (defensive: singles + combos differ) ---------- */

interface Ingredient {
  name: string;
  detail?: string;
}

function parseIngredients(raw: string): Ingredient[] {
  // Combos: "Includes: A\nB\nC" — singles: "A (latin), B (latin), C"
  const entries = raw.includes("\n")
    ? raw
        .replace(/^Includes:\s*/i, "")
        .split("\n")
        .map((l) => l.replace(/^Includes:\s*/i, "").trim())
    : raw.split(",").map((l) => l.trim());

  return entries
    .filter(Boolean)
    .map((entry) => {
      const match = entry.match(/^(.+?)\s*\(([^)]+)\)$/);
      if (match) {
        return { name: match[1].trim(), detail: match[2].trim() };
      }
      return { name: entry };
    });
}

interface HowToBlock {
  heading?: string;
  steps: string[];
}

function parseHowToUse(raw: string): HowToBlock[] {
  // Blocks split on blank lines. Within a block, a line ending in ":" is a
  // heading; "Step N:" prefixes are stripped (the layout numbers them).
  const blocks: HowToBlock[] = [];
  for (const block of raw.split(/\n\s*\n/)) {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;

    let heading: string | undefined;
    if (lines[0].endsWith(":") && !/^step\s*\d+/i.test(lines[0])) {
      heading = lines[0].replace(/:$/, "");
      lines.shift();
    }
    const steps = lines.map((l) => l.replace(/^Step\s*\d+\s*:\s*/i, ""));
    if (steps.length > 0) blocks.push({ heading, steps });
  }
  return blocks;
}

function parseBenefits(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/* ---------- component ---------- */

type StoryTab = "ritual" | "inside" | "why";

const storyTabs: { key: StoryTab; label: string }[] = [
  { key: "ritual", label: "How to Use" },
  { key: "inside", label: "What's Inside" },
  { key: "why", label: "Why It Works" },
];

interface ProductStoryProps {
  product: Product;
}

export default function ProductStory({ product }: ProductStoryProps) {
  const [activeTab, setActiveTab] = useState<StoryTab>("ritual");
  const blocks = parseHowToUse(product.howToUse);
  const ingredients = parseIngredients(product.ingredients);
  const benefits = parseBenefits(product.benefits);
  const isCombo = product.categorySlug === "combos";

  return (
    <div>
      {/* ── Tab menu ── */}
      <div className="container-brand pt-10 md:pt-12">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
          role="tablist"
          aria-label="Product details"
        >
          {storyTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className="flex-shrink-0 px-6 py-2.5 rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-all duration-200 border"
                style={
                  isActive
                    ? {
                        backgroundColor: "#1A3C34",
                        color: "#FEFAE0",
                        borderColor: "#1A3C34",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "rgba(26,60,52,0.5)",
                        borderColor: "rgba(26,60,52,0.2)",
                      }
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── The Ritual — card grid ── */}
      {activeTab === "ritual" && (
        <section
          className="relative overflow-hidden py-12 md:py-16 mt-6"
          style={{ backgroundColor: "#FEFAE0" }}
        >
          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-heading font-light italic leading-none whitespace-nowrap"
              style={{
                fontSize: "clamp(6rem, 18vw, 14rem)",
                color: "rgba(26,60,52,0.04)",
                letterSpacing: "-0.04em",
                marginBottom: "-0.18em",
                marginRight: "-0.04em",
              }}
            >
              ritual
            </span>
          </div>

          <div className="container-brand relative">
            <p className="font-accent text-[11px] tracking-[0.22em] uppercase mb-5 flex items-center gap-3" style={{ color: "#A56843" }}>
              <span style={{ color: "#B89968" }}>—</span>
              The Ritual · {product.name}
            </p>
            <h2
              className="font-heading font-light leading-[1.06] tracking-[-0.01em] mb-10 md:mb-12"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#1A3C34" }}
            >
              How to{" "}
              <em style={{ color: "#834316", fontStyle: "italic" }}>
                use it.
              </em>
            </h2>

            {blocks.map((block, bi) => (
              <div key={bi} className={bi > 0 ? "mt-10" : ""}>
                {block.heading && (
                  <h3
                    className="font-heading font-light mb-6"
                    style={{ fontSize: "1.25rem", color: "#834316" }}
                  >
                    {block.heading}.
                  </h3>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {block.steps.map((step, si) => (
                    <div
                      key={si}
                      className="rounded-xl p-5 flex flex-col"
                      style={{
                        backgroundColor: "#FDFAF5",
                        border: "1px solid rgba(26,60,52,0.08)",
                      }}
                    >
                      <span
                        className="font-heading font-light block leading-none mb-4"
                        style={{
                          fontSize: "clamp(28px, 4vw, 44px)",
                          color: "#B89968",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <p
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "rgba(26,60,52,0.7)" }}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── What's Inside ── */}
      {activeTab === "inside" && (
        <section
          className="py-12 md:py-16 mt-6"
          style={{ backgroundColor: "#FEFAE0" }}
        >
          <div className="container-brand">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
              <div className="flex-1 max-w-2xl">
                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
                  — What&apos;s Inside ·{" "}
                  {isCombo
                    ? `${ingredients.length} Powders`
                    : `${ingredients.length} Ingredients`}
                </p>
                <h2
                  className="font-heading text-[2.25rem] md:text-[3rem] font-light leading-[1.08] tracking-[-0.01em]"
                  style={{ color: "#1A3C34" }}
                >
                  The whole label,
                  <span
                    className="block"
                    style={{ color: "#834316", fontStyle: "italic", fontWeight: 300 }}
                  >
                    nothing hidden.
                  </span>
                </h2>
              </div>
              <p className="font-body text-sm text-bark/50 max-w-xs leading-relaxed md:self-end">
                {isCombo
                  ? "Every jar in this combo is a single herb — ground, sun-dried and sifted. Here's exactly what you get."
                  : "Every ingredient, named. No fragrance, no preservatives, no fillers — if it's not listed here, it's not in the jar."}
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 max-w-4xl">
              {ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-4 py-4"
                  style={{ borderBottom: "1px solid rgba(26,60,52,0.1)" }}
                >
                  <span
                    className="font-heading text-lg md:text-xl font-light"
                    style={{ color: "#1A3C34" }}
                  >
                    {ing.name}
                  </span>
                  {ing.detail && (
                    <span
                      className="font-heading text-sm shrink-0 text-right"
                      style={{ color: "#834316", fontStyle: "italic" }}
                    >
                      {ing.detail}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Why It Works ── */}
      {activeTab === "why" && (
        <section
          className="relative overflow-hidden py-12 md:py-16 mt-6"
          style={{ backgroundColor: "#FEFAE0" }}
        >
          <div className="container-brand relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              <div>
                <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
                  — Why It Works
                </p>
                <h2
                  className="font-heading font-light leading-[1.08] tracking-[-0.01em]"
                  style={{
                    fontSize: "clamp(2.25rem, 4vw, 3rem)",
                    color: "#1A3C34",
                  }}
                >
                  What it does,
                  <span
                    className="block"
                    style={{ color: "#834316", fontStyle: "italic", fontWeight: 300 }}
                  >
                    and why.
                  </span>
                </h2>
                <p
                  className="font-body text-sm md:text-base leading-relaxed mt-6"
                  style={{ color: "rgba(26,60,52,0.65)" }}
                >
                  {product.description}
                </p>
              </div>

              <ul className="space-y-0 lg:pt-2">
                {benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-4 py-4"
                    style={{
                      borderTop:
                        i > 0 ? "1px solid rgba(26,60,52,0.1)" : undefined,
                    }}
                  >
                    <span
                      className="font-heading font-light shrink-0 leading-none"
                      style={{
                        fontSize: "1.25rem",
                        color: "#B89968",
                        minWidth: "1.75rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "rgba(26,60,52,0.7)" }}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
