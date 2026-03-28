"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GoldRule from "@/components/decorative/GoldRule";

export default function HeroSection() {
  return (
    <section className="w-full">
      {/* Full-width banner image on top */}
      <div className="relative w-full aspect-[16/7] md:aspect-[16/6]">
        <Image
          src="/images/hero-group.jpg"
          alt="jaison herbals — natural ayurvedic herbal powders collection"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Text section below banner */}
      <div className="bg-surface text-center py-10 md:py-14 px-6">
        <p className="font-accent text-[11px] md:text-xs uppercase tracking-[0.2em] text-gold mb-4 animate-fade-in">
          100% Natural &bull; Chemical-Free &bull; Ayurvedic
        </p>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bark font-light tracking-wide leading-[1.15] animate-fade-up">
          Herbal Powders
          <br />
          Crafted with Care
        </h1>

        <GoldRule variant="leaf" width="w-24 md:w-32 mx-auto" className="mt-5 mb-4" />

        <p className="font-body text-bark/60 text-sm md:text-base lg:text-lg max-w-xl mx-auto animate-fade-up delay-200">
          The Essence of Herbs in Every Gram — 100% natural, chemical-free
          and gentle on all skin types.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-8 justify-center animate-fade-up delay-400">
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
      </div>
    </section>
  );
}
