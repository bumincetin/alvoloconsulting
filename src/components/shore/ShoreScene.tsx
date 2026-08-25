"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { chapterState, markSceneReady, subscribeChapters } from "./chapters";

/**
 * "Due Sponde / İki Kıyı" — the live strait behind the page.
 *
 * World layout (metres, camera looks down −z):
 *   x < −4   the Italian shore: Duomo, Galleria, cypresses, lit quay lamps
 *   −4…22    the strait: shader water carrying the moon path and lamp reflections
 *   x > 22   the Turkish shore: mosque with four minarets, Galata tower, houses
 *   z ≈ −26  the bridge — the corridor — crossing the strait, lit end to end
 *   moon     pale gold, high right, with an additive halo
 *
 * The camera rides a Catmull-Rom path through one waypoint per chapter section
 * (`[data-cam]`), damped from the page's scroll progress, with a hand-held
 * pointer drift. Everything is procedural: canvas textures, low-poly primitives,
 * one instanced leaf fall (olive), embers over the lamps and the wordmark
 * standing in the water as canvas-drawn glyph planes.
 */

export type ShoreQuality = "high" | "low";

export interface ShoreSceneProps {
  quality: ShoreQuality;
  reducedMotion: boolean;
  word: string;
}

/* ───────────────────────────── helpers ───────────────────────────── */

const TAU = Math.PI * 2;
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
const damp = (cur: number, to: number, rate: number, dt: number) => lerp(cur, to, 1 - Math.exp(-rate * dt));

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

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function glowTexture(inner: string, mid: string): THREE.CanvasTexture {
  return canvasTexture(256, 256, (x, w, h) => {
    const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.42, mid);
    g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, w, h);
  });
}

function moonTexture(): THREE.CanvasTexture {
  return canvasTexture(512, 512, (x, w, h) => {
    const r = w * 0.46;
    const g = x.createRadialGradient(w / 2, h / 2, r * 0.2, w / 2, h / 2, r);
    g.addColorStop(0, "#f4eacf");
    g.addColorStop(0.82, "#e8d9b4");
    g.addColorStop(1, "#cbbd98");
    x.fillStyle = g;
    x.beginPath();
    x.arc(w / 2, h / 2, r, 0, TAU);
    x.fill();
    const rnd = mulberry32(77);
    x.globalCompositeOperation = "multiply";
    for (let i = 0; i < 34; i++) {
      const a = rnd() * TAU;
      const d = Math.sqrt(rnd()) * r * 0.82;
      const cx = w / 2 + Math.cos(a) * d;
      const cy = h / 2 + Math.sin(a) * d;
      const cr = 6 + rnd() * 34;
      const cg = x.createRadialGradient(cx, cy, 0, cx, cy, cr);
      cg.addColorStop(0, `rgba(160,150,130,${0.35 + rnd() * 0.3})`);
      cg.addColorStop(1, "rgba(160,150,130,0)");
      x.fillStyle = cg;
      x.beginPath();
      x.arc(cx, cy, cr, 0, TAU);
      x.fill();
    }
    x.globalCompositeOperation = "destination-in";
    const edge = x.createRadialGradient(w / 2, h / 2, r * 0.9, w / 2, h / 2, r);
    edge.addColorStop(0, "rgba(0,0,0,1)");
    edge.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = edge;
    x.fillRect(0, 0, w, h);
  });
}

function leafTexture(): THREE.CanvasTexture {
  return canvasTexture(128, 64, (x, w, h) => {
    x.clearRect(0, 0, w, h);
    const g = x.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, "#5c6b55");
    g.addColorStop(0.5, "#8a9a80");
    g.addColorStop(1, "#4f5b49");
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(6, h / 2);
    x.quadraticCurveTo(w / 2, 2, w - 6, h / 2);
    x.quadraticCurveTo(w / 2, h - 2, 6, h / 2);
    x.fill();
    x.strokeStyle = "rgba(20,30,20,0.5)";
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(8, h / 2);
    x.lineTo(w - 8, h / 2);
    x.stroke();
  });
}

/* ───────────────────────────── camera ───────────────────────────── */

interface Waypoint {
  p: [number, number, number];
  t: [number, number, number];
  fov: number;
}

const CAM: Waypoint[] = [
  { p: [0.0, 4.2, 14.0], t: [4.0, 5.0, -20.0], fov: 36 }, // 0 hero — the strait, bridge ahead
  { p: [-9.5, 3.0, 2.0], t: [-16.0, 8.0, -20.0], fov: 46 }, // 1 the Italian shore — Duomo
  { p: [3.0, 5.0, -6.0], t: [10.0, 5.0, -28.0], fov: 40 }, // 2 corridors — over the water to the bridge
  { p: [10.0, 3.0, -14.0], t: [30.0, 6.0, -32.0], fov: 46 }, // 3 protocol — the Turkish shore
  { p: [2.0, 7.5, -42.0], t: [34.0, 7.0, -44.0], fov: 44 }, // 4 continuity — beyond the bridge, facing the Istanbul shore
  { p: [11.0, 13.0, -40.0], t: [12.0, 1.0, -58.0], fov: 46 }, // 5 colophon — looking down on the water
];

const FOG_COLOR = new THREE.Color("#05070a");
const MOON_POS = new THREE.Vector3(30, 34, -84);

function aspectFix(w: number, h: number) {
  return clamp((1.62 - w / h) / 1.05, 0, 1);
}

function Rig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, size } = useThree();
  const invalidate = useThree((s) => s.invalidate);

  // under reduced motion the loop runs on demand — wake it whenever the scroll state moves
  useEffect(() => {
    if (!reducedMotion) return;
    const wake = () => invalidate();
    const unsub = subscribeChapters(wake);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
    wake();
    return () => {
      unsub();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, [reducedMotion, invalidate]);
  const curves = useMemo(
    () => ({
      p: new THREE.CatmullRomCurve3(CAM.map((c) => new THREE.Vector3(...c.p)), false, "catmullrom", 0.42),
      t: new THREE.CatmullRomCurve3(CAM.map((c) => new THREE.Vector3(...c.t)), false, "catmullrom", 0.42),
    }),
    [],
  );
  const rig = useRef({ smooth: 0, mx: 0, my: 0, intro: reducedMotion ? 1 : 0 });
  const tmp = useMemo(() => ({ p: new THREE.Vector3(), t: new THREE.Vector3(), d: new THREE.Vector3() }), []);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const r = rig.current;
    const N = CAM.length - 1;
    const target = clamp(chapterState.progress, 0, N);
    r.smooth = reducedMotion ? target : damp(r.smooth, target, 5.2, dt);
    r.mx = damp(r.mx, chapterState.pointerX, 2.6, dt);
    r.my = damp(r.my, chapterState.pointerY, 2.6, dt);
    if (chapterState.introAt && !reducedMotion) {
      r.intro = clamp((performance.now() - chapterState.introAt) / 2400, 0, 1);
    }

    const u = clamp(r.smooth / N, 0, 1);
    curves.p.getPoint(u, tmp.p);
    curves.t.getPoint(u, tmp.t);
    const i = clamp(Math.floor(r.smooth), 0, N - 1);
    const f = clamp(r.smooth - i, 0, 1);
    let fov = lerp(CAM[i].fov, CAM[i + 1].fov, f);

    // tall frames step back along the view axis and open up
    const nf = aspectFix(size.width, size.height);
    if (nf > 0) {
      tmp.d.subVectors(tmp.p, tmp.t).normalize();
      tmp.p.addScaledVector(tmp.d, nf * 8.2);
      tmp.p.y += nf * 1.1;
      fov *= 1 + nf * 0.4;
    }

    // the opening dolly
    const io = 1 - r.intro;
    tmp.p.z += io * 5.6;
    tmp.p.y += io * 0.65;
    fov += io * 8;

    // hand-held drift
    const par = 1 - smooth(0, 1.6, r.smooth) * 0.55;
    tmp.p.x += r.mx * 0.62 * par;
    tmp.p.y += r.my * 0.34 * par;
    tmp.t.x -= r.mx * 0.2 * par;
    tmp.t.y -= r.my * 0.12 * par;

    camera.position.copy(tmp.p);
    camera.lookAt(tmp.t);
    const pc = camera as THREE.PerspectiveCamera;
    if (Math.abs(pc.fov - fov) > 1e-4) {
      pc.fov = fov;
      pc.updateProjectionMatrix();
    }
  });
  return null;
}

/* ───────────────────────────── sky ───────────────────────────── */

function SkyAndMoon({ quality }: { quality: ShoreQuality }) {
  const { scene, size } = useThree();
  const moonTex = useMemo(() => moonTexture(), []);
  const haloTex = useMemo(() => glowTexture("rgba(255,236,200,0.85)", "rgba(220,200,150,0.22)"), []);
  const hazeTex = useMemo(() => glowTexture("rgba(150,190,210,0.5)", "rgba(110,150,175,0.16)"), []);
  const haloRef = useRef<THREE.Mesh>(null);
  const hazeRefs = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    scene.background = new THREE.Color("#05070a");
    scene.fog = new THREE.Fog(FOG_COLOR, 26, 140);
    return () => {
      scene.fog = null;
      moonTex.dispose();
      haloTex.dispose();
      hazeTex.dispose();
    };
  }, [scene, moonTex, haloTex, hazeTex]);

  const stars = useMemo(() => {
    const n = quality === "high" ? 520 : 260;
    const arr = new Float32Array(n * 3);
    const rnd = mulberry32(9);
    for (let i = 0; i < n; i++) {
      const a = rnd() * TAU;
      const el = 0.12 + rnd() * 0.75;
      const R = 180;
      arr[i * 3] = Math.cos(a) * Math.cos(el) * R;
      arr[i * 3 + 1] = Math.sin(el) * R * 0.75 + 4;
      arr[i * 3 + 2] = Math.sin(a) * Math.cos(el) * R - 30;
    }
    return arr;
  }, [quality]);

  const haze = useMemo(() => {
    const rnd = mulberry32(66);
    return Array.from({ length: quality === "high" ? 6 : 4 }, () => ({
      s: 14 + rnd() * 16,
      x: (rnd() - 0.5) * 50 + 8,
      y: 1.5 + rnd() * 9,
      z: -44 + rnd() * 44,
      sp: 0.05 + rnd() * 0.1,
      ph: rnd() * TAU,
      op: 0.05 + rnd() * 0.06,
    }));
  }, [quality]);

  const moonX = MOON_POS.x * (1 - 0.4 * aspectFix(size.width, size.height));

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    const f = chapterState.focus >= 0 ? 1 : 0;
    if (haloRef.current) (haloRef.current.material as THREE.MeshBasicMaterial).opacity = 0.42 + f * 0.1 + Math.sin(t * 0.34) * 0.05;
    // iterate the data, not the ref array: refs outlive a quality change that shrinks the haze count
    haze.forEach((h, i) => {
      const m = hazeRefs.current[i];
      if (!m) return;
      m.position.x = h.x + Math.sin(t * h.sp + h.ph) * 5.5;
      m.quaternion.copy(camera.quaternion);
    });
  });

  return (
    <group>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#dfe7e0" size={0.9} sizeAttenuation transparent opacity={0.55} depthWrite={false} fog={false} />
      </points>

      <mesh position={[moonX, MOON_POS.y, MOON_POS.z]} renderOrder={1}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial map={moonTex} transparent depthWrite={false} fog={false} toneMapped={false} color="#fff6dc" />
      </mesh>
      <mesh ref={haloRef} position={[moonX, MOON_POS.y, MOON_POS.z - 0.4]} renderOrder={0}>
        <planeGeometry args={[52, 52]} />
        <meshBasicMaterial map={haloTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} fog={false} opacity={0.42} />
      </mesh>

      {haze.map((h, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) hazeRefs.current[i] = el;
          }}
          position={[h.x, h.y, h.z]}
          renderOrder={4}
        >
          <planeGeometry args={[h.s, h.s * 0.5]} />
          <meshBasicMaterial map={hazeTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} fog={false} opacity={h.op} />
        </mesh>
      ))}
    </group>
  );
}

/* ───────────────────────────── water ───────────────────────────── */

const LAMP_REFLECTIONS: { x: number; z: number; i: number; c: THREE.Color }[] = [
  { x: -4.5, z: 6, i: 1.0, c: new THREE.Color("#ffb469") },
  { x: -4.5, z: -4, i: 0.9, c: new THREE.Color("#ffb469") },
  { x: -4.5, z: -14, i: 0.8, c: new THREE.Color("#ffb469") },
  { x: 2, z: -26, i: 0.7, c: new THREE.Color("#ffc27a") },
  { x: 9, z: -26, i: 0.7, c: new THREE.Color("#ffc27a") },
  { x: 16, z: -26, i: 0.7, c: new THREE.Color("#ffc27a") },
  { x: 22.5, z: -30, i: 1.1, c: new THREE.Color("#ffd08a") },
  { x: 22.5, z: -44, i: 0.6, c: new THREE.Color("#ffb469") },
  { x: 22.5, z: -18, i: 0.5, c: new THREE.Color("#ffb469") },
  { x: 30, z: -84, i: 1.6, c: new THREE.Color("#efe3c4") },
];

const WATER_VERT = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vWorld;
  uniform float uTime;
  uniform vec3 uCam;
  uniform vec3 uMoon;
  uniform vec3 uFog;
  uniform vec4 uLights[10];
  uniform vec3 uLightColors[10];
  void main() {
    vec2 p = vWorld.xz;
    float t = uTime;
    float n1 = sin(p.x * 0.9 + t * 0.8) * 0.5 + sin(p.y * 0.7 - t * 0.6) * 0.5;
    float n2 = sin((p.x + p.y) * 1.7 + t * 1.3);
    float n3 = sin(p.x * 3.1 - t * 1.9) * sin(p.y * 2.3 + t * 1.1);
    vec3 n = normalize(vec3(n1 * 0.10 + n2 * 0.04 + n3 * 0.02, 1.0, n2 * 0.07 - n1 * 0.03 + n3 * 0.02));
    vec3 v = normalize(uCam - vWorld);
    vec3 r = reflect(-v, n);
    vec3 md = normalize(uMoon - vWorld);
    vec3 col = vec3(0.020, 0.040, 0.062);
    float spec = pow(max(dot(r, md), 0.0), 160.0);
    float path = pow(max(dot(r, md), 0.0), 9.0);
    col += vec3(0.95, 0.88, 0.70) * (spec * 0.9 + path * 0.05);
    float ripple = 0.55 + 0.45 * (n2 * 0.5 + 0.5);
    for (int i = 0; i < 10; i++) {
      vec4 L = uLights[i];
      vec2 d = p - L.xy;
      float a = exp(-d.x * d.x * 1.6) * exp(-d.y * d.y * 0.045) * L.z;
      float flick = 0.8 + 0.2 * sin(t * (2.2 + float(i) * 0.4) + float(i) * 1.7);
      col += uLightColors[i] * a * 0.55 * ripple * flick;
    }
    float fres = pow(1.0 - max(dot(v, n), 0.0), 3.0);
    col += vec3(0.05, 0.08, 0.11) * fres;
    float dist = length(uCam - vWorld);
    float f = smoothstep(26.0, 140.0, dist);
    col = mix(col, uFog, f);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Water() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCam: { value: new THREE.Vector3() },
      uMoon: { value: MOON_POS.clone() },
      uFog: { value: FOG_COLOR.clone() },
      uLights: { value: LAMP_REFLECTIONS.map((l) => new THREE.Vector4(l.x, l.z, l.i, 0)) },
      uLightColors: { value: LAMP_REFLECTIONS.map((l) => l.c.clone()) },
    }),
    [],
  );
  useFrame(({ clock, camera }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uCam.value.copy(camera.position);
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[9, 0, -30]} renderOrder={2}>
      <planeGeometry args={[26, 140, 1, 1]} />
      <shaderMaterial vertexShader={WATER_VERT} fragmentShader={WATER_FRAG} uniforms={uniforms} />
    </mesh>
  );
}

/* ───────────────────────────── shores ───────────────────────────── */

const M = {
  ground: "#0a100e",
  quay: "#161b1e",
  marble: "#2d333a",
  marbleLight: "#3a4149",
  gold: "#d9b45a",
  lead: "#3a4653",
  stone: "#2b333c",
  tower: "#262c33",
  cypress: "#0f1a12",
  bridge: "#1a2026",
  cable: "#9aa7a0",
  lamp: "#ffb469",
  window: "#ffb469",
  glass: "#ff9a52",
};

function Shores() {
  return (
    <group>
      {/* Italian shore */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-44, 0.02, -30]} receiveShadow>
        <planeGeometry args={[80, 160]} />
        <meshStandardMaterial color={M.ground} roughness={1} />
      </mesh>
      <mesh position={[-4.6, 0.6, -30]}>
        <boxGeometry args={[1.2, 1.2, 140]} />
        <meshStandardMaterial color={M.quay} roughness={0.9} />
      </mesh>
      {/* Turkish shore */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[62, 0.02, -30]} receiveShadow>
        <planeGeometry args={[80, 160]} />
        <meshStandardMaterial color={M.ground} roughness={1} />
      </mesh>
      <mesh position={[22.6, 0.6, -30]}>
        <boxGeometry args={[1.2, 1.2, 140]} />
        <meshStandardMaterial color={M.quay} roughness={0.9} />
      </mesh>
      {/* the far land closing the strait */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[9, 0.01, -130]}>
        <planeGeometry args={[40, 60]} />
        <meshStandardMaterial color={M.ground} roughness={1} />
      </mesh>
      {/* Turkish ridge behind the mosque */}
      <mesh position={[52, 5, -70]} rotation={[0, 0.3, 0]}>
        <cylinderGeometry args={[0, 34, 10, 7]} />
        <meshStandardMaterial color="#0b1013" roughness={1} flatShading />
      </mesh>
      <mesh position={[26, 4, -96]}>
        <cylinderGeometry args={[0, 40, 8, 6]} />
        <meshStandardMaterial color="#0b1013" roughness={1} flatShading />
      </mesh>
      {/* Italian hills */}
      <mesh position={[-40, 3, -70]}>
        <cylinderGeometry args={[0, 42, 7, 7]} />
        <meshStandardMaterial color="#0b1013" roughness={1} flatShading />
      </mesh>
    </group>
  );
}

/* ───────────────────────────── Milan ───────────────────────────── */

function Duomo({ position }: { position: [number, number, number] }) {
  const spires = useMemo(() => {
    const rnd = mulberry32(3);
    const list: { x: number; z: number; h: number }[] = [];
    for (let i = 0; i < 9; i++) {
      list.push({ x: -5.6 + i * 1.4, z: 4.2, h: 2.2 + rnd() * 1.6 });
      list.push({ x: -5.6 + i * 1.4, z: -4.2, h: 2.2 + rnd() * 1.6 });
    }
    for (let i = 0; i < 5; i++) {
      list.push({ x: -6.2, z: -3 + i * 1.5, h: 2.4 + rnd() * 1.4 });
      list.push({ x: 6.2, z: -3 + i * 1.5, h: 2.4 + rnd() * 1.4 });
    }
    for (let i = 0; i < 6; i++) list.push({ x: -3.5 + i * 1.4, z: 1.6, h: 1.6 + rnd() * 1.2 });
    for (let i = 0; i < 6; i++) list.push({ x: -3.5 + i * 1.4, z: -1.6, h: 1.6 + rnd() * 1.2 });
    return list;
  }, []);
  return (
    <group position={position}>
      {/* nave */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[13, 6, 9.5]} />
        <meshStandardMaterial color={M.marble} roughness={0.85} />
      </mesh>
      <mesh position={[0, 6.6, 0]}>
        <boxGeometry args={[8, 1.3, 9.8]} />
        <meshStandardMaterial color={M.marbleLight} roughness={0.85} />
      </mesh>
      {/* facade windows */}
      {[-4, -2, 0, 2, 4].map((x) => (
        <mesh key={x} position={[x, 2.6, 4.78]}>
          <planeGeometry args={[0.55, 1.9]} />
          <meshBasicMaterial color={M.window} toneMapped={false} />
        </mesh>
      ))}
      {/* spires */}
      {spires.map((s, i) => (
        <group key={i} position={[s.x, 7.2, s.z]}>
          <mesh position={[0, s.h / 2, 0]}>
            <coneGeometry args={[0.2, s.h, 5]} />
            <meshStandardMaterial color={M.marbleLight} roughness={0.8} flatShading />
          </mesh>
          <mesh position={[0, s.h + 0.12, 0]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshStandardMaterial color={M.gold} emissive={M.gold} emissiveIntensity={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {/* the central spire and the Madonnina */}
      <mesh position={[0, 11, 0]}>
        <coneGeometry args={[0.55, 8, 6]} />
        <meshStandardMaterial color={M.marbleLight} roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 15.3, 0]}>
        <sphereGeometry args={[0.32, 10, 10]} />
        <meshStandardMaterial color="#ffd77a" emissive="#ffc44f" emissiveIntensity={1.4} roughness={0.25} />
      </mesh>
      <pointLight position={[0, 15.3, 0]} color="#ffd27a" intensity={4} distance={26} decay={2} />
    </group>
  );
}

function Galleria({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.35, 0]}>
      {/* the arch */}
      <mesh position={[0, 3.6, 0]}>
        <torusGeometry args={[3.2, 0.5, 8, 24, Math.PI]} />
        <meshStandardMaterial color={M.marble} roughness={0.85} />
      </mesh>
      {[-3.2, 3.2].map((x) => (
        <mesh key={x} position={[x, 1.8, 0]}>
          <boxGeometry args={[1, 3.6, 1]} />
          <meshStandardMaterial color={M.marble} roughness={0.85} />
        </mesh>
      ))}
      {/* the barrel-vaulted glass roof behind, lit from inside */}
      <mesh position={[0, 3.4, -7]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[2.6, 2.6, 12, 16, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#161b20" roughness={0.6} side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 1.4, -7]}>
        <planeGeometry args={[4.2, 12]} />
        <meshBasicMaterial color={M.glass} toneMapped={false} transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0, 2.5, -7]} color="#ff9a52" intensity={3} distance={18} decay={2} />
    </group>
  );
}

function Cypresses({ quality }: { quality: ShoreQuality }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const rnd = mulberry32(19);
    const list: { x: number; z: number; h: number; r: number }[] = [];
    const n = quality === "high" ? 34 : 20;
    for (let i = 0; i < n; i++) {
      list.push({ x: -7 - rnd() * 24, z: 10 - rnd() * 70, h: 4.5 + rnd() * 4, r: 0.55 + rnd() * 0.35 });
    }
    return list;
  }, [quality]);
  useEffect(() => {
    const m = ref.current;
    if (!m) return;
    const o = new THREE.Object3D();
    items.forEach((it, i) => {
      o.position.set(it.x, it.h / 2, it.z);
      o.scale.set(it.r, it.h, it.r);
      o.rotation.set(0, 0, 0);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow>
      <coneGeometry args={[1, 1, 7]} />
      <meshStandardMaterial color={M.cypress} roughness={1} flatShading />
    </instancedMesh>
  );
}

function QuayLamps() {
  const glowTex = useMemo(() => glowTexture("rgba(255,196,120,0.95)", "rgba(255,140,60,0.28)"), []);
  const lamps = [
    [-5.4, 6],
    [-5.4, -4],
    [-5.4, -14],
  ];
  const lightRefs = useRef<THREE.PointLight[]>([]);
  useFrame(({ clock }) => {
    const f = chapterState.focus >= 0 ? 1 : 0;
    const t = clock.elapsedTime;
    lightRefs.current.forEach((l, i) => {
      if (l) l.intensity = 3.2 * (1 + f * 0.5) * (0.88 + 0.16 * Math.sin(t * (2.3 + i * 0.7) + i * 2.1));
    });
  });
  useEffect(() => () => glowTex.dispose(), [glowTex]);
  return (
    <group>
      {lamps.map(([x, z], i) => (
        <group key={i} position={[x, 1.2, z]}>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 3.2, 6]} />
            <meshStandardMaterial color="#111517" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.35, 0]}>
            <boxGeometry args={[0.42, 0.5, 0.42]} />
            <meshBasicMaterial color={M.lamp} toneMapped={false} />
          </mesh>
          <sprite position={[0, 3.35, 0]} scale={[3.2, 3.2, 1]}>
            <spriteMaterial map={glowTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.75} />
          </sprite>
          <pointLight
            ref={(el) => {
              if (el) lightRefs.current[i] = el;
            }}
            position={[0, 3.3, 0]}
            color="#ffb469"
            intensity={3.2}
            distance={20}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}

/* ───────────────────────────── Istanbul ───────────────────────────── */

function Minaret({ position, height = 16 }: { position: [number, number, number]; height?: number }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.32, 0.5, height, 10]} />
        <meshStandardMaterial color={M.stone} roughness={0.85} />
      </mesh>
      {[0.55, 0.75].map((f) => (
        <mesh key={f} position={[0, height * f, 0]}>
          <torusGeometry args={[0.6, 0.12, 6, 14]} />
          <meshStandardMaterial color={M.stone} roughness={0.85} />
        </mesh>
      ))}
      <mesh position={[0, height + 1.2, 0]}>
        <coneGeometry args={[0.42, 2.4, 10]} />
        <meshStandardMaterial color={M.lead} roughness={0.7} />
      </mesh>
      <mesh position={[0, height + 2.6, 0]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial color={M.gold} emissive={M.gold} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function Mosque({ position }: { position: [number, number, number] }) {
  const windows = useMemo(() => Array.from({ length: 12 }, (_, i) => (i / 12) * TAU), []);
  return (
    <group position={position}>
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[15, 6, 15]} />
        <meshStandardMaterial color={M.stone} roughness={0.9} />
      </mesh>
      {/* base windows */}
      {[-5, -2.5, 0, 2.5, 5].map((x) => (
        <mesh key={`w${x}`} position={[x, 2.8, 7.52]}>
          <planeGeometry args={[0.7, 1.6]} />
          <meshBasicMaterial color={M.window} toneMapped={false} />
        </mesh>
      ))}
      {[-5, -2.5, 0, 2.5, 5].map((z) => (
        <mesh key={`e${z}`} position={[-7.52, 2.8, z]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.7, 1.6]} />
          <meshBasicMaterial color={M.window} toneMapped={false} />
        </mesh>
      ))}
      {/* drum */}
      <mesh position={[0, 7, 0]}>
        <cylinderGeometry args={[5.6, 5.6, 2.2, 24]} />
        <meshStandardMaterial color={M.stone} roughness={0.9} />
      </mesh>
      {windows.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 5.62, 7, Math.sin(a) * 5.62]} rotation={[0, -a + Math.PI / 2, 0]}>
          <planeGeometry args={[0.4, 1.1]} />
          <meshBasicMaterial color={M.window} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* main dome */}
      <mesh position={[0, 8.1, 0]}>
        <sphereGeometry args={[5.7, 28, 16, 0, TAU, 0, Math.PI / 2]} />
        <meshStandardMaterial color={M.lead} roughness={0.55} metalness={0.15} />
      </mesh>
      <mesh position={[0, 14.2, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color={M.gold} emissive={M.gold} emissiveIntensity={0.8} />
      </mesh>
      {/* half domes */}
      {[
        [0, 6.4, 6.2],
        [0, 6.4, -6.2],
        [6.2, 6.4, 0],
        [-6.2, 6.4, 0],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[3.1, 20, 12, 0, TAU, 0, Math.PI / 2]} />
          <meshStandardMaterial color={M.lead} roughness={0.55} metalness={0.15} />
        </mesh>
      ))}
      {/* corner domes */}
      {[
        [5.2, 6.2, 5.2],
        [-5.2, 6.2, 5.2],
        [5.2, 6.2, -5.2],
        [-5.2, 6.2, -5.2],
      ].map(([x, y, z], i) => (
        <mesh key={`c${i}`} position={[x, y, z]}>
          <sphereGeometry args={[1.7, 16, 10, 0, TAU, 0, Math.PI / 2]} />
          <meshStandardMaterial color={M.lead} roughness={0.55} metalness={0.15} />
        </mesh>
      ))}
      <Minaret position={[8.6, 0, 8.6]} />
      <Minaret position={[-8.6, 0, 8.6]} />
      <Minaret position={[8.6, 0, -8.6]} />
      <Minaret position={[-8.6, 0, -8.6]} />
      <pointLight position={[0, 5, 9]} color="#ffc27a" intensity={6} distance={42} decay={2} />
    </group>
  );
}

function Galata({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[2.1, 2.5, 10, 14]} />
        <meshStandardMaterial color={M.tower} roughness={0.9} />
      </mesh>
      <mesh position={[0, 10.6, 0]}>
        <cylinderGeometry args={[2.7, 2.1, 1.4, 14]} />
        <meshStandardMaterial color={M.stone} roughness={0.9} />
      </mesh>
      <mesh position={[0, 11.9, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 1.3, 14]} />
        <meshStandardMaterial color={M.tower} roughness={0.9} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * TAU;
        return (
          <mesh key={i} position={[Math.cos(a) * 2.22, 11.9, Math.sin(a) * 2.22]} rotation={[0, -a + Math.PI / 2, 0]}>
            <planeGeometry args={[0.5, 0.8]} />
            <meshBasicMaterial color={M.window} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
      <mesh position={[0, 14.6, 0]}>
        <coneGeometry args={[2.4, 4.2, 14]} />
        <meshStandardMaterial color={M.lead} roughness={0.7} />
      </mesh>
      <pointLight position={[0, 12, 0]} color="#ffc27a" intensity={3} distance={24} decay={2} />
    </group>
  );
}

function Houses({ quality }: { quality: ShoreQuality }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const winRef = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const rnd = mulberry32(101);
    const list: { x: number; z: number; w: number; h: number; d: number }[] = [];
    const n = quality === "high" ? 46 : 26;
    for (let i = 0; i < n; i++) {
      list.push({ x: 25 + rnd() * 30, z: -8 - rnd() * 60, w: 1.6 + rnd() * 2.4, h: 1.8 + rnd() * 3.2, d: 1.6 + rnd() * 2.4 });
    }
    return list;
  }, [quality]);
  useEffect(() => {
    const m = ref.current;
    const wm = winRef.current;
    if (!m || !wm) return;
    const o = new THREE.Object3D();
    items.forEach((it, i) => {
      o.position.set(it.x, it.h / 2, it.z);
      o.scale.set(it.w, it.h, it.d);
      o.rotation.set(0, 0, 0);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      // one lit window per house, on the water-facing side
      o.position.set(it.x - it.w / 2 - 0.01, it.h * 0.55, it.z);
      o.scale.set(1, 0.5, 0.35);
      o.rotation.set(0, -Math.PI / 2, 0);
      o.updateMatrix();
      wm.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    wm.instanceMatrix.needsUpdate = true;
  }, [items]);
  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, items.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1b2127" roughness={1} />
      </instancedMesh>
      <instancedMesh ref={winRef} args={[undefined, undefined, items.length]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={M.window} toneMapped={false} side={THREE.DoubleSide} transparent opacity={0.8} />
      </instancedMesh>
    </group>
  );
}

/* ───────────────────────────── bridge ───────────────────────────── */

const BRIDGE_Z = -26;
const BRIDGE_Y = 3.4;

function Bridge() {
  const Z = BRIDGE_Z;
  const y = BRIDGE_Y;
  const cable = useMemo(() => {
    const pts = [
      new THREE.Vector3(-4.6, y + 0.4, Z),
      new THREE.Vector3(2.5, y + 8.5, Z),
      new THREE.Vector3(9, y + 1.6, Z),
      new THREE.Vector3(15.5, y + 8.5, Z),
      new THREE.Vector3(22.6, y + 0.4, Z),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5).getPoints(90);
  }, []);
  const hangers = useMemo(() => {
    const out: [number, number, number][][] = [];
    for (let i = 4; i < cable.length - 4; i += 4) {
      const p = cable[i];
      if (Math.abs(p.x - 2.5) < 0.6 || Math.abs(p.x - 15.5) < 0.6) continue;
      out.push([
        [p.x, p.y, Z],
        [p.x, y + 0.2, Z],
      ]);
    }
    return out;
  }, [cable]);
  const lamps = useMemo(() => Array.from({ length: 10 }, (_, i) => -3 + i * 2.7), []);
  const glowTex = useMemo(() => glowTexture("rgba(255,200,130,0.9)", "rgba(255,150,80,0.25)"), []);
  useEffect(() => () => glowTex.dispose(), [glowTex]);
  return (
    <group>
      {/* deck */}
      <mesh position={[9, y, Z]}>
        <boxGeometry args={[28, 0.42, 1.8]} />
        <meshStandardMaterial color={M.bridge} roughness={0.9} />
      </mesh>
      {/* pylons */}
      {[2.5, 15.5].map((x) => (
        <group key={x} position={[x, 0, Z]}>
          {[-0.7, 0.7].map((dz) => (
            <mesh key={dz} position={[0, 5.6, dz]}>
              <boxGeometry args={[0.7, 11.2, 0.5]} />
              <meshStandardMaterial color="#20262c" roughness={0.9} />
            </mesh>
          ))}
          <mesh position={[0, 11.4, 0]}>
            <boxGeometry args={[1.1, 0.5, 2.1]} />
            <meshStandardMaterial color="#20262c" roughness={0.9} />
          </mesh>
          <mesh position={[0, 11.9, 0]}>
            <sphereGeometry args={[0.12, 6, 6]} />
            <meshBasicMaterial color="#ff3b30" toneMapped={false} />
          </mesh>
        </group>
      ))}
      {/* cables, front and back */}
      {[-0.75, 0.75].map((dz) => (
        <group key={dz} position={[0, 0, dz]}>
          <Line points={cable} color={M.cable} lineWidth={1.1} transparent opacity={0.55} />
          {hangers.map((h, i) => (
            <Line key={i} points={h} color={M.cable} lineWidth={0.7} transparent opacity={0.35} />
          ))}
        </group>
      ))}
      {/* deck lamps */}
      {lamps.map((x, i) => (
        <group key={i} position={[x, y + 0.9, Z]}>
          <mesh>
            <sphereGeometry args={[0.09, 6, 6]} />
            <meshBasicMaterial color={M.lamp} toneMapped={false} />
          </mesh>
          <sprite scale={[1.6, 1.6, 1]}>
            <spriteMaterial map={glowTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.55} />
          </sprite>
        </group>
      ))}
      <pointLight position={[9, y + 1.5, Z]} color="#ffc27a" intensity={2.5} distance={22} decay={2} />
    </group>
  );
}

/* ───────────────────────────── particles ───────────────────────────── */

function OliveLeaves({ quality, reducedMotion }: { quality: ShoreQuality; reducedMotion: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const tex = useMemo(() => leafTexture(), []);
  const N = quality === "high" ? 220 : 110;
  const list = useMemo(() => {
    const rnd = mulberry32(404);
    return Array.from({ length: N }, () => ({
      x: 0,
      y: rnd() * 24,
      z: 0,
      fall: 0.45 + rnd() * 0.8,
      sway: 0.45 + rnd() * 1.5,
      swayPh: rnd() * TAU,
      swayAmp: 0.3 + rnd() * 0.9,
      spin: (rnd() - 0.5) * 2.4,
      roll: rnd() * TAU,
      rollSp: 0.5 + rnd() * 2,
      tilt: rnd() * TAU,
      s: 0.5 + rnd() * 0.8,
      seeded: false,
    }));
  }, [N]);
  const tmp = useMemo(
    () => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), e: new THREE.Euler(), p: new THREE.Vector3(), s: new THREE.Vector3(), f: new THREE.Vector3() }),
    [],
  );
  useEffect(() => () => tex.dispose(), [tex]);

  useFrame(({ camera, clock }, dtRaw) => {
    const m = ref.current;
    if (!m) return;
    const dt = reducedMotion ? 0 : Math.min(dtRaw, 0.05);
    const t = clock.elapsedTime;
    camera.getWorldDirection(tmp.f);
    tmp.f.y = 0;
    if (tmp.f.lengthSq() < 1e-6) tmp.f.set(0, 0, -1);
    else tmp.f.normalize();
    const fx = camera.position.x + tmp.f.x * 11;
    const fz = camera.position.z + tmp.f.z * 11;
    const cy = camera.position.y;
    for (let i = 0; i < list.length; i++) {
      const l = list[i];
      l.y -= l.fall * dt;
      l.roll += l.rollSp * dt;
      l.tilt += l.spin * dt;
      if (!l.seeded || l.y < cy - 10) {
        l.y = l.seeded ? cy + 16 : cy - 10 + Math.random() * 26;
        const a = Math.random() * TAU;
        const r = Math.sqrt(Math.random()) * 12;
        l.x = fx + Math.cos(a) * r;
        l.z = fz + Math.sin(a) * r;
        l.seeded = true;
      }
      const cx = camera.position.x;
      const cz = camera.position.z;
      if (l.x - cx > 30) l.x -= 60;
      else if (l.x - cx < -30) l.x += 60;
      if (l.z - cz > 30) l.z -= 60;
      else if (l.z - cz < -30) l.z += 60;
      const sw = Math.sin(t * l.sway + l.swayPh);
      tmp.p.set(l.x + sw * l.swayAmp, l.y, l.z + Math.cos(t * l.sway * 0.7 + l.swayPh) * l.swayAmp * 0.6);
      tmp.e.set(l.roll, l.tilt, sw * 0.55);
      tmp.q.setFromEuler(tmp.e);
      tmp.s.setScalar(l.s);
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      m.setMatrixAt(i, tmp.m);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N]} frustumCulled={false} renderOrder={5}>
      <planeGeometry args={[0.42, 0.21]} />
      <meshStandardMaterial map={tex} alphaTest={0.4} side={THREE.DoubleSide} color="#7c8a70" roughness={0.9} emissive="#1b2418" emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

function Embers({ quality }: { quality: ShoreQuality }) {
  const N = quality === "high" ? 380 : 180;
  const tex = useMemo(() => glowTexture("rgba(255,200,140,1)", "rgba(255,140,60,0.35)"), []);
  const { positions, seeds } = useMemo(() => {
    const rnd = mulberry32(7);
    const positions = new Float32Array(N * 3);
    const seeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3] = -8 + rnd() * 34;
      positions[i * 3 + 1] = rnd() * 11;
      positions[i * 3 + 2] = -46 + rnd() * 60;
      seeds[i] = rnd();
    }
    return { positions, seeds };
  }, [N]);
  const uniforms = useMemo(() => ({ uT: { value: 0 }, uTex: { value: tex }, uSize: { value: 500 } }), [tex]);
  useFrame(({ clock, size }) => {
    uniforms.uT.value = clock.elapsedTime;
    uniforms.uSize.value = size.height * 0.5;
  });
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <points frustumCulled={false} renderOrder={5}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          attribute float aSeed; uniform float uT; uniform float uSize; varying float vA;
          void main(){ vec3 p = position;
            p.y = mod(p.y + uT * (0.12 + aSeed * 0.24), 11.5);
            p.x += sin(uT * 0.36 + aSeed * 22.0) * 0.85;
            p.z += cos(uT * 0.29 + aSeed * 17.0) * 0.7;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vA = (0.25 + aSeed * 0.75) * smoothstep(11.5, 7.0, p.y) * smoothstep(0.0, 1.4, p.y);
            gl_PointSize = uSize * (0.010 + aSeed * 0.018) / max(-mv.z, 0.6);
            gl_Position = projectionMatrix * mv; }
        `}
        fragmentShader={`
          uniform sampler2D uTex; varying float vA;
          void main(){ vec4 t = texture2D(uTex, gl_PointCoord);
            gl_FragColor = vec4(t.rgb * vec3(1.5, 0.95, 0.55), t.a * vA * 0.7); }
        `}
      />
    </points>
  );
}

/* ───────────────────────────── wordmark ───────────────────────────── */

const WORD_Z = 3.0;

function Wordmark({ word, reducedMotion }: { word: string; reducedMotion: boolean }) {
  const { size } = useThree();
  const invalidate = useThree((s) => s.invalidate);
  const groupRef = useRef<THREE.Group>(null);
  const glyphs = useRef<{ mesh: THREE.Mesh; baseY: number }[]>([]);
  const ink = useRef<{ w: number; cx: number; asc: number } | null>(null);
  const tmpCam = useMemo(() => new THREE.PerspectiveCamera(CAM[0].fov, 1, 0.35, 220), []);
  const scratch = useMemo(
    () => ({ hp: new THREE.Vector3(), ht: new THREE.Vector3(), d: new THREE.Vector3(), v: new THREE.Vector3(), L: new THREE.Vector3(), R: new THREE.Vector3(), B: new THREE.Vector3() }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const group = groupRef.current;
    if (!group) return;
    const build = () => {
      if (cancelled) return;
      const SZ = 320;
      const TRACK = 0.36;
      const PAD = 26;
      const font = `600 ${SZ}px Onest, "Plus Jakarta Sans", system-ui, sans-serif`;
      const measure = document.createElement("canvas").getContext("2d")!;
      measure.font = font;
      measure.textBaseline = "alphabetic";
      let pen = 0;
      let ascMax = 0;
      let descMax = 0;
      let xMin = 1e9;
      let xMax = -1e9;
      const gl = Array.from(word).map((ch) => {
        const t = measure.measureText(ch);
        const g = { ch, adv: t.width, asc: t.actualBoundingBoxAscent, desc: t.actualBoundingBoxDescent, l: t.actualBoundingBoxLeft, r: t.actualBoundingBoxRight, pen };
        ascMax = Math.max(ascMax, g.asc);
        descMax = Math.max(descMax, g.desc);
        xMin = Math.min(xMin, pen - g.l);
        xMax = Math.max(xMax, pen + g.r);
        pen += t.width + TRACK * SZ;
        return g;
      });
      glyphs.current = gl.map((g) => {
        const cw = Math.ceil(g.l + g.r) + PAD * 2;
        const chh = Math.ceil(g.asc + g.desc) + PAD * 2;
        const tex = canvasTexture(cw, chh, (x) => {
          x.font = font;
          x.textBaseline = "alphabetic";
          const gy0 = PAD + g.asc - ascMax;
          const gy1 = PAD + g.asc + descMax * 0.4;
          const grad = x.createLinearGradient(0, gy0, 0, gy1);
          grad.addColorStop(0, "rgb(230,236,229)");
          grad.addColorStop(0.52, "rgb(200,212,204)");
          grad.addColorStop(1, "rgb(150,166,157)");
          x.fillStyle = grad;
          x.fillText(g.ch, PAD + g.l, PAD + g.asc);
        });
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(cw, chh),
          new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: true, opacity: 0 }),
        );
        mesh.position.set(g.pen + (g.r - g.l) / 2, (g.asc - g.desc) / 2, 0);
        mesh.renderOrder = 12;
        mesh.frustumCulled = false;
        group.add(mesh);
        return { mesh, baseY: mesh.position.y };
      });
      ink.current = { w: xMax - xMin, cx: (xMin + xMax) / 2, asc: ascMax };
      invalidate();
    };
    const ready = document.fonts?.load(`600 320px Onest`) ?? Promise.resolve();
    ready.then(build, build);
    return () => {
      cancelled = true;
      glyphs.current.forEach(({ mesh }) => {
        group.remove(mesh);
        mesh.geometry.dispose();
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      glyphs.current = [];
      ink.current = null;
    };
  }, [word, invalidate]);

  useFrame(() => {
    const group = groupRef.current;
    const info = ink.current;
    if (!group || !info || !glyphs.current.length) return;
    // layout against the hero waypoint, so the word fills the frame edge to edge
    const c = CAM[0];
    const { hp, ht, d, v, L, R, B } = scratch;
    hp.set(c.p[0], c.p[1], c.p[2]);
    ht.set(c.t[0], c.t[1], c.t[2]);
    const nf = aspectFix(size.width, size.height);
    let fov = c.fov;
    if (nf > 0) {
      d.subVectors(hp, ht).normalize();
      hp.addScaledVector(d, nf * 8.2);
      hp.y += nf * 1.1;
      fov *= 1 + nf * 0.4;
    }
    tmpCam.fov = fov;
    tmpCam.aspect = size.width / size.height;
    tmpCam.position.copy(hp);
    tmpCam.lookAt(ht);
    tmpCam.updateProjectionMatrix();
    tmpCam.updateMatrixWorld(true);
    const hit = (nx: number, ny: number, out: THREE.Vector3) => {
      v.set(nx, ny, 0.5).unproject(tmpCam).sub(tmpCam.position).normalize();
      return out.copy(tmpCam.position).addScaledVector(v, (WORD_Z - tmpCam.position.z) / v.z);
    };
    hit(-1, 0, L);
    hit(1, 0, R);
    const narrow = size.width / size.height < 1.05;
    const fill = narrow ? 0.96 : 1.0;
    const s = ((R.x - L.x) * fill) / info.w;
    hit(0, narrow ? -0.16 : -0.585, B);
    group.scale.setScalar(s);
    const mid = (L.x + R.x) / 2;
    group.position.set(mid - info.cx * s, B.y, WORD_Z);

    // reveal from the intro, dissolve as the walk begins
    const el = chapterState.introAt ? (performance.now() - chapterState.introAt) / 1000 : 0;
    const reveal = reducedMotion ? 1.2 : Math.min(1.2, el / 1.5);
    const near = smooth(0.02, 0.92, chapterState.progress);
    glyphs.current.forEach(({ mesh, baseY }, i) => {
      const st = clamp((reveal - i * 0.075) / 0.62, 0, 1);
      const e = 1 - Math.pow(1 - st, 3);
      mesh.position.y = baseY - (1 - e) * (info.asc * 1.15);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = e * (1 - near * 0.96);
      mesh.visible = mat.opacity > 0.004;
    });
  });

  return <group ref={groupRef} />;
}

/* ───────────────────────────── lights + ready ───────────────────────────── */

function Lighting() {
  return (
    <>
      <ambientLight color="#1c2a3d" intensity={0.9} />
      <hemisphereLight args={["#203352", "#05070a", 0.9]} />
      <directionalLight position={[40, 50, -70]} color="#dfe6ff" intensity={0.9} />
    </>
  );
}

function ReadySignal() {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      markSceneReady();
    }
  });
  return null;
}

/* ───────────────────────────── root ───────────────────────────── */

export default function ShoreScene({ quality, reducedMotion, word }: ShoreSceneProps) {
  return (
    <>
      <Rig reducedMotion={reducedMotion} />
      <Lighting />
      <SkyAndMoon quality={quality} />
      <Water />
      <Shores />
      <Duomo position={[-17, 0, -22]} />
      <Galleria position={[-14.5, 0, -2]} />
      <Cypresses quality={quality} />
      <QuayLamps />
      <Mosque position={[36, 0, -30]} />
      <Galata position={[31, 0, -52]} />
      <Houses quality={quality} />
      <Bridge />
      <OliveLeaves quality={quality} reducedMotion={reducedMotion} />
      <Embers quality={quality} />
      <Wordmark word={word} reducedMotion={reducedMotion} />
      <ReadySignal />
    </>
  );
}
