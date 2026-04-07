"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/decorative/ScrollReveal";

const categories = [
  {
    name: "Skin Care",
    slug: "skin-care",
    description: "Reveal your natural glow",
    image: "/images/categories/skin-care.png",
  },
  {
    name: "Hair Care",
    slug: "hair-care",
    description: "Nourish from root to tip",
    image: "/images/categories/hair-care.png",
  },
  {
    name: "Face Care",
    slug: "face-care",
    description: "Pamper your whole self",
    image: "/images/categories/face-care.png",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-brand">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <p className="section-label text-sage mb-3">Explore</p>
            <h2 className="font-heading text-3xl md:text-4xl text-bark">
              Shop by Category
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <ScrollReveal
              key={category.slug}
              animation="fade-up"
              delay={index * 150}
            >
              <Link
                href={`/shop?category=${category.slug}`}
                className="group block relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-bark/20 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <p className="section-label text-cream/70 mb-1">
                    {category.description}
                  </p>
                  <h3 className="font-heading text-2xl text-cream">
                    {category.name}
                  </h3>
                  <div className="mt-3 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                    <span className="inline-block px-6 py-2 text-xs font-accent uppercase tracking-wider text-cream border border-cream/30 rounded-sm group-hover:bg-cream/10 transition-colors">
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
