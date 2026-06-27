import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { getCollection } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Careers",
  path: "/careers",
  description: "Help build software that sharpens judgement instead of replacing it.",
});

const values = [
  { dep: "How we build 01", title: "Keep the human in the loop", body: "The consequential calls stay with people, always." },
  { dep: "How we build 02", title: "Show your work", body: "Every answer comes with its evidence." },
  { dep: "How we build 03", title: "Earn trust slowly", body: "Autonomy is earned by being right over time." },
];

export default function CareersPage() {
  const roles = getCollection("careers");
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build software that sharpens judgement."
        lead="We help organisations see what's about to happen and act with their judgement intact. If that's the kind of thing you want to build, talk to us."
      />

      <Section divider>
        <p className="eyebrow">How we build</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>What we care about.</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {values.map((v) => (
            <Tile key={v.dep} label={v.dep} title={v.title}>{v.body}</Tile>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">Open roles</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Roles</h2>
        <div style={{ marginTop: 40, display: "grid", gap: 16 }}>
          {roles.map((r) => (
            <Link key={r.slug} href={`/careers/${encodeURIComponent(r.slug)}`} className="tile" style={{ display: "block" }}>
              <div className="dep">{r.frontmatter.team} · {r.frontmatter.location}</div>
              <h3 style={{ marginTop: 8 }}>{r.frontmatter.title}</h3>
              {r.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{r.frontmatter.description}</p> : null}
            </Link>
          ))}
        </div>
        <p className="mono faint" style={{ marginTop: 24, fontSize: 12 }}>
          Roles shown are illustrative until hiring formally opens.
        </p>
      </Section>
    </>
  );
}
