"use client";

import Link from "next/link";
import { useMemo, useRef, type CSSProperties } from "react";
import { ForegroundStage, type ForegroundPiece } from "../Foreground";
import { Arrow, SectionHead } from "../Reveal";
import { OliveBranch, Reeds, StreetLamp } from "../art/cutouts";
import { IstanbulPlate, MilanPlate, RomePlate } from "../art/plates";
import type { Locale } from "@/lib/translations";
import type { ShoreContent } from "@/lib/content/shore";

const PLATES = { milan: MilanPlate, istanbul: IstanbulPlate, rome: RomePlate } as const;

const GLOWS: Record<"milan" | "istanbul" | "rome", CSSProperties> = {
  milan: { "--gx": "75%", "--gy": "22%", "--gr": "22%", "--gt": "6.1s", "--gt2": "9.7s", "--gc1": "rgba(255,226,160,.5)", "--gc2": "rgba(212,170,80,.22)" } as CSSProperties,
  istanbul: { "--gx": "24%", "--gy": "19%", "--gr": "16%", "--gt": "3.7s", "--gt2": "5.3s", "--gc1": "rgba(255,198,124,.6)", "--gc2": "rgba(226,140,60,.28)" } as CSSProperties,
  rome: { "--gx": "52%", "--gy": "18%", "--gr": "20%", "--gt": "7.3s", "--gt2": "11.2s", "--gc1": "rgba(255,224,170,.5)", "--gc2": "rgba(200,150,60,.22)" } as CSSProperties,
};

/** Chapter II — the corridors as a mosaic: one immersive plate beside two stacked ones. */
export default function PathwaysChapter({ t, locale }: { t: ShoreContent; locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const pieces = useMemo<ForegroundPiece[]>(
    () => [
      { key: "olive-l", enter: "left", className: "fg-el--sway", style: { left: "-6%", bottom: "-70px", width: "clamp(430px,48vw,860px)" }, node: <OliveBranch seed={3} /> },
      { key: "olive-r", enter: "right", className: "fg-el--sway", style: { right: "-6%", bottom: "-56px", width: "clamp(330px,36vw,640px)" }, node: <OliveBranch seed={8} flip /> },
      { key: "lamp", enter: "up", style: { left: "1%", bottom: "-40px", width: "clamp(90px,10vw,170px)" }, node: <StreetLamp /> },
      { key: "reeds", enter: "up", style: { right: "-4%", bottom: "-60px", width: "clamp(250px,30vw,520px)" }, node: <Reeds seed={17} /> },
    ],
    [],
  );
  return (
    <section ref={ref} className="sec" id="pathways" data-cam="2">
      <ForegroundStage id="pathways" sectionRef={ref} pieces={pieces} />
      <SectionHead index={t.pathways.index} label={t.pathways.label} alt={t.pathways.alt} />
      <div className="cards" id="cards">
        {t.pathways.plates.map((plate, i) => {
          const Plate = PLATES[plate.id];
          return (
            <Link key={plate.id} href={`/${locale}${plate.href}`} className="card" data-rv="up" data-view={i} data-cursor>
              <div className="card-fr">
                <Plate className="card-art" />
                <span className="card-ar">
                  <Arrow />
                </span>
                <i className={plate.id === "istanbul" ? "glow glow--flame" : "glow"} style={GLOWS[plate.id]} />
                <div className="card-lab">
                  <b>{plate.label}</b>
                  <span className="alt-lang">{plate.alt}</span>
                </div>
              </div>
              <div className="card-meta">
                <span>{plate.meta}</span>
                <span>{plate.index}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
