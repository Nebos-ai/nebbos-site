import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * SecurityArt · line illustrations for the security text-block cards.
 * Hairline strokes in the section tint, ambient self-running motion only
 * (no pointer tracking), no <text> so page copy stays untouched.
 */

export type SecurityArtKind = "encryption" | "identity";

export function SecurityArt({ kind, className }: { kind: SecurityArtKind; className?: string }) {
  const Art = kind === "encryption" ? EncryptionArt : IdentityArt;
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
