import HeroSectionFramer from "@/components/home/hero/HeroSectionFramer";

export default function HeroPreviewA() {
  return (
    <main>
      <div className="fixed top-2 left-2 z-50 rounded bg-black/80 px-3 py-1 text-xs text-white">
        Variant A — Framer Motion
      </div>
      <HeroSectionFramer />
    </main>
  );
}
