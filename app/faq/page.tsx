import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import {
  PRODUCT_SURFACES,
  DATA_TIERS,
  GOVERNANCE_PILLARS,
  COMPLIANCE_POSTURE,
  PRODUCTION_CLAIM,
} from "@/content/canonical-claims";

/**
 * app/faq/page.tsx — the product FAQ.
 *
 * Founder directive 2026-09-19: assemble the missing docs from what we
 * already have. Every question here answers from the ratified substrate
 * (canonical-claims.ts + brand.ts). The answers are not authored — they
 * are computed. Change a canonical claim, the FAQ re-renders correctly.
 *
 * Sections mirror the shape a prospect encounters:
 *   1. What Nebbos is
 *   2. Products
 *   3. How data is treated (five-tier)
 *   4. Governance (four pillars)
 *   5. Compliance posture
 *   6. Where it runs
 *   7. Getting started
 *
 * AMS row: "Product FAQ" (need → have).
 */

export const metadata: Metadata = {
  title: `FAQ · ${BRAND.name}`,
  description:
    "Straight answers on what Nebbos is, how each product works, how data is treated, what governance looks like, and how to start.",
};

interface QA {
  q: string;
  a: string | React.ReactNode;
}

interface Section {
  n: string;
  title: string;
  qas: QA[];
}

const SECTIONS: Section[] = [
  {
    n: "01",
    title: "What Nebbos is",
    qas: [
      {
        q: "What is Nebbos in one sentence?",
        a: BRAND.taglineShort,
      },
      {
        q: "What does the platform actually do?",
        a: BRAND.descriptionLong,
      },
      {
        q: "How is Nebbos different from an AI copilot or chat assistant?",
        a: "Nebbos is the substrate an operator's Pearl runs on — every action attested, every trail portable, every key held by the customer. A chat assistant answers a question. Nebbos runs the shift.",
      },
    ],
  },
  {
    n: "02",
    title: "The four products",
    qas: PRODUCT_SURFACES.map((s) => ({
      q: `What is ${s.name}?`,
      a: `${s.oneLiner} ${s.body}`,
    })),
  },
  {
    n: "03",
    title: "How data is treated — five tiers",
    qas: [
      {
        q: "How does Nebbos decide what leaves the host?",
        a: "A classifier on the customer's host picks one of five tiers on every request, before the wire. Tier decision runs on the customer's host, not on Nebbos servers.",
      },
      ...DATA_TIERS.map((t) => ({
        q: `What is the "${t.label}" tier?`,
        a: t.desc,
      })),
    ],
  },
  {
    n: "04",
    title: "Governance — the four pillars",
    qas: [
      {
        q: "How does Nebbos prove itself to an auditor?",
        a: "Four pillars, none of which is a written promise: human approval attested at the tier the action deserves, hash-chained append-only audit, row-level isolation enforced by the database (not the application), and portability continuously exercised. The auditor verifies the code, not the promise.",
      },
      ...GOVERNANCE_PILLARS.map((p, i) => ({
        q: `Pillar ${i + 1}: ${p.label.replace(/\.$/, "")}?`,
        a: p.body,
      })),
    ],
  },
  {
    n: "05",
    title: "Compliance posture",
    qas: [
      {
        q: "Where do you actually stand on compliance?",
        a: "In plain English, framework by framework — see the table below. Every status is what the substrate genuinely supports today, not what it aspires to.",
      },
      ...COMPLIANCE_POSTURE.map((c) => ({
        q: `${c.framework}: ${c.status}?`,
        a: c.note,
      })),
    ],
  },
  {
    n: "06",
    title: "Where it runs",
    qas: [
      {
        q: "Where is Nebbos in production?",
        a: `${PRODUCTION_CLAIM.category}. ${PRODUCTION_CLAIM.geography}.`,
      },
      {
        q: "Who is the buyer?",
        a: `${PRODUCTION_CLAIM.audience}. ${PRODUCTION_CLAIM.buyer}.`,
      },
      {
        q: "Can you name customers?",
        a: `${PRODUCTION_CLAIM.disclosureRule}.`,
      },
    ],
  },
  {
    n: "07",
    title: "Getting started",
    qas: [
      {
        q: "What happens in the first thirty minutes?",
        a: "Thirty minutes. One department. We show which Pearl fits, which signals it reads, what its first shift looks like — and where the pressure it's built for lives in the operation today. If it doesn't fit, we say so on the call.",
      },
      {
        q: "How is Nebbos priced?",
        a: "Three tiers — Starter, Team, Enterprise. Non-enterprise tiers publish concrete numbers with a feature matrix; enterprise is a call. See /pricing.",
      },
      {
        q: "How do I book a demo?",
        a: "nebbos.ai/demo — or enterprise@nebbos.ai for procurement conversations, MSAs, DPAs, and the letter your compliance officer asked for.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="faq-shell">
      <header className="faq-head">
        <div className="faq-eyebrow">FAQ</div>
        <h1 className="faq-title">Straight answers.</h1>
        <p className="faq-lede">
          Every question here answers from the same substrate that governs the
          platform itself — the four products, the five data tiers, the four
          governance pillars, the six compliance rows. If the underlying
          doctrine changes, this page changes with it.
        </p>
        <nav className="faq-toc" aria-label="Sections">
          {SECTIONS.map((s) => {
            const anchor = s.n;
            return (
              <a key={anchor} href={`#${anchor}`} className="faq-toc-item">
                <span className="faq-toc-num">{s.n}</span> {s.title}
              </a>
            );
          })}
        </nav>
      </header>

      {SECTIONS.map((s) => (
        <section key={s.n} id={s.n} className="faq-section">
          <h2 className="faq-h2">
            <span className="faq-h2-num">{s.n}</span> {s.title}
          </h2>
          <div className="faq-qas">
            {s.qas.map((qa, i) => (
              <details key={i} className="faq-qa">
                <summary className="faq-q">{qa.q}</summary>
                <div className="faq-a">{qa.a}</div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <footer className="faq-footer">
        <div>Nebbos Technologies Corp · Nebbos Technologies D.O.O.</div>
        <Link href="/demo">Book a demo →</Link>
      </footer>

      <style>{FAQ_CSS}</style>
    </div>
  );
}

const FAQ_CSS = `
  .faq-shell {
    max-width: 900px;
    margin: 0 auto;
    padding: clamp(48px, 6vw, 88px) clamp(24px, 5vw, 64px) 96px;
    color: #1D1C22;
  }
  @media (prefers-color-scheme: dark) {
    .faq-shell { color: #F4F4F6; }
  }
  .faq-head { margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px dashed rgba(0,0,0,0.15); }
  .faq-eyebrow {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin-bottom: 14px;
  }
  .faq-title {
    font-family: "Newsreader", Georgia, serif;
    font-size: clamp(38px, 5vw, 56px);
    line-height: 1;
    letter-spacing: -0.03em;
    font-weight: 700;
    margin: 0 0 18px;
    max-width: 18ch;
    text-wrap: balance;
  }
  .faq-lede {
    font-family: "Newsreader", Georgia, serif;
    font-size: 19px;
    line-height: 1.5;
    color: rgba(0,0,0,0.65);
    max-width: 60ch;
    margin: 0 0 28px;
  }
  .faq-toc {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 20px;
    padding: 20px 0;
    border-top: 1px solid rgba(0,0,0,0.12);
  }
  @media (max-width: 700px) { .faq-toc { grid-template-columns: 1fr; } }
  .faq-toc-item {
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: rgba(0,0,0,0.65);
    text-decoration: none;
    padding: 4px 0;
    display: flex;
    gap: 8px;
    align-items: baseline;
  }
  .faq-toc-item:hover { color: #A36630; }
  .faq-toc-num { color: #A36630; font-weight: 700; letter-spacing: 0.08em; }
  .faq-section { margin-top: 56px; scroll-margin-top: 24px; }
  .faq-h2 {
    font-family: "Newsreader", Georgia, serif;
    font-size: 26px;
    letter-spacing: -0.018em;
    font-weight: 700;
    margin: 0 0 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    display: flex;
    gap: 12px;
    align-items: baseline;
  }
  .faq-h2-num {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    color: #A36630;
    letter-spacing: 0.14em;
    font-weight: 700;
  }
  .faq-qas {
    display: flex;
    flex-direction: column;
  }
  .faq-qa {
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  .faq-qa[open] {
    background: rgba(0,0,0,0.02);
  }
  .faq-q {
    font-family: "Newsreader", Georgia, serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.008em;
    padding: 18px 4px;
    cursor: pointer;
    list-style: none;
    color: #1D1C22;
    display: flex;
    gap: 12px;
    align-items: baseline;
  }
  .faq-q::-webkit-details-marker { display: none; }
  .faq-q::before {
    content: "+";
    font-family: "JetBrains Mono", monospace;
    font-size: 16px;
    color: #A36630;
    font-weight: 700;
    width: 12px;
    flex-shrink: 0;
  }
  .faq-qa[open] .faq-q::before { content: "−"; }
  .faq-a {
    padding: 0 4px 20px 28px;
    font-family: "Newsreader", Georgia, serif;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(0,0,0,0.75);
    max-width: 68ch;
  }
  .faq-footer {
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
  .faq-footer a {
    color: #A36630;
    text-decoration: none;
    border-bottom: 1px dotted #A36630;
  }
`;
