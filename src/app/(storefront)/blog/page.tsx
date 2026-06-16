import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: {
    absolute: "The Journal — Ayurvedic Beauty & Natural Skincare Reads | Jaison Herbals",
  },
  description:
    "Reads worth your time. How to mix our powders, how to use them, and why one ingredient is enough. Real rituals, real ingredients — no marketing claims.",
  openGraph: {
    title: "The Journal | Jaison Herbals",
    description: "Real rituals. Real ingredients. Monthly reads on Ayurvedic herbs for skin and hair.",
    type: "website",
    url: "https://jaisonskincare.com/blog",
    images: [
      {
        url: "https://jaisonskincare.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "The Journal — Ayurvedic beauty reads by Jaison Herbals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Journal | Jaison Herbals",
    description: "Real rituals. Real ingredients. Monthly reads on Ayurvedic herbs for skin and hair.",
    images: ["https://jaisonskincare.com/images/og/og-default.jpg"],
  },
  alternates: {
    canonical: "https://jaisonskincare.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "The Journal", url: "https://jaisonskincare.com/blog" },
        ]}
      />

      <div className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden px-6 md:px-14 lg:px-24 pt-28 pb-14"
          style={{ backgroundColor: "var(--color-cream)" }}
        >
          {/* Watermark: 3 faint card rectangles */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden="true"
            style={{ display: "flex", alignItems: "center", gap: "24px", paddingLeft: "8%", paddingTop: "8%" }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "180px",
                  height: "240px",
                  border: "1px solid rgba(26,60,52,0.06)",
                  borderRadius: "16px",
                  backgroundColor: "rgba(245,236,215,0.35)",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          <p
            className="relative font-accent text-[10px] tracking-[0.22em] uppercase mb-8 flex items-center gap-3"
            style={{ color: "rgba(26,60,52,0.4)" }}
          >
            <span style={{ display: "inline-block", width: "28px", height: "1px", backgroundColor: "rgba(26,60,52,0.3)" }} />
            THE JOURNAL · REAL RITUALS · REAL INGREDIENTS
          </p>

          <h1
            className="relative font-heading font-light leading-[1.05]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)", letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "var(--color-bark)" }}>Reads worth </span>
            <span style={{ color: "var(--color-terracotta)", fontStyle: "italic" }}>your time.</span>
          </h1>

          <p
            className="relative mt-6 font-body text-base leading-relaxed"
            style={{ color: "rgba(26,60,52,0.52)", maxWidth: "520px" }}
          >
            Once a month we write about the herbs we grind — how to mix them, how to
            use them, and why one ingredient is enough. No marketing. No miracle claims.
            Just the powder and the method.
          </p>
        </section>

        {/* ── Content (filter + grid) ── */}
        <section className="px-6 md:px-14 lg:px-24 pb-24 pt-4">
          <BlogContent />
        </section>

      </div>
    </>
  );
}
