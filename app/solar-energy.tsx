"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    title: "Le soleil devient énergie",
    copy: "L’énergie solaire contribue à alimenter nos activités à Tanger.",
    description: "Illustration d’un toit industriel équipé de panneaux solaires sous le soleil",
    image: "/images/solar-rooftop.webp",
  },
  {
    number: "02",
    title: "Une énergie pour nos activités",
    copy: "Nous utilisons cette énergie dans nos activités de fabrication de composants de freinage et d’embrayage.",
    description: "Illustration de panneaux solaires sur un atelier et du réseau électrique",
    image: "/images/solar-grid.webp",
  },
  {
    number: "03",
    title: "Une empreinte carbone réduite",
    copy: "L’utilisation de l’énergie solaire contribue à réduire les émissions de carbone de nos activités.",
    description: "Illustration d’un toit solaire et d’une flèche montrant une réduction du CO₂",
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
          <span className="solar-story-index">03 / ÉNERGIE</span>
          <div>
            <h2 id="solar-story-title">L’énergie du soleil.<br />Au service du mouvement.</h2>
            <p>Nous utilisons l’énergie solaire pour contribuer à réduire les émissions de carbone de nos activités à Tanger.</p>
          </div>
        </div>
        <div className="solar-story-content">
          <div className="solar-story-topline">
            <span>NOTRE DÉMARCHE ÉNERGÉTIQUE</span>
            <span>01 — 03</span>
          </div>
          <div className="solar-story-panels" aria-label="Étapes de l’énergie solaire">
            {visible.map((step, index) => {
              const stepIndex = firstVisible + index;
              return (
                <button
                  className={`solar-story-panel ${selected === stepIndex ? "is-selected" : ""}`}
                  key={step.number}
                  type="button"
                  onClick={() => setSelected(stepIndex)}
                  aria-pressed={selected === stepIndex}
                  aria-label={`Afficher l’étape ${step.number}: ${step.title}`}
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
                <button type="button" aria-label="Étape précédente" disabled={selected === 0} onClick={() => setSelected(selected - 1)}><ArrowLeftIcon size={25} aria-hidden="true" /></button>
                <button type="button" aria-label="Étape suivante" disabled={selected === steps.length - 1} onClick={() => setSelected(selected + 1)}><ArrowRightIcon size={25} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="solar-story-bottom-space" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
