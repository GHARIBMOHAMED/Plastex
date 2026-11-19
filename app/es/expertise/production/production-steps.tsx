"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const steps = [
  {
    title: "Definir la necesidad",
    copy: "Comparta la aplicación, la referencia, un plano y el volumen previsto. Estos datos ofrecen un punto de partida claro para hablar de producción.",
    image: "/images/brake-scene.webp",
    alt: "Primer plano ilustrativo de un disco de freno",
  },
  {
    title: "Fabricar productos de fricción",
    copy: "Nuestra planta de Tánger fabrica productos de fricción para frenos y embragues destinados al suministro profesional.",
    image: "/images/factory-film.webp",
    alt: "Escena industrial ilustrativa con componentes de freno y embrague",
  },
  {
    title: "Ensamblar discos de embrague",
    copy: "El ensamblaje de discos de embrague incorpora el producto de fricción a la gama que los compradores pueden consultar con nuestro equipo.",
    image: "/images/clutch-scene.webp",
    alt: "Disco de embrague ensamblado ilustrativo",
  },
  {
    title: "Semiacabar tambores de freno",
    copy: "Además de nuestros productos fabricados, revendemos tambores de freno y realizamos trabajos de semiacabado en Tánger.",
    image: "/images/drum-scene.webp",
    alt: "Primer plano ilustrativo de un tambor de freno",
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
          <h2 id="production-steps-title">Un camino claro desde la primera referencia hasta el componente.</h2>
          <div className="production-steps-controls">
            <span>{String(active + 1).padStart(2, "0")} / 04</span>
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Etapa de producción anterior"><ArrowLeftIcon size={24} aria-hidden="true" /></button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === steps.length - 1} aria-label="Etapa de producción siguiente"><ArrowRightIcon size={24} aria-hidden="true" /></button>
          </div>
        </div>
        <div
          className="production-steps-track"
          ref={trackRef}
          role="region"
          aria-label="Etapas de producción"
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
