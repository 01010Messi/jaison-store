"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import OrnamentalBorder from "@/components/decorative/OrnamentalBorder";
import GoldRule from "@/components/decorative/GoldRule";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-surface overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/patterns/paper-texture.png')] opacity-[0.03]" />

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text side */}
          <div className="order-2 lg:order-1 text-center lg:text-left py-12 lg:py-0">
            <OrnamentalBorder variant="simple" className="inline-block p-8 lg:p-12">
              <p className="section-label text-sage mb-4 animate-fade-in">
                Natural Ayurvedic Beauty
              </p>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-bark font-light tracking-wide leading-[1.1] animate-fade-up">
                The Essence
                <br />
                of Herbs in
                <br />
                <span className="text-terracotta">Every Grain</span>
              </h1>

              <div className="my-6">
                <GoldRule variant="leaf" width="w-32 lg:w-40 mx-auto lg:mx-0" />
              </div>

              <p className="font-body text-bark/60 text-base lg:text-lg max-w-md mx-auto lg:mx-0 animate-fade-up delay-200">
                Discover the ancient wisdom of Ayurvedic beauty care.
                100% natural herbal powders for radiant skin and lustrous hair,
                handcrafted with love in India.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start animate-fade-up delay-400">
                <Link href="/shop">
                  <Button variant="primary" size="lg">
                    Shop Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Our Story
                  </Button>
                </Link>
              </div>
            </OrnamentalBorder>
          </div>

          {/* Image side */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] max-w-lg mx-auto lg:max-w-none rounded-sm overflow-hidden">
              <Image
                src="/images/hero-group.jpg"
                alt="jaison herbals product collection - natural ayurvedic powders"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft hidden lg:block">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gold/40" />
      </div>
    </section>
  );
}
