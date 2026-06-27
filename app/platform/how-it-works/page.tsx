import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile, Panel, Chip } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  path: "/platform/how-it-works",
  description:
    "From connecting your stack to your first prediction: how Nebbos goes live in days, not quarters — connect, observe, predict, act, with nothing for your teams to adopt.",
});

const steps = [
  { k: "01", phase: "Connect", title: "Link the stack you already run", body: "Existing tools connect through secure connectors. Nebbos reads the events they already emit — tasks, messages, calendars, handoffs, tickets, deploys — and never replaces the systems they live in. There's nothing new for teams to log into." },
  { k: "02", phase: "Observe", title: "The graph builds itself", body: "From day-one data, the Operational Graph maps how work actually moves between teams — who depends on whom, where it stalls, how long a handoff usually takes. It holds the shape of work: patterns, thresholds, relationships and timing, not the contents of your messages." },
  { k: "03", phase: "Predict", title: "Your first Pearl surfaces the risk", body: "Once there's enough signal, deterministic detectors run continuously against the graph. When one fires, the Pearl for that department reasons about it and surfaces what's about to go wrong — in plain language, with a confidence score and a \"why\" you can open." },
  { k: "04", phase: "Act", title: "You decide; the system learns", body: "Pearl proposes the next best action. You approve, edit or decline — and anything consequential pauses for a person. Every decision and its rationale is written back to the graph, so the system sharpens around how your organisation actually works." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Live in days, not quarters."
        lead="Nebbos reads from the stack you already run. Nothing for your teams to adopt, no new place for them to log work — connect your tools, and your first prediction follows from the signal that's already there."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform/architecture" variant="ghost">See the architecture →</ButtonLink>
        </div>
      </PageHero>

      {/* FOUR STEPS */}
      <Section divider>
        <p className="eyebrow">End to end</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Connect. Observe. Predict. Act.</h2>
        <div className="grid grid-4" style={{ marginTop: 48 }}>
          {steps.map((s) => (
            <Tile key={s.k} label={`${s.k} · ${s.phase}`} title={s.title}>{s.body}</Tile>
          ))}
        </div>
      </Section>

      {/* LIVE IN DAYS */}
      <Section divider>
        <p className="eyebrow">Nothing to adopt</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          There&rsquo;s no rollout. It reads the stack you already use.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Most operational software asks your teams to change how they work — a new board to update,
          a new ritual to keep alive, months of adoption before anything pays off. Nebbos asks for none
          of that. It reads the events your tools already produce, so the people doing the work carry
          on exactly as they were.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "60ch" }}>
          Because the signal is already flowing, the graph starts forming the moment you connect, and
          your first useful prediction follows in days. There&rsquo;s no data-entry tax, no parallel
          system to maintain, and nothing that goes stale the week everyone gets busy.
        </p>
      </Section>

      {/* SAMPLE PEARL */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">What a prediction looks like</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "16ch" }}>
              A firing pattern, explained — and a move you can approve.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "50ch" }}>
              When a detector fires, the Pearl for that department doesn&rsquo;t just raise an alert. It
              reasons over the graph, names the cause, and proposes the next best action — with the
              evidence attached, so you can act on it or set it aside in seconds.
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
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            See your first prediction on your own data.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/platform" variant="ghost">Back to the platform</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
