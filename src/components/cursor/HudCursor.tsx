"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

/**
 * Precision HUD cursor.
 *
 * Two layers follow the pointer at different latencies:
 *  - `fast`  : the centre dot + live coordinate readout (near-instant)
 *  - `slow`  : the reticle ring + crosshair ticks (inertial lag)
 *
 * Interaction states are inferred from the DOM under the pointer:
 *  - `[data-cursor="magnetic"]` — ring morphs onto the element bounds and the element
 *    itself is pulled toward the pointer (magnetic snap).
 *  - generic interactive elements (a, button, [role=button], summary, label) — ring expands.
 *  - text inputs — the HUD fades so the native caret can take over.
 *
 * Non-DOM surfaces (the WebGL canvas) can drive the cursor through `setHudCursor()`.
 * The component is only mounted by SmoothScrollProvider on fine-pointer devices without
 * `prefers-reduced-motion`, so it never affects touch or accessibility users.
 */

export type HudCursorMode = "default" | "target" | "hidden";

export interface HudCursorDetail {
  mode: HudCursorMode;
  label?: string;
}

export const HUD_CURSOR_EVENT = "alvolo:hud-cursor";

export function setHudCursor(detail: HudCursorDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<HudCursorDetail>(HUD_CURSOR_EVENT, { detail }));
}

const INTERACTIVE_SELECTOR = 'a,button,[role="button"],[role="tab"],summary,label,[data-cursor="hover"]';
const MAGNETIC_SELECTOR = '[data-cursor="magnetic"]';
const TEXT_SELECTOR = "input,textarea,select,[contenteditable]";

const RING_SIZE = 40;
const MAGNET_PADDING = 10;
const MAGNET_PULL = 0.22;
const MAGNET_MAX_WIDTH = 420;
const MAGNET_MAX_HEIGHT = 160;

function pad(n: number): string {
  return String(Math.max(0, Math.round(n))).padStart(4, "0");
}

export default function HudCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fastRef = useRef<HTMLDivElement>(null);
  const slowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fast = fastRef.current;
    const slow = slowRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const ticks = ticksRef.current;
    const readout = readoutRef.current;
    const label = labelRef.current;
    if (!root || !fast || !slow || !ring || !dot || !ticks || !readout || !label) return;

    document.documentElement.classList.add("hud-cursor-active");

    gsap.set([fast, slow], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(root, { autoAlpha: 0 });
    gsap.set(ring, { width: RING_SIZE, height: RING_SIZE, borderRadius: 999 });
    gsap.set(ticks, { autoAlpha: 0, scale: 0.6 });
    gsap.set(label, { autoAlpha: 0, y: 4 });

    const fastX = gsap.quickTo(fast, "x", { duration: 0.09, ease: "power3.out" });
    const fastY = gsap.quickTo(fast, "y", { duration: 0.09, ease: "power3.out" });
    const slowX = gsap.quickTo(slow, "x", { duration: 0.32, ease: "power3.out" });
    const slowY = gsap.quickTo(slow, "y", { duration: 0.32, ease: "power3.out" });

    let magnetEl: HTMLElement | null = null;
    let hoverEl: Element | null = null;
    let overText = false;
    let externalMode: HudCursorMode = "default";
    let visible = false;
    let pressed = false;

    const showRoot = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { autoAlpha: 1, duration: 0.3, overwrite: true });
    };
    const hideRoot = () => {
      visible = false;
      gsap.to(root, { autoAlpha: 0, duration: 0.3, overwrite: true });
    };

    const applyRingState = () => {
      if (magnetEl) return; // magnetic state owns the ring geometry
      const hovering = !!hoverEl;
      const targeting = externalMode === "target";
      gsap.to(ring, {
        width: targeting ? RING_SIZE * 1.3 : hovering ? RING_SIZE * 1.6 : RING_SIZE,
        height: targeting ? RING_SIZE * 1.3 : hovering ? RING_SIZE * 1.6 : RING_SIZE,
        borderRadius: 999,
        borderColor: targeting ? "rgba(0,229,153,0.9)" : hovering ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
        backgroundColor: hovering && !targeting ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: pressed ? 2.2 : hovering ? 0 : targeting ? 0.6 : 1,
        duration: 0.25,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(readout, { autoAlpha: hovering ? 0 : 1, duration: 0.2, overwrite: "auto" });
      gsap.to(ticks, {
        autoAlpha: targeting ? 1 : 0,
        scale: targeting ? 1 : 0.6,
        rotate: targeting ? 0 : 45,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const setLabel = (text: string | undefined) => {
      if (text) {
        label.textContent = text;
        gsap.to(label, { autoAlpha: 1, y: 0, duration: 0.3, overwrite: "auto" });
      } else {
        gsap.to(label, { autoAlpha: 0, y: 4, duration: 0.2, overwrite: "auto" });
      }
    };

    const releaseMagnet = () => {
      if (!magnetEl) return;
      const el = magnetEl;
      magnetEl = null;
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: "auto", clearProps: "transform" });
      gsap.set(slow, { xPercent: -50, yPercent: -50 });
      applyRingState();
    };

    const engageMagnet = (el: HTMLElement, mx: number, my: number) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const radius = parseFloat(getComputedStyle(el).borderRadius) || 12;

      // Ring morphs onto the element footprint
      gsap.to(ring, {
        width: rect.width + MAGNET_PADDING,
        height: rect.height + MAGNET_PADDING,
        borderRadius: Math.min(radius + MAGNET_PADDING / 2, (rect.height + MAGNET_PADDING) / 2),
        borderColor: "rgba(255,255,255,0.9)",
        backgroundColor: "rgba(255,255,255,0)",
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot, { scale: 0, duration: 0.2, overwrite: "auto" });
      gsap.to(ticks, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
      gsap.to(readout, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });

      // Ring centre snaps to the element centre with a subtle pull toward the pointer
      const pullX = (mx - cx) * MAGNET_PULL;
      const pullY = (my - cy) * MAGNET_PULL;
      slowX(cx + pullX * 0.5);
      slowY(cy + pullY * 0.5);
      gsap.to(el, { x: pullX, y: pullY, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const { clientX: x, clientY: y } = e;
      showRoot();
      fastX(x);
      fastY(y);
      readout.textContent = `X ${pad(x)}  Y ${pad(y)}`;

      const target = e.target instanceof Element ? e.target : null;
      let nextMagnet = (target?.closest(MAGNETIC_SELECTOR) as HTMLElement | null) ?? null;
      // Large surfaces (cards, slabs) get the hover state instead of a ring morph — a 500px reticle reads as a glitch.
      if (nextMagnet) {
        const r = nextMagnet.getBoundingClientRect();
        if (r.width > MAGNET_MAX_WIDTH || r.height > MAGNET_MAX_HEIGHT) nextMagnet = null;
      }
      const nextText = !!target?.closest(TEXT_SELECTOR);
      const nextHover = nextMagnet ? null : (target?.closest(`${INTERACTIVE_SELECTOR},${MAGNETIC_SELECTOR}`) ?? null);

      if (nextText !== overText) {
        overText = nextText;
        gsap.to(root, { autoAlpha: overText ? 0.15 : 1, duration: 0.25, overwrite: "auto" });
      }

      if (nextMagnet !== magnetEl) {
        releaseMagnet();
        if (nextMagnet) {
          magnetEl = nextMagnet;
          engageMagnet(nextMagnet, x, y);
        }
      } else if (magnetEl) {
        engageMagnet(magnetEl, x, y);
      }

      if (!magnetEl) {
        slowX(x);
        slowY(y);
      }

      if (nextHover !== hoverEl) {
        hoverEl = nextHover;
        const hoverLabel = (hoverEl as HTMLElement | null)?.dataset?.cursorLabel;
        if (hoverLabel) setLabel(hoverLabel);
        else if (externalMode !== "target") setLabel(undefined);
        applyRingState();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pressed = true;
      gsap.to(dot, { scale: 2.2, duration: 0.15, overwrite: "auto" });
      if (!magnetEl) gsap.to(ring, { scale: 0.86, duration: 0.15, overwrite: "auto" });
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pressed = false;
      gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      applyRingState();
    };

    const onLeaveWindow = (e: MouseEvent) => {
      if (e.relatedTarget === null) hideRoot();
    };
    const onEnterWindow = () => showRoot();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") hideRoot();
    };

    const onExternal = (e: Event) => {
      const detail = (e as CustomEvent<HudCursorDetail>).detail;
      externalMode = detail.mode;
      if (detail.mode === "hidden") {
        hideRoot();
        return;
      }
      showRoot();
      setLabel(detail.mode === "target" ? detail.label : undefined);
      applyRingState();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseout", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener(HUD_CURSOR_EVENT, onExternal);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseout", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener(HUD_CURSOR_EVENT, onExternal);
      releaseMagnet();
      gsap.killTweensOf([root, fast, slow, ring, dot, ticks, label, readout]);
      document.documentElement.classList.remove("hud-cursor-active");
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="hud-cursor pointer-events-none fixed inset-0 z-[95]">
      {/* Slow layer: reticle ring + crosshair ticks */}
      <div ref={slowRef} className="absolute left-0 top-0 will-change-transform">
        <div className="relative flex items-center justify-center">
          <div ref={ringRef} className="border border-white/45 mix-blend-difference" style={{ boxSizing: "border-box" }} />
          <div ref={ticksRef} className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="absolute left-1/2 top-[-9px] h-2 w-px -translate-x-1/2 bg-emerald" />
            <span className="absolute left-1/2 bottom-[-9px] h-2 w-px -translate-x-1/2 bg-emerald" />
            <span className="absolute top-1/2 left-[-9px] h-px w-2 -translate-y-1/2 bg-emerald" />
            <span className="absolute top-1/2 right-[-9px] h-px w-2 -translate-y-1/2 bg-emerald" />
          </div>
          <span
            ref={labelRef}
            className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-sm border border-white/10 bg-obsidian/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-emerald backdrop-blur-sm"
          />
        </div>
      </div>
      {/* Fast layer: centre dot + telemetry readout */}
      <div ref={fastRef} className="absolute left-0 top-0 will-change-transform">
        <div ref={dotRef} className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference" />
        <span
          ref={readoutRef}
          className="absolute left-4 top-3 whitespace-pre font-mono text-[9px] tracking-[0.22em] text-white/40"
        >
          X 0000  Y 0000
        </span>
      </div>
    </div>
  );
}
