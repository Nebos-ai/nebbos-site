import type { Metadata, Viewport } from "next";
import { Newsreader, Host_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BRAND } from "@/content/brand";

import "./globals.css";

/**
 * Root layout · Nebbos site v2 (rebuild-2026-08-23).
 *
 * The IA is organized around the 15-layer architecture (5 bands × 3 layers)
 * plus standard enterprise satellite pages. The 12 vision-board stills carry
 * the site's visual spine — three scenes ("Where it starts / grows / endures")
 * that map to the 5 bands and appear across product + solutions + about pages.
 *
 * Registered fonts (Institutional Reserve register):
 *   Newsreader     — display serif (H1/H2/H3, italic for accent)
 *   Host Grotesk   — UI + body sans
 *   JetBrains Mono — eyebrows, numerals, code
 *
 * All three loaded self-hosted via next/font so no external CSS fetch on
 * first paint (CLS-safe). Variable-font axes exposed so italic + weight
 * variations don't trigger a second download.
 */

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
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
  keywords: [
    "AI agent governance",
    "enterprise AI substrate",
    "model-training data",
    "AI observability",
    "AI approval workflow",
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
    { media: "(prefers-color-scheme: light)", color: "#F4F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#14120F" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
