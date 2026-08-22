import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

/**
 * Home — rebuild-2026 v2 (simplified).
 *
 * Per founder 2026-08-22: "we dont want to give too much away we want it
 * exciting but not over explaining simpler the better ... thats what made
 * apple great they simplified it for the everyday person."
 *
 * Four sections. No jargon (no FastMCP, no LangGraph, no RLS). No 4-block
 * evidence panels. Three headlines that a non-engineer will feel. Book a
 * demo to see the rest.
 */
export default function HomePage() {
  return (
    <>
      <Hero
        size="xl"
        eyebrow="Nebbos"
        title={
          <>
            See Friday&apos;s problem
            <br />
            on Monday.
          </>
        }
        deck="Your company&apos;s brain. Owned by you."
      >
        <ButtonLink href="/demo" variant="primary">
          Book a demo →
        </ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What it does"
        title="It watches the work. Not the people."
        body={
          <p style={{ margin: 0 }}>
            Nebbos reads the signal your work already emits — decisions, handoffs,
            deadlines — and shows you what breaks next.
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
        title="Every other AI tool trains someone else’s model."
        body={
          <p style={{ margin: 0 }}>
            Nebbos trains yours. The intelligence, the memory, the moat — owned
            by you, portable to you, compounding every quarter.
          </p>
        }
      />

      <CTABand
        headline="Put a Pearl on your hardest department."
        primary={{ label: "Book a demo →", href: "/demo" }}
      />
    </>
  );
}
