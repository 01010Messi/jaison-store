"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[11px] font-accent uppercase tracking-[0.14em] text-bark/60"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full px-4 py-2.5 bg-cream border border-border rounded-lg appearance-none",
              "font-body text-bark text-sm",
              "transition-all duration-200",
              "hover:border-gold/60",
              "focus:border-gold focus:ring-1 focus:ring-gold/30",
              error && "border-terracotta",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bark/60 pointer-events-none" />
        </div>
        {error && (
          <p className="text-xs text-terracotta font-body">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
