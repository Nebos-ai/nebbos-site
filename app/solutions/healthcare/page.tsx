import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Healthcare",
  path: "/solutions/healthcare",
  description:
    "Care runs on handoffs, coverage and compliance. Nebbos reads the signal those workflows already emit and surfaces the gap before it reaches a patient — with the data handling a clinical setting demands.",
});

const watches = [
  { dep: "Coverage & staffing", title: "Gaps before the shift starts", body: "A coverage hole forming across units, a handoff that never got confirmed, a rota that stopped adding up when one absence landed — surfaced to the charge lead while there's still time to fill it." },
  { dep: "Handoffs", title: "Continuity that doesn't drop", body: "Shift-to-shift and unit-to-unit handoffs going cold past their threshold, raised to the person who owns the next step — not lost in a queue over a long weekend." },
  { dep: "Compliance", title: "Deadlines that can't slip", body: "Mandated review windows, accreditation milestones and documentation deadlines tracked against the work actually happening, so a date never surprises you the week it's due." },
  { dep: "Coordination", title: "One read across the floor", body: "Leads acting on the same live picture of how work is moving between units, instead of reconciling it by phone at the start of every shift." },
];

const proof = [
  ["Sensitive signal goes to the lead.", "A coverage gap or a struggling handoff is routed to the staff member who can act on it, scoped by role at the database — never broadcast to the floor."],
  ["The shape of work, not the record.", "Nebbos stores structured operational signal — patterns, thresholds, relationships, timing — not the contents of clinical records or messages. It is a map of how work moves, not an archive of patient information."],
  ["A human on every consequential move.", "Nothing that affects care or a patient happens without a person signing off. Autonomy is earned over time, bounded to what's been proven, and reversible."],
];

export default function HealthcarePage() {
  return (
    <>
      <PageHero
        eyebrow="Healthcare"
        title="Coordination you can account for, shift after shift."
        lead="Care runs on handoffs, coverage and compliance — and the early signs of a problem are already in the systems you use. Nebbos reads that signal and puts the fix in front of the right person before it reaches a patient, with the data handling a clinical setting demands."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">How we handle sensitive data</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          What slips on a busy floor is rarely the big thing. It&rsquo;s the handoff nobody owned.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          A coverage gap that formed when one absence landed. A continuity handoff that sat unconfirmed
          across a shift change. A mandated review whose deadline moved when the case did. None of it
          shows up on a board until it&rsquo;s already a problem for a patient or an auditor. Nebbos
          watches for exactly these patterns and raises them early — with the reasoning attached.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">What Nebbos watches</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>A Pearl on the work that keeps care moving.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {watches.map((w) => (
            <Tile key={w.dep} label={w.dep} title={w.title}>{w.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Built for the trust a clinical setting demands</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Health data is the most sensitive signal there is. We treat it that way.
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
        {/* honest-default: no attested HIPAA certification found in nebos-governance; reframed to control/workflow language, no named reference customer asserted. */}
        <p className="mono faint" style={{ marginTop: 20, fontSize: 12 }}>
          Nebbos is designed for HIPAA-aligned clinical workflows — data minimisation, role-scoped
          access and a full audit trail by construction. Talk to us about a BAA and the controls for
          your setting.
        </p>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on the coordination that keeps your floor running.
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
