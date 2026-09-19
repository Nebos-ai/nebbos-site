import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/quickstart/page.tsx — the developer quickstart.
 *
 * Ten-minute path: identity → Cradle → discovery → first authenticated
 * call → verify in the audit chain. Every step maps to a concrete
 * technical artefact; nothing here is aspirational.
 */

export const metadata: Metadata = {
  title: `Quickstart · ${BRAND.name} docs`,
  description:
    "From zero to your first authenticated call in ten minutes. Identity, Cradle, MCP discovery, first call, audit receipt.",
};

interface Step {
  n: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    title: "Get an operator identity.",
    body: "Every call opens with a Bearer token issued to a specific operator. Ask your Nebbos admin for a developer identity scoped to a sandbox deployment — the identity carries the operator's tier (Guest / Host / Architect) and the departments they can see.",
  },
  {
    n: "02",
    title: "Enroll a Cradle if your tier requires it.",
    body: "Guest-tier reads clear on the device biometric. Host-tier writes require a Cradle physically present. Architect-tier admin operations additionally require an enclave-signed approval token. If your integration lives above Host, the Cradle provisioning path is a one-time setup — see the Cradle provisioning doc.",
  },
  {
    n: "03",
    title: "Discover the MCP surface.",
    body: "Every integration's first call is list_available_tools. It returns the live roster with input schemas and per-tool tier gates. Pin against the discovered roster, not a hard-coded list — when the platform adds a capability, your integration finds it automatically.",
  },
  {
    n: "04",
    title: "Make your first authenticated call.",
    body: "Pick a read-tier tool the discovery returned — get_context, list_departments, describe_pearl. The read succeeds if your Bearer token is valid and the operator's scope covers the target. If it fails, the error names the specific policy that refused it — the platform never returns a generic 401.",
  },
  {
    n: "05",
    title: "Verify in the audit chain.",
    body: "Your call landed in the hash-chained audit log — read it back with audit_event_list, filtered to your operator identity in the last five minutes. Every row carries the tool name, input hash, output hash, tier, and the next-chain link. This is the receipt your compliance officer will ask for.",
  },
];

export default function QuickstartPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span> <span>Quickstart</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Integration · 01</div>
        <h1 className="doc-title">Quickstart.</h1>
        <p className="doc-lede">
          From zero to your first authenticated call, verified in the audit
          chain. Ten minutes on a well-provisioned sandbox. The five steps
          below map to five concrete technical artefacts &mdash; nothing here
          is aspirational.
        </p>
      </header>

      <section className="doc-section">
        <h2>The five steps</h2>
        {STEPS.map((s) => (
          <div key={s.n} className="doc-pillar">
            <div className="doc-pillar-h">
              <span className="doc-pillar-n">{s.n}</span>
              <span className="doc-pillar-t">{s.title}</span>
            </div>
            <div className="doc-pillar-d">{s.body}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>What you don&rsquo;t need</h2>
        <p>
          You do not need to provision your own database, run your own
          identity provider, or stand up an audit pipeline. Every Nebbos
          deployment carries row-level isolation at the substrate, a shared
          hash-chained audit log, and the WorkOS-mediated identity plane. Your
          integration attaches to those &mdash; it doesn&rsquo;t rebuild them.
        </p>
      </section>

      <section className="doc-section">
        <h2>Where to go next</h2>
        <p>
          Once your first call verifies in the chain, three docs cover the
          usual next stops:{" "}
          <Link href="/docs/auth">Authentication &amp; tiers</Link> (how the
          three-tier gate authenticates your calls),{" "}
          <Link href="/docs/mcp">MCP reference</Link> (the seven tool
          categories and the discovery pattern), and{" "}
          <Link href="/docs/audit-chain">The audit chain</Link> (how to read a
          verification receipt).
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/docs">← All docs</Link>
        <Link href="/docs/auth">Authentication &amp; tiers →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
