import { Section } from "@/components/ui/Section";
import { Tile, Panel, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tideline",
  path: "/governance",
  description:
    "Tideline — the layer that keeps every Pearl accountable. Four tiers of scrutiny and a small set of red lines: not everything earns the same scrutiny, and nothing skips it.",
});

const tiers = [
  { dep: "Changes the rules", title: "Alters how everything else runs", body: "The only tier that can change the rules everything else operates under. Full review, full audit, no shortcuts. This is where a binding change actually lands." },
  { dep: "Proposes changes", title: "Reasons against approved context", body: "Drafts and proposes against an approved body of context — but it's only binding once a person promotes it through the highest tier. It can suggest; it can't quietly decide." },
  { dep: "Routine", title: "Routine work under standing rules", body: "The day-to-day production work that operates inside rules already agreed. Human sign-off, kept light, so routine things don't carry outsized weight." },
  { dep: "Read-only", title: "Looks and reports, changes nothing", body: "Looks, reasons and reports — but changes nothing on its own. It produces findings for a person to act on, never a side effect." },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Tideline"
        title="Not everything earns the same scrutiny. Nothing skips it."
        lead="Tideline is the line your AI never crosses — the layer that keeps every Pearl accountable. Treating every action the same is either too slow to live with or too loose to trust, so Nebbos runs four tiers — scrutiny matches consequence — and a small set of red lines binds every tier without exception."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/contact" variant="primary">Talk to us →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">How oversight is enforced</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The idea</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Scrutiny that scales with consequence.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "62ch" }}>
          Reading a report and rewriting the rules an organization runs on are not the same act, and
          they shouldn&rsquo;t pass through the same gate. Nebbos sorts every action into one of four
          tiers. A read-only exploration moves freely; a change to the rules an organization runs on earns full review
          and a complete audit record. The weight of the check matches the weight of the move — and the
          consequential calls always pause for a person.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">Four tiers</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>From read-only to rule-changing.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {tiers.map((t) => (
            <Tile key={t.dep} label={t.dep} title={t.title}>{t.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">The simulation gate</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "16ch" }}>
              Rehearsed before it&rsquo;s real.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "50ch" }}>
              Before any consequential action runs, the simulation gate forks your current operational
              state, runs the action forward against that private copy, checks the outcome, and throws the
              copy away. The real thing only ever sees a move that&rsquo;s already been tested — and a
              person still signs off before it lands.
            </p>
          </div>
          <Panel label="Red lines · bind every tier">
            <div style={{ marginTop: 12 }} className="mist">
              <p style={{ marginTop: 12 }}><span className="mono text-blue">ALWAYS</span> — a human on every consequential move</p>
              <p style={{ marginTop: 12 }}><span className="mono text-blue">ALWAYS</span> — every decision sourced and logged</p>
              <p style={{ marginTop: 12 }}><span className="mono text-blue">ALWAYS</span> — actions bounded to earned autonomy, and reversible</p>
              <p style={{ marginTop: 12 }}><span className="mono faint">NEVER</span> — a path that bypasses the approval gate</p>
            </div>
          </Panel>
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>Four governance tiers</Chip>
          <Chip>Simulation gate</Chip>
          <Chip>Earned, bounded autonomy</Chip>
          <Chip>Full audit trail</Chip>
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            See how the gates work on your own operation.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/compliance" variant="ghost">Compliance posture</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
