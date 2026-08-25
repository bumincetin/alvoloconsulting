import type { Locale } from "@/lib/translations";

export interface Partner {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  image: string;
  linkedin: string;
  website?: string;
  bio: string;
  credentials: string[];
  track: { k: string; v: string }[];
}

export interface TeamContent {
  eyebrow: string;
  heading: string;
  sub: string;
  credentialsLabel: string;
  trackLabel: string;
  revealHint: string;
  desk: string;
  partners: Partner[];
}

const IMAGES = { bumin: "/bumin.jpg", oguzhan: "/ozi.jpg", ece: "/melisa.jpeg" };
const LINKS = {
  bumin: "https://www.linkedin.com/in/buminkcetin/",
  buminSite: "https://personal-portfolio-bumincetins-projects.vercel.app/en",
  oguzhan: "https://www.linkedin.com/in/oguzhan--aslan/",
  ece: "https://www.linkedin.com/in/ecemelisaozguner/",
};

export const teamContent: Record<Locale, TeamContent> = {
  en: {
    eyebrow: "Founding Partners",
    heading: "Bocconi-trained specialists with a seat in both markets.",
    sub: "A compact partnership that runs every mandate personally — quantitative, legal and institutional expertise across Milan, Rome and Istanbul.",
    credentialsLabel: "Credentials",
    trackLabel: "Track record",
    revealHint: "Hover or focus to open the dossier",
    desk: "Desk languages · EN · TR · IT",
    partners: [
      {
        id: "bkc",
        name: "Bumin Kağan Çetin",
        role: "AI & Quantitative Risk Advisory",
        affiliation: "Università Bocconi · Milan",
        image: IMAGES.bumin,
        linkedin: LINKS.bumin,
        website: LINKS.buminSite,
        bio: "Leads the quantitative side of every mandate — effective-tax-rate modelling, landed-cost models and the risk architecture behind cross-border structures.",
        credentials: ["Università Bocconi", "Quantitative finance & risk modelling", "Applied AI for advisory workflows"],
        track: [
          { k: "Focus", v: "Tax architecture · financial modelling" },
          { k: "Corridors", v: "IT inbound · TR sourcing" },
          { k: "Method", v: "Model-first, filing-second" },
        ],
      },
      {
        id: "oa",
        name: "Oğuzhan Aslan",
        role: "Institutional Liaison & Multi-Jurisdiction Strategy",
        affiliation: "Milan – Istanbul desk",
        image: IMAGES.oguzhan,
        linkedin: LINKS.oguzhan,
        bio: "Owns the counterparties — notaries, chambers, registries, banks and industrial partners on both sides of the corridor — and sequences the multi-jurisdiction programme.",
        credentials: ["Multi-jurisdiction strategy", "Institutional & registry liaison", "Industrial partner network (Marmara · Aegean)"],
        track: [
          { k: "Focus", v: "Entity formation · supplier matchmaking" },
          { k: "Corridors", v: "IT ⇄ TR" },
          { k: "Method", v: "Parallel-track execution" },
        ],
      },
      {
        id: "emo",
        name: "Ece Melisa Özgüner",
        role: "Private Client Governance & Discretion Onboarding",
        affiliation: "Private client desk · Milan",
        image: IMAGES.ece,
        linkedin: LINKS.ece,
        bio: "Runs client governance — intake, KYC readiness, document integrity and executive relocation — with the discretion private clients and family offices require.",
        credentials: ["Private client governance", "KYC / AML readiness", "Executive & family relocation"],
        track: [
          { k: "Focus", v: "Intake · relocation · continuity" },
          { k: "Corridors", v: "IT inbound" },
          { k: "Method", v: "Single point of contact" },
        ],
      },
    ],
  },
  tr: {
    eyebrow: "Kurucu Ortaklar",
    heading: "Her iki pazarda da yer alan Bocconi eğitimli uzmanlar.",
    sub: "Her görevi bizzat yürüten kompakt bir ortaklık — Milano, Roma ve İstanbul'da nicel, hukuki ve kurumsal uzmanlık.",
    credentialsLabel: "Yetkinlikler",
    trackLabel: "Sicil",
    revealHint: "Dosyayı açmak için üzerine gelin veya odaklanın",
    desk: "Masa dilleri · EN · TR · IT",
    partners: [
      {
        id: "bkc",
        name: "Bumin Kağan Çetin",
        role: "Yapay Zekâ ve Nicel Risk Danışmanlığı",
        affiliation: "Università Bocconi · Milano",
        image: IMAGES.bumin,
        linkedin: LINKS.bumin,
        website: LINKS.buminSite,
        bio: "Her görevin nicel tarafını yönetir — efektif vergi oranı modellemesi, teslim maliyeti modelleri ve sınır ötesi yapıların arkasındaki risk mimarisi.",
        credentials: ["Università Bocconi", "Nicel finans ve risk modellemesi", "Danışmanlık iş akışları için uygulamalı yapay zekâ"],
        track: [
          { k: "Odak", v: "Vergi mimarisi · finansal modelleme" },
          { k: "Koridorlar", v: "İT içe dönük · TR tedarik" },
          { k: "Yöntem", v: "Önce model, sonra başvuru" },
        ],
      },
      {
        id: "oa",
        name: "Oğuzhan Aslan",
        role: "Kurumsal İrtibat ve Çok Yargı Alanlı Strateji",
        affiliation: "Milano – İstanbul masası",
        image: IMAGES.oguzhan,
        linkedin: LINKS.oguzhan,
        bio: "Muhatapları yönetir — koridorun her iki tarafındaki noterler, odalar, siciller, bankalar ve sanayi ortakları — ve çok yargı alanlı programı sıralar.",
        credentials: ["Çok yargı alanlı strateji", "Kurumsal ve sicil irtibatı", "Sanayi ortağı ağı (Marmara · Ege)"],
        track: [
          { k: "Odak", v: "Şirket kuruluşu · tedarikçi eşleştirme" },
          { k: "Koridorlar", v: "İT ⇄ TR" },
          { k: "Yöntem", v: "Paralel hat yürütme" },
        ],
      },
      {
        id: "emo",
        name: "Ece Melisa Özgüner",
        role: "Özel Müşteri Yönetişimi ve Gizli Onboarding",
        affiliation: "Özel müşteri masası · Milano",
        image: IMAGES.ece,
        linkedin: LINKS.ece,
        bio: "Müşteri yönetişimini yürütür — başlangıç, KYC hazırlığı, belge bütünlüğü ve yönetici taşınması — özel müşterilerin ve aile ofislerinin gerektirdiği gizlilikle.",
        credentials: ["Özel müşteri yönetişimi", "KYC / AML hazırlığı", "Yönetici ve aile taşınması"],
        track: [
          { k: "Odak", v: "Başlangıç · taşınma · süreklilik" },
          { k: "Koridorlar", v: "İT içe dönük" },
          { k: "Yöntem", v: "Tek irtibat noktası" },
        ],
      },
    ],
  },
  it: {
    eyebrow: "Partner Fondatori",
    heading: "Specialisti formati in Bocconi con una presenza in entrambi i mercati.",
    sub: "Una partnership compatta che segue personalmente ogni mandato — competenze quantitative, legali e istituzionali tra Milano, Roma e Istanbul.",
    credentialsLabel: "Credenziali",
    trackLabel: "Track record",
    revealHint: "Passa il mouse o metti a fuoco per aprire il dossier",
    desk: "Lingue del desk · EN · TR · IT",
    partners: [
      {
        id: "bkc",
        name: "Bumin Kağan Çetin",
        role: "Advisory AI e Rischio Quantitativo",
        affiliation: "Università Bocconi · Milano",
        image: IMAGES.bumin,
        linkedin: LINKS.bumin,
        website: LINKS.buminSite,
        bio: "Guida la parte quantitativa di ogni mandato — modellazione dell'aliquota effettiva, modelli di landed cost e architettura del rischio dietro le strutture transfrontaliere.",
        credentials: ["Università Bocconi", "Finanza quantitativa e modellazione del rischio", "AI applicata ai flussi di advisory"],
        track: [
          { k: "Focus", v: "Architettura fiscale · modellazione finanziaria" },
          { k: "Corridoi", v: "IT inbound · TR sourcing" },
          { k: "Metodo", v: "Prima il modello, poi il deposito" },
        ],
      },
      {
        id: "oa",
        name: "Oğuzhan Aslan",
        role: "Liaison Istituzionale e Strategia Multi-Giurisdizione",
        affiliation: "Desk Milano – Istanbul",
        image: IMAGES.oguzhan,
        linkedin: LINKS.oguzhan,
        bio: "Gestisce le controparti — notai, camere, registri, banche e partner industriali su entrambi i lati del corridoio — e sequenzia il programma multi-giurisdizione.",
        credentials: ["Strategia multi-giurisdizione", "Liaison istituzionale e con i registri", "Rete di partner industriali (Marmara · Egeo)"],
        track: [
          { k: "Focus", v: "Costituzione · matchmaking fornitori" },
          { k: "Corridoi", v: "IT ⇄ TR" },
          { k: "Metodo", v: "Esecuzione su binari paralleli" },
        ],
      },
      {
        id: "emo",
        name: "Ece Melisa Özgüner",
        role: "Governance Private Client e Onboarding Riservato",
        affiliation: "Desk private client · Milano",
        image: IMAGES.ece,
        linkedin: LINKS.ece,
        bio: "Gestisce la governance del cliente — intake, prontezza KYC, integrità documentale e relocation dei dirigenti — con la riservatezza richiesta da private client e family office.",
        credentials: ["Governance private client", "Prontezza KYC / AML", "Relocation dirigenti e famiglie"],
        track: [
          { k: "Focus", v: "Intake · relocation · continuità" },
          { k: "Corridoi", v: "IT inbound" },
          { k: "Metodo", v: "Punto di contatto unico" },
        ],
      },
    ],
  },
};
