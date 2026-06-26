"use client";

import { useEffect, useCallback, useId } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  side?: "left" | "right";
  className?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  title,
  side = "right",
  className,
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen);
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      {/* Backdrop — opacity transition, GPU-composited */}
      <div
        className={cn(
          "absolute inset-0 bg-bark/40 backdrop-blur-sm transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Panel — translateX transition, GPU-composited, never unmounts */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? "Drawer" : undefined}
        tabIndex={-1}
        className={cn(
          "absolute top-0 h-full w-full max-w-md bg-cream shadow-warm-xl",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          side === "right" ? "right-0" : "left-0",
          isOpen
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full",
          className
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 id={titleId} className="font-heading text-xl text-bark">
            {title || " "}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="text-bark/72 hover:text-bark transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-65px)]">{children}</div>
      </div>
    </div>
  );
}
