import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integrations",
  path: "/platform/integrations",
  description:
    "Nebbos reads the systems your operators already run — SIS, HR, ERP, CRM, ticketing, comms. Common adapters ship in the deployment package; custom adapters follow the same shape.",
});

/**
 * /platform/integrations — the systems Nebbos reads (Wave 3 · 2026-09-13 rewrite)
 *
 * Replaces the prior 2-FeatureRow shell with a real "what we connect to,
 * what the adapter shape is, what we deliberately don't do" narrative.
 */
export default function IntegrationsPage() {
  return (
    <>
      <Hero
        eyebrow="Integrations"
        title={
          <>
            Reads the stack{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>you already run.</em>
          </>
        }
        deck="No rip-and-replace. No new system of record. Nebbos connects behind the systems your operators live in and answers questions on top."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What the platform reads"
        title="Six adapter families."
        body={<p style={{ margin: 0 }}>Identity + directory (Google Workspace, Microsoft 365, WorkOS). ERP + finance (NetSuite, QuickBooks, Xero). CRM (Salesforce, HubSpot, Pipedrive). Ticketing + ops (Jira, Linear, ServiceNow). Comms (Slack, Teams, email). Industry-specific systems of record (SIS for K-12, EHR for healthcare, LOS for financial services). Each family has a stable adapter contract; specific vendors light up as demand lands.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="How an adapter is shaped"
        title="Read-mostly. Write when a human signs off."
        body={<p style={{ margin: 0 }}>Every adapter is a two-surface contract: a read side that streams the system&rsquo;s state into the Pearl&rsquo;s context, and a write side that is gated behind the approval graph. Nebbos never writes into a system of record without a named-human sign-off. The read side updates continuously; the write side updates deliberately.</p>}
      />

      <FeatureRow
        eyebrow="Custom systems"
        title="If it has an API, it has an adapter."
        body={<p style={{ margin: 0 }}>Systems built in-house or vertical-specific systems without a public adapter get the same shape via a custom adapter delivered in the deployment package. The Pearl code stays the same; the adapter is the seam. Custom adapters typically land inside week two.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What Nebbos deliberately does NOT do"
        title="Never becomes another place your operators log in."
        body={<p style={{ margin: 0 }}>The work stays where it lives. The Pearl answers questions and drafts actions on top of the systems your operators already use. No new dashboard. No new inbox. No new source of truth. When the Pearl surfaces an action, it lands in the tool where the operator already lives &mdash; a Slack message, a Jira comment, a Salesforce task.</p>}
      />

      <CTABand
        headline="Connect your stack. Keep your stack."
        deck="A 30-minute call maps your stack to the adapter families and identifies which ones need custom shapes."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Read the docs", href: "/docs" }}
      />
    </>
  );
}
