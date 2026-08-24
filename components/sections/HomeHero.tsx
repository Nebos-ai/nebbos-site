import { FullBleedVideo } from "@/components/site/FullBleedVideo";

/**
 * HomeHero · v5 · 2026-08-24
 *
 * Video hero. Two scenes: 4 close-ups of faces showing quiet confusion +
 * distrust (2s each), then a wide golden-hour shot of a group at a bridge —
 * three cross, three stay behind. Story of "Remember who you are.": the
 * state you're in, then the choice.
 *
 * Silent auto-loop. Poster (hero-poster.jpg) shows during load and as
 * fallback. The h1 is the whole hero copy — no deck, no CTA button,
 * no aside. Palantir/Loro-tier restraint.
 *
 * Video generated via Google Veo 3.1 (2026-08-24), stitched with ffmpeg
 * from 5 shots at 1280×720. See scratchpad/generate-hero-video.py +
 * stitch-hero.sh for the production pipeline.
 */

export function HomeHero() {
  return (
    <FullBleedVideo
      className="hero-fullbleed"
      sources={[
        { src: "/vision-board/hero.webm", type: "video/webm" },
        { src: "/vision-board/hero.mp4", type: "video/mp4" },
      ]}
      posterSrc="/vision-board/hero-poster.jpg"
      scrim="bottom"
      vignetteStrength={0.5}
      chapter="I"
      chapterLabel="Where it starts"
      ariaLabelledby="hero-heading"
    >
      <div className="container hero-fullbleed__inner">
        <div className="hero-fullbleed__frame">
          <h1 id="hero-heading" className="hero-fullbleed__title">
            Remember who you are.
          </h1>
        </div>
      </div>
    </FullBleedVideo>
  );
}
