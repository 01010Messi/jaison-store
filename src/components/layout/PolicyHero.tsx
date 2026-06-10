interface PolicyHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  sub?: string;
}

export default function PolicyHero({
  eyebrow,
  title,
  accent,
  sub,
}: PolicyHeroProps) {
  return (
    <section
      style={{ backgroundColor: "#EFE4C5" }}
      className="pt-24 pb-14 px-6 md:px-14 lg:px-24"
    >
      <p
        className="relative font-accent text-[10px] tracking-[0.22em] uppercase mb-8"
        style={{ color: "rgba(26,60,52,0.42)" }}
      >
        {eyebrow}
      </p>

      <h1
        className="relative font-heading font-light leading-[1.06]"
        style={{
          fontSize: "clamp(3.25rem, 8vw, 6.5rem)",
          letterSpacing: "-0.02em",
          color: "#1A3C34",
        }}
      >
        {title}{" "}
        <span style={{ color: "#834316", fontStyle: "italic" }}>{accent}</span>
      </h1>

      {sub && (
        <p
          className="relative mt-6 font-body text-base leading-relaxed"
          style={{ color: "rgba(26,60,52,0.52)", maxWidth: "520px" }}
        >
          {sub}
        </p>
      )}
    </section>
  );
}
