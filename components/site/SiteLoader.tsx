"use client";

import { useEffect, useState } from "react";

/**
 * SiteLoader · v1 · 2026-08-24 (Izanami reference)
 *
 * Full-screen loader shown on first paint. Warm-black surface, warm-bone
 * "Remember who you are." headline center, mono progress counter
 * counting from 00 to 100 at the bottom, then fades out. Sets the
 * manifesto register before the site loads.
 *
 * Behavior:
 *   - Mounts with opacity 1 (visible)
 *   - Progress counter animates 00 → 100 over ~1200ms
 *   - Full-viewport fade-out over 500ms after counter completes
 *   - Removed from DOM after fade (so it doesn't block clicks)
 */
export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Animate progress counter 0 → 100 over ~1200ms
    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Fade + unmount after brief hold
        setTimeout(() => setVisible(false), 200);
        setTimeout(() => setMounted(false), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    // Lock body scroll while loader visible
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      // Unlock scroll as soon as fade begins
      document.body.style.overflow = "";
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`site-loader ${visible ? "" : "site-loader--fade"}`}
    >
      <div className="site-loader__inner">
        <h2 className="site-loader__title">Remember who you are.</h2>
        <div className="site-loader__progress">
          <span className="site-loader__number">
            {String(progress).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
