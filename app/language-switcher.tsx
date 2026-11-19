"use client";

import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const current = pathname === "/es" || pathname.startsWith("/es/") ? "es"
    : pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
  const page = current === "fr" ? pathname : pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  const languages = [
    { code: "fr", name: "Français", flag: "/flags/fr.svg" },
    { code: "en", name: "English", flag: "/flags/gb.svg" },
    { code: "es", name: "Español", flag: "/flags/es.svg" },
  ] as const;

  return (
    <nav className="language-switcher" aria-label="Langue / Language / Idioma">
      {languages.map(({ code, name, flag }) => {
        const href = code === "fr" ? page : `/${code}${page === "/" ? "/" : page}`;
        return <a key={code} href={href} hrefLang={code} lang={code} aria-label={name} aria-current={current === code ? "page" : undefined} title={name}>
          <img src={flag} alt="" width="24" height="16" />
        </a>;
      })}
    </nav>
  );
}
