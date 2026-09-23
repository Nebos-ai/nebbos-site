"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * NumberCounter · patterns/NumberCounter.tsx · v2 · 2026-09-23
 *
 * Counts UP from 0 to the target value when the component enters view.
 *
 * v2: Motion `animate()` drives the tween and writes straight to the
 * node's textContent, so a count-up never re-renders React. The server
 * renders the final value (crawlers and no-JS readers see the real
 * number); the client resets to 0 only if the counter is still off
 * screen, then counts up on entry. Respects prefers-reduced-motion.
 *
 * `format` controls how the interpolated value renders: default
 * shows the raw integer with tabular-nums; pass "millions" for
 * "X.XXM" formatting; pass "thousands" for "X.XK".
 */

type Format = "int" | "millions" | "thousands";

export function NumberCounter({
  value,
  format = "int",
  durationMs = 1400,
  suffix = "",
}: {
  value: number;
  format?: Format;
  durationMs?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const armed = useRef(false);

  // Arm: if still below the fold on mount, park at 0 until it scrolls in.
  // Reads matchMedia directly: useReducedMotion() is not settled on the
  // first client effect, and a reduced-motion reader must never see 0.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      el.textContent = formatValue(0, format) + suffix;
      armed.current = true;
    }
  }, [format, suffix]);

  // Preference flipped to reduced after arming: show the real value.
  useEffect(() => {
    const el = ref.current;
    if (!el || !reduce || !armed.current) return;
    armed.current = false;
    el.textContent = formatValue(value, format) + suffix;
  }, [reduce, value, format, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || !armed.current) return;
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = formatValue(v, format) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, durationMs, format, suffix]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {formatValue(value, format) + suffix}
    </span>
  );
}

function formatValue(v: number, format: Format): string {
  if (format === "millions") return `${(v / 1_000_000).toFixed(2)}M`;
  if (format === "thousands") return `${(v / 1_000).toFixed(1)}K`;
  return `${Math.round(v)}`;
}
