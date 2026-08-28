import type { Locale } from "@/lib/translations";
import type { CityId } from "@/lib/geo/cities";

export const CONTACT = {
  whatsappNumber: "393481705207",
  whatsappDisplay: "+39 348 170 5207",
  email: "info@alvoloconsulting.com",
  linkedin: "https://www.linkedin.com/company/alvolo-consulting",
  instagram: "https://www.instagram.com/alvoloconsulting",
} as const;

export interface OfficeInfo {
  id: CityId;
  city: string;
  role: string;
  address: string;
  hours: string;
}

export interface FooterContent {
  eyebrow: string;
  heading: string;
  sub: string;
  offices: OfficeInfo[];
  whatsapp: string;
  whatsappHint: string;
  email: string;
  emailHint: string;
  schedule: string;
  scheduleHint: string;
  whatsappMessage: string;
  languageLabel: string;
  languages: Record<Locale, string>;
  indexTitle: string;
  legalTitle: string;
  statusLine: string;
  localTime: string;
  links: { label: string; href: string }[];
}

export const footerContent: Record<Locale, FooterContent> = {
  en: {
    eyebrow: "Contact Gateway",
    heading: "Open a line to the corridor.",
    sub: "Three cities, one intake. Reach the partners directly, or schedule a structured consultation.",
    offices: [
      { id: "milan", city: "Milan", role: "Headquarters", address: "Via Valsugana 6, 20139 Milan, Italy", hours: "Mon–Fri · 09:00–18:00 CET" },
      { id: "rome", city: "Rome", role: "Regulatory desk", address: "By appointment", hours: "Mon–Fri · 09:00–18:00 CET" },
      { id: "istanbul", city: "Istanbul", role: "Sourcing desk", address: "By appointment", hours: "Mon–Fri · 10:00–19:00 TRT" },
    ],
    whatsapp: "WhatsApp concierge",
    whatsappHint: "Direct line to the partners",
    email: "Encrypted email intake",
    emailHint: "Replies within one business day",
    schedule: "Schedule a consultation",
    scheduleHint: "Structured 30–60 min intake",
    whatsappMessage: "Hello Alvolo — I would like to discuss a cross-border mandate.",
    languageLabel: "Language",
    languages: { en: "English", tr: "Türkçe", it: "Italiano" },
    indexTitle: "Site index",
    legalTitle: "Legal",
    statusLine: "ALVOLO // MIL · ROM · IST // corridor active",
    localTime: "Local time",
    links: [
      { label: "Services", href: "/services" },
      { label: "Italy expansion", href: "/services/expansion/italy" },
      { label: "Türkiye sourcing", href: "/services/expansion/turkey" },
      { label: "Startup corridor", href: "/services/startup-corridor" },
      { label: "Methodology", href: "/methodology" },
      { label: "Tailored offer", href: "/brief" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Client portal", href: "/portal" },
      { label: "Contact", href: "/contact" },
    ],
  },
  tr: {
    eyebrow: "İletişim Kapısı",
    heading: "Koridora bir hat açın.",
    sub: "Üç şehir, tek başvuru. Ortaklara doğrudan ulaşın veya yapılandırılmış bir danışmanlık planlayın.",
    offices: [
      { id: "milan", city: "Milano", role: "Genel merkez", address: "Via Valsugana 6, 20139 Milano, İtalya", hours: "Pzt–Cum · 09:00–18:00 CET" },
      { id: "rome", city: "Roma", role: "Düzenleyici masa", address: "Randevu ile", hours: "Pzt–Cum · 09:00–18:00 CET" },
      { id: "istanbul", city: "İstanbul", role: "Tedarik masası", address: "Randevu ile", hours: "Pzt–Cum · 10:00–19:00 TRT" },
    ],
    whatsapp: "WhatsApp konsiyerj",
    whatsappHint: "Ortaklara doğrudan hat",
    email: "Şifreli e-posta başvurusu",
    emailHint: "Bir iş günü içinde yanıt",
    schedule: "Danışmanlık planla",
    scheduleHint: "Yapılandırılmış 30–60 dk görüşme",
    whatsappMessage: "Merhaba Alvolo — sınır ötesi bir mandat görüşmek istiyorum.",
    languageLabel: "Dil",
    languages: { en: "English", tr: "Türkçe", it: "Italiano" },
    indexTitle: "Site dizini",
    legalTitle: "Yasal",
    statusLine: "ALVOLO // MIL · ROM · IST // koridor aktif",
    localTime: "Yerel saat",
    links: [
      { label: "Hizmetler", href: "/services" },
      { label: "İtalya genişleme", href: "/services/expansion/italy" },
      { label: "Türkiye tedarik", href: "/services/expansion/turkey" },
      { label: "Startup koridoru", href: "/services/startup-corridor" },
      { label: "Metodoloji", href: "/methodology" },
      { label: "Size özel teklif", href: "/brief" },
      { label: "Hakkımızda", href: "/about" },
      { label: "SSS", href: "/faq" },
      { label: "Müşteri portalı", href: "/portal" },
      { label: "İletişim", href: "/contact" },
    ],
  },
  it: {
    eyebrow: "Gateway di Contatto",
    heading: "Apri una linea verso il corridoio.",
    sub: "Tre città, un unico intake. Contatta direttamente i partner o programma una consulenza strutturata.",
    offices: [
      { id: "milan", city: "Milano", role: "Sede centrale", address: "Via Valsugana 6, 20139 Milano, Italia", hours: "Lun–Ven · 09:00–18:00 CET" },
      { id: "rome", city: "Roma", role: "Desk regolatorio", address: "Su appuntamento", hours: "Lun–Ven · 09:00–18:00 CET" },
      { id: "istanbul", city: "Istanbul", role: "Desk sourcing", address: "Su appuntamento", hours: "Lun–Ven · 10:00–19:00 TRT" },
    ],
    whatsapp: "Concierge WhatsApp",
    whatsappHint: "Linea diretta con i partner",
    email: "Intake email cifrato",
    emailHint: "Risposta entro un giorno lavorativo",
    schedule: "Programma una consulenza",
    scheduleHint: "Intake strutturato di 30–60 min",
    whatsappMessage: "Buongiorno Alvolo — vorrei discutere un mandato transfrontaliero.",
    languageLabel: "Lingua",
    languages: { en: "English", tr: "Türkçe", it: "Italiano" },
    indexTitle: "Indice del sito",
    legalTitle: "Note legali",
    statusLine: "ALVOLO // MIL · ROM · IST // corridoio attivo",
    localTime: "Ora locale",
    links: [
      { label: "Servizi", href: "/services" },
      { label: "Espansione Italia", href: "/services/expansion/italy" },
      { label: "Sourcing Türkiye", href: "/services/expansion/turkey" },
      { label: "Corridoio startup", href: "/services/startup-corridor" },
      { label: "Metodologia", href: "/methodology" },
      { label: "Offerta su misura", href: "/brief" },
      { label: "Chi siamo", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Portale clienti", href: "/portal" },
      { label: "Contatti", href: "/contact" },
    ],
  },
};
