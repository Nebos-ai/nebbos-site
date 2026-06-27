import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

type StubSection = { heading: string; body: ReactNode };

type StubPageProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  sections?: StubSection[];
  /** Marks this page as intentionally a stub awaiting full content. */
  stub?: boolean;
  cta?: { label: string; href: string };
};

/**
 * Shared interior-page shell. Used for the many IA routes that ship as stubs in
 * this pass (real headings + metadata + at least one content block), so the
 * full IA exists and is navigable while the founder Figma + copy land.
 */
export function StubPage({
  eyebrow,
  title,
  lead,
  sections = [],
  stub = true,
  cta = { label: "Book a demo →", href: "/demo" },
}: StubPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />
      {sections.map((s) => (
        <Section key={s.heading} divider>
          <h2 style={{ fontSize: "clamp(24px,3.2vw,40px)", maxWidth: "20ch" }}>{s.heading}</h2>
          <div className="mist" style={{ marginTop: 20, fontSize: 18, maxWidth: "62ch" }}>
            {s.body}
          </div>
        </Section>
      ))}
      <Section divider>
        {stub ? (
          <p className="mono faint" style={{ fontSize: 12, marginBottom: 28 }}>
            Placeholder — full content and visuals land with the founder Figma (ADR-278). Copy here
            is a scaffold, not final.
          </p>
        ) : null}
        <ButtonLink href={cta.href} variant="primary">
          {cta.label}
        </ButtonLink>
      </Section>
    </>
  );
}
