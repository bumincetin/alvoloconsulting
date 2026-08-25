"use client";

import Link from "next/link";
import { useRef } from "react";
import clsx from "clsx";
import { Arrow, SectionHead, WordReveal, useReveals } from "@/components/shore/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  sub?: string;
  /** second-language flip shown at the right end of the rule */
  alt?: string;
  index?: string;
  accent?: "azure" | "emerald" | "gold";
  backHref?: string;
  backLabel?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

/** Inner-page masthead in the chapter grammar: "NN — Label ———— Alt", a display title, a lede. */
export default function PageHeader({ eyebrow, title, sub, alt, index = "00", backHref, backLabel, align = "left", children }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  return (
    <header ref={ref} className={clsx("pg-head", align === "center" && "text-center")}>
      {backHref ? (
        <Link href={backHref} className="pg-back" aria-label={backLabel ?? "Back"} data-cursor>
          <Arrow className="h-3 w-3 rotate-[225deg]" />
          {backLabel}
        </Link>
      ) : null}
      <SectionHead index={index} label={eyebrow} alt={alt ?? ""} />
      <WordReveal as="h1" lines={[title]} className={clsx("h-sec", align === "center" && "mx-auto")} />
      {sub ? (
        <p className={clsx("lede body-lg", align === "center" && "mx-auto")} data-rv="up">
          {sub}
        </p>
      ) : null}
      {children}
    </header>
  );
}
