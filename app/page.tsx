import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownIcon, ArrowRightIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { Arrow } from "./components";
import { productLinks } from "./data";
import ProductionProof from "./production-proof";
import CategoryShowcase from "./category-showcase";
import RangeSelector from "./range-selector";
import HeroVideo from "./hero-video";
import ProcessAccordion from "./process-accordion";
import SolarEnergy from "./solar-energy";

export const metadata: Metadata = {
  title: "Composants de freinage et d’embrayage de Tanger",
  description: "Plastex Maroc fabrique des composants de freinage et d’embrayage à Tanger, utilise l’énergie solaire pour réduire ses émissions de carbone et accompagne les acheteurs professionnels en Europe, en Asie et en Afrique.",
  alternates: { canonical: "/", languages: { fr: "/", en: "/en/" } },
};

export default function Home() {
  return (
    <>
      <section className="hero apc-inspired" data-enter>
        <HeroVideo source="/videos/plastex-home-hero.mp4" />
        <span className="hero-film-note">Images d’illustration</span>
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              Fabricants de composants
              <br />
              de freinage et d’embrayage
            </h1>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>Fabriqués à Tanger.<br />Pensés pour le mouvement.</span>
          <span className="hero-scroll">DÉFILER POUR DÉCOUVRIR <ArrowDownIcon size={14} aria-hidden="true" /></span>
          <Link href="/contact/" className="hero-contact">Une question pour notre équipe? <span><EnvelopeSimpleIcon size={22} /></span></Link>
        </div>
      </section>
      <section className="intro-section container">
        <div className="intro-grid">
          <div className="intro-statement">
            <h2>
              Nous fabriquons des composants de freinage et d’embrayage. Nous proposons aussi des tambours et des plaquettes de frein aux acheteurs professionnels.
            </h2>
            <Link className="button-dark" href="#products">
              Voir nos produits <Arrow diagonal />
            </Link>
          </div>
          <div className="intro-aside">
            <h3>Nos composants</h3>
            <nav aria-label="Produits Plastex Maroc">
              {productLinks.map((item) => (
                <Link href={item.href} key={item.href}>{item.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
      <CategoryShowcase />
      <RangeSelector />
      <ProcessAccordion />
      <ProductionProof />
      <SolarEnergy />
      <section className="reach-section container">
        <div className="section-topline">
          <span className="section-index">04 / PRÉSENCE</span>
        </div>
        <div className="reach-grid">
          <div>
            <h2>
              DE TANGER
              <br />
              <em>VERS LE MONDE.</em>
            </h2>
            <p>
              À la croisée des grandes routes commerciales, Plastex Maroc accompagne des partenaires en Europe, en Asie et en Afrique.
            </p>
          </div>
          <div className="reach-graphic">
            <div className="reach-circle one" />
            <div className="reach-circle two" />
            <div className="reach-circle three" />
            <div className="reach-center">
              TANGER
              <br />
              <span>35.76° N · 5.83° W</span>
            </div>
            <span className="reach-label europe">EUROPE</span>
            <span className="reach-label asia">ASIE</span>
            <span className="reach-label africa">AFRIQUE</span>
          </div>
        </div>
      </section>
      <section className="contact-photo-section" aria-labelledby="contact-photo-heading">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Illustration d’un opérateur sécurisant un camion devant un entrepôt"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="contact-photo-heading">Nous sommes à votre écoute.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>
              Vous recherchez des composants de freinage ou d’embrayage? Indiquez-nous l’application, les spécifications et les volumes souhaités. Notre équipe de Tanger étudiera votre demande.
            </p>
            <div className="contact-card-actions">
              <div className="contact-quick-links">
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
              </div>
              <Link href="/contact/" className="contact-card-main-link">
                Contacter notre équipe <span><ArrowRightIcon size={25} aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
