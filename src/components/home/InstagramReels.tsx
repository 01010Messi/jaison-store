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

export default function InstagramReels() {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-3 md:overflow-visible">
      {REELS.map((reel) => (
        <div
          key={reel.url}
          className="flex-shrink-0 rounded-2xl overflow-hidden relative"
          style={{
            width: "clamp(240px, 78vw, 300px)",
            // On md+ Tailwind grid takes over — width is auto
          }}
        >
          {/* Instagram embed — clipped to video only (hides the ~56px white header) */}
          <div className="relative overflow-hidden" style={{ height: "300px" }}>
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
            {/* Full-card tap target — opens reel on Instagram */}
            <Link
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label={`Watch ${reel.handle}'s reel on Instagram`}
            />
          </div>

          {/* Metadata footer */}
          <div
            className="p-4 space-y-2.5"
            style={{
              background:
                "linear-gradient(165deg, var(--color-terracotta-dark) 0%, var(--color-bark) 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-white/60" />
                <span className="text-[10px] font-accent text-white/70 tracking-wide">
                  {reel.handle}
                </span>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-[9px] font-accent uppercase tracking-wider text-white/75"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                Collab
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-accent uppercase tracking-widest text-white/35">
                {reel.location}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[9px] font-accent uppercase tracking-wider text-white/65"
                style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
              >
                {reel.product}
              </span>
            </div>

            <p className="text-[10px] font-accent uppercase tracking-[0.18em] text-white/45">
              Watch on Instagram →
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
