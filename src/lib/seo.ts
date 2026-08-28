import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/translations";

/**
 * Per-page, per-locale SEO metadata.
 *
 * `pageMeta(locale, key)` builds a complete Next `Metadata` object (title, description,
 * canonical + hreflang alternates, Open Graph, Twitter) for one of the routes below.
 * Titles stay ≤ 60 characters in the form "Page — Alvolo Consulting"; descriptions 130–160.
 */

export const siteUrl = "https://alvoloconsulting.com";
export const siteName = "Alvolo Consulting";

export const pageKeys = [
  "home",
  "services",
  "about",
  "brief",
  "faq",
  "contact",
  "portal",
  "methodology",
  "italy",
  "turkey",
  "startup",
] as const;

export type PageKey = (typeof pageKeys)[number];

/** Route path for each key, relative to the locale segment (trailing slashes match `trailingSlash: true`). */
export const pagePaths: Record<PageKey, string> = {
  home: "/",
  services: "/services/",
  about: "/about/",
  brief: "/brief/",
  faq: "/faq/",
  contact: "/contact/",
  portal: "/portal/",
  methodology: "/methodology/",
  italy: "/services/expansion/italy/",
  turkey: "/services/expansion/turkey/",
  startup: "/services/startup-corridor/",
};

const ogLocales: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  it: "it_IT",
};

type Copy = { title: string; description: string };

export const seoCopy: Record<PageKey, Record<Locale, Copy>> = {
  home: {
    en: {
      title: "Cross-Border Advisory Italy & Türkiye — Alvolo Consulting",
      description:
        "Bocconi-trained advisors for Italian company incorporation, tax planning, residency permits and Turkish manufacturing partnerships. Milano · Roma · Istanbul.",
    },
    tr: {
      title: "İtalya ve Türkiye Arası Danışmanlık — Alvolo Consulting",
      description:
        "İtalya'da şirket kuruluşu, vergi planlaması, oturma izni ve Türkiye'de üretim ortaklıkları için Bocconi mezunu danışmanlar. Milano · Roma · İstanbul.",
    },
    it: {
      title: "Consulenza Cross-Border Italia-Turchia — Alvolo Consulting",
      description:
        "Consulenti formati in Bocconi per costituzione di società in Italia, fisco, permessi di soggiorno e partnership produttive in Turchia. Milano · Roma · Istanbul.",
    },
  },
  services: {
    en: {
      title: "Services — Alvolo Consulting",
      description:
        "Italian S.r.l. and S.p.A. incorporation, tax planning, Codice Fiscale, residency permits, executive relocation, banking and Turkish sourcing partnerships.",
    },
    tr: {
      title: "Hizmetlerimiz — Alvolo Consulting",
      description:
        "İtalya'da S.r.l. ve S.p.A. kuruluşu, vergi planlaması, Codice Fiscale, oturma izni, yönetici taşınması, banka hesabı ve Türkiye'de tedarik ortaklıkları.",
    },
    it: {
      title: "Servizi — Alvolo Consulting",
      description:
        "Costituzione di S.r.l. e S.p.A., pianificazione fiscale, Codice Fiscale, permessi di soggiorno, relocation di dirigenti, banking e sourcing in Turchia.",
    },
  },
  about: {
    en: {
      title: "About Us — Alvolo Consulting",
      description:
        "Meet the Bocconi-trained team behind Alvolo Consulting: cross-border advisors in Milano, Roma and Istanbul connecting Italian and Turkish business.",
    },
    tr: {
      title: "Hakkımızda — Alvolo Consulting",
      description:
        "Alvolo Consulting'in Bocconi mezunu ekibiyle tanışın: Milano, Roma ve İstanbul ofisleriyle İtalyan ve Türk iş dünyasını buluşturan danışmanlar.",
    },
    it: {
      title: "Chi Siamo — Alvolo Consulting",
      description:
        "Il team Alvolo Consulting, formato in Bocconi: consulenti cross-border con sedi a Milano, Roma e Istanbul che collegano il business italiano e turco.",
    },
  },
  brief: {
    en: {
      title: "Your Tailored Mandate — Alvolo Consulting",
      description:
        "Answer five questions and receive a tailored service proposal for your Italy or Türkiye mandate: incorporation, tax, permits, banking, sourcing or a delegation programme.",
    },
    tr: {
      title: "Size Özel Mandat — Alvolo Consulting",
      description:
        "Beş soruyu yanıtlayın, İtalya veya Türkiye mandatınız için size özel bir hizmet teklifi alın: şirket kuruluşu, vergi, izinler, bankacılık, tedarik veya heyet programı.",
    },
    it: {
      title: "Il Vostro Mandato su Misura — Alvolo Consulting",
      description:
        "Rispondete a cinque domande e ricevete una proposta di servizi su misura per il vostro mandato in Italia o Türkiye: costituzione, fisco, permessi, banche, sourcing o delegazioni.",
    },
  },
  faq: {
    en: {
      title: "FAQ — Alvolo Consulting",
      description:
        "Answers on S.r.l. incorporation timelines, Codice Fiscale, residency permits, Italian banking, tax residency and how we structure Turkish manufacturing deals.",
    },
    tr: {
      title: "Sıkça Sorulan Sorular — Alvolo Consulting",
      description:
        "S.r.l. kuruluş süreleri, Codice Fiscale, oturma izni, İtalya'da banka hesabı, vergi mukimliği ve Türkiye'de üretim anlaşmalarını nasıl yapılandırdığımız.",
    },
    it: {
      title: "Domande Frequenti — Alvolo Consulting",
      description:
        "Risposte su tempi di costituzione di una S.r.l., Codice Fiscale, permessi di soggiorno, banche italiane, residenza fiscale e accordi produttivi in Turchia.",
    },
  },
  contact: {
    en: {
      title: "Contact — Alvolo Consulting",
      description:
        "Book a consultation with Alvolo Consulting in Milano, Roma or Istanbul. Discuss Italian incorporation, relocation or Turkish sourcing with a senior advisor.",
    },
    tr: {
      title: "İletişim — Alvolo Consulting",
      description:
        "Milano, Roma veya İstanbul'da Alvolo Consulting ile görüşme planlayın. İtalya'da şirket kuruluşu, taşınma veya Türkiye tedariğini kıdemli danışmanla konuşun.",
    },
    it: {
      title: "Contatti — Alvolo Consulting",
      description:
        "Prenota una consulenza con Alvolo Consulting a Milano, Roma o Istanbul: costituzione societaria, relocation o sourcing in Turchia con un consulente senior.",
    },
  },
  portal: {
    en: {
      title: "Client Portal — Alvolo Consulting",
      description:
        "Secure client portal for Alvolo Consulting engagements: track your Italian incorporation, permit applications, tax filings and Turkish sourcing milestones.",
    },
    tr: {
      title: "Müşteri Portalı — Alvolo Consulting",
      description:
        "Alvolo Consulting müşteri portalı: İtalya'daki şirket kuruluşunuzu, izin başvurularınızı, vergi beyanlarınızı ve Türkiye tedarik süreçlerinizi takip edin.",
    },
    it: {
      title: "Area Clienti — Alvolo Consulting",
      description:
        "Area clienti riservata di Alvolo Consulting: segui la costituzione della società, le pratiche per i permessi, gli adempimenti fiscali e il sourcing in Turchia.",
    },
  },
  methodology: {
    en: {
      title: "Our Methodology — Alvolo Consulting",
      description:
        "How Alvolo Consulting runs cross-border projects: diagnostic, structuring, execution and integration phases with one senior advisor accountable end to end.",
    },
    tr: {
      title: "Çalışma Yöntemimiz — Alvolo Consulting",
      description:
        "Alvolo Consulting sınır ötesi projeleri nasıl yürütür: teşhis, yapılandırma, uygulama ve entegrasyon aşamaları; baştan sona sorumlu tek bir kıdemli danışman.",
    },
    it: {
      title: "Il Nostro Metodo — Alvolo Consulting",
      description:
        "Come Alvolo Consulting gestisce i progetti cross-border: diagnosi, strutturazione, esecuzione e integrazione, con un unico consulente senior responsabile.",
    },
  },
  italy: {
    en: {
      title: "Italy Expansion — Alvolo Consulting",
      description:
        "Enter the Italian market with S.r.l. or S.p.A. incorporation, tax planning, Codice Fiscale, residency permits, banking and executive relocation from one team.",
    },
    tr: {
      title: "İtalya'ya Açılım — Alvolo Consulting",
      description:
        "İtalya pazarına S.r.l. veya S.p.A. kuruluşu, vergi planlaması, Codice Fiscale, oturma izni, banka hesabı ve yönetici taşınmasıyla tek ekipten girin.",
    },
    it: {
      title: "Espansione in Italia — Alvolo Consulting",
      description:
        "Entra nel mercato italiano con costituzione di S.r.l. o S.p.A., pianificazione fiscale, Codice Fiscale, permessi di soggiorno, banking e relocation dirigenti.",
    },
  },
  turkey: {
    en: {
      title: "Türkiye Expansion — Alvolo Consulting",
      description:
        "Source and manufacture in Türkiye with vetted partners: supplier due diligence, contract negotiation, supply chain setup and Turkish entity structuring.",
    },
    tr: {
      title: "Türkiye'ye Açılım — Alvolo Consulting",
      description:
        "Türkiye'de doğrulanmış ortaklarla tedarik ve üretim: tedarikçi durum tespiti, sözleşme müzakeresi, tedarik zinciri kurulumu ve Türk şirket yapılandırması.",
    },
    it: {
      title: "Espansione in Turchia — Alvolo Consulting",
      description:
        "Sourcing e produzione in Turchia con partner verificati: due diligence sui fornitori, negoziazione contrattuale, supply chain e strutturazione societaria.",
    },
  },
  startup: {
    en: {
      title: "Startup Corridor — Alvolo Consulting",
      description:
        "The Startup Corridor connects Turkish founders with Italian investors, incubators and EU markets: incorporation, visas, fundraising and go-to-market support.",
    },
    tr: {
      title: "Startup Koridoru — Alvolo Consulting",
      description:
        "Startup Koridoru Türk girişimcileri İtalyan yatırımcılar, kuluçka merkezleri ve AB pazarıyla buluşturur: şirket kuruluşu, vize, yatırım ve pazara giriş desteği.",
    },
    it: {
      title: "Startup Corridor — Alvolo Consulting",
      description:
        "Lo Startup Corridor collega i founder turchi a investitori, incubatori e mercati UE in Italia: costituzione, visti, raccolta capitali e supporto go-to-market.",
    },
  },
};

/** Narrow a raw `[locale]` segment to a supported locale, falling back to English. */
export function resolveLocale(value: string): Locale {
  return (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

/** Absolute URL for a route in a given locale. */
export function pageUrl(locale: Locale, key: PageKey): string {
  return `${siteUrl}/${locale}${pagePaths[key]}`;
}

/** hreflang map (en/tr/it + x-default → en) for a route. */
export function languageAlternates(key: PageKey): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = pageUrl(l, key);
  languages["x-default"] = pageUrl("en", key);
  return languages;
}

export function pageMeta(locale: Locale, key: PageKey): Metadata {
  const { title, description } = seoCopy[key][locale];
  const url = pageUrl(locale, key);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(key),
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: ogLocales[locale],
      type: "website",
      images: ["/LOGO.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/LOGO.png"],
    },
  };
}
