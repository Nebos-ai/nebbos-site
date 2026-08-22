import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

/**
 * Home — rebuild-2026 v4 · Delta brief editorial.
 *
 * Paper white, serif hero, orange plus-markers, cut-corner CTA. Apple-simple
 * voice: three ideas, everyday-person accessible. Same design system as
 * every bilateral client brief.
 */
export default function HomePage() {
  return (
    <>
      <Hero
        size="xl"
        eyebrow="Nebbos"
        title={
          <>
            See Friday&rsquo;s problem
            <br />
            on <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Monday</em>.
          </>
        }
        deck="Your company's brain. Owned by you."
      >
        <ButtonLink href="/demo" variant="primary">
          Book a demo
        </ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What it does"
        title="It watches the work. Not the people."
        body={
          <p style={{ margin: 0 }}>
            Nebbos reads the signal your work already emits — decisions,
            handoffs, deadlines — and shows you what breaks next.
          </p>
        }
      />

      <FeatureRow
        reverse
        eyebrow="What you build"
        title="One agent per department."
        body={
          <p style={{ margin: 0 }}>
            Pre-educated in your work. Learns independently. Yours to keep.
          </p>
        }
      />

      <FeatureRow
        eyebrow="Why it matters"
        title={
          <>
            Every other AI trains{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>someone else&rsquo;s</em>{" "}
            model.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            Nebbos trains yours. The intelligence, the memory, the moat — owned
            by you, portable to you, compounding every quarter.
          </p>
        }
      />

      <CTABand
        headline="Put a Pearl on your hardest department."
        primary={{ label: "Book a demo", href: "/demo" }}
      />
    </>
  );
}
