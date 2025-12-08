"use client";
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { FaCheck, FaRegChartBar, FaRegHandshake, FaGlobe, FaRegLightbulb, FaArrowRight } from 'react-icons/fa';
import { useMemo } from 'react';

const getExpansionContent = (lang: string) => {
  const content = {
    tr: {
      title: "Genişleme Stratejisi",
      heroHeadline: "İtalya ↔ Türkiye arasında tek bir genişleme oyunu planı",
      heroSub: "Kuruluş, vergi ve operasyonel orkestrasyon. İki piyasada tek bir playbook.",
      heroCta: "Danışmanlık Al",
      routesTitle: "Hedefinizi Seçin",
      routes: [
        {
          badge: "MİLANO",
          title: "İtalya'ya Açılın",
          copy: "P.IVA, noterleşmiş kuruluş, banka hesabı ve mali temsilcilik.",
          href: "/services/financial/consulting/expansion/italy",
        },
        {
          badge: "İSTANBUL",
          title: "Türkiye'de Ölçekleyin",
          copy: "Vergi numarası, ticaret sicili, imza sirküleri ve yatırım teşvikleri.",
          href: "/services/financial/consulting/expansion/turkey",
        },
      ],
      processTitle: "Nasıl Çalışır?",
      steps: [
        { label: "Pazar & uyumluluk taraması", icon: <FaRegLightbulb /> },
        { label: "Vergi & kuruluş tasarımı", icon: <FaGlobe /> },
        { label: "Operasyon & raporlama", icon: <FaRegHandshake /> },
      ],
      benefitsTitle: "Neden Tek Çatı?",
      benefits: [
        "Tek ekip, iki yargı bölgesi",
        "Kuruluş → banka → muhasebe zinciri",
        "Süreç KPI'ları ve raporlama",
      ],
      faqTitle: "Sık Sorulanlar",
      faqs: [
        { q: "İki ülke için tek sözleşme mi?", a: "Evet, tek çatı danışmanlık ile hem İtalya hem Türkiye süreçlerini yönetiyoruz." },
        { q: "Süre ne kadar?", a: "Kurulum tipine göre 14-30 gün arası; banka açılışı kritik değişken." },
        { q: "Uzaktan yapabilir miyim?", a: "Evet, çoğu adımı vekaletlerle ve uzaktan imza süreçleriyle tamamlıyoruz." },
      ],
    },
    en: {
      title: "Expansion Strategy",
      heroHeadline: "One playbook to expand across Italy ↔ Turkey",
      heroSub: "Entity, tax, and operational orchestration. One team for both markets.",
      heroCta: "Get Advisory",
      routesTitle: "Choose Your Track",
      routes: [
        {
          badge: "MILAN",
          title: "Expand to Italy",
          copy: "P.IVA, notarized incorporation, banking, and fiscal representation.",
          href: "/services/financial/consulting/expansion/italy",
        },
        {
          badge: "ISTANBUL",
          title: "Scale in Turkey",
          copy: "Tax ID, trade registry, signature circular, and incentive zones.",
          href: "/services/financial/consulting/expansion/turkey",
        },
      ],
      processTitle: "How It Works",
      steps: [
        { label: "Market & compliance scan", icon: <FaRegLightbulb /> },
        { label: "Tax & incorporation design", icon: <FaGlobe /> },
        { label: "Ops & reporting cadence", icon: <FaRegHandshake /> },
      ],
      benefitsTitle: "Why One Team?",
      benefits: [
        "Single team, dual jurisdictions",
        "End-to-end: entity → bank → accounting",
        "Process KPIs and reporting",
      ],
      faqTitle: "FAQs",
      faqs: [
        { q: "One agreement for both countries?", a: "Yes—single engagement covering Italy and Turkey workflows." },
        { q: "Timeline?", a: "14-30 days depending on entity type; banking is the critical path." },
        { q: "Remote-friendly?", a: "Yes, most steps handled via powers of attorney and remote signings." },
      ],
    },
    it: {
      title: "Strategia di Espansione",
      heroHeadline: "Un unico playbook per Italia ↔ Turchia",
      heroSub: "Costituzione, fisco e operazioni. Un team per entrambi i mercati.",
      heroCta: "Richiedi Consulenza",
      routesTitle: "Scegli il Percorso",
      routes: [
        {
          badge: "MILANO",
          title: "Espandi in Italia",
          copy: "P.IVA, costituzione notarile, conto bancario e rappresentanza fiscale.",
          href: "/services/financial/consulting/expansion/italy",
        },
        {
          badge: "ISTANBUL",
          title: "Scala in Turchia",
          copy: "Codice fiscale, registro imprese, firma circolare e zone agevolate.",
          href: "/services/financial/consulting/expansion/turkey",
        },
      ],
      processTitle: "Come Funziona",
      steps: [
        { label: "Analisi mercato & compliance", icon: <FaRegLightbulb /> },
        { label: "Design fiscale & costituzione", icon: <FaGlobe /> },
        { label: "Operatività & reporting", icon: <FaRegHandshake /> },
      ],
      benefitsTitle: "Perché un Team Unico?",
      benefits: [
        "Un solo team, due giurisdizioni",
        "End-to-end: ente → banca → contabilità",
        "KPI di processo e reporting",
      ],
      faqTitle: "Domande Frequenti",
      faqs: [
        { q: "Un contratto per entrambi i Paesi?", a: "Sì, un unico incarico che copre i flussi Italia e Turchia." },
        { q: "Tempistiche?", a: "14-30 giorni a seconda del veicolo; la banca è il percorso critico." },
        { q: "È tutto da remoto?", a: "Quasi tutto: deleghe e firme digitali per minimizzare la presenza fisica." },
      ],
    },
  };
  return content[lang as keyof typeof content] || content.en;
};

const ExpansionPage = () => {
  const { language } = useLanguage();
  const c = useMemo(() => getExpansionContent(language), [language]);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

        {/* Hero */}
        <section className="relative pt-28 pb-16 px-6 max-w-6xl mx-auto">
          <div className="glass-panel rounded-3xl p-10 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="neo-pill">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <span className="text-[11px] tracking-[0.2em] uppercase">{c.title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--text-primary)]">
                  {c.heroHeadline}
                </h1>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{c.heroSub}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="neo-cta px-6 py-3 rounded-md inline-flex items-center gap-2">
                    {c.heroCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Routes */}
        <section className="px-6 pb-16 max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <span className="neo-pill">
              <FaArrowRight className="w-3 h-3" />
              <span className="text-[11px] tracking-[0.18em] uppercase">{c.routesTitle}</span>
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.routes.map((route) => (
              <Link
                key={route.title}
                href={route.href}
                className="glass-panel rounded-2xl p-8 flex flex-col gap-4 hover:border-[var(--border-accent)] transition-colors"
              >
                <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] uppercase tracking-[0.15em]">
                  <span>{route.badge}</span>
                  <FaArrowRight className="w-4 h-4" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{route.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{route.copy}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="px-6 pb-16 max-w-6xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{c.processTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {c.steps.map((step, idx) => (
              <div key={step.label} className="glass-panel rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[var(--neon-cyan)]">
                  {step.icon}
                </div>
                <div className="text-sm uppercase tracking-[0.14em] text-[var(--text-secondary)]">0{idx + 1}</div>
                <p className="text-[var(--text-primary)] font-semibold leading-relaxed">{step.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 pb-16 max-w-6xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{c.benefitsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {c.benefits.map((item) => (
              <div key={item} className="glass-panel rounded-xl p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--neon-purple)]">
                  <FaCheck className="w-4 h-4" />
                </div>
                <p className="text-[var(--text-primary)] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 pb-20 max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center">{c.faqTitle}</h2>
          <div className="space-y-3">
            {c.faqs.map((item, idx) => (
              <details key={item.q} className="glass-panel rounded-xl p-4">
                <summary className="cursor-pointer text-[var(--text-primary)] font-semibold flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="text-[var(--text-secondary)] text-sm">0{idx + 1}</span>
                </summary>
                <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ExpansionPage; 