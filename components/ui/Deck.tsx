import type { ReactNode } from "react";

type DeckProps = {
  children: ReactNode;
  /** Deck weight. `lead` = under-hero, larger; `sub` = section-header supporting line, smaller. */
  size?: "lead" | "sub";
  /** Max column width in `ch`. Default 44ch for `lead`, 56ch for `sub`. */
  maxCh?: number;
};

/**
 * The single supporting line under a Display heading. Apple's pattern:
 * headline (short, punchy) → deck (one line of evidence, ≤ 12 words is best).
 * Distinct from `<p class="lead">` in scale + tracking + intended pairing.
 * Never use for paragraph-length prose; that's `<Prose>` (coming later).
 */
export function Deck({ children, size = "lead", maxCh }: DeckProps) {
  const scale =
    size === "lead"
      ? { fontSize: "clamp(18px, 1.7vw, 22px)", lineHeight: 1.45, color: "var(--mist)", weight: 400 }
      : { fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.5, color: "var(--mist)", weight: 400 };
  const width = maxCh ?? (size === "lead" ? 44 : 56);
  return (
    <p
      style={{
        fontFamily: "var(--font-dm-sans), var(--font-sans)",
        fontSize: scale.fontSize,
        lineHeight: scale.lineHeight,
        color: scale.color,
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
