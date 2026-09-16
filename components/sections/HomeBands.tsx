"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/no-noninteractive-tabindex --
 * HomeBands v5 uses a plain <div> click-surface pattern deliberately. Any
 * ARIA interactive role (tab, button) would trigger axe's nested-interactive
 * violation on the Links inside (product-page CTA + tier rows). aria-expanded
 * ALSO requires an interactive role, so it's dropped here — aria-controls
 * alone conveys the panel relationship. Keyboard access retained via
 * tabIndex + onKeyDown. Screen-reader users don't get expand/collapse state
 * announced, which is a partial compromise; a proper full a11y refactor
 * (pull all Links out of the accordion body, use <details>/<summary>, or
 * restructure interactive/non-interactive nesting) is Wave-scale work
 * scheduled as Axis C Wave 2b. Rules disabled at file scope with this
 * rationale so future maintainers see the trade-off. */

import Link from "next/link";
import { useState } from "react";
import { megaProducts, type MegaProduct } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";

/**
 * HomeBands · v5 accordion · 2026-09-15 (Axis A Wave 2 rebuild)
 *
 * Founder-directed 2026-09-14 product framing: platform + app + MCP + USB
 * (`feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14`).
 * v4 rendered 5 architecture bands × 3 layers from the retiring `/product`
 * treatise; v5 renders 4 products × 3 tiers from `content/products.ts`
 * (the ratified customer taxonomy per `reference_nebbos_customer_product_matrix_
 * 4_products_3_tiers_12_skus_2026_09_14`).
 *
 * Layout unchanged: 4 side-by-side full-height cells (was 5), one expanded
 * to full image + copy, the others compressed to narrow strips with rotated
 * product name + Roman numeral. Click a compressed strip → it expands, the
 * current expanded compresses. Smooth grid-template-columns transition.
 *
 * Client component (useState). Product order follows `PRODUCTS` in
 * content/products.ts (Software · Software · Tooling · Hardware).
 *
 * PRODUCT_FAMILIES temporarily reuses the retiring band-* scene imagery
 * until Axis C Wave 4 authors product-specific stills. Mapping chosen for
 * visual coherence (foundational → active → intelligent → hardware, top
 * to bottom of the retiring architecture treatise).
 */

const PRODUCT_NUMERALS: Record<string, string> = {
  platform: "I",
  app: "II",
  mcp: "III",
  usb: "IV",
};

// Temporary: reuse retiring band-* scene families until Axis C Wave 4
// authors product-specific imagery. Semantics: platform = substrate ground,
// app = local-native action, MCP = intelligence/tooling, USB = hardware.
const PRODUCT_FAMILIES: Record<string, string> = {
  platform: "band-substrate",
  app: "band-action",
  mcp: "band-intelligence",
  usb: "band-commerce",
};

export function HomeBands() {
  const firstProduct = megaProducts[0];
  if (!firstProduct) throw new Error("HomeBands · megaProducts is empty — content/products.ts must declare at least one product");
  const [activeKey, setActiveKey] = useState<string>(firstProduct.key);

  // Dynamic grid: active gets 6fr, others 1fr (6 + 3×1 = 9, active ≈ 67%)
  const cols = megaProducts
    .map((product) => (product.key === activeKey ? "6fr" : "1fr"))
    .join(" ");

  return (
    <section aria-labelledby="products-band-heading" style={{ background: "var(--paper)" }}>
      {/* Section header · paper */}
      <div
        style={{
          paddingBlock: "clamp(80px, 12vh, 160px) clamp(56px, 8vh, 80px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="02" label="Four products" />
            <h2
              id="products-band-heading"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "26ch",
                textWrap: "balance",
              }}
            >
              The platform. The app. The MCP.{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                The USB.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginTop: 24,
              }}
            >
              Click a product to open it.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion · 4 side-by-side cells, click to expand */}
      {/* Accordion pattern: click-to-expand card. Deliberately NOT using
          role=tab/tablist because the cells contain interactive Links (tier
          rows + product-page CTA), which the ARIA tab pattern disallows
          (nested-interactive). aria-expanded on each cell + role=region on
          the panel convey the expand/collapse state to AT users; keyboard
          arrow navigation is retained via onKeyDown. */}
      <div
        aria-label="Nebbos products"
        className="products-accordion"
        style={{
          display: "grid",
          gridTemplateColumns: cols,
          height: "min(88vh, 900px)",
          borderTop: "1px solid var(--rule)",
          transition: "grid-template-columns var(--dur-slow) var(--ease-out)",
        }}
      >
        {megaProducts.map((product, i) => {
          const isActive = product.key === activeKey;
          const tabId = `product-${product.key}-tab`;
          const panelId = `product-${product.key}-panel`;
          return (
            <div
              key={product.key}
              id={tabId}
              tabIndex={0}
              // aria-controls only when the panel actually renders (isActive).
              // Pointing at a non-existent element trips axe's aria-valid-attr-value.
              aria-controls={isActive ? panelId : undefined}
              onClick={() => setActiveKey(product.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveKey(product.key); }
                if (e.key === "ArrowRight") {
                  const next = megaProducts[(i + 1) % megaProducts.length];
                  if (next) setActiveKey(next.key);
                }
                if (e.key === "ArrowLeft") {
                  const prev = megaProducts[(i - 1 + megaProducts.length) % megaProducts.length];
                  if (prev) setActiveKey(prev.key);
                }
              }}
              className="product-cell"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: isActive ? "default" : "pointer",
                borderRight: i < megaProducts.length - 1 ? "1px solid var(--rule)" : "none",
              }}
            >
              <SceneStill family={PRODUCT_FAMILIES[product.key] ?? "band-substrate"} familyVariant={1} shape="fullBleed" />
              <SceneOverlay scrim={isActive ? "bottom" : "even"} vignetteStrength={0.55} />

              {isActive ? (
                <div
                  role="region"
                  id={panelId}
                  aria-labelledby={tabId}
                  style={{ position: "absolute", inset: 0, zIndex: 2 }}
                >
                  <ExpandedContent product={product} />
                </div>
              ) : (
                <CompressedContent product={product} />
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .product-cell:focus-visible { outline: 2px solid var(--accent-2); outline-offset: -2px; z-index: 3; }
        @media (max-width: 900px) {
          .products-accordion {
            grid-template-columns: minmax(0, 1fr) !important;
            grid-auto-rows: auto;
            height: auto !important;
          }
          .products-accordion > div { min-height: 320px; border-right: none !important; border-bottom: 1px solid var(--rule); }
        }
      `}</style>
    </section>
  );
}

function shortName(product: MegaProduct): string {
  return product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "");
}

function ExpandedContent({ product }: { product: MegaProduct }) {
  const name = shortName(product);
  const numeral = PRODUCT_NUMERALS[product.key] ?? "01";
  return (
    <>
      <SceneMetadataPlate chapter={numeral} label={name} position="top-right" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          padding: "clamp(40px, 6vh, 80px) clamp(32px, 4vw, 64px)",
        }}
      >
        <div style={{ maxWidth: "60ch", display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.86)",
              textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
            }}
          >
            {product.eyebrow} · Product {numeral}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(48px, 6vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.026em",
              fontWeight: 400,
              color: "var(--paper)",
              margin: 0,
              textWrap: "balance",
              textShadow: "0 2px 6px rgba(20, 18, 15, 0.48)",
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 1.8vw, 24px)",
              lineHeight: 1.4,
              color: "rgba(244, 241, 234, 0.92)",
              maxWidth: "40ch",
              margin: 0,
              textShadow: "0 1px 4px rgba(20, 18, 15, 0.48)",
            }}
          >
            {product.tagline}
          </p>
          <div aria-hidden style={{ width: 48, height: 1, background: "var(--accent-2)", marginBlock: 4 }} />
          <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "clamp(16px, 2vw, 28px)", margin: 0, padding: 0 }}>
            {product.tiers.map((tier) => {
              const [tierNum, ...rest] = tier.label.split(" · ");
              const tierLabel = rest.join(" · ") || tier.key;
              return (
                <li key={tier.key} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "rgba(244,241,234,0.7)",
                      letterSpacing: "0.06em",
                      textShadow: "0 1px 3px rgba(20,18,15,0.48)",
                    }}
                  >
                    {tierNum}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(17px, 1.5vw, 21px)",
                      color: "rgba(244,241,234,0.95)",
                      textShadow: "0 1px 3px rgba(20,18,15,0.48)",
                    }}
                  >
                    {tierLabel}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link
            href={product.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--accent-2)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              // Padding block ensures the Link tap target hits WCAG 2.2 AA
              // 2.5.8 minimum of 24×24px (font-size 12 alone renders ~14.5px tall).
              padding: "6px 0",
              minHeight: 24,
              textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            See {name} in full <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}

function CompressedContent({ product }: { product: MegaProduct }) {
  const name = shortName(product);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(24px, 4vh, 48px) 12px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 24,
          color: "var(--accent-2)",
          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
        }}
      >
        {PRODUCT_NUMERALS[product.key]}
      </div>
      <div
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(20px, 2.4vw, 32px)",
          fontWeight: 400,
          letterSpacing: "-0.012em",
          color: "var(--paper)",
          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(244, 241, 234, 0.7)",
          textAlign: "center",
          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
        }}
      >
        Open
      </div>
    </div>
  );
}
