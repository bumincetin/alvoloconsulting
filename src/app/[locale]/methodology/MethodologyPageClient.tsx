'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import ScrambleText from '@/components/UI/ScrambleText';
import { type Locale } from '@/lib/translations';

interface MethodologyPageClientProps {
  locale: Locale;
}

// Animated Neural Network Component
const NeuralNetworkAnimation = () => {
  return (
    <div className="relative w-full h-32 my-8">
      <svg viewBox="0 0 300 100" className="w-full h-full">
        {/* Input Layer */}
        <g className="input-layer">
          {[20, 40, 60, 80].map((y, i) => (
            <motion.circle
              key={`input-${i}`}
              cx="30"
              cy={y}
              r="8"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
          <motion.text
            x="30"
            y="95"
            textAnchor="middle"
            className="fill-accent-cyan text-[8px] font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 }}
          >
            INPUT
          </motion.text>
        </g>

        {/* Hidden Layers */}
        {[100, 150, 200].map((cx, layerIndex) => (
          <g key={`layer-${layerIndex}`}>
            {[25, 50, 75].map((cy, nodeIndex) => (
              <motion.circle
                key={`hidden-${layerIndex}-${nodeIndex}`}
                cx={cx}
                cy={cy}
                r="6"
                fill="none"
                stroke="#7000ff"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 0.3 + layerIndex * 0.15 + nodeIndex * 0.05, duration: 0.4 }}
              />
            ))}
          </g>
        ))}

        {/* Output Layer */}
        <motion.circle
          cx="270"
          cy="50"
          r="10"
          fill="none"
          stroke="#f58643"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.text
          x="270"
          y="95"
          textAnchor="middle"
          className="fill-accent-orange text-[8px] font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          PREDICTION
        </motion.text>

        {/* Animated Connection Lines */}
        {[20, 40, 60, 80].map((y1, i) =>
          [25, 50, 75].map((y2, j) => (
            <motion.line
              key={`conn-input-${i}-${j}`}
              x1="38"
              y1={y1}
              x2="94"
              y2={y2}
              stroke="#00f0ff"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ delay: 0.5 + i * 0.05 + j * 0.05, duration: 0.3 }}
            />
          ))
        )}
      </svg>
    </div>
  );
};

// Animated Risk Matrix Component
const RiskMatrixAnimation = () => {
  const cells = [
    { x: 0, y: 0, risk: 'low' },
    { x: 1, y: 0, risk: 'low' },
    { x: 2, y: 0, risk: 'medium' },
    { x: 0, y: 1, risk: 'low' },
    { x: 1, y: 1, risk: 'medium' },
    { x: 2, y: 1, risk: 'high' },
    { x: 0, y: 2, risk: 'medium' },
    { x: 1, y: 2, risk: 'high' },
    { x: 2, y: 2, risk: 'critical' },
  ];

  const getColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#00f0ff33';
      case 'medium': return '#f5864366';
      case 'high': return '#f5864399';
      case 'critical': return '#ff4444cc';
      default: return '#ffffff11';
    }
  };

  return (
    <div className="relative w-full h-32 my-8">
      <svg viewBox="0 0 120 120" className="w-full h-full max-w-[120px] mx-auto">
        {cells.map((cell, i) => (
          <motion.rect
            key={i}
            x={cell.x * 35 + 5}
            y={cell.y * 35 + 5}
            width="30"
            height="30"
            rx="4"
            fill={getColor(cell.risk)}
            stroke="#ffffff22"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
          />
        ))}
        {/* Animated indicator */}
        <motion.circle
          cx="90"
          cy="90"
          r="8"
          fill="#ff4444"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        />
        <motion.text
          x="60"
          y="118"
          textAnchor="middle"
          className="fill-text-muted text-[7px] font-mono uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        >
          Impact →
        </motion.text>
      </svg>
    </div>
  );
};

// Animated Data Pipeline Component
const DataPipelineAnimation = () => {
  return (
    <div className="relative w-full h-24 my-8 overflow-hidden">
      <div className="flex items-center justify-center gap-2">
        {/* Data blocks flowing */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-8 h-8 rounded border border-accent-cyan/50 bg-accent-cyan/10 flex items-center justify-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1, 1, 0] }}
            transition={{
              delay: i * 0.3,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <span className="text-accent-cyan text-xs font-mono">◆</span>
          </motion.div>
        ))}

        {/* Arrow */}
        <motion.div
          className="text-accent-cyan mx-2"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.div>

        {/* Output */}
        <motion.div
          className="w-12 h-12 rounded-xl border-2 border-accent-orange/50 bg-accent-orange/10 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-accent-orange text-lg font-mono">✦</span>
        </motion.div>
      </div>
      <motion.div
        className="text-center mt-2 text-xs font-mono text-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
      >
        RAW → INSIGHTS
      </motion.div>
    </div>
  );
};

// Animated Cross-Border Network Component
const CrossBorderNetworkAnimation = () => {
  return (
    <div className="relative w-full h-32 my-8">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Italy Node */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <circle cx="40" cy="50" r="25" fill="none" stroke="#00f0ff" strokeWidth="2" />
          <text x="40" y="54" textAnchor="middle" className="fill-accent-cyan text-[12px] font-bold">IT</text>
        </motion.g>

        {/* Turkey Node */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <circle cx="160" cy="50" r="25" fill="none" stroke="#f58643" strokeWidth="2" />
          <text x="160" y="54" textAnchor="middle" className="fill-accent-orange text-[12px] font-bold">TR</text>
        </motion.g>

        {/* Animated Connection */}
        <motion.path
          d="M 70 50 Q 100 20 130 50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M 70 50 Q 100 80 130 50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Animated data packets */}
        <motion.circle
          cx="40"
          cy="50"
          r="4"
          fill="#00f0ff"
          animate={{
            cx: [40, 100, 160],
            cy: [50, 20, 50],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.circle
          cx="160"
          cy="50"
          r="4"
          fill="#f58643"
          animate={{
            cx: [160, 100, 40],
            cy: [50, 80, 50],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#f58643" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

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
        visual: 'neural',
        metric: 'α: 0.05',
      },
      {
        num: '02',
        title: 'Regulatory Compliance & Risk Management',
        arch: 'EU REGULATORY FRAMEWORK // RISK QUANTIFICATION // COMPLIANCE AUTOMATION',
        desc1: 'Navigating Italian and EU regulations requires deep expertise in GDPR, anti-money laundering (AML), and cross-border fiscal compliance. We leverage automated compliance monitoring systems to ensure continuous adherence.',
        desc2: 'Our risk management framework employs Monte Carlo simulations and stress testing methodologies to quantify operational, market, and regulatory risks—enabling proactive mitigation strategies for your Italian market entry.',
        features: ['EU/Italian Regulatory Mapping', 'AML/KYC Compliance Systems', 'Risk Assessment Frameworks', 'Automated Compliance Monitoring'],
        visual: 'risk',
        metric: 'VaR 95%',
      },
      {
        num: '03',
        title: 'Market Intelligence & Entry Strategy',
        arch: 'DATA PIPELINES // MARKET SEGMENTATION // COMPETITIVE ANALYSIS',
        desc1: 'We build comprehensive market intelligence systems that aggregate data from multiple sources—industry reports, customs data, financial filings—to provide real-time insights into Italian market dynamics.',
        desc2: 'Our entry strategy development uses cluster analysis and predictive modeling to identify optimal market segments, pricing strategies, and distribution channels tailored to your business sector.',
        features: ['Market Size & Growth Analysis', 'Competitor Benchmarking', 'Customer Segmentation Models', 'Entry Mode Optimization'],
        visual: 'pipeline',
        metric: 'R² > 0.85',
      },
      {
        num: '04',
        title: 'Cross-Border Financial Consulting',
        arch: 'ITALY-TURKEY CORRIDOR // BILATERAL STRUCTURES // STRATEGIC PARTNERSHIPS',
        desc1: 'As Alvolo Consulting, we specialize in the Italy-Turkey financial corridor—providing comprehensive advisory services for SMEs and professionals navigating cross-border investments, fiscal representation, and market expansion.',
        desc2: 'Our consulting methodology integrates deep local knowledge with quantitative rigor, helping clients understand not just what the data shows, but how to strategically act on it within complex regulatory environments.',
        features: ['Cross-Border Investment Advisory', 'Italian Financial System Navigation', 'Regulatory Compliance Guidance', 'Strategic Financial Planning'],
        visual: 'network',
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
    subtitle: 'İleri düzey analitik ve düzenleyici uzmanlık aracılığıyla İtalya ve Türkiye\'yi birleştiren sınır ötesi finansal çözümler sunmaya yönelik sistematik bir yaklaşım.',
    coreServices: 'TEMEL HİZMET ALANLARI',
    services: [
      {
        num: '01',
        title: 'Finansal Analitik & Yapılandırma',
        arch: 'KANTİTATİF ANALİZ // VERGİ OPTİMİZASYONU // SERMAYE YAPILANDIRMA',
        desc1: 'Gelişmiş analitik çerçeveler kullanarak karmaşık finansal ortamları eyleme dönüştürülebilir stratejilere dönüştürüyoruz. Sınır ötesi vergi optimizasyonundan sermaye yapısı analizine kadar her çözüm gerçek dünya uygulaması için tasarlanmıştır.',
        desc2: 'Yaklaşımımız geleneksel finansal modellemeyi modern veri analitiğiyle birleştirerek stratejilerin hem istatistiksel olarak güçlü hem de KOBİ genişlemesi, yatırım kararları ve uluslararası ticaret operasyonlarına pratik olarak uygulanabilir olmasını sağlar.',
        features: ['DCF & Karşılaştırmalı Değerleme Modelleri', 'Vergi Verimliliği Optimizasyonu', 'İşletme Sermayesi Analizi', 'Sınır Ötesi Yatırım Yapılandırma'],
        visual: 'neural',
        metric: 'α: 0.05',
      },
      {
        num: '02',
        title: 'Mevzuat Uyumu & Risk Yönetimi',
        arch: 'AB DÜZENLEYICI ÇERÇEVESİ // RİSK NİCELEME // UYUMLULUK OTOMASYONU',
        desc1: 'İtalyan ve AB düzenlemelerinde gezinmek GDPR, kara para aklamayı önleme (AML) ve sınır ötesi mali uyumluluk konularında derin uzmanlık gerektirir. Sürekli uyumu sağlamak için otomatik uyumluluk izleme sistemleri kullanıyoruz.',
        desc2: 'Risk yönetimi çerçevemiz, operasyonel, piyasa ve düzenleyici riskleri nicelendirmek için Monte Carlo simülasyonları ve stres testi metodolojileri kullanır—İtalya pazar girişiniz için proaktif azaltma stratejileri sağlar.',
        features: ['AB/İtalyan Mevzuat Haritalama', 'AML/KYC Uyumluluk Sistemleri', 'Risk Değerlendirme Çerçeveleri', 'Otomatik Uyumluluk İzleme'],
        visual: 'risk',
        metric: 'VaR %95',
      },
      {
        num: '03',
        title: 'Pazar İstihbaratı & Giriş Stratejisi',
        arch: 'VERİ PIPELINE\'LARI // PAZAR SEGMENTASYONU // REKABETÇİ ANALİZ',
        desc1: 'Sektör raporları, gümrük verileri, finansal dosyalamalar gibi birden fazla kaynaktan veri toplayan kapsamlı pazar istihbarat sistemleri oluşturarak İtalyan pazar dinamikleri hakkında gerçek zamanlı içgörüler sunuyoruz.',
        desc2: 'Giriş stratejisi geliştirmemiz, işletme sektörünüze özel optimal pazar segmentlerini, fiyatlandırma stratejilerini ve dağıtım kanallarını belirlemek için kümeleme analizi ve tahminsel modelleme kullanır.',
        features: ['Pazar Büyüklüğü & Büyüme Analizi', 'Rakip Karşılaştırması', 'Müşteri Segmentasyon Modelleri', 'Giriş Modu Optimizasyonu'],
        visual: 'pipeline',
        metric: 'R² > 0.85',
      },
      {
        num: '04',
        title: 'Sınır Ötesi Finansal Danışmanlık',
        arch: 'İTALYA-TÜRKİYE KORİDORU // İKİLİ YAPILAR // STRATEJİK ORTAKLIKLAR',
        desc1: 'Alvolo Consulting olarak İtalya-Türkiye finansal koridorunda uzmanlaşıyoruz—sınır ötesi yatırımlar, mali temsilcilik ve pazar genişlemesi konularında rehberlik eden KOBİ\'ler ve profesyoneller için kapsamlı danışmanlık hizmetleri sunuyoruz.',
        desc2: 'Danışmanlık metodolojimiz, derin yerel bilgiyi kantitatif titizlikle bütünleştirerek müşterilerin yalnızca verinin ne gösterdiğini değil, karmaşık düzenleyici ortamlarda stratejik olarak nasıl hareket edeceklerini anlamalarına yardımcı olur.',
        features: ['Sınır Ötesi Yatırım Danışmanlığı', 'İtalyan Finans Sistemi Navigasyonu', 'Mevzuat Uyumu Rehberliği', 'Stratejik Finansal Planlama'],
        visual: 'network',
        metric: '€50M+ Analiz Edildi',
      },
    ],
    processTitle: 'ÇALIŞMA SÜRECİ',
    processSubtitle: 'Nasıl Birlikte Çalışıyoruz',
    process: [
      { num: '01', title: 'Keşif', desc: 'Yapılandırılmış danışmanlık seansları aracılığıyla iş bağlamınıza, veri ortamınıza ve stratejik hedeflerinize derinlemesine analiz.' },
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
        visual: 'neural',
        metric: 'α: 0.05',
      },
      {
        num: '02',
        title: 'Conformità Normativa & Gestione Rischi',
        arch: 'FRAMEWORK NORMATIVO UE // QUANTIFICAZIONE RISCHI // AUTOMAZIONE COMPLIANCE',
        desc1: 'Navigare le normative italiane e UE richiede profonda expertise in GDPR, antiriciclaggio (AML) e compliance fiscale transfrontaliera. Utilizziamo sistemi di monitoraggio compliance automatizzati per garantire aderenza continua.',
        desc2: 'Il nostro framework di gestione rischi impiega simulazioni Monte Carlo e metodologie di stress testing per quantificare rischi operativi, di mercato e normativi—abilitando strategie di mitigazione proattive per il tuo ingresso nel mercato italiano.',
        features: ['Mappatura Normativa UE/Italiana', 'Sistemi Compliance AML/KYC', 'Framework Valutazione Rischi', 'Monitoraggio Compliance Automatizzato'],
        visual: 'risk',
        metric: 'VaR 95%',
      },
      {
        num: '03',
        title: 'Market Intelligence & Strategia di Ingresso',
        arch: 'DATA PIPELINES // SEGMENTAZIONE MERCATO // ANALISI COMPETITIVA',
        desc1: 'Costruiamo sistemi di market intelligence completi che aggregano dati da molteplici fonti—report di settore, dati doganali, documenti finanziari—per fornire insights in tempo reale sulle dinamiche del mercato italiano.',
        desc2: 'Lo sviluppo della nostra strategia di ingresso utilizza cluster analysis e modellazione predittiva per identificare segmenti di mercato ottimali, strategie di pricing e canali di distribuzione su misura per il tuo settore aziendale.',
        features: ['Analisi Dimensione & Crescita Mercato', 'Benchmarking Competitivo', 'Modelli Segmentazione Clienti', 'Ottimizzazione Modalità di Ingresso'],
        visual: 'pipeline',
        metric: 'R² > 0.85',
      },
      {
        num: '04',
        title: 'Consulenza Finanziaria Transfrontaliera',
        arch: 'CORRIDOIO ITALIA-TURCHIA // STRUTTURE BILATERALI // PARTNERSHIP STRATEGICHE',
        desc1: 'Come Alvolo Consulting, siamo specializzati nel corridoio finanziario Italia-Turchia—fornendo servizi di consulenza completi per PMI e professionisti che navigano investimenti transfrontalieri, rappresentanza fiscale ed espansione di mercato.',
        desc2: 'La nostra metodologia di consulenza integra profonda conoscenza locale con rigore quantitativo, aiutando i clienti a capire non solo cosa mostrano i dati, ma come agire strategicamente all\'interno di ambienti normativi complessi.',
        features: ['Consulenza Investimenti Transfrontalieri', 'Navigazione Sistema Finanziario Italiano', 'Guida Conformità Normativa', 'Pianificazione Finanziaria Strategica'],
        visual: 'network',
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

// Visual component selector
const VisualAnimation = ({ type }: { type: string }) => {
  switch (type) {
    case 'neural':
      return <NeuralNetworkAnimation />;
    case 'risk':
      return <RiskMatrixAnimation />;
    case 'pipeline':
      return <DataPipelineAnimation />;
    case 'network':
      return <CrossBorderNetworkAnimation />;
    default:
      return null;
  }
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
    <main className="relative bg-void-black text-electric-platinum min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
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
          <h1 className="font-serif text-4xl md:text-6xl mb-6 text-electric-platinum">
            <ScrambleText text={t.title} />
          </h1>
          <p className="text-electric-platinum/60 max-w-3xl mx-auto text-lg leading-relaxed uppercase tracking-[0.1em] text-sm">{t.subtitle}</p>
        </motion.div>

        {/* Core Services Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-accent-cyan tracking-[0.3em] mb-4 uppercase">{t.coreServices}</div>
        </motion.div>

        {/* Service Areas with Animated Figures - Bento Grid Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-32"
        >
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-full rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-holographic-cyan/30 hover:shadow-[0_25px_80px_rgba(0,0,0,0.6)] group">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-tungsten-grey/40 shadow-[0_0_25px_rgba(229,228,226,0.15)]" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-[4rem] font-serif font-bold text-electric-platinum/10 leading-none">
                      {service.num}
                    </div>
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-holographic-cyan/30 bg-deep-indigo/40"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="w-2 h-2 rounded-full bg-holographic-cyan animate-pulse"></span>
                      <span className="text-sm font-mono text-holographic-cyan font-bold">{service.metric}</span>
                    </motion.div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-electric-platinum mb-3">
                    <ScrambleText text={service.title} />
                  </h2>
                  <p className="text-[10px] font-mono text-electric-platinum/50 tracking-[0.15em] uppercase leading-relaxed mb-6">
                    {service.arch}
                  </p>

                  {/* Animated Visual Element */}
                  <div className="mb-6">
                    <VisualAnimation type={service.visual} />
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-electric-platinum/70 leading-relaxed text-sm">{service.desc1}</p>
                    <p className="text-electric-platinum/60 leading-relaxed text-sm">{service.desc2}</p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-6 border-t border-tungsten-grey/60">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 text-xs group"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan group-hover:scale-150 transition-transform"></span>
                        <span className="text-electric-platinum/60 group-hover:text-electric-platinum transition-colors uppercase tracking-[0.05em]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Work Process Section - HUD Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <div className="font-mono text-xs text-accent-cyan tracking-[0.3em] mb-4 uppercase">{t.processTitle}</div>
            <h2 className="font-serif text-3xl md:text-4xl text-electric-platinum">
              <ScrambleText text={t.processSubtitle} />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="relative h-full rounded-2xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-holographic-cyan/30 hover:shadow-[0_25px_80px_rgba(229,228,226,0.2)] relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                  <div className="absolute -top-4 -right-4 text-[5rem] font-serif font-bold text-electric-platinum/5 group-hover:text-electric-platinum/10 transition-colors">
                    {step.num}
                  </div>
                  <div className="relative z-10">
                    <div className="text-2xl font-bold text-accent-cyan mb-2 font-mono">{step.num}</div>
                    <h3 className="text-lg font-bold text-electric-platinum mb-3 uppercase tracking-[0.1em]">
                      <ScrambleText text={step.title} />
                    </h3>
                    <p className="text-sm text-electric-platinum/60 leading-relaxed uppercase tracking-[0.05em] text-xs">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack Section - Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="font-mono text-xs text-electric-platinum/60 tracking-[0.3em] mb-4 uppercase">
              <ScrambleText text={t.techTitle} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.techCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-full rounded-2xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-deep-indigo/40 hover:shadow-[0_25px_80px_rgba(46,46,94,0.25)]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                  <div className="relative z-10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-electric-platinum/70 mb-4">{category.title}</h4>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-electric-platinum/60 flex items-center gap-2 uppercase tracking-[0.05em] text-xs">
                          <span className="w-1 h-1 rounded-full bg-holographic-cyan"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
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
          <div className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] opacity-90 mb-8 transition-all duration-300 hover:text-transparent hover:text-stroke-cyan cursor-default select-none text-electric-platinum">
            {locale === 'tr' ? 'ŞİMDİ' : locale === 'it' ? 'ORA' : 'NOW'}<br />
            {locale === 'tr' ? 'OPTİMİZE' : locale === 'it' ? 'OTTIMIZZA' : 'OPTIMIZE'}
          </div>

          <h3 className="font-serif text-2xl md:text-3xl mb-4 text-electric-platinum">
            <ScrambleText text={t.ctaTitle} />
          </h3>
          <p className="text-electric-platinum/60 mb-8 max-w-lg mx-auto uppercase tracking-[0.1em] text-sm">{t.ctaDesc}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-tungsten-grey/80 bg-obsidian-plate/70 text-electric-platinum font-mono font-bold uppercase tracking-widest text-sm hover:border-holographic-cyan/60 hover:text-electric-platinum hover:bg-deep-indigo/40 transition-all shadow-[0_0_30px_rgba(229,228,226,0.15)] hover:shadow-[0_0_40px_rgba(229,228,226,0.3)]"
          >
            {t.ctaButton}
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
