"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, helperText, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={checkboxId}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            "w-4 h-4 rounded-sm border-border text-terracotta focus:ring-gold accent-terracotta",
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-sm font-body text-bark/70">{label}</span>
        )}
        {helperText && (
          <span className="text-xs text-bark/72 font-body">{helperText}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
