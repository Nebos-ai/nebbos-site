import type { ReactNode } from "react";

type DeckProps = {
  children: ReactNode;
  size?: "lead" | "sub";
  maxCh?: number;
};

/**
 * Deck — the single supporting line under a Display heading.
 * Body face (Inter), muted color, restrained scale. Apple pattern.
 */
export function Deck({ children, size = "lead", maxCh }: DeckProps) {
  const scale =
    size === "lead"
      ? {
          fontSize: "clamp(17px, 1.5vw, 21px)",
          lineHeight: 1.5,
          weight: 400,
          tracking: "-0.008em",
        }
      : {
          fontSize: "clamp(14px, 1.1vw, 16px)",
          lineHeight: 1.55,
          weight: 400,
          tracking: "-0.004em",
        };
  const width = maxCh ?? (size === "lead" ? 44 : 56);
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: scale.fontSize,
        lineHeight: scale.lineHeight,
        letterSpacing: scale.tracking,
        color: "var(--muted-text)",
        fontWeight: scale.weight,
        margin: 0,
        maxWidth: `${width}ch`,
        textWrap: "pretty",
      }}
    >
      {children}
    </p>
  );
}
