import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  tone?: "default" | "ink" | "muted";
};

/**
 * Signature eyebrow — mono, uppercase, 0.18em tracked, Nebbos orange.
 * Sits above every display heading + section title. Delta brief pattern.
 */
export function Eyebrow({ children, tone = "default" }: EyebrowProps) {
  const color =
    tone === "ink" ? "var(--ink)" : tone === "muted" ? "var(--ink-3)" : "var(--gold)";
  return (
    <p className="eyebrow" style={{ color, margin: 0 }}>
      {children}
    </p>
  );
}
