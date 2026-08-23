import type { Metadata } from "next";
import { CONTACT, mailto } from "@/content/contact";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Book a demo",
  description: "See a Pearl on your hardest department. Live in days, not quarters.",
};

export default function DemoPage() {
  return (
    <>
      <section
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule)",
          paddingBlock: "clamp(96px, 14vh, 176px) clamp(64px, 8vh, 96px)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="00" label="Book a demo" />
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 5.6vw, 84px)",
                lineHeight: 1.02,
                letterSpacing: "-0.024em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "22ch",
                textWrap: "balance",
              }}
            >
              See a Pearl on your{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                hardest
              </em>{" "}
              department.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2vw, 26px)",
                lineHeight: 1.4,
                color: "var(--ink-2)",
                margin: "24px 0 0 0",
                maxWidth: "48ch",
              }}
            >
              Thirty minutes. We show you a Pearl reading the signal your work
              emits, predicting what&rsquo;s about to go wrong, explaining why, and
              acting under your approval.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--paper-2)",
          paddingBlock: "var(--section-y-lg)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "clamp(32px, 6vw, 88px)",
              alignItems: "start",
            }}
            className="demo-grid"
          >
            <div>
              <SectionNumeral n="01" label="What we&rsquo;ll cover" />
              <ol
                style={{
                  listStyle: "none",
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {[
                  "Which of your departments is the highest-leverage candidate",
                  "The specific signals a Pearl for that department would ingest",
                  "How approval gates and audit trails fit your compliance shape",
                  "Time-to-live and priced-shape for a two-department pilot",
                ].map((item, i) => (
                  <li
                    key={item}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                      borderBottom: "1px solid var(--rule)",
                      paddingBlock: 20,
                      display: "grid",
                      gridTemplateColumns: "auto minmax(0, 1fr)",
                      gap: 20,
                      alignItems: "baseline",
                    }}
                  >
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, lineHeight: 1.5, color: "var(--ink)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionNumeral n="02" label="How to reach us" />
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 18,
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    margin: 0,
                    maxWidth: "44ch",
                  }}
                >
                  We reply within one business day. If your procurement runs on
                  MSAs and DPAs, ping enterprise directly and we&rsquo;ll route.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Button
                    href={mailto(CONTACT.enterprise, "Demo request — nebbos.ai")}
                    size="lg"
                  >
                    Email enterprise → {CONTACT.enterprise}
                  </Button>
                  <Button
                    href={mailto(CONTACT.general, "Demo request — nebbos.ai")}
                    variant="ghost"
                    size="lg"
                  >
                    Email general → {CONTACT.general}
                  </Button>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "var(--ink-3)",
                    margin: 0,
                    maxWidth: "40ch",
                    lineHeight: 1.5,
                  }}
                >
                  A calendar form will replace these mailtos as soon as we have
                  a scheduling substrate wired in. Until then, email is faster
                  than a form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .demo-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
