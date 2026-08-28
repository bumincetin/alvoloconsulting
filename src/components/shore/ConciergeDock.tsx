"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Arrow } from "./Reveal";
import { CONTACT, footerContent } from "@/lib/content/footer";
import type { Locale } from "@/lib/translations";

/**
 * Concierge dock: a fixed pill with the two shortest routes to a partner,
 * the WhatsApp line and the tailored-mandate brief. On the home page it waits until
 * the visitor has crossed the hero; on inner pages it appears after a short beat.
 */

const LABELS: Record<Locale, { whatsapp: string; brief: string }> = {
  en: { whatsapp: "Concierge", brief: "Your mandate" },
  tr: { whatsapp: "Concierge", brief: "Mandatınız" },
  it: { whatsapp: "Concierge", brief: "Il vostro mandato" },
};

export default function ConciergeDock({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  const [on, setOn] = useState(false);
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isBrief = pathname.includes("/brief");
  const t = LABELS[locale];

  useEffect(() => {
    if (!isHome) {
      const id = window.setTimeout(() => setOn(true), 700);
      return () => window.clearTimeout(id);
    }
    const check = () => setOn(window.scrollY > window.innerHeight * 0.7);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isHome, pathname]);

  const wa = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(footerContent[locale].whatsappMessage)}`;

  // the contact page already carries every channel — no dock there
  if (pathname.includes("/contact")) return null;

  return (
    <div className={clsx("dock", on && "on")} aria-label="Concierge">
      <a href={wa} target="_blank" rel="noreferrer" data-cursor="magnetic">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 20l1.3-3.8A8 8 0 1 1 8.2 19L4 20z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c.4.8 1.2 1.6 2.1 2.1l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-.5.3-1.4.5-2.9-.4-1.6-.9-2.8-2.3-3.4-3.6-.4-1 .1-1.9.3-2.3z" fill="currentColor" />
        </svg>
        <span>{t.whatsapp}</span>
      </a>
      {isBrief ? null : (
        <Link href={`/${locale}/brief/`} className="pri" data-cursor="magnetic">
          <span>{t.brief}</span>
          <Arrow />
        </Link>
      )}
    </div>
  );
}
