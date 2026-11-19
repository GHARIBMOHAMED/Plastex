import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import ProductionSteps from "./production-steps";
import ScrollFillHeadline from "../../scroll-fill-headline";

export const metadata: Metadata = {
  title: "Production en interne",
  description:
    "Découvrez la fabrication de produits de friction pour freins et embrayages, l’assemblage de disques d’embrayage et la semi-finition de tambours chez Plastex Maroc à Tanger.",
  alternates: { canonical: "/expertise/production/", languages: { fr: "/expertise/production/", en: "/en/expertise/production/" } },
  openGraph: { locale: "fr_MA",
    title: "Production en interne | Plastex Maroc",
    description:
      "Découvrez la production et l’approvisionnement en composants chez Plastex Maroc à Tanger.",
  },
};

export default function ProductionPage() {
  return (
    <>
      <section className="reference-product-hero production-hero" data-enter aria-labelledby="production-title">
        <Image
          className="production-hero-image"
          src="/images/factory-film.webp"
          alt="Scène illustrative de production de composants de freinage"
          fill
          priority
          sizes="100vw"
        />
        <div className="container reference-product-hero-inner">
          <h1 id="production-title">Production<br />en interne.</h1>
          <p className="reference-product-tagline">Produits de friction pour freins et embrayages fabriqués à Tanger.</p>
          <div className="reference-hero-contact">
            <span>Vous souhaitez parler d’un composant?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Images d’illustration</span>
      </section>

      <section className="production-intro" aria-labelledby="production-intro-title">
        <div className="container production-intro-grid">
          <div className="production-intro-copy">
            <h2 id="production-intro-title">Une production au plus près de ceux qui connaissent la pièce.</h2>
            <p>Plastex Maroc fabrique des produits de friction pour freins et embrayages à Tanger et assemble des disques d’embrayage. Nous réalisons aussi des opérations de semi-finition sur les tambours de frein que nous proposons.</p>
            <p>Commencez par une application, une référence, un plan ou un volume prévu. Notre équipe pourra s’appuyer sur ces informations pour discuter de la pièce et de vos besoins d’approvisionnement.</p>
          </div>
          <div className="production-intro-aside">
            <span>Pour aller plus loin</span>
            <Link href="/expertise/">Notre expertise <ArrowRightIcon size={19} aria-hidden="true" /></Link>
            <Link href="/brake-discs/">Disques de frein <ArrowRightIcon size={19} aria-hidden="true" /></Link>
            <Link href="/clutch-discs/">Disques d’embrayage <ArrowRightIcon size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <ProductionSteps />

      <section className="production-quality" aria-labelledby="production-quality-title">
        <div className="container production-quality-grid">
          <div className="production-quality-aside">
            <span>QUALITÉ / DOCUMENTATION</span>
            <h2 id="production-quality-title">Renseignez-vous sur nos certifications.</h2>
            <div className="production-certifications"><span>TÜV</span><span>AFNOR</span></div>
          </div>
          <ScrollFillHeadline id="production-quality-statement" text="Les questions de qualité font partie de tout échange sur l’approvisionnement. Notre équipe peut vous fournir les détails des certifications TÜV et AFNOR, notamment leur portée et les documents applicables, sur demande." />
        </div>
      </section>

      <section className="contact-photo-section production-contact" aria-labelledby="production-contact-title">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Opérateur illustratif sécurisant un camion devant un entrepôt"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="production-contact-title">Parlons production.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>Indiquez-nous le composant de freinage ou d’embrayage recherché, sa destination et les informations dont vous disposez. Nous poursuivrons l’échange à partir de là.</p>
            <div className="contact-card-actions">
              <div className="contact-quick-links">
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
              </div>
              <Link href="/contact/" className="contact-card-main-link">Contacter notre équipe <span><ArrowRightIcon size={25} aria-hidden="true" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
