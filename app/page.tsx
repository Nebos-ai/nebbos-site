import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile, Panel, Chip } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";
import { APP_URL } from "@/lib/site";

export const metadata = pageMetadata({ path: "/" });

const rawProblems = [
  {
    dep: "Stateless",
    title: "It forgets everything.",
    body: "A raw model call starts from nothing every time — no memory of the last call, no grounding in how you work. So it drifts, and you end up re-explaining yourself on every request.",
  },
  {
    dep: "Ungoverned",
    title: "Nothing watches it.",
    body: "No record of what it decided, no control over what it can touch, no stop button. When something goes wrong you find out after, with nothing to point to.",
  },
  {
    dep: "Leaky",
    title: "Your data walks out the door.",
    body: "Whatever you send goes into the provider — where it can be mixed with everyone else's and used to train the next answer. Your private context becomes someone else's fuel.",
  },
];

const fixes = [
  {
    dep: "Memory",
    title: "It remembers across every call.",
    body: "Nebbos holds one living memory of how your operation actually works. Every call builds on the last; today builds on yesterday. The intelligence about your operation compounds for you — your data never does.",
  },
  {
    dep: "Governance · Tideline",
    title: "Every call controlled and on the record.",
    body: "Tideline is the line every call has to stay inside. Each one is checked, written to a record that can't be altered, and stoppable — a person can halt the system at any moment. Pearls do the work; Tideline is the line they never cross.",
  },
  {
    dep: "Sovereignty",
    title: "Your data stays sealed to you.",
    body: "Any provider, any country, swapped whenever a better one appears — no lock-in. Your data is never mixed with another customer's and never used to serve or train for anyone else. It stays yours, end to end.",
  },
];

const buildOn = [
  { dep: "Any model", title: "Bring whatever you connect to today.", body: "Point Nebbos at any provider or any country, swap whenever you want. The same memory, governance and sovereignty apply no matter what's behind the call — you're never locked to one." },
  { dep: "Every customer sealed", title: "Multi-tenant sovereignty, built in.", body: "Ship to your own customers on a foundation that keeps each one's data sealed and isolated — never mixed, never used to train for the next. The hard part of trustworthy AI is already poured." },
  { dep: "Governed by default", title: "An audit trail and a stop button, for free.", body: "Every call your product makes arrives controlled, recorded on an unalterable trail, and stoppable. You ship the feature; the accountability comes with the foundation." },
];

const fiveQuestions = [
  {
    q: "Q1 — Signal",
    title: "What's happening right now.",
    body: "Nebbos turns the daily exhaust of work into one clean, normalized stream of operational events — read straight from the tools your teams already use.",
  },
  {
    q: "Q2 — Prediction",
    title: "What's about to go wrong.",
    body: "Continuous pattern detection runs first — deadline risk, capacity crunch, stalled handoffs, cascade risk. Only when a pattern fires does Nebbos reason about it. Cheap to watch, sharp when it counts.",
  },
  {
    q: "Q3 — Reasoning",
    title: "Why it's going wrong.",
    body: "A Pearl for each department works through the signal and tells you the cause in plain language, with the evidence attached. You see the reasoning, not just a red flag.",
  },
  {
    q: "Q4 — Action",
    title: "What to do about it.",
    body: "Nebbos can act — but the riskier moves are rehearsed in a sandbox first, then passed to a human checkpoint. Autonomy is earned, bounded to what's been proven, and always reversible.",
  },
  {
    q: "Q5 — Learning",
    title: "What you've learned.",
    body: "Everything observed and resolved compounds into one living memory of how your organization actually runs — richer every week it's on.",
  },
];

const industries = [
  { href: "/solutions/k12", dep: "Example", title: "K-12 Education", body: "Districts surface the coverage gap and the missed deadline before they reach a family." },
  { href: "/solutions/healthcare", dep: "Example", title: "Healthcare", body: "Coordination across shifts, handoffs and compliance, with the data handling a clinical setting demands." },
  { href: "/solutions/financial-services", dep: "Example", title: "Financial Services", body: "Operational risk and control workflows, every decision sourced and audit-ready." },
  { href: "/solutions/public-sector", dep: "Example", title: "Public Sector", body: "Accountable, sourced, reversible — built for the transparency public bodies are held to." },
  { href: "/solutions/manufacturing", dep: "Example", title: "Manufacturing", body: "Cross-team handoffs and capacity crunch across production and supply." },
  { href: "/solutions", dep: "And more", title: "Your industry too", body: "If your work runs on coordination — and any work that touches AI does — the foundation fits. See every industry and function." },
];

const steps = [
  { n: "01", title: "Connect", body: "Point Nebbos at your models and link the tools you already run through secure connectors. Nothing gets ripped out." },
  { n: "02", title: "Remember", body: "Your living memory builds itself from day-one data, so every call is grounded in how your operation actually works." },
  { n: "03", title: "Govern", body: "Every call runs inside Tideline — controlled, recorded on an unalterable trail, stoppable, and sealed to you." },
  { n: "04", title: "Compound", body: "The longer it runs, the sharper it gets about your operation. Intelligence compounds for you; your data never does." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — the message leads: Intelligence that compounds */}
      <section className="page-hero">
        <div className="glow" style={{ width: 520, height: 520, background: "var(--blue-deep)", top: -180, right: -120 }} aria-hidden />
        <div className="glow" style={{ width: 420, height: 420, background: "var(--blue)", bottom: -220, left: -140, opacity: 0.35 }} aria-hidden />
        <div className="container" style={{ position: "relative" }}>
          <p className="eyebrow">The foundation for AI you can trust</p>
          <h1 style={{ marginTop: 20, maxWidth: "20ch" }}>
            Intelligence that <span className="text-blue">compounds</span>. Your data never does.
          </h1>
          <p className="lead" style={{ marginTop: 28, maxWidth: "58ch" }}>
            Nebbos sits between your app and any AI model, so every call gains three things a raw model
            call never has: <strong>memory</strong>, so the intelligence about your operation compounds
            for you; <strong>governance</strong> — Tideline keeps every call in bounds, on the record, and
            stoppable; and <strong>sovereignty</strong>, so your data stays sealed, on any provider, with
            no lock-in. For anyone connecting to any model, in any industry.
          </p>
          <p className="mono" style={{ marginTop: 28, color: "var(--mist)", letterSpacing: "0.04em", fontSize: 14 }}>
            Memory → Governance → Sovereignty · any model, any provider
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

      {/* TWO PATHS — both flow from compounding intelligence */}
      <Section divider>
        <p className="eyebrow">One foundation, two ways to use it</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "24ch" }}>
          Run your organization on AI — or build your AI on Nebbos.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "60ch" }}>
          Both start from the same idea: intelligence that compounds for you while your data stays
          sealed. Underneath, the same memory, governance and sovereignty apply to every call. On top,
          two paths.
        </p>
        <div className="grid grid-2" style={{ marginTop: 48, gap: 40 }}>
          <Tile label="Run your organization on AI" title="AI running your operations">
            Our flagship application, Pearls, watches how your organization actually runs and tells you
            what&rsquo;s about to go wrong, why, and what to do — under your oversight. One specialist
            agent per department, getting sharper about your operation every day.
          </Tile>
          <Tile label="Build your AI on Nebbos" title="Your product on a foundation that holds">
            Building your own AI product? Put it on a foundation that remembers across calls, governs
            every one, and keeps each of your customers&rsquo; data sovereign — any model, any provider.
            Ship the feature; the hard part is already poured.
          </Tile>
        </div>
      </Section>

      {/* THE PROBLEM — raw LLM calls are stateless, ungoverned, leaky */}
      <Section divider>
        <p className="eyebrow">The problem with raw AI</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "22ch" }}>
          A call straight to a model leaves you exposed three ways.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "58ch" }}>
          It doesn&rsquo;t matter which provider you connect to or what you&rsquo;re building on top of
          it. The moment your app talks to a model directly, you inherit all three of these at once.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {rawProblems.map((p) => (
            <Tile key={p.dep} label={p.dep} title={p.title}>
              {p.body}
            </Tile>
          ))}
        </div>
      </Section>

      {/* THE FIX — memory, governance (Tideline), sovereignty, on every call */}
      <Section divider>
        <p className="eyebrow">What Nebbos adds</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "20ch" }}>
          One layer that fixes all three — on every call.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "58ch" }}>
          Put Nebbos between your app and the models. Every call you make passes through it and comes
          back with memory, governance and sovereignty already attached — nothing for you to wire up
          each time.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {fixes.map((f) => (
            <Tile key={f.dep} label={f.dep} title={f.title}>
              {f.body}
            </Tile>
          ))}
        </div>
      </Section>

      {/* LIVING MEMORY — the differentiator */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">The living memory</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "18ch" }}>
              It knows how you work — so it doesn&rsquo;t drift.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "52ch" }}>
              Hand a raw model a job with more than a few steps and it starts from nothing every time — no
              memory of the last step, no grounding in how you work. So it drifts, and you end up
              re-explaining yourself.
            </p>
            <p className="mist" style={{ marginTop: 16, fontSize: 19, maxWidth: "52ch" }}>
              Nebbos holds <strong>one living memory of how your organization actually works</strong> —
              every decision, every process, remembered in detail, so nothing is lost. Every step builds
              on the last, and today builds on yesterday. You get a system that already knows you, not a
              tool you have to brief from scratch each time.
            </p>
            <div style={{ marginTop: 32 }}>
              <ButtonLink href="/platform" variant="ghost">
                How the platform works →
              </ButtonLink>
            </div>
          </div>
          <Panel label="One living memory">
            <div className="grid grid-2" style={{ marginTop: 16, gap: 16 }}>
              {[
                ["Every decision", "what was chosen, and why"],
                ["Every process", "how work actually moves here"],
                ["Through time", "today builds on yesterday"],
                ["Nothing lost", "no starting from zero again"],
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

      {/* INTELLIGENCE THAT COMPOUNDS — sovereignty + Tideline */}
      <Section divider>
        <p className="eyebrow">Your data stays yours</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(30px,4.6vw,58px)", maxWidth: "16ch" }}>
          Intelligence that <span className="text-blue">compounds</span>.
        </h2>
        <div className="grid grid-2" style={{ marginTop: 40, alignItems: "start", gap: 56 }}>
          <div>
            <p className="mist" style={{ fontSize: 19, maxWidth: "52ch" }}>
              Every day, Nebbos gets smarter about <em>your</em> organization — it learns how you work,
              so the longer it runs, the more it&rsquo;s worth to you. The intelligence about your
              operation compounds for you.
            </p>
            <p className="mist" style={{ marginTop: 16, fontSize: 19, maxWidth: "52ch" }}>
              Your data never does. It stays sealed to you — never mixed with another customer&rsquo;s,
              never used to serve or train for anyone else. The system gets sharper at running your
              business without your information ever becoming the fuel for someone else&rsquo;s answer.
            </p>
            <div style={{ marginTop: 32 }}>
              <ButtonLink href="/security" variant="ghost">
                See how your data stays sealed →
              </ButtonLink>
            </div>
          </div>
          <div>
            <p className="eyebrow">Tideline</p>
            <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "50ch" }}>
              Pearls do the work. <strong>Tideline</strong> is the line they never cross. Sealing
              isn&rsquo;t a setting you can forget to turn on — it&rsquo;s enforced in the foundation, by
              the database itself. Every change is written to a record that can&rsquo;t be altered, and
              you can stop the system at any moment.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Chip lead>Sealed to you</Chip>
              <Chip>Never mixed with another customer&rsquo;s</Chip>
              <Chip>Never used to serve anyone else</Chip>
              <Chip>Enforced by the database</Chip>
              <Chip>An unalterable record of every change</Chip>
              <Chip>You can stop it anytime</Chip>
            </div>
          </div>
        </div>
      </Section>

      {/* BUILD ON NEBBOS — the builder / developer track */}
      <Section divider>
        <p className="eyebrow">Build on Nebbos</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "22ch" }}>
          Building on an AI model? Put it on a foundation that holds.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "62ch" }}>
          If your app talks to an AI model, you&rsquo;re solving memory, governance and data isolation
          yourself — over and over, for every customer. Build on Nebbos instead: a foundation that
          remembers, governs, and keeps every customer&rsquo;s data sovereign, on any model, any
          provider. You write the product; the trust comes with the ground you stand on.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {buildOn.map((b) => (
            <Tile key={b.dep} label={b.dep} title={b.title}>
              {b.body}
            </Tile>
          ))}
        </div>
        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
          <ButtonLink href="/platform" variant="ghost">
            See the platform →
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Talk to us about building on Nebbos →
          </ButtonLink>
        </div>
      </Section>

      {/* PEARL — the flagship application */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "start", gap: 56 }}>
          <div>
            <p className="eyebrow">The flagship application</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "16ch" }}>
              Meet Pearl — AI running your operations.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "46ch" }}>
              Pearls are the application we built on the foundation: one specialist agent per department.
              Each watches a single team&rsquo;s signal, surfaces only what&rsquo;s worth your attention,
              and asks at most a couple of sharp questions when it genuinely can&rsquo;t explain
              something. It never asks how you feel — it asks about the one data point it can&rsquo;t
              account for, then learns from your answer.
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

      {/* FIVE QUESTIONS — how the Pearls application works */}
      <Section divider>
        <p className="eyebrow">How Pearls work</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)" }}>The five questions, in order.</h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "60ch" }}>
          Every organization runs on five questions: what&rsquo;s happening, what&rsquo;s about to go
          wrong, why, what to do, and what it just learned. The Pearls application answers them in order —
          each built on the one beneath it, all on the same foundation — and shows its work as it goes.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {fiveQuestions.map((s) => (
            <Tile key={s.q} label={s.q} title={s.title}>
              {s.body}
            </Tile>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES — breadth proof, any industry */}
      <Section divider>
        <p className="eyebrow">Any industry</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "22ch" }}>
          Every industry that runs on AI runs on the same foundation.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "60ch" }}>
          Memory, governance and sovereignty aren&rsquo;t specific to one field — every organization
          that touches AI needs all three. Here are a few of the industries already building on Nebbos;
          they&rsquo;re examples, not limits.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {industries.map((i) => (
            <a key={i.href} href={i.href} style={{ display: "block" }}>
              <Tile label={i.dep} title={i.title}>{i.body}</Tile>
            </a>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section divider>
        <p className="eyebrow">Getting started</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)" }}>Live in days, not quarters.</h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "54ch" }}>
          Point Nebbos at your models and the stack you already run. Nothing for your teams to adopt, no
          new place for them to log work — and every call governed and sealed from day one.
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

      {/* COST */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">The cost story</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(28px,4vw,50px)", maxWidth: "18ch" }}>
              The same power, for a fraction of what AI costs anyone else.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 19, maxWidth: "50ch" }}>
              The hard, expensive part — the foundation that remembers, governs and seals every call — is
              already built. You build on top of it instead of rebuilding it yourself, so you pay for what
              you ship, not for plumbing.
            </p>
            <div style={{ marginTop: 32 }}>
              <ButtonLink href="/pricing" variant="ghost">
                See pricing →
              </ButtonLink>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Chip lead>The expensive part is built</Chip>
            <Chip>Any model, no lock-in</Chip>
            <Chip>Pay for what you ship</Chip>
            <Chip>Compounds instead of depreciating</Chip>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section divider>
        <div className="panel" style={{ textAlign: "center", padding: "56px 28px" }}>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,42px)", maxWidth: "40ch", marginInline: "auto" }}>
            Put your AI on a foundation that holds.
          </h2>
          <p className="mist" style={{ marginTop: 20, fontSize: 19 }}>
            Book a demo and we&rsquo;ll show you memory, governance and sovereignty on your own calls.
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
