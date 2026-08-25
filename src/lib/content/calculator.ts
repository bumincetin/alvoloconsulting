import type { Locale } from "@/lib/translations";
import type { ChecklistKey, CompanySize, EntityKey, Jurisdiction, SavingsKey, Sector } from "@/lib/calc/expansion";

export interface CalculatorContent {
  eyebrow: string;
  heading: string;
  sub: string;
  disclaimer: string;
  inputs: {
    size: string;
    sizeOptions: Record<CompanySize, string>;
    sector: string;
    sectorOptions: Record<Sector, string>;
    jurisdiction: string;
    jurisdictionOptions: Record<Jurisdiction, string>;
  };
  outputs: {
    entity: string;
    timeline: string;
    weeks: string;
    capital: string;
    capitalNote: string;
    minimum: string;
    savings: string;
    checklist: string;
    complexity: string;
    complexityLevels: string[];
  };
  entities: Record<EntityKey, { name: string; note: string }>;
  checklist: Record<ChecklistKey, string>;
  savings: Record<SavingsKey, { headline: string; basis: string }>;
  cta: string;
  ctaHint: string;
  dossierSubject: string;
  dossierIntro: string;
}

export const calculatorContent: Record<Locale, CalculatorContent> = {
  en: {
    eyebrow: "Expansion & Tax Planner",
    heading: "Model the entry before you commit capital.",
    sub: "Configure headcount, sector and jurisdiction. The planner returns the recommended vehicle, an incorporation timeline, statutory capital and the compliance stack — then exports it as a dossier for your consultation.",
    disclaimer: "Indicative modelling based on 2024 statutory rules and typical processing times. Not legal or tax advice.",
    inputs: {
      size: "Company size",
      sizeOptions: { micro: "1–10 employees", small: "10–50 employees", scale: "50+ employees" },
      sector: "Target sector",
      sectorOptions: { tech: "Tech / Fintech", manufacturing: "Manufacturing", retail: "Retail", holding: "Holding" },
      jurisdiction: "Target jurisdiction",
      jurisdictionOptions: { italy: "Italy · Milan / Rome", turkiye: "Türkiye · Istanbul" },
    },
    outputs: {
      entity: "Recommended vehicle",
      timeline: "Incorporation timeline",
      weeks: "weeks",
      capital: "Statutory capital",
      capitalNote: "Planning figure",
      minimum: "legal minimum",
      savings: "Estimated operational upside",
      checklist: "Compliance checklist",
      complexity: "Programme complexity",
      complexityLevels: ["Light", "Standard", "Structured", "Complex", "Institutional"],
    },
    entities: {
      srl: { name: "S.r.l.", note: "Società a responsabilità limitata — the standard Italian limited company; capital from €1, €10,000 recommended for banking credibility." },
      spa: { name: "S.p.A.", note: "Società per azioni — joint-stock company for 50+ headcount, board governance and future capital raising." },
      ltd: { name: "Ltd. Şti.", note: "Limited şirket — the standard Turkish limited company; minimum capital ₺50,000 since 2024." },
      as: { name: "A.Ş.", note: "Anonim şirket — Turkish joint-stock company; minimum capital ₺250,000, required for holdings and preferred for 50+ staff." },
    },
    checklist: {
      it_deed: "Notarial deed, articles & Registro delle Imprese filing",
      it_vat: "Partita IVA + VIES intra-EU registration",
      it_pec_sdi: "PEC domiciliation & SDI e-invoicing",
      it_inps_inail: "INPS / INAIL employer registration",
      it_bank_kyc: "Capital-deposit & operating account (AML / KYC, UBO)",
      it_codice_fiscale: "Codice Fiscale for directors and shareholders",
      it_patent_box: "Patent box 110% super-deduction screening",
      it_impatriati: "Impatriati regime for relocating executives",
      it_startup_innovativa: "Startup innovativa registration (tax & labour flexibility)",
      it_scia_production: "SCIA for production site & Comune permits",
      it_environmental: "AUA environmental authorisation",
      it_transizione: "Transizione 5.0 investment tax credit",
      it_scia_commercial: "SCIA commercial licence (Comune)",
      it_fiscal_pos: "Registratore telematico / fiscal POS",
      it_consumer_code: "Consumer Code & e-commerce compliance",
      it_pex: "Participation exemption (PEX) eligibility",
      it_cfc: "CFC rules review",
      it_transfer_pricing: "Transfer-pricing documentation",
      it_collective_agreement: "CCNL collective agreement & works council (50+)",
      tr_mersis: "MERSIS pre-registration & articles",
      tr_trade_registry: "Trade Registry incorporation & Gazette publication",
      tr_tax_office: "Tax office registration & tax number",
      tr_sgk: "SGK social security employer file",
      tr_bank_account: "Bank account & capital block (A.Ş.: 25% paid-in)",
      tr_e_invoice: "e-Fatura / e-Defter enrolment",
      tr_technopark: "Technopark placement (software income exemption)",
      tr_rd_center: "R&D Centre certification",
      tr_capacity_report: "Capacity report (Chamber of Industry)",
      tr_osb: "OSB industrial zone membership",
      tr_atr_customs: "A.TR movement certificate & customs routing",
      tr_workplace_license: "Municipal workplace licence",
      tr_etbis: "ETBİS e-commerce registration",
      tr_dividend_wht: "Dividend withholding tax planning",
      tr_treaty_relief: "IT–TR double tax treaty relief",
      tr_isg_physician: "Occupational health & safety (İSG) programme (50+)",
    },
    savings: {
      it_tech: { headline: "Executive income exemption", basis: "Impatriati regime: 50% of employment income exempt for 5 years (2024 rules), plus patent box on IP income." },
      it_manufacturing: { headline: "Capex tax credit", basis: "Transizione 5.0 credits of 5–45% on qualifying digital / energy-efficient investment." },
      it_retail: { headline: "EU distribution cost", basis: "Duty-free, single-VAT-registration reach to EU consumers versus third-country export." },
      it_holding: { headline: "Dividend & gain exemption", basis: "PEX regime: 95% of qualifying dividends and capital gains exempt from IRES." },
      tr_tech: { headline: "Talent cost differential", basis: "Engineering payroll versus Milan benchmarks, with Technopark corporate-tax exemption on software income." },
      tr_manufacturing: { headline: "Landed-cost reduction", basis: "Labour, energy and Customs Union duty-free access versus equivalent Italian production." },
      tr_retail: { headline: "Sourcing cost reduction", basis: "Near-shore sourcing with 5–10 day Ro-Ro lead times versus Far-East supply." },
      tr_holding: { headline: "Effective rate optimisation", basis: "Treaty-based withholding relief and repatriation structuring." },
    },
    cta: "Export Custom Dossier",
    ctaHint: "Pre-fills your consultation request with this configuration",
    dossierSubject: "Expansion dossier",
    dossierIntro: "Planner configuration",
  },
  tr: {
    eyebrow: "Genişleme ve Vergi Planlayıcısı",
    heading: "Sermayeyi bağlamadan önce girişi modelleyin.",
    sub: "Çalışan sayısı, sektör ve yargı alanını yapılandırın. Planlayıcı önerilen şirket türünü, kuruluş takvimini, yasal sermayeyi ve uyum yığınını döndürür; ardından danışmanlığınız için bir dosya olarak dışa aktarır.",
    disclaimer: "2024 yasal kuralları ve tipik işlem sürelerine dayalı gösterge niteliğinde modelleme. Hukuki veya vergi tavsiyesi değildir.",
    inputs: {
      size: "Şirket büyüklüğü",
      sizeOptions: { micro: "1–10 çalışan", small: "10–50 çalışan", scale: "50+ çalışan" },
      sector: "Hedef sektör",
      sectorOptions: { tech: "Teknoloji / Fintech", manufacturing: "İmalat", retail: "Perakende", holding: "Holding" },
      jurisdiction: "Hedef yargı alanı",
      jurisdictionOptions: { italy: "İtalya · Milano / Roma", turkiye: "Türkiye · İstanbul" },
    },
    outputs: {
      entity: "Önerilen şirket türü",
      timeline: "Kuruluş takvimi",
      weeks: "hafta",
      capital: "Yasal sermaye",
      capitalNote: "Planlama rakamı",
      minimum: "yasal asgari",
      savings: "Tahmini operasyonel kazanım",
      checklist: "Uyum kontrol listesi",
      complexity: "Program karmaşıklığı",
      complexityLevels: ["Hafif", "Standart", "Yapılandırılmış", "Karmaşık", "Kurumsal"],
    },
    entities: {
      srl: { name: "S.r.l.", note: "Società a responsabilità limitata — standart İtalyan limited şirketi; sermaye 1 €'dan başlar, bankacılık güvenilirliği için 10.000 € önerilir." },
      spa: { name: "S.p.A.", note: "Società per azioni — 50+ çalışan, yönetim kurulu ve gelecekteki sermaye artırımı için anonim şirket." },
      ltd: { name: "Ltd. Şti.", note: "Limited şirket — standart Türk limited şirketi; 2024'ten itibaren asgari sermaye 50.000 ₺." },
      as: { name: "A.Ş.", note: "Anonim şirket — asgari sermaye 250.000 ₺; holdingler için zorunlu, 50+ personel için tercih edilir." },
    },
    checklist: {
      it_deed: "Noter senedi, ana sözleşme ve Registro delle Imprese tescili",
      it_vat: "Partita IVA + VIES AB içi kayıt",
      it_pec_sdi: "PEC adresi ve SDI e-fatura",
      it_inps_inail: "INPS / INAIL işveren kaydı",
      it_bank_kyc: "Sermaye blokaj ve operasyon hesabı (AML / KYC, nihai faydalanıcı)",
      it_codice_fiscale: "Yöneticiler ve ortaklar için Codice Fiscale",
      it_patent_box: "Patent box %110 süper indirim taraması",
      it_impatriati: "Taşınan yöneticiler için impatriati rejimi",
      it_startup_innovativa: "Startup innovativa kaydı (vergi ve iş gücü esnekliği)",
      it_scia_production: "Üretim tesisi için SCIA ve belediye izinleri",
      it_environmental: "AUA çevre izni",
      it_transizione: "Transizione 5.0 yatırım vergi kredisi",
      it_scia_commercial: "Ticari SCIA lisansı (belediye)",
      it_fiscal_pos: "Registratore telematico / mali POS",
      it_consumer_code: "Tüketici Kanunu ve e-ticaret uyumu",
      it_pex: "İştirak istisnası (PEX) uygunluğu",
      it_cfc: "CFC kuralları incelemesi",
      it_transfer_pricing: "Transfer fiyatlandırması dokümantasyonu",
      it_collective_agreement: "CCNL toplu sözleşme ve işçi temsilciliği (50+)",
      tr_mersis: "MERSİS ön kayıt ve ana sözleşme",
      tr_trade_registry: "Ticaret Sicili tescili ve Gazete ilanı",
      tr_tax_office: "Vergi dairesi kaydı ve vergi numarası",
      tr_sgk: "SGK işveren dosyası",
      tr_bank_account: "Banka hesabı ve sermaye blokajı (A.Ş.: %25 ödenmiş)",
      tr_e_invoice: "e-Fatura / e-Defter kaydı",
      tr_technopark: "Teknopark yerleşimi (yazılım geliri istisnası)",
      tr_rd_center: "Ar-Ge Merkezi belgesi",
      tr_capacity_report: "Kapasite raporu (Sanayi Odası)",
      tr_osb: "OSB üyeliği",
      tr_atr_customs: "A.TR dolaşım belgesi ve gümrük rotalaması",
      tr_workplace_license: "Belediye işyeri açma ruhsatı",
      tr_etbis: "ETBİS e-ticaret kaydı",
      tr_dividend_wht: "Temettü stopajı planlaması",
      tr_treaty_relief: "İT–TR çifte vergilendirme anlaşması indirimi",
      tr_isg_physician: "İş sağlığı ve güvenliği (İSG) programı (50+)",
    },
    savings: {
      it_tech: { headline: "Yönetici gelir istisnası", basis: "Impatriati rejimi: 5 yıl boyunca ücret gelirinin %50'si istisna (2024 kuralları), artı fikri mülkiyet geliri için patent box." },
      it_manufacturing: { headline: "Yatırım vergi kredisi", basis: "Nitelikli dijital / enerji verimli yatırımlarda %5–45 Transizione 5.0 kredisi." },
      it_retail: { headline: "AB dağıtım maliyeti", basis: "Üçüncü ülke ihracatına kıyasla gümrüksüz, tek KDV kaydıyla AB tüketicilerine erişim." },
      it_holding: { headline: "Temettü ve kazanç istisnası", basis: "PEX rejimi: nitelikli temettü ve sermaye kazançlarının %95'i IRES'ten istisna." },
      tr_tech: { headline: "Yetenek maliyet farkı", basis: "Milano kıyaslamalarına göre mühendislik bordrosu; Teknopark'ta yazılım gelirine kurumlar vergisi istisnası." },
      tr_manufacturing: { headline: "Teslim maliyeti düşüşü", basis: "Eşdeğer İtalyan üretimine kıyasla iş gücü, enerji ve Gümrük Birliği gümrüksüz erişim." },
      tr_retail: { headline: "Tedarik maliyeti düşüşü", basis: "Uzak Doğu tedarikine kıyasla 5–10 gün Ro-Ro teslim süresiyle yakın kıyı tedarik." },
      tr_holding: { headline: "Efektif oran optimizasyonu", basis: "Anlaşmaya dayalı stopaj indirimi ve kâr transferi yapılandırması." },
    },
    cta: "Özel Dosyayı Dışa Aktar",
    ctaHint: "Danışmanlık talebinizi bu yapılandırmayla önceden doldurur",
    dossierSubject: "Genişleme dosyası",
    dossierIntro: "Planlayıcı yapılandırması",
  },
  it: {
    eyebrow: "Pianificatore di Espansione e Fiscale",
    heading: "Modella l'ingresso prima di impegnare capitale.",
    sub: "Configura organico, settore e giurisdizione. Il pianificatore restituisce il veicolo consigliato, la tempistica di costituzione, il capitale statutario e lo stack di compliance — poi lo esporta come dossier per la tua consulenza.",
    disclaimer: "Modellazione indicativa basata sulle regole statutarie 2024 e sui tempi di lavorazione tipici. Non costituisce consulenza legale o fiscale.",
    inputs: {
      size: "Dimensione aziendale",
      sizeOptions: { micro: "1–10 dipendenti", small: "10–50 dipendenti", scale: "50+ dipendenti" },
      sector: "Settore target",
      sectorOptions: { tech: "Tech / Fintech", manufacturing: "Manifattura", retail: "Retail", holding: "Holding" },
      jurisdiction: "Giurisdizione target",
      jurisdictionOptions: { italy: "Italia · Milano / Roma", turkiye: "Türkiye · Istanbul" },
    },
    outputs: {
      entity: "Veicolo consigliato",
      timeline: "Tempistica di costituzione",
      weeks: "settimane",
      capital: "Capitale statutario",
      capitalNote: "Valore di pianificazione",
      minimum: "minimo legale",
      savings: "Beneficio operativo stimato",
      checklist: "Checklist di compliance",
      complexity: "Complessità del programma",
      complexityLevels: ["Leggera", "Standard", "Strutturata", "Complessa", "Istituzionale"],
    },
    entities: {
      srl: { name: "S.r.l.", note: "Società a responsabilità limitata — la società di capitali standard; capitale da €1, €10.000 consigliati per la credibilità bancaria." },
      spa: { name: "S.p.A.", note: "Società per azioni — per organici 50+, governance con CdA e future raccolte di capitale." },
      ltd: { name: "Ltd. Şti.", note: "Limited şirket — la società a responsabilità limitata turca; capitale minimo ₺50.000 dal 2024." },
      as: { name: "A.Ş.", note: "Anonim şirket — società per azioni turca; capitale minimo ₺250.000, obbligatoria per le holding e preferibile per 50+ dipendenti." },
    },
    checklist: {
      it_deed: "Atto notarile, statuto e iscrizione al Registro delle Imprese",
      it_vat: "Partita IVA + iscrizione VIES intra-UE",
      it_pec_sdi: "Domiciliazione PEC e fatturazione elettronica SDI",
      it_inps_inail: "Iscrizione datore di lavoro INPS / INAIL",
      it_bank_kyc: "Conto deposito capitale e conto operativo (AML / KYC, titolare effettivo)",
      it_codice_fiscale: "Codice Fiscale per amministratori e soci",
      it_patent_box: "Screening patent box (super-deduzione 110%)",
      it_impatriati: "Regime impatriati per i dirigenti trasferiti",
      it_startup_innovativa: "Iscrizione startup innovativa (flessibilità fiscale e del lavoro)",
      it_scia_production: "SCIA per il sito produttivo e permessi comunali",
      it_environmental: "Autorizzazione unica ambientale (AUA)",
      it_transizione: "Credito d'imposta Transizione 5.0",
      it_scia_commercial: "SCIA commerciale (Comune)",
      it_fiscal_pos: "Registratore telematico / POS fiscale",
      it_consumer_code: "Codice del Consumo e compliance e-commerce",
      it_pex: "Verifica requisiti participation exemption (PEX)",
      it_cfc: "Analisi normativa CFC",
      it_transfer_pricing: "Documentazione transfer pricing",
      it_collective_agreement: "CCNL e rappresentanze sindacali (50+)",
      tr_mersis: "Pre-registrazione MERSIS e statuto",
      tr_trade_registry: "Iscrizione al Registro del Commercio e pubblicazione in Gazzetta",
      tr_tax_office: "Registrazione fiscale e numero di partita",
      tr_sgk: "Posizione datore di lavoro SGK",
      tr_bank_account: "Conto bancario e blocco capitale (A.Ş.: 25% versato)",
      tr_e_invoice: "Adesione e-Fatura / e-Defter",
      tr_technopark: "Insediamento in Technopark (esenzione redditi software)",
      tr_rd_center: "Certificazione Centro R&S",
      tr_capacity_report: "Rapporto di capacità (Camera dell'Industria)",
      tr_osb: "Adesione a zona industriale OSB",
      tr_atr_customs: "Certificato A.TR e instradamento doganale",
      tr_workplace_license: "Licenza comunale di esercizio",
      tr_etbis: "Registrazione e-commerce ETBİS",
      tr_dividend_wht: "Pianificazione ritenuta sui dividendi",
      tr_treaty_relief: "Benefici convenzione IT–TR contro le doppie imposizioni",
      tr_isg_physician: "Programma salute e sicurezza (İSG) (50+)",
    },
    savings: {
      it_tech: { headline: "Esenzione reddito dirigenti", basis: "Regime impatriati: 50% del reddito da lavoro esente per 5 anni (regole 2024), più patent box sui redditi da IP." },
      it_manufacturing: { headline: "Credito d'imposta capex", basis: "Crediti Transizione 5.0 del 5–45% su investimenti digitali / energeticamente efficienti qualificati." },
      it_retail: { headline: "Costo di distribuzione UE", basis: "Accesso ai consumatori UE senza dazi e con un'unica registrazione IVA rispetto all'export da paese terzo." },
      it_holding: { headline: "Esenzione dividendi e plusvalenze", basis: "Regime PEX: 95% di dividendi e plusvalenze qualificati esenti da IRES." },
      tr_tech: { headline: "Differenziale costo talenti", basis: "Costo del personale ingegneristico rispetto ai benchmark milanesi, con esenzione IRES-equivalente in Technopark sui redditi software." },
      tr_manufacturing: { headline: "Riduzione del landed cost", basis: "Lavoro, energia e accesso senza dazi in Unione doganale rispetto alla produzione italiana equivalente." },
      tr_retail: { headline: "Riduzione costi di sourcing", basis: "Sourcing near-shore con lead time Ro-Ro di 5–10 giorni rispetto all'Estremo Oriente." },
      tr_holding: { headline: "Ottimizzazione aliquota effettiva", basis: "Riduzione delle ritenute su base convenzionale e strutturazione del rimpatrio." },
    },
    cta: "Esporta Dossier Personalizzato",
    ctaHint: "Precompila la richiesta di consulenza con questa configurazione",
    dossierSubject: "Dossier di espansione",
    dossierIntro: "Configurazione del pianificatore",
  },
};
