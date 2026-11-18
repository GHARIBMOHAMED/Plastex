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
  title: "Notre expertise",
  description:
    "Découvrez l’expertise de Plastex Maroc dans les produits de friction pour freins et embrayages, les demandes techniques et l’approvisionnement international depuis Tanger.",
  alternates: { canonical: "/expertise/", languages: { fr: "/expertise/", en: "/en/expertise/" } },
  openGraph: { locale: "fr_MA",
    title: "Notre expertise | Plastex Maroc",
    description:
      "Fabrication, échanges techniques et approvisionnement international pour les acheteurs professionnels de composants de freinage et d’embrayage.",
  },
};

const capabilities = [
  {
    id: "production",
    number: "01",
    title: "Production",
    description:
      "Plastex Maroc fabrique des produits de friction pour freins et embrayages à Tanger et assemble des disques d’embrayage. Nous réalisons aussi des opérations de semi-finition sur les tambours de frein que nous revendons.",
    image: "/images/workshop-contact.webp",
    alt: "Atelier illustratif avec des composants de freinage et d’embrayage",
    href: "/expertise/production/",
    action: "Découvrir notre production",
    icon: FactoryIcon,
  },
  {
    id: "technical-dialogue",
    number: "02",
    title: "Échange technique",
    description:
      "Une demande utile commence par l’application, la référence, le plan et le volume prévu. Transmettez-nous les informations dont vous disposez et notre équipe étudiera vos besoins.",
    image: "/images/clutch-scene.webp",
    alt: "Gros plan illustratif d’un disque d’embrayage",
    href: "/clutch-discs/",
    action: "Découvrir les disques d’embrayage",
    icon: RulerIcon,
  },
  {
    id: "logistics",
    number: "03",
    title: "Logistique",
    description:
      "Nous travaillons avec des acheteurs professionnels en Europe, en Asie et en Afrique. Indiquez-nous le marché de destination et les composants recherchés pour engager un échange précis.",
    image: "/images/dispatch-contact.png",
    alt: "Opérateur illustratif près d’un camion de transport",
    href: "/expertise/logistics/",
    action: "Découvrir la logistique",
    icon: GlobeHemisphereWestIcon,
  },
  {
    id: "transport",
    number: "04",
    title: "Transport",
    description:
      "La référence, la quantité, la destination et le calendrier sont essentiels pour parler du transport. Communiquez ces éléments à notre équipe lors de la préparation de votre demande.",
    image: "/images/transport-hero.webp",
    alt: "Scène illustrative de chargement d’un camion dans une zone industrielle",
    href: "/expertise/transport/",
    action: "Découvrir le transport",
    icon: TruckIcon,
  },
] as const;

export default function ExpertisePage() {
  return (
    <>
      <section className="reference-product-hero expertise-hero" data-enter aria-labelledby="expertise-title">
        <HeroVideo source="/videos/plastex-hero.mp4" poster="/images/hero-aerial.webp" className="reference-product-film" />
        <div className="container reference-product-hero-inner">
          <h1 id="expertise-title">Notre<br />expertise.</h1>
          <p className="reference-product-tagline">Produits de friction et échanges techniques depuis Tanger.</p>
          <div className="reference-hero-contact">
            <span>Vous avez un projet?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Images d’illustration</span>
      </section>

      <section className="expertise-intro" aria-labelledby="expertise-intro-title">
        <div className="container expertise-intro-grid">
          <div className="expertise-intro-statement">
            <ScrollFillHeadline id="expertise-intro-title" text="De la première référence à un échange clair sur l’approvisionnement, chaque détail compte." />
          </div>
          <div className="expertise-intro-links">
            <p>Découvrez nos composants</p>
            <nav aria-label="Découvrir les produits">
              {productLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </nav>
          </div>
        </div>
      </section>

      <section className="expertise-services" aria-label="Savoir-faire de Plastex Maroc">
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
