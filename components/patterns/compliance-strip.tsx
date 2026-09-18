/**
 * ComplianceStrip · patterns/compliance-strip.tsx · v1 · 2026-09-18
 *
 * The trust-anchor primitive that lands under the hero on institutional
 * pages. Small mono-uppercase line naming the certifications the substrate
 * is designed against, with honest status suffixes ("in progress", "not
 * yet held") per feedback_arithmetic_honesty_required_in_adr_and_plan_docs.
 *
 * Founder-directed per docs/marketing/homepage-first-time-visitor-strategy-
 * 2026-09-17.md §3 "Trust register": "The trust proof is a compliance
 * strip — mono type, small caps — near the hero. That strip carries the
 * trust load until the customer-wall lands. It shows the substrate is
 * real, the certifications are honest, and the scope is precise."
 *
 * Two lines: hardware/protocol certifications up top, framework
 * certifications below. Renders on paper-2 ground with hairline top +
 * bottom for a subtle band that reads as institutional infrastructure
 * (Doppler / Cloudflare / Stripe pattern), not marketing.
 *
 * Every claim on this strip has a source of truth:
 *   - FIPS 140-3 L3 · scoped to Nebbos Cradle module boundary (K350 base)
 *   - CC EAL5+ · Cradle module target
 *   - CSfC 2-layer · substrate composition
 *   - NIST SP 800-53 · AC-3(2), AC-5, IA-11, SC-28, SC-12, SC-13, AU-2..12(1)
 *   - MIL-STD-810G · Cradle physical spec
 *   - IP68 · Cradle physical spec
 *   - TAA · Cradle supply-chain compliance
 *   - CMMC L3 · in preparation
 *   - SOC 2 Type II · in progress
 *   - ISO 27001:2022 · NOT YET HELD
 *   - EU AI Act Annex IV · in preparation
 */

export interface ComplianceStripProps {
  /** Optional aria label for the strip; defaults to descriptive text. */
  ariaLabel?: string;
}

const HARDWARE_LINE = "FIPS 140-3 L3 · CC EAL5+ · CSfC 2-layer · MIL-STD-810G · IP68 · TAA";
const FRAMEWORK_LINE = "NIST SP 800-53 · CMMC L3 (in preparation) · SOC 2 Type II (in progress) · ISO 27001:2022 (not yet held) · EU AI Act Annex IV (in preparation)";

export function ComplianceStrip({
  ariaLabel = "Compliance and certification status",
}: ComplianceStripProps) {
  return (
    <aside className="compliance-strip" aria-label={ariaLabel}>
      <div className="container compliance-strip__inner">
        <p className="compliance-strip__line">{HARDWARE_LINE}</p>
        <p className="compliance-strip__line">{FRAMEWORK_LINE}</p>
      </div>
    </aside>
  );
}
