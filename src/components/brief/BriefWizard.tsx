"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Arrow } from "@/components/shore/Reveal";
import {
  briefContent,
  type BriefOption,
  type BriefStep,
  type CityId,
  type DirectionId,
  type LanguageId,
  type ObjectiveId,
  type ProfileId,
  type RevenueId,
  type ScaleId,
  type TimelineId,
} from "@/lib/content/brief";
import { buildProposal, fill, pad2, type BriefAnswers } from "@/lib/brief/engine";
import { locales, type Locale } from "@/lib/translations";
import OptionGrid from "./OptionGrid";
import ProgressRail from "./ProgressRail";
import ProposalSheet from "./ProposalSheet";

/* ══════════════════════════════════════════════════════════════════════
   Flow: intro → five steps → proposal sheet. Answers persist in
   localStorage (`alvolo:brief:v1`) so a reload resumes; "Start over" clears.
   Keyboard: Enter / → continue · ← back · 1–9 select in the active group.
   ══════════════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "alvolo:brief:v1";
const INTRO = -1;
const TOTAL = 5;
const PROPOSAL = TOTAL;

interface Draft {
  profile?: ProfileId;
  direction?: DirectionId;
  objectives: ObjectiveId[];
  people?: ScaleId;
  timeline?: TimelineId;
  revenue?: RevenueId;
  cities: CityId[];
  language: LanguageId;
}

interface Stored {
  v: 1;
  screen: number;
  draft: Draft;
}

const emptyDraft = (locale: Locale): Draft => ({ objectives: [], cities: [], language: locale });

function idSet<T extends string>(options: BriefOption<T>[]): Set<string> {
  return new Set(options.map((o) => o.id));
}

function firstIncomplete(d: Draft): number {
  if (!d.profile) return 0;
  if (!d.direction) return 1;
  if (!d.objectives.length) return 2;
  if (!d.people || !d.timeline) return 3;
  if (!d.cities.length) return 4;
  return PROPOSAL;
}

/** Read and sanitise the saved brief; anything malformed is discarded. */
function readStored(locale: Locale): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (!parsed || parsed.v !== 1 || typeof parsed.screen !== "number" || !parsed.draft) return null;
    const o = briefContent.en.options;
    const d = parsed.draft as Partial<Draft>;
    const pick = <T extends string>(value: unknown, set: Set<string>): T | undefined => (typeof value === "string" && set.has(value) ? (value as T) : undefined);
    const pickMany = <T extends string>(value: unknown, set: Set<string>): T[] => (Array.isArray(value) ? (value.filter((v): v is T => typeof v === "string" && set.has(v)) as T[]) : []);
    const draft: Draft = {
      profile: pick<ProfileId>(d.profile, idSet(o.profile)),
      direction: pick<DirectionId>(d.direction, idSet(o.direction)),
      objectives: pickMany<ObjectiveId>(d.objectives, idSet(o.objectives)),
      people: pick<ScaleId>(d.people, idSet(o.people)),
      timeline: pick<TimelineId>(d.timeline, idSet(o.timeline)),
      revenue: pick<RevenueId>(d.revenue, idSet(o.revenue)),
      cities: pickMany<CityId>(d.cities, idSet(o.cities)),
      language: pick<LanguageId>(d.language, new Set(locales)) ?? locale,
    };
    const wanted = Math.max(INTRO, Math.min(PROPOSAL, Math.round(parsed.screen)));
    const screen = Math.min(wanted, firstIncomplete(draft));
    return { v: 1, screen, draft };
  } catch {
    return null;
  }
}

export default function BriefWizard({ locale }: { locale: Locale }) {
  const c = briefContent[locale];
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  const [screen, setScreen] = useState<number>(INTRO);
  const [draft, setDraft] = useState<Draft>(() => emptyDraft(locale));
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [live, setLive] = useState("");

  const stepTitles = useMemo(() => [c.steps.profile.title, c.steps.direction.title, c.steps.objectives.title, c.steps.scale.title, c.steps.cities.title], [c]);

  /* ── persistence ────────────────────────────────────────────────── */
  useEffect(() => {
    const stored = readStored(locale);
    if (stored) {
      setDraft(stored.draft);
      setScreen(stored.screen);
      if (stored.screen === PROPOSAL) setNow(new Date());
    }
    setHydrated(true);
  }, [locale]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: Stored = { v: 1, screen, draft };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage unavailable — the session still works */
    }
  }, [hydrated, screen, draft]);

  /* ── navigation ─────────────────────────────────────────────────── */
  const validate = useCallback(
    (step: number): string | null => {
      switch (step) {
        case 0:
          return draft.profile ? null : c.validation.pickOne;
        case 1:
          return draft.direction ? null : c.validation.pickOne;
        case 2:
          return draft.objectives.length ? null : c.validation.pickAtLeastOne;
        case 3:
          return draft.people && draft.timeline ? null : c.validation.pickOne;
        case 4:
          return draft.cities.length ? null : c.validation.pickAtLeastOne;
        default:
          return null;
      }
    },
    [draft, c],
  );

  const go = useCallback((next: number) => {
    setError(null);
    if (next === PROPOSAL) setNow(new Date());
    setScreen(next);
  }, []);

  const advance = useCallback(() => {
    if (screen === INTRO) return go(0);
    if (screen >= PROPOSAL) return;
    const err = validate(screen);
    if (err) {
      setError(err);
      return;
    }
    go(screen + 1);
  }, [screen, validate, go]);

  const back = useCallback(() => {
    if (screen === INTRO) return;
    go(screen === 0 ? INTRO : screen - 1);
  }, [screen, go]);

  const restart = useCallback(() => {
    setDraft(emptyDraft(locale));
    setNow(null);
    setError(null);
    setScreen(INTRO);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const toggle = <T extends string>(list: T[], id: T): T[] => (list.includes(id) ? list.filter((v) => v !== id) : [...list, id]);

  /** number keys: select the i-th option of the active group on the current step */
  const selectByIndex = useCallback(
    (i: number) => {
      setError(null);
      const o = c.options;
      if (screen === 0 && o.profile[i]) setDraft((d) => ({ ...d, profile: o.profile[i].id }));
      else if (screen === 1 && o.direction[i]) setDraft((d) => ({ ...d, direction: o.direction[i].id }));
      else if (screen === 2 && o.objectives[i]) setDraft((d) => ({ ...d, objectives: toggle(d.objectives, o.objectives[i].id) }));
      else if (screen === 3) {
        setDraft((d) => {
          if (!d.people) return o.people[i] ? { ...d, people: o.people[i].id } : d;
          if (!d.timeline) return o.timeline[i] ? { ...d, timeline: o.timeline[i].id } : d;
          return o.revenue[i] ? { ...d, revenue: d.revenue === o.revenue[i].id ? undefined : o.revenue[i].id } : d;
        });
      } else if (screen === 4 && o.cities[i]) setDraft((d) => ({ ...d, cities: toggle(d.cities, o.cities[i].id) }));
    },
    [screen, c],
  );

  /* ── keyboard ───────────────────────────────────────────────────── */
  const handlers = useRef({ advance, back, selectByIndex, screen });
  handlers.current = { advance, back, selectByIndex, screen };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t?.isContentEditable) return;
      const h = handlers.current;
      if (e.key === "Enter") {
        // buttons and links handle their own Enter
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        h.advance();
      } else if (e.key === "ArrowRight") {
        if (h.screen >= PROPOSAL) return;
        e.preventDefault();
        h.advance();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        h.back();
      } else if (/^[1-9]$/.test(e.key) && h.screen >= 0 && h.screen < PROPOSAL) {
        e.preventDefault();
        h.selectByIndex(Number(e.key) - 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ── screen change: announce, scroll into view, move focus ──────── */
  useEffect(() => {
    if (!hydrated) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (root) {
      const navH = 84;
      const top = root.getBoundingClientRect().top;
      if (top < navH) window.scrollTo({ top: window.scrollY + top - navH - 12, behavior: reduce ? "auto" : "smooth" });
    }
    const id = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 80);
    setLive(screen === PROPOSAL ? c.progress.proposalLive : screen === INTRO ? "" : fill(c.progress.live, { n: screen + 1, total: TOTAL, title: stepTitles[screen] }));
    return () => window.clearTimeout(id);
  }, [screen, hydrated, c, stepTitles]);

  /* ── proposal ───────────────────────────────────────────────────── */
  const answers: BriefAnswers | null = useMemo(() => {
    if (!draft.profile || !draft.direction || !draft.objectives.length || !draft.people || !draft.timeline || !draft.cities.length) return null;
    return {
      profile: draft.profile,
      direction: draft.direction,
      objectives: draft.objectives,
      scale: { people: draft.people, timeline: draft.timeline, revenue: draft.revenue },
      cities: draft.cities,
      language: draft.language,
    };
  }, [draft]);

  const proposal = useMemo(() => (answers && now ? buildProposal(answers, locale, now) : null), [answers, locale, now]);

  const inProgress = draft.profile !== undefined || draft.objectives.length > 0;
  const nowLabel = screen === PROPOSAL ? c.progress.proposal : fill(c.progress.stepOf, { n: Math.max(screen, 0) + 1, total: TOTAL });

  /* ── render helpers ─────────────────────────────────────────────── */
  const stepHead = (step: BriefStep, extra?: React.ReactNode) => (
    <header className="brief-head">
      <div className="k">
        <span>
          <b>{pad2(screen + 1)}</b> — {fill(c.progress.stepOf, { n: screen + 1, total: TOTAL })}
        </span>
        <span className="rule" />
        {extra}
      </div>
      <h2 ref={headingRef} tabIndex={-1} id={`${baseId}-q`} className="brief-title">
        {step.title}
      </h2>
      <p className="brief-q">{step.question}</p>
      <p className="brief-help">{step.help}</p>
    </header>
  );

  const stepFoot = (
    <>
      {error ? (
        <p className="brief-err" role="alert">
          {error}
        </p>
      ) : null}
      <footer className="brief-foot">
        <button type="button" className="brief-link" onClick={back} data-cursor>
          <Arrow className="rotate-[225deg]" />
          {c.buttons.back}
        </button>
        <div className="brief-foot-r">
          <span className="brief-kbd" aria-hidden="true">
            {c.progress.kbd}
          </span>
          <button type="button" className="cta cta--sm isolate" onClick={advance} data-cursor>
            <i />
            <span>{screen === TOTAL - 1 ? c.buttons.showProposal : c.buttons.continue}</span>
            <Arrow className="cta-ar" />
          </button>
        </div>
      </footer>
    </>
  );

  const groupHead = (id: string, label: string, optional?: boolean, count?: number) => (
    <div className="brief-group-head">
      <h3 id={id} className="k">
        {label}
        {optional ? <span className="brief-group-opt">({c.sheet.optional})</span> : null}
      </h3>
      {typeof count === "number" && count > 0 ? <span className="k">{fill(c.progress.selected, { n: count })}</span> : null}
    </div>
  );

  const renderStep = () => {
    switch (screen) {
      case 0:
        return (
          <>
            {stepHead(c.steps.profile)}
            <OptionGrid options={c.options.profile} value={draft.profile ? [draft.profile] : []} onChange={(v) => setDraft((d) => ({ ...d, profile: v[0] }))} labelledBy={`${baseId}-q`} />
            {stepFoot}
          </>
        );
      case 1:
        return (
          <>
            {stepHead(c.steps.direction)}
            <OptionGrid options={c.options.direction} value={draft.direction ? [draft.direction] : []} onChange={(v) => setDraft((d) => ({ ...d, direction: v[0] }))} labelledBy={`${baseId}-q`} columns={3} />
            {stepFoot}
          </>
        );
      case 2:
        return (
          <>
            {stepHead(c.steps.objectives, draft.objectives.length ? <span className="k">{fill(c.progress.selected, { n: draft.objectives.length })}</span> : null)}
            <OptionGrid options={c.options.objectives} value={draft.objectives} onChange={(v) => setDraft((d) => ({ ...d, objectives: v }))} labelledBy={`${baseId}-q`} multi columns={3} />
            {stepFoot}
          </>
        );
      case 3:
        return (
          <>
            {stepHead(c.steps.scale)}
            <div className="brief-group">
              {groupHead(`${baseId}-people`, c.steps.scale.people)}
              <OptionGrid options={c.options.people} value={draft.people ? [draft.people] : []} onChange={(v) => setDraft((d) => ({ ...d, people: v[0] }))} labelledBy={`${baseId}-people`} compact />
            </div>
            <div className="brief-group">
              {groupHead(`${baseId}-timeline`, c.steps.scale.timeline)}
              <OptionGrid options={c.options.timeline} value={draft.timeline ? [draft.timeline] : []} onChange={(v) => setDraft((d) => ({ ...d, timeline: v[0] }))} labelledBy={`${baseId}-timeline`} compact />
            </div>
            <div className="brief-group">
              {groupHead(`${baseId}-revenue`, c.steps.scale.revenue, true)}
              <OptionGrid options={c.options.revenue} value={draft.revenue ? [draft.revenue] : []} onChange={(v) => setDraft((d) => ({ ...d, revenue: v[0] }))} labelledBy={`${baseId}-revenue`} allowClear compact columns={3} />
            </div>
            {stepFoot}
          </>
        );
      case 4:
        return (
          <>
            {stepHead(c.steps.cities)}
            <div className="brief-group">
              {groupHead(`${baseId}-cities`, c.steps.cities.cities, false, draft.cities.length)}
              <OptionGrid options={c.options.cities} value={draft.cities} onChange={(v) => setDraft((d) => ({ ...d, cities: v }))} labelledBy={`${baseId}-cities`} multi />
            </div>
            <div className="brief-group">
              {groupHead(`${baseId}-language`, c.steps.cities.language)}
              <OptionGrid options={c.options.language} value={[draft.language]} onChange={(v) => setDraft((d) => ({ ...d, language: v[0] ?? d.language }))} labelledBy={`${baseId}-language`} compact columns={3} />
            </div>
            {stepFoot}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="brief" aria-label={c.eyebrow}>
      <div className="brief-wrap" ref={rootRef}>
        <ProgressRail steps={stepTitles} current={screen} proposalLabel={c.progress.proposal} nowLabel={nowLabel} ariaLabel={c.eyebrow} />

        <div className="brief-panel">
          <div className="brief-sr" aria-live="polite" role="status">
            {live}
          </div>

          {screen === INTRO ? (
            <div className="brief-screen" key="intro">
              <header className="brief-head">
                <div className="k">
                  <span>
                    <b>00</b> — {c.intro.kicker}
                  </span>
                  <span className="rule" />
                </div>
                <h2 ref={headingRef} tabIndex={-1} className="brief-intro-h">
                  {c.intro.heading}
                </h2>
                <p className="brief-intro-b body-lg">{c.intro.body}</p>
              </header>
              <ol className="brief-points">
                {c.intro.points.map((point, i) => (
                  <li key={point}>
                    <span className="k">
                      <b>{pad2(i + 1)}</b>
                    </span>
                    <b>{point}</b>
                  </li>
                ))}
              </ol>
              {hydrated && inProgress ? <p className="brief-resume">{c.intro.resume}</p> : null}
              <footer className="brief-foot">
                {hydrated && inProgress ? (
                  <button type="button" className="brief-link brief-link--muted" onClick={restart} data-cursor>
                    {c.intro.restart}
                  </button>
                ) : (
                  <span />
                )}
                <div className="brief-foot-r">
                  <span className="brief-kbd" aria-hidden="true">
                    {c.progress.kbd}
                  </span>
                  <button type="button" className="cta cta--sm isolate" onClick={advance} data-cursor>
                    <i />
                    <span>{c.intro.start}</span>
                    <Arrow className="cta-ar" />
                  </button>
                </div>
              </footer>
            </div>
          ) : null}

          {screen >= 0 && screen < PROPOSAL ? (
            <div className="brief-screen" key={`step-${screen}`}>
              {renderStep()}
            </div>
          ) : null}

          {screen === PROPOSAL && answers && proposal ? (
            <div className="brief-screen" key="proposal">
              <div className="brief-toolbar">
                <button type="button" className="brief-link" onClick={() => go(TOTAL - 1)} data-cursor>
                  <Arrow className="rotate-[225deg]" />
                  {c.buttons.edit}
                </button>
                <button type="button" className="brief-link brief-link--muted" onClick={restart} data-cursor>
                  {c.buttons.startOver}
                </button>
              </div>
              <h2 ref={headingRef} tabIndex={-1} className="brief-sr">
                {c.progress.proposal}
              </h2>
              <ProposalSheet locale={locale} answers={answers} proposal={proposal} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
