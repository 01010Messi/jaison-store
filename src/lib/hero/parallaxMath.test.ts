import test from "node:test";
import assert from "node:assert";
import {
  clamp,
  lerp,
  cursorOffset,
  scrollProgress,
  cardTransform,
} from "./parallaxMath.ts";

test("clamp bounds values within range", () => {
  assert.strictEqual(clamp(5, 0, 10), 5);
  assert.strictEqual(clamp(-5, 0, 10), 0);
  assert.strictEqual(clamp(15, 0, 10), 10);
});

test("lerp interpolates and clamps t to [0,1]", () => {
  assert.strictEqual(lerp(0, [10, 20]), 10);
  assert.strictEqual(lerp(1, [10, 20]), 20);
  assert.strictEqual(lerp(0.5, [10, 20]), 15);
  assert.strictEqual(lerp(1.5, [0, 10]), 10);
  assert.strictEqual(lerp(-0.5, [0, 10]), 0);
});

test("cursorOffset is zero at the rect center", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 };
  const offset = cursorOffset(100, 50, rect, 1, 20);
  assert.strictEqual(offset.x, 0);
  assert.strictEqual(offset.y, 0);
});

test("cursorOffset scales with depth and clamps to maxOffsetPx at the rect edge", () => {
  const rect = { left: 0, top: 0, width: 200, height: 100 };
  const fullDepth = cursorOffset(200, 50, rect, 1, 20);
  assert.strictEqual(fullDepth.x, 20);
  const halfDepth = cursorOffset(200, 50, rect, 0.5, 20);
  assert.strictEqual(halfDepth.x, 10);
  const beyondEdge = cursorOffset(400, 50, rect, 1, 20);
  assert.strictEqual(beyondEdge.x, 20);
});

test("scrollProgress maps scrollY into a clamped 0-1 range", () => {
  assert.strictEqual(scrollProgress(0, 0, 1000), 0);
  assert.strictEqual(scrollProgress(500, 0, 1000), 0.5);
  assert.strictEqual(scrollProgress(2000, 0, 1000), 1);
  assert.strictEqual(scrollProgress(-100, 0, 1000), 0);
});

test("cardTransform formats a translate3d + scale CSS string", () => {
  assert.strictEqual(
    cardTransform(1.5, -2, 1.04),
    "translate3d(1.50px, -2.00px, 0) scale(1.040)"
  );
});
