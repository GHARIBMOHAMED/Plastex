"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FactoryIcon,
  GlobeHemisphereWestIcon,
  PlusIcon,
  ShieldCheckIcon,
  XIcon,
} from "@phosphor-icons/react";

const topics = [
  {
    title: "Production",
    copy: "Nous fabriquons des composants de freinage et d’embrayage à Tanger. Nous réalisons aussi des opérations de semi-finition sur les tambours de frein que nous proposons.",
    icon: FactoryIcon,
  },
  {
    title: "Qualité",
    copy: "Indiquez-nous l’application et les spécifications recherchées. Notre équipe peut en discuter avec vous et fournir des informations sur les certifications TÜV et AFNOR sur demande.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Approvisionnement international",
    copy: "Depuis Tanger, nous accompagnons les acheteurs professionnels en Europe, en Asie et en Afrique dans leurs recherches de composants adaptés.",
    icon: GlobeHemisphereWestIcon,
  },
] as const;

export default function ProcessAccordion() {
  const [active, setActive] = useState<number | null>(0);
  const [visualIndex, setVisualIndex] = useState(0);
  const ActiveIcon = topics[visualIndex].icon;
  const toggle = (index: number) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
      setVisualIndex(index);
    }
  };

  return (
    <section className="process-section" aria-label="Comment travaille Plastex Maroc">
      <div className="container process-layout">
        <div className="process-visual" aria-hidden="true">
          <div className="process-icon" key={visualIndex}>
            <ActiveIcon size={130} weight="thin" />
          </div>
        </div>
        <div className="process-content">
          <div className="process-accordion">
            {topics.map((topic, index) => {
              const open = active === index;
              return (
                <div className={`process-item ${open ? "is-open" : ""}`} key={topic.title}>
                  <h2>
                    <button type="button" id={`process-trigger-${index}`} aria-expanded={open} aria-controls={`process-panel-${index}`} onClick={() => toggle(index)}>
                      <span className="process-toggle" aria-hidden="true">{open ? <XIcon size={25} /> : <PlusIcon size={25} />}</span>
                      <span>{topic.title}</span>
                    </button>
                  </h2>
                  <div className="process-panel" id={`process-panel-${index}`} role="region" aria-labelledby={`process-trigger-${index}`} aria-hidden={!open}>
                    <div><p>{topic.copy}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="process-footer">
            <p>De l’application à la demande, nous vous aidons à préciser le composant et les informations nécessaires.</p>
            <div>
              <h3>Engager la discussion</h3>
              <Link href="/expertise/">Découvrir notre expertise</Link>
              <Link href="/contact/">Contacter notre équipe</Link>
              <Link href="/faq/">Questions fréquentes</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
