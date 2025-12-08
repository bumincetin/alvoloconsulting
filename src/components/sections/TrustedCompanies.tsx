'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Company {
  name: string;
  logo: string;
  fallbackLogo: string;
  description: string;
}

const getTrustedCompaniesContent = (lang: string) => {
  const content = {
    tr: {
      title: "Profesyonel Ağımız",
      subtitle: "Bu kurumlardan profesyonellerle çalışıyoruz",
      companies: [
        {
          name: "Bocconi Üniversitesi",
          logo: "/boconoman.png",
          fallbackLogo: "https://via.placeholder.com/128x128/1e40af/ffffff?text=BOCCONI",
          description: "Bocconi Üniversitesi'nden akademisyenler ve uzmanlarla çalışıyoruz"
        },
        {
          name: "Milano Belediyesi",
          logo: "/comune.png",
          fallbackLogo: "https://via.placeholder.com/128x128/059669/ffffff?text=MILANO",
          description: "Milano Belediyesi'nden yetkili kişilerle işbirliği yapıyoruz"
        },
        {
          name: "İtalyan Ticaret Odası",
          logo: "/cameradicommercio.png",
          fallbackLogo: "https://via.placeholder.com/128x128/dc2626/ffffff?text=CHAMBER",
          description: "Ticaret Odası'ndan deneyimli profesyonellerle çalışıyoruz"
        },
        {
          name: "UniCredit Bank",
          logo: "/unicredit.png",
          fallbackLogo: "https://via.placeholder.com/128x128/7c3aed/ffffff?text=UNICREDIT",
          description: "UniCredit Bank'tan finans uzmanlarıyla işbirliği yapıyoruz"
        },
        {
          name: "İtalyan Göçmenlik Bürosu",
          logo: "/vize.jpg",
          fallbackLogo: "https://via.placeholder.com/128x128/ea580c/ffffff?text=IMMIGRATION",
          description: "Göçmenlik Bürosu'ndan yetkili memurlarla çalışıyoruz"
        },
        {
          name: "Milano Teknik Üniversitesi",
          logo: "/polimi.png",
          fallbackLogo: "https://via.placeholder.com/128x128/be185d/ffffff?text=POLITECNICO",
          description: "Politecnico di Milano'dan araştırmacılarla işbirliği yapıyoruz"
        }
      ]
    },
    en: {
      title: "Our Professional Network",
      subtitle: "Working with professionals from these institutions",
      companies: [
        {
          name: "Bocconi University",
          logo: "/boconoman.png",
          fallbackLogo: "https://via.placeholder.com/128x128/1e40af/ffffff?text=BOCCONI",
          description: "Working with academics and experts from Bocconi University"
        },
        {
          name: "Milan Municipality",
          logo: "/comune.png",
          fallbackLogo: "https://via.placeholder.com/128x128/059669/ffffff?text=MILANO",
          description: "Collaborating with authorized personnel from Milan Municipality"
        },
        {
          name: "Italian Chamber of Commerce",
          logo: "/cameradicommercio.png",
          fallbackLogo: "https://via.placeholder.com/128x128/dc2626/ffffff?text=CHAMBER",
          description: "Working with experienced professionals from the Chamber of Commerce"
        },
        {
          name: "UniCredit Bank",
          logo: "/unicredit.png",
          fallbackLogo: "https://via.placeholder.com/128x128/7c3aed/ffffff?text=UNICREDIT",
          description: "Collaborating with financial experts from UniCredit Bank"
        },
        {
          name: "Italian Immigration Office",
          logo: "/vize.jpg",
          fallbackLogo: "https://via.placeholder.com/128x128/ea580c/ffffff?text=IMMIGRATION",
          description: "Working with authorized officers from the Immigration Office"
        },
        {
          name: "Milan Technical University",
          logo: "/polimi.png",
          fallbackLogo: "https://via.placeholder.com/128x128/be185d/ffffff?text=POLITECNICO",
          description: "Collaborating with researchers from Politecnico di Milano"
        }
      ]
    },
    it: {
      title: "La Nostra Rete Professionale",
      subtitle: "Lavoriamo con professionisti di queste istituzioni",
      companies: [
        {
          name: "Università Bocconi",
          logo: "/boconoman.png",
          fallbackLogo: "https://via.placeholder.com/128x128/1e40af/ffffff?text=BOCCONI",
          description: "Lavoriamo con accademici ed esperti dell'Università Bocconi"
        },
        {
          name: "Comune di Milano",
          logo: "/comune.png",
          fallbackLogo: "https://via.placeholder.com/128x128/059669/ffffff?text=MILANO",
          description: "Collaboriamo con personale autorizzato del Comune di Milano"
        },
        {
          name: "Camera di Commercio Italiana",
          logo: "/cameradicommercio.png",
          fallbackLogo: "https://via.placeholder.com/128x128/dc2626/ffffff?text=CHAMBER",
          description: "Lavoriamo con professionisti esperti della Camera di Commercio"
        },
        {
          name: "Banca UniCredit",
          logo: "/unicredit.png",
          fallbackLogo: "https://via.placeholder.com/128x128/7c3aed/ffffff?text=UNICREDIT",
          description: "Collaboriamo con esperti finanziari della Banca UniCredit"
        },
        {
          name: "Ufficio Immigrazione Italiano",
          logo: "/vize.jpg",
          fallbackLogo: "https://via.placeholder.com/128x128/ea580c/ffffff?text=IMMIGRATION",
          description: "Lavoriamo con funzionari autorizzati dell'Ufficio Immigrazione"
        },
        {
          name: "Politecnico di Milano",
          logo: "/polimi.png",
          fallbackLogo: "https://via.placeholder.com/128x128/be185d/ffffff?text=POLITECNICO",
          description: "Collaboriamo con ricercatori del Politecnico di Milano"
        }
      ]
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const CompanyLogo = ({ company, className }: { company: Company; className: string }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={imageError ? company.fallbackLogo : company.logo}
        alt={company.name}
        width={128}
        height={128}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
        priority={true}
      />
    </div>
  );
};

const TrustedCompanies = () => {
  const { language } = useLanguage();
  const c = getTrustedCompaniesContent(language);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === c.companies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [c.companies.length]);

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f58643] to-[#d97335] rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {c.title}
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {c.subtitle}
          </p>
        </div>

        {/* Sliding Showcase */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {c.companies.map((company, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="max-w-4xl mx-auto">
                  <div className="glass-panel rounded-2xl shadow-xl p-12 text-center">
                    <div className="mb-8">
                      <CompanyLogo
                        company={company}
                        className="w-32 h-32 mx-auto object-contain rounded-xl shadow-lg"
                      />
                    </div>
                    <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                      {company.name}
                    </h3>
                    <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {company.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {c.companies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'scale-125' 
                    : ''
                }`}
                style={{backgroundColor: index === currentIndex ? '#f58643' : '#475569'}}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex(prev => prev === 0 ? c.companies.length - 1 : prev - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-panel rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Previous company"
          >
            <svg className="w-6 h-6" style={{color: '#3c77ad'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentIndex(prev => prev === c.companies.length - 1 ? 0 : prev + 1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-100"
            aria-label="Next company"
          >
            <svg className="w-6 h-6" style={{color: '#3c77ad'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Company Grid */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {c.companies.map((company, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                <CompanyLogo
                  company={company}
                  className="w-16 h-16 mx-auto object-contain mb-4"
                />
                <h4 className="text-sm font-semibold leading-tight text-white">
                  {company.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies; 