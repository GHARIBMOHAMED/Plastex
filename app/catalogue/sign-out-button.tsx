"use client";
import { SignOutIcon } from "@phosphor-icons/react";
import { catalogueCopy, localePrefix } from "@/lib/catalogue/copy";
import type { Locale } from "@/lib/catalogue/types";
export default function SignOutButton({ locale }: { locale: Locale }) {
  return <button className="catalogue-signout" onClick={async () => { await fetch("/api/catalogue/session/", { method: "DELETE" }); window.location.assign(`${localePrefix(locale)}/catalogue/login/`); }} type="button"><SignOutIcon size={18} /> {catalogueCopy[locale].logout}</button>;
}
