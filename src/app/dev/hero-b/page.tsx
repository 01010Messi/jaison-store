import HeroSectionGsap from "@/components/home/hero/HeroSectionGsap";

export default function HeroPreviewB() {
  return (
    <main>
      <div className="fixed top-2 left-2 z-50 rounded bg-black/80 px-3 py-1 text-xs text-white">
        Variant B — GSAP
      </div>
      <HeroSectionGsap />
    </main>
  );
}
