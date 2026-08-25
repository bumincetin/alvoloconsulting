/**
 * Near-plane cut-outs — inline SVG silhouettes in the Italian / Turkish register
 * (cypress, olive, balustrade, Milanese street lamp, minaret, caique, hills).
 * All geometry is procedural and deterministic (seeded), so the page ships no
 * bitmap plates and every piece scales crisply.
 */
"use client";

import { useId } from "react";

const INK = "#060809";
const INK_SOFT = "#0b1013";
const RIM = "rgba(223,231,224,0.10)";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Flame-shaped Mediterranean cypress; jagged edges from seeded noise. */
export function Cypress({ seed = 1, className }: { seed?: number; className?: string }) {
  const rnd = mulberry32(seed);
  const H = 400;
  const W = 96;
  const cx = W / 2;
  const left: string[] = [];
  const right: string[] = [];
  const steps = 42;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // 0 top → 1 base
    const env = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.62)), 0.85) * 0.92;
    const jag = (rnd() - 0.5) * 0.28 * (0.3 + t);
    const w = Math.max(0.02, env + jag) * (W / 2 - 6);
    const y = 8 + t * (H - 60);
    left.push(`${(cx - w).toFixed(1)},${y.toFixed(1)}`);
    right.unshift(`${(cx + w).toFixed(1)},${y.toFixed(1)}`);
  }
  const outline = `${cx},4 ${left.join(" ")} ${cx - 4},${H - 52} ${cx - 4},${H} ${cx + 4},${H} ${cx + 4},${H - 52} ${right.join(" ")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`cy-${seed}`} x1="0" x2="1">
          <stop offset="0" stopColor={INK} />
          <stop offset="0.55" stopColor={INK_SOFT} />
          <stop offset="1" stopColor="#111a15" />
        </linearGradient>
      </defs>
      <polygon points={outline} fill={`url(#cy-${seed})`} />
      <polygon points={outline} fill="none" stroke={RIM} strokeWidth="0.8" />
    </svg>
  );
}

/** A stand of cypresses at differing heights. */
export function CypressGroup({ seed = 7, count = 4, className }: { seed?: number; count?: number; className?: string }) {
  const rnd = mulberry32(seed);
  const items = Array.from({ length: count }, (_, i) => ({
    x: i * (100 / count) + rnd() * 10,
    h: 0.62 + rnd() * 0.38,
    seed: seed * 10 + i,
  }));
  return (
    <svg viewBox="0 0 520 420" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      {items.map((it, i) => (
        <g key={i} transform={`translate(${(it.x / 100) * 440} ${420 - it.h * 420}) scale(${0.28 + it.h * 0.72})`}>
          <CypressPath seed={it.seed} />
        </g>
      ))}
    </svg>
  );
}

function CypressPath({ seed }: { seed: number }) {
  const rnd = mulberry32(seed);
  const H = 420;
  const W = 110;
  const cx = W / 2;
  const left: string[] = [];
  const right: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const env = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.62)), 0.85) * 0.92;
    const jag = (rnd() - 0.5) * 0.3 * (0.3 + t);
    const w = Math.max(0.02, env + jag) * (W / 2 - 6);
    const y = t * (H - 40);
    left.push(`${(cx - w).toFixed(1)},${y.toFixed(1)}`);
    right.unshift(`${(cx + w).toFixed(1)},${y.toFixed(1)}`);
  }
  const outline = `${cx},0 ${left.join(" ")} ${cx - 3},${H - 36} ${cx - 3},${H} ${cx + 3},${H} ${cx + 3},${H - 36} ${right.join(" ")}`;
  return (
    <>
      <polygon points={outline} fill={INK} />
      <polygon points={outline} fill="none" stroke={RIM} strokeWidth="1" />
    </>
  );
}

/** Olive branch with pointed leaves and a few fruits — sways when placed with `fg-el--sway`. */
export function OliveBranch({ seed = 3, flip = false, className }: { seed?: number; flip?: boolean; className?: string }) {
  const rnd = mulberry32(seed);
  const leaves: { x: number; y: number; a: number; s: number }[] = [];
  const fruits: { x: number; y: number }[] = [];
  const segs: string[] = [];
  // main bough from lower-left to upper-right
  let x = 20;
  let y = 330;
  let a = -0.35;
  segs.push(`M${x} ${y}`);
  for (let i = 0; i < 16; i++) {
    a += (rnd() - 0.5) * 0.35;
    const len = 36 + rnd() * 14;
    x += Math.cos(a) * len;
    y += Math.sin(a) * len;
    segs.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
    for (let k = 0; k < 4; k++) {
      leaves.push({ x: x + (rnd() - 0.5) * 26, y: y + (rnd() - 0.5) * 26, a: a + (rnd() - 0.5) * 2.4 + (k % 2 ? 1.2 : -1.2), s: 0.7 + rnd() * 0.6 });
    }
    if (rnd() > 0.72) fruits.push({ x: x + (rnd() - 0.5) * 18, y: y + (rnd() - 0.5) * 18 });
  }
  // side twigs
  const twigs: string[] = [];
  for (let i = 0; i < 6; i++) {
    const t = 0.15 + rnd() * 0.7;
    const bx = 20 + t * (x - 20);
    const by = 330 + t * (y - 330);
    const ta = a - 1.1 + rnd() * 2.2;
    const tx = bx + Math.cos(ta) * 90;
    const ty = by + Math.sin(ta) * 90;
    twigs.push(`M${bx.toFixed(1)} ${by.toFixed(1)} Q${((bx + tx) / 2 + 12).toFixed(1)} ${((by + ty) / 2 - 12).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`);
    for (let k = 0; k < 7; k++) {
      const u = 0.2 + (k / 7) * 0.8;
      leaves.push({ x: bx + (tx - bx) * u + (rnd() - 0.5) * 10, y: by + (ty - by) * u + (rnd() - 0.5) * 10, a: ta + (k % 2 ? 1 : -1) + (rnd() - 0.5), s: 0.6 + rnd() * 0.5 });
    }
  }
  return (
    <svg viewBox="0 0 720 420" className={className} aria-hidden="true" preserveAspectRatio="xMinYMax meet" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <defs>
        <linearGradient id={`ol-${seed}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0a100d" />
          <stop offset="1" stopColor="#1a2620" />
        </linearGradient>
      </defs>
      <path d={segs.join(" ")} fill="none" stroke="#0b0e0c" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d={segs.join(" ")} fill="none" stroke="#2a2118" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {twigs.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#0b0e0c" strokeWidth="4" strokeLinecap="round" />
      ))}
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx={26 * l.s}
          ry={7.5 * l.s}
          transform={`rotate(${(l.a * 180) / Math.PI} ${l.x} ${l.y})`}
          fill={`url(#ol-${seed})`}
          stroke={RIM}
          strokeWidth="0.6"
        />
      ))}
      {fruits.map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r="6.5" fill="#101a14" stroke="#2f3a2b" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

/** Stone balustrade — Italian terrace railing with vase-shaped balusters. */
export function Balustrade({ count = 9, className }: { count?: number; className?: string }) {
  const uid = useId();
  const W = 900;
  const H = 260;
  const gap = W / (count + 1);
  const baluster = "M-16 0 C-16 -18 -6 -22 -6 -40 C-6 -56 -18 -60 -18 -78 C-18 -96 -10 -104 0 -104 C10 -104 18 -96 18 -78 C18 -60 6 -56 6 -40 C6 -22 16 -18 16 0 Z";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`bal-g-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#15191b" />
          <stop offset="1" stopColor={INK} />
        </linearGradient>
      </defs>
      {/* base */}
      <rect x="0" y={H - 56} width={W} height="56" fill={INK} />
      <rect x="0" y={H - 62} width={W} height="8" fill="#13181a" />
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`translate(${gap * (i + 1)} ${H - 62})`}>
          <path d={baluster} fill={`url(#bal-g-${uid})`} stroke={RIM} strokeWidth="0.8" />
          <rect x="-22" y="-112" width="44" height="8" fill="#13181a" />
        </g>
      ))}
      {/* handrail */}
      <rect x="0" y={H - 62 - 128} width={W} height="18" rx="2" fill="#171c1e" stroke={RIM} strokeWidth="0.8" />
      <rect x="0" y={H - 62 - 110} width={W} height="6" fill={INK} />
    </svg>
  );
}

/** Reeds along the strait — thin blades in a low bank. */
export function Reeds({ seed = 11, className }: { seed?: number; className?: string }) {
  const rnd = mulberry32(seed);
  const blades = Array.from({ length: 70 }, () => {
    const x = rnd() * 900;
    const h = 120 + rnd() * 250;
    const bend = (rnd() - 0.5) * 120;
    return `M${x.toFixed(1)} 420 Q${(x + bend * 0.4).toFixed(1)} ${(420 - h * 0.55).toFixed(1)} ${(x + bend).toFixed(1)} ${(420 - h).toFixed(1)}`;
  });
  return (
    <svg viewBox="0 0 900 420" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <path d="M0 420 L0 372 Q220 348 450 366 Q690 384 900 356 L900 420 Z" fill={INK} />
      {blades.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i % 3 ? INK : "#121a16"} strokeWidth={1.4 + (i % 4) * 0.6} strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** Milanese cast-iron street lamp, lit. */
export function StreetLamp({ className, lit = true }: { className?: string; lit?: boolean }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 220 640" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <radialGradient id={`lamp-glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(255,196,120,0.75)" />
          <stop offset="0.45" stopColor="rgba(255,150,70,0.22)" />
          <stop offset="1" stopColor="rgba(255,120,40,0)" />
        </radialGradient>
        <linearGradient id={`lamp-glass-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffe6b8" />
          <stop offset="1" stopColor="#ffb063" />
        </linearGradient>
      </defs>
      {lit ? <circle cx="110" cy="112" r="150" fill={`url(#lamp-glow-${uid})`} /> : null}
      {/* post */}
      <rect x="102" y="150" width="16" height="490" fill={INK} />
      <rect x="86" y="600" width="48" height="40" rx="3" fill={INK} />
      <rect x="92" y="150" width="36" height="14" rx="2" fill={INK} />
      <path d="M110 150 C110 128 88 128 88 108 L132 108 C132 128 110 128 110 150 Z" fill={INK} />
      {/* lantern */}
      <path d="M72 108 L148 108 L138 40 L82 40 Z" fill={INK} />
      <path d="M86 100 L134 100 L126 50 L94 50 Z" fill={lit ? `url(#lamp-glass-${uid})` : "#1a1d1f"} opacity={lit ? 0.95 : 1} />
      <path d="M82 40 L138 40 L110 18 Z" fill={INK} />
      <circle cx="110" cy="14" r="5" fill={INK} />
      {/* ornament */}
      <path d="M118 170 C150 160 160 190 138 196" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/** Ottoman minaret with two şerefe balconies. */
export function Minaret({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 720" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <path d="M62 720 L62 150 L98 150 L98 720 Z" fill={INK} />
      <path d="M80 30 L58 150 L102 150 Z" fill={INK} />
      <circle cx="80" cy="26" r="5" fill={INK} />
      <path d="M80 6 L80 22" stroke={INK} strokeWidth="3" />
      {[300, 440].map((y) => (
        <g key={y}>
          <path d={`M40 ${y} L120 ${y} L112 ${y + 18} L48 ${y + 18} Z`} fill={INK} />
          <rect x="44" y={y - 26} width="72" height="26" fill="none" stroke={INK} strokeWidth="5" />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={50 + i * 11} y={y - 24} width="3" height="22" fill={INK} />
          ))}
        </g>
      ))}
      <path d="M62 150 L98 150 L98 130 L62 130 Z" fill={INK} stroke={RIM} strokeWidth="0.8" />
    </svg>
  );
}

/** Mosque silhouette — central dome, half domes, four minarets. */
export function DomeSilhouette({ className }: { className?: string }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 900 380" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`dome-g-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#111619" />
          <stop offset="1" stopColor={INK} />
        </linearGradient>
      </defs>
      {/* minarets */}
      {[120, 250, 650, 780].map((x, i) => (
        <g key={i} transform={`translate(${x} 0)`}>
          <rect x="-9" y="90" width="18" height="290" fill={INK} />
          <path d="M0 34 L-11 92 L11 92 Z" fill={INK} />
          <rect x="-16" y="190" width="32" height="8" fill={INK} />
          <rect x="-16" y="250" width="32" height="8" fill={INK} />
        </g>
      ))}
      {/* base */}
      <rect x="230" y="300" width="440" height="80" fill={INK} />
      {/* half domes */}
      <path d="M270 300 A70 70 0 0 1 410 300 Z" fill={`url(#dome-g-${uid})`} />
      <path d="M490 300 A70 70 0 0 1 630 300 Z" fill={`url(#dome-g-${uid})`} />
      <path d="M330 260 A60 60 0 0 1 450 260 L450 300 L330 300 Z" fill={INK} />
      <path d="M450 260 A60 60 0 0 1 570 260 L570 300 L450 300 Z" fill={INK} />
      {/* drum + main dome */}
      <rect x="360" y="212" width="180" height="60" fill={INK} />
      <path d="M340 216 A110 110 0 0 1 560 216 Z" fill={`url(#dome-g-${uid})`} stroke={RIM} strokeWidth="1" />
      <path d="M450 86 L450 106" stroke={INK} strokeWidth="4" />
      <circle cx="450" cy="100" r="6" fill={INK} />
      {/* lit windows on the drum */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={372 + i * 19} y="224" width="7" height="18" rx="3" fill="rgba(255,196,120,0.55)" />
      ))}
    </svg>
  );
}

/** Bosphorus caique — a small wooden boat with a lamp. */
export function Caique({ className }: { className?: string }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 520 220" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <radialGradient id={`caique-glow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(255,190,110,0.6)" />
          <stop offset="1" stopColor="rgba(255,150,70,0)" />
        </radialGradient>
      </defs>
      <circle cx="330" cy="86" r="70" fill={`url(#caique-glow-${uid})`} />
      <path d="M30 150 C120 140 380 140 500 128 L470 190 C360 206 160 206 60 190 Z" fill={INK} />
      <path d="M30 150 C120 140 380 140 500 128" fill="none" stroke={RIM} strokeWidth="1" />
      <rect x="150" y="96" width="120" height="54" rx="6" fill={INK} />
      <rect x="326" y="70" width="8" height="80" fill={INK} />
      <rect x="318" y="74" width="24" height="22" rx="3" fill="rgba(255,196,120,0.85)" />
      <path d="M322 78 L338 78 M322 86 L338 86" stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

/** Rolling hills closing the horizon — the Italian shore behind the Duomo. */
export function Hills({ className }: { className?: string }) {
  const uid = useId();
  return (
    <svg viewBox="0 0 1600 420" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id={`hill-g-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0d1215" />
          <stop offset="1" stopColor={INK} />
        </linearGradient>
      </defs>
      <path d="M0 420 L0 250 C160 200 300 230 460 190 C640 150 760 210 900 180 C1080 150 1220 210 1400 170 C1480 150 1560 170 1600 160 L1600 420 Z" fill={`url(#hill-g-${uid})`} />
      <path d="M0 420 L0 320 C220 290 380 340 560 300 C760 260 900 330 1100 290 C1300 250 1460 310 1600 280 L1600 420 Z" fill={INK} />
    </svg>
  );
}

/** Gothic spires of the Duomo, as a far silhouette. */
export function DuomoSilhouette({ className }: { className?: string }) {
  const rnd = mulberry32(21);
  const spires = Array.from({ length: 26 }, (_, i) => ({ x: 60 + i * 30 + rnd() * 6, h: 90 + rnd() * 90 }));
  return (
    <svg viewBox="0 0 900 380" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <rect x="40" y="250" width="820" height="130" fill={INK} />
      <path d="M40 250 L450 190 L860 250 Z" fill={INK} />
      {spires.map((s, i) => (
        <g key={i}>
          <path d={`M${s.x - 7} 262 L${s.x} ${262 - s.h} L${s.x + 7} 262 Z`} fill={INK} />
          <circle cx={s.x} cy={262 - s.h - 4} r="2.2" fill="#c9a24a" opacity="0.7" />
        </g>
      ))}
      <path d="M430 262 L450 40 L470 262 Z" fill={INK} />
      <circle cx="450" cy="34" r="5" fill="#e3c26a" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={140 + i * 90} y="290" width="14" height="36" rx="7" fill="rgba(255,196,120,0.35)" />
      ))}
    </svg>
  );
}
