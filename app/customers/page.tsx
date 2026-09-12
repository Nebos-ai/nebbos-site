import { FullBleedScene } from "@/components/site/FullBleedScene";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers · Nebbos",
  description:
    "Nebbos ships case studies when the engagement is ready to share publicly — numbers verified, client sign-off in hand.",
};

/**
 * /customers · 2026-09-12 revision · coming-soon state
 *
 * Prior version (pre-2026-09-12) rendered fictional customer case studies
 * (Northbridge School Network + Riverside Unified District) from
 * content/customers/*.mdx and claimed "enterprises running Nebbos on their
 * hardest departments — finance, operations, people, care, manufacturing,
 * financial services, civic case management" in the hero — implying
 * multi-vertical customer coverage we don't have.
 *
 * Per founder directive 2026-09-12: "only have the right specific
 * information on this sites not made up work". The fictional MDX moved to
 * content/_archive/customers-fictional-drafts/ (additive-only per doctrine
 * feedback_governance_additive_only_never_delete_disable_ignore). This
 * route now renders a coming-soon page: no fake customer claims, no
 * hypothetical logos, no plausible-example testimonials.
 *
 * When the first real customer story is ready to share publicly (numbers
 * verified, client sign-off in hand), it lands here. Until then this page
 * says so honestly and routes visitors to the platform overview or the
 * demo form.
 *
 * The MDX-reading logic (fs / path / gray-matter) is removed from this
 * file; app/customers/[slug]/page.tsx retains its dynamic renderer for
 * when future MDX lands under content/customers/.
 */

export default function CustomersIndexPage() {
  return (
    <>
      <FullBleedScene
        className="hero-fullbleed"
        scene={{ imageFamily: "concept-tenant-onboarding", imageFamilyVariant: 1 }}
        scrim="bottom"
        vignetteStrength={0.5}
        chapter="00"
        chapterLabel="Coming soon"
        priority
      >
        <div className="container hero-fullbleed__inner">
          <div className="hero-fullbleed__frame">
            <h1 className="hero-fullbleed__title">
              The first case study lands soon.
            </h1>
            <p className="hero-fullbleed__deck">
              Nebbos ships case studies when the engagement is ready to share
              publicly &mdash; numbers verified, client sign-off in hand.
              Nothing here is a hypothetical; nothing here is a
              plausible-example. When the first study is ready, it will land
              here.
            </p>
          </div>
        </div>
      </FullBleedScene>

      <section
        className="section section--paper"
        style={{
          paddingBlock: "clamp(64px, 10vh, 128px)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div className="container-narrow">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              margin: 0,
            }}
          >
            01 &middot; In the meantime
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "20px 0 0 0",
              maxWidth: "26ch",
              textWrap: "balance",
            }}
          >
            See the run layer, or walk through your own operations.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
              margin: "20px 0 0 0",
              maxWidth: "56ch",
            }}
          >
            Nebbos runs today. If you want to see the platform, the deck
            lives on the site. If you want to see a Pearl scoped to a domain
            you care about &mdash; a thirty-minute walkthrough on the
            calendar &mdash; book a demo.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: "clamp(32px, 5vh, 56px)",
              flexWrap: "wrap",
            }}
          >
            <Button href="/platform" variant="primary" size="lg">
              See the platform
            </Button>
            <Button href="/demo" variant="ghost" size="lg" arrow={false}>
              Book a demo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
