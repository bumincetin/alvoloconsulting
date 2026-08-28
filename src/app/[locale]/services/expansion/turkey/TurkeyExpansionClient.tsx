"use client";

import { Banknote, Boxes, Factory, Route, Scale, Users } from "lucide-react";
import ExpansionPage, { type ExpansionPageCopy } from "@/components/pages/ExpansionPage";
import type { Locale } from "@/lib/translations";

interface TurkeyExpansionClientProps {
  locale: Locale;
}

const SERVICES = [
  { icon: Factory, titleKey: "manufacturing", descKey: "manufacturingDesc" },
  { icon: Boxes, titleKey: "sourcing", descKey: "sourcingDesc" },
  { icon: Route, titleKey: "logistics", descKey: "logisticsDesc" },
  { icon: Banknote, titleKey: "costOptimization", descKey: "costOptimizationDesc" },
  { icon: Users, titleKey: "localTeam", descKey: "localTeamDesc" },
  { icon: Scale, titleKey: "legal", descKey: "legalDesc" }
] as const;

const content = {
  en: {
    badge: "Türkiye expansion",
    title: "Scale your operations in Türkiye",
    subtitle: "Manufacturing partnerships and cost reduction for Italian firms using Türkiye's industrial base.",
    manufacturing: "Manufacturing partnerships",
    manufacturingDesc: "Vetted Turkish manufacturers for quality production at competitive cost.",
    sourcing: "Strategic sourcing",
    sourcingDesc: "Türkiye's supplier base for raw materials and components.",
    logistics: "Logistics and supply chain",
    logisticsDesc: "Supply-chain routes that use Türkiye's position between Europe and Asia.",
    costOptimization: "Cost reduction",
    costOptimizationDesc: "Lower operating costs, with quality standards kept, through restructured sourcing.",
    localTeam: "Local team set-up",
    localTeamDesc: "Hiring and team management for your Turkish presence.",
    legal: "Legal and compliance",
    legalDesc: "Turkish business regulation, contracts and compliance handled with local counsel.",
    ctaTitle: "Scale in Türkiye",
    ctaDesc: "Book a consultation to plan Turkish manufacturing and the cost base that comes with it.",
    ctaButton: "Book a consultation",
    backLink: "Back to services",
  },
  tr: {
    badge: "Türkiye genişlemesi",
    title: "Türkiye'de operasyonlarınızı ölçeklendirin",
    subtitle: "Türkiye'nin sanayi tabanından yararlanan İtalyan firmalar için üretim ortaklıkları ve maliyet düşürme.",
    manufacturing: "Üretim ortaklıkları",
    manufacturingDesc: "Rekabetçi maliyetle kaliteli üretim için doğrulanmış Türk üreticiler.",
    sourcing: "Stratejik tedarik",
    sourcingDesc: "Hammadde ve bileşenler için Türkiye'nin tedarikçi tabanı.",
    logistics: "Lojistik ve tedarik zinciri",
    logisticsDesc: "Türkiye'nin Avrupa ile Asya arasındaki konumunu kullanan tedarik zinciri rotaları.",
    costOptimization: "Maliyet düşürme",
    costOptimizationDesc: "Yeniden yapılandırılmış tedarikle, kalite standartları korunarak daha düşük operasyon maliyeti.",
    localTeam: "Yerel ekip kurulumu",
    localTeamDesc: "Türkiye'deki varlığınız için işe alım ve ekip yönetimi.",
    legal: "Hukuk ve uyum",
    legalDesc: "Türk ticari mevzuatı, sözleşmeler ve uyum; yerel hukuk danışmanıyla yürütülür.",
    ctaTitle: "Türkiye'de ölçeklenin",
    ctaDesc: "Türkiye'de üretimi ve beraberinde gelen maliyet tabanını planlamak için bir görüşme ayırtın.",
    ctaButton: "Görüşme ayırtın",
    backLink: "Hizmetlere dön",
  },
  it: {
    badge: "Espansione in Turchia",
    title: "Scala le tue operazioni in Turchia",
    subtitle: "Partnership manifatturiere e riduzione dei costi per le aziende italiane che usano la base industriale turca.",
    manufacturing: "Partnership manifatturiere",
    manufacturingDesc: "Produttori turchi verificati per una produzione di qualità a costi competitivi.",
    sourcing: "Sourcing strategico",
    sourcingDesc: "La base di fornitori turca per materie prime e componenti.",
    logistics: "Logistica e supply chain",
    logisticsDesc: "Rotte di supply chain che sfruttano la posizione della Turchia tra Europa e Asia.",
    costOptimization: "Riduzione dei costi",
    costOptimizationDesc: "Costi operativi più bassi, a standard di qualità invariati, attraverso un sourcing ristrutturato.",
    localTeam: "Team locale",
    localTeamDesc: "Assunzioni e gestione del team per la tua presenza in Turchia.",
    legal: "Legale e compliance",
    legalDesc: "Normativa commerciale turca, contratti e compliance gestiti con un legale locale.",
    ctaTitle: "Scala in Turchia",
    ctaDesc: "Prenota una consulenza per pianificare la produzione in Turchia e la base di costo che ne deriva.",
    ctaButton: "Prenota una consulenza",
    backLink: "Torna ai servizi",
  },
};

export default function TurkeyExpansionClient({ locale }: TurkeyExpansionClientProps) {
  const t = content[locale];
  const copy: ExpansionPageCopy = {
    badge: t.badge,
    title: t.title,
    subtitle: t.subtitle,
    services: SERVICES.map(({ icon, titleKey, descKey }) => ({ icon, title: t[titleKey], desc: t[descKey] })),
    ctaTitle: t.ctaTitle,
    ctaDesc: t.ctaDesc,
    ctaButton: t.ctaButton,
    backLink: t.backLink,
  };
  return <ExpansionPage locale={locale} mode="outbound" copy={copy} />;
}
