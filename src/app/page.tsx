"use client";

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import CompanyHighlights from '@/components/sections/CompanyHighlights';
import Blog from '@/components/sections/Blog';
import Methodology from '@/components/sections/Methodology';
import TrustedCompanies from '@/components/sections/TrustedCompanies';
import Contact from '@/components/sections/Contact';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FaChartLine, FaCode, FaBuilding, FaBox, FaChartPie, FaArrowRight } from 'react-icons/fa';

const getHeroContent = (lang: string) => {
  const content = {
    tr: {
      badge: "Milano ↔ İstanbul",
      title: "Sınır Ötesi",
      titleHighlight: "Ölçek Mühendisliği.",
      description: "Sadece tavsiye vermiyoruz. Genişlemenizi mimariyoruz. İtalya ve Türkiye arasında hareket eden KOBİ'ler ve Profesyoneller için veri odaklı finansal köprü.",
      button1: "Potansiyelinizi Analiz Edin",
      button2: "Metodolojiyi Görüntüle",
      stat1Value: "€50M+",
      stat1Label: "Analiz Edilen Ticaret Hacmi",
      stat2Value: "100%",
      stat2Label: "Bocconi Mezunu Ekip"
    },
    en: {
      badge: "Milan ↔ Istanbul",
      title: "Cross-Border",
      titleHighlight: "Scale Engineering.",
      description: "We don't just advise. We architect your expansion. A data-driven financial bridge for SMEs and Professionals moving between Italy and Turkey.",
      button1: "Analyze Your Potential",
      button2: "View Methodology",
      stat1Value: "€50M+",
      stat1Label: "Trade Volume Analyzed",
      stat2Value: "100%",
      stat2Label: "Bocconi Alumni Team"
    },
    it: {
      badge: "Milano ↔ Istanbul",
      title: "Scala Transfrontaliera",
      titleHighlight: "Ingegneria.",
      description: "Non solo consigliamo. Architettiamo la tua espansione. Un ponte finanziario basato sui dati per PMI e professionisti che si muovono tra Italia e Turchia.",
      button1: "Analizza il Tuo Potenziale",
      button2: "Visualizza Metodologia",
      stat1Value: "€50M+",
      stat1Label: "Volume Commerciale Analizzato",
      stat2Value: "100%",
      stat2Label: "Team Alumni Bocconi"
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

export default function Home() {
  const { language } = useLanguage();
  const c = getHeroContent(language);

  return (
    <main className="min-h-screen" style={{backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)'}}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid"></div>
      <div className="orb w-[500px] h-[500px] bg-[#3c77ad] top-[-100px] left-[-100px] animate-pulse opacity-40"></div>
      <div className="orb w-[400px] h-[400px] bg-[#f58643] bottom-[0px] right-[-100px] animate-pulse opacity-40" style={{animationDelay: '2s'}}></div>

      <Navbar />
      
      {/* HERO SECTION: The Bridge */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" style={{minHeight: '100vh'}}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider uppercase" style={{borderColor: 'rgba(60, 119, 173, 0.3)', backgroundColor: 'rgba(60, 119, 173, 0.1)', color: '#3c77ad'}}>
              <span className="w-2 h-2 rounded-full bg-[#3c77ad] animate-pulse"></span>
              {c.badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight" style={{color: 'var(--text-primary)'}}>
              {c.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3c77ad] to-[#f58643]">{c.titleHighlight}</span>
            </h1>
            
            <p className="text-lg max-w-lg leading-relaxed" style={{color: 'var(--text-secondary)'}}>
              {c.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#f58643] text-white rounded-lg font-semibold hover:bg-[#d97335] transition-all duration-300 shadow-[0_0_20px_rgba(245,134,67,0.3)] flex items-center justify-center gap-2 group"
              >
                {c.button1}
                <FaChartLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#methodology"
                className="px-8 py-4 glass-card text-white rounded-lg font-medium hover:border-[#3c77ad] transition-all duration-300 flex items-center justify-center gap-2"
              >
                {c.button2}
                <FaCode className="w-4 h-4" style={{color: '#94a3b8'}} />
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-8 border-t" style={{borderColor: 'var(--border-secondary)'}}>
              <div className="text-xs font-mono" style={{color: 'var(--text-muted)'}}>
                <span className="font-bold block text-lg" style={{color: 'var(--text-primary)'}}>{c.stat1Value}</span>
                {c.stat1Label}
              </div>
              <div className="w-px h-8" style={{backgroundColor: 'var(--border-secondary)'}}></div>
              <div className="text-xs font-mono" style={{color: 'var(--text-muted)'}}>
                <span className="font-bold block text-lg" style={{color: 'var(--text-primary)'}}>{c.stat2Value}</span>
                {c.stat2Label}
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative h-[500px] w-full hidden md:block">
            <div className="absolute inset-0 border rounded-2xl backdrop-blur-sm p-6 overflow-hidden" style={{borderColor: 'var(--border-secondary)', backgroundColor: 'var(--bg-surface)'}}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3c77ad] to-[#f58643]"></div>
              
              <div className="flex justify-between items-center mb-8 font-mono text-xs" style={{color: 'var(--text-muted)'}}>
                <span>SOURCE: MIL_HQ_NODE</span>
                <span className="animate-pulse" style={{color: 'var(--brand-orange)'}}>LIVE FEED ●</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded border flex items-center gap-4 animate-float" style={{borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-surface-hover)'}}>
                  <div className="w-10 h-10 rounded flex items-center justify-center" style={{backgroundColor: 'rgba(60, 119, 173, 0.2)', color: 'var(--brand-blue)'}}>
                    <FaBuilding className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{color: 'var(--text-primary)'}}>Entity Incorporation</div>
                    <div className="text-xs" style={{color: 'var(--text-secondary)'}}>Milan, Italy → Processing</div>
                  </div>
                  <div className="ml-auto font-mono text-xs" style={{color: 'var(--brand-blue)'}}>98%</div>
                </div>

                <div className="p-4 rounded border flex items-center gap-4 animate-float" style={{borderColor: 'var(--border-secondary)', backgroundColor: 'var(--bg-surface-hover)', animationDelay: '1s'}}>
                  <div className="w-10 h-10 rounded flex items-center justify-center" style={{backgroundColor: 'rgba(245, 134, 67, 0.2)', color: 'var(--brand-orange)'}}>
                    <FaBox className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{color: 'var(--text-primary)'}}>Supply Chain Optimization</div>
                    <div className="text-xs" style={{color: 'var(--text-secondary)'}}>Istanbul, Turkey → Optimized</div>
                  </div>
                  <div className="ml-auto font-mono text-xs" style={{color: 'var(--brand-orange)'}}>+24%</div>
                </div>

                <div className="p-4 rounded border flex items-center gap-4 animate-float" style={{borderColor: 'var(--border-secondary)', backgroundColor: 'var(--bg-surface-hover)', animationDelay: '2s'}}>
                  <div className="w-10 h-10 rounded flex items-center justify-center" style={{backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7'}}>
                    <FaChartPie className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{color: 'var(--text-primary)'}}>Tax Arbitrage Model</div>
                    <div className="text-xs" style={{color: 'var(--text-secondary)'}}>Cross-Border → Calculation</div>
                  </div>
                  <div className="ml-auto font-mono text-xs" style={{color: '#a855f7'}}>READY</div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 border-t border-l opacity-50" style={{borderColor: 'var(--border-secondary)'}}></div>
            </div>
          </div>
        </div>
      </section>

      <Hero />
      <CompanyHighlights />
      <Services />
      
      {/* Expansion Section */}
      <section className="py-0 relative z-10 border-y" style={{borderColor: 'var(--border-secondary)'}}>
        <div className="grid md:grid-cols-2">
          {/* Left: Italy Context */}
          <Link href="/services/financial/consulting/expansion-italy" className="group relative p-12 md:p-24 border-r overflow-hidden" style={{borderColor: 'var(--border-secondary)'}}>
            <div className="absolute inset-0 transition-colors duration-500 group-hover:bg-[#3c77ad]/10" style={{backgroundColor: 'rgba(60, 119, 173, 0.05)'}}></div>
            <div className="relative z-10">
              <div className="font-mono text-xs mb-4" style={{color: 'var(--brand-blue)'}}>DIRECTION: WEST</div>
              <h3 className="text-3xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>Expand to Italy</h3>
              <p className="mb-8 max-w-sm" style={{color: 'var(--text-secondary)'}}>For Turkish SMEs seeking EU prestige. We handle the P.IVA setup, fiscal representation, and Milanese networking.</p>
              <div className="inline-flex items-center gap-2 border-b pb-1 transition-colors" style={{color: 'var(--text-primary)', borderColor: 'var(--brand-blue)'}}>
                Start Italian Entry <FaArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Right: Turkey Context */}
          <Link href="/services/financial/consulting/expansion-turkey" className="group relative p-12 md:p-24 overflow-hidden">
            <div className="absolute inset-0 transition-colors duration-500 group-hover:bg-[#f58643]/10" style={{backgroundColor: 'rgba(245, 134, 67, 0.05)'}}></div>
            <div className="relative z-10">
              <div className="font-mono text-xs mb-4" style={{color: 'var(--brand-orange)'}}>DIRECTION: EAST</div>
              <h3 className="text-3xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>Scale in Turkey</h3>
              <p className="mb-8 max-w-sm" style={{color: 'var(--text-secondary)'}}>For Italian firms seeking production power and young demographics. Manufacturing partnerships and cost-reduction analysis.</p>
              <div className="inline-flex items-center gap-2 border-b pb-1 transition-colors" style={{color: 'var(--text-primary)', borderColor: 'var(--brand-orange)'}}>
                Start Turkish Expansion <FaArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Methodology />
      <Blog />
      <TrustedCompanies />
      <Contact />
    </main>
  );
}
