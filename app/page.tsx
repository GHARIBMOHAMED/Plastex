import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ContactBand, ProductGraphic } from "./components";
import { productLinks } from "./data";

export const metadata: Metadata = {
  title: "Brake & Clutch Components from Tangier",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-ambient" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> ENGINEERED IN MOROCCO ·
              CONNECTED TO THE WORLD
            </div>
            <h1>
              MADE TO
              <br />
              <span>MOVE</span>
              <br />
              FORWARD<span className="period">.</span>
            </h1>
            <p>
              Brake and clutch expertise from Tangier. Components and commercial
              support for professional partners across Europe, Asia, and Africa.
            </p>
            <div className="hero-actions">
              <Link href="/brake-discs/" className="button-primary">
                Explore our range <Arrow diagonal />
              </Link>
              <Link href="/contact/" className="text-link">
                Start a conversation <Arrow />
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-ring" />
            <ProductGraphic type="brake" />
            <div className="hero-visual-caption">
              <span>01 / 03</span>
              <span>BRAKING COMPONENTS</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>PRECISION IN MOTION</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <span>TANGIER, MOROCCO</span>
        </div>
      </section>
      <section className="intro-section container">
        <div className="section-topline">
          <span className="eyebrow dark">
            <span className="eyebrow-line" /> THE COMPANY
          </span>
          <span className="section-index">01 — ABOUT</span>
        </div>
        <div className="intro-grid">
          <h2>
            Friction is
            <br />
            <em>our foundation.</em>
          </h2>
          <div>
            <p className="large-copy">
              Since 1980, Plastex Maroc has worked in friction products for
              braking and clutch applications.
            </p>
            <p>
              From our base in Tangier, we connect manufacturing knowledge with
              the needs of professional buyers in international markets. Our
              range brings together manufactured products and selected supplied
              components.
            </p>
            <Link className="underlined-link" href="/contact/">
              Get to know us <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
      <section className="range-section">
        <div className="container">
          <div className="section-topline">
            <span className="eyebrow">
              <span className="eyebrow-line" /> PRODUCT RANGE
            </span>
            <span className="section-index">02 — EXPLORE</span>
          </div>
          <div className="range-heading">
            <h2>
              ONE PURPOSE.
              <br />
              <em>EVERY COMPONENT.</em>
            </h2>
            <p>
              Explore the products at the centre of our offer and find the right
              conversation for your sourcing needs.
            </p>
          </div>
          <div className="product-grid">
            {productLinks.map((item, index) => (
              <Link className="product-card" href={item.href} key={item.href}>
                <div className="card-top">
                  <span>{item.number} / 03</span>
                  <Arrow diagonal />
                </div>
                <ProductGraphic
                  type={index === 0 ? "brake" : index === 1 ? "clutch" : "drum"}
                  small
                />
                <div className="card-bottom">
                  <span>{item.description}</span>
                  <h3>{item.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="reach-section container">
        <div className="section-topline">
          <span className="eyebrow dark">
            <span className="eyebrow-line" /> GLOBAL OUTLOOK
          </span>
          <span className="section-index">03 — REACH</span>
        </div>
        <div className="reach-grid">
          <div>
            <h2>
              FROM TANGIER
              <br />
              <em>TO EVERYWHERE.</em>
            </h2>
            <p>
              Located at the meeting point of major trade routes, Plastex Maroc
              serves partners across Europe, Asia, and Africa.
            </p>
          </div>
          <div className="reach-graphic">
            <div className="reach-circle one" />
            <div className="reach-circle two" />
            <div className="reach-circle three" />
            <div className="reach-center">
              TANGIER
              <br />
              <span>35.76° N · 5.83° W</span>
            </div>
            <span className="reach-label europe">EUROPE</span>
            <span className="reach-label asia">ASIA</span>
            <span className="reach-label africa">AFRICA</span>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
