import Link from "next/link";
import Image from "next/image";

const stats = [
  { num: "1997", label: "Since" },
  { num: "29", label: "Years" },
  { num: "0", label: "Preservatives" },
];

export default function HeroSection() {
  return (
    <section className="relative" style={{ backgroundColor: "var(--color-cream)" }}>
      {/* ── Pure image, nothing on top of it ─────────────────────── */}
      {/* Mobile/tablet: aspect-ratio crop close to the photo's own 16:9-ish
          shape, so it shows the full spread of pouches instead of a tight
          vertical sliver. Desktop: a viewport-height band. */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-[min(72vh,640px)]">
        <Image
          src="/images/hero-group.jpg"
          alt="Jaison herbal powders — the full range, ground fresh"
          fill
          className="object-cover"
          style={{ objectPosition: "50% 42%" }}
          priority
          sizes="100vw"
        />
      </div>

      {/* ── Small text strip below — image does the talking ──────── */}
      <div className="border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="container-brand py-5 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tagline + headline */}
            <div>
              <span
                className="font-accent font-normal uppercase block mb-1.5"
                style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--color-terracotta)" }}
              >
                29 Years&nbsp;&nbsp;·&nbsp;&nbsp;One Format&nbsp;&nbsp;·&nbsp;&nbsp;Zero Compromises
              </span>
              <h2
                className="font-heading font-light"
                style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.375rem)", lineHeight: 1.3, color: "var(--color-bark)" }}
              >
                Your bottle lists a dozen ingredients.{" "}
                <span style={{ fontStyle: "italic", color: "var(--color-terracotta)" }}>
                  Our product lists one.
                </span>
              </h2>
            </div>

            {/* Stats — desktop only, inline in the header row */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              {stats.map((s) => (
                <div key={s.num} className="text-center">
                  <span
                    className="font-heading font-light block"
                    style={{ fontSize: "1.125rem", color: "var(--color-terracotta)", lineHeight: 1 }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="font-accent uppercase"
                    style={{ fontSize: "8px", letterSpacing: "0.12em", color: "rgba(26,60,52,0.72)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs — desktop, sit inline at the end of the row */}
            <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-1.5 font-accent uppercase transition-opacity duration-200 hover:opacity-85"
                style={{
                  borderRadius: "9999px",
                  padding: "10px 20px",
                  fontSize: "10.5px",
                  letterSpacing: "0.1em",
                  backgroundColor: "var(--color-terracotta)",
                  color: "var(--color-cream)",
                  whiteSpace: "nowrap",
                }}
              >
                Shop&nbsp;→
              </Link>
              <Link
                href="/why-powder"
                className="inline-flex items-center justify-center font-accent uppercase transition-opacity duration-200 hover:opacity-85"
                style={{
                  borderRadius: "9999px",
                  padding: "10px 20px",
                  fontSize: "10.5px",
                  letterSpacing: "0.1em",
                  backgroundColor: "var(--color-bark)",
                  color: "var(--color-cream)",
                  whiteSpace: "nowrap",
                }}
              >
                Why Powder
              </Link>
            </div>
          </div>

          {/* Mobile-only: compact single-line stats + full CTA row.
              Built for a phone screen, not a shrunk desktop row. */}
          <div className="md:hidden mt-4">
            <p
              className="font-accent uppercase mb-3.5"
              style={{ fontSize: "9.5px", letterSpacing: "0.1em", color: "rgba(26,60,52,0.72)" }}
            >
              {stats.map((s) => `${s.num} ${s.label}`).join("   ·   ")}
            </p>
            <div className="flex items-center gap-2.5">
              <Link
                href="/shop"
                className="flex-1 inline-flex items-center justify-center gap-1.5 font-accent uppercase transition-opacity duration-200 active:opacity-80"
                style={{
                  borderRadius: "9999px",
                  padding: "12px 20px",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  backgroundColor: "var(--color-terracotta)",
                  color: "var(--color-cream)",
                }}
              >
                Shop&nbsp;→
              </Link>
              <Link
                href="/why-powder"
                className="flex-1 inline-flex items-center justify-center font-accent uppercase transition-opacity duration-200 active:opacity-80"
                style={{
                  borderRadius: "9999px",
                  padding: "12px 20px",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  backgroundColor: "var(--color-bark)",
                  color: "var(--color-cream)",
                }}
              >
                Why Powder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
