import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  path: "/pricing",
  description:
    "Nebbos is priced per Pearl — one per department — not per user. Lite, Growth and Scale tiers, with included AI Actions and annual savings.",
});

const tiers = [
  {
    name: "Lite",
    price: "€649",
    unit: "/ Pearl / mo",
    desc: "One department, getting its first foresight.",
    features: ["1 department Pearl", "5,000 AI Actions / mo", "Connectors & dashboard", "Full audit trail"],
    cta: "Start with Lite",
    feature: false,
  },
  {
    name: "Growth",
    price: "€1,499",
    unit: "/ Pearl / mo",
    desc: "For departments running on Nebbos day to day.",
    features: ["Everything in Lite", "15,000 AI Actions / mo", "Earned, bounded autonomy", "Agent interface access"],
    cta: "Choose Growth →",
    feature: true,
  },
  {
    name: "Scale",
    price: "€2,299",
    unit: "/ Pearl / mo",
    desc: "High-volume departments and cross-team signal.",
    features: ["Everything in Growth", "50,000 AI Actions / mo", "Priority signal processing", "Extended retention options"],
    cta: "Choose Scale",
    feature: false,
  },
];

const faqs = [
  ["Why per Pearl and not per user?", "Because the value is the department being watched, not the number of people logging in. One Pearl covers a whole department, and everyone on that team benefits from it. You scale by adding departments, not seats."],
  ["What's an AI Action?", "An AI Action is one unit of Pearl's reasoning work — explaining a prediction, drafting a next step, answering a question. Watching your signal and running the deterministic detectors doesn't consume Actions; only the reasoning does. Each tier includes a monthly allowance, with top-up packs if you exceed it."],
  ["Can I start with one department?", "Yes — most teams do. Put a Pearl on your hardest department, prove the value on your own data, then expand. Pearls share what they learn where it's relevant as you add them."],
  ["How does annual billing work?", "Annual plans are billed once a year and save 12% versus monthly. The audit trail and your Operational Graph live in the system, so an annual commitment keeps your regulatory record continuous."],
  ["Do prices include onboarding?", "Connecting your stack and standing up your first Pearl is part of getting started. For org-wide rollouts with procurement, DPA and security review, talk to us about Enterprise."],
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Priced per Pearl. Not per seat."
        lead="You pay for the departments you put a Pearl on — and the work it does for them. Everyone on the team can use it. Annual plans save 12%."
      />

      <Section>
        <div className="grid grid-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="panel"
              style={
                t.feature
                  ? { borderColor: "rgba(99,125,255,.5)", position: "relative" }
                  : undefined
              }
            >
              {t.feature ? (
                <div className="mono text-blue" style={{ fontSize: 12, marginBottom: 8 }}>
                  Most chosen
                </div>
              ) : null}
              <div style={{ fontSize: 19, fontWeight: 600 }}>{t.name}</div>
              <div style={{ marginTop: 12, fontSize: 34, fontWeight: 700 }}>
                {t.price}
                <span className="faint" style={{ fontSize: 14, fontWeight: 400 }}> {t.unit}</span>
              </div>
              <p className="mist" style={{ marginTop: 8, fontSize: 15 }}>{t.desc}</p>
              <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
                {t.features.map((f) => (
                  <li key={f} className="mist" style={{ padding: "6px 0", fontSize: 15 }}>
                    <span className="text-blue">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24 }}>
                <ButtonLink href="/demo" variant={t.feature ? "primary" : "ghost"}>
                  {t.cta}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <Panel label="Enterprise">
            <h3 style={{ marginTop: 8, fontSize: 22 }}>
              Many departments, custom retention, procurement &amp; DPA support
            </h3>
            <p className="mist" style={{ marginTop: 8, maxWidth: "60ch" }}>
              Volume pricing across Pearls, extended audit retention, regulator-export support, and
              security review. Built for organisations adopting Nebbos org-wide.
            </p>
            <div style={{ marginTop: 16 }}>
              <ButtonLink href="/contact" variant="light">Talk to us →</ButtonLink>
            </div>
          </Panel>
        </div>
        {/* FOUNDER-SIGNOFF: all tier prices (€649 / €1,499 / €2,299 per Pearl/mo), AI Action allowances (5k/15k/50k), the −12% annual discount, and the per-Pearl model — these reflect current internal pricing and must be confirmed before publishing publicly. */}
        <p className="mono faint" style={{ marginTop: 16, fontSize: 12 }}>
          Figures reflect current internal pricing — confirmed before publishing. Overage on AI Actions
          billed per pack; annual plans −12%.
        </p>
      </Section>

      <Section divider>
        <p className="eyebrow">Questions</p>
        <h2 style={{ marginTop: 20, fontSize: "clamp(26px,3.6vw,44px)" }}>Pricing, answered.</h2>
        <div style={{ marginTop: 40, maxWidth: "72ch" }}>
          {faqs.map(([q, a]) => (
            <details
              key={q}
              style={{ borderBottom: "1px solid var(--hairline)", padding: "18px 0" }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 500, fontSize: 18 }}>{q}</summary>
              <p className="mist" style={{ marginTop: 12 }}>{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section divider>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,3.6vw,44px)", maxWidth: "20ch", marginInline: "auto" }}>
            Start with one Pearl. See it pay for itself.
          </h2>
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Request access</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
