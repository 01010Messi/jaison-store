"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="w-full">
      {/* Full-width banner image */}
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
      <div className="bg-surface px-6 pt-10 pb-8 md:pt-14 md:pb-10">
        <p className="font-accent text-[10px] md:text-xs uppercase tracking-widest text-bark/50 mb-5">
          THE CATALOGUE · NINE POWDERS
        </p>

        <h1 className="font-heading text-5xl md:text-7xl text-bark font-light leading-[1.1] mb-2">
          If nature had
          <br />
          a skincare lab,
          <br />
          <span className="italic" style={{ color: "#A0885C" }}>this would be it.</span>
        </h1>

        <p className="font-body text-bark/60 text-sm md:text-base max-w-lg mt-5 mb-7">
          Nine single-ingredient herbal powders for face, skin and hair — neem, multani mitti, ubtan, amla and more. One herb per jar. Nothing synthetic, nothing added.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Shop Collection
            </Button>
          </Link>
          <Link href="/our-story">
            <Button variant="outline" size="lg">
              Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
