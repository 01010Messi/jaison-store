"use client";

import Link from "next/link";

const milestones = [
  {
    year: "1970",
    title: "One format.",
    body: "Jaison opens, making single-ingredient herbal powders. No liquids. No preservatives. No synthetics. One herb per jar from day one.",
  },
  {
    year: "1985",
    title: "The line in the sand.",
    body: "The industry shifts to mass-market liquids that need preservatives and stabilisers to survive a shelf. Jaison refuses. The format does not change.",
  },
  {
    year: "1998",
    title: "Single ingredients.",
    body: "Every herb is sold on its own — Neem, Amla, Shikakai — alongside the blends, so you can build your own ritual. The labels stay one line long.",
  },
  {
    year: "2026",
    title: "Still one ingredient.",
    body: "Fifty-five years on, every jar is still one herb — ground, sun-dried and sifted by hand, with zero preservatives.",
  },
];

export default function BrandTimeline() {
  return (
    <section style={{ backgroundColor: "#FEFAE0" }} className="py-14 md:py-20">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: sticky anchor */}
          <div className="lg:col-span-2 lg:sticky lg:top-[200px] self-start">
            <p
              className="font-accent text-[10px] tracking-[0.22em] uppercase flex items-center gap-3 mb-8"
              style={{ color: "#834316" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  backgroundColor: "#834316",
                }}
              />
              THE TIMELINE
            </p>

            <h2
              className="font-heading font-light leading-[1.04]"
              style={{
                fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
                color: "#606C38",
                letterSpacing: "-0.02em",
              }}
            >
              Ancient ingredients.
              <span
                className="block"
                style={{ fontStyle: "italic", color: "#834316", fontWeight: 300 }}
              >
                Modern
              </span>
              <span style={{ fontStyle: "italic", color: "#834316", fontWeight: 300 }}>
                standards.
              </span>
            </h2>

            <div className="mt-10">
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-accent text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border hover:shadow-md"
                style={{
                  borderColor: "rgba(96,108,56,0.28)",
                  color: "#606C38",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#834316";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#834316";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(96,108,56,0.28)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#606C38";
                }}
              >
                Read the full story →
              </Link>
            </div>
          </div>

          {/* Right: timeline entries */}
          <div className="lg:col-span-3">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`grid grid-cols-[auto,1fr] gap-6 md:gap-10 py-8 ${i > 0 ? "border-t" : ""}`}
                style={{ borderColor: "rgba(96,108,56,0.1)" }}
              >
                <span
                  className="font-heading font-light select-none"
                  style={{
                    fontSize: "clamp(3.5rem, 6.5vw, 5.5rem)",
                    color: "#834316",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.88,
                    marginTop: "0.08em",
                  }}
                >
                  {m.year}
                </span>
                <div className="pt-1">
                  <h3
                    className="font-heading font-light leading-tight"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#606C38" }}
                  >
                    {m.title}
                  </h3>
                  <p className="font-body text-sm text-bark/50 leading-relaxed mt-2 max-w-sm">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
