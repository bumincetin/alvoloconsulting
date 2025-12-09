"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_IMAGE = '/milanoyeni.jpg';

const getHeroContent = (lang: string) => {
  const content = {
    tr: {
      brandName: "Alvolo Danışmanlık",
      mainHeading: "İtalya'da Hayallerinize Ulaşın",
      subheading1: "İtalya'da iş, yaşam, entegrasyon ve finansal süreçlerinizde",
      subheading2: "Profesyonel Analiz ve Danışmanlık Hizmetleri.",
      contactButton: "Bize Ulaşın",
      servicesButton: "Hizmetlerimiz"
    },
    en: {
      brandName: "Alvolo Consulting",
      mainHeading: "Reach Your Dreams in Italy",
      subheading1: "For your business, life, integration, and financial needs in Italy",
      subheading2: "Professional Analysis and Consulting Services.",
      contactButton: "Contact Us",
      servicesButton: "Our Services"
    },
    it: {
      brandName: "Alvolo Consulenza",
      mainHeading: "Raggiungi i Tuoi Sogni in Italia",
      subheading1: "Per le tue esigenze di business, vita, integrazione e finanza in Italia",
      subheading2: "Servizi Professionali di Analisi e Consulenza.",
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
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        className="absolute -left-32 -top-24 w-72 h-72 blur-3xl"
        style={{ backgroundColor: 'var(--brand-blue)', opacity: 0.12 }}
      />
      <div
        className="absolute right-[-120px] bottom-[-80px] w-96 h-96 blur-3xl"
        style={{ backgroundColor: 'var(--brand-orange)', opacity: 0.12 }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6 text-[var(--text-primary)]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #3c77ad, #f58643)' }}
            >
              {c.brandName}
            </span>
          </h1>
          <div className="h-1 w-20 rounded-full" style={{ backgroundColor: 'var(--brand-blue)' }} />
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {c.subheading1}
          </p>
          <p className="text-xl md:text-2xl font-semibold leading-relaxed" style={{ color: 'var(--brand-blue)' }}>
            {c.subheading2}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact"
              className="px-7 py-3 rounded-md text-white font-semibold shadow-lg hover:translate-y-[-2px] transition-transform duration-200 text-center"
              style={{ backgroundColor: 'var(--brand-blue)', boxShadow: '0 10px 25px rgba(60,119,173,0.30)' }}
            >
              {c.contactButton}
            </Link>
            <Link
              href="/services"
              className="px-7 py-3 rounded-md font-semibold bg-white/80 hover:text-white transition-colors duration-200 text-center border-2"
              style={{ borderColor: 'var(--brand-blue)', color: 'var(--brand-blue)' }}
            >
              {c.servicesButton}
            </Link>
          </div>
        </div>

        <div className="relative h-[420px] sm:h-[520px] md:h-[640px]">
          <div className="absolute inset-0 rounded-[28px] overflow-hidden shadow-2xl border border-white/60">
            <Image
              src={HERO_IMAGE}
              alt="Milano şehir merkezi"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b"
              style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, var(--bg-primary) 100%)' }}
            />
          </div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/40 blur-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 