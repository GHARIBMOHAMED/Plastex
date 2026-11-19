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
import ScrollFillHeadline from "./scroll-fill-headline";

export const metadata: Metadata = {
  title: "Componentes de freno y embrague de Tánger",
  description: "Plastex Maroc fabrica componentes de freno y embrague en Tánger, utiliza energía solar para contribuir a reducir las emisiones de carbono y atiende a compradores profesionales de Europa, Asia y África.",
  alternates: { canonical: "/es/", languages: { fr: "/", en: "/en/", es: "/es/" } },
};

export default function Home() {
  return (
    <>
      <section className="hero apc-inspired" data-enter>
        <HeroVideo source="/videos/plastex-home-hero.mp4" />
        <span className="hero-film-note">Imágenes ilustrativas</span>
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              Fabricantes de componentes
              <br />
              de freno y embrague
            </h1>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>Fabricados en Tánger.<br />Pensados para el movimiento.</span>
          <span className="hero-scroll">DESLIZA PARA DESCUBRIR <ArrowDownIcon size={14} aria-hidden="true" /></span>
          <Link href="/es/contact/" className="hero-contact">¿Una pregunta para nuestro equipo? <span><EnvelopeSimpleIcon size={22} /></span></Link>
        </div>
      </section>
      <section className="intro-section container">
        <div className="intro-grid">
          <div className="intro-statement">
            <ScrollFillHeadline id="home-intro-title" text="Fabricamos componentes de freno y embrague. También ofrecemos tambores y pastillas de freno a compradores profesionales." />
            <Link className="button-dark" href="#products">
              Ver nuestros productos <Arrow diagonal />
            </Link>
          </div>
          <div className="intro-aside">
            <h3>Nuestros componentes</h3>
            <nav aria-label="Productos de Plastex Maroc">
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
          <span className="section-index">04 / PRESENCIA</span>
        </div>
        <div className="reach-grid">
          <div>
            <h2>
              DESDE TÁNGER
              <br />
              <em>HACIA EL MUNDO.</em>
            </h2>
            <p>
              Situada en el cruce de grandes rutas comerciales, Plastex Maroc
              atiende a socios de Europa, Asia y África.
            </p>
          </div>
          <div className="reach-graphic">
            <div className="reach-circle one" />
            <div className="reach-circle two" />
            <div className="reach-circle three" />
            <div className="reach-center">
              TÁNGER
              <br />
              <span>35.76° N · 5.83° W</span>
            </div>
            <span className="reach-label europe">EUROPA</span>
            <span className="reach-label asia">ASIA</span>
            <span className="reach-label africa">ÁFRICA</span>
          </div>
        </div>
      </section>
      <section className="contact-photo-section" aria-labelledby="contact-photo-heading">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Escena ilustrativa de un trabajador preparando un camión de carga"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="contact-photo-heading">Estamos aquí para ayudarte.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>
              ¿Buscas componentes de freno o embrague? Indícanos la aplicación,
              las especificaciones y el volumen que necesitas. Nuestro equipo de Tánger te ayudará
              con tu consulta.
            </p>
            <div className="contact-card-actions">
              <div className="contact-quick-links">
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Escribir a Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
              </div>
              <Link href="/es/contact/" className="contact-card-main-link">
                Contactar con el equipo <span><ArrowRightIcon size={25} aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
