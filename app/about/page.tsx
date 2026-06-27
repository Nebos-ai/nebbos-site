import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
  description:
    "Nebbos builds Operations Intelligence — software that helps organisations see what's about to happen and act with their judgement intact.",
});

const principles = [
  { dep: "Principle 01", title: "Keep the human in the loop", body: "Software should sharpen judgement, not replace it. The consequential calls stay with people, always." },
  { dep: "Principle 02", title: "Show your work", body: "A prediction without its reasoning is just a guess with confidence. Every answer comes with its evidence." },
  { dep: "Principle 03", title: "Earn trust slowly", body: "Autonomy is something a system earns by being right over time — not a switch you flip on day one." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We help organisations see what's about to happen."
        lead="Most software is a record of the past. We think the more useful thing is a clear, honest read of what's coming — early enough to do something about it, and explained well enough that a person can decide what."
      />

      <Section divider>
        <div className="grid grid-2" style={{ alignItems: "center", gap: 56 }}>
          <div>
            <p className="eyebrow">The name</p>
            <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "16ch" }}>Why &ldquo;Nebbos&rdquo;.</h2>
            <p className="mist" style={{ marginTop: 24, fontSize: 18, maxWidth: "52ch" }}>
              Nebbos is a small village in Vojvodina — the birthplace of Mihajlo Pupin, who spent his
              life on a single problem: how to carry a faint signal across great distance without
              losing what it held. His work let a weak voice travel further and arrive intact.
            </p>
            <p className="mist" style={{ marginTop: 16, fontSize: 18, maxWidth: "52ch" }}>
              That&rsquo;s the idea we build on. Every organisation is full of faint operational signal
              that fades before anyone acts on it. Nebbos carries that signal further — and makes sure
              the meaning survives the trip.
            </p>
          </div>
          <div className="panel" style={{ textAlign: "center", padding: "56px 28px" }}>
            <div className="mono faint" style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12 }}>
              Signal, carried
            </div>
            <div style={{ marginTop: 20, fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, letterSpacing: "-0.04em" }}>
              faint → <span className="text-blue">clear</span>
            </div>
            <p className="mist" style={{ marginTop: 16, maxWidth: "34ch", marginInline: "auto" }}>
              From the noise of everyday work to a decision someone can actually make.
            </p>
          </div>
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">What we believe</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>How we build.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {principles.map((p) => (
            <Tile key={p.dep} label={p.dep} title={p.title}>{p.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "22ch", marginInline: "auto" }}>
            Want to see what your operations are about to do?
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/careers" variant="ghost">Join us</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
