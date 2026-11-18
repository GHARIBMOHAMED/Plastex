"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";

export default function ContactEnquiryForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const company = String(data.get("company") || "").trim();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const product = String(data.get("product") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Demande de produit de ${company || name}`);
    const body = encodeURIComponent(`Nom : ${name}\nEntreprise : ${company}\nE-mail : ${email}\nProduit : ${product}\n\nBesoins :\n${message}`);
    window.location.href = `mailto:commercial@plastexmaroc.com?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <form className="reference-enquiry-form" onSubmit={handleSubmit}>
      <div className="reference-enquiry-pair">
        <label>Votre nom <input name="name" autoComplete="name" required /></label>
        <label>Entreprise <input name="company" autoComplete="organization" required /></label>
      </div>
      <label>E-mail professionnel <input name="email" type="email" autoComplete="email" required /></label>
      <label>Produit
        <select name="product" defaultValue="" required>
          <option value="" disabled>Sélectionnez un produit</option>
          <option>Disques de frein</option>
          <option>Disques d’embrayage</option>
          <option>Tambours de frein</option>
          <option>Plaquettes de frein</option>
          <option>Autre demande</option>
        </select>
      </label>
      <label>Décrivez votre besoin <textarea name="message" rows={6} required /></label>
      <p className="reference-form-note">Cela ouvrira votre messagerie avec votre demande préremplie. Envoyez le message depuis votre messagerie pour nous contacter.</p>
      <button type="submit">Préparer l’e-mail <ArrowRightIcon size={20} aria-hidden="true" /></button>
      {opened && <p className="reference-form-status" role="status">Votre messagerie devrait s’ouvrir. Envoyez le message préparé pour nous contacter.</p>}
    </form>
  );
}
