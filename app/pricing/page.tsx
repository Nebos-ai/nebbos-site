import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CONTACT } from "@/content/contact";
import { PageHero } from "@/components/marketing/PageHero";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { ProductEmblem } from "@/components/marketing/ProductEmblem";
import { TierMeter } from "@/components/marketing/TierCard";
import { Eyebrow, GhostCta, PrimaryCta, Section, deck, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * PAGE · /pricing · v3 · 2026-09-23 · Tailwind + Motion redesign
 *
 * v3 is visual only (copy + numbers frozen): aligned price cards with the
 * Team tier lifted on a beam border, comparison matrix with a sticky glass
 * header and a tinted Team column, Cradle replacement as a split card in
 * the Cradle colour, shared ClosingCta.
 *
 * v2.1 · 2026-09-19 · three-tier + feature matrix:
 * Founder-directed 2026-09-18 (verbatim):
 *   "we need to have pricing for non enterprise users we should have
 *    three levels of users at different levels different things are
 *    availabel we should show what is available and what isnt this is
 *    a standard saas pricing layout and logic."
 *   AND (separate): "if they lose or break tehre keys they should be
 *    able to place a order from the site for more."
 *
 * v1 was a single Enterprise tier per the older "no published pricing"
 * doctrine. v2 shifts to a 3-tier SaaS shape per the founder's directive
 * above. Current governing doctrine:
 * `feedback_nebbos_three_tier_published_pricing_2026_09_18` (supersedes
 * the 2026-08-24 Palantir/no-published-pricing rule).
 *
 * PRICING NUMBERS ($50 Starter/user · $200 Team/seat) · Founder-ratified
 * 2026-09-19 after cost-inventory pass (baseline COGS ~$520-870/mo, per-
 * seat unit economics at 100 seats ~$8-17/mo, so $50 and $200 both clear
 * ADR-332's `price ≥ cost × 2.0` hard floor + 80% blended margin target
 * at realistic seat counts above ~30). NOTE: the per-seat SaaS shape is
 * a DE-FACTO amendment to ADR-332 §10.2 (which mandates $0 platform fee
 * + $0 seats + support/SLA ladder). Amendment ADR-PROV needs formal
 * filing to reconcile the doctrine conflict — flagged in message board
 * for a governance-authoring session to pick up.
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

const TIER_LEVEL = { starter: "L1", team: "L2", enterprise: "L3" } as const;

const TIERS = [
  {
    key: "starter",
    name: "Starter",
    tier: "L1 · Guest",
    price: "$50",
    period: "per user, per month",
    priceNote: "",
    deck:
      "One operator. Biometric-only. Dashboard, personal-scope reads, low-risk tool calls.",
    cta: { label: "Book a Starter demo", href: "/demo?tier=starter" },
    ctaVariant: "ghost" as const,
    featured: false,
  },
  {
    key: "team",
    name: "Team",
    tier: "L2 · Host",
    price: "$200",
    period: "per seat, per month",
    priceNote: "",
    deck:
      "Small team. Biometric + Cradle presence. Shell writes, memory registers, admin ops within your team.",
    cta: { label: "Book a Team demo", href: "/demo?tier=team" },
    ctaVariant: "primary" as const,
    featured: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tier: "L3 · Architect",
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

const cellBase = "m-0 max-w-none px-4 py-3.5 text-[14px]";

function Cell({ v, tier }: { v: boolean | string; tier: string }) {
  const col = cn(cellBase, "text-center", tier === "Team" && "bg-accent/[0.05]");
  if (v === true) {
    return (
      <p className={col} data-tier={tier}>
        <span className="inline-grid size-6 place-items-center rounded-full bg-accent/15 text-[13px] text-accent">✓</span>
      </p>
    );
  }
  if (v === false || v === "—") {
    return (
      <p className={col} data-tier={tier}>
        <span className="text-ink-3">—</span>
      </p>
    );
  }
  return (
    <p className={col} data-tier={tier}>
      {v}
    </p>
  );
}

const row = "grid grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] items-center";
const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");

export default function PricingPage() {
  return (
    <>
      <PageHero
        id="pricing-h"
        eyebrow="Pricing"
        title="Three tiers. Enterprise on a call."
        deck={
          <>
            Solo operators start on Starter. Teams add the Cradle and
            scale to Team. Organizations sign an Enterprise agreement
            for cross-team, air-gapped, or federated deployment.
          </>
        }
        ctas={
          <>
            <PrimaryCta href="#tiers">See the tiers</PrimaryCta>
            <GhostCta href="#compare">Compare features</GhostCta>
          </>
        }
      />

      {/* TIER CARDS */}
      <Section labelledBy="tiers-h" id="tiers" className="scroll-mt-16">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>The tiers</Eyebrow>
          <h2 id="tiers-h" className={h2}>
            <RevealWords>Pick the tier that fits your shift.</RevealWords>
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5" step={0.1}>
          {TIERS.map((t) => (
            <StaggerItem key={t.key} className={cn(t.featured && "lg:-mt-4 lg:mb-4")}>
              <div className={cn("h-full rounded-bezel", t.featured && "beam-border")}>
                <article
                  className={cn(
                    "spotlight relative flex h-full flex-col overflow-hidden rounded-bezel p-7 ring-1 ring-inset md:p-8",
                    t.featured
                      ? "bg-gradient-to-b from-accent/[0.12] via-ground-2 to-ground-2 ring-accent/30 shadow-[0_40px_90px_-40px_rgb(255_107_30/0.55)]"
                      : "bg-ground-2 ring-rule",
                  )}
                  aria-labelledby={`tier-${t.key}-h`}
                >
                  {t.featured && <span aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-60" />}
                  <div className="relative flex items-center justify-between">
                    <p className="m-0 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">{t.tier}</p>
                    <TierMeter tier={TIER_LEVEL[t.key as keyof typeof TIER_LEVEL]} tint="var(--color-accent)" />
                  </div>
                  <h3 id={`tier-${t.key}-h`} className="relative m-0 mt-5 font-display text-3xl font-medium tracking-tight text-ink">
                    {t.name}
                  </h3>
                  <div className="relative mt-6 min-h-[96px]">
                    <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.03em] text-ink">
                      {t.price}
                      {t.period && <span className="font-code text-[12px] font-normal tracking-[0.08em] text-ink-3">{t.period}</span>}
                    </p>
                    {t.priceNote && <p className="m-0 mt-3 text-[13px] text-ink-3">{t.priceNote}</p>}
                  </div>
                  <p className="relative m-0 mt-4 border-t border-rule pt-5 text-[15px] leading-relaxed text-ink-2">{t.deck}</p>
                  <div className="relative mt-auto pt-8">
                    {t.ctaVariant === "primary" ? (
                      <PrimaryCta href={t.cta.href}>{t.cta.label}</PrimaryCta>
                    ) : (
                      <GhostCta href={t.cta.href}>{t.cta.label}</GhostCta>
                    )}
                  </div>
                </article>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* COMPARISON MATRIX */}
      <Section labelledBy="compare-h" id="compare" className="scroll-mt-16">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>What&rsquo;s included</Eyebrow>
          <h2 id="compare-h" className={h2}>
            <RevealWords>Compare tier by tier.</RevealWords>
          </h2>
        </Reveal>

        <Reveal className="mt-14" amount={0.05}>
          <div className="rounded-bezel ring-1 ring-rule ring-inset max-md:overflow-x-auto" aria-label="Tier feature comparison">
            <div className="max-md:min-w-[640px]">
              <div className={cn(row, "glass z-10 rounded-t-bezel border-b border-rule-2 bg-ground-2/85 backdrop-blur-xl md:sticky md:top-[76px]")}>
                <p className={cn(cellBase, "py-5 font-code text-[11px] uppercase tracking-label text-ink-3")}>Feature</p>
                <p className={cn(cellBase, "py-5 text-center font-display text-[15px] font-medium text-ink")}>Starter</p>
                <p className={cn(cellBase, "bg-accent/[0.08] py-5 text-center font-display text-[15px] font-medium text-accent")}>Team</p>
                <p className={cn(cellBase, "py-5 text-center font-display text-[15px] font-medium text-ink")}>Enterprise</p>
              </div>
              {MATRIX_GROUPS.map((g) => (
                <div key={g.group}>
                  <div className={cn(row, "border-b border-rule bg-white/[0.02]")}>
                    <p className={cn(cellBase, "pt-6 font-code text-[11px] font-medium uppercase tracking-label text-ink")}>{g.group}</p>
                    <p className={cellBase} />
                    <p className={cn(cellBase, "self-stretch bg-accent/[0.05]")} />
                    <p className={cellBase} />
                  </div>
                  {g.rows.map((r) => (
                    <div key={r.feature} className={cn(row, "border-b border-rule transition-colors duration-300 last:border-b-0 hover:bg-white/[0.03]")}>
                      <p className={cn(cellBase, "text-ink-2")}>{r.feature}</p>
                      <Cell v={r.starter} tier="Starter" />
                      <Cell v={r.team} tier="Team" />
                      <Cell v={r.enterprise} tier="Enterprise" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CRADLE REPLACEMENT ORDER */}
      <Section labelledBy="cradle-h">
        <Reveal className="bezel" amount={0.25}>
          <div
            className="bezel-core grid items-center gap-10 overflow-hidden p-8 md:p-12 lg:grid-cols-[1.3fr_1fr]"
            style={{ "--tint": "var(--color-cradle)" } as CSSProperties}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-cradle opacity-20 blur-[110px]"
            />
            <header className="relative flex flex-col items-start gap-6">
              <Eyebrow>Lost or damaged Cradle</Eyebrow>
              <h2 id="cradle-h" className={h2}>
                <RevealWords>Order a replacement Cradle.</RevealWords>
              </h2>
              <p className={deck}>
                Team and Enterprise customers can order a replacement Cradle
                at cost. Ships to the address on file within 3 business
                days. Old device serial is retired from your organization&rsquo;s
                attestation chain at replacement issue.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <PrimaryCta
                  href={`mailto:${CONTACT.enterprise}?subject=Cradle%20replacement%20request&body=Serial%20of%20lost%2Fdamaged%20device%3A%20%0AShipping%20address%3A%20%0AOrganization%3A%20%0ATier%3A%20%0A`}
                >
                  Request replacement
                </PrimaryCta>
                <GhostCta href="/contact">Talk to support</GhostCta>
              </div>
            </header>
            <div className="relative mx-auto hidden w-full max-w-[320px] lg:block">
              <ProductEmblem tint="var(--color-cradle)" />
            </div>
          </div>
        </Reveal>
      </Section>

      <ClosingCta
        id="close-h"
        eyebrow="Not sure which tier"
        title="Book thirty minutes. We map the fit."
        deck={
          <>
            Bring one department. We show you which tier answers the
            shape of your operation and quote the pilot on the call.
          </>
        }
        primary={{ href: "/demo", label: "Book a demo" }}
        secondary={{ href: `mailto:${CONTACT.enterprise}`, label: "Email enterprise" }}
      />
    </>
  );
}
