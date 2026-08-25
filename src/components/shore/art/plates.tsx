/**
 * Illustrated plates for the corridor cards — night skylines of Milan, Istanbul
 * and Rome, authored as SVG so they scale and ship without bitmaps. Each plate
 * carries one warm light source; the CSS `.glow` overlay makes it breathe.
 */

function Stars({ seed, count = 60, w, h }: { seed: number; count?: number; w: number; h: number }) {
  let a = seed;
  const rnd = () => {
    a = (a * 16807) % 2147483647;
    return a / 2147483647;
  };
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={rnd() * w} cy={rnd() * h * 0.55} r={0.4 + rnd() * 0.9} fill="#dfe7e0" opacity={0.25 + rnd() * 0.5} />
      ))}
    </g>
  );
}

function Sky({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#101c33" />
          <stop offset="0.6" stopColor="#1d2c48" />
          <stop offset="1" stopColor="#3a4a6a" />
        </linearGradient>
        <radialGradient id={`${id}-moon`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(245,230,196,0.55)" />
          <stop offset="0.5" stopColor="rgba(245,230,196,0.12)" />
          <stop offset="1" stopColor="rgba(245,230,196,0)" />
        </radialGradient>
        <linearGradient id={`${id}-water`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1a2b44" />
          <stop offset="1" stopColor="#0f1a2c" />
        </linearGradient>
        <linearGradient id={`${id}-fog`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(15,22,38,0)" />
          <stop offset="1" stopColor="rgba(15,22,38,0.8)" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-sky)`} />
    </>
  );
}

function Moon({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 3.2} fill={`url(#${id}-moon)`} />
      <circle cx={cx} cy={cy} r={r} fill="#efe3c4" />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.2} r={r * 0.22} fill="#d9ccae" opacity="0.6" />
      <circle cx={cx + r * 0.35} cy={cy + r * 0.3} r={r * 0.16} fill="#d9ccae" opacity="0.5" />
    </g>
  );
}

function Water({ id, w, y, h, lights }: { id: string; w: number; y: number; h: number; lights: { x: number; c: string }[] }) {
  return (
    <g>
      <rect x="0" y={y} width={w} height={h} fill={`url(#${id}-water)`} />
      {lights.map((l, i) => (
        <rect key={i} x={l.x - 3} y={y} width="6" height={h * 0.7} fill={l.c} opacity="0.35" style={{ filter: "blur(3px)" }} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={`r${i}`} x="0" y={y + 6 + i * (h / 12)} width={w} height="1" fill="rgba(223,231,224,0.05)" />
      ))}
    </g>
  );
}

function Windows({ xs, y, w = 4, h = 6, color = "rgba(255,196,120,0.75)" }: { xs: number[]; y: number; w?: number; h?: number; color?: string }) {
  return (
    <g>
      {xs.map((x, i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="1" fill={color} opacity={0.5 + ((i * 7) % 5) / 10} />
      ))}
    </g>
  );
}

/** Milan — Duomo spires and the Galleria dome over the Navigli-dark water. */
export function MilanPlate({ className }: { className?: string }) {
  const w = 400;
  const h = 500;
  const id = "pl-mi";
  const spires = Array.from({ length: 22 }, (_, i) => ({ x: 70 + i * 12, hh: 40 + ((i * 37) % 60) }));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Sky id={id} w={w} h={h} />
      <Stars seed={11} w={w} h={h} />
      <Moon id={id} cx={300} cy={110} r={26} />
      {/* far hills */}
      <path d="M0 300 C80 270 160 290 240 262 C320 236 360 268 400 250 L400 340 L0 340 Z" fill="#0b1118" />
      {/* Galleria dome */}
      <path d="M120 300 A58 58 0 0 1 236 300 Z" fill="#0e1419" stroke="rgba(223,231,224,0.14)" />
      <path d="M150 300 A28 28 0 0 1 206 300 Z" fill="rgba(255,196,120,0.18)" />
      <rect x="110" y="300" width="136" height="40" fill="#0a0f14" />
      {/* Duomo */}
      <rect x="50" y="330" width="300" height="60" fill="#090d12" />
      <path d="M50 330 L200 296 L350 330 Z" fill="#0b1016" />
      {spires.map((s, i) => (
        <g key={i}>
          <path d={`M${s.x - 4} 332 L${s.x} ${332 - s.hh} L${s.x + 4} 332 Z`} fill="#0a0e13" />
          <circle cx={s.x} cy={332 - s.hh - 2} r="1.6" fill="#c9a24a" opacity="0.8" />
        </g>
      ))}
      <path d="M188 332 L200 196 L212 332 Z" fill="#0a0e13" />
      <circle cx="200" cy="192" r="4" fill="#e6c76e" />
      <Windows xs={[80, 120, 160, 240, 280, 320]} y={352} w={8} h={22} color="rgba(255,200,130,0.42)" />
      <Water id={id} w={w} y={390} h={110} lights={[{ x: 200, c: "#e6c76e" }, { x: 160, c: "#ffb469" }, { x: 240, c: "#ffb469" }]} />
      <rect width={w} height={h} fill={`url(#${id}-fog)`} />
    </svg>
  );
}

/** Istanbul — a mosque on the ridge, Galata on the left, the Bosphorus bridge lit. */
export function IstanbulPlate({ className }: { className?: string }) {
  const w = 400;
  const h = 500;
  const id = "pl-ist";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Sky id={id} w={w} h={h} />
      <Stars seed={23} w={w} h={h} />
      <Moon id={id} cx={96} cy={96} r={24} />
      <path d="M0 280 C90 250 180 270 260 240 C330 214 370 250 400 236 L400 340 L0 340 Z" fill="#0b1118" />
      {/* Galata */}
      <rect x="44" y="220" width="26" height="110" fill="#0a0f14" />
      <rect x="38" y="214" width="38" height="14" fill="#0a0f14" />
      <path d="M36 214 L57 168 L78 214 Z" fill="#0a0f14" />
      <Windows xs={[48, 56, 64]} y={228} w={3} h={5} />
      {/* mosque */}
      {[150, 190, 300, 340].map((x, i) => (
        <g key={i}>
          <rect x={x - 3} y="180" width="6" height="150" fill="#0a0f14" />
          <path d={`M${x} 156 L${x - 4} 182 L${x + 4} 182 Z`} fill="#0a0f14" />
          <rect x={x - 6} y="216" width="12" height="3" fill="#0a0f14" />
          <rect x={x - 6} y="244" width="12" height="3" fill="#0a0f14" />
        </g>
      ))}
      <rect x="180" y="300" width="130" height="40" fill="#090d12" />
      <path d="M200 300 A45 45 0 0 1 290 300 Z" fill="#0d141a" stroke="rgba(223,231,224,0.14)" />
      <path d="M186 300 A22 22 0 0 1 230 300 Z" fill="#0b1016" />
      <path d="M262 300 A22 22 0 0 1 306 300 Z" fill="#0b1016" />
      <rect x="215" y="290" width="60" height="12" fill="#0b1016" />
      <Windows xs={[220, 232, 244, 256, 268]} y={292} w={4} h={8} />
      {/* bridge */}
      <path d="M0 356 L400 356" stroke="#0e1419" strokeWidth="6" />
      <path d="M40 356 L40 316 M360 356 L360 316" stroke="#0e1419" strokeWidth="6" />
      <path d="M40 318 Q200 372 360 318" fill="none" stroke="rgba(223,231,224,0.35)" strokeWidth="1.2" />
      {Array.from({ length: 13 }, (_, i) => (
        <circle key={i} cx={40 + i * 26.6} cy="352" r="1.6" fill="#ffb469" />
      ))}
      <Water id={id} w={w} y={360} h={140} lights={[{ x: 96, c: "#efe3c4" }, { x: 120, c: "#ffb469" }, { x: 280, c: "#ffb469" }]} />
      <rect width={w} height={h} fill={`url(#${id}-fog)`} />
    </svg>
  );
}

/** Rome — St Peter's dome, umbrella pines and the Colosseum arches. */
export function RomePlate({ className }: { className?: string }) {
  const w = 400;
  const h = 500;
  const id = "pl-rm";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Sky id={id} w={w} h={h} />
      <Stars seed={41} w={w} h={h} />
      <Moon id={id} cx={210} cy={90} r={22} />
      <path d="M0 292 C100 264 190 280 260 250 C320 226 370 262 400 248 L400 340 L0 340 Z" fill="#0b1118" />
      {/* St Peter's */}
      <rect x="230" y="300" width="120" height="40" fill="#090d12" />
      <rect x="262" y="262" width="56" height="42" fill="#0b1016" />
      <path d="M254 264 A36 36 0 0 1 326 264 Z" fill="#0e141a" stroke="rgba(223,231,224,0.14)" />
      <rect x="286" y="226" width="8" height="12" fill="#0b1016" />
      <path d="M290 210 L290 226 M284 216 L296 216" stroke="#c9a24a" strokeWidth="2" />
      <Windows xs={[268, 282, 296, 310]} y={272} w={4} h={10} />
      {/* umbrella pines */}
      {[60, 110, 165].map((x, i) => (
        <g key={i}>
          <rect x={x - 2} y="264" width="4" height="70" fill="#0a0e13" />
          <path d={`M${x - 42} 270 Q${x} 220 ${x + 42} 270 Z`} fill="#0b120f" />
        </g>
      ))}
      {/* Colosseum */}
      <path d="M20 340 L20 300 Q120 280 220 300 L220 340 Z" fill="#0a0f14" />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${34 + i * 27} 338 L${34 + i * 27} 318 A9 9 0 0 1 ${52 + i * 27} 318 L${52 + i * 27} 338 Z`} fill="rgba(255,196,120,0.28)" />
      ))}
      <Water id={id} w={w} y={390} h={110} lights={[{ x: 290, c: "#c9a24a" }, { x: 120, c: "#ffb469" }]} />
      <rect width={w} height={h} fill={`url(#${id}-fog)`} />
    </svg>
  );
}

/** The floating hero preview — a letterbox Milan still. */
export function PeekPlate({ className }: { className?: string }) {
  const w = 480;
  const h = 300;
  const id = "pl-peek";
  const spires = Array.from({ length: 30 }, (_, i) => ({ x: 90 + i * 10, hh: 26 + ((i * 29) % 44) }));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Sky id={id} w={w} h={h} />
      <Stars seed={5} w={w} h={h} count={40} />
      <Moon id={id} cx={390} cy={70} r={22} />
      <rect x="60" y="214" width="360" height="86" fill="#090d12" />
      <path d="M60 214 L240 176 L420 214 Z" fill="#0b1016" />
      {spires.map((s, i) => (
        <g key={i}>
          <path d={`M${s.x - 3} 216 L${s.x} ${216 - s.hh} L${s.x + 3} 216 Z`} fill="#0a0e13" />
          <circle cx={s.x} cy={216 - s.hh - 2} r="1.3" fill="#c9a24a" opacity="0.8" />
        </g>
      ))}
      <path d="M232 216 L240 100 L248 216 Z" fill="#0a0e13" />
      <circle cx="240" cy="96" r="3.5" fill="#e6c76e" />
      <Windows xs={[100, 150, 200, 280, 330, 380]} y={236} w={8} h={20} color="rgba(255,200,130,0.4)" />
      <rect width={w} height={h} fill={`url(#${id}-fog)`} />
    </svg>
  );
}
