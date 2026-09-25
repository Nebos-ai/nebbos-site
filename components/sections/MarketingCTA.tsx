import { ClosingCta } from "@/components/marketing/ClosingCta";

/**
 * MarketingCTA · sections/MarketingCTA.tsx · v3 · 2026-09-23
 *
 * The home page's closing ask. Direct, two paths: Book a demo is primary;
 * See the products is the second read for those not yet ready to talk.
 * v3: renders the shared ClosingCta panel used by every marketing page.
 */

export function MarketingCTA() {
  return (
    <ClosingCta
      id="mkt-close-h"
      eyebrow="See it on your operation"
      title="Put a Pearl on your hardest department."
      deck={
        <>
          Thirty minutes. Pick one department. We map it, name the Pearl,
          and show you the first Monday it would run.
        </>
      }
      primary={{ href: "/demo", label: "Book a demo" }}
      secondary={{ href: "/products", label: "See the products" }}
    />
  );
}
