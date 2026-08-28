"use client";

import Link from "next/link";
import { Arrow } from "./Reveal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useChapterUi, anchorFor } from "./chapters";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { shoreContent } from "@/lib/content/shore";
import { locales, type Locale } from "@/lib/translations";

/** The Alvolo mark — two shores, a bridge, a pale moon. */
export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="30" cy="14" r="6.4" fill="#cf2734" fillOpacity=".95" />
      <path d="M4 30h36" stroke="#1b2230" strokeWidth="1.5" />
      <path d="M8 30c4-9 10-13 14-13s10 4 14 13" stroke="#1b2230" strokeWidth="1.3" />
      <path d="M14 30v-7M30 30v-7" stroke="#1b2230" strokeWidth="1.2" strokeOpacity=".7" />
      <path d="M10 36h24" stroke="#1b2230" strokeWidth="1.1" strokeOpacity=".55" />
    </svg>
  );
}

const NAV_CTA: Record<Locale, string> = { en: "Your mandate", tr: "Mandatınız", it: "Il vostro mandato" };

export default function ShoreNav({ locale }: { locale: Locale }) {
  const t = shoreContent[locale];
  const pathname = usePathname() ?? "/";
  const { scrollTo } = useSmoothScroll();
  const { active } = useChapterUi();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && (locales as readonly string[]).includes(segments[0])) segments.shift();
  const rest = segments.length ? `/${segments.join("/")}/` : "/";
  const isHome = rest === "/";

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);
      setHidden((h) => (open ? false : y > last + 4 && y > window.innerHeight * 0.8 ? true : y < last - 4 ? false : h));
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("nav-open");
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!isHome) return; // let Next route to /locale/#hash
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    e.preventDefault();
    const idx = Array.from(document.querySelectorAll("[data-cam]")).indexOf(el);
    scrollTo(idx >= 0 ? anchorFor(idx) : el, { offset: idx >= 0 ? 0 : -40 });
  };

  return (
    <header className={clsx("nav", stuck && "stuck", hidden && "hide", open && "menu-open")} id="nav">
      <Link className="brand" href={`/${locale}/`} data-cursor onClick={() => setOpen(false)}>
        <BrandMark />
        <span className="brand-tx">
          <b>{t.brand.name}</b>
          <i>{t.brand.tag}</i>
        </span>
      </Link>
      <nav className="nav-links" id="navlinks" aria-label={t.menu}>
        {t.nav.map((link, i) => {
          // nav order mirrors the chapter order (hero is chapter 0, links start at 1)
          const on = isHome && active === i + 1;
          return (
            <a key={link.href} className={clsx("nav-link", on && "on")} href={isHome ? link.href : `/${locale}/${link.href}`} data-cursor onClick={(e) => go(e, link.href)}>
              <span>{link.label}</span>
              <span className="alt">{link.alt}</span>
            </a>
          );
        })}
        <Link href={`/${locale}/brief/`} className="nav-cta" data-cursor="magnetic" onClick={() => setOpen(false)}>
          <span>{NAV_CTA[locale]}</span>
          <Arrow />
        </Link>
        <div className="nav-lang" role="group" aria-label={t.footer.language}>
          {locales.map((loc) => (
            <Link key={loc} href={`/${loc}${rest}`} hrefLang={loc} lang={loc} className={clsx(loc === locale && "on")} onClick={() => setOpen(false)} data-cursor>
              {loc.toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>
      <button
        type="button"
        className={clsx("nav-burger", open && "active")}
        aria-label={t.menu}
        aria-controls="navlinks"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        data-cursor
      >
        <i />
        <i />
      </button>
    </header>
  );
}
