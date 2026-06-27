import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile, Panel } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Platform",
  path: "/platform",
  description:
    "One platform that answers the five questions every operation runs on: signal, prediction, reasoning, action and learning — built on the Operational Graph.",
});

const questions = [
  { k: "Q1", phase: "Signal", title: "What's happening right now", body: "Connectors read the events your tools already produce — tasks, messages, calendars, tickets, handoffs — and normalise them into one operational stream. Connect the stack you run; there's nothing new for teams to adopt." },
  { k: "Q2", phase: "Prediction", title: "What's about to go wrong", body: "Deterministic detectors run continuously and cost nothing to watch. Only when one fires does Nebbos spend a model call to reason about it — so prediction is both cheap and sharp." },
  { k: "Q3", phase: "Reasoning", title: "Why it's going wrong", body: "A Pearl — one per department — works through the firing pattern against the graph and returns the cause in plain language with the evidence attached. Each prediction carries a confidence score and a \"why\" you can open." },
  { k: "Q4", phase: "Action", title: "What to do about it", body: "Pearl proposes the next best action. Anything consequential pauses for a human checkpoint — autonomy is earned over time, bounded to what's been proven, and always reversible." },
  { k: "Q5", phase: "Learning", title: "What you've learned", body: "Every prediction, resolution and correction is written back to the Operational Graph. The system you run in month 24 has been shaped entirely around how your organization works." },
];

const detectors = [
  { k: "01", title: "Deadline risk", body: "Completion gap against capacity and a stalling velocity." },
  { k: "02", title: "Capacity crunch", body: "Overlapping deadline pressure across a dependency." },
  { k: "03", title: "Velocity drop", body: "A sharp week-on-week fall with deadlines still live." },
  { k: "04", title: "Handoff stall", body: "A cross-team handoff sitting past its threshold." },
  { k: "05", title: "Absence signal", body: "No activity where there should be, no leave on record." },
  { k: "06", title: "Cascade risk", body: "One team's commitment that a dependent team can't meet." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="The platform"
        title="One platform. Five questions. One source of operational truth."
        lead="Nebbos watches the work your organization already does and turns it into foresight — predicting where things break, explaining why, and acting under your oversight. It all runs on one thing: the Operational Graph."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform/architecture" variant="ghost">See the architecture →</ButtonLink>
        </div>
      </PageHero>

      {/* OPERATIONAL GRAPH */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">The mechanism</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "16ch" }}>The Operational Graph.</h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "52ch" }}>
              Underneath every answer is a living map of how your organization actually operates — who
              depends on whom, how work moves between teams, where it tends to stall. Nebbos builds it
              from the events your tools already emit, keeps it current as the work changes, and reasons over it.
            </p>
            <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "52ch" }}>
              It&rsquo;s a temporal map — it holds not just how things stand today but how they got
              there. And it stores structured signal — patterns, thresholds, relationships — never the
              raw contents of your messages. That&rsquo;s what makes its predictions specific to you, not generic.
            </p>
          </div>
          <Panel label="What the graph holds">
            <div className="grid grid-2" style={{ marginTop: 16, gap: 16 }}>
              {[
                ["Entities", "teams, people, projects, commitments"],
                ["Relationships", "dependencies, handoffs, ownership"],
                ["Signal", "velocity, capacity, thresholds"],
                ["Time", "how all of it changes, tracked"],
              ].map(([t, d]) => (
                <div key={t} style={{ borderLeft: "1px solid var(--hairline)", paddingLeft: 14 }}>
                  <b style={{ color: "var(--paper)" }}>{t}</b>
                  <br />
                  <span className="mist" style={{ fontSize: 15 }}>{d}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      {/* FIVE QUESTIONS */}
      <Section divider>
        <p className="eyebrow">End to end</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>The five questions, in order.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {questions.map((q) => (
            <Tile key={q.k} label={`${q.k} · ${q.phase}`} title={q.title}>{q.body}</Tile>
          ))}
        </div>
      </Section>

      {/* DETECTORS */}
      <Section divider>
        <p className="eyebrow">Deterministic first</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "18ch" }}>
          Six checks run before any AI cost is incurred.
        </h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {detectors.map((d) => (
            <Tile key={d.k} label={d.k} title={d.title}>{d.body}</Tile>
          ))}
        </div>
        {/* honest-default: no published token-reduction % exists; kept the qualitative claim (deterministic-first → far fewer model calls) with no specific number. */}
        <p className="mono faint" style={{ marginTop: 28, fontSize: 12 }}>
          Because the deterministic detectors do the watching, model calls track the number of real
          problems — not the volume of events — so far less AI cost is incurred than a
          model-call-per-event approach.
        </p>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            See the platform on your own data.
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
