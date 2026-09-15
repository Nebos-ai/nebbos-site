import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Architecture",
  path: "/platform/architecture",
  description:
    "How the Nebbos platform is built. Four primitives, one runtime — Pearl runs the workload, tokens meter the consumption, nested calls roll up their traces, the knowledge graph settles the truth.",
});

/**
 * /platform/architecture — the shape of the platform (Wave 3 · 2026-09-13,
 * Wave 4 vocab-refresh 2026-09-15).
 *
 * Voice history:
 * - "Cradle · Shell · Pearl" three-tier (2026-08-23) superseded 2026-09-11
 *   by run-layer north star.
 * - Run-layer voice (2026-09-13) superseded 2026-09-14 by platform + tools
 *   + MCP + USB doctrine on customer-hero surfaces.
 *   Architecture (Pearl/Tokens/Nested calls/KG) unchanged — the primitives
 *   are technical facts of the runtime; only the customer-hero framing
 *   changes to "platform" from "run layer."
 */
export default function ArchitecturePage() {
  return (
    <>
      <Hero
        eyebrow="Architecture"
        title={
          <>
            Four primitives.{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>One runtime.</em>
          </>
        }
        deck="The shape of the platform. What each primitive does, what it guarantees, and how the four compose into a single call."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="01 · Pearl"
        title="The VM your workload runs on."
        body={<p style={{ margin: 0 }}>Pearl is the process boundary for a Nebbos deployment. Every call — every prompt, every action, every retrieval — runs inside a Pearl. The Pearl carries the context, holds the identity, enforces the boundary. Multiple Pearls per department; one department per Pearl.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="02 · Tokens"
        title="The unit of accounting. Not just consumption &mdash; provenance."
        body={<p style={{ margin: 0 }}>Every token consumed on Nebbos is traced to a call, a Pearl, a user, and a business action. Not a monthly aggregate. Every token, every time. When cost audit lands, you know which decision paid for which tokens.</p>}
      />

      <FeatureRow
        eyebrow="03 · Nested calls"
        title="Composition without sprawl. Traces roll up."
        body={<p style={{ margin: 0 }}>A Pearl can spawn nested calls to answer harder questions. Every nested call carries its parent&rsquo;s context, contributes its trace to the parent, and cannot escape the parent&rsquo;s boundary. The composition is the accounting.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="04 · Knowledge graph"
        title="Where the substrate settles the truth."
        body={<p style={{ margin: 0 }}>The KG is not a search index; it is where every fact the platform establishes goes to live. Every approval, every action, every consequence &mdash; append-only, hash-chained, replay-able. When compliance asks &ldquo;what did the system know, and when,&rdquo; the answer is a KG query.</p>}
      />

      <FeatureRow
        eyebrow="What the four guarantee together"
        title="Every call, governed by construction."
        body={<p style={{ margin: 0 }}>Metered because tokens are the unit. Isolated because Pearl is the boundary. Composable because nested calls roll up. Auditable because the KG settles. Not four features glued on top of a model &mdash; the shape of the runtime itself.</p>}
      />

      <CTABand
        headline="See the four primitives on your workload."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Read the docs", href: "/docs" }}
      />
    </>
  );
}
