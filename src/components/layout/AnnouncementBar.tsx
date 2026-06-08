"use client";

const marqueeItems = [
  { text: "55 YEARS", italic: false },
  { text: "ONE FORMAT", italic: false },
  { text: "ZERO COMPROMISES", italic: false },
  { text: "CASH ON DELIVERY ACROSS INDIA", italic: false },
  { text: "ESSENCE OF HERBS IN EVERY GRAM", italic: true },
];

function MarqueeStrip({ prefix }: { prefix: string }) {
  return (
    <span className="flex items-center whitespace-nowrap">
      {marqueeItems.map((item, i) => (
        <span key={`${prefix}-${i}`} className="flex items-center">
          {item.italic ? (
            <span className="font-accent text-[10px] md:text-[10px] text-[9px] tracking-widest uppercase text-gold italic">
              {item.text}
            </span>
          ) : (
            <span className="font-accent text-[10px] md:text-[10px] text-[9px] tracking-widest uppercase text-cream">
              {item.text}
            </span>
          )}
          <span className="text-gold/60 text-[8px] mx-3">◆</span>
        </span>
      ))}
    </span>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="bg-bark overflow-hidden py-2">
      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        <MarqueeStrip prefix="a" />
        <MarqueeStrip prefix="b" />
      </div>
    </div>
  );
}
