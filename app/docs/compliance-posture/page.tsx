import type { Metadata } from "next";
import Link from "next/link";
import { COMPLIANCE_POSTURE } from "@/content/canonical-claims";
import { BRAND } from "@/content/brand";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/compliance-posture/page.tsx — standalone doc page for the
 * six-row compliance table. Renders the same COMPLIANCE_POSTURE data as
 * the Institutional deck, /fact-sheet, and /docs/security-model, so any
 * status change propagates everywhere.
 */

export const metadata: Metadata = {
  title: `Compliance posture · ${BRAND.name} docs`,
  description:
    "SOC 2 · ISO 27001 · EU AI Act · HIPAA · FERPA · GDPR/CCPA. Framework, status, what it means for you.",
};

export default function CompliancePosturePage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span>{" "}
        <span>Compliance posture</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Compliance · 04</div>
        <h1 className="doc-title">Compliance posture.</h1>
        <p className="doc-lede">
          Six frameworks. Each carries the honest status text. If a
          certification lands, this page updates at the substrate — every
          deck, one-pager, and marketing surface that reads from it updates
          the same day.
        </p>
      </header>

      <section className="doc-section">
        <h2>Framework by framework</h2>
        {COMPLIANCE_POSTURE.map((c) => (
          <div key={c.framework} className="doc-comp-row">
            <div className="doc-comp-fw">{c.framework}</div>
            <div className="doc-comp-st">{c.status}</div>
            <div className="doc-comp-note">{c.note}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>How this page stays honest</h2>
        <p>
          Every row above renders from{" "}
          <code>content/canonical-claims.ts</code>&rsquo;s{" "}
          <code>COMPLIANCE_POSTURE</code> constant. The same constant powers
          the compliance slide on the Institutional deck, the compliance
          section on <Link href="/fact-sheet">the fact sheet</Link>, and the
          compliance-posture block on{" "}
          <Link href="/docs/security-model">the security model</Link>. When
          the underlying status text changes, every surface changes with it.
        </p>
        <p>
          Ask{" "}
          <a href="mailto:enterprise@nebbos.ai">enterprise@nebbos.ai</a> for
          the specific letter your compliance officer needs.
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/docs/glossary">← Glossary</Link>
        <Link href="/docs">All docs →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
