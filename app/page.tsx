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
export const dynamic = "force-static";
export const revalidate = false;

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
