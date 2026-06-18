import { cn } from "@/lib/utils";

/**
 * The v2 section header pattern: eyebrow + display serif heading with an
 * italic terracotta accent line, plus an optional small supporting note.
 *
 * Eyebrow spec (single source of truth): font-accent, 11px, tracking 0.22em,
 * uppercase. `eyebrowTone="accent"` uses terracotta (7.2:1 on cream).
 */
interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  /** prefix the eyebrow with a gold em-dash */
  eyebrowDash?: boolean;
  eyebrowTone?: "muted" | "accent";
  title: React.ReactNode;
  /** italic terracotta line, rendered on its own line by default */
  accent?: React.ReactNode;
  accentPlacement?: "block" | "inline";
  /** small supporting paragraph below the heading */
  note?: React.ReactNode;
  size?: "md" | "lg" | "xl";
  /** for sections on a bark/dark background */
  dark?: boolean;
  className?: string;
  headingClassName?: string;
}

const HEADING_SIZES: Record<NonNullable<SectionHeaderProps["size"]>, string> = {
  md: "clamp(2.25rem, 4vw, 3rem)",
  lg: "clamp(2.5rem, 5vw, 4rem)",
  xl: "clamp(2.25rem, 6vw, 5rem)",
};

export default function SectionHeader({
  eyebrow,
  eyebrowDash = false,
  eyebrowTone = "muted",
  title,
  accent,
  accentPlacement = "block",
  note,
  size = "md",
  dark = false,
  className,
  headingClassName,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p
          className={cn(
            "font-accent text-[11px] tracking-[0.22em] uppercase mb-4",
            eyebrowDash && "flex items-center gap-3",
            dark
              ? "text-cream/70"
              : eyebrowTone === "accent"
                ? "text-terracotta"
                : "text-bark/72"
          )}
        >
          {eyebrowDash && (
            <span aria-hidden="true" className="text-gold">
              —
            </span>
          )}
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "font-heading font-light leading-[1.08] tracking-[-0.01em]",
          dark ? "text-cream" : "text-bark",
          headingClassName
        )}
        style={{ fontSize: HEADING_SIZES[size] }}
      >
        {title}
        {accent && accentPlacement === "inline" && (
          <>
            {" "}
            <em className="italic font-light text-terracotta">{accent}</em>
          </>
        )}
        {accent && accentPlacement === "block" && (
          <em className="block italic font-light text-terracotta">{accent}</em>
        )}
      </h2>

      {note && (
        <p
          className={cn(
            "font-body text-sm leading-relaxed mt-6 max-w-xs",
            dark ? "text-cream/70" : "text-bark/72"
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}
