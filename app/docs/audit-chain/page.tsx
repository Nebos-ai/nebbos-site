import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { GOVERNANCE_PILLARS } from "@/content/canonical-claims";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/audit-chain/page.tsx — the hash-chained audit log.
 *
 * Assembles from GOVERNANCE_PILLARS[1] (the audit pillar) so the
 * substrate doctrine and the docs page never drift. The MCP-side
 * verification tool referenced here is audit_event_hash_chain_verify,
 * which is one of the three audit tools in the /docs/mcp categories.
 */

export const metadata: Metadata = {
  title: `The audit chain · ${BRAND.name} docs`,
  description:
    "Hash-chained, append-only. Every read, every write, every tier decision. How the log verifies end to end.",
};

const AUDIT_PILLAR = GOVERNANCE_PILLARS[1];

interface Row {
  field: string;
  desc: string;
}

const ENTRY_SHAPE: Row[] = [
  {
    field: "event_id",
    desc: "Monotonic, per-deployment identifier. The chain link at this position.",
  },
  {
    field: "prev_hash",
    desc: "Hash of the previous entry. Break this hash and every subsequent entry is orphaned — an inspector notices immediately.",
  },
  {
    field: "operator_id",
    desc: "The identity that made the call, resolved through the workspace identity plane. Never nullable; anonymous calls do not exist.",
  },
  {
    field: "delegator_id",
    desc: "For any tier above Guest, the human on whose authority the operation was made. Bound to the delegation token that authorized the call.",
  },
  {
    field: "tier",
    desc: "Guest · Host · Architect. Recorded regardless of whether the call succeeded — a refused escalation attempt lands here too.",
  },
  {
    field: "tool",
    desc: "The MCP tool name or the REST endpoint path. What the substrate was asked to do.",
  },
  {
    field: "input_hash",
    desc: "SHA-256 over the canonicalized input payload. Lets an auditor prove what was asked without the substrate needing to hold the payload plain.",
  },
  {
    field: "output_hash",
    desc: "SHA-256 over the canonicalized response payload. Same principle on the reply side.",
  },
  {
    field: "outcome",
    desc: "allowed · refused · error. A refusal is not an absence — it's a distinct outcome carried in the chain.",
  },
  {
    field: "policy_id",
    desc: "The policy the substrate consulted. For a refusal, the specific rule that stopped the call.",
  },
  {
    field: "ts",
    desc: "Nanosecond timestamp from the substrate clock, never the caller's clock.",
  },
  {
    field: "next_hash",
    desc: "Hash of this entry, which becomes the prev_hash of the next entry. The chain is forward-linked and append-only.",
  },
];

export default function AuditChainPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span>{" "}
        <span>The audit chain</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Operations · 01</div>
        <h1 className="doc-title">The audit chain.</h1>
        <p className="doc-lede">{AUDIT_PILLAR.body}</p>
      </header>

      <section className="doc-section">
        <h2>What lands in the log</h2>
        <p>
          Every request. Every response. Every refusal. Every tier decision.
          Every authentication ceremony. Every policy consultation. There is
          no shape of interaction with the substrate that omits the chain
          write &mdash; that shape does not exist in the platform.
        </p>
        <p>
          The chain is append-only by construction: there is no update path,
          no delete path, no re-signing path. If a row needs to be
          contextualised, a subsequent row references it. The record of what
          the substrate was asked to do is the record.
        </p>
      </section>

      <section className="doc-section">
        <h2>The entry shape</h2>
        <p>
          Every chain entry carries the following fields. The fields you
          typically care about &mdash; who did what, when, and whether it was
          allowed &mdash; are always non-null; the hash and policy fields
          exist so the log verifies without leaving the log.
        </p>
        {ENTRY_SHAPE.map((r) => (
          <div key={r.field} className="doc-term">
            <div className="doc-term-t">
              <code>{r.field}</code>
            </div>
            <div className="doc-term-d">{r.desc}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>How you verify</h2>
        <p>
          The MCP surface exposes three audit tools:{" "}
          <code>audit_event_list</code> (paged read),{" "}
          <code>audit_event_get</code> (single entry with hash context), and{" "}
          <code>audit_event_hash_chain_verify</code> (walks a segment of the
          chain and returns a signed receipt confirming every prev_hash /
          next_hash bond).
        </p>
        <p>
          For a compliance officer walking the chain end to end, the
          verification call returns the receipt directly &mdash; the officer
          does not need to hold the entire log locally, and does not need to
          trust the API. The receipt is the substrate saying &quot;we walked
          it; here is the signature.&quot; See{" "}
          <Link href="/docs/mcp">the MCP reference</Link> for tier gates on
          each of the three tools.
        </p>
      </section>

      <section className="doc-section">
        <h2>What you cannot do to the chain</h2>
        <p>
          You cannot delete a row. You cannot rewrite a row. You cannot
          resign a row. You cannot make the substrate skip writing a row.
          Every one of those actions is not just refused &mdash; it is
          architecturally absent. There is no endpoint, no admin panel, no
          engineering back-channel that offers them.
        </p>
        <p>
          The audit chain is what makes the Nebbos platform legible to a
          regulator without renegotiation. See{" "}
          <Link href="/docs/portability">Portability &amp; export</Link> for
          how the chain leaves with an operator&rsquo;s data if they choose
          to move.
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/docs/mcp">← MCP reference</Link>
        <Link href="/docs/row-level-isolation">Row-level isolation →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
