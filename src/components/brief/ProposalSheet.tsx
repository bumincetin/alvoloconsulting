"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import clsx from "clsx";
import { Check, Copy, MessageCircle, Printer, RotateCcw } from "lucide-react";
import { Arrow } from "@/components/shore/Reveal";
import { CONTACT } from "@/lib/content/footer";
import { briefContent } from "@/lib/content/brief";
import { summarizeProposal, type BriefAnswers, type Proposal } from "@/lib/brief/engine";
import type { Locale } from "@/lib/translations";

interface ProposalSheetProps {
  locale: Locale;
  answers: BriefAnswers;
  proposal: Proposal;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SheetHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="brief-sh">
      <span className="k">
        <b>{index}</b> — {label}
      </span>
      <span className="rule" />
    </div>
  );
}

/** The dossier: reference, mandate, modules, phase strip, engagement, checklist and the four actions. */
export default function ProposalSheet({ locale, answers, proposal }: ProposalSheetProps) {
  const c = briefContent[locale];
  const s = c.sheet;
  const baseId = useId();
  const summary = useMemo(() => summarizeProposal(answers, proposal, locale), [answers, proposal, locale]);

  const [requestOpen, setRequestOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);
  const requestRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => {
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    if (!requestOpen) return;
    const id = window.setTimeout(() => requestRef.current?.focus({ preventScroll: false }), 80);
    return () => window.clearTimeout(id);
  }, [requestOpen]);

  const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(summary)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="brief-sheet" aria-labelledby={`${baseId}-mandate`}>
      <header className="brief-sheet-top">
        <div>
          <span className="k">{s.reference}</span>
          <b>{proposal.reference}</b>
        </div>
        <div>
          <span className="k">{s.preparedFor}</span>
          <b>{proposal.preparedFor}</b>
        </div>
        <div>
          <span className="k">{s.date}</span>
          <b>{proposal.dateLabel}</b>
        </div>
      </header>

      <h2 id={`${baseId}-mandate`} className="brief-sheet-h">
        {proposal.mandateName}
      </h2>
      <p className="brief-sheet-rat body-lg">{proposal.rationale}</p>

      {/* 01 — modules */}
      <section className="brief-sec" aria-label={s.modules}>
        <SheetHead index="01" label={s.modules} />
        <ol className="brief-mods">
          {proposal.modules.map((m) => (
            <li key={m.id} className="brief-mod">
              <span className="k">
                <b>{m.index}</b>
              </span>
              <b>{m.name}</b>
              <p>{m.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 02 — phase strip */}
      <section className="brief-sec" aria-label={s.phases}>
        <SheetHead index="02" label={s.phases} />
        <ol className="brief-phases">
          {proposal.phases.map((p, i) => (
            <li key={p.index} className={clsx("brief-phase", p.provisional && "is-provisional")} style={{ ["--i" as string]: i }}>
              <span className="k">
                <b>{p.index}</b>
                {p.provisional ? <span className="brief-phase-tag"> · {s.indicative}</span> : null}
              </span>
              <span className="brief-phase-d">{p.duration}</span>
              <span className="brief-phase-s">{p.short}</span>
              <span className="brief-phase-t">{p.title}</span>
              <span className="brief-phase-f">{p.focus}</span>
            </li>
          ))}
        </ol>
        <div className="brief-phases-foot">
          <span>
            {s.total} · <b>{proposal.totalLabel}</b>
          </span>
          <span>{s.disclaimer}</span>
        </div>
      </section>

      {/* 03 — engagement & advisors */}
      <section className="brief-sec" aria-label={`${s.format} · ${s.advisors}`}>
        <SheetHead index="03" label={`${s.format} · ${s.advisors}`} />
        <div className="brief-eng">
          <dl>
            <dt className="k">{s.format}</dt>
            <dd className="is-big">{proposal.formatName}</dd>
            <dd>{proposal.formatNote}</dd>
          </dl>
          <dl>
            <dt className="k">{s.lead}</dt>
            <dd>{proposal.advisors.lead}</dd>
            <dt className="k">{s.desks}</dt>
            <dd>{proposal.advisors.desks.join(" · ")}</dd>
            {proposal.advisors.specialists.length ? (
              <>
                <dt className="k">{s.specialists}</dt>
                <dd>{proposal.advisors.specialists.join(", ")}</dd>
              </>
            ) : null}
            <dt className="k">{s.language}</dt>
            <dd>{proposal.advisors.language}</dd>
          </dl>
        </div>
      </section>

      {/* 04 — what we need from you */}
      <section className="brief-sec" aria-label={s.checklist}>
        <SheetHead index="04" label={s.checklist} />
        <ul className="brief-check">
          {proposal.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <p className="brief-sheet-close">{proposal.closing}</p>

      {/* actions */}
      <div className="brief-actions">
        <button type="button" className="cta cta--sm isolate" data-cursor onClick={() => setRequestOpen(true)} aria-expanded={requestOpen} aria-controls={`${baseId}-request`}>
          <i />
          <span>{c.buttons.request}</span>
          <Arrow className="cta-ar" />
        </button>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="brief-btn" data-cursor>
          <MessageCircle strokeWidth={1.5} />
          {c.buttons.whatsapp}
        </a>
        <button type="button" className={clsx("brief-btn", copied && "is-done")} onClick={copy} data-cursor aria-live="polite">
          {copied ? <Check strokeWidth={1.75} /> : <Copy strokeWidth={1.5} />}
          {copied ? c.buttons.copied : c.buttons.copy}
        </button>
        <button type="button" className="brief-btn" onClick={() => window.print()} data-cursor>
          <Printer strokeWidth={1.5} />
          {c.buttons.print}
        </button>
      </div>

      {requestOpen ? (
        <div id={`${baseId}-request`} className="brief-req">
          <h3 ref={requestRef} tabIndex={-1} className="brief-req-h">
            {s.requestTitle}
          </h3>
          <p className="brief-req-b body">{s.requestBody}</p>
          <RequestForm locale={locale} proposal={proposal} summary={summary} whatsappHref={whatsappHref} />
        </div>
      ) : null}
    </article>
  );
}

/* ══════════════════════════════════════════════ request form */

type Status = "form" | "sending" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  consent?: string;
}

function RequestForm({ locale, proposal, summary, whatsappHref }: { locale: Locale; proposal: Proposal; summary: string; whatsappHref: string }) {
  const c = briefContent[locale];
  const s = c.sheet;
  const id = useId();
  const [status, setStatus] = useState<Status>("form");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const next: Errors = {};
    if (!name.trim()) next.name = c.validation.required;
    if (!email.trim()) next.email = c.validation.required;
    else if (!EMAIL_RE.test(email.trim())) next.email = c.validation.invalidEmail;
    if (!consent) next.consent = c.validation.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setStatus("success");
      return;
    }
    if (!validate()) return;
    setStatus("sending");

    const message = [
      summary,
      "",
      company.trim() ? `[${c.summary.company}] ${company.trim()}` : null,
      phone.trim() ? `[${c.summary.phone}] ${phone.trim()}` : null,
      note.trim() ? `[${c.summary.note}]\n${note.trim()}` : null,
      `[Locale] ${locale}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
          message,
          subject: `Brief ${proposal.reference} — ${proposal.mandateName}`,
          kind: "brief",
          privacyConsent: true,
          marketingConsent: false,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="brief-status" role="status">
        <span className="brief-status-ic">
          <Check strokeWidth={1.75} />
        </span>
        <h4>{s.successTitle}</h4>
        <p className="body">{s.successBody}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="brief-status" role="alert">
        <span className="brief-status-ic">
          <RotateCcw strokeWidth={1.5} />
        </span>
        <h4>{s.errorTitle}</h4>
        <p className="body">{s.errorBody}</p>
        <div className="brief-status-acts">
          <button type="button" className="brief-btn" onClick={() => setStatus("form")} data-cursor>
            {c.buttons.retry}
          </button>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="brief-btn" data-cursor>
            <MessageCircle strokeWidth={1.5} />
            WhatsApp · {CONTACT.whatsappDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="brief-form" onSubmit={submit} noValidate>
      <div className="brief-hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="brief-field">
        <label htmlFor={`${id}-name`} className="k">
          <span>{s.name}</span>
          {errors.name ? <em>{errors.name}</em> : null}
        </label>
        <input id={`${id}-name`} type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={clsx("brief-in", errors.name && "is-invalid")} aria-invalid={Boolean(errors.name)} />
      </div>
      <div className="brief-field">
        <label htmlFor={`${id}-company`} className="k">
          <span>
            {s.company} <i>({s.optional})</i>
          </span>
        </label>
        <input id={`${id}-company`} type="text" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} className="brief-in" />
      </div>
      <div className="brief-field">
        <label htmlFor={`${id}-email`} className="k">
          <span>{s.email}</span>
          {errors.email ? <em>{errors.email}</em> : null}
        </label>
        <input id={`${id}-email`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={clsx("brief-in", errors.email && "is-invalid")} aria-invalid={Boolean(errors.email)} />
      </div>
      <div className="brief-field">
        <label htmlFor={`${id}-phone`} className="k">
          <span>
            {s.phone} <i>({s.optional})</i>
          </span>
        </label>
        <input id={`${id}-phone`} type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="brief-in" />
      </div>
      <div className="brief-field span2">
        <label htmlFor={`${id}-note`} className="k">
          <span>
            {s.note} <i>({s.optional})</i>
          </span>
        </label>
        <textarea id={`${id}-note`} rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={s.notePlaceholder} className="brief-in" />
      </div>

      <label className="brief-consent span2">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={Boolean(errors.consent)} />
        <span>
          {s.consent}
          {errors.consent ? <em>{errors.consent}</em> : null}
        </span>
      </label>

      <div className="brief-form-foot">
        <button type="submit" className="cta cta--sm isolate" disabled={status === "sending"} data-cursor>
          <i />
          <span>{status === "sending" ? c.buttons.sending : c.buttons.send}</span>
          <Arrow className="cta-ar" />
        </button>
      </div>
    </form>
  );
}
