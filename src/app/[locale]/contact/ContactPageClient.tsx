'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaLinkedin, FaInstagram, FaCheck, FaArrowRight } from 'react-icons/fa';
import GlassCard from '../../components/ui/GlassCard';
import { getTranslation, type Locale } from '@/lib/translations';

interface ContactPageClientProps {
  locale: Locale;
}

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const t = getTranslation(locale);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mailtoLink, setMailtoLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="neo-pill mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
            <span className="text-[11px] tracking-[0.2em] uppercase font-mono">{t.contact.title.toUpperCase()}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">{t.contact.title}</h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-text-primary">
                <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                  <FaPhone className="w-4 h-4 text-accent-cyan" />
                </div>
                {t.contact.contactInfo}
              </h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-glass-surface border border-glass-border">
                  <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="w-4 h-4 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{t.contact.phoneTitle}</h4>
                    <p className="text-sm text-text-muted">{t.contact.phoneDetails}</p>
                    <p className="text-xs text-green-400 mt-1">{t.contact.whatsappDetails}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-glass-surface border border-glass-border">
                  <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{t.contact.emailTitle}</h4>
                    <p className="text-sm text-text-muted">{t.contact.emailDetails}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-glass-surface border border-glass-border">
                  <div className="w-10 h-10 rounded-lg bg-accent-orange/20 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4 text-accent-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{t.contact.addressTitle}</h4>
                    <p className="text-sm text-text-muted">{t.contact.addressDetails}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-glass-surface border border-glass-border">
                  <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-4 h-4 text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{t.contact.hoursTitle}</h4>
                    <p className="text-sm text-text-muted">{t.contact.hoursDetails}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-glass-border">
                <h4 className="font-semibold mb-4 text-text-primary">{t.contact.followUs}</h4>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/393481705207"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/30 transition-all"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/alvolo-consulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-all"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/alvoloconsulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/30 transition-all"
                  >
                    <FaInstagram size={18} />
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <GlassCard className="relative overflow-hidden">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-text-primary">
                <div className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center">
                  <FaEnvelope className="w-4 h-4 text-accent-orange" />
                </div>
                {t.contact.getInTouch}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono mb-2 text-text-muted uppercase tracking-wider">
                      {t.contact.formNameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-glass-surface border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting || showSuccess}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono mb-2 text-text-muted uppercase tracking-wider">
                      {t.contact.formEmailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-glass-surface border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting || showSuccess}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-xs font-mono mb-2 text-text-muted uppercase tracking-wider">
                    {t.contact.formInterestLabel}
                  </label>
                  <select
                    id="interest"
                    className="w-full bg-glass-surface border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
                    value={formData.interest}
                    onChange={handleChange}
                    disabled={isSubmitting || showSuccess}
                    required
                  >
                    <option value="">{locale === 'tr' ? 'Seçiniz...' : locale === 'it' ? 'Seleziona...' : 'Select...'}</option>
                    <option value={t.contact.interestOptions.italy}>{t.contact.interestOptions.italy}</option>
                    <option value={t.contact.interestOptions.turkey}>{t.contact.interestOptions.turkey}</option>
                    <option value={t.contact.interestOptions.tax}>{t.contact.interestOptions.tax}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono mb-2 text-text-muted uppercase tracking-wider">
                    {t.contact.formMessageLabel}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-glass-surface border border-glass-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting || showSuccess}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent-cyan to-accent-purple text-void font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02]"
                  disabled={isSubmitting || showSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-void"></div>
                      {t.contact.formSendingButton}
                    </>
                  ) : (
                    <>
                      {t.contact.formSubmitButton}
                      <FaArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Success Message */}
              {showSuccess && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-void/95 z-10">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-6">
                    <FaCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-2xl mb-2 text-text-primary">{t.contact.successTitle}</h3>
                  <p className="text-text-muted mb-8">{t.contact.successMessage}</p>
                  
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <a
                      href={mailtoLink}
                      className="w-full border border-glass-border py-3 rounded-xl text-sm font-medium text-center bg-glass-surface text-text-primary hover:bg-glass-highlight transition-colors"
                    >
                      {t.contact.sendViaEmail}
                    </a>
                    <a
                      href={mailtoLink}
                      className="w-full bg-gradient-to-r from-accent-cyan to-accent-purple text-void py-3 rounded-xl text-sm font-bold text-center"
                    >
                      {t.contact.proposeTimeslots}
                    </a>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

