import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compliance",
  path: "/compliance",
  description:
    "Designed to the EU AI Act high-risk bar and GDPR-aligned. Compliance posture and documentation for active evaluations.",
});

const frameworks = [
  { dep: "EU AI Act", title: "High-risk ready by architecture", body: "A system that observes how people work falls under the high-risk requirements. The human approval gate, sourced decisions, full audit trail and bounded autonomy answer those requirements in the build — not in a policy bolted on afterwards." },
  { dep: "GDPR", title: "Data minimisation in the design", body: "Nebbos stores structured operational signal — patterns, thresholds, relationships, timing — not the raw contents of messages or documents, and scopes access by role at the database. Processing terms and the DPA are available on request." },
  { dep: "Sector rules", title: "Built for regulated work", body: "For education, FERPA is handled as an aggregate, structural posture — never per-student records. For other regulated settings, the same minimisation and oversight model applies. Sector specifics are confirmed with counsel before we publish a named claim." },
];

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Built for the rules that govern AI that observes people."
        lead="Nebbos is designed for the high-risk bar from day one — not retrofitted to it. The oversight a regulator asks for is a property of how the platform works, and documentation is available for active evaluations."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/contact" variant="primary">Request documentation →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">Read the security guarantees</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The premise</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Compliance you can demonstrate, not just assert.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "62ch" }}>
          The things a regulator looks for in a high-risk AI system — human oversight, traceable
          decisions, data minimisation, the ability to explain why something happened — are exactly the
          properties Nebbos is built around. Because the audit trail and the approval gate are part of the
          architecture, the evidence already exists; you&rsquo;re not reconstructing it after the fact.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">Frameworks</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Where Nebbos meets the bar.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {frameworks.map((f) => (
            <Tile key={f.dep} label={f.dep} title={f.title}>{f.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Control frameworks</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          The controls we build to, stated honestly.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Nebbos is engineered to the controls behind SOC 2 and ISO 27001 — they shape how the platform is
          built, not a certificate we currently hold. We don&rsquo;t present a certification we haven&rsquo;t
          earned. For an active evaluation, the security package and supporting documentation are available
          under NDA.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>EU AI Act · high-risk ready</Chip>
          <Chip>GDPR-aligned</Chip>
          <Chip>Built to the SOC 2 control framework</Chip>
          <Chip>Aligned with ISO 27001</Chip>
        </div>
        {/* honest-default: removed SOC 2 / ISO 27001 cert badges + "independent attestation" framing (no attested certificate found in nebos-governance); reframed to control-framework language. */}
        <p className="mono faint" style={{ marginTop: 20, fontSize: 12 }}>
          The frameworks above describe the controls Nebbos is built to — not a formal certification we
          currently hold.
        </p>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "24ch", marginInline: "auto" }}>
            Running an evaluation? Request the documentation pack.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/contact" variant="primary">Request documentation →</ButtonLink>
            <ButtonLink href="/governance" variant="ghost">How governance works</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
