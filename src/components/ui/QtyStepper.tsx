"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Quantity stepper — pill-bordered (product page) or compact (cart rows).
 */
interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** md — bordered pill (product detail); sm — compact row control (cart) */
  size?: "sm" | "md";
  className?: string;
}

export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  className,
}: QtyStepperProps) {
  const decDisabled = value <= min;
  const incDisabled = value >= max;

  return (
    <div
      className={cn(
        "flex items-center",
        size === "md" && "rounded-full border border-border",
        className
      )}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={decDisabled}
        aria-label="Decrease quantity"
        className={cn(
          "transition-colors duration-200 disabled:opacity-30",
          size === "md"
            ? "pl-4 pr-3 py-3 text-bark"
            : "px-2.5 py-1 text-bark/72 hover:text-bark"
        )}
      >
        <Minus className={size === "md" ? "h-4 w-4" : "h-3 w-3"} />
      </button>

      <span
        aria-live="polite"
        className={cn(
          "font-body text-sm text-center text-bark",
          size === "md" ? "px-3 py-3 min-w-[2.5rem]" : "px-2 font-medium min-w-[24px]"
        )}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={incDisabled}
        aria-label="Increase quantity"
        className={cn(
          "transition-colors duration-200 disabled:opacity-30",
          size === "md"
            ? "pl-3 pr-4 py-3 text-bark"
            : "px-2.5 py-1 text-bark/72 hover:text-bark"
        )}
      >
        <Plus className={size === "md" ? "h-4 w-4" : "h-3 w-3"} />
      </button>
    </div>
  );
}
