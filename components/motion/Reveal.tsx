"use client";

import type { ReactNode } from "react";
import { m, type Variants } from "motion/react";

/**
 * Reveal / Stagger · scroll-entry choreography.
 *
 * Axe-safety doctrine (carried over from the CSS register): text never
 * animates opacity, so an axe scan mid-animation never measures a
 * half-transparent foreground. Entry is translate + blur only; the
 * element is fully opaque from the first frame.
 *
 * Reduced motion: `[data-reveal]` is pinned to its resting pose in
 * app/tailwind.css (works before hydration, beats Motion's inline styles).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Enter = { delay?: number; x?: number; y?: number };

const rise: Variants = {
  hidden: ({ x = 0, y = 28 }: Enter = {}) => ({ x, y, filter: "blur(10px)" }),
  show: ({ delay = 0 }: Enter = {}) => ({
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

type Tag = "div" | "li" | "ul" | "ol" | "article" | "header" | "p" | "section";

export function Reveal({
  children,
  as = "div",
  delay = 0,
  x,
  y,
  className,
  amount = 0.25,
}: {
  children: ReactNode;
  as?: Tag;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  const Comp = m[as];
  return (
    <Comp
      data-reveal
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      custom={{ delay, x, y } satisfies Enter}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  as = "div",
  className,
  step = 0.08,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  step?: number;
  delay?: number;
  amount?: number;
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const Comp = m[as];
  return (
    <Comp data-reveal className={className} variants={rise}>
      {children}
    </Comp>
  );
}
