import type { Metadata } from "next";
import Link from "next/link";
import {
  DATA_TIERS,
  GOVERNANCE_PILLARS,
  COMPLIANCE_POSTURE,
} from "@/content/canonical-claims";
import { BRAND } from "@/content/brand";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/security-model/page.tsx — the security model overview.
 * Assembles from DATA_TIERS + GOVERNANCE_PILLARS + COMPLIANCE_POSTURE in
 * canonical-claims.ts. When any of those three change, this page follows.
 */

export const metadata: Metadata = {
  title: `Security model · ${BRAND.name} docs`,
  description:
    "Five data tiers, four governance pillars, six compliance frameworks. The mechanism, not the promise.",
};

export default function SecurityModelPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span> <span>Security model</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Foundations · 02</div>
        <h1 className="doc-title">Security model.</h1>
        <p className="doc-lede">
          Nebbos&rsquo;s security posture is a substrate, not a policy. Every
          claim on this page is enforced by code the auditor can walk end to
          end — not asserted in a paragraph.
        </p>
      </header>

      <section className="doc-section">
        <h2>Five data tiers</h2>
        <p>
          A classifier on the customer&rsquo;s host picks one of five tiers
          for every request, before anything crosses the wire. The tier
          decision runs on the customer&rsquo;s host, not on Nebbos servers.
        </p>
        {DATA_TIERS.map((t, i) => (
          <div key={t.label} className="doc-tier">
            <div className="doc-tier-h">
              <span className="doc-tier-n">Tier {String(i + 1).padStart(2, "0")}</span>
              <span className="doc-tier-t">{t.label}</span>
            </div>
            <div className="doc-tier-d">{t.desc}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>Four governance pillars</h2>
        <p>
          Nebbos proves itself through four mechanisms — every action attested
          at the tier it deserves, every trail hash-chained, every row isolated
          at the database, every export continuously exercised.
        </p>
        {GOVERNANCE_PILLARS.map((p, i) => (
          <div key={p.label} className="doc-pillar">
            <div className="doc-pillar-h">
              <span className="doc-pillar-n">Pillar {String(i + 1).padStart(2, "0")}</span>
              <span className="doc-pillar-t">{p.label}</span>
            </div>
            <div className="doc-pillar-d">{p.body}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>Compliance posture</h2>
        <p>
          Six frameworks. Each carries the honest status text — not
          aspirational marketing. When a certification lands, the change here
          propagates to every marketing surface that reads from the same
          substrate.
        </p>
        {COMPLIANCE_POSTURE.map((c) => (
          <div key={c.framework} className="doc-comp-row">
            <div className="doc-comp-fw">{c.framework}</div>
            <div className="doc-comp-st">{c.status}</div>
            <div className="doc-comp-note">{c.note}</div>
          </div>
        ))}
      </section>

      <footer className="doc-footer">
        <Link href="/docs/architecture">← Architecture</Link>
        <Link href="/docs/glossary">Glossary →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
