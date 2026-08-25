import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { locales, type Locale } from "@/lib/translations";
import LocaleLayoutClient from "./LocaleLayoutClient";

/**
 * Root layout. It lives under the `[locale]` segment so `<html lang>` follows the route
 * (the classic App Router i18n pattern); there is deliberately no `app/layout.tsx`.
 */

export const runtime = "edge";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://www.alvoloconsulting.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alvolo Consulting | Cross-Border Advisory — Italy & Türkiye",
  description:
    "Alvolo Consulting: cross-border financial advisory between Milan, Rome and Istanbul. Italian company incorporation (S.r.l., S.p.A.), tax planning, Codice Fiscale, residency permits, executive relocation, banking setup and Turkish manufacturing partnerships.",
  keywords: [
    "Alvolo Consulting", "Italy business consulting", "company formation Italy", "S.r.l. incorporation",
    "financial consulting Italy", "Codice Fiscale", "permesso di soggiorno", "Italian market entry",
    "Turkey manufacturing sourcing", "Italy Turkey advisory", "İtalya danışmanlık", "italy expansion package",
  ],
  icons: {
    icon: "/ICON.png",
  },
  openGraph: {
    title: "Alvolo Consulting | Cross-Border Advisory — Italy & Türkiye",
    description:
      "Cross-border financial advisory, corporate market entry and integration consultancy operating between Milan, Rome and Istanbul.",
    url: siteUrl,
    siteName: "Alvolo Consulting",
    images: [
      {
        url: "/LOGO.png",
        width: 800,
        height: 600,
        alt: "Alvolo Consulting Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvolo Consulting | Cross-Border Advisory — Italy & Türkiye",
    description:
      "Cross-border financial advisory, corporate market entry and integration consultancy operating between Milan, Rome and Istanbul.",
    images: ["/LOGO.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Alvolo Consulting",
      url: siteUrl,
      logo: `${siteUrl}/LOGO.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+39-348-170-5207",
        contactType: "customer service",
        areaServed: ["IT", "TR"],
        availableLanguage: ["en", "it", "tr"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Valsugana 6",
        addressLocality: "Milan",
        postalCode: "20139",
        addressCountry: "IT",
      },
      sameAs: ["https://www.instagram.com/alvoloconsulting", "https://www.linkedin.com/company/alvolo-consulting"],
    },
    {
      "@type": "WebSite",
      url: siteUrl,
      name: "Alvolo Consulting",
      publisher: {
        "@type": "Organization",
        name: "Alvolo Consulting",
      },
    },
  ],
};

function resolveLocale(value: string): Locale {
  return (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);

  return (
    <html lang={locale} className={`${jakarta.variable} ${jetbrains.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen overflow-x-hidden bg-obsidian font-sans text-white antialiased selection:bg-emerald selection:text-obsidian"
      >
        <SmoothScrollProvider>
          <LocaleLayoutClient locale={locale}>{children}</LocaleLayoutClient>
        </SmoothScrollProvider>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.16] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
