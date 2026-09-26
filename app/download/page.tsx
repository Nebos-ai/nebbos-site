import type { Metadata } from "next";
import Link from "next/link";
import { DownloadCTA } from "@/components/download/DownloadCTA";

/**
 * PAGE · /download · NLDA-10 · 2026-09-22 · Nebbos App download landing
 *
 * Customer visits nebbos.ai/download → sees the primary Download CTA for
 * their detected platform + fallbacks for the others + short install copy.
 * All artifacts route through the GitHub Release "latest" alias:
 *   https://github.com/Nebos-ai/nebbos-mcp-local/releases/latest/download/<name>
 * so the URL never has to change when a new version lands.
 *
 * Grounded in:
 *   feedback_nebbos_app_bundles_mcp_usb_verifies_delivery_model_2026_09_14
 *   feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14
 *   task NLDA-10 (2302b2a9)
 *
 * Marketing register: delta-brief-editorial (paper-white, Trust 3A, Host
 * Grotesk sans, cut-corner cards). Uses the shared page-layout tokens from
 * globals.css + components/patterns/.
 */

export const metadata: Metadata = {
  title: "Download Nebbos — App for macOS + Windows",
  description:
    "Download Nebbos App. One binary, signed by Nebbos Technologies. Runs on macOS + Windows. Auto-updates. Plug in your Cradle to unlock Host + Architect tiers.",
  openGraph: {
    title: "Download Nebbos — App for macOS + Windows",
    description:
      "Signed, notarized, auto-updating desktop app. macOS + Windows. Linux + iOS + Android follow.",
    url: "https://nebbos.ai/download",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Nebbos",
    description: "Signed desktop app. macOS + Windows. Auto-update.",
  },
};

// Latest-release download URLs.
// GitHub redirects /releases/latest/download/<asset> → current tag's asset.
const REPO = "Nebos-ai/nebbos-mcp-local";
const REL = `https://github.com/${REPO}/releases/latest/download`;

const ARTIFACTS = {
  macos_arm64: {
    label: "Download for macOS (Apple silicon)",
    url: `${REL}/Nebbos-darwin-arm64.dmg`,
    filename: "Nebbos-darwin-arm64.dmg",
    subline: "Signed + notarized. Runs on M1/M2/M3/M4. Intel Macs run via Rosetta 2.",
  },
  windows_x64: {
    label: "Download for Windows",
    url: `${REL}/Nebbos-windows-x64.msi`,
    filename: "Nebbos-windows-x64.msi",
    subline: "Signed with EV code cert. Windows 10 + 11 (x86_64).",
  },
  linux_x64: {
    label: "Download for Linux",
    url: `${REL}/nebbos-app-linux-x86_64`,
    filename: "nebbos-app-linux-x86_64",
    subline: "Headless stdio-only binary. GUI variant on the roadmap.",
    experimental: true,
  },
} as const;

const INSTALL_DOCS = {
  macos: `https://github.com/${REPO}/blob/main/INSTALL-MACOS.md`,
  windows: `https://github.com/${REPO}/blob/main/INSTALL-WINDOWS.md`,
};

export default function DownloadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24 text-neutral-900">
      <header className="mb-12">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Nebbos App</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-serif leading-tight">
          Download Nebbos.
        </h1>
        <p className="mt-4 text-lg text-neutral-700">
          One signed desktop app. Menubar-native on macOS, system-tray on Windows.
          The MCP substrate runs on your machine — every AI client on your device
          talks to it via stdio.
        </p>
      </header>

      <DownloadCTA artifacts={ARTIFACTS} installDocs={INSTALL_DOCS} />

      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-xl font-serif mb-4">What happens after install</h2>
        <ol className="space-y-3 text-neutral-800">
          <li>
            <strong>1. First-run wizard</strong> — the App opens a 3-step
            onboarding: confirm your email (your Nebbos identity for every
            tool call), enroll a biometric (Touch ID on macOS, Windows Hello),
            see your current access tier.
          </li>
          <li>
            <strong>2. Menubar / tray</strong> — a persistent icon shows your
            tier at a glance (green L1 · blue L2 · purple L3). Click for
            Settings, tier reasoning, audit tail, and update check.
          </li>
          <li>
            <strong>3. Auto-update</strong> — the App polls for new versions
            once every 24 hours and prompts you before applying. Rollback
            baked in — a bad update reverts on next launch.
          </li>
          <li>
            <strong>4. Plug in Cradle</strong> — insert your Nebbos Cradle
            (DataLocker K350 hardware, ships with Team + Enterprise plans)
            to ratchet to L2 (Host). Add an enclave-signed token for L3
            (Architect).
          </li>
        </ol>
      </section>

      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-xl font-serif mb-4">Not yet supported</h2>
        <ul className="space-y-2 text-neutral-700">
          <li>
            <strong>Linux</strong> — stdio-only binary available above;
            GUI variant on the roadmap. Contact us if you need earlier.
          </li>
          <li>
            <strong>iOS / Android</strong> — mobile Nebbos App is planned as
            a separate download (see roadmap on the{" "}
            <Link href="/how" className="underline">/how</Link> page).
          </li>
        </ul>
      </section>

      <section className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="text-xl font-serif mb-4">Verify what you downloaded</h2>
        <p className="text-neutral-700">
          Every release publishes SHA-256 digests in the{" "}
          <a
            className="underline"
            href={`https://github.com/${REPO}/releases/latest`}
          >
            release notes
          </a>
          . macOS DMG is Apple-notarized (Gatekeeper accepts without prompts);
          Windows MSI is EV-signed (SmartScreen accepts immediately). If your
          system flags the install, don&apos;t proceed — the download is
          suspect. Contact <a className="underline" href="mailto:support@nebbos.ai">support@nebbos.ai</a>.
        </p>
      </section>
    </main>
  );
}
