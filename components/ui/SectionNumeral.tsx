import { PlusMark } from "@/components/ui/PlusMark";

/**
 * SectionNumeral · Wave 2C moncalisse amendment, extracted for reuse in W3c.
 *
 * The numbered section eyebrow — "+ 01 · WHAT IT DOES" — used at the top of
 * every editorial section on the site. Pairs a `.section-numeral` mono strip
 * with the inline `<PlusMark>` glyph and a tabular numeral.
 *
 *   <SectionNumeral n="01" label="The architecture" />
 */
export function SectionNumeral({ n, label }: { n: string; label: string }) {
  return (
    <span className="section-numeral">
      <PlusMark size="sm" color="currentColor" />
      <span className="n">{n}</span>
      <span aria-hidden>·</span>
      {label}
    </span>
  );
}
