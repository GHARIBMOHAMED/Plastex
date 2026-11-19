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
    "Discutez des besoins de transport des composants de freinage et d’embrayage Plastex Maroc depuis Tanger vers l’Europe, l’Asie et l’Afrique.",
  alternates: { canonical: "/expertise/transport/", languages: { fr: "/expertise/transport/", en: "/en/expertise/transport/", es: "/es/expertise/transport/" } },
  openGraph: { locale: "fr_MA",
    title: "Transport | Plastex Maroc",
    description:
      "Précisez la destination, le calendrier et la documentation nécessaires à votre demande d’approvisionnement.",
  },
};

export default function TransportPage() {
  return (
    <>
      <section className="reference-product-hero transport-hero" data-enter aria-labelledby="transport-title">
        <Image
          className="transport-hero-image"
          src="/images/transport-hero.webp"
          alt="Camion et chariot élévateur illustratifs dans une zone de chargement"
          fill
          priority
          sizes="100vw"
        />
        <div className="container reference-product-hero-inner">
          <h1 id="transport-title">Le transport<br />en mouvement.</h1>
          <p className="reference-product-tagline">Un itinéraire clair commence par les bonnes informations sur la pièce.</p>
          <div className="reference-hero-contact">
            <span>Vous souhaitez parler d’une livraison?</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Images d’illustration</span>
      </section>

      <section className="transport-statement" aria-labelledby="transport-statement-title">
        <div className="container transport-statement-inner">
          <ScrollFillHeadline
            id="transport-statement-title"
            text="D’une première demande à un approvisionnement régulier, indiquez-nous où les pièces doivent être livrées."
          />
          <span className="transport-statement-circle" aria-hidden="true" />
        </div>
      </section>

      <section className="transport-yard" aria-label="Environnement de transport">
        <div className="container transport-yard-frame">
          <Image
            src="/images/hero-aerial.webp"
            alt="Vue aérienne illustrative d’un site logistique industriel près de Tanger"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
        </div>
      </section>

      <section className="transport-detail" aria-labelledby="transport-detail-title">
        <div className="container transport-detail-grid">
          <div className="transport-detail-copy">
            <h2 id="transport-detail-title">La destination fait partie des spécifications.</h2>
            <p>Indiquez la référence du produit, la quantité, la destination et le calendrier souhaité. Si vous connaissez les besoins d’emballage ou de documentation de votre expédition, ajoutez-les. Ces précisions nous aideront à discuter des étapes suivantes.</p>
          </div>
          <nav className="transport-detail-links" aria-label="Découvrir notre expertise">
            <Link href="/expertise/production/">Production en interne</Link>
            <Link href="/expertise/logistics/">Logistique</Link>
            <span aria-current="page">Transport</span>
          </nav>
        </div>
      </section>

      <section className="contact-photo-section transport-contact" aria-labelledby="transport-contact-title">
        <div className="container contact-photo-frame">
          <Image
            src="/images/dispatch-contact.png"
            alt="Opérateur illustratif sécurisant un camion devant un entrepôt"
            fill
            sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="contact-photo-card">
            <div className="contact-card-heading">
              <h2 id="transport-contact-title">Planifions la prochaine étape.</h2>
              <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
            </div>
            <p>Transmettez-nous les références, quantités, destinations et délais souhaités. Nous discuterons des besoins de votre demande.</p>
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
    </>
  );
}
