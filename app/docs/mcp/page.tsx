import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import metrics from "@/content/platform-metrics.json";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/mcp/page.tsx — the MCP reference.
 *
 * Nebbos-side truth: the platform exposes a curated core MCP surface
 * (platform-metrics.json composed.nebos_mcp_tools = 13). The list of
 * live tools is served by `list_available_tools` at runtime — this
 * doc explains the shape and the categories, not the endpoint-by-
 * endpoint schema. Consumers pin against `list_available_tools`.
 */

export const metadata: Metadata = {
  title: `MCP reference · ${BRAND.name} docs`,
  description:
    "The Model Context Protocol surface Nebbos exposes. Categories, tiers, HITL gates, discovery.",
};

interface Category {
  name: string;
  count: string;
  purpose: string;
  examples: string;
  tier: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Pearl query",
    count: "2 tools",
    purpose:
      "Ask a specific Pearl a natural-language question about its operational domain. The Pearl only knows what its operator has taught it — you get back reasoning bounded by that scope.",
    examples: "query_pearl · describe_pearl",
    tier: "Guest",
  },
  {
    name: "Signals & risk",
    count: "2 tools",
    purpose:
      "Cross-domain risk overview served by the Orchestrator layer. The signal roster is the platform's view of what matters right now; acknowledging a signal requires the human-token attribution tuple.",
    examples: "get_active_signals · acknowledge_signal",
    tier: "Host (acknowledge)",
  },
  {
    name: "Project & task operations",
    count: "13 tools",
    purpose:
      "Read and write the operational-work tracker. Every write carries the caller's identity, an authored justification, and a measurable verification criterion — the tracker refuses writes that omit them.",
    examples:
      "list_projects · get_project · create_project · list_tasks · get_task · create_task · assign_task · update_task_status · update_tasks_bulk",
    tier: "Guest (read) · Host (write)",
  },
  {
    name: "Departments & workspace",
    count: "6 tools",
    purpose:
      "The org shape the Pearls live inside. Departments are the container each Pearl is scoped to; workspace users/groups/org-units are the identity fabric every audit event references.",
    examples:
      "list_departments · create_department · compare_departments · list_workspace_users · list_workspace_groups · list_workspace_org_units",
    tier: "Guest (read) · Architect (create)",
  },
  {
    name: "Audit chain",
    count: "3 tools",
    purpose:
      "Read the hash-chained audit log directly. Every read, every write, every tier decision is a chain entry; the verify tool walks the chain end to end and returns a receipt an outside inspector can reproduce.",
    examples: "audit_event_list · audit_event_get · audit_event_hash_chain_verify",
    tier: "Host",
  },
  {
    name: "Context & knowledge",
    count: "5 tools",
    purpose:
      "The knowledge graph and the predictive layer. Read the current context an operator has been building; ask the graph for gaps, insights, and playbook matches; retrieve the platform's forward-looking predictions with their citation trail.",
    examples:
      "get_context · get_knowledge_graph · analyze_gaps · search_insights · search_playbook_catalog · get_predictions",
    tier: "Guest",
  },
  {
    name: "Discovery",
    count: "1 tool",
    purpose:
      "The self-describing entry point. Ask the MCP what it can do; it returns the live tool roster with input schema and tier gate. Pin your integration against this, not against a hard-coded name list.",
    examples: "list_available_tools",
    tier: "Guest",
  },
];

export default function McpDocPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span> <span>MCP reference</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Integration · 03</div>
        <h1 className="doc-title">MCP reference.</h1>
        <p className="doc-lede">
          The line every tool call has to cross. {metrics.composed.nebos_mcp_tools}{" "}
          core tools grouped into seven capability categories. The classifier
          decides the tier on your host; the substrate refuses the call before
          the answer is composed.
        </p>
      </header>

      <section className="doc-section">
        <h2>Discovery is the first tool</h2>
        <p>
          Pin your integration against{" "}
          <code>list_available_tools</code>, never against a hard-coded roster.
          The MCP is self-describing: the discovery tool returns every current
          tool with its input schema, its output shape, and the operator tier
          the call has to clear. When Nebbos adds a tool, your integration
          finds it on its next discovery pass — not on your next release.
        </p>
        <p>
          The seven categories below are the shape of the core surface — the
          curated {metrics.composed.nebos_mcp_tools} tools every deployment
          exposes. Individual deployments may enable additional platform tools;
          discovery is authoritative.
        </p>
      </section>

      <section className="doc-section">
        <h2>The seven categories</h2>
        {CATEGORIES.map((c) => (
          <div key={c.name} className="doc-pillar">
            <div className="doc-pillar-h">
              <span className="doc-pillar-n">{c.count}</span>
              <span className="doc-pillar-t">{c.name}</span>
            </div>
            <div className="doc-pillar-d">{c.purpose}</div>
            <div className="doc-mcp-meta">
              <div>
                <span className="doc-mcp-label">Examples</span>{" "}
                <code>{c.examples}</code>
              </div>
              <div>
                <span className="doc-mcp-label">Tier</span> {c.tier}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>Every call carries an identity</h2>
        <p>
          There are no anonymous MCP calls into Nebbos. Every request opens
          with a Bearer token; every write additionally opens with a
          delegation token that names the human on whose authority the call is
          made. Tokens expire in 15 minutes — use the refresh endpoint before
          the next expiry, do not paper over an expiry by re-authenticating a
          batch.
        </p>
        <p>
          The three operator tiers are enforced on the platform side. See{" "}
          <Link href="/docs/auth">Authentication &amp; tiers</Link> for how
          Guest, Host, and Architect map to your integration&rsquo;s
          identity, and for the biometric / Cradle / enclave requirements at
          each step.
        </p>
      </section>

      <section className="doc-section">
        <h2>HITL is a signature, not a checkbox</h2>
        <p>
          Any tool that names a{" "}
          <code>human_token</code> input requires a signed approval from the
          verified human delegator on the same request. The substrate refuses
          the call if the token doesn&rsquo;t verify, if it&rsquo;s expired,
          or if the delegator&rsquo;s scope doesn&rsquo;t cover the operation.
          A Pearl cannot invent a human_token; the delegation is issued by the
          human-approval flow and handed to the Pearl.
        </p>
        <p>
          The rule is the same across every tier: the tier only decides which
          authentication artefact the substrate expects. It never decides
          whether an approval is required.
        </p>
      </section>

      <section className="doc-section">
        <h2>Every call lands in the chain</h2>
        <p>
          Every MCP invocation writes one row to the hash-chained audit log
          &mdash; tool name, input hash, output hash, tier, delegator,
          timestamp, next-chain-link hash. Nothing on the MCP surface is
          fire-and-forget. See <Link href="/docs/audit-chain">The audit chain</Link>{" "}
          for the shape and the verification path.
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/docs/auth">← Authentication &amp; tiers</Link>
        <Link href="/docs/api">REST API reference →</Link>
      </footer>

      <style>{DOC_STYLES + EXTRA_STYLES}</style>
    </div>
  );
}

const EXTRA_STYLES = `
  .doc-mcp-meta {
    margin-top: 10px;
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
    gap: 16px;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11.5px;
    color: rgba(0,0,0,0.60);
  }
  @media (max-width: 700px) {
    .doc-mcp-meta { grid-template-columns: 1fr; gap: 6px; }
  }
  .doc-mcp-label {
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(0,0,0,0.40); font-size: 10px; margin-right: 6px;
  }
  .doc-mcp-meta code {
    background: rgba(0,0,0,0.05);
    padding: 1px 5px; border-radius: 3px;
    color: #1D1C22; font-size: 11px;
  }
`;
