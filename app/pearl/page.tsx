import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile, Panel, Chip } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pearl",
  path: "/pearl",
  description:
    "Pearl is the agent at the heart of Nebbos — one per department. It watches your signal, explains what it sees, and acts within bounds you set, with a human on every consequential call.",
});

const traits = [
  { dep: "Arrives prepared", title: "Researched before day one", body: "Each Pearl launches having studied best practice for its department and your industry, so it's useful from the first signal — not after months of training." },
  { dep: "Asks rarely", title: "One sharp question", body: "When it genuinely can't explain something, Pearl asks the one person who can — about the specific data point, never about how anyone feels." },
  { dep: "Shows its work", title: "Confidence you can see", body: "Every prediction carries a confidence score and a \"why\" you can open. Pearl would rather say \"I'm not sure yet\" than guess." },
];

const departments = [
  { dep: "Engineering", title: "Velocity & risk", body: "Velocity drops, stalled reviews, and cascade risk across delivery." },
  { dep: "Sales", title: "Pipeline signal", body: "Slipping commitments and capacity crunch, before the quarter shows it." },
  { dep: "Operations", title: "Handoff health", body: "Cross-team handoffs going cold past their threshold." },
  { dep: "HR", title: "Coverage gaps", body: "Unaccounted absence and coverage risk — surfaced to the lead, never the person." },
];

export default function PearlPage() {
  return (
    <>
      <PageHero
        eyebrow="The agent"
        title="Meet Pearl. One per department."
        lead="Pearl is the agent that turns your operational signal into foresight. It watches a single department, surfaces only what's worth your attention, explains what it sees, and acts within bounds you set — never without a human on the calls that matter."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">How the platform works</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">How Pearl works</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "18ch" }}>
          Sharp where it counts. Quiet everywhere else.
        </h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {traits.map((t) => (
            <Tile key={t.dep} label={t.dep} title={t.title}>{t.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">Human in the loop</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "16ch" }}>
              Autonomy is earned, bounded, and reversible.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "50ch" }}>
              Pearl starts by suggesting. As its predictions prove out, you can let it act on the
              smaller things on its own — within limits you set. Before it acts on anything that
              matters, it can rehearse the move against a private copy of your data; anything
              consequential then pauses for a person, and any action it takes can be undone.
            </p>
          </div>
          <Panel label="Pearl · Delivery">
            <p className="mist" style={{ marginTop: 12 }}>
              The Riverside handoff has waited 51 hours — past your 48-hour threshold. A downstream
              team&rsquo;s Friday commitment now can&rsquo;t be met. I can flag both leads and propose a revised date.
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <Chip lead>Approve</Chip>
              <Chip>Edit</Chip>
              <Chip>Not now</Chip>
            </div>
          </Panel>
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">One per department</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>A Pearl that knows your function.</h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "54ch" }}>
          Each Pearl is scoped to one department, so its attention is narrow and its judgement is
          specific. Add Pearls as you grow — they share what they learn where it&rsquo;s relevant.
        </p>
        <div className="grid grid-4" style={{ marginTop: 48 }}>
          {departments.map((d) => (
            <Tile key={d.dep} label={d.dep} title={d.title}>{d.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            Put a Pearl on your hardest department.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/platform" variant="ghost">How the platform works</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
