"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRightIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import { careerAreas, type CareerJob } from "./jobs";

const areaLabels: Record<(typeof careerAreas)[number], string> = {
  "Production and machining": "Production et usinage",
  "Quality and testing": "Qualité et contrôle",
  "Logistics and transport": "Logistique et transport",
  "Sales and customer support": "Commercial et relation client",
  "Engineering and maintenance": "Ingénierie et maintenance",
  "Finance and accounting": "Finance et comptabilité",
  Other: "Autre",
};

const errorLabels: Record<string, string> = {
  "Please complete every required field.": "Veuillez remplir tous les champs obligatoires.",
  "Please complete the accounting role questions.": "Veuillez répondre aux questions du poste en comptabilité.",
  "Please complete the logistics role questions.": "Veuillez répondre aux questions du poste en logistique.",
  "Choose a PDF or DOCX under 5 MB.": "Choisissez un PDF ou DOCX de moins de 5 Mo.",
  "Choose a PDF or DOCX file.": "Choisissez un fichier PDF ou DOCX.",
  "Please try again later.": "Veuillez réessayer plus tard.",
  "We could not save the application. Please try again.": "Nous n’avons pas pu enregistrer la candidature. Veuillez réessayer.",
};

export default function CareerApplicationForm({ jobs }: { jobs: CareerJob[] }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [selectedJob, setSelectedJob] = useState("general");
  const [area, setArea] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("job");
    if (jobs.some((job) => job.id === requested)) {
      setSelectedJob(requested!);
      if (requested === "comptable-confirme-tanger") setArea("Finance and accounting");
      if (requested === "charge-logistique-tanger") setArea("Logistics and transport");
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
      if (!response.ok) throw new Error(errorLabels[result.error] || "La candidature n’a pas pu être enregistrée.");
      form.reset();
      setSelectedJob("general");
      setArea("");
      setStatus("Merci. Votre candidature a été enregistrée pour un examen par notre équipe.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "La candidature n’a pas pu être enregistrée.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="career-form" onSubmit={submit} encType="multipart/form-data">
      <input className="career-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="career-form-row">
        <label>Nom complet <input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>Adresse e-mail <input name="email" type="email" autoComplete="email" maxLength={200} required /></label>
      </div>
      <div className="career-form-row">
        <label>Numéro de téléphone <input name="phone" type="tel" autoComplete="tel" maxLength={60} required /></label>
        <label>Domaine d’intérêt
          <select name="area" value={area} onChange={(event) => setArea(event.target.value)} required>
            <option value="" disabled>Choisissez un domaine</option>
            {careerAreas.map((area) => <option key={area} value={area}>{areaLabels[area]}</option>)}
          </select>
        </label>
      </div>
      {jobs.length > 0 && <label>Poste
        <select name="jobId" value={selectedJob} onChange={(event) => {
          setSelectedJob(event.target.value);
          if (event.target.value === "comptable-confirme-tanger") setArea("Finance and accounting");
          if (event.target.value === "charge-logistique-tanger") setArea("Logistics and transport");
        }}>
          <option value="general">Candidature spontanée</option>
          {jobs.map((job) => <option key={job.id} value={job.id}>{job.title}</option>)}
        </select>
      </label>}
      {selectedJob === "comptable-confirme-tanger" && <fieldset className="career-role-questions">
        <legend>Questions pour le poste de Comptable Confirmé(e)</legend>
        <div className="career-form-row">
          <label>Votre formation
            <select name="educationLevel" defaultValue="" required><option value="" disabled>Choisissez une réponse</option><option>Bac+4</option><option>Bac+5</option><option>Formation équivalente</option><option>Autre formation</option></select>
          </label>
          <label>Années d’expérience dans un poste similaire
            <select name="accountingYears" defaultValue="" required><option value="" disabled>Choisissez une réponse</option><option>Moins de 3 ans</option><option>3 ans</option><option>4 ans</option><option>Plus de 4 ans</option></select>
          </label>
        </div>
        <label>Décrivez votre expérience en comptabilité marocaine et avec les principes anglo-saxons
          <textarea name="accountingPractice" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Votre niveau en français et en anglais, à l’oral et à l’écrit
          <select name="languageLevel" defaultValue="" required><option value="" disabled>Choisissez une réponse</option><option>Français et anglais professionnels</option><option>Français professionnel, anglais intermédiaire</option><option>Anglais professionnel, français intermédiaire</option><option>Autre niveau</option></select>
        </label>
        <label>Comment utilisez-vous SAGE, Excel, Word et PowerPoint dans votre travail ?
          <textarea name="sageOffice" rows={3} minLength={20} maxLength={1200} required />
        </label>
      </fieldset>}
      {selectedJob === "charge-logistique-tanger" && <fieldset className="career-role-questions">
        <legend>Questions pour le poste de Chargé(e) de Logistique</legend>
        <div className="career-form-row">
          <label>Votre formation en logistique ou supply chain
            <select name="logisticsEducation" defaultValue="" required><option value="" disabled>Choisissez une réponse</option><option>Bac+3</option><option>Bac+4</option><option>Bac+5</option><option>Formation équivalente</option><option>Autre formation</option></select>
          </label>
          <label>Années d’expérience dans un poste similaire
            <select name="logisticsYears" defaultValue="" required><option value="" disabled>Choisissez une réponse</option><option>Moins de 2 ans</option><option>2 ans</option><option>3 ans</option><option>4 ans</option><option>Plus de 4 ans</option></select>
          </label>
        </div>
        <label>Décrivez une opération d’import/export, de transport ou de gestion des stocks que vous avez suivie
          <textarea name="logisticsOperations" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Quels outils ERP et fonctions du Pack Office utilisez-vous dans votre travail ?
          <textarea name="erpOffice" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Votre niveau en français et en anglais, à l’oral et à l’écrit
          <select name="languageLevel" defaultValue="" required><option value="" disabled>Choisissez une réponse</option><option>Français et anglais professionnels</option><option>Français professionnel, anglais intermédiaire</option><option>Anglais professionnel, français intermédiaire</option><option>Autre niveau</option></select>
        </label>
      </fieldset>}
      <label>Décrivez une expérience professionnelle pertinente
        <textarea name="experience" rows={4} minLength={20} maxLength={1500} placeholder="Un projet, un processus ou un problème auquel vous avez contribué" required />
      </label>
      <label>Quels outils, méthodes ou savoir-faire apporteriez-vous?
        <textarea name="skills" rows={3} maxLength={1500} placeholder="Par exemple : usinage CNC, contrôle qualité, planification logistique" required />
      </label>
      <label>Quand pourriez-vous commencer? <input name="availability" maxLength={120} placeholder={selectedJob === "general" ? "Par exemple : un mois après une offre" : "Disponibilité immédiate demandée"} required /></label>
      <label className="career-file-label"><UploadSimpleIcon size={24} aria-hidden="true" /> CV — PDF ou DOCX, 5 Mo maximum
        <input name="cv" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
      </label>
      <label className="career-consent"><input name="consent" type="checkbox" value="yes" required /><span>J’accepte que Plastex Maroc conserve ma candidature pour le recrutement. Je comprends qu’une personne l’examinera et que je peux demander sa suppression en utilisant les coordonnées de la <a href="/privacy/">politique de confidentialité</a>.</span></label>
      <button type="submit" disabled={busy}>{busy ? "Enregistrement…" : "Envoyer ma candidature"}<ArrowRightIcon size={21} aria-hidden="true" /></button>
      <p className="career-form-status" role="status">{status}</p>
    </form>
  );
}
