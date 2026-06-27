import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Subprocessors",
  path: "/legal/subprocessors",
  description: "The third parties Nebbos uses to provide the service.",
});

export default function SubprocessorsPage() {
  return (
    <LegalPage
      title="Subprocessors"
      lead={
        <>
          The third-party providers Nebbos uses to deliver the service. <span className="faint">Template — to be completed and reviewed by counsel before publishing.</span>
        </>
      }
    >
      <h2>Current subprocessors</h2>
      <p>[List each subprocessor, the service they provide, and their processing location. Confirm the full, current list before publishing.]</p>
      <ul>
        <li>[Cloud hosting provider] — infrastructure — [region]</li>
        <li>[Model / inference providers] — reasoning — [region]</li>
        <li>[Email / support tooling] — communications — [region]</li>
      </ul>
      <h2>Changes</h2>
      <p>We&rsquo;ll give notice before adding or replacing a subprocessor, as set out in the <a href="/legal/dpa">DPA</a>. [Describe the notification and objection process.]</p>
    </LegalPage>
  );
}
