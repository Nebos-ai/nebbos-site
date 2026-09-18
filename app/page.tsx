import { MarketingHero } from "@/components/sections/MarketingHero";
import { MarketingMarquee } from "@/components/sections/MarketingMarquee";
import { MarketingDepartments } from "@/components/sections/MarketingDepartments";
import { MarketingShift } from "@/components/sections/MarketingShift";
import { MarketingProof } from "@/components/sections/MarketingProof";
import { MarketingTrustLine } from "@/components/sections/MarketingTrustLine";
import { MarketingCTA } from "@/components/sections/MarketingCTA";

/**
 * PAGE · / (Home) · v18 · 2026-09-18 · outcome-first rebuild
 *
 * Founder-directed 2026-09-18 (verbatim critiques):
 *   1. "why is this on the home page in this form why is this important
 *      to someone looking for a sovereign ai brain do you go to the
 *      restaurant and say what's in the sausage or do you eat it if it
 *      looks good taste good."
 *   2. "the best marketing sites use human psychology and those studies
 *      because the better you understand the customers the better you
 *      can explain to them what nebbos is most people want to be told
 *      and show it's good for them they don't really ever understand
 *      what it is."
 *   3. "you have to remember the website and the marketing materials
 *      all need to have the same tone language highlights."
 *
 * v17 shipped a technical-buyer home: infrastructure hero, six-stage
 * substrate diagram, 8-metric codebase inventory, CISO FAQ. All sausage.
 *
 * v18 rebuilds for the actual buyer psychology:
 *
 *   1. MarketingHero              What DO you get. Sovereign brain for
 *                                  your operation, department scoped.
 *   2. MarketingDepartments        4 Pearls, 4 named outcomes. Each is
 *                                  a department the buyer already runs.
 *   3. MarketingShift              Concrete Monday: "without / with"
 *                                  narrative. Story beats specs.
 *   4. MarketingTrustLine          One quiet line. Signals CISO-ready.
 *                                  Links to /trust for the depth.
 *   5. MarketingProof              12 K-12 districts, 4 states. Peer
 *                                  proof over vendor claim.
 *   6. MarketingCTA                "Put a Pearl on your hardest
 *                                  department." Same imperative close.
 *
 * MOVED OFF HOME (still shipped, still linked, moved to their audience):
 *   - MarketingComplianceStrip → belongs on /trust (framework alphabet)
 *   - MarketingSubstrate       → belongs on /how (six-stage architecture)
 *   - MarketingNumbers         → belongs on /how (codebase-inventory)
 *   - MarketingFAQ             → belongs on /trust (CISO Q&A)
 *
 * BRAND doctrine: BRAND.highlights + BRAND.flagshipDepartments in
 * content/brand.ts is the single source of truth for site + decks +
 * one-pagers. Every touchpoint pulls from the same set — tone /
 * language / highlights stay in sync everywhere.
 */

export default function HomePage() {
  return (
    <>
      <MarketingHero />
      <MarketingMarquee />
      <MarketingDepartments />
      <MarketingShift />
      <MarketingTrustLine />
      <MarketingProof />
      <MarketingCTA />
    </>
  );
}
