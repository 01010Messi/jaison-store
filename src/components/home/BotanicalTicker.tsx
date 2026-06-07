const herbs = [
  { name: "Sapindus mukorossi", gold: false },
  { name: "Lawsonia inermis", gold: true },
  { name: "Cyperus rotundus", gold: false },
  { name: "Citrus sinensis", gold: true },
  { name: "Azadirachta indica", gold: false },
  { name: "Phyllanthus emblica", gold: true },
  { name: "Curcuma longa", gold: false },
  { name: "Eclipta prostrata", gold: true },
  { name: "Rosa centifolia", gold: false },
];

const separator = <span className="text-gold mx-4 opacity-70">◆</span>;

function TickerContent() {
  return (
    <>
      {herbs.map((herb, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className={`font-heading italic text-sm md:text-base tracking-wide ${
              herb.gold ? "text-gold" : "text-cream/80"
            }`}
          >
            {herb.name}
          </span>
          {separator}
        </span>
      ))}
    </>
  );
}

export default function BotanicalTicker() {
  return (
    <div className="bg-bark overflow-hidden py-4">
      <div className="flex animate-marquee-botanical whitespace-nowrap">
        {/* Duplicate for seamless loop */}
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
