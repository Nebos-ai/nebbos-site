/**
 * SectionNumeral · v2 primitive
 *
 * The mono-gold "01 · Where it starts" label above every section title.
 * Used on home sections, product pages, and enterprise pages so the
 * numbered-chapter register is consistent site-wide.
 *
 * Usage:
 *   <SectionNumeral n="01" label="Where it starts" />
 *   <SectionNumeral n={2} label="The story" />
 */
type Props = {
  n: string | number;
  label: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function SectionNumeral({ n, label, as: Tag = "div" }: Props) {
  const num = typeof n === "number" ? String(n).padStart(2, "0") : n;
  return (
    <Tag
      className="eyebrow"
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 10,
      }}
    >
      <span style={{ fontWeight: 600 }}>{num}</span>
      <span aria-hidden style={{ color: "var(--ink-3)", opacity: 0.6 }}>·</span>
      <span>{label}</span>
    </Tag>
  );
}
