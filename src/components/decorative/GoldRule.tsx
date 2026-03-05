import { cn } from "@/lib/utils";

interface GoldRuleProps {
  variant?: "simple" | "leaf" | "diamond";
  className?: string;
  width?: string;
}

export default function GoldRule({
  variant = "simple",
  className,
  width = "w-24",
}: GoldRuleProps) {
  if (variant === "simple") {
    return (
      <div
        className={cn("h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent", width, className)}
      />
    );
  }

  if (variant === "diamond") {
    return (
      <div className={cn("flex items-center gap-3", width, className)}>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
        <svg width="8" height="8" viewBox="0 0 8 8" className="text-gold shrink-0">
          <rect
            x="4"
            y="0"
            width="5.66"
            height="5.66"
            transform="rotate(45 4 4)"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
      </div>
    );
  }

  // leaf variant
  return (
    <div className={cn("flex items-center gap-3", width, className)}>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-sage shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12c0 0 4-2 10-2s10 2 10 2c0-5.5-4.5-10-10-10z" opacity="0.5" />
        <path d="M12 22V12" />
        <path d="M12 12C8 8 4 8 2 12" opacity="0.6" />
        <path d="M12 12c4-4 8-4 10 0" opacity="0.6" />
      </svg>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}
