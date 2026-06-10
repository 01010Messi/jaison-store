"use client";

import { useRef } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

const cardStyles: Record<string, { bg: string; illustration?: "leaf" | "oval" | "leaf-green" | "none" }> = {
  "how-to-use-ubtan-for-glowing-skin":       { bg: "#EDE0C8", illustration: "oval" },
  "amla-powder-benefits-for-hair-growth":    { bg: "#DDD0B4", illustration: "leaf" },
  "multani-mitti-face-pack-recipes":         { bg: "#8B4A2B", illustration: "none" },
  "natural-hair-wash-shikakai-reetha-amla":  { bg: "#C8D8B0", illustration: "leaf-green" },
  "neem-powder-for-acne-clear-skin":         { bg: "#B8C8A0", illustration: "leaf-green" },
  "ayurvedic-skincare-routine-for-beginners":{ bg: "#EDE8DC", illustration: "oval" },
  "orange-peel-powder-benefits-for-face":    { bg: "#E8C89A", illustration: "oval" },
  "bhringraj-powder-for-hair-growth":        { bg: "#2A4A38", illustration: "leaf-green" },
  "reetha-soapnut-benefits-for-hair":        { bg: "#D8C8A8", illustration: "leaf" },
};

function LeafIllustration() {
  return (
    <svg viewBox="0 0 120 140" className="w-16 h-20" aria-hidden="true">
      <ellipse cx="60" cy="70" rx="34" ry="52" fill="#A07840" opacity="0.85" transform="rotate(-15 60 70)" />
      <line x1="38" y1="105" x2="82" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LeafGreenIllustration() {
  return (
    <svg viewBox="0 0 120 140" className="w-16 h-20" aria-hidden="true">
      <ellipse cx="60" cy="70" rx="34" ry="52" fill="#5C8040" opacity="0.75" transform="rotate(-15 60 70)" />
      <line x1="38" y1="105" x2="82" y2="35" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OvalIllustration() {
  return (
    <svg viewBox="0 0 140 160" className="w-20 h-24" aria-hidden="true">
      <ellipse cx="70" cy="95" rx="45" ry="55" fill="#5C3A1E" opacity="0.88" />
      <ellipse cx="70" cy="72" rx="22" ry="14" fill="#C8940A" opacity="0.75" />
    </svg>
  );
}

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .blog-scroll::-webkit-scrollbar { display: none; }
        .blog-scroll { scrollbar-width: none; }
        .blog-home-card { transition: transform 0.25s; flex-shrink: 0; }
        .blog-home-card:hover { transform: translateY(-4px); }
        .blog-home-card:hover .blog-home-title { color: #834316 !important; }
        .arrow-btn { transition: background-color 0.2s, box-shadow 0.2s; }
        .arrow-btn:hover { background-color: rgba(96,108,56,0.06); box-shadow: 0 0 12px rgba(96,108,56,0.1); }
        .view-all-btn { transition: box-shadow 0.2s, background-color 0.2s; }
        .view-all-btn:hover { box-shadow: 0 0 18px rgba(96,108,56,0.12); }
      `}</style>

      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#FEFAE0" }}
      >
        <div className="px-6 md:px-14 lg:px-24">

          {/* Header row */}
          <div className="flex items-end justify-between mb-10">
            <h2
              className="font-heading font-light leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", color: "#606C38" }}
            >
              Reads worth your time.
            </h2>

            {/* Arrow nav */}
            <div className="flex items-center gap-2 pb-1">
              <button
                onClick={() => scroll("left")}
                className="arrow-btn w-9 h-9 rounded-full border flex items-center justify-center"
                style={{ borderColor: "rgba(96,108,56,0.2)", color: "#606C38" }}
                aria-label="Scroll left"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="arrow-btn w-9 h-9 rounded-full border flex items-center justify-center"
                style={{ borderColor: "rgba(96,108,56,0.2)", color: "#606C38" }}
                aria-label="Scroll right"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable cards */}
          <div
            ref={scrollRef}
            className="blog-scroll flex gap-6 overflow-x-auto pb-2"
          >
            {blogPosts.map((post) => {
              const style = cardStyles[post.slug] ?? { bg: "#EDE8DC", illustration: "none" };
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-home-card"
                  style={{ width: "280px" }}
                >
                  <div
                    className="rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ height: "360px", backgroundColor: style.bg }}
                  >
                    {style.illustration === "leaf"       && <LeafIllustration />}
                    {style.illustration === "leaf-green" && <LeafGreenIllustration />}
                    {style.illustration === "oval"       && <OvalIllustration />}
                  </div>
                  <div className="mt-4">
                    <p
                      className="font-accent text-[9px] tracking-[0.2em] uppercase mb-1.5"
                      style={{ color: "#834316" }}
                    >
                      {post.category.toUpperCase()}
                    </p>
                    <h3
                      className="blog-home-title font-heading font-light leading-snug"
                      style={{ fontSize: "1.15rem", color: "#606C38" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="mt-1.5 font-accent text-[10px] tracking-widest"
                      style={{ color: "rgba(96,108,56,0.35)" }}
                    >
                      {post.readTime} min read
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View all button */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="view-all-btn inline-flex items-center gap-2 rounded-full border px-7 py-3 font-accent text-[10px] tracking-[0.15em] uppercase"
              style={{ borderColor: "rgba(96,108,56,0.3)", color: "#606C38" }}
            >
              VIEW ALL ARTICLES →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
