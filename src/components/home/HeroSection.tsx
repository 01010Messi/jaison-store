import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen -mt-[100px] md:-mt-[164px] bg-cream overflow-hidden flex flex-col"
      aria-label="Hero"
    >
      {/* Faint background — editorial style */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url('/images/hero-group.jpg')" }}
      />
      {/* Video activates automatically when /public/videos/hero.mp4 is added */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-16 pt-[110px] md:pt-[180px] pb-12 md:pb-16">

        {/* Top-right label only */}
        <div className="flex justify-end items-center">
          <p className="font-accent text-[9px] md:text-[10px] tracking-[0.25em] uppercase hidden md:flex items-center gap-2">
            <span style={{ color: "#A0885C" }}>55 YEARS</span>
            <span className="text-bark/30">·</span>
            <span style={{ color: "#A0885C" }}>ONE FORMAT</span>
            <span className="text-bark/30">·</span>
            <span style={{ color: "#A0885C" }}>ZERO COMPROMISES</span>
          </p>
        </div>

        {/* Giant headline */}
        <div className="mt-6 md:mt-10 flex-1 flex flex-col justify-center">
          <h1 className="font-heading leading-[0.88] tracking-tight">
            {/* Line 1 — word-by-word fade left→right like prototype */}
            <span className="block" style={{ fontSize: "clamp(3rem, 9vw, 11rem)" }}>
              <span className="text-bark">Your </span>
              <span className="text-bark/65">bottle </span>
              <span className="text-bark/30">lists </span>
              <span className="text-bark/10">a</span>
            </span>
            {/* Line 2 — dark, strong */}
            <span className="block" style={{ fontSize: "clamp(3rem, 9vw, 11rem)" }}>
              <span className="text-bark/50">dozen </span>
              <span className="text-bark">ingredients.</span>
            </span>
          </h1>
          {/* Line 3 — italic gold */}
          <p
            className="font-heading leading-[0.88] italic mt-1"
            style={{ fontSize: "clamp(2.5rem, 7.5vw, 9.5rem)", color: "#A0885C" }}
          >
            Our product lists one.
          </p>
        </div>

        {/* Sub-copy + CTAs — right aligned */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="font-body text-bark/60 text-sm md:text-base leading-relaxed max-w-md">
            Most skincare needs preservatives, stabilisers and synthetic fragrance to sit on a
            shelf. Ours needs none of that. Single-ingredient herbal powders — just the plant,
            ground and sifted.
          </p>
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap md:justify-end flex-shrink-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-bark text-cream font-accent tracking-widest text-xs rounded-full hover:bg-bark/90 transition-colors whitespace-nowrap"
            >
              SHOP THE CATALOGUE →
            </Link>
            <Link
              href="/why-powder"
              className="inline-flex items-center px-7 py-3.5 border border-bark/30 text-bark font-accent tracking-widest text-xs rounded-full hover:bg-bark/5 transition-colors whitespace-nowrap"
            >
              READ WHY POWDER
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
