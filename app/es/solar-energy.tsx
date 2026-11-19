"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    title: "La luz solar se convierte en energía",
    copy: "La energía solar contribuye a alimentar nuestras actividades en Tánger.",
    description: "Ilustración de paneles solares en un tejado industrial bajo el sol",
    image: "/images/solar-rooftop.webp",
  },
  {
    number: "02",
    title: "Energía para nuestro trabajo",
    copy: "Utilizamos esa energía en nuestras operaciones de fabricación de componentes de freno y embrague.",
    description: "Ilustración de paneles solares en un tejado y de la red eléctrica",
    image: "/images/solar-grid.webp",
  },
  {
    number: "03",
    title: "Menor impacto de carbono",
    copy: "El uso de energía solar nos ayuda a reducir las emisiones de carbono de nuestras actividades.",
    description: "Ilustración de un tejado solar y una flecha descendente junto al CO₂",
    image: "/images/solar-carbon.webp",
  },
] as const;

export default function SolarEnergy() {
  const [selected, setSelected] = useState(0);
  const firstVisible = Math.min(selected, steps.length - 2);
  const visible = steps.slice(firstVisible, firstVisible + 2);

  return (
    <section className="solar-story" id="solar-energy" aria-labelledby="solar-story-title">
      <div className="solar-story-inner">
        <div className="solar-story-aside">
          <span className="solar-story-index">03 / ENERGÍA</span>
          <div>
            <h2 id="solar-story-title">Energía del sol.<br />Al servicio del movimiento.</h2>
            <p>Utilizamos energía solar para contribuir a reducir las emisiones de carbono de nuestras actividades en Tánger.</p>
          </div>
        </div>
        <div className="solar-story-content">
          <div className="solar-story-topline">
            <span>NUESTRO ENFOQUE ENERGÉTICO</span>
            <span>01 — 03</span>
          </div>
          <div className="solar-story-panels" aria-label="Etapas de la energía solar">
            {visible.map((step, index) => {
              const stepIndex = firstVisible + index;
              return (
                <button
                  className={`solar-story-panel ${selected === stepIndex ? "is-selected" : ""}`}
                  key={step.number}
                  type="button"
                  onClick={() => setSelected(stepIndex)}
                  aria-pressed={selected === stepIndex}
                  aria-label={`Mostrar etapa ${step.number}: ${step.title}`}
                >
                  <span className="solar-story-number" aria-hidden="true">{step.number}</span>
                  <Image className="solar-diagram solar-illustration" src={step.image} alt={step.description} width={1200} height={800} sizes="(max-width: 600px) 100vw, 43vw" />
                </button>
              );
            })}
          </div>
          <div className={`solar-story-bottom ${selected === steps.length - 1 ? "show-right" : ""}`}>
            <div className="solar-story-caption" aria-live="polite">
              <div>
                <h3>{steps[selected].title}</h3>
                <p>{steps[selected].copy}</p>
              </div>
              <div className="solar-story-controls">
                <button type="button" aria-label="Etapa anterior" disabled={selected === 0} onClick={() => setSelected(selected - 1)}><ArrowLeftIcon size={25} aria-hidden="true" /></button>
                <button type="button" aria-label="Etapa siguiente" disabled={selected === steps.length - 1} onClick={() => setSelected(selected + 1)}><ArrowRightIcon size={25} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="solar-story-bottom-space" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
