'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type Locale, type TranslationType, locales, translations } from '@/lib/translations';
import { FaBars, FaTimes, FaLock } from 'react-icons/fa';

interface NavbarProps {
  locale?: Locale;
  t?: TranslationType;
}

const languageNames: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
  it: 'IT',
};

const Navbar: React.FC<NavbarProps> = ({ locale = 'en', t }) => {
  const pathname = usePathname();
  const trans = t || translations[locale];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get current path without locale
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) segments.shift();
    return '/' + segments.join('/');
  };

  const currentPath = getPathWithoutLocale();

  const links = [
    { name: trans.nav.home, href: `/${locale}` },
    { name: trans.nav.services, href: `/${locale}/services` },
    { name: trans.nav.about, href: `/${locale}/about` },
    { name: trans.nav.pricing, href: `/${locale}/pricing` },
    { name: trans.nav.faq, href: `/${locale}/faq` },
  ];

  const isActive = (href: string) => {
    const hrefPath = href.replace(`/${locale}`, '') || '/';
    return currentPath === hrefPath || (hrefPath === '/' && currentPath === '');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 p-3 px-6 rounded-full bg-void/60 backdrop-blur-2xl border border-glass-border hidden md:flex items-center gap-6 w-[95%] max-w-fit justify-center">
        {/* Logo */}
        <Link href={`/${locale}`} className="mr-2">
          <Image
            src="/ICON.png"
            alt="Alvolo Consulting"
            width={80}
            height={30}
            className="w-16 h-6 object-contain"
          />
        </Link>

        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`
              text-xs md:text-sm uppercase tracking-wider transition-colors duration-300
              ${isActive(link.href) ? 'text-accent-cyan' : 'text-text-muted hover:text-accent-cyan'}
            `}
          >
            {link.name}
          </Link>
        ))}
        <Link
          href={`/${locale}/contact`}
          className="text-xs md:text-sm uppercase tracking-wider text-text-primary hover:text-accent-cyan transition-colors duration-300"
        >
          {trans.nav.contact}
        </Link>

        {/* Client Portal Button */}
        <Link
          href={`/${locale}/portal`}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-mono uppercase tracking-wider hover:bg-accent-cyan/20 transition-all"
        >
          <FaLock className="w-3 h-3" />
          {trans.nav.portal}
        </Link>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 ml-2 border-l border-glass-border pl-4">
          {locales.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}${currentPath}`}
              className={`
                px-2 py-1 text-xs font-mono rounded transition-all
                ${locale === loc
                  ? 'bg-accent-cyan/20 text-accent-cyan'
                  : 'text-text-muted hover:text-electric-platinum hover:bg-obsidian-plate/40'
                }
              `}
            >
              {languageNames[loc]}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl bg-void/80 backdrop-blur-2xl border border-glass-border md:hidden">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`}>
            <Image
              src="/ICON.png"
              alt="Alvolo Consulting"
              width={80}
              height={30}
              className="w-16 h-6 object-contain"
            />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-primary p-2"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 pt-4 border-t border-glass-border">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    text-sm uppercase tracking-wider transition-colors duration-300 py-2
                    ${isActive(link.href) ? 'text-accent-cyan' : 'text-text-muted hover:text-accent-cyan'}
                  `}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider text-text-primary hover:text-accent-cyan transition-colors duration-300 py-2"
              >
                {trans.nav.contact}
              </Link>

              {/* Client Portal Button Mobile */}
              <Link
                href={`/${locale}/portal`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-mono uppercase tracking-wider hover:bg-accent-cyan/20 transition-all mt-2"
              >
                <FaLock className="w-3 h-3" />
                {trans.nav.portal}
              </Link>
            </div>

            {/* Language Switcher Mobile */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-glass-border">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${currentPath}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    px-3 py-2 text-xs font-mono rounded transition-all
                    ${locale === loc
                      ? 'bg-accent-cyan/20 text-accent-cyan'
                      : 'text-text-muted hover:text-electric-platinum hover:bg-obsidian-plate/40'
                    }
                  `}
                >
                  {languageNames[loc]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

