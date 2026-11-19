"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

const chapters = [
  {
    title: "Producción",
    text: "Los productos de fricción y el ensamblaje de discos de embrague forman parte de nuestro trabajo en Tánger. Cada nueva consulta comienza por la aplicación y sus requisitos.",
    image: "/images/factory-film.webp",
    alt: "Planta de mecanizado ilustrativa con componentes de automoción",
    href: "/es/expertise/production/",
  },
  {
    title: "Componentes de freno",
    text: "Los discos y tambores de freno forman parte de nuestra gama. Tratamos las referencias, dimensiones y necesidades de suministro con compradores profesionales.",
    image: "/images/brake-scene.webp",
    alt: "Primer plano ilustrativo de un disco de freno ventilado",
    href: "/es/brake-discs/",
  },
  {
    title: "Componentes de embrague",
    text: "Los productos de fricción para embragues vinculan nuestra fabricación con las necesidades de las aplicaciones de vehículos y el mercado de recambios.",
    image: "/images/clutch-scene.webp",
    alt: "Primer plano ilustrativo de un disco de embrague ensamblado",
    href: "/es/clutch-discs/",
  },
  {
    title: "Suministro internacional",
    text: "Desde Marruecos, nuestro equipo comercial atiende a compradores de Europa, Asia y África. Los datos claros ayudan a avanzar con cada solicitud.",
    image: "/images/transport-hero.webp",
    alt: "Transporte de mercancías ilustrativo en un muelle industrial",
    href: "/es/expertise/transport/",
  },
] as const;

export default function StoryChapters() {
  const [selected, setSelected] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const chapter = chapters[selected];

  function selectChapter(index: number) {
    setSelected(index);
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (track && slide) {
      track.scrollTo({
        left: slide.offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }

  function syncChapterFromScroll() {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return;
    const step = first.getBoundingClientRect().width + 18;
    setSelected(Math.min(chapters.length - 1, Math.max(0, Math.round(track.scrollLeft / step))));
  }

  return (
    <section className="story-chapters" aria-labelledby="story-chapters-title">
      <div className="container story-chapters-grid">
        <div className="story-chapter-panel" id="story-chapter-panel">
          <div
            className="story-chapter-track"
            ref={trackRef}
            onScroll={syncChapterFromScroll}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse" || event.button !== 0) return;
              dragRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (dragRef.current?.pointerId !== event.pointerId) return;
              event.currentTarget.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
            }}
            onPointerUp={(event) => {
              if (dragRef.current?.pointerId !== event.pointerId) return;
              dragRef.current = null;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={() => { dragRef.current = null; }}
            aria-label="Imágenes de la historia. Deslice o arrastre para explorar los capítulos."
          >
            {chapters.map((item) => (
              <div className="story-chapter-image" key={item.image}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 85vw, 50vw" draggable={false} />
                <span>Imágenes ilustrativas</span>
              </div>
            ))}
          </div>
          <div className="story-chapter-caption" aria-live="polite">
            <div><span>{String(selected + 1).padStart(2, "0")} / 04</span><h3>{chapter.title}</h3><p>{chapter.text}</p></div>
            <Link href={chapter.href} aria-label={`Explorar ${chapter.title}`}><ArrowRightIcon size={25} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="story-chapters-side">
          <div className="story-chapters-intro">
            <span>02 / UNA HISTORIA EN MARCHA</span>
            <h2 id="story-chapters-title">Una historia construida con nuestro trabajo.</h2>
            <p>Conozca cuatro aspectos de Plastex hoy. Arrastre las imágenes o elija un capítulo.</p>
          </div>
          <div className="story-chapter-controls" role="group" aria-label="Capítulos de nuestra historia">
            {chapters.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={selected === index ? "is-active" : ""}
                onClick={() => selectChapter(index)}
                aria-pressed={selected === index}
                aria-controls="story-chapter-panel"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
