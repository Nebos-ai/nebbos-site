import { HomeHero } from "@/components/sections/HomeHero";
import { HomeModesBand } from "@/components/sections/HomeModesBand";
import { CapabilityBentoGrid } from "@/components/sections/CapabilityBentoGrid";
import { HomeBands } from "@/components/sections/HomeBands";
import { HomeStory } from "@/components/sections/HomeStory";
import { HomeCTA } from "@/components/sections/HomeCTA";
import { InProductionBand } from "@/components/sections/InProductionBand";
import { BuiltWithNebbosBand } from "@/components/sections/BuiltWithNebbosBand";
import { NebbosInventoryBand } from "@/components/sections/NebbosInventoryBand";

/**
 * PAGE · / (Home) · v14 · 2026-09-17 · Modes-band scrim fix
 *
 * v14 replaces the two sequential PageHero scene tiles (Managed / Federated)
 * with a single HomeModesBand — Institutional Reserve cream ground, two
 * columns side-by-side, hairline divider. Text-forward, matches the register
 * of InProduction / BuiltWithNebbos / NebbosInventory bands. This lands the
 * "TWO shapes, one MCP" story as parallel columns instead of sequential
 * faded scene tiles.
 *
 * Visual rhythm (scene / text-band alternation):
 *   1. HomeHero          (scene)  — "Remember who you are."
 *   2. InProductionBand  (text)   — Running in school districts today
 *   3. HomeModesBand     (text)   — Building fresh? · Already have a stack?
 *   4. HomeBands         (scene)  — 4-product click-to-expand accordion
 *   5. HomeStory         (scene)  — 3-scene magazine editorial arc
 *   6. BuiltWithNebbos   (text)   — 1 person · 160 days · 20 repos · 2.1M LoC
 *   7. NebbosInventory   (text)   — 24 metrics · 4 quadrants
 *   8. HomeCTA           (scene)  — "Put a Pearl on your hardest domain."
 */

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <InProductionBand />
      <HomeModesBand />
      <CapabilityBentoGrid />
      <HomeBands />
      <HomeStory />
      <BuiltWithNebbosBand />
      <NebbosInventoryBand />
      <HomeCTA />
    </>
  );
}
