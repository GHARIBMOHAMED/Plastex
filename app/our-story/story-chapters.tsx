"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

const chapters = [
  {
    title: "Production",
    text: "Les produits de friction et l’assemblage de disques d’embrayage font partie de notre travail à Tanger. Chaque nouvelle demande commence par l’application et ses exigences.",
    image: "/images/factory-film.webp",
    alt: "Atelier d’usinage illustratif avec des composants automobiles",
    href: "/expertise/production/",
  },
  {
    title: "Composants de freinage",
    text: "Les disques et tambours de frein font partie de notre gamme. Nous discutons des références, dimensions et besoins d’approvisionnement avec les acheteurs professionnels.",
    image: "/images/brake-scene.webp",
    alt: "Gros plan illustratif d’un disque de frein ventilé",
    href: "/brake-discs/",
  },
  {
    title: "Composants d’embrayage",
    text: "Les produits de friction pour embrayages relient notre fabrication aux exigences des applications automobiles et de la distribution de pièces.",
    image: "/images/clutch-scene.webp",
    alt: "Gros plan illustratif d’un assemblage de disque d’embrayage",
    href: "/clutch-discs/",
  },
  {
    title: "Approvisionnement international",
    text: "Depuis le Maroc, nos échanges commerciaux touchent des acheteurs en Europe, en Asie et en Afrique. Des informations claires font avancer chaque demande.",
    image: "/images/transport-hero.webp",
    alt: "Transport de marchandises illustratif dans une zone de chargement",
    href: "/expertise/transport/",
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
            aria-label="Images de notre histoire. Faites glisser pour parcourir les chapitres."
          >
            {chapters.map((item) => (
              <div className="story-chapter-image" key={item.image}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 85vw, 50vw" draggable={false} />
                <span>Images d’illustration</span>
              </div>
            ))}
          </div>
          <div className="story-chapter-caption" aria-live="polite">
            <div><span>{String(selected + 1).padStart(2, "0")} / 04</span><h3>{chapter.title}</h3><p>{chapter.text}</p></div>
            <Link href={chapter.href} aria-label={`Découvrir ${chapter.title}`}><ArrowRightIcon size={25} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="story-chapters-side">
          <div className="story-chapters-intro">
            <span>02 / UNE HISTOIRE QUI CONTINUE</span>
            <h2 id="story-chapters-title">Une histoire façonnée par notre travail.</h2>
            <p>Découvrez quatre facettes de Plastex aujourd’hui. Faites glisser les images ou choisissez un chapitre.</p>
          </div>
          <div className="story-chapter-controls" role="group" aria-label="Chapitres de notre histoire">
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
