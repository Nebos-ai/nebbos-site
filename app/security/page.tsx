import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security & Compliance",
  path: "/security",
  description:
    "A system that observes how people work is high-risk under the EU AI Act. Nebbos answers that with architecture — a human approval gate, every decision sourced, isolation at the database.",
});

const guarantees = [
  ["A human on every consequential move.", "Changes to how work runs route through an approval gate — there is no path that lets the system act on the consequential things without sign-off."],
  ["Every decision is sourced.", "What was decided, by whom, on what evidence, and why — all recorded and queryable, all the time."],
  ["Bounded, reversible autonomy.", "Pearl only acts within limits it has demonstrably earned, and any action it takes can be undone."],
  ["Your data, your tenant.", "Isolation is enforced at the database for every row — not promised in a clause."],
];

const layers = [
  ["Layer 1", "Interface", "Changes are submitted to an approval flow, not pushed straight through."],
  ["Layer 2", "API", "Workflow changes require a valid approval token, or they're refused."],
  ["Layer 3", "Agent policy", "The agent pauses on consequential tools and cannot proceed without a human resume."],
  ["Layer 4", "Tool permissions", "Tools check the approval context before any logic runs."],
  ["Layer 5", "Database", "Unauthorised writes to workflow tables are caught — with alert and rollback."],
  ["Break-glass", "Emergency override", "Requires two senior approvers, a priority alert, and an automatic post-incident review."],
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Oversight & compliance"
        title="Oversight isn't a setting. It's the architecture."
        lead="A system that observes how people work is high-risk under the EU AI Act. Most vendors answer that with a policy document. Nebbos answers with how it's built — and you can read the guarantees below."
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>EU AI Act · high-risk ready</Chip>
          <Chip>GDPR-aligned</Chip>
          <Chip>Built to the SOC 2 control framework</Chip>
          <Chip>Aligned with ISO 27001</Chip>
        </div>
        {/* honest-default: removed SOC 2 / ISO 27001 cert badges (imply attestation Nebbos does not hold per nebos-governance — no attested certificate found); reframed to control-framework language. */}
        <p className="mono faint" style={{ marginTop: 12, fontSize: 12 }}>
          We build to the SOC 2 and ISO 27001 control frameworks. These describe how the
          platform is engineered — not a formal certification we currently hold.
        </p>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The guarantees</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          Four things that are true by construction.
        </h2>
        <div className="grid grid-2" style={{ marginTop: 40, maxWidth: 880 }}>
          {guarantees.map(([t, d]) => (
            <Tile key={t} title={t}>{d}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Defense in depth</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          The approval gate is enforced in five places.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "54ch" }}>
          Oversight that lives in one layer can be bypassed in another. Nebbos enforces the human
          checkpoint at every level of the stack, so a change to how work runs can&rsquo;t slip through.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {layers.map(([k, title, body]) => (
            <Tile key={k} label={k} title={title}>{body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">Data handling</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "18ch" }}>
              It reads the shape of work — not the contents.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "50ch" }}>
              Nebbos stores structured signal — patterns, thresholds, relationships, timing — rather
              than the raw text of your messages and documents. The Operational Graph is a map of how
              work moves, not an archive of what everyone said.
            </p>
          </div>
          <div className="panel">
            <div className="qmark">What&rsquo;s stored vs. what isn&rsquo;t</div>
            <div style={{ marginTop: 16 }} className="mist">
              <p style={{ marginTop: 12 }}><span className="mono text-blue">KEEPS</span> — events, patterns, thresholds, relationships, outcomes</p>
              <p style={{ marginTop: 12 }}><span className="mono faint">SKIPS</span> — raw message bodies and document contents</p>
              <p style={{ marginTop: 12 }}><span className="mono text-blue">SCOPES</span> — access by role; surfaces sensitive gaps to leads, not peers</p>
            </div>
          </div>
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "24ch", marginInline: "auto" }}>
            Bring the security questionnaire. We built for it.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/contact" variant="primary">Talk to us →</ButtonLink>
            <ButtonLink href="/governance" variant="ghost">How governance works</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
