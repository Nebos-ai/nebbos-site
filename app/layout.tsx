import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteLoader } from "@/components/site/SiteLoader";
import { BRAND } from "@/content/brand";

import "./globals.css";

/**
 * Root layout · Nebbos site v4 · 2026-08-24
 *
 * Font stack: Helvetica Neue system stack with Japanese Hiragino CJK
 * fallback (Izanami-style international-executive register). No network
 * load for display + body fonts — Helvetica is native on macOS/iOS,
 * fallbacks handle Windows/Android. Fira Code still loaded for mono
 * eyebrows and numerals.
 *
 * The full font stack lives in app/globals.css (--font-serif and
 * --font-sans tokens) so the design system stays token-driven.
 *
 * SiteLoader: full-screen bone-on-warm-black loader that shows "Remember
 * who you are." on first paint, fades once the main content settles.
 */

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
    <html lang="en" className={mono.variable}>
      <body>
        <SiteLoader />
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
