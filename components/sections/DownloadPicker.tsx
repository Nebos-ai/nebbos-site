"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/primitives/Button";

/**
 * <DownloadPicker> · /download · NLDA-10
 *
 * Detects the visitor's platform and renders the matching download CTA,
 * with the other platforms demoted to secondary links.
 *
 * Release source
 * --------------
 * Artifacts are produced by NLDA-6 (signed .dmg, notarized) and NLDA-7
 * (signed .msi, SmartScreen-submitted) and published as a GitHub Release
 * on nebbos-mcp-local. That repo is private, so the browser cannot read
 * the GitHub API directly — the site consumes a small public manifest
 * instead, whose URL comes from NEXT_PUBLIC_NEBBOS_RELEASE_MANIFEST.
 *
 * Expected manifest shape:
 *   {
 *     "version": "0.2.0",
 *     "published_at": "2026-09-24T09:00:00Z",
 *     "assets": {
 *       "macos":   { "url": "https://…/Nebbos-0.2.0.dmg", "size_bytes": 88129536 },
 *       "windows": { "url": "https://…/Nebbos-0.2.0.msi", "size_bytes": 74883072 }
 *     }
 *   }
 *
 * Until that manifest exists the component degrades to an honest
 * "not yet published" state rather than linking at a 404 — the page can
 * ship ahead of NLDA-6/7 and starts working the moment they land.
 */

type Platform = "macos" | "windows" | "linux" | "mobile" | "unknown";

type ReleaseAsset = { url: string; size_bytes?: number };

type ReleaseManifest = {
  version: string;
  published_at?: string;
  assets: Partial<Record<"macos" | "windows", ReleaseAsset>>;
};

const MANIFEST_URL = process.env.NEXT_PUBLIC_NEBBOS_RELEASE_MANIFEST;

const PLATFORM_LABEL: Record<Platform, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
  mobile: "mobile",
  unknown: "your platform",
};

/**
 * Platform detection. Prefers the UA-Client-Hints platform string where the
 * browser exposes it (Chromium); falls back to userAgent sniffing. Both are
 * advisory only — every platform's download stays reachable through the
 * alternates row, so a wrong guess costs the visitor one extra click.
 */
function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";

  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } })
    .userAgentData;

  if (uaData?.mobile) return "mobile";

  const hinted = uaData?.platform?.toLowerCase();
  if (hinted) {
    if (hinted.includes("mac")) return "macos";
    if (hinted.includes("win")) return "windows";
    if (hinted.includes("linux") || hinted.includes("chrome os")) return "linux";
  }

  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod|android/.test(ua)) return "mobile";
  // iPadOS 13+ reports as Macintosh; a touch-capable "Mac" is an iPad.
  if (ua.includes("mac")) return navigator.maxTouchPoints > 1 ? "mobile" : "macos";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux") || ua.includes("cros")) return "linux";
  return "unknown";
}

function formatSize(bytes?: number): string | null {
  if (!bytes) return null;
  return `${(bytes / 1024 / 1024).toFixed(0)} MB`;
}

export function DownloadPicker() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [release, setRelease] = useState<ReleaseManifest | null>(null);
  const [releaseResolved, setReleaseResolved] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    if (!MANIFEST_URL) {
      setReleaseResolved(true);
      return;
    }

    const controller = new AbortController();

    fetch(MANIFEST_URL, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<ReleaseManifest>) : null))
      .then((data) => {
        if (data?.assets) setRelease(data);
      })
      .catch(() => {
        // Network failure or malformed manifest — fall through to the
        // "not yet published" state. Never surface a raw error to a visitor.
      })
      .finally(() => setReleaseResolved(true));

    return () => controller.abort();
  }, []);

  // Pre-hydration and pre-detection: hold the CTA's height so the page
  // does not shift when the real control arrives.
  if (platform === null || !releaseResolved) {
    return <p className="download-picker__pending">Detecting your platform…</p>;
  }

  const macos = release?.assets.macos;
  const windows = release?.assets.windows;
  const hasAnyBuild = Boolean(macos || windows);

  if (platform === "linux" || platform === "mobile") {
    return (
      <div className="download-picker">
        <p className="download-picker__unsupported">
          The Nebbos App is a desktop application — {PLATFORM_LABEL[platform]} is not
          supported yet. The MCP is reachable from any platform over HTTP; the App
          is what adds the local biometric tier ceremony.
        </p>
        <Button variant="ghost" href="/products/mcp">
          Use the MCP instead
        </Button>
      </div>
    );
  }

  if (!hasAnyBuild) {
    return (
      <div className="download-picker">
        <p className="download-picker__unsupported">
          Signed builds are not published yet. The App ships as a notarized{" "}
          <code>.dmg</code> for macOS and a signed <code>.msi</code> for Windows —
          both are in build. Ask us and we will tell you the day it lands.
        </p>
        <Button href="/contact">Tell me when it ships</Button>
      </div>
    );
  }

  const primary = platform === "windows" ? windows : macos;
  const primaryLabel = platform === "windows" ? "Windows" : "macOS";
  const alternate = platform === "windows" ? macos : windows;
  const alternateLabel = platform === "windows" ? "macOS" : "Windows";

  return (
    <div className="download-picker">
      {primary ? (
        <>
          <Button href={primary.url}>Download for {primaryLabel}</Button>
          <p className="download-picker__meta">
            {[
              release?.version ? `v${release.version}` : null,
              formatSize(primary.size_bytes),
              primaryLabel === "macOS" ? "Apple notarized" : "Signed installer",
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </>
      ) : (
        <p className="download-picker__unsupported">
          The {primaryLabel} build is not published yet.
        </p>
      )}

      {alternate ? (
        <div className="download-picker__alternates">
          <p className="download-picker__alternates-label">Other platforms</p>
          <Button variant="ghost" href={alternate.url}>
            Download for {alternateLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
