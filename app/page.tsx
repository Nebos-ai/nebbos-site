import { HomeHero } from "@/components/sections/HomeHero";
import { HomeModesBand } from "@/components/sections/HomeModesBand";
import { CapabilityBentoGrid } from "@/components/sections/CapabilityBentoGrid";
import { HomeBands } from "@/components/sections/HomeBands";
import { HomeStory } from "@/components/sections/HomeStory";
import { HomeCTA } from "@/components/sections/HomeCTA";
import { InProductionBand } from "@/components/sections/InProductionBand";
import { BuiltWithNebbosBand } from "@/components/sections/BuiltWithNebbosBand";
import { NebbosInventoryBand } from "@/components/sections/NebbosInventoryBand";
import { SectionDivider } from "@/components/patterns/section-divider";

/**
 * PAGE · / (Home) · v15 · 2026-09-18 · section-composition doctrine applied
 *
 * v14 (2026-09-17) shipped 9 sections in intentional scene/text alternation
 * but the boundaries between sections were monotonous hairlines —
 * the eye couldn't tell one seam from the next, so the composition read
 * as accidental adjacency instead of designed rhythm.
 *
 * v15 applies docs/design/section-composition.md — each section carries a
 * ratified shape (hero-signature / trust-band / editorial-block / bento-dark
 * / catalog-grid / story-scene / stat-strip / cta-anchor) and every ~third
 * boundary carries a visible SectionDivider (chapter numeral + plus-marker
 * + strap). This gives the eye an intentional cadence to attach to.
 *
 * Composition sequence (per docs/design/section-composition.md § / (Home)):
 *
 *   #  Section                 Shape             Ground     Density   Boundary above
 *   ─  ──────────────────────  ────────────────  ─────────  ────────  ──────────────
 *   1  HomeHero                hero-signature    scene      anchor    — (top of page)
 *   2  InProductionBand        trust-band        paper-2    compact   MARKER · II
 *   3  HomeModesBand           editorial-block   paper      standard  hairline
 *   4  CapabilityBentoGrid     bento-dark        ink        anchor    REGISTER-BREAK · III
 *   5  HomeBands               catalog-grid      paper      standard  hairline
 *   6  HomeStory               story-scene       scene      anchor    MARKER · IV
 *   7  BuiltWithNebbosBand     stat-strip        paper-2    compact   hairline
 *   8  NebbosInventoryBand     catalog-grid      paper      standard  MARKER · V
 *   9  HomeCTA                 cta-anchor        scene      anchor    — (own register-break)
 *
 * Grounds:  SCENE → paper-2 → paper → INK → paper → SCENE → paper-2 → paper → SCENE.
 * Never three same-ground in a row. Register-break at position 4; closing scene at 9.
 * Marker boundaries at 2, 4, 6, 8. No two consecutive `anchor` density sections.
 */

export default function HomePage() {
  return (
    <>
      {/* 1. Signature hero — chapter I */}
      <HomeHero />

      {/* 2. Trust band · running in K-12 districts */}
      <SectionDivider chapter="II" strap="Where it starts today" />
      <InProductionBand />

      {/* 3. Editorial block · Managed vs Federated shape story */}
      <SectionDivider variant="hairline" />
      <HomeModesBand />

      {/* 4. Bento-dark · the ONE register-break */}
      <SectionDivider chapter="III" strap="The complete substrate" tone="anchor" />
      <CapabilityBentoGrid />

      {/* 5. Catalog grid · four products accordion */}
      <SectionDivider variant="hairline" />
      <HomeBands />

      {/* 6. Story-scene · three chapters of a working day */}
      <SectionDivider chapter="IV" strap="Three chapters of a working day" />
      <HomeStory />

      {/* 7. Stat strip · built-with-Nebbos dogfood */}
      <SectionDivider variant="hairline" />
      <BuiltWithNebbosBand />

      {/* 8. Catalog grid · Nebbos inventory (24-metric quadrant) */}
      <SectionDivider chapter="V" strap="Every substrate. Every rule. Every tool." />
      <NebbosInventoryBand />

      {/* 9. CTA anchor · closing chapter */}
      <HomeCTA />
    </>
  );
}
