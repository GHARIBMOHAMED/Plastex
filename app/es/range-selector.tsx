"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productLinks } from "./data";

const images = ["/images/brake-disc-cutout.png", "/images/clutch-lining-cutout.png", "/images/brake-drum-cutout.png", "/images/brake-pads-cutout.png"];
const imageAlt = ["Ilustración de un disco de freno plateado", "Ilustración de un forro de fricción de embrague tejido", "Ilustración de un tambor de freno negro con cara plateada", "Ilustración de dos pastillas de freno"];

export default function RangeSelector() {
  const [active, setActive] = useState(0);
  return (
    <section className="range-section" aria-label="Explorar nuestros componentes">
      <div className="container range-layout">
        <div className="range-intro">
          <p>Descubre nuestros discos de freno, discos de embrague, tambores y pastillas. Nuestro equipo ayuda a los compradores profesionales a precisar sus necesidades.</p>
          <Link href="/es/contact/" className="button-dark">Háblanos de tus necesidades</Link>
        </div>
        <div className="range-list">
          {productLinks.map((item, index) => (
            <Link href={item.href} key={item.href} className={active === index ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <Link href={productLinks[active].href} className="range-image" aria-label={`Descubrir ${productLinks[active].label}`}>
          <span>{productLinks[active].label}</span>
          <span className="range-image-art">
            <Image key={images[active]} src={images[active]} alt={imageAlt[active]} fill sizes="(max-width: 760px) 100vw, 45vw" />
          </span>
        </Link>
      </div>
    </section>
  );
}
