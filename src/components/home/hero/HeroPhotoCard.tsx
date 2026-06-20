"use client";

import Image from "next/image";
import { forwardRef } from "react";

interface HeroPhotoCardProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  objectPosition?: string;
  className?: string;
}

const HeroPhotoCard = forwardRef<HTMLDivElement, HeroPhotoCardProps>(
  function HeroPhotoCard(
    { src, alt, sizes, priority = false, decorative = false, objectPosition = "center", className = "" },
    ref
  ) {
    return (
      <div
        ref={ref}
        aria-hidden={decorative || undefined}
        className={`absolute overflow-hidden rounded-2xl ${className}`}
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, black 78%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 78%, transparent 100%)",
          boxShadow: "0 24px 48px -12px rgba(26,60,52,0.35)",
        }}
      >
        <Image
          src={src}
          alt={decorative ? "" : alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }
);

export default HeroPhotoCard;
