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
  | "layers";

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

const ART: Record<SectionArtKind, FC> = {
  encryption: EncryptionArt,
  identity: IdentityArt,
  axes: AxesArt,
  tiers: TiersArt,
  classifier: ClassifierArt,
  custodians: CustodiansArt,
  layers: LayersArt,
};
