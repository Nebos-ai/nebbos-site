import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Standout",
  path: "/platform/standout",
  description:
    "The one-page argument for Nebbos: every other AI tool trains somebody else&rsquo;s model. Nebbos trains yours.",
});

/**
 * /platform/standout — mirrors the Standout tab of the sales presentation.
 * The single-page argument distilled into one statement + evidence.
 */
export default function StandoutPage() {
  return (
    <>
      <Hero
        eyebrow="Standout"
        title={
          <>
            Every other AI tool trains <em style={{ fontStyle: "italic", color: "var(--gold)" }}>somebody else&rsquo;s</em> model.
            <br />
            Nebbos trains <em style={{ fontStyle: "italic", color: "var(--gold)" }}>yours</em>.
          </>
        }
        deck="One page. One argument. The reversal every enterprise AI-native operator should demand from their vendors."
      >
        <Link href="/presentation" className="btn btn-primary">Read the full standout →</Link>
      </Hero>

      <CTABand
        headline="See the full argument."
        deck="Standout is one of four tabs in the interactive presentation. Dashboard, Presentation, and Trends live alongside it."
        primary={{ label: "Open the presentation", href: "/presentation" }}
        secondary={{ label: "Download PDF", href: "/nebbos-presentation.pdf" }}
      />
    </>
  );
}
