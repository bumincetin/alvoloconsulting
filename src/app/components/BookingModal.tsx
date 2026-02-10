'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowRight, FaCheck, FaClock } from 'react-icons/fa';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    locale: string;
}

interface FormErrors {
    service?: string;
    date?: string;
    time?: string;
    email?: string;
    name?: string;
}

const translations = {
    en: {
        title: 'Schedule a Consultation',
        desc: 'Select a service and preferred time. Our team will confirm availability within 24 hours.',
        selectService: 'Select Service',
        yourDetails: 'Your Details',
        yourName: 'Full Name',
        emailAddress: 'Email Address',
        selectTime: 'Preferred Time',
        confirm: 'Request Consultation',
        loading: 'Processing Request...',
        success: 'Request Received',
        successDesc: 'We will review your consultation request and confirm availability via email within 24 hours.',
        close: 'Close',
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        dateRequired: 'Date is required',
        timeRequired: 'Time slot is required',
        message: 'Additional Notes (Optional)',
        messagePlaceholder: 'Tell us about your specific needs...',
    },
    tr: {
        title: 'Danışmanlık Randevusu',
        desc: 'Hizmet seçin ve tercih ettiğiniz zamanı belirtin. Ekibimiz 24 saat içinde müsaitliği onaylayacaktır.',
        selectService: 'Hizmet Seçin',
        yourDetails: 'Bilgileriniz',
        yourName: 'Ad Soyad',
        emailAddress: 'E-posta Adresi',
        selectTime: 'Tercih Edilen Saat',
        confirm: 'Danışmanlık Talep Et',
        loading: 'İstek İşleniyor...',
        success: 'Talep Alındı',
        successDesc: 'Danışmanlık talebinizi inceleyeceğiz ve 24 saat içinde e-posta yoluyla durumu bildireceğiz.',
        close: 'Kapat',
        nameRequired: 'İsim gerekli',
        emailRequired: 'E-posta gerekli',
        dateRequired: 'Tarih gerekli',
        timeRequired: 'Saat seçimi gerekli',
        message: 'Ek Notlar (İsteğe Bağlı)',
        messagePlaceholder: 'Özel ihtiyaçlarınızı bize anlatın...',
    },
    it: {
        title: 'Prenota una Consulenza',
        desc: 'Seleziona un servizio e l\'orario preferito. Il nostro team confermerà la disponibilità entro 24 ore.',
        selectService: 'Seleziona Servizio',
        yourDetails: 'I Tuoi Dati',
        yourName: 'Nome Completo',
        emailAddress: 'Indirizzo Email',
        selectTime: 'Orario Preferito',
        confirm: 'Richiedi Consulenza',
        loading: 'Elaborazione Richiesta...',
        success: 'Richiesta Ricevuta',
        successDesc: 'Esamineremo la tua richiesta di consulenza e confermeremo la disponibilità via email entro 24 ore.',
        close: 'Chiudi',
        nameRequired: 'Nome richiesto',
        emailRequired: 'Email richiesta',
        dateRequired: 'Data richiesta',
        timeRequired: 'Selezione orario richiesta',
        message: 'Note Aggiuntive (Facoltativo)',
        messagePlaceholder: 'Raccontaci le tue esigenze specifiche...',
    },
};

const services = {
    en: [
        {
            id: 'integration',
            name: 'Integration Consulting',
            duration: '60 min',
            desc: 'Comprehensive guidance for settling in a new country — residency, education, housing, and more.',
        },
        {
            id: 'financial',
            name: 'Financial Advisory',
            duration: '60 min',
            desc: 'Strategic financial consulting — tax optimization, investment structuring, and cross-border planning.',
        },
        {
            id: 'expansion-italy',
            name: 'Italy Expansion Package',
            duration: '90 min',
            desc: 'Full-scope market entry consultation for expanding operations into Italy.',
        },
        {
            id: 'expansion-turkey',
            name: 'Turkey Expansion Package',
            duration: '90 min',
            desc: 'Tailored consultation for navigating the Turkish market — regulations, partnerships, and setup.',
        },
        {
            id: 'custom',
            name: 'Custom Consultation',
            duration: 'Flexible',
            desc: 'Bespoke advisory session tailored to your unique cross-border needs.',
        },
    ],
    tr: [
        {
            id: 'integration',
            name: 'Entegrasyon Danışmanlığı',
            duration: '60 dk',
            desc: 'Yeni bir ülkeye yerleşme konusunda kapsamlı rehberlik — oturum izni, eğitim, barınma ve daha fazlası.',
        },
        {
            id: 'financial',
            name: 'Finansal Danışmanlık',
            duration: '60 dk',
            desc: 'Stratejik finansal danışmanlık — vergi optimizasyonu, yatırım yapılandırma ve sınır ötesi planlama.',
        },
        {
            id: 'expansion-italy',
            name: 'İtalya Genişleme Paketi',
            duration: '90 dk',
            desc: 'İtalya\'ya operasyon genişletmek için kapsamlı pazar giriş danışmanlığı.',
        },
        {
            id: 'expansion-turkey',
            name: 'Türkiye Genişleme Paketi',
            duration: '90 dk',
            desc: 'Türkiye pazarında yol alma konusunda özelleştirilmiş danışmanlık — düzenlemeler, ortaklıklar ve kurulum.',
        },
        {
            id: 'custom',
            name: 'Özel Danışmanlık',
            duration: 'Esnek',
            desc: 'Benzersiz sınır ötesi ihtiyaçlarınıza göre uyarlanmış danışmanlık oturumu.',
        },
    ],
    it: [
        {
            id: 'integration',
            name: 'Consulenza Integrazione',
            duration: '60 min',
            desc: 'Guida completa per stabilirsi in un nuovo paese — residenza, istruzione, alloggio e altro.',
        },
        {
            id: 'financial',
            name: 'Consulenza Finanziaria',
            duration: '60 min',
            desc: 'Consulenza finanziaria strategica — ottimizzazione fiscale, strutturazione investimenti e pianificazione transfrontaliera.',
        },
        {
            id: 'expansion-italy',
            name: 'Pacchetto Espansione Italia',
            duration: '90 min',
            desc: 'Consulenza completa per l\'ingresso nel mercato italiano.',
        },
        {
            id: 'expansion-turkey',
            name: 'Pacchetto Espansione Turchia',
            duration: '90 min',
            desc: 'Consulenza su misura per navigare il mercato turco — regolamenti, partnership e setup.',
        },
        {
            id: 'custom',
            name: 'Consulenza Personalizzata',
            duration: 'Flessibile',
            desc: 'Sessione di consulenza su misura per le tue esigenze transfrontaliere.',
        },
    ],
};

import { createPortal } from 'react-dom';

// ... (interfaces and translations remain the same) ...

export default function BookingModal({ isOpen, onClose, locale }: BookingModalProps) {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<'form' | 'loading' | 'success'>('form');
    const [selectedService, setSelectedService] = useState('integration');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [honeypot, setHoneypot] = useState('');

    const lang = (locale as 'en' | 'tr' | 'it') || 'en';
    const t = translations[lang] || translations.en;
    const serviceList = services[lang] || services.en;

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const generateTimeSlots = (): string[] => {
        const slots: string[] = [];
        for (let hour = 9; hour <= 18; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!name) newErrors.name = t.nameRequired;
        if (!email) newErrors.email = t.emailRequired;
        if (!date) newErrors.date = t.dateRequired;
        if (!time) newErrors.time = t.timeRequired;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot spam check
        if (honeypot) {
            setStep('success');
            return;
        }

        if (!validate()) return;

        setStep('loading');

        // Simulate processing — replace with actual email/calendar API
        await new Promise(resolve => setTimeout(resolve, 1800));

        setStep('success');
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep('form');
            setDate('');
            setTime('');
            setEmail('');
            setName('');
            setMessage('');
            setHoneypot('');
            setErrors({});
        }, 300);
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="booking-modal-title"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-void-black/80 backdrop-blur-md"
                        onClick={handleClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-obsidian-plate w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.7)] border border-tungsten-grey/40 flex flex-col overflow-hidden max-h-[90vh]"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            aria-label="Close booking modal"
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-electric-platinum/5 flex items-center justify-center text-electric-platinum/60 active:bg-electric-platinum/15 sm:hover:bg-electric-platinum/10 transition-all z-20"
                        >
                            <FaTimes size={16} />
                        </button>

                        {step === 'form' && (
                            <div
                                className="p-5 sm:p-8 md:p-10 overflow-y-auto flex-1 min-h-0 overscroll-contain"
                                style={{
                                    WebkitOverflowScrolling: 'touch',
                                }}
                            >
                                {/* ... (rest of the form content same as before) ... */}
                                <div className="mb-6 sm:mb-8 pr-8 sm:pr-0">
                                    <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-serif text-electric-platinum mb-2">{t.title}</h2>
                                    <p className="text-xs uppercase tracking-[0.2em] text-electric-platinum/50">{t.desc}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Honeypot field */}
                                    <div className="absolute -left-[9999px]" aria-hidden="true">
                                        <label htmlFor="website">Website (leave empty)</label>
                                        <input
                                            type="text"
                                            id="website"
                                            name="website"
                                            value={honeypot}
                                            onChange={(e) => setHoneypot(e.target.value)}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </div>

                                    {/* Services */}
                                    <div>
                                        <label className="block mb-4 text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/50">{t.selectService}</label>
                                        <div className="space-y-3">
                                            {serviceList.map((s) => (
                                                <button
                                                    key={s.id}
                                                    type="button"
                                                    onClick={() => setSelectedService(s.id)}
                                                    className={`w-full p-5 rounded-xl text-left transition-all ${selectedService === s.id
                                                        ? 'bg-holographic-cyan/10 border border-holographic-cyan/40 text-electric-platinum'
                                                        : 'bg-void-black/40 text-electric-platinum border border-tungsten-grey/30 hover:border-tungsten-grey/60'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-[11px] font-mono uppercase tracking-wider font-medium">{s.name}</span>
                                                    </div>
                                                    <p className={`text-xs ${selectedService === s.id ? 'text-electric-platinum/70' : 'text-electric-platinum/40'}`}>
                                                        {s.desc}
                                                    </p>
                                                    <div className={`flex items-center gap-2 mt-2 text-[10px] ${selectedService === s.id ? 'text-holographic-cyan/80' : 'text-electric-platinum/30'}`}>
                                                        <FaClock size={10} />
                                                        <span>{s.duration}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div>
                                        <label className="block mb-4 text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/50">{t.yourDetails}</label>
                                        <div className="space-y-3">
                                            <div>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder={t.yourName}
                                                    className={`w-full bg-void-black/40 border rounded-xl px-5 py-4 text-sm text-electric-platinum outline-none focus:border-holographic-cyan/60 transition-colors placeholder:text-electric-platinum/30 ${errors.name ? 'border-red-500/60' : 'border-tungsten-grey/30'}`}
                                                />
                                                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder={t.emailAddress}
                                                    className={`w-full bg-void-black/40 border rounded-xl px-5 py-4 text-sm text-electric-platinum outline-none focus:border-holographic-cyan/60 transition-colors placeholder:text-electric-platinum/30 ${errors.email ? 'border-red-500/60' : 'border-tungsten-grey/30'}`}
                                                />
                                                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                                            </div>
                                            <div>
                                                <input
                                                    type="date"
                                                    value={date}
                                                    onChange={e => setDate(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className={`w-full bg-void-black/40 border rounded-xl px-5 py-4 text-sm text-electric-platinum outline-none focus:border-holographic-cyan/60 transition-colors ${errors.date ? 'border-red-500/60' : 'border-tungsten-grey/30'}`}
                                                />
                                                {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time Selection */}
                                    <div>
                                        <label className="block mb-4 text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/50">{t.selectTime}</label>
                                        <div className="relative">
                                            <select
                                                value={time}
                                                onChange={e => setTime(e.target.value)}
                                                className={`w-full bg-void-black/40 border rounded-xl px-5 py-4 text-sm text-electric-platinum outline-none focus:border-holographic-cyan/60 transition-colors appearance-none ${errors.time ? 'border-red-500/60' : 'border-tungsten-grey/30'}`}
                                            >
                                                <option value="">{t.selectTime}</option>
                                                {timeSlots.map((slot) => (
                                                    <option key={slot} value={slot} className="bg-obsidian-plate text-electric-platinum">
                                                        {slot}
                                                    </option>
                                                ))}
                                            </select>
                                            <FaClock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-electric-platinum/30 pointer-events-none" size={14} />
                                            {errors.time && <p className="text-xs text-red-400 mt-1">{errors.time}</p>}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block mb-4 text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/50">{t.message}</label>
                                        <textarea
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            placeholder={t.messagePlaceholder}
                                            rows={3}
                                            className="w-full bg-void-black/40 border border-tungsten-grey/30 rounded-xl px-5 py-4 text-sm text-electric-platinum outline-none focus:border-holographic-cyan/60 transition-colors placeholder:text-electric-platinum/30 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 rounded-xl text-[11px] font-mono uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 bg-holographic-cyan text-void-black font-bold hover:bg-white hover:shadow-[0_0_30px_rgba(229,228,226,0.25)]"
                                    >
                                        {t.confirm}
                                        <FaArrowRight size={12} />
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 'loading' && (
                            <div className="p-20 text-center flex-1 flex flex-col items-center justify-center min-h-0">
                                <motion.div
                                    animate={{ height: [0, 60, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-px bg-holographic-cyan mx-auto mb-8"
                                />
                                <h3 className="text-xl font-serif text-electric-platinum">{t.loading}</h3>
                            </div>
                        )}

                        {step === 'success' && (
                            <div className="p-8 md:p-12 text-center flex-1 flex flex-col items-center justify-center min-h-0 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                                <div className="w-16 h-16 rounded-full bg-holographic-cyan/10 flex items-center justify-center mx-auto mb-6">
                                    <FaCheck size={24} className="text-holographic-cyan" />
                                </div>
                                <h3 className="text-3xl font-serif text-electric-platinum mb-3">{t.success}</h3>
                                <p className="text-sm text-electric-platinum/50 mb-8 max-w-sm mx-auto">{t.successDesc}</p>

                                <button
                                    onClick={handleClose}
                                    className="w-full border border-tungsten-grey/60 rounded-xl py-4 text-[10px] font-mono uppercase tracking-[0.15em] text-electric-platinum hover:bg-holographic-cyan hover:text-void-black hover:border-holographic-cyan transition-all"
                                >
                                    {t.close}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
