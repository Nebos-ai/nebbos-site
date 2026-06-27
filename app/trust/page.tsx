import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trust Center",
  path: "/trust",
  description:
    "Security, governance and compliance at Nebbos — accountability built into the architecture, not retrofitted to it.",
});

const areas = [
  { href: "/security", dep: "Security", title: "Oversight is the architecture", body: "A human on every consequential move, every decision sourced, tenant isolation at the database, and the approval gate enforced in five places. Read the guarantees in full." },
  { href: "/governance", dep: "Governance", title: "What's allowed to change anything", body: "Four governance tiers decide how much scrutiny an action earns, and a simulation gate rehearses anything consequential against a private copy before it runs." },
  { href: "/compliance", dep: "Compliance", title: "Built for the high-risk bar", body: "Designed to the EU AI Act high-risk requirements from day one and GDPR-aligned, with documentation available for active evaluations." },
];

const principles = [
  ["A human on every consequential move.", "There is no path that lets the system act on the things that matter without a person signing off."],
  ["Every decision is sourced.", "What was decided, by whom, on what evidence, and why — recorded and queryable, all the time."],
  ["Your data, your tenant.", "Isolation is enforced at the database for every row — not promised in a clause."],
  ["The shape of work, not the contents.", "Nebbos stores structured operational signal — patterns, thresholds, relationships — not the raw text of your messages and documents."],
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust center"
        title="Accountable by architecture."
        lead="A system that observes how people work is high-risk under the EU AI Act. Most vendors answer that with a policy document. Nebbos answers with how it's built — and you can read the guarantees here. Start with the overview, then go deep on the area you need."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/contact" variant="primary">Talk to us →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">Read the security guarantees</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The premise</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Trust you can read, not just a badge you have to take on faith.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "62ch" }}>
          Software that watches how an organisation operates has to earn a higher standard of trust than
          most tools. We don&rsquo;t think a policy page is enough. The oversight, the data minimisation,
          and the audit trail aren&rsquo;t features you enable — they&rsquo;re properties of how Nebbos is
          built, true in every layer of the stack. This is where you can check that for yourself.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>EU AI Act · high-risk ready</Chip>
          <Chip>GDPR</Chip>
          <Chip>Tenant isolation · RLS</Chip>
          <Chip>Full audit trail</Chip>
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Three places to go deep</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Security, governance, compliance.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {areas.map((a) => (
            <a key={a.href} href={a.href} style={{ display: "block" }}>
              <Tile label={a.dep} title={a.title}>{a.body}</Tile>
            </a>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">What&rsquo;s true everywhere</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          The commitments that hold across the whole platform.
        </h2>
        <div className="grid grid-2" style={{ marginTop: 40, maxWidth: 880 }}>
          {principles.map(([t, d]) => (
            <Tile key={t} title={t}>{d}</Tile>
          ))}
        </div>
        {/* honest-default: dropped "live trust portal" claim (no portal exists); point to the real /security, /compliance and /status pages instead. No cert badges asserted. */}
        <p className="mono faint" style={{ marginTop: 20, fontSize: 12 }}>
          Go deeper on <a href="/security" className="text-blue">security</a>,{" "}
          <a href="/compliance" className="text-blue">compliance</a> and{" "}
          <a href="/status" className="text-blue">system status</a>. The full documentation set is
          available for active evaluations.
        </p>
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
