"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productLinks } from "./data";

const images = ["/images/brake-disc-cutout.png", "/images/clutch-lining-cutout.png", "/images/brake-drum-cutout.png", "/images/brake-pads-cutout.png"];
const imageAlt = ["Illustration d’un disque de frein argenté", "Illustration d’une garniture de friction d’embrayage tissée", "Illustration d’un tambour de frein noir à face argentée", "Illustration de deux plaquettes de frein"];

export default function RangeSelector() {
  const [active, setActive] = useState(0);
  return (
    <section className="range-section" aria-label="Parcourir nos composants">
      <div className="container range-layout">
        <div className="range-intro">
          <p>Découvrez nos disques de frein, disques d’embrayage, tambours et plaquettes de frein. Notre équipe aide les acheteurs professionnels à préciser leurs demandes.</p>
          <Link href="/contact/" className="button-dark">Parler de votre besoin</Link>
        </div>
        <div className="range-list">
          {productLinks.map((item, index) => (
            <Link href={item.href} key={item.href} className={active === index ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <Link href={productLinks[active].href} className="range-image" aria-label={`Découvrir ${productLinks[active].label}`}>
          <span>{productLinks[active].label}</span>
          <span className="range-image-art">
            <Image key={images[active]} src={images[active]} alt={imageAlt[active]} fill sizes="(max-width: 760px) 100vw, 45vw" />
          </span>
        </Link>
      </div>
    </section>
  );
}
