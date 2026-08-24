import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dashboard",
  path: "/platform/dashboard",
  description:
    "The Nebbos overview at a glance — brand posture, key metrics, and the doc-meta a buyer needs before they walk into the interactive presentation.",
});

/**
 * /platform/dashboard — mirrors the Dashboard tab of the sales presentation.
 * See /presentation for the full interactive dashboard with live tab switching.
 */
export default function DashboardPage() {
  return (
    <>
      <Hero
        eyebrow="Dashboard"
        title={
          <>
            Intelligence <em style={{ fontStyle: "italic", color: "var(--gold)" }}>that compounds.</em>
          </>
        }
        deck="Every human decision your team makes trains your model, not someone else&rsquo;s. Portable to you if you ever leave."
      >
        <Link href="/presentation" className="btn btn-primary">Open the interactive dashboard →</Link>
      </Hero>

      <CTABand
        headline="See the full sales presentation."
        deck="Dashboard is one of four tabs. Presentation, Standout, and Trends live alongside it in the interactive view."
        primary={{ label: "Open the presentation", href: "/presentation" }}
        secondary={{ label: "Download PDF", href: "/nebbos-presentation.pdf" }}
      />
    </>
  );
}
