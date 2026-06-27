import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Press",
  path: "/press",
  description:
    "Press resources, brand assets and media contact for Nebbos — the Operations Intelligence company. About Nebbos boilerplate and fast facts for journalists.",
});

const facts = [
  { dep: "What it is", title: "Operations Intelligence", body: "Software that reads the operational signal your tools already emit, predicts what's about to go wrong, explains why, and acts under your approval." },
  { dep: "How it works", title: "Deterministic first, model-agnostic", body: "Deterministic detectors run before any model call, and reasoning routes to any provider — no vendor lock-in. A human signs off on every consequential move." },
  { dep: "The product", title: "Pearl, one per department", body: "Each Pearl watches a single department on the Operational Graph — the single source of operational truth — and surfaces only what's worth your attention." },
  { dep: "Stage", title: "Early-stage", body: "Nebbos is an early-stage product. We publish facts only once they're confirmed — no figures here that we can't stand behind." },
];

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Press"
        title="Press & media."
        lead="Nebbos builds Operations Intelligence — software that helps organisations see what's about to happen and act with their judgement intact. Resources for journalists are below."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/contact" variant="primary">Contact us →</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">How the platform works →</ButtonLink>
        </div>
      </PageHero>

      {/* ABOUT NEBBOS */}
      <Section divider>
        <p className="eyebrow">About Nebbos</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          The boilerplate, for when you need a line.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "62ch" }}>
          Nebbos builds Operations Intelligence — software that reads the operational signal your tools
          already emit, predicts what&rsquo;s about to go wrong, explains why, and acts under your approval,
          model-agnostic and governed by design.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "62ch" }}>
          It reads the shape of work — patterns, thresholds, relationships and timing — not the contents
          of your messages, and writes it to the Operational Graph: the single source of operational
          truth. Intelligence is delivered through Pearl, one agent per department, with a human on
          every consequential move and autonomy that&rsquo;s earned, bounded and reversible.
        </p>
      </Section>

      {/* MEDIA CONTACT */}
      <Section divider>
        <p className="eyebrow">Media contact</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          Talk to us.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          For press enquiries, reach us at{" "}
          <a href="mailto:hello@nebbos.ai" style={{ color: "var(--paper)", textDecoration: "underline" }}>
            hello@nebbos.ai
          </a>
          . We aim to come back to journalists quickly.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "60ch" }}>
          Brand assets and a downloadable press kit — logos, usage guidance and approved descriptions —
          land here. Ask by email in the meantime and we&rsquo;ll send what you need.
        </p>
      </Section>

      {/* FAST FACTS */}
      <Section divider>
        <p className="eyebrow">Fast facts</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>The essentials, accurately.</h2>
        <div className="grid grid-4" style={{ marginTop: 48 }}>
          {facts.map((f) => (
            <Tile key={f.dep} label={f.dep} title={f.title}>{f.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            Need something specific? Get in touch.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/contact" variant="primary">Contact us →</ButtonLink>
            <ButtonLink href="/platform" variant="ghost">Explore the platform</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
