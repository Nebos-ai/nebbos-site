"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { HERO_FLOWER_TERMS } from "@/content/hero-flower-terms";

/**
 * <HeroFlowerSplit> · nebbos.ai home hero · Design substrate v3
 *
 * The 19 rings of the Nebbos flower-of-life mark are the 19 aspects a
 * company operates on. Hero opens with rings unified into the mark; on
 * scroll or user gesture, rings fan outward. Each ring becomes an
 * interactive node with a labelled term. Click a ring → the Nebbos-lens
 * blurb slides in with a "Learn more" link to the deep page.
 *
 * Reveal order = business-lens importance ranking from
 * content/hero-flower-terms.ts. Ring 0 (Security) fades in first ~250ms
 * after trigger; ring 18 (Collaboration) last ~3s in.
 *
 * A11y architecture — decorative SVG (aria-hidden) + HTML button overlay
 * per ring. The SVG paths carry the geometry; the buttons carry the
 * semantics. Avoids axe's nested-interactive rule which flags interactive
 * SVG elements inside other interactive parents. Buttons position via
 * inline CSS custom properties driven by the same rank-based math the
 * ring translation uses, so the button always follows the ring visually.
 *
 * Founder-directed 2026-09-17. Company voice per
 * feedback_data_classification_chat_contents_private_entity_attribution_only_2026_09_16.
 */

/**
 * Path data for the 19 rings of the flower-of-life mark. Extracted from
 * public/favicon.svg — source of truth is the SVG shipped as the site's
 * favicon. If the mark changes, regenerate this array from that SVG.
 * DOM order matches HERO_FLOWER_TERMS ringIndex order 0..18.
 */
const RING_PATHS: readonly string[] = [
  "M82.499 195.905C97.9301 180.486 97.9301 155.485 82.499 140.065C67.0679 124.646 42.0492 124.646 26.6182 140.065C11.1871 155.485 11.1871 180.486 26.6182 195.905C42.0492 211.325 67.0679 211.325 82.499 195.905Z",
  "M88.7784 227.213C110.601 227.213 128.292 209.535 128.292 187.728C128.292 165.922 110.601 148.244 88.7784 148.244C66.9555 148.244 49.2646 165.922 49.2646 187.728C49.2646 209.535 66.9555 227.213 88.7784 227.213Z",
  "M123 246.956C144.823 246.956 162.514 229.278 162.514 207.471C162.514 185.664 144.823 167.986 123 167.986C101.177 167.986 83.4863 185.664 83.4863 207.471C83.4863 229.278 101.177 246.956 123 246.956Z",
  "M54.5591 167.983C76.382 167.983 94.0729 150.305 94.0729 128.498C94.0729 106.692 76.382 89.0137 54.5591 89.0137C32.7363 89.0137 15.0454 106.692 15.0454 128.498C15.0454 150.305 32.7363 167.983 54.5591 167.983Z",
  "M116.719 176.163C132.15 160.743 132.15 135.743 116.719 120.323C101.288 104.904 76.269 104.904 60.8379 120.323C45.4068 135.743 45.4068 160.743 60.8379 176.163C76.269 191.583 101.288 191.583 116.719 176.163Z",
  "M123 207.47C144.823 207.47 162.514 189.792 162.514 167.986C162.514 146.179 144.823 128.501 123 128.501C101.177 128.501 83.4863 146.179 83.4863 167.986C83.4863 189.792 101.177 207.47 123 207.47Z",
  "M157.219 227.213C179.042 227.213 196.733 209.535 196.733 187.728C196.733 165.922 179.042 148.244 157.219 148.244C135.396 148.244 117.705 165.922 117.705 187.728C117.705 209.535 135.396 227.213 157.219 227.213Z",
  "M82.499 116.933C97.9301 101.513 97.9301 76.513 82.499 61.0933C67.0679 45.6736 42.0492 45.6736 26.6182 61.0933C11.1871 76.513 11.1871 101.513 26.6182 116.933C42.0492 132.353 67.0679 132.353 82.499 116.933Z",
  "M116.718 136.678C132.149 121.258 132.149 96.2577 116.718 80.8379C101.287 65.4182 76.268 65.4182 60.8369 80.8379C45.4058 96.2577 45.4058 121.258 60.8369 136.678C76.268 152.097 101.287 152.097 116.718 136.678Z",
  "M123 167.983C144.823 167.983 162.514 150.305 162.514 128.498C162.514 106.692 144.823 89.0137 123 89.0137C101.177 89.0137 83.4863 106.692 83.4863 128.498C83.4863 150.305 101.177 167.983 123 167.983Z",
  "M157.219 187.728C179.042 187.728 196.733 170.05 196.733 148.243C196.733 126.437 179.042 108.759 157.219 108.759C135.396 108.759 117.705 126.437 117.705 148.243C117.705 170.05 135.396 187.728 157.219 187.728Z",
  "M191.44 207.47C213.263 207.47 230.954 189.792 230.954 167.986C230.954 146.179 213.263 128.501 191.44 128.501C169.618 128.501 151.927 146.179 151.927 167.986C151.927 189.792 169.618 207.47 191.44 207.47Z",
  "M88.7784 108.756C110.601 108.756 128.292 91.0786 128.292 69.2718C128.292 47.465 110.601 29.7871 88.7784 29.7871C66.9555 29.7871 49.2646 47.465 49.2646 69.2718C49.2646 91.0786 66.9555 108.756 88.7784 108.756Z",
  "M150.939 116.934C166.37 101.514 166.37 76.514 150.939 61.0943C135.508 45.6745 110.489 45.6745 95.0581 61.0943C79.627 76.514 79.627 101.514 95.0581 116.934C110.489 132.354 135.508 132.354 150.939 116.934Z",
  "M157.219 148.241C179.042 148.241 196.733 130.563 196.733 108.756C196.733 86.9494 179.042 69.2715 157.219 69.2715C135.396 69.2715 117.705 86.9494 117.705 108.756C117.705 130.563 135.396 148.241 157.219 148.241Z",
  "M191.44 167.983C213.263 167.983 230.954 150.305 230.954 128.498C230.954 106.692 213.263 89.0137 191.44 89.0137C169.618 89.0137 151.927 106.692 151.927 128.498C151.927 150.305 169.618 167.983 191.44 167.983Z",
  "M123 89.0143C144.823 89.0143 162.514 71.3364 162.514 49.5296C162.514 27.7228 144.823 10.0449 123 10.0449C101.177 10.0449 83.4863 27.7228 83.4863 49.5296C83.4863 71.3364 101.177 89.0143 123 89.0143Z",
  "M157.219 108.756C179.042 108.756 196.733 91.0786 196.733 69.2718C196.733 47.465 179.042 29.7871 157.219 29.7871C135.396 29.7871 117.705 47.465 117.705 69.2718C117.705 91.0786 135.396 108.756 157.219 108.756Z",
  "M191.44 128.499C213.263 128.499 230.954 110.821 230.954 89.014C230.954 67.2072 213.263 49.5293 191.44 49.5293C169.618 49.5293 151.927 67.2072 151.927 89.014C151.927 110.821 169.618 128.499 191.44 128.499Z",
] as const;

/**
 * Original centers of each ring in the source SVG (viewBox 246 × 257 =
 * center approx 123, 128.5). Extracted from the SVG's <path> arcs — each
 * ring is a ~40-unit-radius circle drawn as bezier arcs; the center is
 * the (cx, cy) implied by the arc endpoints. Order matches RING_PATHS
 * and HERO_FLOWER_TERMS ringIndex.
 */
const RING_CENTERS: readonly { cx: number; cy: number }[] = [
  { cx: 54.56, cy: 167.99 },
  { cx: 88.78, cy: 187.73 },
  { cx: 123.0, cy: 207.47 },
  { cx: 54.56, cy: 128.5 },
  { cx: 88.78, cy: 148.24 },
  { cx: 123.0, cy: 167.99 },
  { cx: 157.22, cy: 187.73 },
  { cx: 54.56, cy: 89.01 },
  { cx: 88.78, cy: 108.76 },
  { cx: 123.0, cy: 128.5 },
  { cx: 157.22, cy: 148.24 },
  { cx: 191.44, cy: 167.99 },
  { cx: 88.78, cy: 69.27 },
  { cx: 123.0, cy: 89.01 },
  { cx: 157.22, cy: 108.76 },
  { cx: 191.44, cy: 128.5 },
  { cx: 123.0, cy: 49.53 },
  { cx: 157.22, cy: 69.27 },
  { cx: 191.44, cy: 89.01 },
] as const;

/**
 * Split-layout offsets — each ring's final translation in the fan-out
 * state, in viewBox coordinate space (246 × 257). Business-lens rank 0
 * (Security) sits at the center; rank 18 (Collaboration) on the furthest
 * orbit. Angles distributed evenly around each orbit.
 */
function computeSplitOffset(rank: number, totalRanks: number): { dx: number; dy: number } {
  if (rank === 0) return { dx: 0, dy: 0 };
  const angleStep = (Math.PI * 2) / (totalRanks - 1);
  const angle = angleStep * (rank - 1) - Math.PI / 2;
  const orbitRadius = 40 + Math.floor((rank - 1) / 6) * 55;
  return {
    dx: Math.cos(angle) * orbitRadius,
    dy: Math.sin(angle) * orbitRadius,
  };
}

export function HeroFlowerSplit() {
  const [openTermKey, setOpenTermKey] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const openTerm = HERO_FLOWER_TERMS.find((t) => t.key === openTermKey) ?? null;

  const handleRingActivate = useCallback((key: string) => {
    setOpenTermKey((prev) => (prev === key ? null : key));
    if (!isRevealed) setIsRevealed(true);
  }, [isRevealed]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "-10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!openTermKey) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("[data-hero-flower-blurb]") || target?.closest("[data-hero-flower-btn]")) return;
      setOpenTermKey(null);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpenTermKey(null);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [openTermKey]);

  const totalRanks = HERO_FLOWER_TERMS.length;
  const VIEWBOX_W = 246;
  const VIEWBOX_H = 257;

  return (
    <section
      ref={containerRef}
      className={`hero-flower ${isRevealed ? "is-revealed" : "is-unified"}`}
      aria-labelledby="hero-flower-title"
    >
      <div className="hero-flower__inner">
        <div className="hero-flower__frame">
          <p className="hero-flower__eyebrow">Nebbos</p>
          <h1 id="hero-flower-title" className="hero-flower__headline">
            One substrate. <em>Nineteen aspects of your company.</em>
          </h1>
          <p className="hero-flower__deck">
            Nebbos is the operating substrate for every action your company
            takes. Explore the rings — each is a system Nebbos runs, unified
            under one identity, one audit chain, one policy graph.
          </p>
        </div>

        <div className="hero-flower__stage">
          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            className="hero-flower__mark"
            aria-hidden="true"
            focusable="false"
          >
            {HERO_FLOWER_TERMS.map((term, rank) => {
              const path = RING_PATHS[term.ringIndex];
              if (!path) return null;
              const { dx, dy } = computeSplitOffset(rank, totalRanks);
              const isOpen = openTermKey === term.key;
              return (
                <g
                  key={term.key}
                  className={`hero-flower__ring ${isOpen ? "is-open" : ""}`}
                  style={{
                    ["--ring-dx" as string]: `${dx.toFixed(2)}px`,
                    ["--ring-dy" as string]: `${dy.toFixed(2)}px`,
                    ["--ring-reveal-delay" as string]: `${(rank * 140).toFixed(0)}ms`,
                  }}
                >
                  <path d={path} className="hero-flower__ring-path" />
                </g>
              );
            })}
          </svg>

          <ul className="hero-flower__ring-buttons">
            {HERO_FLOWER_TERMS.map((term, rank) => {
              const center = RING_CENTERS[term.ringIndex];
              if (!center) return null;
              const { dx, dy } = computeSplitOffset(rank, totalRanks);
              const isOpen = openTermKey === term.key;
              const cxPct = ((center.cx + dx) / VIEWBOX_W) * 100;
              const cyPct = ((center.cy + dy) / VIEWBOX_H) * 100;
              return (
                <li key={term.key}>
                  <button
                    type="button"
                    className={`hero-flower__ring-btn ${isOpen ? "is-open" : ""}`}
                    style={{
                      ["--btn-cx" as string]: `${cxPct.toFixed(2)}%`,
                      ["--btn-cy" as string]: `${cyPct.toFixed(2)}%`,
                      ["--btn-reveal-delay" as string]: `${(rank * 140).toFixed(0)}ms`,
                    }}
                    aria-label={`${term.label}. ${term.blurb.split(".")[0]}.`}
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? "hero-flower-blurb" : undefined}
                    data-hero-flower-btn={term.key}
                    onClick={() => handleRingActivate(term.key)}
                  >
                    <span className="hero-flower__ring-btn-label" aria-hidden>
                      {term.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {openTerm && (
          <div
            id="hero-flower-blurb"
            role="dialog"
            aria-labelledby="hero-flower-blurb-title"
            className="hero-flower__blurb"
            data-hero-flower-blurb
          >
            <p className="hero-flower__blurb-eyebrow">Through the Nebbos lens</p>
            <h2 id="hero-flower-blurb-title" className="hero-flower__blurb-title">
              {openTerm.label}
            </h2>
            <p className="hero-flower__blurb-body">{openTerm.blurb}</p>
            <div className="hero-flower__blurb-actions">
              <Link
                href={openTerm.learnMoreHref}
                className="hero-flower__blurb-cta"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpenTermKey(null)}
                className="hero-flower__blurb-close"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
