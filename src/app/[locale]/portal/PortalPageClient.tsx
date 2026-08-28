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
    badge: "Client portal",
    title: "Your client portal",
    subtitle: "Documents, milestones and messages for your mandate, in one encrypted place.",
    loginButton: "Access portal",
    registerButton: "Request access",
    featuresTitle: "What the portal holds",
    features: [
      { title: "Documents", desc: "Upload and download the documents of your mandate, organised by project with version history." },
      { title: "Messages", desc: "Encrypted messages with your advisor, with notifications and history." },
      { title: "Progress", desc: "Phase progress, filing status and the financial indicators of the mandate." },
      { title: "Access control", desc: "Encryption in transit and at rest, two-factor authentication and role-based access." },
    ],
    statusLabel: "Status",
    statusOnline: "Portal online",
    statusByRequest: "Access by request",
    securityTitle: "Security",
    securityFeatures: ["AES-256 encryption", "Role-based access", "GDPR compliant"],
    ctaTitle: "Request access",
    ctaDesc: "Active clients receive portal credentials from their advisor. Contact us to request an account.",
    ctaButton: "Request portal access",
    existingClient: "Already have an account?",
    loginLink: "Log in here",
  },
  tr: {
    badge: "Müşteri portalı",
    title: "Müşteri portalınız",
    subtitle: "Mandatınızın belgeleri, kilometre taşları ve mesajları, tek bir şifreli yerde.",
    loginButton: "Portala eriş",
    registerButton: "Erişim talep et",
    featuresTitle: "Portalda neler var",
    features: [
      { title: "Belgeler", desc: "Mandatınızın belgelerini yükleyin ve indirin; projeye göre düzenlenmiş, sürüm geçmişiyle." },
      { title: "Mesajlar", desc: "Danışmanınızla şifreli mesajlaşma; bildirimler ve geçmişle." },
      { title: "İlerleme", desc: "Aşama ilerlemesi, başvuru durumu ve mandatın finansal göstergeleri." },
      { title: "Erişim kontrolü", desc: "İletimde ve depolamada şifreleme, iki faktörlü kimlik doğrulama ve rol tabanlı erişim." },
    ],
    statusLabel: "Durum",
    statusOnline: "Portal çevrimiçi",
    statusByRequest: "Talep üzerine erişim",
    securityTitle: "Güvenlik",
    securityFeatures: ["AES-256 şifreleme", "Rol tabanlı erişim", "KVKK uyumlu"],
    ctaTitle: "Erişim talep edin",
    ctaDesc: "Aktif müşteriler portal bilgilerini danışmanlarından alır. Hesap talebi için bizimle iletişime geçin.",
    ctaButton: "Portal erişimi talep et",
    existingClient: "Zaten bir hesabınız var mı?",
    loginLink: "Buradan giriş yapın",
  },
  it: {
    badge: "Portale clienti",
    title: "Il vostro portale clienti",
    subtitle: "Documenti, milestone e messaggi del vostro mandato, in un unico spazio cifrato.",
    loginButton: "Accedi al portale",
    registerButton: "Richiedi accesso",
    featuresTitle: "Cosa contiene il portale",
    features: [
      { title: "Documenti", desc: "Caricate e scaricate i documenti del mandato, organizzati per progetto con cronologia delle versioni." },
      { title: "Messaggi", desc: "Messaggi cifrati con il vostro advisor, con notifiche e cronologia." },
      { title: "Avanzamento", desc: "Avanzamento delle fasi, stato delle pratiche e indicatori finanziari del mandato." },
      { title: "Controllo degli accessi", desc: "Cifratura in transito e a riposo, autenticazione a due fattori e accesso basato sui ruoli." },
    ],
    statusLabel: "Stato",
    statusOnline: "Portale online",
    statusByRequest: "Accesso su richiesta",
    securityTitle: "Sicurezza",
    securityFeatures: ["Cifratura AES-256", "Accesso basato sui ruoli", "Conforme al GDPR"],
    ctaTitle: "Richiedete l'accesso",
    ctaDesc: "I clienti attivi ricevono le credenziali dal proprio advisor. Contattateci per richiedere un account.",
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
