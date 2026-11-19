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
    alt: "Ilustración de un disco de freno plateado",
    introduction: "Una consulta sobre discos de freno comienza por la aplicación, las dimensiones y los requisitos de suministro.",
    supporting: "Fabricamos componentes de frenado en Tánger y trabajamos con compradores profesionales a partir de especificaciones técnicas. Comparta su referencia o plano y los volúmenes necesarios.",
    note: "La fabricación y el suministro de discos de freno empiezan con una definición técnica clara.",
  },
  "clutch-discs": {
    image: "/images/clutch-lining-cutout.png",
    alt: "Ilustración de un revestimiento anular de fricción para embrague",
    introduction: "Productos de fricción para embragues, fabricados y ensamblados en Tánger.",
    supporting: "Plastex Maroc fabrica productos de fricción para embragues y ensambla discos de embrague. Indíquenos la aplicación, la referencia y el mercado de destino para iniciar una consulta concreta.",
    note: "La conversación adecuada comienza por la aplicación del embrague.",
  },
  "brake-drums": {
    image: "/images/brake-drum-cutout.png",
    alt: "Ilustración de un tambor de freno negro con cara plateada",
    introduction: "Los tambores de freno forman parte de nuestra oferta, con trabajos de semiacabado realizados en Tánger.",
    supporting: "Plastex Maroc revende tambores de freno y realiza trabajos de semiacabado. Comparta la aplicación y los requisitos técnicos para que nuestro equipo estudie la vía de suministro adecuada.",
    note: "El suministro de tambores de freno se define según la pieza y el mercado necesarios.",
  },
  "brake-pads": {
    image: "/images/brake-pads-cutout.png",
    alt: "Ilustración de un par de pastillas de freno",
    introduction: "Una consulta sobre pastillas de freno comienza por una referencia y una aplicación claras.",
    supporting: "Comparta la referencia, la cantidad prevista y el mercado de destino con nuestro equipo de Tánger. Podremos revisar su solicitud y hablar de las opciones de suministro.",
    note: "Una consulta útil sobre pastillas de freno comienza por la pieza que necesita.",
  },
};

const galleryContent: Record<Slug, { title: string; copy: string; images: ProductGalleryImage[]; statement: string }> = {
  "brake-discs": {
    title: "Discos de freno, de cerca.",
    copy: "Empiece por el componente y después concrete la aplicación y las dimensiones. Las imágenes del taller son ilustrativas; comparta su referencia o plano para una consulta específica.",
    images: [
      { src: "/images/brake-disc-cutout.png", alt: "Disco de freno plateado ilustrativo", kind: "cutout" },
      { src: "/images/brake-scene.webp", alt: "Discos de freno ilustrativos en un taller", kind: "scene" },
      { src: "/images/brake-film.webp", alt: "Vista ilustrativa del mecanizado de un disco de freno", kind: "scene" },
    ],
    statement: "Una aplicación clara, la referencia correcta y un plan de suministro realista mejoran toda conversación sobre discos de freno.",
  },
  "clutch-discs": {
    title: "La fricción en el centro.",
    copy: "Vea un revestimiento de fricción para embrague junto a escenas ilustrativas del taller. Háblenos del disco ensamblado y de la aplicación que necesita.",
    images: [
      { src: "/images/clutch-lining-cutout.png", alt: "Revestimiento anular de fricción para embrague ilustrativo", kind: "cutout" },
      { src: "/images/clutch-scene.webp", alt: "Componente de embrague ilustrativo en un taller", kind: "scene" },
      { src: "/images/workshop-contact.webp", alt: "Taller ilustrativo de componentes de automoción", kind: "scene" },
    ],
    statement: "La experiencia en fricción y el ensamblaje se combinan cuando se conoce la aplicación del embrague desde el principio.",
  },
  "brake-drums": {
    title: "Una oferta de frenado más amplia.",
    copy: "Vea una ilustración de un tambor de freno y un contexto de producción ilustrativo. Plastex Maroc revende tambores de freno y realiza trabajos de semiacabado.",
    images: [
      { src: "/images/brake-drum-cutout.png", alt: "Tambor de freno negro con cara plateada ilustrativo", kind: "cutout" },
      { src: "/images/drum-scene.webp", alt: "Tambor de freno ilustrativo en un taller", kind: "scene" },
      { src: "/images/factory-film.webp", alt: "Taller ilustrativo de componentes de automoción", kind: "scene" },
    ],
    statement: "El semiacabado y una selección cuidadosa integran los tambores de freno en una oferta de frenado más amplia.",
  },
  "brake-pads": {
    title: "Pastillas de freno, en detalle.",
    copy: "Empiece por la referencia de la pastilla, la cantidad y el destino. Las imágenes del taller y del envío son ilustrativas.",
    images: [
      { src: "/images/brake-pads-cutout.png", alt: "Par de pastillas de freno ilustrativo", kind: "cutout" },
      { src: "/images/workshop-contact.webp", alt: "Taller ilustrativo de componentes de automoción", kind: "scene" },
      { src: "/images/dispatch-contact.png", alt: "Escena ilustrativa de expedición de mercancías", kind: "scene" },
    ],
    statement: "Cada consulta sobre pastillas de freno empieza por la referencia, la aplicación y el mercado de destino.",
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
    alternates: { canonical: `/es/${slug}/`, languages: { fr: `/${slug}/`, en: `/en/${slug}/`, es: `/es/${slug}/` } },
    openGraph: { locale: "es_ES", title: product.seo, description: product.description },
  };
}

function ProductContactScene({ name }: { name: string }) {
  return (
    <section className="reference-contact-scene" aria-labelledby="reference-contact-heading">
      <div className="container reference-contact-frame">
        <Image src="/images/dispatch-contact.png" alt="Trabajador ilustrativo asegurando la carga de un camión" fill sizes="85vw" />
        <div className="reference-contact-card">
          <h2 id="reference-contact-heading">Hablemos de {name.toLowerCase()}.</h2>
          <p>¿Tiene una referencia, un plano o un volumen previsto? Nuestro equipo de Tánger le ayudará a dar el siguiente paso.</p>
          <div className="reference-contact-actions">
            <div>
              <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
              <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
            </div>
            <Link href="/es/contact/">Contacte con nuestro equipo <span><ArrowRightIcon size={23} aria-hidden="true" /></span></Link>
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
            <span>Consúltenos sobre {product.name.toLowerCase()}</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Enviar correo a Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Llamar a Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Imagen de producto ilustrativa</span>
      </section>

      <section className="reference-product-intro" aria-labelledby="product-intro-heading">
        <div className="container reference-product-intro-grid">
          <div className="reference-product-aside">
            <span>¿Quiere saber más sobre Plastex?</span>
            <nav aria-label="Conozca Plastex Maroc">
              <Link href="/es/our-story/">Nuestra historia</Link>
              <Link href="/es/expertise/">Nuestra experiencia</Link>
              <Link href="/es/faq/">Preguntas frecuentes</Link>
            </nav>
          </div>
          <div className="reference-product-statement">
            <h2 id="product-intro-heading">{content.introduction}</h2>
            <p>{content.supporting}</p>
            <Link href="/es/contact/" className="reference-product-button">Hablemos de sus necesidades <Arrow /></Link>
          </div>
        </div>
      </section>

      <ProductGallery name={product.name} title={gallery.title} description={gallery.copy} images={gallery.images} />

      {slug === "brake-discs" && <BrakeProcessSlider />}

      <section className="product-story-statement" aria-labelledby="product-story-statement-heading">
        <div className="container product-story-statement-grid">
          <ScrollFillHeadline id="product-story-statement-heading" text={gallery.statement} />
          <aside>
            <h3>Explore nuestra experiencia</h3>
            <nav aria-label="Explore la experiencia de Plastex">
              <Link href="/es/expertise/production/">Producción</Link>
              <Link href="/es/expertise/logistics/">Logística</Link>
              <Link href="/es/expertise/transport/">Transporte</Link>
            </nav>
          </aside>
        </div>
      </section>

      <section className="reference-product-proof" aria-labelledby="reference-product-proof-heading">
        <div className="container reference-product-proof-grid">
          <div><span>Diálogo sobre calidad</span><p>Nuestro equipo puede facilitar los detalles y el alcance de los certificados TÜV y AFNOR bajo petición.</p><Link href="/es/contact/">Solicitar documentación <Arrow /></Link></div>
          <h2 id="reference-product-proof-heading">{content.note}</h2>
        </div>
      </section>
      <ProductContactScene name={product.name} />
    </>
  );
}
