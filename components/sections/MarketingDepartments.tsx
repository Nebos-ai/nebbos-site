import Link from "next/link";
import { BRAND } from "@/content/brand";

/**
 * MarketingDepartments · sections/MarketingDepartments.tsx · v1 · 2026-09-18
 *
 * Replaces the prior MarketingProductsBand on the home page. Founder-
 * directed: "someone looking for a sovereign ai brain" wants to see
 * WHAT NEBBOS DOES for their week, not the four SKUs (that shape lives
 * on /products for the buyer already in evaluation).
 *
 * Consumer-psychology principles applied:
 *   - Self-relevance: every card names the buyer's own department.
 *   - Gain-framing: each outcome names the RELIEF (no more war room)
 *     not the mechanism (Pearl orchestration architecture).
 *   - Concrete before abstract: "Monthly close without the war room"
 *     scans faster than "capabilities that support financial ops."
 *   - Fewer words, more feeling.
 *
 * Content pulled from BRAND.flagshipDepartments so the same 4 rows
 * render identically across site + decks + one-pagers.
 */

const DEPT_CLASS = [
  "mkt-product--platform",
  "mkt-product--app",
  "mkt-product--mcp",
  "mkt-product--cradle",
];

export function MarketingDepartments() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-depts-h">
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          <p className="mkt-eyebrow">Departments</p>
          <h2 id="mkt-depts-h" className="mkt-h2">
            A Pearl for every department.
          </h2>
          <p className="mkt-deck">
            One brain per department. It reads the signals your team
            already emits, drafts the actions, and asks you to approve.
            Your team stops doing the operations and starts leading them.
          </p>
        </header>

        <div className="mkt-products__grid">
          {BRAND.flagshipDepartments.map((dept, i) => (
            <Link
              key={dept.name}
              href="/solutions"
              className={`mkt-product ${DEPT_CLASS[i]}`}
            >
              <span className="mkt-product__mark" aria-hidden />
              <div className="mkt-product__body">
                <p className="mkt-product__eyebrow">Pearl</p>
                <h3 className="mkt-product__name">{dept.name}</h3>
                <p className="mkt-product__tagline">{dept.outcome}</p>
              </div>
              <span className="mkt-product__link">
                See
                <span className="mkt-product__link-arrow" aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
