'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBuilding, FaFileContract, FaHandshake, FaUsers, FaChartLine, FaGlobe } from 'react-icons/fa';
import GlassCard from '@/app/components/ui/GlassCard';
import { type Locale } from '@/lib/translations';

interface ItalyExpansionClientProps {
  locale: Locale;
}

const services = [
  {
    icon: FaFileContract,
    titleKey: 'piva',
    descKey: 'pivaDesc',
  },
  {
    icon: FaBuilding,
    titleKey: 'fiscalRep',
    descKey: 'fiscalRepDesc',
  },
  {
    icon: FaHandshake,
    titleKey: 'network',
    descKey: 'networkDesc',
  },
  {
    icon: FaUsers,
    titleKey: 'localPartners',
    descKey: 'localPartnersDesc',
  },
  {
    icon: FaChartLine,
    titleKey: 'marketEntry',
    descKey: 'marketEntryDesc',
  },
  {
    icon: FaGlobe,
    titleKey: 'compliance',
    descKey: 'complianceDesc',
  },
];

const content = {
  en: {
    badge: 'Italy Expansion',
    title: 'Expand Your Business to Italy',
    subtitle: 'Complete support for Turkish SMEs entering the Italian market. From P.IVA registration to establishing your Milan network.',
    piva: 'P.IVA Registration',
    pivaDesc: 'Complete Italian VAT registration and setup for your business operations in Italy.',
    fiscalRep: 'Fiscal Representation',
    fiscalRepDesc: 'Professional fiscal representation services to ensure compliance with Italian tax regulations.',
    network: 'Milan Network',
    networkDesc: 'Access our established network of business contacts, partners, and service providers in Milan.',
    localPartners: 'Local Partnerships',
    localPartnersDesc: 'Connect with vetted Italian partners for distribution, manufacturing, and business development.',
    marketEntry: 'Market Entry Strategy',
    marketEntryDesc: 'Data-driven market analysis and entry strategy tailored to your business sector.',
    compliance: 'Regulatory Compliance',
    complianceDesc: 'Navigate Italian and EU regulations with expert guidance on compliance requirements.',
    ctaTitle: 'Ready to Enter the Italian Market?',
    ctaDesc: 'Schedule a consultation to discuss your expansion plans and discover how we can help.',
    ctaButton: 'Start Your Italian Journey',
    backLink: 'Back to Services',
  },
  tr: {
    badge: 'İtalya Genişlemesi',
    title: 'İşinizi İtalya\'ya Genişletin',
    subtitle: 'İtalya pazarına giren Türk KOBİ\'leri için eksiksiz destek. P.IVA kaydından Milano ağınızı kurmaya kadar.',
    piva: 'P.IVA Kaydı',
    pivaDesc: 'İtalya\'daki iş operasyonlarınız için eksiksiz İtalyan KDV kaydı ve kurulumu.',
    fiscalRep: 'Mali Temsilcilik',
    fiscalRepDesc: 'İtalyan vergi düzenlemelerine uyumu sağlamak için profesyonel mali temsilcilik hizmetleri.',
    network: 'Milano Ağı',
    networkDesc: 'Milano\'daki kurulu iş bağlantıları, ortaklar ve hizmet sağlayıcı ağımıza erişin.',
    localPartners: 'Yerel Ortaklıklar',
    localPartnersDesc: 'Dağıtım, üretim ve iş geliştirme için doğrulanmış İtalyan ortaklarla bağlantı kurun.',
    marketEntry: 'Pazar Giriş Stratejisi',
    marketEntryDesc: 'İş sektörünüze özel veri odaklı pazar analizi ve giriş stratejisi.',
    compliance: 'Mevzuat Uyumu',
    complianceDesc: 'Uyumluluk gereksinimleri konusunda uzman rehberliğiyle İtalyan ve AB düzenlemelerinde yön bulun.',
    ctaTitle: 'İtalya Pazarına Girmeye Hazır mısınız?',
    ctaDesc: 'Genişleme planlarınızı görüşmek ve size nasıl yardımcı olabileceğimizi keşfetmek için bir danışma planlayın.',
    ctaButton: 'İtalya Yolculuğunuza Başlayın',
    backLink: 'Hizmetlere Dön',
  },
  it: {
    badge: 'Espansione in Italia',
    title: 'Espandi la Tua Attività in Italia',
    subtitle: 'Supporto completo per le PMI turche che entrano nel mercato italiano. Dalla registrazione P.IVA alla creazione della tua rete milanese.',
    piva: 'Registrazione P.IVA',
    pivaDesc: 'Registrazione IVA italiana completa e configurazione per le tue operazioni commerciali in Italia.',
    fiscalRep: 'Rappresentanza Fiscale',
    fiscalRepDesc: 'Servizi professionali di rappresentanza fiscale per garantire la conformità alle normative fiscali italiane.',
    network: 'Rete Milanese',
    networkDesc: 'Accedi alla nostra rete consolidata di contatti commerciali, partner e fornitori di servizi a Milano.',
    localPartners: 'Partnership Locali',
    localPartnersDesc: 'Connettiti con partner italiani verificati per distribuzione, produzione e sviluppo aziendale.',
    marketEntry: 'Strategia di Ingresso nel Mercato',
    marketEntryDesc: 'Analisi di mercato basata sui dati e strategia di ingresso su misura per il tuo settore aziendale.',
    compliance: 'Conformità Normativa',
    complianceDesc: 'Naviga le normative italiane e UE con la guida esperta sui requisiti di conformità.',
    ctaTitle: 'Pronto per Entrare nel Mercato Italiano?',
    ctaDesc: 'Pianifica una consulenza per discutere i tuoi piani di espansione e scoprire come possiamo aiutarti.',
    ctaButton: 'Inizia il Tuo Viaggio in Italia',
    backLink: 'Torna ai Servizi',
  },
};

const ItalyExpansionClient: React.FC<ItalyExpansionClientProps> = ({ locale }) => {
  const [mounted, setMounted] = useState(false);
  const t = content[locale];

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Back Link */}
        <Link 
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors mb-8 font-mono text-sm"
        >
          <FaArrowRight className="w-3 h-3 rotate-180" />
          {t.backLink}
        </Link>

        {/* Header */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="neo-pill mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
                <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.badge}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl mb-6">{t.title}</h1>
              <p className="text-xl text-text-muted max-w-3xl">{t.subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <AnimatePresence key={index}>
              {mounted && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <service.icon className="w-10 h-10 text-accent-cyan mb-4" />
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      {t[service.titleKey as keyof typeof t]}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {t[service.descKey as keyof typeof t]}
                    </p>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* CTA Section */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="text-center py-12">
                <h2 className="font-serif text-3xl md:text-4xl mb-4">{t.ctaTitle}</h2>
                <p className="text-text-muted mb-8 max-w-2xl mx-auto">{t.ctaDesc}</p>
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-void font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                >
                  {t.ctaButton}
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default ItalyExpansionClient;

