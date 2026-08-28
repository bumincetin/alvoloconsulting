import type { Locale } from "@/lib/translations";
import { protocolContent } from "@/lib/content/protocol";
import {
  briefContent,
  type ChecklistId,
  type CityId,
  type DirectionId,
  type EngagementFormat,
  type LanguageId,
  type MandateId,
  type ModuleId,
  type ObjectiveId,
  type ProfileId,
  type RevenueId,
  type ScaleId,
  type SpecialistId,
  type TimelineId,
} from "@/lib/content/brief";

/* ══════════════════════════════════════════════════════════════════════
   BRIEF ENGINE — pure and deterministic.
   `buildProposal(answers, locale, now)` never reads the clock or randomness
   itself; the same answers and the same `now` always produce the same sheet.
   ══════════════════════════════════════════════════════════════════════ */

export interface BriefAnswers {
  profile: ProfileId;
  direction: DirectionId;
  objectives: ObjectiveId[];
  scale: { people: ScaleId; timeline: TimelineId; revenue?: RevenueId };
  cities: CityId[];
  language: LanguageId;
}

export interface ProposalModule {
  id: ModuleId;
  index: string;
  name: string;
  description: string;
}

export interface ProposalPhase {
  index: string;
  /** short badge: Audit / Structure / Formation / Onboarding, or the delegation equivalents */
  short: string;
  title: string;
  focus: string;
  weeks: [number, number];
  duration: string;
  /** true when the phase is only confirmed after the Audit memo (exploratory timelines) */
  provisional: boolean;
}

export interface Proposal {
  reference: string;
  dateLabel: string;
  preparedFor: string;
  mandateId: MandateId;
  mandateName: string;
  rationale: string;
  modules: ProposalModule[];
  phases: ProposalPhase[];
  totalWeeks: [number, number];
  totalLabel: string;
  format: EngagementFormat;
  formatName: string;
  formatNote: string;
  advisors: { lead: string; desks: string[]; specialists: string[]; language: string };
  checklist: string[];
  closing: string;
}

/* ── canonical orderings ─────────────────────────────────────────── */
const MODULE_ORDER: ModuleId[] = [
  "coordination",
  "holding",
  "vehicle",
  "tr-entity",
  "tax",
  "residency",
  "permits",
  "settling",
  "banking",
  "realestate",
  "sourcing",
  "partnerships",
  "trade",
  "programme",
  "meetings",
  "protocol",
  "compliance",
];
const SPECIALIST_ORDER: SpecialistId[] = ["notaio", "commercialista", "ymm", "legal", "immigration", "banking", "realestate", "sourcing", "customs", "protocol", "interpreters"];
const CHECKLIST_ORDER: ChecklistId[] = ["activity", "captable", "groupchart", "identities", "financials", "people", "funds", "product", "logistics", "premises", "delegation", "dates"];
const CITY_ORDER: CityId[] = ["milano", "roma", "istanbul", "other"];
const OBJECTIVE_ORDER: ObjectiveId[] = ["incorporation", "tax", "relocation", "banking", "sourcing", "partnerships", "trade", "realestate", "delegation"];

const LOCALE_TAG: Record<Locale, string> = { en: "en-GB", tr: "tr-TR", it: "it-IT" };
const CITY_NAME: Record<Exclude<CityId, "other">, string> = { milano: "Milano", roma: "Roma", istanbul: "Istanbul" };

/* ── small helpers ────────────────────────────────────────────────── */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** `{name}` placeholders → values */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) => (key in vars ? String(vars[key]) : m));
}

function orderBy<T extends string>(order: T[], set: Set<T>): T[] {
  return order.filter((id) => set.has(id));
}

function joinList(items: string[], and: string): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}

/** FNV-1a over a canonical serialisation of the answers → 4 unambiguous characters */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function referenceCode(answers: BriefAnswers, now: Date): string {
  const canonical = [
    answers.profile,
    answers.direction,
    orderBy(OBJECTIVE_ORDER, new Set(answers.objectives)).join("+"),
    answers.scale.people,
    answers.scale.timeline,
    answers.scale.revenue ?? "-",
    orderBy(CITY_ORDER, new Set(answers.cities)).join("+"),
    answers.language,
  ].join("|");
  let h = 0x811c9dc5;
  for (let i = 0; i < canonical.length; i++) {
    h ^= canonical.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h >>>= 0;
  let code = "";
  for (let k = 0; k < 4; k++) code += ALPHABET[(h >>> (k * 5)) & 31];
  const yy = String(now.getFullYear()).slice(-2);
  return `ALV-${yy}-${code}`;
}

/* ── derivations ─────────────────────────────────────────────────── */
function isDelegation(a: BriefAnswers): boolean {
  return a.profile === "delegation" || a.objectives.includes("delegation");
}

function deriveFormat(a: BriefAnswers): EngagementFormat {
  if (isDelegation(a)) return "programme";
  const has = (o: ObjectiveId) => a.objectives.includes(o);
  const industrialPlusEntity = (has("sourcing") || has("partnerships")) && has("incorporation");
  if (a.direction === "both" || a.scale.people === "20+" || a.objectives.length >= 4 || industrialPlusEntity) return "retainer";
  return "fixed";
}

function deriveModules(a: BriefAnswers, format: EngagementFormat): ModuleId[] {
  const set = new Set<ModuleId>(["coordination"]);
  const has = (o: ObjectiveId) => a.objectives.includes(o);
  const toItaly = a.direction === "italy" || a.direction === "both";
  const toTurkiye = a.direction === "turkiye" || a.direction === "both";

  if (has("incorporation")) {
    if (toItaly) set.add("vehicle");
    if (toTurkiye) set.add("tr-entity");
    if (a.direction === "both" || a.profile === "investor") set.add("holding");
  }
  if (has("tax")) {
    set.add("tax");
    if (has("relocation")) set.add("residency");
  }
  if (has("relocation")) {
    set.add("permits");
    if (a.profile === "executive" || a.profile === "investor" || a.scale.people !== "1") set.add("settling");
  }
  if (has("banking")) set.add("banking");
  if (has("sourcing")) {
    set.add("sourcing");
    set.add("trade");
  }
  if (has("partnerships")) set.add("partnerships");
  if (has("trade")) set.add("trade");
  if (has("realestate")) set.add("realestate");
  if (isDelegation(a)) {
    set.add("programme");
    set.add("meetings");
    set.add("protocol");
  }
  if (format === "retainer") set.add("compliance");

  return orderBy(MODULE_ORDER, set);
}

function italianCityLabel(a: BriefAnswers): string {
  const milano = a.cities.includes("milano");
  const roma = a.cities.includes("roma");
  if (milano && roma) return `${CITY_NAME.milano} · ${CITY_NAME.roma}`;
  if (roma) return CITY_NAME.roma;
  return CITY_NAME.milano;
}

function deriveMandate(a: BriefAnswers, locale: Locale): { id: MandateId; name: string } {
  const names = briefContent[locale].proposal.mandates;
  const has = (o: ObjectiveId) => a.objectives.includes(o);

  if (isDelegation(a)) {
    const italian = italianCityLabel(a);
    const [x, y] = a.direction === "turkiye" ? [italian, CITY_NAME.istanbul] : [CITY_NAME.istanbul, italian];
    return { id: "delegation", name: fill(names.delegation, { a: x, b: y }) };
  }
  if (a.direction === "both") return { id: "two-shores", name: names["two-shores"] };

  if (a.direction === "turkiye") {
    if (has("incorporation")) return { id: "istanbul-entry", name: names["istanbul-entry"] };
    if (has("sourcing") || has("trade")) return { id: "anatolian-sourcing", name: names["anatolian-sourcing"] };
    if (has("partnerships")) return { id: "anatolian-partnership", name: names["anatolian-partnership"] };
    return { id: "private-client", name: `${names["private-client"]} — ${CITY_NAME.istanbul}` };
  }

  // Italy inbound
  const privateOnly = (a.profile === "executive" || a.profile === "investor") && a.objectives.every((o) => o === "relocation" || o === "tax" || o === "banking" || o === "realestate");
  if (privateOnly) return { id: "private-client", name: `${names["private-client"]} — ${italianCityLabel(a)}` };
  const milano = a.cities.includes("milano");
  const roma = a.cities.includes("roma");
  if (milano && roma) return { id: "italy-entry", name: names["italy-entry"] };
  if (roma) return { id: "roma-entry", name: names["roma-entry"] };
  return { id: "milano-entry", name: names["milano-entry"] };
}

type Range = [number, number];

function compress(r: Range, timeline: TimelineId): Range {
  if (timeline !== "now") return r;
  const [lo, hi] = r;
  return [lo, Math.max(lo, Math.ceil(lo + (hi - lo) * 0.6))];
}

function durationLabel(r: Range, locale: Locale): string {
  const s = briefContent[locale].sheet;
  const [lo, hi] = r;
  const unit = hi === 1 ? s.weekOne : s.weekMany;
  return lo === hi ? `${lo} ${unit}` : `${lo}–${hi} ${unit}`;
}

function derivePhases(a: BriefAnswers, modules: ModuleId[], locale: Locale): ProposalPhase[] {
  const copy = briefContent[locale].proposal;
  const people = a.scale.people;
  const timeline = a.scale.timeline;
  const has = (m: ModuleId) => modules.includes(m);

  if (isDelegation(a)) {
    const ranges: Range[] = [
      [1, 2],
      people === "20+" ? [3, 6] : people === "6-20" ? [2, 5] : [2, 4],
      people === "20+" ? [1, 2] : [1, 1],
      [2, 6],
    ].map((r) => compress(r as Range, timeline));
    return copy.delegationPhases.map((p, i) => ({
      index: pad2(i + 1),
      short: p.short,
      title: p.title,
      focus: p.focus,
      weeks: ranges[i],
      duration: durationLabel(ranges[i], locale),
      provisional: timeline === "exploratory" && i > 0,
    }));
  }

  const protocol = protocolContent[locale].phases;
  const entity = has("vehicle") || has("tr-entity");
  const industrial = has("sourcing") || has("partnerships") || has("trade");

  let formation: Range = entity ? [3, 8] : has("permits") ? [3, 6] : [2, 4];
  let onboarding: Range = industrial ? [4, 14] : has("realestate") ? [3, 8] : [2, 4];
  if (people === "6-20") {
    formation = [formation[0], formation[1] + 1];
    onboarding = [onboarding[0], onboarding[1] + 2];
  } else if (people === "20+") {
    formation = [formation[0] + 1, formation[1] + 2];
    onboarding = [onboarding[0] + 2, onboarding[1] + 4];
  }
  const base: Range[] = [[1, 2], [2, 3], formation, onboarding];
  const ranges: Range[] = base.map((r) => compress(r, timeline));

  const focus = [
    copy.phaseFocus.audit,
    has("holding") ? copy.phaseFocus.structure.holding : copy.phaseFocus.structure.default,
    entity ? copy.phaseFocus.formation.entity : has("permits") ? copy.phaseFocus.formation.people : copy.phaseFocus.formation.default,
    industrial ? copy.phaseFocus.onboarding.industrial : has("realestate") ? copy.phaseFocus.onboarding.premises : copy.phaseFocus.onboarding.handover,
  ];

  return protocol.map((p, i) => ({
    index: p.index,
    short: p.badge,
    title: p.title,
    focus: focus[i],
    weeks: ranges[i],
    duration: durationLabel(ranges[i], locale),
    provisional: timeline === "exploratory" && i > 0,
  }));
}

function deriveDesks(a: BriefAnswers): CityId[] {
  const set = new Set<CityId>(a.cities);
  const toItaly = a.direction === "italy" || a.direction === "both";
  const toTurkiye = a.direction === "turkiye" || a.direction === "both";
  if (toItaly && !set.has("milano") && !set.has("roma")) set.add("milano");
  if (toTurkiye && !set.has("istanbul")) set.add("istanbul");
  return orderBy(CITY_ORDER, set);
}

function deriveSpecialists(modules: ModuleId[]): SpecialistId[] {
  const set = new Set<SpecialistId>();
  const has = (m: ModuleId) => modules.includes(m);
  if (has("vehicle")) {
    set.add("notaio");
    set.add("commercialista");
  }
  if (has("tax") || has("residency")) set.add("commercialista");
  if (has("tr-entity")) {
    set.add("ymm");
    set.add("legal");
  }
  if (has("holding")) set.add("legal");
  if (has("permits")) set.add("immigration");
  if (has("banking")) set.add("banking");
  if (has("sourcing") || has("partnerships")) set.add("sourcing");
  if (has("trade")) set.add("customs");
  if (has("realestate")) set.add("realestate");
  if (has("programme") || has("meetings") || has("protocol")) {
    set.add("protocol");
    set.add("interpreters");
  }
  return orderBy(SPECIALIST_ORDER, set);
}

function deriveChecklist(modules: ModuleId[]): ChecklistId[] {
  const set = new Set<ChecklistId>(["activity", "dates"]);
  const has = (m: ModuleId) => modules.includes(m);
  if (has("vehicle") || has("tr-entity") || has("holding")) {
    set.add("captable");
    set.add("identities");
  }
  if (has("holding")) set.add("groupchart");
  if (has("tax")) set.add("financials");
  if (has("permits") || has("settling")) set.add("people");
  if (has("banking")) set.add("funds");
  if (has("sourcing") || has("partnerships")) set.add("product");
  if (has("trade")) set.add("logistics");
  if (has("realestate")) set.add("premises");
  if (has("programme")) set.add("delegation");
  return orderBy(CHECKLIST_ORDER, set);
}

/* ══════════════════════════════════════════════════════════════════════ */

export function buildProposal(answers: BriefAnswers, locale: Locale, now: Date): Proposal {
  const copy = briefContent[locale].proposal;
  const sheet = briefContent[locale].sheet;

  const format = deriveFormat(answers);
  const moduleIds = deriveModules(answers, format);
  const mandate = deriveMandate(answers, locale);
  const phases = derivePhases(answers, moduleIds, locale);

  const modules: ProposalModule[] = moduleIds.map((id, i) => ({
    id,
    index: pad2(i + 1),
    name: copy.modules[id].name,
    description: copy.modules[id].description,
  }));

  const scopeNames = moduleIds.filter((id) => id !== "coordination").map((id) => copy.modules[id].name);
  const rationale = [
    copy.opening[answers.profile][answers.direction],
    fill(copy.scope, { modules: joinList(scopeNames, copy.listAnd) }),
    copy.timing[answers.scale.timeline],
    copy.scale[answers.scale.people],
    copy.formatReason[format],
  ].join(" ");

  const totalWeeks: [number, number] = phases.reduce<[number, number]>((acc, p) => [acc[0] + p.weeks[0], acc[1] + p.weeks[1]], [0, 0]);

  const dateLabel = new Intl.DateTimeFormat(LOCALE_TAG[locale], { day: "numeric", month: "long", year: "numeric" }).format(now);

  return {
    reference: referenceCode(answers, now),
    dateLabel,
    preparedFor: copy.profileLabels[answers.profile],
    mandateId: mandate.id,
    mandateName: mandate.name,
    rationale,
    modules,
    phases,
    totalWeeks,
    totalLabel: `${totalWeeks[0]}–${totalWeeks[1]} ${sheet.weekMany}`,
    format,
    formatName: copy.formats[format].name,
    formatNote: copy.formats[format].note,
    advisors: {
      lead: copy.lead,
      desks: deriveDesks(answers).map((c) => copy.desks[c]),
      specialists: deriveSpecialists(moduleIds).map((s) => copy.specialists[s]),
      language: copy.languages[answers.language],
    },
    checklist: deriveChecklist(moduleIds).map((c) => copy.checklist[c]),
    closing: copy.closing,
  };
}

/** Plain-text rendering of the sheet for the email body, WhatsApp and the clipboard. */
export function summarizeProposal(answers: BriefAnswers, proposal: Proposal, locale: Locale): string {
  const c = briefContent[locale];
  const s = c.sheet;
  const t = c.summary;
  const title = (opts: { id: string; title: string }[], id: string | undefined) => opts.find((o) => o.id === id)?.title ?? "";
  const titles = (opts: { id: string; title: string }[], ids: string[]) => ids.map((id) => title(opts, id)).filter(Boolean).join(", ");

  const lines: string[] = [
    t.title,
    `${s.reference}: ${proposal.reference}`,
    `${s.date}: ${proposal.dateLabel}`,
    `${s.preparedFor}: ${proposal.preparedFor}`,
    "",
    proposal.mandateName.toUpperCase(),
    proposal.rationale,
    "",
    s.modules.toUpperCase(),
    ...proposal.modules.map((m) => `${m.index}  ${m.name} — ${m.description}`),
    "",
    s.phases.toUpperCase(),
    ...proposal.phases.map((p) => `${p.index}  ${p.short} · ${p.duration}${p.provisional ? ` (${s.indicative})` : ""} — ${p.focus}`),
    `${s.total}: ${proposal.totalLabel}`,
    "",
    `${s.format}: ${proposal.formatName}`,
    `${s.lead}: ${proposal.advisors.lead}`,
    `${s.desks}: ${proposal.advisors.desks.join(" · ")}`,
    ...(proposal.advisors.specialists.length ? [`${s.specialists}: ${proposal.advisors.specialists.join(", ")}`] : []),
    `${s.language}: ${proposal.advisors.language}`,
    "",
    s.checklist.toUpperCase(),
    ...proposal.checklist.map((item) => `– ${item}`),
    "",
    s.answers.toUpperCase(),
    `${t.profile}: ${title(c.options.profile, answers.profile)}`,
    `${t.direction}: ${title(c.options.direction, answers.direction)}`,
    `${t.objectives}: ${titles(c.options.objectives, answers.objectives)}`,
    `${t.people}: ${title(c.options.people, answers.scale.people)}`,
    `${t.timeline}: ${title(c.options.timeline, answers.scale.timeline)}`,
    ...(answers.scale.revenue ? [`${t.revenue}: ${title(c.options.revenue, answers.scale.revenue)}`] : []),
    `${t.cities}: ${titles(c.options.cities, answers.cities)}`,
    `${t.language}: ${title(c.options.language, answers.language)}`,
  ];
  return lines.join("\n");
}
