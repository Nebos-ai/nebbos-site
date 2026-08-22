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
        title={
          <>
            See what your operations
            <br />
            are <em style={{ fontStyle: "italic", color: "var(--gold)" }}>about</em> to do.
          </>
        }
        deck="Connect your stack. Your first Pearl starts watching."
      >
        <ButtonLink href="/pricing" variant="ghost">See pricing</ButtonLink>
      </Hero>

      <section style={{ padding: "72px 0", borderTop: "1px solid var(--rule)" }}>
        <div className="container">
          <div className="cut-corner" style={{ maxWidth: 640, padding: "32px 36px" }}>
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
