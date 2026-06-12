"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every Framer Motion animation respect the user's
 * `prefers-reduced-motion` setting (transform/layout animations are
 * skipped; opacity still animates so content never fails to appear).
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
