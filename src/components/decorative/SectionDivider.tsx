import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "botanical" | "mandala" | "gold" | "wave";
  className?: string;
}

export default function SectionDivider({
  variant = "botanical",
  className,
}: SectionDividerProps) {
  if (variant === "gold") {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
          <div className="w-1 h-1 bg-gold/40 rotate-45" />
          <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </div>
    );
  }

  if (variant === "botanical") {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="flex items-center gap-4 w-full max-w-sm">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-sage/30" />
          <svg
            width="32"
            height="24"
            viewBox="0 0 32 24"
            className="text-sage/50 shrink-0"
            fill="currentColor"
          >
            {/* Center leaf */}
            <ellipse cx="16" cy="8" rx="3" ry="7" transform="rotate(0 16 8)" opacity="0.7" />
            {/* Left leaf */}
            <ellipse cx="10" cy="10" rx="2.5" ry="6" transform="rotate(-30 10 10)" opacity="0.5" />
            {/* Right leaf */}
            <ellipse cx="22" cy="10" rx="2.5" ry="6" transform="rotate(30 22 10)" opacity="0.5" />
            {/* Stem */}
            <rect x="15.5" y="12" width="1" height="8" rx="0.5" opacity="0.4" />
          </svg>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-sage/30" />
        </div>
      </div>
    );
  }

  if (variant === "mandala") {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="flex items-center gap-4 w-full max-w-sm">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            className="text-gold/50 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          >
            <circle cx="14" cy="14" r="12" />
            <circle cx="14" cy="14" r="8" />
            <circle cx="14" cy="14" r="4" />
            <circle cx="14" cy="14" r="1.5" fill="currentColor" opacity="0.5" />
            {/* Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="14"
                y1="2"
                x2="14"
                y2="6"
                transform={`rotate(${angle} 14 14)`}
                opacity="0.6"
              />
            ))}
          </svg>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>
    );
  }

  // wave variant
  return (
    <div className={cn("py-8", className)}>
      <svg
        viewBox="0 0 1200 12"
        className="w-full max-w-2xl mx-auto text-parchment-dark"
        preserveAspectRatio="none"
      >
        <path
          d="M0 6 Q150 0 300 6 Q450 12 600 6 Q750 0 900 6 Q1050 12 1200 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
