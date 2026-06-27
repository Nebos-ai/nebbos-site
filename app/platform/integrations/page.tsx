import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integrations",
  path: "/platform/integrations",
  description:
    "Nebbos reads from the stack you already run — tasks, messages, calendars, tickets, deploys — through secure connectors, normalised into the Operational Graph. No rip-and-replace.",
});

const sources = [
  { dep: "Tasks", title: "Work as it moves", body: "Items opened, assigned, blocked and closed — the velocity and capacity signal under every commitment." },
  { dep: "Messages", title: "Coordination, not contents", body: "The shape of how teams coordinate — who is waiting on whom, where a thread goes quiet — never the words inside." },
  { dep: "Calendars", title: "Where time actually goes", body: "Meetings, leave and availability, so coverage gaps and capacity crunch are visible before a shift starts." },
  { dep: "Handoffs", title: "The thresholds that slip", body: "Cross-team and shift-to-shift handoffs tracked against the time they usually take, flagged when one goes cold." },
  { dep: "Tickets", title: "Support & incident load", body: "Queues building, ageing items and reopened work — pressure that spills into the rest of the operation." },
  { dep: "Deploys", title: "Delivery rhythm", body: "Release cadence and the events around it, read as a signal of delivery health, not a log to comb through." },
  { dep: "Approvals", title: "Where decisions wait", body: "Sign-offs requested and granted, so a decision sitting too long becomes a pattern you can act on." },
  { dep: "Incidents", title: "Cascade risk", body: "Disruptions and their downstream effects, mapped onto the graph so one team's problem doesn't quietly become another's." },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Reads from the stack you already run."
        lead="Nebbos turns the daily exhaust of work into one normalised stream of operational events — through secure connectors, never by replacing the systems they live in. It reads the shape of work, not the contents of your messages."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">How the platform works →</ButtonLink>
        </div>
      </PageHero>

      {/* LIVE SIGNAL SOURCES */}
      <Section divider>
        <p className="eyebrow">Live signal sources</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          The events your tools already emit, normalised into one graph.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Each source below is read as a stream of operational events and folded into the Operational
          Graph — the single source of operational truth. Nebbos keeps the patterns, thresholds,
          relationships and timing; it does not store the raw contents.
        </p>
        <div className="grid grid-4" style={{ marginTop: 48 }}>
          {sources.map((s) => (
            <Tile key={s.dep} label={s.dep} title={s.title}>{s.body}</Tile>
          ))}
        </div>
      </Section>

      {/* AGENT INTERFACE */}
      <Section divider>
        <p className="eyebrow">Agent interface</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          The same intelligence, available to your own agents.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Signal flows both ways. The intelligence Nebbos builds on the Operational Graph is available
          to your own agents and tools over a standard agent interface — so the predictions, reasoning
          and graph context can drive workflows you already run, on whichever model you choose.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "60ch" }}>
          It&rsquo;s a standard interface by design: model-agnostic, no lock-in, and governed by the same
          tiers and approval gate as everything else Nebbos does.
        </p>
      </Section>

      {/* CONNECTOR Catalog */}
      <Section divider>
        <p className="eyebrow">Connector catalog</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          The named catalog lands with the founder content pass.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          The full, named connector catalog and its setup guides are being finalised and will land
          here with the founder content pass. We&rsquo;d rather publish the list once it&rsquo;s accurate than
          name integrations we haven&rsquo;t confirmed.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "60ch" }}>
          Need a specific integration today? Tell us in your demo and we&rsquo;ll confirm coverage for the
          tools your operation runs on.
        </p>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            Connect your stack and see the graph form.
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
