"use client";

import { FileBadge, Handshake, Landmark, Network, ShieldCheck, TrendingUp } from "lucide-react";
import ExpansionPage, { type ExpansionPageCopy } from "@/components/pages/ExpansionPage";
import type { Locale } from "@/lib/translations";

interface ItalyExpansionClientProps {
  locale: Locale;
}

const SERVICES = [
  { icon: FileBadge, titleKey: "piva", descKey: "pivaDesc" },
  { icon: Landmark, titleKey: "fiscalRep", descKey: "fiscalRepDesc" },
  { icon: Network, titleKey: "network", descKey: "networkDesc" },
  { icon: Handshake, titleKey: "localPartners", descKey: "localPartnersDesc" },
  { icon: TrendingUp, titleKey: "marketEntry", descKey: "marketEntryDesc" },
  { icon: ShieldCheck, titleKey: "compliance", descKey: "complianceDesc" }
] as const;

const content = {
  en: {
    badge: "Italy expansion",
    title: "Expand your business to Italy",
    subtitle: "Support for Turkish SMEs entering the Italian market, from P.IVA registration to a working Milan network.",
    piva: "P.IVA registration",
    pivaDesc: "Italian VAT registration and set-up for your operations in Italy.",
    fiscalRep: "Fiscal representation",
    fiscalRepDesc: "Fiscal representation that keeps the entity compliant with Italian tax rules.",
    network: "Milan network",
    networkDesc: "Introductions to our business contacts, partners and service providers in Milan.",
    localPartners: "Local partnerships",
    localPartnersDesc: "Vetted Italian partners for distribution, manufacturing and business development.",
    marketEntry: "Market entry strategy",
    marketEntryDesc: "Market analysis and an entry strategy built for your sector.",
    compliance: "Regulatory compliance",
    complianceDesc: "Italian and EU regulatory requirements mapped and handled for you.",
    ctaTitle: "Enter the Italian market",
    ctaDesc: "Book a consultation to walk through your expansion plan with a senior advisor.",
    ctaButton: "Book a consultation",
    backLink: "Back to services",
  },
  tr: {
    badge: "İtalya genişlemesi",
    title: "İşinizi İtalya'ya genişletin",
    subtitle: "İtalya pazarına giren Türk KOBİ'leri için destek: P.IVA kaydından işleyen bir Milano ağına kadar.",
    piva: "P.IVA kaydı",
    pivaDesc: "İtalya'daki operasyonlarınız için İtalyan KDV kaydı ve kurulumu.",
    fiscalRep: "Mali temsilcilik",
    fiscalRepDesc: "Şirketi İtalyan vergi kurallarına uyumlu tutan mali temsilcilik.",
    network: "Milano ağı",
    networkDesc: "Milano'daki iş bağlantılarımıza, ortaklarımıza ve hizmet sağlayıcılarımıza tanıştırma.",
    localPartners: "Yerel ortaklıklar",
    localPartnersDesc: "Dağıtım, üretim ve iş geliştirme için doğrulanmış İtalyan ortaklar.",
    marketEntry: "Pazara giriş stratejisi",
    marketEntryDesc: "Sektörünüz için hazırlanmış pazar analizi ve giriş stratejisi.",
    compliance: "Mevzuat uyumu",
    complianceDesc: "İtalyan ve AB mevzuat gereklilikleri sizin için haritalanır ve yürütülür.",
    ctaTitle: "İtalya pazarına girin",
    ctaDesc: "Genişleme planınızı kıdemli bir danışmanla adım adım geçmek için bir görüşme ayırtın.",
    ctaButton: "Görüşme ayırtın",
    backLink: "Hizmetlere dön",
  },
  it: {
    badge: "Espansione in Italia",
    title: "Espandi la tua attività in Italia",
    subtitle: "Supporto per le PMI turche che entrano nel mercato italiano, dalla registrazione della P.IVA a una rete milanese operativa.",
    piva: "Registrazione P.IVA",
    pivaDesc: "Registrazione IVA italiana e impostazione per le tue operazioni in Italia.",
    fiscalRep: "Rappresentanza fiscale",
    fiscalRepDesc: "Rappresentanza fiscale che mantiene la società conforme alle regole fiscali italiane.",
    network: "Rete milanese",
    networkDesc: "Presentazioni ai nostri contatti commerciali, partner e fornitori di servizi a Milano.",
    localPartners: "Partnership locali",
    localPartnersDesc: "Partner italiani verificati per distribuzione, produzione e sviluppo commerciale.",
    marketEntry: "Strategia di ingresso",
    marketEntryDesc: "Analisi di mercato e strategia di ingresso costruite per il tuo settore.",
    compliance: "Conformità normativa",
    complianceDesc: "Requisiti normativi italiani e UE mappati e gestiti per te.",
    ctaTitle: "Entra nel mercato italiano",
    ctaDesc: "Prenota una consulenza per esaminare il tuo piano di espansione con un advisor senior.",
    ctaButton: "Prenota una consulenza",
    backLink: "Torna ai servizi",
  },
};

export default function ItalyExpansionClient({ locale }: ItalyExpansionClientProps) {
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
  return <ExpansionPage locale={locale} mode="inbound" copy={copy} />;
}
