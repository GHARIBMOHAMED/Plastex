"use client";

import { useRef } from "react";

const bands = [
  { d: "M45 225 359 41 386 26 386 75 299 114 162 175 45 227Z", corners: [[45,225],[386,26],[386,75],[45,227]] },
  { d: "M61 271 315 123 386 82 386 128 262 184 125 245 61 273Z", corners: [[61,271],[386,82],[386,128],[61,273]] },
  { d: "M84 313 312 179 386 136 386 181 322 210 185 271 84 315Z", corners: [[84,313],[386,136],[386,181],[84,315]] },
  { d: "M177 310 302 238 302 281 195 311 177 315Z", corners: [[177,310],[302,238],[302,281],[177,315]] },
  { d: "M177 361 302 289 302 332 202 360 177 366Z", corners: [[177,361],[302,289],[302,332],[177,366]] },
  { d: "M177 412 302 340 302 383 198 412 177 417Z", corners: [[177,412],[302,340],[302,383],[177,417]] },
];

export default function CareerWireframe() {
  const ref = useRef<HTMLSpanElement>(null);
  const tilt = (x: number, y: number) => {
    ref.current?.style.setProperty("--career-tilt-x", `${x}deg`);
    ref.current?.style.setProperty("--career-tilt-y", `${y}deg`);
  };

  return (
    <button
      type="button"
      className="career-wireframe"
      aria-label="Symbole linéaire Plastex interactif. Faites-le tourner avec le pointeur ou les flèches du clavier."
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        tilt((0.5 - (event.clientY - box.top) / box.height) * 7, ((event.clientX - box.left) / box.width - 0.5) * 9);
      }}
      onPointerLeave={() => tilt(0, 0)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") tilt(0, -4);
        else if (event.key === "ArrowRight") tilt(0, 4);
        else if (event.key === "ArrowUp") tilt(4, 0);
        else if (event.key === "ArrowDown") tilt(-4, 0);
        else if (event.key === "Escape") tilt(0, 0);
        else return;
        event.preventDefault();
      }}
      onBlur={() => tilt(0, 0)}
    >
      <span ref={ref} className="career-wireframe-inner" aria-hidden="true">
        <svg viewBox="0 0 438 438" fill="none" focusable="false">
          {bands.map((band, index) => (
            <g className="career-wireframe-band" style={{ animationDelay: `${index * 90}ms` }} key={index}>
              <path d={band.d} transform="translate(8 -6)" />
              <path d={band.d} />
              {band.corners.map(([x, y], corner) => <path key={corner} d={`M${x} ${y}l8 -6`} />)}
            </g>
          ))}
        </svg>
      </span>
    </button>
  );
}
