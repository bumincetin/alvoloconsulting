'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/app/components/ui/GlassCard";
import {
  FaRocket,
  FaArrowRight,
  FaBalanceScale,
  FaBuilding,
  FaChartLine,
  FaFileAlt,
  FaGraduationCap,
  FaHandshake,
  FaHome,
  FaPassport,
  FaShieldAlt,
  FaUniversity,
} from "react-icons/fa";
import ScrambleText from "@/components/UI/ScrambleText";
import HlsVideo from "@/components/Media/HlsVideo";
import { getTranslation, type Locale } from "@/lib/translations";
import PageVideoBackground from "@/components/Media/PageVideoBackground";

interface ServicesPageClientProps {
  locale: Locale;
}

const integrationIcons = [
  FaGraduationCap,
  FaPassport,
  FaHome,
  FaHandshake,
  FaUniversity,
  FaPassport,
  FaFileAlt,
];
const financialIcons = [
  FaBuilding,
  FaChartLine,
  FaBalanceScale,
  FaUniversity,
  FaHandshake,
  FaShieldAlt,
  FaFileAlt,
];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function MetricTicker({ label }: { label: string }) {
  const [value, setValue] = useState(label);

  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = Math.floor(Math.random() * 6) - 3;
      setValue(label.replace(/\d+/, (match) => String(Number(match) + jitter)));
    }, 1200);
    return () => clearInterval(interval);
  }, [label]);

  return <p className="text-xs uppercase tracking-[0.25em] text-electric-platinum/60">{value}</p>;
}

const mockMetrics = [
  ["Efficiency: +400%", "Latency: -18%", "Signal: 9.6"],
  ["Risk: -62%", "Audit: 24/7", "Assurance: 99.9%"],
  ["Velocity: +310%", "Access: Tier V", "Coverage: 12X"],
  ["Yield: +220%", "Hedge: Active", "Flow: Stable"],
  ["Confidential: 100%", "SLA: 20m", "Control: Max"],
  ["Uptime: 99.99%", "Resilience: 8X", "Recovery: 2m"],
];

const serviceVideos = [
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/90bb1b34646b81b3b63e5a854ea00da3/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/df176a2fb2ea2b64bd21ae1c10d3af6a/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/12a9780eeb1ea015801a5f55cf2e9d3d/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/964cb3eddff1a67e3772aac9a7aceea2/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/dd17599dfa77f41517133fa7a4967535/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/408ad52e3f15bc8f01ae69d194a8cf3a/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/e923e67d71fed3e0853ec57f0348451e/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/136a8a211c6c3b1cc1fd7b1c7d836c58/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/c9ddd33ac3d964e5d33b31ce849e8f95/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/257c7359efd4b4aaebcc03aa8fc78a36/manifest/video.m3u8",
];

export default function ServicesPageClient({ locale }: ServicesPageClientProps) {
  const t = getTranslation(locale);

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Pre-calculate randomized metrics once on mount to avoid hydration mismatch
  const [randomizedServices, setRandomizedServices] = useState<any[]>([]);

  useEffect(() => {
    // Combine integration and financial services with their assigned icons/metrics/videos
    const combinedServices = [
      ...t.services.integrationServices.map((service, index) => ({
        ...service,
        type: 'integration',
        Icon: integrationIcons[index % integrationIcons.length],
        metrics: mockMetrics[index % mockMetrics.length],
        video: serviceVideos[index % serviceVideos.length],
      })),
      ...t.services.financialServices.map((service, index) => ({
        ...service,
        type: 'financial',
        Icon: financialIcons[index % financialIcons.length],
        metrics: mockMetrics[(index + 3) % mockMetrics.length],
        video: serviceVideos[(index + 4) % serviceVideos.length],
      }))
    ];
    setRandomizedServices(combinedServices);
  }, [t]);


  return (
    <main className="relative min-h-screen bg-transparent text-electric-platinum">
      <PageVideoBackground src={serviceVideos[0]} />

      <div className="relative z-10 px-8 py-16">
        <div className="mb-12 space-y-4">
          <ScrambleText
            as="h1"
            text={t.services.title}
            className="text-5xl font-serif text-electric-platinum"
          />
          <ScrambleText
            as="h2"
            text={t.services.label}
            className="text-sm uppercase tracking-[0.5em] text-electric-platinum/50"
          />
          <p className="max-w-2xl text-sm uppercase tracking-[0.25em] text-electric-platinum/60">
            {t.services.subtitle}
          </p>
        </div>

        {/* ── Startup Corridor Feature ── */}
        <section className="mb-24">
          <GlassCard className="relative overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50" />
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Text Content */}
              <div className="relative z-10 flex-1 text-center md:text-left order-2 md:order-1">
                <div className="inline-block px-3 py-1 mb-4 rounded-full border border-white/20 bg-white/5 text-[10px] uppercase tracking-widest text-electric-platinum">
                  {t.services.startupCorridor.label}
                </div>
                <h2 className="text-2xl md:text-4xl font-serif text-white mb-4">
                  {t.services.startupCorridor.title}
                </h2>
                <p className="text-electric-platinum/70 text-xs md:text-base leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
                  {t.services.startupCorridor.description}
                </p>
                <Link
                  href={`/${locale}/services/startup-corridor`}
                  className="inline-flex items-center gap-3 rounded-full bg-black text-white px-6 py-3 md:px-8 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  {t.services.startupCorridor.button}
                  <FaArrowRight />
                </Link>
              </div>

              {/* Visual/Icon */}
              <div className="relative flex-shrink-0 w-32 h-32 md:w-48 md:h-48 order-1 md:order-2">
                <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-white/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaRocket className="w-12 h-12 md:w-16 md:h-16 text-white/80" />
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <ScrambleText
              as="h2"
              text={t.services.integrationTitle}
              className="text-2xl font-serif text-electric-platinum"
            />
            <div className="text-xs uppercase tracking-[0.4em] text-electric-platinum/50">
              Vault Access: Integration
            </div>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {randomizedServices.filter(s => s.type === 'integration').map((service) => (
              <motion.div
                key={service.title}
                variants={tileVariants}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => setHoveredCard(service.title)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  {hoveredCard === service.title && (
                    <HlsVideo
                      src={service.video}
                      className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
                    />
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,228,226,0.2),_transparent_65%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(229,228,226,0.08),_transparent)]" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian-plate/70 border border-tungsten-grey/50">
                      <service.Icon className="h-4 w-4 text-electric-platinum" />
                    </span>
                    <h3 className="text-xl font-semibold text-electric-platinum">{service.title}</h3>
                  </div>
                  <p className="text-sm uppercase tracking-[0.25em] text-electric-platinum/60">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.metrics.map((metric: string) => (
                      <MetricTicker key={`${service.title}-${metric}`} label={metric} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <ScrambleText
              as="h2"
              text={t.services.financialTitle}
              className="text-2xl font-serif text-electric-platinum"
            />
            <div className="text-xs uppercase tracking-[0.4em] text-electric-platinum/50">
              Vault Access: Finance
            </div>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {randomizedServices.filter(s => s.type === 'financial').map((service) => (
              <motion.div
                key={service.title}
                variants={tileVariants}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => setHoveredCard(service.title)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  {hoveredCard === service.title && (
                    <HlsVideo
                      src={service.video}
                      className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
                    />
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,228,226,0.15),_transparent_65%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(229,228,226,0.08),_transparent)]" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian-plate/70 border border-tungsten-grey/50">
                      <service.Icon className="h-4 w-4 text-electric-platinum" />
                    </span>
                    <h3 className="text-xl font-semibold text-electric-platinum">{service.title}</h3>
                  </div>
                  <p className="text-sm uppercase tracking-[0.25em] text-electric-platinum/60">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.metrics.map((metric: string) => (
                      <MetricTicker key={`${service.title}-${metric}`} label={metric} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Intelligence Deck ── */}
        <section className="mb-16">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.5em] text-electric-platinum/60">
              {t.home.deckVault}
            </p>
            <h2 className="mt-4 text-4xl font-serif text-electric-platinum md:text-5xl">
              {t.home.deckTitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm uppercase tracking-[0.25em] text-electric-platinum/60">
              {t.home.deckSubtitle}
            </p>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {t.home.deckCards.map((card) => (
              <motion.div
                key={card.title}
                variants={tileVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:border-holographic-cyan/40 hover:shadow-[0_25px_80px_rgba(46,46,94,0.4)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-tungsten-grey/40 shadow-[0_0_25px_rgba(229,228,226,0.08)]" />
                <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-electric-platinum/50">
                      Module
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-electric-platinum">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[10px] tracking-[0.1em] text-electric-platinum/40 font-mono">
                    {card.footer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Expansion Packages ── */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <ScrambleText
              as="h2"
              text={locale === "tr" ? "Genişleme Paketleri" : locale === "it" ? "Pacchetti di Espansione" : "Expansion Packages"}
              className="text-2xl font-serif text-electric-platinum"
            />
            <div className="text-xs uppercase tracking-[0.4em] text-electric-platinum/50">
              Vault Access: Expansion
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Italy Expansion */}
            <Link href={`/${locale}/services/expansion/italy`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition hover:border-holographic-cyan/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🇮🇹</span>
                    <div>
                      <h3 className="text-xl font-semibold text-electric-platinum">
                        {locale === "tr" ? "İtalya Genişleme Paketi" : locale === "it" ? "Pacchetto Espansione Italia" : "Italy Expansion Package"}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.3em] text-electric-platinum/60 mt-1">
                        {locale === "tr" ? "İtalya pazarına giriş çözümleri" : locale === "it" ? "Soluzioni per l'ingresso nel mercato italiano" : "Complete market entry solutions for Italy"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-holographic-cyan/80">
                    <span>{locale === "tr" ? "Detayları Gör" : locale === "it" ? "Vedi Dettagli" : "View Details"}</span>
                    <FaArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Turkey Expansion */}
            <Link href={`/${locale}/services/expansion/turkey`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition hover:border-holographic-cyan/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-70" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🇹🇷</span>
                    <div>
                      <h3 className="text-xl font-semibold text-electric-platinum">
                        {locale === "tr" ? "Türkiye Genişleme Paketi" : locale === "it" ? "Pacchetto Espansione Turchia" : "Turkey Expansion Package"}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.3em] text-electric-platinum/60 mt-1">
                        {locale === "tr" ? "Türkiye pazarına giriş çözümleri" : locale === "it" ? "Soluzioni per l'ingresso nel mercato turco" : "Complete market entry solutions for Turkey"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-holographic-cyan/80">
                    <span>{locale === "tr" ? "Detayları Gör" : locale === "it" ? "Vedi Dettagli" : "View Details"}</span>
                    <FaArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-4 rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-6 text-sm uppercase tracking-[0.3em] text-electric-platinum/60 md:flex-row md:items-center md:justify-between"
        >
          <span>
            {locale === "tr"
              ? "Hizmetlerimiz hakkında daha fazla bilgi almak ister misiniz?"
              : locale === "it"
                ? "Vuoi saperne di più sui nostri servizi?"
                : "Want to learn more about our services?"}
          </span>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-3 rounded-full border border-tungsten-grey/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-electric-platinum transition hover:border-holographic-cyan/80"
          >
            {t.nav.contact}
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

