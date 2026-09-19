import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { GOVERNANCE_PILLARS } from "@/content/canonical-claims";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/row-level-isolation/page.tsx — the RLS doctrine.
 *
 * Assembles from GOVERNANCE_PILLARS[2]. This page names the "isolation
 * lives in the substrate the code cannot bypass" claim and describes
 * how it's enforced — at the database, before the answer is composed.
 */

export const metadata: Metadata = {
  title: `Row-level isolation · ${BRAND.name} docs`,
  description:
    "Enforced by the database, not the application. A bug in the UI cannot leak a row. The query is refused before an answer is composed.",
};

const ISOLATION_PILLAR = GOVERNANCE_PILLARS[2];

export default function RowLevelIsolationPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span>{" "}
        <span>Row-level isolation</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Operations · 02</div>
        <h1 className="doc-title">Row-level isolation.</h1>
        <p className="doc-lede">{ISOLATION_PILLAR.body}</p>
      </header>

      <section className="doc-section">
        <h2>The claim, precisely</h2>
        <p>
          Every operator-scoped row in every table carries an owning-scope
          column, and every query against those tables is rewritten by the
          substrate to include a predicate against that column. The rewrite
          happens under the query planner &mdash; not in application code,
          not in a middleware, not in a review checklist. Application code
          that forgets to filter cannot compose an answer that reveals a row
          the caller doesn&rsquo;t own; the database refuses first.
        </p>
        <p>
          A caller who provides no identity gets no rows. A caller who
          provides an identity gets exactly the rows that identity owns.
          There is no other outcome.
        </p>
      </section>

      <section className="doc-section">
        <h2>Why this matters more than an application check</h2>
        <p>
          Application-layer isolation is a check the code has to remember to
          make. Every new endpoint, every new report, every new admin panel,
          every ad-hoc query &mdash; each is one more place the check can be
          forgotten. Every audit of a system built that way is a walk through
          every place the check could be missing.
        </p>
        <p>
          Database-layer isolation moves the check underneath every code
          path. New endpoint, new report, new admin panel &mdash; the
          isolation is already there. The audit walks one enforcement point,
          not every code path.
        </p>
      </section>

      <section className="doc-section">
        <h2>What the mechanism looks like</h2>
        <p>
          Every substrate table carries an{" "}
          <code>operator_scope</code> column. Every operator identity carries
          a resolved list of scopes it may see. The database rewrites every
          <code> SELECT</code>, <code>UPDATE</code>, <code>DELETE</code>, and
          <code> INSERT</code> to include a predicate matching one of those
          scopes &mdash; and the rewrite is done in the database, using its
          native row-security machinery, not in a Python or Node middleware.
        </p>
        <p>
          When the substrate needs to expose data across scopes &mdash; for
          example, for a platform-wide admin operation &mdash; the caller
          must present an Architect-tier identity, and the substrate lifts
          the predicate one operation at a time. It does not disable the
          predicate for the session, and it does not offer an
          &quot;impersonate&quot; primitive.
        </p>
      </section>

      <section className="doc-section">
        <h2>What you can and cannot do</h2>
        <p>
          You <em>can</em> hold an identity that spans several operator
          scopes &mdash; a consultant identity, a support-engineer identity,
          a compliance-officer identity. The substrate resolves the scope
          list at auth time and enforces predicates against that list.
        </p>
        <p>
          You <em>cannot</em> escape a scope. You cannot pass a query hint
          that disables the predicate. You cannot access a scope through a
          view that omits the column. You cannot construct a join that reads
          a row the substrate would refuse on a plain <code>SELECT</code>.
          The predicate travels with the row.
        </p>
      </section>

      <section className="doc-section">
        <h2>Every enforcement lands in the audit chain</h2>
        <p>
          A refused query is not a silent failure. The refusal writes one row
          in the <Link href="/docs/audit-chain">audit chain</Link>: operator,
          tool, input hash, refusing policy, timestamp. An operator that
          repeatedly hits refusals is legible to their compliance officer
          &mdash; the substrate does not hide the attempts.
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/docs/audit-chain">← The audit chain</Link>
        <Link href="/docs/portability">Portability &amp; export →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
