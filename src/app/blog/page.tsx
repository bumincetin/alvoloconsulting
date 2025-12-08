'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import { FaCalendarAlt, FaUser, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const getBlogContent = (lang: string) => {
  const content = {
    tr: {
      title: "Blog",
      subtitle: "İtalya'da iş kurma ve yaşam rehberi",
      description: "Uzman ekibimizden İtalya'da iş kurma, finansal danışmanlık, vize süreçleri ve entegrasyon konularında değerli içerikler.",
      featured: "Öne Çıkan",
      readMore: "Devamını Oku",
      readTime: "dakika okuma",
      categories: {
        all: "Tümü",
        business: "İş Kurma",
        visa: "Vize & İzinler",
        financial: "Finansal Danışmanlık",
        education: "Eğitim",
        lifestyle: "Yaşam",
        legal: "Yasal Süreçler"
      },
      articles: [
        {
          id: 1,
          title: "İtalya'da Şirket Kurmanın 10 Adımı",
          excerpt: "İtalya'da şirket kurma sürecini adım adım açıklıyoruz. Hangi belgeler gerekli, süreç nasıl işliyor ve nelere dikkat etmelisiniz?",
          author: "Bumin Kağan Çetin",
          date: "20 Aralık 2024",
          readTime: 8,
          category: "İş Kurma",
          featured: true,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1"
        },
        {
          id: 2,
          title: "2025 İtalya Vize Başvuru Rehberi",
          excerpt: "2025 yılında İtalya'ya vize başvurusu yaparken bilmeniz gereken tüm detaylar. Hangi vize türü size uygun?",
          author: "Ece Melisa Özgüner",
          date: "18 Aralık 2024",
          readTime: 12,
          category: "Vize & İzinler",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/bh5lnxwkq7nrwy0hh2tiq/burs2.png?rlkey=pvmywttrdg94m4nwhpyflt38q&st=b4xhc5us&dl=1&raw=1"
        },
        {
          id: 3,
          title: "İtalya'da Vergi Sistemi: Yeni Başlayanlar İçin Rehber",
          excerpt: "İtalya'nın karmaşık vergi sistemini anlamak için temel bilgiler. Hangi vergileri ödemek zorundasınız?",
          author: "Oğuzhan Aslan",
          date: "15 Aralık 2024",
          readTime: 10,
          category: "Finansal Danışmanlık",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1"
        },
        {
          id: 4,
          title: "İtalyan Üniversitelerine Başvuru Süreci",
          excerpt: "İtalya'da eğitim almak isteyen öğrenciler için kapsamlı başvuru rehberi. Hangi üniversite size uygun?",
          author: "Ece Melisa Özgüner",
          date: "12 Aralık 2024",
          readTime: 15,
          category: "Eğitim",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/y6en2p5fi5mg8clye3cnt/milanoyeni.jpg?rlkey=dfca5yg6f7mzeju965vbr6f8f&st=gsr57h2m&dl=1&raw=1"
        },
        {
          id: 5,
          title: "Milano'da Yaşam: Mahalle Rehberi",
          excerpt: "Milano'nun en popüler mahallelerini ve yaşam maliyetlerini inceliyoruz. Hangi bölge size uygun?",
          author: "Bumin Kağan Çetin",
          date: "10 Aralık 2024",
          readTime: 7,
          category: "Yaşam",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1"
        },
        {
          id: 6,
          title: "İtalya'da Çalışma İzni Alma Süreci",
          excerpt: "İtalya'da çalışma izni almak için gerekli adımlar ve belgeler. Süreç ne kadar sürüyor?",
          author: "Oğuzhan Aslan",
          date: "8 Aralık 2024",
          readTime: 9,
          category: "Yasal Süreçler",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1"
        }
      ]
    },
    en: {
      title: "Blog",
      subtitle: "Guide to doing business and living in Italy",
      description: "Valuable content from our expert team on business establishment, financial consulting, visa processes, and integration in Italy.",
      featured: "Featured",
      readMore: "Read More",
      readTime: "min read",
      categories: {
        all: "All",
        business: "Business Setup",
        visa: "Visa & Permits",
        financial: "Financial Consulting",
        education: "Education",
        lifestyle: "Lifestyle",
        legal: "Legal Processes"
      },
      articles: [
        {
          id: 1,
          title: "10 Steps to Setting Up a Company in Italy",
          excerpt: "We explain the company formation process in Italy step by step. What documents are needed, how does the process work, and what should you pay attention to?",
          author: "Bumin Kağan Çetin",
          date: "December 20, 2024",
          readTime: 8,
          category: "Business Setup",
          featured: true,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1"
        },
        {
          id: 2,
          title: "2025 Italy Visa Application Guide",
          excerpt: "All the details you need to know when applying for a visa to Italy in 2025. Which visa type is right for you?",
          author: "Ece Melisa Özgüner",
          date: "December 18, 2024",
          readTime: 12,
          category: "Visa & Permits",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/bh5lnxwkq7nrwy0hh2tiq/burs2.png?rlkey=pvmywttrdg94m4nwhpyflt38q&st=b4xhc5us&dl=1&raw=1"
        },
        {
          id: 3,
          title: "Tax System in Italy: A Guide for Beginners",
          excerpt: "Basic information to understand Italy's complex tax system. Which taxes are you obligated to pay?",
          author: "Oğuzhan Aslan",
          date: "December 15, 2024",
          readTime: 10,
          category: "Financial Consulting",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1"
        },
        {
          id: 4,
          title: "Application Process for Italian Universities",
          excerpt: "Comprehensive application guide for students who want to study in Italy. Which university is right for you?",
          author: "Ece Melisa Özgüner",
          date: "December 12, 2024",
          readTime: 15,
          category: "Education",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/y6en2p5fi5mg8clye3cnt/milanoyeni.jpg?rlkey=dfca5yg6f7mzeju965vbr6f8f&st=gsr57h2m&dl=1&raw=1"
        },
        {
          id: 5,
          title: "Life in Milan: Neighborhood Guide",
          excerpt: "We examine Milan's most popular neighborhoods and cost of living. Which area is right for you?",
          author: "Bumin Kağan Çetin",
          date: "December 10, 2024",
          readTime: 7,
          category: "Lifestyle",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1"
        },
        {
          id: 6,
          title: "Work Permit Application Process in Italy",
          excerpt: "Required steps and documents to obtain a work permit in Italy. How long does the process take?",
          author: "Oğuzhan Aslan",
          date: "December 8, 2024",
          readTime: 9,
          category: "Legal Processes",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1"
        }
      ]
    },
    it: {
      title: "Blog",
      subtitle: "Guida per fare business e vivere in Italia",
      description: "Contenuti preziosi dal nostro team di esperti su costituzione aziendale, consulenza finanziaria, processi di visto e integrazione in Italia.",
      featured: "In Evidenza",
      readMore: "Leggi di Più",
      readTime: "min di lettura",
      categories: {
        all: "Tutti",
        business: "Costituzione Aziendale",
        visa: "Visti e Permessi",
        financial: "Consulenza Finanziaria",
        education: "Educazione",
        lifestyle: "Stile di Vita",
        legal: "Processi Legali"
      },
      articles: [
        {
          id: 1,
          title: "10 Passi per Costituire un'Azienda in Italia",
          excerpt: "Spieghiamo il processo di costituzione aziendale in Italia passo dopo passo. Quali documenti servono, come funziona il processo e a cosa prestare attenzione?",
          author: "Bumin Kağan Çetin",
          date: "20 Dicembre 2024",
          readTime: 8,
          category: "Costituzione Aziendale",
          featured: true,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1"
        },
        {
          id: 2,
          title: "Guida alla Domanda di Visto per l'Italia 2025",
          excerpt: "Tutti i dettagli da sapere quando si richiede un visto per l'Italia nel 2025. Quale tipo di visto è giusto per te?",
          author: "Ece Melisa Özgüner",
          date: "18 Dicembre 2024",
          readTime: 12,
          category: "Visti e Permessi",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/bh5lnxwkq7nrwy0hh2tiq/burs2.png?rlkey=pvmywttrdg94m4nwhpyflt38q&st=b4xhc5us&dl=1&raw=1"
        },
        {
          id: 3,
          title: "Sistema Fiscale in Italia: Una Guida per Principianti",
          excerpt: "Informazioni di base per comprendere il complesso sistema fiscale italiano. Quali tasse sei obbligato a pagare?",
          author: "Oğuzhan Aslan",
          date: "15 Dicembre 2024",
          readTime: 10,
          category: "Consulenza Finanziaria",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1"
        },
        {
          id: 4,
          title: "Processo di Domanda per le Università Italiane",
          excerpt: "Guida completa alla domanda per gli studenti che vogliono studiare in Italia. Quale università è giusta per te?",
          author: "Ece Melisa Özgüner",
          date: "12 Dicembre 2024",
          readTime: 15,
          category: "Educazione",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/y6en2p5fi5mg8clye3cnt/milanoyeni.jpg?rlkey=dfca5yg6f7mzeju965vbr6f8f&st=gsr57h2m&dl=1&raw=1"
        },
        {
          id: 5,
          title: "Vita a Milano: Guida ai Quartieri",
          excerpt: "Esaminiamo i quartieri più popolari di Milano e il costo della vita. Quale area è giusta per te?",
          author: "Bumin Kağan Çetin",
          date: "10 Dicembre 2024",
          readTime: 7,
          category: "Stile di Vita",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/n8abtlx6olxbmtnwhgi4a/milano2.jpg?rlkey=imyqk3wlq0w9x3ohnmmfagco8&st=fgghxlun&dl=1&raw=1"
        },
        {
          id: 6,
          title: "Processo di Domanda per Permesso di Lavoro in Italia",
          excerpt: "Passi e documenti necessari per ottenere un permesso di lavoro in Italia. Quanto tempo richiede il processo?",
          author: "Oğuzhan Aslan",
          date: "8 Dicembre 2024",
          readTime: 9,
          category: "Processi Legali",
          featured: false,
          image: "https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1"
        }
      ]
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

const BlogPage = () => {
  const { language } = useLanguage();
  const c = getBlogContent(language);

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg-primary)'}}>
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16" style={{backgroundColor: 'var(--bg-primary)'}}>
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaBookOpen className="text-4xl" style={{color: 'var(--brand-blue)'}} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>
                {c.title}
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--text-secondary)'}}>
                {c.subtitle}
              </p>
              <p className="text-lg mt-4 max-w-2xl mx-auto" style={{color: 'var(--text-muted)'}}>
                {c.description}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{color: 'var(--text-primary)'}}>
              {c.featured} {c.title}
            </h2>
            {c.articles.filter(article => article.featured).map((article) => (
              <article key={article.id} className="rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto" style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-secondary)'
              }}>
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <Image 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-64 md:h-full object-cover"
                      width={256}
                      height={256}
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center text-sm mb-3" style={{color: 'var(--text-muted)'}}>
                      <FaCalendarAlt className="mr-2" />
                      {article.date}
                      <span className="mx-2">•</span>
                      <FaUser className="mr-2" />
                      {article.author}
                      <span className="mx-2">•</span>
                      <FaBookOpen className="mr-1" />
                      {article.readTime} {c.readTime}
                    </div>
                    
                    <div className="mb-3">
                      <span className="inline-block text-white text-xs px-2 py-1 rounded" style={{backgroundColor: 'var(--brand-blue)'}}>
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>
                      {article.title}
                    </h3>
                    
                    <p className="mb-6 line-clamp-4" style={{color: 'var(--text-secondary)'}}>
                      {article.excerpt}
                    </p>
                    
                    <button className="inline-flex items-center font-medium transition-colors" style={{color: 'var(--brand-blue)'}}>
                      <Link href={`/blog/${article.id}`}>
                        {c.readMore} <FaArrowRight className="ml-2" />
                      </Link>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16" style={{backgroundColor: 'var(--bg-primary)'}}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{color: 'var(--text-primary)'}}>
              {c.title}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {c.articles.filter(article => !article.featured).map((article) => (
                <article
                  key={article.id}
                  className="rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-secondary)'
                  }}
                >
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    width={192}
                    height={192}
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm mb-3" style={{color: 'var(--text-muted)'}}>
                      <FaCalendarAlt className="mr-2" />
                      {article.date}
                      <span className="mx-2">•</span>
                      <FaBookOpen className="mr-1" />
                      {article.readTime} {c.readTime}
                    </div>
                    
                    <div className="mb-3">
                      <span className="inline-block text-xs px-2 py-1 rounded" style={{
                        backgroundColor: 'var(--bg-surface-hover)',
                        color: 'var(--text-secondary)'
                      }}>
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2" style={{color: 'var(--text-primary)'}}>
                      {article.title}
                    </h3>
                    
                    <p className="mb-4 line-clamp-3" style={{color: 'var(--text-secondary)'}}>
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{color: 'var(--text-muted)'}}>
                        {article.author}
                      </span>
                      <button className="font-medium transition-colors" style={{color: 'var(--brand-blue)'}}>
                        <Link href={`/blog/${article.id}`}>
                          {c.readMore} →
                        </Link>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage; 