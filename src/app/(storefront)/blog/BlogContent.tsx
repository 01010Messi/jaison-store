"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group block">
      {/* Image */}
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
