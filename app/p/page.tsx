import type { Metadata } from "next";
import Link from "next/link";
import { publicPieces } from "@/content/pieces/registry";

/**
 * app/p/page.tsx — the publication index.
 * Lists every registered public piece. Reads from content/pieces/registry.ts.
 */

export const metadata: Metadata = {
  title: "Publications · Nebbos",
  description:
    "The complete register of Nebbos publications — decks, portfolio pieces, and reference material.",
};

export default function PublicationsIndex() {
  const pieces = publicPieces();
  return (
    <div className="pubs-shell">
      <header className="pubs-header">
        <div className="pubs-eyebrow">Nebbos publications</div>
        <h1 className="pubs-title">The pieces we&rsquo;ve published.</h1>
        <p className="pubs-lede">
          Every deck, portfolio piece, and reference we&rsquo;ve put in front of a partner or an investor.
          Each opens as its own document; the pieces are self-contained.
        </p>
      </header>

      <ol className="pubs-list">
        {pieces.map((p) => (
          <li key={p.slug} className={`pubs-item pubs-item--${p.status}`}>
            <Link href={`/p/${p.slug}`} className="pubs-link">
              <div className="pubs-item-title">{p.title}</div>
              {p.oneLiner && <p className="pubs-item-lede">{p.oneLiner}</p>}
              <div className="pubs-item-meta">
                <time dateTime={p.publishedAt}>{p.publishedAt}</time>
                <span>·</span>
                <span>{p.audience.join(" · ")}</span>
                {p.status !== "current" && (
                  <>
                    <span>·</span>
                    <span className={`pubs-status pubs-status--${p.status}`}>{p.status}</span>
                  </>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <style>{`
        .pubs-shell {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(48px, 6vw, 90px) clamp(24px, 5vw, 64px) clamp(80px, 10vw, 120px);
          color: #1D1C22;
        }
        @media (prefers-color-scheme: dark) {
          .pubs-shell { color: #F4F4F6; }
        }
        .pubs-header {
          padding-bottom: 32px;
          border-bottom: 1px dashed rgba(0,0,0,0.15);
          margin-bottom: 40px;
        }
        .pubs-eyebrow {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.55);
          margin-bottom: 16px;
        }
        .pubs-title {
          font-family: "Newsreader", Georgia, serif;
          font-size: clamp(36px, 5vw, 56px);
          line-height: 1;
          letter-spacing: -0.03em;
          font-weight: 700;
          margin: 0 0 20px;
          max-width: 20ch;
          text-wrap: balance;
        }
        .pubs-lede {
          font-family: "Newsreader", Georgia, serif;
          font-size: 18px;
          line-height: 1.5;
          color: rgba(0,0,0,0.65);
          max-width: 60ch;
          margin: 0;
        }
        .pubs-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pubs-item {
          border-bottom: 1px solid rgba(0,0,0,0.10);
        }
        .pubs-link {
          display: block;
          padding: 22px 0;
          color: inherit;
          text-decoration: none;
        }
        .pubs-link:hover .pubs-item-title { color: #A36630; }
        .pubs-item-title {
          font-family: "Newsreader", Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
          transition: color 120ms;
        }
        .pubs-item-lede {
          font-size: 14px;
          color: rgba(0,0,0,0.65);
          line-height: 1.5;
          margin: 0 0 10px;
          max-width: 68ch;
        }
        .pubs-item-meta {
          display: flex;
          gap: 8px;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          color: rgba(0,0,0,0.50);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .pubs-status--refresh { color: #B8862B; }
        .pubs-status--superseded { color: #A3402A; }
        .pubs-status--unverified { color: rgba(0,0,0,0.55); }
        .pubs-item--superseded .pubs-item-title { opacity: 0.7; }
      `}</style>
    </div>
  );
}
