const badges = [
  { icon: "✦", label: "100% Natural Ingredients" },
  { icon: "✦", label: "No Chemicals or Preservatives" },
  { icon: "✦", label: "Made in India" },
  { icon: "✦", label: "Quality Tested Every Batch" },
];

export default function TrustBadgeBar() {
  return (
    <div
      className="w-full py-3 overflow-hidden"
      style={{ backgroundColor: "var(--color-bark)" }}
    >
      <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-1.5 px-4">
        {badges.map((b) => (
          <span
            key={b.label}
            className="flex items-center gap-2 font-accent text-[10px] tracking-[0.18em] uppercase whitespace-nowrap"
            style={{ color: "rgba(254,250,224,0.75)" }}
          >
            <span style={{ color: "var(--color-gold)", fontSize: "8px" }}>{b.icon}</span>
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
