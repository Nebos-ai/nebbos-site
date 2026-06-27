import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Financial Services",
  path: "/solutions/financial-services",
  description:
    "Controls, approvals and operational risk run on coordination. Nebbos reads the signal those workflows already emit, surfaces where a control is about to stall, and keeps every decision sourced and audit-ready for the examiner.",
});

const watches = [
  { dep: "Control workflows", title: "Approvals that stall before they breach", body: "A sign-off sitting past its threshold, a four-eyes check that never got its second pair, a control step waiting on someone who's out — surfaced to the owner while the window is still open, with the reasoning attached." },
  { dep: "Operational risk", title: "The crunch forming across a process", body: "Overlapping deadline pressure and a capacity gap landing on the same team at the same time — caught before a backlog turns into a missed obligation." },
  { dep: "Cascade risk", title: "One commitment a dependent step can't meet", body: "A handoff between functions that's quietly slipping, raised before it pulls a downstream control or filing off schedule." },
  { dep: "Coordination", title: "One read across the operation", body: "Risk, compliance and operations leads acting on the same live picture of how controls are actually moving — not reconciling it after the fact." },
];

const proof = [
  ["Sourced by construction.", "What was decided, by whom, on what evidence, and why — recorded and queryable, every time. The audit trail is the system of record, not a report you assemble afterwards."],
  ["The shape of work, not the contents.", "Nebbos stores structured operational signal — patterns, thresholds, relationships, timing — not the contents of transactions, messages or records. It is a map of how work moves, not an archive of the business it moves."],
  ["A human on every consequential move.", "Nothing that affects a control, an approval or a customer happens without a person signing off. The simulation gate rehearses a consequential action against a private copy first, so you see the consequence before it's real."],
];

export default function FinancialServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Financial Services"
        title="Operational risk, surfaced and sourced before it’s an incident."
        lead="Controls, approvals and operational risk run on coordination — and the early signs of a breach are already in the systems you run. Nebbos reads that signal, puts the fix in front of the owner before the window closes, and keeps every decision audit-ready."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">How we handle sensitive data</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          Most control failures aren&rsquo;t a bad decision. They&rsquo;re an approval nobody chased.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          A sign-off that sat unactioned past its threshold. A reconciliation that slipped when one
          person was out. A control step waiting on a handoff that went cold across a function
          boundary. None of it shows up on a board until it&rsquo;s an exception an examiner can ask
          about. Nebbos watches for exactly these patterns and raises them early &mdash; with the
          reasoning attached, so the answer to &ldquo;why&rdquo; is already on file.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">What Nebbos watches</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>A Pearl on the work that keeps controls honest.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {watches.map((w) => (
            <Tile key={w.dep} label={w.dep} title={w.title}>{w.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Built for the scrutiny you operate under</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Bring the examiner. We built for the question before they asked it.
        </h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {proof.map(([t, d]) => (
            <Tile key={t} title={t}>{d}</Tile>
          ))}
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>Role-scoped access · RLS</Chip>
          <Chip>Structured signal, not records</Chip>
          <Chip>Human approval gate</Chip>
          <Chip>Full audit trail</Chip>
        </div>
        {/* honest-default: no attested SOC 2 / SOX certification found in nebos-governance; reframed to control/design language, no named reference customer asserted. */}
        <p className="mono faint" style={{ marginTop: 20, fontSize: 12 }}>
          Nebbos is engineered to the controls examiners look for — sourced decisions, a full audit
          trail and role-scoped access by construction. Talk to us about the evidence package for your
          regulatory framework.
        </p>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on the controls that keep your operation accountable.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/solutions" variant="ghost">See all solutions</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
