export const locales = ['en', 'tr', 'it'] as const;
export type Locale = (typeof locales)[number];

export interface TranslationType {
  nav: {
    home: string;
    services: string;
    about: string;
    pricing: string;
    contact: string;
    blog: string;
    announcements: string;
    portal: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroBadge1: string;
    heroBadge2: string;
    heroCta: string;
    philosophyTitle: string;
    philosophyPoints: string[];
    philosophyCta: string;
    deckVault: string;
    deckTitle: string;
    deckSubtitle: string;
    deckCards: Array<{ title: string; footer: string }>;
    contactTitle: string;
    contactSubtitle: string;
    contactCta: string;
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
  };
  ticker: {
    items: string[];
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    startupCorridor: {
      label: string;
      title: string;
      description: string;
      button: string;
    };
    integrationTitle: string;
    financialTitle: string;
    viewAll: string;
    integrationServices: Array<{ title: string; description: string }>;
    financialServices: Array<{ title: string; description: string }>;
  };
  expansion: {
    left: {
      direction: string;
      title: string;
      body: string;
      cta: string;
    };
    right: {
      direction: string;
      title: string;
      body: string;
      cta: string;
    };
  };
  methodology: {
    label: string;
    title: string;
    subtitle: string;
    explore: string;
    steps: Array<{
      num: string;
      title: string;
      description: string;
    }>;
  };
  about: {
    label: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    valuesTitle: string;
    values: string[];
    successRateStat: string;
    happyClientsStat: string;
    teamTitle: string;
    viewMore: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formNameLabel: string;
    formEmailLabel: string;
    formInterestLabel: string;
    formMessageLabel: string;
    formSubmitButton: string;
    formSendingButton: string;
    successTitle: string;
    successMessage: string;
    sendViaEmail: string;
    proposeTimeslots: string;
    interestOptions: {
      italy: string;
      turkey: string;
      tax: string;
    };
    privacyCheckbox1: string;
    privacyCheckbox2: string;
    phoneTitle: string;
    phoneDetails: string;
    whatsappDetails: string;
    emailTitle: string;
    emailDetails: string;
    addressTitle: string;
    addressDetails: string;
    hoursTitle: string;
    hoursDetails: string;
    getInTouch: string;
    contactInfo: string;
    followUs: string;
  };
  footer: {
    companyName: string;
    companyTitle: string;
    companySubtitle: string;
    companyAddress: string;
    corporateTitle: string;
    corporateLinks: Array<{ label: string; href: string }>;
    servicesTitle: string;
    servicesLinks: Array<{ label: string; href: string }>;
    hoursTitle: string;
    hoursWeekday: string;
    hoursTime: string;
    hoursClosed: string;
    disclaimer: string;
    reserved: string;
    cta: string;
    button: string;
    linkedin: string;
    instagram: string;
    email: string;
  };
  pricing: {
    label: string;
    title: string;
    subtitle: string;
    packages: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
      popular?: boolean;
    }>;
  };
  trustedCompanies: {
    title: string;
    subtitle: string;
  };
}

export const translations: Record<Locale, TranslationType> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      pricing: 'Pricing',
      contact: 'Contact',
      blog: 'Blog',
      announcements: 'News',
      portal: 'Portal',
    },
    home: {
      heroTitle: 'ALVOLO',
      heroSubtitle: 'Swiss watchmaking precision engineered for sovereign data flows.',
      heroBadge1: 'Alvolo Consulting',
      heroBadge2: 'Luxury Data Exclusivity',
      heroCta: 'Access remains curated. Signal by invitation only.',
      philosophyTitle: 'THE ALVOLO PHILOSOPHY',
      philosophyPoints: [
        'Precision-first intelligence.',
        'Systems that anticipate.',
        'Scale without exposure.',
      ],
      philosophyCta: 'Explore Methodology',
      deckVault: 'The Vault',
      deckTitle: 'Secured channels, glassed in platinum optics.',
      deckSubtitle: 'Private intelligence modules engineered for sovereign data flows.',
      deckCards: [
        { title: 'PREDICTIVE INTEL', footer: 'STATUS: OPTIMIZED // LATENCY: 4ms' },
        { title: 'ALGORITHMIC SCALE', footer: 'STATUS: ACTIVE // NODES: 1200' },
        { title: 'GLOBAL NEXUS', footer: 'STATUS: LINKED // ROUTES: 88' },
        { title: 'SIGNAL HELIX', footer: 'STATUS: CALIBRATED // FLOW: 9.2' },
        { title: 'VAULT PULSE', footer: 'STATUS: SYNCED // VAULT: LOCKED' },
      ],
      contactTitle: 'SIGNAL RECEIVED.',
      contactSubtitle: 'Access to Alvolo private channels is by verification only. Initiate the protocol to begin calibration.',
      contactCta: 'Initialize Contact',
    },
    hero: {
      title1: 'Cross-Border',
      title2: 'Scale Engineering.',
      subtitle: "We don't just advise. We architect your expansion. A data-driven financial bridge for SMEs and Professionals moving between Italy and Turkey.",
      cta1: 'Analyze Your Potential',
      cta2: 'View Methodology',
      stat1Value: '€50M+',
      stat1Label: 'Trade Volume Analyzed',
      stat2Value: '100%',
      stat2Label: 'Bocconi Alumni Team',
    },
    ticker: {
      items: ['FINANCIAL CONSULTING', 'ITALY EXPANSION', 'INTEGRATION SOLUTIONS', 'TAX OPTIMIZATION', 'RESIDENCE PERMITS', 'COMPANY FORMATION'],
    },
    services: {
      label: '01 // SERVICES',
      title: 'Our Service Areas',
      subtitle: 'Comprehensive, data-driven solutions for every stage of your growth journey.',
      startupCorridor: {
        label: 'New Strategic Pillar',
        title: 'The Turkey-Italy Startup Corridor',
        description: 'The definitive data-driven bridge between Turkish and Italian innovation ecosystems. A standardized, repeatable, and data-driven expansion engine.',
        button: 'Explore the Corridor',
      },
      integrationTitle: 'Integration Services',
      financialTitle: 'Financial Consultancy',
      viewAll: 'View All Services',
      integrationServices: [
        { title: 'Scholarship Application Consultancy', description: 'Guidance in application processes for university and other institutional scholarships.' },
        { title: 'Residence Permit (Permesso di Soggiorno)', description: 'Obtaining the necessary permits to legally reside in Italy.' },
        { title: 'Accommodation Consultancy', description: 'Finding student dormitories, rental apartments, and other accommodation options.' },
        { title: 'Welcome and Orientation', description: 'Welcome upon your arrival in Italy and support for adapting to your new life.' },
        { title: 'University Enrollment Procedures', description: 'Management of application and enrollment processes for Italian universities.' },
        { title: 'Student Visa Consultancy', description: 'Guidance in visa application processes for studying in Italy.' },
        { title: 'Bureaucratic Procedures Support', description: 'Assistance with official procedures such as Codice Fiscale, health insurance.' },
      ],
      financialServices: [
        { title: 'Company Formation and Legal Processes', description: 'Company formation in Italy, legal processes, and choosing the right company type.' },
        { title: 'Financial Planning and Budget Management', description: 'Comprehensive financial planning and budget management for your business.' },
        { title: 'Tax Planning and Compliance', description: 'Tax planning and compliance services in line with Italian regulations.' },
        { title: 'Bank Account Opening and Financial Systems', description: 'Bank account opening and financial system integration for your company.' },
        { title: 'Investment Advisory and Fund Management', description: 'Investment opportunities, fund management, and international finance consulting.' },
        { title: 'Risk Management and Insurance Planning', description: 'Risk management and insurance planning for your business.' },
        { title: 'Ongoing Financial Consulting and Reporting', description: 'Continuous financial consulting and reporting support for the first year and beyond.' },
      ],
    },
    expansion: {
      left: {
        direction: 'DIRECTION: WEST',
        title: 'Expand to Italy',
        body: 'P.IVA, fiscal rep, and Milan network orchestration for Turkish SMEs.',
        cta: 'Start Italian Entry',
      },
      right: {
        direction: 'DIRECTION: EAST',
        title: 'Scale in Turkey',
        body: 'Manufacturing partnerships and cost optimization for Italian firms.',
        cta: 'Start Turkish Expansion',
      },
    },
    methodology: {
      label: 'OUR APPROACH',
      title: 'Methodology',
      subtitle: 'A systematic approach to delivering data-driven solutions that bridge cutting-edge analytics with real-world financial decision-making.',
      explore: 'Explore Full Methodology',
      steps: [
        { num: '01', title: 'Discovery', description: 'Deep-dive into your business context, data landscape, and objectives through structured consultations.' },
        { num: '02', title: 'Architecture', description: 'Design technical specifications, data pipelines, and model architectures tailored to your requirements.' },
        { num: '03', title: 'Development', description: 'Iterative building with regular checkpoints, ensuring alignment with business goals throughout.' },
        { num: '04', title: 'Deployment', description: 'Production-ready delivery with documentation, training, and ongoing support options.' },
      ],
    },
    about: {
      label: 'THE TEAM',
      title: 'About Us',
      paragraph1: 'As Alvolo Consulting, we offer comprehensive consulting services to individuals who want to study or start a new life in Italy.',
      paragraph2: 'Our expert team guides you through complex bureaucratic processes and helps you take all necessary steps to achieve your dreams.',
      paragraph3: 'Prioritizing customer satisfaction, we facilitate your Italian adventure with personalized solutions.',
      valuesTitle: 'Our Values',
      values: ['Transparency and Honesty', 'Expertise and Professionalism', 'Personalized Approach', 'Reliability', 'Continuous Support'],
      successRateStat: 'Success Rate',
      happyClientsStat: 'Happy Clients',
      teamTitle: 'Meet Our Team',
      viewMore: 'View Full Profile',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Contact us for integration solutions and financial consultancy services for doing business and living in Italy.',
      formNameLabel: 'Full Name',
      formEmailLabel: 'Email',
      formInterestLabel: 'Interest',
      formMessageLabel: 'Your Message',
      formSubmitButton: 'Request Analysis',
      formSendingButton: 'Processing...',
      successTitle: 'Profile Generated',
      successMessage: 'Data modeled. Choose your next step:',
      sendViaEmail: 'Send via Email App',
      proposeTimeslots: 'Propose 3 Different Timeslots',
      interestOptions: {
        italy: 'Expansion to Italy',
        turkey: 'Expansion to Turkey',
        tax: 'Tax Optimization',
      },
      privacyCheckbox1: 'I authorize the processing of my personal data in accordance with EU Regulation No. 679/2016',
      privacyCheckbox2: 'I authorize the processing of data for marketing purposes',
      phoneTitle: 'Phone',
      phoneDetails: '+39 348 170 5207',
      whatsappDetails: 'WhatsApp: +39 348 170 5207',
      emailTitle: 'Email',
      emailDetails: 'info@alvoloconsulting.com',
      addressTitle: 'Address',
      addressDetails: 'Via Valsugana, 20139 Milano (MI), Italy',
      hoursTitle: 'Business Hours',
      hoursDetails: 'Monday - Friday: 09:00 - 18:00',
      getInTouch: 'Get In Touch',
      contactInfo: 'Contact Information',
      followUs: 'Follow Us',
    },
    footer: {
      companyName: 'ALVOLO CONSULTING',
      companyTitle: 'Financial Consultancy & Italy Integration Solutions',
      companySubtitle: 'Chamber of Certified Public Accountants',
      companyAddress: 'Via Valsugana 6, 20139 Milan, Italy',
      corporateTitle: 'Corporate',
      corporateLinks: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ],
      servicesTitle: 'Services',
      servicesLinks: [
        { label: 'Pricing', href: '/pricing' },
      ],
      hoursTitle: 'Working Hours',
      hoursWeekday: 'Monday – Friday',
      hoursTime: '09:00 – 18:00',
      hoursClosed: 'Closed on Saturday and Sunday.',
      disclaimer: 'All content on this website may not be copied, reproduced, distributed, or used on other platforms without written permission. The site content is for informational purposes only and does not constitute professional financial consulting.',
      reserved: '© 2024 – All Rights Reserved.',
      cta: 'START NOW',
      button: 'Initiate Protocol',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      email: 'Email',
    },
    pricing: {
      label: 'PRICING',
      title: 'Integration Packages',
      subtitle: 'Choose the package that best fits your needs for moving to Italy.',
      packages: [
        {
          name: 'Essential',
          price: '€299',
          description: 'Basic support for your Italian journey',
          features: ['Codice Fiscale assistance', 'Basic document preparation', 'Email support', 'FAQ access'],
          cta: 'Get Started',
        },
        {
          name: 'Professional',
          price: '€599',
          description: 'Comprehensive support for professionals',
          features: ['Everything in Essential', 'Residence permit support', 'Accommodation search', 'Priority support', 'Video consultations'],
          cta: 'Get Started',
          popular: true,
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          description: 'Full-service for businesses',
          features: ['Everything in Professional', 'Company formation', 'Tax planning', 'Dedicated account manager', 'On-site support'],
          cta: 'Contact Us',
        },
      ],
    },
    trustedCompanies: {
      title: 'Trusted By',
      subtitle: 'Our partners and affiliations',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      services: 'Hizmetler',
      about: 'Hakkımızda',
      pricing: 'Fiyatlandırma',
      contact: 'İletişim',
      blog: 'Blog',
      announcements: 'Duyurular',
      portal: 'Portal',
    },
    home: {
      heroTitle: 'ALVOLO',
      heroSubtitle: 'Egemen veri akışları için tasarlanmış İsviçre saat işçiliği hassasiyeti.',
      heroBadge1: 'Alvolo Danışmanlık',
      heroBadge2: 'Lüks Veri Ayrıcalığı',
      heroCta: 'Erişim küratörlü kalır. Sinyal sadece davetiye ile.',
      philosophyTitle: 'ALVOLO FELSEFESİ',
      philosophyPoints: [
        'Hassasiyet öncelikli istihbarat.',
        'Öngören sistemler.',
        'Maruz kalmadan ölçeklenme.',
      ],
      philosophyCta: 'Metodolojiyi Keşfet',
      deckVault: 'Kasa',
      deckTitle: 'Güvenli kanallar, platin optiklerle camlanmış.',
      deckSubtitle: 'Egemen veri akışları için tasarlanmış özel istihbarat modülleri.',
      deckCards: [
        { title: 'ÖNGÖRÜSEL İSTİHBARAT', footer: 'DURUM: OPTİMİZE // GECİKME: 4ms' },
        { title: 'ALGORİTMİK ÖLÇEK', footer: 'DURUM: AKTİF // DÜĞÜMLER: 1200' },
        { title: 'KÜRESEL BAĞLANTI', footer: 'DURUM: BAĞLI // ROTALAR: 88' },
        { title: 'SİNYAL SARMALI', footer: 'DURUM: KALİBRE // AKIŞ: 9.2' },
        { title: 'KASA NABZI', footer: 'DURUM: SENKRONİZE // KASA: KİLİTLİ' },
      ],
      contactTitle: 'SİNYAL ALINDI.',
      contactSubtitle: 'Alvolo özel kanallarına erişim sadece doğrulama ile mümkündür. Kalibrasyonu başlatmak için protokolü başlatın.',
      contactCta: 'İletişimi Başlat',
    },
    hero: {
      title1: 'Sınır Ötesi',
      title2: 'Ölçek Mühendisliği.',
      subtitle: 'Sadece tavsiye vermiyoruz. Büyümenizi tasarlıyoruz. İtalya ve Türkiye arasında hareket eden KOBİ\'ler ve profesyoneller için veri odaklı finansal köprü.',
      cta1: 'Potansiyelinizi Analiz Edin',
      cta2: 'Metodolojiyi Görüntüle',
      stat1Value: '€50M+',
      stat1Label: 'Analiz Edilen Ticaret Hacmi',
      stat2Value: '100%',
      stat2Label: 'Bocconi Mezunu Ekip',
    },
    ticker: {
      items: ['FİNANSAL DANIŞMANLIK', 'İTALYA GENİŞLEME', 'ENTEGRASYON ÇÖZÜMLERİ', 'VERGİ OPTİMİZASYONU', 'OTURUM İZNİ', 'ŞİRKET KURULUŞU'],
    },
    services: {
      label: '01 // HİZMETLER',
      title: 'Hizmet Alanlarımız',
      subtitle: 'Büyüme yolculuğunuzun her aşaması için kapsamlı, veri odaklı çözümler.',
      startupCorridor: {
        label: 'Yeni Stratejik Sütun',
        title: 'Türkiye-İtalya Startup Koridoru',
        description: 'Türk ve İtalyan inovasyon ekosistemleri arasındaki kesin veri odaklı köprü. Standartlaştırılmış, tekrarlanabilir ve veri odaklı bir genişleme motoru.',
        button: 'Koridoru Keşfet',
      },
      integrationTitle: 'Entegrasyon Hizmetleri',
      financialTitle: 'Finansal Danışmanlık',
      viewAll: 'Tüm Hizmetleri Görüntüle',
      integrationServices: [
        { title: 'Burs Başvurusu Danışmanlığı', description: 'Üniversite ve diğer kurumların burslarına başvuru süreçlerinde rehberlik hizmeti.' },
        { title: 'Oturum İzni (Permesso di Soggiorno)', description: 'İtalya\'da yasal olarak ikamet etmek için gerekli izinlerin alınması konusunda destek.' },
        { title: 'Konaklama Danışmanlığı', description: 'Öğrenci yurtları, kiralık daireler ve diğer konaklama seçeneklerinin bulunması.' },
        { title: 'Karşılama ve Oryantasyon', description: 'İtalya\'ya varışınızda karşılama ve yeni yaşamınıza adaptasyon desteği.' },
        { title: 'Üniversite Kayıt İşlemleri', description: 'İtalyan üniversitelerine başvuru ve kayıt süreçlerinin yönetimi.' },
        { title: 'Öğrenci Vizesi Danışmanlığı', description: 'İtalya\'da eğitim almak için gerekli vize başvuru süreçlerinde rehberlik.' },
        { title: 'Bürokratik İşlemler Desteği', description: 'Codice Fiscale, sağlık sigortası gibi resmi işlemlerinizde yardım.' },
      ],
      financialServices: [
        { title: 'Şirket Kuruluşu ve Yasal Süreçler', description: 'İtalya\'da şirket kuruluşu, yasal süreçler ve uygun şirket türü seçimi.' },
        { title: 'Finansal Planlama ve Bütçe Yönetimi', description: 'İşletmeniz için kapsamlı finansal planlama ve bütçe yönetimi hizmetleri.' },
        { title: 'Vergi Planlaması ve Uyumluluk', description: 'İtalyan vergi mevzuatına uygun vergi planlaması ve uyumluluk hizmetleri.' },
        { title: 'Banka Hesabı Açılışı ve Finansal Sistemler', description: 'Şirketiniz için banka hesabı açılışı ve finansal sistem entegrasyonu.' },
        { title: 'Yatırım Danışmanlığı ve Fon Yönetimi', description: 'Yatırım fırsatları, fon yönetimi ve uluslararası finans danışmanlığı.' },
        { title: 'Risk Yönetimi ve Sigorta Planlaması', description: 'İşletmeniz için risk yönetimi ve sigorta planlaması hizmetleri.' },
        { title: 'Sürekli Finansal Danışmanlık ve Raporlama', description: 'İlk yıl ve sonrasında sürekli finansal danışmanlık ve raporlama desteği.' },
      ],
    },
    expansion: {
      left: {
        direction: 'YÖN: BATI',
        title: 'İtalya\'ya Açılın',
        body: 'Türk KOBİ\'leri için P.IVA, mali temsilcilik ve Milano ağı yönetimi.',
        cta: 'İtalya Girişi Başlat',
      },
      right: {
        direction: 'YÖN: DOĞU',
        title: 'Türkiye\'de Ölçeklendirin',
        body: 'İtalyan firmaları için üretim ortaklıkları ve maliyet optimizasyonu.',
        cta: 'Türkiye Genişlemesini Başlat',
      },
    },
    methodology: {
      label: 'YAKLAŞIMIMIZ',
      title: 'Metodoloji',
      subtitle: 'İleri düzey analitikleri gerçek dünya finansal karar alma süreçleriyle birleştiren veri odaklı çözümler sunmaya yönelik sistematik bir yaklaşım.',
      explore: 'Tam Metodolojiyi Keşfedin',
      steps: [
        { num: '01', title: 'Keşif', description: 'Yapılandırılmış danışmanlıklar aracılığıyla iş bağlamınıza, veri ortamınıza ve hedeflerinize derinlemesine analiz.' },
        { num: '02', title: 'Mimari', description: 'Gereksinimlerinize uygun teknik spesifikasyonlar, veri pipeline\'ları ve model mimarileri tasarımı.' },
        { num: '03', title: 'Geliştirme', description: 'Düzenli kontrol noktalarıyla yinelemeli geliştirme, süreç boyunca iş hedefleriyle uyum sağlama.' },
        { num: '04', title: 'Dağıtım', description: 'Dokümantasyon, eğitim ve sürekli destek seçenekleriyle üretime hazır teslimat.' },
      ],
    },
    about: {
      label: 'EKİP',
      title: 'Hakkımızda',
      paragraph1: 'Alvolo Consulting olarak, İtalya\'da eğitim almak veya yeni bir yaşama başlamak isteyen bireylere kapsamlı danışmanlık hizmetleri sunuyoruz.',
      paragraph2: 'Uzman ekibimiz, karmaşık bürokratik süreçlerde size rehberlik ederken, hayallerinize ulaşmanız için gerekli tüm adımları atmanıza yardımcı olur.',
      paragraph3: 'Müşteri memnuniyetini ön planda tutarak, kişiye özel çözümlerle İtalya maceranızı kolaylaştırıyoruz.',
      valuesTitle: 'Değerlerimiz',
      values: ['Şeffaflık ve Dürüstlük', 'Uzmanlık ve Profesyonellik', 'Kişiye Özel Yaklaşım', 'Güvenilirlik', 'Sürekli Destek'],
      successRateStat: 'Başarı Oranı',
      happyClientsStat: 'Mutlu Müşteri',
      teamTitle: 'Ekibimizle Tanışın',
      viewMore: 'Tam Profili Görüntüle',
    },
    contact: {
      title: 'İletişim',
      subtitle: 'İtalya\'da iş ve yaşam için entegrasyon çözümleri ve finansal danışmanlık hizmetlerimiz hakkında bize ulaşın.',
      formNameLabel: 'Ad Soyad',
      formEmailLabel: 'E-posta',
      formInterestLabel: 'İlgi Alanı',
      formMessageLabel: 'Mesajınız',
      formSubmitButton: 'Analiz İste',
      formSendingButton: 'İşleniyor...',
      successTitle: 'Profil Oluşturuldu',
      successMessage: 'Veri modellendi. Sonraki adımınızı seçin:',
      sendViaEmail: 'E-posta Uygulaması ile Gönder',
      proposeTimeslots: '3 Farklı Zaman Dilimi Öner',
      interestOptions: {
        italy: 'İtalya\'ya Genişleme',
        turkey: 'Türkiye\'ye Genişleme',
        tax: 'Vergi Optimizasyonu',
      },
      privacyCheckbox1: 'Kişisel verilerimin AB 679/2016 sayılı Tüzük uyarınca işlenmesine izin veriyorum.',
      privacyCheckbox2: 'Pazarlama amaçlarıyla veri işlenmesine izin veriyorum.',
      phoneTitle: 'Telefon',
      phoneDetails: '+39 348 170 5207',
      whatsappDetails: 'WhatsApp: +39 348 170 5207',
      emailTitle: 'E-posta',
      emailDetails: 'info@alvoloconsulting.com',
      addressTitle: 'Adres',
      addressDetails: 'Via Valsugana, 20139 Milano (MI), İtalya',
      hoursTitle: 'Çalışma Saatleri',
      hoursDetails: 'Pazartesi - Cuma: 09:00 - 18:00',
      getInTouch: 'Bizimle İletişime Geçin',
      contactInfo: 'İletişim Bilgileri',
      followUs: 'Bizi Takip Edin',
    },
    footer: {
      companyName: 'ALVOLO CONSULTING',
      companyTitle: 'Finansal Danışmanlık ve İtalya Entegrasyon Çözümleri',
      companySubtitle: 'Yeminli Mali Müşavirler Odası',
      companyAddress: 'Via Valsugana 6, 20139 Milano, İtalya',
      corporateTitle: 'Kurumsal',
      corporateLinks: [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hakkımızda', href: '/about' },
        { label: 'Hizmetler', href: '/services' },
        { label: 'İletişim', href: '/contact' },
      ],
      servicesTitle: 'Hizmetler',
      servicesLinks: [
        { label: 'Fiyatlandırma', href: '/pricing' },
      ],
      hoursTitle: 'Çalışma Saatleri',
      hoursWeekday: 'Pazartesi – Cuma',
      hoursTime: '09:00 – 18:00',
      hoursClosed: 'Cumartesi ve Pazar günleri kapalıyız.',
      disclaimer: 'Bu web sitesinde yer alan tüm içerikler, yazılı izin alınmadıkça kopyalanamaz, çoğaltılamaz, dağıtılamaz veya başka platformlarda kullanılamaz. Site içeriği yalnızca bilgilendirme amaçlıdır ve profesyonel mali danışmanlık hizmeti yerine geçmez.',
      reserved: '© 2024 – Tüm Hakları Saklıdır.',
      cta: 'ŞİMDİ BAŞLA',
      button: 'Protokolü Başlat',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      email: 'E-posta',
    },
    pricing: {
      label: 'FİYATLANDIRMA',
      title: 'Entegrasyon Paketleri',
      subtitle: 'İtalya\'ya taşınma ihtiyaçlarınıza en uygun paketi seçin.',
      packages: [
        {
          name: 'Temel',
          price: '€299',
          description: 'İtalya yolculuğunuz için temel destek',
          features: ['Codice Fiscale yardımı', 'Temel belge hazırlığı', 'E-posta desteği', 'SSS erişimi'],
          cta: 'Başla',
        },
        {
          name: 'Profesyonel',
          price: '€599',
          description: 'Profesyoneller için kapsamlı destek',
          features: ['Temel paketteki her şey', 'Oturum izni desteği', 'Konaklama arama', 'Öncelikli destek', 'Video görüşmeleri'],
          cta: 'Başla',
          popular: true,
        },
        {
          name: 'Kurumsal',
          price: 'Özel',
          description: 'İşletmeler için tam hizmet',
          features: ['Profesyonel paketteki her şey', 'Şirket kurulumu', 'Vergi planlaması', 'Özel hesap yöneticisi', 'Yerinde destek'],
          cta: 'Bize Ulaşın',
        },
      ],
    },
    trustedCompanies: {
      title: 'Güvendiğimiz',
      subtitle: 'Ortaklarımız ve bağlantılarımız',
    },
  },
  it: {
    nav: {
      home: 'Home',
      services: 'Servizi',
      about: 'Chi Siamo',
      pricing: 'Prezzi',
      contact: 'Contatti',
      blog: 'Blog',
      announcements: 'Annunci',
      portal: 'Portale',
    },
    home: {
      heroTitle: 'ALVOLO',
      heroSubtitle: 'Precisione svizzera ingegnerizzata per flussi di dati sovrani.',
      heroBadge1: 'Alvolo Consulting',
      heroBadge2: 'Esclusività Dati Lusso',
      heroCta: 'L\'accesso rimane curato. Segnale solo su invito.',
      philosophyTitle: 'LA FILOSOFIA ALVOLO',
      philosophyPoints: [
        'Intelligence prima della precisione.',
        'Sistemi che anticipano.',
        'Scalare senza esposizione.',
      ],
      philosophyCta: 'Esplora Metodologia',
      deckVault: 'Il Caveau',
      deckTitle: 'Canali sicuri, vetrati in ottica platino.',
      deckSubtitle: 'Moduli di intelligence privata ingegnerizzati per flussi di dati sovrani.',
      deckCards: [
        { title: 'INTEL PREDITTIVA', footer: 'STATO: OTTIMIZZATO // LATENZA: 4ms' },
        { title: 'SCALA ALGORITMICA', footer: 'STATO: ATTIVO // NODI: 1200' },
        { title: 'NESSO GLOBALE', footer: 'STATO: COLLEGATO // ROTTE: 88' },
        { title: 'ELICA DEL SEGNALE', footer: 'STATO: CALIBRATO // FLUSSO: 9.2' },
        { title: 'IMPULSO CAVEAU', footer: 'STATO: SINCRONIZZATO // CAVEAU: BLOCCATO' },
      ],
      contactTitle: 'SEGNALE RICEVUTO.',
      contactSubtitle: 'L\'accesso ai canali privati Alvolo è solo tramite verifica. Avvia il protocollo per iniziare la calibrazione.',
      contactCta: 'Inizializza Contatto',
    },
    hero: {
      title1: 'Scala Transfrontaliera',
      title2: 'Ingegneria.',
      subtitle: 'Non solo consigliamo. Architettiamo la tua espansione. Un ponte finanziario basato sui dati per PMI e professionisti che si muovono tra Italia e Turchia.',
      cta1: 'Analizza il Tuo Potenziale',
      cta2: 'Visualizza Metodologia',
      stat1Value: '€50M+',
      stat1Label: 'Volume Commerciale Analizzato',
      stat2Value: '100%',
      stat2Label: 'Team Alumni Bocconi',
    },
    ticker: {
      items: ['CONSULENZA FINANZIARIA', 'ESPANSIONE ITALIA', 'SOLUZIONI DI INTEGRAZIONE', 'OTTIMIZZAZIONE FISCALE', 'PERMESSO DI SOGGIORNO', 'COSTITUZIONE AZIENDALE'],
    },
    services: {
      label: '01 // SERVIZI',
      title: 'Le Nostre Aree di Servizio',
      subtitle: 'Soluzioni complete e basate sui dati per ogni fase del tuo percorso di crescita.',
      startupCorridor: {
        label: 'Nuovo Pilastro Strategico',
        title: 'Il Corridoio Startup Turchia-Italia',
        description: "Il ponte definitivo basato sui dati tra gli ecosistemi dell'innovazione turco e italiano. Un motore di espansione standardizzato, ripetibile e guidato dai dati.",
        button: 'Esplora il Corridoio',
      },
      integrationTitle: 'Servizi di Integrazione',
      financialTitle: 'Consulenza Finanziaria',
      viewAll: 'Vedi Tutti i Servizi',
      integrationServices: [
        { title: 'Consulenza per la Domanda di Borsa di Studio', description: 'Guida nei processi di candidatura per borse di studio universitarie e di altre istituzioni.' },
        { title: 'Permesso di Soggiorno', description: 'Ottenimento dei permessi necessari per risiedere legalmente in Italia.' },
        { title: 'Consulenza Alloggiativa', description: 'Ricerca di dormitori per studenti, appartamenti in affitto e altre opzioni di alloggio.' },
        { title: 'Accoglienza e Orientamento', description: 'Accoglienza al vostro arrivo in Italia e supporto per l\'adattamento alla vostra nuova vita.' },
        { title: 'Procedure di Iscrizione Universitaria', description: 'Gestione dei processi di candidatura e iscrizione alle università italiane.' },
        { title: 'Consulenza Visto Studentesco', description: 'Guida nei processi di richiesta del visto per studiare in Italia.' },
        { title: 'Supporto Procedure Burocratiche', description: 'Assistenza nelle procedure ufficiali come Codice Fiscale, assicurazione sanitaria.' },
      ],
      financialServices: [
        { title: 'Costituzione Aziendale e Processi Legali', description: 'Costituzione aziendale in Italia, processi legali e scelta della tipologia societaria più adatta.' },
        { title: 'Pianificazione Finanziaria e Gestione del Budget', description: 'Pianificazione finanziaria completa e gestione del budget per la tua azienda.' },
        { title: 'Pianificazione Fiscale e Conformità', description: 'Servizi di pianificazione fiscale e conformità secondo la normativa italiana.' },
        { title: 'Apertura Conto Bancario e Sistemi Finanziari', description: 'Apertura conto bancario e integrazione dei sistemi finanziari per la tua azienda.' },
        { title: 'Consulenza sugli Investimenti e Gestione dei Fondi', description: 'Opportunità di investimento, gestione dei fondi e consulenza finanziaria internazionale.' },
        { title: 'Gestione del Rischio e Pianificazione Assicurativa', description: 'Gestione del rischio e pianificazione assicurativa per la tua azienda.' },
        { title: 'Consulenza Finanziaria Continua e Reportistica', description: 'Consulenza finanziaria continua e supporto alla reportistica per il primo anno e oltre.' },
      ],
    },
    expansion: {
      left: {
        direction: 'DIREZIONE: OVEST',
        title: 'Espandi in Italia',
        body: 'P.IVA, rappresentanza fiscale e rete milanese per le PMI turche.',
        cta: 'Avvia Ingresso in Italia',
      },
      right: {
        direction: 'DIREZIONE: EST',
        title: 'Scala in Turchia',
        body: 'Partnership produttive e ottimizzazione costi per aziende italiane.',
        cta: 'Avvia Espansione in Turchia',
      },
    },
    methodology: {
      label: 'IL NOSTRO APPROCCIO',
      title: 'Metodologia',
      subtitle: 'Un approccio sistematico per fornire soluzioni data-driven che collegano analisi all\'avanguardia con il processo decisionale finanziario reale.',
      explore: 'Esplora Metodologia Completa',
      steps: [
        { num: '01', title: 'Discovery', description: 'Deep-dive nel tuo contesto aziendale, panorama dati e obiettivi attraverso consultazioni strutturate.' },
        { num: '02', title: 'Architettura', description: 'Design di specifiche tecniche, pipeline dati e architetture modello su misura per i tuoi requisiti.' },
        { num: '03', title: 'Sviluppo', description: 'Costruzione iterativa con checkpoint regolari, garantendo allineamento con gli obiettivi di business.' },
        { num: '04', title: 'Deployment', description: 'Consegna production-ready con documentazione, formazione e opzioni di supporto continuo.' },
      ],
    },
    about: {
      label: 'IL TEAM',
      title: 'Chi Siamo',
      paragraph1: 'Come Alvolo Consulenza, offriamo servizi di consulenza completi a persone che desiderano studiare o iniziare una nuova vita in Italia.',
      paragraph2: 'Il nostro team esperto ti guida attraverso complessi processi burocratici e ti aiuta a compiere tutti i passi necessari per realizzare i tuoi sogni.',
      paragraph3: 'Dando priorità alla soddisfazione del cliente, facilitiamo la tua avventura italiana con soluzioni personalizzate.',
      valuesTitle: 'I Nostri Valori',
      values: ['Trasparenza e Onestà', 'Competenza e Professionalità', 'Approccio Personalizzato', 'Affidabilità', 'Supporto Continuo'],
      successRateStat: 'Tasso di Successo',
      happyClientsStat: 'Clienti Soddisfatti',
      teamTitle: 'Incontra il Nostro Team',
      viewMore: 'Vedi Profilo Completo',
    },
    contact: {
      title: 'Contatti',
      subtitle: 'Contattaci per soluzioni di integrazione e consulenza finanziaria per vivere e fare business in Italia.',
      formNameLabel: 'Nome Cognome',
      formEmailLabel: 'Email',
      formInterestLabel: 'Interesse',
      formMessageLabel: 'Il Tuo Messaggio',
      formSubmitButton: 'Richiedi Analisi',
      formSendingButton: 'Elaborazione...',
      successTitle: 'Profilo Generato',
      successMessage: 'Dati modellati. Scegli il tuo prossimo passo:',
      sendViaEmail: 'Invia tramite App Email',
      proposeTimeslots: 'Proponi 3 Fasce Orarie Diverse',
      interestOptions: {
        italy: 'Espansione in Italia',
        turkey: 'Espansione in Turchia',
        tax: 'Ottimizzazione Fiscale',
      },
      privacyCheckbox1: 'Autorizzo il trattamento dei miei dati personali in base al Regolamento UE n. 679/2016',
      privacyCheckbox2: 'Autorizzo al trattamento dei dati per finalità di marketing',
      phoneTitle: 'Telefono',
      phoneDetails: '+39 348 170 5207',
      whatsappDetails: 'WhatsApp: +39 348 170 5207',
      emailTitle: 'Email',
      emailDetails: 'info@alvoloconsulting.com',
      addressTitle: 'Indirizzo',
      addressDetails: 'Via Valsugana, 20139 Milano (MI), Italia',
      hoursTitle: 'Orari di Lavoro',
      hoursDetails: 'Lunedì - Venerdì: 09:00 - 18:00',
      getInTouch: 'Mettiti in Contatto',
      contactInfo: 'Informazioni di Contatto',
      followUs: 'Seguici',
    },
    footer: {
      companyName: 'ALVOLO CONSULTING',
      companyTitle: 'Consulenza Finanziaria & Soluzioni di Integrazione Italia',
      companySubtitle: 'Camera dei Commercialisti Certificati',
      companyAddress: 'Via Valsugana 6, 20139 Milan, Italy',
      corporateTitle: 'Società',
      corporateLinks: [
        { label: 'Pagina Iniziale', href: '/' },
        { label: 'Chi Siamo', href: '/about' },
        { label: 'Servizi', href: '/services' },
        { label: 'Contatto', href: '/contact' },
      ],
      servicesTitle: 'Servizi',
      servicesLinks: [
        { label: 'Prezzi', href: '/pricing' },
      ],
      hoursTitle: 'Orari di Lavoro',
      hoursWeekday: 'Lunedì – Venerdì',
      hoursTime: '09:00 – 18:00',
      hoursClosed: 'Chiuso il sabato e la domenica.',
      disclaimer: 'Tutti i contenuti di questo sito web non possono essere copiati, riprodotti, distribuiti o utilizzati su altre piattaforme senza autorizzazione scritta. Il contenuto del sito è solo a scopo informativo e non costituisce consulenza finanziaria professionale.',
      reserved: '© 2024 – Tutti i diritti riservati.',
      cta: 'INIZIA ORA',
      button: 'Avvia Protocollo',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      email: 'Email',
    },
    pricing: {
      label: 'PREZZI',
      title: 'Pacchetti di Integrazione',
      subtitle: 'Scegli il pacchetto più adatto alle tue esigenze per trasferirti in Italia.',
      packages: [
        {
          name: 'Essenziale',
          price: '€299',
          description: 'Supporto base per il tuo viaggio in Italia',
          features: ['Assistenza Codice Fiscale', 'Preparazione documenti base', 'Supporto email', 'Accesso FAQ'],
          cta: 'Inizia',
        },
        {
          name: 'Professionale',
          price: '€599',
          description: 'Supporto completo per professionisti',
          features: ['Tutto in Essenziale', 'Supporto permesso di soggiorno', 'Ricerca alloggio', 'Supporto prioritario', 'Videochiamate'],
          cta: 'Inizia',
          popular: true,
        },
        {
          name: 'Enterprise',
          price: 'Personalizzato',
          description: 'Servizio completo per aziende',
          features: ['Tutto in Professionale', 'Costituzione aziendale', 'Pianificazione fiscale', 'Account manager dedicato', 'Supporto in loco'],
          cta: 'Contattaci',
        },
      ],
    },
    trustedCompanies: {
      title: 'Di Fiducia',
      subtitle: 'I nostri partner e affiliazioni',
    },
  },
};

export function getTranslation(locale: Locale): TranslationType {
  return translations[locale] || translations.en;
}

