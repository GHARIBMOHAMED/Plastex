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
    "Discuss transport requirements for Plastex Maroc brake and clutch components from Tangier to destination markets in Europe, Asia, and Africa.",
  alternates: { canonical: "/en/expertise/transport/", languages: { fr: "/expertise/transport/", en: "/en/expertise/transport/" } },
  openGraph: { locale: "en_US",
    title: "Transport | Plastex Maroc",
    description:
      "Plan the destination, timing, and documentation for a brake or clutch component supply enquiry.",
  },
};

export default function TransportPage() {
  return (
    <>
      <section className="reference-product-hero transport-hero" data-enter aria-labelledby="transport-title">
        <Image
          className="transport-hero-image"
          src="/images/transport-hero.webp"
          alt="Illustrative freight truck and forklift at an industrial loading bay"
          fill
          priority
          sizes="100vw"
        />
        <div className="container reference-product-hero-inner">
          <h1 id="transport-title">Transport<br />in motion.</h1>
          <p className="reference-product-tagline">A clear route starts with the right component details.</p>
          <div className="reference-hero-contact">
            <span>Discuss a delivery?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Illustrative imagery</span>
      </section>

      <section className="transport-statement" aria-labelledby="transport-statement-title">
        <div className="container transport-statement-inner">
          <ScrollFillHeadline
            id="transport-statement-title"
            text="From one component enquiry to a recurring supply need, tell us where the parts need to go."
          />
          <span className="transport-statement-circle" aria-hidden="true" />
        </div>
      </section>

      <section className="transport-yard" aria-label="Transport setting">
        <div className="container transport-yard-frame">
          <Image
            src="/images/hero-aerial.webp"
            alt="Illustrative aerial view of an industrial logistics site near Tangier"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
        </div>
      </section>

      <section className="transport-detail" aria-labelledby="transport-detail-title">
        <div className="container transport-detail-grid">
          <div className="transport-detail-copy">
            <h2 id="transport-detail-title">The destination is part of the specification.</h2>
            <p>Share the product reference, quantity, destination, and target timing. If you already know the packaging or documentation your shipment requires, include that too. These details help our team discuss the next steps for your supply enquiry.</p>
          </div>
          <nav className="transport-detail-links" aria-label="Explore our expertise">
            <Link href="/en/expertise/production/">In-house production</Link>
            <Link href="/en/expertise/logistics/">Logistics</Link>
            <span aria-current="page">Transport</span>
          </nav>
        </div>
      </section>

      <section className="contact-photo-section transport-contact" aria-labelledby="transport-contact-title">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Illustrative dispatch worker securing a cargo truck outside a warehouse"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="transport-contact-title">Let’s plan the next move.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>Send us your component references, quantities, destination, and timing. We’ll discuss what your supply request needs.</p>
            <div className="contact-card-actions">
              <div className="contact-quick-links">
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
              </div>
              <Link href="/en/contact/" className="contact-card-main-link">Contact our team <span><ArrowRightIcon size={25} aria-hidden="true" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
