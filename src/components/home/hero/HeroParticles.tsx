"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseVX: number;
  baseVY: number;
  pushX: number;
  pushY: number;
  radius: number;
}

interface HeroParticlesProps {
  reducedMotion: boolean;
  particleCount?: number;
  cursorRef?: React.RefObject<{ x: number; y: number } | null>;
  className?: string;
}

// Brand gold (#B89968 in DESIGN.md) as a canvas rgb triplet — canvas
// fillStyle can't read CSS custom properties, so the literal is pulled
// from the documented token instead of inventing a new value.
const PARTICLE_COLOR = "184,153,104";
const PUSH_RADIUS_PX = 90;

export default function HeroParticles({
  reducedMotion,
  particleCount = 24,
  cursorRef,
  className = "",
}: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !ctx) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseVX: (Math.random() - 0.5) * 0.15,
      baseVY: (Math.random() - 0.5) * 0.15 - 0.05,
      pushX: 0,
      pushY: 0,
      radius: 1 + Math.random() * 2,
    }));

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let frameId: number;

    function tick() {
      frameId = requestAnimationFrame(tick);
      if (!visibleRef.current) return;
      ctx!.clearRect(0, 0, width, height);

      const cursor = cursorRef?.current ?? null;

      for (const p of particles) {
        if (cursor) {
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PUSH_RADIUS_PX && dist > 0.001) {
            const force = (1 - dist / PUSH_RADIUS_PX) * 1.2;
            p.pushX += (dx / dist) * force;
            p.pushY += (dy / dist) * force;
          }
        }
        p.pushX *= 0.92;
        p.pushY *= 0.92;

        p.x += p.baseVX + p.pushX;
        p.y += p.baseVY + p.pushY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${PARTICLE_COLOR}, 0.35)`;
        ctx!.fill();
      }
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [reducedMotion, particleCount, cursorRef]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
