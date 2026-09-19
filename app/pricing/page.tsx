import type { Metadata } from "next";
import Link from "next/link";
import { SplitWords } from "@/components/patterns/SplitWords";
import { CONTACT } from "@/content/contact";

/**
 * PAGE · /pricing · v2 · 2026-09-18 · three-tier + feature matrix
 *
 * Founder-directed 2026-09-18 (verbatim):
 *   "we need to have pricing for non enterprise users we should have
 *    three levels of users at different levels different things are
 *    availabel we should show what is available and what isnt this is
 *    a standard saas pricing layout and logic."
 *   AND (separate): "if they lose or break tehre keys they should be
 *    able to place a order from the site for more."
 *
 * v1 was a single Enterprise tier per the older "no published pricing"
 * doctrine. v2 shifts to a 3-tier SaaS shape per `feedback_three_levels
 * _always` doctrine + the founder's expansion.
 *
 * PRICING PLACEHOLDERS · The two non-enterprise prices ($15 · $75) are
 * PROPOSED so the page has a concrete shape; founder rewrites them in
 * one edit before publish. The Enterprise tier stays "Contact us" per
 * the ratified enterprise-contact-us rule.
 *
 * CRADLE REPLACEMENT · Added at bottom as an ordering path. Routes to
 * mailto:enterprise for now; upgrade to a real form/checkout after the
 * self-serve backend lands.
 */

export const metadata: Metadata = {
  title: "Pricing · Three tiers. Enterprise on a call.",
  description:
    "Nebbos Starter, Team, and Enterprise. Self-serve for individuals and small teams. Enterprise on a call. Cradle hardware ships with every tier.",
};

const TIERS = [
  {
    key: "starter",
    name: "Starter",
    tier: "L1 · Personal",
    price: "$15",
    period: "per month",
    priceNote: "Placeholder · founder-set at publish",
    deck:
      "One operator. Biometric-only. Dashboard, personal-scope reads, low-risk tool calls.",
    cta: { label: "Book a Starter demo", href: "/demo?tier=starter" },
    ctaVariant: "ghost" as const,
    featured: false,
  },
  {
    key: "team",
    name: "Team",
    tier: "L2 · Privileged",
    price: "$75",
    period: "per seat, per month",
    priceNote: "Placeholder · founder-set at publish",
    deck:
      "Small team. Biometric + Cradle presence. Shell writes, memory registers, admin ops within your team.",
    cta: { label: "Book a Team demo", href: "/demo?tier=team" },
    ctaVariant: "primary" as const,
    featured: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tier: "L3 · Admin",
    price: "Contact us",
    period: "",
    priceNote: "Scope + deployment set on a call",
    deck:
      "Org-wide. Biometric + Cradle + enclave-signed approval. Shell creation, substrate mutation, cross-team, air-gapped or federated.",
    cta: { label: "Contact sales", href: "/contact" },
    ctaVariant: "ghost" as const,
    featured: false,
  },
];

const MATRIX_GROUPS = [
  {
    group: "The product",
    rows: [
      { feature: "Nebbos App · macOS + Windows",  starter: true,  team: true,  enterprise: true },
      { feature: "Nebbos Platform · web",          starter: true,  team: true,  enterprise: true },
      { feature: "Nebbos MCP · tool substrate",    starter: true,  team: true,  enterprise: true },
      { feature: "Nebbos Cradle · hardware",       starter: "—",   team: true,  enterprise: true },
    ],
  },
  {
    group: "Approvals",
    rows: [
      { feature: "Biometric approval",             starter: true,  team: true,  enterprise: true },
      { feature: "Cradle physical presence",       starter: "—",   team: true,  enterprise: true },
      { feature: "Enclave-signed admin token",     starter: "—",   team: "—",   enterprise: true },
      { feature: "Multi-party quorum",             starter: "—",   team: "—",   enterprise: true },
    ],
  },
  {
    group: "Scope",
    rows: [
      { feature: "Personal-scope reads",           starter: true,  team: true,  enterprise: true },
      { feature: "Shell writes",                   starter: "—",   team: true,  enterprise: true },
      { feature: "Cross-shell reads",              starter: "—",   team: "—",   enterprise: true },
      { feature: "Substrate mutation",             starter: "—",   team: "—",   enterprise: true },
    ],
  },
  {
    group: "Deployment",
    rows: [
      { feature: "Managed (Nebbos-hosted)",        starter: true,  team: true,  enterprise: true },
      { feature: "Federated (your cloud)",         starter: "—",   team: "—",   enterprise: true },
      { feature: "Air-gapped (on-prem)",           starter: "—",   team: "—",   enterprise: true },
    ],
  },
  {
    group: "Support",
    rows: [
      { feature: "Docs + community",               starter: true,  team: true,  enterprise: true },
      { feature: "Email support",                  starter: "—",   team: true,  enterprise: true },
      { feature: "Named onboarding operator",      starter: "—",   team: "—",   enterprise: true },
      { feature: "Security-review support",        starter: "—",   team: "—",   enterprise: true },
    ],
  },
];

function Cell({ v, tier }: { v: boolean | string; tier: string }) {
  if (v === true) {
    return <p className="mkt-matrix__cell" data-tier={tier}><span className="mkt-matrix__check">✓</span></p>;
  }
  if (v === false || v === "—") {
    return <p className="mkt-matrix__cell" data-tier={tier}><span className="mkt-matrix__dash">—</span></p>;
  }
  return <p className="mkt-matrix__cell" data-tier={tier}>{v}</p>;
}

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="mkt mkt-section mkt-hero" aria-labelledby="pricing-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Pricing</p>
            <h1 id="pricing-h" className="mkt-display">
              <SplitWords>Three tiers. Enterprise on a call.</SplitWords>
            </h1>
            <p className="mkt-deck">
              Solo operators start on Starter. Teams add the Cradle and
              scale to Team. Organizations sign an Enterprise agreement
              for cross-team, air-gapped, or federated deployment.
            </p>
            <div className="mkt-hero__ctas">
              <Link href="#tiers" className="mkt-cta mkt-cta--primary">
                See the tiers
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href="#compare" className="mkt-cta mkt-cta--ghost">
                Compare features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="mkt mkt-section" aria-labelledby="tiers-h" id="tiers">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The tiers</p>
            <h2 id="tiers-h" className="mkt-h2">
              <SplitWords>Pick the tier that fits your shift.</SplitWords>
            </h2>
          </header>

          <div className="mkt-pricing__grid">
            {TIERS.map((t) => (
              <article
                key={t.key}
                className={`mkt-price ${t.featured ? "mkt-price--featured" : ""}`}
                aria-labelledby={`tier-${t.key}-h`}
              >
                <p className="mkt-price__tier">{t.tier}</p>
                <h3 id={`tier-${t.key}-h`} className="mkt-price__name">{t.name}</h3>
                <p className="mkt-price__value">
                  {t.price}
                  {t.period && <span className="mkt-price__period">{t.period}</span>}
                </p>
                {t.priceNote && <p className="mkt-price__note">{t.priceNote}</p>}
                <p className="mkt-price__deck">{t.deck}</p>
                <Link
                  href={t.cta.href}
                  className={`mkt-cta ${t.ctaVariant === "primary" ? "mkt-cta--primary" : "mkt-cta--ghost"} mkt-price__cta`}
                >
                  {t.cta.label}
                  {t.ctaVariant === "primary" && (
                    <span className="mkt-cta__arrow" aria-hidden>→</span>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX */}
      <section className="mkt mkt-section" aria-labelledby="compare-h" id="compare">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">What&rsquo;s included</p>
            <h2 id="compare-h" className="mkt-h2">
              <SplitWords>Compare tier by tier.</SplitWords>
            </h2>
          </header>

          <div className="mkt-matrix" aria-label="Tier feature comparison">
            <div className="mkt-matrix__row mkt-matrix__row--head">
              <p className="mkt-matrix__cell">Feature</p>
              <p className="mkt-matrix__cell">Starter</p>
              <p className="mkt-matrix__cell">Team</p>
              <p className="mkt-matrix__cell">Enterprise</p>
            </div>
            {MATRIX_GROUPS.map((g) => (
              <div key={g.group}>
                <div className="mkt-matrix__row mkt-matrix__row--group">
                  <p className="mkt-matrix__cell">{g.group}</p>
                  <p className="mkt-matrix__cell" />
                  <p className="mkt-matrix__cell" />
                  <p className="mkt-matrix__cell" />
                </div>
                {g.rows.map((r) => (
                  <div key={r.feature} className="mkt-matrix__row">
                    <p className="mkt-matrix__cell">{r.feature}</p>
                    <Cell v={r.starter} tier="Starter" />
                    <Cell v={r.team} tier="Team" />
                    <Cell v={r.enterprise} tier="Enterprise" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRADLE REPLACEMENT ORDER */}
      <section className="mkt mkt-section" aria-labelledby="cradle-h">
        <div className="mkt-section__inner">
          <header className="mkt-flow__head">
            <p className="mkt-eyebrow">Lost or damaged Cradle</p>
            <h2 id="cradle-h" className="mkt-h2">
              <SplitWords>Order a replacement Cradle.</SplitWords>
            </h2>
            <p className="mkt-deck">
              Team and Enterprise customers can order a replacement Cradle
              at cost. Ships to the address on file within 3 business
              days. Old device serial is retired from your organization&rsquo;s
              attestation chain at replacement issue.
            </p>
            <div className="mkt-hero__ctas">
              <Link
                href={`mailto:${CONTACT.enterprise}?subject=Cradle%20replacement%20request&body=Serial%20of%20lost%2Fdamaged%20device%3A%20%0AShipping%20address%3A%20%0AOrganization%3A%20%0ATier%3A%20%0A`}
                className="mkt-cta mkt-cta--primary"
              >
                Request replacement
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="mkt-cta mkt-cta--ghost">
                Talk to support
              </Link>
            </div>
          </header>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mkt mkt-section mkt-closing" aria-labelledby="close-h">
        <div className="mkt-closing__inner">
          <p className="mkt-eyebrow">Not sure which tier</p>
          <h2 id="close-h" className="mkt-display">
            <SplitWords>Book thirty minutes. We map the fit.</SplitWords>
          </h2>
          <p className="mkt-deck">
            Bring one department. We show you which tier answers the
            shape of your operation and quote the pilot on the call.
          </p>
          <div className="mkt-hero__ctas">
            <Link href="/demo" className="mkt-cta mkt-cta--primary">
              Book a demo
              <span className="mkt-cta__arrow" aria-hidden>→</span>
            </Link>
            <Link href={`mailto:${CONTACT.enterprise}`} className="mkt-cta mkt-cta--ghost">
              Email enterprise
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
