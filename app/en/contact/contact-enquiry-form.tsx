"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react";

export default function ContactEnquiryForm() {
  const [opened, setOpened] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  useEffect(() => { const part = new URLSearchParams(window.location.search).get("part"); if (part && /^[A-Za-z0-9._/-]{2,80}$/.test(part)) setEnquiry(`Plastex part number: ${part}\n\n`); }, []);

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
    const subject = encodeURIComponent(`Product enquiry from ${company || name}`);
    const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\nProduct: ${product}\n\nRequirements:\n${message}`);
    window.location.href = `mailto:commercial@plastexmaroc.com?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <form className="reference-enquiry-form" onSubmit={handleSubmit}>
      <div className="reference-enquiry-pair">
        <label>Your name <input name="name" autoComplete="name" required /></label>
        <label>Company <input name="company" autoComplete="organization" required /></label>
      </div>
      <label>Work email <input name="email" type="email" autoComplete="email" required /></label>
      <label>Product
        <select name="product" defaultValue="" required>
          <option value="" disabled>Select a product</option>
          <option>Brake discs</option>
          <option>Clutch discs</option>
          <option>Brake drums</option>
          <option>Brake pads</option>
          <option>Other enquiry</option>
        </select>
      </label>
      <label>Tell us about your requirements <textarea name="message" rows={6} value={enquiry} onChange={event => setEnquiry(event.target.value)} required /></label>
      <p className="reference-form-note">This opens your email app with your enquiry filled in. Send it there to contact us.</p>
      <button type="submit">Prepare your email <ArrowRightIcon size={20} aria-hidden="true" /></button>
      {opened && <p className="reference-form-status" role="status">Your email app should open now. Please send the prepared message there.</p>}
    </form>
  );
}
