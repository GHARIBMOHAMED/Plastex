"use client";

import { useEffect } from "react";

export default function MenuDismiss() {
  useEffect(() => {
    const menus = Array.from(document.querySelectorAll<HTMLDetailsElement>(".site-header .desktop-menu, .site-header .mobile-menu"));
    const header = document.querySelector<HTMLElement>(".site-header");
    const brand = header?.querySelector<HTMLElement>(".brand");
    const productNav = header?.querySelector<HTMLElement>(".desktop-nav");
    const main = document.querySelector("main");
    const closeAll = () => menus.forEach((menu) => { menu.open = false; });
    let lastScrollY = window.scrollY;
    let movement = 0;
    const backgroundLuminance = (element: Element): number => {
      for (let node: Element | null = element; node; node = node.parentElement) {
        if (node instanceof HTMLImageElement || node instanceof HTMLVideoElement) return 0;
        const style = window.getComputedStyle(node);
        if (style.backgroundImage !== "none") return 0;
        const color = style.backgroundColor;
        const values = color.match(/[\d.]+/g)?.map(Number);
        if (!values || values.length < 3) continue;
        const alpha = color.startsWith("color(srgb")
          ? Number(color.match(/\/\s*([\d.]+)/)?.[1] ?? 1)
          : (values[3] ?? 1);
        if (alpha < 0.5) continue;
        const rgb = color.startsWith("color(srgb") ? values.slice(0, 3).map((value) => value * 255) : values.slice(0, 3);
        const linear = rgb.map((value) => {
          const channel = value / 255;
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
      }
      return 1;
    };
    const updateLogoContrast = () => {
      if (!brand) return;
      const bounds = brand.getBoundingClientRect();
      const y = bounds.top + bounds.height / 2;
      const samples = [0.2, 0.5, 0.8].map((fraction) => {
        const x = bounds.left + bounds.width * fraction;
        const surface = document.elementsFromPoint(x, y).find((element) =>
          !header?.contains(element) && !element.closest(".site-loader")
        );
        return surface ? backgroundLuminance(surface) < 0.3 : false;
      });
      brand.classList.toggle("is-on-dark", samples.filter(Boolean).length >= 2);
    };
    const setHeaderHidden = (hidden: boolean) => {
      header?.classList.toggle("is-scroll-hidden", hidden);
      if (brand) brand.inert = hidden;
      if (productNav) productNav.inert = hidden;
    };
    const onScroll = () => {
      const currentY = window.scrollY;
      const change = currentY - lastScrollY;
      lastScrollY = currentY;
      if (currentY < 90) {
        movement = 0;
        setHeaderHidden(false);
        updateLogoContrast();
        return;
      }
      if (Math.sign(change) !== Math.sign(movement)) movement = change;
      else movement += change;
      if (movement > 12) { setHeaderHidden(true); movement = 0; }
      if (movement < -12) { setHeaderHidden(false); movement = 0; }
      updateLogoContrast();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!menus.some((menu) => menu.contains(event.target as Node))) closeAll();
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element).closest(".site-header details a")) closeAll();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menus.some((menu) => menu.open)) return;
      const openMenu = menus.find((menu) => menu.open);
      closeAll();
      openMenu?.querySelector<HTMLElement>("summary")?.focus();
    };
    const onToggle = (event: Event) => {
      const current = event.currentTarget as HTMLDetailsElement;
      if (current.open) menus.forEach((menu) => { if (menu !== current) menu.open = false; });
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateLogoContrast);
    window.addEventListener("pageshow", updateLogoContrast);
    document.querySelector(".site-loader")?.addEventListener("animationend", updateLogoContrast);
    const pageObserver = new MutationObserver(updateLogoContrast);
    if (main) pageObserver.observe(main, { childList: true });
    menus.forEach((menu) => menu.addEventListener("toggle", onToggle));
    updateLogoContrast();
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateLogoContrast);
      window.removeEventListener("pageshow", updateLogoContrast);
      document.querySelector(".site-loader")?.removeEventListener("animationend", updateLogoContrast);
      pageObserver.disconnect();
      setHeaderHidden(false);
      menus.forEach((menu) => menu.removeEventListener("toggle", onToggle));
    };
  }, []);

  return null;
}
