"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const brakeSteps = [
  {
    title: "Empezar por la aplicación",
    copy: "Indíquenos dónde se utilizará el disco y comparta una referencia si la tiene.",
    image: "/images/brake-scene.webp",
    alt: "Primer plano ilustrativo de un disco de freno",
  },
  {
    title: "Revisar las dimensiones",
    copy: "Los planos y requisitos técnicos ofrecen a nuestro equipo una base clara para la conversación.",
    image: "/images/brake-disc-cutout.png",
    alt: "Ilustración de un disco de freno plateado",
  },
  {
    title: "Hablar de producción",
    copy: "Podemos hablar de la fabricación de discos de freno y de la información necesaria para planificar el suministro.",
    image: "/images/brake-film.webp",
    alt: "Escena ilustrativa de mecanizado de un disco de freno",
  },
  {
    title: "Planificar el suministro",
    copy: "Comparta el volumen previsto y el mercado de destino para que nuestro equipo responda a su consulta.",
    image: "/images/factory-film.webp",
    alt: "Taller ilustrativo de componentes de automoción",
  },
];

export function BrakeProcessSlider() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (next: number) => {
    const safe = Math.max(0, Math.min(brakeSteps.length - 1, next));
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".reference-step-card");
    if (track && card) {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollTo({ left: safe * (card.offsetWidth + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
    setIndex(safe);
  };

  return (
    <section className="reference-steps" aria-labelledby="reference-steps-heading">
      <div className="container">
        <h2 id="reference-steps-heading">De la primera consulta al plan de suministro.</h2>
        <div className="reference-steps-toolbar">
          <p>Recorra las etapas<br />de una consulta sobre discos de freno.</p>
          <div className="reference-steps-controls">
            <button type="button" aria-label="Etapa anterior" onClick={() => move(index - 1)} disabled={index === 0}><ArrowLeftIcon size={22} aria-hidden="true" /></button>
            <button type="button" aria-label="Etapa siguiente" onClick={() => move(index + 1)} disabled={index === brakeSteps.length - 1}><ArrowRightIcon size={22} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="reference-steps-track" ref={trackRef} onScroll={(event) => {
          const track = event.currentTarget;
          const card = track.querySelector<HTMLElement>(".reference-step-card");
          if (card) setIndex(Math.round(track.scrollLeft / (card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0))));
        }}>
          {brakeSteps.map((step, stepIndex) => (
            <article className="reference-step-card" key={step.title}>
              <div className="reference-step-copy">
                <span className="reference-step-number">{String(stepIndex + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              </div>
              <div className="reference-step-image"><Image src={step.image} alt={step.alt} fill sizes="(max-width: 760px) 60vw, 38vw" /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export type ProductGalleryImage = {
  src: string;
  alt: string;
  kind: "cutout" | "scene";
};

export function ProductGallery({
  name,
  title,
  description,
  images,
}: {
  name: string;
  title: string;
  description: string;
  images: ProductGalleryImage[];
}) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <section className="reference-gallery product-gallery" aria-labelledby="reference-gallery-heading">
      <div className="container reference-gallery-grid">
        <div className="reference-gallery-copy">
          <div>
            <span className="product-gallery-kicker">{name} / En detalle</span>
            <h2 id="reference-gallery-heading">{title}</h2>
            <p>{description}</p>
          </div>
          <div className="reference-gallery-thumbs" role="group" aria-label={`${name} vistas de imágenes`}>
            {images.map((item, index) => (
              <button type="button" key={item.src} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} aria-label={`Mostrar vista ${index + 1} de ${images.length} de ${name.toLowerCase()}`} aria-pressed={active === index}>
                <Image src={item.src} alt="" fill sizes="80px" />
              </button>
            ))}
          </div>
        </div>
        <div className={`reference-gallery-stage product-gallery-stage ${current.kind}`} key={current.src}>
          <Image src={current.src} alt={current.alt} fill sizes="(max-width: 900px) 100vw, 54vw" />
          <span className="product-gallery-count">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
          <div className="product-gallery-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / images.length) * 100}%` }} /></div>
          <div className="product-gallery-dots" role="group" aria-label={`${name} páginas de la galería`}>
            {images.map((item, index) => <button type="button" key={item.src} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Mostrar vista ${index + 1}`} aria-pressed={active === index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
