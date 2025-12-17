'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import GlassCard from '../../components/ui/GlassCard';
import { type Locale } from '@/lib/translations';

interface MethodologyPageClientProps {
  locale: Locale;
}

const content = {
  en: {
    badge: 'METHODOLOGY & SERVICES',
    title: 'Financial Consulting Meets Data-Driven Strategy',
    subtitle: 'A systematic approach to delivering cross-border financial solutions that bridge Italy and Turkey through advanced analytics and regulatory expertise.',
    coreServices: 'CORE SERVICE AREAS',
    services: [
      {
        num: '01',
        title: 'Financial Analytics & Structuring',
        arch: 'QUANTITATIVE ANALYSIS // TAX OPTIMIZATION // CAPITAL STRUCTURING',
        desc1: 'We transform complex financial landscapes into actionable strategies using advanced analytical frameworks. From cross-border tax optimization to capital structure analysis, every solution is engineered for real-world implementation.',
        desc2: 'Our approach combines traditional financial modeling with modern data analytics, ensuring strategies are both statistically robust and practically applicable to SME expansion, investment decisions, and international trade operations.',
        features: ['DCF & Comparative Valuation Models', 'Tax Efficiency Optimization', 'Working Capital Analysis', 'Cross-Border Investment Structuring'],
        visual: 'NPV → IRR → WACC',
        metric: 'α: 0.05',
      },
      {
        num: '02',
        title: 'Regulatory Compliance & Risk Management',
        arch: 'EU REGULATORY FRAMEWORK // RISK QUANTIFICATION // COMPLIANCE AUTOMATION',
        desc1: 'Navigating Italian and EU regulations requires deep expertise in GDPR, anti-money laundering (AML), and cross-border fiscal compliance. We leverage automated compliance monitoring systems to ensure continuous adherence.',
        desc2: 'Our risk management framework employs Monte Carlo simulations and stress testing methodologies to quantify operational, market, and regulatory risks—enabling proactive mitigation strategies for your Italian market entry.',
        features: ['EU/Italian Regulatory Mapping', 'AML/KYC Compliance Systems', 'Risk Assessment Frameworks', 'Automated Compliance Monitoring'],
        visual: 'RISK_MATRIX',
        metric: 'VaR 95%',
      },
      {
        num: '03',
        title: 'Market Intelligence & Entry Strategy',
        arch: 'DATA PIPELINES // MARKET SEGMENTATION // COMPETITIVE ANALYSIS',
        desc1: 'We build comprehensive market intelligence systems that aggregate data from multiple sources—industry reports, customs data, financial filings—to provide real-time insights into Italian market dynamics.',
        desc2: 'Our entry strategy development uses cluster analysis and predictive modeling to identify optimal market segments, pricing strategies, and distribution channels tailored to your business sector.',
        features: ['Market Size & Growth Analysis', 'Competitor Benchmarking', 'Customer Segmentation Models', 'Entry Mode Optimization'],
        visual: 'MARKET_DATA → INSIGHTS',
        metric: 'R² > 0.85',
      },
      {
        num: '04',
        title: 'Cross-Border Financial Consulting',
        arch: 'ITALY-TURKEY CORRIDOR // BILATERAL STRUCTURES // STRATEGIC PARTNERSHIPS',
        desc1: 'As Alvolo Consulting, we specialize in the Italy-Turkey financial corridor—providing comprehensive advisory services for SMEs and professionals navigating cross-border investments, fiscal representation, and market expansion.',
        desc2: 'Our consulting methodology integrates deep local knowledge with quantitative rigor, helping clients understand not just what the data shows, but how to strategically act on it within complex regulatory environments.',
        features: ['Cross-Border Investment Advisory', 'Italian Financial System Navigation', 'Regulatory Compliance Guidance', 'Strategic Financial Planning'],
        visual: 'IT ↔ TR NETWORK',
        metric: '€50M+ Analyzed',
      },
    ],
    processTitle: 'ENGAGEMENT PROCESS',
    processSubtitle: 'How We Work Together',
    process: [
      { num: '01', title: 'Discovery', desc: 'Deep-dive into your business context, data landscape, and strategic objectives through structured consultation sessions.' },
      { num: '02', title: 'Architecture', desc: 'Design technical specifications, regulatory pathways, and financial structures aligned to your requirements.' },
      { num: '03', title: 'Execution', desc: 'Iterative implementation with regular checkpoints, ensuring alignment with business goals throughout the process.' },
      { num: '04', title: 'Delivery', desc: 'Production-ready solutions with comprehensive documentation, training, and ongoing support options.' },
    ],
    techTitle: 'TECHNOLOGY & EXPERTISE STACK',
    techCategories: [
      { title: 'Financial Tools', items: ['Bloomberg Terminal', 'Refinitiv Eikon', 'FactSet', 'S&P Capital IQ'] },
      { title: 'Analytics', items: ['Python (Pandas, NumPy)', 'R Statistical Suite', 'SQL / NoSQL', 'Power BI / Tableau'] },
      { title: 'Compliance', items: ['GDPR Framework', 'AML/KYC Systems', 'Italian Tax Code', 'EU Directives'] },
      { title: 'Integration', items: ['API Integrations', 'Data Pipelines', 'Cloud Infrastructure', 'Automated Reporting'] },
    ],
    ctaTitle: 'Ready to Transform Your Cross-Border Strategy?',
    ctaDesc: "Let's discuss how data-driven financial expertise can accelerate your expansion.",
    ctaButton: 'Initiate Consultation',
  },
  tr: {
    badge: 'METODOLOJİ & HİZMETLER',
    title: 'Finansal Danışmanlık, Veri Odaklı Stratejiyle Buluşuyor',
    subtitle: 'İleri analitik ve düzenleyici uzmanlık aracılığıyla İtalya ve Türkiye\'yi birleştiren sınır ötesi finansal çözümler sunmaya yönelik sistematik bir yaklaşım.',
    coreServices: 'TEMEL HİZMET ALANLARI',
    services: [
      {
        num: '01',
        title: 'Finansal Analitik & Yapılandırma',
        arch: 'KANTİTATİF ANALİZ // VERGİ OPTİMİZASYONU // SERMAYE YAPILANDIRMA',
        desc1: 'Gelişmiş analitik çerçeveler kullanarak karmaşık finansal ortamları eyleme dönüştürülebilir stratejilere dönüştürüyoruz. Sınır ötesi vergi optimizasyonundan sermaye yapısı analizine kadar her çözüm gerçek dünya uygulaması için tasarlanmıştır.',
        desc2: 'Yaklaşımımız geleneksel finansal modellemeyi modern veri analitiğiyle birleştirerek stratejilerin hem istatistiksel olarak güçlü hem de KOBİ genişlemesi, yatırım kararları ve uluslararası ticaret operasyonlarına pratik olarak uygulanabilir olmasını sağlar.',
        features: ['İNA & Karşılaştırmalı Değerleme Modelleri', 'Vergi Verimliliği Optimizasyonu', 'İşletme Sermayesi Analizi', 'Sınır Ötesi Yatırım Yapılandırma'],
        visual: 'NBD → İÇ VERİM → AOSM',
        metric: 'α: 0.05',
      },
      {
        num: '02',
        title: 'Mevzuat Uyumu & Risk Yönetimi',
        arch: 'AB DÜZENLEYICI ÇERÇEVESİ // RİSK NİCELEME // UYUMLULUK OTOMASYONU',
        desc1: 'İtalyan ve AB düzenlemelerinde gezinmek GDPR, kara para aklamayı önleme (AML) ve sınır ötesi mali uyumluluk konularında derin uzmanlık gerektirir. Sürekli uyumu sağlamak için otomatik uyumluluk izleme sistemleri kullanıyoruz.',
        desc2: 'Risk yönetimi çerçevemiz, operasyonel, piyasa ve düzenleyici riskleri nicelendirmek için Monte Carlo simülasyonları ve stres testi metodolojileri kullanır—İtalya pazar girişiniz için proaktif azaltma stratejileri sağlar.',
        features: ['AB/İtalyan Mevzuat Haritalama', 'AML/KYC Uyumluluk Sistemleri', 'Risk Değerlendirme Çerçeveleri', 'Otomatik Uyumluluk İzleme'],
        visual: 'RİSK_MATRİSİ',
        metric: 'VaR %95',
      },
      {
        num: '03',
        title: 'Pazar İstihbaratı & Giriş Stratejisi',
        arch: 'VERİ PIPELINE\'LARI // PAZAR SEGMENTASYONU // REKABETÇİ ANALİZ',
        desc1: 'Sektör raporları, gümrük verileri, finansal dosyalamalar gibi birden fazla kaynaktan veri toplayan kapsamlı pazar istihbarat sistemleri oluşturarak İtalyan pazar dinamikleri hakkında gerçek zamanlı içgörüler sunuyoruz.',
        desc2: 'Giriş stratejisi geliştirmemiz, işletme sektörünüze özel optimal pazar segmentlerini, fiyatlandırma stratejilerini ve dağıtım kanallarını belirlemek için kümeleme analizi ve tahminsel modelleme kullanır.',
        features: ['Pazar Büyüklüğü & Büyüme Analizi', 'Rakip Karşılaştırması', 'Müşteri Segmentasyon Modelleri', 'Giriş Modu Optimizasyonu'],
        visual: 'PAZAR_VERİSİ → İÇGÖRÜLER',
        metric: 'R² > 0.85',
      },
      {
        num: '04',
        title: 'Sınır Ötesi Finansal Danışmanlık',
        arch: 'İTALYA-TÜRKİYE KORİDORU // İKİLİ YAPILAR // STRATEJİK ORTAKLIKLAR',
        desc1: 'Alvolo Consulting olarak İtalya-Türkiye finansal koridorunda uzmanlaşıyoruz—sınır ötesi yatırımlar, mali temsilcilik ve pazar genişlemesi konularında gezinen KOBİ\'ler ve profesyoneller için kapsamlı danışmanlık hizmetleri sunuyoruz.',
        desc2: 'Danışmanlık metodolojimiz, derin yerel bilgiyi kantitatif titizlikle bütünleştirerek müşterilerin yalnızca verinin ne gösterdiğini değil, karmaşık düzenleyici ortamlarda stratejik olarak nasıl hareket edeceklerini anlamalarına yardımcı olur.',
        features: ['Sınır Ötesi Yatırım Danışmanlığı', 'İtalyan Finans Sistemi Navigasyonu', 'Mevzuat Uyumu Rehberliği', 'Stratejik Finansal Planlama'],
        visual: 'IT ↔ TR AĞI',
        metric: '€50M+ Analiz Edildi',
      },
    ],
    processTitle: 'ÇALIŞMA SÜRECİ',
    processSubtitle: 'Nasıl Birlikte Çalışıyoruz',
    process: [
      { num: '01', title: 'Keşif', desc: 'Yapılandırılmış danışmanlık seansları aracılığıyla iş bağlamınıza, veri ortamınıza ve stratejik hedeflerinize derinlemesine dalış.' },
      { num: '02', title: 'Mimari', desc: 'Gereksinimlerinize uygun teknik spesifikasyonlar, düzenleyici yollar ve finansal yapılar tasarımı.' },
      { num: '03', title: 'Yürütme', desc: 'Düzenli kontrol noktalarıyla yinelemeli uygulama, süreç boyunca iş hedefleriyle uyum sağlama.' },
      { num: '04', title: 'Teslimat', desc: 'Kapsamlı dokümantasyon, eğitim ve sürekli destek seçenekleriyle üretime hazır çözümler.' },
    ],
    techTitle: 'TEKNOLOJİ & UZMANLIK YIĞINI',
    techCategories: [
      { title: 'Finansal Araçlar', items: ['Bloomberg Terminal', 'Refinitiv Eikon', 'FactSet', 'S&P Capital IQ'] },
      { title: 'Analitik', items: ['Python (Pandas, NumPy)', 'R İstatistik Paketi', 'SQL / NoSQL', 'Power BI / Tableau'] },
      { title: 'Uyumluluk', items: ['GDPR Çerçevesi', 'AML/KYC Sistemleri', 'İtalyan Vergi Kodu', 'AB Direktifleri'] },
      { title: 'Entegrasyon', items: ['API Entegrasyonları', 'Veri Pipeline\'ları', 'Bulut Altyapısı', 'Otomatik Raporlama'] },
    ],
    ctaTitle: 'Sınır Ötesi Stratejinizi Dönüştürmeye Hazır mısınız?',
    ctaDesc: 'Veri odaklı finansal uzmanlığın genişlemenizi nasıl hızlandırabileceğini konuşalım.',
    ctaButton: 'Danışmanlık Başlat',
  },
  it: {
    badge: 'METODOLOGIA & SERVIZI',
    title: 'La Consulenza Finanziaria Incontra la Strategia Data-Driven',
    subtitle: 'Un approccio sistematico per fornire soluzioni finanziarie transfrontaliere che collegano Italia e Turchia attraverso analytics avanzate ed expertise normativa.',
    coreServices: 'AREE DI SERVIZIO PRINCIPALI',
    services: [
      {
        num: '01',
        title: 'Analytics Finanziaria & Strutturazione',
        arch: 'ANALISI QUANTITATIVA // OTTIMIZZAZIONE FISCALE // STRUTTURAZIONE DEL CAPITALE',
        desc1: 'Trasformiamo panorami finanziari complessi in strategie attuabili utilizzando framework analitici avanzati. Dall\'ottimizzazione fiscale transfrontaliera all\'analisi della struttura del capitale, ogni soluzione è progettata per l\'implementazione nel mondo reale.',
        desc2: 'Il nostro approccio combina la modellazione finanziaria tradizionale con l\'analisi dei dati moderna, garantendo che le strategie siano sia statisticamente robuste che praticamente applicabili all\'espansione delle PMI, alle decisioni di investimento e alle operazioni commerciali internazionali.',
        features: ['Modelli DCF & Valutazione Comparativa', 'Ottimizzazione Efficienza Fiscale', 'Analisi Capitale Circolante', 'Strutturazione Investimenti Transfrontalieri'],
        visual: 'VAN → TIR → WACC',
        metric: 'α: 0.05',
      },
      {
        num: '02',
        title: 'Conformità Normativa & Gestione Rischi',
        arch: 'FRAMEWORK NORMATIVO UE // QUANTIFICAZIONE RISCHI // AUTOMAZIONE COMPLIANCE',
        desc1: 'Navigare le normative italiane e UE richiede profonda expertise in GDPR, antiriciclaggio (AML) e compliance fiscale transfrontaliera. Utilizziamo sistemi di monitoraggio compliance automatizzati per garantire aderenza continua.',
        desc2: 'Il nostro framework di gestione rischi impiega simulazioni Monte Carlo e metodologie di stress testing per quantificare rischi operativi, di mercato e normativi—abilitando strategie di mitigazione proattive per il tuo ingresso nel mercato italiano.',
        features: ['Mappatura Normativa UE/Italiana', 'Sistemi Compliance AML/KYC', 'Framework Valutazione Rischi', 'Monitoraggio Compliance Automatizzato'],
        visual: 'RISK_MATRIX',
        metric: 'VaR 95%',
      },
      {
        num: '03',
        title: 'Market Intelligence & Strategia di Ingresso',
        arch: 'DATA PIPELINES // SEGMENTAZIONE MERCATO // ANALISI COMPETITIVA',
        desc1: 'Costruiamo sistemi di market intelligence completi che aggregano dati da molteplici fonti—report di settore, dati doganali, documenti finanziari—per fornire insights in tempo reale sulle dinamiche del mercato italiano.',
        desc2: 'Lo sviluppo della nostra strategia di ingresso utilizza cluster analysis e modellazione predittiva per identificare segmenti di mercato ottimali, strategie di pricing e canali di distribuzione su misura per il tuo settore aziendale.',
        features: ['Analisi Dimensione & Crescita Mercato', 'Benchmarking Competitivo', 'Modelli Segmentazione Clienti', 'Ottimizzazione Modalità di Ingresso'],
        visual: 'MARKET_DATA → INSIGHTS',
        metric: 'R² > 0.85',
      },
      {
        num: '04',
        title: 'Consulenza Finanziaria Transfrontaliera',
        arch: 'CORRIDOIO ITALIA-TURCHIA // STRUTTURE BILATERALI // PARTNERSHIP STRATEGICHE',
        desc1: 'Come Alvolo Consulting, siamo specializzati nel corridoio finanziario Italia-Turchia—fornendo servizi di consulenza completi per PMI e professionisti che navigano investimenti transfrontalieri, rappresentanza fiscale ed espansione di mercato.',
        desc2: 'La nostra metodologia di consulenza integra profonda conoscenza locale con rigore quantitativo, aiutando i clienti a capire non solo cosa mostrano i dati, ma come agire strategicamente all\'interno di ambienti normativi complessi.',
        features: ['Consulenza Investimenti Transfrontalieri', 'Navigazione Sistema Finanziario Italiano', 'Guida Conformità Normativa', 'Pianificazione Finanziaria Strategica'],
        visual: 'IT ↔ TR NETWORK',
        metric: '€50M+ Analizzati',
      },
    ],
    processTitle: 'PROCESSO DI ENGAGEMENT',
    processSubtitle: 'Come Lavoriamo Insieme',
    process: [
      { num: '01', title: 'Discovery', desc: 'Immersione profonda nel tuo contesto aziendale, panorama dati e obiettivi strategici attraverso sessioni di consulenza strutturate.' },
      { num: '02', title: 'Architettura', desc: 'Design di specifiche tecniche, percorsi normativi e strutture finanziarie allineate ai tuoi requisiti.' },
      { num: '03', title: 'Esecuzione', desc: 'Implementazione iterativa con checkpoint regolari, garantendo allineamento con gli obiettivi aziendali durante tutto il processo.' },
      { num: '04', title: 'Delivery', desc: 'Soluzioni production-ready con documentazione completa, formazione e opzioni di supporto continuo.' },
    ],
    techTitle: 'STACK TECNOLOGICO & DI EXPERTISE',
    techCategories: [
      { title: 'Strumenti Finanziari', items: ['Bloomberg Terminal', 'Refinitiv Eikon', 'FactSet', 'S&P Capital IQ'] },
      { title: 'Analytics', items: ['Python (Pandas, NumPy)', 'R Statistical Suite', 'SQL / NoSQL', 'Power BI / Tableau'] },
      { title: 'Compliance', items: ['Framework GDPR', 'Sistemi AML/KYC', 'Codice Fiscale Italiano', 'Direttive UE'] },
      { title: 'Integrazione', items: ['Integrazioni API', 'Data Pipelines', 'Infrastruttura Cloud', 'Reporting Automatizzato'] },
    ],
    ctaTitle: 'Pronto a Trasformare la Tua Strategia Transfrontaliera?',
    ctaDesc: 'Parliamo di come l\'expertise finanziaria data-driven può accelerare la tua espansione.',
    ctaButton: 'Avvia Consulenza',
  },
};

export default function MethodologyPageClient({ locale }: MethodologyPageClientProps) {
  const [mounted, setMounted] = useState(false);
  const t = content[locale];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="neo-pill mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.badge}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              {t.title.split(' ').slice(0, 3).join(' ')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent-cyan to-accent-orange bg-clip-text text-transparent">
              {t.title.split(' ').slice(3).join(' ')}
            </span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg leading-relaxed">{t.subtitle}</p>
        </motion.div>

        {/* Core Services Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-accent-cyan tracking-[0.3em] mb-4">{t.coreServices}</div>
        </motion.div>

        {/* Service Areas - Styled like personal portfolio */}
        <div className="space-y-20 mb-32">
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="overflow-hidden">
                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Left Column - Number and Title */}
                  <div className="lg:col-span-4 relative">
                    <div className="text-[8rem] font-serif font-bold text-accent-cyan/10 leading-none absolute -top-8 -left-4">
                      {service.num}
                    </div>
                    <div className="relative z-10 pt-16">
                      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{service.title}</h2>
                      <p className="text-[10px] font-mono text-accent-cyan/70 tracking-[0.15em] uppercase leading-relaxed">
                        {service.arch}
                      </p>
                      
                      {/* Animated Visual Element */}
                      <div className="mt-8 p-4 rounded-xl bg-void/50 border border-glass-border inline-block">
                        <div className="font-mono text-sm text-accent-cyan tracking-wider">{service.visual}</div>
                      </div>
                      
                      {/* Metric Badge */}
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-orange/30 bg-accent-orange/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse"></span>
                        <span className="text-xs font-mono text-accent-orange">{service.metric}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Descriptions and Features */}
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-text-muted leading-relaxed">{service.desc1}</p>
                    <p className="text-text-secondary leading-relaxed">{service.desc2}</p>
                    
                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-6 border-t border-glass-border">
                      {service.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className="flex items-center gap-3 text-sm group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan group-hover:scale-150 transition-transform"></span>
                          <span className="text-text-muted group-hover:text-text-primary transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Work Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-accent-cyan tracking-[0.3em] mb-4">{t.processTitle}</div>
            <h2 className="font-serif text-3xl md:text-4xl">{t.processSubtitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-panel rounded-2xl p-6 h-full transition-all hover:border-accent-cyan/30 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-[5rem] font-serif font-bold text-accent-cyan/5 group-hover:text-accent-cyan/10 transition-colors">
                    {step.num}
                  </div>
                  <div className="relative z-10">
                    <div className="text-2xl font-bold text-accent-cyan mb-2">{step.num}</div>
                    <h3 className="text-lg font-bold text-text-primary mb-3">{step.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="font-mono text-xs text-accent-orange tracking-[0.3em] mb-4">{t.techTitle}</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.techCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glass-panel rounded-2xl p-6 h-full">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-cyan mb-4">{category.title}</h4>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-text-muted flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-glass-highlight"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] opacity-90 mb-8 transition-all duration-300 hover:text-transparent hover:text-stroke-cyan cursor-default select-none">
            {locale === 'tr' ? 'ŞİMDİ' : locale === 'it' ? 'ORA' : 'NOW'}<br />
            {locale === 'tr' ? 'OPTİMİZE' : locale === 'it' ? 'OTTIMIZZA' : 'OPTIMIZE'}
          </div>
          
          <h3 className="font-serif text-2xl md:text-3xl mb-4">{t.ctaTitle}</h3>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">{t.ctaDesc}</p>
          <Link 
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-accent-cyan text-void font-mono font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.3)]"
          >
            {t.ctaButton}
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
