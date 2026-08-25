"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import clsx from "clsx";
import type { ConsultationPrefill } from "@/components/providers/ConsultationProvider";
import { consultationContent } from "@/lib/content/consultation";
import { CONTACT } from "@/lib/content/footer";
import type { Locale } from "@/lib/translations";

type Step = "form" | "sending" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border border-line bg-obsidian/70 px-4 py-3 text-[14px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-emerald/70 focus:ring-1 focus:ring-emerald/40";

interface ConsultationFormProps {
  locale: Locale;
  prefill?: ConsultationPrefill | null;
  /** Called from the success screen's primary action (modal: close). */
  onDone?: () => void;
  /** Focus the first field on mount (modal). */
  autoFocus?: boolean;
  /** Reset the form whenever this key changes (modal open cycles). */
  resetKey?: number | string;
}

/**
 * Consultation intake form — posts to /api/contact (Resend).
 * Used inline on the contact page and inside ConsultationModal.
 */
export default function ConsultationForm({ locale, prefill, onDone, autoFocus = false, resetKey }: ConsultationFormProps) {
  const t = consultationContent[locale];
  const baseId = useId();
  const nameRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(prefill?.message ?? "");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const prefillMessage = prefill?.message ?? "";

  // Reset only when the host explicitly cycles `resetKey` (modal re-open) or the pre-filled brief changes —
  // never on incidental parent re-renders (the contact page re-renders every clock tick).
  useEffect(() => {
    setStep("form");
    setErrors({});
    setConsent(false);
    setHoneypot("");
    setMessage(prefillMessage);
  }, [resetKey, prefillMessage]);

  useEffect(() => {
    if (!autoFocus) return;
    const id = window.setTimeout(() => nameRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [autoFocus, resetKey]);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = t.required;
    if (!email.trim()) next.email = t.required;
    else if (!EMAIL_RE.test(email)) next.email = t.invalidEmail;
    if (!message.trim()) next.message = t.required;
    if (!consent) next.consent = t.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setStep("success");
      return;
    }
    if (!validate()) return;
    setStep("sending");

    const composed = [
      prefill?.service ? `[Service] ${prefill.service}` : null,
      prefill?.source ? `[Source] ${prefill.source}` : null,
      company.trim() ? `[Company] ${company.trim()}` : null,
      `[Locale] ${locale}`,
      "",
      message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: composed, privacyConsent: true, marketingConsent: false }),
      });
      setStep(res.ok ? "success" : "error");
    } catch {
      setStep("error");
    }
  };

  const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message || "")}`;

  if (step === "success") {
    return (
      <div className="flex flex-col items-center py-10 text-center" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald/40 bg-emerald/10 text-emerald">
          <Check className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold text-white">{t.successTitle}</h3>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-white/60">{t.successBody}</p>
        <button
          type="button"
          onClick={() => (onDone ? onDone() : setStep("form"))}
          className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald"
        >
          {t.close}
        </button>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="flex flex-col items-center py-10 text-center" role="alert">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
          <RotateCcw className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold text-white">{t.errorTitle}</h3>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-white/60">{t.errorBody}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => setStep("form")} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald">
            {t.retry}
          </button>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full border border-line px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.06]">
            WhatsApp · {CONTACT.whatsappDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {prefill?.source ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-azure/40 bg-azure/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
          <span className="text-white/45">{t.prefillLabel}</span>
          <span className="text-azure">{prefill.source}</span>
        </div>
      ) : null}

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${baseId}-website`}>Website</label>
        <input id={`${baseId}-website`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${baseId}-name`} label={t.name} error={errors.name}>
          <input ref={nameRef} id={`${baseId}-name`} type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={clsx(inputClass, errors.name && "border-gold/70")} />
        </Field>
        <Field id={`${baseId}-email`} label={t.email} error={errors.email}>
          <input id={`${baseId}-email`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={clsx(inputClass, errors.email && "border-gold/70")} />
        </Field>
      </div>

      <Field id={`${baseId}-company`} label={t.company} hint={t.companyOptional}>
        <input id={`${baseId}-company`} type="text" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
      </Field>

      <Field id={`${baseId}-message`} label={t.message} error={errors.message}>
        <textarea
          id={`${baseId}-message`}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          className={clsx(inputClass, "min-h-[9rem] resize-y font-mono text-[12.5px] leading-relaxed", errors.message && "border-gold/70")}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-3 text-[12.5px] leading-relaxed text-white/60">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#00E599]" />
        <span>
          {t.consent}
          {errors.consent ? <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{errors.consent}</span> : null}
        </span>
      </label>

      <button
        type="submit"
        disabled={step === "sending"}
        data-cursor="magnetic"
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-titanium"
      >
        {step === "sending" ? t.sending : t.submit}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
      </button>
    </form>
  );
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
        <span>
          {label}
          {hint ? <span className="ml-2 normal-case tracking-normal text-white/30">({hint})</span> : null}
        </span>
        {error ? <span className="text-gold">{error}</span> : null}
      </label>
      {children}
    </div>
  );
}
