import type { Locale } from "@/lib/translations";
import type { CityId } from "@/lib/geo/cities";

export interface TelemetryRow {
  k: string;
  v: string;
}

export interface CityTelemetry {
  id: CityId;
  city: string;
  country: string;
  headline: string;
  rows: TelemetryRow[];
}

export interface HeroPillar {
  label: string;
  value: string;
}

export interface HeroContent {
  eyebrow: string;
  /** Headline split into deliberate lines; each line is masked and revealed on its own baseline. */
  headline: string[];
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pillars: HeroPillar[];
  telemetryTitle: string;
  telemetryHint: string;
  localTime: string;
  corridorStatus: string;
  scrollHint: string;
  nodes: CityTelemetry[];
}

export const heroContent: Record<Locale, HeroContent> = {
  en: {
    eyebrow: "Milan · Rome · Istanbul — Cross-Border Advisory",
    headline: ["The Sovereign Corridor", "for Cross-Border Enterprise"],
    sub: "Bilateral advisory operating across Milan, Rome and Istanbul. We structure, incorporate and relocate enterprises entering the Italian market — and source, partner and scale those expanding into Turkish manufacturing.",
    ctaPrimary: "Request a Consultation",
    ctaSecondary: "Explore the Corridors",
    pillars: [
      { label: "Inbound · Italy", value: "S.r.l. / S.p.A. incorporation, tax architecture, Codice Fiscale, residency & banking" },
      { label: "Outbound · Türkiye", value: "Manufacturing partnerships, strategic sourcing, supply-chain & entity structuring" },
      { label: "Pedigree", value: "Founded by Università Bocconi specialists in quantitative finance and law" },
    ],
    telemetryTitle: "Jurisdiction Telemetry",
    telemetryHint: "Hover a node on the globe or select a city",
    localTime: "Local time",
    corridorStatus: "Corridor status: active",
    scrollHint: "Scroll to explore",
    nodes: [
      {
        id: "milan",
        city: "Milan",
        country: "Italy · EU",
        headline: "EU Single Market / S.r.l. Framework",
        rows: [
          { k: "Entity", v: "S.r.l. · S.p.A. · Branch" },
          { k: "Corporate tax", v: "IRES 24% + IRAP 3.9%" },
          { k: "Registry", v: "Registro delle Imprese · CCIAA Milano" },
          { k: "Banking", v: "UniCredit · Intesa · fintech rails" },
        ],
      },
      {
        id: "rome",
        city: "Rome",
        country: "Italy · EU",
        headline: "Regulatory & Ministerial Gateway",
        rows: [
          { k: "Immigration", v: "Permesso di soggiorno · Investor visa" },
          { k: "Fiscal authority", v: "Agenzia delle Entrate" },
          { k: "Incentives", v: "Impatriati regime · Patent box" },
          { k: "Institutions", v: "Ministries · Chambers · Consulates" },
        ],
      },
      {
        id: "istanbul",
        city: "Istanbul",
        country: "Türkiye",
        headline: "Industrial Sourcing & Logistics Hub",
        rows: [
          { k: "Entity", v: "Ltd. Şti. · A.Ş. · Free-zone branch" },
          { k: "Corporate tax", v: "25% · IT–TR double tax treaty" },
          { k: "Trade regime", v: "EU–TR Customs Union · A.TR certificate" },
          { k: "Clusters", v: "Bursa · Kocaeli · İzmir · Gaziantep" },
        ],
      },
    ],
  },
  tr: {
    eyebrow: "Milano · Roma · İstanbul — Sınır Ötesi Danışmanlık",
    headline: ["Sınır Ötesi Girişimler için", "Egemen Koridor"],
    sub: "Milano, Roma ve İstanbul arasında çalışan iki yönlü danışmanlık. İtalya pazarına giren şirketleri yapılandırır, kurar ve taşırız; Türk imalat sanayisine açılanlar için tedarikçi bulur, ortaklık kurar ve ölçeklendiririz.",
    ctaPrimary: "Danışmanlık Talep Et",
    ctaSecondary: "Koridorları Keşfet",
    pillars: [
      { label: "İçe Dönük · İtalya", value: "S.r.l. / S.p.A. kuruluşu, vergi mimarisi, Codice Fiscale, oturum izni ve bankacılık" },
      { label: "Dışa Dönük · Türkiye", value: "İmalat ortaklıkları, stratejik tedarik, tedarik zinciri ve şirket yapılandırması" },
      { label: "Köken", value: "Università Bocconi kökenli nicel finans ve hukuk uzmanları tarafından kuruldu" },
    ],
    telemetryTitle: "Yargı Alanı Telemetrisi",
    telemetryHint: "Küre üzerinde bir düğüme gelin veya şehir seçin",
    localTime: "Yerel saat",
    corridorStatus: "Koridor durumu: aktif",
    scrollHint: "Keşfetmek için kaydırın",
    nodes: [
      {
        id: "milan",
        city: "Milano",
        country: "İtalya · AB",
        headline: "AB Tek Pazarı / S.r.l. Çerçevesi",
        rows: [
          { k: "Şirket türü", v: "S.r.l. · S.p.A. · Şube" },
          { k: "Kurumlar vergisi", v: "IRES %24 + IRAP %3,9" },
          { k: "Sicil", v: "Registro delle Imprese · CCIAA Milano" },
          { k: "Bankacılık", v: "UniCredit · Intesa · fintech altyapısı" },
        ],
      },
      {
        id: "rome",
        city: "Roma",
        country: "İtalya · AB",
        headline: "Düzenleyici ve Bakanlık Kapısı",
        rows: [
          { k: "Göç", v: "Permesso di soggiorno · Yatırımcı vizesi" },
          { k: "Vergi idaresi", v: "Agenzia delle Entrate" },
          { k: "Teşvikler", v: "Impatriati rejimi · Patent box" },
          { k: "Kurumlar", v: "Bakanlıklar · Odalar · Konsolosluklar" },
        ],
      },
      {
        id: "istanbul",
        city: "İstanbul",
        country: "Türkiye",
        headline: "Sanayi Tedarik ve Lojistik Merkezi",
        rows: [
          { k: "Şirket türü", v: "Ltd. Şti. · A.Ş. · Serbest bölge şubesi" },
          { k: "Kurumlar vergisi", v: "%25 · İT–TR çifte vergilendirme anlaşması" },
          { k: "Ticaret rejimi", v: "AB–TR Gümrük Birliği · A.TR belgesi" },
          { k: "Kümeler", v: "Bursa · Kocaeli · İzmir · Gaziantep" },
        ],
      },
    ],
  },
  it: {
    eyebrow: "Milano · Roma · Istanbul — Advisory Transfrontaliera",
    headline: ["Il Corridoio Sovrano", "per l'Impresa Transfrontaliera"],
    sub: "Advisory bilaterale operativa tra Milano, Roma e Istanbul. Strutturiamo, costituiamo e trasferiamo le imprese che entrano nel mercato italiano — e selezioniamo partner, fornitori e capacità produttiva per chi si espande nella manifattura turca.",
    ctaPrimary: "Richiedi una Consulenza",
    ctaSecondary: "Esplora i Corridoi",
    pillars: [
      { label: "Inbound · Italia", value: "Costituzione S.r.l. / S.p.A., architettura fiscale, Codice Fiscale, permessi e banking" },
      { label: "Outbound · Türkiye", value: "Partnership industriali, sourcing strategico, supply chain e strutturazione societaria" },
      { label: "Pedigree", value: "Fondata da specialisti dell'Università Bocconi in finanza quantitativa e diritto" },
    ],
    telemetryTitle: "Telemetria Giurisdizionale",
    telemetryHint: "Passa su un nodo del globo o seleziona una città",
    localTime: "Ora locale",
    corridorStatus: "Stato corridoio: attivo",
    scrollHint: "Scorri per esplorare",
    nodes: [
      {
        id: "milan",
        city: "Milano",
        country: "Italia · UE",
        headline: "Mercato Unico UE / Framework S.r.l.",
        rows: [
          { k: "Veicolo", v: "S.r.l. · S.p.A. · Sede secondaria" },
          { k: "Imposte societarie", v: "IRES 24% + IRAP 3,9%" },
          { k: "Registro", v: "Registro delle Imprese · CCIAA Milano" },
          { k: "Banking", v: "UniCredit · Intesa · rail fintech" },
        ],
      },
      {
        id: "rome",
        city: "Roma",
        country: "Italia · UE",
        headline: "Gateway Regolatorio e Ministeriale",
        rows: [
          { k: "Immigrazione", v: "Permesso di soggiorno · Visto investitori" },
          { k: "Autorità fiscale", v: "Agenzia delle Entrate" },
          { k: "Incentivi", v: "Regime impatriati · Patent box" },
          { k: "Istituzioni", v: "Ministeri · Camere · Consolati" },
        ],
      },
      {
        id: "istanbul",
        city: "Istanbul",
        country: "Türkiye",
        headline: "Hub Industriale di Sourcing e Logistica",
        rows: [
          { k: "Veicolo", v: "Ltd. Şti. · A.Ş. · Filiale in zona franca" },
          { k: "Imposte societarie", v: "25% · Convenzione IT–TR contro le doppie imposizioni" },
          { k: "Regime commerciale", v: "Unione doganale UE–TR · Certificato A.TR" },
          { k: "Distretti", v: "Bursa · Kocaeli · İzmir · Gaziantep" },
        ],
      },
    ],
  },
};
