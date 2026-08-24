import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BRAND } from "@/content/brand";

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
 */

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-serif",
});

const body = Space_Grotesk({
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
    "company brain",
    "AI operating system",
    "enterprise AI governance",
    "AI approval workflow",
    "governance-first AI",
    "Pearl per department",
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
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
