"use client";

import { useEffect, useState } from "react";

/** Film grain + vignette passes over the whole frame (Kage's `#grain` / `#vignette`). */
export default function Grain() {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const S = 180;
    const c = document.createElement("canvas");
    c.width = S;
    c.height = S;
    const x = c.getContext("2d");
    if (!x) return;
    const im = x.createImageData(S, S);
    const d = im.data;
    let a = 9;
    for (let i = 0; i < S * S; i++) {
      a = (a * 16807) % 2147483647;
      const v = 110 + (a / 2147483647) * 90;
      d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = v;
      d[i * 4 + 3] = 255;
    }
    x.putImageData(im, 0, 0);
    setUrl(c.toDataURL("image/png"));
  }, []);
  return (
    <>
      <div id="vignette" aria-hidden="true" />
      <div id="grain" aria-hidden="true" style={url ? { backgroundImage: `url(${url})` } : undefined} />
    </>
  );
}
