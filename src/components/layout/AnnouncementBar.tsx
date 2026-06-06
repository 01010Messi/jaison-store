"use client";

const items = [
  "55 YEARS",
  "ONE FORMAT",
  "ZERO COMPROMISES",
  "Free shipping over ₹499",
  "CASH ON DELIVERY ACROSS INDIA",
];

const tickerContent = items.map((item, i) => (
  <span key={i} className="inline-flex items-center">
    <span className="text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.18em] px-4 md:px-6">{item}</span>
    <span className="text-gold text-[7px] md:text-[8px]">◆</span>
  </span>
));

export default function AnnouncementBar() {
  return (
    <div className="bg-bark text-cream overflow-hidden py-2 md:py-2.5 z-50 relative">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="inline-flex items-center">{tickerContent}</span>
        <span className="inline-flex items-center" aria-hidden="true">{tickerContent}</span>
      </div>
    </div>
  );
}
