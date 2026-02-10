'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ScrambleText from "@/components/UI/ScrambleText";
import BookingModal from "@/app/components/BookingModal";
import { type Locale } from "@/lib/translations";
import PageVideoBackground from "@/components/Media/PageVideoBackground";

type FormState = "idle" | "sending" | "done";

export default function ContactPageClient() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [progress, setProgress] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string || "en") as Locale;

  useEffect(() => {
    if (formState !== "sending") return;
    let frameId = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const next = Math.min(1, (now - start) / duration);
      setProgress(Math.floor(next * 100));
      if (next < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setFormState("done");
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [formState]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState === "sending") return;
    setProgress(0);
    setFormState("sending");
  };

  const contactLabels = {
    en: {
      title: "Uplink",
      subtitle: "Command Line",
      desc: "Secure transmission lane active. Awaiting operator signal.",
      name: "> ENTER_DESIGNATION",
      email: "> SECURE_EMAIL",
      topic: "> CLEARANCE_TOPIC",
      message: "> MESSAGE_BUFFER",
      submit: "TRANSMIT PACKET",
      done: "TRANSMISSION SECURE",
      sending: "Sending...",
      awaiting: "Awaiting Input.",
      transmitted: "Transmission Secure.",
      bookCta: "Or schedule a consultation directly",
      bookBtn: "Book a Consultation",
    },
    tr: {
      title: "Bağlantı",
      subtitle: "Komut Hattı",
      desc: "Güvenli iletim hattı aktif. Operatör sinyali bekleniyor.",
      name: "> İSİM_GİRİN",
      email: "> GÜVENLİ_EMAIL",
      topic: "> KONU_SEÇİMİ",
      message: "> MESAJ_ALANI",
      submit: "PAKET GÖNDER",
      done: "İLETİM GÜVENLİ",
      sending: "Gönderiliyor...",
      awaiting: "Giriş Bekleniyor.",
      transmitted: "İletim Güvenli.",
      bookCta: "Veya doğrudan bir ön görüşme planlayın",
      bookBtn: "Danışmanlık Randevusu",
    },
    it: {
      title: "Uplink",
      subtitle: "Linea di Comando",
      desc: "Canale di trasmissione sicuro attivo. In attesa del segnale dell'operatore.",
      name: "> NOME_COMPLETO",
      email: "> EMAIL_SICURA",
      topic: "> ARGOMENTO",
      message: "> MESSAGGIO",
      submit: "TRASMETTI PACCHETTO",
      done: "TRASMISSIONE SICURA",
      sending: "Invio in corso...",
      awaiting: "In Attesa di Input.",
      transmitted: "Trasmissione Sicura.",
      bookCta: "Oppure prenota direttamente una consulenza",
      bookBtn: "Prenota una Consulenza",
    },
  };

  const labels = contactLabels[locale] || contactLabels.en;

  return (
    <main className="relative min-h-screen bg-transparent text-electric-platinum">
      <PageVideoBackground src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/12a9780eeb1ea015801a5f55cf2e9d3d/manifest/video.m3u8" />
      <div className="relative z-10 px-8 py-16">
        <div className="mb-12 space-y-4">
          <ScrambleText
            as="h1"
            text={labels.title}
            className="text-5xl font-serif text-electric-platinum"
          />
          <ScrambleText
            as="h2"
            text={labels.subtitle}
            className="text-sm uppercase tracking-[0.5em] text-electric-platinum/50"
          />
          <p className="max-w-2xl text-sm uppercase tracking-[0.25em] text-electric-platinum/60">
            {labels.desc}
          </p>
        </div>

        {/* Booking CTA */}
        <div className="mb-10 rounded-3xl border border-holographic-cyan/20 bg-holographic-cyan/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm uppercase tracking-[0.2em] text-electric-platinum/70">
            {labels.bookCta}
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-holographic-cyan text-void-black font-mono font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(229,228,226,0.25)]"
          >
            {labels.bookBtn}
          </button>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="grid gap-8 rounded-3xl border border-tungsten-grey/60 bg-obsidian-plate/70 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl md:grid-cols-2"
        >
          <div className="space-y-6">
            <label className="block text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/60">
              {labels.name}
              <input
                type="text"
                required
                className="mt-3 w-full border-b border-tungsten-grey/70 bg-transparent pb-3 text-sm text-electric-platinum outline-none transition focus:border-holographic-cyan focus:shadow-[0_0_12px_rgba(229,228,226,0.35)]"
              />
            </label>
            <label className="block text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/60">
              {labels.email}
              <input
                type="email"
                required
                className="mt-3 w-full border-b border-tungsten-grey/70 bg-transparent pb-3 text-sm text-electric-platinum outline-none transition focus:border-holographic-cyan focus:shadow-[0_0_12px_rgba(229,228,226,0.35)]"
              />
            </label>
            <label className="block text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/60">
              {labels.topic}
              <input
                type="text"
                required
                className="mt-3 w-full border-b border-tungsten-grey/70 bg-transparent pb-3 text-sm text-electric-platinum outline-none transition focus:border-holographic-cyan focus:shadow-[0_0_12px_rgba(229,228,226,0.35)]"
              />
            </label>
          </div>

          <div className="space-y-6">
            <label className="block text-xs font-mono uppercase tracking-[0.3em] text-electric-platinum/60">
              {labels.message}
              <textarea
                rows={6}
                required
                className="mt-3 w-full resize-none border-b border-tungsten-grey/70 bg-transparent pb-3 text-sm text-electric-platinum outline-none transition focus:border-holographic-cyan focus:shadow-[0_0_12px_rgba(229,228,226,0.35)]"
              />
            </label>
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full rounded-full border border-tungsten-grey/80 bg-obsidian-plate/70 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-electric-platinum transition hover:border-holographic-cyan/80 hover:shadow-[0_0_20px_rgba(229,228,226,0.25)]"
              >
                {formState === "done" ? labels.done : labels.submit}
              </button>
              <div className="h-1 w-full overflow-hidden rounded-full bg-obsidian-plate/60">
                <motion.div
                  animate={{ width: `${formState === "idle" ? 0 : progress}%` }}
                  className="h-full bg-gradient-to-r from-holographic-cyan to-deep-indigo"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-electric-platinum/50">
                {formState === "sending" ? labels.sending : formState === "done" ? labels.transmitted : labels.awaiting}
              </p>
            </div>
          </div>
        </motion.form>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        locale={locale}
      />
    </main>
  );
}
