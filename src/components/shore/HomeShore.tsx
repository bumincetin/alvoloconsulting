"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import clsx from "clsx";
import { measureChapters, wireChapters } from "./chapters";
import { useReveals } from "./Reveal";
import Preloader from "./Preloader";
import Rail from "./Rail";
import HeroChapter from "./chapters/HeroChapter";
import GateChapter from "./chapters/GateChapter";
import PathwaysChapter from "./chapters/PathwaysChapter";
import LessonsChapter from "./chapters/LessonsChapter";
import EternityChapter from "./chapters/EternityChapter";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { shoreContent } from "@/lib/content/shore";
import type { Locale } from "@/lib/translations";

type ShoreCanvasComponent = ComponentType<import("./ShoreCanvas").ShoreCanvasProps>;

/**
 * The home walk. The WebGL strait is fixed behind the page and loaded through a
 * plain `import()` inside an effect — never `next/dynamic`, which
 * @cloudflare/next-on-pages cannot bundle for ssr:false chunks on edge routes.
 */
export default function HomeShore({ locale }: { locale: Locale }) {
  const t = shoreContent[locale];
  const root = useRef<HTMLDivElement>(null);
  const { reducedMotion, finePointer } = useSmoothScroll();
  const [Canvas, setCanvas] = useState<ShoreCanvasComponent | null>(null);
  const [sceneOff, setSceneOff] = useState(false);
  const [quality, setQuality] = useState<"high" | "low">("low");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setQuality(mq.matches && (finePointer || window.innerWidth > 1200) ? "high" : "low");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [finePointer]);

  useEffect(() => {
    let alive = true;
    import("./ShoreCanvas").then(
      (mod) => {
        if (alive) setCanvas(() => mod.default);
      },
      () => {
        if (alive) setSceneOff(true);
      },
    );
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => wireChapters(), []);
  useEffect(() => {
    if (Canvas) measureChapters();
  }, [Canvas]);
  useReveals(root, "#hero");

  useEffect(() => {
    document.documentElement.classList.toggle("no-webgl", sceneOff);
    return () => document.documentElement.classList.remove("no-webgl");
  }, [sceneOff]);

  return (
    <div ref={root} className={clsx("shore", sceneOff && "shore--still")}>
      <Preloader locale={locale} reducedMotion={reducedMotion} />
      {Canvas && !sceneOff ? <Canvas quality={quality} reducedMotion={reducedMotion} word={t.hero.word} onFallback={() => setSceneOff(true)} /> : null}
      <div className="page" id="top">
        <HeroChapter t={t} sceneOff={sceneOff} />
        <GateChapter t={t} />
        <PathwaysChapter t={t} locale={locale} />
        <LessonsChapter t={t} />
        <EternityChapter t={t} />
      </div>
      <Rail names={t.rail} />
    </div>
  );
}
