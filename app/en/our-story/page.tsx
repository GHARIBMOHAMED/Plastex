import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import LogisticsPrism from "../expertise/logistics/logistics-prism";
import StoryChapters from "./story-chapters";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover Plastex Maroc's approach to brake and clutch components, in-house production, and international supply from Tangier, Morocco.",
  alternates: { canonical: "/en/our-story/", languages: { fr: "/our-story/", en: "/en/our-story/" } },
  openGraph: { locale: "en_US",
    title: "Our Story | Plastex Maroc",
    description:
      "A closer look at the work, products, and people behind Plastex Maroc in Tangier.",
  },
};

export default function OurStoryPage() {
  return (
    <>
      <section className="story-hero" aria-labelledby="story-title">
        <div className="container story-hero-top">
          <div className="story-hero-copy">
            <span className="story-eyebrow">PLASTEX MAROC / OUR STORY</span>
            <h1 id="story-title">Our story.<br />Made for motion.</h1>
            <p>From Tangier, we bring brake and clutch component expertise into clear conversations with buyers across the world.</p>
          </div>
          <div className="story-hero-form"><LogisticsPrism ariaLabel="Rotate the Plastex line sculpture" subtle /></div>
        </div>
        <div className="container story-hero-photo">
          <Image
            src="/images/hero-aerial.webp"
            alt="Illustrative aerial view of an industrial logistics site near Tangier"
            fill priority sizes="(max-width: 760px) 100vw, 85vw"
          />
          <div className="story-photo-shade" />
          <span className="story-photo-note">Illustrative imagery</span>
          <div className="story-photo-content">
            <div><span>OUR SCALE</span><strong>6,000,000</strong><p>discs per year</p></div>
            <Link href="/en/expertise/production/">See how we work <ArrowRightIcon size={24} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="story-editorial" aria-labelledby="story-editorial-title">
        <div className="container story-editorial-grid">
          <div className="story-editorial-side">
            <span>01 / THE WORK</span>
            <p>What we make starts with the part, the application, and the people who need it.</p>
            <nav aria-label="Explore products">
              <Link href="/en/brake-discs/">Brake discs <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/en/clutch-discs/">Clutch discs <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/en/brake-drums/">Brake drums <ArrowRightIcon size={20} aria-hidden="true" /></Link>
              <Link href="/en/brake-pads/">Brake pads <ArrowRightIcon size={20} aria-hidden="true" /></Link>
            </nav>
          </div>
          <div className="story-editorial-main">
            <h2 id="story-editorial-title">The right component begins with a better conversation.</h2>
            <Link className="story-solid-link" href="/en/expertise/">Explore our expertise <ArrowRightIcon size={20} aria-hidden="true" /></Link>
            <div className="story-editorial-paragraphs">
              <p>Plastex Maroc works with braking and clutch friction products in Tangier. We manufacture friction products, assemble clutch discs, and carry out semi-finished work on brake drums that we resell.</p>
              <p>Our role extends beyond a catalogue. We ask about references, dimensions, volumes, and destinations so each enquiry can move toward a useful technical and commercial discussion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-contact" aria-labelledby="story-contact-title">
        <div className="container story-contact-frame">
          <Image src="/images/workshop-contact.webp" alt="Illustrative automotive components in an industrial workshop" fill sizes="(max-width: 760px) 100vw, 85vw" />
          <span className="story-contact-note">Illustrative imagery</span>
          <div className="story-contact-card">
            <h2 id="story-contact-title">Let’s talk about what moves you.</h2>
            <p>Tell our team what part you need, where it is going, and what your next step looks like.</p>
            <div className="story-contact-actions">
              <div>
                <a href="mailto:commercial@plastexmaroc.com" aria-label="Email Plastex Maroc"><EnvelopeSimpleIcon size={23} aria-hidden="true" /></a>
                <a href="tel:+212539351136" aria-label="Call Plastex Maroc"><PhoneIcon size={23} aria-hidden="true" /></a>
              </div>
              <Link href="/en/contact/">Contact us <ArrowRightIcon size={22} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <StoryChapters />
    </>
  );
}
