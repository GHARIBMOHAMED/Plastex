"use client";

import { useRef } from "react";

export default function LogisticsPrism({ ariaLabel = "Gire la escultura logística. Mueva el puntero, arrastre o use las flechas del teclado.", subtle = false }: { ariaLabel?: string; subtle?: boolean }) {
  const geometryRef = useRef<HTMLSpanElement>(null);
  const angles = useRef({ x: 0, y: 0 });

  const rotate = (x: number, y: number) => {
    angles.current = { x, y };
    geometryRef.current?.style.setProperty("--tilt-x", `${x}deg`);
    geometryRef.current?.style.setProperty("--tilt-y", `${y}deg`);
  };

  const rotateFromPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const maxX = subtle ? 5 : 12;
    const maxY = subtle ? 7 : 16;
    rotate(Math.max(-maxX, Math.min(maxX, -y * maxX * 2)), Math.max(-maxY, Math.min(maxY, x * maxY * 2)));
  };

  return (
    <button
      type="button"
      className="logistics-prism"
      aria-label={ariaLabel}
      onPointerMove={rotateFromPointer}
      onPointerLeave={() => rotate(0, 0)}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        rotateFromPointer(event);
      }}
      onPointerUp={(event) => {
        event.currentTarget.releasePointerCapture(event.pointerId);
        if (event.pointerType !== "mouse") rotate(0, 0);
      }}
      onKeyDown={(event) => {
        const step = subtle ? 2 : 4;
        const maxX = subtle ? 5 : 12;
        const maxY = subtle ? 7 : 16;
        const { x, y } = angles.current;
        if (event.key === "ArrowLeft") rotate(x, Math.max(-maxY, y - step));
        else if (event.key === "ArrowRight") rotate(x, Math.min(maxY, y + step));
        else if (event.key === "ArrowUp") rotate(Math.max(-maxX, x - step), y);
        else if (event.key === "ArrowDown") rotate(Math.min(maxX, x + step), y);
        else if (event.key === "Escape") rotate(0, 0);
        else return;
        event.preventDefault();
      }}
      onBlur={() => rotate(0, 0)}
    >
      <span className="logistics-prism-float" ref={geometryRef} aria-hidden="true">
        <svg viewBox="0 0 960 520" fill="none" focusable="false">
          <g stroke="#027373" strokeWidth="1.15" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
            <path d="M64 393 783 58 895 127 895 283 88 429 64 418Z" />
            <path d="M64 393 88 408 895 127" />
            <path d="M88 408 88 429" />
          </g>
          <g stroke="#033f73" strokeWidth="1" strokeDasharray="3 7" strokeOpacity=".55" vectorEffect="non-scaling-stroke">
            <path d="M64 418 783 214 895 283" />
            <path d="M783 58 783 214" />
            <path d="M64 393 895 283" />
          </g>
        </svg>
      </span>
    </button>
  );
}
