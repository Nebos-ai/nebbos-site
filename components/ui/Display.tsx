import type { ReactNode } from "react";

type DisplayProps = {
  children: ReactNode;
  /** Semantic level. Marketing surfaces almost always want h1 (one per page). */
  as?: "h1" | "h2";
  /**
   * Type scale. `xl` = home hero, `lg` = interior page hero, `md` = major
   * section header. Palantir/Apple treat display type as its own component —
   * inline `<h1 style={{fontSize: 56}}>` is banned.
   */
  size?: "xl" | "lg" | "md";
  /** Max column width in `ch`. Keeps line-length humane. Default 18ch. */
  maxCh?: number;
  /** Optional className for margin overrides in odd layout cases. */
  className?: string;
};

/**
 * Display type primitive. Intentional line-breaks in `children` (via `<br/>`)
 * are preserved so headlines can be paced ("Design worth the wait.\nSpeed
 * you can feel."). Font-family is the site's DM Sans — sits on Palantir's
 * "restrained sans" line, not decorative serif.
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
    xl: { min: 44, ideal: "6vw", max: 84, weight: 500, tracking: "-0.028em", leading: 1.02 },
    lg: { min: 36, ideal: "4.6vw", max: 60, weight: 500, tracking: "-0.022em", leading: 1.06 },
    md: { min: 28, ideal: "3.4vw", max: 44, weight: 500, tracking: "-0.018em", leading: 1.1 },
  }[size];

  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-dm-sans), var(--font-sans)",
        fontSize: `clamp(${scale.min}px, ${scale.ideal}, ${scale.max}px)`,
        lineHeight: scale.leading,
        letterSpacing: scale.tracking,
        fontWeight: scale.weight,
        color: "var(--paper)",
        margin: 0,
        maxWidth: `${maxCh}ch`,
        textWrap: "balance",
      }}
    >
      {children}
    </Tag>
  );
}
