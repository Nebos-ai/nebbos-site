import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/app/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Book a demo",
  path: "/demo",
  description:
    "See Nebbos on your own data. Connect your stack and your first Pearl starts watching — predictions begin as soon as there's enough signal.",
});

const expect = [
  { dep: "30 minutes", title: "A walkthrough on your operation", body: "We map the five questions to your hardest department and show what Pearl would surface first." },
  { dep: "Your stack", title: "No rip-and-replace", body: "We talk through the connectors you already run and confirm coverage before anything is connected." },
  { dep: "Your review", title: "Security-ready", body: "Bring the questionnaire. Oversight is enforced in the architecture, and we built for it." },
];

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title="See what your operations are about to do."
        lead="Connect your stack and your first Pearl starts watching. Predictions begin as soon as there's enough signal. Tell us where to start and we'll set up a walkthrough on your own data."
      />

      <Section>
        <div className="grid grid-2" style={{ alignItems: "start", gap: 64 }}>
          <div className="panel">
            <ContactForm />
          </div>
          <div>
            <p className="eyebrow">What to expect</p>
            <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
              {expect.map((e) => (
                <Tile key={e.dep} label={e.dep} title={e.title}>{e.body}</Tile>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
