import type { Locale } from "@/lib/translations";

/* ══════════════════════════════════════════════════════════════════════
   BRIEF — the needs-assessment wizard at /[locale]/brief/
   Answer ids, proposal vocabulary and the trilingual copy. The engine in
   src/lib/brief/engine.ts turns answers into a Proposal using only this file
   and the protocol phases.
   ══════════════════════════════════════════════════════════════════════ */

/* ── answer id unions ─────────────────────────────────────────────── */
export type ProfileId = "executive" | "company" | "delegation" | "investor";
export type DirectionId = "italy" | "turkiye" | "both";
export type ObjectiveId = "incorporation" | "tax" | "relocation" | "banking" | "sourcing" | "partnerships" | "trade" | "realestate" | "delegation";
export type ScaleId = "1" | "2-5" | "6-20" | "20+";
export type TimelineId = "now" | "1-3m" | "3-6m" | "exploratory";
export type RevenueId = "under1m" | "1-10m" | "10-50m" | "50m+" | "undisclosed";
export type CityId = "milano" | "roma" | "istanbul" | "other";
export type LanguageId = Locale;

/* ── proposal vocabulary ──────────────────────────────────────────── */
export type MandateId =
  | "milano-entry"
  | "roma-entry"
  | "italy-entry"
  | "istanbul-entry"
  | "anatolian-sourcing"
  | "anatolian-partnership"
  | "two-shores"
  | "private-client"
  | "delegation";

export type ModuleId =
  | "coordination"
  | "vehicle"
  | "tr-entity"
  | "holding"
  | "tax"
  | "residency"
  | "permits"
  | "settling"
  | "banking"
  | "sourcing"
  | "partnerships"
  | "trade"
  | "realestate"
  | "programme"
  | "meetings"
  | "protocol"
  | "compliance";

export type EngagementFormat = "fixed" | "retainer" | "programme";

export type SpecialistId = "notaio" | "commercialista" | "ymm" | "immigration" | "banking" | "sourcing" | "customs" | "realestate" | "protocol" | "interpreters" | "legal";

export type ChecklistId = "activity" | "captable" | "identities" | "financials" | "people" | "funds" | "product" | "logistics" | "premises" | "delegation" | "groupchart" | "dates";

/* ── content shapes ───────────────────────────────────────────────── */
export interface BriefOption<T extends string> {
  id: T;
  title: string;
  hint?: string;
}

export interface BriefStep {
  title: string;
  question: string;
  help: string;
}

export interface ProposalCopy {
  /** `{a}` / `{b}` are replaced with city names in the delegation pattern */
  mandates: Record<MandateId, string>;
  opening: Record<ProfileId, Record<DirectionId, string>>;
  /** `{modules}` is replaced with the joined module names */
  scope: string;
  listAnd: string;
  timing: Record<TimelineId, string>;
  scale: Record<ScaleId, string>;
  formatReason: Record<EngagementFormat, string>;
  modules: Record<ModuleId, { name: string; description: string }>;
  phaseFocus: {
    audit: string;
    structure: { default: string; holding: string };
    formation: { entity: string; people: string; default: string };
    onboarding: { industrial: string; premises: string; handover: string };
  };
  delegationPhases: { short: string; title: string; focus: string }[];
  formats: Record<EngagementFormat, { name: string; note: string }>;
  lead: string;
  desks: Record<CityId, string>;
  specialists: Record<SpecialistId, string>;
  languages: Record<LanguageId, string>;
  checklist: Record<ChecklistId, string>;
  profileLabels: Record<ProfileId, string>;
  closing: string;
}

export interface BriefContent {
  eyebrow: string;
  alt: string;
  title: string;
  sub: string;
  intro: { kicker: string; heading: string; body: string; points: string[]; start: string; resume: string; restart: string };
  steps: {
    profile: BriefStep;
    direction: BriefStep;
    objectives: BriefStep;
    scale: BriefStep & { people: string; timeline: string; revenue: string };
    cities: BriefStep & { cities: string; language: string };
  };
  options: {
    profile: BriefOption<ProfileId>[];
    direction: BriefOption<DirectionId>[];
    objectives: BriefOption<ObjectiveId>[];
    people: BriefOption<ScaleId>[];
    timeline: BriefOption<TimelineId>[];
    revenue: BriefOption<RevenueId>[];
    cities: BriefOption<CityId>[];
    language: BriefOption<LanguageId>[];
  };
  buttons: {
    continue: string;
    back: string;
    startOver: string;
    showProposal: string;
    edit: string;
    request: string;
    whatsapp: string;
    copy: string;
    copied: string;
    print: string;
    send: string;
    sending: string;
    retry: string;
  };
  validation: { pickOne: string; pickAtLeastOne: string; required: string; invalidEmail: string; consentRequired: string };
  progress: { stepOf: string; proposal: string; selected: string; kbd: string; live: string; proposalLive: string };
  sheet: {
    preparedFor: string;
    reference: string;
    date: string;
    modules: string;
    phases: string;
    weekOne: string;
    weekMany: string;
    total: string;
    indicative: string;
    disclaimer: string;
    format: string;
    advisors: string;
    lead: string;
    desks: string;
    specialists: string;
    language: string;
    checklist: string;
    requestTitle: string;
    requestBody: string;
    name: string;
    company: string;
    optional: string;
    email: string;
    phone: string;
    note: string;
    notePlaceholder: string;
    consent: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    answers: string;
  };
  summary: {
    title: string;
    profile: string;
    direction: string;
    objectives: string;
    people: string;
    timeline: string;
    revenue: string;
    cities: string;
    language: string;
    note: string;
    company: string;
    phone: string;
  };
  proposal: ProposalCopy;
}

/* ══════════════════════════════════════════════════════════════════════ */

export const briefContent: Record<Locale, BriefContent> = {
  /* ─────────────────────────────────────────────────────────────── EN */
  en: {
    eyebrow: "Private intake",
    alt: "Brief",
    title: "Your tailored mandate",
    sub: "Five questions. A proposal drawn the way our practice actually runs — modules, phases, desks — before a first conversation. No prices, nothing to download.",
    intro: {
      kicker: "How this works",
      heading: "Tell us what you need. We draw the mandate.",
      body: "You answer five short questions about who you are, the direction of travel, what you want to achieve, the scale and the cities involved. We return a proposal sheet you can request, forward or print.",
      points: ["Five questions", "About three minutes", "A proposal, not a price list"],
      start: "Begin the brief",
      resume: "You have a brief in progress — it resumes where you left off.",
      restart: "Start over",
    },
    steps: {
      profile: { title: "Who you are", question: "Who is this mandate for?", help: "Choose the profile closest to yours; it sets the tone of the proposal." },
      direction: { title: "Direction", question: "Which way are you moving?", help: "Italy inbound, Türkiye outbound, or a structure that spans both shores." },
      objectives: { title: "Objectives", question: "What should the mandate achieve?", help: "Choose everything that applies. The modules are drawn from this list." },
      scale: {
        title: "Scale & timing",
        question: "How large, and how soon?",
        help: "People and timing shape the phase plan; turnover is optional and only sizes the advisory set-up.",
        people: "People relocating or taking part",
        timeline: "When it should begin",
        revenue: "Group turnover",
      },
      cities: {
        title: "Cities & language",
        question: "Where, and in which language?",
        help: "Choose the desks that should be involved. The working language sets who leads the file.",
        cities: "Desks involved",
        language: "Working language",
      },
    },
    options: {
      profile: [
        { id: "executive", title: "An executive or founder", hint: "Relocating, taking a role or setting up personally" },
        { id: "company", title: "A company", hint: "An operating business opening, sourcing or restructuring across the border" },
        { id: "delegation", title: "A delegation", hint: "An official, chamber or business group planning a visit" },
        { id: "investor", title: "A private investor", hint: "Capital, property or a holding position, without an operating business yet" },
      ],
      direction: [
        { id: "italy", title: "Into Italy", hint: "Milano, Roma — incorporation, permits, tax and banking" },
        { id: "turkiye", title: "Into Türkiye", hint: "Istanbul and the industrial regions — sourcing, partners, entities" },
        { id: "both", title: "Both shores", hint: "A group with a presence and obligations on each side" },
      ],
      objectives: [
        { id: "incorporation", title: "Incorporate an entity", hint: "S.r.l., S.p.A., A.Ş. or Ltd. Şti. — and whether a holding layer belongs" },
        { id: "tax", title: "Tax architecture", hint: "Effective rate, treaty position, repatriation and compliance" },
        { id: "relocation", title: "Relocate people", hint: "Codice Fiscale, visas, permits, residency" },
        { id: "banking", title: "Open banking", hint: "Capital-deposit and operating accounts, signatories, KYC" },
        { id: "sourcing", title: "Source production", hint: "Supplier shortlist, on-site audits, landed-cost RFQ" },
        { id: "partnerships", title: "Find a manufacturing partner", hint: "Joint ventures, contract manufacturing, framework agreements" },
        { id: "trade", title: "Set up the trade corridor", hint: "Customs Union documentation, Incoterms, logistics" },
        { id: "realestate", title: "Secure premises or property", hint: "Offices, industrial sites, residential for executives" },
        { id: "delegation", title: "Plan a delegation visit", hint: "Agenda, counterparties, protocol and follow-through" },
      ],
      people: [
        { id: "1", title: "One principal", hint: "A single executive, founder or investor" },
        { id: "2-5", title: "Two to five", hint: "A founding team or a family" },
        { id: "6-20", title: "Six to twenty", hint: "A management team or a mid-size delegation" },
        { id: "20+", title: "More than twenty", hint: "A full delegation or a workforce transfer" },
      ],
      timeline: [
        { id: "now", title: "Immediately", hint: "Filings should start within the month" },
        { id: "1-3m", title: "Within one to three months", hint: "Decisions taken; sequencing to be set" },
        { id: "3-6m", title: "In three to six months", hint: "Budgeted and planned for the coming quarters" },
        { id: "exploratory", title: "Still exploring", hint: "Begin with the audit; commit to the rest after the memo" },
      ],
      revenue: [
        { id: "under1m", title: "Under €1 m" },
        { id: "1-10m", title: "€1–10 m" },
        { id: "10-50m", title: "€10–50 m" },
        { id: "50m+", title: "Above €50 m" },
        { id: "undisclosed", title: "Prefer not to say" },
      ],
      cities: [
        { id: "milano", title: "Milano", hint: "Corporate, finance and the Lombard industrial base" },
        { id: "roma", title: "Roma", hint: "Institutions, ministries and permits" },
        { id: "istanbul", title: "Istanbul", hint: "Trade, industry and the Anatolian supply base" },
        { id: "other", title: "Elsewhere", hint: "Another city on either shore — tell us at briefing" },
      ],
      language: [
        { id: "en", title: "English" },
        { id: "tr", title: "Türkçe" },
        { id: "it", title: "Italiano" },
      ],
    },
    buttons: {
      continue: "Continue",
      back: "Back",
      startOver: "Start over",
      showProposal: "Draw the proposal",
      edit: "Edit answers",
      request: "Request this proposal",
      whatsapp: "Send via WhatsApp",
      copy: "Copy summary",
      copied: "Copied",
      print: "Save as PDF",
      send: "Send the request",
      sending: "Sending…",
      retry: "Try again",
    },
    validation: {
      pickOne: "Choose one option to continue.",
      pickAtLeastOne: "Choose at least one option.",
      required: "Required",
      invalidEmail: "Enter a valid email address",
      consentRequired: "Please accept to continue",
    },
    progress: {
      stepOf: "Step {n} of {total}",
      proposal: "Proposal",
      selected: "{n} selected",
      kbd: "↵ continue · ← back · 1–9 select",
      live: "Step {n} of {total}: {title}",
      proposalLive: "Your proposal is ready.",
    },
    sheet: {
      preparedFor: "Prepared for",
      reference: "Reference",
      date: "Date",
      modules: "Included modules",
      phases: "Phase plan",
      weekOne: "week",
      weekMany: "weeks",
      total: "Indicative total",
      indicative: "indicative",
      disclaimer: "Durations are indicative and are confirmed at the end of the Audit phase.",
      format: "Engagement format",
      advisors: "Advisory set-up",
      lead: "Lead",
      desks: "Desks",
      specialists: "Specialists briefed",
      language: "Working language",
      checklist: "What we need from you",
      requestTitle: "Request this proposal",
      requestBody: "Leave your details and we send this sheet, with a first reading from the senior advisor, to your inbox.",
      name: "Name",
      company: "Company",
      optional: "optional",
      email: "Work email",
      phone: "WhatsApp or phone",
      note: "A note for the advisor",
      notePlaceholder: "Anything the five questions did not capture.",
      consent: "I agree that Alvolo Consulting may process these details to respond to my request.",
      successTitle: "Received.",
      successBody: "The sheet is on its way to the senior advisor. You will hear from us within one working day.",
      errorTitle: "The request did not go through.",
      errorBody: "Please try again, or send the summary directly via WhatsApp.",
      answers: "Your answers",
    },
    summary: {
      title: "ALVOLO CONSULTING — BRIEF",
      profile: "Profile",
      direction: "Direction",
      objectives: "Objectives",
      people: "People",
      timeline: "Timing",
      revenue: "Turnover",
      cities: "Cities",
      language: "Language",
      note: "Note",
      company: "Company",
      phone: "Phone",
    },
    proposal: {
      mandates: {
        "milano-entry": "Milano Entry Mandate",
        "roma-entry": "Roma Entry Mandate",
        "italy-entry": "Italy Entry Mandate",
        "istanbul-entry": "Istanbul Entry Mandate",
        "anatolian-sourcing": "Anatolian Sourcing Mandate",
        "anatolian-partnership": "Anatolian Partnership Mandate",
        "two-shores": "Two Shores Mandate",
        "private-client": "Private Client Mandate",
        delegation: "Delegation Programme — {a} ⇄ {b}",
      },
      opening: {
        executive: {
          italy: "A private mandate for an executive establishing themselves in Italy.",
          turkiye: "A private mandate for an executive taking up a position in Türkiye.",
          both: "A private mandate for an executive whose life and work run across both shores.",
        },
        company: {
          italy: "A corporate mandate for a company opening its Italian presence.",
          turkiye: "A corporate mandate for a company building its position in Türkiye.",
          both: "A corporate mandate for a group with a presence and obligations on each side of the corridor.",
        },
        delegation: {
          italy: "A programme for a delegation travelling to Italy.",
          turkiye: "A programme for a delegation travelling to Türkiye.",
          both: "A programme for a delegation meeting counterparties on both shores.",
        },
        investor: {
          italy: "A mandate for a private investor taking a position in Italy.",
          turkiye: "A mandate for a private investor taking a position in Türkiye.",
          both: "A mandate for a private investor holding interests on both shores.",
        },
      },
      scope: "The scope brings together {modules}.",
      listAnd: "and",
      timing: {
        now: "It is sequenced for an immediate start, with the Audit phase compressed so filings begin within the month.",
        "1-3m": "It is sequenced for a start within the quarter.",
        "3-6m": "It is planned for the coming quarters, with time to prepare documents before the first filing.",
        exploratory: "It opens with the Audit phase alone; the remaining phases are confirmed once the memo is on the table.",
      },
      scale: {
        "1": "It is sized for a single principal.",
        "2-5": "It is sized for a small team or a family.",
        "6-20": "It is sized for a management team, with relocation and onboarding run in parallel.",
        "20+": "It is sized for a large group, with dedicated coordination on each shore.",
      },
      formatReason: {
        fixed: "One defined scope, one accountable advisor.",
        retainer: "Given its breadth, it is best run as a standing retainer rather than a single project.",
        programme: "It runs as a dated programme with a single coordinator from briefing to follow-through.",
      },
      modules: {
        coordination: { name: "Coordination desk", description: "One senior advisor, one file: the notaio, commercialista, YMM and banks are briefed from the same dossier." },
        vehicle: { name: "Italian vehicle & incorporation", description: "S.r.l. or S.p.A., statuto, notarial deed, Registro delle Imprese, Partita IVA, PEC and SDI." },
        "tr-entity": { name: "Turkish entity & registry", description: "A.Ş. or Ltd. Şti., MERSİS filings, tax office registration and the YMM relationship." },
        holding: { name: "Holding & group structure", description: "Whether a holding layer earns its keep, and where the shareholders are actually paid." },
        tax: { name: "Tax architecture", description: "IRES, IRAP, Turkish corporate tax, treaty position and withholding modelled together before signing." },
        residency: { name: "Personal tax residency", description: "Residency planning for the people moving, including the impatriate regime where it applies." },
        permits: { name: "Permits & residency", description: "Codice Fiscale, the right visa route, permesso di soggiorno or Turkish work and residence permits." },
        settling: { name: "Executive settling-in", description: "Housing, schools, Anagrafe registration and the practical calendar of arrival." },
        banking: { name: "Banking set-up", description: "Capital-deposit and operating accounts, signatories, and the KYC pack in each bank's format." },
        sourcing: { name: "Supplier search & audit", description: "Shortlist through the Chambers of Industry and OSB zones, on-site audits, landed-cost RFQ." },
        partnerships: { name: "Manufacturing partnership", description: "Partner screening, joint-venture or contract-manufacturing terms, quality gates and IP governance." },
        trade: { name: "Customs Union corridor", description: "A.TR and EUR.1 documentation, Incoterms and the logistics route designed before the first order." },
        realestate: { name: "Premises & property", description: "Offices, industrial sites or residential property: search, due diligence and the contract." },
        programme: { name: "Programme design", description: "Agenda, counterparties and objectives for each day of the visit, agreed before travel." },
        meetings: { name: "Institutional meetings", description: "Chambers, ministries, industrial zones and companies opened through our own relationships." },
        protocol: { name: "Protocol & interpreting", description: "Protocol, hospitality and interpreting so the delegation is received as it should be." },
        compliance: { name: "Compliance calendar", description: "Ongoing filings, deadlines and reporting shared by the commercialista and the YMM." },
      },
      phaseFocus: {
        audit: "Shareholding, activity and people mapped against both regulatory perimeters.",
        structure: {
          default: "Vehicle, tax position and governance chosen on the numbers.",
          holding: "Group chart, holding layer and treaty position settled together.",
        },
        formation: {
          entity: "Deed, registry filings and the first bank account, in parallel with permits.",
          people: "Codice Fiscale, permits and residency run as one workstream.",
          default: "Accounts, signatories and the documents each counterparty expects.",
        },
        onboarding: {
          industrial: "Suppliers, contracts and the logistics corridor in place before the first order.",
          premises: "Premises secured and the compliance calendar handed over.",
          handover: "Compliance calendar, reporting and handover to the ongoing desk.",
        },
      },
      delegationPhases: [
        { short: "Briefing", title: "Objectives & delegation profile", focus: "Who travels, what the visit must achieve, which counterparties matter." },
        { short: "Programme design", title: "Agenda, counterparties & logistics", focus: "Meetings requested, agenda agreed, protocol and travel arranged." },
        { short: "Delegation week", title: "The visit", focus: "Accompanied meetings, interpreting and daily debriefs." },
        { short: "Follow-through", title: "Agreements & next steps", focus: "Minutes, introductions carried forward, and the mandates that follow." },
      ],
      formats: {
        fixed: { name: "Fixed-scope mandate", note: "A defined scope with milestones tied to the four phases and one accountable senior advisor." },
        retainer: { name: "Retainer", note: "A standing advisory relationship for mandates that run across borders, teams or several workstreams at once." },
        programme: { name: "Programme", note: "A dated programme with a single coordinator from briefing to follow-through." },
      },
      lead: "Senior advisor, Bocconi-trained, accountable for the whole mandate",
      desks: { milano: "Milano desk", roma: "Roma desk", istanbul: "Istanbul desk", other: "Coordinating desk assigned at briefing" },
      specialists: {
        notaio: "Notaio",
        commercialista: "Commercialista",
        ymm: "Turkish YMM",
        immigration: "Immigration counsel",
        banking: "Banking liaison",
        sourcing: "Sourcing & quality engineer",
        customs: "Customs broker",
        realestate: "Property adviser",
        protocol: "Protocol officer",
        interpreters: "Interpreters",
        legal: "Corporate counsel",
      },
      languages: { en: "English", tr: "Türkçe", it: "Italiano" },
      checklist: {
        activity: "A short description of the activity and the decision-makers involved",
        captable: "The intended shareholding and capital",
        identities: "Passport copies of shareholders and directors",
        financials: "The last two years of accounts, or a business plan for a new venture",
        people: "Passports, current residence and family composition of the people moving",
        funds: "Source-of-funds documentation for the capital deposit",
        product: "Product specifications, target volumes and current suppliers",
        logistics: "Current Incoterms and logistics set-up",
        premises: "Location, size and budget range for the premises",
        delegation: "The delegation list with roles, preferred dates and target counterparties",
        groupchart: "The existing group chart",
        dates: "Preferred dates for the first working session",
      },
      profileLabels: { executive: "An executive", company: "A company", delegation: "A delegation", investor: "A private investor" },
      closing: "This sheet is a starting point drawn from your answers. The senior advisor reads it before the first conversation, so that conversation begins at the right place.",
    },
  },

  /* ─────────────────────────────────────────────────────────────── TR */
  tr: {
    eyebrow: "Özel ön görüşme",
    alt: "Brief",
    title: "Size özel mandat",
    sub: "Beş soru. Uygulamamızın gerçekte nasıl işlediğinden çizilen bir teklif — modüller, aşamalar, masalar — ilk görüşmeden önce. Fiyat yok, indirilecek bir şey yok.",
    intro: {
      kicker: "Nasıl işliyor",
      heading: "İhtiyacınızı anlatın. Mandatı biz çizelim.",
      body: "Kim olduğunuz, hangi yöne gittiğiniz, neyi başarmak istediğiniz, ölçek ve ilgili şehirler hakkında beş kısa soruyu yanıtlıyorsunuz. Karşılığında talep edebileceğiniz, iletebileceğiniz ya da yazdırabileceğiniz bir teklif sayfası alıyorsunuz.",
      points: ["Beş soru", "Yaklaşık üç dakika", "Fiyat listesi değil, teklif"],
      start: "Brief'e başlayın",
      resume: "Devam eden bir brief'iniz var — kaldığınız yerden sürer.",
      restart: "Baştan başla",
    },
    steps: {
      profile: { title: "Kimsiniz", question: "Bu mandat kimin için?", help: "Size en yakın profili seçin; teklifin tonunu belirler." },
      direction: { title: "Yön", question: "Hangi yöne gidiyorsunuz?", help: "İtalya'ya giriş, Türkiye'ye açılım ya da iki kıyıyı kapsayan bir yapı." },
      objectives: { title: "Hedefler", question: "Mandat neyi başarmalı?", help: "Uyan her şeyi seçin. Modüller bu listeden türetilir." },
      scale: {
        title: "Ölçek ve zamanlama",
        question: "Ne kadar büyük, ne kadar yakın?",
        help: "Kişi sayısı ve zamanlama aşama planını şekillendirir; ciro isteğe bağlıdır ve yalnızca danışman kadrosunu ölçeklendirir.",
        people: "Taşınacak ya da katılacak kişi sayısı",
        timeline: "Ne zaman başlamalı",
        revenue: "Grup cirosu",
      },
      cities: {
        title: "Şehirler ve dil",
        question: "Nerede ve hangi dilde?",
        help: "Sürece dahil olması gereken masaları seçin. Çalışma dili dosyayı kimin yöneteceğini belirler.",
        cities: "Dahil olacak masalar",
        language: "Çalışma dili",
      },
    },
    options: {
      profile: [
        { id: "executive", title: "Bir yönetici ya da kurucu", hint: "Taşınıyor, görev üstleniyor ya da şahsen yapı kuruyor" },
        { id: "company", title: "Bir şirket", hint: "Sınırın öte yakasında açılan, tedarik yapan ya da yeniden yapılanan faal bir işletme" },
        { id: "delegation", title: "Bir heyet", hint: "Ziyaret planlayan resmî, oda ya da iş dünyası heyeti" },
        { id: "investor", title: "Bir özel yatırımcı", hint: "Sermaye, gayrimenkul ya da holding pozisyonu; henüz faal bir işletme yok" },
      ],
      direction: [
        { id: "italy", title: "İtalya'ya", hint: "Milano, Roma — şirket kuruluşu, izinler, vergi ve bankacılık" },
        { id: "turkiye", title: "Türkiye'ye", hint: "İstanbul ve sanayi bölgeleri — tedarik, ortaklar, şirketler" },
        { id: "both", title: "İki kıyıya", hint: "Her iki tarafta varlığı ve yükümlülüğü olan bir grup" },
      ],
      objectives: [
        { id: "incorporation", title: "Şirket kurmak", hint: "S.r.l., S.p.A., A.Ş. ya da Ltd. Şti. — ve holding katmanının gerekip gerekmediği" },
        { id: "tax", title: "Vergi mimarisi", hint: "Efektif oran, anlaşma pozisyonu, nakit transferi ve uyum" },
        { id: "relocation", title: "İnsanları taşımak", hint: "Codice Fiscale, vizeler, izinler, ikamet" },
        { id: "banking", title: "Bankacılığı kurmak", hint: "Sermaye blokaj ve operasyonel hesaplar, imza yetkilileri, KYC" },
        { id: "sourcing", title: "Üretim tedarik etmek", hint: "Tedarikçi kısa listesi, saha denetimleri, teslim maliyeti üzerinden RFQ" },
        { id: "partnerships", title: "Üretim ortağı bulmak", hint: "Ortak girişim, fason üretim, çerçeve sözleşmeler" },
        { id: "trade", title: "Ticaret koridorunu kurmak", hint: "Gümrük Birliği belgeleri, Incoterms, lojistik" },
        { id: "realestate", title: "Tesis ya da gayrimenkul edinmek", hint: "Ofis, sanayi tesisi, yöneticiler için konut" },
        { id: "delegation", title: "Heyet ziyareti planlamak", hint: "Gündem, muhataplar, protokol ve takip" },
      ],
      people: [
        { id: "1", title: "Tek kişi", hint: "Tek bir yönetici, kurucu ya da yatırımcı" },
        { id: "2-5", title: "İki ila beş", hint: "Kurucu ekip ya da aile" },
        { id: "6-20", title: "Altı ila yirmi", hint: "Yönetim ekibi ya da orta ölçekli heyet" },
        { id: "20+", title: "Yirmiden fazla", hint: "Tam heyet ya da iş gücü transferi" },
      ],
      timeline: [
        { id: "now", title: "Hemen", hint: "Başvurular bu ay içinde başlamalı" },
        { id: "1-3m", title: "Bir ila üç ay içinde", hint: "Kararlar alındı; sıralama belirlenecek" },
        { id: "3-6m", title: "Üç ila altı ay içinde", hint: "Önümüzdeki çeyrekler için bütçelendi ve planlandı" },
        { id: "exploratory", title: "Henüz araştırıyoruz", hint: "Denetimle başlayın; gerisine memorandumdan sonra karar verin" },
      ],
      revenue: [
        { id: "under1m", title: "1 milyon € altı" },
        { id: "1-10m", title: "1–10 milyon €" },
        { id: "10-50m", title: "10–50 milyon €" },
        { id: "50m+", title: "50 milyon € üzeri" },
        { id: "undisclosed", title: "Belirtmek istemiyorum" },
      ],
      cities: [
        { id: "milano", title: "Milano", hint: "Kurumsal, finans ve Lombardiya sanayi tabanı" },
        { id: "roma", title: "Roma", hint: "Kurumlar, bakanlıklar ve izinler" },
        { id: "istanbul", title: "İstanbul", hint: "Ticaret, sanayi ve Anadolu tedarik tabanı" },
        { id: "other", title: "Başka bir yer", hint: "İki kıyıdan herhangi bir şehir — brifingde belirtin" },
      ],
      language: [
        { id: "en", title: "English" },
        { id: "tr", title: "Türkçe" },
        { id: "it", title: "Italiano" },
      ],
    },
    buttons: {
      continue: "Devam",
      back: "Geri",
      startOver: "Baştan başla",
      showProposal: "Teklifi oluştur",
      edit: "Yanıtları düzenle",
      request: "Bu teklifi talep et",
      whatsapp: "WhatsApp ile gönder",
      copy: "Özeti kopyala",
      copied: "Kopyalandı",
      print: "PDF olarak kaydet",
      send: "Talebi gönder",
      sending: "Gönderiliyor…",
      retry: "Tekrar dene",
    },
    validation: {
      pickOne: "Devam etmek için bir seçenek seçin.",
      pickAtLeastOne: "En az bir seçenek seçin.",
      required: "Zorunlu",
      invalidEmail: "Geçerli bir e-posta adresi girin",
      consentRequired: "Devam etmek için lütfen onaylayın",
    },
    progress: {
      stepOf: "Adım {n} / {total}",
      proposal: "Teklif",
      selected: "{n} seçildi",
      kbd: "↵ devam · ← geri · 1–9 seç",
      live: "Adım {n} / {total}: {title}",
      proposalLive: "Teklifiniz hazır.",
    },
    sheet: {
      preparedFor: "Hazırlanan",
      reference: "Referans",
      date: "Tarih",
      modules: "Dahil edilen modüller",
      phases: "Aşama planı",
      weekOne: "hafta",
      weekMany: "hafta",
      total: "Tahmini toplam",
      indicative: "tahmini",
      disclaimer: "Süreler tahminidir; Denetim aşamasının sonunda kesinleşir.",
      format: "Çalışma biçimi",
      advisors: "Danışman kadrosu",
      lead: "Sorumlu",
      desks: "Masalar",
      specialists: "Bilgilendirilen uzmanlar",
      language: "Çalışma dili",
      checklist: "Sizden ihtiyacımız olanlar",
      requestTitle: "Bu teklifi talep edin",
      requestBody: "Bilgilerinizi bırakın; bu sayfayı kıdemli danışmanın ilk değerlendirmesiyle birlikte e-postanıza gönderelim.",
      name: "Ad Soyad",
      company: "Şirket",
      optional: "isteğe bağlı",
      email: "İş e-postası",
      phone: "WhatsApp ya da telefon",
      note: "Danışman için not",
      notePlaceholder: "Beş sorunun kapsamadığı her şey.",
      consent: "Alvolo Consulting'in talebime yanıt vermek için bu bilgileri işlemesini kabul ediyorum.",
      successTitle: "Alındı.",
      successBody: "Sayfa kıdemli danışmana iletildi. Bir iş günü içinde sizinle iletişime geçeceğiz.",
      errorTitle: "Talep iletilemedi.",
      errorBody: "Lütfen tekrar deneyin ya da özeti doğrudan WhatsApp ile gönderin.",
      answers: "Yanıtlarınız",
    },
    summary: {
      title: "ALVOLO CONSULTING — BRIEF",
      profile: "Profil",
      direction: "Yön",
      objectives: "Hedefler",
      people: "Kişi",
      timeline: "Zamanlama",
      revenue: "Ciro",
      cities: "Şehirler",
      language: "Dil",
      note: "Not",
      company: "Şirket",
      phone: "Telefon",
    },
    proposal: {
      mandates: {
        "milano-entry": "Milano'ya Giriş Mandatı",
        "roma-entry": "Roma'ya Giriş Mandatı",
        "italy-entry": "İtalya'ya Giriş Mandatı",
        "istanbul-entry": "İstanbul'a Giriş Mandatı",
        "anatolian-sourcing": "Anadolu Tedarik Mandatı",
        "anatolian-partnership": "Anadolu Ortaklık Mandatı",
        "two-shores": "İki Kıyı Mandatı",
        "private-client": "Özel Müşteri Mandatı",
        delegation: "Heyet Programı — {a} ⇄ {b}",
      },
      opening: {
        executive: {
          italy: "İtalya'ya yerleşen bir yönetici için özel mandat.",
          turkiye: "Türkiye'de görev üstlenen bir yönetici için özel mandat.",
          both: "Hayatı ve işi iki kıyıya yayılan bir yönetici için özel mandat.",
        },
        company: {
          italy: "İtalya'daki varlığını kuran bir şirket için kurumsal mandat.",
          turkiye: "Türkiye'deki konumunu inşa eden bir şirket için kurumsal mandat.",
          both: "Koridorun iki yanında da varlığı ve yükümlülüğü olan bir grup için kurumsal mandat.",
        },
        delegation: {
          italy: "İtalya'ya giden bir heyet için program.",
          turkiye: "Türkiye'ye giden bir heyet için program.",
          both: "İki kıyıda da muhataplarla görüşen bir heyet için program.",
        },
        investor: {
          italy: "İtalya'da pozisyon alan bir özel yatırımcı için mandat.",
          turkiye: "Türkiye'de pozisyon alan bir özel yatırımcı için mandat.",
          both: "İki kıyıda da çıkarları bulunan bir özel yatırımcı için mandat.",
        },
      },
      scope: "Kapsam şu modülleri bir araya getiriyor: {modules}.",
      listAnd: "ve",
      timing: {
        now: "Hemen başlanacak şekilde sıralandı; başvuruların bu ay içinde başlaması için Denetim aşaması sıkıştırıldı.",
        "1-3m": "Bu çeyrek içinde başlanacak şekilde sıralandı.",
        "3-6m": "Önümüzdeki çeyrekler için planlandı; ilk başvurudan önce belgeleri hazırlamaya zaman var.",
        exploratory: "Yalnızca Denetim aşamasıyla açılıyor; kalan aşamalar memorandum masaya geldiğinde kesinleşiyor.",
      },
      scale: {
        "1": "Tek bir kişi için ölçeklendi.",
        "2-5": "Küçük bir ekip ya da aile için ölçeklendi.",
        "6-20": "Bir yönetim ekibi için ölçeklendi; taşınma ve entegrasyon paralel yürütülüyor.",
        "20+": "Büyük bir grup için ölçeklendi; her kıyıda ayrı koordinasyon var.",
      },
      formatReason: {
        fixed: "Tanımlı tek kapsam, sorumlu tek danışman.",
        retainer: "Genişliği düşünüldüğünde tek bir proje yerine sürekli danışmanlık olarak yürütülmesi daha doğru.",
        programme: "Brifingden takibe kadar tek koordinatörle, tarihli bir program olarak yürütülüyor.",
      },
      modules: {
        coordination: { name: "Koordinasyon masası", description: "Tek kıdemli danışman, tek dosya: noter, commercialista, YMM ve bankalar aynı dosyadan bilgilendirilir." },
        vehicle: { name: "İtalyan şirket türü ve kuruluş", description: "S.r.l. ya da S.p.A., ana sözleşme, noter senedi, Registro delle Imprese, Partita IVA, PEC ve SDI." },
        "tr-entity": { name: "Türk şirketi ve sicil", description: "A.Ş. ya da Ltd. Şti., MERSİS tescili, vergi dairesi kaydı ve YMM ilişkisi." },
        holding: { name: "Holding ve grup yapısı", description: "Holding katmanının gerçekten gerekip gerekmediği ve ortakların fiilen nereden ödeme alacağı." },
        tax: { name: "Vergi mimarisi", description: "IRES, IRAP, Türkiye kurumlar vergisi, anlaşma pozisyonu ve stopaj imzadan önce birlikte modellenir." },
        residency: { name: "Kişisel vergi mukimliği", description: "Taşınan kişiler için mukimlik planlaması; uygun olduğunda impatriati rejimi dahil." },
        permits: { name: "İzinler ve ikamet", description: "Codice Fiscale, doğru vize rotası, permesso di soggiorno ya da Türkiye çalışma ve ikamet izinleri." },
        settling: { name: "Yönetici yerleşimi", description: "Konut, okullar, Anagrafe kaydı ve varışın pratik takvimi." },
        banking: { name: "Bankacılık kurulumu", description: "Sermaye blokaj ve operasyonel hesaplar, imza yetkilileri ve her bankanın formatında KYC paketi." },
        sourcing: { name: "Tedarikçi arama ve denetim", description: "Sanayi Odaları ve OSB'ler üzerinden kısa liste, saha denetimleri, teslim maliyeti üzerinden RFQ." },
        partnerships: { name: "Üretim ortaklığı", description: "Ortak taraması, ortak girişim ya da fason üretim şartları, kalite kapıları ve fikri mülkiyet yönetişimi." },
        trade: { name: "Gümrük Birliği koridoru", description: "A.TR ve EUR.1 belgeleri, Incoterms ve ilk siparişten önce tasarlanan lojistik rotası." },
        realestate: { name: "Tesis ve gayrimenkul", description: "Ofis, sanayi tesisi ya da konut: arama, inceleme ve sözleşme." },
        programme: { name: "Program tasarımı", description: "Ziyaretin her günü için gündem, muhataplar ve hedefler; seyahatten önce mutabık kalınır." },
        meetings: { name: "Kurumsal görüşmeler", description: "Odalar, bakanlıklar, sanayi bölgeleri ve şirketler; kendi ilişkilerimiz üzerinden açılır." },
        protocol: { name: "Protokol ve tercüme", description: "Heyetin hak ettiği şekilde ağırlanması için protokol, ağırlama ve tercüme." },
        compliance: { name: "Uyum takvimi", description: "Commercialista ve YMM'nin ortak kullandığı süregelen beyanlar, son tarihler ve raporlama." },
      },
      phaseFocus: {
        audit: "Ortaklık yapısı, faaliyet ve kişiler iki düzenleyici çerçeveye göre haritalanır.",
        structure: {
          default: "Şirket türü, vergi pozisyonu ve yönetişim rakamlara göre seçilir.",
          holding: "Grup şeması, holding katmanı ve anlaşma pozisyonu birlikte kararlaştırılır.",
        },
        formation: {
          entity: "Senet, sicil tescilleri ve ilk banka hesabı; izinlerle paralel.",
          people: "Codice Fiscale, izinler ve ikamet tek iş kolu olarak yürütülür.",
          default: "Hesaplar, imza yetkilileri ve her muhatabın beklediği belgeler.",
        },
        onboarding: {
          industrial: "Tedarikçiler, sözleşmeler ve lojistik koridoru ilk siparişten önce kurulur.",
          premises: "Tesis güvence altına alınır ve uyum takvimi devredilir.",
          handover: "Uyum takvimi, raporlama ve sürekli masaya devir.",
        },
      },
      delegationPhases: [
        { short: "Brifing", title: "Hedefler ve heyet profili", focus: "Kim gidiyor, ziyaret neyi başarmalı, hangi muhataplar önemli." },
        { short: "Program tasarımı", title: "Gündem, muhataplar ve lojistik", focus: "Görüşmeler talep edilir, gündemde mutabık kalınır, protokol ve seyahat düzenlenir." },
        { short: "Heyet haftası", title: "Ziyaret", focus: "Eşlikli görüşmeler, tercüme ve günlük değerlendirmeler." },
        { short: "Takip", title: "Anlaşmalar ve sonraki adımlar", focus: "Tutanaklar, ileriye taşınan tanışmalar ve ardından gelen mandatlar." },
      ],
      formats: {
        fixed: { name: "Sabit kapsamlı mandat", note: "Dört aşamaya bağlı kilometre taşları ve sorumlu tek kıdemli danışmanla tanımlı bir kapsam." },
        retainer: { name: "Sürekli danışmanlık", note: "Sınırlar, ekipler ya da birden fazla iş kolu boyunca yürüyen mandatlar için sürekli bir danışmanlık ilişkisi." },
        programme: { name: "Program", note: "Brifingden takibe kadar tek koordinatörle yürütülen tarihli bir program." },
      },
      lead: "Bocconi eğitimli, mandatın tamamından sorumlu kıdemli danışman",
      desks: { milano: "Milano masası", roma: "Roma masası", istanbul: "İstanbul masası", other: "Brifingde atanacak koordinasyon masası" },
      specialists: {
        notaio: "Noter (notaio)",
        commercialista: "Commercialista",
        ymm: "YMM",
        immigration: "Göçmenlik danışmanı",
        banking: "Banka ilişkileri",
        sourcing: "Tedarik ve kalite mühendisi",
        customs: "Gümrük müşaviri",
        realestate: "Gayrimenkul danışmanı",
        protocol: "Protokol sorumlusu",
        interpreters: "Tercümanlar",
        legal: "Şirketler hukuku danışmanı",
      },
      languages: { en: "English", tr: "Türkçe", it: "Italiano" },
      checklist: {
        activity: "Faaliyetin ve karar vericilerin kısa bir tanımı",
        captable: "Öngörülen ortaklık yapısı ve sermaye",
        identities: "Ortakların ve yöneticilerin pasaport kopyaları",
        financials: "Son iki yılın mali tabloları ya da yeni girişim için iş planı",
        people: "Taşınacak kişilerin pasaportları, mevcut ikametleri ve aile yapısı",
        funds: "Sermaye blokajı için fon kaynağı belgeleri",
        product: "Ürün spesifikasyonları, hedef hacimler ve mevcut tedarikçiler",
        logistics: "Mevcut Incoterms ve lojistik düzeni",
        premises: "Tesis için konum, büyüklük ve bütçe aralığı",
        delegation: "Roller, tercih edilen tarihler ve hedef muhataplarla heyet listesi",
        groupchart: "Mevcut grup şeması",
        dates: "İlk çalışma toplantısı için tercih edilen tarihler",
      },
      profileLabels: { executive: "Bir yönetici", company: "Bir şirket", delegation: "Bir heyet", investor: "Bir özel yatırımcı" },
      closing: "Bu sayfa, yanıtlarınızdan çizilmiş bir başlangıç noktasıdır. Kıdemli danışman ilk görüşmeden önce okur; böylece görüşme doğru yerden başlar.",
    },
  },

  /* ─────────────────────────────────────────────────────────────── IT */
  it: {
    eyebrow: "Intake riservato",
    alt: "Brief",
    title: "Il vostro mandato su misura",
    sub: "Cinque domande. Una proposta disegnata come lavora davvero il nostro studio — moduli, fasi, desk — prima della prima conversazione. Nessun prezzo, nulla da scaricare.",
    intro: {
      kicker: "Come funziona",
      heading: "Diteci cosa vi serve. Il mandato lo disegniamo noi.",
      body: "Rispondete a cinque brevi domande su chi siete, la direzione, cosa volete ottenere, la scala e le città coinvolte. In cambio ricevete una scheda di proposta da richiedere, inoltrare o stampare.",
      points: ["Cinque domande", "Circa tre minuti", "Una proposta, non un listino"],
      start: "Iniziate il brief",
      resume: "Avete un brief in corso — riprende da dove eravate.",
      restart: "Ricominciare",
    },
    steps: {
      profile: { title: "Chi siete", question: "Per chi è questo mandato?", help: "Scegliete il profilo più vicino al vostro: dà il tono alla proposta." },
      direction: { title: "Direzione", question: "In quale direzione vi muovete?", help: "Verso l'Italia, verso la Türkiye, o una struttura che abbraccia entrambe le sponde." },
      objectives: { title: "Obiettivi", question: "Cosa deve ottenere il mandato?", help: "Scegliete tutto ciò che si applica. I moduli derivano da questa lista." },
      scale: {
        title: "Scala e tempi",
        question: "Quanto grande, e quanto presto?",
        help: "Persone e tempi definiscono il piano delle fasi; il fatturato è facoltativo e serve solo a dimensionare il team.",
        people: "Persone che si trasferiscono o partecipano",
        timeline: "Quando deve iniziare",
        revenue: "Fatturato del gruppo",
      },
      cities: {
        title: "Città e lingua",
        question: "Dove, e in quale lingua?",
        help: "Scegliete i desk da coinvolgere. La lingua di lavoro stabilisce chi guida il fascicolo.",
        cities: "Desk coinvolti",
        language: "Lingua di lavoro",
      },
    },
    options: {
      profile: [
        { id: "executive", title: "Un dirigente o un founder", hint: "Si trasferisce, assume un incarico o si struttura personalmente" },
        { id: "company", title: "Un'azienda", hint: "Un'impresa operativa che apre, approvvigiona o si riorganizza oltre confine" },
        { id: "delegation", title: "Una delegazione", hint: "Un gruppo istituzionale, camerale o imprenditoriale che pianifica una visita" },
        { id: "investor", title: "Un investitore privato", hint: "Capitale, immobili o una posizione di holding, senza ancora un'attività operativa" },
      ],
      direction: [
        { id: "italy", title: "Verso l'Italia", hint: "Milano, Roma — costituzione, permessi, fisco e banche" },
        { id: "turkiye", title: "Verso la Türkiye", hint: "Istanbul e le regioni industriali — sourcing, partner, società" },
        { id: "both", title: "Entrambe le sponde", hint: "Un gruppo con presenza e obblighi su ciascun lato" },
      ],
      objectives: [
        { id: "incorporation", title: "Costituire una società", hint: "S.r.l., S.p.A., A.Ş. o Ltd. Şti. — e se serve un livello di holding" },
        { id: "tax", title: "Architettura fiscale", hint: "Aliquota effettiva, posizione convenzionale, rimpatrio e compliance" },
        { id: "relocation", title: "Trasferire persone", hint: "Codice Fiscale, visti, permessi, residenza" },
        { id: "banking", title: "Aprire i conti", hint: "Conto di deposito capitale e conti operativi, firmatari, KYC" },
        { id: "sourcing", title: "Approvvigionare la produzione", hint: "Shortlist fornitori, audit in loco, RFQ sul landed cost" },
        { id: "partnerships", title: "Trovare un partner produttivo", hint: "Joint venture, contoterzismo, accordi quadro" },
        { id: "trade", title: "Impostare il corridoio commerciale", hint: "Documentazione Unione doganale, Incoterms, logistica" },
        { id: "realestate", title: "Trovare sede o immobile", hint: "Uffici, siti industriali, residenziale per i dirigenti" },
        { id: "delegation", title: "Pianificare una visita di delegazione", hint: "Agenda, controparti, protocollo e follow-up" },
      ],
      people: [
        { id: "1", title: "Un solo principal", hint: "Un singolo dirigente, founder o investitore" },
        { id: "2-5", title: "Da due a cinque", hint: "Un team fondatore o una famiglia" },
        { id: "6-20", title: "Da sei a venti", hint: "Un management team o una delegazione di media dimensione" },
        { id: "20+", title: "Più di venti", hint: "Una delegazione completa o un trasferimento di personale" },
      ],
      timeline: [
        { id: "now", title: "Subito", hint: "Le pratiche devono partire entro il mese" },
        { id: "1-3m", title: "Entro uno-tre mesi", hint: "Decisioni prese; sequenza da definire" },
        { id: "3-6m", title: "Tra tre e sei mesi", hint: "A budget e in programma per i prossimi trimestri" },
        { id: "exploratory", title: "Ancora in esplorazione", hint: "Si parte dall'audit; il resto si decide dopo il memo" },
      ],
      revenue: [
        { id: "under1m", title: "Sotto 1 mln €" },
        { id: "1-10m", title: "1–10 mln €" },
        { id: "10-50m", title: "10–50 mln €" },
        { id: "50m+", title: "Oltre 50 mln €" },
        { id: "undisclosed", title: "Preferisco non dirlo" },
      ],
      cities: [
        { id: "milano", title: "Milano", hint: "Corporate, finanza e la base industriale lombarda" },
        { id: "roma", title: "Roma", hint: "Istituzioni, ministeri e permessi" },
        { id: "istanbul", title: "Istanbul", hint: "Commercio, industria e la base produttiva anatolica" },
        { id: "other", title: "Altrove", hint: "Un'altra città su una delle due sponde — ce lo direte al briefing" },
      ],
      language: [
        { id: "en", title: "English" },
        { id: "tr", title: "Türkçe" },
        { id: "it", title: "Italiano" },
      ],
    },
    buttons: {
      continue: "Continua",
      back: "Indietro",
      startOver: "Ricomincia",
      showProposal: "Disegna la proposta",
      edit: "Modifica le risposte",
      request: "Richiedi questa proposta",
      whatsapp: "Invia via WhatsApp",
      copy: "Copia il riepilogo",
      copied: "Copiato",
      print: "Salva in PDF",
      send: "Invia la richiesta",
      sending: "Invio in corso…",
      retry: "Riprova",
    },
    validation: {
      pickOne: "Scegliete un'opzione per continuare.",
      pickAtLeastOne: "Scegliete almeno un'opzione.",
      required: "Obbligatorio",
      invalidEmail: "Inserite un indirizzo email valido",
      consentRequired: "Accettate per continuare",
    },
    progress: {
      stepOf: "Passo {n} di {total}",
      proposal: "Proposta",
      selected: "{n} selezionati",
      kbd: "↵ continua · ← indietro · 1–9 seleziona",
      live: "Passo {n} di {total}: {title}",
      proposalLive: "La vostra proposta è pronta.",
    },
    sheet: {
      preparedFor: "Preparata per",
      reference: "Riferimento",
      date: "Data",
      modules: "Moduli inclusi",
      phases: "Piano delle fasi",
      weekOne: "settimana",
      weekMany: "settimane",
      total: "Totale indicativo",
      indicative: "indicativa",
      disclaimer: "Le durate sono indicative e vengono confermate al termine della fase di Audit.",
      format: "Formato dell'incarico",
      advisors: "Team di consulenza",
      lead: "Responsabile",
      desks: "Desk",
      specialists: "Specialisti coinvolti",
      language: "Lingua di lavoro",
      checklist: "Cosa ci serve da voi",
      requestTitle: "Richiedete questa proposta",
      requestBody: "Lasciate i vostri recapiti: vi inviamo questa scheda, con una prima lettura dell'advisor senior, alla vostra casella.",
      name: "Nome",
      company: "Azienda",
      optional: "facoltativo",
      email: "Email di lavoro",
      phone: "WhatsApp o telefono",
      note: "Una nota per l'advisor",
      notePlaceholder: "Tutto ciò che le cinque domande non hanno colto.",
      consent: "Acconsento che Alvolo Consulting tratti questi dati per rispondere alla mia richiesta.",
      successTitle: "Ricevuta.",
      successBody: "La scheda è in viaggio verso l'advisor senior. Vi ricontattiamo entro un giorno lavorativo.",
      errorTitle: "La richiesta non è andata a buon fine.",
      errorBody: "Riprovate, oppure inviate il riepilogo direttamente via WhatsApp.",
      answers: "Le vostre risposte",
    },
    summary: {
      title: "ALVOLO CONSULTING — BRIEF",
      profile: "Profilo",
      direction: "Direzione",
      objectives: "Obiettivi",
      people: "Persone",
      timeline: "Tempi",
      revenue: "Fatturato",
      cities: "Città",
      language: "Lingua",
      note: "Nota",
      company: "Azienda",
      phone: "Telefono",
    },
    proposal: {
      mandates: {
        "milano-entry": "Mandato Ingresso Milano",
        "roma-entry": "Mandato Ingresso Roma",
        "italy-entry": "Mandato Ingresso Italia",
        "istanbul-entry": "Mandato Ingresso Istanbul",
        "anatolian-sourcing": "Mandato Sourcing Anatolia",
        "anatolian-partnership": "Mandato Partnership Anatolia",
        "two-shores": "Mandato Due Sponde",
        "private-client": "Mandato Private Client",
        delegation: "Programma Delegazione — {a} ⇄ {b}",
      },
      opening: {
        executive: {
          italy: "Un mandato riservato per un dirigente che si stabilisce in Italia.",
          turkiye: "Un mandato riservato per un dirigente che assume un incarico in Türkiye.",
          both: "Un mandato riservato per un dirigente la cui vita e il cui lavoro corrono su entrambe le sponde.",
        },
        company: {
          italy: "Un mandato societario per un'azienda che apre la propria presenza in Italia.",
          turkiye: "Un mandato societario per un'azienda che costruisce la propria posizione in Türkiye.",
          both: "Un mandato societario per un gruppo con presenza e obblighi su ciascun lato del corridoio.",
        },
        delegation: {
          italy: "Un programma per una delegazione in viaggio verso l'Italia.",
          turkiye: "Un programma per una delegazione in viaggio verso la Türkiye.",
          both: "Un programma per una delegazione che incontra controparti su entrambe le sponde.",
        },
        investor: {
          italy: "Un mandato per un investitore privato che prende posizione in Italia.",
          turkiye: "Un mandato per un investitore privato che prende posizione in Türkiye.",
          both: "Un mandato per un investitore privato con interessi su entrambe le sponde.",
        },
      },
      scope: "Il perimetro riunisce {modules}.",
      listAnd: "e",
      timing: {
        now: "È sequenziato per un avvio immediato, con la fase di Audit compressa perché le pratiche partano entro il mese.",
        "1-3m": "È sequenziato per un avvio entro il trimestre.",
        "3-6m": "È pianificato per i prossimi trimestri, con il tempo di preparare i documenti prima della prima pratica.",
        exploratory: "Si apre con la sola fase di Audit; le fasi successive vengono confermate una volta che il memo è sul tavolo.",
      },
      scale: {
        "1": "È dimensionato per un solo principal.",
        "2-5": "È dimensionato per un piccolo team o una famiglia.",
        "6-20": "È dimensionato per un management team, con relocation e onboarding condotti in parallelo.",
        "20+": "È dimensionato per un gruppo numeroso, con un coordinamento dedicato su ciascuna sponda.",
      },
      formatReason: {
        fixed: "Un perimetro definito, un advisor responsabile.",
        retainer: "Data la sua ampiezza, è preferibile condurlo come retainer continuativo anziché come singolo progetto.",
        programme: "È condotto come programma con date certe e un unico coordinatore dal briefing al follow-up.",
      },
      modules: {
        coordination: { name: "Desk di coordinamento", description: "Un advisor senior, un fascicolo: notaio, commercialista, YMM e banche vengono istruiti dallo stesso dossier." },
        vehicle: { name: "Veicolo italiano e costituzione", description: "S.r.l. o S.p.A., statuto, atto notarile, Registro delle Imprese, Partita IVA, PEC e SDI." },
        "tr-entity": { name: "Società turca e registro", description: "A.Ş. o Ltd. Şti., iscrizioni MERSİS, registrazione all'ufficio imposte e il rapporto con lo YMM." },
        holding: { name: "Holding e struttura di gruppo", description: "Se un livello di holding si giustifica davvero, e dove i soci vengono effettivamente remunerati." },
        tax: { name: "Architettura fiscale", description: "IRES, IRAP, imposta societaria turca, posizione convenzionale e ritenute modellate insieme prima della firma." },
        residency: { name: "Residenza fiscale personale", description: "Pianificazione della residenza per chi si trasferisce, incluso il regime impatriati dove applicabile." },
        permits: { name: "Permessi e residenza", description: "Codice Fiscale, il percorso di visto corretto, permesso di soggiorno o permessi di lavoro e soggiorno turchi." },
        settling: { name: "Insediamento dei dirigenti", description: "Casa, scuole, iscrizione anagrafica e il calendario pratico dell'arrivo." },
        banking: { name: "Impostazione bancaria", description: "Conto di deposito capitale e conti operativi, firmatari e pacchetto KYC nel formato di ciascuna banca." },
        sourcing: { name: "Ricerca e audit fornitori", description: "Shortlist tramite le Camere dell'Industria e le zone OSB, audit in loco, RFQ sul landed cost." },
        partnerships: { name: "Partnership produttiva", description: "Screening dei partner, termini di joint venture o contoterzismo, controlli qualità e governance dell'IP." },
        trade: { name: "Corridoio Unione doganale", description: "Documentazione A.TR ed EUR.1, Incoterms e rotta logistica progettati prima del primo ordine." },
        realestate: { name: "Sede e immobili", description: "Uffici, siti industriali o immobili residenziali: ricerca, due diligence e contratto." },
        programme: { name: "Disegno del programma", description: "Agenda, controparti e obiettivi per ogni giornata della visita, concordati prima della partenza." },
        meetings: { name: "Incontri istituzionali", description: "Camere, ministeri, zone industriali e aziende aperti attraverso le nostre relazioni dirette." },
        protocol: { name: "Protocollo e interpretariato", description: "Protocollo, ospitalità e interpretariato perché la delegazione sia ricevuta come merita." },
        compliance: { name: "Calendario degli adempimenti", description: "Adempimenti, scadenze e reporting continuativi condivisi tra commercialista e YMM." },
      },
      phaseFocus: {
        audit: "Assetto societario, attività e persone mappati sui due perimetri regolatori.",
        structure: {
          default: "Veicolo, posizione fiscale e governance scelti sui numeri.",
          holding: "Organigramma di gruppo, livello di holding e posizione convenzionale definiti insieme.",
        },
        formation: {
          entity: "Atto, iscrizioni ai registri e primo conto bancario, in parallelo con i permessi.",
          people: "Codice Fiscale, permessi e residenza condotti come un unico filone.",
          default: "Conti, firmatari e i documenti che ciascuna controparte si aspetta.",
        },
        onboarding: {
          industrial: "Fornitori, contratti e corridoio logistico impostati prima del primo ordine.",
          premises: "Sede assicurata e calendario degli adempimenti consegnato.",
          handover: "Calendario degli adempimenti, reporting e passaggio al desk continuativo.",
        },
      },
      delegationPhases: [
        { short: "Briefing", title: "Obiettivi e profilo della delegazione", focus: "Chi viaggia, cosa deve ottenere la visita, quali controparti contano." },
        { short: "Disegno del programma", title: "Agenda, controparti e logistica", focus: "Incontri richiesti, agenda concordata, protocollo e viaggio organizzati." },
        { short: "Settimana della delegazione", title: "La visita", focus: "Incontri accompagnati, interpretariato e debrief quotidiani." },
        { short: "Follow-up", title: "Accordi e passi successivi", focus: "Verbali, presentazioni portate avanti e i mandati che ne seguono." },
      ],
      formats: {
        fixed: { name: "Mandato a perimetro definito", note: "Un perimetro definito con milestone legate alle quattro fasi e un solo advisor senior responsabile." },
        retainer: { name: "Retainer", note: "Un rapporto di consulenza continuativo per mandati che attraversano confini, team o più filoni di lavoro insieme." },
        programme: { name: "Programma", note: "Un programma con date certe e un unico coordinatore dal briefing al follow-up." },
      },
      lead: "Advisor senior, formazione Bocconi, responsabile dell'intero mandato",
      desks: { milano: "Desk Milano", roma: "Desk Roma", istanbul: "Desk Istanbul", other: "Desk di coordinamento assegnato al briefing" },
      specialists: {
        notaio: "Notaio",
        commercialista: "Commercialista",
        ymm: "YMM turco",
        immigration: "Consulente immigrazione",
        banking: "Referente bancario",
        sourcing: "Ingegnere sourcing e qualità",
        customs: "Spedizioniere doganale",
        realestate: "Consulente immobiliare",
        protocol: "Responsabile protocollo",
        interpreters: "Interpreti",
        legal: "Consulente societario",
      },
      languages: { en: "English", tr: "Türkçe", it: "Italiano" },
      checklist: {
        activity: "Una breve descrizione dell'attività e dei decisori coinvolti",
        captable: "L'assetto societario e il capitale previsti",
        identities: "Copie dei passaporti di soci e amministratori",
        financials: "Gli ultimi due bilanci, o un business plan per una nuova iniziativa",
        people: "Passaporti, residenza attuale e composizione familiare delle persone che si trasferiscono",
        funds: "Documentazione sull'origine dei fondi per il deposito del capitale",
        product: "Specifiche di prodotto, volumi obiettivo e fornitori attuali",
        logistics: "Incoterms e impostazione logistica attuali",
        premises: "Località, dimensioni e fascia di budget per la sede",
        delegation: "L'elenco della delegazione con ruoli, date preferite e controparti obiettivo",
        groupchart: "L'organigramma di gruppo esistente",
        dates: "Le date preferite per la prima sessione di lavoro",
      },
      profileLabels: { executive: "Un dirigente", company: "Un'azienda", delegation: "Una delegazione", investor: "Un investitore privato" },
      closing: "Questa scheda è un punto di partenza disegnato dalle vostre risposte. L'advisor senior la legge prima della prima conversazione, perché quella conversazione inizi dal punto giusto.",
    },
  },
};
