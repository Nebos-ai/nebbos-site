import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  path: "/legal/privacy",
  description: "How Nebbos collects, uses and protects information.",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      lead={
        <>
          How Nebbos collects, uses and protects information. <span className="faint">Template — to be completed and reviewed by counsel before publishing.</span>
        </>
      }
    >
      <h2>Who we are</h2>
      <p>Nebbos provides Operations Intelligence software. This policy explains what data we process, why, and the choices you have. [Add the legal entity, registered address and data-controller details.]</p>
      <h2>What we process</h2>
      <p>For the marketing site: basic analytics and any details you submit through the contact form (name, work email, company, message). For the product: structured operational events read from systems you connect — patterns, thresholds, relationships and timing — rather than the raw contents of messages and documents.</p>
      <h2>Why we process it</h2>
      <ul>
        <li>To respond to access requests and provide the service you ask for.</li>
        <li>To generate predictions and explanations within your own tenant.</li>
        <li>To maintain a complete, queryable audit trail of decisions.</li>
        <li>To meet legal and regulatory obligations.</li>
      </ul>
      <h2>Data isolation &amp; security</h2>
      <p>Customer data is isolated per tenant and enforced at the database. Access is scoped by role. [Add detail on hosting region, encryption in transit and at rest, sub-processors, and certifications once confirmed.]</p>
      <h2>Retention</h2>
      <p>[State default retention periods and any extended-retention options offered to enterprise customers.]</p>
      <h2>Your rights</h2>
      <p>Depending on where you live, you may have rights to access, correct, export or delete your personal data, and to object to certain processing. [Describe how to exercise them and your supervisory-authority details under GDPR.]</p>
      <h2>Contact</h2>
      <p>Questions about this policy: <a href="mailto:hello@nebbos.ai">hello@nebbos.ai</a>.</p>
    </LegalPage>
  );
}
