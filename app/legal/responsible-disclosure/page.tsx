import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Responsible disclosure",
  path: "/legal/responsible-disclosure",
  description: "How to report a security vulnerability to Nebbos.",
});

export default function ResponsibleDisclosurePage() {
  return (
    <LegalPage
      title="Responsible disclosure"
      lead={
        <>
          How to report a security vulnerability to Nebbos, and what to expect. <span className="faint">Template — to be completed and reviewed by counsel before publishing.</span>
        </>
      }
    >
      <h2>Reporting</h2>
      <p>If you believe you&rsquo;ve found a security issue, email <a href="mailto:security@nebbos.ai">security@nebbos.ai</a> with enough detail to reproduce it. [Confirm the security inbox before publishing.]</p>
      <h2>Our commitment</h2>
      <ul>
        <li>We&rsquo;ll acknowledge your report and keep you updated.</li>
        <li>We won&rsquo;t pursue good-faith research that respects user privacy and avoids service disruption.</li>
        <li>We&rsquo;ll credit you once the issue is resolved, if you&rsquo;d like.</li>
      </ul>
      <h2>Scope</h2>
      <p>[Define in-scope domains and systems, and anything explicitly out of scope.]</p>
    </LegalPage>
  );
}
