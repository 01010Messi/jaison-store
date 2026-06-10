import type { Metadata } from "next";
import FindYourRitualContent from "./FindYourRitualContent";

export const metadata: Metadata = {
  title: "Find Your Ritual | Jaison Herbals",
  description:
    "Answer four quick questions and we'll match you with the right Ayurvedic herbal powder ritual for your skin and hair — Ubtan, Amla, Neem, Multani Mitti & more.",
  alternates: {
    canonical: "https://jaisonskincare.com/find-your-ritual",
  },
};

export default function FindYourRitualPage() {
  return (
    <>
      <h1 className="sr-only">
        Find Your Ritual — Ayurvedic Herbal Powder Quiz | Jaison Herbals
      </h1>
      <FindYourRitualContent />
    </>
  );
}
