import { cn } from "@/lib/utils";

interface OrnamentalBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: "simple" | "full";
}

export default function OrnamentalBorder({
  children,
  className,
  variant = "simple",
}: OrnamentalBorderProps) {
  if (variant === "simple") {
    return (
      <div className={cn("relative", className)}>
        {/* Top-left corner */}
        <div className="absolute -top-2 -left-2 w-8 h-8">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gold/40" />
          <div className="absolute top-0 left-0 h-full w-[1px] bg-gold/40" />
        </div>
        {/* Bottom-right corner */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8">
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gold/40" />
          <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gold/40" />
        </div>
        {children}
      </div>
    );
  }

  // Full ornamental border with all 4 corners
  return (
    <div className={cn("relative", className)}>
      {/* Top-left */}
      <div className="absolute -top-3 -left-3 w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-full h-full text-gold/40">
          <path d="M0 2 Q0 0 2 0 L38 0" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M0 2 L0 38" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      {/* Top-right */}
      <div className="absolute -top-3 -right-3 w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-full h-full text-gold/40">
          <path d="M40 2 Q40 0 38 0 L2 0" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 2 L40 38" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="38" cy="2" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      {/* Bottom-left */}
      <div className="absolute -bottom-3 -left-3 w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-full h-full text-gold/40">
          <path d="M0 38 Q0 40 2 40 L38 40" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M0 38 L0 2" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="2" cy="38" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      {/* Bottom-right */}
      <div className="absolute -bottom-3 -right-3 w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-full h-full text-gold/40">
          <path d="M40 38 Q40 40 38 40 L2 40" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 38 L40 2" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="38" cy="38" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      {children}
    </div>
  );
}
