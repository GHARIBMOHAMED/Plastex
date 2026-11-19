"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";

export default function ContactEnquiryForm() {
  const [opened, setOpened] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  useEffect(() => { const part = new URLSearchParams(window.location.search).get("part"); if (part && /^[A-Za-z0-9._/-]{2,80}$/.test(part)) setEnquiry(`Referencia Plastex: ${part}\n\n`); }, []);

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
    const subject = encodeURIComponent(`Consulta sobre productos de ${company || name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\nProducto: ${product}\n\nRequisitos:\n${message}`);
    window.location.href = `mailto:commercial@plastexmaroc.com?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <form className="reference-enquiry-form" onSubmit={handleSubmit}>
      <div className="reference-enquiry-pair">
        <label>Su nombre <input name="name" autoComplete="name" required /></label>
        <label>Empresa <input name="company" autoComplete="organization" required /></label>
      </div>
      <label>Correo profesional <input name="email" type="email" autoComplete="email" required /></label>
      <label>Producto
        <select name="product" defaultValue="" required>
          <option value="" disabled>Seleccione un producto</option>
          <option>Discos de freno</option>
          <option>Discos de embrague</option>
          <option>Tambores de freno</option>
          <option>Pastillas de freno</option>
          <option>Otra consulta</option>
        </select>
      </label>
      <label>Describa sus necesidades <textarea name="message" rows={6} value={enquiry} onChange={event => setEnquiry(event.target.value)} required /></label>
      <p className="reference-form-note">Se abrirá su aplicación de correo con la consulta preparada. Envíela desde allí para contactar con nosotros.</p>
      <button type="submit">Preparar correo <ArrowRightIcon size={20} aria-hidden="true" /></button>
      {opened && <p className="reference-form-status" role="status">Su aplicación de correo debería abrirse ahora. Envíe desde allí el mensaje preparado.</p>}
    </form>
  );
}
