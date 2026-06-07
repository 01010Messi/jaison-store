const stats = [
  { number: "1970", label: "YEAR WE STARTED GRINDING", colour: "text-terracotta" },
  { number: "55", label: "YEARS, ONE FORMAT", colour: "text-[#6B3A28]" },
  { number: "0", label: "PRESERVATIVES. EVER.", colour: "text-bark" },
];

export default function StatsBar() {
  return (
    <section className="bg-cream py-20 md:py-28 px-6 md:px-16">
      <div className="grid grid-cols-3 gap-4 md:gap-16 max-w-5xl mx-auto text-center">
        {stats.map((stat) => (
          <div key={stat.number} className="flex flex-col items-center gap-3">
            <span
              className={`font-heading text-5xl md:text-9xl leading-none ${stat.colour}`}
            >
              {stat.number}
            </span>
            <span className="font-accent text-[11px] tracking-[0.2em] uppercase text-bark/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
