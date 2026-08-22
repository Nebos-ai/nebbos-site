import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
import { StatBlock } from "@/components/ui/StatBlock";
import { Panel } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  path: "/pricing",
  description:
    "Nebbos is $150 per user per month, one flat price for every seat and every capability. Billed annually with a 15% prepay discount, ten-user minimum.",
});

/**
 * Pricing — rebuild-2026 · canonical $150/user/mo flat.
 *
 * Per memory `reference-nebos-pricing-canonical` (Correction #6, 2026-08-22,
 * founder-confirmed via AskUserQuestion during marketing rebuild session):
 * single flat per-user price. The tiered Core/Growth/Enterprise code enum in
 * `nebos-backend/billing.py::PLAN_PRICES` is legacy; the customer-facing
 * surface has been $150 flat for both confirmed decisions (2026-08-19 + 2026-08-22).
 */

const included = [
  "Every Pearl type in the catalog",
  "Every architectural feature",
  "A monthly bundle of AI Actions per seat",
  "Full audit trail, tamper-evident",
  "Every connector — Slack, GitHub, Google Calendar, Merge.dev umbrella",
  "Governance rails — Human-Only Zones, approval inbox, break-glass",
  "REST + FastMCP dual interface (agents get the same contract as humans)",
];

const separate = [
  { label: "Storage · live", value: "$20", unit: "/ GB / mo", detail: "Active Cradle memory + temporal knowledge graph." },
  { label: "Storage · archive", value: "$0.05", unit: "/ GB / mo", detail: "Audit trail + historical records." },
  { label: "Bring-your-own-keys", value: "$100", unit: "/ mo flat + overflow", detail: "Optional. For security-sensitive or regulated deployments." },
  { label: "Support / SLA", value: "Ladder", unit: "priced separately", detail: "Standard · Enterprise · 24×7. Does not gate any capability." },
];

const faqs: [string, string][] = [
  [
    "Why one flat price and not tiers?",
    "Because every seat gets every capability — every Pearl type, every architectural feature, the full deployment. Tiered pricing forces the smallest customers to skip features they need to see value on, and the largest customers to pay a premium for capabilities they'd have anyway. One flat price is honest.",
  ],
  [
    "What's an AI Action?",
    "An AI Action is one unit of reasoned work — a Pearl explaining a prediction, drafting a next step, answering a question. Watching signal and running the deterministic detectors doesn't consume Actions; only the reasoning does. Every seat comes with a monthly bundle; overage rolls into the same subscription in Nebbos tokens.",
  ],
  [
    "What are Nebbos tokens?",
    "A stable currency for overage, decoupled from the LLM providers' price swings. Your overage rate stays predictable when the model market moves. Same team activity generates fewer overage tokens over time as your Cradle matures — roughly one-tenth by month 24 for the same volume of underlying questions.",
  ],
  [
    "Why the ten-user minimum?",
    "Because a Pearl earns its keep by watching a whole department, not a single person. Ten users is where the deployment economics work for both sides — enough coverage to prove the Cradle compounding, small enough to start.",
  ],
  [
    "How does annual billing work?",
    "Annual contracts get a 15% prepay discount. The audit trail and your Cradle live in the system, so an annual commitment keeps your regulatory record continuous and your Cradle compounding.",
  ],
  [
    "Is pricing in USD or EUR?",
    "List price is in USD. Contracts can convert to EUR for EU-based customers at prevailing FX at contract sign.",
  ],
];

export default function PricingPage() {
  return (
    <>
      <Hero
        eyebrow="Pricing"
        title={
          <>
            $150 per user per month.
            <br />
            One flat price.
          </>
        }
        deck="Every seat gets every capability. Every Pearl type, every architectural feature, the full deployment — plus a monthly bundle of AI Actions. Billed annually with a 15% prepay discount, ten-user minimum."
      >
        <ButtonLink href="/demo" variant="primary">
          Book a demo →
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Talk to sales
        </ButtonLink>
      </Hero>

      {/* ── HEADLINE-METRIC ROW ─────────────────────────────────────────── */}
      <section
        style={{
          padding: "56px 0",
          borderTop: "1px solid var(--hairline)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 48,
          }}
        >
          <StatBlock label="Per seat" value="$150" detail="Monthly. Flat. Every seat gets every capability." />
          <StatBlock label="Annual prepay" value="15%" detail="Off the sticker price for an annual commitment." />
          <StatBlock label="Deployment floor" value="10" detail="Users. Where the deployment economics work for both sides." />
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--mist)", margin: 0 }}>
            What&apos;s included per seat
          </p>
          <h2
            style={{
              fontFamily: "var(--font-dm-sans), var(--font-sans)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
              fontWeight: 500,
              color: "var(--paper)",
              margin: "16px 0 40px",
              maxWidth: "24ch",
              textWrap: "balance",
            }}
          >
            Every seat gets the whole platform. No tier gates.
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
              maxWidth: "88ch",
            }}
          >
            {included.map((line) => (
              <li
                key={line}
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid var(--hairline)",
                  fontSize: 17,
                  color: "var(--paper)",
                  display: "grid",
                  gridTemplateColumns: "22px 1fr",
                  gap: 8,
                  alignItems: "start",
                }}
              >
                <span style={{ color: "var(--blue)", fontVariantNumeric: "tabular-nums" }}>·</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PRICED SEPARATELY ───────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--mist)", margin: 0 }}>
            Priced separately
          </p>
          <h2
            style={{
              fontFamily: "var(--font-dm-sans), var(--font-sans)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
              fontWeight: 500,
              color: "var(--paper)",
              margin: "16px 0 40px",
              maxWidth: "24ch",
              textWrap: "balance",
            }}
          >
            The lines that scale with your usage, not your seats.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 40,
              maxWidth: "88ch",
            }}
          >
            {separate.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p className="eyebrow" style={{ margin: 0, color: "var(--mist)" }}>
                  {s.label}
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans), var(--font-sans)",
                    fontSize: 30,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    fontWeight: 500,
                    color: "var(--paper)",
                  }}
                >
                  {s.value}
                  <span style={{ fontSize: 14, color: "var(--mist)", fontWeight: 400 }}>
                    {" "}
                    {s.unit}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "var(--mist)", maxWidth: "36ch" }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE CALLOUT ──────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container">
          <Panel label="Enterprise">
            <h3 style={{ marginTop: 8, fontSize: 22, color: "var(--paper)" }}>
              Volume pricing, extended retention, procurement &amp; DPA support.
            </h3>
            <p className="mist" style={{ marginTop: 8, maxWidth: "60ch" }}>
              For organizations adopting Nebbos org-wide. Custom contract terms, regulator-export
              support, security review, and volume pricing across large seat counts.
            </p>
            <div style={{ marginTop: 16 }}>
              <ButtonLink href="/contact" variant="light">
                Talk to us →
              </ButtonLink>
            </div>
          </Panel>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--mist)", margin: 0 }}>
            Questions
          </p>
          <h2
            style={{
              fontFamily: "var(--font-dm-sans), var(--font-sans)",
              fontSize: "clamp(28px, 3.2vw, 42px)",
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
              fontWeight: 500,
              color: "var(--paper)",
              margin: "16px 0 40px",
              maxWidth: "24ch",
              textWrap: "balance",
            }}
          >
            Pricing, answered.
          </h2>
          <div style={{ maxWidth: "72ch" }}>
            {faqs.map(([q, a]) => (
              <details
                key={q}
                style={{ borderBottom: "1px solid var(--hairline)", padding: "20px 0" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--paper)",
                  }}
                >
                  {q}
                </summary>
                <p style={{ marginTop: 12, color: "var(--mist)", fontSize: 16, lineHeight: 1.6 }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────────────────── */}
      <CTABand
        headline="Start with one Pearl. See it pay for itself."
        deck="Put Nebbos on your hardest department. Prove the value on your own data. Expand from there."
        primary={{ label: "Book a demo →", href: "/demo" }}
        secondary={{ label: "Talk to sales", href: "/contact" }}
      />
    </>
  );
}
