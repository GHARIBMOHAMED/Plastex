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
  title: "Nuestra experiencia",
  description:
    "Conozca la experiencia de Plastex Maroc en productos de fricción para frenos y embragues, consultas técnicas y suministro internacional de componentes desde Tánger.",
  alternates: { canonical: "/es/expertise/", languages: { fr: "/expertise/", en: "/en/expertise/", es: "/es/expertise/" } },
  openGraph: { locale: "es_ES",
    title: "Nuestra experiencia | Plastex Maroc",
    description:
      "Fabricación, diálogo técnico y suministro internacional para compradores profesionales de componentes de freno y embrague.",
  },
};

const capabilities = [
  {
    id: "production",
    number: "01",
    title: "Producción",
    description:
      "Plastex Maroc fabrica productos de fricción para frenos y embragues en Tánger y ensambla discos de embrague. También realiza trabajos de semiacabado en los tambores de freno que revende.",
    image: "/images/workshop-contact.webp",
    alt: "Taller ilustrativo con componentes de freno y embrague",
    href: "/es/expertise/production/",
    action: "Conozca la producción propia",
    icon: FactoryIcon,
  },
  {
    id: "technical-dialogue",
    number: "02",
    title: "Diálogo técnico",
    description:
      "Una consulta útil empieza por la aplicación, la referencia, un plano y el volumen previsto. Comparta la información disponible y nuestro equipo podrá estudiar sus necesidades.",
    image: "/images/clutch-scene.webp",
    alt: "Primer plano ilustrativo de un disco de embrague",
    href: "/es/clutch-discs/",
    action: "Explore los discos de embrague",
    icon: RulerIcon,
  },
  {
    id: "logistics",
    number: "03",
    title: "Logística",
    description:
      "Trabajamos con compradores profesionales de Europa, Asia y África. Indíquenos el mercado de destino y los componentes necesarios para iniciar una conversación concreta sobre suministro.",
    image: "/images/dispatch-contact.png",
    alt: "Trabajador ilustrativo junto a un camión de carga",
    href: "/es/expertise/logistics/",
    action: "Explore la logística",
    icon: GlobeHemisphereWestIcon,
  },
  {
    id: "transport",
    number: "04",
    title: "Transporte",
    description:
      "La referencia, la cantidad, el destino y los plazos son esenciales para hablar de transporte. Comparta esos datos con nuestro equipo al preparar su solicitud.",
    image: "/images/transport-hero.webp",
    alt: "Escena ilustrativa de carga de un camión en un recinto industrial",
    href: "/es/expertise/transport/",
    action: "Explore el transporte",
    icon: TruckIcon,
  },
] as const;

export default function ExpertisePage() {
  return (
    <>
      <section className="reference-product-hero expertise-hero" data-enter aria-labelledby="expertise-title">
        <HeroVideo source="/videos/plastex-hero.mp4" poster="/images/hero-aerial.webp" className="reference-product-film" />
        <div className="container reference-product-hero-inner">
          <h1 id="expertise-title">Nuestra<br />experiencia.</h1>
          <p className="reference-product-tagline">Productos de fricción y diálogo técnico desde Tánger.</p>
          <div className="reference-hero-contact">
            <span>¿Tiene un proyecto en mente?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Vídeo ilustrativo</span>
      </section>

      <section className="expertise-intro" aria-labelledby="expertise-intro-title">
        <div className="container expertise-intro-grid">
          <div className="expertise-intro-statement">
            <ScrollFillHeadline id="expertise-intro-title" text="Desde la primera referencia hasta un diálogo claro sobre suministro, cada detalle importa." />
          </div>
          <div className="expertise-intro-links">
            <p>Explore nuestros componentes</p>
            <nav aria-label="Explorar productos">
              {productLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </nav>
          </div>
        </div>
      </section>

      <section className="expertise-services" aria-label="Capacidades de Plastex Maroc">
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
