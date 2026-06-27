import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Docs",
  path: "/docs",
  description:
    "An early overview of Nebbos: connectors, the agent interface, governance and approvals, and getting started. The full reference lands here ahead of launch.",
});

const topics = [
  { dep: "Connectors", title: "Read the stack you run", body: "Link the tools you already use through secure connectors. Nebbos reads the events they emit — tasks, messages, calendars, handoffs, tickets, deploys — and never replaces the systems they live in. The full connector reference and setup guides land here." },
  { dep: "Agent interface", title: "Drive Nebbos from your agents", body: "The same intelligence is available to your own agents and tools over a standard agent interface that works with any AI provider. Full API reference and examples land here." },
  { dep: "Governance & approvals", title: "Earned, bounded, reversible", body: "How the approval gate, the governance tiers and the simulation gate work in practice — and how to configure autonomy that's earned over time, bounded to what's proven, and always reversible." },
  { dep: "Getting started", title: "From connect to first prediction", body: "Connect your stack, stand up your first Pearl, and see your first prediction follow from the signal that's already there. A step-by-step guide lands here." },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title="Get started with Nebbos."
        lead="Connect your stack, stand up your first Pearl, and drive Nebbos's signal from your own agents over a standard interface. This is an early overview — the full reference is on its way ahead of launch."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform/how-it-works" variant="ghost">How it works →</ButtonLink>
        </div>
      </PageHero>

      {/* TOPICS */}
      <Section divider>
        <p className="eyebrow">What you&rsquo;ll find</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>The map, while the full reference lands.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {topics.map((t) => (
            <Tile key={t.dep} label={t.dep} title={t.title}>{t.body}</Tile>
          ))}
        </div>
      </Section>

      {/* HONEST PRE-LAUNCH NOTE */}
      <Section divider>
        <p className="eyebrow">Pre-launch</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          An overview today, the full doc set shortly.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Nebbos is early, and so is this page. What&rsquo;s here is an honest overview of how the product
          fits together — not yet the complete reference. The connector catalog, the agent API
          reference and the governance configuration guides are being written and will land here as
          they&rsquo;re ready.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "60ch" }}>
          In the meantime, a demo is the fastest way to see exactly how any of this works on your own
          stack — and to ask the specific questions a doc page can&rsquo;t yet answer.
        </p>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            Start with a demo.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/platform" variant="ghost">Explore the platform</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
