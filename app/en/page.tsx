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
  title: "Brake & Clutch Components from Tangier",
  description: "Plastex Maroc makes brake and clutch components in Tangier, uses solar energy to help reduce carbon emissions, and serves professional buyers across Europe, Asia, and Africa.",
  alternates: { canonical: "/en/", languages: { fr: "/", en: "/en/", es: "/es/" } },
};

export default function Home() {
  return (
    <>
      <section className="hero apc-inspired" data-enter>
        <HeroVideo source="/videos/plastex-home-hero.mp4" />
        <span className="hero-film-note">Illustrative footage</span>
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              Makers of brake
              <br />
              &amp; clutch components
            </h1>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>Made in Tangier.<br />Made for motion.</span>
          <span className="hero-scroll">SCROLL TO EXPLORE <ArrowDownIcon size={14} aria-hidden="true" /></span>
          <Link href="/en/contact/" className="hero-contact">A question for our team? <span><EnvelopeSimpleIcon size={22} /></span></Link>
        </div>
      </section>
      <section className="intro-section container">
        <div className="intro-grid">
          <div className="intro-statement">
            <ScrollFillHeadline id="home-intro-title" text="We make brake and clutch components. We also offer brake drums and brake pads for professional buyers." />
            <Link className="button-dark" href="#products">
              View our products <Arrow diagonal />
            </Link>
          </div>
          <div className="intro-aside">
            <h3>Our components</h3>
            <nav aria-label="Products from Plastex Maroc">
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
          <span className="section-index">04 / REACH</span>
        </div>
        <div className="reach-grid">
          <div>
            <h2>
              FROM TANGIER
              <br />
              <em>TO EVERYWHERE.</em>
            </h2>
            <p>
              Located at the meeting point of major trade routes, Plastex Maroc
              serves partners across Europe, Asia, and Africa.
            </p>
          </div>
          <div className="reach-graphic">
            <div className="reach-circle one" />
            <div className="reach-circle two" />
            <div className="reach-circle three" />
            <div className="reach-center">
              TANGIER
              <br />
              <span>35.76° N · 5.83° W</span>
            </div>
            <span className="reach-label europe">EUROPE</span>
            <span className="reach-label asia">ASIA</span>
            <span className="reach-label africa">AFRICA</span>
          </div>
        </div>
      </section>
      <section className="contact-photo-section" aria-labelledby="contact-photo-heading">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Illustrative dispatch worker securing a cargo truck outside a warehouse"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="contact-photo-heading">We’re here to help.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>
              Looking for brake or clutch components? Tell us the application,
              specifications, and volume you need. Our team in Tangier will help
              with your enquiry.
            </p>
            <div className="contact-card-actions">
              <div className="contact-quick-links">
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
              </div>
              <Link href="/en/contact/" className="contact-card-main-link">
                Contact our team <span><ArrowRightIcon size={25} aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
