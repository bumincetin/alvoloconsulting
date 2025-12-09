"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Pillar = {
  title: string;
  colorVar: string;
  items: { title: string; detail: string }[];
};

const methodologyPillars: Pillar[] = [
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
];

const deliveryPhases = [
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
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <section className="pt-24 pb-12 max-w-5xl mx-auto px-6">
        <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Our Methodology</div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Data, Finance, and Growth—Engineered for Expansion
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
          A unified operating model that connects data science, financial discipline, and marketing execution.
          Each phase is measurable, experiment-driven, and built to satisfy compliance and stakeholder review.
        </p>
      </section>

      <section className="pb-12 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {methodologyPillars.map((pillar) => (
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
        <h2 className="text-3xl font-bold mb-6">Delivery Phases</h2>
        <div className="space-y-6">
          {deliveryPhases.map((phase) => (
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

      <section className="pb-16 max-w-5xl mx-auto px-6">
        <div
          className="rounded-2xl p-6 border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-secondary)" }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to audit your stack?</h3>
            <p className="text-[var(--text-secondary)]">
              We deliver a rapid assessment: data quality, attribution, pricing, CAC/LTV, and lifecycle readiness—with
              a 30-60-90 day roadmap.
            </p>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg"
            style={{ backgroundColor: "var(--brand-blue)" }}
          >
            Talk to Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

