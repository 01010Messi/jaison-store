import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen -mt-[100px] md:-mt-[164px] bg-cream overflow-hidden flex flex-col"
      aria-label="Hero"
    >
      {/* Faint product image in background — editorial style */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url('/images/hero-group.jpg')" }}
      />

      {/* Video — will auto-activate when /public/videos/hero.mp4 is added */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Content — flex column fills full viewport height */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-16 pt-[110px] md:pt-[180px] pb-12 md:pb-16">

        {/* Top labels — left and right */}
        <div className="flex justify-between items-center mb-auto">
          <p className="font-accent text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-bark/50 flex items-center gap-3">
            <span className="block w-6 h-px bg-terracotta flex-shrink-0" />
            SINGLE-INGREDIENT HERBAL POWDERS · SINCE 1970
          </p>
          <p className="font-accent text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-bark/50 hidden md:block">
            55 YEARS · ONE FORMAT · ZERO COMPROMISES
          </p>
        </div>

        {/* Giant headline — fills width */}
        <div className="mt-8 md:mt-12 flex-1 flex flex-col justify-center">
          <h1 className="font-heading leading-[0.88] tracking-tight">
            <span className="block text-[clamp(2.8rem,7.5vw,9.5rem)] text-bark/30">
              Your bottle lists a
            </span>
            <span className="block text-[clamp(2.8rem,7.5vw,9.5rem)] text-bark">
              dozen ingredients.
            </span>
          </h1>
          <p className="font-heading text-[clamp(2.4rem,6.5vw,8.5rem)] leading-[0.88] italic mt-1" style={{ color: "#A0885C" }}>
            Our product lists one.
          </p>
        </div>

        {/* Sub-copy + CTAs — pinned to bottom */}
        <div className="mt-10 md:mt-16 max-w-xl">
          <p className="font-body text-bark/60 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
            Most skincare needs preservatives, stabilisers and synthetic fragrance to sit on a shelf.
            Ours needs none of that. Single-ingredient herbal powders for face, skin and hair — just
            the plant, ground and sifted. Mix at home. Use. Rinse.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bark text-cream font-accent tracking-widest text-xs rounded-full hover:bg-bark/90 transition-colors"
            >
              SHOP THE CATALOGUE <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/why-powder"
              className="inline-flex items-center px-6 py-3 border border-bark/30 text-bark font-accent tracking-widest text-xs rounded-full hover:bg-bark/5 transition-colors"
            >
              READ WHY POWDER
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
