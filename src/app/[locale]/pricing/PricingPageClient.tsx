'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheck, FaStar } from 'react-icons/fa';
import GlassCard from '../../components/ui/GlassCard';
import { getTranslation, type Locale } from '@/lib/translations';
import PageVideoBackground from '@/components/Media/PageVideoBackground';

interface PricingPageClientProps {
  locale: Locale;
}

export default function PricingPageClient({ locale }: PricingPageClientProps) {
  const t = getTranslation(locale);

  return (
    <main className="relative bg-transparent text-electric-platinum pt-32 pb-20 px-6">
      <PageVideoBackground src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/408ad52e3f15bc8f01ae69d194a8cf3a/manifest/video.m3u8" />
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="neo-pill mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
            <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.pricing.label}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">{t.pricing.title}</h1>
          <p className="text-electric-platinum/60 max-w-2xl mx-auto text-lg">{t.pricing.subtitle}</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {t.pricing.packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={pkg.popular ? 'md:-mt-4 md:mb-4' : ''}
            >
              <GlassCard className={`h-full relative ${pkg.popular ? 'border-accent-cyan' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-accent-cyan text-void text-xs font-bold uppercase tracking-wider">
                      <FaStar className="w-3 h-3" />
                      {locale === 'tr' ? 'Popüler' : locale === 'it' ? 'Popolare' : 'Popular'}
                    </div>
                  </div>
                )}

                <div className="text-center mb-6 pt-4">
                  <h3 className="text-xl font-bold text-electric-platinum mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-accent-cyan mb-2">{pkg.price}</div>
                  <p className="text-sm text-electric-platinum/60">{pkg.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                        <FaCheck className="w-2.5 h-2.5 text-accent-cyan" />
                      </span>
                      <span className="text-sm text-electric-platinum/60">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${locale}/contact`}
                  className={`w-full py-3 rounded-xl font-semibold text-sm uppercase tracking-wider text-center block transition-all hover:scale-[1.02] ${pkg.popular
                    ? 'bg-accent-cyan text-void'
                    : 'bg-obsidian-plate/70 border border-tungsten-grey/60 text-electric-platinum hover:border-holographic-cyan/30'
                    }`}
                >
                  {pkg.cta}
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <GlassCard className="inline-block">
            <p className="text-electric-platinum/60">
              {locale === 'tr' ? 'Özel ihtiyaçlarınız mı var? Sizin için özelleştirilmiş bir çözüm oluşturalım.' :
                locale === 'it' ? 'Hai esigenze specifiche? Creiamo una soluzione personalizzata per te.' :
                  'Have specific needs? Let us create a customized solution for you.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block mt-4 text-accent-cyan hover:text-electric-platinum transition-colors font-mono text-sm uppercase tracking-wider"
            >
              {t.nav.contact} →
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}

