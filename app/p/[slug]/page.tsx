import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { getPiece, publicPieces, type Piece } from "@/content/pieces/registry";

/**
 * app/p/[slug]/page.tsx
 *
 * The publication route. Serves any registered piece from
 * public/pieces/<slug>.html inside an iframe so the piece's own fonts,
 * CSS, and inline SVG are isolated from the marketing site's design
 * tokens. Adds a small navigation chrome on top with title, published
 * date, and a superseded banner where applicable.
 *
 * Founder-directed 2026-09-19: rehost every claude.ai artifact under
 * nebbos.ai/p/<slug>.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return publicPieces().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) return {};
  return {
    title: piece.title,
    description: piece.oneLiner,
    robots: piece.status === "superseded" ? { index: false, follow: false } : undefined,
  };
}

async function loadPieceHtml(slug: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), "public", "pieces", `${slug}.html`);
  if (!existsSync(filePath)) return null;
  try {
    return await readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export default async function PiecePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece || piece.surface !== "public") notFound();

  // Sanity: if the file isn't on disk yet, we render the chrome + a
  // "pending publish" state. This lets us register a piece ahead of
  // dropping the HTML in, and lets CI catch registry-file drift.
  const html = await loadPieceHtml(slug);

  return (
    <PieceShell piece={piece} hasHtml={Boolean(html)}>
      {html ? (
        <iframe
          src={`/pieces/${slug}.html`}
          title={piece.title}
          className="piece-frame"
          loading="eager"
        />
      ) : (
        <PendingPublishPanel slug={slug} />
      )}
    </PieceShell>
  );
}

function PieceShell({
  piece,
  hasHtml,
  children,
}: {
  piece: Piece;
  hasHtml: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="piece-shell">
      {piece.status === "superseded" && <SupersededBanner piece={piece} />}
      {piece.status === "refresh" && <RefreshBanner piece={piece} />}

      <header className="piece-header">
        <div className="piece-eyebrow">
          <span>Nebbos publication</span>
          <span>·</span>
          <time dateTime={piece.publishedAt}>{formatDate(piece.publishedAt)}</time>
        </div>
        <h1 className="piece-title">{piece.title}</h1>
        {piece.oneLiner && <p className="piece-lede">{piece.oneLiner}</p>}
      </header>

      <div className="piece-body">{children}</div>

      <footer className="piece-footer">
        <span>Nebbos Technologies Corp · Nebbos Technologies D.O.O.</span>
        <Link href="/p">All publications</Link>
      </footer>

      <style>{PIECE_CSS}</style>
      {hasHtml && <style>{IFRAME_CSS}</style>}
    </div>
  );
}

function SupersededBanner({ piece }: { piece: Piece }) {
  const successor = piece.supersededBy ? getPiece(piece.supersededBy) : undefined;
  return (
    <div className="piece-banner piece-banner--superseded" role="note">
      <strong>Superseded.</strong> This piece teaches doctrine that has since been retired.
      {successor && (
        <>
          {" "}
          The current statement is <Link href={`/p/${successor.slug}`}>{successor.title}</Link>.
        </>
      )}
    </div>
  );
}

function RefreshBanner({ piece }: { piece: Piece }) {
  return (
    <div className="piece-banner piece-banner--refresh" role="note">
      <strong>Refresh pending.</strong> {piece.refreshReason ?? "This piece is queued for a content refresh."}
    </div>
  );
}

function PendingPublishPanel({ slug }: { slug: string }) {
  return (
    <div className="piece-pending">
      <p>
        Registered. Awaiting publish — <code>public/pieces/{slug}.html</code> not yet on disk.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  const parts = iso.split("-").map(Number);
  const y = parts[0] ?? 0;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

const PIECE_CSS = `
  .piece-shell {
    max-width: 1240px;
    margin: 0 auto;
    padding: clamp(28px, 4vw, 56px) clamp(20px, 4vw, 48px) clamp(80px, 8vw, 120px);
    color: #1D1C22;
    background: #FFFFFF;
    min-height: 100vh;
  }
  @media (prefers-color-scheme: dark) {
    .piece-shell { color: #F4F4F6; background: #1D1C22; }
  }
  .piece-header {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.10);
    margin-bottom: 32px;
  }
  .piece-eyebrow {
    display: flex; gap: 10px; flex-wrap: wrap;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin-bottom: 12px;
  }
  .piece-title {
    font-family: "Newsreader", Georgia, serif;
    font-size: clamp(28px, 3.6vw, 40px);
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 700;
    margin: 0 0 12px;
  }
  .piece-lede {
    font-family: "Newsreader", Georgia, serif;
    font-size: 17px;
    line-height: 1.5;
    color: rgba(0,0,0,0.65);
    margin: 0;
    max-width: 60ch;
  }
  .piece-banner {
    padding: 16px 22px;
    border-radius: 6px;
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 1.5;
  }
  .piece-banner--superseded {
    background: rgba(163, 64, 42, 0.10);
    color: #7a3020;
    border-left: 3px solid #A3402A;
  }
  .piece-banner--refresh {
    background: rgba(184, 134, 43, 0.10);
    color: #8a6420;
    border-left: 3px solid #B8862B;
  }
  .piece-banner a { color: inherit; border-bottom: 1px solid currentColor; text-decoration: none; }
  .piece-body {
    background: rgba(0,0,0,0.02);
    border-radius: 8px;
    overflow: hidden;
    min-height: 70vh;
  }
  .piece-pending {
    padding: 40px 32px;
    color: rgba(0,0,0,0.55);
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
  }
  .piece-footer {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.10);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: rgba(0,0,0,0.55);
    text-transform: uppercase;
  }
  .piece-footer a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
  }
`;

const IFRAME_CSS = `
  .piece-frame {
    display: block;
    width: 100%;
    height: 82vh;
    min-height: 640px;
    border: 0;
    background: transparent;
  }
`;
