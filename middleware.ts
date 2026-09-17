import { NextRequest, NextResponse } from "next/server";

/**
 * middleware.ts · nebbos.ai security substrate v3 · 2026-09-16
 *
 * Sits on every request, generates a per-request CSP nonce, injects
 * strict security headers. Zero unsafe-inline scripts. Zero unsafe-eval.
 * All Next-generated inline scripts pick up the nonce automatically
 * (Next 15 App Router honors x-nonce request header).
 *
 * Headers set on every response:
 *   - Content-Security-Policy (nonce-scoped, strict-dynamic script-src)
 *   - Strict-Transport-Security (2-year, preload)
 *   - X-Frame-Options DENY  (defense-in-depth vs frame-src CSP)
 *   - X-Content-Type-Options nosniff
 *   - Referrer-Policy strict-origin-when-cross-origin
 *   - Permissions-Policy — locks down every feature this site does not use
 *   - Cross-Origin-Opener-Policy same-origin  (isolate window.opener)
 *   - Cross-Origin-Resource-Policy same-origin  (isolate embed origins)
 *
 * NOT set here (delegated to next.config.ts headers()):
 *   - Cache-Control (route-specific, static asset TTL differs from page TTL)
 *
 * CSP surface pinned to what nebbos.ai actually uses:
 *   - default-src 'self'
 *   - script-src 'self' 'nonce-{n}' 'strict-dynamic'
 *   - style-src 'self' 'unsafe-inline' — required by Next 15's inline styles for now; will tighten to nonce-based on next migration
 *   - img-src 'self' data: blob:
 *   - font-src 'self' data:
 *   - connect-src 'self' https://vitals.vercel-insights.com
 *   - frame-ancestors 'none'  (defense-in-depth vs X-Frame-Options)
 *   - form-action 'self'
 *   - base-uri 'self'
 *   - object-src 'none'
 *
 * Governance: any change to this policy is a security-affecting change.
 * Verify via `curl -I https://nebbos.ai` post-deploy.
 */

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "ambient-light-sensor=()",
  "autoplay=()",
  "battery=()",
  "camera=()",
  "cross-origin-isolated=()",
  "display-capture=()",
  "document-domain=()",
  "encrypted-media=()",
  "execution-while-not-rendered=()",
  "execution-while-out-of-viewport=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "keyboard-map=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "navigation-override=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "sync-xhr=()",
  "usb=()",
  "web-share=()",
  "xr-spatial-tracking=()",
].join(", ");

export function middleware(request: NextRequest) {
  const nonce = generateNonce();

  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspDirectives);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", cspDirectives);
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", PERMISSIONS_POLICY);
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match every request path EXCEPT:
     *  - /_next/static/*      Next static chunks (immutable, served from CDN)
     *  - /_next/image         Next image optimizer
     *  - /_next/data          Next data-fetching payloads
     *  - /favicon.svg + /*.svg  static SVG icons
     *  - Every file with a known extension (fonts, images, media)
     * Middleware runs on the HTML page routes + /api routes.
     */
    "/((?!_next/static|_next/image|_next/data|favicon|hero/|.*\\.(?:svg|png|jpg|jpeg|webp|avif|gif|ico|woff2|woff|ttf|otf|mp4|webm|pdf)).*)",
  ],
};
