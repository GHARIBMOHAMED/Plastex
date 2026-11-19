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
  title: "Nuestra historia",
  description:
    "Descubra el trabajo de Plastex Maroc con componentes de freno y embrague, producción propia y suministro internacional desde Tánger.",
  alternates: { canonical: "/es/our-story/", languages: { fr: "/our-story/", en: "/en/our-story/", es: "/es/our-story/" } },
  openGraph: { locale: "es_ES",
    title: "Nuestra historia | Plastex Maroc",
    description:
      "Conozca el trabajo, los productos y las personas de Plastex Maroc en Tánger.",
  },
};

export default function OurStoryPage() {
  return (
    <>
      <section className="story-hero" aria-labelledby="story-title">
        <div className="container story-hero-top">
          <div className="story-hero-copy">
            <span className="story-eyebrow">PLASTEX MAROC / NUESTRA HISTORIA</span>
            <h1 id="story-title">Nuestra historia.<br />Hecha para el movimiento.</h1>
            <p>Desde Tánger, aportamos experiencia en componentes de freno y embrague a compradores de todo el mundo.</p>
          </div>
          <div className="story-hero-form"><LogisticsPrism ariaLabel="Girar la escultura lineal de Plastex" subtle /></div>
        </div>
        <div className="container story-hero-photo">
          <Image
            src="/images/hero-aerial.webp"
            alt="Vista aérea ilustrativa de una instalación logística industrial cerca de Tánger"
            fill priority sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="story-photo-shade" />
          <span className="story-photo-note">Imágenes ilustrativas</span>
          <div className="story-photo-content">
            <div><span>NUESTRA CAPACIDAD</span><strong>6,000,000</strong><p>discos al año</p></div>
            <Link href="/es/expertise/production/">Conozca nuestro trabajo <ArrowRightIcon size={24} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="story-editorial" aria-labelledby="story-editorial-title">
        <div className="container story-editorial-grid">
          <div className="story-editorial-side">
            <span>01 / EL TRABAJO</span>
            <p>Nuestro trabajo empieza por la pieza, su aplicación y las personas que la necesitan.</p>
            <nav aria-label="Explorar productos">
              <Link href="/es/brake-discs/">Discos de freno <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/es/clutch-discs/">Discos de embrague <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/es/brake-drums/">Tambores de freno <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/es/brake-pads/">Pastillas de freno <ArrowRightIcon size={20} aria-hidden="true" /></Link>
            </nav>
          </div>
          <div className="story-editorial-main">
            <h2 id="story-editorial-title">El componente adecuado empieza con una buena conversación.</h2>
            <Link className="story-solid-link" href="/es/expertise/">Explore nuestra experiencia <ArrowRightIcon size={20} aria-hidden="true" /></Link>
            <div className="story-editorial-paragraphs">
              <p>Plastex Maroc trabaja con productos de fricción para frenos y embragues en Tánger. Fabricamos productos de fricción, ensamblamos discos de embrague y realizamos trabajos de semiacabado en los tambores de freno que revendemos.</p>
              <p>Nuestro trabajo va más allá de un catálogo. Preguntamos por referencias, dimensiones, volúmenes y destinos para que cada consulta avance hacia un diálogo técnico y comercial útil.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-contact" aria-labelledby="story-contact-title">
        <div className="container story-contact-frame">
          <Image src="/images/workshop-contact.webp" alt="Componentes de automoción ilustrativos en un taller industrial" fill sizes="(max-width: 760px) 100vw, 85vw" />
          <span className="story-contact-note">Imágenes ilustrativas</span>
          <div className="story-contact-card">
            <h2 id="story-contact-title">Hablemos de lo que le mueve.</h2>
            <p>Díganos qué pieza necesita, adónde se dirige y cuál es el siguiente paso de su proyecto.</p>
            <div className="story-contact-actions">
              <div>
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={23} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={23} aria-hidden="true" /></a>
              </div>
              <Link href="/es/contact/">Contacte con nosotros <ArrowRightIcon size={22} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <StoryChapters />
    </>
  );
}
