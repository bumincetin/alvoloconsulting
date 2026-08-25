import type { Locale } from "@/lib/translations";

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
  },
};
