import type { ReactNode } from "react";

type StatBlockProps = {
  value: ReactNode;
  label: ReactNode;
  detail?: ReactNode;
  tone?: "ink" | "accent" | "success" | "muted";
};

/**
 * Big-figure display — Delta brief editorial. Serif numerals, tabular,
 * paired with a mono eyebrow label above and optional muted detail below.
 */
export function StatBlock({ value, label, detail, tone = "ink" }: StatBlockProps) {
  const color = {
    ink: "var(--ink)",
    accent: "var(--accent)",
    success: "var(--success)",
    muted: "var(--ink-3)",
  }[tone];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p className="eyebrow" style={{ margin: 0 }}>
        {label}
      </p>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(40px, 5vw, 72px)",
          lineHeight: 1,
          letterSpacing: "-0.028em",
          fontWeight: 500,
          color,
          fontVariantNumeric: "tabular-nums",
          fontOpticalSizing: "auto",
        }}
      >
        {value}
      </div>
      {detail ? (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--ink-3)",
            maxWidth: "36ch",
          }}
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}
