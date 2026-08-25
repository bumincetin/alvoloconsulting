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
    badge: 'Italy Expansion',
    title: 'Expand Your Business to Italy',
    subtitle: 'Complete support for Turkish SMEs entering the Italian market. From P.IVA registration to establishing your Milan network.',
    piva: 'P.IVA Registration',
    pivaDesc: 'Complete Italian VAT registration and setup for your business operations in Italy.',
    fiscalRep: 'Fiscal Representation',
    fiscalRepDesc: 'Professional fiscal representation services to ensure compliance with Italian tax regulations.',
    network: 'Milan Network',
    networkDesc: 'Access our established network of business contacts, partners, and service providers in Milan.',
    localPartners: 'Local Partnerships',
    localPartnersDesc: 'Connect with vetted Italian partners for distribution, manufacturing, and business development.',
    marketEntry: 'Market Entry Strategy',
    marketEntryDesc: 'Data-driven market analysis and entry strategy tailored to your business sector.',
    compliance: 'Regulatory Compliance',
    complianceDesc: 'Navigate Italian and EU regulations with expert guidance on compliance requirements.',
    ctaTitle: 'Ready to Enter the Italian Market?',
    ctaDesc: 'Schedule a consultation to discuss your expansion plans and discover how we can help.',
    ctaButton: 'Start Your Italian Journey',
    backLink: 'Back to Services',
  },
  tr: {
    badge: 'İtalya Genişlemesi',
    title: 'İşinizi İtalya\'ya Genişletin',
    subtitle: 'İtalya pazarına giren Türk KOBİ\'leri için eksiksiz destek. P.IVA kaydından Milano ağınızı kurmaya kadar.',
    piva: 'P.IVA Kaydı',
    pivaDesc: 'İtalya\'daki iş operasyonlarınız için eksiksiz İtalyan KDV kaydı ve kurulumu.',
    fiscalRep: 'Mali Temsilcilik',
    fiscalRepDesc: 'İtalyan vergi düzenlemelerine uyumu sağlamak için profesyonel mali temsilcilik hizmetleri.',
    network: 'Milano Ağı',
    networkDesc: 'Milano\'daki kurulu iş bağlantıları, ortaklar ve hizmet sağlayıcı ağımıza erişin.',
    localPartners: 'Yerel Ortaklıklar',
    localPartnersDesc: 'Dağıtım, üretim ve iş geliştirme için doğrulanmış İtalyan ortaklarla bağlantı kurun.',
    marketEntry: 'Pazar Giriş Stratejisi',
    marketEntryDesc: 'İş sektörünüze özel veri odaklı pazar analizi ve giriş stratejisi.',
    compliance: 'Mevzuat Uyumu',
    complianceDesc: 'Uyumluluk gereksinimleri konusunda uzman rehberliğiyle İtalyan ve AB düzenlemelerinde yön bulun.',
    ctaTitle: 'İtalya Pazarına Girmeye Hazır mısınız?',
    ctaDesc: 'Genişleme planlarınızı görüşmek ve size nasıl yardımcı olabileceğimizi keşfetmek için bir danışmanlık seansı planlayın.',
    ctaButton: 'İtalya Yolculuğunuza Başlayın',
    backLink: 'Hizmetlere Dön',
  },
  it: {
    badge: 'Espansione in Italia',
    title: 'Espandi la Tua Attività in Italia',
    subtitle: 'Supporto completo per le PMI turche che entrano nel mercato italiano. Dalla registrazione P.IVA alla creazione della tua rete milanese.',
    piva: 'Registrazione P.IVA',
    pivaDesc: 'Registrazione IVA italiana completa e configurazione per le tue operazioni commerciali in Italia.',
    fiscalRep: 'Rappresentanza Fiscale',
    fiscalRepDesc: 'Servizi professionali di rappresentanza fiscale per garantire la conformità alle normative fiscali italiane.',
    network: 'Rete Milanese',
    networkDesc: 'Accedi alla nostra rete consolidata di contatti commerciali, partner e fornitori di servizi a Milano.',
    localPartners: 'Partnership Locali',
    localPartnersDesc: 'Connettiti con partner italiani verificati per distribuzione, produzione e sviluppo aziendale.',
    marketEntry: 'Strategia di Ingresso nel Mercato',
    marketEntryDesc: 'Analisi di mercato basata sui dati e strategia di ingresso su misura per il tuo settore aziendale.',
    compliance: 'Conformità Normativa',
    complianceDesc: 'Naviga le normative italiane e UE con la guida esperta sui requisiti di conformità.',
    ctaTitle: 'Pronto per Entrare nel Mercato Italiano?',
    ctaDesc: 'Pianifica una consulenza per discutere i tuoi piani di espansione e scoprire come possiamo aiutarti.',
    ctaButton: 'Inizia il Tuo Viaggio in Italia',
    backLink: 'Torna ai Servizi',
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
