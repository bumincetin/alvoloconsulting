"use client";

import { Component, Suspense, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import TradeGlobe, { type TradeGlobeProps } from "./TradeGlobe";
import GlobeFallback from "./GlobeFallback";

/** Keeps the default camera in sync with the responsive `cameraDistance` prop. */
function CameraRig({ distance }: { distance: number }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, distance]);
  return null;
}

/**
 * Client-only host for the Trade Globe.
 *
 * - Loaded by the Hero through `next/dynamic({ ssr: false })`, so Three.js / R3F / drei never
 *   enter the edge SSR bundle (Cloudflare worker size stays small).
 * - Pauses the render loop when the canvas leaves the viewport or the tab is hidden.
 * - `prefers-reduced-motion` renders a static frame on demand.
 * - Falls back to a CSS globe if WebGL is unavailable or the renderer throws.
 */

export interface TradeGlobeCanvasProps extends Omit<TradeGlobeProps, "reducedMotion"> {
  reducedMotion: boolean;
  className?: string;
  /** Camera distance from the globe centre — smaller values zoom into the corridor (mobile). */
  cameraDistance?: number;
}

type FrameLoop = "always" | "demand" | "never";

class CanvasErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[TradeGlobe] WebGL scene failed, using fallback.", error, info.componentStack);
    }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function TradeGlobeCanvas({
  className,
  reducedMotion,
  quality,
  cameraDistance = 4.4,
  ...sceneProps
}: TradeGlobeCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.02 });
    io.observe(host);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const frameloop: FrameLoop = !visible || !pageVisible ? "never" : reducedMotion ? "demand" : "always";

  return (
    <div ref={hostRef} className={className}>
      {webgl === false ? (
        <GlobeFallback />
      ) : (
        <CanvasErrorBoundary fallback={<GlobeFallback />}>
          <Canvas
            frameloop={frameloop}
            dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
            camera={{ position: [0, 0, cameraDistance], fov: 36, near: 0.1, far: 20 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
            resize={{ debounce: 120 }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            aria-hidden="true"
          >
            <CameraRig distance={cameraDistance} />
            <Suspense fallback={null}>
              <TradeGlobe {...sceneProps} quality={quality} reducedMotion={reducedMotion} />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
