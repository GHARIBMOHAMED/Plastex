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
  title: "Producción propia",
  description:
    "Conozca la fabricación de productos de fricción para frenos y embragues, el ensamblaje de discos de embrague y el semiacabado de tambores de freno de Plastex Maroc en Tánger.",
  alternates: { canonical: "/es/expertise/production/", languages: { fr: "/expertise/production/", en: "/en/expertise/production/", es: "/es/expertise/production/" } },
  openGraph: { locale: "es_ES",
    title: "Producción propia | Plastex Maroc",
    description:
      "Conozca la producción y el suministro de componentes de Plastex Maroc en Tánger.",
  },
};

export default function ProductionPage() {
  return (
    <>
      <section className="reference-product-hero production-hero" data-enter aria-labelledby="production-title">
        <Image
          className="production-hero-image"
          src="/images/factory-film.webp"
          alt="Escena ilustrativa de producción de componentes de freno"
          fill
          priority
          sizes="100vw"
        />
        <div className="container reference-product-hero-inner">
          <h1 id="production-title">Producción<br />propia.</h1>
          <p className="reference-product-tagline">Productos de fricción para frenos y embragues fabricados en Tánger.</p>
          <div className="reference-hero-contact">
            <span>¿Quiere consultar sobre un componente?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Imágenes ilustrativas</span>
      </section>

      <section className="production-intro" aria-labelledby="production-intro-title">
        <div className="container production-intro-grid">
          <div className="production-intro-copy">
            <h2 id="production-intro-title">Producción cerca de quienes conocen cada pieza.</h2>
            <p>Plastex Maroc fabrica productos de fricción para frenos y embragues en Tánger y ensambla discos de embrague. También realiza trabajos de semiacabado en los tambores de freno que suministra.</p>
            <p>Indíquenos la aplicación, una referencia, un plano o el volumen previsto. Con estos datos, nuestro equipo podrá hablar con usted del componente y sus requisitos de suministro.</p>
          </div>
          <div className="production-intro-aside">
            <span>Seguir explorando</span>
            <Link href="/es/expertise/">Nuestra experiencia <ArrowRightIcon size={19} aria-hidden="true" /></Link>
            <Link href="/es/brake-discs/">Discos de freno <ArrowRightIcon size={19} aria-hidden="true" /></Link>
            <Link href="/es/clutch-discs/">Discos de embrague <ArrowRightIcon size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <ProductionSteps />

      <section className="production-quality" aria-labelledby="production-quality-title">
        <div className="container production-quality-grid">
          <div className="production-quality-aside">
            <span>CALIDAD / DOCUMENTACIÓN</span>
            <h2 id="production-quality-title">Consulte nuestras certificaciones.</h2>
            <div className="production-certifications"><span>TÜV</span><span>AFNOR</span></div>
          </div>
          <ScrollFillHeadline id="production-quality-statement" text="La calidad forma parte de toda conversación sobre suministro. Nuestro equipo puede facilitarle información sobre las certificaciones TÜV y AFNOR, incluidos su alcance y la documentación aplicable, cuando nos consulte." />
        </div>
      </section>

      <section className="contact-photo-section production-contact" aria-labelledby="production-contact-title">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Trabajador ilustrativo asegurando la carga de un camión junto a un almacén"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="production-contact-title">Hablemos de producción.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>Indíquenos qué componente de freno o embrague necesita, adónde se suministrará y qué información tiene. Continuaremos la conversación a partir de ahí.</p>
            <div className="contact-card-actions">
              <div className="contact-quick-links">
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
              </div>
              <Link href="/es/contact/" className="contact-card-main-link">Contacte con nuestro equipo <span><ArrowRightIcon size={25} aria-hidden="true" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
