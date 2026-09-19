import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";

/**
 * app/docs/page.tsx — the public technical documentation index.
 *
 * Founder directive 2026-09-19: "we need to look at all the technical
 * documentation we should have everything technical written there is
 * no way we should be missing documentation."
 *
 * The public docs entry for nebbos.ai/docs. Distinct from the in-platform
 * technical-documentation surface at nebos-frontend/documentation (per
 * ratified ADR-279 — a doc filesystem inside the platform for the
 * operator's own scoped ops docs). This surface is the public
 * product-technical documentation a developer or an integrator reads
 * before signing.
 *
 * Sections listed here map 1:1 to `/docs/<slug>` routes. Sub-pages are
 * added one PR at a time from canonical substrate — architecture from
 * SYSTEM.md + canonical-claims.ts, security model from GOVERNANCE_PILLARS
 * + DATA_TIERS + COMPLIANCE_POSTURE, glossary from canonical-claims term
 * definitions, etc.
 */

export const metadata: Metadata = {
  title: `Technical documentation · ${BRAND.name}`,
  description:
    "Architecture, security model, MCP tools, integration guides, glossary — the full technical reference for building on Nebbos.",
};

interface DocEntry {
  slug: string;
  title: string;
  lede: string;
  status: "current" | "in-progress" | "planned";
  substrate?: string;
}

interface DocSection {
  num: string;
  title: string;
  lede: string;
  entries: DocEntry[];
}

const SECTIONS: DocSection[] = [
  {
    num: "01",
    title: "Foundations",
    lede: "The shape of the system before you touch any endpoint.",
    entries: [
      {
        slug: "architecture",
        title: "Architecture overview",
        lede: "Four products, one substrate. Platform · App · MCP · Cradle — what each surface is, what it consumes, what it produces.",
        status: "current",
        substrate: "SYSTEM.md + canonical-claims.ts PRODUCT_SURFACES",
      },
      {
        slug: "security-model",
        title: "Security model",
        lede: "Five data tiers, four governance pillars, six compliance frameworks. The mechanism, not the promise.",
        status: "current",
        substrate: "canonical-claims.ts DATA_TIERS + GOVERNANCE_PILLARS + COMPLIANCE_POSTURE",
      },
      {
        slug: "glossary",
        title: "Glossary",
        lede: "Cradle · Pearl · MCP · Platform · App · Guest/Host/Architect. Every term used across the docs, defined once.",
        status: "current",
        substrate: "canonical-claims.ts + brand.ts + Westworld naming lexicon",
      },
    ],
  },
  {
    num: "02",
    title: "Integration",
    lede: "How software connects to a Nebbos deployment.",
    entries: [
      {
        slug: "quickstart",
        title: "Quickstart",
        lede: "From zero to your first authenticated call. Ten minutes — identity, Cradle, discovery, first call, audit receipt.",
        status: "current",
        substrate: "canonical-claims.ts tier gate + audit-chain doctrine",
      },
      {
        slug: "auth",
        title: "Authentication & tiers",
        lede: "Guest · Host · Architect. Biometric · Cradle · enclave. Three artefacts, one substrate refusing everything else.",
        status: "current",
        substrate: "canonical-claims.ts + Westworld tier naming lexicon",
      },
      {
        slug: "mcp",
        title: "MCP reference",
        lede: "Seven capability categories. Discovery is the first tool. Every call carries an identity and lands in the chain.",
        status: "current",
        substrate: "nebos-backend/nebos_mcp/ + platform-metrics.json mcp_tools",
      },
      {
        slug: "api",
        title: "REST API reference",
        lede: "Every `/api/v1/*` endpoint. Types, error shapes, rate limits.",
        status: "planned",
      },
      {
        slug: "webhooks",
        title: "Webhooks",
        lede: "Event topics, delivery semantics, retry envelope, signature verification.",
        status: "planned",
      },
    ],
  },
  {
    num: "03",
    title: "Operations",
    lede: "Running Nebbos in a regulated environment.",
    entries: [
      {
        slug: "audit-chain",
        title: "The audit chain",
        lede: "Hash-chained, append-only. The twelve-field entry shape, the three MCP tools that read it, the verification receipt an inspector can replay.",
        status: "current",
        substrate: "canonical-claims.ts GOVERNANCE_PILLARS[1] + audit_event_* MCP tools",
      },
      {
        slug: "row-level-isolation",
        title: "Row-level isolation",
        lede: "Enforced at the database, not the app. Every table carries an operator_scope column; every query is rewritten under the planner.",
        status: "current",
        substrate: "canonical-claims.ts GOVERNANCE_PILLARS[2]",
      },
      {
        slug: "portability",
        title: "Portability & export",
        lede: "Every deploy runs the export. Five-section bundle, POSIX-verifiable, ships with its own verify.sh — no Nebbos-side runtime required to read.",
        status: "current",
        substrate: "canonical-claims.ts GOVERNANCE_PILLARS[3]",
      },
      {
        slug: "cradle-provisioning",
        title: "Cradle provisioning",
        lede: "Onboarding, activation, biometric enrollment, key ceremony, replacement path.",
        status: "planned",
      },
    ],
  },
  {
    num: "04",
    title: "Compliance",
    lede: "The frameworks and the current status.",
    entries: [
      {
        slug: "compliance-posture",
        title: "Compliance posture",
        lede: "SOC 2 · ISO 27001 · EU AI Act · HIPAA · FERPA · GDPR/CCPA. Framework, status, what it means for you.",
        status: "current",
        substrate: "canonical-claims.ts COMPLIANCE_POSTURE",
      },
      {
        slug: "eu-ai-act",
        title: "EU AI Act — Annex IV",
        lede: "The technical documentation pack we assemble against the 2027 obligation.",
        status: "planned",
      },
      {
        slug: "responsible-ai",
        title: "Responsible AI",
        lede: "Principles, red lines, and the mechanisms that enforce them.",
        status: "planned",
      },
    ],
  },
  {
    num: "05",
    title: "Reference",
    lede: "Datamodel, changelog, everything else.",
    entries: [
      {
        slug: "data-model",
        title: "Data model",
        lede: "The row shapes. Every entity, every attested column, every RLS policy.",
        status: "planned",
      },
      {
        slug: "changelog",
        title: "Changelog",
        lede: "Every release, what shipped, what broke, what to migrate.",
        status: "planned",
      },
      {
        slug: "status",
        title: "Status",
        lede: "Live system health. Incidents, postmortems, uptime.",
        status: "planned",
      },
    ],
  },
];

const STATUS_LABEL: Record<DocEntry["status"], string> = {
  current: "Current",
  "in-progress": "In progress",
  planned: "Planned",
};

export default function DocsIndex() {
  const counts: Record<string, number> = {
    current: 0,
    "in-progress": 0,
    planned: 0,
    total: 0,
  };
  for (const s of SECTIONS) {
    for (const e of s.entries) {
      counts[e.status] = (counts[e.status] ?? 0) + 1;
      counts.total = (counts.total ?? 0) + 1;
    }
  }

  return (
    <div className="dx-shell">
      <header className="dx-head">
        <div className="dx-eyebrow">Technical documentation</div>
        <h1 className="dx-title">Everything technical, written down.</h1>
        <p className="dx-lede">
          Architecture, security, integration, operations, compliance,
          reference. Public documentation for anyone building on or against
          Nebbos — distinct from the operator-scoped technical docs inside
          the platform itself.
        </p>
        <dl className="dx-counts">
          <div>
            <dt>Current</dt>
            <dd className="dx-count-current">{counts.current}</dd>
          </div>
          <div>
            <dt>In progress</dt>
            <dd className="dx-count-in-progress">{counts["in-progress"]}</dd>
          </div>
          <div>
            <dt>Planned</dt>
            <dd className="dx-count-planned">{counts.planned}</dd>
          </div>
          <div>
            <dt>Total pages</dt>
            <dd>{counts.total}</dd>
          </div>
        </dl>
      </header>

      {SECTIONS.map((s) => (
        <section key={s.num} className="dx-section">
          <h2 className="dx-h2">
            <span className="dx-h2-num">{s.num}</span> {s.title}
          </h2>
          <p className="dx-section-lede">{s.lede}</p>
          <div className="dx-entries">
            {s.entries.map((e) => {
              const href = e.status === "planned" ? undefined : `/docs/${e.slug}`;
              const Card = (
                <>
                  <div className="dx-entry-title-row">
                    <div className="dx-entry-title">{e.title}</div>
                    <span className={`dx-status dx-status--${e.status}`}>
                      {STATUS_LABEL[e.status]}
                    </span>
                  </div>
                  <div className="dx-entry-lede">{e.lede}</div>
                  {e.substrate && (
                    <div className="dx-entry-substrate">
                      <span className="dx-entry-substrate-label">Assembles from:</span>{" "}
                      <code>{e.substrate}</code>
                    </div>
                  )}
                </>
              );
              return href ? (
                <Link key={e.slug} href={href} className="dx-entry dx-entry--link">
                  {Card}
                </Link>
              ) : (
                <div key={e.slug} className="dx-entry dx-entry--planned">
                  {Card}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <footer className="dx-footer">
        <div>Nebbos Technologies Corp · Nebbos Technologies D.O.O.</div>
        <div>
          <Link href="/faq">FAQ →</Link>
          <span style={{ marginLeft: 20 }}>
            <Link href="/pricing">Pricing →</Link>
          </span>
        </div>
      </footer>

      <style>{DX_CSS}</style>
    </div>
  );
}

const DX_CSS = `
  .dx-shell {
    max-width: 1080px;
    margin: 0 auto;
    padding: clamp(48px, 6vw, 88px) clamp(24px, 5vw, 64px) 96px;
    color: #1D1C22;
  }
  @media (prefers-color-scheme: dark) {
    .dx-shell { color: #F4F4F6; }
  }
  .dx-head { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px dashed rgba(0,0,0,0.15); }
  .dx-eyebrow {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin-bottom: 14px;
  }
  .dx-title {
    font-family: "Newsreader", Georgia, serif;
    font-size: clamp(38px, 5vw, 56px);
    line-height: 1;
    letter-spacing: -0.03em;
    font-weight: 700;
    margin: 0 0 18px;
    max-width: 20ch;
    text-wrap: balance;
  }
  .dx-lede {
    font-family: "Newsreader", Georgia, serif;
    font-size: 19px;
    line-height: 1.5;
    color: rgba(0,0,0,0.65);
    max-width: 62ch;
    margin: 0 0 28px;
  }
  .dx-counts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 0;
    padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.12);
  }
  @media (max-width: 600px) { .dx-counts { grid-template-columns: repeat(2, 1fr); } }
  .dx-counts > div { padding: 0; }
  .dx-counts dt {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin: 0 0 6px;
  }
  .dx-counts dd {
    font-family: "Newsreader", Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    margin: 0;
    font-variant-numeric: tabular-nums;
  }
  .dx-count-current { color: #3F7A5C; }
  .dx-count-in-progress { color: #B8862B; }
  .dx-count-planned { color: rgba(0,0,0,0.45); }
  .dx-section { margin-top: 56px; }
  .dx-h2 {
    font-family: "Newsreader", Georgia, serif;
    font-size: 26px;
    letter-spacing: -0.018em;
    font-weight: 700;
    margin: 0 0 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    display: flex;
    gap: 12px;
    align-items: baseline;
  }
  .dx-h2-num {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    color: #A36630;
    letter-spacing: 0.14em;
    font-weight: 700;
  }
  .dx-section-lede {
    font-family: "Newsreader", Georgia, serif;
    font-style: italic;
    font-size: 15px;
    color: rgba(0,0,0,0.55);
    margin: 12px 0 24px;
    max-width: 60ch;
  }
  .dx-entries {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 14px;
  }
  .dx-entry {
    padding: 18px 22px;
    background: rgba(0,0,0,0.02);
    border-radius: 0 22px 0 0;
    border-top: 3px solid transparent;
    color: inherit;
    text-decoration: none;
    display: block;
    transition: all 120ms;
  }
  .dx-entry--link {
    border-top-color: #A36630;
    cursor: pointer;
  }
  .dx-entry--link:hover {
    background: rgba(163, 102, 48, 0.06);
  }
  .dx-entry--planned {
    border-top-color: rgba(0,0,0,0.15);
    opacity: 0.75;
  }
  .dx-entry-title-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
    margin-bottom: 8px;
  }
  .dx-entry-title {
    font-family: "Newsreader", Georgia, serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.008em;
    line-height: 1.2;
  }
  .dx-status {
    font-family: "JetBrains Mono", monospace;
    font-size: 9.5px;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .dx-status--current {
    color: #3F7A5C;
    background: rgba(63, 122, 92, 0.12);
  }
  .dx-status--in-progress {
    color: #B8862B;
    background: rgba(184, 134, 43, 0.14);
  }
  .dx-status--planned {
    color: rgba(0,0,0,0.55);
    background: transparent;
    border: 1px dashed rgba(0,0,0,0.15);
  }
  .dx-entry-lede {
    font-size: 13.5px;
    color: rgba(0,0,0,0.70);
    line-height: 1.5;
    margin-bottom: 8px;
  }
  .dx-entry-substrate {
    font-family: "JetBrains Mono", monospace;
    font-size: 10.5px;
    color: rgba(0,0,0,0.50);
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed rgba(0,0,0,0.10);
  }
  .dx-entry-substrate-label {
    letter-spacing: 0.10em;
    text-transform: uppercase;
    font-size: 9.5px;
    color: rgba(0,0,0,0.40);
    margin-right: 4px;
  }
  .dx-entry-substrate code {
    background: rgba(0,0,0,0.05);
    padding: 1px 5px;
    border-radius: 3px;
    color: #1D1C22;
  }
  .dx-footer {
    margin-top: 72px;
    padding-top: 24px;
    border-top: 1px solid rgba(0,0,0,0.12);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: rgba(0,0,0,0.55);
    text-transform: uppercase;
  }
  .dx-footer a {
    color: #A36630;
    text-decoration: none;
    border-bottom: 1px dotted #A36630;
  }
`;
