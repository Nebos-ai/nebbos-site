import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manufacturing",
  path: "/solutions/manufacturing",
  description:
    "Production runs on dependencies — between teams, shifts and suppliers. Nebbos reads the signal those handoffs already emit and predicts where the crunch is forming, before it reaches the line.",
});

const watches = [
  { dep: "Handoffs", title: "The handoff that goes cold between shifts", body: "A shift-to-shift or team-to-team handoff sitting past its threshold, raised to the person who owns the next step — not lost across a changeover or a long weekend." },
  { dep: "Capacity crunch", title: "The crunch before it hits the floor", body: "Overlapping deadline pressure and a capacity gap landing on the same team at once — surfaced while there’s still room to move work, not after the schedule has already slipped." },
  { dep: "Cascade risk", title: "One commitment the next team can’t meet", body: "A dependency between teams, shifts or suppliers that’s quietly slipping — caught before it pulls a downstream step, and ultimately the line, off plan." },
  { dep: "Coordination", title: "One read across the dependency chain", body: "Shift leads, planners and supply coordinators acting on the same live picture of how work is moving between them — instead of reconciling it by radio at the start of every shift." },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Catch the capacity crunch before it reaches the line."
        lead="Production runs on dependencies — between teams, shifts and suppliers — and the early signs of a crunch are already in the systems you run. Nebbos reads that signal and puts the fix in front of the right lead before a slipping handoff stops the line."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">How it works</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          What stops the line is rarely one failure. It&rsquo;s a dependency nobody was watching.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          A handoff between shifts that went unconfirmed across a changeover. A commitment one team made
          that the next team can&rsquo;t meet. A supplier slip that lands on a team already at capacity.
          None of it shows up on a board until it&rsquo;s a stoppage or a missed ship date. Nebbos watches
          the dependencies between teams, shifts and suppliers and raises the crunch early &mdash; with
          the reasoning attached, so the lead knows what to move and why.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">What Nebbos watches</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>A Pearl on the dependencies that keep the line running.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {watches.map((w) => (
            <Tile key={w.dep} label={w.dep} title={w.title}>{w.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">It reads the stack you already run</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          No rip-and-replace on the floor.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Nebbos reads events from the systems your floor already uses and builds them into an
          Operational Graph — a live map of how work moves between teams, shifts and suppliers.
          Deterministic detectors run first and cost nothing to watch, so the everyday checks never
          touch a model. It stores the shape of the work &mdash; patterns, thresholds, relationships,
          timing &mdash; structured signal, not an archive of what was made.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>Reads your existing stack</Chip>
          <Chip>Deterministic detectors first</Chip>
          <Chip>Structured signal, not an archive</Chip>
          <Chip>Human approval gate</Chip>
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on the dependencies that keep your line moving.
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
