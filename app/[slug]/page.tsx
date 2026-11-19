import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { notFound } from "next/navigation";
import { Arrow } from "../components";
import { products } from "../data";
import { BrakeProcessSlider, ProductGallery, type ProductGalleryImage } from "../product-interactions";
import ScrollFillHeadline from "../scroll-fill-headline";

type Slug = keyof typeof products;

const productContent: Record<Slug, { image: string; alt: string; introduction: string; supporting: string; note: string }> = {
  "brake-discs": {
    image: "/images/brake-disc-cutout.png",
    alt: "Illustration d’un disque de frein argenté",
    introduction: "Une demande de disque de frein commence par l’application, les dimensions et les besoins d’approvisionnement.",
    supporting: "Nous fabriquons des composants de freinage à Tanger et échangeons avec les acheteurs professionnels à partir de leurs spécifications. Transmettez-nous votre référence ou votre plan ainsi que les volumes souhaités.",
    note: "La fabrication et l’approvisionnement en disques de frein commencent par un cahier des charges clair.",
  },
  "clutch-discs": {
    image: "/images/clutch-lining-cutout.png",
    alt: "Illustration d’une garniture de friction d’embrayage tissée",
    introduction: "Des produits de friction pour embrayages, fabriqués et assemblés à Tanger.",
    supporting: "Plastex Maroc fabrique des produits de friction pour embrayages et assemble des disques d’embrayage. Indiquez-nous l’application, la référence et le marché de destination pour engager un échange précis.",
    note: "La bonne discussion commence par votre application d’embrayage.",
  },
  "brake-drums": {
    image: "/images/brake-drum-cutout.png",
    alt: "Illustration d’un tambour de frein noir à face argentée",
    introduction: "Les tambours de frein font partie de notre offre, avec des opérations de semi-finition réalisées à Tanger.",
    supporting: "Plastex Maroc revend des tambours de frein et réalise des opérations de semi-finition. Transmettez-nous l’application et les exigences techniques afin que notre équipe étudie la solution d’approvisionnement.",
    note: "L’approvisionnement en tambours de frein dépend de la pièce et du marché visés.",
  },
  "brake-pads": {
    image: "/images/brake-pads-cutout.png",
    alt: "Illustration de deux plaquettes de frein",
    introduction: "Une demande de plaquettes de frein commence par une référence précise et son application.",
    supporting: "Transmettez la référence, la quantité prévue et le marché de destination à notre équipe de Tanger. Nous étudierons votre demande et les possibilités d’approvisionnement.",
    note: "Une demande de plaquettes de frein pertinente commence par la pièce recherchée.",
  },
};

const galleryContent: Record<Slug, { title: string; copy: string; images: ProductGalleryImage[]; statement: string }> = {
  "brake-discs": {
    title: "Les disques de frein de plus près.",
    copy: "Commencez par la pièce, puis précisez l’application et les dimensions. Les vues d’atelier sont illustratives; transmettez votre référence ou votre plan pour une demande précise.",
    images: [
      { src: "/images/brake-disc-cutout.png", alt: "Illustration d’un disque de frein argenté", kind: "cutout" },
      { src: "/images/brake-scene.webp", alt: "Illustration de disques de frein dans un atelier", kind: "scene" },
      { src: "/images/brake-film.webp", alt: "Illustration d’un usinage de disque de frein", kind: "scene" },
    ],
    statement: "Une application claire, la bonne référence et un plan d’approvisionnement réaliste rendent chaque échange sur les disques de frein plus utile.",
  },
  "clutch-discs": {
    title: "La friction au centre.",
    copy: "Découvrez une garniture de friction d’embrayage et des scènes d’atelier illustratives. Parlez-nous du disque assemblé et de l’application recherchée.",
    images: [
      { src: "/images/clutch-lining-cutout.png", alt: "Illustration d’une garniture annulaire de friction tissée", kind: "cutout" },
      { src: "/images/clutch-scene.webp", alt: "Illustration d’un composant d’embrayage dans un atelier", kind: "scene" },
      { src: "/images/workshop-contact.webp", alt: "Illustration d’un atelier de composants automobiles", kind: "scene" },
    ],
    statement: "L’expertise en friction et l’assemblage se rejoignent lorsque l’application d’embrayage est comprise dès le départ.",
  },
  "brake-drums": {
    title: "Une offre de freinage élargie.",
    copy: "Découvrez une illustration de tambour de frein et un contexte de production illustratif. Plastex Maroc revend des tambours de frein et réalise des opérations de semi-finition.",
    images: [
      { src: "/images/brake-drum-cutout.png", alt: "Illustration d’un tambour de frein noir à face argentée", kind: "cutout" },
      { src: "/images/drum-scene.webp", alt: "Illustration d’un tambour de frein dans un atelier", kind: "scene" },
      { src: "/images/factory-film.webp", alt: "Illustration d’un atelier de composants automobiles", kind: "scene" },
    ],
    statement: "Les opérations de semi-finition et un approvisionnement réfléchi intègrent les tambours de frein à une offre plus large.",
  },
  "brake-pads": {
    title: "Les plaquettes de frein en détail.",
    copy: "Commencez par la référence de la plaquette, la quantité et la destination. Les vues d’atelier et d’expédition sont illustratives.",
    images: [
      { src: "/images/brake-pads-cutout.png", alt: "Illustration de deux plaquettes de frein", kind: "cutout" },
      { src: "/images/workshop-contact.webp", alt: "Illustration d’un atelier de composants automobiles", kind: "scene" },
      { src: "/images/dispatch-contact.png", alt: "Illustration d’une scène d’expédition", kind: "scene" },
    ],
    statement: "Chaque demande de plaquettes de frein commence par la référence, l’application et le marché de destination.",
  },
};

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug as Slug];
  if (!product) return {};
  return {
    title: { absolute: product.seo },
    description: product.description,
    alternates: { canonical: `/${slug}/`, languages: { fr: `/${slug}/`, en: `/en/${slug}/`, es: `/es/${slug}/` } },
    openGraph: { locale: "fr_MA", title: product.seo, description: product.description },
  };
}

function ProductContactScene({ name }: { name: string }) {
  return (
    <section className="reference-contact-scene" aria-labelledby="reference-contact-heading">
      <div className="container reference-contact-frame">
        <Image src="/images/dispatch-contact.png" alt="Illustration d’un opérateur sécurisant un camion de transport" fill sizes="85vw" />
        <div className="reference-contact-card">
          <h2 id="reference-contact-heading">Parlons de {name.toLowerCase()}.</h2>
          <p>Vous avez une référence, un plan ou un volume en tête? Notre équipe de Tanger peut vous aider à avancer.</p>
          <div className="reference-contact-actions">
            <div>
              <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
              <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
            </div>
            <Link href="/contact/">Contacter notre équipe <span><ArrowRightIcon size={23} aria-hidden="true" /></span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug as Slug];
  if (!product) notFound();
  const content = productContent[slug as Slug];
  const gallery = galleryContent[slug as Slug];
  const [first, ...rest] = product.name.split(" ");

  return (
    <>
      <section className="reference-product-hero" data-enter aria-labelledby="product-page-title">
        <div className="reference-product-cutout"><Image src={content.image} alt={content.alt} fill sizes="(max-width: 760px) 100vw, 55vw" priority /></div>
        <div className="container reference-product-hero-inner">
          <h1 id="product-page-title">{first}<br />{rest.join(" ")}</h1>
          <p className="reference-product-tagline">{product.headline}</p>
          <div className="reference-hero-contact">
            <span>Parlez-nous de {product.name.toLowerCase()}</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Écrire à Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Appeler Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Image produit illustrative</span>
      </section>

      <section className="reference-product-intro" aria-labelledby="product-intro-heading">
        <div className="container reference-product-intro-grid">
          <div className="reference-product-aside">
            <span>En savoir plus sur Plastex?</span>
            <nav aria-label="Découvrir Plastex Maroc">
              <Link href="/our-story/">Notre histoire</Link>
              <Link href="/expertise/">Notre expertise</Link>
              <Link href="/faq/">Questions fréquentes</Link>
            </nav>
          </div>
          <div className="reference-product-statement">
            <h2 id="product-intro-heading">{content.introduction}</h2>
            <p>{content.supporting}</p>
            <Link href="/contact/" className="reference-product-button">Parler de votre besoin <Arrow /></Link>
          </div>
        </div>
      </section>

      <ProductGallery name={product.name} title={gallery.title} description={gallery.copy} images={gallery.images} />

      {slug === "brake-discs" && <BrakeProcessSlider />}

      <section className="product-story-statement" aria-labelledby="product-story-statement-heading">
        <div className="container product-story-statement-grid">
          <ScrollFillHeadline id="product-story-statement-heading" text={gallery.statement} />
          <aside>
            <h3>Découvrir notre expertise</h3>
            <nav aria-label="Découvrir l’expertise Plastex">
              <Link href="/expertise/production/">Production</Link>
              <Link href="/expertise/logistics/">Logistique</Link>
              <Link href="/expertise/transport/">Transport</Link>
            </nav>
          </aside>
        </div>
      </section>

      <section className="reference-product-proof" aria-labelledby="reference-product-proof-heading">
        <div className="container reference-product-proof-grid">
          <div><span>Échanges sur la qualité</span><p>Les détails et la portée des certificats TÜV et AFNOR sont disponibles auprès de notre équipe sur demande.</p><Link href="/contact/">Demander la documentation <Arrow /></Link></div>
          <h2 id="reference-product-proof-heading">{content.note}</h2>
        </div>
      </section>
      <ProductContactScene name={product.name} />
    </>
  );
}
