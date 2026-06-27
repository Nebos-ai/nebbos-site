import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} — Operations Intelligence`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_ORIGIN,
    title: `${SITE_NAME} — Operations Intelligence`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Operations Intelligence`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-sans), var(--font-sans)" }}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
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
