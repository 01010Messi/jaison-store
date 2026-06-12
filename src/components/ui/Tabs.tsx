"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
  /** "underline" (default) — gold line under active tab; "pills" — pill-shaped triggers */
  variant?: "underline" | "pills";
  /** accessible name for the tablist */
  label?: string;
}

export default function Tabs({
  items,
  defaultTab,
  className,
  variant = "underline",
  label,
}: TabsProps) {
  const baseId = useId();
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Roving focus: arrow keys move between tabs, Home/End jump
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % items.length;
    else if (e.key === "ArrowLeft")
      nextIndex = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = items.length - 1;
    if (nextIndex === null) return;
    e.preventDefault();
    const next = items[nextIndex];
    setActiveTab(next.id);
    tabRefs.current.get(next.id)?.focus();
  };

  return (
    <div className={className}>
      {/* Tab headers */}
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "flex overflow-x-auto scrollbar-hide",
          variant === "underline" ? "border-b border-border" : "gap-2"
        )}
      >
        {items.map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                if (el) tabRefs.current.set(item.id, el);
                else tabRefs.current.delete(item.id);
              }}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative font-body text-sm font-medium whitespace-nowrap transition-colors duration-200",
                variant === "underline"
                  ? "px-6 py-3"
                  : "px-5 py-2 rounded-full border",
                variant === "pills" &&
                  (isActive
                    ? "bg-bark text-cream border-bark"
                    : "bg-transparent text-bark/70 border-border hover:border-bark/40"),
                variant === "underline" &&
                  (isActive
                    ? "text-terracotta"
                    : "text-bark/60 hover:text-bark/80")
              )}
            >
              {item.label}
              {item.count !== undefined && (
                <span
                  className={cn(
                    "ml-1.5 text-xs",
                    variant === "pills" && isActive
                      ? "text-cream/70"
                      : "text-bark/60"
                  )}
                >
                  ({item.count})
                </span>
              )}
              {/* Active indicator — gold line */}
              {variant === "underline" && isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeTab}`}
        aria-labelledby={`${baseId}-tab-${activeTab}`}
        tabIndex={0}
        className="py-6"
      >
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  );
}
