"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

const getMethodologyContent = (lang: string) => {
  const content = {
    tr: {
      title: "Metodolojimiz",
      subtitle: "Gut Feeling'i Vector Math ile Değiştiriyoruz",
      description: "Geleneksel danışmanlar eski el kitaplarına güvenir. Biz, gerçek zamanlı ekonomik verileri ISTAT ve TÜİK'ten çekerek, şirket kurmadan önce başarı olasılığınızı modelliyoruz.",
      badge: "ALGORİTMİK DANIŞMANLIK v2.0",
      step1Title: "Veri Toplama",
      step1Desc: "Sadece vergilere bakmıyoruz. Sektöre özgü verileri topluyoruz: Bursa vs. Milano'daki işçilik maliyetleri, depo kiraları ve gerçek zamanlı döviz kuru volatilitesi.",
      step2Title: "Sürtünme Modeli",
      step2Desc: "Bürokrasinin gizli maliyetlerini hesaplıyoruz. Vize gecikmeleri, noter ücretleri ve gümrük beklemeleri nicelleştirilir ve marjınıza dahil edilir.",
      step3Title: "Senaryo Testi",
      step3Desc: "3 piyasa koşulunu (Yükseliş, Düşüş, Durgun) simüle ediyoruz, böylece işletme yapınızın ekonomik bir düşüşte hayatta kalmasını sağlıyoruz.",
      dataSourcesTitle: "İstihbarat Ağımız",
      istat: "İtalyan İstatistik Bürosu",
      tuik: "Türk İstatistik Enstitüsü",
      forex: "Forex Volatilitesi",
      gazzetta: "Resmi Yasal Dergiler",
      ctaTitle: "Tahmin etmeyi bırakın. Hesaplamaya başlayın.",
      ctaButton: "İşletmeniz İçin Modeli Çalıştırın"
    },
    en: {
      title: "Our Methodology",
      subtitle: "We replace \"Gut Feeling\" with Vector Math.",
      description: "Traditional consultants rely on outdated handbooks. We scrape real-time economic data from ISTAT and TÜİK to model your success probability before you incorporate.",
      badge: "ALGORITHMIC CONSULTING v2.0",
      step1Title: "Data Ingestion",
      step1Desc: "We don't just look at taxes. We ingest sector-specific data: labor costs in Bursa vs. Milan, warehouse rents, and real-time exchange rate volatility.",
      step2Title: "The \"Friction\" Model",
      step2Desc: "We calculate the hidden costs of bureaucracy. Visa delays, notary fees, and customs hold-ups are quantified and factored into your margin.",
      step3Title: "Scenario Testing",
      step3Desc: "We simulate 3 market conditions (Bull, Bear, Stagnant) to ensure your business structure survives an economic downturn.",
      dataSourcesTitle: "Our Intelligence Network",
      istat: "Italian Stats Bureau",
      tuik: "Turkish Stat Institute",
      forex: "Forex Volatility",
      gazzetta: "Official Legal Journals",
      ctaTitle: "Stop guessing. Start calculating.",
      ctaButton: "Run The Model For Your Business"
    },
    it: {
      title: "La Nostra Metodologia",
      subtitle: "Sostituiamo il \"Sentimento\" con la Matematica Vettoriale",
      description: "I consulenti tradizionali si affidano a manuali obsoleti. Noi estraiamo dati economici in tempo reale da ISTAT e TÜİK per modellare la probabilità di successo prima di costituire l'azienda.",
      badge: "CONSULENZA ALGORITMICA v2.0",
      step1Title: "Acquisizione Dati",
      step1Desc: "Non guardiamo solo le tasse. Acquisiamo dati specifici del settore: costi del lavoro a Bursa vs. Milano, affitti di magazzini e volatilità del tasso di cambio in tempo reale.",
      step2Title: "Il Modello di \"Attrito\"",
      step2Desc: "Calcoliamo i costi nascosti della burocrazia. I ritardi dei visti, le spese notarili e le attese doganali sono quantificati e inclusi nel tuo margine.",
      step3Title: "Test di Scenario",
      step3Desc: "Simuliamo 3 condizioni di mercato (Toro, Orso, Stagnante) per garantire che la struttura aziendale sopravviva a una recessione economica.",
      dataSourcesTitle: "La Nostra Rete di Intelligence",
      istat: "Ufficio Statistico Italiano",
      tuik: "Istituto Statistico Turco",
      forex: "Volatilità Forex",
      gazzetta: "Giornali Legali Ufficiali",
      ctaTitle: "Smetti di indovinare. Inizia a calcolare.",
      ctaButton: "Esegui Il Modello Per La Tua Azienda"
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

const Methodology = () => {
  const { language } = useLanguage();
  const c = getMethodologyContent(language);

  return (
    <section id="methodology" className="relative py-24 border-y overflow-hidden" style={{
      borderColor: 'var(--border-secondary)',
      backgroundColor: 'var(--bg-primary)'
    }}>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none opacity-50"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Code Visual */}
          <div className="code-window rounded-xl overflow-hidden font-mono text-sm relative group shadow-2xl" style={{
            backgroundColor: 'var(--bg-surface-hover)',
            border: '1px solid var(--border-secondary)'
          }}>
            {/* Window Controls */}
            <div className="px-4 py-2 flex gap-2 items-center" style={{backgroundColor: 'var(--bg-surface)'}}>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-auto text-xs" style={{color: 'var(--text-muted)'}}>market_sim.py</div>
            </div>
            {/* Code Content */}
            <div className="p-6 overflow-x-auto" style={{color: 'var(--text-secondary)'}}>
              <pre className="text-xs md:text-sm">
                <code>
                  <span className="text-pink-400">import</span> pandas <span className="text-pink-400">as</span> pd{'\n'}
                  <span className="text-pink-400">from</span> sklearn.ensemble <span className="text-pink-400">import</span> RandomForestRegressor{'\n\n'}
                  <span className="text-slate-500"># Load Economic Indicators</span>{'\n'}
                  italy_data = pd.read_api(<span className="text-green-400">"ISTAT_GDP_Q4"</span>){'\n'}
                  turkey_data = pd.read_api(<span className="text-green-400">"TUIK_INFLATION"</span>){'\n\n'}
                  <span className="text-blue-400">def</span> <span className="text-yellow-400">calculate_viability</span>(sector, capital):{'\n'}
                  {'  '}risk_score = <span className="text-pink-400">0</span>{'\n'}
                  {'  '}{'\n'}
                  {'  '}<span className="text-slate-500"># Analyze Regulatory Friction</span>{'\n'}
                  {'  '}<span className="text-pink-400">if</span> sector == <span className="text-green-400">"TEXTILE"</span> <span className="text-pink-400">and</span> destination == <span className="text-green-400">"IT"</span>:{'\n'}
                  {'    '}risk_score += <span className="text-pink-400">0.45</span> <span className="text-slate-500"># Made in Italy premium</span>{'\n'}
                  {'  '}{'\n'}
                  {'  '}<span className="text-slate-500"># Tax Arbitrage Calculation</span>{'\n'}
                  {'  '}margin = (italy_price - turkey_cost) * <span className="text-pink-400">0.78</span>{'\n'}
                  {'  '}{'\n'}
                  {'  '}<span className="text-pink-400">return</span> {'{'}{'\n'}
                  {'    '}<span className="text-green-400">"roi_projection"</span>: margin,{'\n'}
                  {'    '}<span className="text-green-400">"risk_index"</span>: risk_score{'\n'}
                  {'  '}{'}'}{'\n\n'}
                  <span className="text-pink-400">print</span>(<span className="text-green-400">"Model Loaded. Ready for Input."</span>)
                </code>
              </pre>
            </div>
            {/* Scanning Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent h-[100px] w-full animate-pulse pointer-events-none"></div>
          </div>

          {/* Explanation */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--text-primary)'}}>1. {c.step1Title}</h3>
              <p style={{color: 'var(--text-secondary)'}}>{c.step1Desc}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--text-primary)'}}>2. {c.step2Title}</h3>
              <p style={{color: 'var(--text-secondary)'}}>{c.step2Desc}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--text-primary)'}}>3. {c.step3Title}</h3>
              <p style={{color: 'var(--text-secondary)'}}>{c.step3Desc}</p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-20">
          <h2 className="text-center text-3xl font-bold mb-16" style={{color: 'var(--text-primary)'}}>{c.dataSourcesTitle}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 border rounded-lg text-center transition-colors group" style={{
              borderColor: 'var(--border-secondary)',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <div className="text-2xl font-bold mb-1 transition-colors" style={{color: 'var(--brand-blue)'}}>ISTAT</div>
              <div className="text-xs font-mono" style={{color: 'var(--text-muted)'}}>{c.istat}</div>
            </div>
            <div className="p-6 border rounded-lg text-center transition-colors group" style={{
              borderColor: 'var(--border-secondary)',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <div className="text-2xl font-bold mb-1 transition-colors" style={{color: 'var(--brand-orange)'}}>TÜİK</div>
              <div className="text-xs font-mono" style={{color: 'var(--text-muted)'}}>{c.tuik}</div>
            </div>
            <div className="p-6 border rounded-lg text-center transition-colors group" style={{
              borderColor: 'var(--border-secondary)',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <div className="text-2xl font-bold mb-1 transition-colors" style={{color: '#a855f7'}}>EUR/TRY</div>
              <div className="text-xs font-mono" style={{color: 'var(--text-muted)'}}>{c.forex}</div>
            </div>
            <div className="p-6 border rounded-lg text-center transition-colors group" style={{
              borderColor: 'var(--border-secondary)',
              backgroundColor: 'var(--bg-surface)'
            }}>
              <div className="text-2xl font-bold mb-1 transition-colors" style={{color: 'var(--text-primary)'}}>Gazzetta</div>
              <div className="text-xs font-mono" style={{color: 'var(--text-muted)'}}>{c.gazzetta}</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center border-t pt-16" style={{borderColor: 'var(--border-secondary)'}}>
          <h2 className="text-3xl font-bold mb-6" style={{color: 'var(--text-primary)'}}>{c.ctaTitle}</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold transition-all"
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = 'var(--brand-orange)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
          >
            {c.ctaButton}
            <FaChartLine className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Methodology;

