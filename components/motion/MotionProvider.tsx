"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * MotionProvider · one Motion root for the whole site.
 *
 * - LazyMotion + `strict`: every animated element uses `m.*`, and the
 *   feature bundle loads after first paint.
 * - reducedMotion="user": transforms and layout animations collapse to
 *   instant when the visitor prefers reduced motion; opacity still fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.9 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
