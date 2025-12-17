'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheck, FaLinkedin } from 'react-icons/fa';
import GlassCard from '../../components/ui/GlassCard';
import { getTranslation, type Locale } from '@/lib/translations';

interface AboutPageClientProps {
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

export default function AboutPageClient({ locale }: AboutPageClientProps) {
  const t = getTranslation(locale);

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="neo-pill mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-purple"></span>
            <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.about.label}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">{t.about.title}</h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-glass-border">
              <Image
                src="/ozibumin.jpeg"
                alt="Alvolo Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-text-muted leading-relaxed">
              {t.about.paragraph1}
            </p>
            <p className="text-lg text-text-primary font-semibold leading-relaxed">
              {t.about.paragraph2}
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              {t.about.paragraph3}
            </p>

            {/* Values */}
            <div className="pt-6">
              <h3 className="text-2xl font-serif font-bold text-accent-cyan mb-4">{t.about.valuesTitle}</h3>
              <ul className="space-y-3">
                {t.about.values.map((value, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="w-6 h-6 rounded-full bg-accent-orange/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-orange/30 transition-colors">
                      <FaCheck className="w-3 h-3 text-accent-orange" />
                    </span>
                    <span className="text-text-muted group-hover:text-text-primary transition-colors">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-accent-orange mb-2">95%</div>
                <div className="text-sm text-text-muted">{t.about.successRateStat}</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-accent-cyan mb-2">1000+</div>
                <div className="text-sm text-text-muted">{t.about.happyClientsStat}</div>
              </GlassCard>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl text-center mb-12">{t.about.teamTitle}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 border-2 border-accent-cyan/30">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">{member.name}</h3>
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
      </div>
    </main>
  );
}

