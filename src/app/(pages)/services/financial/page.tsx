'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import { FaCheck, FaChevronDown, FaBuilding, FaChartLine, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

const getFinancialContent = (lang: string) => {
  const content = {
    tr: {
      title: "İtalya'da İş Yapmak İçin Finansal Danışmanlık",
      subtitle: "İtalya'da iş kurmanız ve büyümeniz için kapsamlı finansal çözümler sunuyoruz.",
      cta: "Ücretsiz Danışmanlık Alın",
      trust: {
        title: "Neden Bizi Seçmelisiniz?",
        description: "20 yılı aşkın deneyimimiz ve uzman ekibimizle İtalya'da iş yapmanın tüm finansal zorluklarını çözüyoruz.",
        items: [
          {
            icon: 'building',
            title: "Yerel Uzmanlık",
            description: "İtalya'nın finansal ve yasal sistemine hakim uzman ekibimizle yanınızdayız."
          },
          {
            icon: 'chart',
            title: "Stratejik Planlama",
            description: "İşletmenizin büyüme hedeflerine ulaşması için özel finansal stratejiler geliştiriyoruz."
          },
          {
            icon: 'handshake',
            title: "Kişiselleştirilmiş Çözümler",
            description: "Her işletmenin ihtiyaçlarına özel finansal danışmanlık hizmetleri sunuyoruz."
          },
          {
            icon: 'shield',
            title: "Güvenilir Ortaklık",
            description: "Uzun vadeli iş ilişkileri kurarak sürdürülebilir başarı sağlıyoruz."
          }
        ]
      },
      plans: {
        title: "Finansal Danışmanlık Paketlerimiz",
        description: "İşletmenizin ihtiyaçlarına uygun, kapsamlı finansal danışmanlık paketlerimiz.",
        items: [
          {
            title: "Başlangıç Paketi",
            price: "€2,500",
            items: [
              "Şirket kurulumu ve yasal süreçler",
              "Finansal planlama ve bütçe yönetimi",
              "Vergi planlaması ve uyumluluk",
              "Banka hesabı açılışı ve finansal sistemler",
              "İlk yıl finansal danışmanlık"
            ]
          },
          {
            title: "Genişleme Paketi",
            price: "€3,500",
            items: [
              "Pazar analizi ve stratejik planlama",
              "Yatırım danışmanlığı ve fon yönetimi",
              "Uluslararası ticaret ve finans",
              "Risk yönetimi ve sigorta planlaması",
              "Sürekli finansal danışmanlık ve destek"
            ]
          }
        ],
        cta: "Detaylı Bilgi Alın"
      },
      faq: {
        title: "Sık Sorulan Sorular",
        questions: [
          {
            q: "İtalya'da şirket kurmak için ne kadar süre gerekiyor?",
            a: "Şirket türüne ve büyüklüğüne  bağlı olarak, kurulum süreci genellikle 2-4 hafta sürer. Tüm süreç boyunca size rehberlik ediyoruz."
          },
          {
            q: "Hangi finansal raporlama standartlarını kullanıyoruz?",
            a: "İtalyan şirketleri hem IFRS hem de İtalyan muhasebe standartlarına (OIC) uyumlu raporlama yapmalıdır. Size her iki standarda da uygun çözümler sunuyoruz."
          },
          {
            q: "Vergi planlaması ve uyumluluk konusunda nasıl yardımcı oluyorsunuz?",
            a: "Şirketinizin İtalya'daki vergi yükümlülüklerini eksiksiz yerine getirmenizi sağlarken, aynı zamanda yasal çerçevede maksimum vergi avantajlarından faydalanmanıza yardımcı oluyoruz. Kapsamlı hizmetimiz; stratejik vergi planlaması, beyannamelerin hazırlanması, denetim süreçlerine hazırlık ve sürekli mevzuat takibi gibi başlıkları içerir. Böylece hem mali riskleri en aza indirir hem de işletmenizin finansal verimliliğini artırırız."
          },
          {
            q: "İtalya'da şirket kurmak için minimum sermaye gereksinimleri nelerdir?",
            a: "Limited şirketler için minimum sermaye €10,000, anonim şirketler için €50,000'dir. Ancak, bazı özel durumlarda bu gereksinimler değişebilir. Size en uygun yapıyı belirlemenize yardımcı oluyoruz."
          },
          {
            q: "Yabancı yatırımcılar için özel teşvikler var mı?",
            a: "Evet, İtalya'da yabancı yatırımcılar için çeşitli teşvikler mevcuttur. Bunlar arasında vergi kredileri, bölgesel teşvikler ve araştırma-geliştirme destekleri bulunmaktadır. Size uygun teşvikleri belirlemenize yardımcı oluyoruz."
          },
          {
            q: "İtalya'da banka hesabı açmak için ne gerekiyor?",
            a: "İtalyan bankalarında hesap açmak için şirket belgeleri, kimlik doğrulama ve iş planı gereklidir. Size banka seçimi ve hesap açma sürecinde rehberlik ediyoruz."
          },
          {
            q: "Çalışan istihdamı ve SGK süreçleri nasıl işliyor?",
            a: "İtalya'da yasalara uygun şekilde çalışan istihdam edebilmek için doğru sözleşme türlerinin hazırlanması ve sosyal güvenlik kurumuna (INPS) eksiksiz kayıt yapılması zorunludur. Bu süreçte, işe alım öncesi danışmanlıktan başlayarak iş sözleşmelerinin hazırlanması, işe giriş bildirimleri ve SGK (INPS) kayıt işlemleri dahil olmak üzere tüm adımlarda size rehberlik ediyoruz. Böylece hem yasal uyumu sağlıyor hem de işveren yükümlülüklerinizi sorunsuz şekilde yerine getirmenize yardımcı oluyoruz."

          },
          {
            q: "İtalya'da şirket kurulumu için hangi belgeler gerekiyor?",
            a: "Temel olarak kimlik belgeleri, adres kanıtı, iş planı ve sermaye kanıtı gereklidir. Yabancı belgelerin apostil onayı gerekebilir. Size gerekli tüm belgelerin hazırlanmasında yardımcı oluyoruz."
          }
        ]
      },
      ctaSection: {
        title: "İtalya'da İş Fırsatlarını Keşfedin",
        description: "Uzman ekibimizle ücretsiz danışmanlık alın ve İtalya'da iş yapmanın avantajlarını keşfedin.",
        button: "Hemen İletişime Geçin"
      }
    },
    en: {
      title: "Financial Consultancy for Doing Business in Italy",
      subtitle: "Comprehensive financial solutions for establishing and growing your business in Italy.",
      cta: "Get Free Consultation",
      trust: {
        title: "Why Choose Us?",
        description: "With over 20 years of experience and our expert team, we solve all financial challenges of doing business in Italy.",
        items: [
          {
            icon: 'building',
            title: "Local Expertise",
            description: "We're here with our expert team that masters Italy's financial and legal system."
          },
          {
            icon: 'chart',
            title: "Strategic Planning",
            description: "We develop custom financial strategies to help your business achieve its growth goals."
          },
          {
            icon: 'handshake',
            title: "Personalized Solutions",
            description: "We provide financial consulting services tailored to each business's needs."
          },
          {
            icon: 'shield',
            title: "Trusted Partnership",
            description: "We ensure sustainable success by building long-term business relationships."
          }
        ]
      },
      plans: {
        title: "Our Financial Consulting Packages",
        description: "Comprehensive financial consulting packages tailored to your business needs.",
        items: [
          {
            title: "Startup Package",
            price: "€2,500",
            items: [
              "Company formation and legal processes",
              "Financial planning and budget management",
              "Tax planning and compliance",
              "Bank account opening and financial systems",
              "First-year financial consulting"
            ]
          },
          {
            title: "Expansion Package",
            price: "€3,500",
            items: [
              "Market analysis and strategic planning",
              "Investment advisory and fund management",
              "International trade and finance",
              "Risk management and insurance planning",
              "Ongoing financial consulting and support"
            ]
          }
        ],
        cta: "Get More Information"
      },
      faq: {
        title: "Frequently Asked Questions",
        questions: [
          {
            q: "How long does it take to set up a company in Italy?",
            a: "Depending on the company type and size, the setup process typically takes 2-4 weeks. We guide you through the entire process."
          },
          {
            q: "Which financial reporting standards do we use?",
            a: "Italian companies must report in compliance with both IFRS and Italian accounting standards (OIC). We provide solutions that meet both standards."
          },
          {
            q: "How do you help with tax planning and compliance?",
            a: "We help you to fully fulfill your company's tax obligations in Italy, while also benefiting from maximum tax advantages within the legal framework. Our comprehensive service includes strategic tax planning, preparation of declarations, preparation for audit processes and continuous legislative monitoring. In this way, we both minimize financial risks and increase the financial efficiency of your business."
          },
          {
            q: "What are the minimum capital requirements for setting up a company in Italy?",
            a: "The minimum capital requirement is €10,000 for limited companies and €50,000 for joint-stock companies. However, these requirements may vary in special cases. We help you determine the most suitable structure."
          },
          {
            q: "Are there special incentives for foreign investors?",
            a: "Yes, Italy offers various incentives for foreign investors, including tax credits, regional incentives, and R&D support. We help you identify and apply for relevant incentives."
          },
          {
            q: "What is needed to open a bank account in Italy?",
            a: "Opening a bank account in Italy requires company documents, identity verification, and a business plan. We guide you through bank selection and account opening processes."
          },
          {
            q: "How does employee hiring and social security work?",
            a: "In order to employ employees in accordance with the law in Italy, it is mandatory to prepare the right types of contracts and to register completely with the social security institution (INPS). In this process, we guide you through all the steps, starting from pre-employment consultancy, to the preparation of employment contracts, job entry notifications and SSI (INPS) registration procedures. In this way, we ensure both legal compliance and help you fulfill your employer obligations without any problems."
          },
          {
            q: "What documents are needed for company formation in Italy?",
            a: "Basic requirements include identity documents, proof of address, business plan, and capital proof. Foreign documents may need apostille certification. We help you prepare all necessary documents."
          }
        ]
      },
      ctaSection: {
        title: "Discover Business Opportunities in Italy",
        description: "Get a free consultation with our expert team and discover the advantages of doing business in Italy.",
        button: "Contact Us Now"
      }
    },
    it: {
      title: "Consulenza Finanziaria per Fare Affari in Italia",
      subtitle: "Soluzioni finanziarie complete per stabilire e far crescere la tua attività in Italia.",
      cta: "Ottieni una Consulenza Gratuita",
      trust: {
        title: "Perché Sceglierci?",
        description: "Con oltre 20 anni di esperienza e il nostro team di esperti, risolviamo tutte le sfide finanziarie del fare affari in Italia.",
        items: [
          {
            icon: 'building',
            title: "Competenza Locale",
            description: "Siamo qui con il nostro team di esperti che padroneggia il sistema finanziario e legale italiano."
          },
          {
            icon: 'chart',
            title: "Pianificazione Strategica",
            description: "Sviluppiamo strategie finanziarie personalizzate per aiutare la tua azienda a raggiungere i suoi obiettivi di crescita."
          },
          {
            icon: 'handshake',
            title: "Soluzioni Personalizzate",
            description: "Forniamo servizi di consulenza finanziaria su misura per le esigenze di ogni azienda."
          },
          {
            icon: 'shield',
            title: "Partnership Affidabile",
            description: "Garantiamo il successo sostenibile costruendo relazioni commerciali a lungo termine."
          }
        ]
      },
      plans: {
        title: "I Nostri Pacchetti di Consulenza Finanziaria",
        description: "Pacchetti di consulenza finanziaria completi su misura per le tue esigenze aziendali.",
        items: [
          {
            title: "Pacchetto Startup",
            price: "€2,500",
            items: [
              "Costituzione aziendale e processi legali",
              "Pianificazione finanziaria e gestione del budget",
              "Pianificazione fiscale e conformità",
              "Apertura conto bancario e sistemi finanziari",
              "Consulenza finanziaria del primo anno"
            ]
          },
          {
            title: "Pacchetto Espansione",
            price: "€3,500",
            items: [
              "Analisi di mercato e pianificazione strategica",
              "Consulenza sugli investimenti e gestione dei fondi",
              "Commercio internazionale e finanza",
              "Gestione del rischio e pianificazione assicurativa",
              "Consulenza finanziaria continua e supporto"
            ]
          }
        ],
        cta: "Ottieni Maggiori Informazioni"
      },
      faq: {
        title: "Domande Frequenti",
        questions: [
          {
            q: "Quanto tempo ci vuole per costituire un'azienda in Italia?",
            a: "A seconda del tipo e della grandezza dell'azienda, il processo di costituzione richiede tipicamente 2-4 settimane. Ti guidiamo attraverso l'intero processo."
          },
          {
            q: "Quali standard di rendicontazione finanziaria utilizziamo?",
            a: "Le aziende italiane devono rendicontare in conformità sia con gli IFRS che con gli standard contabili italiani (OIC). Forniamo soluzioni che soddisfano entrambi gli standard."
          },
          {
            q: "Come aiutate nella pianificazione fiscale e nella conformità?",
            a: "Aiutiamo a far rispettare le tue responsabilità fiscali in Italia, mentre ti aiutiamo a beneficiare al massimo dei vantaggi fiscali disponibili all'interno del quadro giuridico. I nostri servizi completi includono pianificazione fiscale strategica, la preparazione delle dichiarazioni, la preparazione per i processi di controllo e il monitoraggio costante della normativa. In questo modo, riduciamo al minimo i rischi finanziari e aumentiamo l'efficienza finanziaria della tua azienda."
          },
          {
            q: "Quali sono i requisiti di capitale minimo per costituire un'azienda in Italia?",
            a: "Il capitale minimo richiesto è di €10.000 per le società a responsabilità limitata e €50.000 per le società per azioni. Tuttavia, questi requisiti possono variare in casi speciali. Ti aiutiamo a determinare la struttura più adatta."
          },
          {
            q: "Ci sono incentivi speciali per gli investitori stranieri?",
            a: "Sì, l'Italia offre vari incentivi per gli investitori stranieri, inclusi crediti d'imposta, incentivi regionali e supporto per R&S. Ti aiutiamo a identificare e richiedere gli incentivi pertinenti."
          },
          {
            q: "Cosa serve per aprire un conto bancario in Italia?",
            a: "L'apertura di un conto bancario in Italia richiede documenti aziendali, verifica dell'identità e un business plan. Ti guidiamo attraverso i processi di selezione della banca e apertura del conto."
          },
          {
            q: "Come funziona l'assunzione di dipendenti e la previdenza sociale?",
            a: "In Italia, per assumere dipendenti in conformità con la legge, è obbligatorio predisporre i contratti di lavoro corretti e registrarsi completamente presso l'INPS. In questo processo, vi guidiamo in tutte le fasi, dalla consulenza pre-assunzione alla redazione dei contratti di lavoro, dalle notifiche di assunzione alle procedure di iscrizione all'INPS. In questo modo, garantiamo la conformità legale e vi aiutiamo ad adempiere ai vostri obblighi datoriali senza problemi."
          },
          {
            q: "Quali documenti sono necessari per la costituzione di un'azienda in Italia?",
            a: "I requisiti di base includono documenti di identità, prova dell'indirizzo, business plan e prova del capitale. I documenti stranieri potrebbero richiedere la certificazione apostille. Ti aiutiamo a preparare tutti i documenti necessari."
          }
        ]
      },
      ctaSection: {
        title: "Scopri le Opportunità di Business in Italia",
        description: "Ottieni una consulenza gratuita con il nostro team di esperti e scopri i vantaggi di fare affari in Italia.",
        button: "Contattaci Ora"
      }
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const FinancialPage = () => {
  const { language } = useLanguage();
  const c = getFinancialContent(language);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="absolute inset-0 bg-grid z-0 opacity-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[var(--brand-blue)]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-4 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                <Link href="/services" className="hover:underline" style={{ color: 'var(--brand-orange)' }}>Services</Link>
                <span className="mx-2" style={{ color: 'var(--text-muted)' }}>/</span>
                <span style={{ color: 'var(--text-secondary)' }}>Financial Consultancy</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                {c.title}
              </h1>
              <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
                {c.subtitle}
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md transition-colors duration-200"
                  style={{ backgroundColor: 'var(--brand-orange)', color: '#ffffff', border: '1px solid var(--border-primary)' }}
                >
                  {c.cta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-surface)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {c.trust.title}
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {c.trust.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {c.trust.items.map((item, index) => (
                <div key={index} className="glass-panel rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
                  <div className="text-3xl mb-4" style={{ color: 'var(--brand-orange)' }}>
                    {item.icon === 'building' && <FaBuilding />}
                    {item.icon === 'chart' && <FaChartLine />}
                    {item.icon === 'handshake' && <FaHandshake />}
                    {item.icon === 'shield' && <FaShieldAlt />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Plans Section */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {c.plans.title}
              </h2>
              <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {c.plans.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {c.plans.items.map((plan, index) => (
                <div key={index} className="glass-panel rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-secondary)' }}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {plan.title}
                    </h3>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <FaCheck className="mt-1 mr-3 flex-shrink-0" style={{ color: 'var(--brand-orange)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {index === 0 && (
                    <Link 
                      href="/services/financial/consulting/startup"
                      className="block w-full text-center px-6 py-3 font-medium rounded-md transition-colors duration-200"
                      style={{ border: '1px solid var(--brand-orange)', color: 'var(--brand-orange)' }}
                    >
                      {c.plans.cta}
                    </Link>
                  )}
                  {index === 1 && (
                    <Link 
                      href="/services/financial/consulting/expansion"
                      className="block w-full text-center px-6 py-3 font-medium rounded-md transition-colors duration-200"
                      style={{ border: '1px solid var(--brand-orange)', color: 'var(--brand-orange)' }}
                    >
                      {c.plans.cta}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-surface)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {c.faq.title}
              </h2>
            </div>
            <div className="space-y-4">
              {c.faq.questions.map((item, index) => (
                <div key={index} className="rounded-lg overflow-hidden transition-colors duration-200" style={{ border: '1px solid var(--border-secondary)', backgroundColor: 'var(--bg-surface-hover)' }}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-200"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {item.q}
                    </h3>
                    <FaChevronDown 
                      className={`transition-transform duration-200 ${
                        openFaqs.includes(index) ? 'transform rotate-180' : ''
                      }`}
                      style={{ color: 'var(--brand-orange)' }}
                    />
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-200 ${
                      openFaqs.includes(index) ? 'max-h-96 pb-4' : 'max-h-0'
                    }`}
                  >
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass-panel rounded-2xl p-10" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              {c.ctaSection.title}
            </h2>
            <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              {c.ctaSection.description}
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md transition-colors duration-200"
              style={{ backgroundColor: 'var(--brand-orange)', color: '#ffffff', border: '1px solid var(--border-primary)' }}
            >
              {c.ctaSection.button}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default FinancialPage; 