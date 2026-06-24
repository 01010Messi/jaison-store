import Link from "next/link";
import { Instagram } from "lucide-react";

const REELS = [
  {
    handle: "@nashikinanutshell",
    location: "Nashik",
    caption: "Your Diwali is incomplete without this ritual.",
    product: "Ubtan Powder",
    url: "https://www.instagram.com/reel/DBv5wqmsQIZ/",
  },
  {
    handle: "@tanyathevar",
    location: "TT × Jaison",
    caption: "Unboxing the pure herbal experience — no sulphates, no shortcuts.",
    product: "Ubtan Powder",
    url: "https://www.instagram.com/reel/DBzM4sOqX_f/",
  },
  {
    handle: "@loveena_thevar",
    location: "Gifted",
    caption: "The Jaison gift that stood out this Diwali.",
    product: "Ubtan Powder",
    url: "https://www.instagram.com/reel/DBse3TQNS72/",
  },
];

export default function InstagramReels() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0 scrollbar-hide">
      {REELS.map((reel) => (
        <Link
          key={reel.url}
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-[240px] md:w-auto h-[420px] rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden group"
          style={{
            background:
              "linear-gradient(165deg, var(--color-terracotta-dark) 0%, var(--color-bark) 100%)",
          }}
        >
          {/* Top — Instagram icon + handle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Instagram className="w-3.5 h-3.5 text-white/80" />
              </div>
              <span className="text-xs font-accent text-white/70 tracking-wide">
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

          {/* Middle — play button */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <polygon points="7,4 19,11 7,18" fill="rgba(255,248,225,0.90)" />
              </svg>
            </div>
          </div>

          {/* Bottom — caption + product + watch CTA */}
          <div className="space-y-3">
            <p
              className="font-heading text-[1.0rem] leading-snug text-white/90"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              &ldquo;{reel.caption}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-accent uppercase tracking-widest text-white/35">
                {reel.location}
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-[9px] font-accent uppercase tracking-wider text-white/75"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              >
                {reel.product}
              </span>
            </div>
            <span className="block text-[10px] font-accent uppercase tracking-[0.18em] text-white/45 group-hover:text-white/70 transition-colors duration-200">
              Watch on Instagram →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
