import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_SURFACES } from "@/content/canonical-claims";
import { BRAND } from "@/content/brand";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/architecture/page.tsx — the architecture overview.
 * Assembles from canonical-claims.ts PRODUCT_SURFACES + brand.ts.
 * When the four-surface framing changes upstream, this page follows.
 */

export const metadata: Metadata = {
  title: `Architecture overview · ${BRAND.name} docs`,
  description:
    "Four surfaces, one substrate. Platform · App · MCP · Cradle — what each is, what it consumes, what it produces.",
};

export default function ArchitecturePage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span> <span>Architecture overview</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Foundations · 01</div>
        <h1 className="doc-title">Architecture overview.</h1>
        <p className="doc-lede">
          Four surfaces. One substrate. Each piece is boring on its own —
          together they are the smallest thing you can ship to a regulator
          and still call intelligence.
        </p>
      </header>

      <section className="doc-section">
        <h2>The four surfaces</h2>
        <p>
          A Nebbos deployment is composed of four surfaces. Each has a
          distinct role in the operator&rsquo;s day. Every capability the
          platform exposes is a specific interaction between two or more of
          these.
        </p>
        <div className="doc-surfaces">
          {PRODUCT_SURFACES.map((s) => (
            <div key={s.name} className="doc-surface">
              <div className="doc-surface-label">{s.name}</div>
              <div className="doc-surface-line">{s.oneLiner}</div>
              <div className="doc-surface-body">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section">
        <h2>The substrate — one story across four surfaces</h2>
        <p>
          Every request from a Platform dashboard, every action taken by an
          App running on an operator&rsquo;s laptop, every read the MCP
          mediates, and every elevated write the Cradle unlocks — all land
          in the same audit chain, all pass the same policy classifier, all
          respect the same row-level isolation at the database. A bug in
          any single surface cannot cross a client boundary, because the
          isolation lives underneath every surface, not inside one.
        </p>
        <p>
          The two documents to read next are{" "}
          <Link href="/docs/security-model">Security model</Link> (how each
          policy is enforced) and{" "}
          <Link href="/docs/glossary">Glossary</Link> (Cradle vs Pearl vs
          MCP — every term used across these docs, defined once).
        </p>
      </section>

      <section className="doc-section">
        <h2>Reading path</h2>
        <ol className="doc-ol">
          <li>
            <Link href="/docs/architecture">Architecture overview</Link>{" "}
            <em>(you are here)</em>
          </li>
          <li>
            <Link href="/docs/security-model">Security model</Link> — the
            five data tiers, four governance pillars, six compliance rows
          </li>
          <li>
            <Link href="/docs/glossary">Glossary</Link> — every term used in
            these docs, defined once
          </li>
          <li>
            <Link href="/docs/compliance-posture">Compliance posture</Link>{" "}
            — where each framework stands today, in plain English
          </li>
        </ol>
      </section>

      <footer className="doc-footer">
        <Link href="/docs">← All docs</Link>
        <Link href="/docs/security-model">Security model →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
