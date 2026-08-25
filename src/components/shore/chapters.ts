"use client";

import { useSyncExternalStore } from "react";

/**
 * Scroll ↔ chapter store shared by the DOM page and the WebGL rig.
 *
 * Sections carrying `data-cam="n"` are the waypoints. Progress is a float in
 * [0, N-1]: the first section anchors at scroll 0, the last at the maximum
 * scroll, the rest when their centre crosses the viewport centre — the same
 * contract as the Kage reference. The rig damps this value; the DOM reads the
 * rounded value for the nav / rail.
 */

export interface ChapterState {
  progress: number;
  active: number;
  count: number;
  /** normalised pointer, -1..1, +y up */
  pointerX: number;
  pointerY: number;
  /** performance.now() at which the intro dolly started (0 = not started) */
  introAt: number;
  /** hovered chapter index for the scene's "focus" warmth, -1 = none */
  focus: number;
  /** the scene has produced its first frame */
  sceneReady: boolean;
}

type Listener = () => void;

const state: ChapterState = {
  progress: 0,
  active: 0,
  count: 1,
  pointerX: 0,
  pointerY: 0,
  introAt: 0,
  focus: -1,
  sceneReady: false,
};

let anchors: number[] = [0];
let sections: HTMLElement[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeChapters(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getChapterState(): ChapterState {
  return state;
}

/** Read-only mutable access for the render loop (no React re-render). */
export const chapterState = state;

export function setPointer(x: number, y: number): void {
  state.pointerX = x;
  state.pointerY = y;
}

export function setFocus(index: number): void {
  if (state.focus === index) return;
  state.focus = index;
}

export function markIntro(): void {
  if (!state.introAt) {
    state.introAt = performance.now();
    emit();
  }
}

export function markSceneReady(): void {
  if (!state.sceneReady) {
    state.sceneReady = true;
    emit();
  }
}

function vpH(): number {
  return document.documentElement.clientHeight || window.innerHeight;
}

export function measureChapters(): void {
  sections = Array.from(document.querySelectorAll<HTMLElement>("[data-cam]"));
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - vpH());
  anchors = sections.map((el, i) => {
    if (i === 0) return 0;
    if (i === sections.length - 1) return maxScroll;
    return Math.min(maxScroll, Math.max(0, el.offsetTop + el.offsetHeight * 0.5 - vpH() * 0.5));
  });
  for (let i = 1; i < anchors.length; i++) anchors[i] = Math.max(anchors[i], anchors[i - 1] + 1);
  const count = Math.max(1, sections.length);
  if (count !== state.count) {
    state.count = count;
    emit();
  }
  updateProgress();
}

export function anchorFor(index: number): number {
  return anchors[Math.min(anchors.length - 1, Math.max(0, index))] ?? 0;
}

function progressFor(y: number): number {
  if (anchors.length < 2 || y <= anchors[0]) return 0;
  for (let i = 0; i < anchors.length - 1; i++) {
    if (y <= anchors[i + 1]) return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
  }
  return anchors.length - 1;
}

export function updateProgress(): void {
  const y = window.scrollY;
  state.progress = progressFor(y);
  const active = Math.round(state.progress);
  if (active !== state.active) {
    state.active = active;
    emit();
  }
}

/** Snapshot for React consumers — only the fields that should re-render UI. */
export function useChapterUi(): { active: number; count: number; introAt: number; sceneReady: boolean } {
  return useSyncExternalStore(
    subscribeChapters,
    () => snapshot,
    () => serverSnapshot,
  );
}

let snapshot = { active: 0, count: 1, introAt: 0, sceneReady: false };
const serverSnapshot = { active: 0, count: 1, introAt: 0, sceneReady: false };
subscribeChapters(() => {
  if (
    snapshot.active !== state.active ||
    snapshot.count !== state.count ||
    snapshot.introAt !== state.introAt ||
    snapshot.sceneReady !== state.sceneReady
  ) {
    snapshot = { active: state.active, count: state.count, introAt: state.introAt, sceneReady: state.sceneReady };
  }
});

/** Wire scroll / resize / pointer once per page. Returns a disposer. */
export function wireChapters(): () => void {
  const onScroll = () => updateProgress();
  const onResize = () => measureChapters();
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / vpH()) * 2 - 1));
  };
  measureChapters();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  const ro = new ResizeObserver(() => measureChapters());
  ro.observe(document.documentElement);
  // late layout shifts (fonts, images) — re-measure a few times after mount
  const t1 = window.setTimeout(measureChapters, 400);
  const t2 = window.setTimeout(measureChapters, 1600);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointer);
    ro.disconnect();
    window.clearTimeout(t1);
    window.clearTimeout(t2);
  };
}
