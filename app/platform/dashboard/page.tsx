import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dashboard",
  path: "/platform/dashboard",
  description:
    "The at-a-glance view of a Nebbos deployment — the fires the platform counted, the actions the approval graph routed, the workloads Pearl is running today.",
});

/**
 * /platform/dashboard — Wave 5 · 2026-09-13 rewrite; Wave 4 vocab-refresh 2026-09-15.
 *
 * Was: 40-line "Intelligence that compounds" stub with 2 CTAs to /presentation.
 * Now: real dashboard concept — the surface your operators see when a Pearl
 * is live in production. Platform voice (was run-layer voice pre-2026-09-14
 * doctrine flip). Distinct from /presentation which is the four-slide deck.
 */
export default function DashboardPage() {
  return (
    <>
      <Hero
        eyebrow="Dashboard"
        title={
          <>
            The view when your Pearl is{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>live.</em>
          </>
        }
        deck="What the operators running your Nebbos deployment see. Fires counted, actions routed, approvals pending, workloads pooled. The at-a-glance surface, not the sales deck."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="01 · Fires counted"
        title="Every hook fire on your workload, over 30 days."
        body={<p style={{ margin: 0 }}>The platform emits a fire on every governance decision it makes &mdash; verify-first checks, KG-route lookups, credential guards, session-shard writes. The dashboard shows the 30-day rolling count, sliced by hook. Nebbos itself runs at ~62,000 fires per month; your Pearl is measured against that same baseline.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="02 · Actions routed"
        title="What the approval graph handled this week."
        body={<p style={{ margin: 0 }}>Every consequential action the Pearl drafted, who approved it, how fast it landed, what got kicked back. The graph is the governance; the dashboard is the graph made legible.</p>}
      />

      <FeatureRow
        eyebrow="03 · Workloads pooled"
        title="The workloads your Pearls handled, by department."
        body={<p style={{ margin: 0 }}>Coverage handoffs, ticket triage, close-week actions, procurement chase-ups &mdash; whatever the Pearl is scoped to. Aggregate by department, drill down to the specific call, replay any decision against a different context.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="04 · Substrate understanding"
        title="Your baseline against the Nebbos 100%."
        body={<p style={{ margin: 0 }}>Nebbos measures every deployment against its own substrate-understanding baseline (30-day fire count on Nebbos itself). Your Pearl reads at some percentage of that. The dashboard shows the percentage, the trend, and the gap that governs promotion to production.</p>}
      />

      <CTABand
        headline="See the dashboard on your workload's shape."
        deck="A 30-minute walkthrough shows the panels above populated against your industry's typical workload pattern, before the four-week deployment starts."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "See the presentation", href: "/presentation" }}
      />
    </>
  );
}
