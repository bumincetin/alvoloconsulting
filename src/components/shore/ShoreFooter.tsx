"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { BrandMark } from "./ShoreNav";
import { ForegroundStage, type ForegroundPiece } from "./Foreground";
import { Caique, Reeds } from "./art/cutouts";
import { useReveals, Mark } from "./Reveal";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { CONTACT } from "@/lib/content/footer";
import { shoreContent } from "@/lib/content/shore";
import type { Locale } from "@/lib/translations";

/** The colophon — manifesto statement, ruled index, base line. Chapter 5 of the walk. */
export default function ShoreFooter({ locale }: { locale: Locale }) {
  const t = shoreContent[locale];
  const ref = useRef<HTMLElement>(null);
  const { open } = useConsultation();
  useReveals(ref);

  const pieces = useMemo<ForegroundPiece[]>(
    () => [
      { key: "reeds", enter: "up", style: { left: "-6%", bottom: "-70px", width: "clamp(260px,30vw,520px)" }, node: <Reeds seed={31} /> },
      { key: "caique", enter: "up", style: { right: "-6%", bottom: "-96px", width: "clamp(180px,22vw,360px)" }, node: <Caique /> },
    ],
    [],
  );

  const href = (h: string) => (h.startsWith("#") ? `/${locale}/${h}` : `/${locale}${h}`);

  return (
    <footer ref={ref} className="foot" data-cam="5" id="contact">
      <ForegroundStage id="foot" sectionRef={ref} pieces={pieces} />
      <div className="foot-grid">
        <div className="foot-brand" data-rv="fade">
          <BrandMark size={54} />
          <p>{t.footer.statement}</p>
        </div>
        {t.footer.columns.map((col) => (
          <div key={col.title} data-rv="up">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)} data-cursor>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="foot-contact" data-rv="up">
        <a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer" data-cursor>
          WhatsApp · {CONTACT.whatsappDisplay}
        </a>
        <a href={`mailto:${CONTACT.email}`} data-cursor>
          {CONTACT.email}
        </a>
        <button type="button" className="cta cta--sm" data-cursor onClick={() => open({ source: t.eternity.cta })}>
          <i />
          <span>{t.eternity.cta}</span>
        </button>
      </div>
      <div className="foot-base">
        <span>{t.footer.copyright}</span>
        <span className="alt-lang foot-motto">
          <Mark kind="tr" />
          {t.footer.motto}
          <Mark kind="it" />
        </span>
        <span>{t.footer.colophon}</span>
      </div>
    </footer>
  );
}
