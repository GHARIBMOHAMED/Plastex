"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    title: "Sunlight becomes energy",
    copy: "Solar energy is part of the way we power our work in Tangier.",
    description: "Illustration of solar panels on an industrial roof under the sun",
    image: "/images/solar-rooftop.webp",
  },
  {
    number: "02",
    title: "Energy for our work",
    copy: "We use that energy in our operations as we make brake and clutch components.",
    description: "Illustration of rooftop solar panels and the electricity grid",
    image: "/images/solar-grid.webp",
  },
  {
    number: "03",
    title: "A lower carbon impact",
    copy: "Using solar energy helps us reduce carbon emissions from our operations.",
    description: "Illustration of a solar roof and a downward CO₂ arrow",
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
          <span className="solar-story-index">03 / ENERGY</span>
          <div>
            <h2 id="solar-story-title">Power from the sun.<br />Made for motion.</h2>
            <p>We use solar energy to help reduce carbon emissions from our operations in Tangier.</p>
          </div>
        </div>
        <div className="solar-story-content">
          <div className="solar-story-topline">
            <span>OUR ENERGY APPROACH</span>
            <span>01 — 03</span>
          </div>
          <div className="solar-story-panels" aria-label="Solar energy steps">
            {visible.map((step, index) => {
              const stepIndex = firstVisible + index;
              return (
                <button
                  className={`solar-story-panel ${selected === stepIndex ? "is-selected" : ""}`}
                  key={step.number}
                  type="button"
                  onClick={() => setSelected(stepIndex)}
                  aria-pressed={selected === stepIndex}
                  aria-label={`Show step ${step.number}: ${step.title}`}
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
                <button type="button" aria-label="Previous energy step" disabled={selected === 0} onClick={() => setSelected(selected - 1)}><ArrowLeftIcon size={25} aria-hidden="true" /></button>
                <button type="button" aria-label="Next energy step" disabled={selected === steps.length - 1} onClick={() => setSelected(selected + 1)}><ArrowRightIcon size={25} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="solar-story-bottom-space" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
