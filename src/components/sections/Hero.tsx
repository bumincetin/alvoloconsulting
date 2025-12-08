"use client";

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const getHeroContent = (lang: string) => {
  const content = {
    tr: {
      brandName: "Alvolo Danışmanlık",
      mainHeading: "İtalya'da Hayallerinize Ulaşın",
      subheading1: "İtalya'da iş, yaşam, entegrasyon ve finansal süreçlerinizde",
      subheading2: "profesyonel danışmanlık hizmetleri.",
      contactButton: "Bize Ulaşın",
      servicesButton: "Hizmetlerimiz"
    },
    en: {
      brandName: "Alvolo Consulting",
      mainHeading: "Reach Your Dreams in Italy",
      subheading1: "For your business, life, integration, and financial needs in Italy",
      subheading2: "professional consultancy services.",
      contactButton: "Contact Us",
      servicesButton: "Our Services"
    },
    it: {
      brandName: "Alvolo Consulenza",
      mainHeading: "Raggiungi i Tuoi Sogni in Italia",
      subheading1: "Per le tue esigenze di business, vita, integrazione e finanza in Italia",
      subheading2: "servizi professionali di consulenza.",
      contactButton: "Contattaci",
      servicesButton: "I Nostri Servizi"
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const Hero = () => {
  const { language } = useLanguage();
  const c = getHeroContent(language);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="neo-pill animate-fade-in" style={{ animationDuration: '1s' }}>
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] uppercase">Neo Tokyo Layout</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-[var(--text-primary)] animate-slide-up" style={{ animationDuration: '1.1s' }}>
            {c.mainHeading}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-white/70 to-white/30 mt-4">
              {c.subheading1}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed animate-slide-up" style={{ animationDuration: '1.2s' }}>
            {c.subheading2}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDuration: '1.3s' }}>
            <Link
              href="/contact"
              className="neo-cta px-7 py-4 rounded-md shadow-[0_15px_30px_rgba(0,243,255,0.25)] flex items-center justify-center gap-2"
            >
              {c.contactButton}
            </Link>
            <Link
              href="/services"
              className="neo-cta-outline px-7 py-4 rounded-md flex items-center justify-center gap-2"
            >
              {c.servicesButton}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-r from-neon-purple/20 via-transparent to-neon-cyan/20 blur-3xl opacity-70" />
          <div className="neo-card rounded-3xl p-8 relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,243,255,0.05),rgba(188,19,254,0.05))]" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between text-[var(--text-secondary)] text-xs uppercase tracking-[0.18em]">
                <span>Integration & Finance</span>
                <span>2025</span>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0f1729] via-[#0a0d1a] to-[#04050a] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,243,255,0.25),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(188,19,254,0.35),transparent_40%)]" />
                <div className="absolute inset-0 mix-blend-soft-light opacity-60 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-center px-6">
                  <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                    We build visceral digital experiences for every step of your Italy journey.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  {c.brandName}
                </span>
                <span className="text-[var(--text-primary)] uppercase tracking-[0.12em]">Since 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 