"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, RotateCcw } from "lucide-react";
import clsx from "clsx";
import type { ConsultationPrefill } from "@/components/providers/ConsultationProvider";
import { consultationContent, type ContactAs, type PreferredChannel } from "@/lib/content/consultation";
import { CONTACT } from "@/lib/content/footer";
import { locales, type Locale } from "@/lib/translations";

type Step = "form" | "sending" | "success" | "error";

type FieldKey = "name" | "email" | "company" | "phone" | "message" | "consent";

type FieldErrors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{6,24}$/;
const BRIEF_MIN = 20;
const BRIEF_SOFT_MAX = 1500;
const DRAFT_KEY = "alvolo:consult:v1";

const CONTACT_AS: ContactAs[] = ["executive", "company", "delegation"];
const CHANNELS: PreferredChannel[] = ["email", "whatsapp", "call"];

interface Draft {
  contactAs?: ContactAs;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  channel?: PreferredChannel;
  language?: Locale;
  message?: string;
}

function readDraft(): Draft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const d = parsed as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" ? v : undefined);
    return {
      contactAs: CONTACT_AS.includes(d.contactAs as ContactAs) ? (d.contactAs as ContactAs) : undefined,
      name: str(d.name),
      email: str(d.email),
      company: str(d.company),
      phone: str(d.phone),
      channel: CHANNELS.includes(d.channel as PreferredChannel) ? (d.channel as PreferredChannel) : undefined,
      language: (locales as readonly string[]).includes(d.language as string) ? (d.language as Locale) : undefined,
      message: str(d.message),
    };
  } catch {
    return null;
  }
}

function writeDraft(draft: Draft | null) {
  try {
    if (!draft) window.localStorage.removeItem(DRAFT_KEY);
    else window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* storage unavailable (private mode / quota) — draft is a convenience only */
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/* ── Kage field register ──────────────────────────────────────────────
 * Hairline field: thin full border, 2px radius, ink ground.
 * hover  → border lightens + faint bone wash
 * focus  → vermilion hairline + soft ring
 * error  → gold hairline
 */
const fieldBase =
  "w-full rounded-[2px] border bg-ink/40 px-3.5 py-3 text-[14px] font-light leading-snug text-bone placeholder:text-muted/55 outline-none " +
  "transition-[border-color,background-color,box-shadow] duration-300 ease-out " +
  "hover:border-bone/40 hover:bg-bone/[0.035] " +
  "focus:border-vermilion focus:bg-ink/60 focus:ring-2 focus:ring-vermilion/20 focus:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const fieldClass = (error?: string) => clsx(fieldBase, error ? "border-gold/80 hover:border-gold" : "border-line");

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
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("form");
  const [contactAs, setContactAs] = useState<ContactAs>("executive");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<PreferredChannel>("email");
  const [language, setLanguage] = useState<Locale>(locale);
  const [message, setMessage] = useState(prefill?.message ?? "");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [draftRestored, setDraftRestored] = useState(false);
  const [copied, setCopied] = useState(false);
  const hydrated = useRef(false);

  const prefillMessage = prefill?.message ?? "";

  // Reset only when the host explicitly cycles `resetKey` (modal re-open) or the pre-filled brief changes —
  // never on incidental parent re-renders (the contact page re-renders every clock tick).
  // A saved draft is restored here; the honeypot is never restored.
  useEffect(() => {
    setStep("form");
    setErrors({});
    setTouched({});
    setConsent(false);
    setHoneypot("");
    setCopied(false);
    const draft = readDraft();
    const hasDraft = !!draft && Object.values(draft).some((v) => typeof v === "string" && v.trim().length > 0);
    if (draft) {
      if (draft.contactAs) setContactAs(draft.contactAs);
      if (draft.name) setName(draft.name);
      if (draft.email) setEmail(draft.email);
      if (draft.company) setCompany(draft.company);
      if (draft.phone) setPhone(draft.phone);
      if (draft.channel) setChannel(draft.channel);
      if (draft.language) setLanguage(draft.language);
    }
    setMessage(prefillMessage || draft?.message || "");
    setDraftRestored(hasDraft);
    hydrated.current = true;
  }, [resetKey, prefillMessage]);

  useEffect(() => {
    if (!autoFocus) return;
    const id = window.setTimeout(() => nameRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [autoFocus, resetKey]);

  // Debounced autosave.
  useEffect(() => {
    if (!hydrated.current || step !== "form") return;
    const id = window.setTimeout(() => {
      const empty = ![name, email, company, phone, message].some((v) => v.trim().length > 0);
      writeDraft(empty ? null : { contactAs, name, email, company, phone, channel, language, message });
    }, 400);
    return () => window.clearTimeout(id);
  }, [contactAs, name, email, company, phone, channel, language, message, step]);

  const validateField = useCallback(
    (key: FieldKey): string | undefined => {
      switch (key) {
        case "name":
          return name.trim() ? undefined : t.required;
        case "email":
          if (!email.trim()) return t.required;
          return EMAIL_RE.test(email.trim()) ? undefined : t.invalidEmail;
        case "company":
          return contactAs === "company" && !company.trim() ? t.companyRequired : undefined;
        case "phone":
          return phone.trim() && !PHONE_RE.test(phone.trim()) ? t.invalidPhone : undefined;
        case "message": {
          const len = message.trim().length;
          if (len === 0) return t.required;
          if (len < BRIEF_MIN) return t.briefTooShort;
          return undefined;
        }
        case "consent":
          return consent ? undefined : t.consentRequired;
      }
    },
    [name, email, company, phone, message, consent, contactAs, t],
  );

  const blur = (key: FieldKey) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key) }));
  };

  const validateAll = (): FieldKey | null => {
    const order: FieldKey[] = ["name", "email", "company", "phone", "message", "consent"];
    const next: FieldErrors = {};
    let first: FieldKey | null = null;
    for (const key of order) {
      const err = validateField(key);
      if (err) {
        next[key] = err;
        first ??= key;
      }
    }
    setErrors(next);
    setTouched({ name: true, email: true, company: true, phone: true, message: true, consent: true });
    return first;
  };

  const focusField = (key: FieldKey) => {
    const map: Record<FieldKey, React.RefObject<HTMLElement | null>> = {
      name: nameRef,
      email: emailRef,
      company: companyRef,
      phone: phoneRef,
      message: messageRef,
      consent: consentRef,
    };
    map[key].current?.focus();
  };

  const composedBrief = useMemo(
    () =>
      [
        prefill?.service ? `[Service] ${prefill.service}` : null,
        prefill?.source ? `[Source] ${prefill.source}` : null,
        `[Locale] ${locale}`,
        "",
        message.trim(),
      ]
        .filter((line) => line !== null)
        .join("\n"),
    [prefill?.service, prefill?.source, locale, message],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step === "sending") return;
    if (honeypot) {
      setStep("success");
      return;
    }
    const firstInvalid = validateAll();
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }
    setStep("sending");

    const subject = `Consultation request · ${t.contactAsOptions[contactAs]} · ${name.trim()}`;

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "brief",
          subject,
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          phone: phone.trim() || undefined,
          channel,
          language,
          contactAs,
          message: composedBrief,
          privacyConsent: true,
          marketingConsent: false,
        }),
      });
      if (res.ok) {
        writeDraft(null);
        setStep("success");
      } else {
        setStep("error");
      }
    } catch {
      setStep("error");
    }
  };

  const clearForm = () => {
    setContactAs("executive");
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setChannel("email");
    setLanguage(locale);
    setMessage("");
    setConsent(false);
    setErrors({});
    setTouched({});
    setDraftRestored(false);
    writeDraft(null);
    nameRef.current?.focus();
  };

  const onBriefKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleCopyBrief = async () => {
    const ok = await copyText(message.trim());
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message.trim() || "")}`;

  const briefLen = message.trim().length;
  const briefTooLong = briefLen > BRIEF_SOFT_MAX;
  const isValid = (key: FieldKey, value: string) => !!touched[key] && !errors[key] && value.trim().length > 0;

  /* ── success ─────────────────────────────────────────────────────── */
  if (step === "success") {
    return (
      <div className="py-6" role="status" aria-live="polite">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-gold/60 text-gold">
            <Check className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="font-display text-xl font-normal tracking-[-0.01em] text-bone">{t.successTitle}</h3>
            <p className="mt-1.5 max-w-md text-[13.5px] font-light leading-relaxed text-bone-dim">{t.successBody}</p>
          </div>
        </div>

        <div className="mt-7 border-t border-line pt-5">
          <div className="k">{t.nextStepsTitle}</div>
          <ol className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-[13.5px] font-light leading-relaxed text-bone">
              <span className="k mt-1 w-6 shrink-0 text-vermilion">01</span>
              <span>{t.nextStepAdvisor}</span>
            </li>
            <li className="flex items-start gap-3 text-[13.5px] font-light leading-relaxed text-bone">
              <span className="k mt-1 w-6 shrink-0 text-vermilion">02</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 border-b border-line pb-px transition-colors hover:border-bone hover:text-bone focus-visible:border-vermilion focus-visible:outline-none"
              >
                {t.nextStepWhatsapp}
                <ArrowUpRight className="h-3.5 w-3.5 text-bone-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </a>
            </li>
            <li className="flex items-start gap-3 text-[13.5px] font-light leading-relaxed text-bone">
              <span className="k mt-1 w-6 shrink-0 text-vermilion">03</span>
              <button
                type="button"
                onClick={handleCopyBrief}
                data-cursor="hover"
                aria-live="polite"
                className="group inline-flex items-center gap-2 border-b border-line pb-px transition-colors hover:border-bone hover:text-bone focus-visible:border-vermilion focus-visible:outline-none"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} /> : <Copy className="h-3.5 w-3.5 text-bone-dim" strokeWidth={1.5} />}
                {copied ? t.copied : t.copyBrief}
              </button>
            </li>
          </ol>
        </div>

        <button type="button" onClick={() => (onDone ? onDone() : setStep("form"))} data-cursor="magnetic" className="cta cta--sm isolate mt-8">
          <i aria-hidden="true" />
          <span>{t.close}</span>
        </button>
      </div>
    );
  }

  /* ── error ───────────────────────────────────────────────────────── */
  if (step === "error") {
    return (
      <div className="py-6" role="alert">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-gold/60 text-gold">
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="font-display text-xl font-normal tracking-[-0.01em] text-bone">{t.errorTitle}</h3>
            <p className="mt-1.5 max-w-md text-[13.5px] font-light leading-relaxed text-bone-dim">{t.errorBody}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={() => setStep("form")} data-cursor="magnetic" className="cta cta--sm isolate">
            <i aria-hidden="true" />
            <span>{t.retry}</span>
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="k inline-flex items-center gap-2 px-2 py-3 text-bone-dim transition-colors hover:text-bone focus-visible:text-vermilion focus-visible:outline-none"
          >
            WhatsApp · {CONTACT.whatsappDisplay}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    );
  }

  /* ── form ────────────────────────────────────────────────────────── */
  const sending = step === "sending";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative space-y-6" aria-busy={sending}>
      {prefill?.source || draftRestored ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {prefill?.source ? (
            <div className="k inline-flex items-center gap-2 rounded-[2px] border border-line px-2.5 py-1.5">
              <span>{t.prefillLabel}</span>
              <b>{prefill.source}</b>
            </div>
          ) : (
            <span />
          )}
          {draftRestored ? (
            <span className="k inline-flex items-center gap-1.5 text-bone-dim" aria-live="polite">
              <Check className="h-3 w-3 text-gold" strokeWidth={1.5} />
              {t.draftRestored}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* honeypot — never restored from draft */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${baseId}-website`}>Website</label>
        <input id={`${baseId}-website`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {/* 01 — who */}
      <Segmented<ContactAs>
        id={`${baseId}-as`}
        label={t.contactAs}
        options={CONTACT_AS.map((v) => ({ value: v, label: t.contactAsOptions[v] }))}
        value={contactAs}
        onChange={(v) => {
          setContactAs(v);
          if (v !== "company" && errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
        }}
        help={t.contactAsHelp[contactAs]}
        disabled={sending}
      />

      {/* 02 — identity */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${baseId}-name`} label={t.name} error={errors.name} valid={isValid("name", name)}>
          <input
            ref={nameRef}
            id={`${baseId}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={blur("name")}
            disabled={sending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${baseId}-name-err` : undefined}
            className={fieldClass(errors.name)}
          />
        </Field>
        <Field id={`${baseId}-email`} label={t.email} error={errors.email} valid={isValid("email", email)}>
          <input
            ref={emailRef}
            id={`${baseId}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={blur("email")}
            disabled={sending}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${baseId}-email-err` : undefined}
            className={fieldClass(errors.email)}
          />
        </Field>
      </div>

      {/* 03 — organisation + reach */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${baseId}-company`} label={t.company} hint={contactAs === "company" ? undefined : t.companyOptional} error={errors.company} valid={isValid("company", company)}>
          <input
            ref={companyRef}
            id={`${baseId}-company`}
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onBlur={blur("company")}
            disabled={sending}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? `${baseId}-company-err` : undefined}
            className={fieldClass(errors.company)}
          />
        </Field>
        <Field id={`${baseId}-phone`} label={t.phone} hint={t.phoneOptional} error={errors.phone} valid={isValid("phone", phone)} foot={t.phoneHint}>
          <input
            ref={phoneRef}
            id={`${baseId}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+39 …"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={blur("phone")}
            disabled={sending}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${baseId}-phone-err` : `${baseId}-phone-foot`}
            className={fieldClass(errors.phone)}
          />
        </Field>
      </div>

      {/* 04 — preferences */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Segmented<PreferredChannel>
          id={`${baseId}-channel`}
          label={t.channel}
          options={CHANNELS.map((v) => ({ value: v, label: t.channelOptions[v] }))}
          value={channel}
          onChange={setChannel}
          disabled={sending}
        />
        <Segmented<Locale>
          id={`${baseId}-lang`}
          label={t.language}
          options={locales.map((v) => ({ value: v, label: t.languages[v] }))}
          value={language}
          onChange={setLanguage}
          disabled={sending}
        />
      </div>

      {/* 05 — brief */}
      <Field
        id={`${baseId}-message`}
        label={t.message}
        error={errors.message}
        valid={isValid("message", message)}
        foot={
          <span className="flex items-center justify-between gap-3">
            <span>{briefLen < BRIEF_MIN ? t.briefHint : briefTooLong ? t.briefTooLong : t.submitShortcut}</span>
            <span className={clsx("shrink-0 tabular-nums", briefTooLong ? "text-gold" : briefLen >= BRIEF_MIN ? "text-bone-dim" : undefined)} aria-live="polite">
              {briefLen} / {BRIEF_SOFT_MAX} {t.characters}
            </span>
          </span>
        }
      >
        <textarea
          ref={messageRef}
          id={`${baseId}-message`}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={blur("message")}
          onKeyDown={onBriefKeyDown}
          placeholder={t.messagePlaceholder}
          disabled={sending}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${baseId}-message-err` : `${baseId}-message-foot`}
          className={clsx(fieldClass(errors.message), "min-h-[9.5rem] resize-y leading-relaxed")}
        />
      </Field>

      {/* 06 — consent */}
      <div>
        <label htmlFor={`${baseId}-consent`} data-cursor="hover" className="group flex cursor-pointer items-start gap-3 text-[12.5px] font-light leading-relaxed text-bone-dim transition-colors hover:text-bone">
          <input
            ref={consentRef}
            id={`${baseId}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setTouched((prev) => ({ ...prev, consent: true }));
              setErrors((prev) => ({ ...prev, consent: e.target.checked ? undefined : prev.consent }));
            }}
            onBlur={blur("consent")}
            disabled={sending}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${baseId}-consent-err` : undefined}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={clsx(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border bg-ink/40 transition-[border-color,background-color,box-shadow] duration-300",
              "group-hover:border-bone/50 group-hover:bg-bone/[0.05]",
              "peer-focus-visible:border-vermilion peer-focus-visible:ring-2 peer-focus-visible:ring-vermilion/25",
              "peer-checked:border-vermilion peer-checked:bg-vermilion [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
              errors.consent ? "border-gold/80" : "border-line",
            )}
          >
            <Check className="h-3 w-3 text-ink transition-opacity" strokeWidth={2.25} />
          </span>
          <span>{t.consent}</span>
        </label>
        {errors.consent ? (
          <p id={`${baseId}-consent-err`} className="k mt-2 pl-7 text-gold">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/* 07 — action row */}
      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} data-cursor="magnetic" className="cta cta--sm isolate w-full justify-center sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
          <i aria-hidden="true" />
          <span>{sending ? t.sending : t.submit}</span>
          <ArrowRight className="cta-ar" strokeWidth={1.5} />
        </button>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="k hidden text-bone-dim/70 lg:inline">{t.submitShortcut}</span>
          <button
            type="button"
            onClick={clearForm}
            disabled={sending}
            data-cursor="hover"
            className="k border-b border-transparent pb-px text-bone-dim transition-colors hover:border-bone hover:text-bone focus-visible:border-vermilion focus-visible:outline-none disabled:opacity-50"
          >
            {t.clear}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ── Field ───────────────────────────────────────────────────────────── */
function Field({
  id,
  label,
  hint,
  error,
  valid,
  foot,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  valid?: boolean;
  foot?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="group/field">
      <label htmlFor={id} data-cursor="hover" className="k mb-2 flex cursor-pointer items-baseline justify-between gap-3 transition-colors group-hover/field:text-bone-dim group-focus-within/field:text-bone">
        <span className="inline-flex items-baseline gap-2">
          {label}
          {hint ? <span className="normal-case tracking-normal text-muted/70">({hint})</span> : null}
        </span>
        {valid && !error ? <Check className="h-3 w-3 self-center text-gold" strokeWidth={1.75} aria-hidden="true" /> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="k mt-2 text-gold" role="alert">
          {error}
        </p>
      ) : foot ? (
        <div id={`${id}-foot`} className="k mt-2 text-muted/80">
          {foot}
        </div>
      ) : null}
    </div>
  );
}

/* ── Segmented control ───────────────────────────────────────────────── */
function Segmented<T extends string>({
  id,
  label,
  options,
  value,
  onChange,
  help,
  disabled,
}: {
  id: string;
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  help?: string;
  disabled?: boolean;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % options.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = options.length - 1;
    if (next === null) return;
    e.preventDefault();
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div id={`${id}-label`} className="k mb-2">
        {label}
      </div>
      <div role="radiogroup" aria-labelledby={`${id}-label`} className="grid overflow-hidden rounded-[2px] border border-line bg-ink/40" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((opt, i) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              disabled={disabled}
              data-cursor="hover"
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              style={{ letterSpacing: "0.12em" }}
              className={clsx(
                "k relative overflow-hidden text-ellipsis whitespace-nowrap px-1.5 py-3 text-center transition-[color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-vermilion/40",
                i > 0 && "border-l border-line",
                selected ? "bg-bone text-ink hover:bg-bone/90" : "text-bone-dim hover:bg-bone/[0.06] hover:text-bone",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {help ? (
        <p className="mt-2 text-[12.5px] font-light leading-relaxed text-bone-dim" aria-live="polite">
          {help}
        </p>
      ) : null}
    </div>
  );
}
