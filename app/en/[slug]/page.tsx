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
    alt: "Silver brake disc rotor product illustration",
    introduction: "A brake disc enquiry starts with the application, dimensions, and supply requirements.",
    supporting: "We make braking components in Tangier and work with professional buyers on specification-led conversations. Share your reference or drawing and the volumes you need.",
    note: "Brake disc manufacturing and supply start with a clear technical brief.",
  },
  "clutch-discs": {
    image: "/images/clutch-lining-cutout.png",
    alt: "Woven annular clutch friction lining product illustration",
    introduction: "Friction products for clutch applications, made and assembled in Tangier.",
    supporting: "Plastex Maroc manufactures clutch friction products and assembles clutch discs. Tell us the application, part reference, and destination market to begin a focused enquiry.",
    note: "The right conversation begins with your clutch application.",
  },
  "brake-drums": {
    image: "/images/brake-drum-cutout.png",
    alt: "Black brake drum with silver face product illustration",
    introduction: "Brake drums are part of our offer, with semi-finished work carried out in Tangier.",
    supporting: "Plastex Maroc resells brake drums and carries out semi-finished work. Share the application and technical requirements so our team can review the right supply route.",
    note: "Brake drum sourcing is guided by the part and market you need.",
  },
  "brake-pads": {
    image: "/images/brake-pads-cutout.png",
    alt: "Pair of brake pads product illustration",
    introduction: "A brake pad enquiry begins with a clear part reference and application.",
    supporting: "Share the part reference, expected quantity, and destination market with our team in Tangier. We can review your request and discuss the available supply route.",
    note: "The right brake pad enquiry starts with the part you need.",
  },
};

const galleryContent: Record<Slug, { title: string; copy: string; images: ProductGalleryImage[]; statement: string }> = {
  "brake-discs": {
    title: "Brake discs, seen up close.",
    copy: "Start with the component, then discuss the application and dimensions. The workshop views are illustrative; share your reference or drawing for a specific enquiry.",
    images: [
      { src: "/images/brake-disc-cutout.png", alt: "Illustrative silver brake disc rotor", kind: "cutout" },
      { src: "/images/brake-scene.webp", alt: "Illustrative brake discs in a workshop", kind: "scene" },
      { src: "/images/brake-film.webp", alt: "Illustrative brake disc machining view", kind: "scene" },
    ],
    statement: "A clear application, the right reference, and a realistic supply plan make every brake disc conversation stronger.",
  },
  "clutch-discs": {
    title: "Friction at the centre.",
    copy: "See a clutch friction lining alongside illustrative workshop scenes. Tell us about the assembled disc and application you need.",
    images: [
      { src: "/images/clutch-lining-cutout.png", alt: "Illustrative woven annular clutch friction lining", kind: "cutout" },
      { src: "/images/clutch-scene.webp", alt: "Illustrative clutch component in a workshop", kind: "scene" },
      { src: "/images/workshop-contact.webp", alt: "Illustrative automotive component workshop", kind: "scene" },
    ],
    statement: "Friction expertise and assembly come together when the clutch application is understood from the start.",
  },
  "brake-drums": {
    title: "A wider braking offer.",
    copy: "View a brake drum illustration and illustrative production context. Plastex Maroc resells brake drums and carries out semi-finished work.",
    images: [
      { src: "/images/brake-drum-cutout.png", alt: "Illustrative black brake drum with silver face", kind: "cutout" },
      { src: "/images/drum-scene.webp", alt: "Illustrative brake drum in a workshop", kind: "scene" },
      { src: "/images/factory-film.webp", alt: "Illustrative automotive component workshop", kind: "scene" },
    ],
    statement: "Semi-finished work and thoughtful sourcing bring brake drums into a broader braking offer.",
  },
  "brake-pads": {
    title: "Brake pads in focus.",
    copy: "Begin with the pad reference, quantity, and destination. The supporting workshop and dispatch views are illustrative.",
    images: [
      { src: "/images/brake-pads-cutout.png", alt: "Illustrative pair of brake pads", kind: "cutout" },
      { src: "/images/workshop-contact.webp", alt: "Illustrative automotive component workshop", kind: "scene" },
      { src: "/images/dispatch-contact.png", alt: "Illustrative cargo dispatch scene", kind: "scene" },
    ],
    statement: "Every brake pad enquiry starts with the part reference, the application, and the market it needs to reach.",
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
    alternates: { canonical: `/en/${slug}/`, languages: { fr: `/${slug}/`, en: `/en/${slug}/` } },
    openGraph: { locale: "en_US", title: product.seo, description: product.description },
  };
}

function ProductContactScene({ name }: { name: string }) {
  return (
    <section className="reference-contact-scene" aria-labelledby="reference-contact-heading">
      <div className="container reference-contact-frame">
        <Image src="/images/dispatch-contact.png" alt="Illustrative dispatch worker securing a cargo truck" fill sizes="85vw" />
        <div className="reference-contact-card">
          <h2 id="reference-contact-heading">Let’s talk about {name.toLowerCase()}.</h2>
          <p>Have a part reference, drawing, or volume in mind? Our team in Tangier can help you take the next step.</p>
          <div className="reference-contact-actions">
            <div>
              <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
              <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
            </div>
            <Link href="/en/contact/">Contact our team <span><ArrowRightIcon size={23} aria-hidden="true" /></span></Link>
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
            <span>Ask us about {product.name.toLowerCase()}</span>
            <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={20} aria-hidden="true" /></a>
            <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <span className="reference-film-note">Illustrative product image</span>
      </section>

      <section className="reference-product-intro" aria-labelledby="product-intro-heading">
        <div className="container reference-product-intro-grid">
          <div className="reference-product-aside">
            <span>More about Plastex?</span>
            <nav aria-label="Learn about Plastex Maroc">
              <Link href="/en/our-story/">Our story</Link>
              <Link href="/en/expertise/">Our expertise</Link>
              <Link href="/en/faq/">Frequently asked questions</Link>
            </nav>
          </div>
          <div className="reference-product-statement">
            <h2 id="product-intro-heading">{content.introduction}</h2>
            <p>{content.supporting}</p>
            <Link href="/en/contact/" className="reference-product-button">Discuss your requirements <Arrow /></Link>
          </div>
        </div>
      </section>

      <ProductGallery name={product.name} title={gallery.title} description={gallery.copy} images={gallery.images} />

      {slug === "brake-discs" && <BrakeProcessSlider />}

      <section className="product-story-statement" aria-labelledby="product-story-statement-heading">
        <div className="container product-story-statement-grid">
          <ScrollFillHeadline id="product-story-statement-heading" text={gallery.statement} />
          <aside>
            <h3>Explore our expertise</h3>
            <nav aria-label="Explore Plastex expertise">
              <Link href="/en/expertise/production/">Production</Link>
              <Link href="/en/expertise/logistics/">Logistics</Link>
              <Link href="/en/expertise/transport/">Transport</Link>
            </nav>
          </aside>
        </div>
      </section>

      <section className="reference-product-proof" aria-labelledby="reference-product-proof-heading">
        <div className="container reference-product-proof-grid">
          <div><span>Quality conversations</span><p>TÜV and AFNOR certificate details and scope are available from our team on request.</p><Link href="/en/contact/">Ask for documentation <Arrow /></Link></div>
          <h2 id="reference-product-proof-heading">{content.note}</h2>
        </div>
      </section>
      <ProductContactScene name={product.name} />
    </>
  );
}
