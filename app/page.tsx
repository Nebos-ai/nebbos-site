import { MarketingHero } from "@/components/sections/MarketingHero";
import { MarketingComplianceStrip } from "@/components/sections/MarketingComplianceStrip";
import { MarketingProductsBand } from "@/components/sections/MarketingProductsBand";
import { MarketingSubstrate } from "@/components/sections/MarketingSubstrate";
import { MarketingNumbers } from "@/components/sections/MarketingNumbers";
import { MarketingFAQ } from "@/components/sections/MarketingFAQ";
import { MarketingCTA } from "@/components/sections/MarketingCTA";

/**
 * PAGE · / (Home) · v17 · 2026-09-18 · full marketing-register rebuild
 *
 * Founder-directed 2026-09-18: whole nebbos.ai site rebuilt on the dark
 * Linear-tier marketing register (components/patterns/marketing-register
 * .css), distinct from the v3 substrate (which stays load-bearing for
 * nebbostechnologies.com corporate-parent surfaces).
 *
 * Six sections, one register, one throughline for the first-time visitor:
 *
 *   1  MarketingHero              5s     What is this? Text-left / mock-right
 *   1b MarketingComplianceStrip          Trust anchor in the same view
 *   2  MarketingProductsBand      30s    Four products, colored per-SKU
 *   3  MarketingSubstrate         2min   The six-stage operator loop
 *   4  MarketingNumbers           5min   Eight measured, sourced numbers
 *   5  MarketingCTA               30min  Book a briefing
 *
 * Every section lives on --mkt-ground (#05070a). No register-break, no
 * paper-cream detour, no serif italics. One aesthetic end to end.
 *
 * Retired components (kept on disk for other surfaces):
 *   - HomeHero, HomeBands, OperatorFlowchart, NebbosInventoryBand,
 *     HomeCTA — all v3 substrate, used on other routes not yet
 *     migrated to the marketing register.
 */

export default function HomePage() {
  return (
    <>
      <MarketingHero />
      <MarketingComplianceStrip />
      <MarketingProductsBand />
      <MarketingSubstrate />
      <MarketingNumbers />
      <MarketingFAQ />
      <MarketingCTA />
    </>
  );
}
