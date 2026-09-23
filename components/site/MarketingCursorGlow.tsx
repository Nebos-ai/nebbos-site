"use client";

import { useEffect } from "react";

/**
 * MarketingCursorGlow · v1 · 2026-09-18
 *
 * Sets CSS custom properties --mkt-mx / --mkt-my on every marketing-
 * register card as the pointer moves inside it. The CSS ::after glow
 * on .mkt-product and .mkt-productrow reads those custom properties
 * to render a cursor-follow radial gradient — Linear-tier hover
 * signature with zero React state, zero dependency, zero reflow.
 *
 * v2 (2026-09-23): also drives the Tailwind-register `.spotlight` cards
 * via --mx / --my.
 *
 * Skips when prefers-reduced-motion is set.
 * Delegated event on document — one listener, works on any card added
 * later (client-side nav / dynamic routes).
 */
export function MarketingCursorGlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SELECTOR = ".mkt-product, .mkt-productrow, .mkt-deep__item, .mkt-value, .mkt-tier, .mkt-stage, .spotlight";

    function onPointerMove(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const card = target.closest(SELECTOR) as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mkt-mx", `${x}%`);
      card.style.setProperty("--mkt-my", `${y}%`);
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
