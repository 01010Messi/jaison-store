"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full">
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
    </section>
  );
}
