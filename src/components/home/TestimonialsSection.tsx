"use client";

const testimonials = [
  {
    initial: "L",
    name: "Lakshmi",
    age: 67,
    city: "Jaipur",
    product: "Ubtan",
    avatarBg: "#C9A84C",
    quote:
      "I have used this since 1979. Nothing on the shelf has ever tempted me to switch.",
  },
  {
    initial: "P",
    name: "Priya",
    age: 38,
    city: "Bengaluru",
    product: "Neem",
    avatarBg: "#4A7C59",
    quote:
      "I spent twelve years on serums. Neem powder did more in six weeks than all of them combined.",
  },
  {
    initial: "A",
    name: "Anika",
    age: 22,
    city: "Pune",
    product: "Ubtan Powder",
    avatarBg: "#C17A3A",
    quote:
      "My grandmother made ubtan for my mother's wedding. The smell took me straight back to her kitchen.",
  },
  {
    initial: "M",
    name: "Meera",
    age: 51,
    city: "Hyderabad",
    product: "Amla",
    avatarBg: "#5C8A6A",
    quote:
      "Shampooed for fifteen years. Switched to reetha and shikakai. I have not bought a bottle since.",
  },
  {
    initial: "S",
    name: "Sunita",
    age: 74,
    city: "Indore",
    product: "Mehendi",
    avatarBg: "#6B8A5A",
    quote:
      "No PPD. No chemicals. Just leaves. My grey stays covered for six weeks at a time.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-parchment overflow-hidden">
      <div className="container-brand">

        {/* Section header — two columns */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="flex-1 max-w-2xl">
            <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/40 mb-4">
              — Real Rituals · Across India
            </p>
            <h2
              className="font-heading text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-bark font-light leading-[1.08] tracking-[-0.01em]"
            >
              People who mix
              <span
                className="block"
                style={{ color: "#834316", fontStyle: "italic", fontWeight: 300 }}
              >
                their own skincare.
              </span>
            </h2>
          </div>
          <p className="font-body text-sm text-bark/50 max-w-xs leading-relaxed md:self-end">
            Real customers, real routines. From oily-skin acne fixes to herbal
            hair washes — one person&apos;s bathroom ritual, unfiltered.
          </p>
        </div>

        {/* Cards — horizontal scroll on mobile, 5-col grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:grid md:grid-cols-5 md:overflow-visible md:mx-0 md:px-0 scrollbar-hide">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 w-[220px] md:w-auto h-[420px] rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(165deg, #6B3A20 0%, #261008 100%)",
              }}
            >
              {/* Avatar + name pill */}
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: t.avatarBg }}
                >
                  <span className="text-[11px] font-accent font-semibold text-white">
                    {t.initial}
                  </span>
                </div>
                <span className="text-xs font-accent text-white/70 tracking-wide">
                  {t.name}, {t.age}
                </span>
              </div>

              {/* Quote — centred in remaining space */}
              <p
                className="font-heading text-[1.05rem] leading-snug text-white/90 flex-1 flex items-center py-4"
                style={{ fontStyle: "italic", fontWeight: 300 }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* City + product */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-accent uppercase tracking-widest text-white/35">
                  {t.city}
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-[9px] font-accent uppercase tracking-wider text-white/75"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer caption */}
        <p className="text-center font-accent text-[10px] uppercase tracking-[0.25em] text-bark/30 mt-8">
          Real customers. Real results. Unfiltered.
        </p>

      </div>
    </section>
  );
}
