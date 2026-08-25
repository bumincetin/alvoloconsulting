"use client";

import { Component, Suspense, useEffect, useState, type ErrorInfo, type ReactNode, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ShoreScene, { type ShoreQuality } from "./ShoreScene";

/**
 * Fixed full-frame host for the strait. Imported through an effect-scoped
 * `import()` (never `next/dynamic`) so Three.js stays out of the edge bundle.
 * Renders continuously while the tab is visible; drops to `demand` under
 * reduced motion.
 */

export interface ShoreCanvasProps {
  quality: ShoreQuality;
  reducedMotion: boolean;
  word: string;
  onFallback?: () => void;
}

class SceneBoundary extends Component<{ onFail?: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onFail?.();
    if (process.env.NODE_ENV !== "production") console.warn("[ShoreScene] WebGL failed", error, info.componentStack);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function ShoreCanvas({ quality, reducedMotion, word, onFallback }: ShoreCanvasProps) {
  const [visible, setVisible] = useState(true);
  // probed once — a WebGL context per render would be leaked on every parent update
  const [webgl] = useState<boolean>(() => supportsWebGL());
  const fallbackRef = useRef(onFallback);
  fallbackRef.current = onFallback;

  useEffect(() => {
    if (!webgl) fallbackRef.current?.();
  }, [webgl]);

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (webgl === false) return null;

  return (
    <SceneBoundary onFail={onFallback}>
      <Canvas
        id="gl"
        frameloop={!visible ? "never" : reducedMotion ? "demand" : "always"}
        dpr={quality === "high" ? [1, 1.6] : [1, 1.2]}
        camera={{ position: [0, 4.2, 20], fov: 36, near: 0.35, far: 220 }}
        gl={{ antialias: quality === "high", alpha: false, powerPreference: "high-performance", stencil: false }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.setClearColor("#05070a", 1);
        }}
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, background: "#05070a" }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <ShoreScene quality={quality} reducedMotion={reducedMotion} word={word} />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
}
