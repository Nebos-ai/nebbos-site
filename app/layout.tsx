import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteLoader } from "@/components/site/SiteLoader";
import { BRAND } from "@/content/brand";

import "./globals.css";

/**
 * Root layout · Nebbos site v4.1 · 2026-08-24
 *
 * Font stack: Space Grotesk (restored — founder confirmed this is the
 * desired font, not Helvetica Neue). Loaded via next/font/google for
 * both display and body. Fira Code for mono eyebrows and numerals.
 *
 * The token layer (--font-serif and --font-sans in app/globals.css)
 * points to Space Grotesk with system-font fallbacks including Hiragino
 * Kaku Gothic ProN for Japanese CJK support.
 *
 * SiteLoader: full-screen bone-on-warm-black loader that shows "Remember
 * who you are." on first paint, fades once the main content settles.
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
        <SiteLoader />
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
