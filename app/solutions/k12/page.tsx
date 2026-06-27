import { Section } from "@/components/ui/Section";
import { Tile, Chip, Panel } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "K-12 Education",
  path: "/solutions/k12",
  description:
    "Operations Intelligence for K-12 districts and schools. Nebbos surfaces the coverage gap, the missed compliance deadline and the stalled support case before they reach a family — in your own isolated, governed environment, with a human on every consequential call and a FERPA-aggregate posture by design.",
});

// K-12 is the lead vertical — most-developed industry page.

const pearls = [
  { dep: "Operations / Facilities", title: "Coverage & coordination", body: "Substitute coverage gaps, transport and facilities handoffs going cold, and the schedule conflict forming across buildings — surfaced to the lead while there's still time to fix it." },
  { dep: "Compliance", title: "Deadlines that can't slip", body: "IEP review dates, mandated reporting windows and accreditation milestones tracked against the work actually happening — so a deadline never surprises you the week it's due." },
  { dep: "Student Support", title: "Cases before they escalate", body: "A support case stalled past its threshold, an attendance routine with no note on record — flagged to the right staff member, never broadcast to peers." },
  { dep: "District Office", title: "One read across schools", body: "Every school on the same live read of how the work is moving, instead of a dozen spreadsheets reconciled the night before a board meeting." },
];

const howSteps = [
  { dep: "Your own environment", title: "Your data stays yours", body: "Your operational signal lives in your own isolated, governed tenant, enforced at the database. It reads from the systems your district already runs — there's nothing new for staff to adopt." },
  { dep: "Pearls", title: "A specialist per function", body: "One Pearl watches operations, another compliance, another student support. Each is scoped to its function, so its attention is narrow and its judgement specific — and each arrives having studied best practice for districts." },
  { dep: "Governed action", title: "Nothing acts alone", body: "Before anything consequential runs, it routes through a human approval gate and a simulation gate that rehearses the move against a private copy first. Every action is sourced, logged, and reversible." },
];

const proof = [
  ["Surfaced to leads, not peers.", "Sensitive signal — a coverage hole, a stalled case — goes to the staff member who can act on it, never to a colleague. Access is scoped by role at the database, not by a setting someone can forget to apply."],
  ["The shape of work, not the record.", "Nebbos reads patterns, thresholds, relationships and deadlines — not the contents of student records, messages or documents. The Operational Graph is a map of how work moves through a district, not an archive of student information."],
  ["A human on every consequential call.", "Nothing that affects a student or a family happens without a person signing off. Autonomy is earned over time, bounded to what's been proven, and reversible."],
];

export default function K12Page() {
  return (
    <>
      <PageHero
        eyebrow="K-12 Education · Lead vertical"
        title="See the coverage gap before it reaches a family."
        lead="Districts and schools run on coordination — staff, schedules, compliance deadlines, student support — and the early signs of a problem are already in the tools you use. Nebbos reads that signal and puts the fix in front of the right person while it can still be used."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
          <ButtonLink href="/security" variant="ghost">How we handle student data</ButtonLink>
        </div>
      </PageHero>

      {/* THE PROBLEM */}
      <Section divider>
        <p className="eyebrow">The problem</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch" }}>
          In a district, what slips is rarely the big thing. It&rsquo;s the handoff nobody owned.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "62ch" }}>
          A substitute who never confirmed. A compliance review whose deadline moved when the case did.
          A support escalation that sat in someone&rsquo;s inbox over a long weekend. Districts coordinate
          across dozens of schools, hundreds of staff and a stack of deadlines that cannot slip — and the
          hardest problems are almost never the visible ones.
        </p>
        <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "62ch" }}>
          None of it shows up on a dashboard until it&rsquo;s already a problem for a student, a parent,
          or an auditor. By the time a number turns red, the substitute is already a no-show and the
          review window has already closed. Nebbos watches for exactly these patterns and raises them
          early — to the person who can still act, with the reasoning attached.
        </p>
      </Section>

      {/* HOW NEBBOS ADDRESSES IT */}
      <Section divider>
        <p className="eyebrow">How Nebbos addresses it</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Your data stays in your own isolated, governed environment — built for the accountability a school is held to.
        </h2>
        <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "60ch" }}>
          Nebbos isn&rsquo;t a dashboard bolted onto your data. It reads the operational signal your
          district already emits, builds a living map of how the work moves, and reasons over it — all
          inside an environment you own and oversight you can prove.
        </p>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {howSteps.map((s) => (
            <Tile key={s.dep} label={s.dep} title={s.title}>{s.body}</Tile>
          ))}
        </div>
      </Section>

      {/* WHAT NEBBOS WATCHES */}
      <Section divider>
        <p className="eyebrow">A Pearl per function</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>What Nebbos watches in a district.</h2>
        <div className="grid grid-2" style={{ marginTop: 48 }}>
          {pearls.map((p) => (
            <Tile key={p.dep} label={p.dep} title={p.title}>{p.body}</Tile>
          ))}
        </div>
      </Section>

      {/* FERPA POSTURE */}
      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">FERPA posture</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "18ch" }}>
              Aggregate by design. Never per-student.
            </h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "52ch" }}>
              Student data is the most sensitive signal there is, and Nebbos is built to stay on the
              right side of it by construction. It works from the <em>shape</em> of operational work —
              whether a deadline is at risk, whether a handoff stalled, whether coverage adds up — at the
              level of patterns and thresholds, not individual student records.
            </p>
            <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "52ch" }}>
              Where a signal does touch a person — a case past its threshold, a coverage hole — it&rsquo;s
              routed only to the staff member whose role lets them act on it, scoped at the database, and
              recorded in the audit trail. The platform&rsquo;s job is to surface the gap to the right
              adult, not to profile a child.
            </p>
          </div>
          <Panel label="What the graph holds — and what it doesn't">
            <div style={{ marginTop: 12 }} className="mist">
              <p style={{ marginTop: 12 }}><span className="mono text-blue">KEEPS</span> — events, thresholds, deadlines, handoff status, coverage gaps, outcomes</p>
              <p style={{ marginTop: 12 }}><span className="mono faint">SKIPS</span> — student record contents, message and document text, anything resembling a per-student profile</p>
              <p style={{ marginTop: 12 }}><span className="mono text-blue">SCOPES</span> — access by role; sensitive signal goes to the lead who can act, never to peers</p>
            </div>
          </Panel>
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Chip lead>FERPA-aggregate by design</Chip>
          <Chip>Access scoped by role</Chip>
          <Chip>Structured signal, not records</Chip>
          <Chip>Human approval gate</Chip>
          <Chip>Full audit trail</Chip>
        </div>
        {/* honest-default: FERPA = aggregate-only posture (kept); no formal attestation found in nebos-governance and no real district named — customer stories are explicitly illustrative. */}
        <p className="mono faint" style={{ marginTop: 20, fontSize: 12 }}>
          FERPA is handled as an aggregate, structural posture by design — never per-student records.
          Any district story shown is illustrative until a reference customer is confirmed.
        </p>
      </Section>

      {/* TRUST PROOF */}
      <Section divider>
        <p className="eyebrow">Built for the trust a school is held to</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch" }}>
          Three things that are true by construction.
        </h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {proof.map(([t, d]) => (
            <Tile key={t} title={t}>{d}</Tile>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Put a Pearl on the function that keeps you up at night.
          </h2>
          <p className="mist" style={{ marginTop: 20, fontSize: 18, maxWidth: "52ch", marginInline: "auto" }}>
            Start with one function — coverage, compliance, or student support — prove it on your own
            district&rsquo;s data, then expand. A demo runs on a walkthrough, not your live records.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/solutions" variant="ghost">See all solutions</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
