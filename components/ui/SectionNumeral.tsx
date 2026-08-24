/**
 * SectionNumeral · v3 · 2026-08-24 (Izanami reference)
 *
 * Was: mono-gold "01 · Where it starts" (numeric prefix + dot + label,
 * uppercase, tracked).
 * Now: lowercase single-word-style label ("philosophy", "projects").
 * The numeric prefix `n` is preserved in the API for backward compatibility
 * but not rendered — content sources may keep passing it, we just drop it
 * at render time.
 *
 * Consumers that want to display the numeral can pass a specific label
 * like "01 · philosophy" — the whole string renders as-is.
 *
 * Usage:
 *   <SectionNumeral n="01" label="Where it starts" />
 *   → renders: "where it starts" (lowercase, tracked-mono, muted color)
 */
type Props = {
  n?: string | number;
  label: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function SectionNumeral({ label, as: Tag = "div" }: Props) {
  return <Tag className="eyebrow">{label}</Tag>;
}
