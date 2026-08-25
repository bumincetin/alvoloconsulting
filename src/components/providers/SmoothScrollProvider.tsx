"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import HudCursor from "@/components/cursor/HudCursor";

/**
 * Global smooth-scroll + motion environment.
 *
 * - Lenis inertial scrolling (`lerp: 0.08`) driven by GSAP's ticker so ScrollTrigger,
 *   Lenis and every GSAP tween share one clock (no double-RAF drift).
 * - `ScrollTrigger.update` is bound to Lenis's scroll event; `lagSmoothing(0)` keeps
 *   pinned sections honest when the tab throttles.
 * - Touch devices keep native scrolling (far better UX + no scroll-jacking).
 * - `prefers-reduced-motion` disables Lenis and the HUD cursor entirely and is exposed via
 *   context so sections can degrade their choreography.
 * - The HUD cursor is only mounted for fine pointers.
 */

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

export interface SmoothScrollEnv {
  /** Media-query snapshot is taken on mount; false during SSR */
  ready: boolean;
  reducedMotion: boolean;
  isTouch: boolean;
  finePointer: boolean;
}

export interface SmoothScrollContextValue extends SmoothScrollEnv {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  /** Pause / resume wheel scrolling (used by modals). */
  stop: () => void;
  start: () => void;
}

const defaultEnv: SmoothScrollEnv = { ready: false, reducedMotion: false, isTouch: false, finePointer: false };

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  ...defaultEnv,
  lenis: null,
  scrollTo: () => undefined,
  stop: () => undefined,
  start: () => undefined,
});

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}

function readEnv(): SmoothScrollEnv {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return { ready: true, reducedMotion, isTouch: isTouch && !finePointer, finePointer };
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [env, setEnv] = useState<SmoothScrollEnv>(defaultEnv);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Environment detection (client only) with live media-query updates
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    const update = () => setEnv(readEnv());
    update();
    reduced.addEventListener("change", update);
    pointer.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
    };
  }, []);

  // Lenis lifecycle, bound to GSAP ticker + ScrollTrigger
  useEffect(() => {
    if (!env.ready) return;
    if (env.reducedMotion || env.isTouch) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;
    setLenis(instance);

    // Let ScrollTrigger measure once Lenis has taken over the document
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      gsap.ticker.remove(tick);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [env.ready, env.reducedMotion, env.isTouch]);

  // Route changes: reset scroll position and re-measure triggers.
  // Skipped on the initial mount so hash deep-links and reload scroll restoration keep working.
  const previousPathname = useRef<string | null>(null);
  useEffect(() => {
    const isNavigation = previousPathname.current !== null && previousPathname.current !== pathname;
    previousPathname.current = pathname;
    if (isNavigation) {
      const instance = lenisRef.current;
      if (instance) {
        instance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    }
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  // In-page anchor links route through Lenis for consistent easing
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const instance = lenisRef.current;
      if (!instance || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      e.preventDefault();
      window.history.pushState(null, "", hash);
      instance.scrollTo(el, { offset: -88, duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const scrollTo = useCallback<SmoothScrollContextValue["scrollTo"]>(
    (target, options) => {
      const instance = lenisRef.current;
      const el =
        typeof target === "string"
          ? target.startsWith("#")
            ? document.getElementById(target.slice(1))
            : (document.querySelector(target) as HTMLElement | null)
          : target;
      if (el === null) return;
      // Element targets get a header offset by default; absolute pixel targets are taken literally.
      const offset = options?.offset ?? (typeof el === "number" ? 0 : -88);
      if (instance) {
        instance.scrollTo(el, {
          offset,
          duration: options?.duration ?? 1.4,
          immediate: options?.immediate ?? false,
        });
        return;
      }
      const behavior = (env.reducedMotion || options?.immediate ? "instant" : "smooth") as ScrollBehavior;
      if (typeof el === "number") {
        window.scrollTo({ top: el + offset, behavior });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
      }
    },
    [env.reducedMotion],
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({ ...env, lenis, scrollTo, stop, start }),
    [env, lenis, scrollTo, stop, start],
  );

  const showCursor = env.ready && env.finePointer && !env.isTouch && !env.reducedMotion;

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
      {showCursor ? <HudCursor /> : null}
    </SmoothScrollContext.Provider>
  );
}
