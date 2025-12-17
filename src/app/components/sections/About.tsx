'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaLinkedin } from 'react-icons/fa';
import GlassCard from '../ui/GlassCard';
import { type Locale, type TranslationType } from '@/lib/translations';

interface AboutProps {
  t: TranslationType;
  locale: Locale;
}

const teamMembers = [
  { 
    name: "Bumin Kağan Çetin", 
    title: { en: "Co-founder", tr: "Kurucu Ortak", it: "Co-fondatore" },
    image: "/bumin.jpg", 
    linkedin: "https://www.linkedin.com/in/buminkcetin/" 
  },
  { 
    name: "Oğuzhan Aslan", 
    title: { en: "Co-founder", tr: "Kurucu Ortak", it: "Co-fondatore" },
    image: "/ozi.jpg", 
    linkedin: "https://www.linkedin.com/in/oguzhan--aslan/" 
  },
  { 
    name: "Ece Melisa Özgüner", 
    title: { en: "Co-founder", tr: "Kurucu Ortak", it: "Co-fondatore" },
    image: "/melisa.jpeg", 
    linkedin: "https://www.linkedin.com/in/ecemelisaozguner/" 
  },
];

const About: React.FC<AboutProps> = ({ t, locale }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 px-6 relative">
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
              className="mb-16"
            >
              <div className="neo-pill mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-purple"></span>
                <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.about.label}</span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-6">{t.about.title}</h2>
                  <p className="text-text-muted mb-4 leading-relaxed">{t.about.paragraph1}</p>
                  <p className="text-text-primary font-semibold mb-4">{t.about.paragraph2}</p>
                  <p className="text-text-muted leading-relaxed">{t.about.paragraph3}</p>
                  
                  <Link 
                    href={`/${locale}/about`}
                    className="inline-flex items-center gap-2 mt-6 text-accent-cyan hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                  >
                    {t.about.viewMore}
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <GlassCard className="text-center">
                    <div className="text-4xl font-bold text-accent-orange mb-2">95%</div>
                    <div className="text-sm text-text-muted">{t.about.successRateStat}</div>
                  </GlassCard>
                  <GlassCard className="text-center">
                    <div className="text-4xl font-bold text-accent-cyan mb-2">1000+</div>
                    <div className="text-sm text-text-muted">{t.about.happyClientsStat}</div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Team Section */}
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-serif text-3xl text-center mb-12">{t.about.teamTitle}</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GlassCard className="text-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-accent-cyan/30">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                      <h4 className="text-xl font-semibold text-text-primary mb-1">{member.name}</h4>
                      <p className="text-accent-orange mb-4">{member.title[locale]}</p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-glass-surface border border-glass-border text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
                      >
                        <FaLinkedin size={18} />
                      </a>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
