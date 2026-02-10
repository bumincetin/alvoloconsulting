"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type ScrambleTextProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  durationMs?: number;
};

const GLYPHS = ["#", "!", "0", "1"];

export default function ScrambleText({
  text,
  as = "span",
  className,
  durationMs = 900,
}: ScrambleTextProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const revealCount = Math.floor(progress * text.length);
      const next = text
        .split("")
        .map((char, index) => {
          if (index < revealCount) return char;
          if (char === " ") return " ";
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, text, durationMs]);

  return (
    <Tag ref={ref} className={className}>
      {display || text}
    </Tag>
  );
}
