"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import ConsultationModal from "@/components/UI/ConsultationModal";
import type { Locale } from "@/lib/translations";

/**
 * Site-wide consultation intake.
 * Any section can call `useConsultation().open({ ... })` to launch the modal with a
 * pre-filled brief (calculator dossier, pricing tier, hero CTA, footer scheduler).
 */

export interface ConsultationPrefill {
  /** Human-readable origin shown as a chip, e.g. "Expansion dossier" */
  source?: string;
  /** Service / tier identifier forwarded with the request */
  service?: string;
  /** Pre-filled mandate brief */
  message?: string;
}

interface ConsultationContextValue {
  isOpen: boolean;
  prefill: ConsultationPrefill | null;
  open: (prefill?: ConsultationPrefill) => void;
  close: () => void;
}

const ConsultationContext = createContext<ConsultationContextValue>({
  isOpen: false,
  prefill: null,
  open: () => undefined,
  close: () => undefined,
});

export function useConsultation(): ConsultationContextValue {
  return useContext(ConsultationContext);
}

export default function ConsultationProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<ConsultationPrefill | null>(null);

  const open = useCallback((next?: ConsultationPrefill) => {
    setPrefill(next ?? null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, prefill, open, close }), [isOpen, prefill, open, close]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationModal locale={locale} isOpen={isOpen} onClose={close} prefill={prefill} />
    </ConsultationContext.Provider>
  );
}
