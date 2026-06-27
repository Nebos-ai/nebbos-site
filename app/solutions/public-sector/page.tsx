import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Public Sector",
  path: "/solutions/public-sector",
  description:
    "Public bodies are accountable for every decision. Nebbos reads the signal coordination already emits, surfaces the risk early across teams and agencies, and records the full reasoning behind every action it proposes.",
});

const watches = [
  { dep: "Cross-agency coordination", title: "Handoffs that don’t fall between bodies", body: "A referral or case waiting on another team or agency, going cold past its threshold — raised to the person who owns the next step, not lost in a queue across an organizational boundary." },
  { dep: "Deadline risk", title: "Statutory dates that can’t slip", body: "Mandated response windows and service-level deadlines tracked against the work actually happening, so a date never surprises the team the week it’s due." },
  { dep: "Capacity crunch", title: "The crunch before the backlog", body: "Caseload and deadline pressure landing on the same team at once — surfaced while there’s still time to move work, not after the backlog reaches a citizen." },
  { dep: "Coordination", title: "One accountable read", body: "Service and oversight leads acting on the same live picture of how work is moving, instead of reconciling it across systems and reports by hand." },
];

const proof = [
  ["Sourced and queryable.", "Every action Nebbos proposes carries its reasoning — what was seen, what was decided, on what evidence, and why. Oversight is enforced in the architecture, not promised in a policy."],
  ["The shape of work, not the case file.", "Nebbos stores structured operational signal — patterns, thresholds, relationships, timing — not the contents of case records, correspondence or citizen data. It is a map of how work moves, not an archive of the people it serves."],
  ["A human on every consequential move.", "Nothing that affects a citizen or a service happens without a person signing off. Autonomy is earned over time, bounded to what’s been proven, and reversible — and the simulation gate rehearses a consequential action first."],
];

export default function PublicSectorPage() {
  return (
    <>
      <PageHero
        eyebrow="Public Sector"
        title="Accountable, sourced, reversible — built for the transparency you’re held to."
        lead="Public bodies are accountable for every decision — and the early signs of a service falling behind are already in the systems you run. Nebbos surfaces that coordination risk early across teams and agencies, and records the full reasoning behind every action it proposes."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">How we handle sensitive data</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          What lets a citizen down is rarely the decision. It&rsquo;s the handoff between two teams.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          A case waiting on another agency that no one chased. A statutory deadline that moved when the
          work did. A backlog forming on a team already at capacity. None of it shows up until it&rsquo;s
          a complaint, an overdue obligation or a question at oversight. Nebbos watches for exactly these
          patterns and raises them early &mdash; with the reasoning attached, so accountability is built
          in rather than reconstructed.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">What Nebbos watches</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>A Pearl on the work that keeps services moving.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {watches.map((w) => (
            <Tile key={w.dep} label={w.dep} title={w.title}>{w.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Built for the transparency you&rsquo;re held to</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Every action carries the reasoning that justifies it.
        </h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {proof.map(([t, d]) => (
            <Tile key={t} title={t}>{d}</Tile>
          ))}
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>Role-scoped access</Chip>
          <Chip>Structured signal, not records</Chip>
          <Chip>Human approval gate</Chip>
          <Chip>Full audit trail</Chip>
        </div>
        {/* honest-default: no public-sector accreditation found in nebos-governance; reframed to capability/design language, no named reference body asserted. */}
        <p className="mono faint" style={{ marginTop: 20, fontSize: 12 }}>
          Nebbos is built for the transparency public bodies operate under — sourced decisions, a full
          audit trail and role-scoped access by construction. Talk to us about data-residency options
          for your jurisdiction.
        </p>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on the coordination your service depends on.
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
