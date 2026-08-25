/**
 * Single GSAP entry point.
 *
 * Every animation module imports `gsap`, `ScrollTrigger` and `Flip` from here so that
 * plugin registration happens exactly once and tree-shaking stays predictable.
 * The registration is guarded for SSR — GSAP itself is isomorphic, but plugins that
 * touch `window` on registration are only wired up in the browser.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

export function ensureGsap(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
    gsap.defaults({ ease: "power3.out", duration: 0.9, overwrite: "auto" });
    registered = true;
  }
  return gsap;
}

if (typeof window !== "undefined") {
  ensureGsap();
}

/** Curated easing vocabulary shared across sections. */
export const EASE = {
  out: "power4.out",
  inOut: "power3.inOut",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.55)",
} as const;

/** Framer-motion compatible cubic-bezier equivalents of the GSAP eases above. */
export const BEZIER = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
} as const;

export { gsap, ScrollTrigger, Flip };
