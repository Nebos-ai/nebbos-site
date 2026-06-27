import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Data Processing Agreement",
  path: "/legal/dpa",
  description: "How Nebbos processes personal data on behalf of customers.",
});

export default function DpaPage() {
  return (
    <LegalPage
      title="Data Processing Agreement"
      lead={
        <>
          How Nebbos processes personal data on your behalf as a processor. <span className="faint">Template — to be completed and reviewed by counsel before publishing.</span>
        </>
      }
    >
      <h2>Roles</h2>
      <p>For customer data, the customer is the controller and Nebbos is the processor. [Set out the parties and the order of precedence with the main agreement.]</p>
      <h2>Scope &amp; nature of processing</h2>
      <p>Nebbos processes structured operational signal — events, patterns, thresholds, relationships and timing — to generate predictions, explanations and proposed actions within the customer&rsquo;s tenant. [Describe categories of data subjects and data.]</p>
      <h2>Security measures</h2>
      <p>Tenant isolation enforced at the database, role-scoped access, encryption in transit and at rest. [Reference Annex of technical and organisational measures.]</p>
      <h2>Sub-processors</h2>
      <p>Current sub-processors are listed on the <a href="/legal/subprocessors">Subprocessors</a> page. [Describe notice of changes and objection rights.]</p>
      <h2>International transfers</h2>
      <p>[State transfer mechanism, e.g. EU Standard Contractual Clauses, and hosting region.]</p>
      <h2>Contact</h2>
      <p>To execute a DPA: <a href="mailto:hello@nebbos.ai">hello@nebbos.ai</a>.</p>
    </LegalPage>
  );
}
