import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { productLinks } from "../data";
import ContactEnquiryForm from "./contact-enquiry-form";

export const metadata: Metadata = {
  title: "Contacter notre équipe commerciale",
  description:
    "Contactez Plastex Maroc à Tanger pour vos demandes de disques de frein, disques d’embrayage, tambours, plaquettes et approvisionnement international.",
  alternates: { canonical: "/contact/", languages: { fr: "/contact/", en: "/en/contact/", es: "/es/contact/" } },
};

export default function ContactPage() {
  return (
    <>
      <section className="reference-product-hero reference-contact-hero" data-enter aria-labelledby="contact-page-title">
        <Image className="reference-contact-hero-image" src="/images/dispatch-contact.png" alt="" fill priority sizes="100vw" />
        <div className="container reference-product-hero-inner">
          <h1 id="contact-page-title">Prenez<br />contact.</h1>
          <p className="reference-product-tagline">Un lien direct avec notre équipe à Tanger.</p>
          <div className="reference-hero-contact">
            <span>Faire une demande de produit</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Image d’illustration</span>
      </section>

      <section className="reference-product-intro" aria-labelledby="contact-intro-title">
        <div className="container reference-product-intro-grid">
          <div className="reference-product-aside">
            <span>Parlons de</span>
            <nav aria-label="Demandes de produits">
              {productLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </nav>
          </div>
          <div className="reference-product-statement">
            <h2 id="contact-intro-title">Précisez la pièce, l’application, le volume et le marché de destination. Nous prendrons le relais.</h2>
            <p>Notre équipe commerciale répond aux demandes de composants de freinage et d’embrayage des acheteurs professionnels en Europe, en Asie et en Afrique.</p>
            <a className="reference-product-button" href="#enquiry">Écrire à notre équipe <ArrowRightIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="reference-contact-details-section" id="enquiry" aria-labelledby="enquiry-title">
        <div className="container reference-contact-details-grid">
          <div className="reference-contact-form-column">
            <span className="reference-contact-overline">01 / DEMANDE</span>
            <h2 id="enquiry-title">Dites-nous ce<br />qu’il vous faut.</h2>
            <p>Joignez un plan ou une référence à votre e-mail si vous en avez. Nous pourrons ensuite discuter des exigences techniques et de l’approvisionnement.</p>
            <ContactEnquiryForm />
          </div>
          <aside className="reference-contact-address" aria-label="Coordonnées de l’entreprise">
            <span className="reference-contact-overline">02 / COORDONNÉES</span>
            <h2>Plastex Maroc<br />Tanger, Maroc.</h2>
            <div className="reference-contact-address-list">
              <div><span>Email</span><a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a></div>
              <div><span>Téléphone</span><a href="tel:+212539351136">+212 539 351 136</a></div>
              <div><span>Adresse</span><p>Z.I. Route de Tétouan, lot 46<br />90000 Tanger, Maroc</p></div>
            </div>
            <div className="reference-contact-address-image">
              <Image src="/images/workshop-contact.webp" alt="Atelier industriel illustratif avec des composants de freinage" fill sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
