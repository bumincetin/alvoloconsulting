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
    badge: 'Turkey Expansion',
    title: 'Scale Your Operations in Turkey',
    subtitle: 'Strategic manufacturing partnerships and cost optimization for Italian firms looking to leverage Turkey\'s industrial capabilities.',
    manufacturing: 'Manufacturing Partnerships',
    manufacturingDesc: 'Connect with vetted Turkish manufacturers for quality production at competitive costs.',
    sourcing: 'Strategic Sourcing',
    sourcingDesc: 'Access Turkey\'s diverse supplier ecosystem for raw materials and components.',
    logistics: 'Logistics & Supply Chain',
    logisticsDesc: 'Optimize your supply chain with strategic positioning between Europe and Asia.',
    costOptimization: 'Cost Optimization',
    costOptimizationDesc: 'Reduce operational costs while maintaining quality standards through smart restructuring.',
    localTeam: 'Local Team Setup',
    localTeamDesc: 'Establish your Turkish presence with our help in hiring and team management.',
    legal: 'Legal & Compliance',
    legalDesc: 'Navigate Turkish business regulations with expert legal and compliance support.',
    ctaTitle: 'Ready to Scale in Turkey?',
    ctaDesc: 'Let us help you unlock the potential of Turkish manufacturing and reduce your operational costs.',
    ctaButton: 'Start Your Turkish Expansion',
    backLink: 'Back to Services',
  },
  tr: {
    badge: 'Türkiye Genişlemesi',
    title: 'Türkiye\'de Operasyonlarınızı Ölçeklendirin',
    subtitle: 'Türkiye\'nin endüstriyel kapasitelerinden yararlanmak isteyen İtalyan firmalar için stratejik üretim ortaklıkları ve maliyet optimizasyonu.',
    manufacturing: 'Üretim Ortaklıkları',
    manufacturingDesc: 'Rekabetçi maliyetlerle kaliteli üretim için doğrulanmış Türk üreticilerle bağlantı kurun.',
    sourcing: 'Stratejik Tedarik',
    sourcingDesc: 'Hammadde ve bileşenler için Türkiye\'nin çeşitli tedarikçi ekosistemine erişin.',
    logistics: 'Lojistik ve Tedarik Zinciri',
    logisticsDesc: 'Avrupa ve Asya arasındaki stratejik konumlandırma ile tedarik zincirinizi optimize edin.',
    costOptimization: 'Maliyet Optimizasyonu',
    costOptimizationDesc: 'Akıllı yeniden yapılandırma yoluyla kalite standartlarını korurken operasyonel maliyetleri azaltın.',
    localTeam: 'Yerel Ekip Kurulumu',
    localTeamDesc: 'İşe alma ve ekip yönetiminde yardımımızla Türkiye\'deki varlığınızı oluşturun.',
    legal: 'Hukuki ve Uyumluluk',
    legalDesc: 'Uzman hukuki ve uyumluluk desteğiyle Türk iş düzenlemelerinde yön bulun.',
    ctaTitle: 'Türkiye\'de Ölçeklendirmeye Hazır mısınız?',
    ctaDesc: 'Türk üretiminin potansiyelini açığa çıkarmanıza ve operasyonel maliyetlerinizi azaltmanıza yardımcı olalım.',
    ctaButton: 'Türkiye Genişlemenize Başlayın',
    backLink: 'Hizmetlere Dön',
  },
  it: {
    badge: 'Espansione in Turchia',
    title: 'Scala le Tue Operazioni in Turchia',
    subtitle: 'Partnership manifatturiere strategiche e ottimizzazione dei costi per le aziende italiane che vogliono sfruttare le capacità industriali della Turchia.',
    manufacturing: 'Partnership Manifatturiere',
    manufacturingDesc: 'Connettiti con produttori turchi verificati per una produzione di qualità a costi competitivi.',
    sourcing: 'Sourcing Strategico',
    sourcingDesc: 'Accedi all\'ecosistema diversificato di fornitori turchi per materie prime e componenti.',
    logistics: 'Logistica e Supply Chain',
    logisticsDesc: 'Ottimizza la tua supply chain con un posizionamento strategico tra Europa e Asia.',
    costOptimization: 'Ottimizzazione dei Costi',
    costOptimizationDesc: 'Riduci i costi operativi mantenendo gli standard di qualità attraverso una ristrutturazione intelligente.',
    localTeam: 'Setup Team Locale',
    localTeamDesc: 'Stabilisci la tua presenza in Turchia con il nostro aiuto nell\'assunzione e gestione del team.',
    legal: 'Legale e Compliance',
    legalDesc: 'Naviga le normative aziendali turche con supporto esperto legale e di compliance.',
    ctaTitle: 'Pronto per Scalare in Turchia?',
    ctaDesc: 'Lasciaci aiutarti a sbloccare il potenziale della manifattura turca e ridurre i tuoi costi operativi.',
    ctaButton: 'Inizia la Tua Espansione in Turchia',
    backLink: 'Torna ai Servizi',
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
