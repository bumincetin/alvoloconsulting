/**
 * Geographic + jurisdictional registry for the corridor nodes.
 * Deliberately free of any Three.js import so it can be consumed by
 * server components, content modules and the WebGL scene alike.
 */
export type CityId = "milan" | "rome" | "istanbul";

export type AccentKey = "azure" | "emerald" | "gold";

/** The three accents of the "Due Sponde" system: vermilion (Italy), gold (Türkiye), bone (neutral). */
export const ACCENT_HEX: Record<AccentKey, string> = {
  azure: "#1f5fa8",
  emerald: "#178f9a",
  gold: "#b8902e",
};

export interface City {
  id: CityId;
  /** Display code used in the HUD (IATA-style) */
  code: string;
  lat: number;
  lon: number;
  /** IANA timezone used for the live clocks */
  tz: string;
  accent: AccentKey;
}

export const CITIES: Record<CityId, City> = {
  milan: { id: "milan", code: "MIL", lat: 45.4642, lon: 9.19, tz: "Europe/Rome", accent: "azure" },
  rome: { id: "rome", code: "ROM", lat: 41.9028, lon: 12.4964, tz: "Europe/Rome", accent: "gold" },
  istanbul: { id: "istanbul", code: "IST", lat: 41.0082, lon: 28.9784, tz: "Europe/Istanbul", accent: "emerald" },
};

export const CITY_ORDER: CityId[] = ["milan", "rome", "istanbul"];

export type CorridorDirection = "inbound" | "outbound";

export interface CorridorArc {
  id: string;
  from: CityId;
  to: CityId;
  direction: CorridorDirection;
  /** Gradient endpoints along the arc */
  colors: [string, string];
  /** How high the arc apex rises relative to chord length (0..1) */
  lift: number;
  /** Pulse traversal speed (full arc per second) */
  speed: number;
}

export const CORRIDOR_ARCS: CorridorArc[] = [
  {
    id: "ist-mil",
    from: "istanbul",
    to: "milan",
    direction: "inbound",
    colors: [ACCENT_HEX.emerald, ACCENT_HEX.azure],
    lift: 0.32,
    speed: 0.16,
  },
  {
    id: "mil-ist",
    from: "milan",
    to: "istanbul",
    direction: "outbound",
    colors: [ACCENT_HEX.azure, ACCENT_HEX.emerald],
    lift: 0.52,
    speed: 0.13,
  },
  {
    id: "ist-rom",
    from: "istanbul",
    to: "rome",
    direction: "inbound",
    colors: [ACCENT_HEX.gold, ACCENT_HEX.gold],
    lift: 0.28,
    speed: 0.11,
  },
];

/** Formats a decimal coordinate as a HUD-style string, e.g. 45.46°N 9.19°E */
export function formatCoords(lat: number, lon: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${ns} ${Math.abs(lon).toFixed(2)}°${ew}`;
}
