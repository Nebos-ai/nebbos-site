"use client";

/**
 * DownloadCTA · NLDA-10 · 2026-09-22
 *
 * Platform-detected primary CTA + fallbacks for the other two.
 *
 * The detection is best-effort (navigator.userAgent) — the fallback list
 * always renders so a user on an undetected platform (or a spoofed UA)
 * still sees every download. First render is the "unknown" state (all
 * three equal-weight); hydration replaces with the detected primary.
 *
 * No analytics beacon — we do NOT ping our own server on click. If we
 * want download-count telemetry later, we count on the GitHub Release
 * API side, not client-side.
 */
import Link from "next/link";
import { useEffect, useState } from "react";

type Artifact = {
  label: string;
  url: string;
  filename: string;
  subline: string;
  experimental?: boolean;
};

type Props = {
  artifacts: Record<"macos_arm64" | "windows_x64" | "linux_x64", Artifact>;
  installDocs: Record<"macos" | "windows", string>;
};

type Detected = "macos" | "windows" | "linux" | "unknown";

function detectPlatform(): Detected {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac os x") || ua.includes("macintosh")) return "macos";
  if (ua.includes("windows")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "unknown";
}

export function DownloadCTA({ artifacts, installDocs }: Props) {
  // First render (server + hydration) is "unknown" — all three CTAs equal.
  // useEffect runs client-side only + upgrades to detected primary.
  const [platform, setPlatform] = useState<Detected>("unknown");
  useEffect(() => setPlatform(detectPlatform()), []);

  const primaryKey = (
    { macos: "macos_arm64", windows: "windows_x64", linux: "linux_x64" } as const
  )[platform as "macos" | "windows" | "linux"] ?? "macos_arm64";

  const primary = artifacts[primaryKey];
  const others = (
    ["macos_arm64", "windows_x64", "linux_x64"] as const
  ).filter((k) => k !== primaryKey);

  return (
    <div>
      <a
        href={primary.url}
        className="block bg-neutral-900 text-white text-lg font-medium px-8 py-5 rounded-md hover:bg-neutral-800 transition-colors"
        data-detected-platform={platform}
      >
        {primary.label}
      </a>
      <p className="mt-3 text-sm text-neutral-600">{primary.subline}</p>

      {(platform === "macos" || platform === "unknown") && (
        <p className="mt-3 text-sm text-neutral-700">
          <Link href={installDocs.macos} className="underline">
            macOS install guide →
          </Link>
        </p>
      )}
      {(platform === "windows" || platform === "unknown") && (
        <p className="mt-1 text-sm text-neutral-700">
          <Link href={installDocs.windows} className="underline">
            Windows install guide →
          </Link>
        </p>
      )}

      <div className="mt-10 border-t border-neutral-200 pt-6">
        <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
          Other platforms
        </p>
        <ul className="space-y-4">
          {others.map((k) => {
            const a = artifacts[k];
            return (
              <li key={k}>
                <a href={a.url} className="text-neutral-900 underline text-base">
                  {a.label}
                </a>
                {a.experimental && (
                  <span className="ml-2 text-xs uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Experimental
                  </span>
                )}
                <p className="text-sm text-neutral-600 mt-0.5">{a.subline}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
