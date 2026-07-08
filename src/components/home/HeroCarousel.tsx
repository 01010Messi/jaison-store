"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  /* Wide banner asset with typography baked in, shown on desktop (md+). */
  image: string;
  /* Optional portrait (reel-ratio) baked-text asset for mobile; falls back to `image`. */
  imageMobile?: string;
  imageAlt: string;
  /* Rendered visually-hidden inside the link — keeps the campaign copy
     crawlable/readable even though the visible text is baked into the image. */
  headline: string;
  claim: string;
  href: string;
  /* Controls arrow/dot contrast against the slide's dominant field. */
  theme: "light" | "dark";
};

const slides: Slide[] = [
  {
    image: "/images/hero/slide-1-ubtan.webp",
    imageMobile: "/images/hero/slide-1-ubtan-mobile.webp",
    imageAlt:
      "Jaison Ubtan — nine herbs, one ritual. Ubtan powder jar beside a brass bowl of golden ubtan, turmeric roots and sandalwood on terracotta. Shop Ubtan.",
    headline: "ubtan — The Original, since 1970",
    claim: "Nine herbs. One ritual. Ground the way it was in 1970. Shop Ubtan.",
    href: "/shop/ubtan-powder",
    theme: "light",
  },
  {
    image: "/images/hero/slide-2-trio.webp",
    imageMobile: "/images/hero/slide-2-trio-mobile.webp",
    imageAlt:
      "Jaison Hair Care Trio — Shikakai, Aamla and Reetha kraft pouches with pods, berries, soapnuts and a wooden comb on linen. Shop the Trio.",
    headline: "the trio — The Haircare Ritual",
    claim: "Shikakai. Aamla. Reetha. Your grandmother's haircare, ground fresh. Shop the Trio.",
    href: "/shop/hair-care-trio",
    theme: "dark",
  },
  {
    image: "/images/hero/slide-3-manifesto.webp",
    imageMobile: "/images/hero/slide-3-manifesto-mobile.webp",
    imageAlt:
      "One ingredient — a single neem branch beside a cone of neem powder and the Jaison neem pouch on deep green. Read Why Powder.",
    headline: "one ingredient — Our Manifesto",
    claim: "Your bottle lists a dozen ingredients. Our product lists one. Read Why Powder.",
    href: "/why-powder",
    theme: "light",
  },
  {
    image: "/images/hero/slide-4-combo.webp",
    imageMobile: "/images/hero/slide-4-combo-mobile.webp",
    imageAlt:
      "Jaison Special — the complete ritual in one box. Ubtan jar and herb pouches arranged as a gift spread with brass bowls of powders and marigolds. Shop Combos.",
    headline: "jaison special — The Complete Ritual",
    claim: "The whole ritual, in one box. Shop Combos.",
    href: "/shop/jaison-special-combo",
    theme: "dark",
  },
];

const AUTOPLAY_MS = 6500;

export default function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const pausedRef = useRef(false);
  const currentRef = useRef(0);
  currentRef.current = current;

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const i = (index + slides.length) % slides.length;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }, []);

  /* Track current slide from native scroll (covers swipe, arrows, autoplay). */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setCurrent(Math.round(track.scrollLeft / track.clientWidth));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Autoplay — paused on hover/touch/focus, off under prefers-reduced-motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      const track = trackRef.current;
      if (!track) return;
      const next = (currentRef.current + 1) % slides.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured rituals"
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {slides.map((slide, i) => {
          /* Art direction: portrait asset under md, wide asset from md up.
             <picture> ensures only the matching source is downloaded. */
          const shared = {
            alt: slide.imageAlt,
            fill: true as const,
            sizes: "100vw",
            priority: i === 0,
          };
          const { props: desktopImg } = getImageProps({
            ...shared,
            src: slide.image,
          });
          const { props: mobileImg } = getImageProps({
            ...shared,
            src: slide.imageMobile ?? slide.image,
          });
          return (
          <article
            key={slide.headline}
            aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.headline}`}
            className="relative w-full flex-none snap-start"
          >
            {/* Whole slide is one link — copy is baked into the artwork, so the
                headline/claim ride along visually hidden for crawlers + SRs. */}
            <Link href={slide.href} className="block relative aspect-[4/5] max-h-[560px] w-full md:aspect-auto md:max-h-none md:h-[clamp(480px,62vh,640px)]">
              <picture>
                <source media="(min-width: 768px)" srcSet={desktopImg.srcSet} />
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img {...mobileImg} className="object-cover object-center" />
              </picture>
              <span className="sr-only">{`${slide.headline}. ${slide.claim}`}</span>
            </Link>
          </article>
          );
        })}
      </div>

      {/* Arrows — desktop only */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(currentRef.current - 1)}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-85"
        style={{
          backgroundColor: "rgba(254,250,224,0.82)",
          color: "var(--color-bark)",
        }}
      >
        <ChevronLeft size={20} strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(currentRef.current + 1)}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-85"
        style={{
          backgroundColor: "rgba(254,250,224,0.82)",
          color: "var(--color-bark)",
        }}
      >
        <ChevronRight size={20} strokeWidth={1.75} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.headline}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            onClick={() => goTo(i)}
            className="h-2.5 w-2.5 rounded-full transition-opacity duration-200"
            style={{
              backgroundColor:
                slides[current].theme === "light"
                  ? "var(--color-cream)"
                  : "var(--color-bark)",
              opacity: i === current ? 1 : 0.45,
            }}
          />
        ))}
      </div>
    </section>
  );
}
