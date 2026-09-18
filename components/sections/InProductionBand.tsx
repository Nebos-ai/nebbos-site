/**
 * InProductionBand · v2 · 2026-09-18
 *
 * Truthful social-proof band that lands right after the hero when — and
 * only when — there is a substantiated in-production claim to make.
 *
 * HISTORY: v1 (2026-09-12) hard-coded "school districts across multiple
 * U.S. states" and "case studies as each district signs off publicly." // claim-source: retraction-history
 * Zero substrate backing. Rewritten 2026-09-18 to the same disposition
 * as MarketingProof v3 (PR #107): the fabricated copy is removed, the
 * shell is retained, and the component now renders NOTHING until an
 * in-production claim entry exists in `content/claims.ts` with a proper
 * `source_of_record`. Founder-directed remediation 2026-09-18 after the
 * `scripts/check-marketing-claims.mjs` gate surfaced the parity hazard
 * to MarketingProof.
 *
 * DISCIPLINE
 *
 *   - No inline customer / geo / deployment claims. Every claim comes
 *     from `content/claims.ts` and carries a `source_of_record`.
 *   - When there ARE substantiated in-production claims, add them to
 *     `content/claims.ts` under the `in-production-*` prefix and this
 *     component starts rendering.
 *   - Empty state is honest — an in-production band with no in-production
 *     substrate simply doesn't render. No placeholder "coming soon" copy.
 */

import { CLAIMS } from "@/content/claims";

/**
 * The prefix that flags an entry as an in-production customer claim.
 * The band renders only when at least one claim slug starts with this.
 */
const IN_PRODUCTION_PREFIX = "in-production-";

export function InProductionBand() {
  const inProductionClaims = Object.values(CLAIMS).filter((c) =>
    c.id.startsWith(IN_PRODUCTION_PREFIX),
  );
  if (inProductionClaims.length === 0) {
    // Honest empty state — no substantiated in-production claim exists,
    // so this band does not render. Do NOT ship placeholder copy.
    return null;
  }

  // Render path activates when the substrate has at least one entry.
  // Shape kept minimal here; a subsequent PR fills the visual treatment
  // when the first claim lands.
  return (
    <section
      aria-labelledby="in-production-heading"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="container"
        style={{
          paddingBlock: "var(--section-y-compact)",
          display: "grid",
          gap: "var(--section-gap-standard)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            margin: 0,
          }}
        >
          In production
        </p>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "var(--section-gap-standard)",
          }}
        >
          {inProductionClaims.map((c) => (
            <li
              key={c.id}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(16px, 1.4vw, 18px)",
                lineHeight: 1.5,
                color: "var(--ink-2)",
              }}
            >
              {c.value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
