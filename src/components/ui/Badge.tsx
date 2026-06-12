import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sage" | "terracotta" | "gold" | "bark" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-parchment text-bark/70",
    sage: "bg-sage/10 text-sage-dark",
    terracotta: "bg-terracotta/10 text-terracotta",
    gold: "bg-gold/10 text-gold-dark",
    bark: "bg-bark text-cream",
    outline: "border border-border text-bark/60",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-accent uppercase tracking-[0.12em] font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
