import { HomeHero } from "@/components/sections/HomeHero";
import { InProductionBand } from "@/components/sections/InProductionBand";
import { BuiltWithNebbosBand } from "@/components/sections/BuiltWithNebbosBand";
import { HomeBands } from "@/components/sections/HomeBands";
import { HomeStory } from "@/components/sections/HomeStory";
import { HomeCTA } from "@/components/sections/HomeCTA";

/**
 * PAGE · / (Home) · v3 addition 2026-09-12
 *
 * Composition, top to bottom:
 *
 *   01 · HomeHero          — full-bleed Scene 1 + brand H1 + run-layer deck
 *   ** · InProductionBand  — truthful social-proof (school districts, N states)
 *   02 · HomeBands         — 5-band × 3-layer overview (Wave 2 v4 P.3 candidate)
 *   03 · HomeStory         — 3-scene triptych (Wave 2 v4 P.3 candidate)
 *   07 · HomeCTA           — full-bleed Scene 3 + demo CTA
 *
 * The InProductionBand additon (2026-09-12) lands the founder-confirmed
 * in-production trust signal right after the hero — matching runlayer's
 * social-proof-adjacent-to-hero placement without fake logos or quotes.
 * Bands/Story remain until the full Wave 2 v4 P.3 rebuild.
 *
 * Every section is a named file in components/sections/. Edit one without
 * touching the others. Data flows from content/stills.ts (scene registry)
 * and lib/nav.ts (product tree derived from lib/architecture.ts).
 */
// No dynamic/revalidate exports — Next defaults to static pre-render at build
// time with normal cache semantics. Setting revalidate=false pins s-maxage
// to one year on the CDN, which is wrong for iterative marketing launches.

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <InProductionBand />
      <BuiltWithNebbosBand />
      <HomeBands />
      <HomeStory />
      <HomeCTA />
    </>
  );
}
