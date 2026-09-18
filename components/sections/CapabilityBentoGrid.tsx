import Link from "next/link";

/**
 * CapabilityBentoGrid · v1 · 2026-09-17
 *
 * The "everything Nebbos runs" section. Nine capability roles from the
 * Path B 12-vendor competitive audit — each cell links to the deep page
 * that governs that role. Dark register break (--ink ground) inserted
 * between the light Institutional Reserve bands (InProduction / HomeModes)
 * and the cinematic HomeBands accordion, giving the page visual variety
 * per founder direction "not enough sections, WordPress feel."
 *
 * Layout: asymmetric bento grid (3-col responsive, one featured wide cell
 * for the Nebbos-exclusive "substrate self-observation" capability). Each
 * cell uses the ratified size + color tokens (--size-eyebrow, --size-h3,
 * --font-mono, --font-serif, --accent-2 electric orange, --paper on --ink).
 *
 * Motion: hover state translates the arrow 4px + shifts accent color; CSS
 * scroll-timeline fade-in on each cell (matches CanonicalSection pattern).
 * prefers-reduced-motion collapses animation + shortens transitions.
 *
 * Focus: keyboard accessible via <Link>; :focus-visible ring at accent-2
 * with offset for 3:1 contrast on both light and dark grounds.
 */

type Capability = {
  key: string;
  role: string;
  headline: string;
  body: string;
  href: string;
  span?: "wide" | "tall"; // bento asymmetry
};

/**
 * Grid layout note (2026-09-18): span="wide" cells removed. In the 3-col
 * 3-row grid the asymmetric-wide cells left row-3-col-3 as a visible
 * empty slot — reads as "missing cell" not intentional whitespace. A
 * clean 3×3 uniform grid is the correct catalog-grid shape for the
 * home substrate reveal. Wide-cell asymmetric bento can return on a
 * dedicated /security or /trust page where fewer cells make the
 * asymmetry legible.
 */
const CAPABILITIES: readonly Capability[] = [
  {
    key: "processor",
    role: "Financial infrastructure",
    headline: "Nebbos IS the processor.",
    body: "Payments, invoicing, subscription rails — first-party at the substrate. Not a Stripe wrapper.",
    href: "/products/platform",
  },
  {
    key: "deploy",
    role: "Deploy",
    headline: "Ship, hosted or federated.",
    body: "Nebbos-native runtime or ingest your existing Railway / Vercel / AWS.",
    href: "/products/platform",
  },
  {
    key: "secrets",
    role: "Secrets custody",
    headline: "Hardware-attested.",
    body: "FIPS 140-3 L3 Cradle carries credentials. Physical presence gates every read.",
    href: "/security",
  },
  {
    key: "identity",
    role: "Identity + access",
    headline: "Biometric. USB. Enclave.",
    body: "Three factors, three tiers. Silicon-rooted, not passkey-tier.",
    href: "/products/cradle",
  },
  {
    key: "memory",
    role: "Memory + KG",
    headline: "Every operator, remembered.",
    body: "Two years in, Nebbos knows your operation better than any single hire could.",
    href: "/products/mcp",
  },
  {
    key: "tasks",
    role: "Task orchestration",
    headline: "Grounded by design.",
    body: "Every task carries grounded_in_feedback[] + justification + verification. CI-enforced.",
    href: "/products/platform",
  },
  {
    key: "alerts",
    role: "Alerts + on-call",
    headline: "Signal, before it's an incident.",
    body: "Pattern-detection over your ops surface. Pearl surfaces attention, human approves.",
    href: "/solutions/operations",
  },
  {
    key: "audit",
    role: "Substrate self-observation",
    headline: "Hash-chained. Auditor-ready.",
    body: "Every action attested at Layer 15. SOC 2 evidence writes itself.",
    href: "/trust",
  },
  {
    key: "sovereignty",
    role: "Sovereignty",
    headline: "Portable when you leave.",
    body: "Your Pearl, your memory, your keys — export in machine-readable form on your timeline.",
    href: "/sovereignty",
  },
];

export function CapabilityBentoGrid() {
  return (
    <section
      aria-labelledby="capability-bento-heading"
      className="capability-bento"
      style={{
        background: "var(--ink)",
        borderTop: "1px solid var(--ink-2)",
        borderBottom: "1px solid var(--ink-2)",
        color: "var(--paper)",
      }}
    >
      <div
        className="container capability-bento__inner"
        style={{
          // Section spacing tokens · anchor tier (dark register-break) — ratified 2026-09-18
          paddingBlock: "var(--section-y-anchor)",
          display: "grid",
          gap: "var(--section-gap-loose)",
          maxWidth: "var(--container-max)",
        }}
      >
        <div style={{ display: "grid", gap: "var(--section-gap-tight)", maxWidth: "56ch" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--size-eyebrow)",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--accent-2)",
              margin: 0,
            }}
          >
            The complete substrate
          </p>
          <h2
            id="capability-bento-heading"
            style={{
              // Canonical section-h2 shape · serif · fontWeight 400 (editorial) · italic-em accent on second phrase inherits parent weight · ratified 2026-09-18
              fontFamily: "var(--font-serif)",
              fontSize: "var(--size-h1)",
              lineHeight: 1.04,
              letterSpacing: "-0.024em",
              fontWeight: 400,
              color: "var(--paper)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Everything your AI-native operation{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: "inherit" }}>
              actually runs on.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--size-body-lg)",
              lineHeight: 1.5,
              color: "rgba(244, 241, 234, 0.72)",
              margin: 0,
              maxWidth: "56ch",
              fontWeight: 400,
            }}
          >
            Nine substrate capabilities — from payment processing to the audit trail. First-party
            where Nebbos runs it native; federated when your team already has a tool wired.
          </p>
        </div>

        <div className="capability-bento__grid" role="list">
          {CAPABILITIES.map((cap) => (
            <Link
              key={cap.key}
              href={cap.href}
              role="listitem"
              className={`capability-bento__cell capability-bento__cell--${cap.span ?? "default"}`}
            >
              <span className="capability-bento__cell-role">{cap.role}</span>
              <h3 className="capability-bento__cell-headline">{cap.headline}</h3>
              <p className="capability-bento__cell-body">{cap.body}</p>
              <span className="capability-bento__cell-arrow" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .capability-bento__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--ink-2);
          border: 1px solid var(--ink-2);
        }
        @media (min-width: 720px) {
          .capability-bento__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1080px) {
          .capability-bento__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .capability-bento__cell--wide {
            grid-column: span 2;
          }
        }

        .capability-bento__cell {
          background: var(--ink);
          padding: clamp(28px, 3vw, 44px);
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          gap: 16px;
          min-height: 220px;
          text-decoration: none;
          color: inherit;
          transition:
            background 200ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .capability-bento__cell:hover,
        .capability-bento__cell:focus-visible {
          background: color-mix(in oklab, var(--ink) 88%, var(--accent-2) 12%);
          transform: translateY(-2px);
        }
        .capability-bento__cell:focus-visible {
          outline: 2px solid var(--accent-2);
          outline-offset: -2px;
        }

        .capability-bento__cell-role {
          font-family: var(--font-mono);
          font-size: var(--size-eyebrow);
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--accent-2);
        }
        .capability-bento__cell-headline {
          font-family: var(--font-serif);
          font-size: clamp(20px, 1.8vw, 26px);
          line-height: 1.12;
          letter-spacing: -0.015em;
          font-weight: 600;
          color: var(--paper);
          margin: 0;
          max-width: 24ch;
          text-wrap: balance;
        }
        .capability-bento__cell-body {
          font-family: var(--font-sans);
          font-size: var(--size-body-sm);
          line-height: 1.5;
          color: rgba(244, 241, 234, 0.68);
          margin: 0;
          max-width: 34ch;
          font-weight: 400;
        }
        .capability-bento__cell-arrow {
          font-family: var(--font-serif);
          font-size: 24px;
          line-height: 1;
          color: var(--accent-2);
          justify-self: end;
          align-self: end;
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .capability-bento__cell:hover .capability-bento__cell-arrow,
        .capability-bento__cell:focus-visible .capability-bento__cell-arrow {
          transform: translateX(6px);
        }

        /* Scroll-triggered fade-in per cell (CanonicalSection pattern).
           BASE state opacity: 1 so cells are visible without JS, without
           scroll, without scroll-timeline support, and — critically —
           in stitched fullPage screenshots. The animation is progressive
           enhancement wrapped in @supports; if the browser lacks
           animation-timeline: view(), the base opacity holds and the
           cells stay legible. Fixes 2026-09-18 "empty gray rectangle"
           defect where cells sat at opacity 0 in the pre-viewport state. */
        .capability-bento__cell { opacity: 1; }
        @supports (animation-timeline: view()) {
          @keyframes capabilityBentoFadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .capability-bento__cell {
            animation: capabilityBentoFadeIn linear;
            animation-timeline: view();
            animation-range: entry 0% entry 55%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .capability-bento__cell,
          .capability-bento__cell-arrow {
            animation: none !important;
            transition-duration: 100ms !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
