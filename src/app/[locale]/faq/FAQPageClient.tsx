'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTranslation, type Locale } from '@/lib/translations';
import GlassCard from '@/app/components/ui/GlassCard';

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="border-b border-tungsten-grey/40 last:border-b-0"
        >
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 py-7 text-left group"
            >
                <span className="text-base md:text-lg font-semibold text-white group-hover:text-electric-platinum transition-colors pr-4">
                    {question}
                </span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-electric-platinum/50"
                >
                    <FaChevronDown className="w-4 h-4" />
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-7 text-sm md:text-base text-electric-platinum/70 leading-relaxed max-w-3xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQPageClient() {
    const params = useParams();
    const locale = (params?.locale as Locale) || 'en';
    const t = getTranslation(locale);

    return (
        <main className="min-h-screen bg-void-black text-electric-platinum pt-32 pb-20">
            <div className="container-wide mx-auto px-6">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 rounded-full border border-tungsten-grey/60 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-widest text-electric-platinum/80"
                    >
                        {t.nav.faq}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white"
                    >
                        {t.faq.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-electric-platinum/60 text-base md:text-lg max-w-xl mx-auto"
                    >
                        {t.faq.subtitle}
                    </motion.p>
                </div>

                {/* Questions */}
                <section className="container-wide mx-auto px-0 md:px-0 mb-20 md:mb-32">
                    <GlassCard className="p-6 md:p-12 max-w-4xl mx-auto">
                        <div className="space-y-4">
                            {t.faq.questions.map((item, idx) => (
                                <FAQItem key={idx} question={item.q} answer={item.a} index={idx} />
                            ))}
                        </div>
                    </GlassCard>
                </section>

                {/* CTA */}
                <section className="container-wide mx-auto px-0 md:px-0 text-center">
                    <GlassCard className="p-8 md:p-16 max-w-3xl mx-auto bg-gradient-to-br from-white/[0.03] to-transparent">
                        <h2 className="text-2xl md:text-4xl font-serif text-white mb-4 md:mb-6">
                            Still have questions?
                        </h2>
                        <p className="text-electric-platinum/70 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed">
                            We are here to help you navigate your expansion journey.
                        </p>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-3 rounded-full bg-black text-white px-6 py-3 md:px-8 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        >
                            {t.nav.contact}
                            <FaArrowRight className="w-3 h-3" />
                        </Link>
                    </GlassCard>
                </section>
            </div>
        </main>
    );
}
