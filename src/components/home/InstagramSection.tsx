import Link from "next/link";
import { Instagram } from "lucide-react";
import InstagramReels from "./InstagramReels";

export default function InstagramSection() {
  return (
    <section className="section-rhythm-lg overflow-hidden">
      {/* Header */}
      <div className="container-brand mb-10 md:mb-14">
        <p className="font-accent text-[11px] tracking-[0.22em] uppercase text-bark/72 mb-5">
          — Real collabs · Real products
        </p>
        <h2
          className="font-heading font-light leading-[1.04]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em", color: "var(--color-bark)" }}
        >
          See it{" "}
          <em style={{ color: "var(--color-terracotta)", fontStyle: "italic", fontWeight: 300 }}>
            in action.
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

      {/* Reel cards */}
      <div className="px-4 md:px-8 lg:px-14">
        <InstagramReels />
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
