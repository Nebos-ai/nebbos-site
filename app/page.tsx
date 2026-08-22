import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { StatBlock } from "@/components/ui/StatBlock";
import { CTABand } from "@/components/ui/CTABand";
import { Tile } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

/**
 * Home page — rebuild-2026 (Palantir aesthetic + Apple voice).
 *
 * Through-line: "You use Nebbos to build your company's brain." The reader is
 * the builder; Nebbos is what they build with. No corporate "we" anywhere on
 * this page. Every sentence stays under 25 words. Every claim is grounded in
 * capability that ships today (per rebuild audit 2026-08-22).
 *
 * Pricing referenced here is the canonical $150/user/mo flat — per memory
 * `reference-nebos-pricing-canonical` Correction #6 (2026-08-22).
 */
export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────
          Recommended by rebuild audit; approved by founder 2026-08-22.
          Ties to the strongest existing line on the site
          (/solutions/operations "Stop finding out on Friday.")
      */}
      <Hero
        size="xl"
        eyebrow="Build your company's brain."
        title={
          <>
            See Friday&apos;s problem
            <br />
            on Monday.
          </>
        }
        deck="Nebbos reads the signal your work already emits — and shows you what breaks next."
      >
        <ButtonLink href="/demo" variant="primary">
          Book a demo →
        </ButtonLink>
        <ButtonLink href="/platform/how-it-works" variant="ghost">
          See how it works
        </ButtonLink>
      </Hero>

      {/* ── METRIC STRIP ─────────────────────────────────────────────────────
          Three hard-facts. Grounded in the capability audit — 132 routes,
          six deterministic detectors, one Pearl per department. No adjectives.
      */}
      <section
        style={{
          padding: "48px 0 72px",
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
          <StatBlock
            label="Platform"
            value="132 routes"
            detail="The backend is built, not planned. FastAPI plus FastMCP — same interface for humans and agents."
          />
          <StatBlock
            label="Watching"
            value="6 detectors"
            detail="Deadline risk. Capacity collision. Velocity collapse. Handoff stall. Absence signal. Cascade risk. Always on."
          />
          <StatBlock
            label="Per department"
            value="1 Pearl"
            detail="Pre-educated in your work. Learns independently. Owned by you, not the vendor."
          />
        </div>
      </section>

      {/* ── ARCHITECTURE ─────────────────────────────────────────────────── */}
      <FeatureRow
        id="architecture"
        eyebrow="The architecture"
        title={
          <>
            Cradle. Shell. Pearl.
            <br />
            One brain, three layers.
          </>
        }
        body={
          <>
            <p style={{ margin: "0 0 12px" }}>
              <strong style={{ color: "var(--paper)" }}>Cradle</strong> is the data backbone that
              connects every Pearl. Every question, every decision, every correction compounds into it.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              <strong style={{ color: "var(--paper)" }}>Shell</strong> is a department-scoped
              intelligence container. Six leaf departments at a mid-size company means six Shells.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--paper)" }}>Pearl</strong> is the agent inside. One per
              department. Pre-educated in your work. Learns independently. Never trained on anyone
              else&apos;s data.
            </p>
          </>
        }
        evidence={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32 }}>
            <StatBlock label="Depth" value="20+" detail="Canonical Pearl types across the shipped catalog." />
            <StatBlock label="Sovereignty" value="Yours" detail="Portable, exportable, owned. Never rented back to you." />
            <StatBlock label="Interface" value="Dual" detail="REST for humans. FastMCP at /mcp for agents. Same contract." />
            <StatBlock label="Isolation" value="RLS" detail="PostgreSQL row-level security on every tenant table. CI-enforced." />
          </div>
        }
      />

      {/* ── THE FIVE QUESTIONS ───────────────────────────────────────────── */}
      <FeatureRow
        id="five-questions"
        reverse
        eyebrow="How Nebbos reads your work"
        title={
          <>
            The five questions.
            <br />
            In order.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            Signal and Prediction run continuously — cheap to watch. Only when a pattern trips does
            Nebbos reason about it. And only after reasoning does anything move.
          </p>
        }
        evidence={
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {[
              { q: "Q1", name: "Signal", one: "What's happening right now." },
              { q: "Q2", name: "Prediction", one: "What's about to go wrong." },
              { q: "Q3", name: "Reasoning", one: "Why it's going wrong." },
              { q: "Q4", name: "Action", one: "What to do about it." },
              { q: "Q5", name: "Learning", one: "What you've learned." },
            ].map((row) => (
              <li
                key={row.q}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: 20,
                  paddingBottom: 20,
                  borderBottom: "1px solid var(--hairline)",
                }}
              >
                <span
                  className="eyebrow"
                  style={{ margin: 0, color: "var(--blue)", alignSelf: "start" }}
                >
                  {row.q}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-sans), var(--font-sans)",
                      fontSize: 20,
                      fontWeight: 500,
                      color: "var(--paper)",
                      marginBottom: 4,
                    }}
                  >
                    {row.name}
                  </div>
                  <div style={{ fontSize: 15, color: "var(--mist)" }}>{row.one}</div>
                </div>
              </li>
            ))}
          </ol>
        }
      />

      {/* ── GOVERNANCE ───────────────────────────────────────────────────── */}
      <FeatureRow
        id="governance"
        eyebrow="Human on the calls that matter"
        title={
          <>
            Nebbos can act.
            <br />
            It waits until you approve.
          </>
        }
        body={
          <>
            <p style={{ margin: "0 0 12px" }}>
              Every riskier move is rehearsed in a sandbox first, then passed to a human checkpoint.
              Autonomy is earned, bounded to what&apos;s been proven, and always reversible.
            </p>
            <p style={{ margin: 0 }}>
              Every decision is sourced. Every action is logged in a tamper-evident audit trail.
              Built for the EU AI Act high-risk bar, not retrofitted to it.
            </p>
          </>
        }
        evidence={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32 }}>
            <StatBlock label="Simulation" value="Coming" tone="muted" detail="Rehearse riskier moves in a sandbox before they touch production. Planned; on the roadmap." />
            <StatBlock label="Audit trail" value="Tamper-evident" detail="Every decision has provenance. Every action is logged. Cryptographically sealed." />
            <StatBlock label="Human-Only Zones" value="4" detail="The categories where an AI must never write. Enforced at the vocabulary layer." />
            <StatBlock label="Regulation" value="AI Act" detail="Built to Article 11 Annex IV. Aggregate observation. Never individual scoring." />
          </div>
        }
      />

      {/* ── AUDIENCE STRIP ─────────────────────────────────────────────────
          Kept as a light-weight Tile grid. Apple voice: one crisp line each.
      */}
      <section
        style={{ padding: "80px 0 64px", borderTop: "1px solid var(--hairline)" }}
      >
        <div className="container">
          <Eyebrow tone="faint">For every seat in the room</Eyebrow>
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
            Every role in the company needs something different from Nebbos.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 24,
            }}
          >
            <Tile label="CEO" title="A compounding vertical moat.">
              Every quarter your Cradle accumulates institutional judgment — decisions,
              patterns, corrections — that a competitor would need 12–24 months to
              replicate if they started today.
            </Tile>
            <Tile label="CFO" title="One flat price. Predictable growth.">
              $150 per user per month, one flat price for every seat. Overage bills in
              Nebbos tokens — a stable currency, decoupled from LLM providers&apos;
              price swings.
            </Tile>
            <Tile label="CTO" title="Any model. No lock-in.">
              A single router across every AI provider — swappable when a better one
              lands. Every check runs before any AI cost is incurred.
            </Tile>
            <Tile label="CHRO / Legal" title="It never acts alone.">
              Every riskier move waits for a human checkpoint. Aggregate observation
              only — Nebbos measures team patterns, never individuals.
            </Tile>
            <Tile label="Ops / COO" title="Stop finding out on Friday.">
              The stalled handoff and the slipping deadline surface while you can still
              move on them — not in next week&apos;s post-mortem.
            </Tile>
            <Tile label="Every employee" title="A colleague who did the homework.">
              Pearl arrives caught up. It asks why the date moved, never how you feel.
              One agent per team, watching only what earns your attention.
            </Tile>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <CTABand
        headline="Put a Pearl on your hardest department."
        deck="See what your operations are about to do."
        primary={{ label: "Book a demo →", href: "/demo" }}
        secondary={{ label: "See the platform", href: "/platform" }}
      />
    </>
  );
}
