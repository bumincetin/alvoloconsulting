'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBuilding, FaChartLine, FaUniversity, FaPassport, FaHome, FaHandshake, FaFileAlt, FaGraduationCap, FaShieldAlt, FaBalanceScale } from 'react-icons/fa';
import GlassCard from '../../components/ui/GlassCard';
import { getTranslation, type Locale } from '@/lib/translations';

interface ServicesPageClientProps {
  locale: Locale;
}

const integrationIcons = [FaGraduationCap, FaPassport, FaHome, FaHandshake, FaUniversity, FaPassport, FaFileAlt];
const financialIcons = [FaBuilding, FaChartLine, FaBalanceScale, FaUniversity, FaHandshake, FaShieldAlt, FaFileAlt];

export default function ServicesPageClient({ locale }: ServicesPageClientProps) {
  const t = getTranslation(locale);

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="neo-pill mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
            <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.services.label}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">{t.services.title}</h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">{t.services.subtitle}</p>
        </motion.div>

        {/* Integration Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl">{t.services.integrationTitle}</h2>
            <div className="neo-pill">
              <span className="w-2 h-2 rounded-full bg-accent-purple"></span>
              <span className="text-[10px] tracking-[0.14em] uppercase">Integration</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.integrationServices.map((service, index) => {
              const Icon = integrationIcons[index % integrationIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <GlassCard className="h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-accent-purple" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Financial Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl">{t.services.financialTitle}</h2>
            <div className="neo-pill">
              <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
              <span className="text-[10px] tracking-[0.14em] uppercase">Finance</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.financialServices.map((service, index) => {
              const Icon = financialIcons[index % financialIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <GlassCard className="h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent-orange/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-accent-orange" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <GlassCard className="inline-block">
            <div className="flex flex-col md:flex-row items-center gap-6 p-4">
              <p className="text-text-muted">
                {locale === 'tr' ? 'Hizmetlerimiz hakkında daha fazla bilgi almak ister misiniz?' :
                 locale === 'it' ? 'Vuoi saperne di più sui nostri servizi?' :
                 'Want to learn more about our services?'}
              </p>
              <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-cyan text-void font-semibold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
              >
                {t.nav.contact}
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}

