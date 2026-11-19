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
    title: "Producción",
    copy: "Fabricamos componentes de freno y embrague en Tánger. También realizamos trabajos de semiacabado en los tambores de freno que suministramos.",
    icon: FactoryIcon,
  },
  {
    title: "Calidad",
    copy: "Indícanos la aplicación y las especificaciones que necesitas. Nuestro equipo puede revisar los detalles y proporcionar información sobre las certificaciones TÜV y AFNOR bajo petición.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Suministro internacional",
    copy: "Desde Tánger, acompañamos a compradores profesionales de Europa, Asia y África con consultas de suministro claras y basadas en la aplicación.",
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
    <section className="process-section" aria-label="Cómo trabaja Plastex Maroc">
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
            <p>Desde la aplicación hasta la consulta, te ayudamos a definir el componente y la información necesaria.</p>
            <div>
              <h3>Iniciar una conversación</h3>
              <Link href="/es/expertise/">Descubrir nuestra experiencia</Link>
              <Link href="/es/contact/">Contactar con nuestro equipo</Link>
              <Link href="/es/faq/">Preguntas frecuentes</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
