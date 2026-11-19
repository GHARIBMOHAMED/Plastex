import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import ScrollFillHeadline from "../../scroll-fill-headline";
import LogisticsPrism from "./logistics-prism";

export const metadata: Metadata = {
  title: "Logística",
  description:
    "Prepare una consulta clara sobre el suministro de componentes de freno y embrague con Plastex Maroc en Tánger: productos, volúmenes, mercados de destino y plazos.",
  alternates: { canonical: "/es/expertise/logistics/", languages: { fr: "/expertise/logistics/", en: "/en/expertise/logistics/", es: "/es/expertise/logistics/" } },
  openGraph: { locale: "es_ES",
    title: "Logística | Plastex Maroc",
    description:
      "Un diálogo práctico sobre logística para compradores de componentes de freno y embrague de Europa, Asia y África.",
  },
};

const relatedProducts = [
  { title: "Discos de freno", href: "/es/brake-discs/", image: "/images/brake-scene.webp", alt: "Primer plano ilustrativo de un disco de freno" },
  { title: "Discos de embrague", href: "/es/clutch-discs/", image: "/images/clutch-scene.webp", alt: "Primer plano ilustrativo de un disco de embrague" },
  { title: "Tambores de freno", href: "/es/brake-drums/", image: "/images/drum-scene.webp", alt: "Primer plano ilustrativo de un tambor de freno" },
] as const;

export default function LogisticsPage() {
  return (
    <>
      <section className="logistics-hero" data-enter aria-labelledby="logistics-title">
        <div className="container logistics-hero-layout">
          <div className="logistics-hero-copy">
            <span className="logistics-hero-eyebrow">PLASTEX MAROC / LOGÍSTICA</span>
            <h1 id="logistics-title">Logística<br />desde Tánger.</h1>
            <div className="logistics-hero-bottom">
              <p>Un diálogo claro sobre suministro empieza con los datos adecuados.</p>
              <Link href="/es/contact/">Consultar el suministro <ArrowRightIcon size={21} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="logistics-hero-visual">
            <LogisticsPrism />
          </div>
        </div>
      </section>

      <section className="logistics-intro" aria-labelledby="logistics-intro-title">
        <div className="container logistics-intro-grid">
          <div className="logistics-intro-statement">
            <h2 id="logistics-intro-title">Una buena logística empieza antes de que el componente salga de Tánger. El producto, la cantidad, el destino y los plazos importan.</h2>
          </div>
          <div className="logistics-intro-aside">
            <p>De la producción al suministro</p>
            <nav aria-label="Explorar la experiencia de Plastex">
              <Link href="/es/expertise/production/">Producción propia</Link>
              <span aria-current="page">Logística</span>
              <Link href="/es/expertise/transport/">Transport</Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="logistics-planning" aria-labelledby="logistics-planning-title">
        <div className="container logistics-planning-grid">
          <div className="logistics-planning-copy">
            <span>01 / PLANIFICACIÓN DEL SUMINISTRO</span>
            <h2 id="logistics-planning-title">Planificar a partir del componente.</h2>
            <p>Indíquenos qué discos de freno, discos de embrague o tambores necesita, el volumen previsto y el mercado de destino. Añada los plazos deseados y cualquier requisito de embalaje o documentación que conozca.</p>
            <p>Estos datos permiten a nuestro equipo hablar de disponibilidad y de los siguientes pasos de su consulta.</p>
            <Link href="/es/contact/">Hablemos de sus necesidades <ArrowRightIcon size={22} aria-hidden="true" /></Link>
          </div>
          <div className="logistics-planning-image">
            <Image src="/images/workshop-contact.webp" alt="Escena ilustrativa de almacenamiento y preparación de componentes" fill sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <div className="logistics-dark-close">
        <section className="logistics-statement" aria-labelledby="logistics-statement-title">
          <div className="container logistics-statement-grid">
            <div className="logistics-statement-copy">
              <ScrollFillHeadline id="logistics-statement-title" text="El componente adecuado importa. También importa saber dónde, cuándo y cómo debe llegar." />
            </div>
          </div>
        </section>
        <section className="contact-photo-section logistics-contact" aria-labelledby="logistics-contact-title">
          <div className="container contact-photo-frame">
            <Image
              src="/images/dispatch-contact.png"
              alt="Trabajador ilustrativo asegurando la carga de un camión junto a un almacén"
              fill
              sizes="(max-width: 760px) 100vw, 85vw"
            />
            <div className="contact-photo-card">
              <div className="contact-card-heading">
                <h2 id="logistics-contact-title">Planifiquemos el siguiente paso.</h2>
                <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
              </div>
              <p>Envíenos las referencias, cantidades y el destino. Nuestro equipo de Tánger podrá hablar con usted de los requisitos de suministro.</p>
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
      </div>

      <section className="logistics-related" aria-labelledby="logistics-related-title">
        <div className="container">
          <div className="logistics-related-heading">
            <h2 id="logistics-related-title">Explore nuestros componentes.</h2>
            <Link href="/es/expertise/production/">Conozca nuestro trabajo <ArrowRightIcon size={20} aria-hidden="true" /></Link>
          </div>
          <div className="logistics-related-grid">
            {relatedProducts.map((product) => (
              <Link className="logistics-related-card" href={product.href} key={product.href}>
                <Image src={product.image} alt={product.alt} fill sizes="(max-width: 760px) 100vw, 28vw" />
                <span className="logistics-related-label">{product.title}<span aria-hidden="true"><ArrowRightIcon size={23} /></span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
