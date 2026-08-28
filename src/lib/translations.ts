export const locales = ["en", "tr", "it"] as const;
export type Locale = (typeof locales)[number];

/**
 * Inner-page copy that is not owned by a dedicated content module.
 * Home, footer, consultation, brief, corridors, protocol, team and calculator copy
 * live under `src/lib/content/`; SEO titles and descriptions in `src/lib/seo.ts`.
 */
export interface TranslationType {
  nav: {
    contact: string;
    portal: string;
    faq: string;
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
  methodology: {
    label: string;
    title: string;
    subtitle: string;
    steps: Array<{ num: string; title: string; description: string }>;
  };
  about: {
    label: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    philosophyTitle: string;
    philosophyPoints: string[];
    philosophyCta: string;
    valuesTitle: string;
    values: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    contactInfo: string;
    getInTouch: string;
    phoneTitle: string;
    phoneDetails: string;
    emailTitle: string;
    emailDetails: string;
    addressTitle: string;
    addressDetails: string;
    hoursTitle: string;
    hoursDetails: string;
  };
  faq: {
    title: string;
    subtitle: string;
    questions: Array<{ q: string; a: string }>;
  };
  startupCorridorPage: {
    badge: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionP1: string;
    missionP2: string;
    missionHighlight: string;
    frameworkTitle: string;
    frameworkSubtitle: string;
    modules: Array<{ title: string; desc: string }>;
    tiersTitle: string;
    tierLabel: string;
    tierCta: string;
    tiers: Array<{ name: string; duration: string; desc: string }>;
    whyTitle: string;
    whyBody: string;
    whyCta: string;
  };
}

export const translations: Record<Locale, TranslationType> = {
  en: {
    nav: {
      contact: "Contact",
      portal: "Portal",
      faq: "FAQ",
    },
    services: {
      label: "01 // SERVICES",
      title: "Our service areas",
      subtitle: "Incorporation, tax, permits and Turkish sourcing, run by one senior team from the first audit to the first invoice.",
      startupCorridor: {
        label: "Startup programme",
        title: "The Türkiye–Italy Startup Corridor",
        description: "A sequenced programme for founders moving between the Turkish and Italian startup ecosystems: incorporation, tax, compliance and the first customers, in that order.",
        button: "Explore the corridor",
      },
      integrationTitle: "Integration services",
      financialTitle: "Financial consultancy",
      viewAll: "All services",
      integrationServices: [
        { title: "Family reunification and dependants", description: "Ricongiungimento familiare, dependants' permits and school placement for the families of relocating executives." },
        { title: "Residence permit (permesso di soggiorno)", description: "The permit application, Questura appointments and renewals for legal residence in Italy." },
        { title: "Executive housing and relocation", description: "Housing search, lease negotiation and Anagrafe registration for executives and their families moving to Italy." },
        { title: "Arrival and orientation", description: "First appointments, registrations and the practical set-up of daily life in the first weeks in Italy." },
        { title: "Tax residency and impatriate regime", description: "Tax residency planning and the Italian impatriate regime for executives moving from Türkiye." },
        { title: "Work and investor visas", description: "Self-employment, intra-company and investor visa routes, from nulla osta to entry visa and first registrations." },
        { title: "Bureaucratic procedures", description: "Codice Fiscale, SSN health registration and the other filings that come with arrival." },
      ],
      financialServices: [
        { title: "Company formation and legal set-up", description: "S.r.l. or S.p.A. selection, notarial deed, Registro delle Imprese filing and the statutory steps that follow." },
        { title: "Financial planning and budgeting", description: "Budget, cash-flow and financing plans for the new entity, built on the three-year model from the audit phase." },
        { title: "Tax planning and compliance", description: "IRES, IRAP and VAT planning, the filings and the compliance calendar under Italian rules." },
        { title: "Bank accounts and payment set-up", description: "Capital-deposit and operating accounts, the KYC pack and payment rails for the company." },
        { title: "Investment advisory and fund management", description: "Investment screening, fund structuring and cross-border finance advice." },
        { title: "Risk management and insurance", description: "Insurance cover and risk review for the Italian operation." },
        { title: "Ongoing advisory and reporting", description: "Monthly reporting and advisory support through the first year and after." },
      ],
    },
    methodology: {
      label: "OUR APPROACH",
      title: "Methodology",
      subtitle: "How a cross-border mandate runs: one sequenced method from the first regulatory audit to an operating company, with counterparties, timelines and deliverables agreed before the first filing.",
      steps: [
        { num: "01", title: "Audit", description: "We map shareholding, activity and people against Italian and Turkish rules (licensing, immigration, AML, sector requirements) before we draw any structure." },
        { num: "02", title: "Tax architecture", description: "We model entity choice, holding layers and treaty position on effective tax rate, cash repatriation and exit, then sign the structure off with the founders." },
        { num: "03", title: "Formation", description: "We run the notarial deed, registry filings, VAT and PEC in parallel with Codice Fiscale, permits and executive relocation, so the company and its people land on the same date." },
        { num: "04", title: "Onboarding", description: "We contract suppliers, manufacturing partners, banks, payroll and local advisors, then hand them over with a monthly operating cadence." },
      ],
    },
    about: {
      label: "THE TEAM",
      title: "About us",
      paragraph1: "Alvolo Consulting is a cross-border advisory between Italy and Türkiye. Our Bocconi-trained team works from Milano, Roma and Istanbul, taking companies and their executives from the first regulatory audit to an operating entity.",
      paragraph2: "Our advisors sit with you at the notary, the tax office, the Questura and the bank, and sequence each step of the Italian or Turkish set-up so it completes on the planned date.",
      paragraph3: "One senior advisor stays accountable from the first audit to the first invoice, and remains your contact for filings, payroll and the next expansion.",
      philosophyTitle: "How we work",
      philosophyPoints: ["We model the numbers before we file the papers.", "One advisor answers for the whole mandate.", "The corridor stays open after the first invoice."],
      philosophyCta: "See the methodology",
      valuesTitle: "What you can hold us to",
      values: [
        "Scope and fees agreed in writing before work starts",
        "Licensed notaries, commercialisti and immigration counsel on each file",
        "One senior advisor from the first audit to the first invoice",
        "A reply within one business day",
        "Filings, payroll and supplier reviews after the entity is live",
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Reach the partners in Milan, Rome or Istanbul about incorporation, relocation, tax or sourcing.",
      contactInfo: "Contact information",
      getInTouch: "Write to us",
      phoneTitle: "Phone",
      phoneDetails: "+39 348 170 5207",
      emailTitle: "Email",
      emailDetails: "info@alvoloconsulting.com",
      addressTitle: "Address",
      addressDetails: "Via Valsugana 6, 20139 Milano (MI), Italy",
      hoursTitle: "Business hours",
      hoursDetails: "Monday to Friday, 09:00 to 18:00 CET",
    },
    faq: {
      title: "Frequently asked questions",
      subtitle: "Timelines, scope and what a mandate with Alvolo Consulting involves.",
      questions: [
        {
          q: "What makes Alvolo different from a traditional consultancy?",
          a: "Alvolo runs the mandate rather than writing a report about it. Business development, regulatory filings and day-to-day operations follow one sequenced playbook, and a senior advisor stays accountable from the first audit to the first invoice. You get an international team without hiring one.",
        },
        {
          q: "I have a startup in Türkiye. How do I know if I am ready to expand to Italy?",
          a: "Readiness shows in product-market signal more than in revenue. Through the Startup Corridor we validate your ideal customer profile and map the Italian competition before you commit a euro. If the numbers support the timing, we start the incorporation. If they do not, we say so before you spend on a company.",
        },
        {
          q: "Do you handle company formation as well as strategy?",
          a: "Yes. The Company Setup & Compliance module covers entity selection (S.r.l., S.p.A., A.Ş., Ltd. Şti.), tax registration, banking onboarding and the first accounting set-up. Licensed local partners sign the filings, and we coordinate them from one file.",
        },
        {
          q: "How does the Startup Corridor differ from the expansion mandates?",
          a: "The Italy and Türkiye expansion mandates are market-entry programmes for companies that already know where they are going. The Startup Corridor is a six-module programme for founders who need support from market validation through to scaling operations.",
        },
        {
          q: "Do you help with hiring and talent in the target country?",
          a: "Yes. The People & Mobility module coordinates visas and relocation with licensed immigration partners, and sets up local hiring routes and contractor frameworks so you can build the team on either shore.",
        },
        {
          q: "What kind of businesses do you work with?",
          a: "SMEs, scale-ups and professionals moving between Türkiye and Italy: a tech startup looking for European customers, a manufacturer looking for Italian or Turkish suppliers, or an executive relocating for a role. Each has a structured programme.",
        },
        {
          q: "How long does an engagement last?",
          a: "It depends on the tier. Launch delivers entity creation and compliance in 6 to 8 weeks. Grow adds commercial enablement over 3 to 6 months. Scale is a 6 to 12 month embedded partnership with quarterly reviews and executive reporting.",
        },
        {
          q: "Can I test working with Alvolo before committing?",
          a: "Yes. The first discovery call is free: we assess your situation and outline a preliminary roadmap. You commit only once both sides agree the path is clear and the scope is written down.",
        },
      ],
    },
    startupCorridorPage: {
      badge: "Startup programme",
      title: "The Türkiye–Italy Startup Corridor",
      subtitle: "A sequenced programme for founders moving between Türkiye and Italy, run on one repeatable playbook.",
      missionTitle: "Our mission",
      missionP1: "Founders expanding between Türkiye and Italy face incorporation, tax, compliance and go-to-market at the same time, with no single counterparty who owns all four. The corridor closes that gap.",
      missionP2: "Our ambition is to be the",
      missionHighlight: "first full-service TR–IT expansion operator, from incorporation to first customers",
      frameworkTitle: "The six-module expansion framework",
      frameworkSubtitle: "Six modules, each with a named owner and a deliverable, run in the order a company needs them.",
      modules: [
        { title: "Market discovery and entry", desc: "Ideal customer profile validation, competitor mapping and pricing signals, plus a map of potential partners." },
        { title: "Company setup and compliance", desc: "Entity selection (S.r.l./S.p.A. or A.Ş./Ltd. Şti.), tax registrations, accounting set-up and local banking onboarding." },
        { title: "People and mobility", desc: "Visa and relocation coordination, local hiring routes and contractor frameworks for the first team." },
        { title: "Commercial enablement", desc: "Channel partners, reseller agreements and a first-ten-customers plan, with collateral localised for the target market." },
        { title: "Capital and incentives", desc: "Introductions to investors and accelerators, a map of non-dilutive incentives and support on grant applications." },
        { title: "Operate to scale", desc: "KPI instrumentation, OKR coaching and quarterly operations reviews." },
      ],
      tiersTitle: "Three tiers",
      tierLabel: "Tier",
      tierCta: "Get started",
      tiers: [
        { name: "Launch", duration: "6–8 weeks", desc: "Entity creation, core compliance and a light go-to-market plan." },
        { name: "Grow", duration: "3–6 months", desc: "Full compliance, commercial enablement and active hiring support." },
        { name: "Scale", duration: "6–12 months", desc: "An embedded operating cadence, executive reporting and strategic partnerships over the long term." },
      ],
      whyTitle: "Why Alvolo?",
      whyBody: "Alvolo operates the expansion as well as advising on it. Business development, regulatory work and operations sit with one team, which few boutiques in the Türkiye–Italy corridor offer. Each mandate adds notaries, banks, suppliers and investors to a network the next client can use from day one.",
      whyCta: "Book a discovery call",
    },
  },
  tr: {
    nav: {
      contact: "İletişim",
      portal: "Portal",
      faq: "SSS",
    },
    services: {
      label: "01 // HİZMETLER",
      title: "Hizmet alanlarımız",
      subtitle: "Şirket kuruluşu, vergi, izinler ve Türkiye tedariki; ilk denetimden ilk faturaya kadar tek bir kıdemli ekip tarafından yürütülür.",
      startupCorridor: {
        label: "Startup programı",
        title: "Türkiye–İtalya Startup Koridoru",
        description: "Türk ve İtalyan startup ekosistemleri arasında hareket eden kurucular için sıralı bir program: şirket kuruluşu, vergi, uyum ve ilk müşteriler, bu sırayla.",
        button: "Koridoru keşfedin",
      },
      integrationTitle: "Entegrasyon hizmetleri",
      financialTitle: "Finansal danışmanlık",
      viewAll: "Tüm hizmetler",
      integrationServices: [
        { title: "Aile birleşimi ve bağımlı aile üyeleri", description: "Taşınan yöneticilerin aileleri için ricongiungimento familiare, aile üyesi izinleri ve okul yerleştirmesi." },
        { title: "Oturum izni (permesso di soggiorno)", description: "İtalya'da yasal ikamet için izin başvurusu, Questura randevuları ve yenilemeler." },
        { title: "Yönetici konut ve taşınma desteği", description: "İtalya'ya taşınan yöneticiler ve aileleri için konut arayışı, kira müzakeresi ve Anagrafe kaydı." },
        { title: "Varış ve oryantasyon", description: "İtalya'daki ilk haftalarda ilk randevular, kayıtlar ve günlük yaşamın pratik kurulumu." },
        { title: "Vergi mukimliği ve impatriati rejimi", description: "Türkiye'den taşınan yöneticiler için vergi mukimliği planlaması ve İtalyan impatriati rejimi." },
        { title: "Çalışma ve yatırımcı vizeleri", description: "Serbest meslek, şirket içi transfer ve yatırımcı vizesi rotaları; nulla osta'dan giriş vizesine ve ilk kayıtlara kadar." },
        { title: "Bürokratik işlemler", description: "Codice Fiscale, SSN sağlık kaydı ve varışla birlikte gelen diğer başvurular." },
      ],
      financialServices: [
        { title: "Şirket kuruluşu ve hukuki kurulum", description: "S.r.l. ya da S.p.A. seçimi, noter senedi, Registro delle Imprese tescili ve ardından gelen yasal adımlar." },
        { title: "Finansal planlama ve bütçe", description: "Denetim aşamasındaki üç yıllık modele dayanan bütçe, nakit akışı ve finansman planları." },
        { title: "Vergi planlaması ve uyum", description: "İtalyan kurallarına göre IRES, IRAP ve KDV planlaması, beyanlar ve uyum takvimi." },
        { title: "Banka hesapları ve ödeme kurulumu", description: "Sermaye blokaj ve operasyon hesapları, KYC paketi ve şirketin ödeme altyapısı." },
        { title: "Yatırım danışmanlığı ve fon yönetimi", description: "Yatırım taraması, fon yapılandırması ve sınır ötesi finansman danışmanlığı." },
        { title: "Risk yönetimi ve sigorta", description: "İtalya operasyonu için sigorta kapsamı ve risk incelemesi." },
        { title: "Sürekli danışmanlık ve raporlama", description: "İlk yıl ve sonrasında aylık raporlama ve danışmanlık desteği." },
      ],
    },
    methodology: {
      label: "YAKLAŞIMIMIZ",
      title: "Metodoloji",
      subtitle: "Bir sınır ötesi mandat nasıl yürür: ilk düzenleyici denetimden faaliyetteki şirkete kadar tek bir sıralı yöntem; muhataplar, takvim ve çıktılar ilk başvurudan önce netleşir.",
      steps: [
        { num: "01", title: "Denetim", description: "Herhangi bir yapı çizmeden önce ortaklık yapısını, faaliyeti ve kadroyu İtalyan ve Türk kurallarına (lisans, göç, AML, sektör gereklilikleri) göre haritalarız." },
        { num: "02", title: "Vergi mimarisi", description: "Şirket türünü, holding katmanlarını ve anlaşma pozisyonunu efektif vergi oranı, nakit transferi ve çıkış senaryoları üzerinden modeller, ardından yapıyı kurucularla birlikte onaylarız." },
        { num: "03", title: "Kuruluş", description: "Noter senedini, sicil tescilini, KDV ve PEC'i Codice Fiscale, izinler ve yönetici taşınmasıyla paralel yürütürüz; şirket ve insanları aynı tarihte yerleşir." },
        { num: "04", title: "Entegrasyon", description: "Tedarikçileri, üretim ortaklarını, bankaları, bordroyu ve yerel danışmanları sözleşmeye bağlar, ardından aylık bir operasyon ritmiyle devrederiz." },
      ],
    },
    about: {
      label: "EKİP",
      title: "Hakkımızda",
      paragraph1: "Alvolo Consulting, İtalya ile Türkiye arasında çalışan bir sınır ötesi danışmanlık firmasıdır. Bocconi eğitimli ekibimiz Milano, Roma ve İstanbul'dan çalışır; şirketleri ve yöneticilerini ilk düzenleyici denetimden faaliyetteki şirkete kadar taşır.",
      paragraph2: "Danışmanlarımız noterde, vergi dairesinde, Questura'da ve bankada yanınızda oturur; İtalya ya da Türkiye kurulumunuzun her adımını planlanan tarihte tamamlanacak şekilde sıralar.",
      paragraph3: "İlk denetimden ilk faturaya kadar tek bir kıdemli danışman sorumluluğu üstlenir; beyanlar, bordro ve bir sonraki genişleme için de muhatabınız olmaya devam eder.",
      philosophyTitle: "Nasıl çalışıyoruz",
      philosophyPoints: ["Evrakı vermeden önce rakamları modelleriz.", "Mandatın tamamından tek bir danışman sorumludur.", "Koridor ilk faturadan sonra da açık kalır."],
      philosophyCta: "Metodolojiyi görün",
      valuesTitle: "Bizden bekleyebilecekleriniz",
      values: [
        "Çalışma başlamadan önce yazılı olarak kararlaştırılmış kapsam ve ücret",
        "Her dosyada lisanslı noter, commercialista ve göçmenlik danışmanı",
        "İlk denetimden ilk faturaya kadar tek bir kıdemli danışman",
        "Bir iş günü içinde yanıt",
        "Şirket faaliyete geçtikten sonra beyanlar, bordro ve tedarikçi incelemeleri",
      ],
    },
    contact: {
      title: "İletişim",
      subtitle: "Şirket kuruluşu, taşınma, vergi ya da tedarik için Milano, Roma ya da İstanbul'daki ortaklara ulaşın.",
      contactInfo: "İletişim bilgileri",
      getInTouch: "Bize yazın",
      phoneTitle: "Telefon",
      phoneDetails: "+39 348 170 5207",
      emailTitle: "E-posta",
      emailDetails: "info@alvoloconsulting.com",
      addressTitle: "Adres",
      addressDetails: "Via Valsugana 6, 20139 Milano (MI), İtalya",
      hoursTitle: "Çalışma saatleri",
      hoursDetails: "Pazartesi–Cuma, 09:00–18:00 CET",
    },
    faq: {
      title: "Sıkça sorulan sorular",
      subtitle: "Süreler, kapsam ve Alvolo Consulting ile bir mandatın neleri içerdiği.",
      questions: [
        {
          q: "Alvolo'yu geleneksel bir danışmanlık firmasından farklı kılan nedir?",
          a: "Alvolo mandat hakkında rapor yazmak yerine mandatı yürütür. İş geliştirme, mevzuat başvuruları ve günlük operasyonlar tek bir sıralı yol haritasını izler; ilk denetimden ilk faturaya kadar kıdemli bir danışman sorumludur. İşe alım yapmadan uluslararası bir ekip edinirsiniz.",
        },
        {
          q: "Türkiye'de bir startup'ım var. İtalya'ya açılmaya hazır olduğumu nasıl anlarım?",
          a: "Hazırlık, gelirden çok ürün-pazar sinyalinde görünür. Startup Koridoru'nda tek bir euro harcamadan önce ideal müşteri profilinizi doğrular ve İtalya'daki rekabeti haritalarız. Rakamlar zamanlamayı destekliyorsa kuruluşa başlarız. Desteklemiyorsa bunu bir şirkete harcama yapmadan önce söyleriz.",
        },
        {
          q: "Stratejinin yanı sıra şirket kuruluşunu da üstleniyor musunuz?",
          a: "Evet. Şirket Kurulumu ve Uyum modülü tüzel kişilik seçimini (S.r.l., S.p.A., A.Ş., Ltd. Şti.), vergi kaydını, banka entegrasyonunu ve ilk muhasebe kurulumunu kapsar. Başvuruları lisanslı yerel ortaklar imzalar; biz onları tek bir dosyadan koordine ederiz.",
        },
        {
          q: "Startup Koridoru, genişleme mandatlarından nasıl farklıdır?",
          a: "İtalya ve Türkiye genişleme mandatları, nereye gideceğini bilen şirketler için pazara giriş programlarıdır. Startup Koridoru ise pazar doğrulamasından operasyonların ölçeklenmesine kadar destek isteyen kurucular için altı modüllü bir programdır.",
        },
        {
          q: "Hedef ülkede işe alım ve yetenek konusunda yardımcı oluyor musunuz?",
          a: "Evet. İnsan ve Mobilite modülü, vize ve taşınma süreçlerini lisanslı göçmenlik ortaklarıyla koordine eder; iki kıyıda da ekip kurabilmeniz için yerel işe alım yolları ve yüklenici çerçeveleri oluşturur.",
        },
        {
          q: "Ne tür işletmelerle çalışıyorsunuz?",
          a: "Türkiye ile İtalya arasında hareket eden KOBİ'ler, büyüme şirketleri ve profesyoneller: Avrupa'da müşteri arayan bir teknoloji startup'ı, İtalyan ya da Türk tedarikçi arayan bir üretici ya da bir görev için taşınan bir yönetici. Her biri için yapılandırılmış bir program vardır.",
        },
        {
          q: "Bir iş birliği ne kadar sürer?",
          a: "Katmana bağlıdır. Launch, 6 ila 8 haftada kuruluş ve uyumu tamamlar. Grow, 3 ila 6 ay boyunca ticari etkinleştirmeyi ekler. Scale ise çeyreklik değerlendirmeler ve yönetici raporlamasıyla 6 ila 12 aylık gömülü bir ortaklıktır.",
        },
        {
          q: "Taahhüt vermeden önce Alvolo ile çalışmayı deneyebilir miyim?",
          a: "Evet. İlk keşif görüşmesi ücretsizdir: durumunuzu değerlendirir ve ön bir yol haritası çizeriz. Taahhüt, iki taraf da yolun net olduğunda ve kapsam yazıya döküldüğünde başlar.",
        },
      ],
    },
    startupCorridorPage: {
      badge: "Startup programı",
      title: "Türkiye–İtalya Startup Koridoru",
      subtitle: "Türkiye ile İtalya arasında hareket eden kurucular için tek bir tekrarlanabilir oyun planıyla yürütülen sıralı bir program.",
      missionTitle: "Misyonumuz",
      missionP1: "Türkiye ile İtalya arasında genişleyen kurucular şirket kuruluşu, vergi, uyum ve pazara girişle aynı anda karşılaşır; dördünü birden üstlenen tek bir muhatap yoktur. Koridor bu boşluğu kapatır.",
      missionP2: "Hedefimiz",
      missionHighlight: "şirket kuruluşundan ilk müşterilere kadar tam kapsamlı ilk TR–IT genişleme operatörü olmak",
      frameworkTitle: "Altı modüllü genişleme çerçevesi",
      frameworkSubtitle: "Her birinin bir sahibi ve bir çıktısı olan altı modül, bir şirketin ihtiyaç duyduğu sırayla yürütülür.",
      modules: [
        { title: "Pazar keşfi ve giriş", desc: "İdeal müşteri profili doğrulaması, rakip haritalaması ve fiyat sinyalleri; ayrıca potansiyel ortakların haritası." },
        { title: "Şirket kurulumu ve uyum", desc: "Tüzel kişilik seçimi (S.r.l./S.p.A. ya da A.Ş./Ltd. Şti.), vergi kayıtları, muhasebe kurulumu ve yerel banka entegrasyonu." },
        { title: "İnsan ve mobilite", desc: "Vize ve taşınma koordinasyonu, ilk ekip için yerel işe alım yolları ve yüklenici çerçeveleri." },
        { title: "Ticari etkinleştirme", desc: "Kanal ortakları, bayi anlaşmaları ve ilk on müşteri planı; materyaller hedef pazara göre yerelleştirilir." },
        { title: "Sermaye ve teşvikler", desc: "Yatırımcı ve hızlandırıcı tanıştırmaları, seyreltici olmayan teşviklerin haritası ve hibe başvurularında destek." },
        { title: "Ölçekleme operasyonları", desc: "KPI enstrümantasyonu, OKR koçluğu ve üç aylık operasyon değerlendirmeleri." },
      ],
      tiersTitle: "Üç katman",
      tierLabel: "Katman",
      tierCta: "Başlayın",
      tiers: [
        { name: "Launch", duration: "6–8 hafta", desc: "Kuruluş, temel uyum ve hafif bir pazara giriş planı." },
        { name: "Grow", duration: "3–6 ay", desc: "Tam uyum, ticari etkinleştirme ve aktif işe alım desteği." },
        { name: "Scale", duration: "6–12 ay", desc: "Uzun vadede gömülü operasyon temposu, yönetici raporlaması ve stratejik ortaklıklar." },
      ],
      whyTitle: "Neden Alvolo?",
      whyBody: "Alvolo genişlemeye danışmanlık yapmakla kalmaz, onu yürütür. İş geliştirme, mevzuat çalışması ve operasyonlar tek bir ekipte toplanır; Türkiye–İtalya koridorunda bunu sunan butik danışmanlık azdır. Her mandat, bir sonraki müşterinin ilk günden yararlanabileceği ağa noterler, bankalar, tedarikçiler ve yatırımcılar ekler.",
      whyCta: "Keşif görüşmesi ayırtın",
    },
  },
  it: {
    nav: {
      contact: "Contatti",
      portal: "Portale",
      faq: "FAQ",
    },
    services: {
      label: "01 // SERVIZI",
      title: "Le nostre aree di servizio",
      subtitle: "Costituzione, fiscalità, permessi e sourcing in Turchia, seguiti da un unico team senior dal primo audit alla prima fattura.",
      startupCorridor: {
        label: "Programma startup",
        title: "Il Corridoio Startup Türkiye–Italia",
        description: "Un programma sequenziato per founder che si muovono tra gli ecosistemi startup turco e italiano: costituzione, fiscalità, compliance e primi clienti, in quest'ordine.",
        button: "Esplora il corridoio",
      },
      integrationTitle: "Servizi di integrazione",
      financialTitle: "Consulenza finanziaria",
      viewAll: "Tutti i servizi",
      integrationServices: [
        { title: "Ricongiungimento familiare e familiari a carico", description: "Ricongiungimento familiare, permessi per i familiari e inserimento scolastico per le famiglie dei dirigenti in trasferimento." },
        { title: "Permesso di soggiorno", description: "La domanda di permesso, gli appuntamenti in Questura e i rinnovi per la residenza legale in Italia." },
        { title: "Alloggio e relocation per dirigenti", description: "Ricerca dell'abitazione, negoziazione del contratto di locazione e iscrizione anagrafica per dirigenti e famiglie che si trasferiscono in Italia." },
        { title: "Arrivo e orientamento", description: "Primi appuntamenti, iscrizioni e organizzazione pratica della vita quotidiana nelle prime settimane in Italia." },
        { title: "Residenza fiscale e regime impatriati", description: "Pianificazione della residenza fiscale e regime impatriati per i dirigenti che si trasferiscono dalla Turchia." },
        { title: "Visti per lavoro e investitori", description: "Percorsi per visto lavoro autonomo, trasferimento intra-societario e visto investitori: dal nulla osta al visto d'ingresso e alle prime iscrizioni." },
        { title: "Procedure burocratiche", description: "Codice Fiscale, iscrizione al SSN e gli altri adempimenti che accompagnano l'arrivo." },
      ],
      financialServices: [
        { title: "Costituzione e impostazione legale", description: "Scelta tra S.r.l. e S.p.A., atto notarile, iscrizione al Registro delle Imprese e i passaggi statutari successivi." },
        { title: "Pianificazione finanziaria e budget", description: "Budget, flussi di cassa e piani di finanziamento per la nuova società, costruiti sul modello triennale della fase di audit." },
        { title: "Pianificazione fiscale e conformità", description: "Pianificazione IRES, IRAP e IVA, gli adempimenti e il calendario di compliance secondo le regole italiane." },
        { title: "Conti bancari e impostazione dei pagamenti", description: "Conto di deposito capitale e conti operativi, pacchetto KYC e rail di pagamento per la società." },
        { title: "Consulenza sugli investimenti e gestione dei fondi", description: "Screening degli investimenti, strutturazione dei fondi e consulenza finanziaria cross-border." },
        { title: "Gestione del rischio e assicurazioni", description: "Coperture assicurative e revisione dei rischi per l'operatività italiana." },
        { title: "Consulenza continuativa e reportistica", description: "Reportistica mensile e supporto consulenziale nel primo anno e oltre." },
      ],
    },
    methodology: {
      label: "IL NOSTRO APPROCCIO",
      title: "Metodologia",
      subtitle: "Come si svolge un mandato transfrontaliero: un unico metodo sequenziato, dal primo audit regolatorio alla società operativa, con controparti, tempistiche e deliverable concordati prima del primo deposito.",
      steps: [
        { num: "01", title: "Audit", description: "Mappiamo assetto proprietario, attività e persone rispetto alle regole italiane e turche (autorizzazioni, immigrazione, antiriciclaggio, norme di settore) prima di disegnare qualsiasi struttura." },
        { num: "02", title: "Architettura fiscale", description: "Modelliamo veicolo, livelli di holding e posizione convenzionale su aliquota effettiva, rimpatrio di cassa ed exit, poi approviamo la struttura con i founder." },
        { num: "03", title: "Costituzione", description: "Portiamo avanti atto notarile, iscrizioni, IVA e PEC in parallelo con Codice Fiscale, permessi e relocation dei dirigenti, così società e persone arrivano nella stessa data." },
        { num: "04", title: "Onboarding", description: "Contrattualizziamo fornitori, partner manifatturieri, banche, payroll e consulenti locali, poi li consegniamo con una cadenza operativa mensile." },
      ],
    },
    about: {
      label: "IL TEAM",
      title: "Chi siamo",
      paragraph1: "Alvolo Consulting è una società di consulenza transfrontaliera tra Italia e Turchia. Il nostro team, formato in Bocconi, lavora da Milano, Roma e Istanbul e accompagna aziende e dirigenti dal primo audit regolatorio alla società operativa.",
      paragraph2: "I nostri consulenti siedono con voi dal notaio, all'Agenzia delle Entrate, in Questura e in banca, e sequenziano ogni passaggio dell'apertura in Italia o in Turchia perché si completi nella data prevista.",
      paragraph3: "Un unico consulente senior resta responsabile dal primo audit alla prima fattura, e rimane il vostro riferimento per adempimenti, buste paga e la prossima espansione.",
      philosophyTitle: "Come lavoriamo",
      philosophyPoints: ["Modelliamo i numeri prima di depositare le carte.", "Un solo advisor risponde dell'intero mandato.", "Il corridoio resta aperto dopo la prima fattura."],
      philosophyCta: "Vedi la metodologia",
      valuesTitle: "Cosa potete pretendere da noi",
      values: [
        "Perimetro e onorari concordati per iscritto prima di iniziare",
        "Notai, commercialisti e consulenti immigrazione abilitati su ogni fascicolo",
        "Un solo advisor senior dal primo audit alla prima fattura",
        "Una risposta entro un giorno lavorativo",
        "Adempimenti, payroll e revisioni dei fornitori dopo l'avvio della società",
      ],
    },
    contact: {
      title: "Contatti",
      subtitle: "Contattate i partner a Milano, Roma o Istanbul per costituzione, relocation, fiscalità o sourcing.",
      contactInfo: "Informazioni di contatto",
      getInTouch: "Scriveteci",
      phoneTitle: "Telefono",
      phoneDetails: "+39 348 170 5207",
      emailTitle: "Email",
      emailDetails: "info@alvoloconsulting.com",
      addressTitle: "Indirizzo",
      addressDetails: "Via Valsugana 6, 20139 Milano (MI), Italia",
      hoursTitle: "Orari",
      hoursDetails: "Lunedì–venerdì, 09:00–18:00 CET",
    },
    faq: {
      title: "Domande frequenti",
      subtitle: "Tempi, perimetro e cosa comporta un mandato con Alvolo Consulting.",
      questions: [
        {
          q: "Cosa rende Alvolo diversa da una consulenza tradizionale?",
          a: "Alvolo gestisce il mandato invece di scriverci sopra un report. Sviluppo commerciale, pratiche regolatorie e operatività quotidiana seguono un unico percorso sequenziato, e un consulente senior resta responsabile dal primo audit alla prima fattura. Ottenete un team internazionale senza assumerlo.",
        },
        {
          q: "Ho una startup in Turchia. Come faccio a sapere se sono pronto per espandermi in Italia?",
          a: "La prontezza si vede nel segnale prodotto-mercato più che nel fatturato. Con lo Startup Corridor validiamo il vostro profilo di cliente ideale e mappiamo la concorrenza italiana prima che impegniate un euro. Se i numeri sostengono il timing, avviamo la costituzione. Se non lo fanno, ve lo diciamo prima che spendiate per una società.",
        },
        {
          q: "Vi occupate anche della costituzione, oltre che della strategia?",
          a: "Sì. Il modulo Costituzione e Conformità copre la scelta del veicolo (S.r.l., S.p.A., A.Ş., Ltd. Şti.), la registrazione fiscale, l'apertura bancaria e la prima impostazione contabile. Le pratiche le firmano partner locali abilitati, e noi li coordiniamo da un unico fascicolo.",
        },
        {
          q: "In cosa si differenzia lo Startup Corridor dai mandati di espansione?",
          a: "I mandati di espansione Italia e Türkiye sono programmi di ingresso per aziende che sanno già dove andare. Lo Startup Corridor è un programma a sei moduli per founder che hanno bisogno di supporto dalla validazione del mercato fino alla scalabilità delle operazioni.",
        },
        {
          q: "Aiutate con assunzioni e talenti nel paese di destinazione?",
          a: "Sì. Il modulo Persone e Mobilità coordina visti e trasferimenti con partner di immigrazione abilitati, e imposta percorsi di assunzione locali e framework per i contractor, così potete costruire il team su entrambe le sponde.",
        },
        {
          q: "Con che tipo di aziende lavorate?",
          a: "PMI, scale-up e professionisti che si muovono tra Turchia e Italia: una startup tech in cerca di clienti europei, un produttore in cerca di fornitori italiani o turchi, un dirigente che si trasferisce per un incarico. Per ciascuno esiste un programma strutturato.",
        },
        {
          q: "Quanto dura un incarico?",
          a: "Dipende dal livello. Launch consegna costituzione e conformità in 6-8 settimane. Grow aggiunge l'abilitazione commerciale in 3-6 mesi. Scale è una partnership integrata di 6-12 mesi con revisioni trimestrali e reporting esecutivo.",
        },
        {
          q: "Posso provare a lavorare con Alvolo prima di impegnarmi?",
          a: "Sì. La prima discovery call è gratuita: valutiamo la vostra situazione e delineiamo una roadmap preliminare. L'impegno parte solo quando entrambe le parti concordano che il percorso è chiaro e il perimetro è messo per iscritto.",
        },
      ],
    },
    startupCorridorPage: {
      badge: "Programma startup",
      title: "Il Corridoio Startup Türkiye–Italia",
      subtitle: "Un programma sequenziato per founder che si muovono tra Turchia e Italia, condotto su un unico playbook ripetibile.",
      missionTitle: "La nostra missione",
      missionP1: "I founder che si espandono tra Turchia e Italia affrontano costituzione, fiscalità, compliance e go-to-market nello stesso momento, senza un'unica controparte che risponda di tutti e quattro. Il corridoio chiude questo vuoto.",
      missionP2: "La nostra ambizione è essere il",
      missionHighlight: "primo operatore di espansione TR–IT full-service, dalla costituzione ai primi clienti",
      frameworkTitle: "Il framework di espansione a sei moduli",
      frameworkSubtitle: "Sei moduli, ciascuno con un responsabile e un deliverable, condotti nell'ordine in cui un'azienda ne ha bisogno.",
      modules: [
        { title: "Scoperta del mercato e ingresso", desc: "Validazione del profilo di cliente ideale, mappatura dei concorrenti e segnali di prezzo, più una mappa dei potenziali partner." },
        { title: "Costituzione e conformità", desc: "Scelta del veicolo (S.r.l./S.p.A. o A.Ş./Ltd. Şti.), registrazioni fiscali, impostazione contabile e onboarding bancario locale." },
        { title: "Persone e mobilità", desc: "Coordinamento di visti e trasferimenti, percorsi di assunzione locali e framework per contractor per il primo team." },
        { title: "Abilitazione commerciale", desc: "Partner di canale, accordi di rivendita e un piano per i primi dieci clienti, con materiali localizzati per il mercato target." },
        { title: "Capitale e incentivi", desc: "Presentazioni a investitori e acceleratori, mappa degli incentivi non diluitivi e supporto nelle domande di contributo." },
        { title: "Operare per scalare", desc: "Strumentazione KPI, coaching OKR e revisioni operative trimestrali." },
      ],
      tiersTitle: "Tre livelli",
      tierLabel: "Livello",
      tierCta: "Inizia",
      tiers: [
        { name: "Launch", duration: "6–8 settimane", desc: "Costituzione, conformità di base e un piano go-to-market leggero." },
        { name: "Grow", duration: "3–6 mesi", desc: "Conformità completa, abilitazione commerciale e supporto attivo alle assunzioni." },
        { name: "Scale", duration: "6–12 mesi", desc: "Cadenza operativa integrata, reporting esecutivo e partnership strategiche nel lungo periodo." },
      ],
      whyTitle: "Perché Alvolo?",
      whyBody: "Alvolo gestisce l'espansione oltre a consigliarla. Sviluppo commerciale, lavoro regolatorio e operatività restano in un unico team, cosa che poche boutique nel corridoio Turchia–Italia offrono. Ogni mandato aggiunge notai, banche, fornitori e investitori a una rete che il cliente successivo può usare dal primo giorno.",
      whyCta: "Prenota una discovery call",
    },
  },
};

export function getTranslation(locale: Locale): TranslationType {
  return translations[locale] || translations.en;
}
