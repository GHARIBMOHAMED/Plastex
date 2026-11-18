import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  FactoryIcon,
  GlobeHemisphereWestIcon,
  PhoneIcon,
  RulerIcon,
  TruckIcon,
} from "@phosphor-icons/react/ssr";
import HeroVideo from "../hero-video";
import { productLinks } from "../data";
import ScrollFillHeadline from "../scroll-fill-headline";

export const metadata: Metadata = {
  title: "Our Expertise",
  description:
    "Explore Plastex Maroc expertise in brake and clutch friction products, application-led enquiries, and international component supply from Tangier.",
  alternates: { canonical: "/en/expertise/", languages: { fr: "/expertise/", en: "/en/expertise/" } },
  openGraph: { locale: "en_US",
    title: "Our Expertise | Plastex Maroc",
    description:
      "Manufacturing, product conversations, and international supply for professional brake and clutch component buyers.",
  },
};

const capabilities = [
  {
    id: "production",
    number: "01",
    title: "Production",
    description:
      "Plastex Maroc manufactures brake and clutch friction products in Tangier and assembles clutch discs. We also carry out semi-finished work on brake drums supplied through resale.",
    image: "/images/workshop-contact.webp",
    alt: "Illustrative workshop scene with brake and clutch components",
    href: "/en/expertise/production/",
    action: "Explore in-house production",
    icon: FactoryIcon,
  },
  {
    id: "technical-dialogue",
    number: "02",
    title: "Technical dialogue",
    description:
      "A useful enquiry starts with the application, part reference, drawing, and expected volume. Share what you have, and our team can discuss your component requirements with you.",
    image: "/images/clutch-scene.webp",
    alt: "Illustrative clutch disc close-up",
    href: "/en/clutch-discs/",
    action: "Explore clutch discs",
    icon: RulerIcon,
  },
  {
    id: "logistics",
    number: "03",
    title: "Logistics",
    description:
      "We work with professional buyers across Europe, Asia, and Africa. Tell us the destination market and the components you need so we can start a focused supply conversation.",
    image: "/images/dispatch-contact.png",
    alt: "Illustrative dispatch worker beside a cargo truck",
    href: "/en/expertise/logistics/",
    action: "Explore logistics",
    icon: GlobeHemisphereWestIcon,
  },
  {
    id: "transport",
    number: "04",
    title: "Transport",
    description:
      "Component reference, quantity, destination, and timing all shape a useful transport discussion. Share those details with our team as you plan your supply request.",
    image: "/images/transport-hero.webp",
    alt: "Illustrative truck loading scene at an industrial yard",
    href: "/en/expertise/transport/",
    action: "Explore transport",
    icon: TruckIcon,
  },
] as const;

export default function ExpertisePage() {
  return (
    <>
      <section className="reference-product-hero expertise-hero" data-enter aria-labelledby="expertise-title">
        <HeroVideo source="/videos/plastex-hero.mp4" poster="/images/hero-aerial.webp" className="reference-product-film" />
        <div className="container reference-product-hero-inner">
          <h1 id="expertise-title">Our<br />expertise.</h1>
          <p className="reference-product-tagline">Friction products and component conversations from Tangier.</p>
          <div className="reference-hero-contact">
            <span>Have a project in mind?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Illustrative footage</span>
      </section>

      <section className="expertise-intro" aria-labelledby="expertise-intro-title">
        <div className="container expertise-intro-grid">
          <div className="expertise-intro-statement">
            <ScrollFillHeadline id="expertise-intro-title" text="From the first part reference to a clearer supply conversation, every detail matters." />
          </div>
          <div className="expertise-intro-links">
            <p>Explore our components</p>
            <nav aria-label="Explore products">
              {productLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </nav>
          </div>
        </div>
      </section>

      <section className="expertise-services" aria-label="Plastex Maroc capabilities">
        <div className="container expertise-service-list">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <article className={`expertise-service ${index % 2 === 1 ? "is-reversed" : ""}`} id={capability.id} key={capability.id}>
                <div className="expertise-service-copy">
                  <div className="expertise-service-heading">
                    <div>
                      <span>{capability.number} / 04</span>
                      <h2>{capability.title}</h2>
                    </div>
                    <Icon size={42} weight="thin" aria-hidden="true" />
                  </div>
                  <p>{capability.description}</p>
                  <Link href={capability.href}>{capability.action} <ArrowRightIcon size={20} aria-hidden="true" /></Link>
                </div>
                <div className="expertise-service-image">
                  <Image src={capability.image} alt={capability.alt} fill sizes="(max-width: 760px) 100vw, 40vw" />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
