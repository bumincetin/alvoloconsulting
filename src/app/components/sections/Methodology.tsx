'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { type Locale, type TranslationType } from '@/lib/translations';

interface MethodologyProps {
  t: TranslationType;
  locale: Locale;
}

const Methodology: React.FC<MethodologyProps> = ({ t, locale }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="methodology" className="py-24 px-6 relative border-y border-glass-border">
      <div className="container mx-auto max-w-6xl">
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
                <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.methodology.label}</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">{t.methodology.title}</h2>
              <p className="text-text-muted max-w-2xl mx-auto">{t.methodology.subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.methodology.steps.map((step, index) => (
            <AnimatePresence key={index}>
              {mounted && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="glass-panel rounded-2xl p-6 h-full transition-all hover:border-accent-cyan/30">
                    <div className="text-4xl font-serif font-bold text-accent-cyan/30 mb-4 group-hover:text-accent-cyan transition-colors">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Explore Link */}
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
                href={`/${locale}/methodology`}
                className="inline-flex items-center gap-2 text-accent-cyan hover:text-electric-platinum transition-colors font-mono text-sm uppercase tracking-wider"
              >
                {t.methodology.explore}
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Methodology;
