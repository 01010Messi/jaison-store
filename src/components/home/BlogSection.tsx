"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";

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
        .blog-home-card:hover .blog-home-title { color: var(--color-terracotta) !important; }
        .arrow-btn { transition: background-color 0.2s, box-shadow 0.2s; }
        .arrow-btn:hover { background-color: rgba(26,60,52,0.06); box-shadow: 0 0 12px rgba(26,60,52,0.1); }
        .view-all-btn { transition: box-shadow 0.2s, background-color 0.2s; }
        .view-all-btn:hover { box-shadow: 0 0 18px rgba(26,60,52,0.12); }
      `}</style>

      <section
        className="section-rhythm-lg"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <div className="px-6 md:px-14 lg:px-24">

          {/* Header row */}
          <div className="flex items-end justify-between mb-10">
            <h2
              className="font-heading font-light leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.02em", color: "var(--color-bark)" }}
            >
              Reads worth your time.
            </h2>

            {/* Arrow nav */}
            <div className="flex items-center gap-2 pb-1">
              <button
                onClick={() => scroll("left")}
                className="arrow-btn w-9 h-9 rounded-full border flex items-center justify-center"
                style={{ borderColor: "rgba(26,60,52,0.2)", color: "var(--color-bark)" }}
                aria-label="Scroll left"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="arrow-btn w-9 h-9 rounded-full border flex items-center justify-center"
                style={{ borderColor: "rgba(26,60,52,0.2)", color: "var(--color-bark)" }}
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
            {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-home-card"
                  style={{ width: "280px" }}
                >
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{ height: "360px" }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="280px"
                    />
                  </div>
                  <div className="mt-4">
                    <p
                      className="font-accent text-[9px] tracking-[0.2em] uppercase mb-1.5"
                      style={{ color: "var(--color-terracotta)" }}
                    >
                      {post.category.toUpperCase()}
                    </p>
                    <h3
                      className="blog-home-title font-heading font-light leading-snug"
                      style={{ fontSize: "1.15rem", color: "var(--color-bark)" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="mt-1.5 font-accent text-[10px] tracking-widest"
                      style={{ color: "rgba(26,60,52,0.35)" }}
                    >
                      {post.readTime} min read
                    </p>
                  </div>
                </Link>
            ))}
          </div>

          {/* View all button */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="view-all-btn inline-flex items-center gap-2 rounded-full border px-7 py-3 font-accent text-[10px] tracking-[0.15em] uppercase"
              style={{ borderColor: "rgba(26,60,52,0.3)", color: "var(--color-bark)" }}
            >
              VIEW ALL ARTICLES →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
