"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  label?: string;
};

export default function MagneticButton({ label = "INITIALIZE PROTOCOL" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const deltaX = event.clientX - rect.left - rect.width / 2;
    const deltaY = event.clientY - rect.top - rect.height / 2;
    x.set(deltaX * 0.35);
    y.set(deltaY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      className="relative inline-flex items-center justify-center gap-3 rounded-full border border-tungsten-grey/80 bg-obsidian-plate/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-electric-platinum shadow-[0_0_30px_rgba(46,46,94,0.25)] backdrop-blur transition hover:border-holographic-cyan/80 hover:text-electric-platinum hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]"
    >
      <span className="h-2 w-2 rounded-full bg-holographic-cyan shadow-[0_0_12px_rgba(0,240,255,0.6)]" />
      {label}
    </motion.button>
  );
}
