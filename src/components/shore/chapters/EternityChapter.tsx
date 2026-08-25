"use client";

import { useMemo, useRef } from "react";
import { ForegroundStage, type ForegroundPiece } from "../Foreground";
import { Arrow } from "../Reveal";
import { DomeSilhouette, Hills, OliveBranch, Reeds } from "../art/cutouts";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import type { ShoreContent } from "@/lib/content/shore";

/** Chapter IV — continuity: the title hangs vertically on the right, the mark, last line and CTA run down the left. */
export default function EternityChapter({ t }: { t: ShoreContent }) {
  const ref = useRef<HTMLElement>(null);
  const { open } = useConsultation();
  const pieces = useMemo<ForegroundPiece[]>(
    () => [
      { key: "hills", enter: "up", style: { left: "-8%", width: "min(150vh,116%)", bottom: "calc(-1 * min(20vh,15.5vw))" }, node: <Hills /> },
      { key: "domes", enter: "left", style: { left: "-4%", bottom: "-18px", width: "clamp(300px,34vw,620px)" }, node: <DomeSilhouette /> },
      { key: "reeds", enter: "up", style: { right: "-7%", bottom: "-56px", width: "clamp(300px,36vw,660px)" }, node: <Reeds seed={29} /> },
      { key: "olive", enter: "left", className: "fg-el--sway", style: { left: "-14%", bottom: "-60px", width: "clamp(280px,32vw,560px)" }, node: <OliveBranch seed={12} /> },
    ],
    [],
  );
  return (
    <section ref={ref} className="sec fin" id="eternity" data-cam="4">
      <ForegroundStage id="eternity" sectionRef={ref} pieces={pieces} />
      <div className="eyebrow" data-rv="fade">
        {t.eternity.eyebrow}
      </div>
      <h2 className="display" data-rv="up">
        {t.eternity.word}
      </h2>
      <p className="body-lg" data-rv="up">
        {t.eternity.body}
      </p>
      <button type="button" className="cta" data-rv="fade" data-cursor onClick={() => open({ source: t.eternity.cta, service: "enterprise" })}>
        <i />
        <span>{t.eternity.cta}</span>
        <Arrow className="cta-ar" />
      </button>
    </section>
  );
}
