import { CTABand } from "@/components/ui/CTABand";

/**
 * FRAME · Home / 05 · Closing CTA
 * PARENT · app/page.tsx (/)
 * PURPOSE · The final band before the site footer. Single primary
 *           action: book a demo. Editorial, restrained, one CTA.
 */
export function HomeCTA() {
  return (
    <CTABand
      headline="Put a Pearl on your hardest department."
      primary={{ label: "Book a demo", href: "/demo" }}
    />
  );
}
