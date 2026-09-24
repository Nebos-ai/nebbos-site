"use client";

import { useEffect, useRef } from "react";

/**
 * LazyVideo · muted ambient loop that only downloads when it can be seen.
 *
 *   - Desktop (>= lg, where it sits beside the hero copy): loads on mount.
 *   - Below lg it stacks under the copy: it loads `mobileSrc` (a smaller
 *     encode, falling back to `src`) only once it nears the viewport.
 *   - prefers-reduced-motion: never loads; the caller's poster stays.
 *
 * No src is rendered on the server, so nothing is fetched before this runs.
 */
export function LazyVideo({
  src,
  mobileSrc,
  poster,
  className,
}: {
  src: string;
  mobileSrc?: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const load = (url: string) => {
      video.src = url;
      video.play().catch(() => {});
    };

    if (window.matchMedia("(min-width: 1024px)").matches) {
      load(src);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          load(mobileSrc ?? src);
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src, mobileSrc]);

  return <video ref={ref} className={className} muted loop playsInline preload="none" poster={poster} aria-hidden />;
}
