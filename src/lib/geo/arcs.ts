/**
 * Three.js geometry helpers for the Trade Globe.
 * Only imported by the WebGL scene (client-only chunk).
 */
import { QuadraticBezierCurve3, Vector3 } from "three";
import { CITIES, type CityId } from "./cities";

export const GLOBE_RADIUS = 1;

/**
 * Converts geographic coordinates into a point on a sphere.
 * Uses the conventional Three.js mapping where +Y is north and lon 0 sits at -X.
 */
export function latLonToVector3(lat: number, lon: number, radius = GLOBE_RADIUS): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function cityVector(id: CityId, radius = GLOBE_RADIUS): Vector3 {
  const c = CITIES[id];
  return latLonToVector3(c.lat, c.lon, radius);
}

/**
 * Builds a great-circle-ish arc between two surface points, lifted above the globe.
 * The apex height scales with chord length so short hops stay flat and long hauls soar.
 */
export function buildArc(from: Vector3, to: Vector3, lift = 0.35): QuadraticBezierCurve3 {
  const chord = from.distanceTo(to);
  const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_RADIUS + chord * lift);
  return new QuadraticBezierCurve3(from.clone(), mid, to.clone());
}

/**
 * Euler rotation that orients the point (lat, lon) toward the camera (+Z).
 * Order XYZ: yaw about Y first, then tilt about X so northern latitudes face down toward the viewer.
 */
export function orientationForFocus(lat: number, lon: number): [number, number, number] {
  const v = latLonToVector3(lat, lon);
  const yaw = -Math.atan2(v.x, v.z);
  const tilt = lat * (Math.PI / 180);
  return [tilt, yaw, 0];
}

/** Evenly distributed points on a sphere (Fibonacci lattice). */
export function fibonacciSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
}

/** Latitude / longitude graticule as line-segment pairs. */
export function graticulePositions(radius: number, stepDeg = 15, resolution = 96): Float32Array {
  const segments: number[] = [];
  const push = (a: Vector3, b: Vector3) => segments.push(a.x, a.y, a.z, b.x, b.y, b.z);

  for (let lat = -90 + stepDeg; lat < 90; lat += stepDeg) {
    let prev = latLonToVector3(lat, -180, radius);
    for (let i = 1; i <= resolution; i++) {
      const lon = -180 + (360 * i) / resolution;
      const next = latLonToVector3(lat, lon, radius);
      push(prev, next);
      prev = next;
    }
  }
  for (let lon = -180; lon < 180; lon += stepDeg) {
    let prev = latLonToVector3(-90, lon, radius);
    for (let i = 1; i <= resolution / 2; i++) {
      const lat = -90 + (180 * i) / (resolution / 2);
      const next = latLonToVector3(lat, lon, radius);
      push(prev, next);
      prev = next;
    }
  }
  return new Float32Array(segments);
}
