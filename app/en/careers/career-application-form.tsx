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
      if (!response.ok) throw new Error(result.error || "The application could not be saved.");
      form.reset();
      setSelectedJob("general");
      setArea("");
      setStatus("Thank you. Your application has been saved for human review.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "The application could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="career-form" onSubmit={submit} encType="multipart/form-data">
      <input className="career-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="career-form-row">
        <label>Full name <input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>Email address <input name="email" type="email" autoComplete="email" maxLength={200} required /></label>
      </div>
      <div className="career-form-row">
        <label>Phone number <input name="phone" type="tel" autoComplete="tel" maxLength={60} required /></label>
        <label>Area of interest
          <select name="area" value={area} onChange={(event) => setArea(event.target.value)} required>
            <option value="" disabled>Select an area</option>
            {careerAreas.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
        </label>
      </div>
      {jobs.length > 0 && <label>Position
        <select name="jobId" value={selectedJob} onChange={(event) => {
          setSelectedJob(event.target.value);
          if (event.target.value === "comptable-confirme-tanger") setArea("Finance and accounting");
          if (event.target.value === "charge-logistique-tanger") setArea("Logistics and transport");
        }}>
          <option value="general">General application</option>
          {jobs.map((job) => <option key={job.id} value={job.id}>{job.title}</option>)}
        </select>
      </label>}
      {selectedJob === "comptable-confirme-tanger" && <fieldset className="career-role-questions">
        <legend>Questions for the Experienced Accountant role</legend>
        <div className="career-form-row">
          <label>Your qualification
            <select name="educationLevel" defaultValue="" required><option value="" disabled>Choose an answer</option><option>Bac+4</option><option>Bac+5</option><option value="Formation équivalente">Equivalent qualification</option><option value="Autre formation">Other qualification</option></select>
          </label>
          <label>Years of experience in a similar role
            <select name="accountingYears" defaultValue="" required><option value="" disabled>Choose an answer</option><option value="Moins de 3 ans">Less than 3 years</option><option value="3 ans">3 years</option><option value="4 ans">4 years</option><option value="Plus de 4 ans">More than 4 years</option></select>
          </label>
        </div>
        <label>Describe your experience with Moroccan accounting and Anglo-Saxon accounting principles
          <textarea name="accountingPractice" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Your spoken and written French and English level
          <select name="languageLevel" defaultValue="" required><option value="" disabled>Choose an answer</option><option value="Français et anglais professionnels">Professional French and English</option><option value="Français professionnel, anglais intermédiaire">Professional French, intermediate English</option><option value="Anglais professionnel, français intermédiaire">Professional English, intermediate French</option><option value="Autre niveau">Other level</option></select>
        </label>
        <label>How do you use SAGE, Excel, Word, and PowerPoint in your work?
          <textarea name="sageOffice" rows={3} minLength={20} maxLength={1200} required />
        </label>
      </fieldset>}
      {selectedJob === "charge-logistique-tanger" && <fieldset className="career-role-questions">
        <legend>Questions for the Logistics Officer role</legend>
        <div className="career-form-row">
          <label>Your logistics or supply chain qualification
            <select name="logisticsEducation" defaultValue="" required><option value="" disabled>Choose an answer</option><option>Bac+3</option><option>Bac+4</option><option>Bac+5</option><option value="Formation équivalente">Equivalent qualification</option><option value="Autre formation">Other qualification</option></select>
          </label>
          <label>Years of experience in a similar role
            <select name="logisticsYears" defaultValue="" required><option value="" disabled>Choose an answer</option><option value="Moins de 2 ans">Less than 2 years</option><option value="2 ans">2 years</option><option value="3 ans">3 years</option><option value="4 ans">4 years</option><option value="Plus de 4 ans">More than 4 years</option></select>
          </label>
        </div>
        <label>Describe an import/export, transport, or stock management operation you handled
          <textarea name="logisticsOperations" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Which ERP tools and Microsoft Office functions do you use at work?
          <textarea name="erpOffice" rows={3} minLength={20} maxLength={1200} required />
        </label>
        <label>Your spoken and written French and English level
          <select name="languageLevel" defaultValue="" required><option value="" disabled>Choose an answer</option><option value="Français et anglais professionnels">Professional French and English</option><option value="Français professionnel, anglais intermédiaire">Professional French, intermediate English</option><option value="Anglais professionnel, français intermédiaire">Professional English, intermediate French</option><option value="Autre niveau">Other level</option></select>
        </label>
      </fieldset>}
      <label>Tell us about relevant work you have done
        <textarea name="experience" rows={4} minLength={20} maxLength={1500} placeholder="A project, process, or problem you worked on and your role in it" required />
      </label>
      <label>Which tools, processes, or skills would you bring?
        <textarea name="skills" rows={3} maxLength={1500} placeholder="For example: CNC machining, quality inspection, logistics planning" required />
      </label>
      <label>When could you start? <input name="availability" maxLength={120} placeholder={selectedJob === "general" ? "For example: one month after an offer" : "Immediate availability requested"} required /></label>
      <label className="career-file-label"><UploadSimpleIcon size={24} aria-hidden="true" /> CV — PDF or DOCX, up to 5 MB
        <input name="cv" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
      </label>
      <label className="career-consent"><input name="consent" type="checkbox" value="yes" required /><span>I agree to Plastex Maroc storing my application for recruitment review. I understand a person will review it, and I can ask for deletion through the contact details in the <a href="/en/privacy/">privacy policy</a>.</span></label>
      <button type="submit" disabled={busy}>{busy ? "Saving application…" : "Submit application"}<ArrowRightIcon size={21} aria-hidden="true" /></button>
      <p className="career-form-status" role="status">{status}</p>
    </form>
  );
}
