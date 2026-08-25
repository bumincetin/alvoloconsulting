"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { BrandMark } from "./ShoreNav";
import { markIntro, useChapterUi } from "./chapters";
import { shoreContent } from "@/lib/content/shore";
import type { Locale } from "@/lib/translations";

/**
 * "Raising the two shores" — holds the frame until the scene has drawn its
 * first frame (or 3.5 s, whichever is first), then hands off to the intro.
 */
export default function Preloader({ locale, reducedMotion }: { locale: Locale; reducedMotion: boolean }) {
  const t = shoreContent[locale];
  const { sceneReady } = useChapterUi();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (done) return;
    document.body.classList.add("is-locked");
    if (startRef.current === null) startRef.current = performance.now();
    const start = startRef.current;
    const minHold = reducedMotion ? 300 : 1100;
    let raf = 0;
    let timer = 0;
    let finished = false;
    const tick = () => {
      const el = performance.now() - start;
      const base = Math.min(0.92, el / 2600);
      const target = sceneReady ? 1 : base;
      setPct((p) => Math.max(p, Math.round(target * 100)));
      const ready = (sceneReady && el > minHold) || el > 3500;
      if (ready && !finished) {
        finished = true;
        setPct(100);
        timer = window.setTimeout(() => {
          setDone(true);
          document.body.classList.remove("is-locked");
          markIntro();
        }, 180);
        return;
      }
      if (!finished) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.body.classList.remove("is-locked");
    };
  }, [sceneReady, reducedMotion, done]);

  return (
    <div id="pre" className={clsx(done && "done")} aria-hidden={done}>
      <div className="pre-in">
        <div className="pre-mark">
          <BrandMark size={44} />
        </div>
        <div className="pre-jp">{t.preloader.mark}</div>
        <div className="pre-bar">
          <i style={{ right: `${100 - pct}%` }} />
        </div>
        <div className="pre-meta">
          <span>{t.preloader.line}</span>
          <b>{pct}%</b>
        </div>
      </div>
    </div>
  );
}
