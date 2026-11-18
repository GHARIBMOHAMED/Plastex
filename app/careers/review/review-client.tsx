"use client";

import { useState, type FormEvent } from "react";
import type { ApplicationRecord } from "../application-types";

export default function CareerReview() {
  const [token, setToken] = useState("");
  const [records, setRecords] = useState<ApplicationRecord[] | null>(null);
  const [message, setMessage] = useState("");
  const [area, setDomaine] = useState("");
  const [job, setJob] = useState("");
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");

  async function load(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/careers/applications/", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!response.ok) { setRecords(null); setMessage("Accès refusé. Vérifiez la clé d’administration."); return; }
    const data = await response.json();
    setRecords(data.applications);
    setMessage("");
  }

  async function download(record: ApplicationRecord) {
    const response = await fetch(`/api/careers/applications/${record.id}/cv?type=${record.cvType}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!response.ok) { setMessage("Le CV n’a pas pu être téléchargé."); return; }
    const url = URL.createObjectURL(await response.blob());
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = record.cvName || `application-${record.id}.${record.cvType}`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const tags = [...new Set(records?.flatMap((record) => record.capabilityTags) || [])].sort();
  const areas = [...new Set(records?.map((record) => record.area) || [])].sort();
  const jobs = [...new Set(records?.map((record) => record.jobTitle) || [])].sort();
  const filtered = records?.filter((record) => {
    if (area && record.area !== area) return false;
    if (job && record.jobTitle !== job) return false;
    if (tag && !record.capabilityTags.includes(tag)) return false;
    const searchable = `${record.name} ${record.jobTitle} ${record.area} ${record.experience} ${record.skills} ${Object.values(record.jobAnswers || {}).join(" ")} ${record.cvText}`.toLocaleLowerCase();
    return searchable.includes(query.trim().toLocaleLowerCase());
  });

  return (
    <section className="career-review container">
      <span className="career-kicker">PRIVÉ / RECRUTEMENT</span>
      <h1>Examen des candidatures.</h1>
      <p>Recherchez dans les CV et les réponses des candidats pour préparer un examen humain. Les mots-clés sont des indications, pas une note ou une décision de rejet.</p>
      <form className="career-review-login" onSubmit={load}><label>Clé d’administration <input type="password" value={token} onChange={(event) => setToken(event.target.value)} required autoComplete="off" /></label><button type="submit">Charger les candidatures</button></form>
      {message && <p role="status">{message}</p>}
      {records && <>
        <div className="career-review-filters">
          <label>Rechercher dans les noms, réponses et textes extraits des CV <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher des candidatures" /></label>
          <label>Poste <select value={job} onChange={(event) => setJob(event.target.value)}><option value="">Tous les postes</option>{jobs.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Domaine <select value={area} onChange={(event) => setDomaine(event.target.value)}><option value="">Tous les domaines</option>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Mot-clé de compétence <select value={tag} onChange={(event) => setTag(event.target.value)}><option value="">Tous les mots-clés</option>{tags.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <p className="career-review-count">Affichage de {filtered?.length || 0} sur {records.length} candidatures. Toutes les candidatures restent accessibles après effacement des filtres.</p>
        <div className="career-review-list">{filtered?.map((record) => <article key={record.id} className="career-review-card">
          <div><span>{new Date(record.submittedAt).toLocaleDateString()} / {record.jobTitle}</span><h2>{record.name}</h2><p>{record.area} · {record.availability}</p></div>
          <div><a href={`mailto:${record.email}`}>{record.email}</a><p>{record.phone}</p><p>{record.extractionStatus === "parsed" ? "Texte du CV extrait" : "CV à examiner manuellement"}</p></div>
          <div className="career-review-tags">{record.capabilityTags.map((item) => <span key={item}>{item}</span>)}</div>
          <details><summary>Réponses et texte extrait du CV</summary><h3>Expérience pertinente</h3><p>{record.experience}</p><h3>Compétences et méthodes</h3><p>{record.skills}</p>{Object.entries(record.jobAnswers || {}).map(([key, value]) => <div key={key}><h3>{({ educationLevel: "Formation", accountingYears: "Années d’expérience", accountingPractice: "Pratique comptable", languageLevel: "Français et anglais", sageOffice: "SAGE et Pack Office", logisticsEducation: "Formation logistique", logisticsYears: "Années d’expérience logistique", logisticsOperations: "Import/export, transport et stocks", erpOffice: "ERP et Pack Office" } as Record<string, string>)[key] || key}</h3><p>{value}</p></div>)}<h3>Texte extrait du CV</h3><pre>{record.cvText || "Aucun texte lisible n’a été extrait. Ouvrez le CV original pour l’examiner."}</pre></details>
          <button type="button" onClick={() => download(record)}>Télécharger le CV original</button>
        </article>)}</div>
      </>}
    </section>
  );
}
