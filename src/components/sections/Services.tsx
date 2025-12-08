"use client"; // Make sure client component if not already

import { FaCalculator, FaFileInvoiceDollar, FaHandshake, FaBalanceScale, FaBook, FaUniversity, FaPassport, FaChartLine, FaBuilding, FaShieldAlt } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getServicesSectionContent = (lang: string) => {
  const content = {
    tr: {
      title: "Hizmet Alanlarımız",
      subtitle: "İtalya'da iş, yaşam, entegrasyon ve finansal danışmanlık ihtiyaçlarınız için kapsamlı çözümler sunuyoruz.",
      integrationTitle: "Entegrasyon Çözümleri",
      financialTitle: "Finansal Danışmanlık",
      integrationServices: [
        { icon: FaCalculator, title: "Burs Başvurusu Danışmanlığı", description: "Üniversite ve diğer kurumların burslarına başvuru süreçlerinde rehberlik." },
        { icon: FaFileInvoiceDollar, title: "Oturum İzni (Permesso di Soggiorno)", description: "İtalya'da yasal olarak ikamet etmek için gerekli izinlerin alınması." },
        { icon: FaBook, title: "Konaklama Danışmanlığı", description: "Öğrenci yurtları, kiralık daireler ve diğer konaklama seçenekleri bulma." },
        { icon: FaHandshake, title: "Karşılama ve Oryantasyon", description: "İtalya'ya varışınızda karşılama ve yeni yaşamınıza adaptasyon desteği." },
        { icon: FaUniversity, title: "Üniversite Kayıt İşlemleri", description: "İtalyan üniversitelerine başvuru ve kayıt süreçlerinin yönetimi." },
        { icon: FaPassport, title: "Öğrenci Vizesi Danışmanlığı", description: "İtalya'da eğitim almak için gerekli vize başvuru süreçlerinde rehberlik." },
        { icon: FaBalanceScale, title: "Bürokratik İşlemler Desteği", description: "Codice fiscale, sağlık sigortası gibi resmi işlemlerinizde yardım." },
      ],
      financialServices: [
        { icon: FaBuilding, title: "Şirket Kuruluşu ve Yasal Süreçler", description: "İtalya'da şirket kuruluşu, yasal süreçler ve uygun şirket türü seçimi." },
        { icon: FaChartLine, title: "Finansal Planlama ve Bütçe Yönetimi", description: "İşletmeniz için kapsamlı finansal planlama ve bütçe yönetimi." },
        { icon: FaBalanceScale, title: "Vergi Planlaması ve Uyumluluk", description: "İtalyan vergi mevzuatına uygun vergi planlaması ve uyumluluk hizmetleri." },
        { icon: FaUniversity, title: "Banka Hesabı Açılışı ve Finansal Sistemler", description: "Şirketiniz için banka hesabı açılışı ve finansal sistem entegrasyonu." },
        { icon: FaHandshake, title: "Yatırım Danışmanlığı ve Fon Yönetimi", description: "Yatırım fırsatları, fon yönetimi ve uluslararası finans danışmanlığı." },
        { icon: FaShieldAlt, title: "Risk Yönetimi ve Sigorta Planlaması", description: "İşletmeniz için risk yönetimi ve sigorta planlaması." },
        { icon: FaHandshake, title: "Sürekli Finansal Danışmanlık ve Raporlama", description: "İlk yıl ve devamında sürekli finansal danışmanlık ve raporlama desteği." },
      ]
    },
    en: {
      title: "Our Service Areas",
      subtitle: "We offer comprehensive integration and financial consultancy solutions for your business and life in Italy.",
      integrationTitle: "Integration Solutions",
      financialTitle: "Financial Consultancy",
      integrationServices: [
        { icon: FaCalculator, title: "Scholarship Application Consultancy", description: "Guidance in application processes for university and other institutional scholarships." },
        { icon: FaFileInvoiceDollar, title: "Residence Permit (Permesso di Soggiorno)", description: "Obtaining the necessary permits to legally reside in Italy." },
        { icon: FaBook, title: "Accommodation Consultancy", description: "Finding student dormitories, rental apartments, and other accommodation options." },
        { icon: FaHandshake, title: "Welcome and Orientation", description: "Welcome upon your arrival in Italy and support for adapting to your new life." },
        { icon: FaUniversity, title: "University Enrollment Procedures", description: "Management of application and enrollment processes for Italian universities." },
        { icon: FaPassport, title: "Student Visa Consultancy", description: "Guidance in visa application processes for studying in Italy." },
        { icon: FaBalanceScale, title: "Bureaucratic Procedures Support", description: "Assistance with official procedures such as Codice Fiscale, health insurance." },
      ],
      financialServices: [
        { icon: FaBuilding, title: "Company Formation and Legal Processes", description: "Company formation in Italy, legal processes, and choosing the right company type." },
        { icon: FaChartLine, title: "Financial Planning and Budget Management", description: "Comprehensive financial planning and budget management for your business." },
        { icon: FaBalanceScale, title: "Tax Planning and Compliance", description: "Tax planning and compliance services in line with Italian regulations." },
        { icon: FaUniversity, title: "Bank Account Opening and Financial Systems", description: "Bank account opening and financial system integration for your company." },
        { icon: FaHandshake, title: "Investment Advisory and Fund Management", description: "Investment opportunities, fund management, and international finance consulting." },
        { icon: FaShieldAlt, title: "Risk Management and Insurance Planning", description: "Risk management and insurance planning for your business." },
        { icon: FaHandshake, title: "Ongoing Financial Consulting and Reporting", description: "Continuous financial consulting and reporting support for the first year and beyond." },
      ]
    },
    it: {
      title: "Le Nostre Aree di Servizio",
      subtitle: "Offriamo soluzioni complete di integrazione e consulenza finanziaria per le vostre esigenze di business e vita in Italia.",
      integrationTitle: "Soluzioni di Integrazione",
      financialTitle: "Consulenza Finanziaria",
      integrationServices: [
        { icon: FaCalculator, title: "Consulenza per la Domanda di Borsa di Studio", description: "Guida nei processi di candidatura per borse di studio universitarie e di altre istituzioni." },
        { icon: FaFileInvoiceDollar, title: "Permesso di Soggiorno", description: "Ottenimento dei permessi necessari per risiedere legalmente in Italia." },
        { icon: FaBook, title: "Consulenza Alloggiativa", description: "Ricerca di dormitori per studenti, appartamenti in affitto e altre opzioni di alloggio." },
        { icon: FaHandshake, title: "Accoglienza e Orientamento", description: "Accoglienza al vostro arrivo in Italia e supporto per l'adattamento alla vostra nuova vita." },
        { icon: FaUniversity, title: "Procedure di Iscrizione Universitaria", description: "Gestione dei processi di candidatura e iscrizione alle università italiane." },
        { icon: FaPassport, title: "Consulenza Visto Studentesco", description: "Guida nei processi di richiesta del visto per studiare in Italia." },
        { icon: FaBalanceScale, title: "Supporto Procedure Burocratiche", description: "Assistenza nelle procedure ufficiali come Codice Fiscale, assicurazione sanitaria." },
      ],
      financialServices: [
        { icon: FaBuilding, title: "Costituzione Aziendale e Processi Legali", description: "Costituzione aziendale in Italia, processi legali e scelta della tipologia societaria più adatta." },
        { icon: FaChartLine, title: "Pianificazione Finanziaria e Gestione del Budget", description: "Pianificazione finanziaria completa e gestione del budget per la tua azienda." },
        { icon: FaBalanceScale, title: "Pianificazione Fiscale e Conformità", description: "Servizi di pianificazione fiscale e conformità secondo la normativa italiana." },
        { icon: FaUniversity, title: "Apertura Conto Bancario e Sistemi Finanziari", description: "Apertura conto bancario e integrazione dei sistemi finanziari per la tua azienda." },
        { icon: FaHandshake, title: "Consulenza sugli Investimenti e Gestione dei Fondi", description: "Opportunità di investimento, gestione dei fondi e consulenza finanziaria internazionale." },
        { icon: FaShieldAlt, title: "Gestione del Rischio e Pianificazione Assicurativa", description: "Gestione del rischio e pianificazione assicurativa per la tua azienda." },
        { icon: FaHandshake, title: "Consulenza Finanziaria Continua e Reportistica", description: "Consulenza finanziaria continua e supporto alla reportistica per il primo anno e oltre." },
      ]
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const Services = () => {
  const { language } = useLanguage();
  const c = getServicesSectionContent(language);
  const [open, setOpen] = useState<'integration' | 'financial' | null>(null);

  const handleToggle = (section: 'integration' | 'financial') => {
    setOpen(prev => (prev === section ? null : section));
  };

  return (
    <section id="services" className="pt-10 pb-20 md:pt-20" style={{backgroundColor: 'var(--bg-primary)'}}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>
            {c.title}
          </h2>
          <p className="text-xl" style={{color: 'var(--text-secondary)'}}>
            {c.subtitle}
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Integration Solutions Dropdown */}
          <div className="rounded-xl glass-panel shadow-lg">
            <button
              className="w-full flex justify-between items-center px-8 py-6 text-2xl font-semibold focus:outline-none transition-colors rounded-t-xl"
              style={{color: 'var(--brand-blue)'}}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => handleToggle('integration')}
              aria-expanded={open === 'integration'}
              aria-controls="integration-services"
            >
              {c.integrationTitle}
              <span className={`ml-4 transition-transform duration-300 ${open === 'integration' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <AnimatePresence initial={false}>
              {open === 'integration' && (
                <motion.div
                  id="integration-services"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden px-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                    {c.integrationServices.map((service, index) => {
                      const ServiceIcon = service.icon;
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <ServiceIcon className="w-10 h-10 flex-shrink-0 mt-1" style={{color: 'var(--brand-orange)'}} />
                          <div>
                            <h3 className="text-lg font-semibold mb-1" style={{color: 'var(--text-primary)'}}>{service.title}</h3>
                            <p className="text-sm" style={{color: 'var(--text-secondary)'}}>{service.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Financial Consultancy Dropdown */}
          <div className="rounded-xl glass-panel shadow-lg">
            <button
              className="w-full flex justify-between items-center px-8 py-6 text-2xl font-semibold focus:outline-none transition-colors rounded-t-xl"
              style={{color: 'var(--brand-blue)'}}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => handleToggle('financial')}
              aria-expanded={open === 'financial'}
              aria-controls="financial-services"
            >
              {c.financialTitle}
              <span className={`ml-4 transition-transform duration-300 ${open === 'financial' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <AnimatePresence initial={false}>
              {open === 'financial' && (
                <motion.div
                  id="financial-services"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden px-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                    {c.financialServices.map((service, index) => {
                      const ServiceIcon = service.icon;
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <ServiceIcon className="w-10 h-10 flex-shrink-0 mt-1" style={{color: 'var(--brand-orange)'}} />
                          <div>
                            <h3 className="text-lg font-semibold mb-1" style={{color: 'var(--text-primary)'}}>{service.title}</h3>
                            <p className="text-sm" style={{color: 'var(--text-secondary)'}}>{service.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 