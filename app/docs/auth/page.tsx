import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/auth/page.tsx — Authentication & operator tiers.
 *
 * Three tiers, three authentication artefacts, one policy plane. The
 * mapping between customer-facing tier names (Guest / Host / Architect)
 * and internal architectural levels (L1 / L2 / L3) lives here — it is
 * the same mapping the Glossary carries.
 */

export const metadata: Metadata = {
  title: `Authentication & tiers · ${BRAND.name} docs`,
  description:
    "Guest · Host · Architect. Biometric · Cradle · enclave. Three tiers, three artefacts, one substrate refusing everything else.",
};

interface Tier {
  n: string;
  name: string;
  internal: string;
  gate: string;
  scope: string;
  artefact: string;
}

const TIERS: Tier[] = [
  {
    n: "01",
    name: "Guest",
    internal: "L1 · Starter",
    gate: "Device-native biometric.",
    scope:
      "Reads across the operator's scope. Low-risk tool calls that don't mutate state — describe_pearl, get_context, list_departments, query_pearl. Signal reads. Audit-chain reads.",
    artefact:
      "Bearer token issued by the identity provider after a WebAuthn assertion on the developer's device.",
  },
  {
    n: "02",
    name: "Host",
    internal: "L2 · Team",
    gate: "Biometric + Cradle physically present.",
    scope:
      "Every write inside the operator's own organisation. Task and project mutations, department writes, memory registers, knowledge-graph edits, signal acknowledgements, admin ops within the operator's scope.",
    artefact:
      "Bearer token + Cradle-signed delegation token. The Cradle countersigns the request; if the Cradle isn't on the desk when the write leaves, the write doesn't leave.",
  },
  {
    n: "03",
    name: "Architect",
    internal: "L3 · Enterprise",
    gate: "Biometric + Cradle + enclave-signed approval token.",
    scope:
      "Substrate mutation. Organisation create/destroy. Cross-organisation reads. Doctrine-cluster ratification. Every action a compliance officer would want to see a signed record of.",
    artefact:
      "Bearer + Cradle-signed delegation + enclave attestation. The enclave signs a per-action approval that names the operator, the target, the tier, and the timestamp — the substrate verifies the signature before the request touches state.",
  },
];

export default function AuthDocPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span>{" "}
        <span>Authentication &amp; tiers</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Integration · 02</div>
        <h1 className="doc-title">Authentication &amp; tiers.</h1>
        <p className="doc-lede">
          Three tiers. Three artefacts. One substrate that refuses everything
          else. Every call carries an identity and a tier; every write
          carries a delegation the substrate can verify.
        </p>
      </header>

      <section className="doc-section">
        <h2>The three tiers</h2>
        {TIERS.map((t) => (
          <div key={t.name} className="doc-pillar">
            <div className="doc-pillar-h">
              <span className="doc-pillar-n">
                {t.n} · {t.internal}
              </span>
              <span className="doc-pillar-t">{t.name}</span>
            </div>
            <div className="doc-auth-body">
              <div>
                <span className="doc-mcp-label">Gate</span> {t.gate}
              </div>
              <div>
                <span className="doc-mcp-label">Scope</span> {t.scope}
              </div>
              <div>
                <span className="doc-mcp-label">Artefact</span> {t.artefact}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>How your integration picks a tier</h2>
        <p>
          You don&rsquo;t. The operator does. The identity your integration
          receives from the platform carries the operator&rsquo;s current tier
          &mdash; a Guest identity can never make a Host call, and the
          substrate refuses the escalation even if the code asks. To make a
          higher-tier call, the operator steps up on their own device: the
          biometric, then the Cradle, then (for Architect) the enclave.
        </p>
        <p>
          If a developer needs to test all three tiers, ask the admin for
          three sandbox identities &mdash; one per tier. Do not attempt to
          escalate a single identity in code.
        </p>
      </section>

      <section className="doc-section">
        <h2>Token lifetimes and refresh</h2>
        <p>
          Bearer tokens expire in fifteen minutes. Cradle-signed delegations
          expire when the operator physically removes the Cradle from the
          desk. Enclave approvals are per-action &mdash; there is no
          long-lived enclave token to refresh.
        </p>
        <p>
          Refresh a Bearer token before the next expiry; if a call comes back{" "}
          <code>401</code>, refresh and retry once. Never wrap the retry in a
          batch that hides the failure &mdash; the substrate&rsquo;s error
          shape is deliberately loud so it can&rsquo;t be silently swallowed.
        </p>
      </section>

      <section className="doc-section">
        <h2>Every authentication decision lands in the chain</h2>
        <p>
          Every token issuance, every biometric ceremony, every Cradle
          attestation, every enclave signature &mdash; all of it lands in the
          hash-chained audit log alongside the actions those artefacts
          authorised. A compliance officer walking the chain from a specific
          write can retrieve the full authentication provenance without
          leaving the log.
        </p>
        <p>
          See <Link href="/docs/audit-chain">The audit chain</Link> for the
          shape and the verification path.
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/docs/quickstart">← Quickstart</Link>
        <Link href="/docs/mcp">MCP reference →</Link>
      </footer>

      <style>{DOC_STYLES + AUTH_STYLES}</style>
    </div>
  );
}

const AUTH_STYLES = `
  .doc-auth-body {
    display: grid;
    gap: 8px;
    font-family: "Newsreader", Georgia, serif;
    font-size: 14.5px;
    color: rgba(0,0,0,0.75);
    line-height: 1.55;
    max-width: 68ch;
  }
  .doc-auth-body .doc-mcp-label {
    font-family: "JetBrains Mono", monospace;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(0,0,0,0.45); font-size: 10px; margin-right: 6px;
  }
`;
