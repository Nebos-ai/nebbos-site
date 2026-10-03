import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/content/contact";

/**
 * PAGE · /contact · v2 · 2026-09-18 · marketing-register rebuild
 *
 * Migrated from PAGES.contact + PageRenderer (registry-driven paper
 * sections) to a directly-composed dark-register page. Same 7 email
 * routes as MarketingDemoForm's "Not a demo?" section — this page is
 * the fuller destination for users who click "Contact" from the nav.
 */

export const metadata: Metadata = {
  title: "Contact · Route direct to the right inbox",
  description:
    "Seven inboxes: general, enterprise, engineering, security, privacy, legal, press. Reply within one business day.",
};

const ROUTES = [
  { label: "General", email: CONTACT.general, desc: "Sales, partnerships, misc." },
  { label: "Enterprise", email: CONTACT.enterprise, desc: "SOWs, MSAs, DPAs, procurement." },
  { label: "Engineering", email: CONTACT.engineering, desc: "Developer and integration questions." },
  { label: "Security", email: CONTACT.security, desc: "Vulnerability reports and incident notification." },
  { label: "Privacy", email: CONTACT.privacy, desc: "Data-protection officer, GDPR, DSARs." },
  { label: "Legal", email: CONTACT.legal, desc: "License, MSA, and policy questions." },
  { label: "Press", email: CONTACT.press, desc: "Journalist and analyst inquiries." },
];

const OFFICES = [
  {
    label: "US parent",
    entity: "Nebbos Technologies Corp",
    city: "Wilmington, Delaware",
    role: "Delaware C-Corp. Contract entity for US enterprise engagements.",
  },
  {
    label: "AI unit",
    entity: "Nebbos AI",
    city: "Los Angeles, California",
    role: "Product and go-to-market for the nebbos.ai platform.",
  },
  {
    label: "Operating",
    entity: "Nebbos D.O.O.",
    city: "Beograd, Serbia",
    role: "Engineering, operations, and technical delivery.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="mkt mkt-section mkt-hero" aria-labelledby="contact-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Contact</p>
            <h1 id="contact-h" className="mkt-display">
              Route direct to the right inbox.
            </h1>
            <p className="mkt-deck">
              Seven addresses. Reply within one business day. Procurement,
              security, engineering — each has its own path so nothing waits
              behind a triage queue.
            </p>
            <div className="mkt-hero__ctas">
              <Link href="/demo" className="mkt-cta mkt-cta--primary">
                Book a demo
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href={`mailto:${CONTACT.general}`} className="mkt-cta mkt-cta--ghost">
                Email general
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section className="mkt mkt-section" aria-labelledby="routes-h">
        <div className="mkt-section__inner">
          <header className="mkt-numbers__head">
            <p className="mkt-eyebrow">Direct routing</p>
            <h2 id="routes-h" className="mkt-h2">
              Every address, its own path.
            </h2>
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

      {/* OFFICES */}
      <section className="mkt mkt-section" aria-labelledby="offices-h">
        <div className="mkt-section__inner">
          <header className="mkt-numbers__head">
            <p className="mkt-eyebrow">Offices</p>
            <h2 id="offices-h" className="mkt-h2">
              Three entities. One company.{/* claim-source: corporate-taxonomy-one-company */}
            </h2>
            <p className="mkt-deck">
              US parent for contracting. LA for product. Belgrade for
              engineering. Every entity signs and delivers.
            </p>
          </header>
          <div className="mkt-builtfor">
            {OFFICES.map((o) => (
              <div key={o.label} className="mkt-builtfor__item">
                <div>
                  <p className="mkt-eyebrow" style={{ marginBottom: 6 }}>{o.label}</p>
                  <p className="mkt-builtfor__audience">{o.entity}</p>
                  <p className="mkt-highlight__note" style={{ marginTop: 2 }}>{o.city}</p>
                </div>
                <p className="mkt-builtfor__scope">{o.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
