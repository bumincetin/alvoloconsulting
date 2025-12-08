"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { FaFileSignature, FaBuilding, FaStamp, FaCheck, FaIndustry, FaCalendarAlt } from 'react-icons/fa';

const getExpansionTurkeyContent = (lang: string) => {
  const content = {
    tr: {
      title: "Türkiye'ye Genişleme",
      heroTitle: "Boğaz Hub'ı Üzerinden",
      heroTitleHighlight: "Ölçeklendirin.",
      description: "Türkiye, Avrupa'nın üretim güç merkezidir. Düşük işçilik maliyetleri, yüksek kaliteli üretim ve MENA bölgesine açılan bir kapı. Girişi biz hallediyoruz.",
      badge: "HEDEF: İSTANBUL (TR)",
      button1: "Genişlemeye Başla",
      button2: "Sektörleri Görüntüle",
      vatLabel: "KDV",
      vatValue: "20%",
      investmentZonesLabel: "YATIRIM BÖLGELERİ",
      investmentZonesValue: "Vergi Muafiyeti",
      medianAgeLabel: "MEDYAN YAŞ",
      medianAgeValue: "33.5 Yıl",
      medianAgeSub: "(Genç İşgücü)",
      processTitle: "İstanbul Protokolü",
      step1Title: "Vergi Numarası & Ana Sözleşme",
      step1Desc: "'Vergi Numarası' alınması ve MERSIS sistemi üzerinden Ana Sözleşme taslağının hazırlanması.",
      step2Title: "Ticaret Sicili",
      step2Desc: "Ticaret Odası'na kayıt. %25 sermaye bloku gerektirir.",
      step3Title: "İmza Sirküleri",
      step3Desc: "'İmza Sirküleri'nin noter onayı—tüm bankacılık ve devlet işlemleri için anahtarınız.",
      structure1Title: "Limited Şirket (Ltd)",
      structure1Item1: "Min. Sermaye: 50,000 TRY",
      structure1Item2: "Kurumlar Vergisi: %25 (Standart)",
      structure1Item3: "Yabancı Mülkiyet: %100 İzin Verilir",
      structure2Title: "Teknopark Bölgeleri",
      structure2Item1: "Gelir Vergisi: %0 (Yazılım AR-GE)",
      structure2Item2: "KDV Muafiyeti: Yazılım Satışlarında",
      structure2Item3: "SGK (Sosyal Güvenlik): %50 Sübvansiyon",
      ctaTitle: "Türkiye'de üretmeye hazır mısınız?",
      ctaButton: "Değerlendirme Rezervasyonu"
    },
    en: {
      title: "Scale in Turkey",
      heroTitle: "Scale via the",
      heroTitleHighlight: "Bosphorus Hub.",
      description: "Turkey is Europe's manufacturing powerhouse. Low labor costs, high quality production, and a gateway to the MENA region. We handle the entry.",
      badge: "DESTINATION: ISTANBUL (TR)",
      button1: "Start Expansion",
      button2: "View Sectors",
      vatLabel: "VAT (KDV)",
      vatValue: "20%",
      investmentZonesLabel: "INVESTMENT ZONES",
      investmentZonesValue: "Tax Free",
      medianAgeLabel: "MEDIAN AGE",
      medianAgeValue: "33.5 Years",
      medianAgeSub: "(Young Workforce)",
      processTitle: "The Istanbul Protocol",
      step1Title: "Tax ID & Articles",
      step1Desc: "Obtaining the 'Vergi Numarası' and drafting Articles of Association via MERSIS system.",
      step2Title: "Trade Registry",
      step2Desc: "Registration with the Chamber of Commerce (Ticaret Odası). Requires 25% capital block.",
      step3Title: "Signature Circular",
      step3Desc: "Notarizing the 'İmza Sirküleri'—your master key for all banking and government operations.",
      structure1Title: "Limited Şirket (Ltd)",
      structure1Item1: "Min. Capital: 50,000 TRY",
      structure1Item2: "Corp Tax: 25% (Standard)",
      structure1Item3: "Foreign Ownership: 100% Allowed",
      structure2Title: "Teknopark Zones",
      structure2Item1: "Income Tax: 0% (Software R&D)",
      structure2Item2: "VAT Exemption: On Software Sales",
      structure2Item3: "SGK (Social Security): 50% Subsidy",
      ctaTitle: "Ready to produce in Turkey?",
      ctaButton: "Book Assessment"
    },
    it: {
      title: "Scala in Turchia",
      heroTitle: "Scala tramite l'",
      heroTitleHighlight: "Hub del Bosforo.",
      description: "La Turchia è il centro di produzione dell'Europa. Costi del lavoro bassi, produzione di alta qualità e un gateway verso la regione MENA. Gestiamo l'ingresso.",
      badge: "DESTINAZIONE: ISTANBUL (TR)",
      button1: "Inizia l'Espansione",
      button2: "Visualizza Settori",
      vatLabel: "IVA (KDV)",
      vatValue: "20%",
      investmentZonesLabel: "ZONE DI INVESTIMENTO",
      investmentZonesValue: "Esente da Tasse",
      medianAgeLabel: "ETÀ MEDIA",
      medianAgeValue: "33.5 Anni",
      medianAgeSub: "(Forza Lavoro Giovane)",
      processTitle: "Il Protocollo di Istanbul",
      step1Title: "Codice Fiscale & Statuto",
      step1Desc: "Ottenimento del 'Vergi Numarası' e redazione dello Statuto tramite il sistema MERSIS.",
      step2Title: "Registro Commerciale",
      step2Desc: "Registrazione presso la Camera di Commercio (Ticaret Odası). Richiede un blocco di capitale del 25%.",
      step3Title: "Circolare Firma",
      step3Desc: "Autenticazione della 'İmza Sirküleri'—la tua chiave master per tutte le operazioni bancarie e governative.",
      structure1Title: "Şirket Limitata (Ltd)",
      structure1Item1: "Capitale Min.: 50.000 TRY",
      structure1Item2: "Imposta Societaria: 25% (Standard)",
      structure1Item3: "Proprietà Estera: 100% Consentita",
      structure2Title: "Zone Teknopark",
      structure2Item1: "Imposta sul Reddito: 0% (R&S Software)",
      structure2Item2: "Esenzione IVA: Su Vendite Software",
      structure2Item3: "SGK (Sicurezza Sociale): 50% Sussidio",
      ctaTitle: "Pronto a produrre in Turchia?",
      ctaButton: "Prenota Valutazione"
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

const ExpansionTurkeyPage = () => {
  const { language } = useLanguage();
  const c = getExpansionTurkeyContent(language);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 bg-grid z-0 pointer-events-none opacity-30"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f58643]/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4 text-sm font-semibold text-[var(--text-secondary)]">
              <Link href="/services/financial" className="hover:underline" style={{ color: 'var(--brand-orange)' }}>
                Financial Consultancy
              </Link>
              <span className="mx-2 text-[var(--text-muted)]">/</span>
              <span style={{ color: 'var(--text-secondary)' }}>{c.title}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              {c.heroTitle} <br />
              <span style={{color: '#f58643'}}>{c.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed border-l-2 pl-6" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-primary)' }}>
              {c.description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg" style={{ backgroundColor: 'var(--brand-orange)', color: '#ffffff' }}>
                {c.button1}
              </button>
              <button className="px-6 py-3 rounded-lg border transition-colors flex items-center gap-2" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
                <FaIndustry className="w-4 h-4" />
                {c.button2}
              </button>
            </div>
          </div>
          
          {/* Quick Stats Card */}
          <div className="glass-panel p-8 rounded-2xl md:translate-x-12" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
                <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>{c.vatLabel}</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>20%</div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
                <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>{c.investmentZonesLabel}</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--brand-orange)' }}>{c.investmentZonesValue}</div>
              </div>
              <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
                <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>{c.medianAgeLabel}</div>
                <div className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  {c.medianAgeValue} <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>({c.medianAgeSub})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-secondary)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center" style={{ color: 'var(--text-primary)' }}>{c.processTitle}</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10" style={{ borderColor: 'var(--brand-orange)', backgroundColor: 'var(--bg-primary)' }}>
                <span className="font-bold" style={{color: '#f58643'}}>01</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-[#f58643] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FaFileSignature className="w-4 h-4" style={{color: '#f58643'}} />
                  <h3 className="font-bold text-white">{c.step1Title}</h3>
                </div>
                <p className="text-sm" style={{color: '#94a3b8'}}>{c.step1Desc}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-primary)' }}>
                <span className="font-bold" style={{color: '#64748b'}}>02</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-[#f58643] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FaBuilding className="w-4 h-4" style={{color: '#f58643'}} />
                  <h3 className="font-bold text-white">{c.step2Title}</h3>
                </div>
                <p className="text-sm" style={{color: '#94a3b8'}}>{c.step2Desc}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-primary)' }}>
                <span className="font-bold" style={{color: '#64748b'}}>03</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-[#f58643] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FaStamp className="w-4 h-4" style={{color: '#f58643'}} />
                  <h3 className="font-bold text-white">{c.step3Title}</h3>
                </div>
                <p className="text-sm" style={{color: '#94a3b8'}}>{c.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Comparison */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Limited Şirket */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span style={{color: '#f58643'}}>01.</span> {c.structure1Title}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#f58643'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure1Item1}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#f58643'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure1Item2}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#f58643'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure1Item3}</span>
                </div>
              </div>
            </div>

            {/* Teknopark Zones */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span style={{color: '#f58643'}}>02.</span> {c.structure2Title}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--brand-orange)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#f58643'}} />
                  <span className="text-sm font-medium text-white">{c.structure2Item1}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#f58643'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure2Item2}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#f58643'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure2Item3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <h2 className="text-3xl font-bold text-white mb-6" style={{ color: 'var(--text-primary)' }}>{c.ctaTitle}</h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all"
          style={{ backgroundColor: 'var(--brand-orange)', color: '#ffffff' }}
        >
          {c.ctaButton}
          <FaCalendarAlt className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
};

export default ExpansionTurkeyPage;

