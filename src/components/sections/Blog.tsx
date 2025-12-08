'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import { AbstractArt } from '@/components/AbstractArt';
import { FaCalendarAlt, FaUser, FaArrowRight, FaBookOpen, FaTag } from 'react-icons/fa';
import Link from 'next/link';

const getBlogContent = (lang: string) => {
  const content = {
    tr: {
        title: "Blog",
        subtitle: "İtalya'da iş kurma ve yaşam rehberi",
        description: "Uzman ekibimizden İtalya'da iş kurma, finansal danışmanlık, vize süreçleri ve entegrasyon konularında değerli içerikler.",
        featured: "Öne Çıkan",
        readMore: "Devamını Oku",
        readTime: "dk okuma",
        articles: [
          // Keeping your text, just adding 'variant' for the art
          { id: 1, title: "İtalya'da Şirket Kurmanın 10 Adımı", excerpt: "İtalya'da şirket kurma sürecini adım adım açıklıyoruz. Hangi belgeler gerekli?", author: "Bumin Kağan Çetin", date: "20 Ara 2024", readTime: 8, category: "İş Kurma", featured: true, variant: 'blue' },
          { id: 2, title: "2025 İtalya Vize Başvuru Rehberi", excerpt: "2025 yılında İtalya'ya vize başvurusu yaparken bilmeniz gereken tüm detaylar.", author: "Ece Melisa Özgüner", date: "18 Ara 2024", readTime: 12, category: "Vize & İzinler", featured: false, variant: 'purple' },
          { id: 3, title: "İtalya'da Vergi Sistemi Rehberi", excerpt: "İtalya'nın karmaşık vergi sistemini anlamak için temel bilgiler.", author: "Oğuzhan Aslan", date: "15 Ara 2024", readTime: 10, category: "Finansal", featured: false, variant: 'gold' },
          { id: 4, title: "İtalyan Üniversitelerine Başvuru", excerpt: "İtalya'da eğitim almak isteyen öğrenciler için kapsamlı başvuru rehberi.", author: "Ece Melisa Özgüner", date: "12 Ara 2024", readTime: 15, category: "Eğitim", featured: false, variant: 'blue' },
          { id: 5, title: "Milano'da Yaşam: Mahalle Rehberi", excerpt: "Milano'nun en popüler mahallelerini ve yaşam maliyetlerini inceliyoruz.", author: "Bumin Kağan Çetin", date: "10 Ara 2024", readTime: 7, category: "Yaşam", featured: false, variant: 'dark' },
          { id: 6, title: "Çalışma İzni Alma Süreci", excerpt: "İtalya'da çalışma izni almak için gerekli adımlar ve belgeler.", author: "Oğuzhan Aslan", date: "8 Ara 2024", readTime: 9, category: "Yasal", featured: false, variant: 'purple' }
        ]
    },
    en: {
        title: "Blog",
        subtitle: "Guide to doing business and living in Italy",
        description: "Valuable content from our expert team on business establishment and financial consulting.",
        featured: "Featured",
        readMore: "Read More",
        readTime: "min read",
        articles: [
          { id: 1, title: "10 Steps to Setting Up a Company", excerpt: "We explain the company formation process in Italy step by step.", author: "Bumin Kağan Çetin", date: "Dec 20, 2024", readTime: 8, category: "Business Setup", featured: true, variant: 'blue' },
          { id: 2, title: "2025 Italy Visa Guide", excerpt: "All the details you need to know when applying for a visa to Italy in 2025.", author: "Ece Melisa Özgüner", date: "Dec 18, 2024", readTime: 12, category: "Visa & Permits", featured: false, variant: 'purple' },
          { id: 3, title: "Italy Tax System Guide", excerpt: "Basic information to understand Italy's complex tax system.", author: "Oğuzhan Aslan", date: "Dec 15, 2024", readTime: 10, category: "Financial", featured: false, variant: 'gold' },
          { id: 4, title: "University Application Process", excerpt: "Comprehensive application guide for students wanting to study in Italy.", author: "Ece Melisa Özgüner", date: "Dec 12, 2024", readTime: 15, category: "Education", featured: false, variant: 'blue' },
          { id: 5, title: "Life in Milan Guide", excerpt: "We examine Milan's most popular neighborhoods and cost of living.", author: "Bumin Kağan Çetin", date: "Dec 10, 2024", readTime: 7, category: "Lifestyle", featured: false, variant: 'dark' },
          { id: 6, title: "Work Permit Process", excerpt: "Required steps and documents to obtain a work permit in Italy.", author: "Oğuzhan Aslan", date: "Dec 8, 2024", readTime: 9, category: "Legal", featured: false, variant: 'purple' }
        ]
    },
    it: {
        title: "Blog",
        subtitle: "Guida per fare business e vivere in Italia",
        description: "Contenuti preziosi dal nostro team di esperti su costituzione aziendale.",
        featured: "In Evidenza",
        readMore: "Leggi di Più",
        readTime: "min lettura",
        articles: [
          { id: 1, title: "10 Passi per Costituire un'Azienda", excerpt: "Spieghiamo il processo di costituzione aziendale in Italia passo dopo passo.", author: "Bumin Kağan Çetin", date: "20 Dic 2024", readTime: 8, category: "Business", featured: true, variant: 'blue' },
          { id: 2, title: "Guida Visti Italia 2025", excerpt: "Tutti i dettagli da sapere quando si richiede un visto per l'Italia nel 2025.", author: "Ece Melisa Özgüner", date: "18 Dic 2024", readTime: 12, category: "Visti", featured: false, variant: 'purple' },
          { id: 3, title: "Sistema Fiscale Italiano", excerpt: "Informazioni di base per comprendere il complesso sistema fiscale.", author: "Oğuzhan Aslan", date: "15 Dic 2024", readTime: 10, category: "Fiscale", featured: false, variant: 'gold' },
          { id: 4, title: "Università Italiane", excerpt: "Guida completa alla domanda per gli studenti.", author: "Ece Melisa Özgüner", date: "12 Dic 2024", readTime: 15, category: "Educazione", featured: false, variant: 'blue' },
          { id: 5, title: "Vita a Milano", excerpt: "Esaminiamo i quartieri più popolari di Milano.", author: "Bumin Kağan Çetin", date: "10 Dic 2024", readTime: 7, category: "Lifestyle", featured: false, variant: 'dark' },
          { id: 6, title: "Permesso di Lavoro", excerpt: "Passi e documenti necessari per ottenere un permesso.", author: "Oğuzhan Aslan", date: "8 Dic 2024", readTime: 9, category: "Legale", featured: false, variant: 'purple' }
        ]
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

const BlogPage = () => {
  const { language } = useLanguage();
  const c = getBlogContent(language);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Navbar />
      
      <main className="relative pt-24 pb-20">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-grid opacity-40 z-0 pointer-events-none"></div>

        {/* Header */}
        <section className="relative z-10 container mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-[var(--bg-surface)] border border-[var(--border-secondary)]">
            <FaBookOpen className="text-xl text-[var(--brand-blue)]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {c.title}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </section>

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          
          {/* Featured Article */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
               <span className="w-2 h-8 bg-[var(--brand-blue)] rounded-full"></span>
               {c.featured}
            </h2>
            {c.articles.filter(a => a.featured).map((article) => (
              <div key={article.id} className="glass-panel rounded-2xl overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto relative overflow-hidden">
                    {/* Replaced Image with Abstract Art */}
                    <AbstractArt variant={article.variant as any} className="transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-4">
                      <span className="px-3 py-1 rounded-full bg-[var(--bg-surface-hover)] border border-[var(--border-secondary)] text-[var(--brand-blue)] font-medium">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-2"><FaCalendarAlt /> {article.date}</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-[var(--brand-accent)] transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-[var(--text-secondary)] mb-8 text-lg leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <FaUser /> {article.author}
                      </div>
                      <Link href={`/blog/${article.id}`} className="flex items-center gap-2 font-bold text-[var(--brand-blue)] hover:text-white transition-colors">
                        {c.readMore} <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid Layout for other articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.articles.filter(a => !a.featured).map((article) => (
              <article key={article.id} className="glass-panel rounded-xl overflow-hidden flex flex-col group h-full">
                
                {/* Card Image Area */}
                <div className="h-48 relative overflow-hidden">
                  <AbstractArt variant={article.variant as any} className="transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-black/50 backdrop-blur-md text-white border border-white/10">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-3">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {article.date}</span>
                    <span className="flex items-center gap-1"><FaBookOpen /> {article.readTime} {c.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--brand-accent)] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>

                  <div className="pt-4 border-t border-[var(--border-secondary)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">{article.author}</span>
                    <Link href={`/blog/${article.id}`} className="text-sm font-semibold text-[var(--brand-blue)] hover:text-white transition-colors flex items-center gap-1">
                      {c.readMore} <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default BlogPage;