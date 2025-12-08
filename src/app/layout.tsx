import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
// LanguageProvider is a client component, useLanguage is also for client components
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider"; 
import { CookieConsent } from "@/components/CookieConsent";
import { ScriptLoader } from "@/components/ScriptLoader";
import Footer from "@/components/layout/Footer";
import ClientLayout from "./ClientLayout";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

const siteUrl = "https://www.alvoloconsulting.com";

// Metadata can now be exported as this is a Server Component by default
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alvolo Consulting | Financial & Integration Solutions for Italy",
  description: "Alvolo Danışmanlık: İtalya'da iş kurma, finansal danışmanlık ve entegrasyon çözümleri. Uluslararası müşterilere yönelik profesyonel ve çok dilli danışmanlık hizmetleri.",
  keywords: [
    "Alvolo Consulting", "Italy business consulting", "company formation Italy", 
    "financial consulting Italy", "integration solutions Italy", "İtalya danışmanlık", "business setup Italy", 
    "Italian market entry", "legal consulting Italy", "international clients Italy", "italy startup package", 
    "italy expansion package", "italy company formation", "italy financial consulting", "italy integration solutions", 
    "italy legal consulting", "italy international clients","italya finansal danışmanlık", "italya girişimcilik paketi", 
    "italya genişleme paketi", "italya şirket kurulumu", "italya finansal danışmanlık", "italya entegrasyon çözümleri", 
    "italya yasal danışmanlık", "italya uluslararası müşteriler"
  ],
  icons: {
    icon: 'https://dl.dropboxusercontent.com/scl/fi/kyiy7zmfhp2qm0sucd7nt/ICON.png?rlkey=3wzqu5r27zaag3j8mpawjydpy&st=qjoffk41&dl=1&raw=1', // Points to public/icon.png
  },
  openGraph: {
    title: "Alvolo Consulting | Financial & Integration Solutions for Italy",
    description: "Alvolo Danışmanlık: İtalya'da iş kurma, finansal danışmanlık ve entegrasyon çözümleri.",
    url: siteUrl,
    siteName: 'Alvolo Consulting',
    images: [
      {
        url: 'https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1', // Must be an absolute URL
        width: 800,
        height: 600,
        alt: 'Alvolo Consulting Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alvolo Consulting | Financial & Integration Solutions for Italy",
    description: "Alvolo Danışmanlık: İtalya'da iş kurma, finansal danışmanlık ve entegrasyon çözümleri.",
    images: ['https://dl.dropboxusercontent.com/scl/fi/1e6b17ra9y0ey2kw192ej/LOGO.png?rlkey=eijo2u9qpo88udlovkmh3chaj&st=gnjfhg84&dl=1&raw=1'], // Must be an absolute URL
  },
  // For truly dynamic metadata based on language, you'd typically rely on route parameters (e.g., /[locale])
  // and generateMetadata function, which is not directly compatible with a purely client-side language context for metadata.
};

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
          "telephone": "+39-123-456-7890", // Add a real phone number here if available
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
          "https://www.instagram.com/alvoloconsulting?igsh=Z3IzbzBsNGJraWs%3D",
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
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  // Add page transition animation using AnimatePresence
  // This must be a client component, so we need a wrapper
  // We'll create a ClientLayout for this
  return (
    <html lang="tr" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; font-src 'self' https: data:; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; style-src 'self' https: 'unsafe-inline';" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${lato.variable} antialiased`}
        suppressHydrationWarning={true} 
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
            <Footer />
            <CookieConsent />
            {/* Google Tag Manager (inline init, only after analytics consent) */}
            <ScriptLoader
              code={`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PWK23TBJ');`}
              category="analytics"
              id="gtm-inline"
            />
            {/* Google Tag Manager (external script, only after analytics consent) */}
            <ScriptLoader
              src="https://www.googletagmanager.com/gtm.js?id=GTM-PWK23TBJ"
              category="analytics"
              async
              id="gtm-external"
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// ClientLayout.tsx (to be created in the same directory)
// This will wrap children with AnimatePresence and handle route transitions
