"use client";

import { useId, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import PageHeader from "@/components/UI/PageHeader";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { BEZIER } from "@/lib/motion/gsap";
import { CONTACT, footerContent } from "@/lib/content/footer";
import { getTranslation, locales, type Locale } from "@/lib/translations";

function resolveLocale(value: unknown): Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

const CTA = {
  en: { title: "Still have questions?", body: "Open a line to the partners — we reply within one business day." },
  tr: { title: "Hâlâ sorunuz mu var?", body: "Ortaklara bir hat açın — bir iş günü içinde yanıt veririz." },
  it: { title: "Hai ancora domande?", body: "Apri una linea con i partner — rispondiamo entro un giorno lavorativo." },
} as const;

export default function FAQPageClient() {
  const params = useParams();
  const locale = resolveLocale(params?.locale);
  const t = getTranslation(locale);
  const f = footerContent[locale];
  const { open } = useConsultation();
  const { reducedMotion } = useSmoothScroll();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="relative bg-obsidian text-white">
      <PageHeader eyebrow={t.nav.faq} title={t.faq.title} sub={t.faq.subtitle} accent="gold" />

      <section className="pb-24 lg:pb-36">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-3xl border border-line bg-titanium/60 backdrop-blur">
                {t.faq.questions.map((item, i) => {
                  const isOpen = openIndex === i;
                  const panelId = `${baseId}-panel-${i}`;
                  return (
                    <div key={item.q} className={clsx(i > 0 && "border-t border-line")}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="flex w-full items-start gap-5 px-6 py-6 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/30"
                      >
                        <span className="pt-1 font-mono text-[10px] tracking-[0.25em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                        <span className="flex-1 font-display text-lg font-normal tracking-[-0.005em] text-white">{item.q}</span>
                        <ChevronDown className={clsx("mt-1 h-4 w-4 shrink-0 text-white/50 transition-transform duration-300", isOpen && "rotate-180")} strokeWidth={1.5} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={panelId}
                            initial={reducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reducedMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.4, ease: BEZIER.inOut }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-3xl px-6 pb-7 pl-[4.4rem] text-[14px] leading-relaxed text-white/65">{item.a}</p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-32 rounded-3xl border border-line bg-glass p-7 backdrop-blur-xl">
                <h2 className="font-display text-2xl font-normal tracking-[-0.005em]">{CTA[locale].title}</h2>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{CTA[locale].body}</p>
                <button
                  type="button"
                  data-cursor="magnetic"
                  onClick={() => open({ source: t.nav.faq })}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-emerald"
                >
                  {f.schedule}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </button>
                <a
                  href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(f.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-line px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
                >
                  {f.whatsapp}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
