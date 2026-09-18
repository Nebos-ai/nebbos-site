"use client";

import { useEffect, useRef, useState } from "react";

/**
 * NumberCounter · patterns/NumberCounter.tsx · v1 · 2026-09-18
 *
 * Counts UP from 0 to the target value when the component enters view.
 * Standard award-tier reveal move for hero stats. Uses
 * IntersectionObserver to trigger once, requestAnimationFrame to
 * animate. Respects prefers-reduced-motion.
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
  const [display, setDisplay] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? value
      : 0,
  );
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const from = 0;
            const to = value;
            function tick(now: number) {
              const t = Math.min(1, (now - start) / durationMs);
              // Ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              const current = from + (to - from) * eased;
              setDisplay(current);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(to);
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {formatValue(display, format)}
      {suffix}
    </span>
  );
}

function formatValue(v: number, format: Format): string {
  if (format === "millions") return `${(v / 1_000_000).toFixed(2)}M`;
  if (format === "thousands") return `${(v / 1_000).toFixed(1)}K`;
  return `${Math.round(v)}`;
}
