import type { Metadata } from "next";
import { Newsreader, Host_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { organizationJsonLd } from "@/lib/seo";
import {
  IS_PRODUCTION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/site";

/**
 * Font system — Delta brief editorial (rebuild-2026 v4).
 *
 * Newsreader (serif) as the display face. Trust 3A first in the CSS
 * cascade so Adobe Typekit takes over when the client has it — Newsreader
 * is the self-hosted fallback and reads honestly close.
 *
 * Host Grotesk = body sans.
 * JetBrains Mono = numerics, kbd, eyebrows.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-host-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} — The tool for building your company's brain`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_ORIGIN,
    title: `${SITE_NAME} — The tool for building your company's brain`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — The tool for building your company's brain`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${newsreader.variable} ${hostGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Adobe Typekit for Trust 3A — cascades before Newsreader.
            Degrades gracefully when the network / kit is blocked. */}
        <link rel="stylesheet" href="https://use.typekit.net/gkk3ycm.css" />
      </head>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {/*
          Sticky-nav hairline-on-scroll · doctrine v2 §5 NEW-G.
          Sets data-scrolled="true" on <html> when scrollY > 8. Server-inlined
          so it runs before hydration — no flash on paint. Passive listener
          for perf. Removes on unload. ~15 lines total.
        */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){function u(){var s=window.scrollY>8;var h=document.documentElement;if(s!==(h.dataset.scrolled==='true'))h.dataset.scrolled=s?'true':'false';}u();window.addEventListener('scroll',u,{passive:true});})();`,
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {!IS_PRODUCTION ? (
          <div className="staging-banner" role="status">
            STAGING — idvor.ai · noindex · not the production site
          </div>
        ) : null}
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
