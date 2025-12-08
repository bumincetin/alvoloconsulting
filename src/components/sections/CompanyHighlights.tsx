'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const getCompanyHighlightsContent = (lang: string) => {
  const content = {
    tr: {
      title: "Neden Alvolo Danışmanlık?",
      subtitle: "İtalya'da başarılı olmak için ihtiyacınız olan her şey",
      highlights: [
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ),
          number: "50+",
          label: "Mutlu Müşteri",
          description: "İtalya'da başarıyla yerleşen ve iş kuran müşterilerimiz"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          ),
          number: "5",
          label: "Ülke",
          description: "Farklı ülkelerden gelen müşterilerimize hizmet veriyoruz"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
            </svg>
          ),
          number: "98%",
          label: "Başarı Oranı",
          description: "Vize başvurularında elde ettiğimiz başarı oranı"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          ),
          number: "24/7",
          label: "Destek",
          description: "Sürekli müşteri desteği ve danışmanlık hizmeti"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
          ),
          number: "€2M+",
          label: "Yatırım",
          description: "Müşterilerimizin İtalya'da yaptığı toplam yatırım"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          ),
          number: "5",
          label: "Yıl Deneyim",
          description: "İtalya'da iş ve göçmenlik alanında uzmanlık"
        }
      ],
      ctaText: "Hikayenizi Başlatın",
      ctaSubtext: "Ücretsiz danışmanlık için bizimle iletişime geçin"
    },
    en: {
      title: "Why Alvolo Consulting?",
      subtitle: "Everything you need to succeed in Italy",
      highlights: [
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ),
          number: "50+",
          label: "Happy Clients",
          description: "Successfully settled and established businesses in Italy"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          ),
          number: "5",
          label: "Countries",
          description: "Serving clients from different countries worldwide"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
            </svg>
          ),
          number: "98%",
          label: "Success Rate",
          description: "Success rate in visa applications"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          ),
          number: "24/7",
          label: "Support",
          description: "Continuous customer support and consulting services"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
          ),
          number: "€2M+",
          label: "Investment",
          description: "Total investment made by our clients in Italy"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          ),
          number: "5",
          label: "Years Experience",
          description: "Expertise in business and immigration in Italy"
        }
      ],
      ctaText: "Start Your Story",
      ctaSubtext: "Contact us for free consultation"
    },
    it: {
      title: "Perché Alvolo Consulenza?",
      subtitle: "Tutto quello che ti serve per avere successo in Italia",
      highlights: [
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ),
          number: "50+",
          label: "Clienti Felici",
          description: "Successfully settled and established businesses in Italy"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          ),
          number: "5",
          label: "Paesi",
          description: "Serviamo clienti da diversi paesi in tutto il mondo"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
            </svg>
          ),
          number: "98%",
          label: "Tasso di Successo",
          description: "Tasso di successo nelle domande di visto"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          ),
          number: "24/7",
          label: "Supporto",
          description: "Supporto clienti continuo e servizi di consulenza"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
          ),
          number: "€2M+",
          label: "Investimento",
          description: "Investimento totale fatto dai nostri clienti in Italia"
        },
        {
          icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          ),
          number: "5",
          label: "Anni di Esperienza",
          description: "Esperienza in business e immigrazione in Italia"
        }
      ],
      ctaText: "Inizia la Tua Storia",
      ctaSubtext: "Contattaci per una consulenza gratuita"
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const CompanyHighlights = () => {
  const { language } = useLanguage();
  const c = getCompanyHighlightsContent(language);

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {c.title}
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {c.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {c.highlights.map((highlight, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f58643] to-[#d97335] rounded-full mb-6 shadow-lg">
                <div className="text-white">
                  {highlight.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {highlight.number}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {highlight.label}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="glass-panel rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {c.ctaText}
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              {c.ctaSubtext}
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#f58643] to-[#d97335] text-white rounded-lg hover:from-[#d97335] hover:to-[#f58643] transition duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
            >
              Ücretsiz Danışmanlık Al
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHighlights; 