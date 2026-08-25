import type { Locale } from "@/lib/translations";

export interface ProtocolPhase {
  index: string;
  title: string;
  badge: string;
  duration: string;
  summary: string;
  specs: { k: string; v: string }[];
  deliverables: string[];
  authorities: string[];
}

export interface ProtocolContent {
  eyebrow: string;
  heading: string;
  sub: string;
  progressLabel: string;
  deliverablesLabel: string;
  authoritiesLabel: string;
  durationLabel: string;
  completedLabel: string;
  phases: ProtocolPhase[];
}

export const protocolContent: Record<Locale, ProtocolContent> = {
  en: {
    eyebrow: "Market Entry Protocol",
    heading: "Four phases. One accountable programme.",
    sub: "Every mandate runs the same sequenced protocol, so timelines, authorities and deliverables are visible before the first filing.",
    progressLabel: "Protocol progress",
    deliverablesLabel: "Deliverables",
    authoritiesLabel: "Counterparties",
    durationLabel: "Typical duration",
    completedLabel: "Complete",
    phases: [
      {
        index: "01",
        title: "Jurisdictional & Compliance Audit",
        badge: "Audit",
        duration: "1–2 weeks",
        summary: "We map the client's shareholding, activity and people against Italian and Turkish regulatory perimeters — licensing, immigration, AML and sector rules — before any structure is drawn.",
        specs: [
          { k: "Inputs", v: "Cap table · activity description · founder profiles" },
          { k: "Method", v: "Regulatory perimeter matrix · risk scoring" },
          { k: "Output", v: "Go / conditional-go memo" },
        ],
        deliverables: ["Jurisdiction memo", "Licensing map", "AML / KYC pre-clearance", "Immigration route options"],
        authorities: ["Agenzia delle Entrate", "Banca d'Italia (where licensed)", "Questura / Prefettura", "Turkish Trade Registry"],
      },
      {
        index: "02",
        title: "Tax Architecture & Corporate Structuring",
        badge: "Structure",
        duration: "2–3 weeks",
        summary: "Entity choice, holding layers, IP location and treaty positioning are modelled quantitatively — effective tax rate, cash repatriation and exit scenarios — and signed off by the founders.",
        specs: [
          { k: "Inputs", v: "Audit memo · 3-year financial model" },
          { k: "Method", v: "ETR modelling · treaty analysis · PEX / patent box screening" },
          { k: "Output", v: "Structure chart & tax memo" },
        ],
        deliverables: ["Structure chart", "Tax memo (IRES / IRAP / TR CIT)", "Treaty position paper", "Transfer-pricing brief"],
        authorities: ["Notaio", "Commercialista", "Turkish YMM / SMMM", "Banks (capital deposit)"],
      },
      {
        index: "03",
        title: "Entity Formation, Codice Fiscale & Executive Relocation",
        badge: "Formation",
        duration: "3–8 weeks",
        summary: "Notarial deed, registry filings, VAT and PEC activation run in parallel with Codice Fiscale issuance, permits and executive relocation, so the company and its people land on the same date.",
        specs: [
          { k: "Inputs", v: "Signed structure · KYC pack · apostilled documents" },
          { k: "Method", v: "Parallel tracks: corporate · fiscal · immigration" },
          { k: "Output", v: "Operational entity, banked and VAT-active" },
        ],
        deliverables: ["Atto costitutivo & statuto", "Partita IVA · PEC · SDI", "Codice Fiscale & permesso di soggiorno", "Bank accounts & signatories"],
        authorities: ["Registro delle Imprese", "Agenzia delle Entrate", "Questura / Sportello Unico", "INPS / INAIL"],
      },
      {
        index: "04",
        title: "Local Supply Chain & Industrial Onboarding",
        badge: "Onboarding",
        duration: "4–14 weeks",
        summary: "For outbound mandates we audit and contract manufacturing partners, design the Customs Union logistics corridor and embed quality and IP governance; for inbound mandates we onboard local suppliers, payroll and advisors.",
        specs: [
          { k: "Inputs", v: "Product specs · volumes · quality standards" },
          { k: "Method", v: "Supplier audits · RFQ · landed-cost model · contract governance" },
          { k: "Output", v: "Contracted supply base & operating cadence" },
        ],
        deliverables: ["Supplier scorecards", "Framework agreements", "Logistics & Incoterms matrix", "Quality & IP governance"],
        authorities: ["Chambers of Industry", "OSB industrial zones", "Customs (A.TR)", "Logistics operators"],
      },
    ],
  },
  tr: {
    eyebrow: "Pazar Giriş Protokolü",
    heading: "Dört aşama. Tek sorumlu program.",
    sub: "Her görev aynı sıralı protokolü izler; böylece takvimler, kurumlar ve çıktılar ilk başvurudan önce görünür olur.",
    progressLabel: "Protokol ilerlemesi",
    deliverablesLabel: "Çıktılar",
    authoritiesLabel: "Muhataplar",
    durationLabel: "Tipik süre",
    completedLabel: "Tamamlandı",
    phases: [
      {
        index: "01",
        title: "Yargı Alanı ve Uyum Denetimi",
        badge: "Denetim",
        duration: "1–2 hafta",
        summary: "Herhangi bir yapı çizilmeden önce müşterinin ortaklık yapısını, faaliyetini ve kadrosunu İtalyan ve Türk düzenleyici çerçevelerine — lisanslama, göç, AML ve sektör kuralları — göre haritalarız.",
        specs: [
          { k: "Girdiler", v: "Ortaklık tablosu · faaliyet tanımı · kurucu profilleri" },
          { k: "Yöntem", v: "Düzenleyici çerçeve matrisi · risk puanlama" },
          { k: "Çıktı", v: "Devam / koşullu devam notu" },
        ],
        deliverables: ["Yargı alanı notu", "Lisans haritası", "AML / KYC ön onayı", "Göç rotası seçenekleri"],
        authorities: ["Agenzia delle Entrate", "Banca d'Italia (lisanslı ise)", "Questura / Prefettura", "Ticaret Sicili"],
      },
      {
        index: "02",
        title: "Vergi Mimarisi ve Kurumsal Yapılandırma",
        badge: "Yapı",
        duration: "2–3 hafta",
        summary: "Şirket türü, holding katmanları, fikri mülkiyet konumu ve anlaşma konumlandırması nicel olarak modellenir — efektif vergi oranı, nakit transferi ve çıkış senaryoları — ve kurucular tarafından onaylanır.",
        specs: [
          { k: "Girdiler", v: "Denetim notu · 3 yıllık finansal model" },
          { k: "Yöntem", v: "EVO modelleme · anlaşma analizi · PEX / patent box taraması" },
          { k: "Çıktı", v: "Yapı şeması ve vergi notu" },
        ],
        deliverables: ["Yapı şeması", "Vergi notu (IRES / IRAP / TR KV)", "Anlaşma pozisyon raporu", "Transfer fiyatlandırma özeti"],
        authorities: ["Noter", "Commercialista", "YMM / SMMM", "Bankalar (sermaye blokajı)"],
      },
      {
        index: "03",
        title: "Şirket Kuruluşu, Codice Fiscale ve Yönetici Taşınması",
        badge: "Kuruluş",
        duration: "3–8 hafta",
        summary: "Noter senedi, sicil tescili, KDV ve PEC aktivasyonu; Codice Fiscale, izinler ve yönetici taşınmasıyla paralel yürür — şirket ve insanları aynı tarihte yerleşir.",
        specs: [
          { k: "Girdiler", v: "Onaylı yapı · KYC paketi · apostilli belgeler" },
          { k: "Yöntem", v: "Paralel hatlar: kurumsal · mali · göç" },
          { k: "Çıktı", v: "Bankalanmış, KDV aktif operasyonel şirket" },
        ],
        deliverables: ["Atto costitutivo ve statuto", "Partita IVA · PEC · SDI", "Codice Fiscale ve permesso di soggiorno", "Banka hesapları ve imza yetkilileri"],
        authorities: ["Registro delle Imprese", "Agenzia delle Entrate", "Questura / Sportello Unico", "INPS / INAIL"],
      },
      {
        index: "04",
        title: "Yerel Tedarik Zinciri ve Sanayi Entegrasyonu",
        badge: "Entegrasyon",
        duration: "4–14 hafta",
        summary: "Dışa dönük görevlerde imalat ortaklarını denetler ve sözleşmeye bağlarız, Gümrük Birliği lojistik koridorunu tasarlar, kalite ve fikri mülkiyet yönetişimini yerleştiririz; içe dönük görevlerde yerel tedarikçileri, bordroyu ve danışmanları devreye alırız.",
        specs: [
          { k: "Girdiler", v: "Ürün özellikleri · hacimler · kalite standartları" },
          { k: "Yöntem", v: "Tedarikçi denetimleri · RFQ · teslim maliyeti modeli · sözleşme yönetişimi" },
          { k: "Çıktı", v: "Sözleşmeli tedarik tabanı ve operasyon ritmi" },
        ],
        deliverables: ["Tedarikçi karneleri", "Çerçeve sözleşmeler", "Lojistik ve Incoterms matrisi", "Kalite ve FM yönetişimi"],
        authorities: ["Sanayi Odaları", "OSB'ler", "Gümrük (A.TR)", "Lojistik operatörleri"],
      },
    ],
  },
  it: {
    eyebrow: "Protocollo di Ingresso nel Mercato",
    heading: "Quattro fasi. Un unico programma responsabile.",
    sub: "Ogni mandato segue lo stesso protocollo sequenziato, così tempistiche, controparti e deliverable sono visibili prima del primo deposito.",
    progressLabel: "Avanzamento del protocollo",
    deliverablesLabel: "Deliverable",
    authoritiesLabel: "Controparti",
    durationLabel: "Durata tipica",
    completedLabel: "Completata",
    phases: [
      {
        index: "01",
        title: "Audit Giurisdizionale e di Compliance",
        badge: "Audit",
        duration: "1–2 settimane",
        summary: "Mappiamo assetto proprietario, attività e persone del cliente rispetto ai perimetri regolatori italiani e turchi — autorizzazioni, immigrazione, antiriciclaggio e norme di settore — prima di disegnare qualsiasi struttura.",
        specs: [
          { k: "Input", v: "Cap table · descrizione attività · profili dei founder" },
          { k: "Metodo", v: "Matrice dei perimetri regolatori · risk scoring" },
          { k: "Output", v: "Memo go / conditional-go" },
        ],
        deliverables: ["Memo giurisdizionale", "Mappa autorizzativa", "Pre-clearance AML / KYC", "Opzioni di percorso migratorio"],
        authorities: ["Agenzia delle Entrate", "Banca d'Italia (se autorizzata)", "Questura / Prefettura", "Registro del Commercio turco"],
      },
      {
        index: "02",
        title: "Architettura Fiscale e Strutturazione Societaria",
        badge: "Struttura",
        duration: "2–3 settimane",
        summary: "Scelta del veicolo, livelli di holding, localizzazione dell'IP e posizionamento convenzionale sono modellati quantitativamente — aliquota effettiva, rimpatrio di cassa e scenari di exit — e approvati dai founder.",
        specs: [
          { k: "Input", v: "Memo di audit · modello finanziario a 3 anni" },
          { k: "Metodo", v: "Modellazione ETR · analisi convenzionale · screening PEX / patent box" },
          { k: "Output", v: "Organigramma e memo fiscale" },
        ],
        deliverables: ["Organigramma societario", "Memo fiscale (IRES / IRAP / CIT TR)", "Position paper convenzionale", "Brief transfer pricing"],
        authorities: ["Notaio", "Commercialista", "YMM / SMMM turco", "Banche (deposito capitale)"],
      },
      {
        index: "03",
        title: "Costituzione, Codice Fiscale e Relocation dei Dirigenti",
        badge: "Costituzione",
        duration: "3–8 settimane",
        summary: "Atto notarile, iscrizioni, attivazione IVA e PEC procedono in parallelo con Codice Fiscale, permessi e relocation dei dirigenti, così la società e le sue persone arrivano nella stessa data.",
        specs: [
          { k: "Input", v: "Struttura firmata · pacchetto KYC · documenti apostillati" },
          { k: "Metodo", v: "Binari paralleli: societario · fiscale · immigrazione" },
          { k: "Output", v: "Entità operativa, con conto e IVA attiva" },
        ],
        deliverables: ["Atto costitutivo e statuto", "Partita IVA · PEC · SDI", "Codice Fiscale e permesso di soggiorno", "Conti bancari e firmatari"],
        authorities: ["Registro delle Imprese", "Agenzia delle Entrate", "Questura / Sportello Unico", "INPS / INAIL"],
      },
      {
        index: "04",
        title: "Supply Chain Locale e Onboarding Industriale",
        badge: "Onboarding",
        duration: "4–14 settimane",
        summary: "Per i mandati outbound verifichiamo e contrattualizziamo partner manifatturieri, progettiamo il corridoio logistico in Unione doganale e integriamo la governance di qualità e IP; per i mandati inbound attiviamo fornitori locali, payroll e consulenti.",
        specs: [
          { k: "Input", v: "Specifiche di prodotto · volumi · standard qualitativi" },
          { k: "Metodo", v: "Audit fornitori · RFQ · modello landed cost · governance contrattuale" },
          { k: "Output", v: "Base fornitori contrattualizzata e cadenza operativa" },
        ],
        deliverables: ["Scorecard fornitori", "Accordi quadro", "Matrice logistica e Incoterms", "Governance qualità e IP"],
        authorities: ["Camere dell'Industria", "Zone industriali OSB", "Dogane (A.TR)", "Operatori logistici"],
      },
    ],
  },
};
