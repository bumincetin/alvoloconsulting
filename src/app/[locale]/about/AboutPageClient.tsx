'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaLinkedin, FaGlobe } from "react-icons/fa";
import ScrambleText from "@/components/UI/ScrambleText";
import { getTranslation, type Locale } from "@/lib/translations";

type Operative = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  yearsActive: string;
  clearance: string;
  image: string;
  dossier: string[];
  linkedin: string;
  website?: string;
};

const operatives: Operative[] = [
  {
    id: "op-01",
    name: "Bumin Kağan Çetin",
    role: "Founder / Quant Systems",
    specialty: "Cross-border architectures",
    yearsActive: "2",
    clearance: "LEVEL 5",
    image: "/bumin.jpg",
    dossier: [
      "Precision market entry protocols",
      "Vault-grade client routing",
      "Execution integrity systems",
    ],
    linkedin: "https://www.linkedin.com/in/buminkcetin/",
    website: "https://personal-portfolio-bumincetins-projects.vercel.app/en",
  },
  {
    id: "op-02",
    name: "Oğuzhan Aslan",
    role: "Founder / Intelligence Ops",
    specialty: "Strategic expansion",
    yearsActive: "2",
    clearance: "LEVEL 5",
    image: "/ozi.jpg",
    dossier: [
      "Multi-jurisdiction signal review",
      "Institutional liaison command",
      "Risk mitigation overlays",
    ],
    linkedin: "https://www.linkedin.com/in/oguzhan--aslan/",
  },
  {
    id: "op-03",
    name: "Ece Melisa Özgüner",
    role: "Founder / Client Trust",
    specialty: "High-touch onboarding",
    yearsActive: "2",
    clearance: "LEVEL 5",
    image: "/melisa.jpeg",
    dossier: [
      "Discretion-focused onboarding",
      "Private channel governance",
      "Continuity assurance protocols",
    ],
    linkedin: "https://www.linkedin.com/in/ecemelisaozguner/",
  },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPageClient() {
  const [active, setActive] = useState<Operative | null>(null);
  const params = useParams();
  const locale = (params?.locale as string || "en") as Locale;
  const t = getTranslation(locale);
  const { home } = t;

  return (
    <main className="relative min-h-screen bg-void-black text-electric-platinum">
      {/* ── Philosophy Section ── */}
      <section className="relative overflow-hidden px-6 py-32 md:px-16">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-tight text-electric-platinum"
            >
              {home.philosophyTitle}
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {home.philosophyPoints.map((text: string) => (
                <motion.p
                  key={text}
                  variants={fadeUp}
                  className="text-sm uppercase tracking-[0.15em] text-electric-platinum/80"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={`/${locale}/methodology`}
                className="inline-flex items-center gap-3 rounded-full border border-tungsten-grey/80 bg-obsidian-plate/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-electric-platinum transition hover:border-holographic-cyan/80"
              >
                {home.philosophyCta}
              </Link>
            </motion.div>
          </div>

          {/* Decorative visual */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute inset-0 rounded-full border border-holographic-cyan/20"
                style={{ animation: "spin 30s linear infinite" }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-8 rounded-full border border-holographic-cyan/15"
                style={{ animation: "spin 20s linear infinite reverse" }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute inset-16 rounded-full bg-gradient-to-br from-holographic-cyan/10 to-deep-indigo/20 shadow-[0_0_60px_rgba(0,240,255,0.15)]"
                style={{ animation: "breathe 8s infinite ease-in-out" }}
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-holographic-cyan/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-holographic-cyan/30" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-holographic-cyan/30" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-holographic-cyan/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Dossier ── */}
      <div className="relative z-10 flex flex-col lg:flex-row">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-1/2 border-b border-tungsten-grey/60 lg:border-b-0 lg:border-r lg:border-tungsten-grey/60 px-8 py-16">
          <div className="space-y-6">
            <ScrambleText
              as="h1"
              text="ORIGIN"
              className="text-[clamp(2.5rem,10vw,7rem)] font-serif tracking-tight text-electric-platinum"
            />
            <ScrambleText
              as="h2"
              text="INTEL"
              className="text-[clamp(1.5rem,6vw,3.5rem)] uppercase tracking-[0.6em] text-electric-platinum/60"
            />
            <p className="max-w-sm text-sm uppercase tracking-[0.3em] text-tungsten-grey">
              The dossier is encrypted. Clearance verified.
            </p>
          </div>
          <div className="mt-16 space-y-4 text-xs uppercase tracking-[0.35em] text-tungsten-grey">
            <p>Sector: Luxury Data Exclusivity</p>
            <p>Access: Vetted Operators Only</p>
            <p>Signal: Active</p>
          </div>
        </aside>

        <section className="relative flex-1 px-8 py-16">
          <div className="mb-12 space-y-4">
            <ScrambleText
              as="h2"
              text="The Dossier"
              className="text-4xl font-serif text-electric-platinum"
            />
            <p className="max-w-2xl text-sm uppercase tracking-[0.25em] text-electric-platinum/60">
              Operatives aligned to sovereign data strategies. Each profile
              unlocks once clearance is verified.
            </p>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2"
          >
            {operatives.map((operative) => (
              <motion.div
                key={operative.id}
                variants={itemVariants}
                onMouseEnter={() => setActive(operative)}
                onMouseLeave={() => setActive(null)}
                className={`group relative overflow-hidden rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition ${active && active.id !== operative.id ? "opacity-40" : "opacity-100"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-platinum/10 via-transparent to-transparent opacity-60" />
                <div className="relative z-10 flex items-start gap-4 transition-all duration-500 group-hover:blur-xl group-hover:opacity-30">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl border border-tungsten-grey/60">
                    <Image
                      src={operative.image}
                      alt={operative.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-electric-platinum">
                      {operative.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.3em] text-electric-platinum/60">
                      {operative.role}
                    </p>
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-tungsten-grey">
                      <span>Years Active: {operative.yearsActive}</span>
                      <span>{operative.clearance}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 flex flex-col justify-center p-6 bg-void-black/20 backdrop-blur-sm z-20">
                  <p className="text-xs uppercase tracking-[0.4em] text-holographic-cyan mb-4 font-semibold">
                    DATA OVERLAY
                  </p>
                  <ul className="space-y-3 text-sm text-electric-platinum/90">
                    {operative.dossier.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="text-holographic-cyan mt-1">›</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-holographic-cyan/20">
                    <a
                      href={operative.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaLinkedin size={20} />
                    </a>
                    {operative.website && (
                      <a
                        href={operative.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-electric-platinum/60 hover:text-holographic-cyan transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGlobe size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed right-8 top-24 z-[50] hidden w-80 rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/80 p-6 text-electric-platinum shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-lg lg:block"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-electric-platinum/50">
            Active Dossier
          </p>
          <h3 className="mt-4 text-xl font-semibold">{active.name}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-electric-platinum/60">
            {active.specialty}
          </p>
          <div className="mt-4 space-y-2 text-sm text-electric-platinum/70">
            {active.dossier.map((line) => (
              <p key={line}>• {line}</p>
            ))}
          </div>
        </motion.div>
      )}
    </main>
  );
}
