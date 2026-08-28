import type { Locale } from "@/lib/translations";

export type ContactAs = "executive" | "company" | "delegation";
export type PreferredChannel = "email" | "whatsapp" | "call";

export interface ConsultationContent {
  title: string;
  sub: string;
  name: string;
  email: string;
  company: string;
  companyOptional: string;
  message: string;
  messagePlaceholder: string;
  consent: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  close: string;
  retry: string;
  required: string;
  invalidEmail: string;
  consentRequired: string;
  prefillLabel: string;
  channelLine: string;
  // — intake profile
  contactAs: string;
  contactAsOptions: Record<ContactAs, string>;
  contactAsHelp: Record<ContactAs, string>;
  companyRequired: string;
  // — phone
  phone: string;
  phoneOptional: string;
  phoneHint: string;
  invalidPhone: string;
  // — preferences
  channel: string;
  channelOptions: Record<PreferredChannel, string>;
  language: string;
  languages: Record<Locale, string>;
  // — brief
  briefHint: string;
  briefTooShort: string;
  briefTooLong: string;
  characters: string;
  submitShortcut: string;
  // — draft
  clear: string;
  draftRestored: string;
  // — response
  responseLine: string;
  nextStepsTitle: string;
  nextStepAdvisor: string;
  nextStepWhatsapp: string;
  copyBrief: string;
  copied: string;
  copyEmail: string;
  openMail: string;
  optional: string;
}

export const consultationContent: Record<Locale, ConsultationContent> = {
  en: {
    title: "Request a Consultation",
    sub: "Structured 30–60 minute intake with a founding partner. We reply within one business day.",
    name: "Full name",
    email: "Work email",
    company: "Company",
    companyOptional: "optional",
    message: "Mandate brief",
    messagePlaceholder: "Tell us where you are expanding from and to, headcount, and the decision you need to make.",
    consent: "I accept the privacy policy and consent to being contacted about this request.",
    submit: "Send request",
    sending: "Sending…",
    successTitle: "Request received",
    successBody: "A partner will review your brief and confirm a slot by email within one business day.",
    errorTitle: "Could not send",
    errorBody: "The intake channel is temporarily unavailable. Please retry, or reach us on WhatsApp.",
    close: "Close",
    retry: "Retry",
    required: "Required",
    invalidEmail: "Enter a valid email address",
    consentRequired: "Consent is required",
    prefillLabel: "Pre-filled from",
    channelLine: "Encrypted intake · Milan · Rome · Istanbul",

    contactAs: "I am contacting as",
    contactAsOptions: { executive: "Executive", company: "Company", delegation: "Delegation" },
    contactAsHelp: {
      executive: "For founders, principals and C-level decision-makers. A partner reads your brief directly.",
      company: "For corporate mandates. Name the entity so we can clear conflicts before we reply.",
      delegation: "For trade missions, chambers and institutional groups. Tell us the size of the party and the dates of the visit.",
    },
    companyRequired: "Company name is required for corporate enquiries",

    phone: "Phone / WhatsApp",
    phoneOptional: "optional",
    phoneHint: "With country code, e.g. +39 · +90 · +44",
    invalidPhone: "Enter a valid phone number",

    channel: "Preferred channel",
    channelOptions: { email: "Email", whatsapp: "WhatsApp", call: "Call" },
    language: "Preferred language",
    languages: { en: "English", tr: "Türkçe", it: "Italiano" },

    briefHint: "Minimum 20 characters",
    briefTooShort: "Add a little more detail (at least 20 characters)",
    briefTooLong: "Consider trimming; send long briefs as an attachment after first contact",
    characters: "characters",
    submitShortcut: "Ctrl / ⌘ + Enter to send",

    clear: "Clear",
    draftRestored: "Draft restored",

    responseLine: "Response within one business day",
    nextStepsTitle: "What happens next",
    nextStepAdvisor: "A senior advisor replies within one business day.",
    nextStepWhatsapp: "Continue on WhatsApp with your brief attached",
    copyBrief: "Copy brief",
    copied: "Copied",
    copyEmail: "Click to copy",
    openMail: "Open in mail app",
    optional: "optional",
  },
  tr: {
    title: "Danışmanlık Talep Et",
    sub: "Kurucu ortakla yapılandırılmış 30–60 dakikalık görüşme. Bir iş günü içinde yanıt veririz.",
    name: "Ad soyad",
    email: "İş e-postası",
    company: "Şirket",
    companyOptional: "isteğe bağlı",
    message: "Görev özeti",
    messagePlaceholder: "Nereden nereye genişlediğinizi, çalışan sayısını ve vermeniz gereken kararı anlatın.",
    consent: "Gizlilik politikasını kabul ediyor ve bu talep hakkında iletişime geçilmesine onay veriyorum.",
    submit: "Talebi gönder",
    sending: "Gönderiliyor…",
    successTitle: "Talep alındı",
    successBody: "Bir ortak özetinizi inceleyip bir iş günü içinde e-posta ile randevuyu onaylayacak.",
    errorTitle: "Gönderilemedi",
    errorBody: "Başvuru kanalı geçici olarak kullanılamıyor. Lütfen tekrar deneyin veya WhatsApp üzerinden ulaşın.",
    close: "Kapat",
    retry: "Tekrar dene",
    required: "Zorunlu",
    invalidEmail: "Geçerli bir e-posta adresi girin",
    consentRequired: "Onay gerekli",
    prefillLabel: "Önceden dolduruldu:",
    channelLine: "Şifreli başvuru · Milano · Roma · İstanbul",

    contactAs: "Başvuru türü",
    contactAsOptions: { executive: "Yönetici", company: "Şirket", delegation: "Heyet" },
    contactAsHelp: {
      executive: "Kurucular, hissedarlar ve üst düzey karar vericiler için. Özetinizi doğrudan bir ortak okur.",
      company: "Kurumsal mandatlar için. Yanıt vermeden önce çıkar çatışması kontrolü yapabilmemiz için tüzel kişiliği belirtin.",
      delegation: "Ticaret heyetleri, odalar ve kurumsal gruplar için. Heyetin büyüklüğünü ve ziyaret tarihlerini belirtin.",
    },
    companyRequired: "Kurumsal başvurular için şirket adı zorunludur",

    phone: "Telefon / WhatsApp",
    phoneOptional: "isteğe bağlı",
    phoneHint: "Ülke koduyla, örn. +90 · +39 · +44",
    invalidPhone: "Geçerli bir telefon numarası girin",

    channel: "Tercih edilen kanal",
    channelOptions: { email: "E-posta", whatsapp: "WhatsApp", call: "Arama" },
    language: "Tercih edilen dil",
    languages: { en: "English", tr: "Türkçe", it: "Italiano" },

    briefHint: "En az 20 karakter",
    briefTooShort: "Biraz daha ayrıntı ekleyin (en az 20 karakter)",
    briefTooLong: "Kısaltmayı düşünün; uzun özetleri ilk temastan sonra ek olarak gönderin",
    characters: "karakter",
    submitShortcut: "Göndermek için Ctrl / ⌘ + Enter",

    clear: "Temizle",
    draftRestored: "Taslak geri yüklendi",

    responseLine: "Bir iş günü içinde yanıt",
    nextStepsTitle: "Sırada ne var",
    nextStepAdvisor: "Kıdemli bir danışman bir iş günü içinde yanıt verir.",
    nextStepWhatsapp: "Özetinizle birlikte WhatsApp üzerinden devam edin",
    copyBrief: "Özeti kopyala",
    copied: "Kopyalandı",
    copyEmail: "Kopyalamak için tıklayın",
    openMail: "E-posta uygulamasında aç",
    optional: "isteğe bağlı",
  },
  it: {
    title: "Richiedi una Consulenza",
    sub: "Intake strutturato di 30–60 minuti con un partner fondatore. Rispondiamo entro un giorno lavorativo.",
    name: "Nome e cognome",
    email: "Email di lavoro",
    company: "Azienda",
    companyOptional: "facoltativo",
    message: "Brief del mandato",
    messagePlaceholder: "Raccontaci da dove e verso dove ti stai espandendo, l'organico e la decisione che devi prendere.",
    consent: "Accetto l'informativa sulla privacy e acconsento a essere contattato per questa richiesta.",
    submit: "Invia richiesta",
    sending: "Invio in corso…",
    successTitle: "Richiesta ricevuta",
    successBody: "Un partner esaminerà il tuo brief e confermerà uno slot via email entro un giorno lavorativo.",
    errorTitle: "Invio non riuscito",
    errorBody: "Il canale di intake è temporaneamente non disponibile. Riprova, oppure contattaci su WhatsApp.",
    close: "Chiudi",
    retry: "Riprova",
    required: "Obbligatorio",
    invalidEmail: "Inserisci un indirizzo email valido",
    consentRequired: "Il consenso è obbligatorio",
    prefillLabel: "Precompilato da",
    channelLine: "Intake cifrato · Milano · Roma · Istanbul",

    contactAs: "Ti contatto in qualità di",
    contactAsOptions: { executive: "Executive", company: "Azienda", delegation: "Delegazione" },
    contactAsHelp: {
      executive: "Per fondatori, titolari e decisori C-level. Il tuo brief lo legge direttamente un partner.",
      company: "Per mandati societari. Indica l'entità così possiamo verificare eventuali conflitti prima di risponderti.",
      delegation: "Per missioni commerciali, camere e gruppi istituzionali. Indicaci la dimensione del gruppo e le date della visita.",
    },
    companyRequired: "La ragione sociale è obbligatoria per le richieste aziendali",

    phone: "Telefono / WhatsApp",
    phoneOptional: "facoltativo",
    phoneHint: "Con prefisso internazionale, es. +39 · +90 · +44",
    invalidPhone: "Inserisci un numero di telefono valido",

    channel: "Canale preferito",
    channelOptions: { email: "Email", whatsapp: "WhatsApp", call: "Telefonata" },
    language: "Lingua preferita",
    languages: { en: "English", tr: "Türkçe", it: "Italiano" },

    briefHint: "Minimo 20 caratteri",
    briefTooShort: "Aggiungi qualche dettaglio in più (almeno 20 caratteri)",
    briefTooLong: "Valuta di accorciare; i brief lunghi si inviano come allegato dopo il primo contatto",
    characters: "caratteri",
    submitShortcut: "Ctrl / ⌘ + Invio per inviare",

    clear: "Svuota",
    draftRestored: "Bozza ripristinata",

    responseLine: "Risposta entro un giorno lavorativo",
    nextStepsTitle: "Cosa succede ora",
    nextStepAdvisor: "Un senior advisor risponde entro un giorno lavorativo.",
    nextStepWhatsapp: "Prosegui su WhatsApp con il tuo brief allegato",
    copyBrief: "Copia il brief",
    copied: "Copiato",
    copyEmail: "Clicca per copiare",
    openMail: "Apri nell'app di posta",
    optional: "facoltativo",
  },
};
