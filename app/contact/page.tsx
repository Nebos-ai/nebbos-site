import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CONTACT } from "@/content/contact";
import { PageHero } from "@/components/marketing/PageHero";
import { RouteList } from "@/components/marketing/RouteList";
import { Eyebrow, GhostCta, PrimaryCta, Section, deck, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

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

const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");
const OFFICE_TINT = ["var(--color-platform)", "var(--color-app)", "var(--color-mcp)"];

export default function ContactPage() {
  return (
    <>
      <PageHero
        id="contact-h"
        eyebrow="Contact"
        title="Route direct to the right inbox."
        deck={
          <>
            Seven addresses. Reply within one business day. Procurement,
            security, engineering — each has its own path so nothing waits
            behind a triage queue.
          </>
        }
        ctas={
          <>
            <PrimaryCta href="/demo">Book a demo</PrimaryCta>
            <GhostCta href={`mailto:${CONTACT.general}`}>Email general</GhostCta>
          </>
        }
      />

      {/* ROUTES */}
      <Section labelledBy="routes-h">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Direct routing</Eyebrow>
          <h2 id="routes-h" className={h2}>
            <RevealWords>Every address, its own path.</RevealWords>
          </h2>
        </Reveal>
        <RouteList className="mt-14" routes={ROUTES.map((r) => ({ label: r.label, addr: r.email, desc: r.desc }))} />
      </Section>

      {/* OFFICES */}
      <Section labelledBy="offices-h">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Offices</Eyebrow>
          <h2 id="offices-h" className={h2}>
            <RevealWords>Three entities. One company.</RevealWords>
          </h2>
          <p className={deck}>
            US parent for contracting. LA for product. Belgrade for
            engineering. Every entity signs and delivers.
          </p>
        </Reveal>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5" step={0.1}>
          {OFFICES.map((o, i) => (
            <StaggerItem
              key={o.label}
              className="spotlight relative flex min-h-[260px] flex-col overflow-hidden rounded-bezel bg-ground-2 p-7 ring-1 ring-rule ring-inset"
            >
              <div style={{ "--tint": OFFICE_TINT[i], "--spot": OFFICE_TINT[i] } as CSSProperties} className="contents">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(120%_80%_at_20%_0%,color-mix(in_srgb,var(--tint)_22%,transparent),transparent_70%)]"
                />
                <div className="relative">
                  <p className="m-0 font-code text-[11px] font-medium uppercase tracking-label text-tint">{o.label}</p>
                  <p className="m-0 mt-4 font-display text-2xl font-medium tracking-tight text-ink">{o.entity}</p>
                  <p className="m-0 mt-1 text-[14px] text-ink-3">{o.city}</p>
                </div>
                <p className="relative m-0 mt-auto pt-10 text-[15px] leading-relaxed text-ink-2">{o.role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
