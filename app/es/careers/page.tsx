import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import CareerWireframe from "./career-wireframe";
import CareerApplicationForm from "./career-application-form";
import { careerJobs } from "./jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Plastex Maroc is hiring an experienced accountant and a logistics officer in Tangier. View both roles and apply online.",
  alternates: { canonical: "/es/careers/", languages: { fr: "/careers/", en: "/es/careers/" } },
  openGraph: { locale: "es_ES", title: "Careers at Plastex Maroc", description: "Work on the components that keep people moving." },
};

export default function CareersPage() {
  return (
    <>
      <section className="career-hero" data-enter aria-labelledby="career-title">
        <div className="container career-hero-grid">
          <div className="career-hero-copy">
            <span className="career-kicker">PLASTEX MAROC / CAREERS</span>
            <h1 id="career-title">Work that<br />moves us.</h1>
            <p>Join the people behind brake and clutch components in Tangier. Bring your experience, your questions, and your appetite to make things well.</p>
            <a href="#career-openings">Explore opportunities <ArrowDownIcon size={22} aria-hidden="true" /></a>
          </div>
          <CareerWireframe />
        </div>
        <span className="career-hero-index">01 / JOIN PLASTEX</span>
      </section>

      <section className="career-intro" aria-labelledby="career-intro-title">
        <div className="container career-intro-grid">
          <span>THE WORK</span>
          <div>
            <h2 id="career-intro-title">Good work starts with people who care about the details.</h2>
            <p>Our teams work across production, quality, logistics, and customer relationships. Every part has a purpose. Every enquiry is an opportunity to get the details right.</p>
          </div>
        </div>
      </section>

      <section className="career-photo-section" aria-label="Our working environment">
        <div className="container career-photo-grid">
          <div className="career-photo"><Image src="/images/factory-film.webp" alt="Illustrative automotive component machining workshop" fill sizes="(max-width: 760px) 100vw, 60vw" /><span>Illustrative imagery</span></div>
          <div className="career-photo-copy"><span>FROM TANGIER</span><p>Production, supply, and technical conversations all meet in the same place: the work we do together.</p><Link href="/es/expertise/production/">See our production work <ArrowRightIcon size={20} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="career-openings" id="career-openings" aria-labelledby="career-openings-title">
        <div className="container">
          <div className="career-section-head"><span>02 / OPPORTUNITIES</span><h2 id="career-openings-title">Open positions.</h2></div>
          {careerJobs.length > 0 ? (
            <div className="career-jobs">
              {careerJobs.map((job) => <article className="career-job" key={job.id}><div><span>{job.location}{job.type ? ` / ${job.type}` : ""}</span><h3 lang="fr">{job.title}</h3><p>{job.summary}</p><h4>Requirements</h4><ul>{job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul><p className="career-job-email">You can also send your CV to <a href={`mailto:Plastexmarochasna@gmail.com?subject=${encodeURIComponent(`Candidature - ${job.title}`)}`}>Plastexmarochasna@gmail.com</a>.</p></div><Link href={`/es/careers/?job=${job.id}#apply`}>Apply online <ArrowRightIcon size={24} aria-hidden="true" /></Link></article>)}
            </div>
          ) : (
            <div className="career-empty"><p>No positions are published right now. We still welcome a general application if your work connects with ours.</p><a href="#apply">Introduce yourself <ArrowRightIcon size={22} aria-hidden="true" /></a></div>
          )}
        </div>
      </section>

      <section className="career-apply" id="apply" aria-labelledby="career-apply-title">
        <div className="container career-apply-grid">
          <div className="career-apply-intro"><span>03 / YOUR APPLICATION</span><h2 id="career-apply-title">Tell us what you could bring.</h2><p>Share your CV and a little about the work you have done. Your application is saved privately and reviewed by a person.</p><p>We use text extraction to help our team search applications. It never makes a hiring decision.</p></div>
          <CareerApplicationForm jobs={careerJobs} />
        </div>
      </section>
    </>
  );
}
