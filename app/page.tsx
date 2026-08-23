import { HomeHero } from "@/components/sections/HomeHero";
import { HomeArchitecture } from "@/components/sections/HomeArchitecture";
import { HomeFeatures } from "@/components/sections/HomeFeatures";
import { HomeCTA } from "@/components/sections/HomeCTA";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({ path: "/" });

export const dynamic = "force-static";
export const revalidate = false;

/**
 * PAGE · / (Home)
 *
 * Composition, top to bottom (Figma-frame-style hand-off):
 *
 *   00 · HomeHero          — "Build your company's brain"
 *   01 · HomeArchitecture  — full-viewport 15-layer knowledge graph
 *   02-04 · HomeFeatures   — 3 numbered claim → proof rows
 *   05 · HomeCTA           — closing "Book a demo" band
 *
 * Every section is a named file in components/sections/. Edit any one
 * without touching the others. See components/sections/README.md for the
 * naming + composition contract.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeArchitecture />
      <HomeFeatures />
      <HomeCTA />
    </>
  );
}
