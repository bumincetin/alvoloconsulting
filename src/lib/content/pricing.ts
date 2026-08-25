import type { Locale } from "@/lib/translations";

export type TierId = "essential" | "professional" | "enterprise";

export interface PricingTier {
  id: TierId;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  serviceId: string;
}

export type MatrixValue = boolean | string;

export interface MatrixRow {
  feature: string;
  values: Record<TierId, MatrixValue>;
}

export interface MatrixGroup {
  title: string;
  rows: MatrixRow[];
}

export interface PricingContent {
  eyebrow: string;
  heading: string;
  sub: string;
  vatNote: string;
  whatsapp: string;
  email: string;
  matrixLabel: string;
  matrixHint: string;
  featuredBadge: string;
  included: string;
  notIncluded: string;
  tiers: PricingTier[];
  matrix: MatrixGroup[];
  whatsappMessage: Record<TierId, string>;
  emailSubject: Record<TierId, string>;
}

export const pricingContent: Record<Locale, PricingContent> = {
  en: {
    eyebrow: "Engagement Matrix",
    heading: "Three tiers of engagement. One standard of care.",
    sub: "Fixed-fee onboarding packages for individuals and founders, and an institutional mandate for companies that need the full corridor.",
    vatNote: "Prices exclude VAT (22%). Government and notarial fees billed at cost.",
    whatsapp: "WhatsApp concierge",
    email: "Email intake",
    matrixLabel: "Feature comparison",
    matrixHint: "Expand a group to compare tiers",
    featuredBadge: "Most engaged",
    included: "Included",
    notIncluded: "Not included",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        price: "€299",
        cadence: "one-time",
        tagline: "Regulatory intake for individuals arriving in Italy.",
        features: ["Codice Fiscale issuance", "Document preparation & apostille guidance", "Regulatory intake interview", "Email support · 10 business days"],
        cta: "Start Essential",
        serviceId: "essential",
      },
      {
        id: "professional",
        name: "Professional",
        price: "€599",
        cadence: "one-time",
        tagline: "Residency and company-prep for professionals and founders.",
        features: ["Everything in Essential", "Residence permit advisory (permesso di soggiorno)", "Company registration preparation", "Priority liaison · 48h response", "Two video consultations"],
        cta: "Start Professional",
        featured: true,
        serviceId: "professional",
      },
      {
        id: "enterprise",
        name: "Enterprise / Institutional",
        price: "Custom",
        cadence: "mandate-based",
        tagline: "Turnkey corridor programme for companies and family offices.",
        features: ["Turnkey S.r.l. / S.p.A. incorporation", "Cross-border tax planning (IT–TR)", "Dedicated account manager", "Manufacturing supplier matchmaking", "Executive relocation & banking"],
        cta: "Request a Mandate",
        serviceId: "enterprise",
      },
    ],
    matrix: [
      {
        title: "Regulatory intake",
        rows: [
          { feature: "Codice Fiscale", values: { essential: true, professional: true, enterprise: "Directors & shareholders" } },
          { feature: "Document preparation", values: { essential: "Checklist & review", professional: "Prepared by us", enterprise: "Prepared & filed" } },
          { feature: "Intake interview", values: { essential: "30 min", professional: "60 min", enterprise: "Workshop" } },
        ],
      },
      {
        title: "Immigration & relocation",
        rows: [
          { feature: "Residence permit advisory", values: { essential: false, professional: true, enterprise: true } },
          { feature: "Investor / self-employment visa", values: { essential: false, professional: "Guidance", enterprise: "Full dossier" } },
          { feature: "Executive & family relocation", values: { essential: false, professional: false, enterprise: true } },
        ],
      },
      {
        title: "Corporate & tax",
        rows: [
          { feature: "Company registration prep", values: { essential: false, professional: true, enterprise: true } },
          { feature: "Turnkey incorporation (notary, VAT, PEC)", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Cross-border tax architecture", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Banking & capital deposit", values: { essential: false, professional: "Introduction", enterprise: "Managed" } },
        ],
      },
      {
        title: "Industrial & liaison",
        rows: [
          { feature: "Manufacturing supplier matchmaking", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Dedicated account manager", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Response time", values: { essential: "10 business days", professional: "48 hours", enterprise: "Same day" } },
        ],
      },
    ],
    whatsappMessage: {
      essential: "Hello Alvolo — I would like to start the Essential package (€299).",
      professional: "Hello Alvolo — I would like to start the Professional package (€599).",
      enterprise: "Hello Alvolo — I would like to discuss an Enterprise / Institutional mandate.",
    },
    emailSubject: {
      essential: "Essential package (€299) — intake request",
      professional: "Professional package (€599) — intake request",
      enterprise: "Enterprise / Institutional mandate — request",
    },
  },
  tr: {
    eyebrow: "Hizmet Matrisi",
    heading: "Üç hizmet seviyesi. Tek özen standardı.",
    sub: "Bireyler ve kurucular için sabit ücretli onboarding paketleri; koridorun tamamına ihtiyaç duyan şirketler için kurumsal mandat.",
    vatNote: "Fiyatlara KDV (%22) dahil değildir. Resmi harçlar ve noter ücretleri maliyetinden faturalanır.",
    whatsapp: "WhatsApp konsiyerj",
    email: "E-posta başvurusu",
    matrixLabel: "Özellik karşılaştırması",
    matrixHint: "Seviyeleri karşılaştırmak için bir grubu açın",
    featuredBadge: "En çok tercih edilen",
    included: "Dahil",
    notIncluded: "Dahil değil",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        price: "299 €",
        cadence: "tek seferlik",
        tagline: "İtalya'ya gelen bireyler için düzenleyici başlangıç.",
        features: ["Codice Fiscale alımı", "Belge hazırlığı ve apostil rehberliği", "Düzenleyici başlangıç görüşmesi", "E-posta desteği · 10 iş günü"],
        cta: "Essential ile Başla",
        serviceId: "essential",
      },
      {
        id: "professional",
        name: "Professional",
        price: "599 €",
        cadence: "tek seferlik",
        tagline: "Profesyoneller ve kurucular için oturum ve şirket hazırlığı.",
        features: ["Essential'daki her şey", "Oturum izni danışmanlığı (permesso di soggiorno)", "Şirket tescili hazırlığı", "Öncelikli irtibat · 48 saat yanıt", "İki görüntülü danışmanlık"],
        cta: "Professional ile Başla",
        featured: true,
        serviceId: "professional",
      },
      {
        id: "enterprise",
        name: "Enterprise / Kurumsal",
        price: "Özel",
        cadence: "mandat bazlı",
        tagline: "Şirketler ve aile ofisleri için anahtar teslim koridor programı.",
        features: ["Anahtar teslim S.r.l. / S.p.A. kuruluşu", "Sınır ötesi vergi planlaması (İT–TR)", "Özel müşteri yöneticisi", "İmalat tedarikçisi eşleştirme", "Yönetici taşınması ve bankacılık"],
        cta: "Mandat Talep Et",
        serviceId: "enterprise",
      },
    ],
    matrix: [
      {
        title: "Düzenleyici başlangıç",
        rows: [
          { feature: "Codice Fiscale", values: { essential: true, professional: true, enterprise: "Yöneticiler ve ortaklar" } },
          { feature: "Belge hazırlığı", values: { essential: "Kontrol listesi ve inceleme", professional: "Bizim tarafımızdan hazırlanır", enterprise: "Hazırlanır ve dosyalanır" } },
          { feature: "Başlangıç görüşmesi", values: { essential: "30 dk", professional: "60 dk", enterprise: "Çalıştay" } },
        ],
      },
      {
        title: "Göç ve taşınma",
        rows: [
          { feature: "Oturum izni danışmanlığı", values: { essential: false, professional: true, enterprise: true } },
          { feature: "Yatırımcı / serbest meslek vizesi", values: { essential: false, professional: "Rehberlik", enterprise: "Tam dosya" } },
          { feature: "Yönetici ve aile taşınması", values: { essential: false, professional: false, enterprise: true } },
        ],
      },
      {
        title: "Kurumsal ve vergi",
        rows: [
          { feature: "Şirket tescili hazırlığı", values: { essential: false, professional: true, enterprise: true } },
          { feature: "Anahtar teslim kuruluş (noter, KDV, PEC)", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Sınır ötesi vergi mimarisi", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Bankacılık ve sermaye blokajı", values: { essential: false, professional: "Tanıştırma", enterprise: "Yönetilir" } },
        ],
      },
      {
        title: "Sanayi ve irtibat",
        rows: [
          { feature: "İmalat tedarikçisi eşleştirme", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Özel müşteri yöneticisi", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Yanıt süresi", values: { essential: "10 iş günü", professional: "48 saat", enterprise: "Aynı gün" } },
        ],
      },
    ],
    whatsappMessage: {
      essential: "Merhaba Alvolo — Essential paketiyle (299 €) başlamak istiyorum.",
      professional: "Merhaba Alvolo — Professional paketiyle (599 €) başlamak istiyorum.",
      enterprise: "Merhaba Alvolo — Kurumsal bir mandat görüşmek istiyorum.",
    },
    emailSubject: {
      essential: "Essential paketi (299 €) — başvuru",
      professional: "Professional paketi (599 €) — başvuru",
      enterprise: "Kurumsal mandat — talep",
    },
  },
  it: {
    eyebrow: "Matrice di Incarico",
    heading: "Tre livelli di incarico. Un unico standard di cura.",
    sub: "Pacchetti di onboarding a tariffa fissa per privati e founder, e un mandato istituzionale per le aziende che necessitano dell'intero corridoio.",
    vatNote: "Prezzi IVA esclusa (22%). Oneri governativi e notarili fatturati al costo.",
    whatsapp: "Concierge WhatsApp",
    email: "Richiesta via email",
    matrixLabel: "Confronto delle funzionalità",
    matrixHint: "Espandi un gruppo per confrontare i livelli",
    featuredBadge: "Più richiesto",
    included: "Incluso",
    notIncluded: "Non incluso",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        price: "€299",
        cadence: "una tantum",
        tagline: "Intake regolatorio per chi arriva in Italia.",
        features: ["Rilascio Codice Fiscale", "Preparazione documenti e guida all'apostille", "Colloquio di intake regolatorio", "Supporto email · 10 giorni lavorativi"],
        cta: "Inizia con Essential",
        serviceId: "essential",
      },
      {
        id: "professional",
        name: "Professional",
        price: "€599",
        cadence: "una tantum",
        tagline: "Residenza e preparazione societaria per professionisti e founder.",
        features: ["Tutto ciò che è in Essential", "Consulenza permesso di soggiorno", "Preparazione alla registrazione societaria", "Liaison prioritaria · risposta in 48h", "Due videoconsulenze"],
        cta: "Inizia con Professional",
        featured: true,
        serviceId: "professional",
      },
      {
        id: "enterprise",
        name: "Enterprise / Istituzionale",
        price: "Su misura",
        cadence: "a mandato",
        tagline: "Programma corridoio chiavi in mano per aziende e family office.",
        features: ["Costituzione S.r.l. / S.p.A. chiavi in mano", "Pianificazione fiscale transfrontaliera (IT–TR)", "Account manager dedicato", "Matchmaking fornitori manifatturieri", "Relocation dirigenti e banking"],
        cta: "Richiedi un Mandato",
        serviceId: "enterprise",
      },
    ],
    matrix: [
      {
        title: "Intake regolatorio",
        rows: [
          { feature: "Codice Fiscale", values: { essential: true, professional: true, enterprise: "Amministratori e soci" } },
          { feature: "Preparazione documenti", values: { essential: "Checklist e revisione", professional: "Preparati da noi", enterprise: "Preparati e depositati" } },
          { feature: "Colloquio di intake", values: { essential: "30 min", professional: "60 min", enterprise: "Workshop" } },
        ],
      },
      {
        title: "Immigrazione e relocation",
        rows: [
          { feature: "Consulenza permesso di soggiorno", values: { essential: false, professional: true, enterprise: true } },
          { feature: "Visto investitori / lavoro autonomo", values: { essential: false, professional: "Orientamento", enterprise: "Dossier completo" } },
          { feature: "Relocation dirigenti e famiglie", values: { essential: false, professional: false, enterprise: true } },
        ],
      },
      {
        title: "Societario e fiscale",
        rows: [
          { feature: "Preparazione registrazione societaria", values: { essential: false, professional: true, enterprise: true } },
          { feature: "Costituzione chiavi in mano (notaio, IVA, PEC)", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Architettura fiscale transfrontaliera", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Banking e deposito capitale", values: { essential: false, professional: "Presentazione", enterprise: "Gestito" } },
        ],
      },
      {
        title: "Industriale e liaison",
        rows: [
          { feature: "Matchmaking fornitori manifatturieri", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Account manager dedicato", values: { essential: false, professional: false, enterprise: true } },
          { feature: "Tempo di risposta", values: { essential: "10 giorni lavorativi", professional: "48 ore", enterprise: "In giornata" } },
        ],
      },
    ],
    whatsappMessage: {
      essential: "Buongiorno Alvolo — vorrei iniziare con il pacchetto Essential (€299).",
      professional: "Buongiorno Alvolo — vorrei iniziare con il pacchetto Professional (€599).",
      enterprise: "Buongiorno Alvolo — vorrei discutere un mandato Enterprise / Istituzionale.",
    },
    emailSubject: {
      essential: "Pacchetto Essential (€299) — richiesta di intake",
      professional: "Pacchetto Professional (€599) — richiesta di intake",
      enterprise: "Mandato Enterprise / Istituzionale — richiesta",
    },
  },
};
