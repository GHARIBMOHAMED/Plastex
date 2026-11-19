"use client";

import { Fragment, useEffect, useRef, useState } from "react";

export default function ScrollFillHeadline({ text, id }: { text: string; id: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const words = text.trim().split(/\s+/);
  const [wordLines, setWordLines] = useState<number[]>([]);
  const [filledLines, setFilledLines] = useState(0);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lineStarts: HTMLSpanElement[] = [];
    let frame = 0;

    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.62;
      const next = motion.matches
        ? lineStarts.length
        : lineStarts.filter((word) => word.getBoundingClientRect().top <= threshold).length;
      setFilledLines((current) => current === next ? current : next);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      const indices: number[] = [];
      const starts: HTMLSpanElement[] = [];
      let previousTop = Number.NEGATIVE_INFINITY;
      let line = -1;
      for (const word of wordRefs.current) {
        if (!word) continue;
        const top = word.getBoundingClientRect().top;
        if (Math.abs(top - previousTop) > 3) {
          line += 1;
          previousTop = top;
          starts.push(word);
        }
        indices.push(line);
      }
      lineStarts = starts;
      setWordLines((current) => current.length === indices.length && current.every((value, index) => value === indices[index]) ? current : indices);
      schedule();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(heading);
    measure();
    void document.fonts.ready.then(measure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", schedule);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [text]);

  return (
    <h2 id={id} ref={headingRef} className="scroll-fill-headline" aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            ref={(element) => { wordRefs.current[index] = element; }}
            className={`scroll-fill-word ${wordLines[index] !== undefined && wordLines[index] < filledLines ? "is-filled" : ""}`}
            aria-hidden="true"
          >{word}</span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}
