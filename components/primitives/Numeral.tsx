import type { ReactNode } from "react";

/**
 * <Numeral> · Design substrate v3 · primitive
 *
 * Tabular-numeric numeral used in section eyebrows ("01 · Products"),
 * stat blocks, and any place a running counter appears. Always mono,
 * always tabular-nums so digits align vertically. Optional PlusMark
 * signature-device prefix per Moncalisse doctrine.
 *
 * Consumes only tokens via .numeral class. Zero inline styling.
 *
 * Usage:
 *   <Numeral>01</Numeral>
 *   <Numeral withPlusMark>02</Numeral>            // orange + plus glyph prefix
 *   <Numeral size="lg">128</Numeral>              // stat-block scale
 */

export type NumeralSize = "sm" | "md" | "lg";

export type NumeralProps = {
  children: ReactNode;
  size?: NumeralSize;
  /** Prepend the Nebbos plus-marker signature device before the numeral. */
  withPlusMark?: boolean;
};

export function Numeral({ children, size = "md", withPlusMark = false }: NumeralProps) {
  const classes = ["numeral", `numeral--${size}`].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      {withPlusMark && <span aria-hidden className="numeral__plus-marker" />}
      <span className="numeral__digits">{children}</span>
    </span>
  );
}
