import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Ayurvedic Beauty Tips & Natural Skincare Guides",
  description:
    "Discover Ayurvedic beauty tips, natural skincare routines, DIY face pack recipes, and herbal hair care guides. Expert advice from Jaison Herbals.",
  alternates: {
    canonical: "https://jaisonskincare.com/blog",
  },
  openGraph: {
    title: "Blog — Ayurvedic Beauty Tips & Natural Skincare Guides | jaison",
    description:
      "Discover Ayurvedic beauty tips, natural skincare routines, DIY face pack recipes, and herbal hair care guides.",
    type: "website",
    url: "https://jaisonskincare.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "Blog", url: "https://jaisonskincare.com/blog" },
        ]}
      />

      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-surface-warm py-12 md:py-16">
          <div className="container-brand text-center">
            <p className="section-label text-sage mb-3">Ancient Wisdom, Modern Beauty</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-bark font-light tracking-wide">
              The Jaison Journal
            </h1>
            <div className="flex justify-center mt-4">
              <GoldRule variant="leaf" width="w-32" />
            </div>
            <p className="mt-4 text-bark/60 font-body text-sm md:text-base max-w-lg mx-auto">
              Ayurvedic beauty tips, DIY recipes, and natural skincare guides
              to help you glow from within.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="container-brand py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-cream/90 backdrop-blur-sm text-[10px] font-accent uppercase tracking-[0.15em] text-bark/70 rounded-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] font-accent uppercase tracking-wider text-bark/40">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </span>
                    </div>

                    <h2 className="font-heading text-xl md:text-2xl text-bark font-medium leading-snug group-hover:text-terracotta transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-bark/60 font-body line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-xs font-accent uppercase tracking-wider text-terracotta pt-1 group-hover:gap-2.5 transition-all">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
