/**
 * Balanced grid spans · no orphan cards.
 *
 * Splits `n` items into the fewest rows of at most `max` items, with row
 * sizes differing by at most one (larger rows first), and returns the
 * 12-column span for each item so every row fills the full width.
 *   5 @ max 3 → 3 + 2        7 @ max 3 → 3 + 2 + 2
 *   4 @ max 3 → 2 + 2        4 @ max 4 → 4
 * Pair with a `grid-cols-12` container at the same breakpoint.
 *
 * Class strings are spelled out in full so Tailwind can see them.
 */

const SPAN_SM: Record<number, string> = { 12: "sm:col-span-12", 6: "sm:col-span-6", 4: "sm:col-span-4", 3: "sm:col-span-3" };
const SPAN_MD: Record<number, string> = { 12: "md:col-span-12", 6: "md:col-span-6", 4: "md:col-span-4", 3: "md:col-span-3" };
const SPAN_LG: Record<number, string> = { 12: "lg:col-span-12", 6: "lg:col-span-6", 4: "lg:col-span-4", 3: "lg:col-span-3" };

function rowSpans(n: number, max: number): number[] {
  if (n <= 0) return [];
  const rows = Math.ceil(n / max);
  const base = Math.floor(n / rows);
  const extra = n % rows;
  const spans: number[] = [];
  for (let r = 0; r < rows; r++) {
    const size = base + (r < extra ? 1 : 0);
    for (let k = 0; k < size; k++) spans.push(12 / size);
  }
  return spans;
}

/** Per-item span classes: 1 column on mobile, balanced at sm/md and lg. */
export function balancedSpans(
  n: number,
  { lg = 3, sm = 2, mid = "sm" }: { lg?: 1 | 2 | 3 | 4; sm?: 1 | 2 | 3; mid?: "sm" | "md" } = {},
): string[] {
  const small = rowSpans(n, sm);
  const large = rowSpans(n, lg);
  const MID = mid === "sm" ? SPAN_SM : SPAN_MD;
  return Array.from({ length: n }, (_, i) => `col-span-12 ${MID[small[i]!]} ${SPAN_LG[large[i]!]}`);
}
