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
    copy: "We make brake and clutch components in Tangier. We also carry out semi-finished work on the brake drums we supply.",
    icon: FactoryIcon,
  },
  {
    title: "Quality",
    copy: "Tell us the application and specifications you need. Our team can discuss the details and share information about TÜV and AFNOR certifications on request.",
    icon: ShieldCheckIcon,
  },
  {
    title: "International supply",
    copy: "From Tangier, we support professional buyers in Europe, Asia, and Africa with clear, application-led sourcing conversations.",
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
    <section className="process-section" aria-label="How Plastex Maroc works">
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
            <p>From application to enquiry, we help you clarify the component and information you need.</p>
            <div>
              <h3>Start a conversation</h3>
              <Link href="/en/expertise/">Explore our expertise</Link>
              <Link href="/en/contact/">Contact our team</Link>
              <Link href="/en/faq/">Frequently asked questions</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
