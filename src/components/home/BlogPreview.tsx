import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-rhythm-lg">
      <div className="container-brand">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
            <p className="section-label text-sage mb-3">The Jaison Journal</p>
            <h2 className="font-heading text-2xl md:text-3xl text-bark font-light tracking-wide">
              Ayurvedic Beauty Tips
            </h2>
            <div className="flex justify-center mt-3">
              <GoldRule variant="leaf" width="w-24" />
            </div>
            <p className="mt-4 text-bark/60 font-body text-sm max-w-md mx-auto">
              DIY recipes, skincare routines, and herbal hair care guides to
              help you glow naturally.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {latestPosts.map((post, index) => (
            <ScrollReveal
              key={post.slug}
              animation="fade-up"
              delay={index * 100}
            >
              <article className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 bg-cream/90 backdrop-blur-sm text-[10px] font-accent uppercase tracking-[0.12em] text-bark/70 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px] font-accent uppercase tracking-wider text-bark/60">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </div>
                    <h3 className="font-heading text-lg text-bark font-medium leading-snug group-hover:text-terracotta transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-bark/60 font-body line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={300}>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-accent uppercase tracking-[0.12em] text-terracotta hover:gap-3 transition-all"
            >
              Read All Articles
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
