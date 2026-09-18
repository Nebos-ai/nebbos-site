import type { Metadata } from "next";
import Link from "next/link";
import { MarketingDemoForm } from "@/components/forms/MarketingDemoForm";
import { CONTACT } from "@/content/contact";

/**
 * PAGE · /demo · v2 · 2026-09-18 · marketing-register rebuild
 *
 * Migrated from BookDemoForm (paper) + PageRenderer (registry-driven
 * sections) to a directly-composed dark-register page:
 *
 *   1. MarketingDemoForm — text-left copy / right-column form
 *   2. "What we'll cover" — numbered agenda for the 30 minutes
 *   3. "Direct routing" — labelled email inboxes for other paths
 *
 * Copy in runlayer-tier voice: imperative openings, 8-15 word
 * declaratives, named artifacts (Pearl, department, signals).
 */

export const metadata: Metadata = {
  title: "Book a demo · See a Pearl on your hardest department",
  description:
    "Four fields, thirty minutes. See a Pearl reading your signals, predicting what will go wrong, and acting under your approval.",
};

const AGENDA = [
  "Which of your departments is the highest-leverage candidate.",
  "The specific signals a Pearl for that department would ingest.",
  "How approval gates and audit trails fit your compliance shape.",
  "Time-to-live and priced shape for a two-department pilot.",
];

const ROUTES = [
  { label: "General", email: CONTACT.general, desc: "Sales, partnerships, misc." },
  { label: "Enterprise", email: CONTACT.enterprise, desc: "SOWs, MSAs, DPAs, procurement." },
  { label: "Engineering", email: CONTACT.engineering, desc: "Developer and integration questions." },
  { label: "Security", email: CONTACT.security, desc: "Vulnerability reports and incident notification." },
  { label: "Privacy", email: CONTACT.privacy, desc: "Data-protection officer, GDPR, DSARs." },
  { label: "Legal", email: CONTACT.legal, desc: "DPA and policy questions." },
  { label: "Press", email: CONTACT.press, desc: "Journalist and analyst inquiries." },
];

export default function DemoPage() {
  return (
    <>
      <MarketingDemoForm />

      {/* What we'll cover */}
      <section className="mkt mkt-section" aria-labelledby="agenda-h">
        <div className="mkt-section__inner">
          <header className="mkt-numbers__head">
            <p className="mkt-eyebrow">The thirty minutes</p>
            <h2 id="agenda-h" className="mkt-h2">
              What we cover.
            </h2>
            <p className="mkt-deck">
              Four beats. No slide-deck. We open the platform and walk one
              department end to end.
            </p>
          </header>
          <ol className="mkt-list">
            {AGENDA.map((item, i) => (
              <li key={i} className="mkt-list__item">
                <span className="mkt-list__num">{String(i + 1).padStart(2, "0")}</span>
                <p className="mkt-list__text">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Direct routing */}
      <section className="mkt mkt-section" aria-labelledby="routes-h">
        <div className="mkt-section__inner">
          <header className="mkt-numbers__head">
            <p className="mkt-eyebrow">Not a demo?</p>
            <h2 id="routes-h" className="mkt-h2">
              Route direct to the right inbox.
            </h2>
            <p className="mkt-deck">
              Reply within one business day. Procurement, security,
              engineering — each has its own address.
            </p>
          </header>
          <div className="mkt-routes">
            {ROUTES.map((r) => (
              <Link key={r.email} href={`mailto:${r.email}`} className="mkt-route">
                <span className="mkt-route__label">{r.label}</span>
                <div className="mkt-route__body">
                  <span className="mkt-route__email">{r.email}</span>
                  <p className="mkt-route__desc">{r.desc}</p>
                </div>
                <span className="mkt-route__arrow" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
