import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { MarketingDemoForm } from "@/components/forms/MarketingDemoForm";
import { RouteList } from "@/components/marketing/RouteList";
import { HudCorners, IndexMark } from "@/components/marketing/IndexMark";
import { Eyebrow, Section, deck, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
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
  { label: "Legal", email: CONTACT.legal, desc: "License, MSA, and policy questions." },
  { label: "Press", email: CONTACT.press, desc: "Journalist and analyst inquiries." },
];

const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");
const BEAT_TINT = ["var(--color-platform)", "var(--color-app)", "var(--color-mcp)", "var(--color-cradle)"];

export default function DemoPage() {
  return (
    <>
      <MarketingDemoForm />

      {/* What we'll cover */}
      <Section labelledBy="agenda-h">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>The thirty minutes</Eyebrow>
          <h2 id="agenda-h" className={h2}>
            <RevealWords>What we cover.</RevealWords>
          </h2>
          <p className={deck}>
            Four beats. No slide-deck. We open the platform and walk one
            department end to end.
          </p>
        </Reveal>
        <Stagger as="ol" className="m-0 mt-14 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" step={0.08}>
          {AGENDA.map((item, i) => (
            <StaggerItem
              key={i}
              as="li"
              className="spotlight group relative flex min-h-[220px] flex-col overflow-hidden rounded-bezel bg-ground-2 p-6 ring-1 ring-rule ring-inset"
            >
              <div style={{ "--tint": BEAT_TINT[i], "--spot": BEAT_TINT[i] } as CSSProperties} className="contents">
                <span aria-hidden className="grid-dots pointer-events-none absolute inset-0 opacity-60" />
                <HudCorners />
                <IndexMark index={i} total={AGENDA.length} />
                <p className="relative m-0 mt-auto pt-10 text-[16px] leading-relaxed text-ink-2">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Direct routing */}
      <Section labelledBy="routes-h">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Not a demo?</Eyebrow>
          <h2 id="routes-h" className={h2}>
            <RevealWords>Route direct to the right inbox.</RevealWords>
          </h2>
          <p className={deck}>
            Reply within one business day. Procurement, security,
            engineering — each has its own address.
          </p>
        </Reveal>
        <RouteList className="mt-14" routes={ROUTES.map((r) => ({ label: r.label, addr: r.email, desc: r.desc }))} />
      </Section>
    </>
  );
}
