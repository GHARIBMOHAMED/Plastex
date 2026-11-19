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
  title: "In-house Production",
  description:
    "Explore in-house brake and clutch friction product manufacturing, clutch disc assembly, and brake drum semi-finishing at Plastex Maroc in Tangier.",
  alternates: { canonical: "/es/expertise/production/", languages: { fr: "/expertise/production/", en: "/es/expertise/production/" } },
  openGraph: { locale: "es_ES",
    title: "In-house Production | Plastex Maroc",
    description:
      "A closer look at Plastex Maroc production and component supply in Tangier.",
  },
};

export default function ProductionPage() {
  return (
    <>
      <section className="reference-product-hero production-hero" data-enter aria-labelledby="production-title">
        <Image
          className="production-hero-image"
          src="/images/factory-film.webp"
          alt="Illustrative brake component production scene"
          fill
          priority
          sizes="100vw"
        />
        <div className="container reference-product-hero-inner">
          <h1 id="production-title">In-house<br />production.</h1>
          <p className="reference-product-tagline">Brake and clutch friction products made in Tangier.</p>
          <div className="reference-hero-contact">
            <span>Discuss a component?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Illustrative imagery</span>
      </section>

      <section className="production-intro" aria-labelledby="production-intro-title">
        <div className="container production-intro-grid">
          <div className="production-intro-copy">
            <h2 id="production-intro-title">Production close to the people who know the part.</h2>
            <p>Plastex Maroc manufactures brake and clutch friction products in Tangier and assembles clutch discs. We also carry out semi-finished work on the brake drums we supply.</p>
            <p>Start with an application, part reference, drawing, or expected volume. Our team can use those details to discuss the component and the supply requirements with you.</p>
          </div>
          <div className="production-intro-aside">
            <span>Explore further</span>
            <Link href="/es/expertise/">Our expertise <ArrowRightIcon size={19} aria-hidden="true" /></Link>
            <Link href="/es/brake-discs/">Brake discs <ArrowRightIcon size={19} aria-hidden="true" /></Link>
            <Link href="/es/clutch-discs/">Clutch discs <ArrowRightIcon size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <ProductionSteps />

      <section className="production-quality" aria-labelledby="production-quality-title">
        <div className="container production-quality-grid">
          <div className="production-quality-aside">
            <span>QUALITY / DOCUMENTATION</span>
            <h2 id="production-quality-title">Ask about our certifications.</h2>
            <div className="production-certifications"><span>TÜV</span><span>AFNOR</span></div>
          </div>
          <ScrollFillHeadline id="production-quality-statement" text="Quality questions are part of a useful sourcing conversation. Our team can provide details of the TÜV and AFNOR certifications, including the applicable scope and documentation, when you enquire." />
        </div>
      </section>

      <section className="contact-photo-section production-contact" aria-labelledby="production-contact-title">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Illustrative dispatch worker securing a cargo truck outside a warehouse"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="production-contact-title">Let’s talk production.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>Tell us which brake or clutch component you need, where it will be supplied, and what information you already have. We’ll take the conversation from there.</p>
            <div className="contact-card-actions">
              <div className="contact-quick-links">
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
              </div>
              <Link href="/es/contact/" className="contact-card-main-link">Contact our team <span><ArrowRightIcon size={25} aria-hidden="true" /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
