"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Eyebrow from "@/components/UI/Eyebrow";
import clsx from "clsx";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  sub?: string;
  accent?: "azure" | "emerald" | "gold";
  backHref?: string;
  backLabel?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

/** Standard inner-page masthead: eyebrow, display title, optional lede, optional back link. */
export default function PageHeader({ eyebrow, title, sub, accent = "emerald", backHref, backLabel, align = "left", children }: PageHeaderProps) {
  return (
    <header className={clsx("relative pt-36 pb-16 lg:pt-44 lg:pb-20", align === "center" && "text-center")}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3] [mask-image:radial-gradient(ellipse_at_20%_30%,black_10%,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {backHref ? (
          <Link
            href={backHref}
            aria-label={backLabel ?? "Back"}
            className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            {backLabel}
          </Link>
        ) : null}
        <div className={clsx(align === "center" && "flex justify-center")}>
          <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        </div>
        <h1
          className={clsx(
            "mt-6 font-display text-[clamp(2.4rem,5.4vw,5rem)] font-semibold leading-[1] tracking-[-0.03em] text-white",
            align === "center" ? "mx-auto max-w-4xl" : "max-w-4xl",
          )}
        >
          {title}
        </h1>
        {sub ? <p className={clsx("mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-base", align === "center" && "mx-auto")}>{sub}</p> : null}
        {children}
      </div>
    </header>
  );
}
