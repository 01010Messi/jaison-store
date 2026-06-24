import Link from "next/link";
import { Instagram } from "lucide-react";

const REELS = [
  {
    handle: "@nashikinanutshell",
    location: "Nashik",
    product: "Ubtan Powder",
    shortcode: "DBv5wqmsQIZ",
    url: "https://www.instagram.com/reel/DBv5wqmsQIZ/",
  },
  {
    handle: "@tanyathevar",
    location: "TT × Jaison",
    product: "Ubtan Powder",
    shortcode: "DBzM4sOqX_f",
    url: "https://www.instagram.com/reel/DBzM4sOqX_f/",
  },
  {
    handle: "@loveena_thevar",
    location: "Gifted",
    product: "Ubtan Powder",
    shortcode: "DBse3TQNS72",
    url: "https://www.instagram.com/reel/DBse3TQNS72/",
  },
];

// Footer text contrast on bark #1A3C34:
//   white/90 → ~12.4:1  ✅ AA
//   white/72 → ~9.3:1   ✅ AA
//   white/60 → ~6.7:1   ✅ AA  (minimum used below)

export default function InstagramReels() {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-3 md:overflow-visible">
      {REELS.map((reel) => (
        <div
          key={reel.url}
          className="flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
          style={{ width: "clamp(240px, 78vw, 300px)" }}
        >
          {/* Instagram embed — header clipped via negative margin-top */}
          <div className="relative overflow-hidden flex-shrink-0" style={{ height: "300px" }}>
            <iframe
              src={`https://www.instagram.com/reel/${reel.shortcode}/embed/`}
              title={`${reel.handle} collab reel`}
              loading="lazy"
              scrolling="no"
              style={{
                width: "100%",
                height: "500px",
                border: "none",
                marginTop: "-56px",
                display: "block",
                pointerEvents: "none",
              }}
            />
            {/* Gradient fade into footer colour so there's no visible seam */}
            <div
              className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, var(--color-bark))" }}
            />
            {/* Full-card tap target */}
            <Link
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label={`Watch ${reel.handle}'s reel on Instagram`}
            />
          </div>

          {/* Metadata footer — solid bark, all text ≥ 6.7:1 on #1A3C34 */}
          <div
            className="p-4 space-y-2.5 flex-1"
            style={{ backgroundColor: "var(--color-bark)" }}
          >
            <div className="flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,248,225,0.72)" }} />
              <span className="text-[10px] font-accent tracking-wide" style={{ color: "rgba(255,248,225,0.90)" }}>
                {reel.handle}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span
                className="text-[9px] font-accent uppercase tracking-widest"
                style={{ color: "rgba(255,248,225,0.60)" }}
              >
                {reel.location}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[9px] font-accent uppercase tracking-wider"
                style={{
                  backgroundColor: "rgba(255,248,225,0.12)",
                  color: "rgba(255,248,225,0.80)",
                }}
              >
                {reel.product}
              </span>
            </div>

            <p
              className="text-[10px] font-accent uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,248,225,0.60)" }}
            >
              Watch on Instagram →
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
