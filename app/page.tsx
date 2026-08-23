import { HomeHero } from "@/components/sections/HomeHero";
import { HomeBands } from "@/components/sections/HomeBands";
import { HomeStory } from "@/components/sections/HomeStory";
import { HomeCTA } from "@/components/sections/HomeCTA";

/**
 * PAGE · / (Home) · v2 rebuild 2026-08-23
 *
 * Composition, top to bottom:
 *
 *   01 · HomeHero    — full-bleed Scene 1 (Where it starts) + serif h1
 *   02 · HomeBands   — 5-band × 3-layer overview = the site's IA visible
 *   03 · HomeStory   — 3-scene triptych + tech-narrative for the 15 layers
 *   07 · HomeCTA     — full-bleed Scene 3 (Where it endures) + demo CTA
 *
 * Every section is a named file in components/sections/. Edit one without
 * touching the others. Data flows from content/stills.ts (scene registry)
 * and lib/nav.ts (product tree derived from lib/architecture.ts).
 */
// No dynamic/revalidate exports — Next defaults to static pre-render at build
// time with normal cache semantics. Setting revalidate=false pins s-maxage
// to one year on the CDN, which is wrong for iterative marketing launches.
// Post-launch, we can add revalidate = 3600 (1h) or similar to opt in to
// heavier caching.

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBands />
      <HomeStory />
      <HomeCTA />
    </>
  );
}
