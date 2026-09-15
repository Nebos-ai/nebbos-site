import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Platform",
  path: "/platform",
  description:
    "The Nebbos operator platform — a metered, isolated, attested substrate. Its tools ship as MCP capabilities. Its privileged actions are gated by the USB you keep with you.",
});

/**
 * /platform — the platform overview surface.
 *
 * Voice history:
 * - Delta-brief-editorial (Cradle/Shell/Pearl three-tier, 2026-08-23)
 *   superseded by the run-layer north star (2026-09-11).
 * - Run-layer voice (2026-09-13 rewrite) superseded 2026-09-14 on customer-
 *   hero surfaces by the platform + tools + MCP + USB doctrine per
 *   feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14.
 *   Retained as internal-technical register for engineering docs.
 */
export default function PlatformPage() {
  return (
    <>
      <Hero
        eyebrow="Platform"
        title={
          <>
            The <em style={{ fontStyle: "italic", color: "var(--gold)" }}>platform</em>{" "}
            between intent and state.
          </>
        }
        deck="Metered. Isolated. Attested. Every AI call goes through it; every call is governed by default; every call leaves an audit."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="Why a platform"
        title="The class of work that sits between the model and the world."
        body={<p style={{ margin: 0 }}>Models decide. Applications act. But something has to decide whether the call runs, what it costs, what it touches, and what it leaves behind. That something is the operator platform. Nebbos is that platform.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Four primitives"
        title="Pearl. Tokens. Nested calls. KG."
        body={<p style={{ margin: 0 }}>Pearl is the VM your workload runs on. Tokens are the unit of accounting &mdash; every consumption traced to its origin. Nested calls roll their traces up. The knowledge graph settles the truth. Four primitives. Every call.</p>}
      />

      <FeatureRow
        eyebrow="What changes when you deploy here"
        title="Governance stops being a feature."
        body={<p style={{ margin: 0 }}>On Nebbos, every AI call is audited by construction. Every action is scoped by construction. Every consumption is metered by construction. Not a policy you configure; the shape of the platform.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What you keep"
        title="Your systems. Your data. Your operators."
        body={<p style={{ margin: 0 }}>The platform reads what you already run &mdash; SIS, HR, ERP, CRM, ticketing, comms. It never becomes the system of record. It answers questions on top and leaves the operators the ones who sign off.</p>}
      />

      <CTABand
        headline="See the platform on your own workload."
        deck="A 30-minute walkthrough of your workload's shape, the Pearl scope that fits it, and the approval graph it needs."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Read the docs", href: "/docs" }}
      />
    </>
  );
}
