import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "./components";
import { siteUrl } from "./data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plastex Maroc | Brake & Clutch Components",
    template: "%s | Plastex Maroc",
  },
  description:
    "Plastex Maroc manufactures brake and clutch friction products in Tangier and supports professional buyers across Europe, Asia, and Africa.",
  applicationName: "Plastex Maroc",
  openGraph: { type: "website", locale: "en_US", siteName: "Plastex Maroc" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plastex Maroc",
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
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
