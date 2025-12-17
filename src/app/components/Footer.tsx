'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface FooterProps {
  locale?: Locale;
  t?: TranslationType;
}

const Footer: React.FC<FooterProps> = ({ locale = 'en', t }) => {
  const [mounted, setMounted] = useState(false);
  const trans = t || translations[locale];

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Helper to add locale prefix to links
  const localizeHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <footer id="contact" className="container mx-auto px-6 pt-32 pb-12 text-center relative z-10">
      {/* CTA Section */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.9] opacity-90 mb-12 transition-all duration-300 hover:text-transparent hover:text-stroke-cyan cursor-default select-none">
              {trans.footer.cta.split(' ')[0]}<br />{trans.footer.cta.split(' ')[1] || 'NOW'}
            </div>
            
            <Link 
              href={localizeHref('/contact')}
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-accent-cyan text-void font-mono font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.3)]"
            >
              {trans.footer.button}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Links */}
      <div className="grid md:grid-cols-4 gap-10 text-left mb-16 border-t border-glass-border pt-16">
        {/* Company Info */}
        <div className="space-y-4">
          <Link href={localizeHref('/')}>
            <Image
              src="/ICON.png"
              alt="Alvolo Consulting"
              width={120}
              height={40}
              className="w-24 h-8 object-contain mb-4"
            />
          </Link>
          <div>
            <div className="text-lg font-bold tracking-wide text-text-primary">{trans.footer.companyName}</div>
            <p className="text-sm text-text-muted leading-relaxed mt-2">
              {trans.footer.companyTitle}
            </p>
          </div>
          <p className="text-sm text-text-muted">{trans.footer.companyAddress}</p>
          
          {/* Social Links */}
          <div className="flex gap-3 pt-4">
            <a
              href="https://wa.me/393481705207"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-glass-surface border border-glass-border text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href="https://www.instagram.com/alvoloconsulting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-glass-surface border border-glass-border text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/alvolo-consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-glass-surface border border-glass-border text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Corporate Links */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-text-muted mb-4 font-mono">{trans.footer.corporateTitle}</h4>
          <div className="space-y-2 text-sm">
            {trans.footer.corporateLinks.map((item, idx) => (
              <Link
                key={idx}
                href={localizeHref(item.href)}
                className="block text-text-muted hover:text-accent-cyan transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-text-muted mb-4 font-mono">{trans.footer.servicesTitle}</h4>
          <div className="space-y-2 text-sm">
            {trans.footer.servicesLinks.map((item, idx) => (
              <Link
                key={idx}
                href={localizeHref(item.href)}
                className="block text-text-muted hover:text-accent-cyan transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-[0.18em] text-text-muted mb-4 font-mono">{trans.footer.hoursTitle}</h4>
          <p className="text-sm text-text-primary">
            <span className="font-semibold">{trans.footer.hoursWeekday}</span><br />
            {trans.footer.hoursTime}
          </p>
          <p className="text-xs text-text-muted">{trans.footer.hoursClosed}</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center text-xs text-text-muted font-mono uppercase tracking-wider gap-4">
        <div>{trans.footer.reserved}</div>
        <div className="flex gap-8">
          <a 
            href="https://www.linkedin.com/company/alvolo-consulting" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-accent-cyan transition-colors"
          >
            {trans.footer.linkedin}
          </a>
          <a 
            href="mailto:info@alvoloconsulting.com" 
            className="hover:text-accent-cyan transition-colors"
          >
            {trans.footer.email}
          </a>
        </div>
      </div>
      
      <style>{`
        .hover\\:text-stroke-cyan:hover {
          -webkit-text-stroke: 1px #00f0ff;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
