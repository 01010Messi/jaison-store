import Link from "next/link";

const receiptRows = [
  { label: "INGREDIENT LIST", value: "1 line" },
  { label: "SYNTHETICS", value: "None" },
  { label: "PRESERVATIVES", value: "None" },
  { label: "SHELF LIFE", value: "12–24 months" },
  { label: "MIXED AT HOME", value: "Yes" },
  { label: "SINCE", value: "1970" },
];

export default function ManifestoSection() {
  return (
    <section className="bg-manifesto py-20 md:py-32 px-6 relative overflow-hidden">
      {/* Watermark 1970 */}
      <span
        className="absolute right-0 bottom-0 font-heading text-[20rem] leading-none select-none pointer-events-none"
        style={{ color: "rgba(255,255,255,0.04)", lineHeight: 1 }}
        aria-hidden
      >
        1970
      </span>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top label */}
        <p className="font-accent text-xs tracking-widest text-cream/50 uppercase mb-10">
          THE MANIFESTO
        </p>

        {/* First headline */}
        <h2 className="font-heading text-5xl md:text-7xl text-cream leading-tight">
          We don&apos;t formulate
        </h2>
        <h2 className="font-heading text-5xl md:text-7xl leading-tight italic mb-4" style={{ color: "#C4956A" }}>
          around trends.
        </h2>

        {/* Second headline */}
        <h2 className="font-heading text-5xl md:text-7xl text-cream leading-tight mb-4">
          We formulate around{" "}
          <em className="italic" style={{ color: "#C4956A" }}>plants.</em>
        </h2>

        {/* Italic subtitle */}
        <p className="font-heading text-xl md:text-2xl italic text-cream/50 mb-14">
          You don&apos;t need a chemistry degree to read our ingredient list.
        </p>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: copy */}
          <div className="space-y-5 text-cream/70 font-body text-base leading-relaxed">
            <p>
              Most liquid skincare carries a preservative system — parabens,
              phenoxyethanol, sodium benzoate — alongside stabilisers, emulsifiers
              and synthetic fragrance. A shelf-stable formula needs them to last. Not
              because the formulator wanted them in.
            </p>
            <p>
              A single dried herb needs none of that.{" "}
              <em className="italic" style={{ color: "#C4956A" }}>
                In 55 years, we have never added a preservative or a synthetic anything
              </em>{" "}
              — because we never needed one to begin with.
            </p>
            <div className="pt-4">
              <Link
                href="/our-story"
                className="inline-block border border-cream/40 text-cream text-xs tracking-widest uppercase px-8 py-4 hover:bg-cream/10 transition-colors duration-200"
              >
                READ OUR STORY →
              </Link>
            </div>
          </div>

          {/* Right: THE RECEIPT box */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-cream/50">
                The Receipt
              </p>
            </div>
            <div className="border border-cream/15 divide-y divide-cream/10">
              {receiptRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                  <span className="font-accent text-[11px] tracking-[0.15em] uppercase text-cream/40">
                    {row.label}
                  </span>
                  <span className="font-heading text-sm text-cream/70 italic">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
