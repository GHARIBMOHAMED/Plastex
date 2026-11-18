"use client";

import { useEffect, useRef, useState } from "react";

const annualDiscs = 6_000_000;
const numberFormat = new Intl.NumberFormat("en-US");

export default function ProductionProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(annualDiscs);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / 1900, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(annualDiscs * eased));
          if (progress < 1) frame = requestAnimationFrame(animate);
        };

        setCount(0);
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="proof-section" ref={sectionRef} aria-labelledby="proof-heading">
      <div className="container">
        <div className="proof-topline">
          <span>PLASTEX MAROC / PRODUCTION</span>
          <span>BUILT IN TANGIER</span>
        </div>
        <div className="proof-number-row">
          <strong className="proof-number" aria-hidden="true">
            {numberFormat.format(count)}
          </strong>
          <h2 id="proof-heading"><span className="visually-hidden">6,000,000 </span>Discs produced each year</h2>
        </div>
        <div className="proof-certifications">
          <div className="proof-cert-intro">
            <span>QUALITY ASSURANCE</span>
            <h3>Certifications</h3>
            <p>Certificate details and scope are available from our team on request.</p>
          </div>
          <div className="proof-cert-grid">
            <div className="proof-cert-card">
              <span>01 / CERTIFICATION</span>
              <strong>TÜV</strong>
            </div>
            <div className="proof-cert-card">
              <span>02 / CERTIFICATION</span>
              <strong>AFNOR</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
