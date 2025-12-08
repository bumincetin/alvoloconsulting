"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { FaCalendarAlt, FaUser, FaArrowRight, FaBookOpen, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const getBlogContent = (lang: string) => {
  const content = {
    tr: {
      title: "Finansal Danışmanlık Blog",
      subtitle: "İtalya'da finansal başarınız için uzman içerikler",
      description: "İşletmenizin finansal sağlığını optimize etmek için ihtiyacınız olan tüm bilgiler.",
      readMore: "Devamını Oku",
      readTime: "dakika okuma",
      viewAll: "Tümünü Gör",
      articles: [
        {
          id: 1,
          title: "İtalya'da Şirket Kurarken Finansal Planlama: Kapsamlı Rehber",
          excerpt: "İtalya'da şirket kurarken finansal planlamanın kritik önemi. İlk yatırım gereksinimleri, sermaye yapısı, ve uzun vadeli finansal stratejiler hakkında detaylı bilgiler.",
          author: "Oğuzhan Aslan",
          date: "25 Ocak 2025",
          readTime: 12,
          category: "Finansal Planlama",
          featured: true,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1",
          content: `İtalya'da şirket kurmak, dikkatli bir finansal planlama gerektirir. Bu kapsamlı rehberde, başarılı bir girişim için gerekli tüm finansal adımları ele alıyoruz.

**1. İlk Yatırım Gereksinimleri**
İtalya'da şirket kurmak için minimum sermaye gereksinimleri şirket türüne göre değişir. S.r.l. (Limited Şirket) için minimum €10,000, S.p.A. (Anonim Şirket) için minimum €50,000 sermaye gereklidir. Ancak, bu sadece başlangıç. İşletme giderleri, ofis kiraları, personel maliyetleri ve operasyonel nakit akışı için ek kaynaklar planlanmalıdır.

**2. Sermaye Yapısı Optimizasyonu**
Doğru sermaye yapısı, vergi avantajları ve finansal esneklik sağlar. Öz sermaye ve borç finansmanı arasındaki denge, İtalyan vergi mevzuatına uygun şekilde planlanmalıdır. Thin capitalization kuralları ve faiz indirimi limitleri dikkate alınmalıdır.

**3. Vergi Planlaması**
İtalya'nın vergi sistemi karmaşık olabilir. IRES (Kurumlar Vergisi), IRAP (Bölgesel Üretim Vergisi) ve KDV gibi temel vergilerin yanı sıra, çeşitli indirimler ve teşvikler mevcuttur. Erken aşamada profesyonel vergi danışmanlığı almak, önemli tasarruflar sağlayabilir.

**4. Nakit Akışı Yönetimi**
İlk 12-18 ay kritiktir. Detaylı nakit akışı projeksiyonları, olası finansman açıklarını önceden tespit etmenize yardımcı olur. İtalya'da iş yapmanın özelliklerini (ödeme süreleri, sezonallik, vergi ödemeleri) dikkate alan bir bütçe hazırlanmalıdır.

**5. Finansman Seçenekleri**
İtalya'da şirket kurmak için çeşitli finansman kaynakları mevcuttur: öz sermaye, banka kredileri, devlet teşvikleri ve yatırımcı finansmanı. Her seçeneğin avantaj ve dezavantajlarını değerlendirmek önemlidir.

**Sonuç**
Doğru finansal planlama, İtalya'da şirket kurmanın başarısı için kritik öneme sahiptir. Profesyonel danışmanlık hizmeti almak, karmaşık süreçlerde size rehberlik edecek ve finansal hatalardan kaçınmanıza yardımcı olacaktır.`
        },
        {
          id: 2,
          title: "İtalya Vergi Sistemi: Yeni Başlayanlar İçin Detaylı Rehber",
          excerpt: "İtalya'nın vergi sistemini anlamak için temel bilgiler. Hangi vergileri ödemek zorundasınız, ne zaman ödemelisiniz ve nasıl tasarruf edebilirsiniz?",
          author: "Oğuzhan Aslan",
          date: "22 Ocak 2025",
          readTime: 15,
          category: "Vergi Planlaması",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1",
          content: `İtalya'nın vergi sistemi, yeni işletmeler için karmaşık görünebilir. Bu rehber, temel vergi türlerini ve yükümlülüklerinizi açıklamaktadır.

**Temel Vergi Türleri**
- IRES (Imposta sul Reddito delle Società): Kurumlar vergisi, %24 oranında uygulanır
- IRAP (Imposta Regionale sulle Attività Produttive): Bölgesel üretim vergisi, bölgelere göre %3.9-4.82 arasında değişir
- IVA (Imposta sul Valore Aggiunto): KDV, genel oran %22, bazı ürünler için indirimli oranlar mevcuttur

**Vergi Ödeme Takvimi**
İtalya'da vergi ödemeleri genellikle peşin ödemeler (acconto) ve yıllık beyanlar şeklinde yapılır. IRES için peşin ödemeler yıl içinde iki kez yapılır.

**Vergi Tasarrufu Stratejileri**
Doğru planlama ile yasal vergi tasarrufları elde edebilirsiniz. Yatırım teşvikleri, araştırma-geliştirme indirimleri ve bölgesel teşvikler değerlendirilmelidir.`
        },
        {
          id: 3,
          title: "İtalya'da Banka Hesabı Açma: Şirketler İçin Rehber",
          excerpt: "İtalya'da şirket banka hesabı açma süreci, gerekli belgeler ve dikkat edilmesi gerekenler. Hangi bankayı seçmelisiniz?",
          author: "Bumin Kağan Çetin",
          date: "20 Ocak 2025",
          readTime: 10,
          category: "Bankacılık",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/y6en2p5fi5mg8clye3cnt/milanoyeni.jpg?rlkey=dfca5yg6f7mzeju965vbr6f8f&st=gsr57h2m&dl=1&raw=1",
          content: `İtalya'da şirket banka hesabı açmak, işletmenizin finansal operasyonlarının temelidir. Bu süreç, doğru hazırlık ve belgelerle sorunsuz ilerleyebilir.

**Gerekli Belgeler**
- Şirket kuruluş belgeleri (Atto Costitutivo, Statuto)
- Codice Fiscale (Vergi Kimlik Numarası)
- Ticaret Sicil Kaydı
- Yasal temsilci kimlik belgeleri
- Şirket faaliyet belgesi

**Banka Seçimi**
İtalya'da çok sayıda banka seçeneği mevcuttur. Yerel bankalar, uluslararası bankalar ve dijital bankalar arasından ihtiyaçlarınıza uygun olanı seçmelisiniz. Ücretler, hizmet kalitesi ve uluslararası transfer kolaylığı önemli faktörlerdir.

**Süreç ve Zamanlama**
Banka hesabı açma süreci genellikle 2-4 hafta sürer. Tüm belgelerin hazır olması ve doğru şekilde sunulması süreci hızlandırır.`
        },
        {
          id: 4,
          title: "İtalya'da Yatırım Danışmanlığı: Fırsatlar ve Stratejiler",
          excerpt: "İtalya'da yatırım yapmak isteyen işletmeler için fırsatlar, riskler ve stratejik yaklaşımlar. Hangi sektörlerde yatırım yapmalısınız?",
          author: "Oğuzhan Aslan",
          date: "18 Ocak 2025",
          readTime: 14,
          category: "Yatırım Danışmanlığı",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1",
          content: `İtalya, Avrupa'nın en büyük ekonomilerinden biri olarak çeşitli yatırım fırsatları sunmaktadır. Doğru strateji ve danışmanlık ile başarılı yatırımlar yapabilirsiniz.

**Yatırım Fırsatları**
- Teknoloji ve inovasyon sektörü
- Turizm ve konaklama
- Üretim ve sanayi
- Enerji ve sürdürülebilirlik
- Tarım ve gıda

**Risk Yönetimi**
Her yatırım risk içerir. İtalya'da yatırım yaparken, piyasa riskleri, döviz riskleri ve düzenleyici riskleri değerlendirmelisiniz. Çeşitlendirme ve profesyonel danışmanlık, riskleri minimize eder.

**Devlet Teşvikleri**
İtalya hükümeti, belirli sektörlerde ve bölgelerde yatırımları teşvik etmek için çeşitli programlar sunmaktadır. Bu teşviklerden yararlanmak için doğru başvuru süreçlerini takip etmelisiniz.`
        },
        {
          id: 5,
          title: "İtalya'da Finansal Raporlama ve Uyumluluk: Yıllık Süreçler",
          excerpt: "İtalya'da şirketlerin finansal raporlama yükümlülükleri. Yıllık beyannameler, bilanço hazırlama ve uyumluluk gereksinimleri.",
          author: "Bumin Kağan Çetin",
          date: "15 Ocak 2025",
          readTime: 11,
          category: "Finansal Raporlama",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1",
          content: `İtalya'da şirket işletmek, düzenli finansal raporlama ve uyumluluk gerektirir. Bu yükümlülükleri anlamak ve zamanında yerine getirmek kritik öneme sahiptir.

**Yıllık Raporlama Gereksinimleri**
- Bilanço (Stato Patrimoniale)
- Gelir Tablosu (Conto Economico)
- Notlar (Nota Integrativa)
- Yönetim Raporu (Relazione sulla Gestione)

**Vergi Beyannameleri**
IRES ve IRAP beyannameleri yıllık olarak sunulmalıdır. KDV beyannameleri ise aylık veya üç aylık olarak sunulabilir.

**Uyumluluk ve Denetim**
Belirli büyüklükteki şirketler için bağımsız denetim zorunluluğu vardır. Düzenli muhasebe kayıtları ve profesyonel destek, uyumluluk süreçlerini kolaylaştırır.`
        },
        {
          id: 6,
          title: "İtalya'da Risk Yönetimi ve Sigorta Planlaması",
          excerpt: "İşletmenizin finansal güvenliği için risk yönetimi stratejileri ve sigorta planlaması. Hangi riskleri yönetmelisiniz?",
          author: "Oğuzhan Aslan",
          date: "12 Ocak 2025",
          readTime: 9,
          category: "Risk Yönetimi",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1",
          content: `Risk yönetimi, işletmenizin uzun vadeli başarısı için kritik öneme sahiptir. İtalya'da iş yaparken karşılaşabileceğiniz riskleri anlamak ve yönetmek önemlidir.

**Temel Risk Kategorileri**
- Finansal riskler (kredi riski, likidite riski, döviz riski)
- Operasyonel riskler
- Yasal ve düzenleyici riskler
- Piyasa riskleri

**Sigorta Planlaması**
İtalya'da zorunlu ve önerilen sigorta türleri:
- Sorumluluk sigortası
- İşyeri sigortası
- Sağlık sigortası
- Mal sigortası

**Risk Azaltma Stratejileri**
Çeşitlendirme, hedge işlemleri, sigorta ve profesyonel danışmanlık, riskleri yönetmenin etkili yollarıdır.`
        }
      ]
    },
    en: {
      title: "Financial Consulting Blog",
      subtitle: "Expert content for your financial success in Italy",
      description: "All the information you need to optimize your business's financial health.",
      readMore: "Read More",
      readTime: "min read",
      viewAll: "View All",
      articles: [
        {
          id: 1,
          title: "Financial Planning When Setting Up a Company in Italy: Comprehensive Guide",
          excerpt: "The critical importance of financial planning when setting up a company in Italy. Detailed information about initial investment requirements, capital structure, and long-term financial strategies.",
          author: "Oğuzhan Aslan",
          date: "January 25, 2025",
          readTime: 12,
          category: "Financial Planning",
          featured: true,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1",
          content: `Setting up a company in Italy requires careful financial planning. In this comprehensive guide, we cover all the financial steps necessary for a successful venture.

**1. Initial Investment Requirements**
Minimum capital requirements for setting up a company in Italy vary by company type. S.r.l. (Limited Company) requires a minimum of €10,000, while S.p.A. (Public Limited Company) requires a minimum of €50,000. However, this is just the beginning. Additional resources should be planned for business expenses, office rents, personnel costs, and operational cash flow.

**2. Capital Structure Optimization**
The right capital structure provides tax advantages and financial flexibility. The balance between equity and debt financing should be planned in accordance with Italian tax legislation. Thin capitalization rules and interest deduction limits must be considered.

**3. Tax Planning**
Italy's tax system can be complex. In addition to basic taxes such as IRES (Corporate Tax), IRAP (Regional Production Tax), and VAT, various deductions and incentives are available. Getting professional tax advice at an early stage can provide significant savings.

**4. Cash Flow Management**
The first 12-18 months are critical. Detailed cash flow projections help you identify potential financing gaps in advance. A budget should be prepared that takes into account the characteristics of doing business in Italy (payment terms, seasonality, tax payments).

**5. Financing Options**
Various financing sources are available for setting up a company in Italy: equity, bank loans, government incentives, and investor financing. It is important to evaluate the advantages and disadvantages of each option.

**Conclusion**
Proper financial planning is critical to the success of setting up a company in Italy. Getting professional consulting services will guide you through complex processes and help you avoid financial mistakes.`
        },
        {
          id: 2,
          title: "Italy Tax System: Detailed Guide for Beginners",
          excerpt: "Basic information to understand Italy's tax system. Which taxes must you pay, when should you pay them, and how can you save?",
          author: "Oğuzhan Aslan",
          date: "January 22, 2025",
          readTime: 15,
          category: "Tax Planning",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1",
          content: `Italy's tax system may seem complex for new businesses. This guide explains the basic tax types and your obligations.

**Basic Tax Types**
- IRES (Imposta sul Reddito delle Società): Corporate tax, applied at 24%
- IRAP (Imposta Regionale sulle Attività Produttive): Regional production tax, varies between 3.9-4.82% by region
- IVA (Imposta sul Valore Aggiunto): VAT, general rate is 22%, reduced rates available for some products

**Tax Payment Schedule**
Tax payments in Italy are generally made as advance payments (acconto) and annual returns. IRES advance payments are made twice during the year.

**Tax Saving Strategies**
With proper planning, you can achieve legal tax savings. Investment incentives, R&D deductions, and regional incentives should be evaluated.`
        },
        {
          id: 3,
          title: "Opening a Bank Account in Italy: Guide for Companies",
          excerpt: "The process of opening a corporate bank account in Italy, required documents, and things to consider. Which bank should you choose?",
          author: "Bumin Kağan Çetin",
          date: "January 20, 2025",
          readTime: 10,
          category: "Banking",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/y6en2p5fi5mg8clye3cnt/milanoyeni.jpg?rlkey=dfca5yg6f7mzeju965vbr6f8f&st=gsr57h2m&dl=1&raw=1",
          content: `Opening a corporate bank account in Italy is the foundation of your company's financial operations. This process can proceed smoothly with proper preparation and documents.

**Required Documents**
- Company formation documents (Atto Costitutivo, Statuto)
- Codice Fiscale (Tax Identification Number)
- Trade Register Entry
- Legal representative identity documents
- Company activity certificate

**Bank Selection**
There are many bank options available in Italy. You should choose the one that suits your needs from local banks, international banks, and digital banks. Fees, service quality, and ease of international transfers are important factors.

**Process and Timing**
The bank account opening process usually takes 2-4 weeks. Having all documents ready and presented correctly speeds up the process.`
        },
        {
          id: 4,
          title: "Investment Advisory in Italy: Opportunities and Strategies",
          excerpt: "Opportunities, risks, and strategic approaches for businesses wanting to invest in Italy. Which sectors should you invest in?",
          author: "Oğuzhan Aslan",
          date: "January 18, 2025",
          readTime: 14,
          category: "Investment Advisory",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1",
          content: `Italy, as one of Europe's largest economies, offers various investment opportunities. With the right strategy and consulting, you can make successful investments.

**Investment Opportunities**
- Technology and innovation sector
- Tourism and hospitality
- Manufacturing and industry
- Energy and sustainability
- Agriculture and food

**Risk Management**
Every investment involves risk. When investing in Italy, you should evaluate market risks, currency risks, and regulatory risks. Diversification and professional consulting minimize risks.

**Government Incentives**
The Italian government offers various programs to encourage investments in certain sectors and regions. To benefit from these incentives, you must follow the correct application processes.`
        },
        {
          id: 5,
          title: "Financial Reporting and Compliance in Italy: Annual Processes",
          excerpt: "Financial reporting obligations for companies in Italy. Annual returns, balance sheet preparation, and compliance requirements.",
          author: "Bumin Kağan Çetin",
          date: "January 15, 2025",
          readTime: 11,
          category: "Financial Reporting",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1",
          content: `Running a company in Italy requires regular financial reporting and compliance. Understanding and fulfilling these obligations on time is critical.

**Annual Reporting Requirements**
- Balance Sheet (Stato Patrimoniale)
- Income Statement (Conto Economico)
- Notes (Nota Integrativa)
- Management Report (Relazione sulla Gestione)

**Tax Returns**
IRES and IRAP returns must be submitted annually. VAT returns can be submitted monthly or quarterly.

**Compliance and Audit**
Companies of certain sizes are required to have independent audits. Regular accounting records and professional support facilitate compliance processes.`
        },
        {
          id: 6,
          title: "Risk Management and Insurance Planning in Italy",
          excerpt: "Risk management strategies and insurance planning for your business's financial security. Which risks should you manage?",
          author: "Oğuzhan Aslan",
          date: "January 12, 2025",
          readTime: 9,
          category: "Risk Management",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1",
          content: `Risk management is critical for your business's long-term success. Understanding and managing the risks you may face when doing business in Italy is important.

**Basic Risk Categories**
- Financial risks (credit risk, liquidity risk, currency risk)
- Operational risks
- Legal and regulatory risks
- Market risks

**Insurance Planning**
Mandatory and recommended insurance types in Italy:
- Liability insurance
- Workplace insurance
- Health insurance
- Property insurance

**Risk Mitigation Strategies**
Diversification, hedge transactions, insurance, and professional consulting are effective ways to manage risks.`
        }
      ]
    },
    it: {
      title: "Blog Consulenza Finanziaria",
      subtitle: "Contenuti esperti per il tuo successo finanziario in Italia",
      description: "Tutte le informazioni di cui hai bisogno per ottimizzare la salute finanziaria della tua azienda.",
      readMore: "Leggi di Più",
      readTime: "min di lettura",
      viewAll: "Vedi Tutto",
      articles: [
        {
          id: 1,
          title: "Pianificazione Finanziaria nella Costituzione di un'Azienda in Italia: Guida Completa",
          excerpt: "L'importanza critica della pianificazione finanziaria nella costituzione di un'azienda in Italia. Informazioni dettagliate su requisiti di investimento iniziale, struttura del capitale e strategie finanziarie a lungo termine.",
          author: "Oğuzhan Aslan",
          date: "25 Gennaio 2025",
          readTime: 12,
          category: "Pianificazione Finanziaria",
          featured: true,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1",
          content: `Costituire un'azienda in Italia richiede un'attenta pianificazione finanziaria. In questa guida completa, copriamo tutti i passaggi finanziari necessari per un'impresa di successo.

**1. Requisiti di Investimento Iniziale**
I requisiti di capitale minimo per costituire un'azienda in Italia variano in base al tipo di società. La S.r.l. (Società a Responsabilità Limitata) richiede un minimo di €10.000, mentre la S.p.A. (Società per Azioni) richiede un minimo di €50.000. Tuttavia, questo è solo l'inizio. Risorse aggiuntive dovrebbero essere pianificate per spese aziendali, affitti di uffici, costi del personale e flusso di cassa operativo.

**2. Ottimizzazione della Struttura del Capitale**
La giusta struttura del capitale fornisce vantaggi fiscali e flessibilità finanziaria. L'equilibrio tra finanziamento azionario e debito dovrebbe essere pianificato in conformità con la legislazione fiscale italiana. Le regole di thin capitalization e i limiti di deduzione degli interessi devono essere considerati.

**3. Pianificazione Fiscale**
Il sistema fiscale italiano può essere complesso. Oltre alle tasse di base come IRES (Imposta sul Reddito delle Società), IRAP (Imposta Regionale sulle Attività Produttive) e IVA, sono disponibili varie detrazioni e incentivi. Ottenere consulenza fiscale professionale in una fase iniziale può fornire risparmi significativi.

**4. Gestione del Flusso di Cassa**
I primi 12-18 mesi sono critici. Le proiezioni dettagliate del flusso di cassa ti aiutano a identificare in anticipo potenziali gap di finanziamento. Un budget dovrebbe essere preparato tenendo conto delle caratteristiche del fare affari in Italia (termini di pagamento, stagionalità, pagamenti fiscali).

**5. Opzioni di Finanziamento**
Varie fonti di finanziamento sono disponibili per costituire un'azienda in Italia: capitale proprio, prestiti bancari, incentivi governativi e finanziamento degli investitori. È importante valutare i vantaggi e gli svantaggi di ciascuna opzione.

**Conclusione**
Una corretta pianificazione finanziaria è fondamentale per il successo della costituzione di un'azienda in Italia. Ottenere servizi di consulenza professionale ti guiderà attraverso processi complessi e ti aiuterà a evitare errori finanziari.`
        },
        {
          id: 2,
          title: "Sistema Fiscale in Italia: Guida Dettagliata per Principianti",
          excerpt: "Informazioni di base per comprendere il sistema fiscale italiano. Quali tasse devi pagare, quando dovresti pagarle e come puoi risparmiare?",
          author: "Oğuzhan Aslan",
          date: "22 Gennaio 2025",
          readTime: 15,
          category: "Pianificazione Fiscale",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1",
          content: `Il sistema fiscale italiano può sembrare complesso per le nuove imprese. Questa guida spiega i tipi di tasse di base e le tue obbligazioni.

**Tipi di Tasse di Base**
- IRES (Imposta sul Reddito delle Società): Imposta sulle società, applicata al 24%
- IRAP (Imposta Regionale sulle Attività Produttive): Imposta regionale sulla produzione, varia tra 3,9-4,82% per regione
- IVA (Imposta sul Valore Aggiunto): IVA, l'aliquota generale è del 22%, aliquote ridotte disponibili per alcuni prodotti

**Programma di Pagamento delle Tasse**
I pagamenti delle tasse in Italia sono generalmente effettuati come pagamenti anticipati (acconto) e dichiarazioni annuali. I pagamenti anticipati IRES vengono effettuati due volte durante l'anno.

**Strategie di Risparmio Fiscale**
Con una corretta pianificazione, puoi ottenere risparmi fiscali legali. Gli incentivi agli investimenti, le detrazioni per R&S e gli incentivi regionali dovrebbero essere valutati.`
        },
        {
          id: 3,
          title: "Apertura Conto Bancario in Italia: Guida per le Aziende",
          excerpt: "Il processo di apertura di un conto bancario aziendale in Italia, documenti richiesti e cose da considerare. Quale banca dovresti scegliere?",
          author: "Bumin Kağan Çetin",
          date: "20 Gennaio 2025",
          readTime: 10,
          category: "Servizi Bancari",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/y6en2p5fi5mg8clye3cnt/milanoyeni.jpg?rlkey=dfca5yg6f7mzeju965vbr6f8f&st=gsr57h2m&dl=1&raw=1",
          content: `Aprire un conto bancario aziendale in Italia è la base delle operazioni finanziarie della tua azienda. Questo processo può procedere senza problemi con la preparazione e i documenti corretti.

**Documenti Richiesti**
- Documenti di costituzione dell'azienda (Atto Costitutivo, Statuto)
- Codice Fiscale (Numero di Identificazione Fiscale)
- Iscrizione al Registro delle Imprese
- Documenti di identità del rappresentante legale
- Certificato di attività aziendale

**Selezione della Banca**
Ci sono molte opzioni bancarie disponibili in Italia. Dovresti scegliere quella che si adatta alle tue esigenze tra banche locali, banche internazionali e banche digitali. Commissioni, qualità del servizio e facilità di trasferimenti internazionali sono fattori importanti.

**Processo e Tempistiche**
Il processo di apertura del conto bancario di solito richiede 2-4 settimane. Avere tutti i documenti pronti e presentati correttamente accelera il processo.`
        },
        {
          id: 4,
          title: "Consulenza sugli Investimenti in Italia: Opportunità e Strategie",
          excerpt: "Opportunità, rischi e approcci strategici per le aziende che vogliono investire in Italia. In quali settori dovresti investire?",
          author: "Oğuzhan Aslan",
          date: "18 Gennaio 2025",
          readTime: 14,
          category: "Consulenza sugli Investimenti",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1",
          content: `L'Italia, come una delle più grandi economie d'Europa, offre varie opportunità di investimento. Con la giusta strategia e consulenza, puoi fare investimenti di successo.

**Opportunità di Investimento**
- Settore tecnologia e innovazione
- Turismo e ospitalità
- Produzione e industria
- Energia e sostenibilità
- Agricoltura e alimentare

**Gestione del Rischio**
Ogni investimento comporta rischi. Quando investi in Italia, dovresti valutare i rischi di mercato, i rischi valutari e i rischi normativi. La diversificazione e la consulenza professionale minimizzano i rischi.

**Incentivi Governativi**
Il governo italiano offre vari programmi per incoraggiare gli investimenti in determinati settori e regioni. Per beneficiare di questi incentivi, devi seguire i processi di domanda corretti.`
        },
        {
          id: 5,
          title: "Reportistica Finanziaria e Conformità in Italia: Processi Annuali",
          excerpt: "Obblighi di reportistica finanziaria per le aziende in Italia. Dichiarazioni annuali, preparazione del bilancio e requisiti di conformità.",
          author: "Bumin Kağan Çetin",
          date: "15 Gennaio 2025",
          readTime: 11,
          category: "Reportistica Finanziaria",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1",
          content: `Gestire un'azienda in Italia richiede reportistica finanziaria regolare e conformità. Comprendere e adempiere a questi obblighi in tempo è fondamentale.

**Requisiti di Reportistica Annuale**
- Bilancio (Stato Patrimoniale)
- Conto Economico
- Note (Nota Integrativa)
- Relazione sulla Gestione

**Dichiarazioni Fiscali**
Le dichiarazioni IRES e IRAP devono essere presentate annualmente. Le dichiarazioni IVA possono essere presentate mensilmente o trimestralmente.

**Conformità e Audit**
Le aziende di determinate dimensioni sono tenute ad avere audit indipendenti. Registri contabili regolari e supporto professionale facilitano i processi di conformità.`
        },
        {
          id: 6,
          title: "Gestione del Rischio e Pianificazione Assicurativa in Italia",
          excerpt: "Strategie di gestione del rischio e pianificazione assicurativa per la sicurezza finanziaria della tua azienda. Quali rischi dovresti gestire?",
          author: "Oğuzhan Aslan",
          date: "12 Gennaio 2025",
          readTime: 9,
          category: "Gestione del Rischio",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1",
          content: `La gestione del rischio è fondamentale per il successo a lungo termine della tua azienda. Comprendere e gestire i rischi che potresti affrontare quando fai affari in Italia è importante.

**Categorie di Rischio di Base**
- Rischi finanziari (rischio di credito, rischio di liquidità, rischio valutario)
- Rischi operativi
- Rischi legali e normativi
- Rischi di mercato

**Pianificazione Assicurativa**
Tipi di assicurazione obbligatori e consigliati in Italia:
- Assicurazione di responsabilità civile
- Assicurazione sul luogo di lavoro
- Assicurazione sanitaria
- Assicurazione sulla proprietà

**Strategie di Mitigazione del Rischio**
Diversificazione, operazioni di copertura, assicurazione e consulenza professionale sono modi efficaci per gestire i rischi.`
        }
      ]
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

const Blog = () => {
  const { language } = useLanguage();
  const c = getBlogContent(language);

  return (
    <section id="blog" className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <FaChartLine className="text-5xl" style={{color: '#3c77ad'}} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {c.title}
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-4" style={{ color: 'var(--text-secondary)' }}>
            {c.subtitle}
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {c.description}
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          {c.articles.filter(article => article.featured).map((article) => (
            <article key={article.id} className="glass-panel rounded-xl shadow-xl overflow-hidden max-w-5xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
              <div className="md:flex">
                <div className="md:w-1/2 relative">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-64 md:h-full object-cover"
                    width={400}
                    height={300}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block text-white text-sm px-3 py-1 rounded-full font-semibold" style={{backgroundColor: '#f58643'}}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center text-sm mb-4" style={{color: '#94a3b8'}}>
                    <FaCalendarAlt className="mr-2" style={{color: '#f58643'}} />
                    {article.date}
                    <span className="mx-2">•</span>
                    <FaUser className="mr-2" style={{color: '#f58643'}} />
                    {article.author}
                    <span className="mx-2">•</span>
                    <FaBookOpen className="mr-1" style={{color: '#f58643'}} />
                    {article.readTime} {c.readTime}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {article.title}
                  </h3>
                  
                  <p className="mb-6 line-clamp-4 leading-relaxed" style={{color: '#94a3b8'}}>
                    {article.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${article.id}`}
                    className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                    style={{backgroundColor: '#f58643', color: 'white'}}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#d97335'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#f58643'}
                  >
                    {c.readMore} <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {c.articles.filter(article => !article.featured).map((article) => (
            <article
              key={article.id}
              className="glass-panel rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <Image 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  width={300}
                  height={200}
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-white text-xs px-2 py-1 rounded font-semibold" style={{backgroundColor: '#3c77ad'}}>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm mb-3" style={{color: '#94a3b8'}}>
                  <FaCalendarAlt className="mr-2" style={{color: '#f58643'}} />
                  {article.date}
                  <span className="mx-2">•</span>
                  <FaBookOpen className="mr-1" style={{color: '#f58643'}} />
                  {article.readTime} {c.readTime}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-white">
                  {article.title}
                </h3>
                
                <p className="mb-4 line-clamp-3 leading-relaxed" style={{color: '#94a3b8'}}>
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4" style={{borderTopColor: '#1e293b'}}>
                  <span className="text-sm" style={{color: '#94a3b8'}}>
                    <FaUser className="inline mr-1" style={{color: '#f58643'}} />
                    {article.author}
                  </span>
                  <Link 
                    href={`/blog/${article.id}`}
                    className="text-sm font-semibold transition-colors"
                    style={{color: '#3c77ad'}}
                    onMouseOver={e => e.currentTarget.style.color = '#f58643'}
                    onMouseOut={e => e.currentTarget.style.color = '#3c77ad'}
                  >
                    {c.readMore} →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            style={{backgroundColor: '#3c77ad', color: 'white'}}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f58643'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#3c77ad'}
          >
            {c.viewAll} <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;

