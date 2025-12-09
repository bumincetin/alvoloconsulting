"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

type Pillar = {
  title: string;
  colorVar: string;
  items: { title: string; detail: string }[];
};

type Phase = { title: string; points: string[] };

type MethodologyContent = {
  badge: string;
  heading: string;
  intro: string;
  pillars: Pillar[];
  phasesTitle: string;
  phases: Phase[];
  ctaTitle: string;
  ctaButton: string;
};

const contentByLang: Record<string, MethodologyContent> = {
  en: {
    badge: "Our Methodology",
    heading: "Data, Finance, and Growth—Engineered for Expansion",
    intro:
      "A unified operating model that connects data science, financial discipline, and marketing execution. Each phase is measurable, experiment-driven, and built to satisfy compliance and stakeholder review.",
    pillars: [
      {
        title: "Data Science & Analytics",
        colorVar: "var(--brand-blue)",
        items: [
          {
            title: "Data Foundations",
            detail:
              "Event tracking (GA4 + server-side), CDP schema design, PII-safe pipelines, and SLA-based data quality monitors.",
          },
          {
            title: "Modeling & Forecasting",
            detail:
              "Demand forecasting, seasonality decomposition, anomaly detection, churn and LTV propensity scoring with interpretable models.",
          },
          {
            title: "Attribution & Incrementality",
            detail:
              "MMM/bayesian attribution, geo lift tests, holdouts, and causal impact to isolate true channel ROI.",
          },
          {
            title: "Experimentation",
            detail:
              "Hypothesis design, power analysis, sequential testing, and guardrails for product, pricing, and funnel experiments.",
          },
        ],
      },
      {
        title: "Finance & Operations",
        colorVar: "var(--brand-orange)",
        items: [
          {
            title: "Entity Strategy",
            detail:
              "S.r.l. vs. Partita IVA vs. Ltd; capital structure, shareholder agreements, and compliance-critical filings.",
          },
          {
            title: "FP&A & Unit Economics",
            detail:
              "12–24 month financial models, CAC/LTV by segment, payback curves, sensitivity tables, and downside scenarios.",
          },
          {
            title: "Pricing & Packaging",
            detail:
              "Value-based pricing, cohort margin analysis, and discount governance to protect contribution margins.",
          },
          {
            title: "Risk & Controls",
            detail:
              "Treasury setup, cash controls, AML/KYC alignment with partner banks, and SOX-lite process documentation.",
          },
        ],
      },
      {
        title: "Marketing & Growth",
        colorVar: "#9b51e0",
        items: [
          {
            title: "Funnel Architecture",
            detail:
              "Segmented journeys (SMB/enterprise/consumer), lead scoring, and lifecycle playbooks for acquisition and activation.",
          },
          {
            title: "Performance Stack",
            detail:
              "Channel mix modeling, creative testing loops, UTM/auto-tag governance, and feed optimization for paid and organic.",
          },
          {
            title: "Lifecycle & CRM",
            detail:
              "Behavioral triggers, win-back cadences, CSAT/NPS loops, and sales enablement with unified CRM/CDP views.",
          },
          {
            title: "Reporting & Ops",
            detail:
              "Executive scorecards (weekly/monthly), SLA-based lead handling, and MQL→SQL→Revenue accountability dashboards.",
          },
        ],
      },
    ],
    phasesTitle: "Delivery Phases",
    phases: [
      {
        title: "01. Discovery & Scoping",
        points: [
          "Stakeholder interviews, data and tooling inventory, and compliance constraints (GDPR/AML/PII).",
          "Define KPIs, guardrails, and success criteria; map quick wins vs. foundational fixes.",
        ],
      },
      {
        title: "02. Build & Implement",
        points: [
          "Instrumentation, data models, experimentation frameworks, pricing scenarios, and CRM/lifecycle setup.",
          "Run first test flights with control groups and baseline scorecards.",
        ],
      },
      {
        title: "03. Validate & Optimize",
        points: [
          "Measure lift, run sensitivity checks, and iterate on models, pricing, and journeys.",
          "Handover playbooks, SOPs, and dashboards with clear ownership and cadences.",
        ],
      },
    ],
    ctaTitle: "Ready to audit your stack?",
    ctaButton: "Talk to Us",
  },
  tr: {
    badge: "Metodolojimiz",
    heading: "Veri, Finans ve Büyüme — Ölçek için Tasarlandı",
    intro:
      "Veri bilimi, finansal disiplin ve pazarlama icrasını tek bir işletim modelinde birleştiriyoruz. Her aşama ölçülebilir, deney odaklı ve uyumluluk ile paydaş onayına hazır.",
    pillars: [
      {
        title: "Veri Bilimi ve Analitik",
        colorVar: "var(--brand-blue)",
        items: [
          {
            title: "Veri Temelleri",
            detail:
              "Olay izleme (GA4 + sunucu tarafı), CDP şeması, KVKK/PII güvenli hatlar ve SLA tabanlı veri kalite kontrolleri.",
          },
          {
            title: "Modelleme ve Tahmin",
            detail:
              "Talep tahmini, mevsimsellik ayrıştırma, anomali tespiti, churn ve LTV olasılık skorları (yorumlanabilir modeller).",
          },
          {
            title: "Atıf ve Artış",
            detail:
              "MMM/bayes atıf, coğrafi lift testleri, holdout grupları ve gerçek kanal ROI'sini izole eden nedensel etki analizleri.",
          },
          {
            title: "Deney Tasarımı",
            detail:
              "Hipotez tasarımı, güç analizi, ardışık testler ve ürün, fiyatlama, funnel deneyleri için güvenlik sınırları.",
          },
        ],
      },
      {
        title: "Finans ve Operasyon",
        colorVar: "var(--brand-orange)",
        items: [
          {
            title: "Şirket Stratejisi",
            detail:
              "S.r.l. vs. Partita IVA vs. Ltd; sermaye yapısı, ortaklık sözleşmeleri ve uyumluluk kritik beyanlar.",
          },
          {
            title: "Bütçe ve Birim Ekonomileri",
            detail:
              "12–24 aylık finansal modeller, segment bazlı CAC/LTV, geri ödeme eğrileri, hassasiyet analizleri ve downside senaryoları.",
          },
          {
            title: "Fiyatlandırma ve Paketleme",
            detail:
              "Değer odaklı fiyatlama, kohort marj analizi ve katkı marjını koruyan indirim yönetişimi.",
          },
          {
            title: "Risk ve Kontroller",
            detail:
              "Hazine kurulumu, nakit kontrolleri, banka ortaklarıyla AML/KYC uyumu ve hafif iç kontrol dokümantasyonu.",
          },
        ],
      },
      {
        title: "Pazarlama ve Büyüme",
        colorVar: "#9b51e0",
        items: [
          {
            title: "Funnel Mimarisi",
            detail:
              "SMB/kurumsal/tüketici segmentleri için yolculuklar, lead skorlama ve edinim/aktivasyon oyun kitapları.",
          },
          {
            title: "Performans Yığını",
            detail:
              "Kanal miks modelleme, kreatif test döngüleri, UTM/auto-tag yönetişimi ve ücretli/organik feed optimizasyonu.",
          },
          {
            title: "Yaşam Döngüsü ve CRM",
            detail:
              "Davranış tetikleyicileri, geri kazanım kurguları, CSAT/NPS döngüleri ve birleşik CRM/CDP görünümüyle satış desteği.",
          },
          {
            title: "Raporlama ve Operasyon",
            detail:
              "Haftalık/aylık yönetim skorkartları, SLA bazlı lead yönetimi ve MQL→SQL→Gelir hesap verebilirliği panoları.",
          },
        ],
      },
    ],
    phasesTitle: "Teslimat Aşamaları",
    phases: [
      {
        title: "01. Keşif ve Kapsam",
        points: [
          "Paydaş görüşmeleri, veri/araç envanteri ve uyumluluk kısıtları (KVKK/AML/PII).",
          "KPI'lar, sınır koşulları ve başarı kriterlerinin tanımı; hızlı kazanımlar vs. temel düzeltmelerin haritalanması.",
        ],
      },
      {
        title: "02. Kurulum ve Uygulama",
        points: [
          "Enstrümantasyon, veri modelleri, deney çerçeveleri, fiyatlama senaryoları ve CRM/yaşam döngüsü kurulumu.",
          "Kontrol grupları ve temel skorkartlarla ilk test uçuşları.",
        ],
      },
      {
        title: "03. Doğrulama ve Optimizasyon",
        points: [
          "Lift ölçümü, hassasiyet kontrolleri ve model, fiyatlama, yolculuk iterasyonları.",
          "Oyun kitapları, prosedürler ve panoların sahiplik ve ritimlerle devri.",
        ],
      },
    ],
    ctaTitle: "Yığınınızı denetlemeye hazır mısınız?",
    ctaButton: "Bizimle İletişime Geçin",
  },
  it: {
    badge: "La Nostra Metodologia",
    heading: "Dati, Finanza e Crescita — Progettati per la Scala",
    intro:
      "Un modello operativo unico che unisce data science, disciplina finanziaria ed esecuzione marketing. Ogni fase è misurabile, guidata da esperimenti e pronta per compliance e revisione degli stakeholder.",
    pillars: [
      {
        title: "Data Science e Analytics",
        colorVar: "var(--brand-blue)",
        items: [
          {
            title: "Fondazioni Dati",
            detail:
              "Event tracking (GA4 + server-side), design degli schemi CDP, pipeline sicure per PII e monitor SLA per la qualità dei dati.",
          },
          {
            title: "Modelli e Forecast",
            detail:
              "Previsioni di domanda, decomposizione stagionale, rilevazione anomalie, churn e LTV propensity con modelli interpretabili.",
          },
          {
            title: "Attribuzione e Incrementalità",
            detail:
              "MMM/bayes, test geo lift, gruppi holdout e analisi d'impatto causale per isolare il vero ROI di canale.",
          },
          {
            title: "Sperimentazione",
            detail:
              "Design delle ipotesi, power analysis, test sequenziali e guardrail per prodotto, pricing e funnel.",
          },
        ],
      },
      {
        title: "Finanza e Operazioni",
        colorVar: "var(--brand-orange)",
        items: [
          {
            title: "Strategia Societaria",
            detail:
              "S.r.l. vs. Partita IVA vs. Ltd; struttura del capitale, patti parasociali e adempimenti critici di compliance.",
          },
          {
            title: "FP&A ed Economie Unitarie",
            detail:
              "Modelli finanziari 12–24 mesi, CAC/LTV per segmento, curve di payback, analisi di sensitività e scenari downside.",
          },
          {
            title: "Pricing e Packaging",
            detail:
              "Pricing basato sul valore, analisi dei margini per coorte e governance degli sconti per proteggere il contributo.",
          },
          {
            title: "Rischi e Controlli",
            detail:
              "Tesoreria, controlli di cassa, allineamento AML/KYC con le banche partner e documentazione di controlli leggeri.",
          },
        ],
      },
      {
        title: "Marketing e Growth",
        colorVar: "#9b51e0",
        items: [
          {
            title: "Architettura del Funnel",
            detail:
              "Journey segmentate (PMI/enterprise/consumer), lead scoring e playbook di acquisizione e attivazione.",
          },
          {
            title: "Stack di Performance",
            detail:
              "Modelli di channel mix, cicli di test creativi, governance UTM/auto-tag e ottimizzazione dei feed paid/organic.",
          },
          {
            title: "Lifecycle e CRM",
            detail:
              "Trigger comportamentali, win-back, loop CSAT/NPS e sales enablement con vista unificata CRM/CDP.",
          },
          {
            title: "Reporting e Operations",
            detail:
              "Scorecard executive (settimanali/mensili), gestione lead a SLA e accountability MQL→SQL→Ricavi.",
          },
        ],
      },
    ],
    phasesTitle: "Fasi di Delivery",
    phases: [
      {
        title: "01. Discovery e Scoping",
        points: [
          "Interviste agli stakeholder, inventario dati e tool, e vincoli di compliance (GDPR/AML/PII).",
          "Definizione di KPI, guardrail e criteri di successo; mappatura quick win vs. interventi fondamentali.",
        ],
      },
      {
        title: "02. Build e Implementazione",
        points: [
          "Strumentazione, data model, framework di test, scenari di pricing e setup CRM/lifecycle.",
          "Prime prove controllate con gruppi di controllo e scorecard baseline.",
        ],
      },
      {
        title: "03. Validazione e Ottimizzazione",
        points: [
          "Misura del lift, controlli di sensitività e iterazioni su modelli, pricing e journey.",
          "Consegna di playbook, procedure e dashboard con ownership e cadenze definite.",
        ],
      },
    ],
    ctaTitle: "Pronto a fare un audit del tuo stack?",
    ctaButton: "Parla con Noi",
  },
};

const colors = {
  blue: "var(--brand-blue)",
  orange: "var(--brand-orange)",
  purple: "#9b51e0",
};

export default function MethodologyPage() {
  const { language } = useLanguage();
  const content = contentByLang[language] || contentByLang.en;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <section className="pt-24 pb-12 max-w-5xl mx-auto px-6">
        <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2">{content.badge}</div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{content.heading}</h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-3xl">{content.intro}</p>
      </section>

      <section className="pb-12 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {content.pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl p-6 border shadow-sm"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: pillar.colorVar }}>
              {pillar.title}
            </h2>
            <div className="space-y-4">
              {pillar.items.map((item) => (
                <div key={item.title} className="space-y-1">
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="pb-12 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">{content.phasesTitle}</h2>
        <div className="space-y-6">
          {content.phases.map((phase) => (
            <div
              key={phase.title}
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
            >
              <h3 className="text-lg font-semibold mb-3">{phase.title}</h3>
              <ul className="space-y-2 list-disc list-inside text-[var(--text-secondary)]">
                {phase.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-12 max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 rounded-full" style={{ backgroundColor: "var(--brand-blue)" }} />
          <h2 className="text-3xl font-bold">Technical Snapshots</h2>
        </div>
        <p className="text-[var(--text-secondary)] mb-6 max-w-4xl">
          A glimpse of the artifacts we deliver across data, finance, and growth. Code, queries, and executive visuals
          stay production-ready and reproducible.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="rounded-2xl p-4 border shadow-sm space-y-3"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
          >
            <div className="text-sm font-semibold" style={{ color: "var(--brand-blue)" }}>
              Python — Churn/Uplift Model
            </div>
            <pre className="text-xs overflow-auto rounded-lg p-3" style={{ backgroundColor: "var(--bg-surface-hover)", border: "1px solid var(--border-secondary)" }}>
{`import pandas as pd
from lightgbm import LGBMClassifier

df = pd.read_parquet("events.parquet")
features = ["mau", "aov", "sessions_7d", "nps", "segment"]
y = df["churned"]

model = LGBMClassifier(
    n_estimators=400,
    learning_rate=0.05,
    class_weight="balanced",
    max_depth=-1
)
model.fit(df[features], y)
df["churn_risk"] = model.predict_proba(df[features])[:, 1]
df["uplift_flag"] = (df["churn_risk"] > 0.35) & (df["clv"] > 500)
`}
            </pre>
          </div>

          <div
            className="rounded-2xl p-4 border shadow-sm space-y-3"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
          >
            <div className="text-sm font-semibold" style={{ color: "var(--brand-orange)" }}>
              SQL — Cohort LTV / Payback
            </div>
            <pre className="text-xs overflow-auto rounded-lg p-3" style={{ backgroundColor: "var(--bg-surface-hover)", border: "1px solid var(--border-secondary)" }}>
{`WITH cohorts AS (
  SELECT user_id,
         MIN(DATE_TRUNC('month', order_ts)) AS cohort_month
  FROM fact_orders
  GROUP BY 1
),
rev AS (
  SELECT c.cohort_month,
         DATE_DIFF('month', c.cohort_month, DATE_TRUNC('month', f.order_ts)) AS m,
         SUM(f.gmv) AS gmv
  FROM fact_orders f
  JOIN cohorts c ON f.user_id = c.user_id
  GROUP BY 1, 2
)
SELECT cohort_month,
       m,
       SUM(gmv) OVER (PARTITION BY cohort_month ORDER BY m) AS cum_ltv
FROM rev
ORDER BY cohort_month, m;
`}
            </pre>
          </div>

          <div
            className="rounded-2xl p-4 border shadow-sm space-y-3"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
          >
            <div className="text-sm font-semibold" style={{ color: "#9b51e0" }}>
              Power BI — Exec Tile
            </div>
            <div
              className="rounded-xl p-4 space-y-2"
              style={{ background: "linear-gradient(135deg, rgba(155,81,224,0.12), rgba(60,119,173,0.10))", border: "1px solid var(--border-secondary)" }}
            >
              <div className="text-xs uppercase tracking-[0.15em]" style={{ color: "var(--text-secondary)" }}>
                CAC vs LTV Payback
              </div>
              <div className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                3.2 months
              </div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Blended cohorts, p75 guardrail: 4.5m
              </div>
              <div className="h-24 rounded-lg" style={{ background: "radial-gradient(circle at 30% 30%, rgba(60,119,173,0.25), transparent 55%), radial-gradient(circle at 70% 50%, rgba(155,81,224,0.25), transparent 50%)", border: "1px dashed var(--border-secondary)" }} />
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                • Paid search down -12% CAC | • Email up +8% CVR | • Trials +14% WoW
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-4 border shadow-sm space-y-4 md:col-span-3"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Power BI–Style Dashboard (Synthetic)
              </div>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--text-primary)" }}>Region:</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ backgroundColor: "var(--bg-surface-hover)", border: "1px solid var(--border-secondary)" }}>EU</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ backgroundColor: "transparent", border: "1px solid var(--border-secondary)" }}>US</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ backgroundColor: "transparent", border: "1px solid var(--border-secondary)" }}>MENA</span>
                <span style={{ color: "var(--text-primary)" }}>Segment:</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ backgroundColor: "var(--bg-surface-hover)", border: "1px solid var(--border-secondary)" }}>SMB</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1" style={{ backgroundColor: "transparent", border: "1px solid var(--border-secondary)" }}>Enterprise</span>
              </div>
            </div>
            <div
              className="rounded-xl p-5"
              style={{
                background: "linear-gradient(145deg, rgba(60,119,173,0.08), rgba(155,81,224,0.05))",
                border: "1px solid var(--border-secondary)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              }}
            >
              <svg viewBox="0 0 700 340" role="img" aria-label="Line chart showing Revenue, LTV, and CAC trends over six months with filters EU/SMB active">
                <defs>
                  <linearGradient id="revFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(60,119,173,0.32)" />
                    <stop offset="100%" stopColor="rgba(60,119,173,0)" />
                  </linearGradient>
                  <linearGradient id="bgGrid" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="700" height="340" fill="transparent" />
                <g transform="translate(70,40)">
                  <rect x="0" y="0" width="560" height="240" fill="url(#bgGrid)" opacity="0.4" />
                  <line x1="0" y1="240" x2="560" y2="240" stroke="var(--border-secondary)" strokeWidth="1" />
                  {[0, 50, 100, 150, 200, 250].map((y) => (
                    <g key={y}>
                      <line x1="0" y1={240 - y} x2="560" y2={240 - y} stroke="var(--border-secondary)" strokeOpacity="0.25" strokeWidth="0.6" />
                      <text x="-12" y={244 - y} fill="var(--text-secondary)" fontSize="10" textAnchor="end">{y}</text>
                    </g>
                  ))}
                  {["M1","M2","M3","M4","M5","M6"].map((m, i) => (
                    <text key={m} x={i * 112} y={260} fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{m}</text>
                  ))}

                  <path
                    d="M0,160 L112,146 L224,132 L336,120 L448,108 L560,96"
                    fill="url(#revFill)"
                    stroke="none"
                  />
                  <path
                    d="M0,160 L112,146 L224,132 L336,120 L448,108 L560,96"
                    fill="none"
                    stroke="var(--brand-blue)"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M0,192 L112,184 L224,176 L336,168 L448,160 L560,154"
                    fill="none"
                    stroke="var(--brand-orange)"
                    strokeWidth="3"
                    strokeDasharray="7 5"
                  />
                  <path
                    d="M0,214 L112,206 L224,198 L336,190 L448,184 L560,180"
                    fill="none"
                    stroke="#9b51e0"
                    strokeWidth="3"
                    strokeDasharray="4 6"
                  />

                  <g>
                    <circle cx="448" cy="108" r="5" fill="var(--brand-blue)" />
                    <text x="464" y="106" fill="var(--text-primary)" fontSize="11">Revenue</text>
                  </g>
                  <g>
                    <circle cx="448" cy="160" r="5" fill="var(--brand-orange)" />
                    <text x="464" y="158" fill="var(--text-primary)" fontSize="11">LTV</text>
                  </g>
                  <g>
                    <circle cx="448" cy="184" r="5" fill="#9b51e0" />
                    <text x="464" y="182" fill="var(--text-primary)" fontSize="11">CAC</text>
                  </g>
                </g>
              </svg>
              <div className="grid md:grid-cols-3 gap-3 mt-4 text-xs">
                <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(60,119,173,0.08)", border: "1px solid var(--border-secondary)" }}>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Revenue (EU · SMB)</div>
                  <div className="text-lg font-bold" style={{ color: "var(--brand-blue)" }}>+22% QoQ</div>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>p75 guardrail: 12%</div>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(245,134,67,0.08)", border: "1px solid var(--border-secondary)" }}>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>LTV (blended)</div>
                  <div className="text-lg font-bold" style={{ color: "var(--brand-orange)" }}>€1,480</div>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Segment B up +11%</div>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(155,81,224,0.08)", border: "1px solid var(--border-secondary)" }}>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>CAC (paid)</div>
                  <div className="text-lg font-bold" style={{ color: "#9b51e0" }}>€176</div>
                  <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Paid search -14% WoW</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 max-w-5xl mx-auto px-6">
        <div
          className="rounded-2xl p-6 border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">{content.ctaTitle}</h3>
            <p className="text-[var(--text-secondary)]">
              {language === "tr"
                ? "Veri kalitesi, atıf, fiyatlama, CAC/LTV ve yaşam döngüsü olgunluğu için hızlı bir değerlendirme ve 30-60-90 günlük yol haritası sunuyoruz."
                : language === "it"
                  ? "Forniamo una valutazione rapida: qualità dei dati, attribuzione, pricing, CAC/LTV e maturità del lifecycle, con una roadmap 30-60-90 giorni."
                  : "We deliver a rapid assessment: data quality, attribution, pricing, CAC/LTV, and lifecycle readiness—with a 30-60-90 day roadmap."}
            </p>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg"
            style={{ backgroundColor: colors.blue, color: "#ffffff" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#050505";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#ffffff";
            }}
          >
            {content.ctaButton}
          </a>
        </div>
      </section>

    </main>
  );
}

