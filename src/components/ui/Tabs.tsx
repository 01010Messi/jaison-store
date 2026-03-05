"use client";

import { useState } from "react";
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
}

export default function Tabs({ items, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  return (
    <div className={className}>
      {/* Tab headers */}
      <div className="flex border-b border-border overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "relative px-6 py-3 font-body text-sm font-medium whitespace-nowrap transition-colors duration-200",
              activeTab === item.id
                ? "text-terracotta"
                : "text-bark/50 hover:text-bark/80"
            )}
          >
            {item.label}
            {item.count !== undefined && (
              <span className="ml-1.5 text-xs text-bark/40">
                ({item.count})
              </span>
            )}
            {/* Active indicator — gold line */}
            {activeTab === item.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  );
}
