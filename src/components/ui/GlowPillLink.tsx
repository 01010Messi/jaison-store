"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

interface GlowPillLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverShadow: string;
}

export default function GlowPillLink({
  href,
  children,
  className = "",
  style,
  hoverShadow,
}: GlowPillLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-all duration-200 ${className}`}
      style={style}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = hoverShadow; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
    >
      {children}
    </Link>
  );
}
