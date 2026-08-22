import type { ReactNode } from "react";

type StatBlockProps = {
  /** The big figure. Kept short — up to 6 characters ideal ($150, 132, 24 hr, etc). */
  value: ReactNode;
  /** Small-caps mono label above/beside the figure, naming the metric. */
  label: ReactNode;
  /** Optional one-line supporting detail below the figure. */
  detail?: ReactNode;
  /** Optional accent color for the figure. Defaults to `--paper`. */
  tone?: "default" | "accent" | "success" | "muted";
};

/**
 * Palantir-style large-figure display. Used in three shapes on the rebuild:
 * (1) evidence panels next to a FeatureRow ("132 API routes shipped"),
 * (2) three-across metric strip on the home hero band,
 * (3) inline callout inside pricing / trust pages.
 *
 * Kept dead-simple typographically — no sparklines, no chart, no icons.
 * The number carries the weight.
 */
export function StatBlock({ value, label, detail, tone = "default" }: StatBlockProps) {
  const color = {
    default: "var(--paper)",
    accent: "var(--blue)",
    success: "var(--ok, #7bc99a)",
    muted: "var(--mist)",
  }[tone];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p
        className="eyebrow"
        style={{ margin: 0, color: "var(--mist)" }}
      >
        {label}
      </p>
      <div
        style={{
          fontFamily: "var(--font-dm-sans), var(--font-sans)",
          fontSize: "clamp(38px, 4.6vw, 64px)",
          lineHeight: 1,
          letterSpacing: "-0.025em",
          fontWeight: 500,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      {detail ? (
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.45,
            color: "var(--mist)",
            maxWidth: "34ch",
          }}
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}
