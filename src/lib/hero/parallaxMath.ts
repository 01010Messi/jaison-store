export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(t: number, range: [number, number]): number {
  const [from, to] = range;
  return from + (to - from) * clamp(t, 0, 1);
}

export interface Offset {
  x: number;
  y: number;
}

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function cursorOffset(
  pointerX: number,
  pointerY: number,
  rect: Rect,
  depth: number,
  maxOffsetPx: number
): Offset {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const relX = clamp((pointerX - centerX) / (rect.width / 2), -1, 1);
  const relY = clamp((pointerY - centerY) / (rect.height / 2), -1, 1);
  return { x: relX * maxOffsetPx * depth, y: relY * maxOffsetPx * depth };
}

export function scrollProgress(scrollY: number, start: number, end: number): number {
  if (end === start) return 0;
  return clamp((scrollY - start) / (end - start), 0, 1);
}

export function cardTransform(offsetX: number, offsetY: number, scale: number): string {
  return `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
}

// Shared tuning so the Framer Motion and GSAP spike variants animate
// identically — the comparison is about engine feel/performance, not
// different numbers.
export const HERO_PARALLAX = {
  scrollRangePx: 1200,
  cursor: {
    contextCard: { depth: 0.4, maxOffsetPx: 8 },
    productCard: { depth: 0.8, maxOffsetPx: 18 },
  },
  scroll: {
    contextCard: {
      opacityRange: [1, 0.4] as [number, number],
      translateYRange: [0, -40] as [number, number],
    },
    productCard: {
      scaleRange: [1, 1.04] as [number, number],
    },
    particlesOpacityRange: [1, 0.3] as [number, number],
  },
} as const;
