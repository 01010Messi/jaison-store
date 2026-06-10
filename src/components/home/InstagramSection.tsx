import { Instagram } from "lucide-react";
import GlowPillLink from "@/components/ui/GlowPillLink";

/* Decorative placeholder tiles — swap for real post embeds when available */
const tiles = [
  { bg: "#C4A882", motif: "leaf" },
  { bg: "#606C38", motif: "oval" },
  { bg: "#D4C4A8", motif: "leaf" },
  { bg: "#8B6B4A", motif: "oval" },
  { bg: "#834316", motif: "leaf" },
];

function TileMotif({ motif }: { motif: string }) {
  if (motif === "oval") {
    return (
      <svg viewBox="0 0 80 80" className="w-10 h-10" aria-hidden="true">
        <ellipse
          cx="40"
          cy="40"
          rx="22"
          ry="30"
          fill="none"
          stroke="rgba(254,250,224,0.5)"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" className="w-10 h-10" aria-hidden="true">
      <path
        d="M40 14 C58 26 58 54 40 66 C22 54 22 26 40 14 Z"
        fill="none"
        stroke="rgba(254,250,224,0.5)"
        strokeWidth="1.5"
      />
      <path
        d="M40 18 L40 62"
        stroke="rgba(254,250,224,0.35)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function InstagramSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container-brand">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="flex-1 max-w-2xl">
            <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
              — On Instagram · Rituals Daily
            </p>
            <h2 className="font-heading text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-bark font-light leading-[1.08] tracking-[-0.01em]">
              Follow the
              <span
                className="block"
                style={{ color: "#834316", fontStyle: "italic", fontWeight: 300 }}
              >
                ritual.
              </span>
            </h2>
          </div>
          <p className="font-body text-sm text-bark/50 max-w-xs leading-relaxed md:self-end">
            Mixing tutorials, before-and-afters, and the occasional look inside
            the workshop — @jaison_skincare, every day.
          </p>
        </div>

        {/* Tile strip — decorative, scrolls on mobile */}
        <div
          className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide"
          aria-hidden="true"
        >
          {tiles.map((tile, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[140px] h-[140px] md:w-auto md:h-auto md:flex-1 md:aspect-square rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: tile.bg }}
            >
              <TileMotif motif={tile.motif} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <GlowPillLink
            href="https://www.instagram.com/jaison_skincare/"
            className="border-0"
            style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
            hoverShadow="0 0 28px rgba(96, 108, 56, 0.3)"
          >
            <Instagram className="h-4 w-4" />
            Follow @jaison_skincare →
          </GlowPillLink>
        </div>
      </div>
    </section>
  );
}
