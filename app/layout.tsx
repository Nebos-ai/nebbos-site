import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Fira_Code } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BRAND } from "@/content/brand";

import "./globals.css";

/**
 * Root layout · Nebbos site v2 · font stack 2026-08-23 revision
 *
 * The IA is organized around the 15-layer architecture (5 bands × 3 layers)
 * plus standard enterprise satellite pages. The 12+18 vision-board stills
 * carry the site's visual spine.
 *
 * Font stack (post founder critique · lifestyle-exclusivity register):
 *   Fraunces  — variable serif for display (H1/H2/H3). Real italic. Warm
 *               editorial feel — Loro Piana / Kinfolk register. Optical
 *               sizing on; softness at 50 for gentle warmth; no wonkiness.
 *   Manrope   — clean neo-grotesque for UI + body copy. Quiet, restrained.
 *   Fira Code — mono for eyebrows, numerals, code.
 *
 * All three self-hosted via next/font so no external CSS fetch on first
 * paint (CLS-safe). Variable axes exposed so italic + weight variation
 * don't trigger a second download.
 */

const serif = Fraunces({
  subsets: ["latin"],
  // Variable font — loads all weights compactly and unlocks SOFT/opsz axes.
  // next/font requires weight to be omitted or "variable" when axes is set.
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
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
