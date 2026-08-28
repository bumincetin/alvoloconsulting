"use client";

import { useMemo, useRef } from "react";
import { ForegroundStage, type ForegroundPiece } from "../Foreground";
import { SectionHead, WordReveal } from "../Reveal";
import { Caique, Minaret, Reeds } from "../art/cutouts";
import { setFocus } from "../chapters";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import type { ShoreContent } from "@/lib/content/shore";

/** Chapter III — the protocol as an atlas: a two-then-three plate grid. */
export default function LessonsChapter({ t }: { t: ShoreContent }) {
  const ref = useRef<HTMLElement>(null);
  const { open } = useConsultation();
  const pieces = useMemo<ForegroundPiece[]>(
    () => [
      { key: "minaret", enter: "right", style: { right: "-2%", bottom: "-60px", width: "clamp(110px,12vw,220px)" }, node: <Minaret /> },
      { key: "caique", enter: "up", style: { left: "-3%", bottom: "-30px", width: "clamp(220px,28vw,480px)" }, node: <Caique /> },
      { key: "reeds", enter: "up", style: { left: "26%", bottom: "-80px", width: "clamp(280px,32vw,560px)" }, node: <Reeds seed={23} /> },
    ],
    [],
  );
  return (
    <section ref={ref} className="sec" id="lessons" data-cam="3">
      <ForegroundStage id="lessons" sectionRef={ref} pieces={pieces} />
      <SectionHead index={t.lessons.index} label={t.lessons.label} alt={t.lessons.alt} mark="tr" />
      <div className="cur-head">
        <WordReveal lines={[t.lessons.heading]} className="h-sec" />
        <p className="body-lg" data-rv="up">
          {t.lessons.body}
        </p>
      </div>
      <div className="cur" id="cur">
        {t.lessons.items.map((item, i) => (
          <button
            key={item.num}
            type="button"
            className="les"
            data-les={i}
            data-cursor
            onMouseEnter={() => setFocus(i % 4)}
            onMouseLeave={() => setFocus(-1)}
            onClick={() => open({ source: `${t.lessons.label} · ${item.title}`, service: "enterprise" })}
          >
            <span className="k">{item.num}</span>
            <h3>
              {item.title}
              <em className="alt-lang">{item.alt}</em>
            </h3>
            <p>{item.text}</p>
            <span className="t">{item.time}</span>
            <i className="bar" />
          </button>
        ))}
      </div>
    </section>
  );
}
