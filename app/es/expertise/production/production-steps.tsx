"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const steps = [
  {
    title: "Define the requirement",
    copy: "Share an application, part reference, drawing, and expected volume. These details give the production discussion a clear starting point.",
    image: "/images/brake-scene.webp",
    alt: "Illustrative close-up of a brake disc",
  },
  {
    title: "Make friction products",
    copy: "Our Tangier operation manufactures brake and clutch friction products for professional component supply.",
    image: "/images/factory-film.webp",
    alt: "Illustrative industrial scene with brake and clutch components",
  },
  {
    title: "Assemble clutch discs",
    copy: "Clutch disc assembly brings the friction product into the component range buyers can discuss with our team.",
    image: "/images/clutch-scene.webp",
    alt: "Illustrative clutch disc assembly",
  },
  {
    title: "Semi-finish brake drums",
    copy: "Alongside our manufactured products, we resell brake drums and carry out semi-finished work in Tangier.",
    image: "/images/drum-scene.webp",
    alt: "Illustrative brake drum close-up",
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
          <h2 id="production-steps-title">A clear path from the first reference to the component.</h2>
          <div className="production-steps-controls">
            <span>{String(active + 1).padStart(2, "0")} / 04</span>
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous production step"><ArrowLeftIcon size={24} aria-hidden="true" /></button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === steps.length - 1} aria-label="Next production step"><ArrowRightIcon size={24} aria-hidden="true" /></button>
          </div>
        </div>
        <div
          className="production-steps-track"
          ref={trackRef}
          role="region"
          aria-label="Production steps"
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
