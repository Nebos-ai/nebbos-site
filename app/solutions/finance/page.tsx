import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Finance",
  path: "/solutions/finance",
  description:
    "Predictable cost on top of whatever model you run, no lock-in to one vendor’s bill, and the rare tool that’s worth more next year than it is today.",
});

const watches = [
  { dep: "Deterministic-first economics", title: "Most checks never cost a token", body: "Six deterministic detectors run before any model call. The everyday work of watching your operation is plain computation — it costs nothing to run — so a model is only reached for when reasoning genuinely needs one." },
  { dep: "Model-agnostic", title: "No lock-in to one vendor’s bill", body: "Nebbos works across providers and models rather than betting your costs on a single one. Routing sends reasoning to an appropriate model for the job, so you’re never captive to one vendor’s pricing." },
  { dep: "Compounds, not depreciates", title: "Worth more at month 24", body: "Every prediction, resolution and correction feeds back into the Operational Graph. The system you run later has been shaped around how your organisation actually works — it compounds where most tools depreciate." },
];

export default function FinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Function · Finance"
        title="Predictable cost. A tool that compounds."
        lead="Most AI spend is unpredictable and tied to one vendor’s pricing. Nebbos is built deterministic-first, runs on top of whatever model you choose, and is the rare tool that’s worth more next year than it is today."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">How it works</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          Most AI tools bill by the token and depreciate by the quarter.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Costs scale with usage you can&rsquo;t forecast, the bill is tied to one provider&rsquo;s
          pricing, and the tool is worth no more in a year than the day you bought it. Nebbos is built
          the other way round: deterministic checks do the everyday watching at no token cost, the
          reasoning layer is model-agnostic so you&rsquo;re not locked to one vendor, and the system
          compounds as it learns how your organisation works.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">What Nebbos watches for your budget</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Built for the economics of AI, not against them.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {watches.map((w) => (
            <Tile key={w.dep} label={w.dep} title={w.title}>{w.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Spend you can account for</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Every model call is sourced &mdash; and most aren&rsquo;t made at all.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Because deterministic detectors run first, the volume of model calls stays proportionate to
          the reasoning actually required &mdash; not to how much work you put through the system. When
          a model is called, the decision it informed is recorded and queryable, so finance can see what
          drove spend rather than reconciling an opaque usage bill after the fact.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>Deterministic detectors first</Chip>
          <Chip>Model-agnostic, no lock-in</Chip>
          <Chip>Sourced, queryable spend</Chip>
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on your operation &mdash; on a cost you can plan around.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/solutions" variant="ghost">See all solutions</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
