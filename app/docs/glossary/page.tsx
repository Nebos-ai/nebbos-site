import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { PRODUCT_SURFACES } from "@/content/canonical-claims";
import { DOC_STYLES } from "@/components/docs/doc-styles";

/**
 * app/docs/glossary/page.tsx — the canonical Nebbos glossary.
 * Every term used across the docs, defined once. Product-surface
 * definitions come from PRODUCT_SURFACES so they stay in lockstep
 * with the marketing surface.
 */

export const metadata: Metadata = {
  title: `Glossary · ${BRAND.name} docs`,
  description:
    "Cradle · Pearl · MCP · Platform · App · Guest / Host / Architect — every term used across the docs, defined once.",
};

interface Term {
  t: string;
  d: string;
}

const PRODUCT_TERMS: Term[] = PRODUCT_SURFACES.map((s) => ({
  t: s.name,
  d: `${s.oneLiner} ${s.body}`,
}));

const CONCEPT_TERMS: Term[] = [
  {
    t: "Pearl",
    d: "An operator-scoped brain that runs inside the Platform. Each Pearl is trained by the operator's own yes/no decisions and never leaves the operation that produced them.",
  },
  {
    t: "Cradle",
    d: "The customer-facing name for the fourth product — the hardware device that carries the MCP binary, the Pearl memory, and the keys that unlock the audit trail. Internally, the substrate term is `USB` (the physical form factor); on every customer surface, the name is Cradle.",
  },
  {
    t: "MCP",
    d: "The Model Context Protocol — the capability layer every tool call has to cross. Classifies the tier on your host, redacts before egress, hands the call to the substrate. Your policy, not ours.",
  },
];

const TIER_TERMS: Term[] = [
  {
    t: "Guest (L1 · Starter)",
    d: "Basic-tier operator. Biometric authentication only. Reads and low-risk tool calls.",
  },
  {
    t: "Host (L2 · Team)",
    d: "Privileged-tier operator. Biometric + Cradle physically present. Organization-wide writes, memory registers, knowledge-graph mutations, admin ops within the operator's own scope.",
  },
  {
    t: "Architect (L3 · Enterprise)",
    d: "Admin-tier operator. Biometric + Cradle + enclave-signed approval token. Organization create/destroy, substrate mutation, cross-organization operations, doctrine-cluster ratification.",
  },
];

const AUDIT_TERMS: Term[] = [
  {
    t: "Row-level isolation",
    d: "Data isolation enforced at the database, not at the application. The query is refused before an answer is composed; a bug in the UI cannot leak a row.",
  },
  {
    t: "Hash-chained audit",
    d: "Every read, every write, every tier decision lands in a tamper-evident chain. An auditor walks the chain end to end without asking Nebbos.",
  },
  {
    t: "Portability continuously exercised",
    d: "Full export runs on every deploy, not on offboarding day. If the escape hatch didn't work last Thursday, we find out on Thursday.",
  },
  {
    t: "Attested action",
    d: "An action whose approval is a cryptographic signature the substrate can verify — not a checkbox in a form.",
  },
];

export default function GlossaryPage() {
  return (
    <div className="doc-shell">
      <nav className="doc-crumbs">
        <Link href="/docs">Docs</Link> <span>·</span> <span>Glossary</span>
      </nav>
      <header className="doc-head">
        <div className="doc-eyebrow">Foundations · 03</div>
        <h1 className="doc-title">Glossary.</h1>
        <p className="doc-lede">
          Every term used across the Nebbos documentation, defined once. If
          two docs use the same word to mean different things, this page is
          out of date and the doctrine is drifting — file it.
        </p>
      </header>

      <section className="doc-section">
        <h2>Products</h2>
        {PRODUCT_TERMS.map((term) => (
          <div key={term.t} className="doc-term">
            <div className="doc-term-t">{term.t}</div>
            <div className="doc-term-d">{term.d}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>Concepts</h2>
        {CONCEPT_TERMS.map((term) => (
          <div key={term.t} className="doc-term">
            <div className="doc-term-t">{term.t}</div>
            <div className="doc-term-d">{term.d}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>Operator tiers</h2>
        {TIER_TERMS.map((term) => (
          <div key={term.t} className="doc-term">
            <div className="doc-term-t">{term.t}</div>
            <div className="doc-term-d">{term.d}</div>
          </div>
        ))}
      </section>

      <section className="doc-section">
        <h2>Audit &amp; enforcement</h2>
        {AUDIT_TERMS.map((term) => (
          <div key={term.t} className="doc-term">
            <div className="doc-term-t">{term.t}</div>
            <div className="doc-term-d">{term.d}</div>
          </div>
        ))}
      </section>

      <footer className="doc-footer">
        <Link href="/docs/security-model">← Security model</Link>
        <Link href="/docs/compliance-posture">Compliance posture →</Link>
      </footer>

      <style>{DOC_STYLES}</style>
    </div>
  );
}
