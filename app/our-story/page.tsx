import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import LogisticsPrism from "../expertise/logistics/logistics-prism";
import StoryChapters from "./story-chapters";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "Découvrez la démarche de Plastex Maroc pour les composants de freinage et d’embrayage, sa production en interne et son offre internationale depuis Tanger.",
  alternates: { canonical: "/our-story/", languages: { fr: "/our-story/", en: "/en/our-story/", es: "/es/our-story/" } },
  openGraph: { locale: "fr_MA",
    title: "Notre histoire | Plastex Maroc",
    description:
      "Découvrez le travail, les produits et les personnes qui font Plastex Maroc à Tanger.",
  },
};

export default function OurStoryPage() {
  return (
    <>
      <section className="story-hero" aria-labelledby="story-title">
        <div className="container story-hero-top">
          <div className="story-hero-copy">
            <span className="story-eyebrow">PLASTEX MAROC / NOTRE HISTOIRE</span>
            <h1 id="story-title">Notre histoire.<br />Pensée pour le mouvement.</h1>
            <p>Depuis Tanger, nous mettons notre expertise en composants de freinage et d’embrayage au service d’échanges clairs avec des acheteurs du monde entier.</p>
          </div>
          <div className="story-hero-form"><LogisticsPrism ariaLabel="Faire tourner la sculpture linéaire Plastex" subtle /></div>
        </div>
        <div className="container story-hero-photo">
          <Image
            src="/images/hero-aerial.webp"
            alt="Vue aérienne illustrative d’un site logistique industriel près de Tanger"
            fill priority sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="story-photo-shade" />
          <span className="story-photo-note">Images d’illustration</span>
          <div className="story-photo-content">
            <div><span>NOTRE CAPACITÉ</span><strong>6 000 000</strong><p>disques par an</p></div>
            <Link href="/expertise/production/">Voir comment nous travaillons <ArrowRightIcon size={24} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="story-editorial" aria-labelledby="story-editorial-title">
        <div className="container story-editorial-grid">
          <div className="story-editorial-side">
            <span>01 / NOTRE TRAVAIL</span>
            <p>Ce que nous fabriquons part de la pièce, de son application et des personnes qui en ont besoin.</p>
            <nav aria-label="Découvrir les produits">
              <Link href="/brake-discs/">Disques de frein <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/clutch-discs/">Disques d’embrayage <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/brake-drums/">Tambours de frein <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/brake-pads/">Plaquettes de frein <ArrowRightIcon size={20} aria-hidden="true" /></Link>
            </nav>
          </div>
          <div className="story-editorial-main">
            <h2 id="story-editorial-title">Le bon composant naît d’un meilleur échange.</h2>
            <Link className="story-solid-link" href="/expertise/">Découvrir notre expertise <ArrowRightIcon size={20} aria-hidden="true" /></Link>
            <div className="story-editorial-paragraphs">
              <p>Plastex Maroc travaille sur les produits de friction pour freins et embrayages à Tanger. Nous fabriquons des produits de friction, assemblons des disques d’embrayage et réalisons des opérations de semi-finition sur les tambours de frein que nous revendons.</p>
              <p>Notre rôle dépasse celui d’un catalogue. Nous échangeons sur les références, dimensions, volumes et destinations pour transformer chaque demande en discussion technique et commerciale utile.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-contact" aria-labelledby="story-contact-title">
        <div className="container story-contact-frame">
          <Image src="/images/workshop-contact.webp" alt="Composants automobiles illustratifs dans un atelier industriel" fill sizes="(max-width: 760px) 100vw, 85vw" />
          <span className="story-contact-note">Images d’illustration</span>
          <div className="story-contact-card">
            <h2 id="story-contact-title">Parlons de ce qui vous fait avancer.</h2>
            <p>Indiquez à notre équipe la pièce recherchée, sa destination et votre prochaine étape.</p>
            <div className="story-contact-actions">
              <div>
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={23} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={23} aria-hidden="true" /></a>
              </div>
              <Link href="/contact/">Contactez-nous <ArrowRightIcon size={22} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <StoryChapters />
    </>
  );
}
