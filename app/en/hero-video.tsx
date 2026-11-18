"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo({
  source = "/videos/plastex-hero.mp4",
  poster = "/images/hero-aerial.webp",
  className = "",
}: {
  source?: string;
  poster?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const syncPlayback = () => {
      if (reducedMotion.matches || !visible) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });

    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, [source]);

  return (
    <div className={`hero-film ${className}`} aria-hidden="true" style={{ backgroundImage: `url(${poster})` }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        tabIndex={-1}
      >
        <source src={source} type="video/mp4" />
      </video>
    </div>
  );
}
