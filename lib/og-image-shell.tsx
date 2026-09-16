import { BRAND } from "@/content/brand";

/**
 * lib/og-image-shell.tsx · Shared JSX shell for per-page opengraph-image.
 *
 * Used by every route-level opengraph-image.tsx under app/ to render a
 * 1200x630 branded social-share card with per-page eyebrow/headline/subline
 * text while keeping the Institutional Reserve chrome consistent across
 * routes. (Note: glob patterns intentionally avoided in this docstring —
 * a double-star inside a JSDoc block terminates the comment early.)
 *
 * Design invariants (locked):
 *   - Paper ground (#FFFFFF) + top/bottom hairlines (#E8E6E2)
 *   - Flower-of-life mark inline SVG (7-circle rosette matching @nebbos/brand)
 *   - Ink header + gold italic accent + ink body + mono footer
 *   - Orange plus-marker (#F6A03F) in bottom-right corner
 *
 * Consumers pass eyebrow (top-left uppercase mono), headline (large serif
 * with optional italic accent), subline (body text under headline), and
 * an optional accent color override (defaults to gold).
 */

const PAPER = "#FFFFFF";
const INK = "#1D1C22";
const GOLD = "#9A5D2A";
const INK_2 = "#4A4952";
const RULE = "#E8E6E2";
const ORANGE = "#F6A03F";

export type OGShellProps = {
  eyebrow: string;
  headline: React.ReactNode;
  subline: string;
  accentColor?: string;
};

export function OGImageShell({ eyebrow, headline, subline, accentColor }: OGShellProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: PAPER,
        padding: "80px 96px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* Top + bottom hairlines */}
      <div style={{ position: "absolute", top: 48, left: 96, right: 96, height: 1, background: RULE }} />
      <div style={{ position: "absolute", bottom: 48, left: 96, right: 96, height: 1, background: RULE }} />

      {/* Header: mark + BRAND name + eyebrow */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
          <g stroke={INK} strokeWidth="1.6" fill="none">
            <circle cx="20" cy="20" r="7" />
            <circle cx="20" cy="13" r="7" />
            <circle cx="26" cy="16.5" r="7" />
            <circle cx="26" cy="23.5" r="7" />
            <circle cx="20" cy="27" r="7" />
            <circle cx="14" cy="23.5" r="7" />
            <circle cx="14" cy="16.5" r="7" />
          </g>
        </svg>
        <div style={{ fontSize: 32, fontWeight: 500, color: INK, letterSpacing: "-0.01em" }}>
          {BRAND.name}
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontSize: 14,
            color: INK_2,
            fontFamily: "monospace",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      {/* Main headline + subline (stacked at bottom of card) */}
      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 500,
            color: INK,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            maxWidth: 900,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: 24,
            color: INK_2,
            lineHeight: 1.4,
            marginTop: 32,
            maxWidth: 800,
          }}
        >
          {subline}
        </div>
      </div>

      {/* Bottom bar: domain + plus-marker in accent-color */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: 32,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: INK_2,
            fontFamily: "monospace",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          nebbos.ai
        </div>
        <div style={{ fontSize: 40, color: accentColor ?? ORANGE, fontWeight: 300, lineHeight: 1 }}>
          +
        </div>
      </div>

      {/* Semantic italic-accent helper — used by consumers via <Italic> */}
    </div>
  );
}

/** Reusable italic gold accent wrapper for keywords in headlines. */
export function Accent({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontStyle: "italic", color: color ?? GOLD, fontWeight: 400 }}>{children}</span>
  );
}
