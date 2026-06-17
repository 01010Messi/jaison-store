import Link from "next/link";
import { Instagram } from "lucide-react";

const tiles = [
  {
    bg: "var(--color-gold-light)",
    avatarBg: "var(--color-terracotta-light)",
    handle: "@sneha.ahuja",
    caption: "First time using Multani. Cracked = too thick. Lesson learned.",
    motif: "figure",
    aspect: "4/5",
  },
  {
    bg: "var(--color-bark)",
    avatarBg: "var(--color-bark-light)",
    handle: "@aarav.makes",
    caption: "Cold-process Shikakai foam. No sulphates. Look at the lather.",
    motif: "glow",
    aspect: "1/1",
  },
  {
    bg: "var(--color-parchment)",
    avatarBg: "var(--color-gold)",
    handle: "@radhika.mehra",
    caption: "Mum's wedding ubtan. Found her 1989 jar today.",
    motif: "jar",
    aspect: "3/4",
  },
  {
    bg: "var(--color-terracotta)",
    avatarBg: "var(--color-bark-light)",
    handle: "@oilskin.diaries",
    caption: "Week 6 on Neem. Side-by-side photos.",
    motif: "sphere",
    aspect: "4/5",
  },
  {
    bg: "var(--color-parchment-dark)",
    avatarBg: "var(--color-gold-dark)",
    handle: "@hairhouse.bangalore",
    caption: "Three-powder wash, 90s technique, 2026 lighting.",
    motif: "drop",
    aspect: "3/4",
  },
  {
    bg: "var(--color-terracotta-dark)",
    avatarBg: "var(--color-terracotta)",
    handle: "@bombay.beautyclub",
    caption: "Using Reetha as a facial cleanser. Wild idea. It worked.",
    motif: "crescent",
    aspect: "4/5",
  },
  {
    bg: "var(--color-bark)",
    avatarBg: "var(--color-bark-light)",
    handle: "@maithili.green",
    caption: "Day one of switching from chemical henna.",
    motif: "leaf",
    aspect: "1/1",
  },
  {
    bg: "var(--color-terracotta)",
    avatarBg: "var(--color-terracotta-light)",
    handle: "@the.herb.kitchen",
    caption: "Rose petal powder mixed with honey. 20 minutes, weekly.",
    motif: "oval",
    aspect: "3/4",
  },
];

function Motif({ type, bg }: { type: string; bg: string }) {
  const lo = "rgba(255,248,225,0.22)";
  const hi = "rgba(255,248,225,0.10)";

  switch (type) {
    case "figure":
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <ellipse cx="100" cy="72" rx="26" ry="26" fill="rgba(255,248,225,0.28)" />
          <path d="M58 240 Q62 160 100 148 Q138 160 142 240Z" fill={lo} />
          <ellipse cx="100" cy="200" rx="40" ry="42" fill={hi} />
        </svg>
      );
    case "glow":
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <radialGradient id="glow-rg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(100,200,60,0.60)" />
              <stop offset="55%" stopColor="rgba(60,150,30,0.25)" />
              <stop offset="100%" stopColor="rgba(20,80,10,0)" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="138" r="78" fill="url(#glow-rg)" />
          <circle cx="100" cy="138" r="44" fill="rgba(110,210,60,0.35)" />
        </svg>
      );
    case "jar":
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <rect x="66" y="148" width="68" height="76" rx="6" fill="rgba(180,140,70,0.65)" />
          <rect x="72" y="136" width="56" height="20" rx="4" fill="rgba(160,120,50,0.80)" />
          <rect x="78" y="128" width="44" height="14" rx="3" fill="rgba(140,100,40,0.70)" />
          <line x1="66" y1="162" x2="134" y2="162" stroke="rgba(120,80,30,0.35)" strokeWidth="1" />
        </svg>
      );
    case "sphere":
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx="104" cy="148" r="82" fill="rgba(88,210,88,0.40)" />
          <circle cx="104" cy="148" r="56" fill="rgba(64,180,64,0.22)" />
        </svg>
      );
    case "drop":
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d="M100 52 Q148 112 148 158 Q148 210 100 218 Q52 210 52 158 Q52 112 100 52Z" fill={lo} />
          <path d="M100 80 Q132 126 132 158 Q132 194 100 200 Q68 194 68 158 Q68 126 100 80Z" fill={hi} />
        </svg>
      );
    case "crescent":
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx="96" cy="138" r="72" fill="rgba(255,248,225,0.20)" />
          <circle cx="130" cy="112" r="66" fill={bg} />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d="M100 44 C156 76 156 188 100 220 C44 188 44 76 100 44Z" fill={lo} />
          <line x1="100" y1="50" x2="100" y2="214" stroke="rgba(255,248,225,0.18)" strokeWidth="1.5" />
          <path d="M100 90 Q128 118 100 148" stroke="rgba(255,248,225,0.15)" strokeWidth="1" fill="none" />
        </svg>
      );
    default: // oval
      return (
        <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <ellipse cx="100" cy="138" rx="58" ry="78" fill={lo} />
          <ellipse cx="100" cy="138" rx="36" ry="52" fill={hi} />
        </svg>
      );
  }
}

export default function InstagramSection() {
  return (
    <section className="section-rhythm-lg overflow-hidden">
      {/* Header */}
      <div className="container-brand mb-10 md:mb-14">
        <p className="font-accent text-[11px] tracking-[0.22em] uppercase text-bark/60 mb-5">
          — Tag #jaisonritual · We feature one a day
        </p>
        <h2
          className="font-heading font-light leading-[1.04]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em", color: "var(--color-bark)" }}
        >
          Their kitchens.{" "}
          <em style={{ color: "var(--color-terracotta)", fontStyle: "italic", fontWeight: 300 }}>
            Their rituals.
          </em>
        </h2>
        <p
          className="font-body text-base md:text-lg leading-snug mt-4"
          style={{ color: "rgba(26,60,52,0.55)" }}
        >
          Tag{" "}
          <strong style={{ fontWeight: 700, color: "var(--color-bark)" }}>#jaisonherbals</strong>{" "}
          on Instagram. We feature one a day.
        </p>
      </div>

      {/* Grid */}
      <div className="columns-2 md:columns-4 gap-2 md:gap-3 px-4 md:px-8 lg:px-14" aria-hidden="true">
        {tiles.map((tile) => (
          <div
            key={tile.handle}
            className="relative overflow-hidden rounded-2xl mb-2 md:mb-3 break-inside-avoid"
            style={{ backgroundColor: tile.bg, aspectRatio: tile.aspect }}
          >
            <Motif type={tile.motif} bg={tile.bg} />

            {/* Top row — avatar + handle + play icon */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tile.avatarBg }}
                />
                <span
                  className="font-accent truncate"
                  style={{ fontSize: "9px", letterSpacing: "0.06em", color: "rgba(255,248,225,0.80)" }}
                >
                  {tile.handle}
                </span>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="flex-shrink-0">
                <polygon points="2,1 11,6 2,11" fill="rgba(255,248,225,0.65)" />
              </svg>
            </div>

            {/* Caption overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 p-3 z-10"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)" }}
            >
              <p
                className="font-body leading-snug"
                style={{ fontSize: "10px", color: "rgba(255,248,225,0.88)" }}
              >
                {tile.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="container-brand mt-10 flex justify-center">
        <Link
          href="https://www.instagram.com/jaison_skincare/"
          className="inline-flex items-center gap-2 font-accent uppercase transition-opacity duration-200 hover:opacity-85"
          style={{
            borderRadius: "9999px",
            padding: "12px 24px",
            fontSize: "11px",
            letterSpacing: "0.14em",
            backgroundColor: "var(--color-bark)",
            color: "var(--color-cream)",
          }}
        >
          <Instagram className="h-4 w-4" />
          Follow @jaison_skincare →
        </Link>
      </div>
    </section>
  );
}
