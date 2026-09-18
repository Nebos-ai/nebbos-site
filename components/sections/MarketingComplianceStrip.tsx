/**
 * MarketingComplianceStrip · v1 · 2026-09-18
 *
 * The trust anchor that sits directly under MarketingHero on the dark
 * marketing register. Two mono lines: hardware certs, framework certs
 * with honest status suffixes. Distinct from the paper-2 ComplianceStrip
 * used on the v3 substrate — this one lives on dark ground.
 */

export function MarketingComplianceStrip() {
  return (
    <aside className="mkt mkt-strip" aria-label="Compliance and certification status">
      <div className="mkt-strip__inner">
        <p className="mkt-strip__line mkt-strip__line--emph">
          FIPS 140-3 L3 &middot; CC EAL5+ &middot; CSfC 2-layer &middot; MIL-STD-810G &middot; IP68 &middot; TAA
        </p>
        <p className="mkt-strip__line">
          NIST SP 800-53 &middot; CMMC L3 (in preparation) &middot; SOC 2 Type II (in progress) &middot; ISO 27001:2022 (not yet held) &middot; EU AI Act Annex IV (in preparation)
        </p>
      </div>
    </aside>
  );
}
