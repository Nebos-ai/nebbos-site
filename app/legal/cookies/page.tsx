import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie policy",
  path: "/legal/cookies",
  description: "How the Nebbos website uses cookies and similar technologies.",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      lead={
        <>
          How the Nebbos website uses cookies and similar technologies. <span className="faint">Template — to be completed and reviewed by counsel before publishing.</span>
        </>
      }
    >
      <h2>What we use</h2>
      <p>The marketing site aims to run with minimal cookies. [List any strictly-necessary, analytics or preference cookies actually set, with purpose and duration.]</p>
      <h2>Your choices</h2>
      <p>[Describe the consent mechanism and how to change preferences, in line with ePrivacy / GDPR where applicable.]</p>
      <h2>Contact</h2>
      <p>Questions: <a href="mailto:hello@nebbos.ai">hello@nebbos.ai</a>.</p>
    </LegalPage>
  );
}
