import type { ReactNode } from "react";

type DisplayProps = {
  children: ReactNode;
  as?: "h1" | "h2";
  size?: "xl" | "lg" | "md";
  maxCh?: number;
  className?: string;
};

/**
 * Display type primitive — Delta brief editorial serif face.
 *
 * `var(--font-serif)` cascades: Newsreader (self-hosted via next/font)
 * → Trust 3A (Adobe Typekit, external, degrades gracefully) → Charter
 * → Georgia. Tight tracking, balanced text-wrap, italic-friendly via
 * `<em>` inside children.
 */
export function Display({
  children,
  as: Tag = "h1",
  size = "xl",
  maxCh = 18,
  className = "",
}: DisplayProps) {
  const scale = {
    xl: {
      size: "clamp(46px, 6.8vw, 92px)",
      weight: 500,
      tracking: "-0.028em",
      leading: 1.02,
    },
    lg: {
      size: "clamp(36px, 4.6vw, 60px)",
      weight: 500,
      tracking: "-0.024em",
      leading: 1.06,
    },
    md: {
      size: "clamp(28px, 3.2vw, 42px)",
      weight: 500,
      tracking: "-0.02em",
      leading: 1.1,
    },
  }[size];

  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: scale.size,
        lineHeight: scale.leading,
        letterSpacing: scale.tracking,
        fontWeight: scale.weight,
        fontOpticalSizing: "auto",
        color: "var(--ink)",
        margin: 0,
        maxWidth: `${maxCh}ch`,
        textWrap: "balance",
        fontFeatureSettings: "'ss01', 'cv11'",
      }}
    >
      {children}
    </Tag>
  );
}
