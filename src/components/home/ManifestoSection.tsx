import Link from "next/link";

export default function ManifestoSection() {
  return (
    <section className="bg-manifesto py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-accent text-xs tracking-widest text-cream/50 uppercase mb-8">
          THE MANIFESTO
        </p>

        <h2 className="font-heading text-5xl md:text-7xl text-cream leading-tight mb-2">
          We don&apos;t formulate
        </h2>
        <h2 className="font-heading text-5xl md:text-7xl leading-tight mb-10 italic" style={{ color: "#C4956A" }}>
          around trends.
        </h2>

        <p className="text-cream/70 text-base md:text-lg max-w-2xl leading-relaxed mb-12">
          Most brands reformulate every season. New actives, new claims, new packaging. We&apos;ve had
          one formula since 1970. One herb. One jar. The same Neem powder your grandmother used.
          Not because we can&apos;t innovate — because the herb doesn&apos;t need improving.
        </p>

        <Link
          href="/our-story"
          className="inline-block border border-cream/40 text-cream text-xs tracking-widest uppercase px-8 py-4 hover:bg-cream/10 transition-colors duration-200"
        >
          READ OUR STORY →
        </Link>
      </div>
    </section>
  );
}
