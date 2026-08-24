import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Presentation",
  path: "/platform/presentation",
  description:
    "Cradle. Shell. Pearl. The four-slide presentation that explains what Nebbos is, why it matters, and what changes at every company size.",
});

const slides = [
  { k: "01", title: "Intelligence that compounds.", body: "One Pearl per department. Every human decision your team makes trains your model, not someone else&rsquo;s. Portable to you if you ever leave." },
  { k: "02", title: "You are training AI you don't own.", body: "With data you don't control, for a company that isn't yours. Every generic AI vendor uses your operational judgment to sharpen THEIR next release. Nebbos inverts that." },
  { k: "03", title: "Cradle. Shell. Pearl.", body: "The three-tier substrate. Cradle owns the memory + audit trail. Shell holds the department context. Pearl is the per-department brain that persists across every human who comes and goes." },
  { k: "04", title: "Same 5 years. Same choice at every company size.", body: "From mid-market to enterprise, the operational-judgment question is the same. The choice: train your model, or train someone else&rsquo;s." },
];

export default function PresentationPage() {
  return (
    <>
      <Hero
        eyebrow="Presentation"
        title={
          <>
            Cradle. <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Shell.</em> Pearl.
          </>
        }
        deck="Four slides. Same 5 years. Same choice at every company size."
      >
        <Link href="/presentation" className="btn btn-primary">See the full presentation →</Link>
      </Hero>

      {slides.map((s) => (
        <FeatureRow key={s.k} eyebrow={s.k} title={s.title} body={<p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: s.body }} />} />
      ))}

      <CTABand
        headline="Walk it live."
        deck="The four slides ship together as an interactive presentation. Download the PDF or open the live view."
        primary={{ label: "Open the presentation", href: "/presentation" }}
        secondary={{ label: "Download PDF", href: "/nebbos-presentation.pdf" }}
      />
    </>
  );
}
