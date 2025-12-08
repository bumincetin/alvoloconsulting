'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaLinkedin, FaInstagram, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const getContactSectionContent = (lang: string) => {
  const content = {
    tr: {
      title: "İletişim",
      subtitle: "İtalya'da iş ve yaşam için entegrasyon çözümleri ve finansal danışmanlık hizmetlerimiz hakkında bize ulaşın.",
      formNameLabel: "Ad Soyad",
      formEmailLabel: "E-posta",
      formInterestLabel: "İlgi Alanı",
      formMessageLabel: "Mesajınız",
      formSubmitButton: "Analiz İste",
      formSendingButton: "İşleniyor...",
      formProcessingButton: "Veri Modelleniyor...",
      successTitle: "Profil Oluşturuldu",
      successMessage: "Veri modellendi. Sonraki adımınızı seçin:",
      sendViaEmail: "E-posta Uygulaması ile Gönder",
      proposeTimeslots: "3 Farklı Zaman Dilimi Öner",
      formErrorMessage: "Bir hata oluştu. Lütfen tekrar deneyin.",
      formErrorDetails: "Hata detayı: ",
      interestOptions: {
        italy: "İtalya'ya Genişleme",
        turkey: "Türkiye'ye Genişleme",
        tax: "Vergi Optimizasyonu"
      },
      privacyCheckbox1: "Kişisel verilerimin AB 679/2016 sayılı Tüzük uyarınca işlenmesine izin veriyorum",
      privacyCheckbox2: "Pazarlama, promosyon faaliyetleri, ticari teklifler ve pazar araştırması amaçlarıyla veri işlenmesine izin veriyorum",
      privacyPolicy: "Gizlilik Politikası",
      phoneTitle: "Telefon",
      phoneDetails: "+39 348 170 5207",
      whatsappDetails: "WhatsApp: +39 348 170 5207",
      emailTitle: "E-posta",
      emailDetails: "info@alvoloconsulting.com",
      addressTitle: "Adres",
      addressDetails: "Via Valsugana, 20139 Milano (MI), İtalya",
      hoursTitle: "Çalışma Saatleri",
      hoursDetails: "Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 09:00 - 14:00<br />Pazar: Kapalı",
      getInTouch: "Bizimle İletişime Geçin",
      contactInfo: "İletişim Bilgileri",
      followUs: "Bizi Takip Edin"
    },
    en: {
      title: "Contact",
      subtitle: "Contact us for integration solutions and financial consultancy services for doing business and living in Italy.",
      formNameLabel: "Full Name",
      formEmailLabel: "Email",
      formInterestLabel: "Interest",
      formMessageLabel: "Your Message",
      formSubmitButton: "Request Analysis",
      formSendingButton: "Processing...",
      formProcessingButton: "Processing Data...",
      successTitle: "Profile Generated",
      successMessage: "Data modeled. Choose your next step:",
      sendViaEmail: "Send via Email App",
      proposeTimeslots: "Propose 3 Different Timeslots",
      formErrorMessage: "An error occurred. Please try again.",
      formErrorDetails: "Error details: ",
      interestOptions: {
        italy: "Expansion to Italy",
        turkey: "Expansion to Turkey",
        tax: "Tax Optimization"
      },
      privacyCheckbox1: "I authorize the processing of my personal data in accordance with EU Regulation No. 679/2016",
      privacyCheckbox2: "I authorize the processing of data for marketing purposes, promotional activities, commercial offers and market research",
      privacyPolicy: "Privacy Policy",
      phoneTitle: "Phone",
      phoneDetails: "+39 348 170 5207",
      whatsappDetails: "WhatsApp: +39 348 170 5207",
      emailTitle: "Email",
      emailDetails: "info@alvoloconsulting.com",
      addressTitle: "Address",
      addressDetails: "Via Valsugana, 20139 Milano (MI), Italy",
      hoursTitle: "Business Hours",
      hoursDetails: "Monday - Friday: 09:00 - 18:00<br />Saturday: 09:00 - 14:00<br />Sunday: Closed",
      getInTouch: "Get In Touch",
      contactInfo: "Contact Information",
      followUs: "Follow Us"
    },
    it: {
      title: "Contatti",
      subtitle: "Contattaci per soluzioni di integrazione e consulenza finanziaria per vivere e fare business in Italia.",
      formNameLabel: "Nome Cognome",
      formEmailLabel: "Email",
      formInterestLabel: "Interesse",
      formMessageLabel: "Il Tuo Messaggio",
      formSubmitButton: "Richiedi Analisi",
      formSendingButton: "Elaborazione...",
      formProcessingButton: "Elaborazione Dati...",
      successTitle: "Profilo Generato",
      successMessage: "Dati modellati. Scegli il tuo prossimo passo:",
      sendViaEmail: "Invia tramite App Email",
      proposeTimeslots: "Proponi 3 Fasce Orarie Diverse",
      formErrorMessage: "Si è verificato un errore. Riprova.",
      formErrorDetails: "Dettagli errore: ",
      interestOptions: {
        italy: "Espansione in Italia",
        turkey: "Espansione in Turchia",
        tax: "Ottimizzazione Fiscale"
      },
      privacyCheckbox1: "Autorizzo il trattamento dei miei dati personali in base al Regolamento UE n. 679/2016",
      privacyCheckbox2: "Autorizzo al trattamento dei dati per finalità di marketing, attività promozionali, offerte commerciali ed indagini di mercato.",
      privacyPolicy: "Privacy Policy",
      phoneTitle: "Telefono",
      phoneDetails: "+39 348 170 5207",
      whatsappDetails: "WhatsApp: +39 348 170 5207",
      emailTitle: "Email",
      emailDetails: "info@alvoloconsulting.com",
      addressTitle: "Indirizzo",
      addressDetails: "Via Valsugana, 20139 Milano (MI), Italia",
      hoursTitle: "Orari di Lavoro",
      hoursDetails: "Lunedì - Venerdì: 09:00 - 18:00<br />Sabato: 09:00 - 14:00<br />Domenica: Chiuso",
      getInTouch: "Mettiti in Contatto",
      contactInfo: "Informazioni di Contatto",
      followUs: "Seguici"
    }
  };
  return content[lang as keyof typeof content] || content.tr;
};

const Contact = () => {
  const { language } = useLanguage();
  const c = getContactSectionContent(language);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
    privacyConsent: false,
    marketingConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mailtoLink, setMailtoLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the Mailto Link
    const subject = encodeURIComponent(`Consultancy Request: ${formData.interest || 'General Inquiry'}`);
    const body = encodeURIComponent(
      `Hi Alvolo Team,\n\n` +
      `I am interested in: ${formData.interest || 'General Inquiry'}\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Please propose 3 different timeslots for a consultation call.\n\n` +
      `Best regards,\n${formData.name}`
    );
    const mailto = `mailto:bumin.cetin@alvoloconsulting.com?subject=${subject}&body=${body}`;
    setMailtoLink(mailto);

    // Simulate processing delay & show success
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  // Helper to render text with <br /> tags
  const renderHtml = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <section id="contact" className="py-24" style={{backgroundColor: 'var(--bg-primary)'}}>
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f58643] to-[#d97335] rounded-full mb-6 shadow-lg">
            <FaEnvelope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{color: 'var(--text-primary)'}}>
            {c.title}
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color: 'var(--text-secondary)'}}>
            {c.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="xl:col-span-1">
            <div className="glass-panel rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center text-white">
                <div className="w-8 h-8 bg-gradient-to-br from-[#f58643] to-[#d97335] rounded-lg flex items-center justify-center mr-3">
                  <FaPhone className="w-4 h-4 text-white" />
                </div>
                {c.contactInfo}
              </h3>
              
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{backgroundColor: 'rgba(15, 23, 42, 0.5)'}}>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1" style={{color: 'var(--text-primary)'}}>
                      {c.phoneTitle}
                    </h4>
                    <p className="mb-2" style={{color: 'var(--text-secondary)'}}>
                      {c.phoneDetails}
                    </p>
                    <p className="text-sm font-medium" style={{color: '#22c55e'}}>
                      {c.whatsappDetails}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{backgroundColor: 'rgba(15, 23, 42, 0.5)'}}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1" style={{color: 'var(--text-primary)'}}>
                      {c.emailTitle}
                    </h4>
                    <p style={{color: 'var(--text-secondary)'}}>
                      {c.emailDetails}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{backgroundColor: 'rgba(15, 23, 42, 0.5)'}}>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1" style={{color: 'var(--text-primary)'}}>
                      {c.addressTitle}
                    </h4>
                    <p style={{color: 'var(--text-secondary)'}}>
                      {c.addressDetails}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{backgroundColor: 'rgba(15, 23, 42, 0.5)'}}>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1" style={{color: 'var(--text-primary)'}}>
                      {c.hoursTitle}
                    </h4>
                    <div className="text-sm" style={{color: 'var(--text-secondary)'}}>
                      {renderHtml(c.hoursDetails)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8" style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
                <h4 className="text-lg font-semibold mb-4" style={{color: 'var(--text-primary)'}}>
                  {c.followUs}
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/393481705207"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaWhatsapp className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/alvolo-consulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaLinkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/alvoloconsulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaInstagram className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="xl:col-span-2">
            <div className="glass-panel rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-8 flex items-center" style={{color: 'var(--text-primary)'}}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#f58643] to-[#d97335] rounded-lg flex items-center justify-center mr-3">
                  <FaEnvelope className="w-4 h-4 text-white" />
                </div>
                {c.getInTouch}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono mb-1" style={{color: '#64748b'}}>
                    {c.formEmailLabel.toUpperCase()}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-[#f58643] transition-colors"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting || showSuccess}
                    placeholder="name@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-xs font-mono mb-1" style={{color: '#64748b'}}>
                    {c.formInterestLabel.toUpperCase()}
                  </label>
                  <select
                    id="interest"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-[#f58643] transition-colors"
                    value={formData.interest}
                    onChange={handleChange}
                    disabled={isSubmitting || showSuccess}
                    required
                  >
                    <option value="">{language === 'tr' ? 'Seçiniz...' : language === 'it' ? 'Seleziona...' : 'Select...'}</option>
                    <option value={c.interestOptions.italy}>{c.interestOptions.italy}</option>
                    <option value={c.interestOptions.turkey}>{c.interestOptions.turkey}</option>
                    <option value={c.interestOptions.tax}>{c.interestOptions.tax}</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#f58643] text-white font-bold py-4 rounded-lg hover:bg-[#d97335] transition-all shadow-lg shadow-[#f58643]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  disabled={isSubmitting || showSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {c.formProcessingButton}
                    </>
                  ) : (
                    <>
                      {c.formSubmitButton}
                      <FaArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Success Message (Hidden by default) */}
              {showSuccess && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl transition-opacity duration-500 z-10" style={{backgroundColor: 'var(--bg-surface-hover)'}}>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                    <FaCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2" style={{color: 'var(--text-primary)'}}>{c.successTitle}</h3>
                  <p className="text-sm mb-6 text-center" style={{color: 'var(--text-secondary)'}}>{c.successMessage}</p>
                  
                  <div className="flex flex-col gap-3 w-full px-8">
                    <a
                      href={mailtoLink}
                      className="w-full border py-3 rounded-lg text-sm font-medium text-center transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-secondary)',
                        color: 'var(--text-primary)'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                      }}
                    >
                      {c.sendViaEmail}
                    </a>
                    <a
                      href={mailtoLink}
                      className="w-full text-white py-3 rounded-lg text-sm font-medium text-center transition-colors"
                      style={{backgroundColor: 'var(--brand-orange)'}}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--brand-orange-ton)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--brand-orange)'}
                    >
                      {c.proposeTimeslots}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 