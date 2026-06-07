const stats = [
  { number: "1970", label: "YEAR WE STARTED GRINDING" },
  { number: "55", label: "YEARS, ONE FORMAT" },
  { number: "1", label: "INGREDIENT PER JAR" },
  { number: "0", label: "PRESERVATIVES. EVER." },
];

export default function StatsBar() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.number} className="text-center">
              <div className="font-heading text-7xl md:text-9xl text-bark/20 leading-none select-none">
                {stat.number}
              </div>
              <div className="font-accent text-xs tracking-widest text-bark/60 uppercase mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
