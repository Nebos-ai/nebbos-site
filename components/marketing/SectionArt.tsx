import { useId, type FC } from "react";
import { cn } from "@/lib/cn";

/**
 * SectionArt · line illustrations that replace the mark tile on section
 * headers and text-block cards (the header + chip read as clutter).
 * Hairline strokes in the section tint, ambient self-running motion only
 * (no pointer tracking), no <text> so page copy stays untouched.
 * A section opts in with `art: "<kind>"` in content/pages.ts.
 */

export type SectionArtKind =
  | "encryption"
  | "identity"
  | "axes"
  | "tiers"
  | "classifier"
  | "custodians"
  | "layers"
  | "noise"
  | "pearl"
  | "integrate"
  | "signals"
  | "trigger"
  | "questions"
  | "timeline"
  | "audit"
  | "document"
  | "team"
  | "portability"
  | "pillars"
  | "substrate";

export function SectionArt({ kind, className }: { kind: SectionArtKind; className?: string }) {
  const Art = ART[kind];
  return (
    <div aria-hidden className={cn("pointer-events-none w-full max-w-[320px] select-none", className)}>
      <Art />
    </div>
  );
}

const ink = "rgb(244 242 238 / 0.14)";
const inkSoft = "rgb(244 242 238 / 0.07)";

/* Plain bytes flow in from the left, pass the lock, leave as ciphertext. */
function EncryptionArt() {
  const rows = [96, 120, 144];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      {/* key-rotation rings */}
      <g className="bc-spin" style={{ transformOrigin: "160px 120px", ["--bc-dur" as string]: "60s" }}>
        <circle cx="160" cy="120" r="100" stroke={ink} strokeDasharray="2 7" />
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="160" y1="16" x2="160" y2="24"
            stroke="var(--tint)" strokeOpacity={i % 3 === 0 ? 0.7 : 0.25} strokeLinecap="round"
            transform={`rotate(${i * 30} 160 120)`}
          />
        ))}
      </g>
      <g className="bc-spin-rev" style={{ transformOrigin: "160px 120px", ["--bc-dur" as string]: "90s" }}>
        <circle cx="160" cy="120" r="76" stroke={inkSoft} strokeDasharray="1 4" />
        <circle cx="160" cy="44" r="2.5" fill="var(--tint)" fillOpacity="0.8" />
      </g>

      {/* data lanes */}
      {rows.map((y, r) => (
        <g key={y}>
          <line x1="8" y1={y} x2="126" y2={y} stroke={inkSoft} />
          <line x1="194" y1={y} x2="312" y2={y} stroke={inkSoft} />
          {/* plaintext · even blocks */}
          {[14, 30, 46, 62].map((x) => (
            <rect key={x} x={x} y={y - 3} width="8" height="6" rx="1.5" fill={ink} />
          ))}
          {/* ciphertext · scrambled widths */}
          {[[204, 5], [214, 12], [231, 4], [240, 9], [254, 6], [266, 13], [284, 4], [293, 8]].map(([x, w], i) => (
            <rect
              key={x}
              x={x} y={y - 3} width={w} height="6" rx="1.5"
              fill="var(--tint)" fillOpacity={((i + r) % 3) * 0.18 + 0.2}
            />
          ))}
          <path
            d={`M8 ${y} H126`} pathLength={100} stroke={ink} strokeWidth="1.5" strokeLinecap="round"
            className="bc-pulse" style={{ animationDelay: `${r * 0.9}s`, animationDuration: "4.2s" }}
          />
          <path
            d={`M194 ${y} H312`} pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round"
            className="bc-pulse" style={{ animationDelay: `${r * 0.9 + 1.4}s`, animationDuration: "4.2s" }}
          />
        </g>
      ))}

      {/* padlock */}
      <g className="bc-breathe" style={{ transformOrigin: "160px 128px", animationDuration: "5s" }}>
        <path d="M143 110 V97 a17 17 0 0 1 34 0 V110" stroke="var(--tint)" strokeWidth="2" strokeLinecap="round" />
        <rect x="128" y="108" width="64" height="50" rx="11" fill="var(--tint)" fillOpacity="0.1" stroke="var(--tint)" strokeWidth="2" />
        <circle cx="160" cy="129" r="5" fill="var(--tint)" />
        <rect x="158" y="131" width="4" height="12" rx="2" fill="var(--tint)" />
      </g>
    </svg>
  );
}

/* Fingerprint behind a shield, federated out to user · workload · vault. */
function IdentityArt() {
  const clip = `idclip-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ridges = [7, 13, 19, 25, 31];
  const nodes = [
    { x: 40, y: 118, d: "M114 118 H54" },
    { x: 280, y: 118, d: "M206 118 H266" },
    { x: 160, y: 218, d: "M160 180 V204" },
  ];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <defs>
        <clipPath id={clip}>
          <path d="M160 48 L208 66 V112 C208 146 188 166 160 180 C132 166 112 146 112 112 V66 Z" />
        </clipPath>
      </defs>

      <circle cx="160" cy="114" r="104" stroke={inkSoft} strokeDasharray="1 5" />

      {/* federation links */}
      {nodes.map((n, i) => (
        <g key={n.d}>
          <path d={n.d} stroke={ink} strokeDasharray="2 4" />
          <path
            d={n.d} pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round"
            className="bc-pulse" style={{ animationDelay: `${i * 1.2}s` }}
          />
          <rect x={n.x - 14} y={n.y - 14} width="28" height="28" rx="8" fill="var(--tint)" fillOpacity="0.06" stroke={ink} />
        </g>
      ))}
      {/* user */}
      <circle cx="40" cy="113" r="3.5" stroke="var(--tint)" strokeWidth="1.5" />
      <path d="M33 125 a7 6 0 0 1 14 0" stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round" />
      {/* workload */}
      <g stroke="var(--tint)" strokeWidth="1.5">
        <rect x="273" y="111" width="6" height="6" rx="1.5" />
        <rect x="281" y="111" width="6" height="6" rx="1.5" strokeOpacity="0.5" />
        <rect x="273" y="119" width="6" height="6" rx="1.5" strokeOpacity="0.5" />
        <rect x="281" y="119" width="6" height="6" rx="1.5" />
      </g>
      {/* vault key */}
      <g stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="154" cy="218" r="4" />
        <path d="M158 218 H168 M164 218 V222" />
      </g>

      {/* shield */}
      <path
        d="M160 48 L208 66 V112 C208 146 188 166 160 180 C132 166 112 146 112 112 V66 Z"
        fill="var(--tint)" fillOpacity="0.07" stroke="var(--tint)" strokeWidth="2" strokeLinejoin="round"
      />

      {/* fingerprint */}
      <g clipPath={`url(#${clip})`} strokeLinecap="round">
        {ridges.map((r, i) => (
          <path
            key={r}
            d={`M${160 - r} ${128} V${116} a${r} ${r} 0 0 1 ${r * 2} 0 V${128 + i * 3}`}
            stroke="var(--tint)" strokeOpacity={0.35 + i * 0.1} strokeWidth="1.6"
            strokeDasharray={i % 2 ? "22 5" : "30 6"}
          />
        ))}
        <path d="M160 110 V136" stroke="var(--tint)" strokeOpacity="0.6" strokeWidth="1.6" />
        {/* scan beam */}
        <g className="sec-scan">
          <rect x="112" y="60" width="96" height="14" fill="var(--tint)" fillOpacity="0.08" />
          <rect x="112" y="73" width="96" height="1.5" fill="var(--tint)" style={{ filter: "drop-shadow(0 0 4px var(--tint))" }} />
        </g>
      </g>
    </svg>
  );
}

/* Data · model · keys: three axes out of one origin you own. */
function AxesArt() {
  const O = { x: 160, y: 128 };
  const ends = [
    { x: 160, y: 36 },
    { x: 66, y: 184 },
    { x: 254, y: 184 },
  ];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <path d="M160 82 L200 105 V151 L160 174 L120 151 V105 Z" stroke={ink} strokeDasharray="2 4" />
      <path d="M160 82 L200 105 L160 128 L120 105 Z" fill="var(--tint)" fillOpacity="0.06" />
      {ends.map((e, i) => {
        const d = `M${O.x} ${O.y} L${e.x} ${e.y}`;
        return (
          <g key={i}>
            <path d={d} stroke={ink} />
            <path
              d={d} pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round"
              className="bc-pulse" style={{ animationDelay: `${i * 1.2}s` }}
            />
            <rect x={e.x - 17} y={e.y - 17} width="34" height="34" rx="10" fill="var(--tint)" fillOpacity="0.08" stroke="var(--tint)" strokeOpacity="0.55" />
          </g>
        );
      })}
      {/* keys */}
      <g stroke="var(--tint)" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="154" cy="36" r="4.5" />
        <path d="M158.5 36 H168 M165 36 V40" />
      </g>
      {/* data */}
      <g stroke="var(--tint)" strokeWidth="1.6">
        <ellipse cx="66" cy="177" rx="8" ry="3" />
        <path d="M58 177 V191 A8 3 0 0 0 74 191 V177 M58 184 A8 3 0 0 0 74 184" />
      </g>
      {/* model */}
      <g stroke="var(--tint)" strokeWidth="1.6">
        <path d="M247 189 L254 176 L261 189 Z" strokeOpacity="0.5" />
        <circle cx="254" cy="176" r="3" fill="var(--color-ground-2)" />
        <circle cx="247" cy="189" r="3" fill="var(--color-ground-2)" />
        <circle cx="261" cy="189" r="3" fill="var(--color-ground-2)" />
      </g>
      {/* origin */}
      <circle cx={O.x} cy={O.y} r="10" stroke="var(--tint)" strokeOpacity="0.5" className="bc-halo" style={{ transformOrigin: `${O.x}px ${O.y}px`, transformBox: "view-box" }} />
      <circle cx={O.x} cy={O.y} r="5" fill="var(--tint)" />
    </svg>
  );
}

/* Five treatment tiers: the higher the plate, the more the model may see. */
function TiersArt() {
  const ys = [42, 80, 118, 156, 194];
  const plate = (y: number) => `M76 ${y} L160 ${y - 18} L244 ${y} L160 ${y + 18} Z`;
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <line x1="160" y1="14" x2="160" y2="226" stroke={inkSoft} strokeDasharray="2 5" />
      {ys.map((y, i) => (
        <g key={y}>
          <path d={plate(y)} fill="var(--tint)" fillOpacity={0.2 - i * 0.04} stroke="var(--tint)" strokeOpacity={0.9 - i * 0.16} />
          {/* visibility: dots thin out as the tier tightens */}
          {Array.from({ length: 9 - i * 2 }, (_, k) => {
            const x = 160 + (k - (8 - i * 2) / 2) * 12;
            return <circle key={k} cx={x} cy={y} r="1.6" fill="var(--color-ink)" fillOpacity={0.55 - i * 0.08} />;
          })}
          <line x1="262" y1={y} x2={262 + 36 - i * 7} y2={y} stroke="var(--tint)" strokeOpacity={0.8 - i * 0.14} strokeWidth="2" strokeLinecap="round" />
          <circle cx="256" cy={y} r="2" fill="var(--tint)" fillOpacity={0.9 - i * 0.15} />
        </g>
      ))}
      <path
        d="M160 14 V226" pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round"
        className="bc-pulse" style={{ animationDuration: "5s" }}
      />
    </svg>
  );
}

/* Records enter your host, the classifier fans them out to tier lanes. */
function ClassifierArt() {
  const lanes = [64, 92, 120, 148, 176];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      {/* your host */}
      <rect x="92" y="34" width="136" height="172" rx="16" stroke={ink} strokeDasharray="3 5" />
      <g stroke={ink} strokeWidth="1.4" strokeLinecap="round">
        <rect x="102" y="44" width="16" height="11" rx="2" />
        <path d="M106 59 H114" />
      </g>
      {/* input lane */}
      <line x1="8" y1="120" x2="134" y2="120" stroke={inkSoft} />
      {[16, 32, 48, 64].map((x, i) => (
        <rect key={x} x={x} y="116" width="9" height="8" rx="2" fill="var(--tint)" fillOpacity={[0.3, 0.8, 0.15, 0.55][i]} />
      ))}
      <path d="M8 120 H134" pathLength={100} stroke={ink} strokeWidth="1.5" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "4s" }} />
      {/* classifier prism */}
      <g className="bc-breathe" style={{ transformOrigin: "160px 120px", animationDuration: "5s" }}>
        <path d="M160 94 L186 120 L160 146 L134 120 Z" fill="var(--tint)" fillOpacity="0.12" stroke="var(--tint)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M160 106 L174 120 L160 134 L146 120 Z" stroke="var(--tint)" strokeOpacity="0.5" />
      </g>
      {/* tier lanes */}
      {lanes.map((y, i) => {
        const d = `M186 120 C 226 120, 236 ${y}, 306 ${y}`;
        return (
          <g key={y}>
            <path d={d} stroke={ink} />
            <path
              d={d} pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round"
              className="bc-pulse" style={{ animationDelay: `${1 + i * 0.5}s`, animationDuration: "4s" }}
            />
            <rect x="290" y={y - 5} width="14" height="10" rx="3" fill="var(--tint)" fillOpacity={0.9 - i * 0.17} />
          </g>
        );
      })}
    </svg>
  );
}

/* Break-glass: one key, held by the custodians you elect (2 of 3 live). */
function CustodiansArt() {
  const nodes = [
    { x: 64, y: 186, d: "M78 176 L146 122", live: true },
    { x: 160, y: 206, d: "M160 190 V128", live: true },
    { x: 256, y: 186, d: "M242 176 L174 122", live: false },
  ];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <circle cx="160" cy="112" r="96" stroke={inkSoft} strokeDasharray="1 5" />
      {nodes.map((n, i) => (
        <g key={i}>
          <path d={n.d} stroke={ink} strokeDasharray="2 4" />
          {n.live && (
            <path
              d={n.d} pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round"
              className="bc-pulse" style={{ animationDelay: `${i * 1.3}s` }}
            />
          )}
          <circle cx={n.x} cy={n.y} r="17" fill="var(--tint)" fillOpacity={n.live ? 0.1 : 0.03} stroke={n.live ? "var(--tint)" : ink} strokeOpacity={n.live ? 0.7 : 1} />
          <g stroke={n.live ? "var(--tint)" : ink} strokeWidth="1.5" strokeLinecap="round">
            <circle cx={n.x} cy={n.y - 4} r="3.5" />
            <path d={`M${n.x - 7} ${n.y + 9} a7 6 0 0 1 14 0`} />
          </g>
        </g>
      ))}
      {/* the key */}
      <g className="bc-breathe" style={{ transformOrigin: "160px 104px", animationDuration: "5s" }}>
        <circle cx="160" cy="104" r="30" fill="var(--tint)" fillOpacity="0.07" stroke="var(--tint)" strokeOpacity="0.35" />
        <g stroke="var(--tint)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="146" cy="104" r="9" />
          <path d="M155 104 H180 M172 104 V112 M178 104 V110" />
        </g>
      </g>
    </svg>
  );
}

/* The architecture stack, with the layers that enforce the claim lit. */
function LayersArt() {
  const lit = new Set([0, 1, 6, 10, 11]);
  const ys = Array.from({ length: 12 }, (_, i) => 44 + i * 14);
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <line x1="58" y1="30" x2="58" y2="212" stroke={inkSoft} />
      <path d="M58 30 V212" pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "5s" }} />
      {ys.map((y, i) => {
        const on = lit.has(i);
        return (
          <g key={y}>
            <path
              d={`M70 ${y} L160 ${y - 6} L250 ${y} L160 ${y + 6} Z`}
              fill="var(--tint)" fillOpacity={on ? 0.16 : 0}
              stroke={on ? "var(--tint)" : ink} strokeOpacity={on ? 0.85 : 1}
            />
            {on && (
              <>
                <line x1="250" y1={y} x2="276" y2={y} stroke="var(--tint)" strokeOpacity="0.6" />
                <circle cx="280" cy={y} r="3" fill="var(--tint)" />
                <circle cx="58" cy={y} r="2.5" fill="var(--tint)" />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* The problem: scattered, noisy signal funnelled into one clean line. */
function NoiseArt() {
  const rows = [34, 62, 90, 118, 146, 174, 202];
  const jag = (y: number, k: number) => {
    let d = `M10 ${y}`;
    for (let x = 10, j = 0; x < 128; j++) {
      x += 11;
      d += ` L${x} ${y + (((j + k) * 7) % 5 - 2) * (j % 2 ? 4 : -3)}`;
    }
    return d + ` C 160 ${y}, 168 120, 190 120`;
  };
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      {rows.map((y, k) => (
        <path key={y} d={jag(y, k)} stroke={k % 3 ? ink : "var(--tint)"} strokeOpacity={k % 3 ? 1 : 0.4} strokeLinejoin="round" />
      ))}
      <line x1="190" y1="120" x2="296" y2="120" stroke="var(--tint)" strokeOpacity="0.4" />
      <path d="M190 120 H296" pathLength={100} stroke="var(--tint)" strokeWidth="2" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "3.2s" }} />
      <circle cx="190" cy="120" r="5" fill="var(--tint)" />
      <circle cx="300" cy="120" r="9" stroke="var(--tint)" strokeWidth="1.6" />
      <circle cx="300" cy="120" r="3.5" fill="var(--tint)" />
    </svg>
  );
}

/* One Pearl at the centre, the department's work orbiting it. */
function PearlArt() {
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <g className="bc-spin" style={{ transformOrigin: "160px 120px", ["--bc-dur" as string]: "70s" }}>
        <circle cx="160" cy="120" r="92" stroke={ink} strokeDasharray="2 6" />
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x="151" y="19" width="18" height="18" rx="5" fill="var(--tint)" fillOpacity="0.1" stroke="var(--tint)" strokeOpacity="0.7" transform={`rotate(${a} 160 120)`} />
        ))}
      </g>
      <g className="bc-spin-rev" style={{ transformOrigin: "160px 120px", ["--bc-dur" as string]: "45s" }}>
        <circle cx="160" cy="120" r="58" stroke={inkSoft} strokeDasharray="1 4" />
        {[40, 160, 280].map((a) => (
          <circle key={a} cx="160" cy="62" r="3" fill="var(--tint)" fillOpacity="0.8" transform={`rotate(${a} 160 120)`} />
        ))}
      </g>
      <circle cx="160" cy="120" r="30" stroke="var(--tint)" strokeOpacity="0.5" className="bc-halo" style={{ transformOrigin: "160px 120px", transformBox: "view-box", animationDuration: "4.5s" }} />
      <circle cx="160" cy="120" r="26" fill="var(--tint)" fillOpacity="0.16" stroke="var(--tint)" strokeWidth="2" />
      <circle cx="151" cy="111" r="7" fill="var(--color-ink)" fillOpacity="0.35" />
    </svg>
  );
}

/* Your existing stack on the left; the Pearl plugs in beside it. */
function IntegrateArt() {
  const ys = [44, 88, 132, 176];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      {ys.map((y, i) => {
        const d = `M140 ${y + 13} C 190 ${y + 13}, 196 120, 226 120`;
        return (
          <g key={y}>
            <rect x="36" y={y} width="104" height="26" rx="7" fill="rgb(244 242 238 / 0.03)" stroke={ink} />
            <circle cx="50" cy={y + 13} r="3" fill={ink} />
            <rect x="60" y={y + 10} width={48 - i * 6} height="6" rx="3" fill={ink} />
            <path d={d} stroke={ink} />
            <path d={d} pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round" className="bc-pulse" style={{ animationDelay: `${i * 0.8}s` }} />
          </g>
        );
      })}
      <path d="M22 36 V210" stroke={inkSoft} strokeDasharray="2 4" />
      <circle cx="252" cy="120" r="30" stroke="var(--tint)" strokeOpacity="0.5" className="bc-halo" style={{ transformOrigin: "252px 120px", transformBox: "view-box", animationDuration: "4.5s" }} />
      <circle cx="252" cy="120" r="26" fill="var(--tint)" fillOpacity="0.14" stroke="var(--tint)" strokeWidth="2" />
      <circle cx="244" cy="112" r="6" fill="var(--color-ink)" fillOpacity="0.3" />
    </svg>
  );
}

/* Radar sweep over the systems it reads; blips light as they're seen. */
function SignalsArt() {
  const blips: [number, number, number][] = [
    [112, 82, 0],
    [206, 96, 1.1],
    [188, 170, 2.2],
    [124, 158, 3.1],
  ];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      {[96, 70, 44].map((r) => (
        <circle key={r} cx="160" cy="120" r={r} stroke={ink} strokeDasharray={r === 96 ? "2 5" : undefined} />
      ))}
      <path d="M64 120 H256 M160 24 V216" stroke={inkSoft} />
      <g className="bc-spin" style={{ transformOrigin: "160px 120px", ["--bc-dur" as string]: "6s" }}>
        <path d="M160 120 L160 24 A96 96 0 0 1 228 52 Z" fill="var(--tint)" fillOpacity="0.14" />
        <line x1="160" y1="120" x2="160" y2="24" stroke="var(--tint)" strokeWidth="1.5" />
      </g>
      {blips.map(([x, y, dl]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="6" stroke="var(--tint)" className="bc-halo" style={{ transformOrigin: `${x}px ${y}px`, transformBox: "view-box", animationDelay: `${dl}s`, animationDuration: "4.4s" }} />
          <circle cx={x} cy={y} r="3" fill="var(--tint)" />
        </g>
      ))}
      <circle cx="160" cy="120" r="4" fill="var(--tint)" />
    </svg>
  );
}

/* A signal crosses the threshold; that crossing becomes an action. */
function TriggerArt() {
  const wave = "M10 150 C 34 150, 40 128, 60 132 S 88 160, 108 146 S 132 104, 150 118 S 170 140, 186 112 S 206 52, 222 70 S 240 130, 262 140 S 290 128, 310 132";
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <line x1="10" y1="92" x2="310" y2="92" stroke="var(--tint)" strokeOpacity="0.45" strokeDasharray="4 5" />
      <path d={wave} stroke={ink} strokeWidth="1.5" />
      <path d={wave} pathLength={100} stroke="var(--tint)" strokeWidth="2" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "4.4s" }} />
      <circle cx="206" cy="80" r="7" stroke="var(--tint)" className="bc-halo" style={{ transformOrigin: "206px 80px", transformBox: "view-box" }} />
      <circle cx="206" cy="80" r="4" fill="var(--tint)" />
      <path d="M206 80 C 206 50, 230 38, 252 38" stroke="var(--tint)" strokeOpacity="0.7" strokeDasharray="2 3" />
      <rect x="252" y="22" width="40" height="32" rx="9" fill="var(--tint)" fillOpacity="0.14" stroke="var(--tint)" strokeWidth="1.6" />
      <path d="M275 28 L265 40 H273 L269 49 L281 35 H273 Z" fill="var(--tint)" />
      <path d="M10 214 H310" stroke={inkSoft} />
    </svg>
  );
}

/* The first questions leaders ask, and the answer being typed. */
function QuestionsArt() {
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <path d="M40 44 H188 a14 14 0 0 1 14 14 V116 a14 14 0 0 1 -14 14 H86 L62 150 V130 H40 a14 14 0 0 1 -14 -14 V58 a14 14 0 0 1 14 -14 Z" fill="rgb(244 242 238 / 0.03)" stroke={ink} strokeLinejoin="round" />
      {[66, 84, 102].map((y, i) => (
        <rect key={y} x="46" y={y} width={[128, 104, 72][i]} height="6" rx="3" fill={ink} />
      ))}
      <path d="M142 118 H276 a14 14 0 0 1 14 14 V178 a14 14 0 0 1 -14 14 H262 V212 L238 192 H142 a14 14 0 0 1 -14 -14 V132 a14 14 0 0 1 14 -14 Z" fill="var(--tint)" fillOpacity="0.12" stroke="var(--tint)" strokeWidth="1.6" strokeLinejoin="round" />
      {[186, 210, 234].map((x, i) => (
        <circle key={x} cx={x} cy="155" r="6" fill="var(--tint)" className="bc-breathe" style={{ transformOrigin: `${x}px 155px`, transformBox: "view-box", animationDelay: `${i * 0.25}s`, animationDuration: "1.6s" }} />
      ))}
    </svg>
  );
}

/* Step by step: done, in progress, next. */
function TimelineArt() {
  const xs = [44, 124, 204, 284];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <line x1="44" y1="132" x2="284" y2="132" stroke={ink} strokeDasharray="3 5" />
      <line x1="44" y1="132" x2="204" y2="132" stroke="var(--tint)" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M44 132 H204" pathLength={100} stroke="var(--tint)" strokeWidth="2.5" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "3.6s" }} />
      {xs.map((x, i) => {
        const up = i % 2 === 0;
        const y = up ? 58 : 164;
        return (
          <g key={x}>
            <line x1={x} y1={up ? 98 : 132} x2={x} y2={up ? 132 : 164} stroke={i < 3 ? "var(--tint)" : ink} strokeOpacity={i < 3 ? 0.5 : 1} />
            <rect x={x - 30} y={y} width="60" height="38" rx="9" fill={i < 3 ? "var(--tint)" : "transparent"} fillOpacity={i < 2 ? 0.1 : 0.05} stroke={i < 3 ? "var(--tint)" : ink} strokeOpacity={i < 3 ? 0.6 : 1} strokeDasharray={i === 3 ? "3 4" : undefined} />
            <rect x={x - 20} y={y + 12} width="40" height="5" rx="2.5" fill={i < 3 ? "var(--tint)" : ink} fillOpacity={i < 3 ? 0.6 : 1} />
            <rect x={x - 20} y={y + 22} width="26" height="5" rx="2.5" fill={ink} />
            {i === 2 && <circle cx={x} cy="132" r="9" stroke="var(--tint)" className="bc-halo" style={{ transformOrigin: `${x}px 132px`, transformBox: "view-box" }} />}
            <circle cx={x} cy="132" r="5" fill={i < 3 ? "var(--tint)" : "var(--color-ground-2)"} stroke={i < 3 ? "none" : ink} />
          </g>
        );
      })}
    </svg>
  );
}

/* Hash-chained evidence blocks ending in a verified seal. */
function AuditArt() {
  const xs = [22, 92, 162];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <path d="M66 120 H232" stroke={ink} />
      <path d="M66 120 H232" pathLength={100} stroke="var(--tint)" strokeWidth="1.6" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "3.8s" }} />
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x} y="96" width="46" height="48" rx="10" fill="var(--tint)" fillOpacity={0.05 + i * 0.04} stroke="var(--tint)" strokeOpacity={0.35 + i * 0.2} />
          <rect x={x + 10} y="108" width="26" height="5" rx="2.5" fill={ink} />
          <rect x={x + 10} y="118" width="18" height="5" rx="2.5" fill={ink} />
          <rect x={x + 10} y="128" width="22" height="5" rx="2.5" fill="var(--tint)" fillOpacity="0.55" />
          {i < 2 && (
            <g stroke="var(--tint)" strokeOpacity="0.7" strokeWidth="1.4">
              <rect x={x + 49} y="115" width="12" height="10" rx="5" />
              <rect x={x + 57} y="115" width="12" height="10" rx="5" />
            </g>
          )}
        </g>
      ))}
      <circle cx="262" cy="120" r="36" stroke="var(--tint)" strokeOpacity="0.4" className="bc-halo" style={{ transformOrigin: "262px 120px", transformBox: "view-box", animationDuration: "4.6s" }} />
      <circle cx="262" cy="120" r="30" fill="var(--tint)" fillOpacity="0.12" stroke="var(--tint)" strokeWidth="2" />
      <circle cx="262" cy="120" r="22" stroke="var(--tint)" strokeOpacity="0.45" strokeDasharray="2 3" />
      <path d="M251 121 L259 129 L274 112" stroke="var(--tint)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The documentation pack: a signed page under seal. */
function DocumentArt() {
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <rect x="120" y="30" width="124" height="164" rx="10" stroke={inkSoft} transform="rotate(6 182 112)" />
      <path d="M96 34 H192 L220 62 V206 a10 10 0 0 1 -10 10 H96 a10 10 0 0 1 -10 -10 V44 a10 10 0 0 1 10 -10 Z" fill="rgb(244 242 238 / 0.03)" stroke={ink} strokeLinejoin="round" />
      <path d="M192 34 V52 a10 10 0 0 0 10 10 H220" stroke={ink} />
      <rect x="104" y="56" width="60" height="7" rx="3.5" fill="var(--tint)" fillOpacity="0.7" />
      {[80, 94, 108, 122, 136].map((y, i) => (
        <rect key={y} x="104" y={y} width={[96, 84, 98, 70, 88][i]} height="5" rx="2.5" fill={ink} />
      ))}
      <path d="M104 172 C 116 160, 124 180, 136 168 S 150 170, 158 164" stroke="var(--tint)" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <g className="bc-breathe" style={{ transformOrigin: "222px 188px", transformBox: "view-box", animationDuration: "5s" }}>
        <circle cx="222" cy="188" r="26" fill="var(--tint)" fillOpacity="0.14" stroke="var(--tint)" strokeWidth="2" />
        <circle cx="222" cy="188" r="19" stroke="var(--tint)" strokeOpacity="0.5" strokeDasharray="2 3" />
        <path d="M212 189 L219 196 L233 180" stroke="var(--tint)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* A founding team network with one seat open. */
function TeamArt() {
  const pts: [number, number][] = [
    [160, 44],
    [248, 102],
    [214, 196],
    [106, 196],
    [72, 102],
  ];
  const person = (x: number, y: number, c: string) => (
    <g stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <circle cx={x} cy={y - 4} r="4" />
      <path d={`M${x - 8} ${y + 10} a8 7 0 0 1 16 0`} />
    </g>
  );
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      {pts.map(([x, y], i) =>
        pts.slice(i + 1).map(([x2, y2]) => <line key={`${i}-${x2}`} x1={x} y1={y} x2={x2} y2={y2} stroke={inkSoft} />),
      )}
      <path d="M160 44 L248 102 L214 196" pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "4.4s" }} />
      {pts.map(([x, y], i) =>
        i === 2 ? (
          <g key={i}>
            <circle cx={x} cy={y} r="24" stroke="var(--tint)" strokeOpacity="0.5" className="bc-halo" style={{ transformOrigin: `${x}px ${y}px`, transformBox: "view-box", animationDuration: "4.4s" }} />
            <circle cx={x} cy={y} r="20" fill="var(--tint)" fillOpacity="0.08" stroke="var(--tint)" strokeDasharray="3 3" />
            <path d={`M${x - 7} ${y} H${x + 7} M${x} ${y - 7} V${y + 7}`} stroke="var(--tint)" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          <g key={i}>
            <circle cx={x} cy={y} r="20" fill="var(--tint)" fillOpacity="0.1" stroke="var(--tint)" strokeOpacity="0.6" />
            {person(x, y, "var(--tint)")}
          </g>
        ),
      )}
    </svg>
  );
}

/* Leave with everything: the whole corpus moves from host to host. */
function PortabilityArt() {
  const box = (x: number, c: string, o: number) => (
    <g>
      <rect x={x} y="118" width="84" height="64" rx="12" fill={c} fillOpacity={o} stroke={c === "transparent" ? ink : c} strokeOpacity={c === "transparent" ? 1 : 0.7} />
      {[134, 146, 158].map((y) => (
        <rect key={y} x={x + 14} y={y} width="56" height="5" rx="2.5" fill={c === "transparent" ? ink : c} fillOpacity={c === "transparent" ? 1 : 0.4} />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      {box(22, "transparent", 0)}
      {box(214, "var(--tint)", 0.1)}
      <path d="M64 114 C 90 34, 230 34, 256 114" stroke={ink} strokeDasharray="3 5" />
      <path d="M64 114 C 90 34, 230 34, 256 114" pathLength={100} stroke="var(--tint)" strokeWidth="2" strokeLinecap="round" className="bc-pulse" style={{ animationDuration: "3.6s" }} />
      <path d="M248 104 L256 115 L264 103" stroke="var(--tint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <g className="bc-float" style={{ animationDuration: "5s" }}>
        <path d="M160 40 L182 52 V76 L160 88 L138 76 V52 Z" fill="var(--tint)" fillOpacity="0.14" stroke="var(--tint)" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M138 52 L160 64 L182 52 M160 64 V88" stroke="var(--tint)" strokeOpacity="0.6" strokeWidth="1.4" />
      </g>
      <path d="M10 200 H310" stroke={inkSoft} />
    </svg>
  );
}

/* Four pillars on one foundation. */
function PillarsArt() {
  const xs = [70, 124, 178, 232];
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <path d="M52 64 L160 26 L268 64 Z" fill="var(--tint)" fillOpacity="0.1" stroke="var(--tint)" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="52" y="64" width="216" height="10" rx="2" stroke="var(--tint)" strokeOpacity="0.6" />
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x - 3} y="78" width="24" height="8" rx="2" stroke={ink} />
          <rect x={x} y="86" width="18" height="106" stroke="var(--tint)" strokeOpacity={0.45 + i * 0.12} fill="var(--tint)" fillOpacity={0.04 + i * 0.02} />
          <path d={`M${x + 9} 192 V86`} pathLength={100} stroke="var(--tint)" strokeWidth="1.6" strokeLinecap="round" className="bc-pulse" style={{ animationDelay: `${i * 0.6}s`, animationDuration: "3.6s" }} />
          <rect x={x - 3} y="192" width="24" height="8" rx="2" stroke={ink} />
        </g>
      ))}
      <rect x="40" y="200" width="240" height="12" rx="3" fill="rgb(244 242 238 / 0.04)" stroke={ink} />
      <rect x="28" y="212" width="264" height="10" rx="3" stroke={inkSoft} />
    </svg>
  );
}

/* Protection that rises out of the substrate itself. */
function SubstrateArt() {
  const slab = "M160 150 L276 190 L160 230 L44 190 Z";
  return (
    <svg viewBox="0 0 320 240" fill="none" className="h-auto w-full overflow-visible">
      <path d={slab} fill="var(--tint)" fillOpacity="0.07" stroke="var(--tint)" strokeOpacity="0.55" strokeLinejoin="round" />
      {[1, 2, 3].map((k) => (
        <g key={k} stroke={inkSoft}>
          <path d={`M${44 + k * 29} ${190 - k * 10} L${160 + k * 29} ${230 - k * 10}`} />
          <path d={`M${276 - k * 29} ${190 - k * 10} L${160 - k * 29} ${230 - k * 10}`} />
        </g>
      ))}
      {([
        [110, 176],
        [210, 176],
        [160, 206],
      ] as [number, number][]).map(([x, y], i) => (
        <g key={x + y}>
          <path d={`M${x} ${y} L160 ${i === 2 ? 142 : 124}`} stroke={ink} strokeDasharray="2 3" />
          <path d={`M${x} ${y} L160 ${i === 2 ? 142 : 124}`} pathLength={100} stroke="var(--tint)" strokeWidth="1.5" strokeLinecap="round" className="bc-pulse" style={{ animationDelay: `${i}s` }} />
          <circle cx={x} cy={y} r="3" fill="var(--tint)" />
        </g>
      ))}
      <g className="bc-float" style={{ animationDuration: "6s" }}>
        <path d="M160 22 L204 38 V78 C204 108 186 126 160 138 C134 126 116 108 116 78 V38 Z" fill="var(--tint)" fillOpacity="0.12" stroke="var(--tint)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M146 80 L156 90 L176 68" stroke="var(--tint)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const ART: Record<SectionArtKind, FC> = {
  encryption: EncryptionArt,
  identity: IdentityArt,
  axes: AxesArt,
  tiers: TiersArt,
  classifier: ClassifierArt,
  custodians: CustodiansArt,
  layers: LayersArt,
  noise: NoiseArt,
  pearl: PearlArt,
  integrate: IntegrateArt,
  signals: SignalsArt,
  trigger: TriggerArt,
  questions: QuestionsArt,
  timeline: TimelineArt,
  audit: AuditArt,
  document: DocumentArt,
  team: TeamArt,
  portability: PortabilityArt,
  pillars: PillarsArt,
  substrate: SubstrateArt,
};
