'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { ThemeToggle } from '../ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const getNavbarContent = (lang: string) => {
  const content = {
    tr: {
      brand: "Alvolo Danışmanlık",
      home: "Ana Sayfa",
      missionVision: "Misyon & Vizyon",
      services: "Hizmetlerimiz",
      integrationServices: "Entegrasyon Çözümleri",
      financialServices: "Finansal Danışmanlık",
      pricing: "Fiyatlandırma",
      about: "Hakkımızda",
      ourStory: "Hikayemiz",
      announcements: "Duyurular",
      blog: "Blog",
      realEstateAgents: "Emlakçılar İçin",
      contact: "İletişim",
      clientPortal: "Müşteri Portalı",
      openMenu: "Menüyü Aç",
      closeMenu: "Menüyü Kapat"
    },
    en: {
      brand: "Alvolo Consulting",
      home: "Home",
      missionVision: "Mission & Vision",
      services: "Services",
      integrationServices: "Integration Solutions",
      financialServices: "Financial Consulting",
      pricing: "Pricing",
      about: "About Us",
      ourStory: "Our Story",
      announcements: "Announcements",
      blog: "Blog",
      realEstateAgents: "For Real Estate Agents",
      contact: "Contact",
      clientPortal: "Client Portal",
      openMenu: "Open Menu",
      closeMenu: "Close Menu"
    },
    it: {
      brand: "Alvolo Consulenza",
      home: "Pagina Iniziale",
      missionVision: "Missione & Visione",
      services: "Servizi",
      integrationServices: "Soluzioni di Integrazione",
      financialServices: "Consulenza Finanziaria",
      pricing: "Prezzi",
      about: "Chi Siamo",
      ourStory: "La Nostra Storia",
      announcements: "Annunci",
      blog: "Blog",
      realEstateAgents: "Per Agenti Immobiliari",
      contact: "Contatti",
      clientPortal: "Portale Cliente",
      openMenu: "Apri Menu",
      closeMenu: "Chiudi Menu"
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const c = getNavbarContent(language);

  const navItems = [
    { label: c.home, href: '/' },
    { label: c.about, href: '/about' },
    { label: c.blog, href: '/blog' },
    { label: c.contact, href: '/contact' },
  ];

  const rightMenuItems = [
    { label: c.announcements, href: '/announcements' },
    { label: c.missionVision, href: '/mission-vision' },
    { label: c.ourStory, href: '/our-story' },
  ];

  const serviceItems = [
    { label: c.integrationServices, href: '/services/integration' },
    { label: c.financialServices, href: '/services/financial' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-2xl"
      style={{
        backgroundColor: isScrolled ? 'var(--bg-surface)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--border-secondary)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 15px 40px rgba(0,0,0,0.35)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="p-2 rounded-lg transition-all shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: `1px solid var(--border-secondary)`
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; }}
            >
              <Image
                src="/ICON.png"
                alt="Alvolo Consulting"
                width={120}
                height={40}
                className="w-24 h-8 object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </span>
            </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-[0.12em] transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="relative" ref={servicesRef}>
              <button
                className="flex items-center gap-2 text-sm uppercase tracking-[0.12em] transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setIsServicesOpen((prev) => !prev)}
                >
                  {c.services}
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
              {isServicesOpen && (
                <div className="absolute top-12 left-0 w-56 rounded-xl glass-panel py-3 shadow-2xl">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-[0.12em] transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {item.label}
              </Link>
            ))}

            {/* RHS Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 text-sm uppercase tracking-[0.12em] transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setIsRightMenuOpen((prev) => !prev)}
              >
                Menu
                <ChevronDown className={`w-4 h-4 transition-transform ${isRightMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isRightMenuOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-xl glass-panel py-3 shadow-2xl">
                  {rightMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      onClick={() => setIsRightMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors"
              style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--neon-cyan)';
                e.currentTarget.style.color = '#050505';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                e.currentTarget.style.color = 'var(--bg-primary)';
              }}
            >
              {c.clientPortal}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="p-2 rounded-md border border-white/10 text-[var(--text-primary)]"
              aria-label={isMobileOpen ? c.closeMenu : c.openMenu}
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          </div>
        </div>

      {isMobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[var(--bg-surface)] backdrop-blur-2xl px-6 pb-10 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                className="px-4 py-3 rounded-lg glass-panel text-sm font-semibold text-[var(--text-primary)] transition-colors"
                onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          <div className="glass-panel rounded-xl p-4 space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">{c.services}</p>
            <div className="grid grid-cols-1 gap-2">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                  className="px-3 py-2 rounded-lg text-sm text-[var(--text-primary)] transition-colors"
                  style={{ backgroundColor: 'var(--bg-surface-hover)', border: `1px solid var(--border-secondary)` }}
                  onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

          <div className="glass-panel rounded-xl p-4 space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">Menu</p>
            <div className="grid grid-cols-1 gap-2">
              {rightMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 rounded-lg bg-white/5 text-sm text-[var(--text-primary)] transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {navItems.slice(2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-3 rounded-lg glass-panel text-sm font-semibold text-[var(--text-primary)] transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/portal"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--neon-cyan)';
              e.currentTarget.style.color = '#050505';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onClick={() => setIsMobileOpen(false)}
          >
            {c.clientPortal}
            <ArrowRight className="w-4 h-4" />
          </Link>
          </div>
        )}
    </nav>
  );
};

export default Navbar; 