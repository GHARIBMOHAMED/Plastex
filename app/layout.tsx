import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "./components";
import { Footer as EnglishFooter, Header as EnglishHeader } from "./en/components";
import { Footer as SpanishFooter, Header as SpanishHeader } from "./es/components";
import { siteUrl } from "./data";
import BrandMark from "./brand-mark";
import { headers } from "next/headers";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plastex Maroc | Composants de freinage et d'embrayage",
    template: "%s | Plastex Maroc",
  },
  description:
    "Plastex Maroc fabrique des produits de friction pour freins et embrayages à Tanger et accompagne les acheteurs professionnels en Europe, en Asie et en Afrique.",
  applicationName: "Plastex Maroc",
  openGraph: { type: "website", locale: "fr_MA", siteName: "Plastex Maroc" },
  robots: { index: true, follow: true },
  other: { "page-type": "product", "site-kind": "other" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestedLocale = (await headers()).get("x-site-locale");
  const locale = requestedLocale === "en" || requestedLocale === "es" ? requestedLocale : "fr";
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plastex Maroc",
    logo: `${siteUrl}/images/plastex-logo.png`,
    url: siteUrl,
    email: "commercial@plastexmaroc.com",
    telephone: "+212539351136",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Z.I. Route de Tétouan, lot 46",
      postalCode: "90000",
      addressLocality: "Tangier",
      addressCountry: "MA",
    },
  };
  return (
    <html lang={locale} data-type="product">
      <body>
        <div className="site-loader" aria-hidden="true">
          <div className="loader-center">
            <BrandMark className="loader-brand-mark" />
            <span className="loader-caption">{locale === "en" ? "PRECISION IN MOTION" : locale === "es" ? "PRECISIÓN EN MOVIMIENTO" : "LA PRÉCISION EN MOUVEMENT"}</span>
          </div>
        </div>
        <a className="skip-link" href="#main-content">
          {locale === "en" ? "Skip to content" : locale === "es" ? "Ir al contenido" : "Aller au contenu"}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
        {locale === "en" ? <EnglishHeader /> : locale === "es" ? <SpanishHeader /> : <Header />}
        <main id="main-content">{children}</main>
        {locale === "en" ? <EnglishFooter /> : locale === "es" ? <SpanishFooter /> : <Footer />}
      </body>
    </html>
  );
}
