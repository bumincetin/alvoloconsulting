"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { setFocus, useChapterUi } from "../chapters";
import { WordReveal } from "../Reveal";
import { PeekPlate } from "../art/plates";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import type { ShoreContent } from "@/lib/content/shore";

/**
 * Chapter 00 — the split hero: an editorial reading column on the left, a numbered
 * index beneath it, the live preview window as a low right-hand counterweight,
 * and the bilingual mark hanging down the right edge. The wordmark itself stands
 * in the water behind the page (see ShoreScene → Wordmark).
 */
export default function HeroChapter({ t, sceneOff }: { t: ShoreContent; sceneOff: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { introAt } = useChapterUi();
  const { scrollTo } = useSmoothScroll();
  const revealed = introAt > 0;

  // Everything along the foot of the hero is spent the moment the walk starts.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const seq = [
      ...q(".peek").map((e) => ({ e, at: 0, span: 0.26, blur: 10, shift: false })),
      ...q(".hero-cue").map((e) => ({ e, at: 0.1, span: 0.3, blur: 0, shift: true })),
      ...q(".chip").map((e, i) => ({ e, at: 0.2 + i * 0.1, span: 0.3, blur: 0, shift: true })),
      ...q(".chapters").map((e) => ({ e, at: 0.6, span: 0.3, blur: 0, shift: false })),
      ...q(".hero-side").map((e) => ({ e, at: 0.7, span: 0.3, blur: 0, shift: false })),
    ];
    const smooth = (e0: number, e1: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
      return t * t * (3 - 2 * t);
    };
    let on = false;
    const apply = () => {
      const t = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * 0.58)));
      if (t <= 0) {
        if (!on) return;
        seq.forEach(({ e }) => {
          e.style.opacity = "";
          e.style.transform = "";
          e.style.filter = "";
          e.style.pointerEvents = "";
          e.style.transition = "";
        });
        on = false;
        return;
      }
      on = true;
      seq.forEach((o) => {
        o.e.style.transition = "none";
        const a = 1 - smooth(o.at, o.at + o.span, t);
        o.e.style.opacity = a.toFixed(3);
        if (o.shift) o.e.style.transform = `translate3d(0,${((1 - a) * 15).toFixed(1)}px,0)`;
        if (o.blur) o.e.style.filter = a > 0.999 ? "" : `blur(${((1 - a) * o.blur).toFixed(1)}px)`;
        o.e.style.pointerEvents = a < 0.05 ? "none" : "";
      });
    };
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  const jump = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollTo(href, { offset: -40 });
  };

  return (
    <section ref={root} className={clsx("hero", revealed && "rv-in")} id="hero" data-cam="0">
      <div className="hero-top">
        <div className={clsx("eyebrow", revealed && "rv-in")} data-rv="fade">
          <span className="dot" /> {t.hero.eyebrow}
        </div>
        <WordReveal as="h1" lines={t.hero.lines} className="h-hero" revealed={revealed} />
        <p className={clsx("hero-sub body", revealed && "rv-in")} data-rv="up">
          {t.hero.sub}
        </p>
      </div>

      <div className="hero-spacer" />

      <div className="hero-foot">
        <div className={clsx("hero-cue", revealed && "rv-in")} data-rv="fade">
          <span>{t.hero.cue}</span>
          <span className="track">
            <i />
          </span>
        </div>
        <div className="chapters" id="chips">
          {t.hero.chips.map((chip, i) => (
            <a
              key={chip.num}
              className={clsx("chip", revealed && "rv-in")}
              href={t.nav[i]?.href ?? "#gate"}
              data-chip={i}
              data-rv="up"
              data-cursor
              onMouseEnter={() => setFocus(i)}
              onMouseLeave={() => setFocus(-1)}
              onClick={(e) => jump(e, t.nav[i]?.href ?? "#gate")}
            >
              <span className="num">{chip.num}</span>
              <span className="tx">
                <b>{chip.title}</b>
                <p>{chip.text}</p>
              </span>
            </a>
          ))}
        </div>
      </div>

      <a className={clsx("peek", revealed && "rv-in")} href="#pathways" data-rv="fade" data-cursor aria-label={t.hero.peekCaption} onClick={(e) => jump(e, "#pathways")}>
        <span className="peek-fr">
          <PeekPlate />
        </span>
        <span className="peek-play">
          <svg viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M8 5.6 16.4 11 8 16.4z" fill="#dfe7e0" />
          </svg>
        </span>
        <span className="peek-cap">
          <b className="alt-lang">{t.hero.peekWord}</b>
          <i>{t.hero.peekCaption}</i>
        </span>
      </a>

      {sceneOff ? (
        <div className="word-fb" aria-hidden="true">
          {t.hero.word}
        </div>
      ) : null}

      <div className={clsx("hero-side", revealed && "rv-in")} data-rv="up">
        <span className="v alt-lang">{t.hero.side}</span>
      </div>
    </section>
  );
}
