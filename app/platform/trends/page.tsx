import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trends",
  path: "/platform/trends",
  description:
    "The AI economy in 2026 — where the value pools and why the middle layer is losing it. Market context every enterprise buying committee needs.",
});

const sections = [
  { k: "01", title: "Silicon and data centers", body: "Compute demand is compounding at the base of the stack. Who owns the silicon owns the throughput ceiling for every model above." },
  { k: "02", title: "Foundation models", body: "The frontier keeps moving. The winners are consolidating; the middle-tier providers are getting squeezed. Multi-provider routing is now table stakes." },
  { k: "03", title: "The middle layer is losing", body: "Application wrappers around generic models are commoditizing fast. The moat now lives in owned operational judgment — the data your team generates by using the system." },
  { k: "04", title: "Agentic payments", body: "The emerging layer where AI-mediated commerce happens. Governance, attestation, and human approval graphs move from nice-to-have to regulatory floor." },
];

export default function TrendsPage() {
  return (
    <>
      <Hero
        eyebrow="Trends"
        title={
          <>
            The <em style={{ fontStyle: "italic", color: "var(--gold)" }}>AI economy</em> in 2026 — where the value pools.
          </>
        }
        deck="A structural read of who controls what across the AI stack — from silicon and data centers to foundation models, applications, and the emerging agentic payments layer."
      >
        <Link href="/presentation" className="btn btn-primary">Open the market analysis →</Link>
      </Hero>

      {sections.map((s) => (
        <FeatureRow key={s.k} eyebrow={s.k} title={s.title} body={<p style={{ margin: 0 }}>{s.body}</p>} />
      ))}

      <CTABand
        headline="See the full market context."
        deck="Trends is one of four tabs in the interactive presentation. Full tables, benchmarks, and structural analysis live in the live view."
        primary={{ label: "Open the presentation", href: "/presentation" }}
        secondary={{ label: "Download PDF", href: "/nebbos-presentation.pdf" }}
      />
    </>
  );
}
