import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Presentation",
  path: "/platform/presentation",
  description:
    "The four-slide Nebbos presentation. Deep-linked from anywhere that needs the four-slide story: what the platform is, what it meters, what its primitives are, and what deploying on it changes.",
});

/**
 * /platform/presentation — Wave 5 · 2026-09-13; Wave 4 vocab-refresh 2026-09-15.
 *
 * Editorial gateway. The four-slide narrative deck lives at /presentation;
 * this page is the reader-in-the-platform-subtree pointer to it, with the
 * shape of the deck outlined for anyone landing here from search or an
 * internal link. Wave 4 flips customer-hero framing to "platform" per
 * 2026-09-14 doctrine.
 */
export default function PresentationPage() {
  return (
    <>
      <Hero
        eyebrow="Presentation"
        title={
          <>
            The four-slide{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>platform story.</em>
          </>
        }
        deck="The canonical Nebbos presentation lives at /presentation with the deck embedded inline. Below is what it covers, so you can decide whether to open it now or forward it first."
      >
        <ButtonLink href="/presentation" variant="primary">Open the presentation</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="Slide 01"
        title="Every AI call needs a platform."
        body={<p style={{ margin: 0 }}>The class of work that sits between intent and state. Not the model. Not the app. The platform that decides whether the call runs, what it costs, what it touches, and what it leaves behind.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Slide 02"
        title="Metered. Isolated. Modular."
        body={<p style={{ margin: 0 }}>Every call is measured &mdash; tokens are the unit of accounting. Every call is scoped &mdash; no reach across workloads. Every call is composable &mdash; nested calls roll up, the substrate settles.</p>}
      />

      <FeatureRow
        eyebrow="Slide 03"
        title="Pearl runs. Tokens meter. Nested calls rollup. KG settles."
        body={<p style={{ margin: 0 }}>Four primitives. Pearl is the VM your workload runs on. Tokens are the unit of accounting. Nested calls roll their traces back up to Pearl. The knowledge graph is where the substrate settles the truth.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Slide 04"
        title="Deploy on Nebbos. Every call is governed by default."
        body={<p style={{ margin: 0 }}>Governance is not a feature layered on top. It is the shape of the runtime. Every call you route through Nebbos carries its own audit, its own metering, its own isolation. You do not opt in.</p>}
      />

      <CTABand
        headline="Open the deck with the PDF inline."
        deck="The canonical /presentation surface has all four slides plus the downloadable PDF embedded inline. This page is the map; that page is the deck."
        primary={{ label: "Open the presentation", href: "/presentation" }}
        secondary={{ label: "Download PDF", href: "/nebbos-presentation.pdf" }}
      />
    </>
  );
}
