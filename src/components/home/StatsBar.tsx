const stats = [
  { number: "1970", label: "YEAR WE STARTED GRINDING", colour: "text-terracotta" },
  { number: "55", label: "YEARS, ONE FORMAT", colour: "text-[#6B3A28]" },
  { number: "0", label: "PRESERVATIVES. EVER.", colour: "text-bark" },
];

export default function StatsBar() {
  return (
    <section className="bg-cream">
      <div className="h-px bg-bark/15 mx-6 md:mx-16" />

      <div className="grid grid-cols-3 max-w-5xl mx-auto text-center px-4 md:px-16 py-10 md:py-14">
        {stats.map((stat) => (
          <div key={stat.number} className="flex flex-col items-center gap-3 px-2">
            <span className={`font-heading text-6xl md:text-9xl leading-none ${stat.colour}`}>
              {stat.number}
            </span>
            <span className="font-accent text-[10px] md:text-xs tracking-[0.18em] uppercase text-bark/50 leading-snug">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-bark/15 mx-6 md:mx-16" />
    </section>
  );
}
