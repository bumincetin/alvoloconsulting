'use client';

import React from 'react';
import Link from 'next/link';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface FooterProps {
  locale?: Locale;
  t?: TranslationType;
}

const Footer: React.FC<FooterProps> = ({ locale = 'en', t }) => {
  const trans = t || translations[locale];
  const l = (href: string) => `/${locale}${href}`;

  return (
    <footer className="bg-[#111418] relative z-10">
      <div className="container mx-auto px-6 pt-12 pb-8">
        {/* Compact Site Index */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs uppercase tracking-[0.15em] pb-10 border-b border-tungsten-grey/20">
          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-electric-platinum/40 font-mono tracking-[0.25em] mb-4">{trans.footer.corporateTitle}</h4>
            {trans.footer.corporateLinks.map((item, idx) => (
              <Link
                key={idx}
                href={l(item.href)}
                className="block text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-electric-platinum/40 font-mono tracking-[0.25em] mb-4">{trans.footer.servicesTitle}</h4>
            {trans.footer.servicesLinks.map((item, idx) => (
              <Link
                key={idx}
                href={l(item.href)}
                className="block text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={l('/services/expansion/italy')}
              className="block text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
            >
              {locale === 'tr' ? 'İtalya Paketi' : locale === 'it' ? 'Pacchetto Italia' : 'Italy Package'}
            </Link>
            <Link
              href={l('/services/expansion/turkey')}
              className="block text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
            >
              {locale === 'tr' ? 'Türkiye Paketi' : locale === 'it' ? 'Pacchetto Turchia' : 'Turkey Package'}
            </Link>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-electric-platinum/40 font-mono tracking-[0.25em] mb-4">
              {locale === 'tr' ? 'Kaynaklar' : locale === 'it' ? 'Risorse' : 'Resources'}
            </h4>
            <Link
              href={l('/methodology')}
              className="block text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
            >
              {locale === 'tr' ? 'Metodoloji' : locale === 'it' ? 'Metodologia' : 'Methodology'}
            </Link>
            <Link
              href={l('/portal')}
              className="block text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
            >
              {locale === 'tr' ? 'Portal' : locale === 'it' ? 'Portale' : 'Portal'}
            </Link>
            <Link
              href={l('/pricing')}
              className="block text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
            >
              {locale === 'tr' ? 'Fiyatlandırma' : locale === 'it' ? 'Prezzi' : 'Pricing'}
            </Link>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h4 className="text-electric-platinum/40 font-mono tracking-[0.25em] mb-4">{trans.footer.hoursTitle}</h4>
            <p className="text-electric-platinum/60">
              <span className="text-electric-platinum/80 font-semibold">{trans.footer.hoursWeekday}</span><br />
              {trans.footer.hoursTime}
            </p>
            <p className="text-electric-platinum/40">{trans.footer.hoursClosed}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-electric-platinum/50 font-mono tracking-wider gap-4">
          <div>{trans.footer.reserved}</div>
          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/company/alvolo-consulting"
              target="_blank"
              rel="noreferrer"
              className="hover:text-holographic-cyan transition-colors"
            >
              {trans.footer.linkedin}
            </a>
            <a
              href="mailto:info@alvoloconsulting.com"
              className="hover:text-holographic-cyan transition-colors"
            >
              {trans.footer.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
