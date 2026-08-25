"use client";

import { useMemo, useRef } from "react";
import { ForegroundStage, type ForegroundPiece } from "../Foreground";
import { Arrow, SectionHead, WordReveal } from "../Reveal";
import { Balustrade, CypressGroup, Reeds } from "../art/cutouts";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import type { ShoreContent } from "@/lib/content/shore";

/** Chapter I — the Italian shore: title across two columns, reading column right, ruled figures band. */
export default function GateChapter({ t }: { t: ShoreContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const pieces = useMemo<ForegroundPiece[]>(
    () => [
      { key: "bal", enter: "left", style: { left: 0, bottom: "-26px", width: "clamp(430px,46vw,780px)" }, node: <Balustrade /> },
      { key: "cyp", enter: "right", style: { right: "-3%", bottom: "-30px", width: "clamp(220px,24vw,420px)" }, node: <CypressGroup seed={5} count={4} /> },
      { key: "reeds", enter: "up", style: { left: "6%", bottom: "-110px", width: "clamp(420px,58vw,1000px)" }, node: <Reeds seed={13} /> },
    ],
    [],
  );
  return (
    <section ref={ref} className="sec" id="gate" data-cam="1">
      <ForegroundStage id="gate" sectionRef={ref} pieces={pieces} />
      <SectionHead index={t.gate.index} label={t.gate.label} alt={t.gate.alt} />
      <div className="gate-grid">
        <WordReveal lines={[t.gate.heading]} className="h-sec" />
        <div className="gate-copy">
          <p className="lead" data-rv="up">
            {t.gate.lead}
          </p>
          <p className="body" data-rv="up">
            {t.gate.body}
          </p>
          <a
            className="arrowlink"
            href="#pathways"
            data-rv="fade"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#pathways", { offset: -40 });
            }}
          >
            <span>{t.gate.link}</span>
            <span className="ar">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
      <div className="gate-stats" data-rv="up">
        {t.gate.stats.map((s) => (
          <div key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
