"use client";

import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/");
  const englishPath = english ? pathname : pathname === "/" ? "/en/" : `/en${pathname}`;
  const frenchPath = english ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : pathname;

  return (
    <nav className="language-switcher" aria-label={english ? "Choose language" : "Choisir la langue"}>
      <a href={frenchPath} hrefLang="fr" lang="fr" aria-current={!english ? "page" : undefined}>FR</a>
      <span aria-hidden="true">/</span>
      <a href={englishPath} hrefLang="en" lang="en" aria-current={english ? "page" : undefined}>EN</a>
    </nav>
  );
}
