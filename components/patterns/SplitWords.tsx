import type { CSSProperties } from "react";

/**
 * SplitWords · patterns/SplitWords.tsx · v1 · 2026-09-18
 *
 * Wraps a text string in per-word <span data-word>. Each word gets a
 * staggered animation-delay via inline CSS custom property so the
 * scroll-linked word reveal in marketing-register.css cascades
 * cleanly across the phrase — one word at a time as the H2 enters
 * the viewport.
 *
 * Server-safe (no client hook, no state). Whitespace preserved as
 * text nodes between spans.
 */

export function SplitWords({
  children,
  step = 0.04,
}: {
  children: string;
  step?: number;
}) {
  const words = children.split(/(\s+)/);
  return (
    <>
      {words.map((chunk, i) => {
        if (/^\s+$/.test(chunk)) return chunk;
        const style: CSSProperties = { animationDelay: `${i * step}s` };
        return (
          <span key={i} data-word style={style}>
            {chunk}
          </span>
        );
      })}
    </>
  );
}
