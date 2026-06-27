import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Operations",
  path: "/solutions/operations",
  description:
    "The stalled handoff and the slipping deadline surface while you can still move on them — not in next week’s post-mortem. Nebbos gives every lead one live read of how the work is actually moving.",
});

const watches = [
  { dep: "Handoff health", title: "Handoffs that go cold get chased", body: "A cross-team handoff sitting past its threshold, raised to the owner who can actually move on it — before it’s the line in the post-mortem that everyone nods at." },
  { dep: "Deadline & capacity risk", title: "The slip before it cascades", body: "Completion gaps measured against real capacity, and overlapping deadline pressure on one team, surfaced while there’s still time to reorder the work." },
  { dep: "One source of truth", title: "Everyone on the same live read", body: "Leads acting on one picture of how work is actually moving — not five dashboards that disagree and a status meeting to reconcile them." },
];

export default function OperationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Function · Operations"
        title="Stop finding out on Friday."
        lead="The stalled handoff and the slipping deadline are already visible in the systems you run — just not to anyone in time. Nebbos surfaces them while you can still move on them, and gives every lead one live read of how the work is actually moving."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">How it works</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          By the time it&rsquo;s on the board, it&rsquo;s already late.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          A handoff that sat unowned between two teams. A deadline that quietly moved when the work did.
          A team taking on more than its capacity while another sat idle. You find out in the post-mortem,
          when the only thing left to do is explain it. Nebbos watches the shape of the work &mdash;
          patterns, thresholds, relationships, timing &mdash; and raises the slip early, with the
          reasoning attached, so the owner can move while it still matters.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">What Nebbos watches</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>A Pearl on how the work actually moves.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {watches.map((w) => (
            <Tile key={w.dep} label={w.dep} title={w.title}>{w.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">How it stays cheap and accountable</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Deterministic first. A human on every consequential move.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Six deterministic detectors &mdash; deadline risk, capacity crunch, velocity drop, handoff
          stall, absence signal and cascade risk &mdash; run first and cost nothing to watch, so the
          everyday read of your operation never touches a model. When Nebbos proposes a move, the
          reasoning is sourced and a person signs off; autonomy is earned, bounded and reversible.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>Deterministic detectors first</Chip>
          <Chip>Sourced reasoning</Chip>
          <Chip>Human approval gate</Chip>
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on the work before it&rsquo;s a post-mortem.
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
