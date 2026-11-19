import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import ScrollFillHeadline from "../../scroll-fill-headline";

export const metadata: Metadata = {
  title: "Transport",
  description:
    "Consulte las necesidades de transporte de componentes de freno y embrague de Plastex Maroc desde Tánger hacia mercados de Europa, Asia y África.",
  alternates: { canonical: "/es/expertise/transport/", languages: { fr: "/expertise/transport/", en: "/en/expertise/transport/", es: "/es/expertise/transport/" } },
  openGraph: { locale: "es_ES",
    title: "Transport | Plastex Maroc",
    description:
      "Planifique el destino, los plazos y la documentación de una consulta sobre suministro de componentes de freno o embrague.",
  },
};

export default function TransportPage() {
  return (
    <>
      <section className="reference-product-hero transport-hero" data-enter aria-labelledby="transport-title">
        <Image
          className="transport-hero-image"
          src="/images/transport-hero.webp"
          alt="Camión y carretilla elevadora ilustrativos en un muelle de carga industrial"
          fill
          priority
          sizes="100vw"
        />
        <div className="container reference-product-hero-inner">
          <h1 id="transport-title">Transporte<br />en movimiento.</h1>
          <p className="reference-product-tagline">Una ruta clara empieza con los datos correctos del componente.</p>
          <div className="reference-hero-contact">
            <span>¿Quiere consultar una entrega?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Imágenes ilustrativas</span>
      </section>

      <section className="transport-statement" aria-labelledby="transport-statement-title">
        <div className="container transport-statement-inner">
          <ScrollFillHeadline
            id="transport-statement-title"
            text="Desde una consulta puntual hasta una necesidad de suministro recurrente, indíquenos adónde deben llegar las piezas."
          />
          <span className="transport-statement-circle" aria-hidden="true" />
        </div>
      </section>

      <section className="transport-yard" aria-label="Entorno de transporte">
        <div className="container transport-yard-frame">
          <Image
            src="/images/hero-aerial.webp"
            alt="Vista aérea ilustrativa de una instalación logística industrial cerca de Tánger"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
        </div>
      </section>

      <section className="transport-detail" aria-labelledby="transport-detail-title">
        <div className="container transport-detail-grid">
          <div className="transport-detail-copy">
            <h2 id="transport-detail-title">El destino forma parte de la especificación.</h2>
            <p>Comparta la referencia, la cantidad, el destino y los plazos previstos. Si conoce los requisitos de embalaje o documentación del envío, inclúyalos también. Estos datos ayudan a nuestro equipo a concretar los siguientes pasos.</p>
          </div>
          <nav className="transport-detail-links" aria-label="Explore nuestra experiencia">
            <Link href="/es/expertise/production/">Producción propia</Link>
            <Link href="/es/expertise/logistics/">Logística</Link>
            <span aria-current="page">Transport</span>
          </nav>
        </div>
      </section>

      <section className="contact-photo-section transport-contact" aria-labelledby="transport-contact-title">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Trabajador ilustrativo asegurando la carga de un camión junto a un almacén"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="transport-contact-title">Planifiquemos el siguiente paso.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>Envíenos las referencias, cantidades, destino y plazos. Hablaremos de los requisitos de su solicitud de suministro.</p>
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
