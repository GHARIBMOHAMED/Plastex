"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const steps = [
  {
    title: "Définir le besoin",
    copy: "Transmettez l’application, la référence, le plan et le volume prévu. Ces informations donnent un point de départ clair à l’échange sur la production.",
    image: "/images/brake-scene.webp",
    alt: "Gros plan illustratif d’un disque de frein",
  },
  {
    title: "Fabriquer les produits de friction",
    copy: "Notre site de Tanger fabrique des produits de friction pour freins et embrayages destinés aux professionnels.",
    image: "/images/factory-film.webp",
    alt: "Scène industrielle illustrative avec des composants de freinage et d’embrayage",
  },
  {
    title: "Assembler les disques d’embrayage",
    copy: "L’assemblage des disques d’embrayage complète la gamme de composants dont les acheteurs peuvent discuter avec notre équipe.",
    image: "/images/clutch-scene.webp",
    alt: "Assemblage illustratif d’un disque d’embrayage",
  },
  {
    title: "Effectuer la semi-finition des tambours",
    copy: "En complément de nos produits fabriqués, nous revendons des tambours de frein et réalisons des opérations de semi-finition à Tanger.",
    image: "/images/drum-scene.webp",
    alt: "Gros plan illustratif d’un tambour de frein",
  },
] as const;

export default function ProductionSteps() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    const track = trackRef.current;
    const card = track?.children[next] as HTMLElement | undefined;
    if (!track || !card) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
    setActive(next);
  }

  return (
    <section className="production-steps" aria-labelledby="production-steps-title">
      <div className="container">
        <div className="production-steps-heading">
          <h2 id="production-steps-title">Un parcours clair, de la première référence au composant.</h2>
          <div className="production-steps-controls">
            <span>{String(active + 1).padStart(2, "0")} / 04</span>
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Étape de production précédente"><ArrowLeftIcon size={24} aria-hidden="true" /></button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === steps.length - 1} aria-label="Étape de production suivante"><ArrowRightIcon size={24} aria-hidden="true" /></button>
          </div>
        </div>
        <div
          className="production-steps-track"
          ref={trackRef}
          role="region"
          aria-label="Étapes de production"
          tabIndex={0}
          onScroll={(event) => {
            const track = event.currentTarget;
            const cards = Array.from(track.querySelectorAll<HTMLElement>(".production-step-card"));
            const nearest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.scrollLeft) ? index : best, 0);
            if (nearest !== active) setActive(nearest);
          }}
        >
          {steps.map((step, index) => (
            <article className="production-step-card" key={step.title}>
              <div className="production-step-copy">
                <span>{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              </div>
              <div className="production-step-image"><Image src={step.image} alt={step.alt} fill sizes="(max-width: 760px) 55vw, 27vw" /></div>
            </article>
          ))}
          <span className="production-steps-spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
