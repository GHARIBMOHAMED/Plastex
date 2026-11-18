"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    title: "Le soleil devient énergie",
    copy: "L’énergie solaire contribue à alimenter nos activités à Tanger.",
    description: "Schéma montrant le soleil éclairant des panneaux solaires",
    diagram: "capture",
  },
  {
    number: "02",
    title: "Une énergie pour nos activités",
    copy: "Nous utilisons cette énergie dans nos activités de fabrication de composants de freinage et d’embrayage.",
    description: "Schéma reliant des panneaux solaires à un atelier industriel",
    diagram: "work",
  },
  {
    number: "03",
    title: "Une empreinte carbone réduite",
    copy: "L’utilisation de l’énergie solaire contribue à réduire les émissions de carbone de nos activités.",
    description: "Schéma d’un bâtiment alimenté par l’énergie solaire et d’une flèche indiquant une baisse du carbone",
    diagram: "impact",
  },
] as const;

type Diagram = (typeof steps)[number]["diagram"];

function SolarDiagram({ kind, description }: { kind: Diagram; description: string }) {
  return (
    <svg className="solar-diagram" viewBox="0 0 600 360" role="img" aria-label={description} fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
      {kind === "capture" && (
        <>
          <circle cx="456" cy="70" r="28" />
          <path d="M456 22v-12m0 120v-12m48-48h12m-120 0h12m82-34 9-9m-85 85 9-9m67 0 9 9m-85-85 9 9" />
          <path d="M87 176 402 125 491 237 176 289Z" />
          <path d="M87 176v18l89 112 315-52v-17M176 289v17" />
          <path d="m139 168 89 112m-34-121 89 112m-34-121 89 112m-34-121 89 112m-34-121 89 112" />
          <path d="m109 204 315-51m-294 77 316-51m-294 77 316-51" />
          <path d="M218 299v22m234-61v25m-234 36 234-36" strokeDasharray="4 6" />
        </>
      )}
      {kind === "work" && (
        <>
          <path d="M55 209 227 181l48 61-171 30Z" />
          <path d="M55 209v15l49 62 171-31v-13M104 272v14m-5-72 48 61m-4-68 48 61m-5-68 49 61m-156-32 172-29m-153 49 171-29" />
          <path d="M278 228h64" strokeDasharray="5 7" />
          <path d="m329 218 13 10-13 10" />
          <path d="M364 122h156v166H364zM364 149h156M385 149v139m115-139v139" />
          <path d="M402 188h80v66h-80zM402 201h80m-80 40h80" />
          <circle cx="442" cy="221" r="18" />
          <circle cx="442" cy="221" r="6" />
          <path d="M392 122V88h100v34m-88-34V66h76v22" />
        </>
      )}
      {kind === "impact" && (
        <>
          <path d="M83 170 284 137l84 94-200 34Z" />
          <path d="M83 170v15l85 95 200-34v-15M168 265v15m-44-101 84 94m-44-100 84 94m-45-100 84 94m-45-101 84 94m-190-45 201-34m-180 55 201-34" />
          <path d="M168 280v39h278V131l-66-43-81 13" strokeDasharray="4 6" />
          <path d="M446 131h75v188h-75M475 153v73m-26 0h52" />
          <path d="M530 175v89m-13-13 13 13 13-13" strokeWidth="2" />
          <text x="505" y="294" fill="currentColor" stroke="none" fontSize="20" fontFamily="Inter, sans-serif">CO₂</text>
          <circle cx="505" cy="63" r="23" />
          <path d="M505 24V13m0 100v-11m39-39h11m-100 0h11m67-28 8-8m-72 72 8-8m56 0 8 8m-72-72 8 8" />
        </>
      )}
    </svg>
  );
}

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
                  <SolarDiagram kind={step.diagram} description={step.description} />
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
