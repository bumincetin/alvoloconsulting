'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaBuilding, FaHandshake, FaCoins, FaCogs, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import GlassCard from '@/app/components/ui/GlassCard';
import MagneticButton from '@/components/UI/MagneticButton';

const modules = [
    {
        title: 'Market Discovery & Entry',
        icon: <FaChartLine className="w-6 h-6" />,
        desc: 'Ideal Customer Profile (ICP) validation, competitor landscaping, and pricing signal analysis. Mapping potential partners for a clear lay of the land.',
    },
    {
        title: 'Company Setup & Compliance',
        icon: <FaBuilding className="w-6 h-6" />,
        desc: 'Handling legal entity selection (SRL/SPA or A.Ş./Ltd. Şti.), tax registrations, accounting setup, and local banking onboarding.',
    },
    {
        title: 'People & Mobility',
        icon: <FaRocket className="w-6 h-6" />, // Using Rocket as placeholder for mobility/talent
        desc: 'Coordinating visa/relocation processes and establishing hiring pathways. Contractor frameworks for flexible workforce options.',
    },
    {
        title: 'Commercial Enablement',
        icon: <FaHandshake className="w-6 h-6" />,
        desc: 'Assisting with channel partner setup, reseller agreements, and "First-10-Customers" plan. Localizing collateral for the target region.',
    },
    {
        title: 'Capital & Incentives',
        icon: <FaCoins className="w-6 h-6" />,
        desc: 'Introductions to investors/accelerators, mapping non-dilutive incentives, and grant application support.',
    },
    {
        title: 'Operate to Scale',
        icon: <FaCogs className="w-6 h-6" />,
        desc: 'KPI instrumentation, OKR coaching, and quarterly operations reviews to ensure sustainable expansion.',
    },
];

const tiers = [
    {
        name: 'Launch',
        duration: '6-8 Weeks',
        desc: 'A "Fast-Start" program focusing on entity creation, essential compliance, and light Go-To-Market support.',
    },
    {
        name: 'Grow',
        duration: '3-6 Months',
        desc: 'A deepening phase handling full compliance, commercial enablement, and active hiring support.',
    },
    {
        name: 'Scale',
        duration: '6-12 Months',
        desc: 'Long-term partnership with embedded operating cadence, executive reporting, and strategic partnerships.',
    },
];

export default function StartupCorridorClient() {
    const params = useParams();
    const locale = (params?.locale as string) || 'en';

    return (
        <main className="min-h-screen bg-void-black text-electric-platinum pt-32 pb-20">
            {/* Hero Section */}
            <section className="container-wide mx-auto px-6 mb-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 rounded-full border border-tungsten-grey/60 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-widest text-electric-platinum/80"
                    >
                        New Strategic Pillar
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white leading-tight"
                    >
                        The Turkey-Italy Startup Corridor
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-electric-platinum/60 max-w-2xl mx-auto"
                    >
                        A Data-Driven Expansion Engine. Eliminating the friction of cross-border expansion with a standardized, repeatable playbook.
                    </motion.p>
                </div>
            </section>

            {/* Mission */}
            <section className="container-wide mx-auto px-6 mb-32">
                <GlassCard className="p-12 md:p-16 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-serif text-white">Our Mission</h2>
                            <p className="text-electric-platinum/80 leading-relaxed">
                                We aim to solve the specific "market gap" where founders struggle to navigate the complexities of incorporation, tax, compliance, and go-to-market strategy when expanding between these two regions.
                            </p>
                            <p className="text-electric-platinum/80 leading-relaxed">
                                Our ambition is to be the <span className="text-white font-semibold">first data-driven, full-stack TR-IT expansion operator</span>. We act as the architect of your international journey, utilizing a curated partner network to shorten time-to-market.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="relative w-48 h-48 rounded-full border border-tungsten-grey/40 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 rounded-full border border-white/20 animate-[spin_15s_linear_infinite_reverse]" />
                                <FaRocket className="w-12 h-12 text-white/80" />
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* 6-Module Framework */}
            <section className="container-wide mx-auto px-6 mb-32">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-white">The 6-Module Expansion Framework</h2>
                    <p className="text-electric-platinum/60 max-w-2xl mx-auto">
                        We don't just give advice; we implement a configured service model designed to guide you through every stage.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((mod, idx) => (
                        <GlassCard key={idx} className="p-8 hover:bg-white/5 transition-colors group">
                            <div className="mb-6 p-4 rounded-full bg-white/5 w-fit border border-white/10 group-hover:border-white/30 transition-colors">
                                {mod.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{mod.title}</h3>
                            <p className="text-sm text-electric-platinum/70 leading-relaxed">{mod.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </section>

            {/* 3 Tiers */}
            <section className="container-wide mx-auto px-6 mb-32">
                <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-16">Your Growth Journey</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full border border-tungsten-grey/60 rounded-3xl p-8 flex flex-col items-center text-center bg-void-black/50 backdrop-blur-md">
                                <div className="mb-2 text-xs uppercase tracking-widest text-electric-platinum/50">Tier {idx + 1}</div>
                                <h3 className="text-3xl font-serif text-white mb-2">{tier.name}</h3>
                                <div className="px-4 py-1 rounded-full border border-white/20 text-xs font-mono mb-6 bg-white/5">
                                    {tier.duration}
                                </div>
                                <p className="text-electric-platinum/70 text-sm leading-relaxed mb-8 flex-1">
                                    {tier.desc}
                                </p>
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
                                <MagneticButton
                                    label="Get Started"
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
                    <h2 className="text-3xl font-serif text-white mb-8">Why Alvolo?</h2>
                    <p className="text-lg text-electric-platinum/80 leading-relaxed mb-10 max-w-3xl mx-auto">
                        We are not just consultants; we are operators. By combining business development, analytics, and end-to-end operations, we offer a unique value proposition that no other boutique consultancy in the Turkey-Italy space provides. We create network effects that compound over time, giving you access to a proven ecosystem.
                    </p>
                    <MagneticButton
                        label="Book a Discovery Call"
                        onClick={() => window.location.href = `/${locale}/contact`}
                    />
                </GlassCard>
            </section>
        </main>
    );
}
