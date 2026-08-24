import { FullBleedVideo } from "@/components/site/FullBleedVideo";

/**
 * HomeHero · v7 (video take 2) · 2026-08-24
 *
 * Second video cut per founder feedback: Scene A is a wide crowd of many
 * visible faces (camera pushes through); Scene B is a large modern
 * architectural bridge with a big crowd — only a few break forward and
 * cross. 16s silent loop, MP4 + WebM.
 *
 * Manifesto h1 stays single-line via .hero-fullbleed__title--manifesto.
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
          <h1 id="hero-heading" className="hero-fullbleed__title hero-fullbleed__title--manifesto">
            Remember who you are.
          </h1>
        </div>
      </div>
    </FullBleedVideo>
  );
}
