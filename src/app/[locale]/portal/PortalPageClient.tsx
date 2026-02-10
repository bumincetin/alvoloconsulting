'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLock, FaFileAlt, FaComments, FaChartLine, FaShieldAlt, FaUserShield, FaArrowRight } from 'react-icons/fa';
import GlassCard from '../../components/ui/GlassCard';
import { type Locale } from '@/lib/translations';
import PageVideoBackground from '@/components/Media/PageVideoBackground';

interface PortalPageClientProps {
  locale: Locale;
}

// Portal URL - in production this would be your deployed Django portal URL
// For local development: http://localhost:8000
// For production: https://portal.alvoloconsulting.com or your custom domain
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:8000';

const content = {
  en: {
    badge: 'SECURE CLIENT PORTAL',
    title: 'Your Private',
    titleHighlight: 'Command Center',
    subtitle: 'Access your documents, track your metrics, and communicate securely with our team—all in one encrypted environment.',
    loginButton: 'Access Portal',
    registerButton: 'Request Access',
    features: [
      {
        icon: FaFileAlt,
        title: 'Document Management',
        desc: 'Securely upload, download, and manage all your important documents. Organized by project with full version history.',
      },
      {
        icon: FaComments,
        title: 'Secure Messaging',
        desc: 'Direct, encrypted communication with your dedicated consultant. Real-time notifications and message history.',
      },
      {
        icon: FaChartLine,
        title: 'Analytics Dashboard',
        desc: 'Track your key metrics and KPIs with interactive charts. Monitor project progress and financial indicators.',
      },
      {
        icon: FaShieldAlt,
        title: 'Bank-Level Security',
        desc: 'End-to-end encryption, two-factor authentication, and strict access controls protect your sensitive data.',
      },
    ],
    securityTitle: 'SECURITY FIRST',
    securityFeatures: [
      { icon: FaLock, text: 'AES-256 Encryption' },
      { icon: FaUserShield, text: 'Role-Based Access' },
      { icon: FaShieldAlt, text: 'GDPR Compliant' },
    ],
    ctaTitle: 'Ready to Get Started?',
    ctaDesc: 'Contact us to set up your secure client portal account.',
    ctaButton: 'Request Portal Access',
    existingClient: 'Already have an account?',
    loginLink: 'Log in here',
  },
  tr: {
    badge: 'GÜVENLİ MÜŞTERİ PORTALI',
    title: 'Özel',
    titleHighlight: 'Komuta Merkeziniz',
    subtitle: 'Belgelerinize erişin, metriklerinizi takip edin ve ekibimizle güvenli bir şekilde iletişim kurun—tümü şifreli bir ortamda.',
    loginButton: 'Portala Eriş',
    registerButton: 'Erişim Talep Et',
    features: [
      {
        icon: FaFileAlt,
        title: 'Belge Yönetimi',
        desc: 'Tüm önemli belgelerinizi güvenli bir şekilde yükleyin, indirin ve yönetin. Tam sürüm geçmişi ile projeye göre düzenlenmiş.',
      },
      {
        icon: FaComments,
        title: 'Güvenli Mesajlaşma',
        desc: 'Özel danışmanınızla doğrudan, şifreli iletişim. Gerçek zamanlı bildirimler ve mesaj geçmişi.',
      },
      {
        icon: FaChartLine,
        title: 'Analitik Panosu',
        desc: 'Etkileşimli grafiklerle temel metriklerinizi ve KPI\'larınızı takip edin. Proje ilerlemesini ve finansal göstergeleri izleyin.',
      },
      {
        icon: FaShieldAlt,
        title: 'Banka Düzeyinde Güvenlik',
        desc: 'Uçtan uca şifreleme, iki faktörlü kimlik doğrulama ve katı erişim kontrolleri hassas verilerinizi korur.',
      },
    ],
    securityTitle: 'GÜVENLİK ÖNCELİKLİ',
    securityFeatures: [
      { icon: FaLock, text: 'AES-256 Şifreleme' },
      { icon: FaUserShield, text: 'Rol Tabanlı Erişim' },
      { icon: FaShieldAlt, text: 'KVKK Uyumlu' },
    ],
    ctaTitle: 'Başlamaya Hazır mısınız?',
    ctaDesc: 'Güvenli müşteri portalı hesabınızı oluşturmak için bizimle iletişime geçin.',
    ctaButton: 'Portal Erişimi Talep Et',
    existingClient: 'Zaten bir hesabınız var mı?',
    loginLink: 'Buradan giriş yapın',
  },
  it: {
    badge: 'PORTALE CLIENTI SICURO',
    title: 'Il Tuo',
    titleHighlight: 'Centro di Comando',
    subtitle: 'Accedi ai tuoi documenti, monitora le tue metriche e comunica in modo sicuro con il nostro team—tutto in un ambiente crittografato.',
    loginButton: 'Accedi al Portale',
    registerButton: 'Richiedi Accesso',
    features: [
      {
        icon: FaFileAlt,
        title: 'Gestione Documenti',
        desc: 'Carica, scarica e gestisci in sicurezza tutti i tuoi documenti importanti. Organizzati per progetto con cronologia completa delle versioni.',
      },
      {
        icon: FaComments,
        title: 'Messaggistica Sicura',
        desc: 'Comunicazione diretta e crittografata con il tuo consulente dedicato. Notifiche in tempo reale e cronologia messaggi.',
      },
      {
        icon: FaChartLine,
        title: 'Dashboard Analytics',
        desc: 'Monitora le tue metriche chiave e KPI con grafici interattivi. Segui l\'avanzamento dei progetti e gli indicatori finanziari.',
      },
      {
        icon: FaShieldAlt,
        title: 'Sicurezza Bancaria',
        desc: 'Crittografia end-to-end, autenticazione a due fattori e controlli di accesso rigorosi proteggono i tuoi dati sensibili.',
      },
    ],
    securityTitle: 'SICUREZZA PRIMA',
    securityFeatures: [
      { icon: FaLock, text: 'Crittografia AES-256' },
      { icon: FaUserShield, text: 'Accesso Basato su Ruoli' },
      { icon: FaShieldAlt, text: 'Conforme GDPR' },
    ],
    ctaTitle: 'Pronto per Iniziare?',
    ctaDesc: 'Contattaci per configurare il tuo account del portale clienti sicuro.',
    ctaButton: 'Richiedi Accesso al Portale',
    existingClient: 'Hai già un account?',
    loginLink: 'Accedi qui',
  },
};

// Animated Security Shield Component
const SecurityShieldAnimation = () => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Outer Shield */}
        <motion.path
          d="M50 5 L90 20 L90 55 Q90 90 50 115 Q10 90 10 55 L10 20 Z"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Inner Shield */}
        <motion.path
          d="M50 15 L80 27 L80 55 Q80 82 50 103 Q20 82 20 55 L20 27 Z"
          fill="url(#shieldGradient)"
          fillOpacity="0.1"
          stroke="#7000ff"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Lock Icon */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <rect x="38" y="55" width="24" height="20" rx="3" fill="none" stroke="#f58643" strokeWidth="2" />
          <path d="M42 55 V48 Q42 40 50 40 Q58 40 58 48 V55" fill="none" stroke="#f58643" strokeWidth="2" />
          <circle cx="50" cy="65" r="3" fill="#f58643" />
        </motion.g>

        {/* Animated Rings */}
        <motion.circle
          cx="50"
          cy="60"
          r="40"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#7000ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function PortalPageClient({ locale }: PortalPageClientProps) {
  const [mounted, setMounted] = useState(false);
  const t = content[locale];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative bg-transparent text-electric-platinum pt-32 pb-20 px-6">
      <PageVideoBackground src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/e923e67d71fed3e0853ec57f0348451e/manifest/video.m3u8" />
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="neo-pill mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
              <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.badge}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl mb-6">
              <span className="text-electric-platinum">{t.title}</span>
              <br />
              <span className="bg-gradient-to-r from-accent-cyan to-accent-orange bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
            </h1>
            <p className="text-electric-platinum/60 text-lg leading-relaxed mb-8">{t.subtitle}</p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`${PORTAL_URL}/login`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-black text-void font-mono font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(229,228,226,0.3)]"
              >
                <FaLock className="w-4 h-4" />
                {t.loginButton}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-tungsten-grey/60 text-electric-platinum font-mono uppercase tracking-wider text-sm hover:bg-obsidian-plate/60 transition-all"
              >
                {t.registerButton}
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <SecurityShieldAnimation />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-electric-platinum mb-2">{feature.title}</h3>
                    <p className="text-sm text-electric-platinum/60 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <GlassCard>
            <div className="text-center">
              <div className="font-mono text-xs text-accent-orange tracking-[0.3em] mb-4">{t.securityTitle}</div>
              <div className="flex flex-wrap justify-center gap-8">
                {t.securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-glass-surface border border-glass-border flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-accent-cyan" />
                    </div>
                    <span className="text-sm text-electric-platinum/60 font-mono">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <GlassCard className="py-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">{t.ctaTitle}</h2>
            <p className="text-electric-platinum/60 mb-8 max-w-lg mx-auto">{t.ctaDesc}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-accent-orange text-void font-mono font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(245,134,67,0.3)]"
            >
              {t.ctaButton}
              <FaArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-8 pt-8 border-t border-glass-border">
              <p className="text-sm text-electric-platinum/60">
                {t.existingClient}{' '}
                <a
                  href={`${PORTAL_URL}/login`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cyan hover:underline"
                >
                  {t.loginLink}
                </a>
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}

