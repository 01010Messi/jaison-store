"use client";

import { useEffect, useRef } from "react";

export function usePointerRef(enabled: boolean) {
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!enabled) {
      pointerRef.current = null;
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled]);

  return pointerRef;
}
