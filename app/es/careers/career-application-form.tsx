"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRightIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import { careerAreas, type CareerJob } from "./jobs";

export default function CareerApplicationForm({ jobs }: { jobs: CareerJob[] }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [selectedJob, setSelectedJob] = useState("general");
  const [area, setArea] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("job");
    if (jobs.some((job) => job.id === requested)) {
      setSelectedJob(requested!);
      if (requested === "comptable-confirme-tanger") setArea("Finanzas y contabilidad");
      if (requested === "charge-logistique-tanger") setArea("Logística y transporte");
    }
  }, [jobs]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/careers/applications/", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "No se pudo guardar la candidatura.");
      form.reset();
      setSelectedJob("general");
      setArea("");
      setStatus("Gracias. Su candidatura se ha guardado para que la revise una persona.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo guardar la candidatura.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="career-form" onSubmit={submit} encType="multipart/form-data">
      <input className="career-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="career-form-row">
        <label>Nombre completo <input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>Correo electrónico <input name="email" type="email" autoComplete="email" maxLength={200} required /></label>
      </div>
      <div className="career-form-row">
        <label>Número de teléfono <input name="phone" type="tel" autoComplete="tel" maxLength={60} required /></label>
        <label>Área de interés
          <select name="area" value={area} onChange={(event) => setArea(event.target.value)} required>
            <option value="" disabled>Seleccione un área</option>
            {careerAreas.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
        </label>
      </div>
      {jobs.length > 0 && <label>Puesto
        <select name="jobId" value={selectedJob} onChange={(event) => {
          setSelectedJob(event.target.value);
          if (event.target.value === "comptable-confirme-tanger") setArea("Finanzas y contabilidad");
          if (event.target.value === "charge-logistique-tanger") setArea("Logística y transporte");
        }}>
          <option value="general">Candidatura espontánea</option>
          {jobs.map((job) => <option key={job.id} value={job.id}>{job.title}</option>)}
        </select>
      </label>}
      {selectedJob === "comptable-confirme-tanger" && <fieldset className="career-role-questions">
        <legend>Preguntas para el puesto de contabilidad</legend>
        <div className="career-form-row">
          <label>Su formación
            <select name="educationLevel" defaultValue="" required><option value="" disabled>Seleccione una respuesta</option><option>Bac+4</option><option>Bac+5</option><option value="Formation équivalente">Formación equivalente</option><option value="Autre formation">Otra formación</option></select>
          </label>
          <label>Años de experiencia en un puesto similar
            <select name="accountingYears" defaultValue="" required><option value="" disabled>Seleccione una respuesta</option><option value="Moins de 3 ans">Menos de 3 años</option><option value="3 ans">3 años</option><option value="4 ans">4 años</option><option value="Plus de 4 ans">Más de 4 años</option></select>
          </label>
        </div>
        <label>Describa su experiencia en contabilidad marroquí y principios contables anglosajones
          <textarea name="accountingPractice" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Su nivel oral y escrito de francés e inglés
          <select name="languageLevel" defaultValue="" required><option value="" disabled>Seleccione una respuesta</option><option value="Français et anglais professionnels">Francés e inglés profesionales</option><option value="Français professionnel, anglais intermédiaire">Francés profesional e inglés intermedio</option><option value="Anglais professionnel, français intermédiaire">Inglés profesional y francés intermedio</option><option value="Autre niveau">Otro nivel</option></select>
        </label>
        <label>¿Cómo utiliza SAGE, Excel, Word y PowerPoint en su trabajo?
          <textarea name="sageOffice" rows={3} minLength={20} maxLength={1200} required />
        </label>
      </fieldset>}
      {selectedJob === "charge-logistique-tanger" && <fieldset className="career-role-questions">
        <legend>Preguntas para el puesto de logística</legend>
        <div className="career-form-row">
          <label>Su formación en logística o cadena de suministro
            <select name="logisticsEducation" defaultValue="" required><option value="" disabled>Seleccione una respuesta</option><option>Bac+3</option><option>Bac+4</option><option>Bac+5</option><option value="Formation équivalente">Formación equivalente</option><option value="Autre formation">Otra formación</option></select>
          </label>
          <label>Años de experiencia en un puesto similar
            <select name="logisticsYears" defaultValue="" required><option value="" disabled>Seleccione una respuesta</option><option value="Moins de 2 ans">Menos de 2 años</option><option value="2 ans">2 años</option><option value="3 ans">3 años</option><option value="4 ans">4 años</option><option value="Plus de 4 ans">Más de 4 años</option></select>
          </label>
        </div>
        <label>Describa una operación de importación, exportación, transporte o gestión de existencias que haya realizado
          <textarea name="logisticsOperations" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>¿Qué herramientas ERP y funciones de Microsoft Office utiliza en su trabajo?
          <textarea name="erpOffice" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Su nivel oral y escrito de francés e inglés
          <select name="languageLevel" defaultValue="" required><option value="" disabled>Seleccione una respuesta</option><option value="Français et anglais professionnels">Francés e inglés profesionales</option><option value="Français professionnel, anglais intermédiaire">Francés profesional e inglés intermedio</option><option value="Anglais professionnel, français intermédiaire">Inglés profesional y francés intermedio</option><option value="Autre niveau">Otro nivel</option></select>
        </label>
      </fieldset>}
      <label>Describa su experiencia profesional pertinente
        <textarea name="experience" rows={4} minLength={20} maxLength={1500} placeholder="Un proyecto, proceso o problema en el que haya trabajado y su función" required />
      </label>
      <label>¿Qué herramientas, procesos o competencias aportaría?
        <textarea name="skills" rows={3} maxLength={1500} placeholder="Por ejemplo: mecanizado CNC, control de calidad o planificación logística" required />
      </label>
      <label>¿Cuándo podría incorporarse? <input name="availability" maxLength={120} placeholder={selectedJob === "general" ? "Por ejemplo: un mes después de recibir la oferta" : "Se requiere incorporación inmediata"} required /></label>
      <label className="career-file-label"><UploadSimpleIcon size={24} aria-hidden="true" /> CV — PDF o DOCX, hasta 5 MB
        <input name="cv" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
      </label>
      <label className="career-consent"><input name="consent" type="checkbox" value="yes" required /><span>Acepto que Plastex Maroc guarde mi candidatura para su revisión. Entiendo que una persona la evaluará y que puedo solicitar su eliminación mediante los datos de contacto de la <a href="/es/privacy/">política de privacidad</a>.</span></label>
      <button type="submit" disabled={busy}>{busy ? "Guardando candidatura…" : "Enviar candidatura"}<ArrowRightIcon size={21} aria-hidden="true" /></button>
      <p className="career-form-status" role="status">{status}</p>
    </form>
  );
}
