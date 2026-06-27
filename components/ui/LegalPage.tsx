import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";

type LegalPageProps = {
  title: string;
  lead: ReactNode;
  children: ReactNode;
};

/** Shared shell for legal documents — editorial prose column. */
export function LegalPage({ title, lead, children }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={lead} />
      <Section>
        <div className="prose">
          <p className="mono faint" style={{ fontSize: 12 }}>Last updated: [DATE]</p>
          {children}
        </div>
      </Section>
    </>
  );
}
