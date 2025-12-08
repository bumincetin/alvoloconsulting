'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaLinkedin, FaCheck } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const getFooterContent = (lang: string) => {
  const content = {
    tr: {
      company: {
        name: 'ALVOLO CONSULTING',
        title: 'Finansal Danışmanlık ve İtalya Entegrasyon Çözümleri',
        subtitle: 'Chamber of Certified Public Accountants',
        address: 'Via Valsugana 6, 20139 Milan, Italy',
      },
      corporate: {
        title: 'Kurumsal',
        links: [
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda', href: '/about' },
          { label: 'Hizmetlerimiz', href: '/services' },
          { label: 'Duyurular', href: '/announcements' },
          { label: 'Blog', href: '/blog' },
          { label: 'İletişim', href: '/contact' },
        ],
      },
      services: {
        title: 'Hizmetler',
        links: [
          { label: 'Entegrasyon Çözümleri', href: '/services/integration' },
          { label: 'Finansal Danışmanlık', href: '/services/financial' },
          { label: 'Entegrasyon Hizmetleri Fiyatlandırma', href: '/pricing' },
          { label: 'Emlak Danışmanları İçin', href: '/real-estate-agents' },
        ],
      },
      hours: {
        title: 'Çalışma Saatleri',
        weekday: 'Pazartesi – Cuma',
        time: '09:00 – 18:00',
        closed: 'Cumartesi ve Pazar günleri kapalıyız.',
      },
      copyright: 'ALVOLO CONSULTING',
      disclaimer: 'Bu web sitesinde yer alan tüm içerikler, yazılı izin alınmadıkça kopyalanamaz, çoğaltılamaz, dağıtılamaz veya başka platformlarda kullanılamaz. Site içeriği, yalnızca bilgilendirme amaçlıdır ve profesyonel mali danışmanlık hizmeti yerine geçmez.',
      reserved: '© 2024 – Tüm Hakları Saklıdır.',
    },
    en: {
      company: {
        name: 'ALVOLO CONSULTING',
        title: 'Financial Consultancy & Italy Integration Solutions',
        subtitle: 'Chamber of Certified Public Accountants',
        address: 'Via Valsugana 6, 20139 Milan, Italy',
      },
      corporate: {
        title: 'Corporate',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Announcements', href: '/announcements' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      services: {
        title: 'Services',
        links: [
          { label: 'Integration Solutions', href: '/services/integration' },
          { label: 'Financial Consultancy', href: '/services/financial' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Real Estate Agents', href: '/real-estate-agents' },
        ],
      },
      hours: {
        title: 'Working Hours',
        weekday: 'Monday – Friday',
        time: '09:00 – 18:00',
        closed: 'Closed on Saturday and Sunday.',
      },
      copyright: 'ALVOLO CONSULTING',
      disclaimer: 'All content on this website may not be copied, reproduced, distributed, or used on other platforms without written permission. The site content is for informational purposes only and does not constitute professional financial consulting.',
      reserved: '© 2024 – All Rights Reserved.',
    },
    it: {
      company: {
        name: 'ALVOLO CONSULTING',
        title: 'Consulenza Finanziaria & Soluzioni di Integrazione Italia',
        subtitle: 'Camera dei Commercialisti Certificati',
        address: 'Via Valsugana 6, 20139 Milan, Italy',
      },
      corporate: {
        title: 'Società',
        links: [
          { label: 'Pagina Iniziale', href: '/' },
          { label: 'Chi Siamo', href: '/about' },
          { label: 'Servizi', href: '/services' },
          { label: 'Annunci', href: '/announcements' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contatto', href: '/contact' },
        ],
      },
      services: {
        title: 'Servizi',
        links: [
          { label: 'Soluzioni di Integrazione', href: '/services/integration' },
          { label: 'Consulenza Finanziaria', href: '/services/financial' },
          { label: 'Prezzi', href: '/pricing' },
          { label: 'Agenti Immobiliari', href: '/real-estate-agents' },
        ],
      },
      hours: {
        title: 'Orari di Lavoro',
        weekday: 'Lunedì – Venerdì',
        time: '09:00 – 18:00',
        closed: 'Chiuso il sabato e la domenica.',
      },
      copyright: 'ALVOLO CONSULTING',
      disclaimer: 'Tutti i contenuti di questo sito web non possono essere copiati, riprodotti, distribuiti o utilizzati su altre piattaforme senza autorizzazione scritta. Il contenuto del sito è solo a scopo informativo e non costituisce consulenza finanziaria professionale.',
      reserved: '© 2024 – Tutti i diritti riservati.',
    },
  };
  return content[lang as keyof typeof content] || content.tr;
};

const Footer = () => {
  const { language } = useLanguage();
  const c = getFooterContent(language);

  return (
    <footer
      className="relative mt-20 border-t border-white/10 backdrop-blur-2xl overflow-hidden"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="neo-blob w-[32rem] h-[32rem] top-[-12rem] left-[-8rem]"
          style={{ backgroundColor: 'rgba(188,19,254,0.25)' }}
        />
        <div
          className="neo-blob w-[28rem] h-[28rem] bottom-[-10rem] right-[-6rem]"
          style={{ backgroundColor: 'rgba(0,243,255,0.25)' }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10 text-[var(--text-primary)]">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-secondary)'
              }}
            >
              <Image
                src="/LOGO.png"
                alt="Alvolo Consulting"
                width={120}
                height={40}
                className="w-24 h-8 object-contain"
              />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wide text-[var(--text-primary)]">{c.company.name}</div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {c.company.title}<br />{c.company.subtitle}
              </p>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{c.company.address}</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/alvoloconsulting?igsh=Z3IzbzBsNGJraWs%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-secondary)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.color = 'var(--neon-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-secondary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/alvolo-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-secondary)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.color = 'var(--neon-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-secondary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-4">{c.corporate.title}</h4>
            <div className="space-y-2 text-sm">
              {c.corporate.links.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <FaCheck className="text-[var(--text-primary)]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-4">{c.services.title}</h4>
            <div className="space-y-2 text-sm">
              {c.services.links.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <FaCheck className="text-[var(--text-primary)]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-2">{c.hours.title}</h4>
            <p className="text-sm text-[var(--text-primary)]">
              <span className="font-semibold">{c.hours.weekday}</span><br />
              {c.hours.time}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">{c.hours.closed}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center text-xs text-[var(--text-secondary)] space-y-2">
          <div className="font-semibold text-[var(--text-primary)]">{c.copyright}</div>
          <div className="max-w-4xl mx-auto">{c.disclaimer}</div>
          <div>{c.reserved}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;