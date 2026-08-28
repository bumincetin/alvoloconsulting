import type { Locale } from "@/lib/translations";
import type { AccentKey, CityId } from "@/lib/geo/cities";

export type CorridorMode = "inbound" | "outbound";

export type ServiceIcon =
  | "building"
  | "scale"
  | "idcard"
  | "landmark"
  | "factory"
  | "boxes"
  | "route"
  | "network";

export type ChecklistCategory = "STATUTORY" | "FISCAL" | "IMMIGRATION" | "OPERATIONAL" | "COMMERCIAL";

export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ChecklistItem {
  code: string;
  category: ChecklistCategory;
  label: string;
  note: string;
}

export interface EngagementProfile {
  sector: string;
  route: string;
  brief: string;
  outcome: string;
  metrics: { k: string; v: string }[];
}

export interface CorridorContent {
  id: CorridorMode;
  accent: AccentKey;
  tabLabel: string;
  tabHint: string;
  title: string;
  summary: string;
  from: CityId;
  to: CityId;
  routeLabel: string;
  services: ServiceItem[];
  checklist: ChecklistItem[];
  profiles: EngagementProfile[];
  dossierHref: string;
  dossierLabel: string;
}

export interface CorridorUi {
  eyebrow: string;
  heading: string;
  sub: string;
  servicesLabel: string;
  checklistLabel: string;
  profilesLabel: string;
  profilesDisclaimer: string;
  deliverables: string;
  categories: Record<ChecklistCategory, string>;
  switcherAria: string;
}

export const corridorUi: Record<Locale, CorridorUi> = {
  en: {
    eyebrow: "Dual-Corridor Strategy",
    heading: "Two directions. One integrated mandate.",
    sub: "Select the corridor that matches your direction. The services, regulatory checklist and engagement profiles below change with it.",
    servicesLabel: "Service Architecture",
    checklistLabel: "Regulatory Checklist",
    profilesLabel: "Engagement Profiles",
    profilesDisclaimer: "Representative engagement archetypes; we do not disclose client identities.",
    deliverables: "Deliverables",
    categories: {
      STATUTORY: "Statutory",
      FISCAL: "Fiscal",
      IMMIGRATION: "Immigration",
      OPERATIONAL: "Operational",
      COMMERCIAL: "Commercial",
    },
    switcherAria: "Choose expansion corridor",
  },
  tr: {
    eyebrow: "Çift Koridor Stratejisi",
    heading: "İki yön. Tek bütünleşik mandat.",
    sub: "Yönünüze uyan koridoru seçin. Aşağıdaki hizmetler, düzenleyici kontrol listesi ve görev profilleri seçiminize göre değişir.",
    servicesLabel: "Hizmet Mimarisi",
    checklistLabel: "Düzenleyici Kontrol Listesi",
    profilesLabel: "Görev Profilleri",
    profilesDisclaimer: "Temsili görev arketipleri; müşteri kimliklerini açıklamıyoruz.",
    deliverables: "Çıktılar",
    categories: {
      STATUTORY: "Yasal",
      FISCAL: "Mali",
      IMMIGRATION: "Göç",
      OPERATIONAL: "Operasyonel",
      COMMERCIAL: "Ticari",
    },
    switcherAria: "Genişleme koridorunu seçin",
  },
  it: {
    eyebrow: "Strategia a Doppio Corridoio",
    heading: "Due direzioni. Un unico mandato integrato.",
    sub: "Seleziona il corridoio che corrisponde alla tua direzione. Servizi, checklist regolatoria e profili di incarico qui sotto cambiano di conseguenza.",
    servicesLabel: "Architettura dei Servizi",
    checklistLabel: "Checklist Regolatoria",
    profilesLabel: "Profili di Incarico",
    profilesDisclaimer: "Archetipi di incarico rappresentativi; non divulghiamo le identità dei clienti.",
    deliverables: "Deliverable",
    categories: {
      STATUTORY: "Societario",
      FISCAL: "Fiscale",
      IMMIGRATION: "Immigrazione",
      OPERATIONAL: "Operativo",
      COMMERCIAL: "Commerciale",
    },
    switcherAria: "Scegli il corridoio di espansione",
  },
};

export const corridorContent: Record<Locale, Record<CorridorMode, CorridorContent>> = {
  en: {
    inbound: {
      id: "inbound",
      accent: "azure",
      tabLabel: "Enter the Italian Market",
      tabHint: "Inbound · EU",
      title: "Establish a compliant, bankable Italian entity.",
      summary: "From notarial deed to first invoice: we run incorporation, tax architecture, immigration and banking as one sequenced programme, with Bocconi-trained specialists on every file.",
      from: "istanbul",
      to: "milan",
      routeLabel: "IST → MIL / ROM",
      services: [
        {
          icon: "building",
          title: "Entity Incorporation",
          description: "S.r.l. and S.p.A. formation with notarial deed, Registro delle Imprese filing, PEC domiciliation and Partita IVA activation.",
          deliverables: ["Atto costitutivo", "Statuto", "Partita IVA", "PEC / SDI"],
        },
        {
          icon: "scale",
          title: "Tax Architecture",
          description: "IRES / IRAP modelling, holding and IP structuring, impatriati regime eligibility and IT–TR treaty positioning before the first euro moves.",
          deliverables: ["Tax memo", "Structure chart", "Treaty analysis", "Transfer-pricing brief"],
        },
        {
          icon: "idcard",
          title: "Codice Fiscale, Permits & Relocation",
          description: "Codice Fiscale issuance, permesso di soggiorno, investor and self-employment visas, plus executive relocation for founders and their families.",
          deliverables: ["Codice Fiscale", "Permesso di soggiorno", "Visa dossier", "Relocation plan"],
        },
        {
          icon: "landmark",
          title: "Banking & Treasury Setup",
          description: "Capital-deposit account, operating accounts with tier-one Italian banks or fintech rails, AML / KYC dossier preparation and signatory onboarding.",
          deliverables: ["KYC dossier", "Capital deposit", "Operating account", "Payment rails"],
        },
      ],
      checklist: [
        { code: "IT-01", category: "STATUTORY", label: "Articles & notarial deed", note: "S.r.l. capital from €1 (€10,000 standard) · S.p.A. minimum €50,000" },
        { code: "IT-02", category: "FISCAL", label: "Partita IVA & VIES registration", note: "Intra-EU VAT number activated at incorporation" },
        { code: "IT-03", category: "FISCAL", label: "IRES 24% / IRAP 3.9% budgeting", note: "Impatriati regime and patent-box screening" },
        { code: "IT-04", category: "IMMIGRATION", label: "Codice Fiscale & permesso di soggiorno", note: "Investor visa or decreto flussi self-employment quota" },
        { code: "IT-05", category: "OPERATIONAL", label: "PEC, SDI e-invoicing, INPS / INAIL", note: "Mandatory before first hire and first invoice" },
        { code: "IT-06", category: "OPERATIONAL", label: "Bank account & capital deposit", note: "AML / KYC pack with UBO declaration" },
      ],
      profiles: [
        {
          sector: "Industrial group · Textiles",
          route: "Istanbul → Milan",
          brief: "Turkish manufacturer establishing an EU sales and distribution subsidiary to serve Italian and French retail.",
          outcome: "S.r.l. incorporated, VAT and VIES active, founder relocated under the investor visa route.",
          metrics: [
            { k: "Vehicle", v: "S.r.l." },
            { k: "Programme", v: "6 weeks" },
            { k: "Scope", v: "Entity · Tax · Permit" },
          ],
        },
        {
          sector: "Fintech · Payments",
          route: "Istanbul → Rome / Milan",
          brief: "Scale-up seeking an EU foothold for licensing dialogue and treasury operations ahead of a Series B.",
          outcome: "Holding structure designed, Italian operating entity formed, banking relationships opened with two institutions.",
          metrics: [
            { k: "Vehicle", v: "Holding + S.r.l." },
            { k: "Programme", v: "9 weeks" },
            { k: "Scope", v: "Structure · Banking" },
          ],
        },
      ],
      dossierHref: "/services/expansion/italy",
      dossierLabel: "Open the Italy expansion dossier",
    },
    outbound: {
      id: "outbound",
      accent: "emerald",
      tabLabel: "Scale into Turkish Manufacturing",
      tabHint: "Outbound · Sourcing",
      title: "Access vetted industrial capacity across the Marmara and Aegean clusters.",
      summary: "We identify, audit and contract Turkish manufacturing partners, then engineer the supply-chain and entity structure so goods, capital and IP move under the EU–TR Customs Union without surprises.",
      from: "milan",
      to: "istanbul",
      routeLabel: "MIL → IST",
      services: [
        {
          icon: "factory",
          title: "Manufacturing Partnerships",
          description: "Shortlisting and capability audits of OEM / ODM producers in Istanbul, Bursa, Kocaeli and İzmir, from automotive components to technical textiles.",
          deliverables: ["Supplier long-list", "Site audit", "Capability scorecard", "Partner term sheet"],
        },
        {
          icon: "boxes",
          title: "Strategic Sourcing",
          description: "RFQ management, supplier qualification, landed-cost modelling and quality-gate design for recurring industrial programmes.",
          deliverables: ["RFQ pack", "Landed-cost model", "Quality plan", "Framework agreement"],
        },
        {
          icon: "route",
          title: "Supply Chain Optimization",
          description: "Customs Union routing, origin and A.TR compliance, Incoterms allocation and multimodal corridors: Ro-Ro via Trieste, rail through the Balkans.",
          deliverables: ["Corridor design", "Customs memo", "Incoterms matrix", "Logistics RFP"],
        },
        {
          icon: "network",
          title: "Cross-Border Entity Structuring",
          description: "Ltd. Şti. or A.Ş. formation, joint-venture and free-zone options, dividend repatriation and IT–TR treaty planning.",
          deliverables: ["Entity memo", "JV blueprint", "Free-zone assessment", "Repatriation plan"],
        },
      ],
      checklist: [
        { code: "TR-01", category: "COMMERCIAL", label: "Supplier capability audit", note: "ISO 9001 / IATF 16949 / OEKO-TEX evidence review" },
        { code: "TR-02", category: "OPERATIONAL", label: "Customs Union origin & A.TR certificate", note: "Industrial goods move duty-free between TR and the EU" },
        { code: "TR-03", category: "STATUTORY", label: "Entity choice: Ltd. Şti. or A.Ş.", note: "Minimum capital ₺50,000 (Ltd.) · ₺250,000 (A.Ş.)" },
        { code: "TR-04", category: "FISCAL", label: "Corporate tax 25% & dividend withholding", note: "IT–TR double tax treaty relief mapped up front" },
        { code: "TR-05", category: "OPERATIONAL", label: "Logistics corridor & Incoterms", note: "Ro-Ro Pendik / Ambarlı → Trieste · Balkan rail" },
        { code: "TR-06", category: "COMMERCIAL", label: "Contract governance & IP protection", note: "Turkish Commercial Code compliance, quality escrow" },
      ],
      profiles: [
        {
          sector: "Automotive · Tier-2 components",
          route: "Milan → Bursa",
          brief: "Italian Tier-1 supplier diversifying its machined-component base away from single-country dependency.",
          outcome: "Three qualified suppliers contracted under a framework agreement with dual-sourcing and A.TR-compliant flows.",
          metrics: [
            { k: "Suppliers", v: "3 qualified" },
            { k: "Programme", v: "14 weeks" },
            { k: "Scope", v: "Audit · Sourcing · Logistics" },
          ],
        },
        {
          sector: "Fashion · Technical apparel",
          route: "Milan → Istanbul / İzmir",
          brief: "Premium brand relocating part of its production to Türkiye while keeping design and IP in Italy.",
          outcome: "Turkish Ltd. Şti. formed as a sourcing vehicle, IP licensing structure and quality gates embedded in supplier contracts.",
          metrics: [
            { k: "Vehicle", v: "Ltd. Şti." },
            { k: "Programme", v: "10 weeks" },
            { k: "Scope", v: "Entity · IP · Sourcing" },
          ],
        },
      ],
      dossierHref: "/services/expansion/turkey",
      dossierLabel: "Open the Türkiye sourcing dossier",
    },
  },
  tr: {
    inbound: {
      id: "inbound",
      accent: "azure",
      tabLabel: "İtalya Pazarına Giriş",
      tabHint: "İçe Dönük · AB",
      title: "Uyumlu ve bankalanabilir bir İtalyan şirketi kurun.",
      summary: "Noter senedinden ilk faturaya: kuruluş, vergi mimarisi, göç ve bankacılığı Bocconi eğitimli uzmanlarla tek bir sıralı program olarak yürütürüz.",
      from: "istanbul",
      to: "milan",
      routeLabel: "IST → MIL / ROM",
      services: [
        {
          icon: "building",
          title: "Şirket Kuruluşu",
          description: "Noter senedi, Registro delle Imprese tescili, PEC adresi ve Partita IVA aktivasyonu ile S.r.l. ve S.p.A. kuruluşu.",
          deliverables: ["Atto costitutivo", "Statuto", "Partita IVA", "PEC / SDI"],
        },
        {
          icon: "scale",
          title: "Vergi Mimarisi",
          description: "İlk euro hareket etmeden önce IRES / IRAP modellemesi, holding ve fikri mülkiyet yapılandırması, impatriati rejimi uygunluğu ve İT–TR anlaşma konumlandırması.",
          deliverables: ["Vergi notu", "Yapı şeması", "Anlaşma analizi", "Transfer fiyatlandırma özeti"],
        },
        {
          icon: "idcard",
          title: "Codice Fiscale, İzinler ve Taşınma",
          description: "Codice Fiscale alımı, permesso di soggiorno, yatırımcı ve serbest meslek vizeleri; kurucular ve aileleri için yönetici taşınma programı.",
          deliverables: ["Codice Fiscale", "Permesso di soggiorno", "Vize dosyası", "Taşınma planı"],
        },
        {
          icon: "landmark",
          title: "Bankacılık ve Hazine Kurulumu",
          description: "Sermaye blokaj hesabı, birinci sınıf İtalyan bankaları veya fintech altyapısında operasyon hesapları, AML / KYC dosyası ve imza yetkilisi onboardingi.",
          deliverables: ["KYC dosyası", "Sermaye blokajı", "Operasyon hesabı", "Ödeme altyapısı"],
        },
      ],
      checklist: [
        { code: "IT-01", category: "STATUTORY", label: "Ana sözleşme ve noter senedi", note: "S.r.l. sermayesi 1 €'dan (standart 10.000 €) · S.p.A. asgari 50.000 €" },
        { code: "IT-02", category: "FISCAL", label: "Partita IVA ve VIES kaydı", note: "AB içi KDV numarası kuruluşta aktive edilir" },
        { code: "IT-03", category: "FISCAL", label: "IRES %24 / IRAP %3,9 bütçeleme", note: "Impatriati rejimi ve patent box taraması" },
        { code: "IT-04", category: "IMMIGRATION", label: "Codice Fiscale ve permesso di soggiorno", note: "Yatırımcı vizesi veya decreto flussi serbest meslek kotası" },
        { code: "IT-05", category: "OPERATIONAL", label: "PEC, SDI e-fatura, INPS / INAIL", note: "İlk işe alım ve ilk faturadan önce zorunlu" },
        { code: "IT-06", category: "OPERATIONAL", label: "Banka hesabı ve sermaye blokajı", note: "Nihai faydalanıcı beyanı ile AML / KYC paketi" },
      ],
      profiles: [
        {
          sector: "Sanayi grubu · Tekstil",
          route: "İstanbul → Milano",
          brief: "İtalyan ve Fransız perakendeye hizmet vermek üzere AB satış ve dağıtım iştiraki kuran Türk üretici.",
          outcome: "S.r.l. kuruldu, KDV ve VIES aktif, kurucu yatırımcı vizesi rotasıyla taşındı.",
          metrics: [
            { k: "Araç", v: "S.r.l." },
            { k: "Program", v: "6 hafta" },
            { k: "Kapsam", v: "Şirket · Vergi · İzin" },
          ],
        },
        {
          sector: "Fintech · Ödemeler",
          route: "İstanbul → Roma / Milano",
          brief: "B Serisi öncesinde lisans görüşmeleri ve hazine operasyonları için AB'de zemin arayan büyüme şirketi.",
          outcome: "Holding yapısı tasarlandı, İtalyan operasyon şirketi kuruldu, iki kurumla bankacılık ilişkisi açıldı.",
          metrics: [
            { k: "Araç", v: "Holding + S.r.l." },
            { k: "Program", v: "9 hafta" },
            { k: "Kapsam", v: "Yapı · Bankacılık" },
          ],
        },
      ],
      dossierHref: "/services/expansion/italy",
      dossierLabel: "İtalya genişleme dosyasını aç",
    },
    outbound: {
      id: "outbound",
      accent: "emerald",
      tabLabel: "Türk İmalatına Ölçeklenin",
      tabHint: "Dışa Dönük · Tedarik",
      title: "Marmara ve Ege kümelerinde doğrulanmış sanayi kapasitesine erişin.",
      summary: "Türk imalat ortaklarını belirler, denetler ve sözleşmeye bağlarız; ardından mal, sermaye ve fikri mülkiyetin AB–TR Gümrük Birliği altında sürprizsiz hareket etmesi için tedarik zinciri ve şirket yapısını tasarlarız.",
      from: "milan",
      to: "istanbul",
      routeLabel: "MIL → IST",
      services: [
        {
          icon: "factory",
          title: "İmalat Ortaklıkları",
          description: "İstanbul, Bursa, Kocaeli ve İzmir'deki OEM / ODM üreticilerin kısa listesi ve yetkinlik denetimleri, otomotiv parçalarından teknik tekstile.",
          deliverables: ["Tedarikçi uzun listesi", "Saha denetimi", "Yetkinlik karnesi", "Ortaklık term sheet"],
        },
        {
          icon: "boxes",
          title: "Stratejik Tedarik",
          description: "Tekrarlayan sanayi programları için RFQ yönetimi, tedarikçi yeterliliği, teslim maliyeti modellemesi ve kalite kapısı tasarımı.",
          deliverables: ["RFQ paketi", "Teslim maliyeti modeli", "Kalite planı", "Çerçeve sözleşme"],
        },
        {
          icon: "route",
          title: "Tedarik Zinciri Optimizasyonu",
          description: "Gümrük Birliği rotalaması, menşe ve A.TR uyumu, Incoterms dağılımı ve çok modlu koridorlar: Trieste üzerinden Ro-Ro, Balkanlar üzerinden demiryolu.",
          deliverables: ["Koridor tasarımı", "Gümrük notu", "Incoterms matrisi", "Lojistik RFP"],
        },
        {
          icon: "network",
          title: "Sınır Ötesi Şirket Yapılandırması",
          description: "Ltd. Şti. veya A.Ş. kuruluşu, ortak girişim ve serbest bölge seçenekleri, temettü transferi ve İT–TR anlaşma planlaması.",
          deliverables: ["Şirket notu", "JV planı", "Serbest bölge değerlendirmesi", "Transfer planı"],
        },
      ],
      checklist: [
        { code: "TR-01", category: "COMMERCIAL", label: "Tedarikçi yetkinlik denetimi", note: "ISO 9001 / IATF 16949 / OEKO-TEX kanıt incelemesi" },
        { code: "TR-02", category: "OPERATIONAL", label: "Gümrük Birliği menşei ve A.TR belgesi", note: "Sanayi ürünleri TR ile AB arasında gümrüksüz hareket eder" },
        { code: "TR-03", category: "STATUTORY", label: "Şirket türü: Ltd. Şti. veya A.Ş.", note: "Asgari sermaye 50.000 ₺ (Ltd.) · 250.000 ₺ (A.Ş.)" },
        { code: "TR-04", category: "FISCAL", label: "Kurumlar vergisi %25 ve temettü stopajı", note: "İT–TR çifte vergilendirme anlaşması indirimi baştan haritalanır" },
        { code: "TR-05", category: "OPERATIONAL", label: "Lojistik koridor ve Incoterms", note: "Ro-Ro Pendik / Ambarlı → Trieste · Balkan demiryolu" },
        { code: "TR-06", category: "COMMERCIAL", label: "Sözleşme yönetişimi ve fikri mülkiyet", note: "Türk Ticaret Kanunu uyumu, kalite escrow" },
      ],
      profiles: [
        {
          sector: "Otomotiv · Tier-2 parçalar",
          route: "Milano → Bursa",
          brief: "Talaşlı imalat parça tabanını tek ülke bağımlılığından çeşitlendiren İtalyan Tier-1 tedarikçi.",
          outcome: "Çift kaynaklı ve A.TR uyumlu akışlarla çerçeve sözleşme altında üç nitelikli tedarikçiyle sözleşme imzalandı.",
          metrics: [
            { k: "Tedarikçi", v: "3 nitelikli" },
            { k: "Program", v: "14 hafta" },
            { k: "Kapsam", v: "Denetim · Tedarik · Lojistik" },
          ],
        },
        {
          sector: "Moda · Teknik giyim",
          route: "Milano → İstanbul / İzmir",
          brief: "Tasarım ve fikri mülkiyeti İtalya'da tutarken üretiminin bir kısmını Türkiye'ye taşıyan premium marka.",
          outcome: "Tedarik aracı olarak Türk Ltd. Şti. kuruldu, fikri mülkiyet lisans yapısı ve kalite kapıları tedarikçi sözleşmelerine gömüldü.",
          metrics: [
            { k: "Araç", v: "Ltd. Şti." },
            { k: "Program", v: "10 hafta" },
            { k: "Kapsam", v: "Şirket · FM · Tedarik" },
          ],
        },
      ],
      dossierHref: "/services/expansion/turkey",
      dossierLabel: "Türkiye tedarik dosyasını aç",
    },
  },
  it: {
    inbound: {
      id: "inbound",
      accent: "azure",
      tabLabel: "Entra nel Mercato Italiano",
      tabHint: "Inbound · UE",
      title: "Costituisci un'entità italiana conforme e bancabile.",
      summary: "Dall'atto notarile alla prima fattura: gestiamo costituzione, architettura fiscale, immigrazione e banking come un unico programma sequenziato, con specialisti formati in Bocconi su ogni pratica.",
      from: "istanbul",
      to: "milan",
      routeLabel: "IST → MIL / ROM",
      services: [
        {
          icon: "building",
          title: "Costituzione Societaria",
          description: "Costituzione di S.r.l. e S.p.A. con atto notarile, iscrizione al Registro delle Imprese, domiciliazione PEC e attivazione della Partita IVA.",
          deliverables: ["Atto costitutivo", "Statuto", "Partita IVA", "PEC / SDI"],
        },
        {
          icon: "scale",
          title: "Architettura Fiscale",
          description: "Modellazione IRES / IRAP, strutturazione di holding e IP, verifica del regime impatriati e posizionamento sulla convenzione IT–TR prima che si muova il primo euro.",
          deliverables: ["Memo fiscale", "Organigramma", "Analisi convenzionale", "Brief transfer pricing"],
        },
        {
          icon: "idcard",
          title: "Codice Fiscale, Permessi e Relocation",
          description: "Rilascio del Codice Fiscale, permesso di soggiorno, visti per investitori e lavoro autonomo, oltre alla relocation di founder e famiglie.",
          deliverables: ["Codice Fiscale", "Permesso di soggiorno", "Dossier visto", "Piano di relocation"],
        },
        {
          icon: "landmark",
          title: "Banking e Tesoreria",
          description: "Conto per il deposito del capitale, conti operativi presso primarie banche italiane o rail fintech, preparazione del dossier AML / KYC e onboarding dei firmatari.",
          deliverables: ["Dossier KYC", "Deposito capitale", "Conto operativo", "Rail di pagamento"],
        },
      ],
      checklist: [
        { code: "IT-01", category: "STATUTORY", label: "Statuto e atto notarile", note: "Capitale S.r.l. da €1 (standard €10.000) · S.p.A. minimo €50.000" },
        { code: "IT-02", category: "FISCAL", label: "Partita IVA e iscrizione VIES", note: "Numero IVA intra-UE attivato alla costituzione" },
        { code: "IT-03", category: "FISCAL", label: "Budget IRES 24% / IRAP 3,9%", note: "Screening regime impatriati e patent box" },
        { code: "IT-04", category: "IMMIGRATION", label: "Codice Fiscale e permesso di soggiorno", note: "Visto investitori o quota lavoro autonomo decreto flussi" },
        { code: "IT-05", category: "OPERATIONAL", label: "PEC, fatturazione SDI, INPS / INAIL", note: "Obbligatori prima della prima assunzione e della prima fattura" },
        { code: "IT-06", category: "OPERATIONAL", label: "Conto bancario e deposito capitale", note: "Pacchetto AML / KYC con dichiarazione del titolare effettivo" },
      ],
      profiles: [
        {
          sector: "Gruppo industriale · Tessile",
          route: "Istanbul → Milano",
          brief: "Produttore turco che costituisce una controllata UE di vendita e distribuzione per servire il retail italiano e francese.",
          outcome: "S.r.l. costituita, IVA e VIES attivi, founder trasferito tramite il visto per investitori.",
          metrics: [
            { k: "Veicolo", v: "S.r.l." },
            { k: "Programma", v: "6 settimane" },
            { k: "Perimetro", v: "Entità · Fisco · Permesso" },
          ],
        },
        {
          sector: "Fintech · Pagamenti",
          route: "Istanbul → Roma / Milano",
          brief: "Scale-up alla ricerca di una base UE per il dialogo autorizzativo e le operazioni di tesoreria in vista di un Series B.",
          outcome: "Struttura holding progettata, entità operativa italiana costituita, rapporti bancari aperti con due istituti.",
          metrics: [
            { k: "Veicolo", v: "Holding + S.r.l." },
            { k: "Programma", v: "9 settimane" },
            { k: "Perimetro", v: "Struttura · Banking" },
          ],
        },
      ],
      dossierHref: "/services/expansion/italy",
      dossierLabel: "Apri il dossier di espansione in Italia",
    },
    outbound: {
      id: "outbound",
      accent: "emerald",
      tabLabel: "Scala nella Manifattura Turca",
      tabHint: "Outbound · Sourcing",
      title: "Accedi a capacità industriale verificata nei distretti di Marmara ed Egeo.",
      summary: "Identifichiamo, verifichiamo e contrattualizziamo partner manifatturieri turchi, poi progettiamo supply chain e struttura societaria affinché merci, capitale e IP si muovano nell'Unione doganale UE–TR senza sorprese.",
      from: "milan",
      to: "istanbul",
      routeLabel: "MIL → IST",
      services: [
        {
          icon: "factory",
          title: "Partnership Industriali",
          description: "Shortlist e audit di capacità di produttori OEM / ODM a Istanbul, Bursa, Kocaeli e İzmir, dalla componentistica automotive ai tessili tecnici.",
          deliverables: ["Long-list fornitori", "Audit di stabilimento", "Scorecard di capacità", "Term sheet partner"],
        },
        {
          icon: "boxes",
          title: "Sourcing Strategico",
          description: "Gestione RFQ, qualifica fornitori, modellazione del landed cost e progettazione dei quality gate per programmi industriali ricorrenti.",
          deliverables: ["Pacchetto RFQ", "Modello landed cost", "Piano qualità", "Accordo quadro"],
        },
        {
          icon: "route",
          title: "Ottimizzazione della Supply Chain",
          description: "Instradamento in Unione doganale, conformità origine e A.TR, allocazione Incoterms e corridoi multimodali: Ro-Ro via Trieste, ferrovia attraverso i Balcani.",
          deliverables: ["Design del corridoio", "Memo doganale", "Matrice Incoterms", "RFP logistica"],
        },
        {
          icon: "network",
          title: "Strutturazione Societaria Transfrontaliera",
          description: "Costituzione di Ltd. Şti. o A.Ş., opzioni joint-venture e zona franca, rimpatrio dei dividendi e pianificazione sulla convenzione IT–TR.",
          deliverables: ["Memo societario", "Blueprint JV", "Valutazione zona franca", "Piano di rimpatrio"],
        },
      ],
      checklist: [
        { code: "TR-01", category: "COMMERCIAL", label: "Audit di capacità del fornitore", note: "Verifica evidenze ISO 9001 / IATF 16949 / OEKO-TEX" },
        { code: "TR-02", category: "OPERATIONAL", label: "Origine Unione doganale e certificato A.TR", note: "I beni industriali circolano senza dazi tra TR e UE" },
        { code: "TR-03", category: "STATUTORY", label: "Scelta del veicolo: Ltd. Şti. o A.Ş.", note: "Capitale minimo ₺50.000 (Ltd.) · ₺250.000 (A.Ş.)" },
        { code: "TR-04", category: "FISCAL", label: "Imposta societaria 25% e ritenuta sui dividendi", note: "Benefici della convenzione IT–TR mappati in anticipo" },
        { code: "TR-05", category: "OPERATIONAL", label: "Corridoio logistico e Incoterms", note: "Ro-Ro Pendik / Ambarlı → Trieste · ferrovia balcanica" },
        { code: "TR-06", category: "COMMERCIAL", label: "Governance contrattuale e tutela IP", note: "Conformità al Codice Commerciale turco, escrow qualità" },
      ],
      profiles: [
        {
          sector: "Automotive · Componenti Tier-2",
          route: "Milano → Bursa",
          brief: "Fornitore italiano Tier-1 che diversifica la base di componenti lavorati per ridurre la dipendenza da un singolo paese.",
          outcome: "Tre fornitori qualificati contrattualizzati con accordo quadro, dual sourcing e flussi conformi A.TR.",
          metrics: [
            { k: "Fornitori", v: "3 qualificati" },
            { k: "Programma", v: "14 settimane" },
            { k: "Perimetro", v: "Audit · Sourcing · Logistica" },
          ],
        },
        {
          sector: "Moda · Abbigliamento tecnico",
          route: "Milano → Istanbul / İzmir",
          brief: "Brand premium che trasferisce parte della produzione in Türkiye mantenendo design e IP in Italia.",
          outcome: "Ltd. Şti. turca costituita come veicolo di sourcing, struttura di licenza IP e quality gate integrati nei contratti con i fornitori.",
          metrics: [
            { k: "Veicolo", v: "Ltd. Şti." },
            { k: "Programma", v: "10 settimane" },
            { k: "Perimetro", v: "Entità · IP · Sourcing" },
          ],
        },
      ],
      dossierHref: "/services/expansion/turkey",
      dossierLabel: "Apri il dossier di sourcing in Türkiye",
    },
  },
};

export const CORRIDOR_MODES: CorridorMode[] = ["inbound", "outbound"];
