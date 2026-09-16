import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WebVitalsReporter } from "@/components/site/WebVitalsReporter";
import { BRAND } from "@/content/brand";
import { organizationJsonLd } from "@/lib/seo";

import "./globals.css";

/**
 * Root layout · Nebbos site v3 · font stack 2026-08-24 revision
 *
 * Founder direction 2026-08-24: replace Fraunces (rounded humanist serif) +
 * Manrope (humanist grotesk) with an executive geometric grotesque. "Clean
 * straight lines, not as rounded, not as animated."
 *
 * Space Grotesk — designed by Florian Karsten, based on Space Mono. Squared
 * terminals, geometric construction, tech-institutional character. Loaded
 * for display + body. Both --font-serif and --font-sans point to it so the
 * design-token layer stays stable while the underlying font changes.
 *
 * Fira Code — mono for eyebrows, numerals, code (unchanged).
 *
 * Self-hosted via next/font so no external CSS fetch on first paint
 * (CLS-safe). Variable weight — one load for the whole 300-700 range.
 *
 * 2026-09-14: de-duplicated Space_Grotesk load — was loading the same family
 * twice under two variable names. Now one load, shared across --font-serif
 * + --font-sans via a single CSS class carrying both variable declarations.
 */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  // Emits `--font-space-grotesk`; we then map globals.css --font-serif AND
  // --font-sans to that single variable in the html className below.
  variable: "--font-space-grotesk",
});

const mono = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nebbos.ai"),
  title: {
    default: `${BRAND.name} — ${BRAND.taglineLong}`,
    template: `%s — ${BRAND.name}`,
  },
  description: BRAND.descriptionShort,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "operator platform",
    "MCP substrate",
    "biometric-attested tools",
    "hardware-attested USB",
    "AI-native operations",
    "sovereign AI",
    "Pearl per domain",
  ],
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.taglineLong}`,
    description: BRAND.descriptionShort,
    url: "https://nebbos.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.taglineLong}`,
    description: BRAND.descriptionShort,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1D1C22" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${mono.variable}`}
      // Alias --font-serif + --font-sans onto the single Space Grotesk load;
      // the deduplication that de-duplicates the previous 2× next/font fetch.
      style={{
        // @ts-expect-error — CSS custom property assignment via style prop
        "--font-serif": "var(--font-space-grotesk)",
        "--font-sans": "var(--font-space-grotesk)",
      }}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {/*
         * Speculation Rules API — Chrome 121+ · Elite bar dim 12 (2026-09-16).
         * Document-source prefetch with moderate eagerness = hover/pointerdown
         * trigger against every same-origin anchor on the page. Complements
         * (does not replace) next/link's viewport-based prefetch: this catches
         * plain <a> tags in body copy, footer, blog article cross-links, etc.
         *
         * "moderate" is the second-most-conservative tier — no bandwidth spent
         * until the user actually hovers a link. Browsers that don't support
         * Speculation Rules silently ignore the block. Excluded API + auth
         * routes to avoid burning session state or CSRF tokens.
         */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [
                {
                  source: "document",
                  where: {
                    and: [
                      { href_matches: "/*" },
                      { not: { href_matches: "/api/*" } },
                      { not: { href_matches: "/*.pdf" } },
                    ],
                  },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WebVitalsReporter />
      </body>
    </html>
  );
}
