'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaIndustry, FaCogs, FaShippingFast, FaMoneyBillWave, FaUserTie, FaBalanceScale } from 'react-icons/fa';
import GlassCard from '@/app/components/ui/GlassCard';
import { type Locale } from '@/lib/translations';
import PageVideoBackground from '@/components/Media/PageVideoBackground';

interface TurkeyExpansionClientProps {
  locale: Locale;
}

const services = [
  {
    icon: FaIndustry,
    titleKey: 'manufacturing',
    descKey: 'manufacturingDesc',
  },
  {
    icon: FaCogs,
    titleKey: 'sourcing',
    descKey: 'sourcingDesc',
  },
  {
    icon: FaShippingFast,
    titleKey: 'logistics',
    descKey: 'logisticsDesc',
  },
  {
    icon: FaMoneyBillWave,
    titleKey: 'costOptimization',
    descKey: 'costOptimizationDesc',
  },
  {
    icon: FaUserTie,
    titleKey: 'localTeam',
    descKey: 'localTeamDesc',
  },
  {
    icon: FaBalanceScale,
    titleKey: 'legal',
    descKey: 'legalDesc',
  },
];

const content = {
  en: {
    badge: 'Turkey Expansion',
    title: 'Scale Your Operations in Turkey',
    subtitle: 'Strategic manufacturing partnerships and cost optimization for Italian firms looking to leverage Turkey\'s industrial capabilities.',
    manufacturing: 'Manufacturing Partnerships',
    manufacturingDesc: 'Connect with vetted Turkish manufacturers for quality production at competitive costs.',
    sourcing: 'Strategic Sourcing',
    sourcingDesc: 'Access Turkey\'s diverse supplier ecosystem for raw materials and components.',
    logistics: 'Logistics & Supply Chain',
    logisticsDesc: 'Optimize your supply chain with strategic positioning between Europe and Asia.',
    costOptimization: 'Cost Optimization',
    costOptimizationDesc: 'Reduce operational costs while maintaining quality standards through smart restructuring.',
    localTeam: 'Local Team Setup',
    localTeamDesc: 'Establish your Turkish presence with our help in hiring and team management.',
    legal: 'Legal & Compliance',
    legalDesc: 'Navigate Turkish business regulations with expert legal and compliance support.',
    ctaTitle: 'Ready to Scale in Turkey?',
    ctaDesc: 'Let us help you unlock the potential of Turkish manufacturing and reduce your operational costs.',
    ctaButton: 'Start Your Turkish Expansion',
    backLink: 'Back to Services',
  },
  tr: {
    badge: 'Türkiye Genişlemesi',
    title: 'Türkiye\'de Operasyonlarınızı Ölçeklendirin',
    subtitle: 'Türkiye\'nin endüstriyel kapasitelerinden yararlanmak isteyen İtalyan firmalar için stratejik üretim ortaklıkları ve maliyet optimizasyonu.',
    manufacturing: 'Üretim Ortaklıkları',
    manufacturingDesc: 'Rekabetçi maliyetlerle kaliteli üretim için doğrulanmış Türk üreticilerle bağlantı kurun.',
    sourcing: 'Stratejik Tedarik',
    sourcingDesc: 'Hammadde ve bileşenler için Türkiye\'nin çeşitli tedarikçi ekosistemine erişin.',
    logistics: 'Lojistik ve Tedarik Zinciri',
    logisticsDesc: 'Avrupa ve Asya arasındaki stratejik konumlandırma ile tedarik zincirinizi optimize edin.',
    costOptimization: 'Maliyet Optimizasyonu',
    costOptimizationDesc: 'Akıllı yeniden yapılandırma yoluyla kalite standartlarını korurken operasyonel maliyetleri azaltın.',
    localTeam: 'Yerel Ekip Kurulumu',
    localTeamDesc: 'İşe alma ve ekip yönetiminde yardımımızla Türkiye\'deki varlığınızı oluşturun.',
    legal: 'Hukuki ve Uyumluluk',
    legalDesc: 'Uzman hukuki ve uyumluluk desteğiyle Türk iş düzenlemelerinde yön bulun.',
    ctaTitle: 'Türkiye\'de Ölçeklendirmeye Hazır mısınız?',
    ctaDesc: 'Türk üretiminin potansiyelini açığa çıkarmanıza ve operasyonel maliyetlerinizi azaltmanıza yardımcı olalım.',
    ctaButton: 'Türkiye Genişlemenize Başlayın',
    backLink: 'Hizmetlere Dön',
  },
  it: {
    badge: 'Espansione in Turchia',
    title: 'Scala le Tue Operazioni in Turchia',
    subtitle: 'Partnership manifatturiere strategiche e ottimizzazione dei costi per le aziende italiane che vogliono sfruttare le capacità industriali della Turchia.',
    manufacturing: 'Partnership Manifatturiere',
    manufacturingDesc: 'Connettiti con produttori turchi verificati per una produzione di qualità a costi competitivi.',
    sourcing: 'Sourcing Strategico',
    sourcingDesc: 'Accedi all\'ecosistema diversificato di fornitori turchi per materie prime e componenti.',
    logistics: 'Logistica e Supply Chain',
    logisticsDesc: 'Ottimizza la tua supply chain con un posizionamento strategico tra Europa e Asia.',
    costOptimization: 'Ottimizzazione dei Costi',
    costOptimizationDesc: 'Riduci i costi operativi mantenendo gli standard di qualità attraverso una ristrutturazione intelligente.',
    localTeam: 'Setup Team Locale',
    localTeamDesc: 'Stabilisci la tua presenza in Turchia con il nostro aiuto nell\'assunzione e gestione del team.',
    legal: 'Legale e Compliance',
    legalDesc: 'Naviga le normative aziendali turche con supporto esperto legale e di compliance.',
    ctaTitle: 'Pronto per Scalare in Turchia?',
    ctaDesc: 'Lasciaci aiutarti a sbloccare il potenziale della manifattura turca e ridurre i tuoi costi operativi.',
    ctaButton: 'Inizia la Tua Espansione in Turchia',
    backLink: 'Torna ai Servizi',
  },
};

const TurkeyExpansionClient: React.FC<TurkeyExpansionClientProps> = ({ locale }) => {
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
    <main className="bg-transparent text-electric-platinum min-h-screen pt-32 pb-24 px-6">
      <PageVideoBackground src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/257c7359efd4b4aaebcc03aa8fc78a36/manifest/video.m3u8" />
      <div className="container mx-auto max-w-6xl">
        {/* Back Link */}
        <Link
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-electric-platinum/60 hover:text-holographic-cyan transition-colors mb-8 font-mono text-sm"
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
                <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
                <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.badge}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl mb-6">{t.title}</h1>
              <p className="text-xl text-electric-platinum/60 max-w-3xl">{t.subtitle}</p>
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
                    <service.icon className="w-10 h-10 text-accent-orange mb-4" />
                    <h3 className="text-xl font-bold text-electric-platinum mb-2">
                      {t[service.titleKey as keyof typeof t]}
                    </h3>
                    <p className="text-electric-platinum/60 text-sm leading-relaxed">
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
                <p className="text-electric-platinum/60 mb-8 max-w-2xl mx-auto">{t.ctaDesc}</p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-orange text-void font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(245,134,67,0.3)]"
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

export default TurkeyExpansionClient;

