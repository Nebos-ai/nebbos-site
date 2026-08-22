"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Delay in ms before reveal starts once the element enters viewport. */
  delay?: number;
  /** Amount of the element visible before revealing (0..1). Default 0.05. */
  threshold?: number;
  /** IntersectionObserver rootMargin. Default '0px 0px -10% 0px'. */
  rootMargin?: string;
  /**
   * Entrance variant.
   * - `fade-up` (default): opacity 0→1 + translateY(12px→0)
   * - `fade`: opacity only
   * - `fade-left`: opacity 0→1 + translateX(16px→0) (from the right)
   */
  variant?: "fade" | "fade-up" | "fade-left";
  /**
   * Whether the reveal fires exactly once (default `true`), or every time the
   * element re-enters the viewport (`false`).
   */
  once?: boolean;
  className?: string;
};

/**
 * Editorial scroll-reveal · doctrine v2 §4.
 *
 * Hand-rolled `IntersectionObserver` + CSS transitions. No motion library.
 * Reduced-motion: content ships in final state, observer never fires.
 *
 * Timings per doctrine v2 §4:
 * - duration: `--dur-slow` (275ms)
 * - easing: `--ease-settle` (Palantir expo-out)
 */
export function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.05,
  rootMargin = "0px 0px -10% 0px",
  variant = "fade-up",
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    let timer: number | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            timer = window.setTimeout(() => setVisible(true), delay);
            if (once) obs.disconnect();
            return;
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [delay, threshold, rootMargin, once, reduced]);

  const revealed = reduced || visible;
  const translate = {
    "fade-up": revealed ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
    "fade-left": revealed ? "translate3d(0, 0, 0)" : "translate3d(16px, 0, 0)",
    "fade": "none",
  }[variant];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: translate,
        transition: reduced
          ? "none"
          : "opacity var(--dur-slow, 275ms) var(--ease-settle, cubic-bezier(.19, 1, .22, 1)), transform var(--dur-slow, 275ms) var(--ease-settle, cubic-bezier(.19, 1, .22, 1))",
        willChange: revealed ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
