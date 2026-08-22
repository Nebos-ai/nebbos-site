import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Integrations",
  path: "/platform/integrations",
  description: "Reads the stack you already run. No rip-and-replace.",
});

export default function IntegrationsPage() {
  return (
    <>
      <Hero
        eyebrow="Integrations"
        title={<>Reads the stack<br />you already run.</>}
        deck="No rip-and-replace. No new system of record."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What we read"
        title="The tools your team already opens."
        body={<p style={{ margin: 0 }}>HR, finance, ops, tickets, docs, calendars. If it holds the signal of the work, the platform can listen to it.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we don&rsquo;t do"
        title="We don&rsquo;t become another dashboard."
        body={<p style={{ margin: 0 }}>The work stays where it lives. The platform answers questions on top — it never asks your team to log in somewhere new.</p>}
      />

      <CTABand headline="Connect your stack. Keep your stack." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
