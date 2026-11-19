"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { productLinks } from "./data";

const scenes = ["/images/brake-scene.webp", "/images/clutch-scene.webp", "/images/drum-scene.webp"];
const films = ["/videos/brake-discs.mp4", "/videos/clutch-discs.mp4", "/videos/brake-drums.mp4"];
const details = [
  "Disques de frein selon votre application.",
  "Disques d’embrayage et expertise en friction.",
  "Tambours de frein semi-finis à Tanger.",
  "Plaquettes de frein pour les professionnels.",
];

function CardMedia({ poster, film, label }: { poster: string; film: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const syncPlayback = () => {
      if (reducedMotion.matches || !visible) video.pause();
      else void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, [film]);

  return (
    <>
      <Image src={poster} alt={`Scène d’illustration montrant ${label.toLowerCase()}`} fill sizes="(max-width: 760px) 100vw, 50vw" />
      <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true" tabIndex={-1}>
        <source src={film} type="video/mp4" />
      </video>
    </>
  );
}

export default function CategoryShowcase() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? selected;

  return (
    <section className="category-section" id="products" aria-labelledby="category-heading">
      <div className="container">
        <h2 id="category-heading" className="visually-hidden">Découvrez nos composants</h2>
        <nav className="category-nav" aria-label="Découvrir les catégories de produits">
          {productLinks.map((item, index) => (
            <button type="button" key={item.href} className={index === active ? "is-featured" : ""} aria-pressed={index === active} onClick={() => setSelected(index)} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onFocus={() => setSelected(index)}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className={`category-grid${active === null ? "" : ` category-active-${active}`}`}>
          {productLinks.map((item, index) => (
            <Link href={item.href} className={`category-card ${index === active ? "category-card-featured" : ""}`} key={item.href} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}>
              {index < scenes.length ? <CardMedia poster={scenes[index]} film={films[index]} label={item.label} /> : <span className="category-pad-design" aria-hidden="true"><span>04 / COMPOSANTS DE FREINAGE</span><strong>La friction au cœur du mouvement.</strong></span>}
              <span className="category-label">
                <span><strong>{item.label}</strong><small>{details[index]}</small></span>
                <span className="category-arrow" aria-hidden="true"><ArrowUpIcon size={24} /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
