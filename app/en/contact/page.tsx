import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { productLinks } from "../data";
import ContactEnquiryForm from "./contact-enquiry-form";

export const metadata: Metadata = {
  title: "Contact Our Commercial Team",
  description:
    "Contact Plastex Maroc in Tangier about brake discs, clutch discs, brake drums, brake pads, and international sourcing enquiries.",
  alternates: { canonical: "/en/contact/", languages: { fr: "/contact/", en: "/en/contact/" } },
};

export default function ContactPage() {
  return (
    <>
      <section className="reference-product-hero reference-contact-hero" data-enter aria-labelledby="contact-page-title">
        <Image className="reference-contact-hero-image" src="/images/dispatch-contact.png" alt="" fill priority sizes="100vw" />
        <div className="container reference-product-hero-inner">
          <h1 id="contact-page-title">Get in<br />touch.</h1>
          <p className="reference-product-tagline">A direct line to our team in Tangier.</p>
          <div className="reference-hero-contact">
            <span>Start a product enquiry</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Illustrative image</span>
      </section>

      <section className="reference-product-intro" aria-labelledby="contact-intro-title">
        <div className="container reference-product-intro-grid">
          <div className="reference-product-aside">
            <span>Talk to us about</span>
            <nav aria-label="Product enquiries">
              {productLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </nav>
          </div>
          <div className="reference-product-statement">
            <h2 id="contact-intro-title">Share the part, application, volume, and destination market. We’ll take the conversation from there.</h2>
            <p>Our commercial team handles brake and clutch component enquiries from professional buyers in Europe, Asia, and Africa.</p>
            <a className="reference-product-button" href="#enquiry">Write to our team <ArrowRightIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="reference-contact-details-section" id="enquiry" aria-labelledby="enquiry-title">
        <div className="container reference-contact-details-grid">
          <div className="reference-contact-form-column">
            <span className="reference-contact-overline">01 / ENQUIRY</span>
            <h2 id="enquiry-title">Tell us what<br />you need.</h2>
            <p>Include a drawing or reference in your email if you have one. We can discuss technical requirements and supply from there.</p>
            <ContactEnquiryForm />
          </div>
          <aside className="reference-contact-address" aria-label="Company contact details">
            <span className="reference-contact-overline">02 / CONTACT DETAILS</span>
            <h2>Plastex Maroc<br />Tangier, Morocco.</h2>
            <div className="reference-contact-address-list">
              <div><span>Email</span><a href="mailto:commercial@plastexmaroc.com">commercial@plastexmaroc.com</a></div>
              <div><span>Phone</span><a href="tel:+212539351136">+212 539 351 136</a></div>
              <div><span>Address</span><p>Z.I. Route de Tétouan, lot 46<br />90000 Tangier, Morocco</p></div>
            </div>
            <div className="reference-contact-address-image">
              <Image src="/images/workshop-contact.webp" alt="Illustrative industrial workshop with braking components" fill sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
