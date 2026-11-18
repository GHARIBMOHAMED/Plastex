"use client";

import { useEffect } from "react";

export default function MenuDismiss() {
  useEffect(() => {
    const menus = Array.from(document.querySelectorAll<HTMLDetailsElement>(".site-header .desktop-menu, .site-header .mobile-menu"));
    const header = document.querySelector<HTMLElement>(".site-header");
    const brand = header?.querySelector<HTMLElement>(".brand");
    const productNav = header?.querySelector<HTMLElement>(".desktop-nav");
    const closeAll = () => menus.forEach((menu) => { menu.open = false; });
    let lastScrollY = window.scrollY;
    let movement = 0;
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
        return;
      }
      if (Math.sign(change) !== Math.sign(movement)) movement = change;
      else movement += change;
      if (movement > 12) { setHeaderHidden(true); movement = 0; }
      if (movement < -12) { setHeaderHidden(false); movement = 0; }
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
    menus.forEach((menu) => menu.addEventListener("toggle", onToggle));
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      setHeaderHidden(false);
      menus.forEach((menu) => menu.removeEventListener("toggle", onToggle));
    };
  }, []);

  return null;
}
