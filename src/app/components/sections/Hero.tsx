'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaCode } from 'react-icons/fa';
import { type Locale, type TranslationType } from '@/lib/translations';

interface HeroProps {
  t: TranslationType;
  locale: Locale;
}

const Hero: React.FC<HeroProps> = ({ t, locale }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-6 pt-32">
      
      {/* Crystal Animation */}
      <AnimatePresence>
        {mounted && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] mb-12 perspective-1000"
          >
            <div className="w-full h-full rounded-full border border-white/15 animate-breathe relative
              shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]">
              
              {/* Outer Ring */}
              <div className="absolute inset-[-10px] rounded-full border border-white/5 animate-spin-slow" />
              
              {/* Inner Ring */}
              <div className="absolute inset-[20px] rounded-full border border-dashed border-white/10 animate-spin-reverse" />
              
              {/* Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-xs font-mono tracking-wider uppercase text-accent-cyan">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                  {t.hero.badge}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mounted && (
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              {t.hero.title1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent-cyan to-accent-orange bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mounted && (
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-text-muted mb-10 max-w-2xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link 
              href={`/${locale}/contact`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-orange text-void font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(245,134,67,0.3)]"
            >
              {t.hero.cta1}
              <FaChartLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href={`/${locale}/methodology`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-glass-highlight text-sm uppercase tracking-wider transition-all duration-300 hover:bg-text-primary hover:text-void hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              {t.hero.cta2}
              <FaCode className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6 border-t border-glass-border pt-8"
          >
            <div className="text-center">
              <span className="font-bold text-2xl text-text-primary">{t.hero.stat1Value}</span>
              <p className="text-xs text-text-muted font-mono uppercase tracking-wider mt-1">{t.hero.stat1Label}</p>
            </div>
            <div className="w-px h-12 bg-glass-border"></div>
            <div className="text-center">
              <span className="font-bold text-2xl text-text-primary">{t.hero.stat2Value}</span>
              <p className="text-xs text-text-muted font-mono uppercase tracking-wider mt-1">{t.hero.stat2Label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
