import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** Visual tone. `accent` = Blue Aura, `faint` = --mist, default = --paper. */
  tone?: "default" | "accent" | "faint";
  /** Optional micro-icon or dot before the label (component or string). */
  lead?: ReactNode;
};

/**
 * Small-caps mono label used above every display heading. Canonical form —
 * replaces the inline `<p class="eyebrow">` that was hand-rolled across 40
 * pages. Palantir uses this to name the section register before the reader
 * hits the display line.
 */
export function Eyebrow({ children, tone = "default", lead }: EyebrowProps) {
  const color =
    tone === "accent" ? "var(--blue)" : tone === "faint" ? "var(--mist)" : "var(--paper)";
  return (
    <p
      className="eyebrow"
      style={{
        color,
        display: lead ? "inline-flex" : undefined,
        alignItems: lead ? "center" : undefined,
        gap: lead ? "8px" : undefined,
        margin: 0,
      }}
    >
      {lead ? <span aria-hidden>{lead}</span> : null}
      {children}
    </p>
  );
}
