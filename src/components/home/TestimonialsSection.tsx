"use client";

const testimonials = [
  {
    initial: "M",
    name: "Meher",
    age: 39,
    city: "Udaipur",
    product: "Ubtan",
    avatarBg: "var(--color-gold)",
    quote:
      "I've used Jaison's ubtan powder every week for eight years. Same turmeric-sandalwood blend — never needed anything else.",
  },
  {
    initial: "D",
    name: "Divya",
    age: 35,
    city: "Coimbatore",
    product: "Neem",
    avatarBg: "var(--color-bark-light)",
    quote:
      "Twelve years of serums never cleared my breakouts the way Jaison's neem powder did in six weeks.",
  },
  {
    initial: "R",
    name: "Riya",
    age: 26,
    city: "Nagpur",
    product: "Ubtan Powder",
    avatarBg: "var(--color-terracotta-light)",
    quote:
      "My grandmother mixed ubtan from Jaison the same way before my mother's wedding. One sniff of it and I'm back in her kitchen.",
  },
  {
    initial: "G",
    name: "Geeta",
    age: 47,
    city: "Bhopal",
    product: "Amla",
    avatarBg: "var(--color-sage)",
    quote:
      "Fifteen years of bottled anti-hairfall oils, then six weeks of Jaison's amla powder — that's when my hairfall actually slowed down.",
  },
  {
    initial: "P",
    name: "Pooja",
    age: 42,
    city: "Patna",
    product: "Mehendi",
    avatarBg: "var(--color-sage)",
    quote:
      "No PPD, no ammonia — just Jaison's mehendi leaves. My grey covers for six weeks before I need to redo it.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-rhythm-lg bg-parchment overflow-hidden">
      <div className="container-brand">

        {/* Section header — two columns */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="flex-1 max-w-2xl">
            <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-bark/72 mb-4">
              — Real Rituals · Across India
            </p>
            <h2
              className="font-heading text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-bark font-light leading-[1.08] tracking-[-0.01em]"
            >
              People who mix
              <span
                className="block"
                style={{ color: "var(--color-terracotta)", fontStyle: "italic", fontWeight: 300 }}
              >
                their own skin and hair care.
              </span>
            </h2>
          </div>
          <p className="font-body text-sm text-bark/72 max-w-xs leading-relaxed md:self-end">
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
                background:
                  "linear-gradient(165deg, var(--color-terracotta-dark) 0%, var(--color-bark) 100%)",
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
        <p className="text-center font-accent text-[10px] uppercase tracking-[0.25em] text-bark/72 mt-8">
          Real customers. Real results. Unfiltered.
        </p>

      </div>
    </section>
  );
}
