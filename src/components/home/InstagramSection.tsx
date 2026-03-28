import { Instagram } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";

export default function InstagramSection() {
  return (
    <section className="py-14 md:py-20 bg-surface-warm">
      <div className="container-brand text-center">
        <ScrollReveal animation="fade-up">
          <p className="section-label text-sage mb-3">Follow Us</p>
          <h2 className="font-heading text-2xl md:text-3xl text-bark font-light tracking-wide">
            Join Our Community
          </h2>
          <div className="flex justify-center mt-3">
            <GoldRule variant="leaf" width="w-24" />
          </div>
          <p className="mt-4 text-bark/55 font-body text-sm max-w-md mx-auto leading-relaxed">
            Follow @jaison_skincare for Ayurvedic beauty tips, customer
            transformations, DIY recipes, and exclusive offers.
          </p>
          <a
            href="https://www.instagram.com/jaison_skincare/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-6 px-8 py-3 bg-bark text-cream text-sm font-accent uppercase tracking-[0.12em] rounded-sm hover:bg-bark/90 transition-colors"
          >
            <Instagram className="h-4.5 w-4.5" />
            Follow @jaison_skincare
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
