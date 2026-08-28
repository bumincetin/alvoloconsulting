"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHeader from "@/components/UI/PageHeader";
import Eyebrow from "@/components/UI/Eyebrow";
import { Arrow, useReveals } from "@/components/shore/Reveal";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { getTranslation, type Locale } from "@/lib/translations";

interface MethodologyPageClientProps {
  locale: Locale;
}

/**
 * Page-local copy: the four service areas, the section labels, the expertise
 * stack and the closing CTA. The masthead and the engagement phases come from
 * `translations.methodology`.
 */
const content = {
  en: {
    title: "What a cross-border mandate needs, under one roof",
    coreServices: "Core service areas",
    services: [
      {
        num: "01",
        title: "Corporate Structuring & Incorporation",
        arch: "S.r.l. · S.p.A. · A.Ş. / Ltd. Şti. · Holding layers",
        desc1:
          "We choose the vehicle before we draw the chart: S.r.l. or S.p.A. in Italy, A.Ş. or Ltd. Şti. in Türkiye, and whether a holding layer pays for itself. The decision rests on capital needs, governance, exit and how the founders will be paid.",
        desc2:
          "Then we run the formation end to end (notarial deed, statuto, Registro delle Imprese filing, Partita IVA, PEC and SDI) and brief the notaio and the commercialista from a single file, so you explain nothing twice.",
        features: ["Vehicle selection & shareholder agreements", "Notarial deed & statuto drafting", "Registro delle Imprese, Partita IVA, PEC & SDI", "Turkish Trade Registry (MERSİS) filings"],
      },
      {
        num: "02",
        title: "Tax & Compliance Architecture",
        arch: "IRES · IRAP · Turkish corporate tax · Treaty positioning",
        desc1:
          "We model the Italy–Türkiye double-tax treaty, IRES and IRAP, Turkish corporate tax and withholding on dividends, royalties and services together, so you know the effective rate and the cash that reaches the shareholders before signing.",
        desc2:
          "We then document the structure for the authorities that will read it: transfer-pricing file, VAT and Intrastat set-up, AML / KYC pack for the banks, and a compliance calendar shared by the commercialista and the Turkish YMM.",
        features: ["Effective tax rate & repatriation modelling", "Treaty position & withholding analysis", "Transfer-pricing documentation", "VAT, Intrastat & compliance calendar"],
      },
      {
        num: "03",
        title: "Relocation, Permits & Banking",
        arch: "Codice Fiscale · Permesso di soggiorno · Corporate & personal banking",
        desc1:
          "Founders and executives land on the same date as the company. Codice Fiscale, the visa route (self-employment, intra-company or investor), permesso di soggiorno and Anagrafe registration run in parallel with the corporate filings.",
        desc2:
          "We treat banking as its own workstream: a capital-deposit account for the incorporation, then operating accounts and signatories, with the KYC pack prepared in the form each bank's compliance desk expects.",
        features: ["Codice Fiscale & SPID activation", "Visa route, nulla osta & permesso di soggiorno", "Capital-deposit & operating bank accounts", "Impatriate regime & tax residency planning"],
      },
      {
        num: "04",
        title: "Turkish Sourcing & Manufacturing Partnerships",
        arch: "Supplier audits · OSB industrial zones · Customs Union logistics",
        desc1:
          "For Italian companies moving production or procurement to Türkiye we shortlist suppliers through the Chambers of Industry and OSB zones, audit them on site, and run the RFQ on landed cost rather than unit price.",
        desc2:
          "We put contracts, quality gates and IP protection in place before the first purchase order, and design the A.TR and EUR.1 documentation, Incoterms and logistics corridor so goods clear the Customs Union without surprises.",
        features: ["Supplier shortlist & on-site audits", "RFQ & landed-cost comparison", "Framework agreements, QC & IP governance", "A.TR / EUR.1 & Incoterms set-up"],
      },
    ],
    processTitle: "Engagement process",
    processSubtitle: "How we work together",
    techTitle: "Expertise & tooling",
    techCategories: [
      { title: "Italian counterparties", items: ["Notaio & commercialista network", "Agenzia delle Entrate · Registro Imprese portals", "Camera di Commercio & PEC / SPID onboarding", "Questura, Prefettura & Sportello Unico"] },
      { title: "Tax & structuring", items: ["Italy–Türkiye treaty & withholding models", "Transfer-pricing & effective-rate models", "IRES / IRAP & Turkish corporate tax computation", "Impatriate regime & patent-box screening"] },
      { title: "Turkish counterparties", items: ["Chambers of Industry & OSB zones", "Turkish Trade Registry (MERSİS) filings", "YMM / SMMM tax practitioners", "Supplier audit & QC checklists"] },
      { title: "Trade & banking", items: ["A.TR / EUR.1 & Customs Union documentation", "Incoterms & landed-cost matrix", "Banking KYC packs & signatory set-up", "Framework agreements & IP governance"] },
    ],
    ctaTitle: "Start with the audit phase",
    ctaDesc: "A first call with a senior advisor: we map your case against the four phases and tell you what is needed, what it costs and how long it takes.",
    ctaButton: "Request a consultation",
  },
  tr: {
    title: "Sınır ötesi bir görevin ihtiyaç duyduğu her şey, tek çatı altında",
    coreServices: "Temel hizmet alanları",
    services: [
      {
        num: "01",
        title: "Kurumsal Yapılandırma ve Şirket Kuruluşu",
        arch: "S.r.l. · S.p.A. · A.Ş. / Ltd. Şti. · Holding katmanları",
        desc1:
          "Şemayı çizmeden önce şirket türünü seçeriz: İtalya'da S.r.l. mi S.p.A. mı, Türkiye'de A.Ş. mi Ltd. Şti. mi ve bir holding katmanının kendini amorti edip etmediği. Kararı sermaye ihtiyacı, yönetişim, çıkış senaryosu ve kurucuların nasıl ödeme alacağı belirler.",
        desc2:
          "Ardından kuruluşu uçtan uca yürütürüz (noter senedi, ana sözleşme, Registro delle Imprese tescili, Partita IVA, PEC ve SDI) ve noter ile commercialista'yı tek bir dosyadan bilgilendiririz; hiçbir şeyi iki kez anlatmazsınız.",
        features: ["Şirket türü seçimi ve ortaklık sözleşmeleri", "Noter senedi ve ana sözleşme hazırlığı", "Registro delle Imprese, Partita IVA, PEC ve SDI", "Ticaret Sicili (MERSİS) tescilleri"],
      },
      {
        num: "02",
        title: "Vergi ve Uyum Mimarisi",
        arch: "IRES · IRAP · Kurumlar vergisi · Anlaşma konumlandırması",
        desc1:
          "İtalya–Türkiye çifte vergilendirmeyi önleme anlaşmasını, IRES ve IRAP'ı, Türkiye'de kurumlar vergisini ve temettü, royalti ve hizmet ödemelerindeki stopajı birlikte modelleriz; efektif oranı ve ortaklara ulaşan nakdi imzadan önce bilirsiniz.",
        desc2:
          "Ardından yapıyı onu okuyacak kurumlar için belgeleriz: transfer fiyatlandırması dosyası, KDV ve Intrastat kurulumu, bankalar için AML / KYC paketi ve commercialista ile YMM'nin ortak kullandığı bir uyum takvimi.",
        features: ["Efektif vergi oranı ve nakit transferi modellemesi", "Anlaşma pozisyonu ve stopaj analizi", "Transfer fiyatlandırması dokümantasyonu", "KDV, Intrastat ve uyum takvimi"],
      },
      {
        num: "03",
        title: "Taşınma, İzinler ve Bankacılık",
        arch: "Codice Fiscale · Permesso di soggiorno · Kurumsal ve bireysel bankacılık",
        desc1:
          "Kurucular ve yöneticiler şirketle aynı tarihte yerleşir. Codice Fiscale, vize rotası (serbest meslek, şirket içi transfer ya da yatırımcı), permesso di soggiorno ve Anagrafe kaydı kurumsal tescillerle paralel yürür.",
        desc2:
          "Bankacılığı ayrı bir iş kolu olarak ele alırız: kuruluş için sermaye blokaj hesabı, ardından operasyonel hesaplar ve imza yetkilileri; KYC paketini her bankanın uyum biriminin beklediği formatta hazırlarız.",
        features: ["Codice Fiscale ve SPID aktivasyonu", "Vize rotası, nulla osta ve permesso di soggiorno", "Sermaye blokaj ve operasyonel banka hesapları", "Impatriati rejimi ve vergi mukimliği planlaması"],
      },
      {
        num: "04",
        title: "Türkiye Tedarik ve Üretim Ortaklıkları",
        arch: "Tedarikçi denetimleri · OSB'ler · Gümrük Birliği lojistiği",
        desc1:
          "Üretimini veya satın almasını Türkiye'ye taşıyan İtalyan şirketleri için tedarikçileri Sanayi Odaları ve OSB'ler üzerinden kısa listeye alır, sahada denetler ve RFQ'yu birim fiyat yerine teslim maliyeti üzerinden yürütürüz.",
        desc2:
          "Sözleşmeleri, kalite kapılarını ve fikri mülkiyet korumasını ilk siparişten önce kurar; A.TR ve EUR.1 belgelerini, Incoterms'i ve lojistik koridorunu mallar Gümrük Birliği'nden sürprizsiz geçsin diye tasarlarız.",
        features: ["Tedarikçi kısa listesi ve saha denetimleri", "RFQ ve teslim maliyeti karşılaştırması", "Çerçeve sözleşmeler, kalite kontrol ve FM yönetişimi", "A.TR / EUR.1 ve Incoterms kurulumu"],
      },
    ],
    processTitle: "Çalışma süreci",
    processSubtitle: "Nasıl birlikte çalışıyoruz",
    techTitle: "Uzmanlık ve araçlar",
    techCategories: [
      { title: "İtalya'daki muhataplar", items: ["Noter ve commercialista ağı", "Agenzia delle Entrate · Registro Imprese portalları", "Camera di Commercio ve PEC / SPID kurulumu", "Questura, Prefettura ve Sportello Unico"] },
      { title: "Vergi ve yapılandırma", items: ["İtalya–Türkiye anlaşma ve stopaj modelleri", "Transfer fiyatlandırması ve efektif oran modelleri", "IRES / IRAP ve kurumlar vergisi hesaplaması", "Impatriati rejimi ve patent box taraması"] },
      { title: "Türkiye'deki muhataplar", items: ["Sanayi Odaları ve OSB'ler", "Ticaret Sicili (MERSİS) tescilleri", "YMM / SMMM mali müşavirler", "Tedarikçi denetim ve kalite kontrol listeleri"] },
      { title: "Ticaret ve bankacılık", items: ["A.TR / EUR.1 ve Gümrük Birliği belgeleri", "Incoterms ve teslim maliyeti matrisi", "Banka KYC paketleri ve imza yetkisi kurulumu", "Çerçeve sözleşmeler ve FM yönetişimi"] },
    ],
    ctaTitle: "Denetim aşamasıyla başlayın",
    ctaDesc: "Kıdemli bir danışmanla ilk görüşme: durumunuzu dört aşamaya göre haritalar; neye ihtiyaç olduğunu, maliyetini ve süresini söyleriz.",
    ctaButton: "Danışmanlık talep edin",
  },
  it: {
    title: "Tutto ciò che serve a un mandato transfrontaliero, sotto un unico tetto",
    coreServices: "Aree di servizio principali",
    services: [
      {
        num: "01",
        title: "Strutturazione Societaria e Costituzione",
        arch: "S.r.l. · S.p.A. · A.Ş. / Ltd. Şti. · Livelli di holding",
        desc1:
          "Scegliamo il veicolo prima di disegnare l'organigramma: S.r.l. o S.p.A. in Italia, A.Ş. o Ltd. Şti. in Turchia, e se un livello di holding si ripaga. La decisione si basa su fabbisogno di capitale, governance, exit e su come i founder verranno remunerati.",
        desc2:
          "Poi seguiamo la costituzione dall'inizio alla fine (atto notarile, statuto, iscrizione al Registro delle Imprese, Partita IVA, PEC e SDI) e istruiamo notaio e commercialista da un unico fascicolo, così non spiegate nulla due volte.",
        features: ["Scelta del veicolo e patti parasociali", "Atto costitutivo e redazione dello statuto", "Registro delle Imprese, Partita IVA, PEC e SDI", "Iscrizioni al Registro del Commercio turco (MERSİS)"],
      },
      {
        num: "02",
        title: "Architettura Fiscale e di Compliance",
        arch: "IRES · IRAP · Imposta societaria turca · Posizionamento convenzionale",
        desc1:
          "Modelliamo insieme la convenzione Italia–Turchia contro le doppie imposizioni, IRES e IRAP, l'imposta societaria turca e le ritenute su dividendi, royalty e servizi, così conoscete aliquota effettiva e cassa che arriva ai soci prima della firma.",
        desc2:
          "Documentiamo poi la struttura per le autorità che la leggeranno: fascicolo transfer pricing, impostazione IVA e Intrastat, pacchetto AML / KYC per le banche e un calendario degli adempimenti condiviso tra commercialista e YMM turco.",
        features: ["Modellazione di aliquota effettiva e rimpatrio", "Posizione convenzionale e analisi delle ritenute", "Documentazione transfer pricing", "IVA, Intrastat e calendario degli adempimenti"],
      },
      {
        num: "03",
        title: "Relocation, Permessi e Banche",
        arch: "Codice Fiscale · Permesso di soggiorno · Conti aziendali e personali",
        desc1:
          "Founder e dirigenti arrivano nella stessa data della società. Codice Fiscale, il percorso di visto (lavoro autonomo, trasferimento intra-societario o investitori), permesso di soggiorno e iscrizione anagrafica procedono in parallelo con gli adempimenti societari.",
        desc2:
          "Trattiamo l'apertura dei conti come un filone a sé: conto per il deposito del capitale in fase di costituzione, poi conti operativi e firmatari, con il pacchetto KYC preparato nel formato che l'ufficio compliance di ciascuna banca si aspetta.",
        features: ["Codice Fiscale e attivazione SPID", "Percorso di visto, nulla osta e permesso di soggiorno", "Conto di deposito capitale e conti operativi", "Regime impatriati e pianificazione della residenza fiscale"],
      },
      {
        num: "04",
        title: "Sourcing in Turchia e Partnership Manifatturiere",
        arch: "Audit fornitori · Zone industriali OSB · Logistica in Unione doganale",
        desc1:
          "Per le aziende italiane che spostano produzione o approvvigionamento in Turchia selezioniamo i fornitori tramite le Camere dell'Industria e le zone OSB, li verifichiamo in loco e gestiamo la RFQ sul landed cost, non sul prezzo unitario.",
        desc2:
          "Impostiamo contratti, controlli qualità e tutela dell'IP prima del primo ordine, e progettiamo documentazione A.TR ed EUR.1, Incoterms e corridoio logistico perché la merce attraversi l'Unione doganale senza sorprese.",
        features: ["Shortlist fornitori e audit in loco", "RFQ e confronto sul landed cost", "Accordi quadro, QC e governance dell'IP", "Impostazione A.TR / EUR.1 e Incoterms"],
      },
    ],
    processTitle: "Processo di lavoro",
    processSubtitle: "Come lavoriamo insieme",
    techTitle: "Competenze e strumenti",
    techCategories: [
      { title: "Controparti italiane", items: ["Rete di notai e commercialisti", "Portali Agenzia delle Entrate · Registro Imprese", "Camera di Commercio e attivazione PEC / SPID", "Questura, Prefettura e Sportello Unico"] },
      { title: "Fiscalità e strutturazione", items: ["Modelli convenzionali e di ritenuta Italia–Turchia", "Modelli transfer pricing e aliquota effettiva", "Calcolo IRES / IRAP e imposta societaria turca", "Screening regime impatriati e patent box"] },
      { title: "Controparti turche", items: ["Camere dell'Industria e zone OSB", "Iscrizioni al Registro del Commercio (MERSİS)", "Professionisti fiscali YMM / SMMM", "Checklist di audit fornitori e controllo qualità"] },
      { title: "Commercio e banche", items: ["Documentazione A.TR / EUR.1 e Unione doganale", "Matrice Incoterms e landed cost", "Pacchetti KYC bancari e impostazione firmatari", "Accordi quadro e governance dell'IP"] },
    ],
    ctaTitle: "Iniziate dalla fase di audit",
    ctaDesc: "Una prima call con un advisor senior: mappiamo il vostro caso sulle quattro fasi e vi diciamo cosa serve, quanto costa e quanto tempo richiede.",
    ctaButton: "Richiedi una consulenza",
  },
} as const;

const H2 = "mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-normal uppercase leading-[1.08] tracking-[-0.012em]";
const CONTAINER = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const RULED_GRID = "grid gap-px overflow-hidden rounded-[2px] border border-line-soft bg-line-soft";
const SLAB = "flex flex-col bg-titanium/70 p-6 lg:p-8";

export default function MethodologyPageClient({ locale }: MethodologyPageClientProps) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref, ".pg-head");
  const t = getTranslation(locale);
  const m = t.methodology;
  const c = content[locale];
  const { open } = useConsultation();

  return (
    <main ref={ref} className="relative bg-obsidian text-white">
      <PageHeader eyebrow={m.label} title={m.title} sub={m.subtitle} accent="gold" />

      {/* 01 — Service areas */}
      <section className="border-t border-line py-20 lg:py-28" aria-labelledby="methodology-services">
        <div className={CONTAINER}>
          <div className="max-w-3xl" data-rv="up">
            <Eyebrow index="01">{c.coreServices}</Eyebrow>
            <h2 id="methodology-services" className={H2}>
              {c.title}
            </h2>
          </div>

          <ol className={`mt-10 md:grid-cols-2 ${RULED_GRID}`}>
            {c.services.map((service) => (
              <li key={service.num} className={SLAB} data-rv="up">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <span className="k">
                    <b>{service.num}</b>
                  </span>
                  <span className="k max-w-full text-right normal-case tracking-[0.12em] text-muted">{service.arch}</span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-normal leading-tight tracking-[-0.005em]">{service.title}</h3>
                <p className="body mt-4">{service.desc1}</p>
                <p className="body mt-3">{service.desc2}</p>
                <div className="mt-auto pt-6">
                  <ul className="grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] font-light text-white/80">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 02 — Engagement phases */}
      <section className="border-t border-line py-20 lg:py-28" aria-labelledby="methodology-process">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-rv="up">
            <Eyebrow index="02">{c.processTitle}</Eyebrow>
            <h2 id="methodology-process" className={H2}>
              {c.processSubtitle}
            </h2>
          </div>

          <ol className={`mt-10 sm:grid-cols-2 lg:grid-cols-4 ${RULED_GRID}`}>
            {m.steps.map((step) => (
              <li key={step.num} className={`${SLAB} min-h-[220px]`} data-rv="up">
                <span className="k">
                  <b>{step.num}</b>
                </span>
                <h3 className="mt-8 font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-normal leading-tight tracking-[-0.005em]">{step.title}</h3>
                <p className="body mt-3 max-w-[34ch]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 — Expertise stack, two-column ruled list */}
      <section className="border-t border-line py-20 lg:py-28" aria-labelledby="methodology-stack">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4" data-rv="up">
              <Eyebrow index="03">{m.label}</Eyebrow>
              <h2 id="methodology-stack" className={H2}>
                {c.techTitle}
              </h2>
            </div>
            <dl className="border-t border-line lg:col-span-8">
              {c.techCategories.map((category) => (
                <div key={category.title} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] sm:gap-8" data-rv="up">
                  <dt className="k self-start pt-1">{category.title}</dt>
                  <dd className="m-0">
                    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {category.items.map((item) => (
                        <li key={item} className="text-[14px] font-light leading-relaxed text-white/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 04 — Closing CTA row */}
      <section className="border-t border-line py-20 lg:py-28" aria-labelledby="methodology-cta">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8" data-rv="up">
              <Eyebrow index="04">{c.ctaButton}</Eyebrow>
              <h2 id="methodology-cta" className={`${H2} max-w-[22ch]`}>
                {c.ctaTitle}
              </h2>
              <p className="body-lg mt-5 max-w-[56ch]">{c.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-4 lg:justify-end" data-rv="up">
              <button
                type="button"
                className="cta isolate"
                style={{ marginTop: 0 }}
                data-cursor
                onClick={() => open({ source: `${m.title} · ${c.ctaButton}` })}
              >
                <i />
                <span>{c.ctaButton}</span>
                <Arrow className="cta-ar" />
              </button>
              <Link href={`/${locale}/contact/`} data-cursor className="k group inline-flex items-center gap-2 text-bone-dim transition-colors hover:text-white">
                {t.nav.contact}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
