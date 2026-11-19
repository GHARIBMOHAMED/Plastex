"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productLinks } from "./data";

const images = ["/images/brake-disc-cutout.png", "/images/clutch-lining-cutout.png", "/images/brake-drum-cutout.png", "/images/brake-pads-cutout.png"];
const imageAlt = ["Silver brake disc rotor product illustration", "Woven annular clutch friction lining product illustration", "Black brake drum with silver face product illustration", "Pair of brake pads product illustration"];

export default function RangeSelector() {
  const [active, setActive] = useState(0);
  return (
    <section className="range-section" aria-label="Explore our components">
      <div className="container range-layout">
        <div className="range-intro">
          <p>Explore brake discs, clutch discs, brake drums, and brake pads. Our team helps professional buyers define the right component enquiry.</p>
          <Link href="/es/contact/" className="button-dark">Discuss your requirements</Link>
        </div>
        <div className="range-list">
          {productLinks.map((item, index) => (
            <Link href={item.href} key={item.href} className={active === index ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <Link href={productLinks[active].href} className="range-image" aria-label={`Explore ${productLinks[active].label}`}>
          <span>{productLinks[active].label}</span>
          <span className="range-image-art">
            <Image key={images[active]} src={images[active]} alt={imageAlt[active]} fill sizes="(max-width: 760px) 100vw, 45vw" />
          </span>
        </Link>
      </div>
    </section>
  );
}
