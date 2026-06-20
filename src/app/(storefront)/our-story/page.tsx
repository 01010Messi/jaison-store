import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story — Single-Ingredient Herbal Powders Since 1970 | Jaison Herbals",
  },
  description:
    "One format. Fifty-five years. Zero exceptions. How Jaison Herbals has made single-ingredient Ayurvedic herbal powders since 1970 — and why we never changed.",
  alternates: {
    canonical: "https://jaisonskincare.com/our-story",
  },
  openGraph: {
    title: "Our Story — Single-Ingredient Herbal Powders Since 1970",
    description:
      "One format. Fifty-five years. Zero exceptions. How Jaison Herbals has made single-ingredient Ayurvedic herbal powders since 1970 — and why we never changed.",
    url: "https://jaisonskincare.com/our-story",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — handcrafted Ayurvedic herbal powders since 1970",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Single-Ingredient Herbal Powders Since 1970",
    description:
      "One format. Fifty-five years. Zero exceptions. How Jaison Herbals has made single-ingredient Ayurvedic herbal powders since 1970 — and why we never changed.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
};

const acts = [
  {
    num: "I",
    year: "1970",
    heading: "It started with one jar.",
    body: "The first batch was ground by hand for a simple reason: every herbal jar on the market was more filler than herb. A traditional ubtan — turmeric, sandalwood, gram flour, rose petal — should be exactly those things and nothing else. So we ground our own. The first jars went to neighbours. They came back for more.",
    imageSide: "left" as const,
    imageBg: "#C4A882",
  },
  {
    num: "II",
    year: "1985",
    heading: "The decision: no liquids.",
    body: "Indian skincare was changing fast — cleansers, lotions, serums. Liquids were what the market wanted, and every consultant said the same: turn it into a liquid, add a preservative, scale it up. We said no. A shelf-stable liquid needs preservatives and stabilisers to last. A dry powder needs none. We have never added a synthetic ingredient to a product since.",
    imageSide: "right" as const,
    imageBg: "#D4C4A8",
  },
  {
    num: "III",
    year: "1998",
    heading: "Single-ingredient line.",
    body: "Customers kept asking what was inside the blends. So we started selling each herb on its own — Neem, Amla, Shikakai, Reetha. Each label listed exactly one thing. Some sold five jars a month, some five hundred. We kept making both. The catalogue is short on purpose.",
    imageSide: "left" as const,
    imageBg: "#B8956A",
  },
  {
    num: "IV",
    year: "2010",
    heading: "We stayed small on purpose.",
    body: "A large FMCG offered to acquire us in 2010. The proposal involved adding 'enhanced' actives and moving production offshore. We declined. We have kept production small and in-house ever since. We make 100 jars per batch. We pack by hand. Scale was never the point — the format was.",
    imageSide: "right" as const,
    imageBg: "#8B6B4A",
  },
  {
    num: "V",
    year: "2026",
    heading: "Still one ingredient.",
    body: "Same small workshop. Same single-ingredient format. The original 1970 recipes, unchanged. Every jar is still ground, sun-dried and sifted, then packed by hand. The ingredient list is still one line long — because the purest form of a herb is the herb itself.",
    imageSide: "left" as const,
    imageBg: "#3D2415",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "Our Story", url: "https://jaisonskincare.com/our-story" },
        ]}
      />
      <style>{`
        .our-story-btn-primary:hover {
          box-shadow: 0 0 28px rgba(26, 60, 52, 0.18);
        }
        .our-story-btn-primary:active {
          box-shadow: 0 0 40px rgba(26, 60, 52, 0.28);
          transform: scale(0.98);
        }
        .our-story-btn-outline:hover {
          box-shadow: 0 0 20px rgba(26, 60, 52, 0.1);
          background-color: rgba(26, 60, 52, 0.04);
        }
        .our-story-btn-outline:active {
          box-shadow: 0 0 32px rgba(26, 60, 52, 0.15);
          transform: scale(0.98);
        }
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>

        {/* ── Hero ── */}
        <section
          style={{ backgroundColor: "var(--color-cream)" }}
          className="relative overflow-hidden pt-28 pb-20 px-6 md:px-14 lg:px-24"
        >
          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-end pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-heading font-light leading-none whitespace-nowrap"
              style={{
                fontSize: "clamp(7rem, 22vw, 18rem)",
                color: "rgba(26,60,52,0.04)",
                letterSpacing: "-0.04em",
                marginBottom: "-0.15em",
                marginLeft: "-0.04em",
              }}
            >
              OUR STORY
            </span>
          </div>

          <p
            className="relative font-accent text-[10px] tracking-[0.22em] uppercase mb-10"
            style={{ color: "rgba(26,60,52,0.40)" }}
          >
            — OUR STORY · MADE IN INDIA · SINCE 1970
          </p>

          <h1
            className="relative font-heading font-light leading-[1.04]"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.25rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-bark)",
            }}
          >
            One format.{" "}
            <span style={{ color: "var(--color-gold-deep)", fontStyle: "italic" }}>
              Fifty-five years.
            </span>
            <br />
            Zero exceptions.
          </h1>

          <p
            className="relative mt-8 font-body text-base leading-relaxed"
            style={{ color: "rgba(26,60,52,0.55)", maxWidth: "520px" }}
          >
            We have made one thing since 1970: single-ingredient herbal powder for skin
            and hair. No preservatives. No synthetics. No reformulations to chase a trend.
            This is how — and why.
          </p>
        </section>

        {/* ── Acts ── */}
        {acts.map((act) => (
          <section
            key={act.num}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ minHeight: "480px" }}
          >
            {/* Image placeholder */}
            <div
              className={
                act.imageSide === "left"
                  ? "order-1 md:order-1"
                  : "order-1 md:order-2"
              }
              style={{
                backgroundColor: act.imageBg,
                minHeight: "320px",
              }}
            />

            {/* Text */}
            <div
              className={
                act.imageSide === "left"
                  ? "order-2 md:order-2"
                  : "order-2 md:order-1"
              }
              style={{
                backgroundColor: "var(--color-cream)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 5rem)",
              }}
            >
              <p
                className="font-accent text-[10px] tracking-[0.22em] uppercase flex items-center gap-3 mb-7"
                style={{ color: "var(--color-terracotta)" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "28px",
                    height: "1px",
                    backgroundColor: "var(--color-terracotta)",
                  }}
                />
                ACT {act.num} · {act.year}
              </p>

              <h2
                className="font-heading font-light leading-[1.07]"
                style={{
                  fontSize: "clamp(1.875rem, 4vw, 3.25rem)",
                  color: "var(--color-bark)",
                  letterSpacing: "-0.01em",
                }}
              >
                {act.heading}
              </h2>

              <p
                className="mt-6 font-body text-base leading-relaxed"
                style={{ color: "rgba(26,60,52,0.58)", maxWidth: "420px" }}
              >
                {act.body}
              </p>
            </div>
          </section>
        ))}

        {/* ── CTA ── */}
        <section
          className="py-24 px-6 text-center"
          style={{ backgroundColor: "var(--color-cream)" }}
        >
          <p
            className="font-accent text-[10px] tracking-[0.25em] uppercase mb-10 flex items-center justify-center gap-3"
            style={{ color: "rgba(26,60,52,0.40)" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "28px",
                height: "1px",
                backgroundColor: "rgba(26,60,52,0.25)",
              }}
            />
            WHAT COMES NEXT
          </p>

          <h2
            className="font-heading font-light leading-[1.06] mx-auto"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
              maxWidth: "880px",
            }}
          >
            <span style={{ color: "var(--color-bark)" }}>The next 55 years </span>
            <span style={{ color: "var(--color-gold-deep)", fontStyle: "italic" }}>
              look exactly the same.
            </span>
          </h2>

          <p
            className="mt-6 font-body text-base leading-relaxed mx-auto"
            style={{ color: "rgba(26,60,52,0.55)", maxWidth: "460px" }}
          >
            Same kitchen. Same herbs. Same single-ingredient promise. We will keep
            grinding. You can keep mixing.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/shop"
              className="our-story-btn-primary inline-flex items-center gap-2 rounded-full px-9 py-4 font-accent text-[11px] tracking-[0.15em] uppercase transition-all"
              style={{ backgroundColor: "var(--color-bark)", color: "var(--color-cream)" }}
            >
              SHOP THE CATALOGUE →
            </Link>
            <Link
              href="/why-powder"
              className="our-story-btn-outline inline-flex items-center gap-2 rounded-full px-9 py-4 font-accent text-[11px] tracking-[0.15em] uppercase transition-all border"
              style={{ borderColor: "rgba(26,60,52,0.3)", color: "var(--color-bark)" }}
            >
              READ: WHY POWDER?
            </Link>
            <Link
              href="/blog"
              className="our-story-btn-outline inline-flex items-center gap-2 rounded-full px-9 py-4 font-accent text-[11px] tracking-[0.15em] uppercase transition-all border"
              style={{ borderColor: "rgba(26,60,52,0.3)", color: "var(--color-bark)" }}
            >
              READ THE BLOG
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
