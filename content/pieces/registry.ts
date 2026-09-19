/**
 * content/pieces/registry.ts · Nebbos site v2 · publication register
 *
 * Founder directive (2026-09-19):
 *   "we need to get this all cleaned up and working properly"
 *
 * Every Nebbos publication (decks, portfolio pieces, tenant assessments,
 * internal audits, references) is enumerated here. Each entry maps a
 * canonical slug to a pre-rendered HTML file in `public/pieces/`.
 *
 * The `app/p/[slug]/page.tsx` route reads this registry and serves the
 * matching HTML file inside an iframe — this keeps the piece's own
 * fonts, CSS, and inline SVG isolated from the marketing site's design
 * tokens. Pieces are self-contained publications, not new site pages;
 * they do NOT decompose into the section-stack pattern used by
 * `content/pages.ts`.
 *
 * Adding a new piece:
 *   1. drop the pre-rendered HTML into `public/pieces/<slug>.html`
 *   2. append an entry below
 *   3. that's it — the route picks it up
 *
 * Statuses:
 *   - current      · content and brand align with the ratified system state
 *   - refresh      · content valid but brand or numbers need updating
 *   - superseded   · teaches doctrine that has been retired
 *   - unverified   · not yet read against the ratified state
 *
 * Registers:
 *   - delta-brief-editorial · marketing register (paper + Trust 3A + orange +)
 *   - platform-dark         · platform register (dark cool-blue)
 *   - green-editorial       · internal-tool variant
 *   - legacy-charter        · pre-Delta-brief, archival only
 *   - legacy-fraunces       · one-off internal
 *   - legacy-plex           · one-off internal
 *   - legacy-terracotta     · one-off internal
 *
 * Surfaces:
 *   - public   · nebbos.ai/p/<slug>
 *   - tenant   · nebbos.ai/tenant/<tenant>/<slug>  (token-gated, later wave)
 *   - internal · app.nebbos.ai/refs/<slug>          (WorkOS-gated, later wave)
 */

export type PieceStatus =
  | "current"
  | "refresh"
  | "superseded"
  | "unverified"
  | "duplicate";

export type PieceRegister =
  | "delta-brief-editorial"
  | "platform-dark"
  | "green-editorial"
  | "legacy-charter"
  | "legacy-fraunces"
  | "legacy-plex"
  | "legacy-terracotta"
  | "unverified";

export type PieceSurface = "public" | "tenant" | "internal";

export interface Piece {
  slug: string;
  title: string;
  oneLiner?: string;
  audience: string[];
  register: PieceRegister;
  status: PieceStatus;
  surface: PieceSurface;
  publishedAt: string; // ISO date
  supersededBy?: string; // slug
  refreshReason?: string;
  tenant?: string;
}

export const PIECES: Piece[] = [
  {
    slug: "compression-tax-on-ambition",
    title: "Compression is the tax on ambition",
    oneLiner: "Five-week narrative — one hundred and thirty-eight thousand operator decisions rendered at 44 cents each.",
    audience: ["investor", "board"],
    register: "delta-brief-editorial",
    status: "current",
    surface: "public",
    publishedAt: "2026-09-19",
  },
  {
    slug: "institutional-deck",
    title: "Nebbos · Institutional deck",
    oneLiner: "Ten-slide institutional briefing — Platform · App · MCP · Cradle.",
    audience: ["enterprise", "institutional"],
    register: "delta-brief-editorial",
    status: "current",
    surface: "public",
    publishedAt: "2026-09-19",
  },
  {
    slug: "investor-deck",
    title: "Nebbos · Investor deck",
    oneLiner: "Ten-slide investor briefing — market gap, four products, twelve SKUs.",
    audience: ["investor", "vc"],
    register: "delta-brief-editorial",
    status: "refresh",
    refreshReason:
      "Team topology names Substrate/Hardware/Security teams that diverge from the ratified eleven-team map.",
    surface: "public",
    publishedAt: "2026-09-19",
  },
  {
    slug: "by-the-numbers",
    title: "Nebbos by the numbers",
    oneLiner: "Three-view portfolio — two point one million lines, three hundred and twenty-eight specifications.",
    audience: ["investor", "analyst"],
    register: "delta-brief-editorial",
    status: "refresh",
    refreshReason: "Colophon carries the pre-rename brand; numbers snapshot needs one canonical regeneration.",
    surface: "public",
    publishedAt: "2026-09-10",
  },
  {
    slug: "surface-audit",
    title: "The audit portfolio piece",
    oneLiner:
      "One hundred and thirty-two days, nine thousand four hundred fifty-four commits, twenty-four coordinated repositories.",
    audience: ["investor", "peer-engineer"],
    register: "platform-dark",
    status: "refresh",
    refreshReason: "Pre-rename brand in every colophon; sprint numbering predates the September team reset.",
    surface: "public",
    publishedAt: "2026-08-10",
  },
  {
    slug: "positioning-2026-08",
    title: "Nebbos positioning (2026-08)",
    oneLiner:
      "Superseded — teaches the earlier three-tier architecture that was retired in the September taxonomy.",
    audience: ["archival"],
    register: "legacy-charter",
    status: "superseded",
    surface: "public",
    publishedAt: "2026-08-21",
    supersededBy: "institutional-deck",
  },
];

export function getPiece(slug: string): Piece | undefined {
  return PIECES.find((p) => p.slug === slug);
}

export function publicPieces(): Piece[] {
  return PIECES.filter((p) => p.surface === "public");
}

export function currentPieces(): Piece[] {
  return PIECES.filter((p) => p.status === "current");
}
