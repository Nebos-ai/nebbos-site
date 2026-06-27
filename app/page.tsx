import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile, Panel, Chip } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";
import { APP_URL } from "@/lib/site";

export const metadata = pageMetadata({ path: "/" });

const fiveQuestions = [
  {
    q: "Q1 — Signal",
    title: "What's happening right now.",
    body: "Connect the tools your teams already use. Nebbos turns the daily exhaust of work into one clean, normalised stream of operational events. No rip-and-replace.",
  },
  {
    q: "Q2 — Prediction",
    title: "What's about to go wrong.",
    body: "Deterministic pattern detection runs first — deadline risk, capacity crunch, stalled handoffs, cascade risk. Only when a pattern fires does Nebbos reason about it. Cheap to watch, sharp when it counts.",
  },
  {
    q: "Q3 — Reasoning",
    title: "Why it's going wrong.",
    body: "A dedicated agent for each department works through the signal and tells you the cause in plain language, with the evidence attached. You see the reasoning, not just a red flag.",
  },
  {
    q: "Q4 — Action",
    title: "What to do about it.",
    body: "Nebbos can act — but the riskier moves are rehearsed in a sandbox first, then passed to a human checkpoint. Autonomy is earned, bounded to what's been proven, and always reversible.",
  },
  {
    q: "Q5 — Learning",
    title: "What you've learned.",
    body: "Everything observed and resolved compounds into your Operational Graph — a living record of how your organisation actually runs, richer every week it's on.",
  },
];

const audiences = [
  { dep: "Operations / COO", title: "Stop finding out on Friday.", body: "The stalled handoff and the slipping deadline surface while you can still move on them — not in next week's post-mortem." },
  { dep: "Engineering / CTO", title: "Six checks before one token.", body: "Model-agnostic by design. Deterministic detection runs first; it works with any LLM, locked to none — over a dashboard and an MCP interface." },
  { dep: "Finance / CFO", title: "Worth more next year.", body: "Predictable cost on top of whatever model you run, and the rare tool that compounds instead of depreciating." },
  { dep: "Risk / Legal", title: "It never acts alone.", body: "Five enforcement layers, every decision sourced, built to the EU AI Act's high-risk bar — not retrofitted to it." },
  { dep: "Department leads", title: "A colleague who did the homework.", body: "Pearl arrives caught up and asks why the date moved — never how you feel. One agent per team." },
  { dep: "The whole company", title: "One source of operational truth.", body: "Everyone acting on the same live read of how the work is actually moving — not five conflicting dashboards." },
];

const steps = [
  { n: "01", title: "Connect", body: "Link existing tools through secure connectors. Nebbos reads events — never replaces the systems they live in." },
  { n: "02", title: "Observe", body: "Your Operational Graph builds itself from day-one data, learning how work really moves." },
  { n: "03", title: "Predict", body: "As soon as there's enough signal, your first Pearl surfaces what's about to go wrong — with reasoning attached." },
  { n: "04", title: "Act", body: "You approve, edit or decline. Every decision and its rationale is recorded — and the system sharpens." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="glow" style={{ width: 520, height: 520, background: "var(--blue-deep)", top: -180, right: -120 }} aria-hidden />
        <div className="glow" style={{ width: 420, height: 420, background: "var(--blue)", bottom: -220, left: -140, opacity: 0.35 }} aria-hidden />
        <div className="container" style={{ position: "relative" }}>
          <p className="eyebrow">Operations Intelligence</p>
          <h1 style={{ marginTop: 20, maxWidth: "19ch" }}>
            Dashboards tell you what already broke. Nebbos tells you what&rsquo;s{" "}
            <span className="text-blue">about to</span>.
          </h1>
          <p className="lead" style={{ marginTop: 28, maxWidth: "50ch" }}>
            Your tools already emit the early signs of how your company really runs. Nebbos reads
            that signal as it happens — the stalled handoff, the slipping deadline, the capacity
            crunch forming three teams away — and puts the fix in front of you while you can still use it.
          </p>
          <p className="mono" style={{ marginTop: 28, color: "var(--mist)", letterSpacing: "0.04em", fontSize: 14 }}>
            Signal → Prediction → Reasoning → Action → Learning
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <ButtonLink href="/demo" variant="primary">
              Book a demo →
            </ButtonLink>
            <ButtonLink href={APP_URL} variant="ghost" external>
              Log in to Nebbos →
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* THESIS */}
      <Section divider>
        <p className="eyebrow">The idea</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(30px,4.4vw,56px)", maxWidth: "16ch" }}>
          Most software remembers. <span className="text-blue">Nebbos predicts.</span>
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "60ch" }}>
          Every organisation runs on five questions: what&rsquo;s happening, what&rsquo;s about to
          go wrong, why, what to do, and what it just learned. Nebbos answers them in order — each
          built on the one beneath it — and shows its work as it goes.
        </p>
      </Section>

      {/* FIVE QUESTIONS */}
      <Section divider>
        <p className="eyebrow">End to end</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)" }}>The five questions, in order.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {fiveQuestions.map((s) => (
            <Tile key={s.q} label={s.q} title={s.title}>
              {s.body}
            </Tile>
          ))}
        </div>
      </Section>

      {/* WHO IT'S FOR */}
      <Section divider>
        <p className="eyebrow">Who it&rsquo;s for</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "20ch" }}>
          Everyone in the company needs something different.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "56ch" }}>
          One signal, read five ways. The same Operational Graph answers the question each person is actually asking.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {audiences.map((a) => (
            <Tile key={a.dep} label={a.dep} title={a.title}>
              {a.body}
            </Tile>
          ))}
        </div>
      </Section>

      {/* PEARL */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "start", gap: 56 }}>
          <div>
            <p className="eyebrow">The agent</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "14ch" }}>
              Meet Pearl — one per department.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "46ch" }}>
              Pearl watches a single department&rsquo;s signal, surfaces only what&rsquo;s worth your
              attention, and asks at most a couple of sharp questions when it genuinely can&rsquo;t
              explain something. It never asks how you feel — it asks about the one data point it
              can&rsquo;t account for, then learns from your answer.
            </p>
            <div style={{ marginTop: 32 }}>
              <ButtonLink href="/pearl" variant="ghost">
                Explore Pearl →
              </ButtonLink>
            </div>
          </div>
          <Panel label="Pearl · Delivery">
            <p className="mist" style={{ marginTop: 12 }}>
              The Riverside handoff has waited 51 hours — past your 48-hour threshold. A downstream
              team&rsquo;s Friday commitment now can&rsquo;t be met. I can flag both leads and propose
              a revised date.
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <Chip lead>Approve</Chip>
              <Chip>Edit</Chip>
              <Chip>Not now</Chip>
            </div>
          </Panel>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section divider>
        <p className="eyebrow">Getting started</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)" }}>Live in days, not quarters.</h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "54ch" }}>
          Nebbos reads from the stack you already run. Nothing for your teams to adopt, no new place for them to log work.
        </p>
        <div className="grid grid-4" style={{ marginTop: 48 }}>
          {steps.map((s) => (
            <div key={s.n}>
              <div className="mono text-blue" style={{ fontSize: 14 }}>{s.n}</div>
              <h3 style={{ marginTop: 8, fontSize: 21 }}>{s.title}</h3>
              <p className="mist" style={{ marginTop: 8, fontSize: 15 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OVERSIGHT */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">Oversight &amp; governance</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "18ch" }}>
              Five layers stand between an idea and a change to your data.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "50ch" }}>
              A system that watches how people work is high-risk under the EU AI Act. Nebbos answers
              that with architecture, not a PDF: a human approval gate, every decision sourced, tenant
              isolation at the database, and governance tiers that decide what&rsquo;s even allowed to change anything.
            </p>
            <div style={{ marginTop: 32 }}>
              <ButtonLink href="/security" variant="ghost">
                See how Nebbos stays accountable →
              </ButtonLink>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Chip lead>Human approval gate</Chip>
            <Chip>5 enforcement layers</Chip>
            <Chip>Every decision sourced</Chip>
            <Chip>Tenant isolation · RLS</Chip>
            <Chip>Built to EU AI Act high-risk</Chip>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section divider>
        <div className="panel" style={{ textAlign: "center", padding: "56px 28px" }}>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,42px)", maxWidth: "40ch", marginInline: "auto" }}>
            See what your operations are about to do.
          </h2>
          <p className="mist" style={{ marginTop: 20, fontSize: 19 }}>
            Book a demo and we&rsquo;ll get your first Pearl watching your data.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <ButtonLink href="/demo" variant="light">
              Book a demo →
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Request access
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
