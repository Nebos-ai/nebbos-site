import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  title: "Contact",
  path: "/contact",
  description: "Put a Pearl on your hardest department. Tell us where to start.",
});

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title={<>Put a Pearl<br />on your hardest department.</>}
        deck="Tell us where to start."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <section style={{ padding: "56px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <div className="panel" style={{ maxWidth: 640 }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <CTABand
        headline="One price. Every seat. Every capability."
        primary={{ label: "Book a demo →", href: "/demo" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
