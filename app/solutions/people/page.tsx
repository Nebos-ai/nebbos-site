import { Section } from "@/components/ui/Section";
import { Tile, Chip } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "People",
  path: "/solutions/people",
  description:
    "Unaccounted absence and coverage risk, raised to the lead who can act on it and never to the person’s peers — scoped by role at the database, with the discretion the function demands.",
});

const watches = [
  { dep: "Coverage & absence signal", title: "The gap, raised to the lead", body: "No activity where there should be, and no leave on record to explain it — flagged to the lead who owns coverage, never broadcast to peers and never surfaced as a judgement about the person." },
  { dep: "Scoped by role", title: "Sensitive signal stays where it belongs", body: "Access is enforced at the database with row-level security, so a coverage or absence signal reaches only the person whose role allows them to act on it. Discretion is a property of the architecture, not a policy people are asked to honour." },
  { dep: "Asks about data, never feelings", title: "One missing data point, nothing more", body: "When Nebbos can’t account for something, the Pearl asks about the one data point it’s missing — not how anyone is doing. It reads the shape of work, not the contents of a person’s day." },
];

export default function PeoplePage() {
  return (
    <>
      <PageHero
        eyebrow="Function · People"
        title="Coverage gaps, surfaced to the lead — never the person."
        lead="Unaccounted absence and coverage risk are already visible in the systems you run. Nebbos raises them to the manager who can act on it, scoped by role at the database, with the discretion the function demands."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">How we handle sensitive data</ButtonLink>
        </div>
      </PageHero>

      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          A coverage gap is an operational fact. It shouldn&rsquo;t become a verdict on a person.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Someone&rsquo;s out and the work isn&rsquo;t covered. No leave is on record to explain it.
          Handled badly, that becomes gossip, an awkward message, or a manager finding out too late.
          Nebbos treats it as one missing data point: it surfaces the coverage gap to the lead who can
          fill it, keeps it scoped to that role at the database, and asks only about the data &mdash;
          never about how anyone feels.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">What Nebbos watches</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>A Pearl on coverage, with the discretion the function demands.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {watches.map((w) => (
            <Tile key={w.dep} label={w.dep} title={w.title}>{w.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Built for sensitive signal</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          The shape of work, not a record of the person.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Nebbos stores structured operational signal &mdash; patterns, thresholds, relationships,
          timing &mdash; not the contents of messages or personnel records. Access is scoped by role at
          the database, every signal it raises is sourced, and a human stays on every consequential move.
          It is a map of how work moves, not an archive of the people who do it.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>Role-scoped access · RLS</Chip>
          <Chip>Structured signal, not records</Chip>
          <Chip>Surfaced to the lead, never peers</Chip>
          <Chip>Human approval gate</Chip>
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on coverage, with the discretion your people deserve.
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
