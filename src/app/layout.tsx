import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const siteUrl = "https://www.alvoloconsulting.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alvolo Consulting | Financial & Integration Solutions for Italy",
  description: "Alvolo Consulting: Business formation, financial consulting and integration solutions in Italy. Professional and multilingual consulting services for international clients.",
  keywords: [
    "Alvolo Consulting", "Italy business consulting", "company formation Italy",
    "financial consulting Italy", "integration solutions Italy", "İtalya danışmanlık",
    "business setup Italy", "Italian market entry", "legal consulting Italy",
    "international clients Italy", "italy startup package", "italy expansion package"
  ],
  icons: {
    icon: 'https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1',
  },
  openGraph: {
    title: "Alvolo Consulting | Financial & Integration Solutions for Italy",
    description: "Alvolo Consulting: Business formation, financial consulting and integration solutions in Italy.",
    url: siteUrl,
    siteName: 'Alvolo Consulting',
    images: [
      {
        url: 'https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1',
        width: 800,
        height: 600,
        alt: 'Alvolo Consulting Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alvolo Consulting | Financial & Integration Solutions for Italy",
    description: "Alvolo Consulting: Business formation, financial consulting and integration solutions in Italy.",
    images: ['https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1'],
  },
};

// Edge runtime disabled for compatibility with client-side libraries (Framer Motion)
// export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Alvolo Consulting",
        "url": siteUrl,
        "logo": 'https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1',
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+39-348-170-5207",
          "contactType": "customer service"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Valsugana 6",
          "addressLocality": "Milan",
          "postalCode": "20139",
          "addressCountry": "IT"
        },
        "sameAs": [
          "https://www.instagram.com/alvoloconsulting",
          "https://www.linkedin.com/company/alvolo-consulting"
        ]
      },
      {
        "@type": "WebSite",
        "url": siteUrl,
        "name": "Alvolo Consulting",
        "publisher": {
          "@type": "Organization",
          "name": "Alvolo Consulting"
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans text-electric-platinum overflow-x-hidden min-h-screen selection:bg-holographic-cyan selection:text-void-black bg-void-black antialiased">
        <LenisProvider>{children}</LenisProvider>
        <div
          className="pointer-events-none fixed inset-0 z-[60] opacity-20 mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
