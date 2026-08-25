"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChartLine, FileText, Lock, MessageSquare, ShieldCheck, UserCheck, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/UI/PageHeader";
import Eyebrow from "@/components/UI/Eyebrow";
import { Arrow, useReveals } from "@/components/shore/Reveal";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { getTranslation, type Locale } from "@/lib/translations";

interface PortalPageClientProps {
  locale: Locale;
}

// Portal URL — the deployed client portal. When unset, every portal link falls
// back to the contact page so nothing dead-ends.
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "";

const FEATURE_ICONS: LucideIcon[] = [FileText, MessageSquare, ChartLine, ShieldCheck];
const SECURITY_ICONS: LucideIcon[] = [Lock, UserCheck, ShieldCheck];

const content = {
  en: {
    badge: "Secure client portal",
    title: "Your Private Command Center",
    subtitle: "Access your documents, track your metrics, and communicate securely with our team—all in one encrypted environment.",
    loginButton: "Access portal",
    registerButton: "Request access",
    featuresTitle: "What you get",
    features: [
      { title: "Document Management", desc: "Securely upload, download, and manage all your important documents. Organized by project with full version history." },
      { title: "Secure Messaging", desc: "Direct, encrypted communication with your dedicated consultant. Real-time notifications and message history." },
      { title: "Analytics Dashboard", desc: "Track your key metrics and KPIs with interactive charts. Monitor project progress and financial indicators." },
      { title: "Bank-Level Security", desc: "End-to-end encryption, two-factor authentication, and strict access controls protect your sensitive data." },
    ],
    statusLabel: "Status",
    statusOnline: "Portal online",
    statusByRequest: "Access by request",
    securityTitle: "Security first",
    securityFeatures: ["AES-256 Encryption", "Role-Based Access", "GDPR Compliant"],
    ctaTitle: "Ready to get started?",
    ctaDesc: "Contact us to set up your secure client portal account.",
    ctaButton: "Request portal access",
    existingClient: "Already have an account?",
    loginLink: "Log in here",
  },
  tr: {
    badge: "Güvenli müşteri portalı",
    title: "Özel Komuta Merkeziniz",
    subtitle: "Belgelerinize erişin, metriklerinizi takip edin ve ekibimizle güvenli bir şekilde iletişim kurun—tümü şifreli bir ortamda.",
    loginButton: "Portala eriş",
    registerButton: "Erişim talep et",
    featuresTitle: "Neler sunuyoruz",
    features: [
      { title: "Belge Yönetimi", desc: "Tüm önemli belgelerinizi güvenli bir şekilde yükleyin, indirin ve yönetin. Tam sürüm geçmişi ile projeye göre düzenlenmiş." },
      { title: "Güvenli Mesajlaşma", desc: "Özel danışmanınızla doğrudan, şifreli iletişim. Gerçek zamanlı bildirimler ve mesaj geçmişi." },
      { title: "Analitik Panosu", desc: "Etkileşimli grafiklerle temel metriklerinizi ve KPI'larınızı takip edin. Proje ilerlemesini ve finansal göstergeleri izleyin." },
      { title: "Banka Düzeyinde Güvenlik", desc: "Uçtan uca şifreleme, iki faktörlü kimlik doğrulama ve katı erişim kontrolleri hassas verilerinizi korur." },
    ],
    statusLabel: "Durum",
    statusOnline: "Portal çevrimiçi",
    statusByRequest: "Talep üzerine erişim",
    securityTitle: "Güvenlik öncelikli",
    securityFeatures: ["AES-256 Şifreleme", "Rol Tabanlı Erişim", "KVKK Uyumlu"],
    ctaTitle: "Başlamaya hazır mısınız?",
    ctaDesc: "Güvenli müşteri portalı hesabınızı oluşturmak için bizimle iletişime geçin.",
    ctaButton: "Portal erişimi talep et",
    existingClient: "Zaten bir hesabınız var mı?",
    loginLink: "Buradan giriş yapın",
  },
  it: {
    badge: "Portale clienti sicuro",
    title: "Il Tuo Centro di Comando",
    subtitle: "Accedi ai tuoi documenti, monitora le tue metriche e comunica in modo sicuro con il nostro team—tutto in un ambiente crittografato.",
    loginButton: "Accedi al portale",
    registerButton: "Richiedi accesso",
    featuresTitle: "Cosa ottieni",
    features: [
      { title: "Gestione Documenti", desc: "Carica, scarica e gestisci in sicurezza tutti i tuoi documenti importanti. Organizzati per progetto con cronologia completa delle versioni." },
      { title: "Messaggistica Sicura", desc: "Comunicazione diretta e crittografata con il tuo consulente dedicato. Notifiche in tempo reale e cronologia messaggi." },
      { title: "Dashboard Analytics", desc: "Monitora le tue metriche chiave e KPI con grafici interattivi. Segui l'avanzamento dei progetti e gli indicatori finanziari." },
      { title: "Sicurezza Bancaria", desc: "Crittografia end-to-end, autenticazione a due fattori e controlli di accesso rigorosi proteggono i tuoi dati sensibili." },
    ],
    statusLabel: "Stato",
    statusOnline: "Portale online",
    statusByRequest: "Accesso su richiesta",
    securityTitle: "Sicurezza prima",
    securityFeatures: ["Crittografia AES-256", "Accesso Basato su Ruoli", "Conforme GDPR"],
    ctaTitle: "Pronto per iniziare?",
    ctaDesc: "Contattaci per configurare il tuo account del portale clienti sicuro.",
    ctaButton: "Richiedi accesso al portale",
    existingClient: "Hai già un account?",
    loginLink: "Accedi qui",
  },
} as const;

const H2 = "mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-normal uppercase leading-[1.08] tracking-[-0.012em]";
const CONTAINER = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";
const RULED_GRID = "grid gap-px overflow-hidden rounded-[2px] border border-line-soft bg-line-soft";

export default function PortalPageClient({ locale }: PortalPageClientProps) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref, ".pg-head");
  const t = getTranslation(locale);
  const c = content[locale];
  const { open } = useConsultation();

  const portalHref = PORTAL_URL ? `${PORTAL_URL}/login` : `/${locale}/contact/`;
  const external = Boolean(PORTAL_URL);
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const requestAccess = () => open({ source: `${t.nav.portal} · ${c.registerButton}` });

  return (
    <main ref={ref} className="relative bg-obsidian text-white">
      {/* Masthead */}
      <PageHeader eyebrow={c.badge} title={c.title} sub={c.subtitle} accent="gold">
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" data-rv="up">
          <a href={portalHref} className="cta isolate" style={{ marginTop: 0 }} data-cursor {...externalProps}>
            <i />
            <span>{c.loginButton}</span>
            <Arrow className="cta-ar" />
          </a>
          <button type="button" onClick={requestAccess} data-cursor className="k group inline-flex items-center gap-2 text-bone-dim transition-colors hover:text-white">
            {c.registerButton}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={1.5} />
          </button>
        </div>
      </PageHeader>

      {/* 01 — What you get */}
      <section className="border-t border-line py-20 lg:py-28" aria-labelledby="portal-features">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-rv="up">
            <Eyebrow index="01">{c.badge}</Eyebrow>
            <h2 id="portal-features" className={H2}>
              {c.featuresTitle}
            </h2>
          </div>

          <ol className={`mt-10 sm:grid-cols-2 ${RULED_GRID}`}>
            {c.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <li key={feature.title} className="flex flex-col bg-titanium/70 p-6 lg:p-8" data-rv="up">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line text-gold">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.25} />
                    </span>
                    <span className="k">
                      <b>0{i + 1}</b>
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-normal leading-tight tracking-[-0.005em]">{feature.title}</h3>
                  <p className="body mt-3 max-w-[40ch]">{feature.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 02 — Status / security strip */}
      <section className="border-t border-line py-16 lg:py-20" aria-labelledby="portal-security">
        <div className={CONTAINER}>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4" data-rv="up">
            <div>
              <Eyebrow index="02">{c.statusLabel}</Eyebrow>
              <h2 id="portal-security" className={H2}>
                {c.securityTitle}
              </h2>
            </div>
            <div className="k inline-flex items-center gap-3 pb-1">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${external ? "bg-gold" : "bg-muted"}`} />
              {external ? c.statusOnline : c.statusByRequest}
            </div>
          </div>

          <ol className={`mt-8 sm:grid-cols-3 ${RULED_GRID}`}>
            {c.securityFeatures.map((text, i) => {
              const Icon = SECURITY_ICONS[i % SECURITY_ICONS.length];
              return (
                <li key={text} className="flex items-center gap-4 bg-titanium/70 px-6 py-5" data-rv="up">
                  <span className="k shrink-0">
                    <b>0{i + 1}</b>
                  </span>
                  <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
                  <span className="text-[14px] font-light text-white/85">{text}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 03 — Access CTA row */}
      <section className="border-t border-line py-20 lg:py-28" aria-labelledby="portal-cta">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8" data-rv="up">
              <Eyebrow index="03">{c.loginButton}</Eyebrow>
              <h2 id="portal-cta" className={`${H2} max-w-[22ch]`}>
                {c.ctaTitle}
              </h2>
              <p className="body-lg mt-5 max-w-[56ch]">{c.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-4 lg:justify-end" data-rv="up">
              <a href={portalHref} className="cta isolate" style={{ marginTop: 0 }} data-cursor {...externalProps}>
                <i />
                <span>{c.loginButton}</span>
                <Arrow className="cta-ar" />
              </a>
              <Link href={`/${locale}/contact/`} data-cursor className="k group inline-flex items-center gap-2 text-bone-dim transition-colors hover:text-white">
                {c.ctaButton}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <p className="body mt-12 border-t border-line pt-6" data-rv="fade">
            {c.existingClient}{" "}
            <a href={portalHref} className="text-white underline decoration-line underline-offset-4 transition-colors hover:decoration-gold" {...externalProps}>
              {c.loginLink}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
