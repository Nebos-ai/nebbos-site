import type { Metadata } from "next";
import Link from "next/link";
import {
  AMS_ASSETS,
  amsCategories,
  amsCountByStatus,
  type AmsAsset,
  type AmsStatus,
} from "@/content/ams/registry";

/**
 * app/ams/page.tsx — the Asset Management System page.
 *
 * Founder-directed 2026-09-19: a "completely neatly organized atlas" of
 * every marketing asset a tech company should have, marked with Nebbos's
 * state (have · in-progress · need · not-relevant · not-assessed), owner
 * team, and where to find it if we have it.
 *
 * Renders the full 321-asset registry from content/ams/registry.ts as a
 * category-grouped table with filter chips. All server-side rendered from
 * the registry — no client-side state, no JS required.
 *
 * Filtering is URL-driven via search params:
 *   /ams?status=need         → only "need" assets
 *   /ams?category=Brand      → only Brand & Identity category
 *   /ams?owner=Marketing     → only assets owned (partially) by Marketing
 */

export const metadata: Metadata = {
  title: "AMS · Nebbos Asset Management System",
  description:
    "The complete register of every marketing asset a modern tech company keeps, marked with Nebbos's state on each. 321 asset types across 18 categories.",
};

type SearchParams = {
  status?: string;
  category?: string;
  owner?: string;
};

const STATUS_LABEL: Record<AmsStatus, string> = {
  have: "Have",
  "in-progress": "In progress",
  need: "Need",
  "not-relevant": "Not relevant",
  "not-assessed": "Not assessed",
};

const STATUS_ORDER: AmsStatus[] = [
  "have",
  "in-progress",
  "need",
  "not-relevant",
  "not-assessed",
];

export default async function AmsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { status, category, owner } = await searchParams;

  const filtered = AMS_ASSETS.filter((a) => {
    if (status && a.status !== status) return false;
    if (category && a.category !== category) return false;
    if (owner && !(a.nebbosOwner ?? "").includes(owner)) return false;
    return true;
  });

  const counts = amsCountByStatus();
  const cats = amsCategories();
  const grouped = groupByCategory(filtered);

  return (
    <div className="ams-shell">
      <header className="ams-head">
        <div className="ams-eyebrow">Nebbos AMS · 2026-09-19</div>
        <h1 className="ams-title">Every asset we should have.</h1>
        <p className="ams-lede">
          The register of every marketing asset a modern tech company keeps —
          321 types across 18 categories — marked with Nebbos&rsquo;s state on
          each, owner team from the ratified topology, and where to find it if
          we already have it. Nothing here is aspirational marketing; every
          row reflects what a KPMG-style asset audit would find.
        </p>

        <dl className="ams-counts">
          {STATUS_ORDER.map((s) => (
            <div key={s} className={`ams-count ams-count--${s}`}>
              <dt>{STATUS_LABEL[s]}</dt>
              <dd>{counts[s]}</dd>
            </div>
          ))}
          <div className="ams-count ams-count--total">
            <dt>Total</dt>
            <dd>{AMS_ASSETS.length}</dd>
          </div>
        </dl>

        <nav className="ams-filters" aria-label="Filters">
          <div className="ams-filter-group">
            <span className="ams-filter-label">Status:</span>
            <FilterLink href="/ams" active={!status}>
              All
            </FilterLink>
            {STATUS_ORDER.map((s) => (
              <FilterLink
                key={s}
                href={`/ams?status=${s}`}
                active={status === s}
              >
                {STATUS_LABEL[s]} · {counts[s]}
              </FilterLink>
            ))}
          </div>
          {(status || category || owner) && (
            <div className="ams-filter-active">
              Filtered: {status && <code>status={status}</code>}{" "}
              {category && <code>category={category}</code>}{" "}
              {owner && <code>owner={owner}</code>}{" "}
              <Link href="/ams">clear</Link>
            </div>
          )}
        </nav>
      </header>

      <main className="ams-body">
        {Object.keys(grouped).length === 0 ? (
          <p className="ams-empty">No assets match this filter.</p>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <section key={cat} className="ams-category">
              <h2 className="ams-cat-title">
                <span className="ams-cat-name">{cat}</span>
                <span className="ams-cat-count">{items.length}</span>
              </h2>
              <div className="ams-table">
                <div className="ams-row ams-row--head">
                  <div>Asset</div>
                  <div>Audience</div>
                  <div>Refresh</div>
                  <div>Nebbos owner</div>
                  <div>Status</div>
                </div>
                {items.map((a) => (
                  <div key={a.name} className="ams-row">
                    <div className="ams-asset">
                      <div className="ams-asset-name">{a.name}</div>
                      <div className="ams-asset-desc">{a.description}</div>
                      {a.nebbosSource && (
                        <div className="ams-asset-source">
                          <span className="ams-asset-source-label">
                            Source:
                          </span>{" "}
                          <code>{a.nebbosSource}</code>
                        </div>
                      )}
                      {a.nebbosNote && (
                        <div className="ams-asset-note">
                          <span className="ams-asset-note-label">Note:</span>{" "}
                          {a.nebbosNote}
                        </div>
                      )}
                      <div className="ams-asset-example">
                        <span className="ams-asset-example-label">
                          Public example:
                        </span>{" "}
                        {a.publicExample}
                      </div>
                    </div>
                    <div className="ams-audience">
                      {a.audience.map((au) => (
                        <span key={au} className="ams-chip">
                          {au}
                        </span>
                      ))}
                    </div>
                    <div className="ams-refresh">{a.refresh}</div>
                    <div className="ams-owner">{a.nebbosOwner ?? "—"}</div>
                    <div className="ams-status">
                      <span className={`ams-badge ams-badge--${a.status}`}>
                        {STATUS_LABEL[a.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <footer className="ams-footer">
        <div>
          Nebbos Technologies Corp · Nebbos Technologies D.O.O. · AMS rev 1 ·
          2026-09-19
        </div>
        <Link href="/p">Publications register →</Link>
      </footer>

      <style>{AMS_CSS}</style>
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`ams-filter ${active ? "ams-filter--active" : ""}`}
    >
      {children}
    </Link>
  );
}

function groupByCategory(items: AmsAsset[]): Record<string, AmsAsset[]> {
  const out: Record<string, AmsAsset[]> = {};
  for (const a of items) {
    (out[a.category] ||= []).push(a);
  }
  return out;
}

const AMS_CSS = `
  .ams-shell {
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 72px) clamp(20px, 4vw, 48px) 96px;
    color: #1D1C22;
  }
  @media (prefers-color-scheme: dark) {
    .ams-shell { color: #F4F4F6; }
  }
  .ams-eyebrow {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin-bottom: 14px;
  }
  .ams-title {
    font-family: "Newsreader", Georgia, serif;
    font-size: clamp(32px, 4.5vw, 52px);
    line-height: 1;
    letter-spacing: -0.03em;
    font-weight: 700;
    margin: 0 0 18px;
    max-width: 20ch;
    text-wrap: balance;
  }
  .ams-lede {
    font-family: "Newsreader", Georgia, serif;
    font-size: 17px;
    line-height: 1.5;
    color: rgba(0,0,0,0.65);
    max-width: 68ch;
    margin: 0 0 32px;
  }
  .ams-counts {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    margin: 0 0 28px;
    padding: 0;
    border-top: 1px solid rgba(0,0,0,0.12);
    border-bottom: 1px solid rgba(0,0,0,0.12);
    padding-block: 18px;
  }
  @media (max-width: 800px) {
    .ams-counts { grid-template-columns: repeat(3, 1fr); }
  }
  .ams-count { display: flex; flex-direction: column; gap: 4px; padding: 0; margin: 0; }
  .ams-count dt {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin: 0;
  }
  .ams-count dd {
    font-family: "Newsreader", Georgia, serif;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1;
    margin: 0;
    font-variant-numeric: tabular-nums;
  }
  .ams-count--have dd { color: #3F7A5C; }
  .ams-count--in-progress dd { color: #B8862B; }
  .ams-count--need dd { color: #A3402A; }
  .ams-count--not-relevant dd { color: rgba(0,0,0,0.45); }
  .ams-count--not-assessed dd { color: rgba(0,0,0,0.35); }
  .ams-count--total dd { color: #1D1C22; }
  .ams-filters {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 40px;
  }
  .ams-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: baseline;
  }
  .ams-filter-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    margin-right: 8px;
  }
  .ams-filter {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    padding: 4px 10px;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 999px;
    color: rgba(0,0,0,0.75);
    text-decoration: none;
    transition: all 120ms;
  }
  .ams-filter:hover { border-color: #A36630; color: #A36630; }
  .ams-filter--active {
    background: #1D1C22;
    color: #F4F4F6;
    border-color: #1D1C22;
  }
  .ams-filter-active {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    color: rgba(0,0,0,0.55);
  }
  .ams-filter-active code {
    background: rgba(0,0,0,0.05);
    padding: 2px 6px;
    border-radius: 3px;
    color: #1D1C22;
  }
  .ams-filter-active a {
    color: #A36630;
    text-decoration: none;
    border-bottom: 1px dotted #A36630;
    margin-left: 8px;
  }
  .ams-body {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
  .ams-empty {
    color: rgba(0,0,0,0.55);
    font-family: "JetBrains Mono", monospace;
    padding: 40px;
    text-align: center;
  }
  .ams-cat-title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-family: "Newsreader", Georgia, serif;
    font-size: 24px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 700;
    margin: 0 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(0,0,0,0.15);
  }
  .ams-cat-count {
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    letter-spacing: 0.12em;
    color: rgba(0,0,0,0.55);
    font-weight: 500;
  }
  .ams-table {
    display: flex;
    flex-direction: column;
  }
  .ams-row {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1.2fr) 90px minmax(0, 1.2fr) 130px;
    gap: 16px;
    padding: 16px 4px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    font-size: 13px;
    line-height: 1.5;
    align-items: baseline;
  }
  .ams-row--head {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.55);
    border-bottom: 1px solid rgba(0,0,0,0.20);
    padding-bottom: 10px;
  }
  @media (max-width: 900px) {
    .ams-row { grid-template-columns: 1fr; gap: 6px; }
    .ams-row--head { display: none; }
  }
  .ams-asset-name {
    font-family: "Newsreader", Georgia, serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.005em;
    margin-bottom: 4px;
    color: #1D1C22;
  }
  .ams-asset-desc {
    color: rgba(0,0,0,0.7);
    max-width: 68ch;
    margin-bottom: 6px;
  }
  .ams-asset-source,
  .ams-asset-note {
    font-size: 12px;
    color: rgba(0,0,0,0.55);
    margin-top: 4px;
  }
  .ams-asset-source-label,
  .ams-asset-note-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.45);
    margin-right: 4px;
  }
  .ams-asset-source code {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    background: rgba(0,0,0,0.04);
    padding: 1px 5px;
    border-radius: 3px;
    color: #1D1C22;
  }
  .ams-asset-example {
    font-size: 11px;
    color: rgba(0,0,0,0.45);
    margin-top: 6px;
    font-style: italic;
  }
  .ams-asset-example-label {
    font-style: normal;
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.10em;
    text-transform: uppercase;
  }
  .ams-audience {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .ams-chip {
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.06em;
    padding: 2px 7px;
    background: rgba(0,0,0,0.04);
    border-radius: 2px;
    color: rgba(0,0,0,0.75);
    white-space: nowrap;
  }
  .ams-refresh,
  .ams-owner {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    color: rgba(0,0,0,0.65);
  }
  .ams-badge {
    display: inline-block;
    font-family: "JetBrains Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .ams-badge--have {
    color: #3F7A5C;
    background: rgba(63, 122, 92, 0.10);
  }
  .ams-badge--in-progress {
    color: #B8862B;
    background: rgba(184, 134, 43, 0.12);
  }
  .ams-badge--need {
    color: #A3402A;
    background: rgba(163, 64, 42, 0.10);
  }
  .ams-badge--not-relevant {
    color: rgba(0,0,0,0.55);
    background: rgba(0,0,0,0.05);
  }
  .ams-badge--not-assessed {
    color: rgba(0,0,0,0.40);
    background: transparent;
    border: 1px dashed rgba(0,0,0,0.15);
  }
  .ams-footer {
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid rgba(0,0,0,0.12);
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
  .ams-footer a {
    color: #A36630;
    text-decoration: none;
    border-bottom: 1px dotted #A36630;
  }
`;
