import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Numbered step/stat card — shared between the home ritual guide and the
 * product "How to use" grid. Gold display numeral + body copy, optional
 * photo and title.
 */
interface StepCardProps {
  /** step number; numbers are zero-padded ("01") */
  number: number | string;
  title?: string;
  children: React.ReactNode;
  image?: { src: string; alt: string; sizes?: string };
  /** cream — solid cream card (home); tint — warm tint + hairline border (product) */
  background?: "cream" | "tint";
  numberSize?: "md" | "lg";
  className?: string;
}

export default function StepCard({
  number,
  title,
  children,
  image,
  background = "cream",
  numberSize = "md",
  className,
}: StepCardProps) {
  const num =
    typeof number === "number" ? String(number).padStart(2, "0") : number;

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden flex flex-col",
        background === "cream" ? "bg-cream" : "p-5",
        className
      )}
      style={
        background === "tint"
          ? {
              // warm card tint — between cream and parchment (see DESIGN.md)
              backgroundColor: "#FAF3E4",
              border: "1px solid rgba(26,60,52,0.10)",
            }
          : undefined
      }
    >
      {image && (
        <div className="relative w-full aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes={image.sizes ?? "(max-width: 768px) 50vw, 20vw"}
          />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col flex-1",
          background === "cream" && "p-5 md:p-6"
        )}
      >
        <span
          aria-hidden="true"
          className="font-heading font-light block leading-none text-gold-deep"
          style={{
            fontSize:
              numberSize === "lg"
                ? "clamp(32px, 4vw, 48px)"
                : "clamp(28px, 4vw, 44px)",
            letterSpacing: "-0.03em",
            marginBottom: numberSize === "lg" ? "0.75rem" : "1rem",
            fontVariantNumeric: "lining-nums",
          }}
        >
          {num}
        </span>
        <span className="sr-only">Step {parseInt(num, 10)}.</span>

        {title && (
          <h3
            className="font-heading font-light mb-2 text-bark"
            style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.2 }}
          >
            {title}
          </h3>
        )}

        <p className="font-body text-sm leading-relaxed text-bark/70">
          {children}
        </p>
      </div>
    </div>
  );
}
