/**
 * Nebbos wordmark — the ratified nb-logo lockup (7 paths, 63×12 viewBox).
 *
 * Same glyph the Delta brief uses at `#nb-logo`. Monochrome via
 * `currentColor` for the wordmark; the swoosh accent uses
 * `var(--nb-mark)` which defaults to Nebbos orange (#E8821E).
 *
 * Set the wrapping element's `color:` to recolor the wordmark. Set
 * `--nb-mark` on the wrapping element to recolor the swoosh accent
 * independently (rare — the accent is brand-invariant).
 */
type Size = "sm" | "md" | "lg" | number;

const HEIGHTS: Record<"sm" | "md" | "lg", number> = {
  sm: 16,
  md: 22,
  lg: 32,
};
const ASPECT = 63 / 12;

type NbLogoProps = {
  size?: Size;
  title?: string;
  className?: string;
};

export function NbLogo({ size = "md", title, className }: NbLogoProps) {
  const height = typeof size === "number" ? size : HEIGHTS[size];
  const width = Math.round(height * ASPECT);
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 63 12"
      width={width}
      height={height}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      {!decorative && <title>{title}</title>}
      <path d="M18.43 6.47276H12.6882L12.6882 10.492H19L18.7826 12H11L11 0H18.7018L18.7018 1.50801H12.6882L12.6882 4.96635H18.43L18.43 6.47436L18.43 6.47276Z" fill="currentColor" />
      <path d="M21.0016 0H25.7898C28.4299 0 29.6103 1.36859 29.6103 3.01122C29.6103 4.39904 28.8147 5.29968 27.9022 5.6234C28.7449 5.89744 30 6.74359 30 8.47115C30 10.6939 28.274 12 25.9148 12H21L21 0H21.0016ZM25.483 4.94071C27.1472 4.94071 27.8016 4.28045 27.8016 3.17147C27.8016 2.14423 27.0482 1.44391 25.6989 1.44391H22.7714L22.7714 4.94071H25.4813H25.483ZM22.773 10.5561H25.6567C27.1634 10.5561 28.1458 9.8718 28.1458 8.45353C28.1458 7.21474 27.3388 6.38782 25.4034 6.38782H22.773L22.773 10.5561Z" fill="currentColor" />
      <path d="M32.0016 0H36.7898C39.4299 0 40.6103 1.36859 40.6103 3.01122C40.6103 4.39904 39.8147 5.29968 38.9022 5.6234C39.7449 5.89744 41 6.74359 41 8.47115C41 10.6939 39.274 12 36.9148 12H32L32 0H32.0016ZM36.483 4.94071C38.1472 4.94071 38.8016 4.28045 38.8016 3.17147C38.8016 2.14423 38.0482 1.44391 36.6989 1.44391H33.7714L33.7714 4.94071H36.4813H36.483ZM33.773 10.5561H36.6567C38.1634 10.5561 39.1458 9.8718 39.1458 8.45353C39.1458 7.21474 38.3388 6.38782 36.4034 6.38782H33.773L33.773 10.5561Z" fill="currentColor" />
      <path d="M53 5.93925C53 9.15421 51.1588 12 47.4341 12C43.9307 12 42 9.34579 42 6C42 2.65421 44.0013 0 47.5753 0C50.9092 0 53 2.45171 53 5.93925ZM43.8192 5.95016C43.8192 8.42523 45.0639 10.5421 47.5078 10.5421C50.148 10.5421 51.1808 8.37695 51.1808 5.96262C51.1808 3.54829 50.0098 1.45639 47.5031 1.45639C44.9964 1.45639 43.8192 3.5 43.8192 5.9486L43.8192 5.95016Z" fill="currentColor" />
      <path d="M55.786 8.56252C56.0985 9.91942 57.0502 10.6306 58.7062 10.6306C60.4685 10.6306 61.1743 9.83676 61.1743 8.78087C61.1743 7.65168 60.5906 7.04185 58.2763 6.49441C55.3958 5.81128 54.4568 4.8287 54.4568 3.19886C54.4568 1.40681 55.8051 0 58.4873 0C61.3773 0 62.559 1.61892 62.7208 3.18638H60.9316C60.7349 2.20847 60.1227 1.36938 58.4286 1.36938C57.0582 1.36938 56.2809 1.96829 56.2809 3.02885C56.2809 4.08942 56.9202 4.48401 58.9711 4.96907C62.3719 5.77853 63 7.06837 63 8.59527C63 10.5261 61.5391 12 58.5888 12C55.6385 12 54.2522 10.4216 54 8.5672H55.7892L55.786 8.56252Z" fill="currentColor" />
      <path d="M6.03594 7.06903L4.8345 6.07791C2.7857 4.38863 1.65689 2.23003 1.65689 0H0V11H1.65689V5.04744C2.22432 5.85928 2.92794 6.62011 3.76471 7.30953L4.96614 8.30065C5.85436 9.03379 6.34311 9.95786 6.34311 10.9067H8C8 9.47688 7.30244 8.11409 6.03594 7.06903Z" fill="var(--nb-mark, #E8821E)" />
      <path d="M9 0H7L7 4H9L9 0Z" fill="currentColor" />
    </svg>
  );
}
