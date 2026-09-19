/**
 * components/docs/doc-styles.ts
 *
 * Shared CSS for /docs/* subpages. Imported and injected via <style> in
 * each page. Kept as a single string so pages remain server components
 * without a separate CSS module — the marketing site's convention.
 */

export const DOC_STYLES = `
  .doc-shell {
    max-width: 820px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 72px) clamp(24px, 5vw, 64px) 96px;
    color: #1D1C22;
  }
  @media (prefers-color-scheme: dark) {
    .doc-shell { color: #F4F4F6; }
  }
  .doc-crumbs {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(0,0,0,0.55); margin-bottom: 24px;
  }
  .doc-crumbs a { color: #A36630; text-decoration: none; border-bottom: 1px dotted #A36630; }
  .doc-crumbs span { color: rgba(0,0,0,0.35); }
  .doc-head { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px dashed rgba(0,0,0,0.15); }
  .doc-eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(0,0,0,0.55); margin-bottom: 12px;
  }
  .doc-title {
    font-family: "Newsreader", Georgia, serif;
    font-size: clamp(34px, 5vw, 48px);
    line-height: 1; letter-spacing: -0.028em; font-weight: 700;
    margin: 0 0 16px; text-wrap: balance; max-width: 20ch;
  }
  .doc-lede {
    font-family: "Newsreader", Georgia, serif;
    font-size: 18px; line-height: 1.5; color: rgba(0,0,0,0.65);
    max-width: 60ch; margin: 0;
  }
  .doc-section { margin-top: 48px; }
  .doc-section h2 {
    font-family: "Newsreader", Georgia, serif;
    font-size: 24px; letter-spacing: -0.018em; font-weight: 700;
    margin: 0 0 16px; padding-bottom: 8px;
    border-bottom: 1px solid rgba(0,0,0,0.12);
  }
  .doc-section p {
    font-family: "Newsreader", Georgia, serif;
    font-size: 16.5px; line-height: 1.6; color: rgba(0,0,0,0.78);
    max-width: 68ch; margin: 0 0 16px;
  }
  .doc-section p a, .doc-ol a {
    color: #A36630; text-decoration: none; border-bottom: 1px dotted #A36630;
  }
  .doc-ol {
    font-family: "Newsreader", Georgia, serif;
    font-size: 16px; line-height: 1.8; color: rgba(0,0,0,0.78); padding-left: 22px;
  }
  .doc-tier, .doc-pillar, .doc-comp-row {
    padding: 16px 4px; border-bottom: 1px solid rgba(0,0,0,0.10);
  }
  .doc-tier-h, .doc-pillar-h {
    display: flex; gap: 12px; align-items: baseline; margin-bottom: 8px;
  }
  .doc-tier-n, .doc-pillar-n {
    font-family: "JetBrains Mono", monospace;
    font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
    color: #A36630; font-weight: 700;
  }
  .doc-tier-t, .doc-pillar-t {
    font-family: "Newsreader", Georgia, serif;
    font-size: 17px; font-weight: 700; letter-spacing: -0.008em;
  }
  .doc-tier-d, .doc-pillar-d {
    font-size: 14px; color: rgba(0,0,0,0.70); line-height: 1.55; max-width: 68ch;
  }
  .doc-comp-row {
    display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr) minmax(0, 3fr);
    gap: 16px; align-items: baseline;
  }
  @media (max-width: 700px) { .doc-comp-row { grid-template-columns: 1fr; gap: 6px; } }
  .doc-comp-fw { font-family: "Newsreader", Georgia, serif; font-size: 15px; font-weight: 700; }
  .doc-comp-st {
    font-family: "JetBrains Mono", monospace; font-size: 11px;
    letter-spacing: 0.08em; text-transform: uppercase; color: #A36630; font-weight: 700;
  }
  .doc-comp-note { font-size: 13px; color: rgba(0,0,0,0.70); line-height: 1.5; }
  .doc-term {
    padding: 14px 4px; border-bottom: 1px solid rgba(0,0,0,0.10);
    display: grid; grid-template-columns: 160px 1fr; gap: 20px;
  }
  @media (max-width: 700px) { .doc-term { grid-template-columns: 1fr; gap: 6px; } }
  .doc-term-t { font-family: "Newsreader", Georgia, serif; font-size: 16px; font-weight: 700; }
  .doc-term-d { font-size: 14px; color: rgba(0,0,0,0.75); line-height: 1.55; }
  .doc-footer {
    margin-top: 64px; padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.12);
    display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap;
    font-family: "JetBrains Mono", monospace;
    font-size: 11px; letter-spacing: 0.06em; color: rgba(0,0,0,0.55);
    text-transform: uppercase;
  }
  .doc-footer a { color: #A36630; text-decoration: none; border-bottom: 1px dotted #A36630; }
`;
