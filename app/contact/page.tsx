import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { APP_URL, CONTACT_EMAIL } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  title: "Contact",
  path: "/contact",
  description: "Request access to Nebbos and we'll get your first Pearl watching your data.",
});

const reasons = [
  ["No rip-and-replace.", "We read from the tools you already use."],
  ["Live in days.", "Predictions begin as soon as there's enough signal."],
  ["Built for your security review.", "Oversight enforced in the architecture."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Let's get your first Pearl watching."
        lead="Tell us a little about your team and the department you'd start with. We'll be in touch to set up access and connect your stack."
      />

      <Section>
        <div className="grid grid-2" style={{ alignItems: "start", gap: 64 }}>
          <div className="panel">
            <ContactForm />
          </div>
          <div>
            <div className="qmark">Or reach us directly</div>
            <h3 style={{ marginTop: 12, fontSize: 22 }}>{CONTACT_EMAIL}</h3>
            <p className="mist" style={{ marginTop: 12, maxWidth: "42ch" }}>
              Prefer email? Write to us and we&rsquo;ll route you to the right person. Already a
              customer?{" "}
              <a href={APP_URL} className="text-blue" style={{ textDecoration: "underline" }} rel="noreferrer">
                Log in here
              </a>
              .
            </p>
            <div style={{ marginTop: 40 }}>
              {reasons.map(([t, d]) => (
                <div key={t} style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <span className="text-blue">✓</span>
                  <div>
                    <b style={{ color: "var(--paper)" }}>{t}</b>
                    <br />
                    <span className="mist" style={{ fontSize: 15 }}>{d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
