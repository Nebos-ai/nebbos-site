import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Acceptable use policy",
  path: "/legal/acceptable-use",
  description: "The rules that govern acceptable use of Nebbos.",
});

export default function AcceptableUsePage() {
  return (
    <LegalPage
      title="Acceptable use policy"
      lead={
        <>
          The rules that govern acceptable use of the Nebbos service. <span className="faint">Template — to be completed and reviewed by counsel before publishing.</span>
        </>
      }
    >
      <h2>Prohibited use</h2>
      <p>You may not use Nebbos to break the law, infringe others&rsquo; rights, or attempt to bypass the oversight and approval controls built into the platform. [Enumerate prohibited activities.]</p>
      <h2>Data you connect</h2>
      <p>Only connect systems and data you have the right to connect. Nebbos reads the shape of work, not the contents of records, but the responsibility for lawful basis remains with the customer.</p>
      <h2>Enforcement</h2>
      <p>[Describe suspension/termination for breach, and the notice process.]</p>
      <h2>Contact</h2>
      <p>Report misuse: <a href="mailto:hello@nebbos.ai">hello@nebbos.ai</a>.</p>
    </LegalPage>
  );
}
