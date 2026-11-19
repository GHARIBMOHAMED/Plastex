import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { productLinks } from "../data";
import ContactEnquiryForm from "./contact-enquiry-form";

export const metadata: Metadata = {
  title: "Contacte con nuestro equipo comercial",
  description:
    "Contacte con Plastex Maroc en Tánger para consultar sobre discos de freno y embrague, tambores, pastillas y suministro internacional.",
  alternates: { canonical: "/es/contact/", languages: { fr: "/contact/", en: "/en/contact/", es: "/es/contact/" } },
};

export default function ContactPage() {
  return (
    <>
      <section className="reference-product-hero reference-contact-hero" data-enter aria-labelledby="contact-page-title">
        <Image className="reference-contact-hero-image" src="/images/dispatch-contact.png" alt="" fill priority sizes="100vw" />
        <div className="container reference-product-hero-inner">
          <h1 id="contact-page-title">Hablemos<br />de su proyecto.</h1>
          <p className="reference-product-tagline">Hable directamente con nuestro equipo de Tánger.</p>
          <div className="reference-hero-contact">
            <span>Iniciar una consulta sobre productos</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Imagen ilustrativa</span>
      </section>

      <section className="reference-product-intro" aria-labelledby="contact-intro-title">
        <div className="container reference-product-intro-grid">
          <div className="reference-product-aside">
            <span>Consúltenos sobre</span>
            <nav aria-label="Consultas sobre productos">
              {productLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </nav>
          </div>
          <div className="reference-product-statement">
            <h2 id="contact-intro-title">Indíquenos la pieza, la aplicación, el volumen y el mercado de destino. A partir de ahí, continuaremos la conversación.</h2>
            <p>Nuestro equipo comercial atiende consultas de compradores profesionales de componentes de freno y embrague en Europa, Asia y África.</p>
            <a className="reference-product-button" href="#enquiry">Escriba a nuestro equipo <ArrowRightIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="reference-contact-details-section" id="enquiry" aria-labelledby="enquiry-title">
        <div className="container reference-contact-details-grid">
          <div className="reference-contact-form-column">
            <span className="reference-contact-overline">01 / CONSULTA</span>
            <h2 id="enquiry-title">Cuéntenos qué<br />necesita.</h2>
            <p>Si dispone de un plano o una referencia, inclúyalo en su correo. Así podremos hablar de los requisitos técnicos y de suministro.</p>
            <ContactEnquiryForm />
          </div>
          <aside className="reference-contact-address" aria-label="Datos de contacto de la empresa">
            <span className="reference-contact-overline">02 / DATOS DE CONTACTO</span>
            <h2>Plastex Maroc<br />Tánger, Marruecos.</h2>
            <div className="reference-contact-address-list">
              <div><span>Correo electrónico</span><a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a></div>
              <div><span>Teléfono</span><a href="tel:+212539351136">+212 539 351 136</a></div>
              <div><span>Dirección</span><p>Z.I. Route de Tétouan, lot 46<br />90000 Tánger, Marruecos</p></div>
            </div>
            <div className="reference-contact-address-image">
              <Image src="/images/workshop-contact.webp" alt="Taller industrial ilustrativo con componentes de frenado" fill sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
