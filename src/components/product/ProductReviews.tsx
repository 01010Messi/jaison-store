"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Star, MessageSquarePlus } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import toast from "react-hot-toast";

interface ReviewData {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  userName: string;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export default function ProductReviews({
  productId,
  productName,
}: ProductReviewsProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [count, setCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((r) => r.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
        setCount(data.count || 0);
      })
      .catch(() => {});
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!body.trim()) {
      toast.error("Please write your review");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating,
          title: title.trim() || null,
          reviewBody: body.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setShowForm(false);
        setRating(0);
        setTitle("");
        setBody("");
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Inject AggregateRating JSON-LD when reviews are loaded
  useEffect(() => {
    if (count > 0) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: averageRating,
          reviewCount: count,
          bestRating: 5,
          worstRating: 1,
        },
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-review-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return () => {
        script.remove();
      };
    }
  }, [count, averageRating, productName]);

  return (
    <section className="mt-12 pt-10 border-t border-border-light">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading text-xl text-bark">Customer Reviews</h2>
          {count > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <span className="text-sm text-bark/60 font-body">
                {averageRating} out of 5 ({count} review{count !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>

        {session?.user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm text-xs font-accent uppercase tracking-wider text-bark/70 hover:border-bark hover:text-bark transition-colors"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Write a Review
          </button>
        ) : (
          <Link
            href="/login"
            className="text-xs font-accent uppercase tracking-wider text-bark/50 hover:text-terracotta transition-colors"
          >
            Login to write a review
          </Link>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-5 bg-surface-warm border border-border/50 rounded-sm"
        >
          <p className="text-xs font-accent uppercase tracking-wider text-bark/50 mb-4">
            Reviewing: {productName}
          </p>

          <div className="mb-4">
            <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-2">
              Your Rating
            </label>
            <StarRating
              rating={rating}
              interactive
              onChange={setRating}
              size="lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-3 py-2 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:outline-none transition-colors placeholder:text-bark/30"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-2">
              Your Review
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:outline-none transition-colors resize-none placeholder:text-bark/30"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-bark text-cream text-xs font-accent uppercase tracking-wider rounded-sm hover:bg-bark/90 disabled:opacity-50 transition-all"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-accent uppercase tracking-wider text-bark/50 hover:text-bark transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="pb-6 border-b border-border-light last:border-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-parchment flex items-center justify-center text-xs font-heading text-bark">
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-heading text-bark">
                    {review.userName}
                  </p>
                  <p className="text-[11px] text-bark/40 font-body">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating
                        ? "fill-gold text-gold"
                        : "fill-transparent text-parchment-dark"
                    }`}
                  />
                ))}
              </div>

              {review.title && (
                <p className="text-sm font-heading text-bark mb-1">
                  {review.title}
                </p>
              )}
              <p className="text-sm text-bark/70 font-body leading-relaxed">
                {review.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-bark/40 font-body">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      )}
    </section>
  );
}
