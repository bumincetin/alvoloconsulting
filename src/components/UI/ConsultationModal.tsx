"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import type { ConsultationPrefill } from "@/components/providers/ConsultationProvider";
import ConsultationForm from "@/components/UI/ConsultationForm";
import { consultationContent } from "@/lib/content/consultation";
import { BEZIER } from "@/lib/motion/gsap";
import type { Locale } from "@/lib/translations";

interface ConsultationModalProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
  prefill: ConsultationPrefill | null;
}

/** Portal-rendered consultation intake. The form itself lives in ConsultationForm. */
export default function ConsultationModal({ locale, isOpen, onClose, prefill }: ConsultationModalProps) {
  const t = consultationContent[locale];
  const { stop, start, reducedMotion } = useSmoothScroll();
  const baseId = useId();
  const [mounted, setMounted] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Lock the document + Lenis while open; Esc closes.
  useEffect(() => {
    if (!isOpen) return;
    setOpenCount((n) => n + 1);
    stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // Keep Tab inside the dialog
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      start();
      opener?.focus?.();
    };
  }, [isOpen, onClose, stop, start]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby={`${baseId}-title`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: BEZIER.out }}
            data-lenis-prevent
            className="relative flex max-h-[92svh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-line bg-titanium shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-3xl"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald/80 to-transparent" />

            <header className="flex items-start justify-between gap-4 border-b border-line px-6 pb-5 pt-6 sm:px-8">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald/90">
                  <Lock className="h-3 w-3" strokeWidth={1.5} />
                  {t.channelLine}
                </div>
                <h2 id={`${baseId}-title`} className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-white">
                  {t.title}
                </h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{t.sub}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.close}
                data-cursor="hover"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-white/60 transition-[color,background-color,border-color] duration-300 hover:border-bone/50 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </header>

            <div data-lenis-prevent className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
              <ConsultationForm locale={locale} prefill={prefill} onDone={onClose} autoFocus resetKey={openCount} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
