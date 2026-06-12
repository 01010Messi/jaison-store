import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import OrnamentalBorder from "@/components/decorative/OrnamentalBorder";
import ScrollReveal from "@/components/decorative/ScrollReveal";

export default function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-surface-warm">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal animation="fade-in">
            <div className="relative aspect-square max-w-lg mx-auto">
              <OrnamentalBorder variant="full" className="p-4">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/images/brand-story.webp"
                    alt="jaison herbals - traditional ayurvedic preparation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </OrnamentalBorder>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="text-center lg:text-left">
              <p className="section-label text-sage mb-3">Our Story</p>
              <h2 className="font-heading text-3xl md:text-4xl text-bark mb-6">
                Rooted in Tradition,
                <br />
                Made for Today
              </h2>
              <div className="space-y-4 text-bark/60 font-body leading-relaxed">
                <p>
                  At jaison, we believe in the timeless power of nature.
                  Our journey began with a simple truth — the ancient Ayurvedic
                  recipes passed down through generations hold the secret to
                  truly radiant beauty.
                </p>
                <p>
                  Every product is carefully crafted using 100% natural
                  ingredients, free from chemicals, parabens, and artificial
                  additives. From the forests of India to your skincare ritual,
                  we bring you the purest herbal powders.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/our-story">
                  <Button variant="outline" size="md">
                    Read Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
