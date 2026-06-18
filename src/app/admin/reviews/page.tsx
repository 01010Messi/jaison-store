"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import toast from "react-hot-toast";

interface Review {
  id: string;
  rating: number;
  title?: string;
  body?: string;
  status: string;
  user: { name?: string; email: string };
  product: { name: string; slug: string };
  createdAt: string;
}

const statusBadge: Record<string, "gold" | "sage" | "terracotta"> = {
  PENDING: "gold",
  APPROVED: "sage",
  REJECTED: "terracotta",
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleModerate = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast.success(`Review ${status.toLowerCase()}`);
    } catch {
      toast.error("Failed to update review");
    }
  };

  const filteredReviews =
    filter === "ALL" ? reviews : reviews.filter((r) => r.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-bark">Reviews</h1>
        <p className="text-sm text-bark/72 font-body mt-1">
          Moderate customer reviews
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-3 py-1.5 text-xs font-accent uppercase tracking-wider rounded-full border transition-colors whitespace-nowrap",
              filter === s
                ? "bg-bark text-cream border-bark"
                : "bg-cream text-bark/72 border-border hover:border-bark/30"
            )}
          >
            {s}
            {s !== "ALL" && (
              <span className="ml-1 opacity-50">
                ({reviews.filter((r) => r.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredReviews.length === 0 ? (
        <div className="bg-cream p-5 rounded-sm border border-border/50">
          <div className="flex flex-col items-center justify-center py-16 text-bark/30">
            <Star className="h-12 w-12 mb-3 opacity-50" />
            <p className="font-heading text-lg text-bark/72">No reviews found</p>
            <p className="text-xs text-bark/30 font-body mt-1">
              {filter === "PENDING"
                ? "No reviews awaiting moderation"
                : "Customer reviews will appear here"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-cream rounded-sm border border-border/50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < review.rating
                              ? "text-gold fill-gold"
                              : "text-bark/15"
                          )}
                        />
                      ))}
                    </div>
                    <Badge variant={statusBadge[review.status] || "default"}>
                      {review.status}
                    </Badge>
                  </div>
                  {review.title && (
                    <p className="font-heading text-sm text-bark mb-1">
                      {review.title}
                    </p>
                  )}
                  {review.body && (
                    <p className="text-sm text-bark/72 font-body mb-2">
                      {review.body}
                    </p>
                  )}
                  <p className="text-xs text-bark/72 font-body">
                    {review.user.name || review.user.email} on{" "}
                    <span className="text-bark/72">{review.product.name}</span>
                    {" "}&bull;{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {review.status === "PENDING" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleModerate(review.id, "APPROVED")}
                      className="p-2 text-sage hover:bg-sage/10 rounded-sm transition-colors"
                      aria-label="Approve review"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleModerate(review.id, "REJECTED")}
                      className="p-2 text-terracotta hover:bg-terracotta/10 rounded-sm transition-colors"
                      aria-label="Reject review"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
