import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "Our Story — Pure Ayurvedic Herbal Powders Since 1997 | Jaison Herbals",
  },
  description:
    "One format. Twenty-nine years. Zero exceptions. How Jaison Herbals has made pure Ayurvedic herbal powders since 1997 — and why we never changed.",
  alternates: {
    canonical: "https://jaisonskincare.com/our-story",
  },
  openGraph: {
    title: "Our Story — Pure Ayurvedic Herbal Powders Since 1997",
    description:
      "One format. Twenty-nine years. Zero exceptions. How Jaison Herbals has made pure Ayurvedic herbal powders since 1997 — and why we never changed.",
    url: "https://jaisonskincare.com/our-story",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Jaison Herbals — handcrafted Ayurvedic herbal powders since 1997",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Pure Ayurvedic Herbal Powders Since 1997",
    description:
      "One format. Twenty-nine years. Zero exceptions. How Jaison Herbals has made pure Ayurvedic herbal powders since 1997 — and why we never changed.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
};

const acts = [
  {
    num: "I",
    year: "1997",
    heading: "It started with one jar.",
    body: "The first batch was ground by hand for a simple reason: every herbal jar on the market was more filler than herb. A traditional ubtan — Kachora, Nagarmotha, Bakuchi, Multani Mitti — should be exactly those things and nothing else. So we ground our own. The first jars went to neighbours. They came back for more.",
    imageSide: "left" as const,
    imageBg: "#C4A882",
  },
  {
    num: "II",
    year: "2010",
    heading: "We stayed small on purpose.",
    body: "A large FMCG offered to acquire us in 2010. The proposal involved adding 'enhanced' actives and moving production offshore. We declined. We have kept production small and in-house ever since. We make 100 packs per batch. We pack by hand. Scale was never the point — the format was.",
    imageSide: "right" as const,
    imageBg: "#8B6B4A",
  },
  {
    num: "III",
    year: "2026",
    heading: "Still nothing hidden.",
    body: "Same small workshop. Same hand-ground process. The original 1997 recipes, unchanged. Every pouch is still one herb, and our original Ubtan blend still lists every ingredient by name — ground, sun-dried and sifted, then packed by hand.",
    imageSide: "left" as const,
    imageBg: "#3D2415",
  },
];

/* ── Panel 1997: Mortar & Pestle ── */
function Panel1997() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span
        className="absolute font-heading font-light select-none leading-none pointer-events-none"
        style={{
          fontSize: "clamp(8rem, 20vw, 16rem)",
          color: "rgba(26,60,52,0.12)",
          letterSpacing: "-0.04em",
          bottom: "-0.1em",
          right: "-0.03em",
        }}
        aria-hidden
      >
        1997
      </span>

      <svg
        viewBox="0 0 200 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "clamp(110px, 17vw, 175px)", opacity: 0.95 }}
        aria-hidden
      >
        {/* Pestle stick */}
        <path d="M128 76 L164 20" stroke="rgba(26,60,52,0.92)" strokeWidth="5" strokeLinecap="round" />
        {/* Pestle head */}
        <ellipse cx="169" cy="14" rx="13" ry="7.5" transform="rotate(-28 169 14)" stroke="rgba(26,60,52,0.92)" strokeWidth="3" fill="none" />
        {/* Mortar bowl */}
        <path d="M28 82 C22 155 178 155 172 82" stroke="rgba(26,60,52,0.92)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <ellipse cx="100" cy="82" rx="72" ry="19" stroke="rgba(26,60,52,0.92)" strokeWidth="3.5" fill="none" />
        {/* Base */}
        <path d="M56 152 L56 165 Q56 172 100 174 Q144 172 144 165 L144 152" stroke="rgba(26,60,52,0.65)" strokeWidth="2.5" fill="none" />
        {/* Powder dots */}
        <circle cx="78" cy="122" r="2.5" fill="rgba(26,60,52,0.45)" />
        <circle cx="100" cy="133" r="2" fill="rgba(26,60,52,0.45)" />
        <circle cx="119" cy="120" r="2.5" fill="rgba(26,60,52,0.45)" />
        <circle cx="90" cy="113" r="1.5" fill="rgba(26,60,52,0.38)" />
        <circle cx="112" cy="138" r="1.5" fill="rgba(26,60,52,0.36)" />
      </svg>

      <p
        className="mt-6 font-accent uppercase text-[11px] tracking-[0.28em] font-medium"
        style={{ color: "rgba(26,60,52,0.65)" }}
      >
        Est. 1997 · Nashik, India
      </p>
    </div>
  );
}

/* ── Panel 2010: 100 packs per batch ── */
function Panel2010() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <p
        className="font-heading font-light leading-none"
        style={{
          fontSize: "clamp(5.5rem, 14vw, 10rem)",
          color: "rgba(254,250,224,0.96)",
          letterSpacing: "-0.04em",
        }}
      >
        100
      </p>

      <p
        className="font-body mt-3"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
          color: "rgba(254,250,224,0.75)",
          letterSpacing: "0.03em",
        }}
      >
        packs per batch
      </p>

      <div
        style={{
          width: "36px",
          height: "1px",
          backgroundColor: "rgba(254,250,224,0.4)",
          margin: "clamp(16px, 3vw, 24px) 0",
        }}
      />

      <p
        className="font-accent uppercase text-center font-medium"
        style={{
          fontSize: "10px",
          letterSpacing: "0.24em",
          color: "rgba(254,250,224,0.58)",
          maxWidth: "200px",
        }}
      >
        We declined the acquisition.
      </p>
    </div>
  );
}

/* ── Panel 2026: Jar illustration ── */
function Panel2026() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
      <span
        className="absolute font-heading font-light select-none leading-none pointer-events-none"
        style={{
          fontSize: "clamp(8rem, 18vw, 15rem)",
          color: "rgba(254,250,224,0.10)",
          letterSpacing: "-0.04em",
          bottom: "-0.1em",
          right: "-0.03em",
        }}
        aria-hidden
      >
        2026
      </span>

      <svg
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "clamp(90px, 14vw, 140px)", opacity: 0.95 }}
        aria-hidden
      >
        {/* Lid */}
        <rect x="48" y="26" width="64" height="22" rx="4" stroke="rgba(254,250,224,0.9)" strokeWidth="2.5" fill="none" />
        <line x1="54" y1="33" x2="106" y2="33" stroke="rgba(254,250,224,0.5)" strokeWidth="1" />
        {/* Body */}
        <path
          d="M40 48 L40 155 Q40 172 80 174 Q120 172 120 155 L120 48 Z"
          stroke="rgba(254,250,224,0.9)"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Label area */}
        <rect x="51" y="70" width="58" height="66" rx="3" stroke="rgba(254,250,224,0.35)" strokeWidth="1.5" fill="none" />
        {/* Label lines */}
        <line x1="59" y1="84" x2="101" y2="84" stroke="rgba(254,250,224,0.28)" strokeWidth="1" />
        <line x1="62" y1="94" x2="98" y2="94" stroke="rgba(254,250,224,0.28)" strokeWidth="1" />
        <line x1="64" y1="104" x2="96" y2="104" stroke="rgba(254,250,224,0.28)" strokeWidth="1" />
        <line x1="59" y1="114" x2="101" y2="114" stroke="rgba(254,250,224,0.28)" strokeWidth="1" />
        <line x1="62" y1="124" x2="98" y2="124" stroke="rgba(254,250,224,0.28)" strokeWidth="1" />
      </svg>

      <div className="text-center" style={{ marginTop: "clamp(16px, 3vw, 24px)" }}>
        <p
          className="font-heading font-light italic"
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 2.25rem)",
            color: "rgba(254,250,224,0.94)",
            letterSpacing: "-0.01em",
          }}
        >
          Unchanged.
        </p>
        <p
          className="mt-2 font-accent uppercase font-medium"
          style={{
            fontSize: "10px",
            letterSpacing: "0.24em",
            color: "rgba(254,250,224,0.58)",
          }}
        >
          1997 — 2026
        </p>
      </div>
    </div>
  );
}

function renderPanel(num: string): React.ReactNode {
  switch (num) {
    case "I":   return <Panel1997 />;
    case "II":  return <Panel2010 />;
    case "III": return <Panel2026 />;
    default:    return null;
  }
}

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
          className="relative overflow-hidden pt-16 md:pt-28 pb-14 md:pb-20 px-6 md:px-14 lg:px-24"
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
            — OUR STORY · MADE IN INDIA · SINCE 1997
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
              Twenty-nine years.
            </span>
            <br />
            Zero exceptions.
          </h1>

          <p
            className="relative mt-8 font-body text-base leading-relaxed"
            style={{ color: "rgba(26,60,52,0.55)", maxWidth: "520px" }}
          >
            We have made one thing since 1997: pure Ayurvedic herbal powder for skin
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
            {/* Visual panel */}
            <div
              className={`relative overflow-hidden ${
                act.imageSide === "left" ? "order-1 md:order-1" : "order-1 md:order-2"
              }`}
              style={{
                backgroundColor: act.imageBg,
                minHeight: "320px",
              }}
            >
              {renderPanel(act.num)}
            </div>

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
            <span style={{ color: "var(--color-bark)" }}>The next 29 years </span>
            <span style={{ color: "var(--color-gold-deep)", fontStyle: "italic" }}>
              look exactly the same.
            </span>
          </h2>

          <p
            className="mt-6 font-body text-base leading-relaxed mx-auto"
            style={{ color: "rgba(26,60,52,0.55)", maxWidth: "460px" }}
          >
            Same kitchen. Same herbs. Same promise of nothing hidden. We will keep
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
