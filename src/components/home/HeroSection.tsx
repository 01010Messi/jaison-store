import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen -mt-[100px] md:-mt-[164px]"
      aria-label="Hero"
    >
      {/* Background layer */}
      <div className="absolute inset-0">
        {/* Video — auto-activates when /public/videos/hero.mp4 is dropped in */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-group.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Static image fallback (visible until video loads / when no video file) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-group.jpg')" }}
        />
        {/* Light cream overlay for text legibility */}
        <div className="absolute inset-0 bg-cream/40" />
      </div>

      {/* Content — bottom-left */}
      <div className="absolute bottom-0 left-0 px-6 md:px-16 pb-16 md:pb-20 max-w-4xl">
        <h1 className="font-heading text-4xl md:text-8xl lg:text-9xl leading-[0.9] text-bark">
          Your bottle lists a
          <br />
          dozen ingredients.
        </h1>
        <p className="font-heading text-4xl md:text-8xl lg:text-9xl leading-[0.9] italic text-terracotta mt-2">
          Our product lists one.
        </p>

        <p className="mt-6 font-body text-bark/70 text-sm md:text-lg max-w-xl leading-relaxed">
          Most skincare needs preservatives, stabilisers and synthetic fragrance to sit on a shelf.
          Ours needs none of that. Single-ingredient herbal powders for face, skin and hair — just
          the plant, ground and sifted. Mix at home. Use. Rinse.
        </p>

        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-cream font-accent tracking-widest text-sm rounded-full hover:bg-terracotta/90 transition-colors"
          >
            SHOP THE CATALOGUE <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/why-powder"
            className="inline-flex items-center px-6 py-3 border border-bark/40 text-bark font-accent tracking-widest text-sm rounded-full hover:bg-bark/5 transition-colors"
          >
            READ WHY POWDER
          </Link>
        </div>
      </div>
    </section>
  );
}
