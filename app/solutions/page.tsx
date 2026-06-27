import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions",
  path: "/solutions",
  description:
    "Operations Intelligence for the industries and functions that run on coordination — led by K-12 education.",
});

const industries = [
  { href: "/solutions/k12", dep: "Lead vertical", title: "K-12 Education", body: "Districts and schools coordinate across staff, schedules, compliance and student support. Nebbos surfaces the coverage gap and the missed deadline before they reach a family." },
  { href: "/solutions/healthcare", dep: "Industry", title: "Healthcare", body: "Coordination across shifts, handoffs and compliance, with the data handling a clinical setting demands." },
  { href: "/solutions/financial-services", dep: "Industry", title: "Financial Services", body: "Operational risk and control workflows, every decision sourced and audit-ready." },
  { href: "/solutions/public-sector", dep: "Industry", title: "Public Sector", body: "Accountable, sourced, reversible — built for the transparency public bodies are held to." },
  { href: "/solutions/manufacturing", dep: "Industry", title: "Manufacturing", body: "Cross-team handoffs and capacity crunch across production and supply." },
];

const functions = [
  { href: "/solutions/operations", dep: "Function", title: "Operations", body: "Stalled handoffs and slipping deadlines surface while you can still move on them." },
  { href: "/solutions/finance", dep: "Function", title: "Finance", body: "Predictable cost and a tool that compounds instead of depreciating." },
  { href: "/solutions/people", dep: "Function", title: "People", body: "Coverage gaps and absence signal — surfaced to the lead, never the person." },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built for the work that runs on coordination."
        lead="The same Operational Graph answers the question each industry and function is actually asking. K-12 education is our lead vertical — start there, or find your function below."
      >
        <ButtonLink href="/solutions/k12" variant="primary">Explore K-12 Education →</ButtonLink>
      </PageHero>

      <Section divider>
        <p className="eyebrow">By industry</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Industries</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {industries.map((i) => (
            <a key={i.href} href={i.href} style={{ display: "block" }}>
              <Tile label={i.dep} title={i.title}>{i.body}</Tile>
            </a>
          ))}
        </div>
      </Section>

      <Section divider>
        <p className="eyebrow">By function</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Functions</h2>
        <div className="grid grid-3" style={{ marginTop: 48 }}>
          {functions.map((f) => (
            <a key={f.href} href={f.href} style={{ display: "block" }}>
              <Tile label={f.dep} title={f.title}>{f.body}</Tile>
            </a>
          ))}
        </div>
      </Section>

      <Section divider>
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Section>
    </>
  );
}
