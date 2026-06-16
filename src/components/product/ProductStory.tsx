"use client";

import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import SectionHeader from "@/components/ui/SectionHeader";
import StepCard from "@/components/ui/StepCard";

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
  const tabRefs = useRef<Map<StoryTab, HTMLButtonElement>>(new Map());
  const blocks = parseHowToUse(product.howToUse);
  const ingredients = parseIngredients(product.ingredients);
  const benefits = parseBenefits(product.benefits);
  const isCombo = product.categorySlug === "combos";

  // Roving focus: arrow keys move between tabs, Home/End jump
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % storyTabs.length;
    else if (e.key === "ArrowLeft")
      nextIndex = (index - 1 + storyTabs.length) % storyTabs.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = storyTabs.length - 1;
    if (nextIndex === null) return;
    e.preventDefault();
    const next = storyTabs[nextIndex];
    setActiveTab(next.key);
    tabRefs.current.get(next.key)?.focus();
  };

  return (
    <div>
      {/* ── Tab menu ── */}
      <div className="container-brand pt-10 md:pt-12">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
          role="tablist"
          aria-label="Product details"
        >
          {storyTabs.map((tab, index) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                ref={(el) => {
                  if (el) tabRefs.current.set(tab.key, el);
                  else tabRefs.current.delete(tab.key);
                }}
                role="tab"
                id={`story-tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls={`story-panel-${tab.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.key)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className="flex-shrink-0 px-6 py-2.5 rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-all duration-200 border"
                style={
                  isActive
                    ? {
                        backgroundColor: "var(--color-bark)",
                        color: "var(--color-cream)",
                        borderColor: "var(--color-bark)",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "rgba(26,60,52,0.6)",
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
          id="story-panel-ritual"
          role="tabpanel"
          aria-labelledby="story-tab-ritual"
          className="py-12 md:py-16 mt-6 bg-parchment"
        >
          <div className="container-brand">
            <SectionHeader
              eyebrow={<>The Ritual · {product.name}</>}
              eyebrowDash
              eyebrowTone="accent"
              title="How to"
              accent="use it."
              accentPlacement="inline"
              size="lg"
              className="mb-10 md:mb-12"
            />

            {blocks.some((b) => b.heading) ? (
              // Headed sections (e.g. "For Hair" / "For Skin") — keep grouped
              blocks.map((block, bi) => (
                <div key={bi} className={bi > 0 ? "mt-10" : ""}>
                  {block.heading && (
                    <h3
                      className="font-heading font-light mb-6 text-terracotta"
                      style={{ fontSize: "1.25rem" }}
                    >
                      {block.heading}.
                    </h3>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {block.steps.map((step, si) => (
                      <StepCard key={si} number={si + 1} background="tint">
                        {step}
                      </StepCard>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // No section headings (combos / single-step paragraphs) — flat grid
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {blocks.flatMap((b) => b.steps).map((step, i) => (
                  <StepCard key={i} number={i + 1} background="tint">
                    {step}
                  </StepCard>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── What's Inside ── */}
      {activeTab === "inside" && (
        <section
          id="story-panel-inside"
          role="tabpanel"
          aria-labelledby="story-tab-inside"
          className="py-12 md:py-16 mt-6 bg-parchment"
        >
          <div className="container-brand">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
              <div className="flex-1 max-w-2xl">
                <SectionHeader
                  eyebrow={
                    <>
                      What&apos;s Inside ·{" "}
                      {isCombo
                        ? `${ingredients.length} Powders`
                        : `${ingredients.length} Ingredients`}
                    </>
                  }
                  eyebrowDash
                  title="The whole label,"
                  accent="nothing hidden."
                />
              </div>
              <p className="font-body text-sm text-bark/60 max-w-xs leading-relaxed md:self-end">
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
                    style={{ color: "var(--color-bark)" }}
                  >
                    {ing.name}
                  </span>
                  {ing.detail && (
                    <span
                      className="font-heading text-sm shrink-0 text-right"
                      style={{ color: "var(--color-terracotta)", fontStyle: "italic" }}
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
          id="story-panel-why"
          role="tabpanel"
          aria-labelledby="story-tab-why"
          className="py-12 md:py-16 mt-6 bg-parchment"
        >
          <div className="container-brand relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              <div>
                <SectionHeader
                  eyebrow="Why It Works"
                  eyebrowDash
                  title="What it does,"
                  accent="and why."
                />
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
                        color: "var(--color-gold)",
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
