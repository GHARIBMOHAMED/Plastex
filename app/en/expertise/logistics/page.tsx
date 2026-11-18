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
  title: "Logistics",
  description:
    "Plan a clear brake and clutch component supply enquiry with Plastex Maroc in Tangier. Discuss products, volumes, destination markets, and timing.",
  alternates: { canonical: "/en/expertise/logistics/", languages: { fr: "/expertise/logistics/", en: "/en/expertise/logistics/" } },
  openGraph: { locale: "en_US",
    title: "Logistics | Plastex Maroc",
    description:
      "A practical logistics conversation for brake and clutch component buyers across Europe, Asia, and Africa.",
  },
};

const relatedProducts = [
  { title: "Brake discs", href: "/en/brake-discs/", image: "/images/brake-scene.webp", alt: "Illustrative brake disc close-up" },
  { title: "Clutch discs", href: "/en/clutch-discs/", image: "/images/clutch-scene.webp", alt: "Illustrative clutch disc close-up" },
  { title: "Brake drums", href: "/en/brake-drums/", image: "/images/drum-scene.webp", alt: "Illustrative brake drum close-up" },
] as const;

export default function LogisticsPage() {
  return (
    <>
      <section className="logistics-hero" data-enter aria-labelledby="logistics-title">
        <div className="container logistics-hero-layout">
          <div className="logistics-hero-copy">
            <span className="logistics-hero-eyebrow">PLASTEX MAROC / LOGISTICS</span>
            <h1 id="logistics-title">Logistics<br />from Tangier.</h1>
            <div className="logistics-hero-bottom">
              <p>A clearer supply conversation starts with the right details.</p>
              <Link href="/en/contact/">Discuss supply <ArrowRightIcon size={21} aria-hidden="true" /></Link>
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
            <h2 id="logistics-intro-title">Good logistics begins before a component leaves Tangier. Product, quantity, destination, and timing all matter.</h2>
          </div>
          <div className="logistics-intro-aside">
            <p>From production to supply</p>
            <nav aria-label="Explore Plastex expertise">
              <Link href="/en/expertise/production/">In-house production</Link>
              <span aria-current="page">Logistics</span>
              <Link href="/en/expertise/transport/">Transport</Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="logistics-planning" aria-labelledby="logistics-planning-title">
        <div className="container logistics-planning-grid">
          <div className="logistics-planning-copy">
            <span>01 / SUPPLY PLANNING</span>
            <h2 id="logistics-planning-title">Plan around the component.</h2>
            <p>Tell us which brake discs, clutch discs, or brake drums you need, the expected volume, and the destination market. Add your target timing and any packaging or documentation requirements you already know.</p>
            <p>Those details give our team a practical starting point to discuss availability and the next steps for your enquiry.</p>
            <Link href="/en/contact/">Discuss your requirements <ArrowRightIcon size={22} aria-hidden="true" /></Link>
          </div>
          <div className="logistics-planning-image">
            <Image src="/images/workshop-contact.webp" alt="Illustrative storage and component preparation scene" fill sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <div className="logistics-dark-close">
        <section className="logistics-statement" aria-labelledby="logistics-statement-title">
          <div className="container logistics-statement-grid">
            <div className="logistics-statement-copy">
              <ScrollFillHeadline id="logistics-statement-title" text="The right component matters. So does knowing where, when, and how it needs to arrive." />
            </div>
          </div>
        </section>
        <section className="contact-photo-section logistics-contact" aria-labelledby="logistics-contact-title">
          <div className="container contact-photo-frame">
            <Image
              src="/images/dispatch-contact.png"
              alt="Illustrative dispatch worker securing a cargo truck outside a warehouse"
              fill
              sizes="(max-width: 760px) 100vw, 85vw"
            />
            <div className="contact-photo-card">
              <div className="contact-card-heading">
                <h2 id="logistics-contact-title">Let’s plan the next move.</h2>
                <Image src="/images/plastex-logo.png" alt="" width={105} height={27} />
              </div>
              <p>Send us the component references, quantities, and destination. Our team in Tangier can discuss the supply requirements with you.</p>
              <div className="contact-card-actions">
                <div className="contact-quick-links">
                  <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={22} aria-hidden="true" /></a>
                  <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={22} aria-hidden="true" /></a>
                </div>
                <Link href="/en/contact/" className="contact-card-main-link">Contact our team <span><ArrowRightIcon size={25} aria-hidden="true" /></span></Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="logistics-related" aria-labelledby="logistics-related-title">
        <div className="container">
          <div className="logistics-related-heading">
            <h2 id="logistics-related-title">Explore our components.</h2>
            <Link href="/en/expertise/production/">See how we work <ArrowRightIcon size={20} aria-hidden="true" /></Link>
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
