"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const brakeSteps = [
  {
    title: "Commencer par l’application",
    copy: "Indiquez-nous où le disque sera utilisé et partagez une référence si vous en avez une.",
    image: "/images/brake-scene.webp",
    alt: "Gros plan illustratif d’un disque de frein",
  },
  {
    title: "Examiner les dimensions",
    copy: "Les plans et exigences techniques donnent à notre équipe une base claire pour l’échange.",
    image: "/images/brake-disc-cutout.png",
    alt: "Illustration d’un disque de frein argenté",
  },
  {
    title: "Parler de la production",
    copy: "Nous pouvons discuter de la fabrication des disques de frein et des informations nécessaires à un plan d’approvisionnement.",
    image: "/images/brake-film.webp",
    alt: "Scène illustrative d’usinage de disque de frein",
  },
  {
    title: "Planifier l’approvisionnement",
    copy: "Communiquez les volumes prévus et le marché de destination afin que notre équipe puisse répondre à votre demande.",
    image: "/images/factory-film.webp",
    alt: "Atelier illustratif de composants automobiles",
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
        <h2 id="reference-steps-heading">Du premier cahier des charges au plan d’approvisionnement.</h2>
        <div className="reference-steps-toolbar">
          <p>Parcourez les étapes<br />d’une demande de disque de frein.</p>
          <div className="reference-steps-controls">
            <button type="button" aria-label="Étape précédente" onClick={() => move(index - 1)} disabled={index === 0}><ArrowLeftIcon size={22} aria-hidden="true" /></button>
            <button type="button" aria-label="Étape suivante" onClick={() => move(index + 1)} disabled={index === brakeSteps.length - 1}><ArrowRightIcon size={22} aria-hidden="true" /></button>
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
            <span className="product-gallery-kicker">{name} / De plus près</span>
            <h2 id="reference-gallery-heading">{title}</h2>
            <p>{description}</p>
          </div>
          <div className="reference-gallery-thumbs" role="group" aria-label={`${name} vues du produit`}>
            {images.map((item, index) => (
              <button type="button" key={item.src} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} aria-label={`Afficher la vue ${name.toLowerCase()} ${index + 1} sur ${images.length}`} aria-pressed={active === index}>
                <Image src={item.src} alt="" fill sizes="80px" />
              </button>
            ))}
          </div>
        </div>
        <div className={`reference-gallery-stage product-gallery-stage ${current.kind}`} key={current.src}>
          <Image src={current.src} alt={current.alt} fill sizes="(max-width: 900px) 100vw, 54vw" />
          <span className="product-gallery-count">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
          <div className="product-gallery-progress" aria-hidden="true"><span style={{ width: `${((active + 1) / images.length) * 100}%` }} /></div>
          <div className="product-gallery-dots" role="group" aria-label={`${name} pages de la galerie`}>
            {images.map((item, index) => <button type="button" key={item.src} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Afficher la vue ${index + 1}`} aria-pressed={active === index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
