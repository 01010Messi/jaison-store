import Link from "next/link";

const receiptRows = [
  { label: "INGREDIENT LIST", value: "1 line" },
  { label: "SYNTHETICS", value: "None" },
  { label: "PRESERVATIVES", value: "None" },
  { label: "SHELF LIFE", value: "12–24 months" },
  { label: "MIXED AT HOME", value: "Yes" },
  { label: "MADE IN", value: "India" },
];

export default function ManifestoSection() {
  return (
    <section className="bg-manifesto pb-20 md:pb-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top label */}
        <p className="font-accent text-xs tracking-widest text-cream/50 uppercase pt-20 mb-10">
          THE MANIFESTO
        </p>

        {/* Headlines — larger to match prototype */}
        <h2 className="font-heading text-6xl md:text-8xl text-cream leading-[1.05]">
          We don&apos;t formulate
        </h2>
        <h2 className="font-heading text-6xl md:text-8xl leading-[1.05] italic mb-2" style={{ color: "#C4956A" }}>
          around trends.
        </h2>
        <h2 className="font-heading text-6xl md:text-8xl text-cream leading-[1.05] mb-5">
          We formulate around{" "}
          <em className="italic" style={{ color: "#C4956A" }}>plants.</em>
        </h2>

        {/* Italic subtitle */}
        <p className="font-heading text-xl md:text-2xl italic text-cream/40 mb-16">
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
          </div>

          {/* Right: THE RECEIPT box */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-cream/50">
                The Receipt
              </p>
            </div>
            {/* Soft card — no divider lines, rounded */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              {receiptRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between px-6 py-4">
                  <span className="font-accent text-[11px] tracking-[0.15em] uppercase text-cream/40">
                    {row.label}
                  </span>
                  <span className="font-heading text-base text-cream/70 italic">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA bottom right — pill button */}
        <div className="flex justify-end mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-gold/80 text-cream text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-gold transition-colors duration-200"
          >
            SEE THE CATALOGUE →
          </Link>
        </div>
      </div>
    </section>
  );
}
