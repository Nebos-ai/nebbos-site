import type { ReactNode } from "react";

type DisplayProps = {
  children: ReactNode;
  as?: "h1" | "h2";
  /** xl = home hero (Bricolage 72-108px), lg = interior hero, md = section header. */
  size?: "xl" | "lg" | "md";
  maxCh?: number;
  className?: string;
};

/**
 * Display type primitive — Bricolage Grotesque (the @nebbos/brand display face).
 *
 * Dense-pro discipline meets marketing-scale display. Tight tracking, heavy
 * optical size, balanced text-wrap. Intentional `<br/>` in children is
 * preserved so headlines can be paced ("See Friday's problem\non Monday.").
 *
 * Never use `style={{ fontSize: ... }}` on an H1 in the rebuild. Always this.
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
      size: "clamp(46px, 7.2vw, 96px)",
      weight: 600,
      tracking: "-0.032em",
      leading: 0.98,
    },
    lg: {
      size: "clamp(36px, 5vw, 64px)",
      weight: 600,
      tracking: "-0.028em",
      leading: 1.02,
    },
    md: {
      size: "clamp(28px, 3.4vw, 44px)",
      weight: 600,
      tracking: "-0.022em",
      leading: 1.08,
    },
  }[size];

  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-display), var(--font-sans)",
        fontSize: scale.size,
        lineHeight: scale.leading,
        letterSpacing: scale.tracking,
        fontWeight: scale.weight,
        fontOpticalSizing: "auto",
        color: "var(--text)",
        margin: 0,
        maxWidth: `${maxCh}ch`,
        textWrap: "balance",
      }}
    >
      {children}
    </Tag>
  );
}
