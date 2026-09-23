"use client";

import { m, type Variants } from "motion/react";

/**
 * RevealWords · headline words rise out of a per-word mask as the heading
 * enters the viewport. Words stay fully opaque (axe-safe); the mask does
 * the hiding. Whitespace is kept as real text nodes, so textContent is
 * identical to the plain string.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const word: Variants = {
  hidden: { y: "105%", filter: "blur(6px)" },
  show: { y: "0%", filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

export function RevealWords({ children, step = 0.055 }: { children: string; step?: number }) {
  const chunks = children.split(/(\s+)/);
  return (
    <m.span
      className="inline"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {chunks.map((chunk, i) =>
        /^\s+$/.test(chunk) ? (
          chunk
        ) : (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <m.span data-reveal className="inline-block will-change-transform" variants={word}>
              {chunk}
            </m.span>
          </span>
        ),
      )}
    </m.span>
  );
}
