import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Architecture",
  path: "/platform/architecture",
  description:
    "Model-agnostic by design, cheap to run by architecture: deterministic detection first, governance-tiered routing across any provider, and a simulation gate before any consequential action.",
});

const pillars = [
  { k: "01", title: "Deterministic first", body: "Six detectors run continuously over the Operational Graph and cost nothing to watch — most of what happens never touches a model. A model call is the exception, raised only when a pattern fires, never the default." },
  { k: "02", title: "Tiered routing", body: "When a pattern does fire, governance-tiered routing sends the reasoning to the right model at the right price. Heavy reasoning goes to a capable model; routine work to a cheaper one. You set the policy, and the tiers — G0 to G3 — decide what needs more scrutiny." },
  { k: "03", title: "Any provider", body: "Nebbos works across LLMs and providers — no vendor lock-in, no single bill holding you hostage. Swap your model next quarter and nothing downstream breaks, because the graph and the detectors don't depend on whose model answered." },
  { k: "04", title: "The simulation gate", body: "Before any consequential action runs, Nebbos forks your current operational state, runs the action forward against that private copy, checks the outcome, and throws the copy away — so the real thing only ever sees a move that's already been tested." },
];

const detectors = [
  { k: "01", title: "Deadline risk", body: "Completion gap against capacity and a stalling velocity." },
  { k: "02", title: "Capacity crunch", body: "Overlapping deadline pressure across a dependency." },
  { k: "03", title: "Velocity drop", body: "A sharp week-on-week fall with deadlines still live." },
  { k: "04", title: "Handoff stall", body: "A cross-team handoff sitting past its threshold." },
  { k: "05", title: "Absence signal", body: "No activity where there should be, no leave on record." },
  { k: "06", title: "Cascade risk", body: "One team's commitment that a dependent team can't meet." },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        eyebrow="Architecture"
        title="Model-agnostic by design. Cheap to run by architecture."
        lead="Most AI products spend a model call on everything and hope the bill stays reasonable. Nebbos is built the other way around — deterministic detection first, a model call only when a pattern fires, and a simulation gate before anything consequential runs."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">How the platform works →</ButtonLink>
        </div>
      </PageHero>

      {/* FOUR PILLARS */}
      <Section divider>
        <p className="eyebrow">The four pillars</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>How it&rsquo;s put together.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {pillars.map((p) => (
            <Tile key={p.k} label={p.k} title={p.title}>{p.body}</Tile>
          ))}
        </div>
      </Section>

      {/* CHEAP TO RUN */}
      <Section divider>
        <p className="eyebrow">Cheap to run by architecture</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          Six detectors run before a single token is spent.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          The economics start with what doesn&rsquo;t cost anything. Six deterministic detectors —
          deadline risk, capacity crunch, velocity drop, handoff stall, absence signal and cascade
          risk — run continuously over the graph. Watching costs nothing; they&rsquo;re plain logic over
          structured signal, not a model deciding whether something matters.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "60ch" }}>
          A model call is the exception, not the rule. Only when a detector fires does Nebbos spend a
          model call to reason about the firing pattern — so the cost of intelligence tracks the number
          of real problems, not the volume of events flowing through your tools.
        </p>
        {/* FOUNDER-SIGNOFF: measured token reduction figure vs per-event-model baseline */}
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {detectors.map((d) => (
            <Tile key={d.k} label={d.k} title={d.title}>{d.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            See the architecture on your own data.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/platform/how-it-works" variant="ghost">How it works</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
