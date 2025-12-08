"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { FaFingerprint, FaBuilding, FaLandmark, FaCheck, FaDownload, FaCalendarAlt } from 'react-icons/fa';

const getExpansionItalyContent = (lang: string) => {
  const content = {
    tr: {
      title: "İtalya'ya Genişleme",
      heroTitle: "İtalyan Pazarına",
      heroTitleHighlight: "Girin.",
      description: "İtalya, AB'nin 3. büyük ekonomisi, ancak iş yapma kolaylığında 58. sırada. Bu boşluğu algoritmik hassasiyetle kapatıyoruz.",
      badge: "HEDEF: MİLANO (IT)",
      button1: "Şirket Kurulumuna Başla",
      button2: "Vergi Rehberini İndir",
      vatLabel: "STANDART KDV (IVA)",
      vatValue: "22%",
      startupTaxLabel: "STARTUP VERGİ İNDİRİMİ",
      startupTaxValue: "Evet",
      setupTimeLabel: "ORT. KURULUM SÜRESİ (BİZİMLE)",
      setupTimeValue: "14 Gün",
      setupTimeOld: "45 Gün",
      processTitle: "Kurulum Matrisi",
      step1Title: "Codice Fiscale & PEC",
      step1Desc: "İtalyan Vergi Kimlik Numaranızı ve Sertifikalı E-postanızı (PEC) uzaktan oluşturuyoruz. Milano'ya uçuş gerekmez.",
      step2Title: "Noter & Kuruluş",
      step2Desc: "\"Atto Costitutivo\" taslağı ve ortak noter ağımız aracılığıyla S.r.l. kaydı.",
      step3Title: "Banka Hesabı & KDV",
      step3Desc: "İşletme hesabının açılması (ikametgahı olmayanlar için en zor kısım) ve P.IVA aktivasyonu.",
      structure1Title: "S.r.l. / Kurumsal",
      structure1Item1: "Min. Sermaye: €1 (S.r.l.s) veya €10k",
      structure1Item2: "Kurumlar Vergisi (IRES): 24%",
      structure1Item3: "Sorumluluk: Sınırlı",
      structure2Title: "Partita IVA / Forfettario",
      structure2Item1: "Düz Vergi: %5 (İlk 5 Yıl)",
      structure2Item2: "Limit: Yılda €85,000",
      structure2Item3: "Elektronik Faturalama: Zorunlu",
      ctaTitle: "Milano'da faaliyet göstermeye hazır mısınız?",
      ctaButton: "Danışmanlık Rezervasyonu"
    },
    en: {
      title: "Expand to Italy",
      heroTitle: "Enter the",
      heroTitleHighlight: "Italian Market.",
      description: "Italy is the 3rd largest economy in the EU, but ranked 58th for ease of doing business. We bridge that gap with algorithmic precision.",
      badge: "DESTINATION: MILAN (IT)",
      button1: "Start Incorporation",
      button2: "Download Tax Guide",
      vatLabel: "STANDARD VAT (IVA)",
      vatValue: "22%",
      startupTaxLabel: "STARTUP TAX BREAK",
      startupTaxValue: "Yes",
      setupTimeLabel: "AVG. SETUP TIME (WITH US)",
      setupTimeValue: "14 Days",
      setupTimeOld: "45 Days",
      processTitle: "The Incorporation Matrix",
      step1Title: "Codice Fiscale & PEC",
      step1Desc: "We generate your Italian Tax ID and Certified Email (PEC) remotely. No flight to Milan required.",
      step2Title: "Notary & Incorporation",
      step2Desc: "Drafting of the \"Atto Costitutivo\" and S.r.l. registration via our partner notary network.",
      step3Title: "Bank Account & VAT",
      step3Desc: "Opening the business account (the hardest part for non-residents) and P.IVA activation.",
      structure1Title: "S.r.l. / Corporate",
      structure1Item1: "Min. Capital: €1 (S.r.l.s) or €10k",
      structure1Item2: "Corporate Tax (IRES): 24%",
      structure1Item3: "Liability: Limited",
      structure2Title: "Partita IVA / Forfettario",
      structure2Item1: "Flat Tax: 5% (First 5 Years)",
      structure2Item2: "Limit: €85,000 / year",
      structure2Item3: "Electronic Invoicing: Mandatory",
      ctaTitle: "Ready to operate in Milan?",
      ctaButton: "Book Consultation"
    },
    it: {
      title: "Espansione in Italia",
      heroTitle: "Entra nel",
      heroTitleHighlight: "Mercato Italiano.",
      description: "L'Italia è la 3a economia più grande dell'UE, ma classificata 58a per facilità di fare affari. Colmiamo quel divario con precisione algoritmica.",
      badge: "DESTINAZIONE: MILANO (IT)",
      button1: "Inizia la Costituzione",
      button2: "Scarica Guida Fiscale",
      vatLabel: "IVA STANDARD",
      vatValue: "22%",
      startupTaxLabel: "DETRAZIONE FISCALE STARTUP",
      startupTaxValue: "Sì",
      setupTimeLabel: "TEMPO MEDIO SETUP (CON NOI)",
      setupTimeValue: "14 Giorni",
      setupTimeOld: "45 Giorni",
      processTitle: "La Matrice di Costituzione",
      step1Title: "Codice Fiscale & PEC",
      step1Desc: "Generiamo il tuo Codice Fiscale italiano e l'Email Certificata (PEC) a distanza. Nessun volo per Milano richiesto.",
      step2Title: "Notaio & Costituzione",
      step2Desc: "Redazione dell'\"Atto Costitutivo\" e registrazione S.r.l. tramite la nostra rete di notai partner.",
      step3Title: "Conto Bancario & IVA",
      step3Desc: "Apertura del conto aziendale (la parte più difficile per i non residenti) e attivazione P.IVA.",
      structure1Title: "S.r.l. / Societario",
      structure1Item1: "Capitale Min.: €1 (S.r.l.s) o €10k",
      structure1Item2: "Imposta Societaria (IRES): 24%",
      structure1Item3: "Responsabilità: Limitata",
      structure2Title: "Partita IVA / Forfettario",
      structure2Item1: "Tassa Fissa: 5% (Primi 5 Anni)",
      structure2Item2: "Limite: €85.000 / anno",
      structure2Item3: "Fatturazione Elettronica: Obbligatoria",
      ctaTitle: "Pronto ad operare a Milano?",
      ctaButton: "Prenota Consulenza"
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

const ExpansionItalyPage = () => {
  const { language } = useLanguage();
  const c = getExpansionItalyContent(language);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 bg-grid z-0 pointer-events-none opacity-30"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3c77ad]/20 rounded-full blur-[100px] pointer-events-none"></div>

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
              <span style={{color: '#3c77ad'}}>{c.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed border-l-2 pl-6" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-primary)' }}>
              {c.description}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg" style={{ backgroundColor: 'var(--brand-blue)', color: '#ffffff' }}>
                {c.button1}
              </button>
              <button className="px-6 py-3 rounded-lg border transition-colors flex items-center gap-2" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
                <FaDownload className="w-4 h-4" />
                {c.button2}
              </button>
            </div>
          </div>
          
          {/* Quick Stats Card */}
          <div className="glass-panel p-8 rounded-2xl md:translate-x-12" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
                <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>{c.vatLabel}</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>22%</div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
                <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>{c.startupTaxLabel}</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--brand-blue)' }}>{c.startupTaxValue}</div>
              </div>
              <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
                <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>{c.setupTimeLabel}</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  {c.setupTimeValue} <span className="text-xs font-normal line-through" style={{ color: 'var(--text-muted)' }}>{c.setupTimeOld}</span>
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
              <div className="flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10" style={{ borderColor: 'var(--brand-blue)', backgroundColor: 'var(--bg-primary)' }}>
                <span className="font-bold" style={{color: '#3c77ad'}}>01</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-[#3c77ad] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FaFingerprint className="w-4 h-4" style={{color: '#3c77ad'}} />
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
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-[#3c77ad] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FaBuilding className="w-4 h-4" style={{color: '#3c77ad'}} />
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
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-xl hover:border-[#3c77ad] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FaLandmark className="w-4 h-4" style={{color: '#3c77ad'}} />
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
            {/* S.r.l. */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span style={{color: '#3c77ad'}}>01.</span> {c.structure1Title}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#3c77ad'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure1Item1}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#3c77ad'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure1Item2}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#3c77ad'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure1Item3}</span>
                </div>
              </div>
            </div>

            {/* Partita IVA */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span style={{color: '#3c77ad'}}>02.</span> {c.structure2Title}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--brand-blue)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#3c77ad'}} />
                  <span className="text-sm font-medium text-white">{c.structure2Item1}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#3c77ad'}} />
                  <span className="text-sm" style={{color: '#cbd5e1'}}>{c.structure2Item2}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded border-l-2" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <FaCheck className="w-4 h-4" style={{color: '#3c77ad'}} />
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
          style={{ backgroundColor: 'var(--brand-blue)', color: '#ffffff' }}
        >
          {c.ctaButton}
          <FaCalendarAlt className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
};

export default ExpansionItalyPage;


