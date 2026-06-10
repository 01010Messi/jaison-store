"use client";

import { useState } from "react";
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
    <svg viewBox="0 0 120 140" className="w-20 h-24" aria-hidden="true">
      <ellipse cx="60" cy="70" rx="34" ry="52" fill="#A07840" opacity="0.85" transform="rotate(-15 60 70)" />
      <line x1="38" y1="105" x2="82" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LeafGreenIllustration() {
  return (
    <svg viewBox="0 0 120 140" className="w-20 h-24" aria-hidden="true">
      <ellipse cx="60" cy="70" rx="34" ry="52" fill="#5C8040" opacity="0.75" transform="rotate(-15 60 70)" />
      <line x1="38" y1="105" x2="82" y2="35" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OvalIllustration() {
  return (
    <svg viewBox="0 0 140 160" className="w-24 h-28" aria-hidden="true">
      <ellipse cx="70" cy="95" rx="45" ry="55" fill="#5C3A1E" opacity="0.88" />
      <ellipse cx="70" cy="72" rx="22" ry="14" fill="#C8940A" opacity="0.75" />
    </svg>
  );
}

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  const style = cardStyles[post.slug] ?? { bg: "#EDE8DC", illustration: "none" };

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group block">
      {/* Image area */}
      <div
        className="relative w-full rounded-xl overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: "3/4", backgroundColor: style.bg }}
      >
        {style.illustration === "leaf"       && <LeafIllustration />}
        {style.illustration === "leaf-green" && <LeafGreenIllustration />}
        {style.illustration === "oval"       && <OvalIllustration />}
      </div>

      {/* Meta */}
      <div className="mt-4">
        <p
          className="font-accent text-[9px] tracking-[0.2em] uppercase mb-2"
          style={{ color: "#834316" }}
        >
          {post.category.toUpperCase()}
        </p>
        <h2
          className="font-heading font-light leading-snug blog-card-title"
          style={{ fontSize: "1.2rem", color: "#1A3C34" }}
        >
          {post.title}
        </h2>
        <p
          className="mt-1.5 font-accent text-[10px] tracking-widest"
          style={{ color: "rgba(26,60,52,0.38)" }}
        >
          {post.readTime} min read
        </p>
      </div>
    </Link>
  );
}

export default function BlogContent() {
  const [filter, setFilter] = useState<"all" | "skin care" | "hair care">("all");

  const filtered = filter === "all"
    ? blogPosts
    : blogPosts.filter((p) => p.category.toLowerCase() === filter);

  return (
    <>
      <style>{`
        .blog-filter-pill {
          transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .blog-filter-pill:hover {
          box-shadow: 0 0 14px rgba(26,60,52,0.15);
        }
        .blog-card { transition: transform 0.25s; }
        .blog-card:hover { transform: translateY(-4px); }
        .blog-card:hover .blog-card-title { color: #834316 !important; }
      `}</style>

      {/* Filter pills */}
      <div className="flex gap-3 mb-12">
        {(["all", "skin care", "hair care"] as const).map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="blog-filter-pill rounded-full px-5 py-2 font-accent text-[10px] tracking-[0.15em] uppercase border"
              style={{
                backgroundColor: active ? "#1A3C34" : "transparent",
                color:           active ? "#FEFAE0" : "#1A3C34",
                borderColor:     active ? "#1A3C34" : "rgba(26,60,52,0.25)",
              }}
            >
              {f === "all" ? "ALL" : f === "skin care" ? "SKIN CARE" : "HAIR CARE"}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
