'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaBuilding, FaHandshake, FaCoins, FaCogs } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { getTranslation, type Locale } from '@/lib/translations';
import PageVideoBackground from '@/components/Media/PageVideoBackground';
import GlassCard from '@/app/components/ui/GlassCard';
import MagneticButton from '@/components/UI/MagneticButton';

const moduleIcons = [
    <FaChartLine key={0} className="w-6 h-6" />,
    <FaBuilding key={1} className="w-6 h-6" />,
    <FaRocket key={2} className="w-6 h-6" />,
    <FaHandshake key={3} className="w-6 h-6" />,
    <FaCoins key={4} className="w-6 h-6" />,
    <FaCogs key={5} className="w-6 h-6" />,
];

export default function StartupCorridorClient() {
    const params = useParams();
    const locale = (params?.locale as Locale) || 'en';
    const t = getTranslation(locale);
    const p = t.startupCorridorPage;

    return (
        <main className="min-h-screen bg-transparent text-electric-platinum pt-32 pb-20">
            <PageVideoBackground src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/136a8a211c6c3b1cc1fd7b1c7d836c58/manifest/video.m3u8" />
            {/* Hero Section */}
            <section className="container-wide mx-auto px-6 mb-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 rounded-full border border-tungsten-grey/60 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-widest text-electric-platinum/80"
                    >
                        {p.badge}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white leading-tight"
                    >
                        {p.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-electric-platinum/60 max-w-2xl mx-auto"
                    >
                        {p.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Mission */}
            <section className="container-wide mx-auto px-6 mb-24 md:mb-32">
                <GlassCard className="p-8 md:p-16 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-serif text-white">{p.missionTitle}</h2>
                            <p className="text-electric-platinum/80 leading-relaxed text-sm md:text-base">
                                {p.missionP1}
                            </p>
                            <p className="text-electric-platinum/80 leading-relaxed text-sm md:text-base">
                                {p.missionP2} <span className="text-white font-semibold">{p.missionHighlight}</span>.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border border-tungsten-grey/40 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 rounded-full border border-white/20 animate-[spin_15s_linear_infinite_reverse]" />
                                <FaRocket className="w-10 h-10 md:w-12 md:h-12 text-white/80" />
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* 6-Module Framework */}
            <section className="container-wide mx-auto px-6 mb-24 md:mb-32">
                <div className="text-center mb-12 md:mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-white">{p.frameworkTitle}</h2>
                    <p className="text-electric-platinum/60 max-w-2xl mx-auto text-sm md:text-base">
                        {p.frameworkSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {p.modules.map((mod, idx) => (
                        <GlassCard key={idx} className="p-6 md:p-8 hover:bg-white/5 transition-colors group">
                            <div className="mb-6 p-4 rounded-full bg-white/5 w-fit border border-white/10 group-hover:border-white/30 transition-colors">
                                {moduleIcons[idx]}
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{mod.title}</h3>
                            <p className="text-sm text-electric-platinum/70 leading-relaxed">{mod.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* 3 Tiers */}
            <section className="container-wide mx-auto px-6 mb-24 md:mb-32">
                <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12 md:mb-16">{p.tiersTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {p.tiers.map((tier, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full border border-tungsten-grey/60 rounded-3xl p-8 flex flex-col items-center text-center bg-void-black/50 backdrop-blur-md">
                                <div className="mb-2 text-xs uppercase tracking-widest text-electric-platinum/50">{p.tierLabel} {idx + 1}</div>
                                <h3 className="text-3xl font-serif text-white mb-2">{tier.name}</h3>
                                <div className="px-4 py-1 rounded-full border border-white/20 text-xs font-mono mb-6 bg-white/5">
                                    {tier.duration}
                                </div>
                                <p className="text-electric-platinum/70 text-sm leading-relaxed mb-8 flex-1">
                                    {tier.desc}
                                </p>
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
                                <MagneticButton
                                    label={p.tierCta}
                                    onClick={() => window.location.href = `/${locale}/contact`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Alvolo */}
            <section className="container-wide mx-auto px-6 mb-24">
                <GlassCard className="p-12 md:p-20 text-center max-w-4xl mx-auto bg-gradient-to-br from-white/[0.03] to-transparent">
                    <h2 className="text-3xl font-serif text-white mb-8">{p.whyTitle}</h2>
                    <p className="text-lg text-electric-platinum/80 leading-relaxed mb-10 max-w-3xl mx-auto">
                        {p.whyBody}
                    </p>
                    <MagneticButton
                        label={p.whyCta}
                        onClick={() => window.location.href = `/${locale}/contact`}
                    />
                </GlassCard>
            </section>
        </main>
    );
}
