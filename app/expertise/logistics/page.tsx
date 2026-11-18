import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import ScrollFillHeadline from "../../scroll-fill-headline";
import LogistiquePrism from "./logistics-prism";

export const metadata: Metadata = {
  title: "Logistique",
  description:
    "Préparez une demande claire d’approvisionnement en composants de freinage et d’embrayage avec Plastex Maroc à Tanger. Parlons des produits, volumes, marchés et délais.",
  alternates: { canonical: "/expertise/logistics/", languages: { fr: "/expertise/logistics/", en: "/en/expertise/logistics/" } },
  openGraph: { locale: "fr_MA",
    title: "Logistique | Plastex Maroc",
    description:
      "Un échange logistique concret pour les acheteurs de composants de freinage et d’embrayage en Europe, en Asie et en Afrique.",
  },
};

const relatedProducts = [
  { title: "Disques de frein", href: "/brake-discs/", image: "/images/brake-scene.webp", alt: "Gros plan illustratif d’un disque de frein" },
  { title: "Disques d’embrayage", href: "/clutch-discs/", image: "/images/clutch-scene.webp", alt: "Gros plan illustratif d’un disque d’embrayage" },
  { title: "Tambours de frein", href: "/brake-drums/", image: "/images/drum-scene.webp", alt: "Gros plan illustratif d’un tambour de frein" },
] as const;

export default function LogistiquePage() {
  return (
    <>
      <section className="logistics-hero" data-enter aria-labelledby="logistics-title">
        <div className="container logistics-hero-layout">
          <div className="logistics-hero-copy">
            <span className="logistics-hero-eyebrow">PLASTEX MAROC / LOGISTIQUE</span>
            <h1 id="logistics-title">Logistique<br />depuis Tanger.</h1>
            <div className="logistics-hero-bottom">
              <p>Un échange clair sur l’approvisionnement commence par les bonnes informations.</p>
              <Link href="/contact/">Parler de l’approvisionnement <ArrowRightIcon size={21} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="logistics-hero-visual">
            <LogistiquePrism />
          </div>
        </div>
      </section>

      <section className="logistics-intro" aria-labelledby="logistics-intro-title">
        <div className="container logistics-intro-grid">
          <div className="logistics-intro-statement">
            <h2 id="logistics-intro-title">Une bonne logistique commence avant même qu’une pièce quitte Tanger. Produit, quantité, destination et calendrier : chaque détail compte.</h2>
          </div>
          <div className="logistics-intro-aside">
            <p>De la production à l’approvisionnement</p>
            <nav aria-label="Découvrir l’expertise Plastex">
              <Link href="/expertise/production/">Production en interne</Link>
              <span aria-current="page">Logistique</span>
              <Link href="/expertise/transport/">Transport</Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="logistics-planning" aria-labelledby="logistics-planning-title">
        <div className="container logistics-planning-grid">
          <div className="logistics-planning-copy">
            <span>01 / PLANIFICATION</span>
            <h2 id="logistics-planning-title">Planifier autour du composant.</h2>
            <p>Précisez les disques de frein, disques d’embrayage ou tambours recherchés, le volume prévu et le marché de destination. Ajoutez votre calendrier ainsi que les besoins connus en emballage ou en documentation.</p>
            <p>Ces éléments donnent à notre équipe une base concrète pour discuter de la disponibilité et des étapes suivantes.</p>
            <Link href="/contact/">Parler de votre besoin <ArrowRightIcon size={22} aria-hidden="true" /></Link>
          </div>
          <div className="logistics-planning-image">
            <Image src="/images/workshop-contact.webp" alt="Scène illustrative de stockage et de préparation des composants" fill sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <div className="logistics-dark-close">
        <section className="logistics-statement" aria-labelledby="logistics-statement-title">
          <div className="container logistics-statement-grid">
            <div className="logistics-statement-copy">
              <ScrollFillHeadline id="logistics-statement-title" text="La bonne pièce compte. Savoir où, quand et comment elle doit arriver compte tout autant." />
            </div>
          </div>
        </section>
        <section className="contact-photo-section logistics-contact" aria-labelledby="logistics-contact-title">
          <div className="container contact-photo-frame">
            <Image
              src="/images/dispatch-contact.png"
              alt="Opérateur illustratif sécurisant un camion devant un entrepôt"
              fill
              sizes="(max-width: 760px) 100vw, 85vw"
            />
            <div className="contact-photo-card">
              <div className="contact-card-heading">
                <h2 id="logistics-contact-title">Planifions la prochaine étape.</h2>
                <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
              </div>
              <p>Transmettez-nous les références, quantités et destinations. Notre équipe de Tanger pourra discuter avec vous des besoins d’approvisionnement.</p>
              <div className="contact-card-actions">
                <div className="contact-quick-links">
                  <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                  <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
                </div>
                <Link href="/contact/" className="contact-card-main-link">Contacter notre équipe <span><ArrowRightIcon size={25} aria-hidden="true" /></span></Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="logistics-related" aria-labelledby="logistics-related-title">
        <div className="container">
          <div className="logistics-related-heading">
            <h2 id="logistics-related-title">Découvrez nos composants.</h2>
            <Link href="/expertise/production/">Voir comment nous travaillons <ArrowRightIcon size={20} aria-hidden="true" /></Link>
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
