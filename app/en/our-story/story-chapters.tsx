"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";

const chapters = [
  {
    title: "Production",
    text: "Friction products and clutch disc assembly are part of the work we do in Tangier. Each new enquiry starts with the application and its requirements.",
    image: "/images/factory-film.webp",
    alt: "Illustrative machining floor with automotive components",
    href: "/en/expertise/production/",
  },
  {
    title: "Brake components",
    text: "Brake discs and brake drums are part of our product range. We discuss the reference, dimensions, and supply needs with professional buyers.",
    image: "/images/brake-scene.webp",
    alt: "Illustrative close-up of a ventilated brake disc",
    href: "/en/brake-discs/",
  },
  {
    title: "Clutch components",
    text: "Clutch friction products connect our manufacturing work with the demands of vehicle applications and aftermarket supply.",
    image: "/images/clutch-scene.webp",
    alt: "Illustrative close-up of a clutch disc assembly",
    href: "/en/clutch-discs/",
  },
  {
    title: "International supply",
    text: "From Morocco, our commercial conversations reach buyers in Europe, Asia, and Africa. Clear details help each request move forward.",
    image: "/images/transport-hero.webp",
    alt: "Illustrative freight transport at an industrial loading bay",
    href: "/en/expertise/transport/",
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
            aria-label="Story images. Swipe or drag to browse chapters."
          >
            {chapters.map((item) => (
              <div className="story-chapter-image" key={item.image}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 85vw, 50vw" draggable={false} />
                <span>Illustrative imagery</span>
              </div>
            ))}
          </div>
          <div className="story-chapter-caption" aria-live="polite">
            <div><span>{String(selected + 1).padStart(2, "0")} / 04</span><h3>{chapter.title}</h3><p>{chapter.text}</p></div>
            <Link href={chapter.href} aria-label={`Explore ${chapter.title}`}><ArrowRightIcon size={25} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="story-chapters-side">
          <div className="story-chapters-intro">
            <span>02 / THE CONTINUING STORY</span>
            <h2 id="story-chapters-title">Built through the work we do.</h2>
            <p>Explore four parts of Plastex today. Drag the images or choose a chapter.</p>
          </div>
          <div className="story-chapter-controls" role="group" aria-label="Story chapters">
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
