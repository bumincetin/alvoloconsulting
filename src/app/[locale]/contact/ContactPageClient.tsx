"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/UI/PageHeader";
import ConsultationForm from "@/components/UI/ConsultationForm";
import Eyebrow from "@/components/UI/Eyebrow";
import { useCityClocks } from "@/lib/hooks/useCityClocks";
import { CITIES, CITY_ORDER, ACCENT_HEX } from "@/lib/geo/cities";
import { CONTACT, footerContent } from "@/lib/content/footer";
import { consultationContent } from "@/lib/content/consultation";
import { getTranslation, locales, type Locale } from "@/lib/translations";

function resolveLocale(value: unknown): Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

export default function ContactPageClient() {
  const params = useParams();
  const locale = resolveLocale(params?.locale);
  const t = getTranslation(locale).contact;
  const f = footerContent[locale];
  const c = consultationContent[locale];
  const clocks = useCityClocks(locale, false);
  const prefill = useMemo(() => ({ source: t.title }), [t.title]);
  const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(f.whatsappMessage)}`;

  const channels = [
    { icon: MessageCircle, label: f.whatsapp, value: CONTACT.whatsappDisplay, href: whatsappHref, accent: ACCENT_HEX.emerald, external: true },
    { icon: Mail, label: t.emailTitle, value: t.emailDetails, href: `mailto:${CONTACT.email}`, accent: ACCENT_HEX.azure, external: false },
    { icon: Phone, label: t.phoneTitle, value: t.phoneDetails, href: `tel:+${CONTACT.whatsappNumber}`, accent: ACCENT_HEX.gold, external: false },
  ];

  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={f.eyebrow} title={t.title} sub={t.subtitle} accent="azure" />

      <section className="relative pb-24 lg:pb-36">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
          {/* Channels + offices */}
          <div className="lg:col-span-5">
            <Eyebrow accent="emerald">{t.contactInfo}</Eyebrow>
            <div className="mt-5 space-y-2">
              {channels.map(({ icon: Icon, label, value, href, accent, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  data-cursor="magnetic"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-titanium/70 px-5 py-4 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06]" style={{ color: accent }}>
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block text-[14px] font-medium text-white">{label}</span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-titanium/70 p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {t.addressTitle}
                </div>
                <address className="mt-3 text-[13px] not-italic leading-relaxed text-white/80">{t.addressDetails}</address>
              </div>
              <div className="rounded-2xl border border-line bg-titanium/70 p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {t.hoursTitle}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-white/80">{t.hoursDetails}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {CITY_ORDER.map((id) => (
                <div key={id} className="bg-obsidian/70 px-4 py-3">
                  <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: ACCENT_HEX[CITIES[id].accent] }}>
                    {CITIES[id].code}
                  </div>
                  <div className="mt-1 font-mono text-[11px] tabular-nums tracking-[0.15em] text-white/75">{clocks[id]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-line bg-titanium/80 p-6 backdrop-blur sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald/80 to-transparent" />
              <div className="mb-6">
                <Eyebrow accent="emerald">{t.getInTouch}</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-normal tracking-[-0.005em]">{c.title}</h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/55">{c.sub}</p>
              </div>
              <ConsultationForm locale={locale} prefill={prefill} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
