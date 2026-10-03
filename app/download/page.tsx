import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { PageSection } from "@/components/primitives/PageSection";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { DownloadPicker } from "@/components/sections/DownloadPicker";

/**
 * PAGE · /download · v1 · NLDA-10
 *
 * The route the delivery model names as the place a customer gets the App.
 * Signed artifacts come from NLDA-6 (.dmg, notarized) and NLDA-7 (.msi);
 * this page is the surface that puts them in front of someone.
 *
 * Register: marketing (paper ground, serif display, mono eyebrows) — the
 * same one every /products route uses. Hero is surface="paper": a download
 * is a utility moment, not a scene, and the page must be legible the
 * instant it loads rather than after a full-bleed image decodes.
 *
 * The CTA itself is client-rendered (DownloadPicker) because platform
 * detection and the release manifest are both runtime facts. Everything
 * around it is static.
 */

const TITLE = "Download the Nebbos App";
const DESCRIPTION =
  "The local-native Nebbos App for macOS and Windows. Biometric tier ceremony on first run, then your MCP travels with you.";

export const metadata: Metadata = {
  title: `${TITLE} · macOS and Windows`,
  description: DESCRIPTION,
  alternates: { canonical: "https://nebbos.ai/download" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://nebbos.ai/download",
    siteName: "Nebbos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        surface="paper"
        align="start"
        eyebrow="Nebbos App"
        headline={
          <>
            Download the App. <em>Your MCP, local.</em>
          </>
        }
        deck="Native on macOS and Windows. Installs in a minute, enrolls your biometric authenticator on first run, and from then on every write you make is attributable to you."
        ctas={<DownloadPicker />}
      />

      <PageSection ground="paper2" ruled>
        <hr className="download-page__rule" aria-hidden="true" />
        <Eyebrow>01 · What happens after install</Eyebrow>
        <h2>Three steps, then you are at your tier.</h2>
        <ol className="download-steps">
          <li>
            <span className="download-steps__n">01</span>
            <p className="download-steps__body">
              <strong>Confirm who you are.</strong> The first-run window reads the
              identity your organisation already issued you and asks you to confirm
              it. No password to invent, no key to paste.
            </p>
          </li>
          <li>
            <span className="download-steps__n">02</span>
            <p className="download-steps__body">
              <strong>Enroll your authenticator.</strong> Touch ID, Windows Hello or
              a hardware key. This is the ceremony that sets your tier — the App
              knows what you are allowed to do because of what you just proved, not
              because of a setting someone toggled.
            </p>
          </li>
          <li>
            <span className="download-steps__n">03</span>
            <p className="download-steps__body">
              <strong>Work.</strong> The tray icon carries your current tier. Your
              MCP is reachable from the clients you already use, and every tool call
              lands in the audit chain with your name on it.
            </p>
          </li>
        </ol>
      </PageSection>

      <PageSection ruled compact>
        <Eyebrow>02 · Install guides</Eyebrow>
        <h2>If you get stuck.</h2>
        <p className="download-page__prose">
          Step-by-step walkthroughs with screenshots — including what macOS
          Gatekeeper and Windows SmartScreen show you the first time you open a
          freshly signed installer — ship alongside the installer and are linked
          from the release notes. If something still does not behave, tell us and
          we will walk you through it.
        </p>
        <div className="download-picker__alternates">
          <Button variant="ghost" href="/contact">
            Get help installing
          </Button>
        </div>
      </PageSection>

    </>
  );
}
