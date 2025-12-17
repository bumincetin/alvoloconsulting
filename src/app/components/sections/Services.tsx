'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import GlassCard from '../ui/GlassCard';
import { type Locale, type TranslationType } from '@/lib/translations';

interface ServicesProps {
  t: TranslationType;
  locale: Locale;
}

const Services: React.FC<ServicesProps> = ({ t, locale }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="neo-pill mx-auto mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
                <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.services.label}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">{t.services.title}</h2>
              <p className="text-text-muted max-w-2xl mx-auto">{t.services.subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Integration Services */}
          <AnimatePresence>
            {mounted && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInLeft}
                transition={{ duration: 0.6 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-text-primary">{t.services.integrationTitle}</h3>
                    <div className="neo-pill">
                      <span className="w-2 h-2 rounded-full bg-accent-purple"></span>
                      <span className="text-[10px] tracking-[0.14em] uppercase">Integration</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {t.services.integrationServices.slice(0, 4).map((service, index) => (
                      <div key={index} className="p-4 rounded-xl bg-glass-surface border border-glass-border transition-all hover:border-accent-purple/30">
                        <h4 className="text-sm font-semibold text-text-primary mb-1">{service.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Financial Services */}
          <AnimatePresence>
            {mounted && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInRight}
                transition={{ duration: 0.6 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-text-primary">{t.services.financialTitle}</h3>
                    <div className="neo-pill">
                      <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
                      <span className="text-[10px] tracking-[0.14em] uppercase">Finance</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {t.services.financialServices.slice(0, 4).map((service, index) => (
                      <div key={index} className="p-4 rounded-xl bg-glass-surface border border-glass-border transition-all hover:border-accent-orange/30">
                        <h4 className="text-sm font-semibold text-text-primary mb-1">{service.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View All Link */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link 
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 text-accent-cyan hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
              >
                {t.services.viewAll}
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
