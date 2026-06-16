import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import SocialShare from "@/components/ui/SocialShare";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import { getProductBySlug } from "@/data/products";

const BASE_URL = "https://jaisonskincare.com";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: `${BASE_URL}${post.image}`, alt: `${post.title} — Ayurvedic herbal guide by Jaison Herbals` }],
      url: `${BASE_URL}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`${BASE_URL}${post.image}`],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let blockquoteLines: string[] = [];

  const fmt = (text: string) =>
    text
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-terracotta underline hover:text-terracotta-dark transition-colors">$1</a>'
      )
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-bark font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

  const flushParagraph = () => {
    if (currentParagraph.length === 0) return;
    const text = currentParagraph.join(" ");
    if (text.trim()) {
      elements.push(
        <p
          key={`p-${elements.length}`}
          className="text-bark/75 font-body leading-[1.8] text-[15px]"
          dangerouslySetInnerHTML={{ __html: fmt(text) }}
        />
      );
    }
    currentParagraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={`ul-${elements.length}`} className="space-y-2 my-4 pl-1">
        {listItems.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-bark/75 font-body text-[15px] leading-[1.8]"
          >
            <span className="text-gold mt-2 text-[8px]" aria-hidden="true">&#9679;</span>
            <span dangerouslySetInnerHTML={{ __html: fmt(item) }} />
          </li>
        ))}
      </ul>
    );
    listItems = [];
    inList = false;
  };

  const flushBlockquote = () => {
    if (blockquoteLines.length === 0) return;
    const first = blockquoteLines[0].trim();
    const isHeading = first.startsWith("**") && first.endsWith("**") && !first.startsWith("- ");
    const headingText = isHeading ? first.replace(/\*\*/g, "") : null;
    const body = isHeading ? blockquoteLines.slice(1) : blockquoteLines;

    elements.push(
      <div key={`bq-${elements.length}`} className="bg-parchment border border-border rounded-xl p-5 my-6">
        {headingText && (
          <p className="text-[11px] font-accent uppercase tracking-[0.18em] text-bark/60 mb-3">
            {headingText}
          </p>
        )}
        <ul className="space-y-2.5">
          {body
            .filter((l) => l.trim())
            .map((line, i) => {
              const isBullet = line.trim().startsWith("- ");
              const text = isBullet ? line.trim().slice(2) : line.trim();
              return (
                <li key={i} className="flex items-start gap-2.5 text-[14px] font-body text-bark/70 leading-relaxed">
                  {isBullet && (
                    <span className="text-gold mt-1.5 text-[8px] shrink-0" aria-hidden="true">&#9679;</span>
                  )}
                  <span dangerouslySetInnerHTML={{ __html: fmt(text) }} />
                </li>
              );
            })}
        </ul>
      </div>
    );
    blockquoteLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blockquoteLines.push(trimmed.slice(2));
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="font-heading text-2xl md:text-3xl text-bark font-medium mt-10 mb-4 tracking-wide"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="font-heading text-xl md:text-2xl text-bark font-medium mt-8 mb-3"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      flushBlockquote();
      inList = true;
      listItems.push(trimmed.replace(/^[-*]\s/, ""));
    } else if (trimmed.startsWith("|")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      if (!trimmed.includes("---")) {
        const cells = trimmed
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim());
        if (cells.length >= 2) {
          elements.push(
            <div
              key={`tr-${elements.length}`}
              className="flex gap-4 py-2 border-b border-border-light text-sm font-body text-bark/70"
            >
              <span className="font-semibold text-bark min-w-[100px]">{cells[0]}</span>
              <span>{cells[1]}</span>
            </div>
          );
        }
      }
    } else if (trimmed === "") {
      if (inList) flushList();
      flushBlockquote();
      flushParagraph();
    } else {
      if (inList) flushList();
      if (blockquoteLines.length > 0) flushBlockquote();
      currentParagraph.push(trimmed);
    }
  }

  flushList();
  flushBlockquote();
  flushParagraph();

  return elements;
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, 3);
  const relatedProducts = post.relatedProducts
    .map(getProductBySlug)
    .filter(Boolean);

  return (
    <>
      <ArticleJsonLd slug={params.slug} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "Blog", url: "https://jaisonskincare.com/blog" },
          {
            name: post.title,
            url: `https://jaisonskincare.com/blog/${post.slug}`,
          },
        ]}
      />

      <article className="min-h-screen">
        {/* Hero */}
        <div className="bg-surface-warm py-10 md:py-14">
          <div className="container-brand mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[10px] font-accent uppercase tracking-wider text-bark/60 hover:text-bark transition-colors rounded-full border px-4 py-2"
              style={{ borderColor: "rgba(26,60,52,0.2)" }}
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Blog
            </Link>
          </div>

          <div className="container-brand max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-parchment text-[10px] font-accent uppercase tracking-[0.15em] text-bark/60 rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-bark font-medium leading-tight tracking-wide">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mt-5 text-[11px] font-accent uppercase tracking-wider text-bark/60">
              <span>By {post.author}</span>
              <span>&bull;</span>
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

            <div className="mt-6">
              <SocialShare
                url={`https://jaisonskincare.com/blog/${post.slug}`}
                title={post.title}
                description={post.excerpt}
                image={post.image}
              />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container-brand max-w-3xl mx-auto mt-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="container-brand max-w-3xl mx-auto py-10 md:py-14">
          <div className="space-y-4">{renderMarkdown(post.content)}</div>

          {/* Shop the Ingredients CTA */}
          {relatedProducts.length > 0 && (
            <div className="mt-14 pt-10 border-t border-border">
              <div className="mb-7">
                <h3 className="font-heading text-3xl md:text-4xl text-bark font-medium tracking-wide">
                  Shop the Ingredients
                </h3>
                <p className="font-body text-sm text-bark/60 mt-1.5">
                  The herbs from this article, sourced and processed for your ritual.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(
                  (product) =>
                    product && (
                      <Link
                        key={product.slug}
                        href={`/shop/${product.slug}`}
                        className="group bg-cream rounded-xl overflow-hidden border border-border hover:border-gold/60 hover:shadow-warm transition-all duration-300"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div>
                            <p className="font-heading text-[15px] text-bark group-hover:text-terracotta transition-colors leading-snug">
                              {product.name}
                            </p>
                            <p className="text-xs text-bark/60 font-body mt-0.5">
                              ₹{product.price} · {product.weight}g
                            </p>
                          </div>
                          <ArrowRight
                            className="h-4 w-4 text-bark/30 group-hover:text-terracotta group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-14 pt-10 border-t border-border">
              <h3 className="font-heading text-2xl text-bark mb-6">
                Keep Reading
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <h4 className="font-heading text-base text-bark group-hover:text-terracotta transition-colors leading-snug">
                      {related.title}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-accent uppercase tracking-wider text-bark/60 hover:text-terracotta transition-colors mt-2 border rounded-full px-3 py-1.5" style={{ borderColor: "rgba(26,60,52,0.2)" }}>
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
