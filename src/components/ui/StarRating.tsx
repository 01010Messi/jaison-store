"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
  showCount?: boolean;
  count?: number;
}

export default function StarRating({
  rating = 0,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
  showCount = false,
  count = 0,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayRating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={cn(
              "transition-colors duration-150",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizes[size],
                isFilled
                  ? "fill-gold text-gold"
                  : "fill-transparent text-parchment-dark"
              )}
            />
          </button>
        );
      })}
      {showCount && (
        <span className="ml-1.5 text-xs text-bark/50 font-body">
          ({count})
        </span>
      )}
    </div>
  );
}
