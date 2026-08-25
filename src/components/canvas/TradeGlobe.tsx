"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Billboard, Html, Line } from "@react-three/drei";
import { ACCENT_HEX, CITIES, CITY_ORDER, CORRIDOR_ARCS, type CityId, type CorridorArc } from "@/lib/geo/cities";
import {
  GLOBE_RADIUS,
  buildArc,
  cityVector,
  fibonacciSphere,
  graticulePositions,
  orientationForFocus,
} from "@/lib/geo/arcs";
import { setHudCursor } from "@/components/cursor/HudCursor";

/**
 * Mediterranean Trade Arc — the WebGL scene rendered inside <TradeGlobeCanvas />.
 *
 * Scene graph
 *   <sway>            idle drift + pointer parallax
 *     <orient>        Euler that faces the MIL–IST corridor toward the camera
 *       Globe         obsidian sphere · graticule · data-point lattice · fresnel rim · outer halo
 *       Arcs          gradient vector arcs (drei fat lines) with a soft glow pass
 *       Pulses        instanced capital / cargo pulses travelling along each arc, with trails
 *       CityNodes     interactive nodes with pulsing reticles + HTML labels
 *
 * Every geometry/material created imperatively is disposed on unmount; declarative
 * R3F primitives are disposed by the reconciler.
 */

export type GlobeQuality = "high" | "low";

export interface TradeGlobeProps {
  activeCity: CityId | null;
  onCityHover: (id: CityId | null) => void;
  onCitySelect: (id: CityId) => void;
  quality: GlobeQuality;
  reducedMotion: boolean;
  /** Globe centre offset in world units [x, y] — lets the disc bleed off-canvas while the corridor stays in frame. */
  offset: [number, number];
  /** Geographic point rotated to face the camera; the corridor is placed relative to it. */
  focus: { lat: number; lon: number };
  /** drei Html distanceFactor for node labels — tune together with the camera distance. */
  labelScale: number;
  /** Localised city labels rendered next to each node. */
  labels: Record<CityId, string>;
}

/* ------------------------------------------------------------------ */
/* Shaders                                                              */
/* ------------------------------------------------------------------ */

const FRESNEL_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

/** Inner rim: brightest at the silhouette, fades toward the disc centre. */
const RIM_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float d = abs(dot(vNormal, vView));
    float f = pow(1.0 - d, 3.2) * uIntensity;
    gl_FragColor = vec4(uColor, f);
  }
`;

/** Outer halo on a back-face sphere: strongest against the globe edge, dissolving outward. */
const HALO_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float d = abs(dot(vNormal, vView));
    float f = pow(smoothstep(0.0, 0.62, d), 1.7) * uIntensity;
    gl_FragColor = vec4(uColor, f);
  }
`;

/* ------------------------------------------------------------------ */
/* Globe body                                                           */
/* ------------------------------------------------------------------ */

function GlobeBody({ quality }: { quality: GlobeQuality }) {
  const graticule = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(graticulePositions(GLOBE_RADIUS * 1.002, 15, quality === "high" ? 96 : 48), 3));
    return geo;
  }, [quality]);

  const lattice = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(fibonacciSphere(quality === "high" ? 1600 : 700, GLOBE_RADIUS * 1.004), 3));
    return geo;
  }, [quality]);

  useEffect(() => {
    return () => {
      graticule.dispose();
      lattice.dispose();
    };
  }, [graticule, lattice]);

  const rimUniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color("#3d7cff") }, uIntensity: { value: 0.9 } }),
    [],
  );
  const haloUniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color("#0066FF") }, uIntensity: { value: 0.2 } }),
    [],
  );

  return (
    <group>
      {/* Obsidian core */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, quality === "high" ? 96 : 48, quality === "high" ? 96 : 48]} />
        <meshStandardMaterial color="#0b0e13" roughness={0.88} metalness={0.22} />
      </mesh>

      {/* Graticule */}
      <lineSegments geometry={graticule}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.065} depthWrite={false} />
      </lineSegments>

      {/* Data-point lattice */}
      <points geometry={lattice}>
        <pointsMaterial color="#8fa8d0" size={0.0085} sizeAttenuation transparent opacity={0.38} depthWrite={false} />
      </points>

      {/* Fresnel rim on the surface */}
      <mesh scale={1.012}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={FRESNEL_VERT}
          fragmentShader={RIM_FRAG}
          uniforms={rimUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer halo */}
      <mesh scale={1.22}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={FRESNEL_VERT}
          fragmentShader={HALO_FRAG}
          uniforms={haloUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Arcs + pulses                                                        */
/* ------------------------------------------------------------------ */

interface ArcData {
  arc: CorridorArc;
  points: THREE.Vector3[];
  colors: [number, number, number][];
}

function useArcs(quality: GlobeQuality): ArcData[] {
  return useMemo(() => {
    const resolution = quality === "high" ? 160 : 90;
    return CORRIDOR_ARCS.map((arc) => {
      const curve = buildArc(cityVector(arc.from), cityVector(arc.to), arc.lift);
      const points = curve.getSpacedPoints(resolution);
      const a = new THREE.Color(arc.colors[0]);
      const b = new THREE.Color(arc.colors[1]);
      const colors = points.map((_, i) => {
        const c = a.clone().lerp(b, i / (points.length - 1));
        return [c.r, c.g, c.b] as [number, number, number];
      });
      return { arc, points, colors };
    });
  }, [quality]);
}

function Arcs({ arcs }: { arcs: ArcData[] }) {
  return (
    <group>
      {arcs.map(({ arc, points, colors }) => (
        <group key={arc.id}>
          {/* Soft glow pass */}
          <Line points={points} vertexColors={colors} lineWidth={4.5} transparent opacity={0.09} depthWrite={false} toneMapped={false} />
          {/* Crisp vector */}
          <Line points={points} vertexColors={colors} lineWidth={1.25} transparent opacity={0.9} depthWrite={false} toneMapped={false} />
        </group>
      ))}
    </group>
  );
}

const TRAIL = 4;
const TRAIL_SPACING = 0.011;

function Pulses({ arcs, quality, reducedMotion }: { arcs: ArcData[]; quality: GlobeQuality; reducedMotion: boolean }) {
  const perArc = quality === "high" ? 5 : 3;
  const count = arcs.length * perArc * TRAIL;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  // Instance colours are static: the head is white-hot, the trail carries the arc's destination colour.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const white = new THREE.Color("#ffffff");
    let i = 0;
    for (const { arc } of arcs) {
      const tint = new THREE.Color(arc.colors[1]);
      for (let p = 0; p < perArc; p++) {
        for (let k = 0; k < TRAIL; k++) {
          const c = k === 0 ? white.clone().lerp(tint, 0.35) : tint;
          mesh.setColorAt(i++, c);
        }
      }
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [arcs, perArc]);

  const sample = (points: THREE.Vector3[], t: number, out: THREE.Vector3) => {
    const f = THREE.MathUtils.clamp(t, 0, 1) * (points.length - 1);
    const i = Math.floor(f);
    const j = Math.min(i + 1, points.length - 1);
    return out.copy(points[i]).lerp(points[j], f - i);
  };

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = reducedMotion ? 4.2 : clock.elapsedTime;
    let i = 0;
    for (const { arc, points } of arcs) {
      for (let p = 0; p < perArc; p++) {
        const head = (time * arc.speed + p / perArc) % 1;
        for (let k = 0; k < TRAIL; k++) {
          const t = head - k * TRAIL_SPACING;
          if (t < 0 || t > 1) {
            dummy.scale.setScalar(0);
          } else {
            sample(points, t, tmp);
            dummy.position.copy(tmp);
            // Fade in / out at the arc ends so pulses do not pop at the nodes.
            const edge = Math.min(1, Math.min(t, 1 - t) * 10);
            dummy.scale.setScalar((1 - k / TRAIL) * edge * (k === 0 ? 1 : 0.75));
          }
          dummy.updateMatrix();
          mesh.setMatrixAt(i++, dummy.matrix);
        }
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[0.0072, 10, 10]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.95} depthWrite={false} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* City nodes                                                           */
/* ------------------------------------------------------------------ */

/** Label placement per node so the tightly packed MIL / ROM pair never collides. */
const LABEL_ANCHOR: Record<CityId, [number, number, number]> = {
  milan: [-0.022, 0.03, 0],
  rome: [0.022, -0.03, 0],
  istanbul: [0.026, 0.03, 0],
};
const LABEL_TRANSFORM: Record<CityId, string> = {
  milan: "translate(-100%, -100%)",
  rome: "translate(0, 0)",
  istanbul: "translate(0, -100%)",
};
/** Compact variant for narrow canvases: labels stack above / below their node so nothing clips at the edges. */
const LABEL_ANCHOR_COMPACT: Record<CityId, [number, number, number]> = {
  milan: [0, 0.028, 0],
  rome: [-0.012, -0.028, 0],
  istanbul: [0, -0.03, 0],
};
const LABEL_TRANSFORM_COMPACT: Record<CityId, string> = {
  milan: "translate(-50%, -100%)",
  rome: "translate(-100%, 0)",
  istanbul: "translate(-50%, 0)",
};

interface CityNodeProps {
  id: CityId;
  label: string;
  active: boolean;
  phase: number;
  reducedMotion: boolean;
  /** drei Html distanceFactor — tuned per camera distance so labels keep a constant on-screen size */
  labelScale: number;
  compact: boolean;
  onHover: (id: CityId | null) => void;
  onSelect: (id: CityId) => void;
}

function CityNode({ id, label, active, phase, reducedMotion, labelScale, compact, onHover, onSelect }: CityNodeProps) {
  const city = CITIES[id];
  const color = ACCENT_HEX[city.accent];
  const position = useMemo(() => cityVector(id, GLOBE_RADIUS * 1.006), [id]);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = reducedMotion ? 0 : clock.elapsedTime;
    const pulse = (Math.sin(t * 2.1 + phase) + 1) / 2;
    if (ringRef.current && ringMat.current) {
      ringRef.current.scale.setScalar(1 + pulse * (active ? 1.3 : 0.8));
      ringMat.current.opacity = (1 - pulse) * (active ? 0.95 : 0.5);
    }
    if (coreRef.current) {
      const target = active ? 1.6 : 1;
      const s = THREE.MathUtils.damp(coreRef.current.scale.x, target, 8, delta);
      coreRef.current.scale.setScalar(s);
    }
    if (haloRef.current) {
      const target = active ? 1 : 0.55;
      const s = THREE.MathUtils.damp(haloRef.current.scale.x, target, 8, delta);
      haloRef.current.scale.setScalar(s);
    }
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(id);
    setHudCursor({ mode: "target", label: city.code });
  };
  const handleOut = () => {
    onHover(null);
    setHudCursor({ mode: "default" });
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <group position={position}>
      {/* Generous invisible hit area */}
      <mesh onPointerOver={handleOver} onPointerOut={handleOut} onClick={handleClick}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      <Billboard follow>
        {/* Soft halo */}
        <mesh ref={haloRef}>
          <circleGeometry args={[0.042, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.16} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
        {/* Pulsing reticle */}
        <mesh ref={ringRef}>
          <ringGeometry args={[0.022, 0.025, 48]} />
          <meshBasicMaterial ref={ringMat} color={color} transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
      </Billboard>

      <Html
        position={compact ? LABEL_ANCHOR_COMPACT[id] : LABEL_ANCHOR[id]}
        distanceFactor={labelScale}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className="flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{
            color: active ? "#ffffff" : "rgba(255,255,255,0.62)",
            transition: "color 300ms",
            transform: compact ? LABEL_TRANSFORM_COMPACT[id] : LABEL_TRANSFORM[id],
          }}
        >
          <span style={{ color }}>{city.code}</span>
          <span className="text-white/25">/</span>
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene root                                                           */
/* ------------------------------------------------------------------ */

export default function TradeGlobe({
  activeCity,
  onCityHover,
  onCitySelect,
  quality,
  reducedMotion,
  offset,
  focus,
  labelScale,
  labels,
}: TradeGlobeProps) {
  const swayRef = useRef<THREE.Group>(null);
  const orientation = useMemo(() => orientationForFocus(focus.lat, focus.lon), [focus.lat, focus.lon]);
  const arcs = useArcs(quality);

  useFrame(({ clock, pointer }, delta) => {
    const sway = swayRef.current;
    if (!sway) return;
    if (reducedMotion) {
      sway.rotation.set(0, 0, 0);
      return;
    }
    const t = clock.elapsedTime;
    const targetY = Math.sin(t * 0.12) * 0.07 + pointer.x * 0.14;
    const targetX = Math.cos(t * 0.09) * 0.03 - pointer.y * 0.09;
    sway.rotation.y = THREE.MathUtils.damp(sway.rotation.y, targetY, 2.5, delta);
    sway.rotation.x = THREE.MathUtils.damp(sway.rotation.x, targetX, 2.5, delta);
  });

  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight position={[-3.5, 2.5, 4]} intensity={1.7} color="#7fb0ff" />
      <directionalLight position={[3, -1.5, -2]} intensity={0.45} color="#00e599" />
      <pointLight position={[1.6, 1.2, 2.4]} intensity={0.6} color="#d4af37" distance={6} decay={2} />

      <group ref={swayRef} position={[offset[0], offset[1], 0]}>
        <group rotation={orientation}>
          <GlobeBody quality={quality} />
          <Arcs arcs={arcs} />
          <Pulses arcs={arcs} quality={quality} reducedMotion={reducedMotion} />
          {CITY_ORDER.map((id, i) => (
            <CityNode
              key={id}
              id={id}
              label={labels[id]}
              active={activeCity === id}
              phase={i * 1.9}
              reducedMotion={reducedMotion}
              labelScale={labelScale}
              compact={quality === "low"}
              onHover={onCityHover}
              onSelect={onCitySelect}
            />
          ))}
        </group>
      </group>
    </>
  );
}
