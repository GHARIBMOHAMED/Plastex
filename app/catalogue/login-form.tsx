"use client";
import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { catalogueCopy, localePrefix } from "@/lib/catalogue/copy";
import type { Locale } from "@/lib/catalogue/types";

export default function LoginForm({ locale }: { locale: Locale }) {
  const c = catalogueCopy[locale];
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/catalogue/session/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      if (!response.ok) throw new Error();
      window.location.assign(`${localePrefix(locale)}/catalogue/`);
    } catch { setError(c.invalid); setBusy(false); }
  }
  return <form className="catalogue-login-form" onSubmit={submit}><label>{c.email}<input name="email" type="email" autoComplete="username" required /></label><label>{c.password}<input name="password" type="password" autoComplete="current-password" required /></label><button disabled={busy}>{c.enter} <ArrowRightIcon size={20} /></button>{error && <p role="alert">{error}</p>}</form>;
}
