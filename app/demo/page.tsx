import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/app/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Book a demo",
  path: "/demo",
  description: "See Nebbos on your own data. Connect your stack. Your first Pearl starts watching.",
});

export default function DemoPage() {
  return (
    <>
      <Hero
        eyebrow="Book a demo"
        title={<>See what your operations<br />are about to do.</>}
        deck="Connect your stack. Your first Pearl starts watching."
      >
        <ButtonLink href="/pricing" variant="ghost">See pricing</ButtonLink>
      </Hero>

      <section style={{ padding: "56px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <div className="panel" style={{ maxWidth: 640 }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <CTABand
        headline="One flat price. Every seat gets everything."
        primary={{ label: "See pricing", href: "/pricing" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
