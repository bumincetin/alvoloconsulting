"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarClock, Mail, MessageCircle } from "lucide-react";
import clsx from "clsx";
import Eyebrow from "@/components/UI/Eyebrow";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useCityClocks } from "@/lib/hooks/useCityClocks";
import { ACCENT_HEX, CITIES, formatCoords } from "@/lib/geo/cities";
import { CONTACT, footerContent } from "@/lib/content/footer";
import { locales, translations, type Locale } from "@/lib/translations";

interface FooterProps {
  locale: Locale;
}

/** EN | TR | IT switcher — sliding pill + letter flip on the active locale. */
function LanguageSwitcher({ locale, label, names }: { locale: Locale; label: string; names: Record<Locale, string> }) {
  const pathname = usePathname() ?? "/";
  const { reducedMotion } = useSmoothScroll();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && (locales as readonly string[]).includes(segments[0])) segments.shift();
  const rest = segments.length ? `/${segments.join("/")}/` : "/";

  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{label}</div>
      <div role="group" aria-label={label} className="mt-3 inline-flex rounded-full border border-line bg-titanium/80 p-1 backdrop-blur" style={{ perspective: 600 }}>
        {locales.map((loc) => {
          const active = loc === locale;
          return (
            <Link
              key={loc}
              href={`/${loc}${rest}`}
              hrefLang={loc}
              lang={loc}
              aria-current={active ? "true" : undefined}
              aria-label={names[loc]}
              className={clsx(
                "relative isolate flex h-9 w-14 items-center justify-center rounded-full font-mono text-[11px] uppercase tracking-[0.25em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                active ? "text-obsidian" : "text-white/55 hover:text-white",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="footer-lang-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white"
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className="relative block h-4 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${loc}-${active}`}
                    initial={reducedMotion ? false : { rotateX: -90, opacity: 0, y: 6 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { rotateX: 90, opacity: 0, y: -6 }}
                    transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="block leading-4"
                    style={{ transformOrigin: "center" }}
                  >
                    {loc.toUpperCase()}
                  </motion.span>
                </AnimatePresence>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Footer({ locale }: FooterProps) {
  const t = footerContent[locale];
  const legacy = translations[locale].footer;
  const { open } = useConsultation();
  const clocks = useCityClocks(locale, false);
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <footer id="contact" className="relative border-t border-line bg-obsidian text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure/60 to-transparent" />

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        {/* Gateway */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow index="06" accent="azure">
              {t.eyebrow}
            </Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">{t.heading}</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">{t.sub}</p>

            <div className="mt-8 space-y-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald/30 bg-emerald/[0.06] px-5 py-4 transition-colors hover:bg-emerald/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                    <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-white">{t.whatsapp}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                      {CONTACT.whatsappDisplay} · {t.whatsappHint}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-emerald transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                data-cursor="magnetic"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-titanium/70 px-5 py-4 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/80">
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-white">{t.email}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                      {CONTACT.email} · {t.emailHint}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </a>

              <button
                type="button"
                data-cursor="magnetic"
                onClick={() => open({ source: t.schedule })}
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-titanium/70 px-5 py-4 text-left transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/80">
                    <CalendarClock className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-white">{t.schedule}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{t.scheduleHint}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Offices */}
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-3">
              {t.offices.map((office) => {
                const city = CITIES[office.id];
                const accent = ACCENT_HEX[city.accent];
                return (
                  <div key={office.id} className="relative overflow-hidden rounded-2xl border border-line bg-titanium/70 p-5 backdrop-blur">
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: accent }}>
                        {city.code}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] tabular-nums tracking-[0.2em] text-white/70">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_10px_rgba(0,229,153,0.9)]" />
                        {clocks[office.id]}
                      </span>
                    </div>
                    <div className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">{office.city}</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{office.role}</div>
                    <address className="mt-4 text-[12.5px] not-italic leading-relaxed text-white/70">{office.address}</address>
                    <div className="mt-3 border-t border-line pt-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
                      <div>{office.hours}</div>
                      <div className="mt-1">{formatCoords(city.lat, city.lon)}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Index + language */}
            <div className="mt-8 grid gap-8 border-t border-line pt-8 sm:grid-cols-[1fr_auto]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{t.indexTitle}</div>
                <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                  {t.links.map((link) => (
                    <li key={link.href}>
                      <Link href={`/${locale}${link.href}/`} className="text-[13px] text-white/65 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <LanguageSwitcher locale={locale} label={t.languageLabel} names={t.languages} />
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-14 grid gap-6 border-t border-line pt-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="font-display text-lg font-semibold tracking-[-0.02em]">Alvolo Consulting</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{legacy.companyTitle}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{legacy.companySubtitle}</div>
          </div>
          <div className="lg:col-span-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">{t.legalTitle}</div>
            <p className="mt-2 max-w-3xl text-[12px] leading-relaxed text-white/45">{legacy.disclaimer}</p>
          </div>
        </div>

        {/* Terminal bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_10px_rgba(0,229,153,0.9)]" />
            {t.statusLine}
          </span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              LinkedIn
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              Instagram
            </a>
            <span>© {year} Alvolo Consulting</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
