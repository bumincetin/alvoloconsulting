'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { type Locale, type TranslationType } from '@/lib/translations';

interface ExpansionProps {
  t: TranslationType;
  locale: Locale;
}

const Expansion: React.FC<ExpansionProps> = ({ t, locale }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="relative z-10 border-y border-glass-border">
      <div className="grid md:grid-cols-2">
        {/* Left: Italy Context */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href={`/${locale}/services/expansion/italy`}
                className="group relative block p-12 md:p-20 border-r border-glass-border overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent-cyan/5 transition-colors duration-500 group-hover:bg-accent-cyan/10"></div>
                <div className="relative z-10">
                  <div className="font-mono text-xs mb-4 text-accent-cyan">{t.expansion.left.direction}</div>
                  <h3 className="text-3xl font-serif font-bold mb-4 text-text-primary">{t.expansion.left.title}</h3>
                  <p className="mb-8 max-w-sm text-text-muted">{t.expansion.left.body}</p>
                  <div className="inline-flex items-center gap-2 border-b border-accent-cyan pb-1 text-text-primary group-hover:text-accent-cyan transition-colors">
                    {t.expansion.left.cta} 
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Turkey Context */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href={`/${locale}/services/expansion/turkey`}
                className="group relative block p-12 md:p-20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent-orange/5 transition-colors duration-500 group-hover:bg-accent-orange/10"></div>
                <div className="relative z-10">
                  <div className="font-mono text-xs mb-4 text-accent-orange">{t.expansion.right.direction}</div>
                  <h3 className="text-3xl font-serif font-bold mb-4 text-text-primary">{t.expansion.right.title}</h3>
                  <p className="mb-8 max-w-sm text-text-muted">{t.expansion.right.body}</p>
                  <div className="inline-flex items-center gap-2 border-b border-accent-orange pb-1 text-text-primary group-hover:text-accent-orange transition-colors">
                    {t.expansion.right.cta} 
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Expansion;
