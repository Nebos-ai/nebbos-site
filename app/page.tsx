import { MarketingHero } from "@/components/sections/MarketingHero";
import { MarketingComplianceStrip } from "@/components/sections/MarketingComplianceStrip";
import { HomeBands } from "@/components/sections/HomeBands";
import { OperatorFlowchart } from "@/components/sections/OperatorFlowchart";
import { NebbosInventoryBand } from "@/components/sections/NebbosInventoryBand";
import { HomeCTA } from "@/components/sections/HomeCTA";
import { SectionDivider } from "@/components/patterns/section-divider";

/**
 * PAGE · / (Home) · v16 · 2026-09-18 · coherent-throughline rebuild
 *
 * Founder critique 2026-09-18 (verbatim): "the home page is still all
 * over the place you talk about schools and this and that you are not
 * really think this thru at the level of detail that you should be."
 *
 * v15 shipped 9 sections in a monotonous scene/text alternation with
 * dividers between them. Nine sections × nine tonally different
 * stories (school-districts trust band, Managed/Federated deployment
 * choice, capability grid, product accordion, magazine editorial
 * arc, 1-person/160-days dogfood, 24-metric inventory grid, closing
 * CTA) — the ARRANGEMENT was fine but the CONTENT sequence read as
 * a swap-meet of overlapping proof shapes competing for attention.
 * The school-districts band in particular was the tonal mismatch:
 * a K-12 vertical claim inside a categorical-infrastructure hero
 * page whose target audience is the CISO / procurement lead /
 * program manager persona at defense, financial services, and
 * public-sector buyers.
 *
 * v16 rebuilds against docs/marketing/homepage-first-time-visitor-
 * strategy-2026-09-17.md § 5 — the ratified 5-section coherent
 * throughline for a first-time visitor at each decision stage:
 *
 *   #  Section              Shape             Answers the visitor's question
 *   ─  ──────────────────   ────────────────  ────────────────────────────────
 *   1  HomeHero + strip     hero-signature    5s: What is this? Serious?
 *      + ComplianceStrip                       (Category claim + trust anchor
 *                                               in the SAME viewport, not a
 *                                               separate "schools" section)
 *   2  HomeBands            catalog-grid      30s: What are the 4 things?
 *                                               (Platform · App · MCP · Cradle)
 *   3  CapabilityBentoGrid  bento-dark        2min: How deep does the
 *                                               substrate go? (9 substrate
 *                                               capabilities, dark register-
 *                                               break signals "look under
 *                                               the hood")
 *   4  NebbosInventoryBand  catalog-grid      5min: Prove it's not a scam.
 *                                               (24 live-verified metrics
 *                                               from platform-metrics.json)
 *   5  HomeCTA              cta-anchor        30min: Book a briefing.
 *
 * RETIRED FROM HOME (components stay on disk for reuse elsewhere):
 *   - InProductionBand · K-12 school-districts trust band — belongs on
 *     /customers, not on a categorical home. Redundant with the
 *     compliance strip's trust-load and out-of-audience for the
 *     home page's CISO/procurement persona.
 *   - HomeModesBand · Managed vs Federated deployment-mode choice —
 *     belongs on /products where the deployment decision happens,
 *     not top-of-home before the visitor knows what the products
 *     are.
 *   - HomeStory · 3-chapter magazine editorial arc — belongs on
 *     /how or /about (persona-E surface), not on a CISO-facing
 *     home. Competes with the direct product answer for attention.
 *   - BuiltWithNebbosBand · 1-person/160-days/repos/LoC dogfood —
 *     duplicates NebbosInventoryBand's proof shape with a
 *     founder-brag register. Move to /how where Persona-E reads
 *     it as substrate proof, not marketing.
 *
 * Ground rhythm: SCENE → paper-2 (strip) → paper → INK → paper →
 * SCENE. One register-break in the middle (bento-dark). One
 * marker divider between substrate reveal and the numeric proof.
 * Hero + closing scene bookend the paper interior.
 *
 * Composition-source-of-truth: this docblock IS the composition
 * table. Any addition, removal, or reorder that breaks the table
 * breaks the doctrine — update this comment alongside the code.
 */

export default function HomePage() {
  return (
    <>
      {/* 1a. MarketingHero — dark register, text-left / visual-right split.
              Founder-directed 2026-09-18: nebbos.ai product-marketing register
              distinct from the v3 substrate (corporate parent). Reference:
              linear.app + figma.com. Proof-of-concept for whole-site aesthetic
              reboot — v3 substrate stays load-bearing for the rest of the
              site until this register is ratified across surfaces. */}
      <MarketingHero />

      {/* 1b. Trust anchor on dark — mono compliance strip. Distinct
              MarketingComplianceStrip variant that sits on dark ground. */}
      <MarketingComplianceStrip />

      {/* 2. Four products intro — hairline seam, catalog-grid density */}
      <SectionDivider variant="hairline" />
      <HomeBands />

      {/* 3. Substrate depth — GSAP horizontal-pin flowchart traces one
             hour of an operator's shift through the six substrate stages
             (Signal → Ingest → Memory → Approval → Action → Attestation).
             Founder-directed 2026-09-18 · pattern adapted from the pen
             codepen.io/dermalhealth/pen/GgNrpJx per docs/marketing/
             homepage-first-time-visitor-strategy §5.3. Cream paper ground,
             hairline paths, no register-break here (moved to Wave 2 —
             see composition doctrine). */}
      <SectionDivider chapter="II" strap="The complete substrate" />
      <OperatorFlowchart />

      {/* 4. Substrate in numbers — Persona-E diligence surface, live-
             verified metrics from platform-metrics.json. */}
      <SectionDivider chapter="III" strap="The substrate, in numbers" />
      <NebbosInventoryBand />

      {/* 5. Closing CTA — scene ground bookend, closing chapter. */}
      <HomeCTA />
    </>
  );
}
