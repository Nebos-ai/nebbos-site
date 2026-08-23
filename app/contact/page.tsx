import Link from "next/link";
import type { Metadata } from "next";
import { CONTACT, mailto } from "@/content/contact";
import { SectionNumeral } from "@/components/ui/SectionNumeral";

export const metadata: Metadata = {
  title: "Contact",
  description: "Direct routing to every inbox at Nebbos — sales, security, privacy, engineering, press, legal.",
};

const INBOXES: Array<{ label: string; addr: string; strap: string }> = [
  { label: "General",     addr: CONTACT.general,    strap: "Sales, partnerships, misc." },
  { label: "Enterprise",  addr: CONTACT.enterprise, strap: "SOWs, MSAs, DPAs, procurement." },
  { label: "Engineering", addr: CONTACT.engineering, strap: "Developer + integration questions." },
  { label: "Security",    addr: CONTACT.security,   strap: "Vulnerability reports + incident notification." },
  { label: "Privacy",     addr: CONTACT.privacy,    strap: "Data-protection officer, GDPR, DSARs." },
  { label: "Legal",       addr: CONTACT.legal,      strap: "DPA / policy questions." },
  { label: "Press",       addr: CONTACT.press,      strap: "Journalist / analyst inquiries." },
];

export default function ContactPage() {
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
            <SectionNumeral n="00" label="Contact" />
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
              Direct routing.{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                No forms.
              </em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2vw, 26px)",
                lineHeight: 1.4,
                color: "var(--ink-2)",
                margin: "24px 0 0 0",
                maxWidth: "50ch",
              }}
            >
              Pick the inbox that matches the question. We reply within one
              business day.
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
          <ul
            style={{
              listStyle: "none",
              display: "grid",
              gap: 0,
            }}
          >
            {INBOXES.map((inbox, i) => (
              <li key={inbox.addr}>
                <Link
                  href={mailto(inbox.addr)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px minmax(0, 1fr) minmax(0, auto)",
                    gap: 32,
                    alignItems: "center",
                    padding: "clamp(20px, 3vh, 32px) clamp(0px, 2vw, 24px)",
                    borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                    borderBottom: "1px solid var(--rule)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "background var(--dur-fast) var(--ease-out)",
                  }}
                  className="inbox-row"
                >
                  <div className="eyebrow" style={{ color: "var(--gold)" }}>{inbox.label}</div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 22,
                        color: "var(--ink)",
                        letterSpacing: "-0.012em",
                      }}
                    >
                      {inbox.addr}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        color: "var(--ink-3)",
                        marginTop: 4,
                      }}
                    >
                      {inbox.strap}
                    </div>
                  </div>
                  <div
                    aria-hidden
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 24,
                      color: "var(--ink-3)",
                    }}
                  >
                    →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <style>{`
        .inbox-row:hover {
          background: var(--paper) !important;
        }
        @media (max-width: 700px) {
          .inbox-row {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 8px !important;
          }
          .inbox-row > div:last-child { display: none !important; }
        }
      `}</style>
    </>
  );
}
