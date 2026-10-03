"use client";

import { memo, useRef } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * BackgroundBeams · adapted from 21st.dev "Background Beams" (manuarora700).
 *
 * Changes from the source component:
 *   - Deterministic seeded timings instead of Math.random() at render,
 *     so SSR and hydration produce identical markup.
 *   - Every other beam path (25 instead of 50) to halve paint cost.
 *   - Nebbos accent gradient instead of cyan/violet.
 *   - Gradients only animate while the hero is on screen and never under
 *     prefers-reduced-motion (static hairlines remain).
 */

const PATHS = Array.from({ length: 25 }, (_, i) => {
  const k = i * 2;
  const x = -380 + k * 7;
  const y = -189 - k * 8;
  return `M${x} ${y}C${x} ${y} ${x + 68} ${y + 405} ${x + 532} ${y + 532}C${x + 996} ${y + 659} ${x + 1064} ${y + 1064} ${x + 1064} ${y + 1064}`;
});

// Mulberry32 · tiny seeded PRNG for stable per-beam timing.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = seeded(1107);
const TIMING = PATHS.map(() => ({
  duration: 10 + rand() * 10,
  delay: rand() * 10,
  y2: 93 + rand() * 8,
}));

export const BackgroundBeams = memo(function BackgroundBeams({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const reduce = useReducedMotion();
  const live = inView && !reduce;

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d={PATHS.join("")} stroke="url(#nb-beam-base)" strokeOpacity="0.06" strokeWidth="0.5" />
        {PATHS.map((d, i) => (
          <path key={i} d={d} stroke={`url(#nb-beam-${i})`} strokeOpacity="0.55" strokeWidth="0.5" />
        ))}
        <defs>
          {PATHS.map((_, i) => (
            <m.linearGradient
              key={i}
              id={`nb-beam-${i}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={
                live
                  ? { x1: ["0%", "100%"], x2: ["0%", "95%"], y1: ["0%", "100%"], y2: ["0%", `${TIMING[i]!.y2}%`] }
                  : undefined
              }
              transition={{ duration: TIMING[i]!.duration, delay: TIMING[i]!.delay, ease: "easeInOut", repeat: Infinity }}
            >
              <stop stopColor="#ff6b1e" stopOpacity="0" />
              <stop stopColor="#ff6b1e" />
              <stop offset="32.5%" stopColor="#ffb27a" />
              <stop offset="100%" stopColor="#f4f2ee" stopOpacity="0" />
            </m.linearGradient>
          ))}
          <radialGradient
            id="nb-beam-base"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop offset="0.0667" stopColor="#f4f2ee" />
            <stop offset="0.2432" stopColor="#f4f2ee" />
            <stop offset="0.4359" stopColor="#f4f2ee" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});
